import { SiGithub, SiDiscord, SiYoutube, SiBlender } from "react-icons/si";
import { FiEye, FiExternalLink, FiDownload } from "react-icons/fi";
import { FaPlayCircle, FaItchIo, FaSteam } from "react-icons/fa";

import { Button } from "@/components/ui/button";
import BackgroundGrid from "@/components/BackgroundGrid";
import BottomNav from "@/components/BottomNav";
import { useState } from "react";

const Projects = () => {
  const projects = [
    {
      id: 1,
      title: "Expland",
      category: "games",
      description: "Face adversity, hardship, enjoy adventure as well, and discover a second chance to fix past mistakes and become a better person in a mysterious world with nightmares and happiness just around the corner.",
      image: "/projects/expland.webp",
      tags: ["godot", "3D", "noeco"],
      status: "in development",
      links: {
        demo: "https://noeco.xyz/games/expland",
      }
    },
    {
      id: 2,
      title: "CAN'T WAKE UP",
      category: "games",
      description: "Welcome to sleep paralysis.",
      image: "/projects/placeholder.webp",
      tags: ["godot", "psx", "3D"],
      status: "in development",
      links: {}
    },
    {
      id: 3,
      title: "The Swing",
      category: "games",
      description: "Alone on a swing, you remember what you tried to forget.",
      image: "/projects/the-swing.webp",
      tags: ["godot", "psx", "low-poly", "3D", "super-short"],
      status: "completed",
      links: {
        play_itch: "https://xintegrate-studios.itch.io/the-swing",
        github: "https://github.com/Xintegrate-Studios/The-Swing",
      }
    },
    {
      id: 4,
      title: "Vessel-9 Concept Art",
      category: "3d stuff",
      description: "Concept art for a cinematic intro inspired by Subnautica's loading screen.",
      image: "/projects/vessel-9-concept-art.webp",
      tags: ["blender", "3D", "concept-art"],
      status: "completed",
      links: {
        download: "https://github.com/sebashtioon/sebashtioon-dev-download-archive/releases/download/Vessel-9-Concept-Art/Vessel-9.Concept.Art.zip",
        blender_download: "https://github.com/sebashtioon/sebashtioon-dev-download-archive/releases/download/Vessel-9-Concept-Art/Vessel-9.Concept.Art.Project.zip",
      }
    },
    {
      id: 5,
      title: "Peakscapes",
      category: "3d stuff",
      description: "Beautiful and serene snowy mountains.",
      image: "/projects/peakscapes.webp",
      tags: ["blender", "3D"],
      status: "completed",
      links: {
        download: "https://github.com/sebashtioon/sebashtioon-dev-download-archive/releases/download/Peakscapes/Peakscapes.Art.zip",
        blender_download: "https://github.com/sebashtioon/sebashtioon-dev-download-archive/releases/download/Peakscapes/Peakscapes.Project.zip",
      }
    }
  ];

  const categories = ["all", "games", "3d stuff"];
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedTags, setSelectedTags] = useState([]);

  // Extract all unique tags from projects
  const allTags = [...new Set(projects.flatMap(project => project.tags))].sort();

  const handleTagClick = (tag) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  const clearAllFilters = () => {
    setSelectedCategory("all");
    setSelectedTags([]);
  };

  const filteredProjects = projects.filter(project => {
    const categoryMatch = selectedCategory === "all" || project.category === selectedCategory;
    const tagMatch = selectedTags.length === 0 || selectedTags.some(tag => project.tags.includes(tag));
    return categoryMatch && tagMatch;
  });

  return (
    <div className="min-h-screen pt-8 pb-20">
      <BackgroundGrid />

      {/* Header - Clean Design */}
      <section className="py-16 px-4 relative">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 animate-fade-in">
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 lowercase leading-tight">
                my <span className="text-foreground font-tech">projects</span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl lowercase">
                a collection of projects i've worked on throughout the years.
              </p>
            </div>
            
            <div className="lg:col-span-4 hidden lg:block">
              <div className="card-simple p-6 text-center">
                <div className="text-2xl font-bold">{projects.length}+</div>
                <div className="text-sm text-muted-foreground">projects created</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="px-4 mb-4">
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

      {/* Tag Filter */}
      <section className="px-4 mb-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-4">
            <h3 className="text-sm text-muted-foreground mb-3">filter by tags:</h3>
            <div className="flex flex-wrap justify-center gap-2 mb-4">
              {allTags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => handleTagClick(tag)}
                  className={`text-xs px-3 py-1.5 rounded-full font-tech transition-all duration-200 hover:scale-105 ${
                    selectedTags.includes(tag)
                      ? "bg-accent text-accent-foreground shadow-lg"
                      : "bg-accent/20 text-accent hover:bg-accent/30"
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
            {(selectedCategory !== "all" || selectedTags.length > 0) && (
              <Button
                onClick={clearAllFilters}
                variant="ghost"
                size="sm"
                className="text-xs text-muted-foreground hover:text-foreground"
              >
                clear all filters
              </Button>
            )}
          </div>
        </div>
      </section>

      {/* Projects Grid - Masonry Style */}
      <section className="px-4 pb-16">
        <div className="max-w-7xl mx-auto">
          <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
            {filteredProjects.map((project, index) => (
              <div 
                key={project.id} 
                className={`card-project p-6 break-inside-avoid mb-8 hover:scale-105 transition-transform ${
                  index % 3 === 0 ? 'lg:mt-8' : index % 3 === 1 ? 'lg:mt-16' : 'lg:mt-0'
                }`}
              >
                {/* Project Image */}
                <div className="relative mb-6 overflow-hidden rounded-lg">
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-48 object-cover transition-transform duration-300 hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-end justify-center p-4">
                  </div>
                </div>

                {/* Project Info */}
                <div className="space-y-4 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-accent font-medium">{project.category}</span>
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
                    <div className="flex flex-wrap gap-2 mt-2">
                      {project.tags.map((tag) => (
                        <button
                          key={tag}
                          onClick={() => handleTagClick(tag)}
                          className={`text-xs px-2 py-1 rounded-md font-tech transition-all duration-200 hover:scale-105 cursor-pointer ${
                            selectedTags.includes(tag)
                              ? "bg-accent text-accent-foreground shadow-lg"
                              : "bg-accent/20 text-accent hover:bg-accent/30"
                          }`}
                        >
                          {tag}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Links */}
                  <div className="flex flex-wrap gap-2 mt-4">
                    {project.links.github && (
                      <a href={project.links.github} target="_blank" rel="noopener noreferrer">
                        <Button size="sm" variant="outline" className="flex items-center justify-center gap-2">
                          <SiGithub size={16} /> src
                        </Button>
                      </a>
                    )}
                    {project.links.demo && (
                      <a href={project.links.demo} target="_blank" rel="noopener noreferrer">
                        <Button size="sm" variant="outline" className="flex items-center justify-center gap-2">
                          <FiExternalLink size={16} /> view
                        </Button>
                      </a>
                    )}

                    {project.links.play_itch && (
                      <a href={project.links.play_itch} target="_blank" rel="noopener noreferrer">
                        <Button size="sm" className="btn-accent flex items-center justify-center gap-2">
                          <FaItchIo size={16} /> play on itch
                        </Button>
                      </a>
                    )}

                    {project.links.download && (
                      <a href={project.links.download} target="_blank" rel="noopener noreferrer">
                        <Button size="sm" className="btn-accent flex items-center justify-center gap-2">
                          <FiDownload size={16} /> download
                        </Button>
                      </a>
                    )}
                    {project.links.blender_download && (
                      <a href={project.links.blender_download} target="_blank" rel="noopener noreferrer">
                        <Button size="sm" className="btn-accent flex items-center justify-center gap-2">
                          <SiBlender size={16} /> download project
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

      <BottomNav />
    </div>
  );
};

export default Projects;
