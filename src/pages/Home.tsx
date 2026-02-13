import BottomNav from "@/components/BottomNav";
import SocialLinksToggle from "@/components/SocialLinksToggle";
import ThemeToggle from "@/components/ThemeToggle";

// change this number to control how narrow/wide the home text is
const HOME_MAX_WIDTH_REM = 32;

const Home = () => {
  return (
    <div className="h-screen overflow-hidden">
      <ThemeToggle />
      <div className="fixed bottom-20 right-4 md:bottom-4 z-20 text-xs text-muted-foreground/70 lowercase select-none">
        im not a web dev so dont expect much from this site
      </div>

      <section className="h-screen flex items-center justify-center px-4 relative">
        <div className="w-full mx-auto" style={{ maxWidth: `${HOME_MAX_WIDTH_REM}rem` }}>
          <div className="animate-fade-in relative top-6">
            <div className="flex flex-col items-center text-center md:flex-row md:items-center md:justify-between md:text-left gap-6">
              <div>
                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 lowercase leading-tight font-serif whitespace-nowrap">
                  yo, im{"\u00A0"}
                  <span className="text-foreground whitespace-nowrap">sebashtioon</span>
                </h1>

                <p className="text-lg md:text-xl text-muted-foreground lowercase leading-relaxed">
                  this is my personal website ig
                </p>
              </div>

              <SocialLinksToggle className="w-full md:w-auto flex justify-center md:justify-end" />
            </div>
          </div>
        </div>
      </section>

      <BottomNav />
    </div>
  );
};

export default Home;
