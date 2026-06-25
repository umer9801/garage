import motImg from "@/assets/mot-inspection.jpg";
import repairsImg from "@/assets/repairs.jpg";
import tyresImg from "@/assets/tyres.jpg";
import diagImg from "@/assets/diagnostics.jpg";
import motoImg from "@/assets/motorcycles.jpg";
import fleetImg from "@/assets/fleet.jpg";
import airconImg from "@/assets/aircon.jpg";
import alignImg from "@/assets/alignment.jpg";
import brakesImg from "@/assets/brakes.jpg";
import certImg from "@/assets/certificate.jpg";
import img1 from "@/assets/1.jpg";
import img2 from "@/assets/2.jpg";
import img3 from "@/assets/3.jpg";
import img4 from "@/assets/4.jpg";
import img5 from "@/assets/5.jpg";
import img6 from "@/assets/6.jpg";
import img7 from "@/assets/7.jpg";
import img8 from "@/assets/8.jpg";

export type ServiceCard = {
  title: string;
  image: string;
  items: string[];
};

export type Service = {
  slug: string;
  category: "fleet" | "public";
  title: string;
  subtitle: string;
  description: string;
  hero: string;
  shortDescription: string;
  cards: [ServiceCard, ServiceCard, ServiceCard];
  benefits: string[];
  faqs: { q: string; a: string }[];
};

// ─── FLEET SERVICES ────────────────────────────────────────────────────────────
export const FLEET_SERVICES: Service[] = [
  {
    slug: "fleet-servicing-compliance",
    category: "fleet",
    title: "Fleet Servicing & Compliance",
    subtitle: "Keep your fleet legal, maintained and road-ready.",
    description:
      "DVSA-approved MOT testing, statutory safety inspections and manufacturer-schedule servicing for your entire fleet. Block bookings, out-of-hours testing and a single invoice — we make compliance simple.",
    shortDescription: "MOT testing, statutory safety inspections and full servicing to keep your fleet compliant.",
    hero: img1,
    cards: [
      {
        title: "MOT & Safety Inspections",
        image: img2,
        items: ["Class 4 & 7 approved", "Block bookings", "Out-of-hours testing", "Free pre-MOT check", "Statutory safety inspections", "Single invoice"],
      },
      {
        title: "Fleet Servicing",
        image: img3,
        items: ["Routine servicing", "Oils, fluids & filters", "Manufacturer schedules", "Genuine OEM parts", "Brake & tyre programmes"],
      },
      {
        title: "Compliance Records",
        image: img4,
        items: ["Digital compliance records", "6-week & 12-week checks", "DVSA compliance", "Driver defect integration", "Priority scheduling"],
      },
    ],
    benefits: [
      "Block MOT bookings with single invoice",
      "Out-of-hours and weekend testing available",
      "Digital compliance records for every vehicle",
      "Free pre-MOT check with every booking",
    ],
    faqs: [
      { q: "Can you handle our entire fleet in one visit?", a: "Yes — we offer block bookings with dedicated bays and a single invoice for the whole fleet." },
      { q: "Do you provide statutory safety inspection certificates?", a: "Absolutely — all certificates are issued digitally and stored in your fleet portal." },
    ],
  },
  {
    slug: "fleet-breakdown-priority",
    category: "fleet",
    title: "24/7 Breakdown Priority",
    subtitle: "Round-the-clock support to keep your fleet moving.",
    description:
      "Dedicated 24/7 priority breakdown support for fleet customers. Mobile technician call-outs, rapid roadside repairs and fast workshop turnaround — minimising downtime across your operation.",
    shortDescription: "24/7 priority breakdown support and mobile technician call-out for commercial fleets.",
    hero: img2,
    cards: [
      {
        title: "Mobile Call-Out",
        image: img5,
        items: ["24/7 priority response", "On-site technician", "Roadside repairs", "Greater Manchester coverage", "Rapid turnaround"],
      },
      {
        title: "Engine & Transmission",
        image: img6,
        items: ["Engine rebuilds", "Gearbox repairs", "Timing belt replacement", "Cooling system repair", "Exhaust & DPF"],
      },
      {
        title: "Advanced Diagnostics",
        image: img8,
        items: ["Multi-brand OBD scanning", "ECU fault clearance", "Live data analysis", "Electrical faults", "Emissions testing"],
      },
    ],
    benefits: [
      "24/7 priority breakdown support",
      "Mobile technician call-out services",
      "Same-day diagnostics and repair where possible",
      "Real-time job updates via fleet portal",
    ],
    faqs: [
      { q: "How quickly can a mobile technician reach us?", a: "We aim to reach you within 2 hours for fleet customers within Greater Manchester." },
      { q: "Do you carry common parts on mobile units?", a: "Yes — our mobile units carry the most common wear parts for light commercial vehicles." },
    ],
  },
  {
    slug: "fleet-digital-maintenance",
    category: "fleet",
    title: "Digital Fleet Maintenance",
    subtitle: "Full visibility of every vehicle in your fleet.",
    description:
      "Preventive maintenance programmes with digital health reporting, per-vehicle dashboards and spend tracking. We schedule everything around your operational hours so your fleet stays on the road.",
    shortDescription: "Digital fleet health reporting, preventive scheduling and per-vehicle maintenance dashboards.",
    hero: img7,
    cards: [
      {
        title: "Preventive Scheduling",
        image: img3,
        items: ["Scheduled servicing", "Brake & tyre programmes", "Replacement scheduling", "Service alerts", "Downtime reduction"],
      },
      {
        title: "Digital Health Reports",
        image: img4,
        items: ["Per-vehicle dashboards", "Spend tracking", "Upcoming service alerts", "Compliance summary", "Monthly reports"],
      },
      {
        title: "Van Conversions",
        image: img5,
        items: ["Shelving & racking", "Bulkhead fitting", "Partition walls", "Floor lining", "Minor bodywork"],
      },
    ],
    benefits: [
      "Digital fleet health reporting dashboard",
      "Preventive scheduling to reduce breakdowns",
      "Volume pricing across all maintenance work",
      "Van fit-out and conversion services",
    ],
    faqs: [
      { q: "How does the digital health reporting work?", a: "Each vehicle gets a digital record updated after every visit. You receive a monthly summary report with upcoming actions." },
      { q: "Can you work around our operating hours?", a: "Yes — early morning, evening and weekend slots are available for operational fleets." },
    ],
  },
  {
    slug: "fleet-account-management",
    category: "fleet",
    title: "Account Management",
    subtitle: "One point of contact for your entire fleet.",
    description:
      "Dedicated account manager, volume pricing, consolidated invoicing and real-time job updates. We work as an extension of your team — handling everything so you can focus on running your business.",
    shortDescription: "Dedicated account manager, volume pricing, consolidated invoicing and real-time updates.",
    hero: certImg,
    cards: [
      {
        title: "Dedicated Support",
        image: certImg,
        items: ["Named account manager", "Direct phone line", "Priority booking", "Custom SLAs", "Flexible schedules"],
      },
      {
        title: "Pricing & Invoicing",
        image: certImg,
        items: ["Volume pricing", "Consolidated invoicing", "Monthly statements", "Cost reporting", "Budget tracking"],
      },
      {
        title: "Reporting",
        image: certImg,
        items: ["Real-time job updates", "Fleet spend analysis", "Compliance overview", "Service history", "Upcoming actions"],
      },
    ],
    benefits: [
      "Single point of contact for all fleet needs",
      "Volume discounts on all services",
      "Consolidated monthly invoicing",
      "Real-time job tracking and reporting",
    ],
    faqs: [
      { q: "What size fleets do you work with?", a: "Anything from 3 vehicles to 100+. We tailor a programme to your operational hours and budget." },
      { q: "Can we get consolidated monthly invoicing?", a: "Yes — all work across your fleet is summarised on a single monthly invoice with full job breakdown." },
    ],
  },
];

