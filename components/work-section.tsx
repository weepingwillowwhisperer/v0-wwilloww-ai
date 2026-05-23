"use client";

import { useState } from "react";

const projects = [
  {
    title: "Neural Canvas",
    description:
      "An interactive installation exploring collaborative creativity between humans and AI models. Real-time generation and manipulation of visual art.",
    tags: ["Installation", "Machine Learning", "WebGL"],
    year: "2024",
    link: "#",
  },
  {
    title: "Whisper Garden",
    description:
      "A generative audio-visual experience that transforms spoken words into evolving digital ecosystems. Built with custom diffusion models.",
    tags: ["Generative Art", "Audio", "React"],
    year: "2024",
    link: "#",
  },
  {
    title: "Memory Weave",
    description:
      "An AI-powered tool for capturing and connecting ideas. Uses semantic embeddings to surface unexpected relationships between thoughts.",
    tags: ["Product", "AI/ML", "Next.js"],
    year: "2023",
    link: "#",
  },
  {
    title: "Rhythm Protocol",
    description:
      "Open-source framework for building adaptive music systems. Powers interactive soundscapes that respond to user behavior and context.",
    tags: ["Open Source", "Audio", "TypeScript"],
    year: "2023",
    link: "#",
  },
];

export function WorkSection() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section id="work" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-12">
          <h2 className="text-sm text-muted-foreground uppercase tracking-wider">
            Selected Work
          </h2>
        </div>

        <div className="space-y-1">
          {projects.map((project, index) => (
            <a
              key={project.title}
              href={project.link}
              className="group block py-6 border-t border-border/50 hover:bg-secondary/30 transition-colors -mx-4 px-4"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <div className="flex flex-col md:flex-row md:items-start gap-4 md:gap-8">
                <div className="md:w-24 shrink-0">
                  <span className="text-sm text-muted-foreground">
                    {project.year}
                  </span>
                </div>

                <div className="flex-1 min-w-0">
                  <h3 className="text-xl font-medium mb-2 group-hover:text-accent transition-colors flex items-center gap-2">
                    {project.title}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className={`transition-all duration-200 ${
                        hoveredIndex === index
                          ? "opacity-100 translate-x-0"
                          : "opacity-0 -translate-x-2"
                      }`}
                    >
                      <line x1="7" y1="17" x2="17" y2="7" />
                      <polyline points="7 7 17 7 17 17" />
                    </svg>
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed max-w-xl">
                    {project.description}
                  </p>
                </div>

                <div className="flex flex-wrap gap-2 md:w-48 md:justify-end shrink-0">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs px-2 py-1 bg-secondary text-muted-foreground rounded"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
