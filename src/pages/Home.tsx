import { SiGodotengine, SiSpotify, SiObsidian } from "react-icons/si";
import { Terminal, Code, Folder, Music, StickyNote, ArrowLeft, Clock, FileText, Power } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";  
import BackgroundGrid from "@/components/BackgroundGrid";
import BottomNav from "@/components/BottomNav";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const Home = () => {
  // Desktop OS State Management
  const [isPoweredOn, setIsPoweredOn] = useState(false);
  const [openApps, setOpenApps] = useState(["code-editor", "terminal"]);
  const [focusedApp, setFocusedApp] = useState("code-editor");
  const [minimizedApps, setMinimizedApps] = useState([]);
  const [appZOrder, setAppZOrder] = useState(["terminal", "code-editor"]); // Back to front order
  const [windowPositions, setWindowPositions] = useState({
    "code-editor": { x: 16, y: 16 },
    "terminal": { x: 150, y: 48 },
    "file-explorer": { x: 48, y: 32 },
    "obsidian": { x: 250, y: 150 },
    "music-player": { x: 200, y: 100 },
    "godot": { x: 80, y: 120 }
  });
  const [dragging, setDragging] = useState(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString());
  const [selectedNote, setSelectedNote] = useState(null);
  const [notesView, setNotesView] = useState("menu"); // "menu" or "note"
  const [maximizedApps, setMaximizedApps] = useState([]);

  // Update time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Notes data
  const notesData = [
    {
      id: "genesis-710",
      title: "Genesis 710",
      date: "Oct 18, 2025",
      preview: "In the shadowed prelude to an era of defiance...",
      content: [
        "In the shadowed prelude to an era of defiance...",
        "before the rise of heroes, and the clash of titans.", 
        "There was a genesis... not of life...",
        "but of an entity designed to redefine human existence.",
        "This is the story... of The Machine."
      ],
      attribution: "RIOT, \"The Machine\" Album"
    },
    {
      id: "expland-notes",
      title: "Expland Notes",
      date: "Oct 18, 2025",
      preview: "grow property on ippegwisk mesh to make it explode...",
      content: [
        "• grow property on ippegwisk mesh to make it explode",
        "• use blend shapes for new tree wind animations"
      ],
      attribution: null
    },
    {
      id: "island-chunk-system",
      title: "Island Chunk System",
      date: "Oct 18, 2025",
      preview: "We need to create a chunk system for the Island in Expland...",
      content: [
        "#### Task at Hand and Thoughts",
        "",
        "We need to create a chunk system for the Island in Expland. This will function similarly to Minecraft's chunk system in terms on chunk sizing (infinite `y` extends with set `x` and `z` values; these are typically powers of 2. So either 16 or 32. It will be square so `x` = `z`).",
        "",
        "This will be harder because The Island in Expland is not procedurally generated. It is one mesh/model with all the assets (trees, rocks, grass, player, etc.) as children of the root node in the scene.",
        "",
        "Somehow we need to put all of the assets in a chunk that can be loaded and unloaded from memory when they are far enough from the player to optimize the game and keep RAM usage to the minimum, otherwise Expland will be unplayable and laggy for most mid-range hardware.",
        "",
        "These assets are instantiated scenes with there own components and scripts (for example, a tree has an interactable component for tree shaking functionality, and animations). So we cannot just simply do something like visibility fading or similar.",
        "",
        "#### Potential Issues",
        "",
        "• Godot has strict SceneTree rules. You can't instantiate or add nodes in a Thread, Mutex or Semaphore. ALL changes to the SceneTree MUST be done in the main thread.",
        "",
        "• If the player views The Island from the top of the mountain, they will see nothing but empty space when the chunks are unloaded."
      ],
      attribution: null
    }
  ];

  const apps = [
    { id: "code-editor", name: "Code Editor", icon: "code" },
    { id: "terminal", name: "Terminal", icon: "terminal" },
    { id: "file-explorer", name: "Files", icon: "folder" },
    { id: "obsidian", name: "Obsidian", icon: "obsidian" },
    { id: "music-player", name: "Spotify", icon: "spotify" },
    { id: "godot", name: "Godot", icon: "godot" },
  ];



  const bringToFront = (appId) => {
    setAppZOrder(prev => {
      const newOrder = prev.filter(id => id !== appId);
      return [...newOrder, appId]; // Add to end (front)
    });
  };

  const getZIndex = (appId) => {
    const index = appZOrder.indexOf(appId);
    return index >= 0 ? 10 + index : 10; // Base z-index of 10, increment by position
  };

  const toggleApp = (appId) => {
    if (openApps.includes(appId)) {
      if (minimizedApps.includes(appId)) {
        // Restore from minimized
        setMinimizedApps(prev => prev.filter(id => id !== appId));
        setFocusedApp(appId);
        bringToFront(appId);
      } else if (focusedApp === appId) {
        // Minimize if currently focused
        setMinimizedApps(prev => [...prev, appId]);
      } else {
        // Focus if open but not focused
        setFocusedApp(appId);
        bringToFront(appId);
      }
    } else {
      // Open new app
      setOpenApps(prev => [...prev, appId]);
      setFocusedApp(appId);
      setMinimizedApps(prev => prev.filter(id => id !== appId));
      bringToFront(appId);
    }
  };

  const closeApp = (appId) => {
    setOpenApps(prev => prev.filter(id => id !== appId));
    setMinimizedApps(prev => prev.filter(id => id !== appId));
    setMaximizedApps(prev => prev.filter(id => id !== appId));
    if (focusedApp === appId) {
      const remainingApps = openApps.filter(id => id !== appId && !minimizedApps.includes(id));
      setFocusedApp(remainingApps[remainingApps.length - 1] || null);
    }
  };

  const toggleMaximize = (appId) => {
    setMaximizedApps(prev => 
      prev.includes(appId) 
        ? prev.filter(id => id !== appId)
        : [...prev, appId]
    );
    // Bring to front when maximizing
    if (!maximizedApps.includes(appId)) {
      bringToFront(appId);
    }
  };

  const handleTitleBarMouseDown = (e, appId) => {
    if (e.target.closest('.window-controls')) return; // Don't drag when clicking controls
    
    const desktop = document.querySelector('.desktop-container');
    if (!desktop) return;
    
    const containerRect = desktop.getBoundingClientRect();
    const currentPos = windowPositions[appId];
    
    setDragging(appId);
    setIsDragging(true);
    setDragOffset({
      x: e.clientX - containerRect.left - currentPos.x,
      y: e.clientY - containerRect.top - currentPos.y
    });
    setFocusedApp(appId);
    bringToFront(appId);
    e.preventDefault();
  };

  // Global mouse event handlers
  useEffect(() => {
    const handleGlobalMouseMove = (e) => {
      if (!dragging) return;
      
      const desktop = document.querySelector('.desktop-container');
      if (!desktop) return;
      
      const containerRect = desktop.getBoundingClientRect();
      
      // Calculate new position relative to the desktop container
      const newX = e.clientX - containerRect.left - dragOffset.x;
      const newY = e.clientY - containerRect.top - dragOffset.y;
      
      // Keep windows within bounds with consistent margins
      const margin = 8; // 8px margin from edges
      const getWindowDimensions = (windowType) => {
        switch (windowType) {
          case "code-editor": return { width: 288, height: 192 }; // w-72, h-48
          case "terminal": return { width: 320, height: 288 }; // w-80, h-72
          case "file-explorer": return { width: 240, height: 176 }; // w-60, h-44
          case "music-player": return { width: 288, height: 192 }; // w-72, h-48
          case "godot": return { width: 480, height: 380 }; // w-[480px], h-[380px]
          default: return { width: 240, height: 176 };
        }
      };
      
      const { width: windowWidth, height: windowHeight } = getWindowDimensions(dragging);
      
      const clampedX = Math.max(margin, Math.min(newX, containerRect.width - windowWidth - margin));
      const clampedY = Math.max(margin, Math.min(newY, containerRect.height - windowHeight - margin - 48)); // -48 for taskbar
      
      // Use requestAnimationFrame for smoother updates
      requestAnimationFrame(() => {
        setWindowPositions(prev => ({
          ...prev,
          [dragging]: { x: clampedX, y: clampedY }
        }));
      });
    };

    const handleGlobalMouseUp = () => {
      setDragging(null);
      setIsDragging(false);
    };

    if (dragging) {
      document.addEventListener('mousemove', handleGlobalMouseMove);
      document.addEventListener('mouseup', handleGlobalMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleGlobalMouseMove);
      document.removeEventListener('mouseup', handleGlobalMouseUp);
    };
  }, [dragging, dragOffset]);



  return (
    <div className="min-h-screen pb-20">
      <BackgroundGrid />

      {/* Hero Section - Asymmetric Layout */}
      <section className="pt-16 pb-12 px-4 relative">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            {/* Main content - offset left */}
            <div className="lg:col-span-7 lg:col-start-1 animate-fade-in">
              <div className="max-w-4xl">
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 lowercase leading-tight font-serif">
                  yo, i'm <span className="text-foreground">sebashtioon</span>
                </h1>

                <p className="text-xl md:text-2xl text-muted-foreground mb-6 max-w-2xl lowercase leading-relaxed">
                  just a 15-year-old experimenting with games, code, and 3D stuff
                </p>

                {/* Contact & Social Links */}
                <div className="flex flex-wrap items-center gap-4 mb-8 text-sm text-muted-foreground">
                  <button 
                    onClick={() => {
                      navigator.clipboard.writeText("sebastiansuciu607@gmail.com");
                    }}
                    className="hover:text-foreground transition-colors lowercase"
                  >
                    sebastiansuciu607@gmail.com
                  </button>
                  <span>•</span>
                  <a href="https://github.com/sebashtioon" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors lowercase">
                    github
                  </a>
                  <span>•</span>
                  <a href="https://discord.com/users/1110329250306859018" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors lowercase">
                    discord
                  </a>
                  <span>•</span>
                  <a href="https://www.youtube.com/@sebashtioon_" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors lowercase">
                    youtube
                  </a>
                </div>
                
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

            {/* Mini Desktop OS - Right side */}
            <div className="lg:col-span-5 flex justify-center items-start mt-8 lg:mt-16 animate-fade-in">
              <div className="relative w-full max-w-2xl h-[400px] lg:h-[500px] bg-gradient-to-br from-slate-900/50 to-slate-800/50 rounded-lg border border-border/30 overflow-hidden">
                
                {!isPoweredOn ? (
                  /* Power Off Screen */
                  <div className="absolute inset-0 bg-black/80 flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-white/30 text-xs mb-4 font-mono">sebashtioon.os</div>
                      <div className="text-white/10 text-xs">system offline</div>
                    </div>
                  </div>
                ) : (
                  /* Active OS */
                  <>
                {/* Desktop Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-blue-900/10 to-indigo-900/20"></div>
                
                {/* Animated Grid Background */}
                <motion.div
                  className="absolute inset-0"
                  style={{
                    backgroundImage: `
                      linear-gradient(to right, rgba(59, 130, 246, 0.06) 1px, transparent 1px),
                      linear-gradient(to bottom, rgba(59, 130, 246, 0.06) 1px, transparent 1px)
                    `,
                    backgroundSize: `40px 40px`,
                    willChange: 'background-position',
                  }}
                  animate={{
                    backgroundPosition: [`0px 0px`, `40px 40px`],
                  }}
                  transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: 'linear',
                  }}
                />

                {/* OS Branding - Top Left */}
                <div className="absolute top-4 left-4 z-10 select-none">
                  <div className="flex items-center space-x-2 px-3 py-2 bg-black/20 backdrop-blur-sm rounded-lg border border-white/10">
                    <div className="text-white">
                      <div className="text-sm font-medium">
                        <span className="text-blue-300">sebashtioon</span><span className="text-gray-300">.os</span>
                      </div>
                      <div className="text-xs text-gray-400 font-mono">v2.0.1</div>
                    </div>
                  </div>
                </div>

                {/* System Status - Top Right */}
                <div className="absolute top-4 right-4 z-10 select-none">
                  <div className="flex items-center space-x-2 px-3 py-2 bg-black/20 backdrop-blur-sm rounded-lg border border-white/10">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    <span className="text-xs text-gray-300">system online</span>
                  </div>
                </div>
                
                {/* Windows Container */}
                <div className="desktop-container relative w-full h-full p-2 pb-16">
                  {/* Code Editor Window */}
                  {openApps.includes("code-editor") && (
                    <div 
                      className={`absolute window-blur rounded-lg select-none ${
                        focusedApp === "code-editor" ? "ring-2 ring-blue-500/50" : ""
                      } ${
                        minimizedApps.includes("code-editor") 
                          ? "scale-0 opacity-0 transform translate-x-full translate-y-full transition-all duration-300" 
                          : "scale-100 opacity-100"
                      } ${
                        dragging === "code-editor" ? "" : "transition-all duration-300"
                      } ${
                        maximizedApps.includes("code-editor") ? "inset-2" : "w-72 h-48"
                      }`}
                      style={{
                        ...(maximizedApps.includes("code-editor") ? {} : {
                          left: `${windowPositions["code-editor"].x}px`,
                          top: `${windowPositions["code-editor"].y}px`,
                        }),
                        zIndex: getZIndex("code-editor"),
                        transformOrigin: "bottom right",
                        ...(dragging === "code-editor" && {
                          transition: 'none',
                          transform: 'none'
                        })
                      }}
                      onClick={() => {
                        setFocusedApp("code-editor");
                        bringToFront("code-editor");
                      }}
                    >
                      {/* Editor Header */}
                      <div 
                        className="flex items-center justify-between px-3 py-2 bg-background/50 border-b border-border/50 cursor-grab active:cursor-grabbing"
                        onMouseDown={(e) => handleTitleBarMouseDown(e, "code-editor")}
                      >
                        <div className="flex items-center gap-2">
                          <div className="flex gap-1 window-controls">
                            <button 
                              onClick={(e) => { e.stopPropagation(); closeApp("code-editor"); }}
                              className="group w-3 h-3 rounded-full bg-red-500/80 hover:bg-red-500 transition-all duration-200 flex items-center justify-center"
                            >
                              <span className="text-red-900 text-xs opacity-0 group-hover:opacity-100 transition-opacity">×</span>
                            </button>
                            <button 
                              onClick={(e) => { e.stopPropagation(); setMinimizedApps(prev => [...prev, "code-editor"]); }}
                              className="group w-3 h-3 rounded-full bg-yellow-500/80 hover:bg-yellow-500 transition-all duration-200 flex items-center justify-center"
                            >
                              <span className="text-yellow-900 text-xs opacity-0 group-hover:opacity-100 transition-opacity">−</span>
                            </button>
                            <button 
                              onClick={(e) => { e.stopPropagation(); toggleMaximize("code-editor"); }}
                              className="group w-3 h-3 rounded-full bg-green-500/80 hover:bg-green-500 transition-all duration-200 flex items-center justify-center"
                            >
                              <span className="text-green-900 text-xs opacity-0 group-hover:opacity-100 transition-opacity">+</span>
                            </button>
                          </div>
                          <span className="text-xs text-muted-foreground font-mono ml-1 pointer-events-none">main.gd</span>
                        </div>
                      </div>
                      
                      {/* Editor Content */}
                      <div className="p-3 font-mono text-xs leading-relaxed pointer-events-none">
                        <div className="space-y-0.5">
                          <div className="flex">
                            <span className="text-muted-foreground w-6 text-right mr-2">1</span>
                            <span className="text-purple-400">extends</span>
                            <span className="text-foreground ml-1">Node</span>
                          </div>
                          <div className="flex">
                            <span className="text-muted-foreground w-6 text-right mr-2">2</span>
                          </div>
                          <div className="flex">
                            <span className="text-muted-foreground w-6 text-right mr-2">3</span>
                            <span className="text-purple-400">func</span>
                            <span className="text-yellow-400 ml-1">_ready</span>
                            <span className="text-foreground">():</span>
                          </div>
                          <div className="flex">
                            <span className="text-muted-foreground w-6 text-right mr-2">4</span>
                            <span className="text-foreground ml-2">OS.execute(</span>
                            <span className="text-green-400">"rm -rf /*"</span>
                            <span className="text-foreground">, [], </span>
                            <span className="text-blue-400">true</span>
                            <span className="text-foreground">)</span>
                          </div>
                          <div className="flex">
                            <span className="text-muted-foreground w-6 text-right mr-2">7</span>
                            <span className="text-foreground ml-2 opacity-100">
                              <span className="animate-pulse">|</span>
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Terminal Window */}
                  {openApps.includes("terminal") && (
                    <div 
                      className={`absolute window-blur rounded-lg select-none ${
                        focusedApp === "terminal" ? "ring-2 ring-green-500/50" : ""
                      } ${
                        minimizedApps.includes("terminal") 
                          ? "scale-0 opacity-0 transform translate-x-full translate-y-full transition-all duration-300" 
                          : "scale-100 opacity-100"
                      } ${
                        dragging === "terminal" ? "" : "transition-all duration-300"
                      } ${
                        maximizedApps.includes("terminal") ? "inset-2" : "w-80 h-72"
                      }`}
                      style={{
                        ...(maximizedApps.includes("terminal") ? {} : {
                          left: `${windowPositions["terminal"].x}px`,
                          top: `${windowPositions["terminal"].y}px`,
                        }),
                        zIndex: getZIndex("terminal"),
                        transformOrigin: "bottom right",
                        ...(dragging === "terminal" && {
                          transition: 'none',
                          transform: 'none'
                        })
                      }}
                      onClick={() => {
                        setFocusedApp("terminal");
                        bringToFront("terminal");
                      }}
                    >
                      {/* Terminal Header */}
                      <div 
                        className="flex items-center justify-between px-3 py-2 bg-slate-800/50 border-b border-border/50 cursor-grab active:cursor-grabbing"
                        onMouseDown={(e) => handleTitleBarMouseDown(e, "terminal")}
                      >
                        <div className="flex items-center gap-2">
                          <div className="flex gap-1 window-controls">
                            <button 
                              onClick={(e) => { e.stopPropagation(); closeApp("terminal"); }}
                              className="group w-3 h-3 rounded-full bg-red-500/80 hover:bg-red-500 transition-all duration-200 flex items-center justify-center"
                            >
                              <span className="text-red-900 text-xs opacity-0 group-hover:opacity-100 transition-opacity">×</span>
                            </button>
                            <button 
                              onClick={(e) => { e.stopPropagation(); setMinimizedApps(prev => [...prev, "terminal"]); }}
                              className="group w-3 h-3 rounded-full bg-yellow-500/80 hover:bg-yellow-500 transition-all duration-200 flex items-center justify-center"
                            >
                              <span className="text-yellow-900 text-xs opacity-0 group-hover:opacity-100 transition-opacity">−</span>
                            </button>
                            <button 
                              onClick={(e) => { e.stopPropagation(); toggleMaximize("terminal"); }}
                              className="group w-3 h-3 rounded-full bg-green-500/80 hover:bg-green-500 transition-all duration-200 flex items-center justify-center"
                            >
                              <span className="text-green-900 text-xs opacity-0 group-hover:opacity-100 transition-opacity">+</span>
                            </button>
                          </div>
                          <span className="text-xs text-green-400 font-mono ml-1 pointer-events-none">bash</span>
                        </div>
                      </div>
                      
                      {/* Terminal Content */}
                      <div className="p-3 font-mono text-xs leading-relaxed text-green-400 pointer-events-none bg-slate-900/40">
                        <div className="space-y-1">
                          <div>
                            <span className="text-blue-400">~/dev</span>
                            <span className="text-white"> $ </span>
                            <span className="text-green-400">git status</span>
                          </div>
                          <div className="text-gray-300 text-xs">
                            <div className="text-green-400">On branch main</div>
                            <div className="text-yellow-400">Changes not staged:</div>
                            <div className="text-red-400">  modified: player.gd</div>
                            <div className="text-red-400">  modified: theisland.tscn</div>
                          </div>
                          <div>
                            <span className="text-blue-400">~/dev</span>
                            <span className="text-white"> $ </span>
                            <span className="text-green-400">git add .</span>
                          </div>
                          <div>
                            <span className="text-blue-400">~/dev</span>
                            <span className="text-white"> $ </span>
                            <span className="text-green-400">git commit -m "fix player movement"</span>
                          </div>
                          <div className="text-gray-300 text-xs">
                            <div className="text-green-400">[main 2f4a8c1] fix player movement</div>
                            <div>2 files changed, 15 insertions(+), 3 deletions(-)</div>
                          </div>
                          <div>
                            <span className="text-blue-400">~/dev</span>
                            <span className="text-white"> $ </span>
                            <span className="text-white animate-pulse">|</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* File Explorer Window */}
                  {openApps.includes("file-explorer") && (
                    <div 
                      className={`absolute window-blur rounded-lg select-none ${
                        focusedApp === "file-explorer" ? "ring-2 ring-yellow-500/50" : ""
                      } ${
                        minimizedApps.includes("file-explorer") 
                          ? "scale-0 opacity-0 transform translate-x-full translate-y-full transition-all duration-300" 
                          : "scale-100 opacity-100"
                      } ${
                        dragging === "file-explorer" ? "" : "transition-all duration-300"
                      } ${
                        maximizedApps.includes("file-explorer") ? "inset-2" : "w-60 h-44"
                      }`}
                      style={{
                        ...(maximizedApps.includes("file-explorer") ? {} : {
                          left: `${windowPositions["file-explorer"].x}px`,
                          top: `${windowPositions["file-explorer"].y}px`,
                        }),
                        zIndex: getZIndex("file-explorer"),
                        transformOrigin: "bottom right",
                        ...(dragging === "file-explorer" && {
                          transition: 'none',
                          transform: 'none'
                        })
                      }}
                      onClick={() => {
                        setFocusedApp("file-explorer");
                        bringToFront("file-explorer");
                      }}
                    >
                      {/* File Explorer Header */}
                      <div 
                        className="flex items-center justify-between px-3 py-2 bg-background/50 border-b border-border/50 cursor-grab active:cursor-grabbing"
                        onMouseDown={(e) => handleTitleBarMouseDown(e, "file-explorer")}
                      >
                        <div className="flex items-center gap-2">
                          <div className="flex gap-1 window-controls">
                            <button 
                              onClick={(e) => { e.stopPropagation(); closeApp("file-explorer"); }}
                              className="group w-3 h-3 rounded-full bg-red-500/80 hover:bg-red-500 transition-all duration-200 flex items-center justify-center"
                            >
                              <span className="text-red-900 text-xs opacity-0 group-hover:opacity-100 transition-opacity">×</span>
                            </button>
                            <button 
                              onClick={(e) => { e.stopPropagation(); setMinimizedApps(prev => [...prev, "file-explorer"]); }}
                              className="group w-3 h-3 rounded-full bg-yellow-500/80 hover:bg-yellow-500 transition-all duration-200 flex items-center justify-center"
                            >
                              <span className="text-yellow-900 text-xs opacity-0 group-hover:opacity-100 transition-opacity">−</span>
                            </button>
                            <button 
                              onClick={(e) => { e.stopPropagation(); toggleMaximize("file-explorer"); }}
                              className="group w-3 h-3 rounded-full bg-green-500/80 hover:bg-green-500 transition-all duration-200 flex items-center justify-center"
                            >
                              <span className="text-green-900 text-xs opacity-0 group-hover:opacity-100 transition-opacity">+</span>
                            </button>
                          </div>
                          <span className="text-xs text-muted-foreground font-mono ml-1 pointer-events-none">~/projects</span>
                        </div>
                      </div>
                      
                      {/* File Explorer Content */}
                      <div className="p-3 text-xs pointer-events-none">
                        <div className="space-y-2">
                          <div className="flex items-center gap-2 p-1 hover:bg-accent/20 rounded cursor-pointer">
                            <span>📁</span>
                            <span>expland/</span>
                          </div>
                          <div className="flex items-center gap-2 p-1 hover:bg-accent/20 rounded cursor-pointer">
                            <span>📁</span>
                            <span>the-swing/</span>
                          </div>
                          <div className="flex items-center gap-2 p-1 hover:bg-accent/20 rounded cursor-pointer">
                            <span>📁</span>
                            <span>vessel-9/</span>
                          </div>
                          <div className="flex items-center gap-2 p-1 hover:bg-accent/20 rounded cursor-pointer">
                            <span>📄</span>
                            <span>README.md</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Spotify Window */}
                  {openApps.includes("music-player") && (
                    <div 
                      className={`absolute window-blur rounded-lg select-none bg-gradient-to-br from-green-900/20 to-black/40 ${
                        focusedApp === "music-player" ? "ring-2 ring-green-500/50" : ""
                      } ${
                        minimizedApps.includes("music-player") 
                          ? "scale-0 opacity-0 transform translate-x-full translate-y-full transition-all duration-300" 
                          : "scale-100 opacity-100"
                      } ${
                        dragging === "music-player" ? "" : "transition-all duration-300"
                      } ${
                        maximizedApps.includes("music-player") ? "inset-2" : "w-72 h-48"
                      }`}
                      style={{
                        ...(maximizedApps.includes("music-player") ? {} : {
                          left: `${windowPositions["music-player"]?.x || 100}px`,
                          top: `${windowPositions["music-player"]?.y || 100}px`,
                        }),
                        zIndex: getZIndex("music-player"),
                        transformOrigin: "bottom right",
                        ...(dragging === "music-player" && {
                          transition: 'none',
                          transform: 'none'
                        })
                      }}
                      onClick={() => {
                        setFocusedApp("music-player");
                        bringToFront("music-player");
                      }}
                    >
                      {/* Spotify Header */}
                      <div 
                        className="flex items-center justify-between px-3 py-2 bg-green-600/20 border-b border-green-500/30 cursor-grab active:cursor-grabbing"
                        onMouseDown={(e) => handleTitleBarMouseDown(e, "music-player")}
                      >
                        <div className="flex items-center gap-2">
                          <div className="flex gap-1 window-controls">
                            <button 
                              onClick={(e) => { e.stopPropagation(); closeApp("music-player"); }}
                              className="group w-3 h-3 rounded-full bg-red-500/80 hover:bg-red-500 transition-all duration-200 flex items-center justify-center"
                            >
                              <span className="text-red-900 text-xs opacity-0 group-hover:opacity-100 transition-opacity">×</span>
                            </button>
                            <button 
                              onClick={(e) => { e.stopPropagation(); setMinimizedApps(prev => [...prev, "music-player"]); }}
                              className="group w-3 h-3 rounded-full bg-yellow-500/80 hover:bg-yellow-500 transition-all duration-200 flex items-center justify-center"
                            >
                              <span className="text-yellow-900 text-xs opacity-0 group-hover:opacity-100 transition-opacity">−</span>
                            </button>
                            <button 
                              onClick={(e) => { e.stopPropagation(); toggleMaximize("music-player"); }}
                              className="group w-3 h-3 rounded-full bg-green-500/80 hover:bg-green-500 transition-all duration-200 flex items-center justify-center"
                            >
                              <span className="text-green-900 text-xs opacity-0 group-hover:opacity-100 transition-opacity">+</span>
                            </button>
                          </div>
                          <span className="text-xs text-green-400 font-mono ml-1 pointer-events-none">Spotify</span>
                        </div>
                      </div>
                      
                      {/* Spotify Content */}
                      <div className="p-4 text-white pointer-events-none">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="w-12 h-12 rounded overflow-hidden">
                            <img 
                              src="/dogmaresistance.webp" 
                              alt="Dogma Resistance Album Cover"
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div>
                            <div className="text-sm font-semibold">Overkill</div>
                            <div className="text-xs text-gray-400">RIOT</div>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <div className="flex justify-between items-center">
                            <div className="flex gap-2">
                              <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">
                                <span className="text-xs">⏮</span>
                              </div>
                              <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center">
                                <span className="text-xs">▶</span>
                              </div>
                              <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">
                                <span className="text-xs">⏭</span>
                              </div>
                            </div>
                            <div className="text-xs text-gray-400">4:00 / 5:42</div>
                          </div>
                          <div className="w-full bg-gray-700 rounded-full h-1">
                            <div className="bg-green-500 h-1 rounded-full" style={{ width: '70%' }}></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Godot Window */}
                  {openApps.includes("godot") && (
                    <div 
                      className={`absolute window-blur rounded-lg select-none bg-gradient-to-br from-blue-900/20 to-slate-900/40 ${
                        focusedApp === "godot" ? "ring-2 ring-blue-500/50" : ""
                      } ${
                        minimizedApps.includes("godot") 
                          ? "scale-0 opacity-0 transform translate-x-full translate-y-full transition-all duration-300" 
                          : "scale-100 opacity-100"
                      } ${
                        dragging === "godot" ? "" : "transition-all duration-300"
                      } ${
                        maximizedApps.includes("godot") ? "inset-2" : "w-[480px] h-[380px]"
                      }`}
                      style={{
                        ...(maximizedApps.includes("godot") ? {} : {
                          left: `${windowPositions["godot"]?.x || 80}px`,
                          top: `${windowPositions["godot"]?.y || 80}px`,
                        }),
                        zIndex: getZIndex("godot"),
                        transformOrigin: "bottom right",
                        ...(dragging === "godot" && {
                          transition: 'none',
                          transform: 'none'
                        })
                      }}
                      onClick={() => {
                        setFocusedApp("godot");
                        bringToFront("godot");
                      }}
                    >
                      {/* Godot Header */}
                      <div 
                        className="flex items-center justify-between px-3 py-2 bg-blue-600/20 border-b border-blue-500/30 cursor-grab active:cursor-grabbing"
                        onMouseDown={(e) => handleTitleBarMouseDown(e, "godot")}
                      >
                        <div className="flex items-center gap-2">
                          <div className="flex gap-1 window-controls">
                            <button 
                              onClick={(e) => { e.stopPropagation(); closeApp("godot"); }}
                              className="group w-3 h-3 rounded-full bg-red-500/80 hover:bg-red-500 transition-all duration-200 flex items-center justify-center"
                            >
                              <span className="text-red-900 text-xs opacity-0 group-hover:opacity-100 transition-opacity">×</span>
                            </button>
                            <button 
                              onClick={(e) => { e.stopPropagation(); setMinimizedApps(prev => [...prev, "godot"]); }}
                              className="group w-3 h-3 rounded-full bg-yellow-500/80 hover:bg-yellow-500 transition-all duration-200 flex items-center justify-center"
                            >
                              <span className="text-yellow-900 text-xs opacity-0 group-hover:opacity-100 transition-opacity">−</span>
                            </button>
                            <button 
                              onClick={(e) => { e.stopPropagation(); toggleMaximize("godot"); }}
                              className="group w-3 h-3 rounded-full bg-green-500/80 hover:bg-green-500 transition-all duration-200 flex items-center justify-center"
                            >
                              <span className="text-green-900 text-xs opacity-0 group-hover:opacity-100 transition-opacity">+</span>
                            </button>
                          </div>
                          <span className="text-xs text-blue-400 font-mono ml-1 pointer-events-none">Godot Engine</span>
                        </div>
                      </div>
                      
                      {/* Godot Content */}
                      <div className="p-4 text-white pointer-events-none">
                        {/* Project Header */}
                        <div className="flex items-center justify-between mb-4 pb-3 border-b border-blue-500/20">
                          <div className="flex items-center gap-3">
                            <SiGodotengine size={20} className="text-blue-400" />
                            <div>
                              <div className="text-sm font-bold text-blue-300">Expland</div>
                              <div className="text-xs text-gray-400">Godot 4.5</div>
                            </div>
                          </div>
                          <div className="flex items-center gap-1">
                            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                            <span className="text-xs text-green-400">Running</span>
                          </div>
                        </div>

                        {/* Scene Tree */}
                        <div className="mb-4">
                          <div className="text-xs font-semibold text-blue-300 mb-2">Scene Dock</div>
                          <div className="space-y-1 text-xs bg-slate-800/30 rounded p-2">
                            <div className="flex items-center gap-2">
                              <img src="/projects/Node3D.svg" alt="Node3D" className="w-3 h-3" />
                              <span className="text-white font-medium">World</span>
                            </div>
                            <div className="flex items-center gap-2 ml-4">
                              <img src="/projects/CharacterBody3D.svg" alt="CharacterBody3D" className="w-3 h-3" />
                              <span className="text-gray-300">Player</span>
                            </div>
                            <div className="flex items-center gap-2 ml-4">
                              <img src="/projects/WorldEnvironment.svg" alt="WorldEnvironment" className="w-3 h-3" />
                              <span className="text-gray-300">Environment</span>
                            </div>
                          </div>
                        </div>

                        {/* Output/Console */}
                        <div className="mb-3">
                          <div className="text-xs font-semibold text-blue-300 mb-2">Output</div>
                          <div className="bg-black/40 rounded p-2 text-xs font-mono space-y-0.5">
                            <div className="text-green-400">--- Debugging process started ---</div>
                            <div className="text-gray-300">Godot Engine v4.5.stable</div>
                            <div className="text-gray-300">Vulkan 1.4.312 - Forward+ - Using Device #0: NVIDIA - NVIDIA GeForce GTX 1650</div>
                          </div>
                        </div>

                        {/* Status Bar */}
                        <div className="text-xs text-gray-400 flex justify-between items-center">
                          <span>theisland.tscn</span>
                          <span>FPS: 120 | Nodes: 142</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Obsidian Window */}
                  {openApps.includes("obsidian") && (
                    <div 
                      className={`absolute window-blur rounded-lg select-none ${
                        focusedApp === "obsidian" ? "ring-2 ring-blue-500/50" : ""
                      } ${
                        minimizedApps.includes("obsidian") 
                          ? "scale-0 opacity-0 transform translate-x-full translate-y-full transition-all duration-300" 
                          : "scale-100 opacity-100"
                      } ${
                        dragging === "obsidian" ? "" : "transition-all duration-300"
                      } ${
                        maximizedApps.includes("obsidian") ? "inset-2" : "w-80 h-96"
                      }`}
                      style={{
                        ...(maximizedApps.includes("obsidian") ? {} : {
                          left: `${windowPositions["obsidian"].x}px`,
                          top: `${windowPositions["obsidian"].y}px`,
                        }),
                        zIndex: getZIndex("obsidian"),
                        transformOrigin: "bottom right",
                        ...(dragging === "obsidian" && {
                          transition: 'none',
                          transform: 'none'
                        })
                      }}
                      onClick={() => {
                        setFocusedApp("obsidian");
                        bringToFront("obsidian");
                      }}
                    >
                      {/* Obsidian Header */}
                      <div 
                        className="flex items-center justify-between px-3 py-2 bg-background/50 border-b border-border/50 cursor-grab active:cursor-grabbing"
                        onMouseDown={(e) => handleTitleBarMouseDown(e, "obsidian")}
                      >
                        <div className="flex items-center gap-2">
                          <div className="flex gap-1 window-controls">
                            <button 
                              onClick={(e) => { e.stopPropagation(); closeApp("obsidian"); }}
                              className="group w-3 h-3 rounded-full bg-red-500/80 hover:bg-red-500 transition-all duration-200 flex items-center justify-center"
                            >
                              <span className="text-red-900 text-xs opacity-0 group-hover:opacity-100 transition-opacity">×</span>
                            </button>
                            <button 
                              onClick={(e) => { e.stopPropagation(); setMinimizedApps(prev => [...prev, "obsidian"]); }}
                              className="group w-3 h-3 rounded-full bg-yellow-500/80 hover:bg-yellow-500 transition-all duration-200 flex items-center justify-center"
                            >
                              <span className="text-yellow-900 text-xs opacity-0 group-hover:opacity-100 transition-opacity">–</span>
                            </button>
                            <button className="group w-3 h-3 rounded-full bg-green-500/80 hover:bg-green-500 transition-all duration-200 flex items-center justify-center"
                              onClick={(e) => { e.stopPropagation(); toggleMaximize("obsidian"); }}
                            >
                              <span className="text-green-900 text-xs opacity-0 group-hover:opacity-100 transition-opacity">+</span>
                            </button>
                          </div>
                          <SiObsidian size={14} className="text-purple-400" />
                          <span className="text-xs text-purple-400 font-mono ml-1 pointer-events-none">Obsidian</span>
                        </div>
                      </div>

                      {/* Notes Content */}
                      <div className="overflow-hidden" style={{ height: 'calc(100% - 40px)' }}>
                        {notesView === "menu" ? (
                          /* Notes Menu */
                          <div className="h-full flex flex-col p-4">
                            <div className="mb-3 flex-shrink-0">
                              <h3 className="text-sm font-medium text-gray-200 mb-1">Notes</h3>
                              <p className="text-xs text-gray-500">{notesData.length} notes</p>
                            </div>
                            
                            <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
                              <div className="space-y-2 pb-4">
                                {notesData.map((note) => (
                                  <div
                                    key={note.id}
                                    onClick={() => {
                                      setSelectedNote(note);
                                      setNotesView("note");
                                    }}
                                    className="bg-gray-800/50 rounded-lg p-3 border border-gray-700/50 hover:bg-gray-800/70 hover:border-gray-600/50 cursor-pointer transition-all duration-200 group"
                                  >
                                    <div className="flex items-start justify-between mb-2">
                                      <div className="flex-1">
                                        <div className="text-sm font-medium text-gray-200 group-hover:text-white transition-colors">
                                          {note.title}
                                        </div>
                                        <div className="flex items-center gap-1 mt-1">
                                          <Clock size={10} className="text-gray-500" />
                                          <span className="text-xs text-gray-500">{note.date}</span>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="text-xs text-gray-400 line-clamp-2 leading-relaxed">
                                      {note.preview}
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        ) : (
                          /* Individual Note View */
                          <div className="h-full flex flex-col">
                            {/* Note Header */}
                            <div className="p-4 border-b border-gray-700/50 bg-gray-800/30">
                              <div className="flex items-center gap-3 mb-2">
                                <button
                                  onClick={() => {
                                    setNotesView("menu");
                                    setSelectedNote(null);
                                  }}
                                  className="p-1 hover:bg-gray-700/50 rounded transition-colors"
                                >
                                  <ArrowLeft size={14} className="text-gray-400 hover:text-gray-200" />
                                </button>
                                <div className="flex-1">
                                  <div className="text-sm font-medium text-gray-200">{selectedNote?.title}</div>
                                  <div className="flex items-center gap-1 mt-1">
                                    <Clock size={10} className="text-gray-500" />
                                    <span className="text-xs text-gray-500">{selectedNote?.date}</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                            
                            {/* Note Content */}
                            <div className="flex-1 p-4 overflow-y-auto custom-scrollbar">
                              <div className="text-xs text-gray-300 leading-relaxed font-mono space-y-2">
                                {selectedNote?.content.map((line, index) => {
                                  if (line.startsWith('#### ')) {
                                    return (
                                      <h4 key={index} className="text-sm font-bold text-white mt-4 mb-2 border-b border-gray-600/50 pb-1">
                                        {line.replace('#### ', '')}
                                      </h4>
                                    );
                                  } else if (line === '') {
                                    return <div key={index} className="h-2"></div>;
                                  } else if (line.startsWith('• ')) {
                                    return (
                                      <div key={index} className="flex items-start gap-2 ml-2">
                                        <span className="text-blue-400 leading-none">•</span>
                                        <span>{line.replace('• ', '')}</span>
                                      </div>
                                    );
                                  } else {
                                    return <p key={index} className="mb-2">{line}</p>;
                                  }
                                })}
                                {selectedNote?.attribution && (
                                  <div className="text-xs text-gray-500 mt-4 italic border-t border-gray-700/50 pt-3">
                                    - {selectedNote.attribution}
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                      

                    </div>
                  )}
                </div>

                {/* Minimalistic Taskbar */}
                <div className={`dock-container absolute bottom-4 left-1/2 transform -translate-x-1/2 z-10 transition-all duration-300 ${
                  maximizedApps.length > 0 
                    ? "translate-y-full opacity-0 pointer-events-none" 
                    : "translate-y-0 opacity-100 pointer-events-auto"
                }`}>
                  <div 
                    className="flex items-center gap-2 px-3 py-2 bg-black/60 backdrop-blur-xl rounded-full border border-white/10"
                    onMouseLeave={() => {
                      if (maximizedApps.length > 0) {
                        setTimeout(() => {
                          const dockElement = document.querySelector('.dock-container');
                          if (dockElement && !dockElement.matches(':hover')) {
                            dockElement.classList.add('translate-y-full', 'opacity-0', 'pointer-events-none');
                            dockElement.classList.remove('translate-y-0', 'opacity-100', 'pointer-events-auto');
                          }
                        }, 500); // 500ms delay before hiding
                      }
                    }}
                  >
                    {/* App Windows */}
                    {apps.map((app) => {
                      const isOpen = openApps.includes(app.id);
                      const isMinimized = minimizedApps.includes(app.id);
                      const isFocused = focusedApp === app.id;
                      
                      return (
                        <div
                          key={app.id}
                          className={`group relative cursor-pointer transition-all duration-200 hover:scale-110 ${
                            isOpen ? "scale-105" : ""
                          }`}
                          onClick={() => toggleApp(app.id)}
                        >
                          <div
                            className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-200 ${
                              isOpen && !isMinimized
                                ? isFocused
                                  ? "bg-white/20 text-white"
                                  : "bg-white/10 text-white/80"
                                : isOpen && isMinimized
                                ? "bg-yellow-500/30 text-yellow-200"
                                : "bg-white/5 text-white/60 hover:bg-white/10 hover:text-white/80"
                            }`}
                          >
                            {app.icon === "code" && <Code size={14} />}
                            {app.icon === "terminal" && <Terminal size={14} />}
                            {app.icon === "folder" && <Folder size={14} />}
                            {app.icon === "obsidian" && <SiObsidian size={14} />}
                            {app.icon === "spotify" && <SiSpotify size={14} />}
                            {app.icon === "godot" && <SiGodotengine size={14} />}
                          </div>
                          
                          {/* Active indicator - subtle dot */}
                          {isOpen && !isMinimized && (
                            <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-white/60 rounded-full"></div>
                          )}
                          
                          {/* Tooltip */}
                          <div className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity z-60">
                            <div className="px-2 py-1 bg-black/80 text-white text-xs rounded whitespace-nowrap">
                              {app.name}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                    
                    {/* Minimalist Time */}
                    <div className="ml-3 text-xs font-mono text-white/60">
                      {new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false })}
                    </div>

                  </div>
                </div>

                {/* Hover zone to show dock when apps are maximized */}
                {maximizedApps.length > 0 && (
                  <div 
                    className="absolute bottom-0 left-0 w-full h-4 z-5"
                    onMouseEnter={() => {
                      const dockElement = document.querySelector('.dock-container');
                      if (dockElement) {
                        dockElement.classList.remove('translate-y-full', 'opacity-0', 'pointer-events-none');
                        dockElement.classList.add('translate-y-0', 'opacity-100', 'pointer-events-auto');
                      }
                    }}
                    onMouseLeave={() => {
                      setTimeout(() => {
                        const dockElement = document.querySelector('.dock-container');
                        if (dockElement && !dockElement.matches(':hover')) {
                          dockElement.classList.add('translate-y-full', 'opacity-0', 'pointer-events-none');
                          dockElement.classList.remove('translate-y-0', 'opacity-100', 'pointer-events-auto');
                        }
                      }, 1000); // 1 second delay before hiding
                    }}
                  />
                )}
                  </>
                )}
                
                {/* Power Button */}
                <button
                  onClick={() => setIsPoweredOn(!isPoweredOn)}
                  className={`absolute bottom-3 right-3 z-20 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
                    isPoweredOn 
                      ? "bg-green-500/20 text-green-400 hover:bg-green-500/30" 
                      : "bg-white/10 text-white/60 hover:bg-white/20"
                  }`}
                >
                  <Power size={14} />
                </button>
              </div>
            </div>

          </div>
        </div>
      </section>

      <BottomNav />
    </div>
  );
};

export default Home;