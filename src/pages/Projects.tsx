import { ExternalLink, Github, Play, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import BackgroundGrid from "@/components/BackgroundGrid";
import { useState } from "react";

const Projects = () => {
  const projects = [
    {
      id: 1,
      title: "Mystic Realms RPG",
      category: "Game Development",
      description: "A 2D pixel art RPG with procedural dungeons, crafting system, and rich storytelling. Built with Unity and C#.",
      image: "/api/placeholder/400/250",
      tags: ["Unity", "C#", "2D", "RPG", "Pixel Art"],
      status: "In Development",
      links: {
        github: "#",
        demo: "#",
      }
    },
    {
      id: 2,
      title: "Cyberpunk City Environment",
      category: "3D Art",
      description: "Detailed 3D environment showcasing a futuristic cyberpunk cityscape with neon lighting and atmospheric effects.",
      image: "/api/placeholder/400/250",
      tags: ["Blender", "3D Modeling", "Environment", "Lighting"],
      status: "Completed",
      links: {
        demo: "#",
      }
    },
    {
      id: 3,
      title: "Puzzle Platformer",
      category: "Game Development",
      description: "A challenging puzzle platformer with innovative mechanics and beautiful hand-drawn art style.",
      image: "/api/placeholder/400/250",
      tags: ["Unity", "C#", "Platformer", "Puzzle"],
      status: "Completed",
      links: {
        github: "#",
        demo: "#",
        play: "#"
      }
    },
    {
      id: 4,
      title: "Character Animation Reel",
      category: "3D Art",
      description: "Collection of character animations showcasing walk cycles, combat moves, and emotional expressions.",
      image: "/api/placeholder/400/250",
      tags: ["Blender", "Animation", "Character", "Rigging"],
      status: "Completed",
      links: {
        demo: "#",
      }
    },
    {
      id: 5,
      title: "Space Shooter Arcade",
      category: "Game Development",
      description: "Fast-paced arcade-style space shooter with power-ups, boss battles, and retro aesthetics.",
      image: "/api/placeholder/400/250",
      tags: ["Unity", "C#", "Arcade", "Space"],
      status: "Completed",
      links: {
        github: "#",
        play: "#"
      }
    },
    {
      id: 6,
      title: "Concept Art Portfolio",
      category: "3D Art",
      description: "Various concept designs for characters, vehicles, and environments across different genres.",
      image: "/api/placeholder/400/250",
      tags: ["Blender", "Concept Art", "Design", "Modeling"],
      status: "Ongoing",
      links: {
        demo: "#",
      }
    }
  ];

  const categories = ["All", "Game Development", "3D Art"];
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredProjects = selectedCategory === "All" 
    ? projects 
    : projects.filter(project => project.category === selectedCategory);

  return (
    <div className="min-h-screen pt-24">
      <BackgroundGrid />
      
      {/* Header */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-in">
            My <span className="text-gradient">Projects</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto animate-fade-in-delay">
            A showcase of games, 3D art, and creative projects I've built while learning and exploring 
            the world of game development and digital art.
          </p>
        </div>
      </section>

      {/* Category Filter */}
      <section className="px-4 mb-12">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-center space-x-4 animate-fade-in">
            {categories.map((category) => (
              <Button
                key={category}
                onClick={() => setSelectedCategory(category)}
                variant={selectedCategory === category ? "default" : "outline"}
                className={selectedCategory === category ? "btn-accent" : ""}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="px-4 pb-16">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project, index) => (
              <div 
                key={project.id} 
                className="card-project p-6 animate-fade-in"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                {/* Project Image */}
                <div className="relative mb-6 overflow-hidden rounded-lg">
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-48 object-cover transition-transform duration-300 hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-end justify-center p-4">
                    <div className="flex space-x-2">
                      {project.links.github && (
                        <Button size="sm" variant="outline" className="bg-black/20 backdrop-blur-sm">
                          <Github size={16} />
                        </Button>
                      )}
                      {project.links.demo && (
                        <Button size="sm" variant="outline" className="bg-black/20 backdrop-blur-sm">
                          <Eye size={16} />
                        </Button>
                      )}
                      {project.links.play && (
                        <Button size="sm" variant="outline" className="bg-black/20 backdrop-blur-sm">
                          <Play size={16} />
                        </Button>
                      )}
                    </div>
                  </div>
                </div>

                {/* Project Info */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-accent-glow font-medium">{project.category}</span>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      project.status === "Completed" 
                        ? "bg-green-500/20 text-green-400"
                        : project.status === "In Development"
                        ? "bg-blue-500/20 text-blue-400"
                        : "bg-yellow-500/20 text-yellow-400"
                    }`}>
                      {project.status}
                    </span>
                  </div>
                  
                  <h3 className="text-xl font-semibold">{project.title}</h3>
                  <p className="text-muted-foreground text-sm">{project.description}</p>
                  
                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span 
                        key={tag} 
                        className="text-xs px-2 py-1 bg-accent/20 text-accent-glow rounded-md"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  {/* Links */}
                  <div className="flex space-x-2 pt-2">
                    {project.links.github && (
                      <Button size="sm" variant="outline" className="flex-1">
                        <Github size={16} className="mr-2" />
                        Code
                      </Button>
                    )}
                    {project.links.demo && (
                      <Button size="sm" variant="outline" className="flex-1">
                        <ExternalLink size={16} className="mr-2" />
                        View
                      </Button>
                    )}
                    {project.links.play && (
                      <Button size="sm" className="btn-accent flex-1">
                        <Play size={16} className="mr-2" />
                        Play
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Projects;