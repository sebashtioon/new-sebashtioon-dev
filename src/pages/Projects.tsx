import { SiGithub, SiDiscord, SiYoutube, SiBlender } from "react-icons/si";
import { FiEye, FiExternalLink, FiDownload } from "react-icons/fi";
import { FaPlayCircle, FaItchIo, FaSteam } from "react-icons/fa";

import { Button } from "@/components/ui/button";
import BackgroundGrid from "@/components/BackgroundGrid";
import SmartImage from "@/components/SmartImage";
import PageWrapper from "@/components/PageWrapper";
import { useImageLoadingDetector } from "@/hooks/useSmartLoading";
import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";

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
      title: "CANTWAKEUP",
      category: "games",
      description: "Welcome to sleep paralysis.",
      image: "/projects/cantwakeup.webp",
      tags: ["godot", "psx", "3D"],
      status: "in development",
      internalPath: "/blog/cantwakeup-ted-talk",
      links: {}
    },
    {
      id: 3,
      title: "The Swing",
      category: "games",
      description: "Alone on a swing, you remember what you tried to forget",
      image: "/projects/the-swing.webp",
      tags: ["godot", "psx", "low-poly", "3D", "super-short"],
      status: "completed",
      completedDate: "2025-07-16",
      links: {
        play_itch: "https://xintegrate-studios.itch.io/the-swing",
        github: "https://github.com/Xintegrate-Studios/The-Swing",
      }
    },
    {
      id: 4,
      title: "Vessel-9 Concept Art",
      category: "3d stuff",
      description: "concept art for a cinematic intro inspired by Subnautica's loading screen",
      image: "/projects/vessel-9-concept-art.webp",
      tags: ["blender", "3D", "concept-art"],
      status: "completed",
      completedDate: "2025-08-18",
      links: {
        download: "https://github.com/sebashtioon/sebashtioon-dev-download-archive/releases/download/Vessel-9-Concept-Art/Vessel-9.Concept.Art.zip",
        blender_download: "https://github.com/sebashtioon/sebashtioon-dev-download-archive/releases/download/Vessel-9-Concept-Art/Vessel-9.Concept.Art.Project.zip",
      }
    },
    {
      id: 5,
      title: "Peakscapes",
      category: "3d stuff",
      description: "beautiful and serene snowy mountains",
      image: "/projects/peakscapes.webp",
      tags: ["blender", "3D"],
      status: "completed",
      completedDate: "2025-08-21",
      links: {
        download: "https://github.com/sebashtioon/sebashtioon-dev-download-archive/releases/download/Peakscapes/Peakscapes.Art.zip",
        blender_download: "https://github.com/sebashtioon/sebashtioon-dev-download-archive/releases/download/Peakscapes/Peakscapes.Project.zip",
      }
    },
    {
      id: 6,
      title: "BH-1737",
      category: "3d stuff",
      description: "endless darkness",
      image: "/projects/bh-1737.webp",
      tags: ["3D", "blender"],
      status: "completed",
      completedDate: "2025-11-08",
      links: {
        download: "https://github.com/sebashtioon/sebashtioon-dev-download-archive/releases/download/BH-1737/BH-1737.Art.zip",
        blender_download: "https://github.com/sebashtioon/sebashtioon-dev-download-archive/releases/download/BH-1737/BH-1737.Project.zip",
      }
    },
    {
      id: 7,
      title: "Fire on the Mountain",
      category: "games",
      description: "Survive a savage island, balancing alliances and chaos in a Lord of the Flies-inspired struggle. For a school assignment.",
      image: "/projects/fire-on-the-mountain.webp",
      tags: ["3D", "low-poly", "survival", "school-assignment"],
      status: "completed",
      completedDate: "2025-09-20",
      links: {
        play_itch: "https://xintegrate-studios.itch.io/fire-on-the-mountain",
        github: "https://github.com/xintegrate-studios/Fire-on-the-Mountain",
      }
    }
    ,
    {
      id: 8,
      title: "nature thing",
      category: "3d stuff",
      description: "a nature thing i made in school",
      image: "/projects/nature-thing.webp",
      tags: ["blender", "3D", "nature"],
      status: "completed",
      completedDate: "2026-04-02",
      links: {
        download: "https://github.com/sebashtioon/sebashtioon-dev-download-archive/releases/download/nature-thing/nature.thing.Art.zip",
        blender_download: "https://github.com/sebashtioon/sebashtioon-dev-download-archive/releases/download/nature-thing/nature.thing.Project.zip",
      }
    }
  ];

  const categories = ["all", "games", "3d stuff"];
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedTags, setSelectedTags] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterMode, setFilterMode] = useState("any"); // "any" (OR) or "all" (AND)
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [displayCount, setDisplayCount] = useState(6); // Start with 6 projects
  
  // Scroll position preservation
  const scrollPositionRef = useRef(0);
  const preserveScrollRef = useRef(false);

  // Extract all unique tags from projects
  const allTags = [...new Set(projects.flatMap(project => project.tags))].sort((a, b) => {
    const priorityOrder = ["godot", "blender", "3D", "concept-art"];
    const aIndex = priorityOrder.indexOf(a);
    const bIndex = priorityOrder.indexOf(b);
    
    if (aIndex !== -1 && bIndex !== -1) return aIndex - bIndex;
    if (aIndex !== -1) return -1;
    if (bIndex !== -1) return 1;
    return a.localeCompare(b);
  });
  
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
    setStartDate("");
    setEndDate("");
  };

  // Format completion date for display
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
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
    
    // Date range filtering (only for completed projects with dates)
    let dateMatch = true;
    if ((startDate || endDate) && project.status === "completed" && project.completedDate) {
      const projectDate = new Date(project.completedDate);
      if (startDate && endDate) {
        dateMatch = projectDate >= new Date(startDate) && projectDate <= new Date(endDate);
      } else if (startDate) {
        dateMatch = projectDate >= new Date(startDate);
      } else if (endDate) {
        dateMatch = projectDate <= new Date(endDate);
      }
    }
    
    return categoryMatch && tagMatch && searchMatch && dateMatch;
  });

  // Track displayed projects
  const displayedProjects = filteredProjects.slice(0, displayCount);
  const hasMore = displayedProjects.length < filteredProjects.length;

  // Image loading detection
  const imageUrls = displayedProjects.map(project => project.image);
  const { onImageLoadStart, onImageLoadComplete } = useImageLoadingDetector(imageUrls);

  return (
    <>
      <PageWrapper>
        <div data-preserve-apostrophes className="min-h-screen pt-8 pb-20">
      {/* Header - Minimalist Style */}
      <section className="h-screen flex items-center justify-center px-4 relative">
        <div className="max-w-4xl mx-auto">
          <div className="text-left">
            <div className="max-w-3xl">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 lowercase leading-tight font-serif">
                my <span className="text-foreground">projects</span>
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl lowercase leading-relaxed">
                scroll <span className="inline-block w-8" />
                <span className="inline-flex flex-col items-center leading-[0.7] align-middle">
                  <span>|</span>
                  <span className="-mt-1">v</span>
                </span>
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
                  {filterMode === "any" ? "match any selected tag" : "match all selected tags"}
                </button>
              </div>
            )}
            <div className="flex flex-wrap items-center gap-3 text-muted-foreground text-sm mb-4 lowercase">
              <span>completed between:</span>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="bg-transparent border-none outline-none text-foreground text-sm lowercase"
                placeholder="start date"
              />
              <span>and</span>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="bg-transparent border-none outline-none text-foreground text-sm lowercase"
                placeholder="end date"
              />
            </div>
            <div className="flex flex-wrap items-center gap-3 text-muted-foreground text-sm mb-4">
              {(selectedCategory !== "all" || selectedTags.length > 0 || searchQuery !== "" || startDate !== "" || endDate !== "") && (
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
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {[...displayedProjects]
              .sort((a, b) => {
                // Always put CANTWAKEUP first
                if (a.title === 'CANTWAKEUP') return -1;
                if (b.title === 'CANTWAKEUP') return 1;
                if (a.status === 'completed' && b.status === 'completed') {
                  return new Date(b.completedDate).getTime() - new Date(a.completedDate).getTime();
                }
                if (a.status === 'completed') return -1;
                if (b.status === 'completed') return 1;
                return 0;
              })
              .map((project) => (
              <div 
                key={project.id} 
                className="bg-card/40 border border-border/40 rounded-xl overflow-hidden flex flex-col"
              >
                {/* Project Image */}
                <div>
                  <SmartImage
                    src={project.image}
                    alt={project.title}
                    className="w-full h-52"
                    onLoadStart={onImageLoadStart}
                    onLoadComplete={onImageLoadComplete}
                  />
                </div>

                {/* Project Info */}
                <div className="p-4 md:p-5 flex-1 flex flex-col gap-4">
                  <div>
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-muted-foreground mb-2 lowercase">
                      {[
                        <button
                          key="category"
                          onClick={() => handleCategoryClick(project.category)}
                          className={`hover:text-foreground transition-colors lowercase ${
                            selectedCategory === project.category ? 'text-foreground' : ''
                          }`}
                        >
                          {project.category}
                        </button>,
                        <button
                          key="status"
                          onClick={() => handleTagClick(project.status)}
                          className={`hover:text-foreground transition-colors lowercase ${
                            selectedTags.includes(project.status) ? 'text-foreground' : ''
                          }`}
                        >
                          {project.status}
                        </button>,
                        ...(project.status === "completed" && project.completedDate
                          ? [<span key="date">{formatDate(project.completedDate)}</span>]
                          : [])
                      ].map((el, idx, arr) => (
                        <span key={idx} style={{display: 'inline'}}>
                          {el}
                          {idx < arr.length - 1 ? ', ' : ''}
                        </span>
                      ))}
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
                          {tagIndex < project.tags.length - 1 && <span>, </span>}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Links */}
                  <div className="flex flex-wrap gap-2 mt-auto pt-1">
                    {project.internalPath && (
                      <Link to={project.internalPath} className="px-3 py-1.5 bg-card hover:bg-card-hover text-foreground border border-border rounded-lg transition-colors text-sm lowercase">
                        read
                      </Link>
                    )}
                    {project.links.github && (
                      <a href={project.links.github} target="_blank" rel="noopener noreferrer" className="px-3 py-1.5 bg-card hover:bg-card-hover text-foreground border border-border rounded-lg transition-colors text-sm lowercase">
                        src
                      </a>
                    )}
                    {project.links.demo && (
                      <a href={project.links.demo} target="_blank" rel="noopener noreferrer" className="px-3 py-1.5 bg-card hover:bg-card-hover text-foreground border border-border rounded-lg transition-colors text-sm lowercase">
                        view
                      </a>
                    )}
                    {project.links.play_itch && (
                      <a href={project.links.play_itch} target="_blank" rel="noopener noreferrer" className="px-3 py-1.5 bg-card hover:bg-card-hover text-foreground border border-border rounded-lg transition-colors text-sm lowercase">
                        play on itch
                      </a>
                    )}
                    {project.links.download && (
                      <a href={project.links.download} target="_blank" rel="noopener noreferrer" className="px-3 py-1.5 bg-card hover:bg-card-hover text-foreground border border-border rounded-lg transition-colors text-sm lowercase">
                        download
                      </a>
                    )}
                    {project.links.blender_download && (
                      <a href={project.links.blender_download} target="_blank" rel="noopener noreferrer" className="px-3 py-1.5 bg-card hover:bg-card-hover text-foreground border border-border rounded-lg transition-colors text-sm lowercase">
                        download project
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Load More Button */}
          {hasMore && (
            <div className="flex justify-center mt-12">
              <button
                onClick={() => setDisplayCount(prev => prev + 6)}
                className="px-6 py-2 bg-foreground text-background border border-foreground rounded-lg hover:bg-background hover:text-foreground transition-colors text-sm lowercase font-medium"
              >
                load more
              </button>
            </div>
          )}

          {/* No Results Message */}
          {filteredProjects.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground lowercase">no projects found</p>
            </div>
          )}
        </div>
      </section>

      </div>
      </PageWrapper>
    </>
  );
};

export default Projects;
