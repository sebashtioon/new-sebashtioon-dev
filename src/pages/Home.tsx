import { FiExternalLink } from "react-icons/fi";
import BackgroundGrid from "@/components/BackgroundGrid";
import BottomNav from "@/components/BottomNav";

const Home = () => {
  return (
    <div className="h-screen overflow-hidden">
      <BackgroundGrid />

      <section className="h-screen flex items-center justify-center px-4 relative">
        <div className="max-w-2xl mx-auto">
          <div className="text-left animate-fade-in">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 lowercase leading-tight font-serif">
              yo, im <span className="text-foreground">sebashtioon</span>
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground mb-4 lowercase leading-relaxed">
              im a 15 year old game dev & sorta 3d artist. ive been making games and small side-projects here and there for over 5 years
            </p>

            <p className="text-sm text-muted-foreground/80 mb-4 leading-relaxed">
              thats basically it... i just like making stuff. i do have an indie game studio,{" "}
              <a
                href="https://github.com/Xintegrate-Studios"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-foreground hover:underline transition-colors"
              >
                Xintegrate Studios
                <FiExternalLink className="ml-1" size={16} />
              </a>
              , where i work on my personal projects. also i co-founded another game studio with my friend from school called{" "}
              <a
                href="https://noeco.xyz"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-foreground hover:underline transition-colors"
              >
                Noe Co.
                <FiExternalLink className="ml-1" size={16} />
              </a>
              {" "}where i'm working on my biggest project yet,{" "}
              <a
                href="https://noeco.xyz/games/expland"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-foreground hover:underline transition-colors"
              >
                Expland
                <FiExternalLink className="ml-1" size={16} />
              </a>
              .
            </p>

            <div className="flex flex-wrap items-center gap-4 mb-4 text-sm text-muted-foreground">
              <button
                onClick={() => navigator.clipboard.writeText("sebastiansuciu607@gmail.com")}
                className="hover:text-foreground transition-colors lowercase"
              >
                sebastiansuciu607@gmail.com
              </button>
              <span>•</span>
              <a
                href="https://github.com/sebashtioon"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-foreground transition-colors lowercase"
              >
                github
              </a>
              <span>•</span>
              <a
                href="https://discord.com/users/1110329250306859018"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-foreground transition-colors lowercase"
              >
                discord
              </a>
              <span>•</span>
              <a
                href="https://www.youtube.com/@sebashtioon_"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-foreground transition-colors lowercase"
              >
                youtube
              </a>
            </div>
          </div>
        </div>
      </section>

      <BottomNav />
    </div>
  );
};

export default Home;
