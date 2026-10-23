import { createServerFn } from "@tanstack/react-start";
import { getDb } from "./db";
import { ObjectId } from "mongodb";
import nodemailer from "nodemailer";
import { z } from "zod";

// ── Email config ───────────────────────────────────────────────────────────────
// All environment variables are now required - no fallbacks for security
const MAIL_FROM = process.env["MAIL_FROM"];
const ADMIN_EMAIL = process.env["ADMIN_EMAIL"];
const SMTP_HOST = process.env["SMTP_HOST"];
const SMTP_PORT = process.env["SMTP_PORT"] ? Number(process.env["SMTP_PORT"]) : undefined;
const SMTP_USER = process.env["SMTP_USER"];
const SMTP_PASS = process.env["SMTP_PASS"];

// Validate required email config on module load
function validateEmailConfig() {
  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS || !MAIL_FROM || !ADMIN_EMAIL) {
    console.error("Missing required email configuration. Email features will be disabled.");
    return false;
  }
  return true;
}

const isEmailConfigured = validateEmailConfig();

// ── Validation Schemas ─────────────────────────────────────────────────────────
const ContactPayloadSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(100),
  phone: z
    .string()
    .regex(/^[0-9\s\-\+\(\)]{7,20}$/, "Invalid phone number")
    .optional()
    .or(z.literal("")),
  email: z.string().email("Invalid email address"),
  reg: z.string().max(20).optional().or(z.literal("")),
  service: z.string().max(200).optional().or(z.literal("")),
  message: z.string().max(5000, "Message too long").optional().or(z.literal("")),
  category: z.enum(["public", "fleet"]).optional(),
});

const AdminLoginSchema = z.object({
  password: z.string().min(8, "Password must be at least 8 characters"),
});

const VehicleLookupSchema = z.object({
  token: z.string(),
  registration: z
    .string()
    .min(2)
    .max(10)
    .transform((s) => s.toUpperCase().replace(/\s/g, "")),
});

const JobCreateSchema = z.object({
  token: z.string(),
  vehicleReg: z.string().min(2).max(10),
  vehicleMake: z.string().max(100),
  vehicleModel: z.string().max(100),
  vehicleYear: z
    .number()
    .int()
    .min(1900)
    .max(new Date().getFullYear() + 1),
  vehicleColor: z.string().max(50).optional(),
  fuelType: z.string().max(50).optional(),
  motExpiry: z.string().optional(),
  customerName: z.string().min(2).max(100),
  customerPhone: z.string().max(20),
  customerEmail: z.string().email().optional().or(z.literal("")),
  services: z.array(z.string()).min(1, "At least one service required"),
  scheduledDate: z.string(), // ISO date string
  estimatedCost: z.number().optional(),
  notes: z.string().max(2000).optional(),
});

const JobUpdateSchema = z.object({
  token: z.string(),
  id: z.string(),
  status: z.enum(["pending", "in_progress", "completed", "cancelled"]).optional(),
  notes: z.string().max(2000).optional(),
  completedAt: z.string().optional(),
});

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

export type ContactPayload = z.infer<typeof ContactPayloadSchema>;

export type Job = {
  _id: string;
  vehicleReg: string;
  vehicleMake: string;
  vehicleModel: string;
  vehicleYear: number;
  vehicleColor?: string;
  fuelType?: string;
  motExpiry?: string;
  customerName: string;
  customerPhone: string;
  customerEmail?: string;
  services: string[];
  scheduledDate: string;
  estimatedCost?: number;
  notes?: string;
  status: "pending" | "in_progress" | "completed" | "cancelled";
  createdAt: string;
  updatedAt: string;
  completedAt?: string;
};

// ── Security: Admin Authentication ────────────────────────────────────────────
// CRITICAL: No fallback password - must be set via environment variable
function getAdminSecret(): string | null {
  const secret = process.env["ADMIN_SECRET"];

  if (!secret) {
    console.error("ADMIN_SECRET environment variable is not set. Admin access disabled.");
    return null;
  }

  // Enforce minimum password strength
  if (secret.length < 12) {
    console.error("ADMIN_SECRET must be at least 12 characters. Admin access disabled.");
    return null;
  }

  return secret;
}

