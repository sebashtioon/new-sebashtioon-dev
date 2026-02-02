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
  {
    slug: "dont-ask-to-ask-but-for-devlogs",
    title: "dont ask to ask (but for devlogs)",
    date: "2026-02-02",
    summary: "how i like questions, feedback, and bug reports.",
    content: (
      <>
        <p className="lowercase">
          if you want to ask something, ask it. do not preface it with "can i
          ask" or "is anyone here".
        </p>

        <h2 className="text-xl font-bold font-serif lowercase">good</h2>
        <ul className="list-disc pl-6 lowercase text-foreground/90">
          <li>"the build crashes when i open the settings menu. logs: ..."</li>
          <li>"is the psx look using vertex snapping or post processing?"</li>
          <li>"feature idea: add x. reason: y. tradeoff: z."</li>
        </ul>

        <h2 className="text-xl font-bold font-serif lowercase">bad</h2>
        <ul className="list-disc pl-6 lowercase text-foreground/90">
          <li>"anyone free?"</li>
          <li>"can i ask a question"</li>
          <li>"it doesnt work"</li>
        </ul>

        <h2 className="text-xl font-bold font-serif lowercase">why</h2>
        <p className="lowercase">
          the pre-question adds latency and removes context. the actual question
          is what matters.
        </p>
      </>
    ),
  },
];
