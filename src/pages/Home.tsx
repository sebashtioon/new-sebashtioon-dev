import BottomNav from "@/components/BottomNav";

// change this number to control how narrow/wide the home text is
const HOME_MAX_WIDTH_REM = 32;

const Home = () => {
  return (
    <div className="h-screen overflow-hidden">
      <div className="fixed bottom-20 right-4 md:bottom-4 z-20 text-xs text-muted-foreground/70 lowercase select-none">
        im not a web dev so dont expect much from this site
      </div>

      <section className="h-screen flex items-center justify-center px-4 relative">
        <div className="w-full mx-auto" style={{ maxWidth: `${HOME_MAX_WIDTH_REM}rem` }}>
          <div className="text-left animate-fade-in">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 lowercase leading-tight font-serif">
              yo, im <span className="text-foreground">sebashtioon</span>
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground mb-4 lowercase leading-relaxed">
              this is my personal website ig
            </p>
          </div>
        </div>
      </section>

      <BottomNav />
    </div>
  );
};

export default Home;
