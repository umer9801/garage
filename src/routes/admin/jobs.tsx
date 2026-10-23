import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import {
  Car,
  Plus,
  Search,
  Filter,
  Calendar,
  Clock,
  CheckCircle,
  XCircle,
  Loader,
  Trash2,
  Eye,
  Edit,
  Phone,
  Mail,
  FileText,
  Download,
} from "lucide-react";
import {
  getJobs,
  lookupVehicle,
  createJob,
  updateJob,
  deleteJob,
  generateInvoice,
  getInvoices,
  type Job,
} from "@/lib/server-fns";
import { motion, AnimatePresence } from "motion/react";
import { generateCalendarEventUrl, getEmbedCalendarUrl } from "@/lib/google-calendar";

export const Route = createFileRoute("/admin/jobs")({
  component: JobsPage,
});

function getToken() {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("admin_token");
}

const SERVICES = [
  "MOT Test",
  "Full Service",
  "Interim Service",
  "Oil Change",
  "Brake Check",
  "Brake Replacement",
  "Tyre Replacement",
  "Wheel Alignment",
  "Diagnostics",
  "Engine Repair",
  "Clutch Replacement",
  "Exhaust Repair",
  "Air Con Service",
  "Battery Replacement",
  "Other",
];

function JobsPage() {
  const [token, setToken] = useState<string | null>(null);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(false);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"list" | "calendar">("list");
  const [showInvoiceModal, setShowInvoiceModal] = useState(false);

  useEffect(() => {
    const t = getToken();
    if (t) {
      setToken(t);
      void fetchJobs(t);
    } else {
      window.location.href = "/admin";
    }
  }, []);

  async function fetchJobs(t: string, status?: string) {
    setLoading(true);
    try {
      const result = await getJobs({
        data: {
          token: t,
          status: status || filterStatus,
          search: searchQuery || undefined,
        },
      });
      setJobs(result.jobs);
    } catch (err) {
      console.error("fetchJobs error:", err);
    } finally {
      setLoading(false);
    }
  }

  async function handleStatusChange(jobId: string, newStatus: Job["status"]) {
    if (!token) return;
    try {
      await updateJob({ data: { token, id: jobId, status: newStatus } });
      await fetchJobs(token);
    } catch (err) {
      console.error("Status update error:", err);
      alert("Failed to update status");
    }
  }

  async function handleDeleteJob(jobId: string) {
    if (!token) return;
    if (!confirm("Delete this job? This cannot be undone.")) return;
    try {
      await deleteJob({ data: { token, id: jobId } });
      await fetchJobs(token);
      if (selectedJob?._id === jobId) setSelectedJob(null);
    } catch (err) {
      console.error("Delete error:", err);
      alert("Failed to delete job");
    }
  }

  async function handleGenerateInvoice(jobId: string) {
    if (!token) return;

    // Show invoice generation modal
    const job = jobs.find((j) => j._id === jobId);
    if (!job) return;

    setSelectedJob(job);
    setShowInvoiceModal(true);
  }

  const filteredJobs = jobs;

  const stats = {
    total: jobs.length,
    pending: jobs.filter((j) => j.status === "pending").length,
    inProgress: jobs.filter((j) => j.status === "in_progress").length,
    completed: jobs.filter((j) => j.status === "completed").length,
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="border-b border-border bg-white px-6 py-4 shadow-sm">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="grid h-9 w-9 place-items-center rounded-xl bg-primary text-white">
              <Car className="h-5 w-5" />
            </div>
            <div>
              <div className="text-sm font-extrabold text-ink">Job Management</div>
              <div className="text-xs text-ink-soft">Schedule & track all jobs</div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            {/* View Mode Toggle */}
            <div className="flex rounded-xl border border-border bg-white p-1">
              <button
                onClick={() => setViewMode("list")}
                className={`flex items-center gap-2 rounded-lg px-3 py-1.5 text-sm font-medium transition ${
                  viewMode === "list" ? "bg-primary text-white" : "text-ink-soft hover:text-primary"
                }`}
              >
                <Search className="h-4 w-4" />
                List
              </button>
              <button
                onClick={() => setViewMode("calendar")}
                className={`flex items-center gap-2 rounded-lg px-3 py-1.5 text-sm font-medium transition ${
                  viewMode === "calendar"
                    ? "bg-primary text-white"
                    : "text-ink-soft hover:text-primary"
                }`}
              >
                <Calendar className="h-4 w-4" />
                Calendar
              </button>
            </div>
            <button
              onClick={() => (window.location.href = "/admin")}
              className="text-sm text-ink-soft hover:text-primary"
            >
              ← Back to Dashboard
            </button>
            <button
              onClick={() => setShowCreateForm(true)}
              className="flex items-center gap-2 rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-white transition hover:opacity-90"
            >
              <Plus className="h-4 w-4" /> Create Job
            </button>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-6 py-8">
        {/* Stats */}
        <div className="mb-8 grid grid-cols-4 gap-4">
          <StatCard label="Total Jobs" value={stats.total} color="bg-blue-50 text-blue-600" />
          <StatCard label="Pending" value={stats.pending} color="bg-orange-50 text-orange-500" />
          <StatCard
            label="In Progress"
            value={stats.inProgress}
            color="bg-purple-50 text-purple-600"
          />
          <StatCard label="Completed" value={stats.completed} color="bg-green-50 text-green-600" />
        </div>

        {/* Filters */}
        <div className="mb-6 flex flex-wrap items-center gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-soft" />
            <input
              type="text"
              placeholder="Search by reg number or customer name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && token) {
                  void fetchJobs(token);
                }
              }}
              className="w-full rounded-xl border border-border bg-white py-2 pl-10 pr-4 text-sm outline-none transition focus:border-primary"
            />
          </div>
          <select
            value={filterStatus}
            onChange={(e) => {
              setFilterStatus(e.target.value);
              if (token) void fetchJobs(token, e.target.value);
            }}
            className="rounded-xl border border-border bg-white px-4 py-2 text-sm outline-none transition focus:border-primary"
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="in_progress">In Progress</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>
          <button
            onClick={() => token && fetchJobs(token)}
            className="rounded-xl border border-border bg-white px-4 py-2 text-sm transition hover:border-primary"
          >
            {loading ? <Loader className="h-4 w-4 animate-spin" /> : "Refresh"}
          </button>
        </div>

        {/* Jobs List */}
        {viewMode === "list" ? (
          <div className="rounded-2xl border border-border bg-white shadow-sm">
            {filteredJobs.length === 0 && !loading ? (
              <div className="px-5 py-16 text-center text-sm text-ink-soft">
                No jobs found. Click "Create Job" to add one.
              </div>
            ) : (
              <div className="divide-y divide-border">
                {filteredJobs.map((job) => (
                  <JobRow
                    key={job._id}
                    job={job}
                    onStatusChange={handleStatusChange}
                    onDelete={handleDeleteJob}
                    onView={() => setSelectedJob(job)}
                    onGenerateInvoice={handleGenerateInvoice}
                  />
                ))}
              </div>
            )}
          </div>
        ) : (
          /* Calendar View */
          <div className="rounded-2xl border border-border bg-white shadow-sm overflow-hidden">
            <div className="border-b border-border bg-gray-50 px-6 py-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Calendar className="h-5 w-5 text-primary" />
                  <h3 className="font-bold text-ink">Sleek Automotive Calendar</h3>
                </div>
                <a
                  href="https://calendar.app.google/uq4sYJqA9JE8FM8h9"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 rounded-lg bg-primary px-3 py-1.5 text-sm font-semibold text-white transition hover:opacity-90"
                >
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                    />
                  </svg>
                  Open in Google Calendar
                </a>
              </div>
            </div>
            <div className="relative w-full" style={{ height: "700px" }}>
              <iframe
                src={getEmbedCalendarUrl("uq4sYJqA9JE8FM8h9")}
                style={{ border: 0 }}
                width="100%"
                height="100%"
                frameBorder="0"
                scrolling="no"
                title="Sleek Automotive Calendar"
                className="w-full h-full"
              />
            </div>
          </div>
        )}
      </div>

      {/* Create Job Modal */}
      <AnimatePresence>
        {showCreateForm && token && (
          <CreateJobModal
            token={token}
            onClose={() => setShowCreateForm(false)}
            onSuccess={() => {
              setShowCreateForm(false);
              void fetchJobs(token);
            }}
          />
        )}
      </AnimatePresence>

      {/* Job Details Modal */}
      <AnimatePresence>
        {selectedJob && !showInvoiceModal && (
          <JobDetailsModal job={selectedJob} onClose={() => setSelectedJob(null)} />
        )}
      </AnimatePresence>

      {/* Invoice Modal */}
      <AnimatePresence>
        {selectedJob && showInvoiceModal && token && (
          <InvoiceModal
            job={selectedJob}
            token={token}
            onClose={() => {
              setShowInvoiceModal(false);
              setSelectedJob(null);
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

// Components
function StatCard({ label, value, color }: { label: string; value: number; color: string }) {
  return (
    <div className="rounded-2xl border border-border bg-white p-5 shadow-sm">
      <div className="text-2xl font-extrabold text-ink">{value}</div>
      <div className="mt-0.5 text-xs text-ink-soft">{label}</div>
    </div>
  );
}

function JobRow({
  job,
  onStatusChange,
  onDelete,
  onView,
  onGenerateInvoice,
}: {
  job: Job;
  onStatusChange: (id: string, status: Job["status"]) => void;
  onDelete: (id: string) => void;
  onView: () => void;
  onGenerateInvoice: (jobId: string) => void;
}) {
  const statusColors = {
    pending: "bg-orange-50 text-orange-600 border-orange-200",
    in_progress: "bg-purple-50 text-purple-600 border-purple-200",
    completed: "bg-green-50 text-green-600 border-green-200",
    cancelled: "bg-gray-50 text-gray-600 border-gray-200",
  };

  const date = new Date(job.scheduledDate);
  const formattedDate = date.toLocaleDateString("en-GB", { day: "2-digit", month: "short" });

  return (
    <div className="flex items-center gap-4 px-5 py-4 transition hover:bg-gray-50">
      <div className="flex-1">
        <div className="flex items-center gap-3">
          <span className="font-mono text-sm font-bold text-ink">{job.vehicleReg}</span>
          <span className="text-sm text-ink-soft">
            {job.vehicleMake} {job.vehicleModel} ({job.vehicleYear})
          </span>
        </div>
        <div className="mt-1 text-sm text-ink-soft">{job.customerName}</div>
        <div className="mt-1 flex flex-wrap gap-1">
          {job.services.slice(0, 2).map((service) => (
            <span
              key={service}
              className="rounded-full bg-surface px-2 py-0.5 text-xs text-ink-soft"
            >
              {service}
            </span>
          ))}
          {job.services.length > 2 && (
            <span className="rounded-full bg-surface px-2 py-0.5 text-xs text-ink-soft">
              +{job.services.length - 2} more
            </span>
          )}
        </div>
      </div>
      <div className="text-right">
        <div className="text-sm font-semibold text-ink">{formattedDate}</div>
        <div className="mt-1 text-xs text-ink-soft">
          {date.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" })}
        </div>
      </div>
      <select
        value={job.status}
        onChange={(e) => onStatusChange(job._id, e.target.value as Job["status"])}
        className={`rounded-lg border px-3 py-1.5 text-xs font-semibold transition ${statusColors[job.status]}`}
      >
        <option value="pending">Pending</option>
        <option value="in_progress">In Progress</option>
        <option value="completed">Completed</option>
        <option value="cancelled">Cancelled</option>
      </select>
      <div className="flex gap-2">
        <button
          onClick={onView}
          className="rounded-lg border border-border bg-white p-2 transition hover:border-primary"
          aria-label="View"
        >
          <Eye className="h-4 w-4" />
        </button>
        {job.status === "completed" && (
          <button
            onClick={() => onGenerateInvoice(job._id)}
            className="rounded-lg border border-green-200 bg-green-50 p-2 text-green-600 transition hover:bg-green-100"
            aria-label="Generate Invoice"
            title="Generate Invoice"
          >
            <FileText className="h-4 w-4" />
          </button>
        )}
        <button
          onClick={() => onDelete(job._id)}
          className="rounded-lg border border-red-200 bg-red-50 p-2 text-red-500 transition hover:bg-red-100"
          aria-label="Delete"
        >
          <Trash2 className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}

// Create Job Modal Component
function CreateJobModal({
  token,
  onClose,
  onSuccess,
}: {
  token: string;
  onClose: () => void;
  onSuccess: () => void;
}) {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [lookupLoading, setLookupLoading] = useState(false);
  const [vehicleReg, setVehicleReg] = useState("");

  // Vehicle data from MOT lookup
  const [vehicleData, setVehicleData] = useState<any>(null);

  // Form data
  const [formData, setFormData] = useState({
    vehicleMake: "",
    vehicleModel: "",
    vehicleYear: new Date().getFullYear(),
    vehicleColor: "",
    fuelType: "",
    motExpiry: "",
    customerName: "",
    customerPhone: "",
    customerEmail: "",
    services: [] as string[],
    scheduledDate: new Date().toISOString().split("T")[0],
    scheduledTime: "09:00", // Default 9 AM
    notes: "",
  });

  const [customServiceText, setCustomServiceText] = useState("");

  async function handleLookupVehicle() {
    if (!vehicleReg || vehicleReg.length < 2) {
      alert("Please enter a valid registration number");
      return;
    }

    setLookupLoading(true);
    try {
      const result = await lookupVehicle({ data: { token, registration: vehicleReg } });

      if (result.success && result.vehicle) {
        setVehicleData(result.vehicle);
        setFormData((prev) => ({
          ...prev,
          vehicleMake: result.vehicle.make || "",
          vehicleModel: result.vehicle.model || "",
          vehicleYear: result.vehicle.year || new Date().getFullYear(),
          vehicleColor: result.vehicle.color || "",
          fuelType: result.vehicle.fuelType || "",
          motExpiry: result.vehicle.motExpiry || "",
        }));
        alert("✅ Vehicle details loaded successfully!");
      }
    } catch (err) {
      console.error("Lookup error:", err);
      alert(err instanceof Error ? err.message : "Failed to lookup vehicle");
    } finally {
      setLookupLoading(false);
    }
  }

  async function handleSubmit() {
    // Validation
    if (!vehicleReg) return alert("Vehicle registration is required");
    if (!formData.vehicleMake) return alert("Vehicle make is required");
    if (!formData.customerName) return alert("Customer name is required");
    if (!formData.customerPhone) return alert("Customer phone is required");
    if (formData.services.length === 0) return alert("Please select at least one service");

    // Check if "Other" is selected but no custom text provided
    if (formData.services.includes("Other") && !customServiceText.trim()) {
      return alert("Please specify the custom service in the 'Other' field");
    }

    // Replace "Other" with custom text if provided
    const finalServices = formData.services.map((service) =>
      service === "Other" ? customServiceText.trim() : service,
    );

    setLoading(true);
    try {
      await createJob({
        data: {
          token,
          vehicleReg,
          vehicleMake: formData.vehicleMake,
          vehicleModel: formData.vehicleModel,
          vehicleYear: formData.vehicleYear,
          vehicleColor: formData.vehicleColor,
          fuelType: formData.fuelType,
          motExpiry: formData.motExpiry,
          customerName: formData.customerName,
          customerPhone: formData.customerPhone,
          customerEmail: formData.customerEmail,
          services: finalServices,
          scheduledDate: formData.scheduledDate,
          notes: formData.notes,
        },
      });

      // Generate Google Calendar event link using helper with scheduled time
      const [hours, minutes] = formData.scheduledTime.split(":").map(Number);
      const startDateTime = new Date(formData.scheduledDate);
      startDateTime.setHours(hours, minutes, 0, 0);

      const endDateTime = new Date(startDateTime);
      endDateTime.setHours(hours + 2, minutes, 0, 0); // 2 hours duration

      const calendarUrl = generateCalendarEventUrl({
        title: `${vehicleReg} - ${formData.customerName} - ${finalServices[0]}`,
        description: `Vehicle: ${formData.vehicleMake} ${formData.vehicleModel} (${vehicleReg})\nCustomer: ${formData.customerName} (${formData.customerPhone})\nServices: ${finalServices.join(", ")}\n${formData.notes ? "\nNotes: " + formData.notes : ""}`,
        startDate: startDateTime,
        endDate: endDateTime,
        location: "Sleek Automotive Garage",
      });

      const shouldOpenCalendar = confirm(
        "✅ Job created successfully!\n\nWould you like to add this to Google Calendar now?",
      );
      if (shouldOpenCalendar) {
        window.open(calendarUrl, "_blank");
      }

      onSuccess();
    } catch (err) {
      console.error("Create job error:", err);
      alert(err instanceof Error ? err.message : "Failed to create job");
    } finally {
      setLoading(false);
    }
  }

  function toggleService(service: string) {
    setFormData((prev) => ({
      ...prev,
      services: prev.services.includes(service)
        ? prev.services.filter((s) => s !== service)
        : [...prev.services, service],
    }));
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 overflow-y-auto"
    >
      <motion.div
        initial={{ scale: 0.95, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.95, y: 20 }}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-2xl bg-white p-8 shadow-2xl my-8"
      >
        <h2 className="text-2xl font-extrabold text-ink">Create New Job</h2>
        <p className="mt-1 text-sm text-ink-soft">Fill in the details below to create a new job</p>

        <div className="mt-8 space-y-6">
          {/* Step 1: Vehicle Lookup */}
          <div className="rounded-xl border border-border bg-gray-50 p-6">
            <h3 className="font-bold text-ink">1. Vehicle Details</h3>

            <div className="mt-4 flex gap-3">
              <input
                type="text"
                placeholder="e.g., AB12XYZ"
                value={vehicleReg}
                onChange={(e) => setVehicleReg(e.target.value.toUpperCase())}
                className="flex-1 rounded-xl border border-border px-4 py-2 text-sm outline-none focus:border-primary"
              />
              <button
                onClick={handleLookupVehicle}
                disabled={lookupLoading}
                className="flex items-center gap-2 rounded-xl bg-primary px-6 py-2 text-sm font-semibold text-white transition hover:opacity-90 disabled:opacity-50"
              >
                {lookupLoading ? (
                  <>
                    <Loader className="h-4 w-4 animate-spin" />
                    Looking up...
                  </>
                ) : (
                  <>
                    <Search className="h-4 w-4" />
                    Lookup MOT
                  </>
                )}
              </button>
              <button
                onClick={() => {
                  const reg = vehicleReg.trim().toUpperCase().replace(/\s/g, "");
                  if (reg) {
                    window.open(
                      `https://www.check-mot.service.gov.uk/?registration=${reg}`,
                      "_blank",
                    );
                  } else {
                    window.open("https://www.check-mot.service.gov.uk/", "_blank");
                  }
                }}
                className="flex items-center gap-2 rounded-xl border-2 border-primary bg-white px-4 py-2 text-sm font-semibold text-primary transition hover:bg-primary hover:text-white"
                title="Open MOT website to check vehicle details"
              >
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                  />
                </svg>
                Check MOT
              </button>
            </div>

            {vehicleData && (
              <div className="mt-4 rounded-lg bg-green-50 border border-green-200 p-4">
                <div className="flex items-center gap-2 text-sm font-semibold text-green-700">
                  <CheckCircle className="h-4 w-4" />
                  Vehicle found in MOT database
                </div>
                <div className="mt-2 text-xs text-green-600">
                  {vehicleData.make} {vehicleData.model} ({vehicleData.year})
                  {vehicleData.motExpiry &&
                    ` • MOT Exp: ${new Date(vehicleData.motExpiry).toLocaleDateString("en-GB")}`}
                </div>
              </div>
            )}

            <div className="mt-3 rounded-lg bg-blue-50 border border-blue-200 p-3">
              <div className="flex items-center gap-2 text-xs text-blue-700">
                <svg className="h-3.5 w-3.5" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>
                  Click "Check MOT" to open government website in new tab, then manually fill the
                  form below
                </span>
              </div>
            </div>

            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-ink-soft">
                  Make
                </label>
                <input
                  type="text"
                  value={formData.vehicleMake}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, vehicleMake: e.target.value }))
                  }
                  className="mt-1 w-full rounded-xl border border-border px-4 py-2 text-sm outline-none focus:border-primary"
                />
              </div>
              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-ink-soft">
                  Model
                </label>
                <input
                  type="text"
                  value={formData.vehicleModel}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, vehicleModel: e.target.value }))
                  }
                  className="mt-1 w-full rounded-xl border border-border px-4 py-2 text-sm outline-none focus:border-primary"
                />
              </div>
              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-ink-soft">
                  Year
                </label>
                <input
                  type="number"
                  value={formData.vehicleYear}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, vehicleYear: parseInt(e.target.value) }))
                  }
                  className="mt-1 w-full rounded-xl border border-border px-4 py-2 text-sm outline-none focus:border-primary"
                />
              </div>
              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-ink-soft">
                  Color
                </label>
                <input
                  type="text"
                  value={formData.vehicleColor}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, vehicleColor: e.target.value }))
                  }
                  className="mt-1 w-full rounded-xl border border-border px-4 py-2 text-sm outline-none focus:border-primary"
                />
              </div>
            </div>
          </div>

          {/* Step 2: Customer Details */}
          <div className="rounded-xl border border-border bg-gray-50 p-6">
            <h3 className="font-bold text-ink">2. Customer Details</h3>

            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-ink-soft">
                  Name *
                </label>
                <input
                  type="text"
                  value={formData.customerName}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, customerName: e.target.value }))
                  }
                  className="mt-1 w-full rounded-xl border border-border px-4 py-2 text-sm outline-none focus:border-primary"
                />
              </div>
              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-ink-soft">
                  Phone *
                </label>
                <input
                  type="tel"
                  value={formData.customerPhone}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, customerPhone: e.target.value }))
                  }
                  className="mt-1 w-full rounded-xl border border-border px-4 py-2 text-sm outline-none focus:border-primary"
                />
              </div>
              <div className="sm:col-span-2">
                <label className="text-xs font-semibold uppercase tracking-wider text-ink-soft">
                  Email
                </label>
                <input
                  type="email"
                  value={formData.customerEmail}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, customerEmail: e.target.value }))
                  }
                  className="mt-1 w-full rounded-xl border border-border px-4 py-2 text-sm outline-none focus:border-primary"
                />
              </div>
            </div>
          </div>

          {/* Step 3: Services */}
          <div className="rounded-xl border border-border bg-gray-50 p-6">
            <h3 className="font-bold text-ink">3. Services Required *</h3>

            <div className="mt-4 grid gap-2 sm:grid-cols-3">
              {SERVICES.map((service) => (
                <label key={service} className="flex items-center gap-2 text-sm cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.services.includes(service)}
                    onChange={() => toggleService(service)}
                    className="h-4 w-4 rounded border-border text-primary focus:ring-primary"
                  />
                  <span className="text-ink">{service}</span>
                </label>
              ))}
            </div>

            {/* Custom Service Input - shows when "Other" is selected */}
            {formData.services.includes("Other") && (
              <div className="mt-4">
                <label className="text-xs font-semibold uppercase tracking-wider text-ink-soft">
                  Specify Custom Service *
                </label>
                <input
                  type="text"
                  value={customServiceText}
                  onChange={(e) => setCustomServiceText(e.target.value)}
                  placeholder="Enter custom service details..."
                  className="mt-1 w-full rounded-xl border border-border px-4 py-2 text-sm outline-none focus:border-primary"
                />
              </div>
            )}
          </div>

          {/* Step 4: Schedule */}
          <div className="rounded-xl border border-border bg-gray-50 p-6">
            <h3 className="font-bold text-ink">4. Schedule & Notes</h3>

            <div className="mt-4 space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="text-xs font-semibold uppercase tracking-wider text-ink-soft">
                    Scheduled Date *
                  </label>
                  <input
                    type="date"
                    value={formData.scheduledDate}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, scheduledDate: e.target.value }))
                    }
                    className="mt-1 w-full rounded-xl border border-border px-4 py-2 text-sm outline-none focus:border-primary"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold uppercase tracking-wider text-ink-soft">
                    Scheduled Time *
                  </label>
                  <input
                    type="time"
                    value={formData.scheduledTime}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, scheduledTime: e.target.value }))
                    }
                    className="mt-1 w-full rounded-xl border border-border px-4 py-2 text-sm outline-none focus:border-primary"
                  />
                </div>
              </div>
              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-ink-soft">
                  Notes
                </label>
                <textarea
                  value={formData.notes}
                  onChange={(e) => setFormData((prev) => ({ ...prev, notes: e.target.value }))}
                  rows={3}
                  className="mt-1 w-full rounded-xl border border-border px-4 py-2 text-sm outline-none focus:border-primary"
                  placeholder="Any additional information..."
                />
              </div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="mt-8 flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 rounded-xl border border-border px-4 py-3 text-sm font-semibold transition hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="flex-1 rounded-xl bg-primary px-4 py-3 text-sm font-semibold text-white transition hover:opacity-90 disabled:opacity-50"
          >
            {loading ? "Creating..." : "Create Job"}
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}

