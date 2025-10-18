import { Calendar, MapPin, Code, Gamepad2, Palette } from "lucide-react";
import BackgroundGrid from "@/components/BackgroundGrid";
import { FiExternalLink } from "react-icons/fi";

const About = () => {
  const skills = [
    { category: "game development", items: ["godot", "gdscript", "ue5", "game design", "level design"] },
    { category: "3d modelling and animation", items: ["blender", "3d modeling", "animation", "texturing"] },
    { category: "programming", items: ["gdscript", "C++", "python", "logic pro"] },
    { category: "tools & software", items: ["git", "github", "vs code", "vs studio", "gimp", "obsidian"] },
  ];

  return (
    <div className="min-h-screen pt-24 relative">
      <BackgroundGrid />
      
      {/* Subtle floating elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-1/3 w-96 h-96 bg-purple-500/3 rounded-full blur-3xl"></div>
        <div className="absolute bottom-40 left-1/4 w-64 h-64 bg-accent/5 rounded-full blur-2xl"></div>
      </div>

      {/* Hero Section - Clean Asymmetric */}
      <section className="py-32 px-4 relative">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-5 gap-20 items-center">
            {/* Left - Main content */}
            <div className="lg:col-span-3 space-y-16 animate-fade-in">
              {/* Large title */}
              <div>
                <h1 className="text-7xl md:text-9xl font-bold leading-none">
                  <span className="text-shimmer">about</span>
                </h1>
                <div className="text-4xl md:text-6xl font-light ml-12 mt-2">
                  me
                </div>
              </div>

              {/* Description with better spacing */}
              <div className="space-y-8 text-xl leading-relaxed text-muted-foreground max-w-3xl">
                <p>
                  i'm a 15-year-old game dev & sorta 3d artist. i like turning my imagination into reality through code and 3d art. i've been making games and small side-projects here and there for over 4 years.
                </p>
                
                <p className="pl-8 border-l-2 border-accent/30">
                  that's basically it. i just like making stuff. i do have an indie game studio,{" "}
                  <a
                    href="https://github.com/Xintegrate-Studios"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-shimmer hover:underline transition-colors"
                  >
                    Xintegrate Studios
                    <FiExternalLink className="ml-1" size={16} />
                  </a>, where i work on my personal projects. i also co-founded another game studio with my friend from school called{" "}
                  <a
                    href="https://noeco.xyz"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-shimmer hover:underline transition-colors"
                  >
                    Noe Co.
                    <FiExternalLink className="ml-1" size={16} />
                  </a>{" "}
                  where i'm working on my biggest project yet,{" "}
                  <a
                    href="https://noeco.xyz/games/expland"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-shimmer hover:underline transition-colors"
                  >
                    Expland
                    <FiExternalLink className="ml-1" size={16} />
                  </a>.
                </p>
              </div>
            </div>

            {/* Right - Floating stats and info */}
            <div className="lg:col-span-2 space-y-8 animate-fade-in">
              {/* Stats in a clean vertical layout */}
              <div className="space-y-6 lg:ml-8">
                <div className="card-glow p-6">
                  <div className="flex items-center gap-4">
                    <Gamepad2 className="text-accent-glow" size={24} />
                    <div>
                      <div className="text-2xl font-bold">12+</div>
                      <div className="text-sm text-muted-foreground">games built</div>
                    </div>
                  </div>
                </div>

                <div className="card-glow p-6 ml-8">
                  <div className="flex items-center gap-4">
                    <Palette className="text-accent-glow" size={24} />
                    <div>
                      <div className="text-2xl font-bold">20+</div>
                      <div className="text-sm text-muted-foreground">3d models</div>
                    </div>
                  </div>
                </div>

                <div className="card-glow p-6">
                  <div className="flex items-center gap-4">
                    <Code className="text-accent-glow" size={24} />
                    <div>
                      <div className="text-2xl font-bold">4+</div>
                      <div className="text-sm text-muted-foreground">years coding</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Personal info - cleaner design */}
              <div className="space-y-4 lg:ml-4 pt-8">
                <div className="flex items-center gap-3 text-muted-foreground">
                  <Calendar className="text-purple-400" size={18} />
                  <span>15 years old</span>
                </div>
                <div className="flex items-center gap-3 text-muted-foreground">
                  <MapPin className="text-purple-400" size={18} />
                  <span>canberra, australia</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section - Clean Diagonal */}
      <section className="py-32 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Title with subtle positioning */}
          <div className="mb-20 animate-fade-in">
            <h2 className="text-5xl md:text-6xl font-bold">
              what i'm <span>good at</span>
            </h2>
          </div>
          
          {/* Skills in clean asymmetric layout */}
          <div className="space-y-12">
            {/* Row 1: Game Dev (left) + 3D Modelling (right offset) */}
            <div className="grid lg:grid-cols-7 gap-8 items-start">
              <div className="lg:col-span-3 card-glow p-8 animate-fade-in">
                <h3 className="text-2xl font-bold mb-6 text-accent-glow">game development</h3>
                <div className="grid grid-cols-2 gap-3">
                  {skills[0].items.map((skill) => (
                    <div key={skill} className="text-muted-foreground px-3 py-2 rounded-md bg-card/30 text-sm">
                      {skill}
                    </div>
                  ))}
                </div>
              </div>

              <div className="lg:col-span-3 lg:col-start-5 card-glow p-8 lg:mt-16 animate-fade-in">
                <h3 className="text-2xl font-bold mb-6 text-accent-glow">3d modelling & animation</h3>
                <div className="space-y-3">
                  {skills[1].items.map((skill) => (
                    <div key={skill} className="text-muted-foreground">
                      • {skill}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Row 2: Programming (right) + Tools (left offset) */}
            <div className="grid lg:grid-cols-7 gap-8 items-start">
              <div className="lg:col-span-3 lg:col-start-2 card-glow p-8 lg:mt-8 animate-fade-in">
                <h3 className="text-2xl font-bold mb-6 text-accent-glow">programming</h3>
                <div className="space-y-3">
                  {skills[2].items.map((skill) => (
                    <div key={skill} className="text-muted-foreground">
                      • {skill}
                    </div>
                  ))}
                </div>
              </div>

              <div className="lg:col-span-3 lg:col-start-6 card-glow p-8 animate-fade-in">
                <h3 className="text-2xl font-bold mb-6 text-accent-glow">tools & software</h3>
                <div className="grid grid-cols-2 gap-2">
                  {skills[3].items.map((skill) => (
                    <div key={skill} className="text-sm text-muted-foreground text-center px-3 py-2 rounded-md border border-border/30 hover:border-accent/50 transition-colors">
                      {skill}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;