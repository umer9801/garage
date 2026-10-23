import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { FileText, Plus, Search, Download, Printer, Eye, Trash2, Loader } from "lucide-react";
import {
  getJobs,
  getInvoices,
  generateInvoice,
  getInvoiceHTML,
  deleteInvoice,
  type Job,
} from "@/lib/server-fns";
import { motion, AnimatePresence } from "motion/react";
import { formatCurrency } from "@/lib/invoice-generator";

export const Route = createFileRoute("/admin/invoices")({
  component: InvoicesPage,
});

function getToken() {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("admin_token");
}

interface Invoice {
  _id: string;
  jobId: string;
  invoiceNumber: string;
  customerName: string;
  vehicleReg: string;
  vehicleMake: string;
  vehicleModel: string;
  services: string;
  subtotal: number;
  vat: number;
  total: number;
  createdAt: string;
}

function InvoicesPage() {
  const [token, setToken] = useState<string | null>(null);
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(false);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [selectedInvoiceId, setSelectedInvoiceId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const t = getToken();
    if (t) {
      setToken(t);
      void fetchInvoices(t);
      void fetchJobs(t);
    } else {
      window.location.href = "/admin";
    }
  }, []);

  async function fetchInvoices(t: string) {
    setLoading(true);
    try {
      const result = await getInvoices({ data: { token: t } });
      setInvoices(result.invoices);
    } catch (err) {
      console.error("fetchInvoices error:", err);
    } finally {
      setLoading(false);
    }
  }

  async function fetchJobs(t: string) {
    try {
      const result = await getJobs({
        data: {
          token: t,
          status: "completed", // Only completed jobs
        },
      });
      setJobs(result.jobs);
    } catch (err) {
      console.error("fetchJobs error:", err);
    }
  }

  async function handleDeleteInvoice(invoiceId: string) {
    if (!token) return;

    try {
      await deleteInvoice({ data: { token, invoiceId } });
      alert("✅ Invoice deleted successfully!");
      await fetchInvoices(token);
    } catch (err) {
      console.error("Delete invoice error:", err);
      alert(err instanceof Error ? err.message : "Failed to delete invoice");
    }
  }

  function exportToCSV() {
    if (invoices.length === 0) {
      alert("No invoices to export");
      return;
    }

    // CSV headers - complete data
    const headers = [
      "Invoice Number",
      "Date",
      "Customer Name",
      "Vehicle Reg",
      "Vehicle",
      "Services",
      "Subtotal (£)",
      "VAT (£)",
      "Total (£)",
      "Created",
    ];

    // CSV rows with proper escaping
    const rows = invoices.map((inv) => {
      const date = new Date(inv.createdAt);
      return [
        inv.invoiceNumber,
        date.toLocaleDateString("en-GB"),
        `"${inv.customerName.replace(/"/g, '""')}"`, // Escape quotes
        inv.vehicleReg,
        `"${inv.vehicleMake} ${inv.vehicleModel}"`,
        `"${inv.services.replace(/"/g, '""')}"`, // Escape quotes in services
        inv.subtotal.toFixed(2),
        inv.vat.toFixed(2),
        inv.total.toFixed(2),
        date.toLocaleString("en-GB"),
      ];
    });

    // Combine headers and rows
    const csvContent = [headers.join(","), ...rows.map((row) => row.join(","))].join("\n");

    // Create blob and download
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `invoices-${new Date().toISOString().split("T")[0]}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    alert(`✅ Exported ${invoices.length} invoices to CSV`);
  }

  const filteredInvoices = invoices.filter((inv) =>
    inv.invoiceNumber.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="border-b border-border bg-white px-6 py-4 shadow-sm">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="grid h-9 w-9 place-items-center rounded-xl bg-primary text-white">
              <FileText className="h-5 w-5" />
            </div>
            <div>
              <div className="text-sm font-extrabold text-ink">Invoice Management</div>
              <div className="text-xs text-ink-soft">Generate & manage invoices</div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={exportToCSV}
              disabled={invoices.length === 0}
              className="flex items-center gap-2 rounded-xl border-2 border-green-500 bg-white px-4 py-2 text-sm font-semibold text-green-600 transition hover:bg-green-50 disabled:opacity-50"
            >
              <Download className="h-4 w-4" />
              Export CSV
            </button>
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
              <Plus className="h-4 w-4" /> Create Invoice
            </button>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-6 py-8">
        {/* Stats */}
        <div className="mb-8 grid grid-cols-3 gap-4">
          <div className="rounded-2xl border border-border bg-white p-5 shadow-sm">
            <div className="text-2xl font-extrabold text-ink">{invoices.length}</div>
            <div className="mt-0.5 text-xs text-ink-soft">Total Invoices</div>
          </div>
          <div className="rounded-2xl border border-border bg-white p-5 shadow-sm">
            <div className="text-2xl font-extrabold text-ink">
              {formatCurrency(invoices.reduce((sum, inv) => sum + inv.total, 0))}
            </div>
            <div className="mt-0.5 text-xs text-ink-soft">Total Revenue</div>
          </div>
          <div className="rounded-2xl border border-border bg-white p-5 shadow-sm">
            <div className="text-2xl font-extrabold text-ink">
              {
                invoices.filter((inv) => {
                  const date = new Date(inv.createdAt);
                  const now = new Date();
                  return (
                    date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear()
                  );
                }).length
              }
            </div>
            <div className="mt-0.5 text-xs text-ink-soft">This Month</div>
          </div>
        </div>

        {/* Search */}
        <div className="mb-6 flex items-center gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-soft" />
            <input
              type="text"
              placeholder="Search by invoice number..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-xl border border-border bg-white py-2 pl-10 pr-4 text-sm outline-none transition focus:border-primary"
            />
          </div>
          <button
            onClick={() => token && fetchInvoices(token)}
            className="rounded-xl border border-border bg-white px-4 py-2 text-sm transition hover:border-primary"
          >
            {loading ? <Loader className="h-4 w-4 animate-spin" /> : "Refresh"}
          </button>
        </div>

        {/* Invoice List */}
        <div className="rounded-2xl border border-border bg-white shadow-sm">
          {filteredInvoices.length === 0 && !loading ? (
            <div className="px-5 py-16 text-center text-sm text-ink-soft">
              No invoices found. Click "Create Invoice" to add one.
            </div>
          ) : (
            <div className="divide-y divide-border">
              {filteredInvoices.map((invoice) => (
                <InvoiceRow
                  key={invoice._id}
                  invoice={invoice}
                  onView={() => setSelectedInvoiceId(invoice._id)}
                  onDelete={handleDeleteInvoice}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Create Invoice Modal */}
      <AnimatePresence>
        {showCreateForm && token && (
          <CreateInvoiceModal
            token={token}
            jobs={jobs}
            onClose={() => setShowCreateForm(false)}
            onSuccess={() => {
              setShowCreateForm(false);
              if (token) void fetchInvoices(token);
            }}
          />
        )}
      </AnimatePresence>

      {/* View Invoice Modal */}
      <AnimatePresence>
        {selectedInvoiceId && token && (
          <ViewInvoiceModal
            invoiceId={selectedInvoiceId}
            token={token}
            onClose={() => setSelectedInvoiceId(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

function InvoiceRow({
  invoice,
  onView,
  onDelete,
}: {
  invoice: Invoice;
  onView: () => void;
  onDelete: (id: string) => void;
}) {
  const date = new Date(invoice.createdAt);

  function handleDelete() {
    const confirmed = confirm(
      `Are you sure you want to delete invoice ${invoice.invoiceNumber}?\n\n` +
        `Customer: ${invoice.customerName}\n` +
        `Total: ${formatCurrency(invoice.total)}\n\n` +
        `This action cannot be undone.`,
    );

    if (confirmed) {
      onDelete(invoice._id);
    }
  }

  return (
    <div className="flex items-center gap-4 px-5 py-4 transition hover:bg-gray-50">
      <div className="flex-1">
        <div className="flex items-center gap-3">
          <span className="font-mono text-sm font-bold text-ink">{invoice.invoiceNumber}</span>
          <span className="text-sm text-ink-soft">{invoice.vehicleReg}</span>
        </div>
        <div className="mt-1 text-sm text-ink-soft">{invoice.customerName}</div>
        <div className="mt-1 text-xs text-ink-soft">
          {date.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })}
        </div>
      </div>
      <div className="text-right">
        <div className="text-xs text-ink-soft mb-1">
          Subtotal: {formatCurrency(invoice.subtotal)}
        </div>
        <div className="text-xs text-ink-soft mb-1">VAT: {formatCurrency(invoice.vat)}</div>
        <div className="text-lg font-bold text-primary">{formatCurrency(invoice.total)}</div>
      </div>
      <div className="flex gap-2">
        <button
          onClick={onView}
          className="rounded-lg border border-border bg-white p-2 transition hover:border-primary"
          aria-label="View"
          title="View invoice"
        >
          <Eye className="h-4 w-4" />
        </button>
        <button
          onClick={handleDelete}
          className="rounded-lg border border-red-200 bg-red-50 p-2 text-red-500 transition hover:bg-red-100"
          aria-label="Delete"
          title="Delete invoice"
        >
          <Trash2 className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}

// Create Invoice Modal
function CreateInvoiceModal({
  token,
  jobs,
  onClose,
  onSuccess,
}: {
  token: string;
  jobs: Job[];
  onClose: () => void;
  onSuccess: () => void;
}) {
  const [selectedJobId, setSelectedJobId] = useState<string>("");
  const [services, setServices] = useState<
    Array<{ name: string; price: number; quantity: number }>
  >([]);
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);

  const selectedJob = jobs.find((j) => j._id === selectedJobId);

  useEffect(() => {
    if (selectedJob && services.length === 0) {
      setServices(
        selectedJob.services.map((service) => ({
          name: service,
          price: 0,
          quantity: 1,
        })),
      );
    }
  }, [selectedJob]);

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
    if (!selectedJobId) {
      alert("Please select a job");
      return;
    }

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
      await generateInvoice({
        data: {
          token,
          jobId: selectedJobId,
          services,
          notes,
        },
      });

      alert("✅ Invoice generated successfully!");
      onSuccess();
    } catch (err) {
      console.error("Invoice generation error:", err);
      alert(err instanceof Error ? err.message : "Failed to generate invoice");
    } finally {
      setLoading(false);
    }
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
        <h2 className="text-2xl font-extrabold text-ink">Create New Invoice</h2>
        <p className="mt-1 text-sm text-ink-soft">Select a completed job and add pricing</p>

        <div className="mt-6 space-y-6">
          {/* Job Selection */}
          <div>
            <label className="text-xs font-semibold uppercase tracking-wider text-ink-soft">
              Select Job *
            </label>
            <select
              value={selectedJobId}
              onChange={(e) => {
                setSelectedJobId(e.target.value);
                setServices([]);
              }}
              className="mt-1 w-full rounded-xl border border-border px-4 py-2 text-sm outline-none focus:border-primary"
            >
              <option value="">Choose a completed job...</option>
              {jobs.map((job) => (
                <option key={job._id} value={job._id}>
                  {job.vehicleReg} - {job.customerName} (
                  {new Date(job.scheduledDate).toLocaleDateString("en-GB")})
                </option>
              ))}
            </select>
          </div>

          {selectedJob && (
            <>
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
                        placeholder="Price (£)"
                        value={service.price || ""}
                        onChange={(e) =>
                          updateService(index, "price", parseFloat(e.target.value) || 0)
                        }
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
                    <span className="font-semibold">{formatCurrency(subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>VAT (20%):</span>
                    <span className="font-semibold">{formatCurrency(vat)}</span>
                  </div>
                  <div className="flex justify-between border-t border-border pt-2 text-lg font-bold text-primary">
                    <span>Total:</span>
                    <span>{formatCurrency(total)}</span>
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
            </>
          )}
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
            disabled={loading || !selectedJobId || services.length === 0}
            className="flex-1 rounded-xl bg-primary px-4 py-3 text-sm font-semibold text-white transition hover:opacity-90 disabled:opacity-50"
          >
            {loading ? "Generating..." : "Generate Invoice"}
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}

// View Invoice Modal
function ViewInvoiceModal({
  invoiceId,
  token,
  onClose,
}: {
  invoiceId: string;
  token: string;
  onClose: () => void;
}) {
  const [invoiceHTML, setInvoiceHTML] = useState<string | null>(null);
  const [invoiceNumber, setInvoiceNumber] = useState<string>("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchInvoice() {
      try {
        const result = await getInvoiceHTML({ data: { token, invoiceId } });
        setInvoiceHTML(result.html);
        setInvoiceNumber(result.invoiceNumber);
      } catch (err) {
        console.error("Fetch invoice error:", err);
        alert("Failed to load invoice");
        onClose();
      } finally {
        setLoading(false);
      }
    }
    void fetchInvoice();
  }, [invoiceId, token]);

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

  function handleDownload() {
    if (!invoiceHTML) return;

    // Open invoice in new window for PDF saving
    const printWindow = window.open("", "_blank", "width=800,height=600");
    if (printWindow) {
      // Add print-specific styles
      const styledHTML = invoiceHTML.replace(
        "</head>",
        `<style>
          @media print {
            @page { margin: 20mm; }
            body { margin: 0; }
          }
        </style>
        <script>
          window.addEventListener('load', () => {
            // Auto-trigger print dialog after 1 second
            setTimeout(() => {
              window.print();
            }, 1000);
          });
        </script>
        </head>`
      );
      
      printWindow.document.write(styledHTML);
      printWindow.document.close();
      
      // Show user-friendly message
      alert(
        `📄 PDF Download Steps:\n\n` +
        `A new window will open with your invoice.\n\n` +
        `In the print dialog:\n` +
        `1. Select "Save as PDF" (or "Microsoft Print to PDF")\n` +
        `2. Click "Save" button\n` +
        `3. Choose location and name: ${invoiceNumber}.pdf\n\n` +
        `✓ Your PDF will be saved!`
      );
    }
  }

  if (loading) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
        <Loader className="h-8 w-8 animate-spin text-white" />
      </div>
    );
  }

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
        <div className="flex items-center justify-between border-b border-border px-6 py-4">
          <h2 className="text-xl font-extrabold text-ink">Invoice Preview</h2>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="flex items-center gap-2 rounded-lg border border-primary bg-white px-3 py-2 text-xs font-semibold text-primary transition hover:bg-primary hover:text-white"
            >
              <Printer className="h-4 w-4" />
              Print
            </button>
            <button
              onClick={handleDownload}
              className="flex items-center gap-2 rounded-lg bg-primary px-3 py-2 text-xs font-semibold text-white transition hover:opacity-90"
            >
              <Download className="h-4 w-4" />
              Download PDF
            </button>
            <button
              onClick={onClose}
              className="rounded-lg border border-border px-3 py-2 text-xs font-semibold transition hover:bg-gray-50"
            >
              Close
            </button>
          </div>
        </div>
        <div className="flex-1 overflow-y-auto p-6">
          <div dangerouslySetInnerHTML={{ __html: invoiceHTML || "" }} />
        </div>
      </motion.div>
    </motion.div>
  );
}
