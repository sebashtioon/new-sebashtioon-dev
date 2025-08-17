import { Calendar, MapPin, Code, Gamepad2, Palette } from "lucide-react";
import BackgroundGrid from "@/components/BackgroundGrid";

const About = () => {
  const skills = [
    { category: "Game Development", items: ["Unity", "C#", "Game Design", "Level Design"] },
    { category: "3D Modeling & Animation", items: ["Blender", "3D Modeling", "Animation", "Texturing"] },
    { category: "Programming", items: ["C#", "Python", "JavaScript", "Problem Solving"] },
    { category: "Tools & Software", items: ["Git", "VS Code", "Photoshop", "Substance Painter"] },
  ];

  const timeline = [
    {
      year: "2020",
      title: "Started Programming",
      description: "Began learning Python and fell in love with coding logic and problem-solving.",
    },
    {
      year: "2021",
      title: "Discovered Game Development",
      description: "Started with Unity and C#, created my first simple games and prototypes.",
    },
    {
      year: "2022",
      title: "3D Art Journey Begins",
      description: "Picked up Blender and started creating 3D models, animations, and environments.",
    },
    {
      year: "2023",
      title: "First Major Projects",
      description: "Completed several game prototypes and 3D art pieces, building a portfolio.",
    },
    {
      year: "2024",
      title: "Current Focus",
      description: "Expanding skills in advanced game mechanics and photorealistic 3D rendering.",
    },
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
                About <span className="text-gradient">Me</span>
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

      {/* Timeline Section */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            My <span className="text-gradient">Journey</span>
          </h2>
          
          <div className="space-y-8">
            {timeline.map((item, index) => (
              <div 
                key={item.year} 
                className="flex gap-6 animate-fade-in"
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <div className="flex-shrink-0 w-20 text-center">
                  <div className="text-lg font-bold text-accent-glow">{item.year}</div>
                  <div className="w-px h-16 bg-border mx-auto mt-2"></div>
                </div>
                
                <div className="card-glow p-6 flex-1">
                  <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                  <p className="text-muted-foreground">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;