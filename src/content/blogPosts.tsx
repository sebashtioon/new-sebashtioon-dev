import { ReactNode } from "react";

export type BlogPost = {
  slug: string;
  title: string;
  date: string;
  summary: string;
  content: ReactNode;
};

export const blogPosts: BlogPost[] = [
  {
    slug: "why-this-site-is-plain",
    title: "why this site is plain",
    date: "2026-02-02",
    summary: "this site's design philosophy",
    content: (
      <>
        <h2 className="text-xl font-bold font-serif lowercase">the point</h2>
        <p className="lowercase">
          i want this site to feel like something you find at 2am and actually read. no "look how modern i am" animations
        </p>

        <p className="lowercase">
          the goal isnt to be anti-design, just... design isn't really needed or the point
        </p>

        <div className="border-t border-border/30 my-5" />

        <h2 className="text-xl font-bold font-serif lowercase">rules i try to follow</h2>
        <ul className="list-disc pl-6 lowercase text-foreground/90">
          <li>write the thing, then stop</li>
          <li>navigation stays small and predictable</li>
          <li>links should look like links</li>
          <li>no infinite scroll anything</li>
          <li>the page should load on bad wifi</li>
          <li>no mandatory accounts, popups, or dark pattern nonsense</li>
        </ul>

        <h2 className="text-xl font-bold font-serif lowercase">note</h2>
        <p className="lowercase">
          some pages can still be flashy. but anything with words should be calm
        </p>
      </>
    ),
  },
];
