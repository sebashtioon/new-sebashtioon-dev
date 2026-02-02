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
        <span className="lowercase">
          welcome to sleep paralysis. psx-ish horror. in development.
        </span>
      }
    >
      <section className="space-y-3">
        <h2 className="text-xl font-bold font-serif lowercase">elevator pitch</h2>
        <p className="lowercase">
          you are awake. your body is not. something is in the room.
        </p>
        <p className="lowercase text-muted-foreground">
          this page is where i will yap. its intentionally text-first.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold font-serif lowercase">status</h2>
        <ul className="list-disc pl-6 lowercase text-foreground/90">
          <li>engine: godot</li>
          <li>platforms: TBD</li>
          <li>release: when it stops fighting me</li>
        </ul>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold font-serif lowercase">features (draft)</h2>
        <ul className="list-disc pl-6 lowercase text-foreground/90">
          <li>short sessions. high tension. minimal filler.</li>
          <li>psx era visuals (low poly, jitter, crunchy lighting).</li>
          <li>diegetic ui where possible.</li>
          <li>sound design does most of the horror work.</li>
          <li>replay value via small variations.</li>
        </ul>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold font-serif lowercase">design notes</h2>
        <ul className="list-disc pl-6 lowercase text-foreground/90">
          <li>the player should feel trapped even in a small space.</li>
          <li>cheap jumpscares are optional. dread is mandatory.</li>
          <li>controls should be simple enough to play half-asleep.</li>
        </ul>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold font-serif lowercase">devlog (placeholder)</h2>
        <ul className="list-disc pl-6 lowercase text-foreground/90">
          <li>2026-02-02: created this page so i cant hide anymore.</li>
          <li>TODO: add real entries (build notes, screenshots, links).</li>
        </ul>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold font-serif lowercase">faq</h2>
        <p className="lowercase">
          <span className="font-bold">q:</span> is there a demo?
          <br />
          <span className="font-bold">a:</span> not public yet.
        </p>
        <p className="lowercase">
          <span className="font-bold">q:</span> can i playtest?
          <br />
          <span className="font-bold">a:</span> yes, eventually. bring useful feedback.
        </p>
      </section>
    </ProsePage>
  );
};

export default CantWakeUp;