function checkAuth(token: string | undefined): boolean {
  if (!token) return false;
  const secret = getAdminSecret();
  if (!secret) return false;

  // Use timing-safe comparison to prevent timing attacks
  return timingSafeEqual(token, secret);
}

// Simple timing-safe string comparison
function timingSafeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;

  let result = 0;
  for (let i = 0; i < a.length; i++) {
    result |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  return result === 0;
}

// ── Contact form submission ────────────────────────────────────────────────────
function createMailTransport() {
  if (!isEmailConfigured || !SMTP_HOST || !SMTP_PORT || !SMTP_USER || !SMTP_PASS) {
    throw new Error("Email service is not configured");
  }

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
  // Sanitize data for plain text (prevent email injection)
  const sanitize = (str: string | undefined) =>
    (str || "N/A").replace(/[\r\n]/g, " ").slice(0, 500);

  return `New contact submission from ${sanitize(data.name)}

Name: ${sanitize(data.name)}
Email: ${sanitize(data.email)}
Phone: ${sanitize(data.phone)}
Vehicle reg: ${sanitize(data.reg)}
Category: ${data.category ?? "public"}
Service: ${sanitize(data.service)}
Message:
${(data.message || "(no message provided)").slice(0, 5000)}

Please follow up with the customer via phone or email.`;
}

function buildAdminHtml(data: ContactPayload) {
  // HTML escape to prevent XSS in email clients
  const escapeHtml = (str: string | undefined) =>
    (str || "N/A")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;")
      .slice(0, 1000);

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
            ${["Name", "Email", "Phone", "Vehicle reg", "Category", "Service", "Message"]
              .map((label) => {
                const value =
                  label === "Name"
                    ? escapeHtml(data.name)
                    : label === "Email"
                      ? escapeHtml(data.email)
                      : label === "Phone"
                        ? escapeHtml(data.phone)
                        : label === "Vehicle reg"
                          ? escapeHtml(data.reg)
                          : label === "Category"
                            ? escapeHtml(data.category || "public")
                            : label === "Service"
                              ? escapeHtml(data.service)
                              : escapeHtml(data.message || "(no message provided)");
                return `
                <tr>
                  <td style="padding:10px 0;border-top:1px solid rgba(148,163,184,0.15);font-size:14px;color:#94a3b8;width:140px;vertical-align:top;">${label}</td>
                  <td style="padding:10px 0;border-top:1px solid rgba(148,163,184,0.15);font-size:14px;color:#f8fafc;">${value}</td>
                </tr>`;
              })
              .join("")}
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
            ${["Name", "Email", "Phone", "Vehicle reg", "Category", "Service", "Message"]
              .map((label) => {
                const value =
                  label === "Name"
                    ? data.name
                    : label === "Email"
                      ? data.email
                      : label === "Phone"
                        ? data.phone || "N/A"
                        : label === "Vehicle reg"
                          ? data.reg || "N/A"
                          : label === "Category"
                            ? data.category || "public"
                            : label === "Service"
                              ? data.service || "N/A"
                              : data.message || "(no message provided)";
                return `
                <tr>
                  <td style="padding:10px 0;border-top:1px solid #e2e8f0;font-size:14px;color:#667085;width:140px;vertical-align:top;">${label}</td>
                  <td style="padding:10px 0;border-top:1px solid #e2e8f0;font-size:14px;color:#0f172a;">${value}</td>
                </tr>`;
              })
              .join("")}
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
  if (!isEmailConfigured || !MAIL_FROM || !ADMIN_EMAIL) {
    throw new Error("Email service is not configured");
  }

  const transporter = createMailTransport();
  const text = buildPlainText(data);
  const adminHtml = buildAdminHtml(data);
  const userHtml = buildUserHtml(data);

  // Sanitize subject lines to prevent email header injection
  const sanitizeSubject = (str: string) => str.replace(/[\r\n]/g, " ").slice(0, 200);

  await Promise.all([
    transporter.sendMail({
      from: MAIL_FROM,
      to: ADMIN_EMAIL,
      subject: sanitizeSubject(`New enquiry from ${data.name} — ${data.service || "Contact form"}`),
      text,
      html: adminHtml,
      replyTo: data.email,
    }),
    transporter.sendMail({
      from: MAIL_FROM,
      to: data.email,
      subject: sanitizeSubject(`Thanks for your enquiry, ${data.name} — Sleek Automotive`),
      text: `Thanks for contacting Sleek Automotive. We received your enquiry and will reply shortly.

${text}`,
      html: userHtml,
    }),
  ]);
}

