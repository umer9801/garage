# 🚗 Sleek Automotive - Garage Management System

Professional full-stack garage management system with job scheduling, invoice generation, MOT lookup, and Google Calendar integration.

## ✨ Features

### 🔐 Admin Dashboard

- Secure admin authentication
- Overview statistics dashboard
- Job and invoice management
- Real-time data updates

### 📋 Job Management

- Create and track vehicle service jobs
- MOT vehicle lookup integration
- Customer information management
- Service selection with custom "Other" option
- Date and time scheduling
- Status tracking (Pending, In Progress, Completed, Cancelled)
- Google Calendar integration

### 🧾 Invoice System

- Generate professional HTML invoices
- Sequential numbering (INV-001, INV-002...)
- Print and download invoices
- CSV export with complete data
- VAT calculation (20%)
- Full business details included
- Delete invoices with confirmation

### 📅 Google Calendar Integration

- Embedded calendar view in admin
- One-click event creation
- Auto-includes customer and vehicle details
- 2-hour default appointment duration
- No OAuth required (simple URL-based)

### 📞 Contact Form

- Customer inquiry submission
- Database storage
- Optional email notifications
- Rate limiting for spam prevention

---

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ and npm
- MongoDB Atlas account
- Google Calendar (for integration)

### Installation

1. **Clone and Install**

```bash
git clone <repository-url>
cd garage-main
npm install
```

2. **Setup Environment Variables**

```bash
# Copy example file
cp .env.example .env

# Edit .env with your values
# Minimum required:
# - ADMIN_SECRET
# - MONGODB_URI
# - GOOGLE_CALENDAR_ID
```

3. **Start Development Server**

```bash
npm run dev
```

4. **Open Browser**

```
http://localhost:8081
```

---

## 📝 Environment Variables

### Required (3 variables)

```bash
ADMIN_SECRET=your-admin-password-here
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/dbname
GOOGLE_CALENDAR_ID=your-calendar-id@group.calendar.google.com
```

### Optional (Email notifications)

```bash
SMTP_HOST=smtp.hostinger.com
SMTP_PORT=465
SMTP_USER=info@sleekautomotive.uk
SMTP_PASS=your-smtp-password
MAIL_FROM="Sleek Automotive <info@sleekautomotive.uk>"
ADMIN_EMAIL=info@sleekautomotive.uk
```

**See `ENVIRONMENT-SETUP.md` for detailed instructions**

---

## 🗂️ Project Structure

```
garage-main/
├── src/
│   ├── components/        # React components
│   │   ├── ui/           # Shadcn UI components
│   │   ├── booking-widget.tsx
│   │   ├── navbar.tsx
│   │   ├── footer.tsx
│   │   └── ...
│   ├── routes/           # TanStack Router pages
│   │   ├── admin/        # Admin dashboard pages
│   │   │   ├── index.tsx # Main dashboard
│   │   │   ├── jobs.tsx  # Job management
│   │   │   └── invoices.tsx # Invoice management
│   │   ├── index.tsx     # Homepage
│   │   ├── about.tsx
│   │   ├── services.tsx
│   │   └── contact.tsx
│   ├── lib/              # Utilities and helpers
│   │   ├── server-fns.ts # Server functions (CRUD)
│   │   ├── db.ts         # MongoDB connection
│   │   ├── invoice-generator.ts
│   │   ├── google-calendar.ts
│   │   └── utils.ts
│   └── data/
│       └── services.ts   # Service definitions
├── public/               # Static assets
├── .env                  # Environment variables (not in git)
├── .env.example          # Environment template
├── package.json
└── vite.config.ts
```

---

## 🛠️ Tech Stack

### Frontend

- **React 19** - UI framework
- **TanStack Router** - File-based routing
- **TanStack Query** - Data fetching
- **Tailwind CSS 4** - Styling
- **Shadcn UI** - Component library
- **Motion** - Animations
- **Lucide React** - Icons

### Backend

- **TanStack Start** - Full-stack React framework
- **MongoDB** - Database
- **Nodemailer** - Email sending
- **Zod** - Validation

### Integrations

- **Google Calendar** - Appointment scheduling
- **GOV.UK MOT API** - Vehicle lookup (manual workflow)

---

## 📖 Documentation

