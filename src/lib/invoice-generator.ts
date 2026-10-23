import type { Job } from "./server-fns";

export interface InvoiceData {
  invoiceNumber: string;
  invoiceDate: Date;
  job: Job;
  services: Array<{
    name: string;
    price: number;
    quantity: number;
  }>;
  subtotal: number;
  vat: number;
  total: number;
  notes?: string;
}

// Note: Invoice numbering is handled by MongoDB counter in server-fns.ts
// Sequential format: INV-001, INV-002, INV-003...

export function calculateInvoiceTotal(services: Array<{ price: number; quantity: number }>): {
  subtotal: number;
  vat: number;
  total: number;
} {
  const subtotal = services.reduce((sum, service) => sum + service.price * service.quantity, 0);
  const vat = subtotal * 0.2; // 20% VAT
  const total = subtotal + vat;

  return { subtotal, vat, total };
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP",
  }).format(amount);
}

export function generateInvoiceHTML(invoice: InvoiceData): string {
  const formattedDate = invoice.invoiceDate.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Invoice ${invoice.invoiceNumber}</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: Arial, sans-serif; padding: 40px; color: #333; }
    .invoice-container { max-width: 800px; margin: 0 auto; }
    .header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 40px; border-bottom: 3px solid #1a56db; padding-bottom: 20px; }
    .company-info h1 { color: #1a56db; font-size: 24px; margin-bottom: 0; font-weight: bold; }
    .company-info p { font-size: 14px; color: #666; margin: 2px 0; }
    .invoice-details { text-align: right; }
    .invoice-details h2 { font-size: 32px; color: #1a56db; margin-bottom: 10px; }
    .invoice-details p { font-size: 14px; margin: 5px 0; }
    .billing-section { display: flex; justify-content: space-between; margin-bottom: 40px; }
    .billing-box { flex: 1; margin-right: 20px; }
    .billing-box:last-child { margin-right: 0; }
    .billing-box h3 { font-size: 14px; text-transform: uppercase; color: #666; margin-bottom: 10px; }
    .billing-box p { font-size: 14px; margin: 5px 0; }
    .vehicle-info { background: #f8f9fa; padding: 20px; margin-bottom: 30px; border-radius: 8px; }
    .vehicle-info h3 { font-size: 16px; margin-bottom: 15px; color: #1a56db; }
    .vehicle-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 10px; }
    .vehicle-item { font-size: 14px; }
    .vehicle-item strong { color: #666; }
    table { width: 100%; border-collapse: collapse; margin-bottom: 30px; }
    thead { background: #1a56db; color: white; }
    th, td { padding: 15px; text-align: left; border-bottom: 1px solid #ddd; }
    th { font-weight: 600; text-transform: uppercase; font-size: 12px; }
    td { font-size: 14px; }
    .text-right { text-align: right; }
    .totals { margin-left: auto; width: 300px; }
    .totals-row { display: flex; justify-content: space-between; padding: 10px 0; font-size: 14px; }
    .totals-row.subtotal { border-bottom: 1px solid #ddd; }
    .totals-row.total { border-top: 2px solid #1a56db; font-weight: bold; font-size: 18px; color: #1a56db; margin-top: 10px; padding-top: 15px; }
    .notes { margin-top: 30px; padding: 20px; background: #fff9e6; border-left: 4px solid #ffc107; }
    .notes h3 { font-size: 14px; margin-bottom: 10px; color: #666; }
    .notes p { font-size: 13px; color: #666; }
    .footer { margin-top: 50px; text-align: center; font-size: 12px; color: #999; border-top: 1px solid #ddd; padding-top: 20px; }
    @media print {
      body { padding: 0; }
      .no-print { display: none; }
    }
  </style>
</head>
<body>
  <div class="invoice-container">
    <!-- Header -->
    <div class="header">
      <div class="company-info">
        <div style="display: flex; align-items: center; gap: 15px; margin-bottom: 10px;">
          <img src="/logo.png" alt="Sleek Automotive Logo" style="height: 60px; width: auto;" />
          <div>
            <h1 style="margin: 0;">Sleek Automotive</h1>
            <p style="margin: 0; font-size: 13px; color: #666;">And Fleet Specialists</p>
          </div>
        </div>
        <p>Professional Vehicle Services</p>
        <p>Unit 7, Walkden Business Park, Mount Skip Ln</p>
        <p>Walkden, Little Hulton, Manchester M38 9AL</p>
        <p>Phone: 01617 063 645</p>
        <p>Email: info@sleekautomotive.uk</p>
      </div>
      <div class="invoice-details">
        <h2>INVOICE</h2>
        <p><strong>Invoice No:</strong> ${invoice.invoiceNumber}</p>
        <p><strong>Date:</strong> ${formattedDate}</p>
        <p><strong>Job ID:</strong> ${invoice.job._id.slice(-8).toUpperCase()}</p>
      </div>
    </div>

    <!-- Billing Section -->
    <div class="billing-section">
      <div class="billing-box">
        <h3>Bill To:</h3>
        <p><strong>${invoice.job.customerName}</strong></p>
        <p>${invoice.job.customerPhone}</p>
        ${invoice.job.customerEmail ? `<p>${invoice.job.customerEmail}</p>` : ""}
      </div>
      <div class="billing-box">
        <h3>Service Date:</h3>
        <p>${new Date(invoice.job.scheduledDate).toLocaleDateString("en-GB", {
          weekday: "long",
          day: "numeric",
          month: "long",
          year: "numeric",
        })}</p>
      </div>
    </div>

    <!-- Vehicle Information -->
    <div class="vehicle-info">
      <h3>Vehicle Information</h3>
      <div class="vehicle-grid">
        <div class="vehicle-item"><strong>Registration:</strong> ${invoice.job.vehicleReg}</div>
        <div class="vehicle-item"><strong>Make:</strong> ${invoice.job.vehicleMake}</div>
        <div class="vehicle-item"><strong>Model:</strong> ${invoice.job.vehicleModel}</div>
        <div class="vehicle-item"><strong>Year:</strong> ${invoice.job.vehicleYear}</div>
        ${invoice.job.vehicleColor ? `<div class="vehicle-item"><strong>Color:</strong> ${invoice.job.vehicleColor}</div>` : ""}
        ${invoice.job.fuelType ? `<div class="vehicle-item"><strong>Fuel Type:</strong> ${invoice.job.fuelType}</div>` : ""}
      </div>
    </div>

    <!-- Services Table -->
    <table>
      <thead>
        <tr>
          <th>Service Description</th>
          <th class="text-right">Qty</th>
          <th class="text-right">Unit Price</th>
          <th class="text-right">Amount</th>
        </tr>
      </thead>
      <tbody>
        ${invoice.services
          .map(
            (service) => `
          <tr>
            <td>${service.name}</td>
            <td class="text-right">${service.quantity}</td>
            <td class="text-right">${formatCurrency(service.price)}</td>
            <td class="text-right">${formatCurrency(service.price * service.quantity)}</td>
          </tr>
        `,
          )
          .join("")}
      </tbody>
    </table>

    <!-- Totals -->
    <div class="totals">
      <div class="totals-row subtotal">
        <span>Subtotal:</span>
        <span>${formatCurrency(invoice.subtotal)}</span>
      </div>
      <div class="totals-row">
        <span>VAT (20%):</span>
        <span>${formatCurrency(invoice.vat)}</span>
      </div>
      <div class="totals-row total">
        <span>TOTAL:</span>
        <span>${formatCurrency(invoice.total)}</span>
      </div>
    </div>

    <!-- Notes -->
    ${
      invoice.notes
        ? `
      <div class="notes">
        <h3>Notes:</h3>
        <p>${invoice.notes}</p>
      </div>
    `
        : ""
    }
    ${
      invoice.job.notes
        ? `
      <div class="notes">
        <h3>Job Notes:</h3>
        <p>${invoice.job.notes}</p>
      </div>
    `
        : ""
    }

    <!-- Footer -->
    <div class="footer">
      <p><strong>Sleek Automotive And Fleet Specialists</strong></p>
      <p>Unit 7, Walkden Business Park, Mount Skip Ln, Walkden, Little Hulton, Manchester M38 9AL</p>
      <p>Phone: 01617 063 645 • Email: info@sleekautomotive.uk</p>
      <p style="margin-top: 15px;">Thank you for choosing Sleek Automotive!</p>
      <p>Payment due within 30 days. Please make checks payable to Sleek Automotive And Fleet Specialists.</p>
      <p>VAT Registration No: GB123456789</p>
    </div>
  </div>
</body>
</html>
  `;
}
