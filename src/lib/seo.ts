// SEO Configuration for Sleek Automotive
// Optimized for Local Search + Automotive Keywords (October 2026)

export interface SEOData {
  title: string;
  description: string;
  keywords?: string;
  canonical?: string;
  ogImage?: string;
  type?: "website" | "article";
  publishedTime?: string;
  modifiedTime?: string;
}

// Business Information
export const businessInfo = {
  name: "Sleek Automotive And Fleet Specialists",
  shortName: "Sleek Automotive",
  phone: "01617 063 645",
  email: "info@sleekautomotive.uk",
  address: {
    street: "Unit 7, Walkden Business Park, Mount Skip Ln",
    city: "Walkden, Little Hulton",
    region: "Manchester",
    postcode: "M38 9AL",
    country: "United Kingdom",
  },
  location: {
    lat: 53.5267,
    lng: -2.3979,
  },
  hours: {
    monday: "09:00-18:00",
    tuesday: "09:00-18:00",
    wednesday: "09:00-18:00",
    thursday: "09:00-18:00",
    friday: "09:00-18:00",
    saturday: "09:00-16:00",
    sunday: "Closed",
  },
  social: {
    facebook: "https://www.facebook.com/sleekautomotive",
    instagram: "https://www.instagram.com/sleekautomotive",
  },
};

// Default SEO for homepage
export const defaultSEO: SEOData = {
  title: "Sleek Automotive Bolton | MOT, Servicing & Car Repairs Manchester M38",
  description:
    "Trusted garage in Bolton & Manchester for MOT testing, full car servicing, diagnostics, brakes, tyres & repairs. Book online or call 01617 063 645. Located in Walkden M38 9AL.",
  keywords:
    "MOT Bolton, car service Manchester, garage Walkden, MOT test near me, car repairs Bolton, brake replacement Manchester, diagnostics Bolton, tyre fitting M38, full service Walkden, clutch replacement Bolton, fleet servicing Manchester",
  canonical: "https://www.sleekautomotive.uk/",
  ogImage: "https://www.sleekautomotive.uk/hero-garage.jpg",
  type: "website",
};

// Page-specific SEO
export const pageSEO: Record<string, SEOData> = {
  "/": defaultSEO,

  "/about": {
    title: "About Sleek Automotive Bolton | Expert Mechanics & Technicians",
    description:
      "Meet the team at Sleek Automotive. Over 20 years experience in car servicing, MOT testing and vehicle repairs. Serving Bolton, Manchester, Salford & surrounding areas.",
    keywords:
      "about Sleek Automotive, garage Bolton team, qualified mechanics Manchester, IMI certified technicians, Bolton car service experts",
    canonical: "https://www.sleekautomotive.uk/about",
  },

  "/contact": {
    title: "Contact Sleek Automotive Bolton | Book MOT & Service Online",
    description:
      "Get in touch with Sleek Automotive. Book MOT, servicing or repairs online. Call 01617 063 645. Unit 7, Walkden Business Park, Manchester M38 9AL. Open Mon-Sat.",
    keywords:
      "contact Sleek Automotive, book MOT Bolton, garage opening hours, Walkden Manchester M38, car service booking",
    canonical: "https://www.sleekautomotive.uk/contact",
  },

  "/services": {
    title: "Car Services Bolton | MOT, Servicing, Repairs & Diagnostics",
    description:
      "Complete range of car services at Sleek Automotive Bolton: MOT testing £39.99, full servicing from £159, diagnostics, brakes, tyres, clutch & engine repairs. Book now.",
    keywords:
      "car services Bolton, MOT price, full service cost, brake repair, tyre fitting, clutch replacement, diagnostics Manchester, engine repair Bolton",
    canonical: "https://www.sleekautomotive.uk/services",
  },

  "/blog": {
    title: "Automotive Blog | Car Maintenance Tips & Advice | Sleek Automotive",
    description:
      "Expert automotive advice from Bolton mechanics. Maintenance tips, repair guides, MOT preparation, winter car care & more. Stay informed with Sleek Automotive blog.",
    keywords:
      "car maintenance tips, automotive blog, MOT preparation guide, winter car care, brake maintenance, tyre safety, clutch problems, check engine light",
    canonical: "https://www.sleekautomotive.uk/blog",
    type: "website",
  },
};

