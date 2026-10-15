import ProjectCard from "./ProjectCard";
import { projects } from "../data/content";

export default function Projects() {
  return (
    <>
      <section id="projects" className="relative z-10 px-6 pt-20 pb-6 text-center">
        <p className="eyebrow mb-4">Deployed systems</p>
        <h2 className="text-gradient text-[clamp(1.6rem,4.5vw,2.4rem)] tracking-[-0.03em] font-semibold mb-4 text-balance">
          Systems built to stay up
        </h2>
        <p className="text-[0.95rem] leading-relaxed text-[var(--text-dim)] max-w-md mx-auto">
          Systems shaped for uptime, clarity and maintainability.
        </p>
      </section>
      {projects.map((project, i) => (
        <ProjectCard key={project.id} project={project} index={i} total={projects.length} />
      ))}
      <div className="relative z-10 pb-16" />
    </>
  );
}
