import BottomNav from "@/components/BottomNav";
import PageWrapper from "@/components/PageWrapper";
import { ReactNode } from "react";
import { useLocation } from "react-router-dom";

type ProsePageProps = {
  title: string;
  subtitle?: ReactNode;
  breadcrumb?: ReactNode;
  children: ReactNode;
};

const ProsePage = ({ title, subtitle, breadcrumb, children }: ProsePageProps) => {
  const location = useLocation();
  const isBlogRoute = location.pathname === "/blog" || location.pathname.startsWith("/blog/");

  return (
    <>
      <PageWrapper>
        <div
          data-preserve-apostrophes
          className="min-h-screen pt-8 pb-24 px-4 relative"
        >
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
          </main>
        </div>
      </PageWrapper>
      <BottomNav />
    </>
  );
};

export default ProsePage;