- **[Production Checklist](PRODUCTION-CHECKLIST.md)** - Deployment guide
- **[Environment Setup](ENVIRONMENT-SETUP.md)** - Variable configuration
- **[Security Guide](SECURITY.md)** - Security best practices
- **[Recent Updates](RECENT-UPDATES.md)** - Latest changes
- **[Complete Features](COMPLETE-FEATURES.md)** - Feature overview

---

## 🎯 Usage

### Admin Access

1. Navigate to `/admin`
2. Enter admin password (from `ADMIN_SECRET`)
3. Access dashboard

### Create a Job

1. Go to Jobs tab
2. Click "Create Job"
3. Enter vehicle registration
4. Click "Check MOT" (opens government site)
5. Fill vehicle and customer details
6. Select services (or add custom)
7. Choose date and time
8. Submit
9. Optionally add to Google Calendar

### Generate Invoice

1. Complete a job (set status to "Completed")
2. Click invoice icon on job row
3. OR go to Invoices tab → Create Invoice
4. Select job and add pricing
5. Generate invoice
6. Print, download, or export CSV

---

## 🧪 Development

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint

# Format code
npm run format

# Security check
npm run security:check
```

---

## 🚀 Deployment

### Vercel (Recommended)

1. Push code to GitHub
2. Connect repository to Vercel
3. Add environment variables
4. Deploy

### Other Platforms

- **Netlify** - Serverless hosting
- **Railway** - Full Node.js hosting
- **DigitalOcean** - VPS hosting

**See [PRODUCTION-CHECKLIST.md](PRODUCTION-CHECKLIST.md) for detailed deployment guide**

---

## 🔒 Security

### Implemented

- ✅ Environment variable-based credentials
- ✅ Input validation with Zod
- ✅ XSS prevention
- ✅ CSRF protection
- ✅ Secure password handling
- ✅ Rate limiting on contact form

### Best Practices

- Never commit `.env` file
- Use strong admin password (12+ chars)
- Enable 2FA on MongoDB Atlas
- Keep dependencies updated
- Monitor security advisories

**See [SECURITY.md](SECURITY.md) for complete guide**

---

## 📊 Database Schema

### Collections

**jobs**

```javascript
{
  _id: ObjectId,
  vehicleReg: String,
  vehicleMake: String,
  vehicleModel: String,
  vehicleYear: Number,
  vehicleColor: String,
  fuelType: String,
  motExpiry: Date,
  customerName: String,
  customerPhone: String,
  customerEmail: String,
  services: [String],
  scheduledDate: Date,
  notes: String,
  status: String, // pending, in_progress, completed, cancelled
  createdAt: Date
}
```

**invoices**

```javascript
{
  _id: ObjectId,
  jobId: ObjectId,
  invoiceNumber: String, // INV-001
  invoiceData: Object,
  html: String,
  createdAt: Date
}
```

**counters**

```javascript
{
  _id: "invoice_number",
  sequence: Number
}
```

**submissions** (Contact Form)

```javascript
{
  _id: ObjectId,
  name: String,
  email: String,
  phone: String,
  message: String,
  createdAt: Date
}
```

---

## 🤝 Support

For issues or questions:

1. Check documentation files
2. Review troubleshooting in `ENVIRONMENT-SETUP.md`
3. Check MongoDB Atlas connection
4. Verify environment variables

---

## 📜 License

Private project for Sleek Automotive And Fleet Specialists

---

## 🎉 Credits

**Business Details:**

- Sleek Automotive And Fleet Specialists
- Unit 7, Walkden Business Park
- Mount Skip Ln, Walkden, Little Hulton
- Manchester M38 9AL
- Phone: 01617 063 645
- Email: info@sleekautomotive.uk

**Built with:**

- TanStack Start
- React 19
- MongoDB Atlas
- Tailwind CSS
- Shadcn UI

---

## ✅ Production Status

**Status:** 🟢 Ready for Production

**Completed:**

- ✅ Full authentication system
- ✅ Job management with MOT lookup
- ✅ Invoice generation and management
- ✅ Google Calendar integration
- ✅ Delete functionality
- ✅ Custom service input
- ✅ Security hardening
- ✅ Code cleanup
- ✅ Documentation

**Deploy Now:**

```bash
npm run build
# Deploy to your hosting provider
```

---

**Last Updated:** October 21, 2026  
**Version:** 1.0.0  
**Framework:** TanStack Start + React 19
