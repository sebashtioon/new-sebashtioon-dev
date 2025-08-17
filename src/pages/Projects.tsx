import { SiGithub, SiDiscord, SiYoutube} from "react-icons/si";
import { FiEye, FiExternalLink } from "react-icons/fi";
import { FaPlayCircle, FaItchIo, FaSteam } from "react-icons/fa";

import { Button } from "@/components/ui/button";
import BackgroundGrid from "@/components/BackgroundGrid";
import { useState } from "react";

const Projects = () => {
  const projects = [
    {
      id: 1,
      title: "CAN'T WAKE UP",
      category: "games",
      description: "Welcome to sleep paralysis.",
      image: "/api/placeholder/400/250",
      tags: ["godot", "psx", "3D"],
      status: "in development",
      links: {
        
      }
    },
    {
      id: 2,
      title: "The Swing",
      category: "games",
      description: "Alone on a swing, you remember what you tried to forget.",
      image: "/api/placeholder/400/250",
      tags: ["godot", "psx", "low-poly", "3D"],
      status: "completed",
      links: {
        play_itch: "https://xintegrate-studios.itch.io/the-swing",
        github: "https://github.com/Xintegrate-Studios/The-Swing",
      }
    }
  ];

  const categories = ["all", "games", "3d stuff"];
  const [selectedCategory, setSelectedCategory] = useState("all");

  const filteredProjects = selectedCategory === "all" 
    ? projects 
    : projects.filter(project => project.category === selectedCategory);

  return (
    <div className="min-h-screen pt-24">
      <BackgroundGrid />
      
      {/* Header */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-in">
            my <span className="text-shimmer">projects</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto animate-fade-in-delay">
            just a bunch of projects i've worked on throughout the years.
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
                          <SiGithub size={16} />
                        </Button>
                      )}
                      {project.links.demo && (
                        <Button size="sm" variant="outline" className="bg-black/20 backdrop-blur-sm">
                          <FiEye size={16} />
                        </Button>
                      )}
                      {project.links.play && (
                        <Button size="sm" variant="outline" className="bg-black/20 backdrop-blur-sm">
                          <FaPlayCircle size={16} />
                        </Button>
                      )}
                      {project.links.play_itch && (
                        <Button size="sm" variant="outline" className="bg-black/20 backdrop-blur-sm">
                          <FaPlayCircle size={16} />
                        </Button>
                      )}
                      {project.links.play_steam && (
                        <Button size="sm" variant="outline" className="bg-black/20 backdrop-blur-sm">
                          <FaPlayCircle size={16} />
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
                      project.status === "completed" 
                        ? "bg-green-500/20 text-green-400"
                        : project.status === "in development"
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
                    <a href={project.links.github} target="_blank" rel="noopener noreferrer">
                      <Button size="sm" variant="outline" className="flex-1 flex items-center justify-center gap-2">
                        <SiGithub size={16} />
                        src
                      </Button>
                    </a>
                    )}
                    {project.links.demo && (
                      <a href={project.links.demo} target="_blank" rel="noopener noreferrer" className="flex-1">
                        <Button size="sm" variant="outline" className="flex-1 flex items-center justify-center gap-2">
                          <FiExternalLink size={16} />
                          view
                        </Button>
                      </a>
                    )}

                    {project.links.play && (
                      <a href={project.links.play} target="_blank" rel="noopener noreferrer" className="flex-1">
                        <Button size="sm" className="btn-accent flex-1 flex items-center justify-center gap-2">
                          <FaPlayCircle size={16} />
                          play
                        </Button>
                      </a>
                    )}

                    {project.links.play_itch && (
                      <a href={project.links.play_itch} target="_blank" rel="noopener noreferrer" className="flex-1">
                        <Button size="sm" className="btn-accent flex-1 flex items-center justify-center gap-2">
                          <FaItchIo size={16} />
                          play on itch
                        </Button>
                      </a>
                    )}

                    {project.links.play_steam && (
                      <a href={project.links.play_steam} target="_blank" rel="noopener noreferrer" className="flex-1">
                        <Button size="sm" className="btn-accent flex-1 flex items-center justify-center gap-2">
                          <FaSteam size={16} />
                          get on steam
                        </Button>
                      </a>
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