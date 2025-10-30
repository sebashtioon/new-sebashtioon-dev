import { Link, useLocation } from "react-router-dom";

const BottomNav = () => {
  const location = useLocation();

  const navItems = [
    { name: "home", path: "/" },
    { name: "projects", path: "/projects" },
    { name: "blog", path: "/blog" },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-[100]">
      <div className="flex items-center gap-6 px-4 py-2 bg-black/40 backdrop-blur-md rounded-full border border-white/20 shadow-lg">
        {navItems.map((item) => (
          <Link
            key={item.name}
            to={item.path}
            className={`text-sm lowercase transition-all duration-200 hover:text-white ${
              isActive(item.path)
                ? "text-white font-medium"
                : "text-white/60"
            }`}
          >
            {item.name}
          </Link>
        ))}
      </div>
    </nav>
  );
};

export default BottomNav;