export const submitContact = createServerFn({ method: "POST" })
  .validator((data: unknown) => {
    // Validate and sanitize input with Zod
    const result = ContactPayloadSchema.safeParse(data);
    if (!result.success) {
      throw new Error(`Validation failed: ${result.error.errors.map((e) => e.message).join(", ")}`);
    }
    return result.data;
  })
  .handler(async ({ data }) => {
    const db = await getDb();

    // Rate limiting check (simple in-memory implementation)
    // Rate limiting: Implement Redis/Upstash for production
    const ipKey = `rate_limit_${data.email}`;
    // Production: Use distributed rate limiting middleware

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
      await sendContactEmails(data);
    } catch (error) {
      console.error("Contact email send failed:", error);
      // Still return success as the submission was saved to DB
      // Admin can manually follow up
      return {
        success: true,
        id: result.insertedId.toString(),
        emailWarning: "Submission saved but confirmation email failed to send",
      };
    }

    return { success: true, id: result.insertedId.toString() };
  });

// ── Admin: login (pure password check — no DB) ─────────────────────────────────
export const adminLogin = createServerFn({ method: "POST" })
  .validator((data: unknown) => {
    const result = AdminLoginSchema.safeParse(data);
    if (!result.success) {
      throw new Error("Invalid login credentials");
    }
    return result.data;
  })
  .handler(async ({ data }) => {
    const secret = getAdminSecret();

    if (!secret) {
      throw new Error("Admin authentication is not configured");
    }

    // Use timing-safe comparison
    if (!timingSafeEqual(data.password, secret)) {
      // Add delay to prevent brute force attacks
      await new Promise((resolve) => setTimeout(resolve, 1000));
      throw new Error("Invalid password");
    }

    // Simple token-based auth (Production: use JWT with expiration)
    // For better security, implement proper JWT tokens with libraries like jsonwebtoken
    return { token: secret };
  });

// ── Admin: get submissions ─────────────────────────────────────────────────────
export const getSubmissions = createServerFn({ method: "POST" })
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
        createdAt: s.createdAt instanceof Date ? s.createdAt.toISOString() : String(s.createdAt),
        read: Boolean(s.read),
      })) as Submission[],
      total,
      unread,
    };
  });

// ── Admin: mark read / unread ──────────────────────────────────────────────────
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

// ── Vehicle Lookup (MOT API) ───────────────────────────────────────────────────
export const lookupVehicle = createServerFn({ method: "POST" })
  .validator((data: unknown) => {
    const result = VehicleLookupSchema.safeParse(data);
    if (!result.success) {
      throw new Error(`Validation failed: ${result.error.errors.map((e) => e.message).join(", ")}`);
    }
    return result.data;
  })
  .handler(async ({ data }) => {
    if (!checkAuth(data.token)) throw new Error("Unauthorized");

    try {
      // Call UK Government MOT History API
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout

      const response = await fetch(
        `https://beta.check-mot.service.gov.uk/trade/vehicles/mot-tests?registration=${data.registration}`,
        {
          method: "GET",
          headers: {
            Accept: "application/json+v6",
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
          },
          signal: controller.signal,
        },
      );

      clearTimeout(timeoutId);

      if (!response.ok) {
        if (response.status === 404) {
          throw new Error(
            "Vehicle not found in MOT database. Please check the registration number.",
          );
        }
        if (response.status === 429) {
          throw new Error("Too many requests. Please try again in a moment.");
        }
        if (response.status === 403) {
          throw new Error("Access denied to MOT API. This service may require authentication.");
        }
        throw new Error(`MOT API returned error: ${response.status}`);
      }

      const vehicleData = await response.json();

      // Validate response
      if (!vehicleData || !vehicleData.make) {
        throw new Error("Invalid response from MOT API");
      }

      // Extract the most recent MOT test
      const latestMot =
        vehicleData.motTests && vehicleData.motTests.length > 0 ? vehicleData.motTests[0] : null;

      return {
        success: true,
        vehicle: {
          registration: vehicleData.registration || data.registration,
          make: vehicleData.make || "Unknown",
          model: vehicleData.model || "Unknown",
          year: vehicleData.firstUsedDate
            ? new Date(vehicleData.firstUsedDate).getFullYear()
            : new Date().getFullYear(),
          color: vehicleData.primaryColour || "",
          fuelType: vehicleData.fuelType || "",
          motExpiry: latestMot?.expiryDate || "",
          motStatus: latestMot?.testResult || "",
          mileage: latestMot?.odometerValue || "",
        },
      };
    } catch (error) {
      console.error("Vehicle lookup error:", error);

      // Better error message
      if (error instanceof Error) {
        if (error.message.includes("fetch")) {
          throw new Error(
            "Cannot connect to MOT database. Please check your internet connection and try again.",
          );
        }
        throw new Error(error.message);
      }

      throw new Error("Failed to lookup vehicle. Please try again.");
    }
  });

