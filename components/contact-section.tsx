const socialLinks = [
  { label: "GitHub", href: "https://github.com" },
  { label: "LinkedIn", href: "https://linkedin.com" },
  { label: "X", href: "https://x.com" },
  { label: "Instagram", href: "https://instagram.com" },
];

export function ContactSection() {
  return (
    <section id="contact" className="py-24 px-6 border-t border-border/50">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16">
          <div>
            <h2 className="text-sm text-muted-foreground uppercase tracking-wider mb-8">
              Contact
            </h2>

            <p className="text-2xl md:text-3xl font-medium leading-relaxed text-balance mb-8">
              If you&apos;d like to discuss a project or just say hi, I&apos;m always open to 
              chat.
            </p>

            <a
              href="mailto:hello@wwilloww.ai"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-foreground text-background rounded-md text-sm font-medium hover:bg-foreground/90 transition-colors"
            >
              Get in Touch
            </a>
          </div>

          <div>
            <div className="space-y-6">
              <div>
                <h3 className="text-sm text-muted-foreground mb-2">Email</h3>
                <a
                  href="mailto:hello@wwilloww.ai"
                  className="text-foreground hover:text-accent transition-colors"
                >
                  hello@wwilloww.ai
                </a>
              </div>

              <div>
                <h3 className="text-sm text-muted-foreground mb-3">Social</h3>
                <div className="flex flex-col gap-2">
                  {socialLinks.map((link) => (
                    <a
                      key={link.label}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-foreground hover:text-accent transition-colors inline-flex items-center gap-2 group"
                    >
                      {link.label}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="12"
                        height="12"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <line x1="7" y1="17" x2="17" y2="7" />
                        <polyline points="7 7 17 7 17 17" />
                      </svg>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
