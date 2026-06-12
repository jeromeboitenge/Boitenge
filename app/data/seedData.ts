/**
 * Seed Data for Portfolio
 * Auto-generated from database on 2026-06-11T17:14:59.388Z
 * DO NOT EDIT MANUALLY - Run 'node scripts/sync-seed-data.js' to update
 */

import { Project, Skill, Experience, Certificate } from '@/types';

export const seedProjects: Project[] = [
  {
    "id": "cmpb1dbnk000g25hl2pz8mtdn",
    "title": "LifeTrackPro",
    "description": "LifeTrack Pro is a robust cross-platform mobile application designed to bridge the gap between financial tracking and daily productivity. Featuring an intuitive, modern UI/UX, the application empowers users to manage their budgets, track real-world debts/loans, monitor daily habits, and receive automated, data-driven financial insights. It is explicitly tailored with localized multi-currency support, including a clean implementation of Rwandan Francs",
    "technologies": [
      "React Native",
      "tailwind css"
    ],
    "liveUrl": undefined,
    "imageUrl": "https://res.cloudinary.com/dsi3ggvz4/image/upload/v1779098595/project-images/image/project-1779098594423.jpg",
    "highlights": [
      "Dynamic Data Aggregation & Telemetry",
      "Dual-Core Financial & Productivity Tracking",
      "Asymmetric Debt Management Engine",
      "Clean UI/UX & Responsive Layouts"
    ],
    "order": 0,
    "createdAt": new Date("2026-05-18T10:03:17.696Z"),
    "updatedAt": new Date("2026-05-18T10:03:17.696Z"),
    "isPublished": true
  },
  {
    "id": "550e8400-e29b-41d4-a716-446655440001",
    "title": "HitamoSpace @UR (Event Platform)",
    "description": "A high-availability event management and ticketing system built for large university functions, capable of handling 25K+ concurrent attendees and multi-venue inventory.",
    "technologies": [
      "React",
      "Next.js",
      "Prisma",
      "MongoDB",
      "WebRTC"
    ],
    "liveUrl": "https://hitamospace.ur.ac.rw/",
    "imageUrl": "/hitamoSpace.png",
    "highlights": [
      "Successfully scaled to support 25K+ attendees across multiple hybrid events.",
      "Implemented QR code verification and fraud-resistant checks for ticket security."
    ],
    "order": 1,
    "createdAt": new Date("2024-01-01T00:00:00.000Z"),
    "updatedAt": new Date("2024-01-01T00:00:00.000Z"),
    "isPublished": true
  },
  {
    "id": "cmpb0a6d8000d25hl427encpc",
    "title": "Mofresh",
    "description": "digital platform connecting farmers, suppliers, and clients through a marketplace.\nIt manages cold chain operations, tracking stock, product availability, and cold room capacity in real time.\nClients can place orders and request rentals, while site managers approve workflows and reserve resources.\nThe system generates invoices automatically and processes payments securely through Paypack.\nIt provides reports on stock, asset utilization, and financials, ensuring smooth agricultural supply management.",
    "technologies": [
      "React",
      "Nest.js",
      "postgreSQL"
    ],
    "liveUrl": "https://www.mofresh.rw/",
    "imageUrl": "https://res.cloudinary.com/dsi3ggvz4/image/upload/v1779096835/project-images/image/project-1779096833286.png",
    "highlights": [
      "Improved Cold Chain Efficiency",
      "Streamlined Agricultural Trade",
      "Automated Financial Operations"
    ],
    "order": 1,
    "createdAt": new Date("2026-05-18T09:32:51.260Z"),
    "updatedAt": new Date("2026-05-18T09:43:17.364Z"),
    "isPublished": true
  },
  {
    "id": "550e8400-e29b-41d4-a716-446655440002",
    "title": "Hotel Operations Platform",
    "description": "A centralized, frontend webfor managing reservations, automated payments (Stripe integration), housekeeping workflows, and real-time staff coordination for a multi-chain boutique hotel group.",
    "technologies": [
      "Html",
      "Javascript",
      "CSS"
    ],
    "liveUrl": "https://demo.hotelplatform.com",
    "imageUrl": "/hotel.png",
    "highlights": [
      "Reduced booking overhead by 38% with automated check-in/out workflows.",
      "Designed a secure, multi-tenant API using Next.js Server Actions for data integrity."
    ],
    "order": 2,
    "createdAt": new Date("2024-01-01T00:00:00.000Z"),
    "updatedAt": new Date("2024-01-01T00:00:00.000Z"),
    "isPublished": true
  },
  {
    "id": "550e8400-e29b-41d4-a716-446655440006",
    "title": "Smart Farm IoT",
    "description": "A real-time farm management dashboard connecting sensors, irrigation controls, and crop analytics for smarter agricultural operations.",
    "technologies": [
      "Next.js",
      "Node.js",
      "PostgreSQL",
      "Arduino",
      "c",
      "ML"
    ],
    "liveUrl": "https://demo.smartfarm.io",
    "imageUrl": "https://res.cloudinary.com/dsi3ggvz4/image/upload/v1779088097/project-images/image/project-1779088095008.jpg",
    "highlights": [
      "Reduced water usage by 27% through automated, sensor-driven irrigation rules.",
      "Built a live feed system for farm teams to monitor fields from mobile devices.",
      "Automation and Reduced Human Effort",
      "Data-Driven Smart Farming and Decision Making"
    ],
    "order": 6,
    "createdAt": new Date("2024-01-01T00:00:00.000Z"),
    "updatedAt": new Date("2026-05-18T09:55:16.314Z"),
    "isPublished": true
  }
];

