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

  const moreNavItems = [{ name: "music", path: "/music" }];

  const isActive = (path: string) => {
    if (path === "/") return location.pathname === "/";
    return location.pathname === path || location.pathname.startsWith(`${path}/`);
  };

  useEffect(() => {
    setIsMoreOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const onMouseDown = (e: MouseEvent) => {
      if (!isMoreOpen) return;
      const node = moreRef.current;
      if (!node) return;
      if (e.target instanceof Node && !node.contains(e.target)) {
        setIsMoreOpen(false);
      }
    };

    document.addEventListener("mousedown", onMouseDown);
    return () => document.removeEventListener("mousedown", onMouseDown);
  }, [isMoreOpen]);

  return (
    <nav className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-[100]" ref={moreRef}>
      {isMoreOpen && (
        <div className="absolute left-1/2 -translate-x-1/2 bottom-[calc(100%+10px)]">
          <div className="flex items-center gap-4 px-4 py-2 bg-card border border-border shadow-lg">
            {moreNavItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`text-sm lowercase transition-all duration-200 hover:text-foreground ${
                  isActive(item.path) ? "text-foreground font-medium" : "text-muted-foreground"
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      )}

      <div className="flex items-center gap-6 px-4 py-2 bg-card/80 backdrop-blur-md rounded-full border border-border/50 shadow-lg">
        {primaryNavItems.map((item) => (
          <Link
            key={item.name}
            to={item.path}
            className={`text-sm lowercase transition-all duration-200 hover:text-foreground ${
              isActive(item.path) ? "text-foreground font-medium" : "text-muted-foreground"
            }`}
          >
            {item.name}
          </Link>
        ))}

        <button
          type="button"
          onClick={() => setIsMoreOpen((v) => !v)}
          aria-label="more"
          className={`text-sm lowercase transition-all duration-200 hover:text-foreground ${
            isMoreOpen ? "text-foreground" : "text-muted-foreground"
          }`}
        >
          {isMoreOpen ? "<" : ">"}
        </button>
      </div>
    </nav>
  );
};

export default BottomNav;