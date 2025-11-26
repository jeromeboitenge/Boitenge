export interface ProjectData {
  id: number;
  title: string;
  description: string;
  image: string; // Path to image in /public folder
  tags: string[]; // Tech stack tags (must match icons in ProjectCard.tsx)
  highlights: string[]; // Key achievements/impact
  demoLink: string;

}

export const projectsData: ProjectData[] = [
  // --- PROJECT 1: Hotel Management System (Focus: Scalable Enterprise & FinTech) ---
  {
    id: 1,
    title: "HitamoSpace @UR (Event Platform)",
    description: "A high-availability event management and ticketing system built for large university functions, capable of handling 25K+ concurrent attendees and multi-venue inventory.",
    image: "/hitamoSpace.png", // Create this image path
    tags: ["React", "Next.js", "Prisma", "MongoDB", "WebRTC"],
    highlights: [
      "Successfully scaled to support 25K+ attendees across multiple hybrid events.",
      "Implemented QR code verification and fraud-resistant checks for ticket security.",
    ],
    demoLink: "https://hitamospace.ur.ac.rw/",

  },

  {
    id: 2,
    title: "Hotel Operations Platform",
    description: "A centralized, full-stack dashboard for managing reservations, automated payments (Stripe integration), housekeeping workflows, and real-time staff coordination for a multi-chain boutique hotel group.",
    image: "/hotel.png",
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "PostgreSQL", "Stripe"],
    highlights: [
      "Reduced booking overhead by 38% with automated check-in/out workflows.",
      "Designed a secure, multi-tenant API using Next.js Server Actions for data integrity.",
    ],
    demoLink: "https://demo.hotelplatform.com",

  },


  {
    id: 3,
    title: "ExploreHub Travel Network",
    description: "A community-driven travel guide for explorers, featuring geo-spatial search (Mapbox), collaborative itinerary builders with offline sync capabilities, and rich media integration.",
    image: "/project-explorehub.jpg", // Create this image path
    tags: ["Next.js", "Mapbox", "Supabase", "TypeScript", "Redis"],
    highlights: [
      "Indexed 1,200+ global destinations with fast geospatial search functionality.",
      "Achieved a 42% boost in user retention via collaborative, story-driven itinerary UI.",
    ],
    demoLink: "https://demo.explorehub.com",

  },


  {
    id: 4,
    title: "AI-Driven Task Manager",
    description: "A highly performant task management platform featuring ML-based prioritization and real-time collaboration using WebSockets for enterprise teams.",
    image: "/project-task-manager.jpg",
    tags: ["NestJS", "PostgreSQL", "TensorFlow", "WebRTC"],
    highlights: [
      "Integrated TensorFlow for automated task prioritization and deadline prediction.",
      "Reduced user cognitive load with a clean, responsive UI based on atomic design principles.",
    ],
    demoLink: "https://demo.taskmanager.com",

  },

  // --- PROJECT 5: Placeholder (To test "View All" Button) ---
  {
    id: 5,
    title: "Decentralized Voting System",
    description: "A proof-of-concept application leveraging blockchain principles to ensure tamper-proof, transparent, and secure voting without reliance on a central authority.",
    image: "/project-voting-app.jpg",
    tags: ["React", "Node.js", "MongoDB", "TypeScript"],
    highlights: [
      "Achieved full immutability and auditability for all voting records via cryptographic hashing.",
      "Designed public verification dashboards to ensure system transparency and trust.",
    ],
    demoLink: "https://demo.votingapp.com",

  },
];