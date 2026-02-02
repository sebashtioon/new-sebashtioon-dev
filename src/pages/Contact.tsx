import ProsePage from "@/components/ProsePage";

const Contact = () => {
  return (
    <ProsePage
      title="contact"
      subtitle={
        <span className="lowercase">
          placeholder. put your preferred contact methods here.
        </span>
      }
    >
      <p className="lowercase">
        if you want to reach me, include context and links.
      </p>
      <ul className="list-disc pl-6 lowercase text-foreground/90">
        <li>best: add a link (video, log, screenshot)</li>
        <li>worst: "hey" and nothing else</li>
      </ul>
    </ProsePage>
  );
};

export default Contact;
