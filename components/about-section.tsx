const skills = [
  { category: "AI / ML", items: ["PyTorch", "Transformers", "Diffusion Models", "Embeddings"] },
  { category: "Creative Coding", items: ["p5.js", "Three.js", "WebGL", "GLSL"] },
  { category: "Development", items: ["TypeScript", "React", "Next.js", "Python"] },
];

export function AboutSection() {
  return (
    <section id="about" className="py-24 px-6 border-t border-border/50">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16">
          <div>
            <h2 className="text-sm text-muted-foreground uppercase tracking-wider mb-8">
              About
            </h2>

            <div className="space-y-6 text-foreground leading-relaxed">
              <p>
                I&apos;m a creative technologist based in Brooklyn, working at the edge 
                of what&apos;s possible when art meets artificial intelligence.
              </p>
              <p>
                My background spans computer science and fine arts, and I believe 
                the most interesting work happens when we stop treating technology 
                as a tool and start treating it as a collaborator.
              </p>
              <p>
                Currently, I&apos;m exploring how large language models can be used not 
                just to generate content, but to help us think in new ways. I&apos;m 
                interested in tools that augment human creativity rather than 
                replace it.
              </p>
              <p className="text-muted-foreground">
                Previously, I&apos;ve worked with studios and research labs including 
                <span className="text-foreground underline decoration-border underline-offset-4 hover:decoration-accent transition-colors cursor-pointer"> Google Creative Lab</span>,
                <span className="text-foreground underline decoration-border underline-offset-4 hover:decoration-accent transition-colors cursor-pointer"> MIT Media Lab</span>, and
                <span className="text-foreground underline decoration-border underline-offset-4 hover:decoration-accent transition-colors cursor-pointer"> Runway</span>.
              </p>
            </div>
          </div>

          <div>
            <h2 className="text-sm text-muted-foreground uppercase tracking-wider mb-8">
              Skills
            </h2>

            <div className="space-y-8">
              {skills.map((skill) => (
                <div key={skill.category}>
                  <h3 className="text-foreground font-medium mb-3">
                    {skill.category}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {skill.items.map((item) => (
                      <span
                        key={item}
                        className="text-sm px-3 py-1.5 bg-secondary text-muted-foreground rounded-md hover:text-foreground transition-colors"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
