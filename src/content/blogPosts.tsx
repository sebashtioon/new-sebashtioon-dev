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
    slug: "cantwakeup-ted-talk",
    title: "CANTWAKEUP ted talk",
    date: "2026-03-28",
    summary: "an endless yap about my latest game",
    content: (
      <>
        <p className="lowercase">
          okay so... what actually <em>is</em> this game???
        </p>

        <p className="lowercase">
          one day a few years ago i was scrolling yt shorts and saw a video about sleep paralysis. i hadnt known what it was about prior to this one video. i did a lil research on it and it seemed pretty cool to me...
        </p>

        <p className="lowercase">until i had my own sleep paralysis experience.</p>

        <p className="font-bold normal-case">AT ALL</p>

        <p className="lowercase">
          in fact, this game is mostly based off of that one experience. (not the backstory or lore that i will get into later)
        </p>

        <p className="lowercase">
          okay okay well if you dont know what sleep paralysis is, its pretty much your mind being awake but your body sound asleep. and if you ask me this is quite fucking stupid like why has evolution not solved this problem gng :skulk: and for some reason, your eyes arent paralyzed like the rest of your body is so you know what that means. <span className="font-bold normal-case">YOU OPEN THEM!!!</span> oh, but because youre also "dreaming" at the same time as being paralyzed that means your brain goes haywire and creates things that arent real (i.e. hallucinations) these feel ultra real because your brain is mixing dream shit with actual reality (e.g. <strong>backrooms entity looking ahh</strong> and <strong>your bedroom</strong>). on top of that, your brain is so evolved that you can actually <em>FEEL</em> things that happen in this dream/reality hybrid. so that means, if the demon or figure (whatever fuckery your noodle is brewing up this week) is on your bed with you, you can <strong><em>feel</em></strong> it. this might be a weight on your chest or breathing in your face. but dont worry, these demons or dream things happening in your room <em>arent actually real.</em> well, thats not quite the case for this game (mostly).
        </p>

        <p className="lowercase">
          this game is called <span className="normal-case">"CANTWAKEUP"</span>. yes, in all caps so i make it seem super scary. i might refer to it as "cwu" from here on out just because its less effort to type out and also cuz im lazy. after this sleep paralysis episode of mine, i suddenly just had an idea. to make a game out of it. i was planning this game to be playable at the same length that would go in a markiplier video or playthrough (your typical psx/ps1 style short horror game thats around 30min long). this was only thought up relatively recently, but the backstory of the game is, youre a kid (probably like 9-10 years old, so quite young) and you just moved into a new house. and guess what? you have severe sleep paralysis episodes!!!! your parents are out at work while youre left to suffer alone at home. they leave you tasks/chores to do on a peice of paper on the kitchen table everyday, and you need to complete them or your sleep paralysis episodes get worse. i mean regardless of whether you complete them or not youre gonna have <em>something</em> that night but it wont be as harsh as it would be if you didnt do any of the tasks.
        </p>

        <p className="lowercase">
          once completed the tasks, you may go to bed. these tasks will vary each night as there will be different stuff around the house to do. each night the anomalies in the tasks increase. this includes but isnt limited to:
        </p>

        <ul className="list-disc pl-6 lowercase text-foreground/90">
          <li>the pizza in the fridge being green for some reason</li>
          <li>bloody hand prints on the mirror after shower</li>
          <li>tv playing weird stuff/distortion</li>
          <li>when folding clothes, one shirt is covered in blood/has a bloody handprint on it</li>
          <li>doing a task but it actually "undoes" itself so you have to do it again</li>
        </ul>

        <p className="lowercase">
          the fact that your episodes are worse if you dont complete the chores that your parents set you may lead into some crazy plot twist at the end where your parents... are actually the sleep paralysis demon? or at least one of them. idk, just an idea. seems cool tho
        </p>

        <p className="lowercase">
          anyways, in the game you need to complete 10 nights. as stated before, the anomalies and difficulty gets worse and harder as the nights progress. night 1 is pretty much free or a tutorial night. night 2-4 are quite easy, night 5-7 are medium level and 8-10 are the hardest. dont worry, i might implement a game saving system if im bothered to lmao.
        </p>

        <p className="lowercase">
          what would be a sleep paralysis episode without a demon? i was brainstorming ideas with my friend once and he said i should name him kai. so, say hi to kai!
        </p>

        <img
          src="/blog/cantwakeup-ted-talk/cwu-1.png"
          alt="kai concept image"
          className="w-full border border-border/40"
          loading="lazy"
        />

        <p className="lowercase">
          i was super excited to start making it so i got straight to it, even though i didnt have a general idea of the lore or story in the game (let alone what the player actually does) back then. i started making a simple layout of a house, and just the general room setup and stuff, as seen below. yes, this was done in canva
        </p>

        <img
          src="/blog/cantwakeup-ted-talk/cwu-2.png"
          alt="early house layout in canva"
          className="w-full border border-border/40"
          loading="lazy"
        />

        <p className="lowercase">before long i had the basic layout..</p>

        <p className="lowercase">(the rest of this ted talk is todo for now, sorry not sorry)</p>
      </>
    ),
  },
  {
    slug: "why-this-site-is-plain",
    title: "why this site is plain",
    date: "2026-02-02",
    summary: "this site's design philosophy",
    content: (
      <>
        <h2 className="text-xl font-bold font-serif lowercase">the point</h2>
        <p className="lowercase">
          i want this site to feel like something you find at 2am and actually read. no goofy ai slop animations
        </p>

        <p className="lowercase">
          design isn't really needed or the point
        </p>

        <div className="border-t border-border/30 my-5" />

        <h2 className="text-xl font-bold font-serif lowercase">rules</h2>
        <ul className="list-disc pl-6 lowercase text-foreground/90">
          <li>write the thing, then stop</li>
          <li>navigation stays small and predictable</li>
          <li>links should look like links</li>
          <li>no infinite scroll anything</li>
          <li>the page should load on bad wifi (ive done tests dw)</li>
        </ul>
      </>
    ),
  },
];