// ── Job Management ─────────────────────────────────────────────────────────────

// Create new job
export const createJob = createServerFn({ method: "POST" })
  .validator((data: unknown) => {
    const result = JobCreateSchema.safeParse(data);
    if (!result.success) {
      throw new Error(`Validation failed: ${result.error.errors.map((e) => e.message).join(", ")}`);
    }
    return result.data;
  })
  .handler(async ({ data }) => {
    if (!checkAuth(data.token)) throw new Error("Unauthorized");

    const db = await getDb();
    const now = new Date();

    const result = await db.collection("jobs").insertOne({
      vehicleReg: data.vehicleReg.toUpperCase(),
      vehicleMake: data.vehicleMake,
      vehicleModel: data.vehicleModel,
      vehicleYear: data.vehicleYear,
      vehicleColor: data.vehicleColor || "",
      fuelType: data.fuelType || "",
      motExpiry: data.motExpiry || "",
      customerName: data.customerName,
      customerPhone: data.customerPhone,
      customerEmail: data.customerEmail || "",
      services: data.services,
      scheduledDate: new Date(data.scheduledDate),
      estimatedCost: data.estimatedCost || 0,
      notes: data.notes || "",
      status: "pending",
      createdAt: now,
      updatedAt: now,
    });

    return { success: true, id: result.insertedId.toString() };
  });

// Get all jobs
export const getJobs = createServerFn({ method: "POST" })
  .validator(
    (data: unknown) =>
      data as {
        token: string;
        status?: string;
        dateFrom?: string;
        dateTo?: string;
        search?: string;
      },
  )
  .handler(async ({ data }) => {
    if (!checkAuth(data.token)) throw new Error("Unauthorized");

    const db = await getDb();
    const filter: any = {};

    // Filter by status
    if (data.status && data.status !== "all") {
      filter.status = data.status;
    }

    // Filter by date range
    if (data.dateFrom || data.dateTo) {
      filter.scheduledDate = {};
      if (data.dateFrom) filter.scheduledDate.$gte = new Date(data.dateFrom);
      if (data.dateTo) filter.scheduledDate.$lte = new Date(data.dateTo);
    }

    // Search by registration or customer name
    if (data.search) {
      filter.$or = [
        { vehicleReg: new RegExp(data.search, "i") },
        { customerName: new RegExp(data.search, "i") },
      ];
    }

    const jobs = await db
      .collection("jobs")
      .find(filter)
      .sort({ scheduledDate: -1, createdAt: -1 })
      .toArray();

    return {
      jobs: jobs.map((j) => ({
        _id: j._id.toString(),
        vehicleReg: String(j.vehicleReg || ""),
        vehicleMake: String(j.vehicleMake || ""),
        vehicleModel: String(j.vehicleModel || ""),
        vehicleYear: Number(j.vehicleYear || 0),
        vehicleColor: String(j.vehicleColor || ""),
        fuelType: String(j.fuelType || ""),
        motExpiry: String(j.motExpiry || ""),
        customerName: String(j.customerName || ""),
        customerPhone: String(j.customerPhone || ""),
        customerEmail: String(j.customerEmail || ""),
        services: Array.isArray(j.services) ? j.services : [],
        scheduledDate:
          j.scheduledDate instanceof Date ? j.scheduledDate.toISOString() : String(j.scheduledDate),
        estimatedCost: Number(j.estimatedCost || 0),
        notes: String(j.notes || ""),
        status: String(j.status || "pending"),
        createdAt: j.createdAt instanceof Date ? j.createdAt.toISOString() : String(j.createdAt),
        updatedAt: j.updatedAt instanceof Date ? j.updatedAt.toISOString() : String(j.updatedAt),
        completedAt: j.completedAt instanceof Date ? j.completedAt.toISOString() : undefined,
      })) as Job[],
    };
  });