export const seedSkills: Skill[] = [
  {
    "id": "cmpcous2e000025h4hplfqxgz",
    "name": "Hardware maintenance",
    "category": "tools",
    "proficiency": 50,
    "yearsOfExperience": 1,
    "order": 0,
    "isVisible": true
  },
  {
    "id": "cmp2lpb6m000023cckg09v6hk",
    "name": "Machine Learning",
    "category": "data science",
    "proficiency": 50,
    "yearsOfExperience": 1,
    "order": 0,
    "isVisible": true
  },
  {
    "id": "cmp2ss5ey000023c5q0pykymt",
    "name": "IOT",
    "category": "embeded system",
    "proficiency": 50,
    "yearsOfExperience": 1,
    "order": 0,
    "isVisible": true
  },
  {
    "id": "550e8400-e29b-41d4-a716-446655440011",
    "name": "React",
    "category": "frontend",
    "proficiency": 90,
    "yearsOfExperience": 4,
    "order": 1,
    "isVisible": true
  },
  {
    "id": "550e8400-e29b-41d4-a716-446655440012",
    "name": "Next.js",
    "category": "frontend",
    "proficiency": 88,
    "yearsOfExperience": 3,
    "order": 2,
    "isVisible": true
  },
  {
    "id": "550e8400-e29b-41d4-a716-446655440014",
    "name": "Node.js",
    "category": "backend",
    "proficiency": 87,
    "yearsOfExperience": 4,
    "order": 4,
    "isVisible": true
  },
  {
    "id": "550e8400-e29b-41d4-a716-446655440016",
    "name": "PostgreSQL",
    "category": "database",
    "proficiency": 80,
    "yearsOfExperience": 3,
    "order": 6,
    "isVisible": true
  },
  {
    "id": "550e8400-e29b-41d4-a716-446655440017",
    "name": "MongoDB",
    "category": "database",
    "proficiency": 75,
    "yearsOfExperience": 2,
    "order": 7,
    "isVisible": true
  },
  {
    "id": "cmpb1dbnb000e25hlmi1vss8g",
    "name": "React Native",
    "category": "mobile",
    "proficiency": 50,
    "yearsOfExperience": 0,
    "order": 1000,
    "isVisible": true
  },
  {
    "id": "cmpb0a6d0000c25hlwzciof1t",
    "name": "Nest.js",
    "category": "backend",
    "proficiency": 50,
    "yearsOfExperience": 0,
    "order": 1000,
    "isVisible": true
  },
  {
    "id": "cmp2kihg8000223cruqofdqcs",
    "name": "python",
    "category": "backend",
    "proficiency": 65,
    "yearsOfExperience": 0,
    "order": 1000,
    "isVisible": true
  },
  {
    "id": "cmpav1gzj000125hlhbtb2n3x",
    "name": "C",
    "category": "other",
    "proficiency": 50,
    "yearsOfExperience": 0,
    "order": 1001,
    "isVisible": true
  },
  {
    "id": "cmpb1dbnb000f25hlrdt8vtya",
    "name": "tailwind css",
    "category": "other",
    "proficiency": 50,
    "yearsOfExperience": 0,
    "order": 1001,
    "isVisible": true
  },
  {
    "id": "cmpav4a6t000325hljnavaut9",
    "name": "Arduino",
    "category": "other",
    "proficiency": 50,
    "yearsOfExperience": 0,
    "order": 1001,
    "isVisible": true
  },
  {
    "id": "cmpav4a6t000425hllmtjxf1p",
    "name": "ML",
    "category": "other",
    "proficiency": 50,
    "yearsOfExperience": 0,
    "order": 1002,
    "isVisible": true
  }
];

