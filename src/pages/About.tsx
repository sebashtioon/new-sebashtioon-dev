import { Calendar, MapPin, Code, Gamepad2, Palette } from "lucide-react";
import BackgroundGrid from "@/components/BackgroundGrid";

const About = () => {
  const skills = [
    { category: "game development", items: ["godot", "gdscript", "game design", "level design"] },
    { category: "3D Modeling & Animation", items: ["Blender", "3D Modeling", "Animation", "Texturing"] },
    { category: "Programming", items: ["C#", "Python", "JavaScript", "Problem Solving"] },
    { category: "Tools & Software", items: ["Git", "VS Code", "Photoshop", "Substance Painter"] },
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
                about <span className="text-shimmer">me</span>
              </h1>
              
              <div className="space-y-4 text-lg text-muted-foreground mb-8">
                <p>
                  Hey! I'm a 15-year-old game developer and 3D artist who's passionate about creating 
                  immersive digital experiences. What started as curiosity about how games work has 
                  evolved into a deep love for both the technical and artistic sides of game development.
                </p>
                
                <p>
                  When I'm not coding game mechanics or sculpting 3D models, you'll find me exploring 
                  new techniques, participating in game jams, or working on personal projects that push 
                  my creative boundaries.
                </p>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="flex items-center space-x-2 text-sm">
                  <Calendar className="text-accent-glow" size={16} />
                  <span>15 years old</span>
                </div>
                <div className="flex items-center space-x-2 text-sm">
                  <MapPin className="text-accent-glow" size={16} />
                  <span>Your Location</span>
                </div>
                <div className="flex items-center space-x-2 text-sm">
                  <Code className="text-accent-glow" size={16} />
                  <span>4+ years coding</span>
                </div>
              </div>
            </div>
            
            <div className="animate-fade-in-delay">
              <div className="card-glow p-8">
                <div className="grid grid-cols-3 gap-6 text-center">
                  <div>
                    <Gamepad2 className="mx-auto mb-2 text-accent-glow" size={32} />
                    <div className="text-2xl font-bold">12+</div>
                    <div className="text-sm text-muted-foreground">Games Built</div>
                  </div>
                  <div>
                    <Palette className="mx-auto mb-2 text-accent-glow" size={32} />
                    <div className="text-2xl font-bold">50+</div>
                    <div className="text-sm text-muted-foreground">3D Models</div>
                  </div>
                  <div>
                    <Code className="mx-auto mb-2 text-accent-glow" size={32} />
                    <div className="text-2xl font-bold">1000+</div>
                    <div className="text-sm text-muted-foreground">Hours Coding</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Skills & <span className="text-gradient">Expertise</span>
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {skills.map((skillGroup, index) => (
              <div 
                key={skillGroup.category} 
                className="card-glow p-6 animate-fade-in"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <h3 className="font-semibold mb-4 text-accent-glow">{skillGroup.category}</h3>
                <ul className="space-y-2">
                  {skillGroup.items.map((skill) => (
                    <li key={skill} className="text-sm text-muted-foreground">
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