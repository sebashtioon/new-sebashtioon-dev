import BackgroundGrid from "@/components/BackgroundGrid";
import BottomNav from "@/components/BottomNav";
import PageWrapper from "@/components/PageWrapper";
import { ReactNode } from "react";
import { Link } from "react-router-dom";

type ProsePageProps = {
  title: string;
  subtitle?: ReactNode;
  breadcrumb?: ReactNode;
  children: ReactNode;
};

const ProsePage = ({ title, subtitle, breadcrumb, children }: ProsePageProps) => {
  return (
    <>
      <PageWrapper>
        <div
          data-preserve-apostrophes
          className="min-h-screen pt-8 pb-24 px-4 relative"
        >
          <BackgroundGrid />

          <main className="max-w-3xl mx-auto">
            <header className="pt-10 pb-8">
              {breadcrumb && (
                <div className="text-sm text-muted-foreground lowercase mb-4">
                  {breadcrumb}
                </div>
              )}

              <h1 className="text-3xl md:text-4xl font-bold font-serif lowercase leading-tight">
                {title}
              </h1>

              {subtitle && (
                <div className="mt-4 text-muted-foreground lowercase leading-relaxed">
                  {subtitle}
                </div>
              )}
            </header>

            <article className="space-y-6 text-foreground/90 leading-relaxed">
              {children}
            </article>

            <footer className="mt-12 pt-8 border-t border-border/30 text-sm text-muted-foreground lowercase flex flex-wrap gap-3">
              <Link to="/" className="hover:text-foreground transition-colors">
                home
              </Link>
              <span>•</span>
              <Link to="/projects" className="hover:text-foreground transition-colors">
                projects
              </Link>
              <span>•</span>
              <Link to="/blog" className="hover:text-foreground transition-colors">
                blog
              </Link>
              <span>•</span>
              <Link to="/now" className="hover:text-foreground transition-colors">
                now
              </Link>
              <span>•</span>
              <Link to="/about" className="hover:text-foreground transition-colors">
                about
              </Link>
              <span>•</span>
              <Link to="/contact" className="hover:text-foreground transition-colors">
                contact
              </Link>
            </footer>
          </main>
        </div>
      </PageWrapper>
      <BottomNav />
    </>
  );
};

export default ProsePage;
