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

function checkAuth(token: string | undefined): boolean {
  const secret = process.env["ADMIN_SECRET"] ?? "sleekadmin2024";
  return token === secret;
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

// ── Admin: login ───────────────────────────────────────────────────────────────
export const adminLogin = createServerFn({ method: "POST" })
  .validator((data: unknown) => data as { password: string })
  .handler(async ({ data }) => {
    const secret = process.env["ADMIN_SECRET"] ?? "sleekadmin2024";
    if (data.password !== secret) throw new Error("Invalid password");
    return { token: secret };
  });

// ── Admin: get submissions ─────────────────────────────────────────────────────
export const getSubmissions = createServerFn({ method: "GET" })
  .validator((data: unknown) => data as { token: string; skip?: number; limit?: number })
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
    const unread = await db.collection("submissions").countDocuments({ read: false });
    return {
      submissions: rows.map((s) => ({
        _id: s._id.toString(),
        name: String(s.name ?? ""),
        phone: String(s.phone ?? ""),
        email: String(s.email ?? ""),
        reg: String(s.reg ?? ""),
        service: String(s.service ?? ""),
        message: String(s.message ?? ""),
        createdAt: (s.createdAt as Date).toISOString(),
        read: Boolean(s.read),
      })) as Submission[],
      total,
      unread,
    };
  });

// ── Admin: mark read ───────────────────────────────────────────────────────────
export const markSubmissionRead = createServerFn({ method: "POST" })
  .validator((data: unknown) => data as { token: string; id: string; read: boolean })
  .handler(async ({ data }) => {
    if (!checkAuth(data.token)) throw new Error("Unauthorized");
    const db = await getDb();
    await db
      .collection("submissions")
      .updateOne({ _id: new ObjectId(data.id) }, { $set: { read: data.read } });
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
