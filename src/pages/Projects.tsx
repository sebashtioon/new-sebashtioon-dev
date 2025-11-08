import { SiGithub, SiDiscord, SiYoutube, SiBlender } from "react-icons/si";
import { FiEye, FiExternalLink, FiDownload } from "react-icons/fi";
import { FaPlayCircle, FaItchIo, FaSteam } from "react-icons/fa";

import { Button } from "@/components/ui/button";
import BackgroundGrid from "@/components/BackgroundGrid";
import BottomNav from "@/components/BottomNav";
import SmartImage from "@/components/SmartImage";
import PageWrapper from "@/components/PageWrapper";
import { useSmartLoading, useImageLoadingDetector } from "@/hooks/useSmartLoading";
import { useState, useRef, useEffect } from "react";

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
    },
    {
      id: 6,
      title: "BH-1737",
      category: "3d stuff",
      description: "endless darkness framed by a ring of golden light.",
      image: "/projects/bh-1737.webp",
      tags: ["3d", "blender"],
      status: "completed",
      links: {
        download: "https://github.com/sebashtioon/sebashtioon-dev-download-archive/releases/download/BH-1737/BH-1737.Art.zip",
        blender_download: "https://github.com/sebashtioon/sebashtioon-dev-download-archive/releases/download/BH-1737/BH-1737.Project.zip",
      }
    }
  ];

  const categories = ["all", "games", "3d stuff"];
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedTags, setSelectedTags] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterMode, setFilterMode] = useState("any"); // "any" (OR) or "all" (AND)
  
  // Scroll position preservation
  const scrollPositionRef = useRef(0);
  const preserveScrollRef = useRef(false);

  // Extract all unique tags from projects
  const allTags = [...new Set(projects.flatMap(project => project.tags))].sort();
  
  // Extract all unique statuses from projects
  const allStatuses = [...new Set(projects.map(project => project.status))].sort();

  const handleTagClick = (tag) => {
    // Store current scroll position before filtering
    scrollPositionRef.current = window.scrollY;
    preserveScrollRef.current = true;
    
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  const handleCategoryClick = (category) => {
    // Store current scroll position before filtering
    scrollPositionRef.current = window.scrollY;
    preserveScrollRef.current = true;
    setSelectedCategory(category);
  };

  const clearAllFilters = () => {
    setSelectedCategory("all");
    setSelectedTags([]);
    setSearchQuery("");
  };

  // Restore scroll position after filtering
  useEffect(() => {
    if (preserveScrollRef.current) {
      // Use requestAnimationFrame to ensure DOM has updated
      requestAnimationFrame(() => {
        window.scrollTo(0, scrollPositionRef.current);
        preserveScrollRef.current = false;
      });
    }
  }, [selectedTags, selectedCategory]);

  const filteredProjects = projects.filter(project => {
    const categoryMatch = selectedCategory === "all" || project.category === selectedCategory;
    
    let tagMatch = true;
    if (selectedTags.length > 0) {
      if (filterMode === "any") {
        // OR logic: project matches if it has ANY of the selected tags/status
        tagMatch = selectedTags.some(tag => 
          project.tags.includes(tag) || project.status === tag
        );
      } else {
        // AND logic: project matches if it has ALL selected tags/status
        tagMatch = selectedTags.every(tag => 
          project.tags.includes(tag) || project.status === tag
        );
      }
    }
    
    const searchMatch = searchQuery === "" || 
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    return categoryMatch && tagMatch && searchMatch;
  });

  // Smart loading detection
  useSmartLoading(filteredProjects.length, {
    threshold: 8, // Show loading if 8+ projects
    delay: 800, // Keep loading for 800ms minimum
    loadingMessage: `loading ${filteredProjects.length} projects...`
  });

  // Image loading detection
  const imageUrls = filteredProjects.map(project => project.image);
  const { onImageLoadStart, onImageLoadComplete } = useImageLoadingDetector(imageUrls);

  return (
    <>
      <PageWrapper>
        <div className="min-h-screen pt-8 pb-20">
        <BackgroundGrid />

      {/* Header - Minimalist Style */}
      <section className="h-screen flex items-center justify-center px-4 relative">
        <div className="max-w-4xl mx-auto">
          <div className="text-left animate-fade-in">
            <div className="max-w-3xl">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 lowercase leading-tight font-serif">
                my <span className="text-foreground">projects</span>
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl lowercase leading-relaxed">
                a collection of projects i've worked on throughout the years.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Filters - Minimalist Style */}
      <section className="px-4 mb-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-left mb-6">
            <div className="flex items-center gap-3 text-muted-foreground text-sm mb-4 lowercase">
              <span>search:</span>
              <input
                type="text"
                placeholder="search projects..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-transparent border-none outline-none placeholder-muted-foreground text-foreground flex-1 lowercase"
              />
            </div>
            <div className="flex flex-wrap items-center gap-3 text-muted-foreground text-sm mb-4 lowercase">
              <span>category:</span>
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => handleCategoryClick(category)}
                  className={`hover:text-foreground transition-colors lowercase ${
                    selectedCategory === category ? 'text-foreground' : ''
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
            <div className="flex flex-wrap items-center gap-3 text-muted-foreground text-sm mb-4 lowercase">
              <span>tags:</span>
              {[...allTags, ...allStatuses].map((tag) => (
                <button
                  key={tag}
                  onClick={() => handleTagClick(tag)}
                  className={`hover:text-foreground transition-colors lowercase ${
                    selectedTags.includes(tag) ? 'text-foreground' : ''
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
            {selectedTags.length > 1 && (
              <div className="flex items-center gap-3 text-muted-foreground text-sm mb-4 lowercase">
                <span>filter mode:</span>
                <button
                  onClick={() => setFilterMode(filterMode === "any" ? "all" : "any")}
                  className="hover:text-foreground transition-colors lowercase text-foreground"
                >
                  {filterMode === "any" ? "show projects with any selected tags" : "show projects with all selected tags"}
                </button>
              </div>
            )}
            <div className="flex flex-wrap items-center gap-3 text-muted-foreground text-sm mb-4">
              {(selectedCategory !== "all" || selectedTags.length > 0 || searchQuery !== "") && (
                <>
                  <span>•</span>
                  <button
                    onClick={clearAllFilters}
                    className="hover:text-foreground transition-colors lowercase"
                  >
                    clear all
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Projects Grid - Minimalist Style */}
      <section className="px-4 pb-16">
        <div className="max-w-4xl mx-auto">
          <div className="grid gap-8">
            {filteredProjects.map((project, index) => (
              <div 
                key={project.id} 
                className="border-b border-border/30 pb-8 last:border-b-0"
              >
                <div className="grid md:grid-cols-3 gap-6 items-start">
                  {/* Project Image */}
                  <div className="md:col-span-1">
                    <SmartImage
                      src={project.image}
                      alt={project.title}
                      className="w-full h-48 rounded-lg"
                      onLoadStart={onImageLoadStart}
                      onLoadComplete={onImageLoadComplete}
                    />
                  </div>

                  {/* Project Info */}
                  <div className="md:col-span-2 space-y-3">
                    <div>
                      <div className="flex items-center gap-3 text-sm text-muted-foreground mb-2 lowercase">
                        <span>{project.category}</span>
                        <span>•</span>
                        <button
                          onClick={() => handleTagClick(project.status)}
                          className={`hover:text-foreground transition-colors lowercase ${
                            selectedTags.includes(project.status) ? 'text-foreground' : ''
                          }`}
                        >
                          {project.status}
                        </button>
                      </div>
                      
                      <h3 className="text-2xl font-bold mb-2">{project.title}</h3>
                      <p className="text-muted-foreground lowercase leading-relaxed">{project.description}</p>
                      
                      {/* Tags */}
                      <div className="flex flex-wrap items-center gap-3 text-muted-foreground text-sm mt-3 lowercase">
                        {project.tags.map((tag, tagIndex) => (
                          <span key={tag}>
                            <button
                              onClick={() => handleTagClick(tag)}
                              className={`hover:text-foreground transition-colors lowercase ${
                                selectedTags.includes(tag) ? 'text-foreground' : ''
                              }`}
                            >
                              {tag}
                            </button>
                            {tagIndex < project.tags.length - 1 && <span className="ml-3">•</span>}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Links */}
                    <div className="flex flex-wrap gap-3 mt-4">
                      {project.links.github && (
                        <a href={project.links.github} target="_blank" rel="noopener noreferrer" className="px-3 py-1.5 bg-white/10 hover:bg-white/20 text-white border border-white/30 rounded-lg transition-colors text-sm lowercase">
                          src
                        </a>
                      )}
                      {project.links.demo && (
                        <a href={project.links.demo} target="_blank" rel="noopener noreferrer" className="px-3 py-1.5 bg-white/10 hover:bg-white/20 text-white border border-white/30 rounded-lg transition-colors text-sm lowercase">
                          view
                        </a>
                      )}
                      {project.links.play_itch && (
                        <a href={project.links.play_itch} target="_blank" rel="noopener noreferrer" className="px-3 py-1.5 bg-white/10 hover:bg-white/20 text-white border border-white/30 rounded-lg transition-colors text-sm lowercase">
                          play on itch
                        </a>
                      )}
                      {project.links.download && (
                        <a href={project.links.download} target="_blank" rel="noopener noreferrer" className="px-3 py-1.5 bg-white/10 hover:bg-white/20 text-white border border-white/30 rounded-lg transition-colors text-sm lowercase">
                          download
                        </a>
                      )}
                      {project.links.blender_download && (
                        <a href={project.links.blender_download} target="_blank" rel="noopener noreferrer" className="px-3 py-1.5 bg-white/10 hover:bg-white/20 text-white border border-white/30 rounded-lg transition-colors text-sm lowercase">
                          download project
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      </div>
      </PageWrapper>
      <BottomNav />
    </>
  );
};

export default Projects;
