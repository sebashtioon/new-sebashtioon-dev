import ProsePage from "@/components/ProsePage";
import { Link } from "react-router-dom";

const CantWakeUp = () => {
  return (
    <ProsePage
      title="cant wake up"
      breadcrumb={
        <>
          <Link to="/projects" className="hover:text-foreground transition-colors">
            projects
          </Link>
          <span className="mx-2">/</span>
          <span className="text-muted-foreground">cant-wake-up</span>
        </>
      }
      subtitle={
        <span className="lowercase">a small first-person horror game about chores, paranoia, and sleep paralysis.</span>
      }
    >
      <section className="space-y-3">
        <h2 className="text-xl font-bold font-serif lowercase">what youre playing</h2>
        <p className="lowercase">
          youre a kid (like 9-10). you just moved into a new house. your parents are out most nights. you do normal stuff alone and pretend the place feels normal back.
        </p>
        <p className="lowercase">each night splits into two vibes: <span className="font-bold">normal life</span> and <span className="font-bold">oh no</span>.</p>

        <div className="border-t border-border/30 my-5" />

        <h3 className="text-lg font-bold font-serif lowercase">normal life</h3>
        <p className="lowercase">
          you're doing small chores around the house: unpacking boxes, folding clothes, making dinner, brushing your teeth, turning off lights. the longer you go, the more the house starts doing subtle weird things while you're trying to stay calm.
        </p>
        <ul className="list-disc pl-6 lowercase text-foreground/90">
          <li>tasks undo themselves</li>
          <li>creepy anomalies (blood on clothes, handprints on mirrors)</li>
          <li>the tv glitches, objects feel "wrong"</li>
        </ul>

        <h3 className="text-lg font-bold font-serif lowercase">oh no (sleep paralysis)</h3>
        <p className="lowercase">
          then you go to bed and it turns into survival: sleep paralysis episodes where you're stuck in bed, barely able to look around. something is in the room. you survive by timing your breathing and blinking / holding your eyes shut at the right moments.
        </p>
        <p className="lowercase">
          sometimes you "wake up" but it's not real (false wake-up, dream-in-a-dream). you have to figure it out fast before the monster does.
        </p>

        <p className="lowercase text-muted-foreground">
          scope: ten nights. chores turn into paranoia, then paralysis turns into survival. everything escalates until the final night.
        </p>
      </section>
    </ProsePage>
  );
};

export default CantWakeUp;
