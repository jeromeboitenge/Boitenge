import ProjectCard from "./ProjectCard";

const sample = [
  {
    title: "Hotel Management System",
    description:
      "A complete hotel management platform including room booking, staff management, online payments, and analytics.",
    tech: ["React", "Node.js", "MongoDB", "Tailwind CSS"],
    image: "/hotel-project.jpg",
    github: "https://github.com/jeromeboitenge/hotel-management-system",
    demo: "#",
  },
  {
    title: "Event Management System (HitamoSpace)",
    description:
      "Manage internal and external events with intelligent scheduling, QR code registration, and finance tracking.",
    tech: ["Next.js", "Node.js", "Prisma", "Tailwind CSS"],
    image: "/hitamoSpace.png",
    github: "https://github.com/jeromeboitenge/hitamospace",
    demo: "#",
  },
  {
    title: "ExploreHub Platform",
    description:
      "A tourism platform to explore, review, and share destinations in Rwanda with Google Maps integration.",
    tech: ["MERN Stack", "Google Maps API", "Tailwind CSS"],
    image: "/explorehub-project.jpg",
    github: "https://github.com/jeromeboitenge/explorehub",
    demo: "#",
  },
];

export default function ProjectPreview() {
  return (
    <div className="grid md:grid-cols-3 gap-6">
      {sample.map((p) => (
        <ProjectCard
          key={p.title}
          title={p.title}
          description={p.description}
          tech={p.tech}
          image={p.image}
          github={p.github}
          demo={p.demo}
        />
      ))}
    </div>
  );
}
