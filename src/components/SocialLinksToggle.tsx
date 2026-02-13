import { useState } from "react";
import SocialLinks from "@/components/SocialLinks";

type SocialLinksToggleProps = {
  className?: string;
  defaultOpen?: boolean;
};

const SocialLinksToggle = ({ className, defaultOpen = false }: SocialLinksToggleProps) => {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className={className}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="px-3 py-1.5 bg-card hover:bg-card-hover text-foreground border border-border text-sm lowercase"
      >
        {open ? "hide links" : "links"}
      </button>

      {open && (
        <div className="mt-3 px-3 py-2 bg-card border border-border">
          <SocialLinks className="text-sm text-muted-foreground lowercase space-y-1" />
        </div>
      )}
    </div>
  );
};

export default SocialLinksToggle;
