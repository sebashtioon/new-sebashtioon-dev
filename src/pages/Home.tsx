import { SiGithub, SiDiscord, SiYoutube } from "react-icons/si";
import { MdEmail } from "react-icons/md";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";  
import BackgroundGrid from "@/components/BackgroundGrid";
import { toast } from "@/hooks/use-toast";

const Home = () => {
  const socialLinks = [
    {
      icon: SiGithub,
      label: "github",
      href: "https://github.com/sebashtioon",
    },
    {
      icon: SiDiscord,
      label: "discord",
      href: "https://discord.com/users/1110329250306859018",
    },
    {
      icon: SiYoutube,
      label: "youtube",
      href: "https://www.youtube.com/@sebashtioon_",
    },
    {
      icon: MdEmail,
      label: "email",
      onClick: () => {
        navigator.clipboard.writeText("sebastiansuciu607@gmail.com");
        toast({
          title: "email copied!",
          description: "sebastiansuciu607@gmail.com copied to clipboard.",
        });
      },
    },
  ];

  return (
    <div className="min-h-screen">
      <BackgroundGrid />
      
      {/* Floating Status Widget */}
      <div className="fixed top-24 right-8 z-10 hidden lg:block">
        <div className="card-glow p-4 max-w-xs animate-fade-in">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-sm font-tech">sebashtioon.status</span>
          </div>
          <div className="text-xs text-muted-foreground font-mono">
            <div>// currently: building expland</div>
            <div>// mood: caffeinated</div>
            <div>// status: online</div>
          </div>
        </div>
      </div>

      {/* Hero Section - Asymmetric Layout */}
      <section className="pt-32 pb-12 px-4 relative">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            {/* Main content - offset left */}
            <div className="lg:col-span-7 lg:col-start-1 animate-fade-in">
              <div className="max-w-4xl">
                <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 lowercase leading-tight">
                  <span className="text-shimmer font-tech">yo, i'm sebashtioon</span>
                </h1>

                <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl lowercase leading-relaxed">
                  just a 15-year-old experimenting with games, code, and 3D stuff
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link to="/projects">
                    <Button className="btn-hero text-lg px-8 py-6 group lowercase flex items-center gap-2">
                      see my work
                      <svg
                        className="transition-transform group-hover:translate-x-1"
                        width="20"
                        height="20"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        viewBox="0 0 24 24"
                      >
                        <path d="M5 12h14M13 6l6 6-6 6" />
                      </svg>
                    </Button>
                  </Link>
                </div>
              </div>
            </div>

            {/* Floating Tech Stack - offset right */}
            <div className="lg:col-span-4 lg:col-start-9 hidden lg:block">
              <div className="relative animate-fade-in-delay">
                <div className="absolute -top-4 -left-4 w-32 h-32 bg-purple-500/10 rounded-full blur-xl"></div>
                <div className="relative space-y-4">
                  <div className="card-glow p-6 rotate-2 hover:rotate-0 transition-transform">
                    <div className="w-8 h-8 bg-purple-500/20 rounded-lg flex items-center justify-center mb-3">
                      <div className="w-3 h-3 bg-purple-400 rounded-sm"></div>
                    </div>
                    <div className="font-tech text-sm">godot engine</div>
                    <div className="text-xs text-muted-foreground">game development</div>
                  </div>
                  <div className="card-glow p-6 -rotate-3 hover:rotate-0 transition-transform ml-8">
                    <div className="w-8 h-8 bg-yellow-500/20 rounded-lg flex items-center justify-center mb-3">
                      <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                    </div>
                    <div className="font-tech text-sm">blender 3D</div>
                    <div className="text-xs text-muted-foreground">modeling & animation</div>
                  </div>
                  <div className="card-glow p-6 rotate-1 hover:rotate-0 transition-transform">
                    <div className="w-8 h-8 bg-cyan-500/20 rounded-lg flex items-center justify-center mb-3">
                      <div className="w-3 h-3 bg-cyan-400 rounded"></div>
                    </div>
                    <div className="font-tech text-sm">gdscript + c++</div>
                    <div className="text-xs text-muted-foreground">programming</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Showcase - Diagonal Layout */}
      <section className="py-16 px-4 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-l from-purple-500/5 to-transparent rounded-full blur-3xl"></div>
        
        <div className="max-w-7xl mx-auto">
          <div className="mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 lowercase">
              what i'm <span className="text-shimmer">building</span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-purple-400 to-yellow-400 rounded-full"></div>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left side - staggered cards */}
            <div className="space-y-8">
              <div className="card-glow p-8 ml-0 lg:ml-8 animate-fade-in lowercase">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center">
                    <div className="w-4 h-4 bg-purple-400 rounded-sm"></div>
                  </div>
                  <h3 className="text-xl font-semibold">game development</h3>
                </div>
                <p className="text-muted-foreground">
                  making 2d & 3d games, designing mechanics, and building cool stuff in godot
                </p>
              </div>

              <div className="card-glow p-8 ml-4 lg:ml-16 animate-fade-in lowercase">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-yellow-500/20 rounded-lg flex items-center justify-center">
                    <div className="w-4 h-4 bg-yellow-400 rounded-full"></div>
                  </div>
                  <h3 className="text-xl font-semibold">3d art & animation</h3>
                </div>
                <p className="text-muted-foreground">
                  modeling & animating low-poly 3d assets, worlds, and characters in blender
                </p>
              </div>

              <div className="card-glow p-8 ml-0 lg:ml-4 animate-fade-in lowercase">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-cyan-500/20 rounded-lg flex items-center justify-center">
                    <div className="w-4 h-4 bg-cyan-400 rounded"></div>
                  </div>
                  <h3 className="text-xl font-semibold">programming</h3>
                </div>
                <p className="text-muted-foreground">
                  writing scripts & building systems in gdscript, c++, and python for games & tools
                </p>
              </div>
            </div>

            {/* Right side - floating project preview */}
            <div className="relative hidden lg:block">
              <div className="absolute top-8 left-8 w-64 h-48 bg-gradient-to-br from-purple-500/20 to-yellow-500/20 rounded-lg blur-sm"></div>
              <div className="relative card-glow p-6 transform rotate-2 hover:rotate-0 transition-transform">
                <div className="text-sm text-purple-300 mb-2">// currently working on</div>
                <h4 className="text-2xl font-bold mb-2 lowercase">expland</h4>
                <p className="text-sm text-muted-foreground mb-4">
                  a mysterious world where nightmares and happiness collide
                </p>
                <div className="flex gap-2">
                  <span className="px-2 py-1 bg-purple-500/20 rounded text-xs">godot</span>
                  <span className="px-2 py-1 bg-yellow-500/20 rounded text-xs">3D</span>
                  <span className="px-2 py-1 bg-cyan-500/20 rounded text-xs">gdscript</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <div className="card-glow p-12 animate-fade-in lowercase">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              wanna <span className="fast-text-shimmer">do something?</span>
            </h2>
            <p className="text-xl text-muted-foreground mb-8 lowercase">
              open to collabs and pretty much anything.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-9">
              <Link to="/contact">
                <Button className="btn-hero text-lg px-8 py-6 lowercase">
                  hmu
                </Button>
              </Link>
            </div>

            <div className="flex gap-4 justify-center">
              {socialLinks.map((social, index) => {
                const Icon = social.icon;
                const isFirst = index === 0;
                const isLast = index === socialLinks.length - 1;

                const buttonClasses = [
                  "btn-accent",
                  "p-6",
                  "transition-all",
                  "duration-200",
                  "hover:scale-105",
                  "hover:brightness-110",
                  "flex",
                  "items-center",
                  "justify-center",
                  isFirst ? "rounded-l-full" : "",
                  isLast ? "rounded-r-full" : "",
                  !isFirst && !isLast ? "rounded-none" : "",
                ].join(" ");

                return social.onClick ? (
                  <button
                    key={social.label}
                    onClick={social.onClick}
                    className={buttonClasses}
                  >
                    <Icon size={24} />
                  </button>
                ) : (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={buttonClasses}
                  >
                    <Icon size={24} />
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Home;