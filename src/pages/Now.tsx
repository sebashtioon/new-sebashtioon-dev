import ProsePage from "@/components/ProsePage";

const Now = () => {
  return (
    <ProsePage
      title="now"
      subtitle={
        <span className="lowercase">
          a /now page. update it when your brain changes projects.
        </span>
      }
    >
      <p className="lowercase">currently:</p>
      <ul className="list-disc pl-6 lowercase text-foreground/90">
        <li>working on cant wake up</li>
        <li>making this site less embarrassing</li>
        <li>collecting references like a raccoon</li>
      </ul>
      <p className="lowercase text-muted-foreground">
        last updated: 2026-02-02
      </p>
    </ProsePage>
  );
};

export default Now;