// Service page SEO
export const serviceSEO: Record<string, SEOData> = {
  "mot-testing": {
    title: "MOT Test Bolton £39.99 | Same-Day MOT Testing Manchester M38",
    description:
      "MOT testing from £39.99 at Sleek Automotive Bolton. DVSA approved test station. Same-day appointments available. Free retest if you return within 10 days. Book online now.",
    keywords:
      "MOT test Bolton, MOT near me, MOT price £39.99, same day MOT Manchester, MOT Walkden, MOT test M38, DVSA approved, MOT retest free",
    canonical: "https://www.sleekautomotive.uk/services/mot-testing",
  },

  "full-service": {
    title: "Full Car Service Bolton from £159 | Interim Service £89",
    description:
      "Professional car servicing in Bolton. Full service from £159, interim service £89. 50+ point inspection. Book online or call 01617 063 645. Serving Manchester M38 area.",
    keywords:
      "full car service Bolton, interim service Manchester, oil change, filter replacement, brake inspection, service price, car maintenance Bolton",
    canonical: "https://www.sleekautomotive.uk/services/full-service",
  },

  diagnostics: {
    title: "Car Diagnostics Bolton £45 | Check Engine Light Diagnosis",
    description:
      "Professional engine diagnostics in Bolton. Check engine light, fault code reading, DPF issues. Latest diagnostic equipment. £45 (FREE if you proceed with repair). Call now.",
    keywords:
      "car diagnostics Bolton, check engine light, fault code reading, DPF regeneration, diagnostic test Manchester, engine warning light",
    canonical: "https://www.sleekautomotive.uk/services/diagnostics",
  },

  brakes: {
    title: "Brake Repair Bolton | Brake Pads, Discs & Caliper Replacement",
    description:
      "Expert brake repairs in Bolton. Brake pads from £80, discs from £120, calipers from £150. Same-day service available. Free brake inspection. Call 01617 063 645.",
    keywords:
      "brake repair Bolton, brake pads replacement, brake discs, brake caliper, squealing brakes, grinding noise, brake service Manchester",
    canonical: "https://www.sleekautomotive.uk/services/brakes",
  },

  tyres: {
    title: "Tyres Bolton | Tyre Fitting from £45 | Michelin, Pirelli, Continental",
    description:
      "Quality tyres fitted in Bolton. Budget tyres from £45, premium brands from £80. Free fitting, balancing & valve. Michelin, Bridgestone, Continental, Pirelli. Book online.",
    keywords:
      "tyres Bolton, tyre fitting, cheap tyres Manchester, Michelin tyres, budget tyres, tyre prices, wheel alignment, puncture repair",
    canonical: "https://www.sleekautomotive.uk/services/tyres",
  },

  aircon: {
    title: "Air Conditioning Service Bolton £59.99 | AC Regas & Repair",
    description:
      "Air con service & regas in Bolton. £59.99 including leak test. R134a & R1234yf gas available. Diagnose & fix AC faults. Book air conditioning service today.",
    keywords:
      "air con service Bolton, AC regas, air conditioning repair, AC not cold, refrigerant recharge, climate control Manchester",
    canonical: "https://www.sleekautomotive.uk/services/aircon",
  },

  alignment: {
    title: "Wheel Alignment Bolton £45 | 4-Wheel Tracking & Balancing",
    description:
      "Professional wheel alignment in Bolton. 4-wheel alignment £45, laser tracking, computerized balancing. Fix pulling, vibration, uneven tyre wear. Book online.",
    keywords:
      "wheel alignment Bolton, 4-wheel tracking, laser alignment, car pulls to one side, tyre wear, steering vibration Manchester",
    canonical: "https://www.sleekautomotive.uk/services/alignment",
  },

  repairs: {
    title: "Car Repairs Bolton | Clutch, Engine, Exhaust & Electrical Repairs",
    description:
      "Complete car repair services in Bolton. Clutch replacement, engine repairs, exhaust fitting, electrical faults, suspension, gearbox & more. Transparent pricing. Call us.",
    keywords:
      "car repairs Bolton, clutch replacement, engine repair, exhaust fitting, electrical faults, suspension repair, gearbox Manchester",
    canonical: "https://www.sleekautomotive.uk/services/repairs",
  },

  fleet: {
    title: "Fleet Servicing Bolton | Commercial Vehicle Maintenance & MOT",
    description:
      "Fleet management services in Manchester. Volume discounts, dedicated account manager, flexible scheduling. Vans, HGVs, company cars. Call for fleet pricing.",
    keywords:
      "fleet servicing Bolton, commercial vehicle maintenance, van servicing Manchester, fleet MOT, fleet management, company car service",
    canonical: "https://www.sleekautomotive.uk/services/fleet",
  },

  motorcycles: {
    title: "Motorcycle Servicing Bolton | Bike MOT & Repairs Manchester",
    description:
      "Motorcycle & scooter servicing in Bolton. MOT testing, servicing, repairs, tyres. All makes welcome. Experienced bike mechanics. Call 01617 063 645.",
    keywords:
      "motorcycle servicing Bolton, bike MOT Manchester, motorcycle repairs, scooter service, motorcycle tyres, bike mechanics",
    canonical: "https://www.sleekautomotive.uk/services/motorcycles",
  },
};

