export interface ProjectItem {
  id: number;
  title: string;
  description: string;
  image: string;
  tags: string[];
  highlights: string[];
  demoLink: string;
  codeLink: string;
}

export const projectsData: ProjectItem[] = [
  {
    id: 1,
    title: "Hotel Operations Platform",
    description:
      "A centralized dashboard for reservations, payments, and housekeeping automation with real-time analytics and staff coordination.",
    image: "/projects/hotel-suite.svg",
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "PostgreSQL", "Stripe"],
    highlights: [
      "Reduced booking overhead by 38% with automated workflows",
      "Designed KPI cockpit for 6 hotel departments",
      "Integrated secure payments and audit-ready reporting",
    ],
    demoLink: "https://example.com/hotel-suite",
    codeLink: "https://github.com/example/hotel-suite",
  },
  {
    id: 2,
    title: "HitamoSpace @UR",
    description:
      "A production event & venue platform for the University of Rwanda that powers proposals, ticketing, and facility logistics at scale.",
    image: "/hitamoSpace.png",
    tags: ["React", "Next.js", "Prisma", "MongoDB", "Tailwind CSS"],
    highlights: [
      "Scaled to 25K+ attendees across hybrid events",
      "Built multi-venue inventory & pricing intelligence",
      "Implemented QR admission with fraud-resistant checks",
    ],
    demoLink: "https://hitamospace.ur.ac.rw/",
    codeLink: "https://github.com/example/event-os",
  },
  {
    id: 3,
    title: "ExploreHub Travel Network",
    description:
      "A community-driven travel guide that surfaces curated itineraries, immersive media, and geolocation search for explorers.",
    image: "/projects/explorehub.svg",
    tags: ["Next.js", "Mapbox", "Supabase", "Tailwind CSS"],
    highlights: [
      "Indexed 1,200+ destinations with geospatial search",
      "Collaborative itinerary builder with offline sync",
      "Story-driven UI that boosts retention by 42%",
    ],
    demoLink: "https://example.com/explorehub",
    codeLink: "https://github.com/example/explorehub",
  },
  {
    id: 4,
    title: "AI Ops Insight Center",
    description:
      "Predictive monitoring dashboards with anomaly detection, alert routing, and AI-assisted remediation playbooks.",
    image: "/projects/ai-analytics.svg",
    tags: ["TypeScript", "Next.js", "TensorFlow", "Redis", "Tailwind CSS"],
    highlights: [
      "Cut incident response time from 2h to 18m",
      "ML-driven anomaly scoring pipeline shipped to prod",
      "Realtime collaboration layer with playbook templates",
    ],
    demoLink: "https://example.com/ai-insight",
    codeLink: "https://github.com/example/ai-insight",
  },
  {
    id: 5,
    title: "FinTrack Billing Suite",
    description:
      "Recurring billing automation with revenue recognition, KPI snapshots, and CFO-ready exports for SaaS teams.",
    image: "/projects/fintrack.svg",
    tags: ["Next.js", "NestJS", "PostgreSQL", "Stripe", "Tailwind CSS"],
    highlights: [
      "Automated billing for $3M ARR SaaS products",
      "Built RevRec engine meeting ASC 606 requirements",
      "Modular analytics tiles powering exec dashboards",
    ],
    demoLink: "https://example.com/fintrack",
    codeLink: "https://github.com/example/fintrack",
  },
  {
    id: 6,
    title: "Healthcare Telemedicine Hub",
    description:
      "HIPAA-ready telemedicine tools featuring patient triage, video consultations, and electronic health records syncing.",
    image: "/projects/healthcare-suite.svg",
    tags: ["Next.js", "TypeScript", "WebRTC", "Node.js", "Tailwind CSS"],
    highlights: [
      "Secure video consults with adaptive bitrate WebRTC",
      "FHIR-compliant EHR synchronization service",
      "Nurse triage tooling that halves intake time",
    ],
    demoLink: "https://example.com/healthcare-hub",
    codeLink: "https://github.com/example/healthcare-hub",
  },
];

