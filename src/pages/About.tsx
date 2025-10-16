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
    <div className="min-h-screen pt-24">
      <BackgroundGrid />
      
      {/* Hero Section */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in">
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                <span className="text-shimmer">about</span> me
              </h1>
              
              <div className="space-y-4 text-lg text-muted-foreground mb-8">
                <p>
                  i'm a 15-year-old game dev & sorta 3d artist. i like turning my imagination into reality through code and 3d art. i've been making games and small side-projects here and there for over 4 years.
                </p>
                
                <p>
                  that's basically it. i just like making stuff. i do have an indie game studio, <span className="text-shimmer">Xintegrate Studios</span>, where i work on my personal projects.
                  i also co-founded another game studio with my friend from school called{" "}
                  <a
                  href="https://noeco.xyz"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-shimmer hover:underline"
                  >Noe Co.
                  <FiExternalLink className="ml-1" size={16} />
                  </a> where i'm working on my biggest project yet,{" "}
                  <a
                  href="https://noeco.xyz/games/expland"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-shimmer hover:underline"
                  >
                  Expland
                  <FiExternalLink className="ml-1" size={16} />
                  </a>.
                </p>
              </div>
            </div>
            
            <div className="animate-fade-in">
              <div className="card-glow p-8">
                <div className="grid grid-cols-3 gap-6 text-center">
                  <div>
                    <Gamepad2 className="mx-auto mb-2 text-accent-glow" size={32} />
                    <div className="text-2xl font-bold">12+</div>
                    <div className="text-sm text-muted-foreground">games built</div>
                  </div>
                  <div>
                    <Palette className="mx-auto mb-2 text-accent-glow" size={32} />
                    <div className="text-2xl font-bold">20+</div>
                    <div className="text-sm text-muted-foreground">3d models</div>
                  </div>
                  <div>
                    <Code className="mx-auto mb-2 text-accent-glow" size={32} />
                    <div className="text-2xl font-bold">4+</div>
                    <div className="text-sm text-muted-foreground">years coding</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="py-2 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            what i'm good at
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {skills.map((skillGroup, index) => (
              <div 
                key={skillGroup.category} 
                className="card-glow p-6 animate-fade-in"
              >
                <h3 className="font-semibold mb-4 text-accent-glow">{skillGroup.category}</h3>
                <ul className="space-y-2">
                  {skillGroup.items.map((skill) => (
                    <li key={skill} className="text-sm text-muted-foreground font-tech">
                      • {skill}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;