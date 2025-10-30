import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import BackgroundGrid from "@/components/BackgroundGrid";
import BottomNav from "@/components/BottomNav";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="h-screen overflow-hidden">
      <BackgroundGrid />
      
      <section className="h-screen flex items-center justify-center px-4 relative">
        <div className="max-w-4xl mx-auto">
          <div className="text-left animate-fade-in">
            <div className="max-w-3xl">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 lowercase leading-tight font-serif">
                <span className="text-foreground">404</span>
              </h1>
              
              <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl lowercase leading-relaxed">
                page not found. the page you're looking for doesn't exist or has been moved.
              </p>

              <div className="flex flex-wrap items-center gap-3 text-muted-foreground text-sm lowercase">
                <Link to="/" className="hover:text-foreground transition-colors lowercase">
                  home
                </Link>
                <span>•</span>
                <Link to="/projects" className="hover:text-foreground transition-colors lowercase">
                  projects
                </Link>
                <span>•</span>
                <span className="text-muted-foreground/50">
                  attempted: {location.pathname}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <BottomNav />
    </div>
  );
};

export default NotFound;
