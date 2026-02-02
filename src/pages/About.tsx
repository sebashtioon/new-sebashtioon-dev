import ProsePage from "@/components/ProsePage";

const About = () => {
  return (
    <ProsePage
      title="about"
      subtitle={
        <span className="lowercase">
          placeholder page. write something real when you feel like it.
        </span>
      }
    >
      <p className="lowercase">
        hi. im sebashtioon. i make games, 3d stuff, and occasionally i remember
        to document it.
      </p>
      <p className="lowercase">
        this site is a scrapbook. if youre looking for a resume, this is not it.
      </p>
      <ul className="list-disc pl-6 lowercase text-foreground/90">
        <li>engine: godot</li>
        <li>tools: blender, whatever works</li>
        <li>interests: horror, psx aesthetics, systems</li>
      </ul>
    </ProsePage>
  );
};

export default About;