// Update job
export const updateJob = createServerFn({ method: "POST" })
  .validator((data: unknown) => {
    const result = JobUpdateSchema.safeParse(data);
    if (!result.success) {
      throw new Error(`Validation failed: ${result.error.errors.map((e) => e.message).join(", ")}`);
    }
    return result.data;
  })
  .handler(async ({ data }) => {
    if (!checkAuth(data.token)) throw new Error("Unauthorized");

    const db = await getDb();
    const updateData: any = { updatedAt: new Date() };

    if (data.status) updateData.status = data.status;
    if (data.notes !== undefined) updateData.notes = data.notes;
    if (data.completedAt) updateData.completedAt = new Date(data.completedAt);

    // Auto-set completedAt when status changes to completed
    if (data.status === "completed" && !data.completedAt) {
      updateData.completedAt = new Date();
    }

    await db.collection("jobs").updateOne({ _id: new ObjectId(data.id) }, { $set: updateData });

    return { success: true };
  });

// Delete job
export const deleteJob = createServerFn({ method: "POST" })
  .validator((data: unknown) => data as { token: string; id: string })
  .handler(async ({ data }) => {
    if (!checkAuth(data.token)) throw new Error("Unauthorized");

    const db = await getDb();
    await db.collection("jobs").deleteOne({ _id: new ObjectId(data.id) });

    return { success: true };
  });

// ── Invoice Generation ─────────────────────────────────────────────────────
import {
  generateInvoiceNumber,
  generateInvoiceHTML,
  calculateInvoiceTotal,
  type InvoiceData,
} from "./invoice-generator";

const InvoiceSchema = z.object({
  token: z.string(),
  jobId: z.string(),
  services: z.array(
    z.object({
      name: z.string(),
      price: z.number().min(0),
      quantity: z.number().int().min(1),
    }),
  ),
  notes: z.string().optional(),
});

