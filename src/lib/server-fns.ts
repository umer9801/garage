import { createServerFn } from "@tanstack/react-start";
import { getDb } from "./db";
import { ObjectId } from "mongodb";
import nodemailer from "nodemailer";

// ── Email config ───────────────────────────────────────────────────────────────
const MAIL_FROM = process.env["MAIL_FROM"] || "Sleek Automotive <info@sleekautomotive.uk>";
const ADMIN_EMAIL = process.env["ADMIN_EMAIL"] || "info@sleekautomotive.uk";
const SMTP_HOST = process.env["SMTP_HOST"] || "smtp.hostinger.com";
const SMTP_PORT = Number(process.env["SMTP_PORT"] ?? "465");
const SMTP_USER = process.env["SMTP_USER"] || "info@sleekautomotive.uk";
const SMTP_PASS = process.env["SMTP_PASS"] || "SLEEKauto111@";

// ── Types ──────────────────────────────────────────────────────────────────────
export type Submission = {
  _id: string;
  name: string;
  phone: string;
  email: string;
  reg: string;
  service: string;
  message: string;
  category: string;
  createdAt: string;
  read: boolean;
};

export type ContactPayload = {
  name: string;
  phone: string;
  email: string;
  reg: string;
  service: string;
  message: string;
  category?: string;
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
function createMailTransport() {
  return nodemailer.createTransport({
    host: SMTP_HOST,
    port: SMTP_PORT,
    secure: true,
    auth: {
      user: SMTP_USER,
      pass: SMTP_PASS,
    },
  });
}

function buildPlainText(data: ContactPayload) {
  return `New contact submission from ${data.name}

Name: ${data.name}
Email: ${data.email}
Phone: ${data.phone ?? "N/A"}
Vehicle reg: ${data.reg ?? "N/A"}
Category: ${data.category ?? "public"}
Service: ${data.service ?? "N/A"}
Message:
${data.message ?? "(no message provided)"}

Please follow up with the customer via phone or email.`;
}

function buildAdminHtml(data: ContactPayload) {
  return `
  <html>
    <body style="margin:0;padding:0;font-family:Arial,Helvetica,sans-serif;background:#0f172a;color:#f8fafc;">
      <table width="100%" cellpadding="0" cellspacing="0" style="max-width:680px;margin:0 auto;background:#020617;border-radius:24px;overflow:hidden;">
        <tr><td style="padding:32px 28px;background:linear-gradient(135deg,#5b21b6,#f97316);text-align:center;">
          <h1 style="margin:0;font-size:28px;color:#fff;">New enquiry received</h1>
          <p style="margin:8px 0 0;color:#e2e8f0;font-size:15px;">Sleek Automotive contact form submission</p>
        </td></tr>
        <tr><td style="padding:28px;">
          <p style="margin:0 0 18px;color:#cbd5e1;">A new contact request was submitted on the website. Review the full details below and connect with the customer as soon as possible.</p>
          <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse:separate;">
            ${["Name","Email","Phone","Vehicle reg","Category","Service","Message"].map((label) => {
              const value =
                label === "Name" ? data.name :
                label === "Email" ? data.email :
                label === "Phone" ? data.phone || "N/A" :
                label === "Vehicle reg" ? data.reg || "N/A" :
                label === "Category" ? data.category || "public" :
                label === "Service" ? data.service || "N/A" :
                data.message || "(no message provided)";
              return `
                <tr>
                  <td style="padding:10px 0;border-top:1px solid rgba(148,163,184,0.15);font-size:14px;color:#94a3b8;width:140px;vertical-align:top;">${label}</td>
                  <td style="padding:10px 0;border-top:1px solid rgba(148,163,184,0.15);font-size:14px;color:#f8fafc;">${value}</td>
                </tr>`;
            }).join("")}
          </table>
          <p style="margin:24px 0 0;font-size:14px;color:#94a3b8;">View the submission in the admin panel or reply directly to the customer.</p>
        </td></tr>
      </table>
    </body>
  </html>
  `;
}

function buildUserHtml(data: ContactPayload) {
  return `
  <html>
    <body style="margin:0;padding:0;font-family:Arial,Helvetica,sans-serif;background:#f8fafc;color:#0f172a;">
      <table width="100%" cellpadding="0" cellspacing="0" style="max-width:680px;margin:0 auto;background:#ffffff;border-radius:24px;overflow:hidden;">
        <tr><td style="padding:32px 28px;background:#111827;color:#fff;text-align:center;">
          <h1 style="margin:0;font-size:28px;">Thanks for your enquiry, ${data.name}</h1>
          <p style="margin:10px 0 0;color:#cbd5e1;font-size:15px;">Your message has been received by Sleek Automotive.</p>
        </td></tr>
        <tr><td style="padding:28px;">
          <p style="margin:0 0 18px;font-size:15px;color:#334155;">We’ve received the following details and one of our team will contact you quickly to confirm your booking and next steps.</p>
          <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse:separate;">
            ${["Name","Email","Phone","Vehicle reg","Category","Service","Message"].map((label) => {
              const value =
                label === "Name" ? data.name :
                label === "Email" ? data.email :
                label === "Phone" ? data.phone || "N/A" :
                label === "Vehicle reg" ? data.reg || "N/A" :
                label === "Category" ? data.category || "public" :
                label === "Service" ? data.service || "N/A" :
                data.message || "(no message provided)";
              return `
                <tr>
                  <td style="padding:10px 0;border-top:1px solid #e2e8f0;font-size:14px;color:#667085;width:140px;vertical-align:top;">${label}</td>
                  <td style="padding:10px 0;border-top:1px solid #e2e8f0;font-size:14px;color:#0f172a;">${value}</td>
                </tr>`;
            }).join("")}
          </table>
          <div style="margin:28px 0 0;padding:22px;border-radius:18px;background:#eff6ff;color:#0f172a;font-size:14px;">
            <strong>What happens next:</strong>
            <ul style="margin:10px 0 0;padding-left:18px;">
              <li>Our team reviews your enquiry.</li>
              <li>We contact you to confirm the booking time.</li>
              <li>Drop your vehicle at Sleek Automotive when ready.</li>
            </ul>
          </div>
          <p style="margin:22px 0 0;font-size:14px;color:#64748b;">If you need immediate assistance, call us on <a href="tel:+441204000000" style="color:#2563eb;text-decoration:none;">01204 000 000</a>.</p>
          <p style="margin:20px 0 0;font-size:14px;color:#64748b;">Sincerely,<br />The Sleek Automotive team</p>
        </td></tr>
      </table>
    </body>
  </html>
  `;
}

async function sendContactEmails(data: ContactPayload) {
  const transporter = createMailTransport();
  const text = buildPlainText(data);
  const adminHtml = buildAdminHtml(data);
  const userHtml = buildUserHtml(data);

  await Promise.all([
    transporter.sendMail({
      from: MAIL_FROM,
      to: ADMIN_EMAIL,
      subject: `New enquiry from ${data.name} — ${data.service || "Contact form"}`,
      text,
      html: adminHtml,
      replyTo: data.email,
    }),
    transporter.sendMail({
      from: MAIL_FROM,
      to: data.email,
      subject: `Thanks for your enquiry, ${data.name} — Sleek Automotive`,
      text: `Thanks for contacting Sleek Automotive. We received your enquiry and will reply shortly.

${text}`,
      html: userHtml,
    }),
  ]);
}

export const submitContact = createServerFn({ method: "POST" })
  .validator(
    (data: unknown) =>
      data as ContactPayload,
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
      category: data.category ?? "public",
      createdAt: new Date(),
      read: false,
    });

    try {
      await sendContactEmails({
        ...data,
        category: data.category ?? "public",
      });
    } catch (error) {
      console.error("Contact email send failed:", error);
      throw new Error("Unable to send confirmation emails. Please try again later.");
    }

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
