import ProjectCard from "./ProjectCard";
import { projects } from "../data/content";

export default function Projects() {
  return (
    <>
      <section
        id="projects"
        className="relative z-10 px-6 pt-16 pb-2 text-center"
      >
        <p className="text-sm uppercase tracking-widest text-[var(--accent)] mb-2">
          Deployed systems
        </p>
        <p className="text-sm text-[var(--text-dim)] max-w-md mx-auto mb-12">
          Bracketed fields are placeholders: real summaries, stacks, and
          links go here.
        </p>
      </section>
      {projects.map((project) => (
        <ProjectCard key={project.id} project={project} />
      ))}
      <div className="relative z-10 pb-16" />
    </>
  );
}
