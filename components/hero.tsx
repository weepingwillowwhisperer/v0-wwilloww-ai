import Link from "next/link";

export function Hero() {
  return (
    <section className="min-h-screen flex flex-col justify-center px-6 pt-20">
      <div className="max-w-4xl mx-auto w-full">
        <p className="text-muted-foreground text-sm mb-4">Creative Technologist</p>
        
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-medium leading-tight text-balance mb-8">
          <span className="italic font-serif">Crafting experiences</span> at the intersection of 
          artificial intelligence, generative art, and human connection.
        </h1>

        <div className="text-lg text-muted-foreground max-w-2xl space-y-4 mb-12">
          <p>
            I build tools and experiences that explore what becomes possible when we 
            collaborate with intelligent systems. My work spans machine learning, 
            creative coding, and interactive installations.
          </p>
        </div>

        <div className="flex flex-wrap gap-4">
          <Link
            href="#work"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-foreground text-background rounded-md text-sm font-medium hover:bg-foreground/90 transition-colors"
          >
            View Work
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
            >
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </Link>
          <Link
            href="#contact"
            className="inline-flex items-center gap-2 px-5 py-2.5 border border-border text-foreground rounded-md text-sm font-medium hover:bg-secondary transition-colors"
          >
            Get in Touch
          </Link>
        </div>
      </div>
    </section>
  );
}
