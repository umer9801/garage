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

export type ServiceCard = {
  title: string;
  image: string;
  items: string[];
};

export type Service = {
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  hero: string;
  shortDescription: string;
  cards: [ServiceCard, ServiceCard, ServiceCard];
  benefits: string[];
  faqs: { q: string; a: string }[];
};

export const SERVICES: Service[] = [
  {
    slug: "mot",
    title: "MOTs in Bolton",
    subtitle: "Make sure your vehicle passes its MOT.",
    description:
      "We are a DVSA approved Class 1, 2 & 4 MOT Testing Station in Bolton. We provide professional MOT testing for all makes and models, with a free re-test guarantee and same-day slots.",
    shortDescription: "DVSA approved Class 1, 2 & 4 MOT testing with free re-test guarantee.",
    hero: motImg,
    cards: [
      { title: "Vehicle Inspection", image: motImg, items: ["Vehicle Structure", "Fuel System", "Emissions", "Exhaust", "Doors", "Mirrors", "Seat Belts", "Lights"] },
      { title: "Safety Checks", image: brakesImg, items: ["Brakes", "Steering", "Suspension", "Tyres", "Horn", "Number Plates", "Bonnet", "Tailgate"] },
      { title: "Final Certification", image: certImg, items: ["VIN Check", "Windscreen", "Wipers", "Washers", "Final Inspection", "Certificate", "Professional Advice", "Booking Support"] },
    ],
    benefits: ["Free re-test within 10 days", "DVSA approved testers", "While-you-wait slots", "Honest, transparent pricing"],
    faqs: [
      { q: "How long does an MOT take?", a: "A standard car MOT takes around 45–60 minutes. We offer while-you-wait appointments with complimentary refreshments." },
      { q: "Do you offer a free retest?", a: "Yes — if your car fails and is repaired within 10 working days, the partial retest is free." },
      { q: "Which vehicle classes do you test?", a: "We are approved for Class 1 (motorcycles up to 200cc), Class 2 (over 200cc), and Class 4 (cars and light vans)." },
    ],
  },
  {
    slug: "repairs",
    title: "Car Repairs & Servicing",
    subtitle: "Professional servicing and repairs for every make and model.",
    description:
      "From minor adjustments to full engine rebuilds, our master technicians use manufacturer-grade parts and the latest equipment to keep your vehicle running like new.",
    shortDescription: "Full service, mechanical repairs and warranty work for every make and model.",
    hero: repairsImg,
    cards: [
      { title: "Mechanical Repairs", image: repairsImg, items: ["Brakes", "Clutches", "Gearboxes", "Cambelts", "Engine Repairs"] },
      { title: "Diagnostics", image: diagImg, items: ["Diagnostics", "Battery", "Electrical Faults", "Warning Lights", "ECU"] },
      { title: "Warranty", image: certImg, items: ["National Guarantee", "12 Month Warranty", "Professional Parts", "Expert Mechanics", "Reliable Service"] },
    ],
    benefits: ["12-month parts & labour warranty", "Manufacturer-grade parts", "Courtesy cars available", "Detailed digital reports"],
    faqs: [
      { q: "Will servicing affect my warranty?", a: "No — we use OE-grade parts and our work is recognised under all UK manufacturer warranties." },
      { q: "Do you offer courtesy vehicles?", a: "Yes, free courtesy cars are available with most major services, subject to availability." },
    ],
  },
  {
    slug: "tyres",
    title: "Premium Tyres",
    subtitle: "Trusted brands. Expert fitting. Honest pricing.",
    description:
      "Choose from a full range of premium, mid-range and budget tyres — all expertly fitted and balanced using state-of-the-art equipment.",
    shortDescription: "Premium tyre fitting, balancing and replacement from the brands you trust.",
    hero: tyresImg,
    cards: [
      { title: "Premium Tyres", image: tyresImg, items: ["Michelin", "Continental", "Pirelli", "Bridgestone", "Dunlop"] },
      { title: "Wheel Balancing", image: alignImg, items: ["Computerised balancing", "Smooth ride", "Reduced wear", "Better economy"] },
      { title: "Tyre Replacement", image: tyresImg, items: ["Same-day fitting", "Old tyre disposal", "Valves & weights included", "Pressure check"] },
    ],
    benefits: ["Free tyre health check", "Price-match guarantee", "Fully fitted prices", "All sizes in stock"],
    faqs: [
      { q: "How do I know if I need new tyres?", a: "The legal minimum is 1.6mm of tread. We recommend replacing at 3mm for safety. Pop in for a free check." },
    ],
  },
  {
    slug: "diagnostics",
    title: "Vehicle Diagnostics",
    subtitle: "Pinpoint accuracy from dashboard warning to repair.",
    description:
      "Our advanced multi-brand diagnostic equipment communicates with every system in your vehicle — from ECU mapping to ABS, airbags and engine management.",
    shortDescription: "Multi-brand ECU diagnostics for engine, electrical and performance issues.",
    hero: diagImg,
    cards: [
      { title: "Engine Diagnostics", image: diagImg, items: ["ECU scan", "Fault code clearance", "Live data analysis", "Sensor testing"] },
      { title: "Electrical Diagnostics", image: repairsImg, items: ["Wiring faults", "Battery & charging", "Lighting", "Comfort systems"] },
      { title: "Performance Analysis", image: alignImg, items: ["Power output", "Emissions", "Fuel mapping", "Drive cycle tests"] },
    ],
    benefits: ["£45 diagnostic — refundable against repairs", "Latest OEM-level software", "All makes covered", "Clear plain-English reports"],
    faqs: [
      { q: "My warning light is on — is it serious?", a: "It depends on the colour and code. Bring it in — we'll scan it and explain exactly what's needed." },
    ],
  },
  {
    slug: "motorcycles",
    title: "Motorcycle Workshop",
    subtitle: "MOTs, servicing and repairs for two wheels.",
    description:
      "Our dedicated motorcycle bay handles everything from a routine service to full restoration. Class 1 & 2 MOT testing approved.",
    shortDescription: "Motorcycle MOTs, servicing and repairs in a dedicated workshop bay.",
    hero: motoImg,
    cards: [
      { title: "Motorcycle MOT", image: motoImg, items: ["Class 1 & 2 approved", "While you wait", "Free re-test", "Honest advice"] },
      { title: "Motorcycle Repairs", image: repairsImg, items: ["Engine work", "Suspension", "Brakes", "Electrical"] },
      { title: "Motorcycle Servicing", image: motoImg, items: ["Manufacturer schedules", "Genuine parts", "Track prep", "Winter storage prep"] },
    ],
    benefits: ["Dedicated motorcycle bay", "Tyre fitting in-house", "Race-prep available", "Collection available"],
    faqs: [{ q: "Do you service all bike brands?", a: "Yes — Japanese, European and American — including modern ABS-equipped models." }],
  },
  {
    slug: "fleet",
    title: "Fleet Management",
    subtitle: "Keep your fleet on the road and on budget.",
    description:
      "Tailored maintenance, MOT and service programmes for vans, taxis and commercial fleets. Single point of contact, monthly reporting and priority slots.",
    shortDescription: "Maintenance, MOT and servicing programmes for commercial fleets.",
    hero: fleetImg,
    cards: [
      { title: "Fleet Maintenance", image: fleetImg, items: ["Scheduled servicing", "Brake & tyre programmes", "DVS compliance", "Priority response"] },
      { title: "Fleet MOT", image: motImg, items: ["Class 4 & 7", "Block bookings", "Out-of-hours testing", "Single invoice"] },
      { title: "Fleet Servicing", image: repairsImg, items: ["Manufacturer schedules", "Genuine parts", "Digital records", "Fleet pricing"] },
    ],
    benefits: ["Dedicated account manager", "Volume pricing", "Out-of-hours work", "Real-time job updates"],
    faqs: [{ q: "What size fleets do you work with?", a: "Anything from 3 vehicles to 100+. We tailor a programme to your operating hours." }],
  },
  {
    slug: "aircon",
    title: "Air Conditioning Recharge",
    subtitle: "Cold air, fast — for both R134a and R1234yf systems.",
    description:
      "A modern AC system loses up to 10% of its refrigerant every year. We service, recharge and leak-test all car AC systems including the latest R1234yf gas.",
    shortDescription: "AC regas, leak detection and full cooling system service.",
    hero: airconImg,
    cards: [
      { title: "Gas Recharge", image: airconImg, items: ["R134a & R1234yf", "Full evacuation", "UV dye check", "Performance test"] },
      { title: "Leak Detection", image: diagImg, items: ["Pressure testing", "UV dye trace", "Component check", "Written report"] },
      { title: "Cooling Performance", image: airconImg, items: ["Condenser clean", "Pollen filter", "Odour treatment", "Vent temperature check"] },
    ],
    benefits: ["From £69 regas", "Free system health check", "Both gas types in stock", "While-you-wait service"],
    faqs: [{ q: "How often should I regas?", a: "Every 2 years is recommended even if cooling feels fine — it prolongs the life of the compressor." }],
  },
  {
    slug: "alignment",
    title: "Laser Wheel Alignment",
    subtitle: "Protect your tyres. Sharpen your handling.",
    description:
      "Our Hunter laser alignment rig delivers precise four-wheel geometry adjustment — improving tyre life, fuel economy and steering feel.",
    shortDescription: "Hunter laser four-wheel alignment for sharper handling and longer tyre life.",
    hero: alignImg,
    cards: [
      { title: "Alignment Check", image: alignImg, items: ["Free 30-point check", "Camber & toe report", "Manufacturer spec", "Before & after"] },
      { title: "Tyre Protection", image: tyresImg, items: ["Even wear", "Extended tyre life", "Reduced rolling resistance"] },
      { title: "Improved Handling", image: alignImg, items: ["Straighter steering", "Better cornering", "Reduced vibration", "Safer braking"] },
    ],
    benefits: ["Free alignment check with any tyre", "Hunter Hawkeye equipment", "Four-wheel geometry", "Suspension inspection"],
    faqs: [{ q: "How often should wheels be aligned?", a: "Every 12 months, or whenever you fit new tyres or hit a pothole / kerb." }],
  },
];

export function getService(slug: string) {
  return SERVICES.find((s) => s.slug === slug);
}