import ProsePage from "@/components/ProsePage";

const Uses = () => {
  return (
    <ProsePage
      title="uses"
      subtitle={
        <span className="lowercase">
          tools i use. this is a placeholder list.
        </span>
      }
    >
      <h2 className="text-xl font-bold font-serif lowercase">software</h2>
      <ul className="list-disc pl-6 lowercase text-foreground/90">
        <li>godot</li>
        <li>blender</li>
        <li>vscode</li>
      </ul>

      <h2 className="text-xl font-bold font-serif lowercase">hardware</h2>
      <ul className="list-disc pl-6 lowercase text-foreground/90">
        <li>pc</li>
        <li>keyboard</li>
        <li>mouse</li>
      </ul>

      <p className="lowercase text-muted-foreground">
        TODO: replace with your real setup.
      </p>
    </ProsePage>
  );
};

export default Uses;