export const seedExperience: Experience[] = [
  {
    "id": "cmpavz7u7000525hl6a5d1va0",
    "company": "UR Binary Hub",
    "position": "Full stack developer",
    "description": "Long term interneurship where we Contributed to a full-stack event management platform, building responsive React.js interfaces, RESTful Node.js APIs, and a secure JWT-based authentication system with RBAC. Designed and integrated a ticketing system for event registration and attendance, collaborating with the team using Agile workflows and Git. we had also worked on different projects like ImoTrack, umutungobox , etc",
    "startDate": new Date("2022-03-01T00:00:00.000Z"),
    "technologies": [],
    "achievements": [],
    "order": 0,
    "isVisible": true
  }
];

export const seedCertificates: Certificate[] = [
  {
    "id": "cmp2zjq0f000023j12431hk2h",
    "name": "AI career essentials",
    "issuer": "ALX",
    "issueDate": new Date("2024-05-12T00:00:00.000Z"),
    "credentialUrl": "https://res.cloudinary.com/dsi3ggvz4/image/upload/v1778612706/portfolio-images/image/jukp29vy8ychkj8ikuwf.png",
    "imageUrl": "https://res.cloudinary.com/dsi3ggvz4/image/upload/v1778612706/portfolio-images/image/jukp29vy8ychkj8ikuwf.png",
    "description": "An intermediate knowledge for AI and Prompting Engeneering.",
    "skills": [],
    "order": 0,
    "isVisible": true
  },
  {
    "id": "cmpawwl86000825hl9eumqoq5",
    "name": "Cyber Security",
    "issuer": "Cisco Networking Academy",
    "issueDate": new Date("2026-04-11T00:00:00.000Z"),
    "credentialUrl": "https://res.cloudinary.com/dsi3ggvz4/image/upload/v1779091097/portfolio-images/image/aofv9d872p1zwdbdacie.pdf",
    "imageUrl": "https://res.cloudinary.com/dsi3ggvz4/image/upload/v1779091097/portfolio-images/image/aofv9d872p1zwdbdacie.pdf",
    "description": "A rigorous technical certification validating a strong foundation in digital asset protection, secure application design, and modern threat mitigation strategies. This training bridges the gap between software development and information security, ensuring a proactive approach to risk management.",
    "skills": [],
    "order": 0,
    "isVisible": true
  },
  {
    "id": "cmpawiugs000725hledq2wbav",
    "name": "Nodejs and Nestjs development",
    "issuer": "Solvit Africa",
    "issueDate": new Date("2026-01-18T00:00:00.000Z"),
    "credentialUrl": "https://res.cloudinary.com/dsi3ggvz4/image/upload/v1779090455/portfolio-images/image/wmcaqntldbazmb8wwwx9.pdf",
    "imageUrl": "https://res.cloudinary.com/dsi3ggvz4/image/upload/v1779090455/portfolio-images/image/wmcaqntldbazmb8wwwx9.pdf",
    "description": "A backend engineering credential covering Node.js and Nest.js architecture, practical application development, and professional software delivery. Sponsored under the Mastercard Foundation's Young African Works strategy to foster high-impact digital skills.",
    "skills": [],
    "order": 0,
    "isVisible": true
  },
  {
    "id": "cmpazwdwp000b25hl8bdzusm6",
    "name": "Geospatial Data & Open Mapping Specialist",
    "issuer": "GIZ Digital Transformation Center Rwanda, YouthMappers, OpenStreetMap Rwanda, and CyLab Africa (Carnegie Mellon University Africa)",
    "issueDate": new Date("2026-02-14T00:00:00.000Z"),
    "credentialUrl": "https://res.cloudinary.com/dsi3ggvz4/image/upload/v1779096126/portfolio-images/image/afigzlfwbuc8ukjovija.pdf",
    "imageUrl": "https://res.cloudinary.com/dsi3ggvz4/image/upload/v1779096126/portfolio-images/image/afigzlfwbuc8ukjovija.pdf",
    "description": "An intensive, hands-on technical training credential focused on modern geospatial data engineering, open-source mapping platforms, and data creation methodologies. This workshop, backed by international development and premier academic institutions like GIZ and Carnegie Mellon University Africa, certifies core practical competencies in leveraging humanitarian data to drive digital transformation and community innovation.",
    "skills": [],
    "order": 5,
    "isVisible": true
  },
  {
    "id": "cmpazhjiq000a25hl9g7xvky4",
    "name": "Intelligent Transportation System",
    "issuer": "Harbin Institute of Technology,University of Rwanda (UR - CST), and China Road and Bridge Corporation (CRBC)",
    "issueDate": new Date("2026-04-27T00:00:00.000Z"),
    "credentialUrl": "https://res.cloudinary.com/dsi3ggvz4/image/upload/v1779095433/portfolio-images/image/gsfcguzvn814bgzzaoob.jpg",
    "imageUrl": "https://res.cloudinary.com/dsi3ggvz4/image/upload/v1779095433/portfolio-images/image/gsfcguzvn814bgzzaoob.jpg",
    "description": "A high-level capacity-building and technical credential focusing on the intersection of advanced computing, IoT, and modern infrastructure. This international program provided deep insights into Intelligent Transportation Systems (ITS), smart infrastructure development, and the digital transformation of modern transit networks.",
    "skills": [],
    "order": 7,
    "isVisible": true
  }
];

