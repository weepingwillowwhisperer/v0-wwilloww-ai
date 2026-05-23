export function Footer() {
  return (
    <footer className="py-8 px-6 border-t border-border/50">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-sm text-muted-foreground">
          {new Date().getFullYear()} wwilloww.ai
        </p>
        <p className="text-sm text-muted-foreground">
          Built with care in Brooklyn
        </p>
      </div>
    </footer>
  );
}