function JobDetailsModal({ job, onClose }: { job: Job; onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-6"
    >
      <motion.div
        initial={{ scale: 0.95, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.95, y: 20 }}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-2xl rounded-2xl bg-white p-8 shadow-2xl"
      >
        <h2 className="text-2xl font-extrabold text-ink">Job Details</h2>

        <div className="mt-6 space-y-6">
          {/* Vehicle Info */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-ink-soft">
              Vehicle
            </h3>
            <div className="mt-2 rounded-xl bg-gray-50 p-4">
              <div className="text-lg font-bold text-ink">{job.vehicleReg}</div>
              <div className="text-sm text-ink-soft">
                {job.vehicleMake} {job.vehicleModel} ({job.vehicleYear})
              </div>
              {job.vehicleColor && (
                <div className="text-sm text-ink-soft">Color: {job.vehicleColor}</div>
              )}
              {job.motExpiry && (
                <div className="text-sm text-ink-soft">
                  MOT Expiry: {new Date(job.motExpiry).toLocaleDateString("en-GB")}
                </div>
              )}
            </div>
          </div>

          {/* Customer Info */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-ink-soft">
              Customer
            </h3>
            <div className="mt-2 space-y-2">
              <div className="flex items-center gap-2 text-sm">
                <span className="font-semibold text-ink">{job.customerName}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-ink-soft">
                <Phone className="h-3.5 w-3.5" />
                <a href={`tel:${job.customerPhone}`} className="hover:text-primary">
                  {job.customerPhone}
                </a>
              </div>
              {job.customerEmail && (
                <div className="flex items-center gap-2 text-sm text-ink-soft">
                  <Mail className="h-3.5 w-3.5" />
                  <a href={`mailto:${job.customerEmail}`} className="hover:text-primary">
                    {job.customerEmail}
                  </a>
                </div>
              )}
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-ink-soft">
              Services
            </h3>
            <div className="mt-2 flex flex-wrap gap-2">
              {job.services.map((service) => (
                <span
                  key={service}
                  className="rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary"
                >
                  {service}
                </span>
              ))}
            </div>
          </div>

          {/* Schedule & Status */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-ink-soft">
                Scheduled
              </h3>
              <div className="mt-2 text-sm text-ink">
                {new Date(job.scheduledDate).toLocaleDateString("en-GB", {
                  weekday: "long",
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </div>
              <div className="mt-1 text-sm text-ink-soft">
                {new Date(job.scheduledDate).toLocaleTimeString("en-GB", {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </div>
            </div>
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-ink-soft">
                Status
              </h3>
              <div className="mt-2 text-sm font-semibold capitalize text-ink">
                {job.status.replace("_", " ")}
              </div>
            </div>
          </div>

          {/* Notes */}
          {job.notes && (
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-ink-soft">
                Notes
              </h3>
              <div className="mt-2 rounded-xl bg-gray-50 p-4 text-sm text-ink">{job.notes}</div>
            </div>
          )}
        </div>

        <div className="mt-8 flex gap-3">
          <button
            onClick={() => {
              const jobDate = new Date(job.scheduledDate);
              const startDateTime = new Date(jobDate);
              const endDateTime = new Date(jobDate);
              endDateTime.setHours(jobDate.getHours() + 2); // 2 hours duration

              const calendarUrl = generateCalendarEventUrl({
                title: `${job.vehicleReg} - ${job.customerName} - ${job.services[0]}`,
                description: `Vehicle: ${job.vehicleMake} ${job.vehicleModel} (${job.vehicleReg})\nCustomer: ${job.customerName} (${job.customerPhone})\nServices: ${job.services.join(", ")}\n${job.notes ? "\nNotes: " + job.notes : ""}`,
                startDate: startDateTime,
                endDate: endDateTime,
                location: "Sleek Automotive Garage",
              });
              window.open(calendarUrl, "_blank");
            }}
            className="flex-1 flex items-center justify-center gap-2 rounded-xl border-2 border-primary bg-white px-4 py-3 text-sm font-semibold text-primary transition hover:bg-primary hover:text-white"
          >
            <Calendar className="h-4 w-4" />
            Add to Calendar
          </button>
          <button
            onClick={onClose}
            className="flex-1 rounded-xl bg-primary px-4 py-3 text-sm font-semibold text-white transition hover:opacity-90"
          >
            Close
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}

// Invoice Modal Component
function InvoiceModal({ job, token, onClose }: { job: Job; token: string; onClose: () => void }) {
  const [loading, setLoading] = useState(false);
  const [services, setServices] = useState<
    Array<{ name: string; price: number; quantity: number }>
  >([]);
  const [notes, setNotes] = useState("");
  const [invoiceHTML, setInvoiceHTML] = useState<string | null>(null);

  // Initialize with job services
  useEffect(() => {
    if (job.services.length > 0 && services.length === 0) {
      setServices(
        job.services.map((service) => ({
          name: service,
          price: 0,
          quantity: 1,
        })),
      );
    }
  }, [job.services]);

  function addService() {
    setServices([...services, { name: "", price: 0, quantity: 1 }]);
  }

  function updateService(index: number, field: keyof (typeof services)[0], value: string | number) {
    const updated = [...services];
    updated[index] = { ...updated[index], [field]: value };
    setServices(updated);
  }

  function removeService(index: number) {
    setServices(services.filter((_, i) => i !== index));
  }

  const subtotal = services.reduce((sum, s) => sum + s.price * s.quantity, 0);
  const vat = subtotal * 0.2;
  const total = subtotal + vat;

  async function handleGenerate() {
    if (services.length === 0) {
      alert("Please add at least one service");
      return;
    }

    if (services.some((s) => !s.name || s.price <= 0)) {
      alert("Please fill in all service details with valid prices");
      return;
    }

    setLoading(true);
    try {
      const result = await generateInvoice({
        data: {
          token,
          jobId: job._id,
          services,
          notes,
        },
      });

      setInvoiceHTML(result.html);
      alert(`✅ Invoice ${result.invoiceNumber} generated successfully!`);
    } catch (err) {
      console.error("Invoice generation error:", err);
      alert(err instanceof Error ? err.message : "Failed to generate invoice");
    } finally {
      setLoading(false);
    }
  }

  function handleDownload() {
    if (!invoiceHTML) return;

    const blob = new Blob([invoiceHTML], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `invoice-${job.vehicleReg}-${Date.now()}.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  function handlePrint() {
    if (!invoiceHTML) return;

    const printWindow = window.open("", "_blank");
    if (printWindow) {
      printWindow.document.write(invoiceHTML);
      printWindow.document.close();
      printWindow.focus();
      setTimeout(() => {
        printWindow.print();
      }, 250);
    }
  }

  if (invoiceHTML) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-6"
      >
        <motion.div
          initial={{ scale: 0.95, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.95, y: 20 }}
          onClick={(e) => e.stopPropagation()}
          className="w-full max-w-4xl max-h-[90vh] overflow-hidden rounded-2xl bg-white shadow-2xl flex flex-col"
        >
          <div className="flex items-center justify-between border-b border-border p-6">
            <h2 className="text-2xl font-extrabold text-ink">Invoice Preview</h2>
            <div className="flex gap-3">
              <button
                onClick={handlePrint}
                className="flex items-center gap-2 rounded-xl border-2 border-primary bg-white px-4 py-2 text-sm font-semibold text-primary transition hover:bg-primary hover:text-white"
              >
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"
                  />
                </svg>
                Print
              </button>
              <button
                onClick={handleDownload}
                className="flex items-center gap-2 rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-white transition hover:opacity-90"
              >
                <Download className="h-4 w-4" />
                Download
              </button>
              <button
                onClick={onClose}
                className="rounded-xl border border-border px-4 py-2 text-sm font-semibold transition hover:bg-gray-50"
              >
                Close
              </button>
            </div>
          </div>
          <div className="flex-1 overflow-y-auto p-6">
            <div dangerouslySetInnerHTML={{ __html: invoiceHTML }} />
          </div>
        </motion.div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-6 overflow-y-auto"
    >
      <motion.div
        initial={{ scale: 0.95, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.95, y: 20 }}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-3xl my-8 rounded-2xl bg-white p-8 shadow-2xl"
      >
        <h2 className="text-2xl font-extrabold text-ink">Generate Invoice</h2>
        <p className="mt-1 text-sm text-ink-soft">
          {job.vehicleReg} - {job.customerName}
        </p>

        <div className="mt-6 space-y-6">
          {/* Services */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-ink">Services & Pricing</h3>
              <button
                onClick={addService}
                className="flex items-center gap-2 rounded-lg bg-gray-100 px-3 py-1.5 text-sm font-medium transition hover:bg-gray-200"
              >
                <Plus className="h-4 w-4" />
                Add Service
              </button>
            </div>

            <div className="space-y-3">
              {services.map((service, index) => (
                <div key={index} className="flex gap-3 items-center">
                  <input
                    type="text"
                    placeholder="Service name"
                    value={service.name}
                    onChange={(e) => updateService(index, "name", e.target.value)}
                    className="flex-1 rounded-xl border border-border px-4 py-2 text-sm outline-none focus:border-primary"
                  />
                  <input
                    type="number"
                    placeholder="Price"
                    value={service.price || ""}
                    onChange={(e) => updateService(index, "price", parseFloat(e.target.value) || 0)}
                    className="w-28 rounded-xl border border-border px-4 py-2 text-sm outline-none focus:border-primary"
                  />
                  <input
                    type="number"
                    placeholder="Qty"
                    value={service.quantity}
                    onChange={(e) =>
                      updateService(index, "quantity", parseInt(e.target.value) || 1)
                    }
                    min="1"
                    className="w-20 rounded-xl border border-border px-4 py-2 text-sm outline-none focus:border-primary"
                  />
                  <button
                    onClick={() => removeService(index)}
                    className="rounded-lg border border-red-200 bg-red-50 p-2 text-red-500 transition hover:bg-red-100"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Totals */}
          <div className="rounded-xl border border-border bg-gray-50 p-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Subtotal:</span>
                <span className="font-semibold">£{subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>VAT (20%):</span>
                <span className="font-semibold">£{vat.toFixed(2)}</span>
              </div>
              <div className="flex justify-between border-t border-border pt-2 text-lg font-bold text-primary">
                <span>Total:</span>
                <span>£{total.toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Notes */}
          <div>
            <label className="text-xs font-semibold uppercase tracking-wider text-ink-soft">
              Invoice Notes (Optional)
            </label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={3}
              className="mt-1 w-full rounded-xl border border-border px-4 py-2 text-sm outline-none focus:border-primary"
              placeholder="Any additional notes for the invoice..."
            />
          </div>
        </div>

        <div className="mt-8 flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 rounded-xl border border-border px-4 py-3 text-sm font-semibold transition hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            onClick={handleGenerate}
            disabled={loading || services.length === 0}
            className="flex-1 rounded-xl bg-primary px-4 py-3 text-sm font-semibold text-white transition hover:opacity-90 disabled:opacity-50"
          >
            {loading ? "Generating..." : "Generate Invoice"}
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}