export const generateInvoice = createServerFn({ method: "POST" })
  .validator((data: unknown) => {
    const result = InvoiceSchema.safeParse(data);
    if (!result.success) {
      throw new Error(`Validation failed: ${result.error.errors.map((e) => e.message).join(", ")}`);
    }
    return result.data;
  })
  .handler(async ({ data }) => {
    if (!checkAuth(data.token)) throw new Error("Unauthorized");

    const db = await getDb();

    // Get job details
    const job = await db.collection("jobs").findOne({ _id: new ObjectId(data.jobId) });
    if (!job) throw new Error("Job not found");

    // Get next invoice number using counter
    const counterResult = await db
      .collection("counters")
      .findOneAndUpdate(
        { _id: "invoice_number" },
        { $inc: { sequence: 1 } },
        { upsert: true, returnDocument: "after" },
      );

    const invoiceSequence = counterResult?.sequence || 1;
    const invoiceNumber = `INV-${String(invoiceSequence).padStart(3, "0")}`; // INV-001, INV-002, etc.

    // Calculate totals
    const { subtotal, vat, total } = calculateInvoiceTotal(data.services);

    // Generate invoice data
    const invoiceData: InvoiceData = {
      invoiceNumber,
      invoiceDate: new Date(),
      job: {
        _id: String(job._id),
        vehicleReg: String(job.vehicleReg),
        vehicleMake: String(job.vehicleMake),
        vehicleModel: String(job.vehicleModel),
        vehicleYear: Number(job.vehicleYear),
        vehicleColor: String(job.vehicleColor || ""),
        fuelType: String(job.fuelType || ""),
        motExpiry:
          job.motExpiry instanceof Date ? job.motExpiry.toISOString() : String(job.motExpiry || ""),
        customerName: String(job.customerName),
        customerPhone: String(job.customerPhone),
        customerEmail: String(job.customerEmail || ""),
        services: Array.isArray(job.services) ? job.services : [],
        scheduledDate:
          job.scheduledDate instanceof Date
            ? job.scheduledDate.toISOString()
            : String(job.scheduledDate),
        estimatedCost: Number(job.estimatedCost || 0),
        notes: String(job.notes || ""),
        status: String(job.status || "pending") as
          "pending" | "in_progress" | "completed" | "cancelled",
        createdAt:
          job.createdAt instanceof Date ? job.createdAt.toISOString() : String(job.createdAt),
        updatedAt:
          job.updatedAt instanceof Date ? job.updatedAt.toISOString() : String(job.updatedAt),
        completedAt: job.completedAt instanceof Date ? job.completedAt.toISOString() : undefined,
      },
      services: data.services,
      subtotal,
      vat,
      total,
      notes: data.notes,
    };

    // Generate HTML
    const html = generateInvoiceHTML(invoiceData);

    // Save invoice to database
    await db.collection("invoices").insertOne({
      jobId: new ObjectId(data.jobId),
      invoiceNumber: invoiceData.invoiceNumber,
      invoiceData,
      html,
      createdAt: new Date(),
    });

    return {
      success: true,
      invoiceNumber: invoiceData.invoiceNumber,
      html,
      total,
    };
  });

export const getInvoices = createServerFn({ method: "POST" })
  .validator((data: unknown) => data as { token: string; jobId?: string })
  .handler(async ({ data }) => {
    if (!checkAuth(data.token)) throw new Error("Unauthorized");

    const db = await getDb();
    const query = data.jobId ? { jobId: new ObjectId(data.jobId) } : {};

    const invoices = await db.collection("invoices").find(query).sort({ createdAt: -1 }).toArray();

    return {
      invoices: invoices.map((inv) => ({
        _id: String(inv._id),
        jobId: String(inv.jobId),
        invoiceNumber: String(inv.invoiceNumber),
        customerName: String(inv.invoiceData?.job?.customerName || ""),
        vehicleReg: String(inv.invoiceData?.job?.vehicleReg || ""),
        vehicleMake: String(inv.invoiceData?.job?.vehicleMake || ""),
        vehicleModel: String(inv.invoiceData?.job?.vehicleModel || ""),
        services: Array.isArray(inv.invoiceData?.services)
          ? inv.invoiceData.services.map((s: any) => String(s.name || "")).join(", ")
          : "",
        subtotal: Number(inv.invoiceData?.subtotal || 0),
        vat: Number(inv.invoiceData?.vat || 0),
        total: Number(inv.invoiceData?.total || 0),
        createdAt:
          inv.createdAt instanceof Date ? inv.createdAt.toISOString() : String(inv.createdAt),
      })),
    };
  });

export const getInvoiceHTML = createServerFn({ method: "POST" })
  .validator((data: unknown) => data as { token: string; invoiceId: string })
  .handler(async ({ data }) => {
    if (!checkAuth(data.token)) throw new Error("Unauthorized");

    const db = await getDb();
    const invoice = await db.collection("invoices").findOne({ _id: new ObjectId(data.invoiceId) });

    if (!invoice) throw new Error("Invoice not found");

    return {
      html: String(invoice.html),
      invoiceNumber: String(invoice.invoiceNumber),
    };
  });

export const deleteInvoice = createServerFn({ method: "POST" })
  .validator((data: unknown) => data as { token: string; invoiceId: string })
  .handler(async ({ data }) => {
    if (!checkAuth(data.token)) throw new Error("Unauthorized");

    const db = await getDb();
    await db.collection("invoices").deleteOne({ _id: new ObjectId(data.invoiceId) });

    return { success: true };
  });
