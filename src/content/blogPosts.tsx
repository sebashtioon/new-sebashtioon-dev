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
    summary: "a small manifesto: fewer pixels, more words.",
    content: (
      <>
        <p className="text-muted-foreground lowercase">
          this is a placeholder post. edit it or delete it.
        </p>

        <h2 className="text-xl font-bold font-serif lowercase">the point</h2>
        <p className="lowercase">
          i want this to feel like a static website you find at 2am. minimal
          navigation. readable text. less performance cosplay. fewer sections
          screaming at you.
        </p>

        <h2 className="text-xl font-bold font-serif lowercase">rules i try to follow</h2>
        <ul className="list-disc pl-6 lowercase text-foreground/90">
          <li>write the thing, then stop.</li>
          <li>no infinite scroll anything.</li>
          <li>links should look like links.</li>
          <li>no mandatory accounts.</li>
          <li>the page should load even on bad wifi.</li>
        </ul>

        <h2 className="text-xl font-bold font-serif lowercase">note</h2>
        <p className="lowercase">
          yes, the rest of the site can still be flashy. but the writing parts
          should be calm.
        </p>
      </>
    ),
  },
];
