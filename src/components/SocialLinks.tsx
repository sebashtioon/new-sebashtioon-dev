type SocialLinksProps = {
  className?: string;
};

const LINKS = {
  youtube: "https://www.youtube.com/@sebashtioon_",
  github: "https://github.com/sebashtioon",
  lastfm: "https://www.last.fm/user/sebashtioon",
  statsfm: "https://stats.fm/sebashtioon",
  signal: "@sebashtioon.01",
} as const;

const SocialLinks = ({ className }: SocialLinksProps) => {
  return (
    <div className={className}>
      <div>yt: <a href={LINKS.youtube} target="_blank" rel="noopener noreferrer" className="underline underline-offset-4">{LINKS.youtube}</a></div>
      <div>gh: <a href={LINKS.github} target="_blank" rel="noopener noreferrer" className="underline underline-offset-4">{LINKS.github}</a></div>
      <div>signal: <span className="text-foreground/90">{LINKS.signal}</span></div>
      <div>last fm: <a href={LINKS.lastfm} target="_blank" rel="noopener noreferrer" className="underline underline-offset-4">{LINKS.lastfm}</a></div>
      <div>stats fm: <a href={LINKS.statsfm} target="_blank" rel="noopener noreferrer" className="underline underline-offset-4">{LINKS.statsfm}</a></div>
    </div>
  );
};

export default SocialLinks;