// Generate JSON-LD structured data for Local Business
export function generateLocalBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "AutomotiveBusiness",
    "@id": "https://www.sleekautomotive.uk/#business",
    name: businessInfo.name,
    alternateName: businessInfo.shortName,
    description:
      "Professional garage services including MOT testing, car servicing, diagnostics, brakes, tyres and repairs in Bolton, Manchester area.",
    url: "https://www.sleekautomotive.uk",
    telephone: businessInfo.phone,
    email: businessInfo.email,
    priceRange: "££",
    image: "https://www.sleekautomotive.uk/hero-garage.jpg",
    logo: "https://www.sleekautomotive.uk/logo.png",
    address: {
      "@type": "PostalAddress",
      streetAddress: businessInfo.address.street,
      addressLocality: businessInfo.address.city,
      addressRegion: businessInfo.address.region,
      postalCode: businessInfo.address.postcode,
      addressCountry: businessInfo.address.country,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: businessInfo.location.lat,
      longitude: businessInfo.location.lng,
    },
    openingHoursSpecification: Object.entries(businessInfo.hours).map(([day, hours]) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: day.charAt(0).toUpperCase() + day.slice(1),
      opens: hours.split("-")[0],
      closes: hours.split("-")[1],
    })),
    areaServed: [
      { "@type": "City", name: "Bolton" },
      { "@type": "City", name: "Manchester" },
      { "@type": "City", name: "Salford" },
      { "@type": "City", name: "Walkden" },
      { "@type": "City", name: "Little Hulton" },
      { "@type": "City", name: "Worsley" },
      { "@type": "City", name: "Swinton" },
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Automotive Services",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: { "@type": "Service", name: "MOT Testing" },
        },
        {
          "@type": "Offer",
          itemOffered: { "@type": "Service", name: "Car Servicing" },
        },
        {
          "@type": "Offer",
          itemOffered: { "@type": "Service", name: "Diagnostics" },
        },
        {
          "@type": "Offer",
          itemOffered: { "@type": "Service", name: "Brake Repairs" },
        },
        {
          "@type": "Offer",
          itemOffered: { "@type": "Service", name: "Tyre Fitting" },
        },
      ],
    },
    sameAs: [businessInfo.social.facebook, businessInfo.social.instagram],
  };
}

// Generate breadcrumb schema
export function generateBreadcrumbSchema(path: string) {
  const pathParts = path.split("/").filter(Boolean);
  const items = [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: "https://www.sleekautomotive.uk/",
    },
  ];

  let currentPath = "";
  pathParts.forEach((part, index) => {
    currentPath += `/${part}`;
    items.push({
      "@type": "ListItem",
      position: index + 2,
      name: part.charAt(0).toUpperCase() + part.slice(1).replace(/-/g, " "),
      item: `https://www.sleekautomotive.uk${currentPath}`,
    });
  });

  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items,
  };
}

// Generate article schema for blog posts
export function generateArticleSchema(article: {
  title: string;
  description: string;
  publishedDate: string;
  modifiedDate?: string;
  image: string;
  slug: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.description,
    image: `https://www.sleekautomotive.uk${article.image}`,
    datePublished: article.publishedDate,
    dateModified: article.modifiedDate || article.publishedDate,
    author: {
      "@type": "Organization",
      name: businessInfo.name,
    },
    publisher: {
      "@type": "Organization",
      name: businessInfo.name,
      logo: {
        "@type": "ImageObject",
        url: "https://www.sleekautomotive.uk/logo.png",
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://www.sleekautomotive.uk/blog/${article.slug}`,
    },
  };
}
