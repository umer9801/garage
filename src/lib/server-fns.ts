import { createServerFn } from "@tanstack/react-start";
import { getDb } from "./db";
import { ObjectId } from "mongodb";

// ── Types ──────────────────────────────────────────────────────────────────────
export type Submission = {
  _id: string;
  name: string;
  phone: string;
  email: string;
  reg: string;
  service: string;
  message: string;
  createdAt: string;
  read: boolean;
};

// Hardcoded fallback — works without any env var set
const FALLBACK_PASSWORD = "sleekadmin2024";

function getAdminSecret(): string {
  // Try all the ways an env var might be available in different runtimes
  try {
    const e = process.env["ADMIN_SECRET"];
    if (e) return e;
  } catch {}
  return FALLBACK_PASSWORD;
}

function checkAuth(token: string | undefined): boolean {
  if (!token) return false;
  return token === getAdminSecret();
}

// ── Contact form submission ────────────────────────────────────────────────────
export const submitContact = createServerFn({ method: "POST" })
  .validator(
    (data: unknown) =>
      data as {
        name: string;
        phone: string;
        email: string;
        reg: string;
        service: string;
        message: string;
      },
  )
  .handler(async ({ data }) => {
    if (!data.name || !data.email) {
      throw new Error("Name and email are required");
    }
    const db = await getDb();
    const result = await db.collection("submissions").insertOne({
      name: data.name,
      phone: data.phone ?? "",
      email: data.email,
      reg: data.reg ?? "",
      service: data.service ?? "",
      message: data.message ?? "",
      createdAt: new Date(),
      read: false,
    });
    return { success: true, id: result.insertedId.toString() };
  });

// ── Admin: login (pure password check — no DB) ─────────────────────────────────
export const adminLogin = createServerFn({ method: "POST" })
  .validator((data: unknown) => data as { password: string })
  .handler(async ({ data }) => {
    const secret = getAdminSecret();
    if (!data.password || data.password !== secret) {
      throw new Error("Invalid password");
    }
    // Return the secret as the session token (simple, stateless)
    return { token: secret };
  });

// ── Admin: get submissions ─────────────────────────────────────────────────────
export const getSubmissions = createServerFn({ method: "POST" })
  .validator(
    (data: unknown) =>
      data as { token: string; skip?: number; limit?: number },
  )
  .handler(async ({ data }) => {
    if (!checkAuth(data.token)) throw new Error("Unauthorized");
    const db = await getDb();
    const skip = data.skip ?? 0;
    const limit = data.limit ?? 50;
    const rows = await db
      .collection("submissions")
      .find({})
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .toArray();
    const total = await db.collection("submissions").countDocuments();
    const unread = await db
      .collection("submissions")
      .countDocuments({ read: false });
    return {
      submissions: rows.map((s) => ({
        _id: s._id.toString(),
        name: String(s.name ?? ""),
        phone: String(s.phone ?? ""),
        email: String(s.email ?? ""),
        reg: String(s.reg ?? ""),
        service: String(s.service ?? ""),
        message: String(s.message ?? ""),
        createdAt:
          s.createdAt instanceof Date
            ? s.createdAt.toISOString()
            : String(s.createdAt),
        read: Boolean(s.read),
      })) as Submission[],
      total,
      unread,
    };
  });

// ── Admin: mark read / unread ──────────────────────────────────────────────────
export const markSubmissionRead = createServerFn({ method: "POST" })
  .validator(
    (data: unknown) => data as { token: string; id: string; read: boolean },
  )
  .handler(async ({ data }) => {
    if (!checkAuth(data.token)) throw new Error("Unauthorized");
    const db = await getDb();
    await db
      .collection("submissions")
      .updateOne(
        { _id: new ObjectId(data.id) },
        { $set: { read: data.read } },
      );
    return { success: true };
  });

// ── Admin: delete submission ───────────────────────────────────────────────────
export const deleteSubmissionFn = createServerFn({ method: "POST" })
  .validator((data: unknown) => data as { token: string; id: string })
  .handler(async ({ data }) => {
    if (!checkAuth(data.token)) throw new Error("Unauthorized");
    const db = await getDb();
    await db.collection("submissions").deleteOne({ _id: new ObjectId(data.id) });
    return { success: true };
  });

// ── Review submission ──────────────────────────────────────────────────────────
export const submitReview = createServerFn({ method: "POST" })
  .validator(
    (data: unknown) =>
      data as { name: string; role: string; rating: number; quote: string },
  )
  .handler(async ({ data }) => {
    if (!data.name || !data.quote) throw new Error("Name and review text are required");
    if (data.rating < 1 || data.rating > 5) throw new Error("Rating must be between 1 and 5");
    const db = await getDb();
    const result = await db.collection("reviews").insertOne({
      name: data.name,
      role: data.role ?? "",
      rating: data.rating,
      quote: data.quote,
      approved: false,
      createdAt: new Date(),
    });
    return { success: true, id: result.insertedId.toString() };
  });

// ── Admin: get reviews ─────────────────────────────────────────────────────────
export const getReviews = createServerFn({ method: "POST" })
  .validator((data: unknown) => data as { token: string; approvedOnly?: boolean })
  .handler(async ({ data }) => {
    if (!checkAuth(data.token)) throw new Error("Unauthorized");
    const db = await getDb();
    const filter = data.approvedOnly ? { approved: true } : {};
    const rows = await db.collection("reviews").find(filter).sort({ createdAt: -1 }).toArray();
    return {
      reviews: rows.map((r) => ({
        _id: r._id.toString(),
        name: String(r.name ?? ""),
        role: String(r.role ?? ""),
        rating: Number(r.rating ?? 5),
        quote: String(r.quote ?? ""),
        approved: Boolean(r.approved),
        createdAt: r.createdAt instanceof Date ? r.createdAt.toISOString() : String(r.createdAt),
      })),
    };
  });

// ── Public: get approved reviews ───────────────────────────────────────────────
export const getApprovedReviews = createServerFn({ method: "POST" })
  .validator((data: unknown) => data as Record<string, never>)
  .handler(async () => {
    const db = await getDb();
    const rows = await db
      .collection("reviews")
      .find({ approved: true })
      .sort({ createdAt: -1 })
      .limit(12)
      .toArray();
    return {
      reviews: rows.map((r) => ({
        _id: r._id.toString(),
        name: String(r.name ?? ""),
        role: String(r.role ?? ""),
        rating: Number(r.rating ?? 5),
        quote: String(r.quote ?? ""),
        approved: true,
        createdAt: r.createdAt instanceof Date ? r.createdAt.toISOString() : String(r.createdAt),
      })),
    };
  });

// ── Admin: approve / reject review ────────────────────────────────────────────
export const setReviewApproval = createServerFn({ method: "POST" })
  .validator((data: unknown) => data as { token: string; id: string; approved: boolean })
  .handler(async ({ data }) => {
    if (!checkAuth(data.token)) throw new Error("Unauthorized");
    const db = await getDb();
    await db.collection("reviews").updateOne(
      { _id: new ObjectId(data.id) },
      { $set: { approved: data.approved } },
    );
    return { success: true };
  });

// ── Admin: delete review ───────────────────────────────────────────────────────
export const deleteReviewFn = createServerFn({ method: "POST" })
  .validator((data: unknown) => data as { token: string; id: string })
  .handler(async ({ data }) => {
    if (!checkAuth(data.token)) throw new Error("Unauthorized");
    const db = await getDb();
    await db.collection("reviews").deleteOne({ _id: new ObjectId(data.id) });
    return { success: true };
  });
