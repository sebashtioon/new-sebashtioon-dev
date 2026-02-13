import { Link, useLocation } from "react-router-dom";
import { useEffect, useRef, useState } from "react";

const BottomNav = () => {
  const location = useLocation();
  const [isMoreOpen, setIsMoreOpen] = useState(false);
  const moreRef = useRef<HTMLDivElement | null>(null);

  const primaryNavItems = [
    { name: "home", path: "/" },
    { name: "projects", path: "/projects" },
    { name: "blog", path: "/blog" },
    { name: "contact", path: "/contact" },
  ];

  // "less important but still there" pages
  const moreNavItems = [
    { name: "music", path: "/music" },
  ];

  const isActive = (path: string) => {
    if (path === "/") return location.pathname === "/";
    return location.pathname === path || location.pathname.startsWith(`${path}/`);
  };

  // Close the dropdown when navigating.
  useEffect(() => {
    setIsMoreOpen(false);
  }, [location.pathname]);

  // Close on outside click.
  useEffect(() => {
    const onMouseDown = (e: MouseEvent) => {
      if (!isMoreOpen) return;
      const node = moreRef.current;
      if (!node) return;
      if (e.target instanceof Node && !node.contains(e.target)) {
                  className={`text-sm lowercase transition-all duration-200 hover:text-foreground ${
      }
                      ? "text-foreground font-medium"
                      : "text-muted-foreground"
    document.addEventListener("mousedown", onMouseDown);
    return () => document.removeEventListener("mousedown", onMouseDown);
  }, [isMoreOpen]);

  return (
    <nav className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-[100]" ref={moreRef}>
      {/* More menu */}
      {isMoreOpen && (
        <div className="absolute left-1/2 -translate-x-1/2 bottom-[calc(100%+10px)]">
          <div className="flex items-center gap-4 px-4 py-2 bg-card border border-border shadow-lg">
        <div className="flex items-center gap-6 px-4 py-2 bg-card/80 backdrop-blur-md rounded-full border border-border/50 shadow-lg">
              <Link
                key={item.name}
                to={item.path}
                className={`text-sm lowercase transition-all duration-200 hover:text-white ${
              className={`text-sm lowercase transition-all duration-200 hover:text-foreground ${
                }`}
                  ? "text-foreground font-medium"
                  : "text-muted-foreground"
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Primary bar */}
      <div className="flex items-center gap-6 px-4 py-2 bg-card border border-border shadow-lg">
        {primaryNavItems.map((item) => (
          <Link
            key={item.name}
            to={item.path}
            className={`text-sm lowercase transition-all duration-200 hover:text-white ${
              isActive(item.path) ? "text-white font-medium" : "text-white/60"
            }`}
          >
            {item.name}
          </Link>
        ))}

        <button
          type="button"
          onClick={() => setIsMoreOpen((v) => !v)}
          aria-label="more"
          className={`text-sm lowercase transition-all duration-200 hover:text-white ${
            isMoreOpen ? "text-white" : "text-white/60"
          }`}
        >
          {isMoreOpen ? "<" : ">"}
        </button>
      </div>
    </nav>
  );
};

export default BottomNav;