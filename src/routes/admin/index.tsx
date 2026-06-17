import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import {
  Mail, Phone, Car, Clock, Trash2, CheckCircle,
  Circle, LogOut, Users, MessageSquare, RefreshCw,
} from "lucide-react";
import {
  adminLogin,
  getSubmissions,
  markSubmissionRead,
  deleteSubmissionFn,
  type Submission,
} from "@/lib/server-fns";

export const Route = createFileRoute("/admin/")({
  component: AdminPage,
});

function getToken() {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("admin_token");
}

function AdminPage() {
  const [token, setToken] = useState<string | null>(null);
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [loggingIn, setLoggingIn] = useState(false);

  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [total, setTotal] = useState(0);
  const [unread, setUnread] = useState(0);
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState<Submission | null>(null);
  const [activeTab, setActiveTab] = useState<"submissions" | "content">("submissions");

  useEffect(() => {
    const t = getToken();
    if (t) { setToken(t); void fetchSubmissions(t); }
  }, []);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoggingIn(true);
    setLoginError("");
    try {
      const result = await adminLogin({ data: { password } });
      localStorage.setItem("admin_token", result.token);
      setToken(result.token);
      void fetchSubmissions(result.token);
    } catch (err) {
      setLoginError(err instanceof Error ? err.message : "Login failed");
    } finally {
      setLoggingIn(false);
    }
  }

  async function fetchSubmissions(t: string) {
    setLoading(true);
    try {
      const result = await getSubmissions({ data: { token: t } });
      setSubmissions(result.submissions);
      setTotal(result.total);
      setUnread(result.unread);
    } catch {
      // ignore
    } finally {
      setLoading(false);
    }
  }

  async function markRead(id: string, read: boolean) {
    if (!token) return;
    await markSubmissionRead({ data: { token, id, read } });
    setSubmissions((s) => s.map((x) => (x._id === id ? { ...x, read } : x)));
    setUnread((u) => read ? Math.max(0, u - 1) : u + 1);
    if (selected?._id === id) setSelected((s) => s ? { ...s, read } : s);
  }

  async function deleteSubmission(id: string) {
    if (!token) return;
    if (!confirm("Delete this submission?")) return;
    await deleteSubmissionFn({ data: { token, id } });
    setSubmissions((s) => s.filter((x) => x._id !== id));
    setTotal((t) => Math.max(0, t - 1));
    if (selected?._id === id) setSelected(null);
  }

  function logout() {
    localStorage.removeItem("admin_token");
    setToken(null);
    setSubmissions([]);
    setSelected(null);
  }

  // ── Login Screen ──────────────────────────────────────────────────────────────
  if (!token) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-primary to-[oklch(0.22_0.06_260)] px-4">
        <div className="w-full max-w-sm rounded-3xl bg-white p-8 shadow-2xl">
          <div className="mb-6 text-center">
            <div className="mx-auto mb-4 grid h-14 w-14 place-items-center rounded-2xl bg-primary text-white">
              <Car className="h-7 w-7" />
            </div>
            <h1 className="text-2xl font-extrabold text-ink">Admin Panel</h1>
            <p className="mt-1 text-sm text-ink-soft">Sleek Automotive And Fleet Specialists</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-ink-soft">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-2xl border border-border px-4 py-3 text-sm outline-none transition focus:border-primary"
                placeholder="Enter admin password"
                required
              />
            </div>
            {loginError && <p className="text-sm text-red-500">{loginError}</p>}
            <button
              type="submit"
              disabled={loggingIn}
              className="w-full rounded-2xl bg-gradient-to-r from-[oklch(0.78_0.17_60)] to-[oklch(0.68_0.19_45)] py-3.5 text-sm font-semibold text-white shadow-lg transition hover:opacity-90 disabled:opacity-60"
            >
              {loggingIn ? "Signing in…" : "Sign In"}
            </button>
          </form>
        </div>
      </div>
    );
  }

  // ── Dashboard ─────────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top bar */}
      <header className="border-b border-border bg-white px-6 py-4 shadow-sm">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="grid h-9 w-9 place-items-center rounded-xl bg-primary text-white">
              <Car className="h-5 w-5" />
            </div>
            <div>
              <div className="text-sm font-extrabold text-ink">Sleek Automotive</div>
              <div className="text-xs text-ink-soft">Admin Dashboard</div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => token && fetchSubmissions(token)}
              className="grid h-9 w-9 place-items-center rounded-xl border border-border bg-white text-ink-soft transition hover:text-primary"
              aria-label="Refresh"
            >
              <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
            </button>
            <button
              onClick={logout}
              className="flex items-center gap-2 rounded-xl border border-border px-3 py-2 text-sm font-medium text-ink-soft transition hover:text-red-500"
            >
              <LogOut className="h-4 w-4" /> Logout
            </button>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-6 py-8">
        {/* Stats */}
        <div className="mb-8 grid grid-cols-2 gap-4 sm:grid-cols-3">
          <StatCard icon={Users} label="Total Enquiries" value={total} color="bg-blue-50 text-blue-600" />
          <StatCard icon={MessageSquare} label="Unread" value={unread} color="bg-orange-50 text-orange-500" />
          <StatCard icon={CheckCircle} label="Read" value={total - unread} color="bg-green-50 text-green-600" />
        </div>

        {/* Tabs */}
        <div className="mb-6 flex gap-2">
          {(["submissions", "content"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`rounded-full px-5 py-2 text-sm font-semibold capitalize transition ${
                activeTab === tab
                  ? "bg-primary text-white"
                  : "border border-border bg-white text-ink-soft hover:text-primary"
              }`}
            >
              {tab === "submissions" ? "Contact Submissions" : "Site Content"}
            </button>
          ))}
        </div>

        {activeTab === "submissions" && (
          <div className="grid gap-6 lg:grid-cols-12">
            {/* List */}
            <div className="lg:col-span-5">
              <div className="overflow-hidden rounded-2xl border border-border bg-white shadow-sm">
                <div className="border-b border-border px-5 py-4 flex items-center justify-between">
                  <h2 className="font-extrabold text-ink">Enquiries</h2>
                  {loading && <span className="text-xs text-ink-soft">Loading…</span>}
                </div>
                {submissions.length === 0 && !loading && (
                  <div className="px-5 py-10 text-center text-sm text-ink-soft">No submissions yet.</div>
                )}
                <ul className="divide-y divide-border max-h-[600px] overflow-y-auto">
                  {submissions.map((s) => (
                    <li
                      key={s._id}
                      onClick={() => {
                        setSelected(s);
                        if (!s.read) void markRead(s._id, true);
                      }}
                      className={`flex cursor-pointer items-start gap-3 px-5 py-4 transition hover:bg-gray-50 ${
                        selected?._id === s._id ? "bg-primary/5 border-l-2 border-primary" : ""
                      }`}
                    >
                      <div className="mt-1 shrink-0">
                        {s.read
                          ? <CheckCircle className="h-4 w-4 text-green-400" />
                          : <Circle className="h-4 w-4 text-[oklch(0.78_0.17_60)]" />
                        }
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className={`text-sm font-semibold truncate ${s.read ? "text-ink-soft" : "text-ink"}`}>
                          {s.name}
                        </div>
                        <div className="truncate text-xs text-ink-soft">{s.service}</div>
                        <div className="mt-0.5 text-[11px] text-ink-soft/70">
                          {new Date(s.createdAt).toLocaleDateString("en-GB", {
                            day: "2-digit", month: "short", year: "numeric",
                            hour: "2-digit", minute: "2-digit",
                          })}
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Detail */}
            <div className="lg:col-span-7">
              {selected ? (
                <div className="rounded-2xl border border-border bg-white p-6 shadow-sm">
                  <div className="mb-5 flex items-start justify-between gap-4">
                    <div>
                      <h2 className="text-xl font-extrabold text-ink">{selected.name}</h2>
                      <span className="mt-1 inline-block rounded-full bg-primary/10 px-3 py-0.5 text-xs font-semibold text-primary">
                        {selected.service}
                      </span>
                    </div>
                    <div className="flex shrink-0 gap-2">
                      <button
                        onClick={() => void markRead(selected._id, !selected.read)}
                        className="rounded-xl border border-border px-3 py-1.5 text-xs font-medium text-ink-soft transition hover:text-primary"
                      >
                        {selected.read ? "Mark unread" : "Mark read"}
                      </button>
                      <button
                        onClick={() => void deleteSubmission(selected._id)}
                        className="rounded-xl border border-red-200 bg-red-50 px-3 py-1.5 text-xs font-medium text-red-500 transition hover:bg-red-100"
                        aria-label="Delete"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>

                  <div className="grid gap-3 sm:grid-cols-2">
                    <InfoRow icon={Mail} label="Email" value={selected.email} href={`mailto:${selected.email}`} />
                    <InfoRow icon={Phone} label="Phone" value={selected.phone || "—"} href={selected.phone ? `tel:${selected.phone}` : undefined} />
                    <InfoRow icon={Car} label="Vehicle Reg" value={selected.reg || "—"} />
                    <InfoRow icon={Clock} label="Submitted" value={new Date(selected.createdAt).toLocaleString("en-GB")} />
                  </div>

                  {selected.message && (
                    <div className="mt-5">
                      <div className="mb-2 text-xs font-semibold uppercase tracking-wider text-ink-soft">Message</div>
                      <p className="rounded-2xl bg-gray-50 p-4 text-sm leading-relaxed text-ink whitespace-pre-wrap">
                        {selected.message}
                      </p>
                    </div>
                  )}

                  <div className="mt-5 flex flex-wrap gap-3">
                    <a
                      href={`mailto:${selected.email}`}
                      className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-white transition hover:opacity-90"
                    >
                      <Mail className="h-4 w-4" /> Reply by Email
                    </a>
                    {selected.phone && (
                      <a
                        href={`tel:${selected.phone}`}
                        className="inline-flex items-center gap-2 rounded-full border border-border bg-white px-5 py-2.5 text-sm font-semibold text-ink transition hover:border-primary"
                      >
                        <Phone className="h-4 w-4" /> Call
                      </a>
                    )}
                  </div>
                </div>
              ) : (
                <div className="flex h-64 items-center justify-center rounded-2xl border border-dashed border-border bg-white text-sm text-ink-soft">
                  Select an enquiry to view details
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === "content" && <ContentPanel />}
      </div>
    </div>
  );
}

// ── Sub-components ─────────────────────────────────────────────────────────────

function StatCard({
  icon: Icon, label, value, color,
}: { icon: React.ElementType; label: string; value: number; color: string }) {
  return (
    <div className="rounded-2xl border border-border bg-white p-5 shadow-sm">
      <div className={`mb-3 grid h-10 w-10 place-items-center rounded-xl ${color}`}>
        <Icon className="h-5 w-5" />
      </div>
      <div className="text-2xl font-extrabold text-ink">{value}</div>
      <div className="mt-0.5 text-xs text-ink-soft">{label}</div>
    </div>
  );
}

function InfoRow({
  icon: Icon, label, value, href,
}: { icon: React.ElementType; label: string; value: string; href?: string }) {
  return (
    <div className="rounded-xl bg-gray-50 p-3">
      <div className="mb-1 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-ink-soft">
        <Icon className="h-3 w-3" /> {label}
      </div>
      {href ? (
        <a href={href} className="text-sm font-medium text-primary hover:underline break-all">{value}</a>
      ) : (
        <span className="text-sm font-medium text-ink">{value}</span>
      )}
    </div>
  );
}

function ContentPanel() {
  const fields = [
    { label: "Business Name", value: "Sleek Automotive And Fleet Specialists" },
    { label: "Phone", value: "01204 000 000" },
    { label: "Email", value: "info@sleekautomotive.uk" },
    { label: "Address", value: "Unit 4, Bolton Industrial Estate, Bolton, BL1 2AB" },
    { label: "Hours (Weekdays)", value: "Mon–Fri 8:00–18:00" },
    { label: "Hours (Saturday)", value: "Sat 9:00–14:00" },
  ];
  return (
    <div className="rounded-2xl border border-border bg-white p-6 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="font-extrabold text-ink">Site Content</h2>
        <span className="rounded-full bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-600">
          Read-only — edit in source code
        </span>
      </div>
      <p className="mb-6 text-sm text-ink-soft">
        Current values used across the website. To update them, edit the source files and redeploy.
      </p>
      <div className="grid gap-4 sm:grid-cols-2">
        {fields.map((f) => (
          <div key={f.label} className="rounded-xl bg-gray-50 p-4">
            <div className="mb-1 text-xs font-semibold uppercase tracking-wider text-ink-soft">{f.label}</div>
            <div className="text-sm font-medium text-ink">{f.value}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
