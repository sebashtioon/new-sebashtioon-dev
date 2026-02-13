type SocialLinksProps = {
  className?: string;
};

const ITEMS = [
  {
    label: "yt:",
    href: "https://www.youtube.com/@sebashtioon_",
    text: "@sebashtioon_",
  },
  {
    label: "gh:",
    href: "https://github.com/sebashtioon",
    text: "sebashtioon",
  },
  {
    label: "signal:",
    href: null,
    text: "@sebashtioon.01",
  },
  {
    label: "last fm:",
    href: "https://www.last.fm/user/sebashtioon",
    text: "sebashtioon",
  },
  {
    label: "stats fm:",
    href: "https://stats.fm/sebashtioon",
    text: "sebashtioon",
  },
] as const;

const SocialLinks = ({ className }: SocialLinksProps) => {
  return (
    <div className={className}>
      {ITEMS.map((item) => (
        <div
          key={item.label}
          className="flex items-baseline gap-2"
        >
          <span className="shrink-0">{item.label}</span>
          {item.href ? (
            <a
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-4"
            >
              {item.text}
            </a>
          ) : (
            <span className="text-foreground/90">{item.text}</span>
          )}
        </div>
      ))}
    </div>
  );
};

export default SocialLinks;