// Local storage keys
export const STORAGE_KEYS = {
  PROJECTS: 'portfolio_projects',
  SKILLS: 'portfolio_skills',
  EXPERIENCE: 'portfolio_experience',
  CERTIFICATES: 'portfolio_certificates',
  LAST_SYNC: 'portfolio_last_sync',
  USE_LOCAL: 'portfolio_use_local'
};

// Helper functions for local storage operations
export const LocalStorageHelper = {
  saveToStorage<T>(key: string, data: T): void {
    try {
      if (typeof window !== 'undefined') {
        localStorage.setItem(key, JSON.stringify(data));
        localStorage.setItem(STORAGE_KEYS.LAST_SYNC, new Date().toISOString());
      }
    } catch (error) {
      console.error(`Failed to save to localStorage (${key}):`, error);
    }
  },

  loadFromStorage<T>(key: string, defaultValue: T): T {
    try {
      if (typeof window !== 'undefined') {
        const stored = localStorage.getItem(key);
        if (stored) {
          return JSON.parse(stored) as T;
        }
      }
    } catch (error) {
      console.error(`Failed to load from localStorage (${key}):`, error);
    }
    return defaultValue;
  },

  initializeStorage(): void {
    if (typeof window === 'undefined') return;

    const hasProjects = localStorage.getItem(STORAGE_KEYS.PROJECTS);
    
    if (!hasProjects) {
      console.log('Initializing local storage with seed data...');
      this.saveToStorage(STORAGE_KEYS.PROJECTS, seedProjects);
      this.saveToStorage(STORAGE_KEYS.SKILLS, seedSkills);
      this.saveToStorage(STORAGE_KEYS.EXPERIENCE, seedExperience);
      this.saveToStorage(STORAGE_KEYS.CERTIFICATES, seedCertificates);
      console.log('Seed data initialized successfully');
    }
  },

  clearStorage(): void {
    if (typeof window !== 'undefined') {
      Object.values(STORAGE_KEYS).forEach(key => {
        localStorage.removeItem(key);
      });
    }
  },

  isUsingLocal(): boolean {
    if (typeof window === 'undefined') return false;
    return localStorage.getItem(STORAGE_KEYS.USE_LOCAL) === 'true';
  },

  setLocalMode(useLocal: boolean): void {
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEYS.USE_LOCAL, String(useLocal));
    }
  }
};

export const transformStoredData = {
  projects(data: any[]): Project[] {
    return data.map(item => ({
      ...item,
      createdAt: new Date(item.createdAt),
      updatedAt: new Date(item.updatedAt)
    }));
  },

  experience(data: any[]): Experience[] {
    return data.map(item => ({
      ...item,
      startDate: new Date(item.startDate),
      endDate: item.endDate ? new Date(item.endDate) : undefined
    }));
  },

  certificates(data: any[]): Certificate[] {
    return data.map(item => ({
      ...item,
      issueDate: new Date(item.issueDate),
      expiryDate: item.expiryDate ? new Date(item.expiryDate) : undefined
    }));
  }
};