// ─── PUBLIC / RETAIL SERVICES ──────────────────────────────────────────────────
export const PUBLIC_SERVICES: Service[] = [
  {
    slug: "mot-service",
    category: "public",
    title: "Pre-Mot Checks & Servicing",
    subtitle: "Keep your car road-legal and running at its best.",
    description:
      "Thorough pre-MOT checks to identify and fix issues before your test, plus full, interim and major services carried out to manufacturer schedules using genuine parts.",
    shortDescription: "Pre-MOT checks and full manufacturer-schedule servicing with free re-test guarantee.",
    hero: motImg,
    cards: [
      {
        title: "Pre-MOT Inspection",
        image: motImg,
        items: ["Full pre-MOT check", "Identify issues early", "Free re-test within 10 days", "While-you-wait slots", "Digital certificate"],
      },
      {
        title: "Vehicle Servicing",
        image: repairsImg,
        items: ["Full service", "Interim service", "Major service", "Manufacturer-schedule service", "Oil, fluids & filters"],
      },
      {
        title: "Winter Health Check",
        image: brakesImg,
        items: ["Battery test", "Tyre tread & pressure", "Lights & wiper check", "Antifreeze level", "Brake inspection"],
      },
    ],
    benefits: [
      "Free pre-MOT check with every booking",
      "DVSA approved — all classes",
      "Manufacturer-schedule servicing without voiding warranty",
      "12-month parts & labour warranty",
    ],
    faqs: [
      { q: "Will servicing here affect my manufacturer warranty?", a: "No — under Block Exemption Regulation we can service your car to manufacturer schedules without voiding your warranty." },
      { q: "How long does an MOT take?", a: "Around 45–60 minutes. We offer while-you-wait with complimentary refreshments." },
      { q: "Do you offer a free retest?", a: "Yes — if your car fails and is repaired with us within 10 working days, the partial retest is free." },
    ],
  },
  {
    slug: "repairs-diagnostics",
    category: "public",
    title: "Repairs & Diagnostics",
    subtitle: "Expert repairs for every make and model.",
    description:
      "From clutch and timing belt replacement to engine diagnostics and exhaust repair — our master technicians diagnose accurately and repair right first time.",
    shortDescription: "Clutch, timing belt, engine diagnostics, DPF cleaning and full mechanical repairs.",
    hero: repairsImg,
    cards: [
      {
        title: "Mechanical Repairs",
        image: repairsImg,
        items: ["Clutch replacement", "Timing belt/chain", "Engine repairs", "Gearbox work", "Cooling system repair", "Exhaust repair"],
      },
      {
        title: "Engine Diagnostics",
        image: diagImg,
        items: ["Warning light diagnosis", "ECU fault code scan", "DPF cleaning", "Emissions testing", "Live data analysis"],
      },
      {
        title: "Steering & Suspension",
        image: alignImg,
        items: ["Shock absorber replacement", "Suspension repair", "Steering component repair", "Pre-purchase inspection", "Minor bodywork"],
      },
    ],
    benefits: [
      "12-month parts & labour warranty on all repairs",
      "Manufacturer-grade OEM parts only",
      "Plain-English explanation before any work begins",
      "Courtesy cars available on request",
    ],
    faqs: [
      { q: "Do I need to book for a diagnostic check?", a: "We recommend booking, but same-day diagnostics are often available — just call us." },
      { q: "What does DPF cleaning involve?", a: "We use a forced regeneration process to burn off accumulated soot. If the DPF is beyond recovery, we'll advise on replacement options." },
    ],
  },
  {
    slug: "tyres-brakes",
    category: "public",
    title: "Tyres & Brakes",
    subtitle: "Safety-critical — done right.",
    description:
      "Trusted tyre brands expertly fitted and balanced, plus full brake pad and disc replacement with a free brake health check on every visit.",
    shortDescription: "Tyre fitting, brake pads and disc replacement, plus free tyre health checks.",
    hero: tyresImg,
    cards: [
      {
        title: "Tyre Fitting",
        image: tyresImg,
        items: ["Michelin, Continental, Pirelli", "Budget & mid-range options", "Same-day fitting", "Free tyre health check", "All sizes in stock"],
      },
      {
        title: "Brake Service",
        image: brakesImg,
        items: ["Brake pad replacement", "Disc replacement", "Brake fluid change", "Caliper inspection", "Free brake check"],
      },
      {
        title: "Tyre Health & Advice",
        image: tyresImg,
        items: ["Free tyre check", "Legal minimum advice", "Pressure check", "Tread depth check", "Valve replacement"],
      },
    ],
    benefits: [
      "Free tyre health check on every visit",
      "Price-match guarantee on tyres",
      "Hunter Hawkeye laser alignment",
      "Free brake inspection with any tyre purchase",
    ],
    faqs: [
      { q: "How do I know if I need new tyres?", a: "Legal minimum is 1.6mm tread — we recommend 3mm for safety. Pop in for a free check anytime." },
      { q: "How often should I get wheel alignment?", a: "Every 12 months, or after fitting new tyres, hitting a kerb or pothole." },
    ],
  },
  {
    slug: "aircon-battery",
    category: "public",
    title: "Air Con & Electrical",
    subtitle: "Keep your car comfortable and reliable.",
    description:
      "Air conditioning re-gas, battery testing and replacement, plus full electrical fault diagnosis — all while you wait.",
    shortDescription: "AC re-gas, battery testing & replacement and electrical fault diagnosis.",
    hero: airconImg,
    cards: [
      {
        title: "Air Conditioning",
        image: airconImg,
        items: ["R134a & R1234yf re-gas", "Leak detection", "Pollen filter replacement", "Odour treatment", "Performance test"],
      },
      {
        title: "Battery Service",
        image: diagImg,
        items: ["Battery health test", "Battery replacement", "Start-stop compatible", "All vehicle types", "Warranty included"],
      },
      {
        title: "Electrical Faults",
        image: repairsImg,
        items: ["Warning light diagnosis", "Wiring faults", "Lighting repair", "Central locking", "Comfort systems"],
      },
    ],
    benefits: [
      "From £69 AC re-gas while you wait",
      "Free battery health test",
      "Both AC gas types in stock",
      "Same-day electrical diagnosis",
    ],
    faqs: [
      { q: "How often should I re-gas my air conditioning?", a: "Every 2 years is recommended — it prolongs the life of the compressor even if cooling feels fine." },
      { q: "How long does a battery replacement take?", a: "Usually 30 minutes or less. We carry a wide range of batteries to suit most vehicles." },
    ],
  },
];

// ─── Combined exports ──────────────────────────────────────────────────────────
export const SERVICES: Service[] = [...PUBLIC_SERVICES, ...FLEET_SERVICES];

export function getService(slug: string) {
  return SERVICES.find((s) => s.slug === slug);
}

export function getFleetServices() {
  return FLEET_SERVICES;
}

export function getPublicServices() {
  return PUBLIC_SERVICES;
}
