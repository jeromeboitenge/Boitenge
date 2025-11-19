export interface ProjectItem {
  id: number;
  title: string;
  description: string;
  image: string;
  tags: string[];
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
    demoLink: "https://example.com/hotel-suite",
    codeLink: "https://github.com/example/hotel-suite",
  },
  {
    id: 2,
    title: "Event Intelligence OS",
    description:
      "End-to-end event orchestration with QR check-ins, sponsor analytics, and automated financial reconciliation for large venues.",
    image: "/projects/event-platform.svg",
    tags: ["React", "Next.js", "Prisma", "MongoDB", "Tailwind CSS"],
    demoLink: "https://example.com/event-os",
    codeLink: "https://github.com/example/event-os",
  },
  {
    id: 3,
    title: "ExploreHub Travel Network",
    description:
      "A community-driven travel guide that surfaces curated itineraries, immersive media, and geolocation search for explorers.",
    image: "/projects/explorehub.svg",
    tags: ["Next.js", "Mapbox", "Supabase", "Tailwind CSS"],
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
    demoLink: "https://example.com/healthcare-hub",
    codeLink: "https://github.com/example/healthcare-hub",
  },
];

