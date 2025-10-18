import { SiGithub, SiDiscord, SiYoutube, SiGodotengine, SiBlender, SiSpotify } from "react-icons/si";
import { MdEmail } from "react-icons/md";
import { Terminal, Code, Folder, Music, StickyNote } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";  
import BackgroundGrid from "@/components/BackgroundGrid";
import { toast } from "@/hooks/use-toast";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const Home = () => {
  // Desktop OS State Management
  const [openApps, setOpenApps] = useState(["code-editor", "terminal"]);
  const [focusedApp, setFocusedApp] = useState("code-editor");
  const [minimizedApps, setMinimizedApps] = useState([]);
  const [appZOrder, setAppZOrder] = useState(["terminal", "code-editor"]); // Back to front order
  const [windowPositions, setWindowPositions] = useState({
    "code-editor": { x: 16, y: 16 },
    "terminal": { x: 150, y: 48 },
    "file-explorer": { x: 48, y: 32 },
    "music-player": { x: 200, y: 100 },
    "godot": { x: 80, y: 120 },
    "notes": { x: 250, y: 150 }
  });
  const [dragging, setDragging] = useState(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString());

  // Update time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const apps = [
    { id: "code-editor", name: "Code Editor", icon: "code" },
    { id: "terminal", name: "Terminal", icon: "terminal" },
    { id: "file-explorer", name: "Files", icon: "folder" },
    { id: "music-player", name: "Spotify", icon: "spotify" },
    { id: "godot", name: "Godot", icon: "godot" },
    { id: "notes", name: "Notes", icon: "notes" },
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
    if (focusedApp === appId) {
      const remainingApps = openApps.filter(id => id !== appId && !minimizedApps.includes(id));
      setFocusedApp(remainingApps[remainingApps.length - 1] || null);
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

  const socialLinks = [
    {
      icon: SiGithub,
      label: "github",
      href: "https://github.com/sebashtioon",
    },
    {
      icon: SiDiscord,
      label: "discord",
      href: "https://discord.com/users/1110329250306859018",
    },
    {
      icon: SiYoutube,
      label: "youtube",
      href: "https://www.youtube.com/@sebashtioon_",
    },
    {
      icon: MdEmail,
      label: "email",
      onClick: () => {
        navigator.clipboard.writeText("sebastiansuciu607@gmail.com");
        toast({
          title: "email copied!",
          description: "sebastiansuciu607@gmail.com copied to clipboard.",
        });
      },
    },
  ];

  return (
    <div className="min-h-screen">
      <BackgroundGrid />

      {/* Hero Section - Asymmetric Layout */}
      <section className="pt-32 pb-12 px-4 relative">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            {/* Main content - offset left */}
            <div className="lg:col-span-7 lg:col-start-1 animate-fade-in">
              <div className="max-w-4xl">
                <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 lowercase leading-tight font-serif">
                  yo, i'm <span className="text-shimmer">sebashtioon</span>
                </h1>

                <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl lowercase leading-relaxed">
                  just a 15-year-old experimenting with games, code, and 3D stuff
                </p>
                
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
            <div className="lg:col-span-5 hidden lg:flex justify-center items-start mt-16 animate-fade-in">
              <div className="relative w-full max-w-2xl h-[500px] bg-gradient-to-br from-slate-900/50 to-slate-800/50 rounded-lg border border-border/30 overflow-hidden">
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
                    <span className="text-xs text-gray-300">System Online</span>
                  </div>
                </div>
                
                {/* Windows Container */}
                <div className="desktop-container relative w-full h-full p-2 pb-16">
                  {/* Code Editor Window */}
                  {openApps.includes("code-editor") && (
                    <div 
                      className={`absolute w-72 h-48 card-glow rounded-lg border border-border/50 bg-background/95 select-none ${
                        focusedApp === "code-editor" ? "ring-2 ring-blue-500/50" : ""
                      } ${
                        minimizedApps.includes("code-editor") 
                          ? "scale-0 opacity-0 transform translate-x-full translate-y-full transition-all duration-300" 
                          : "scale-100 opacity-100"
                      } ${
                        dragging === "code-editor" ? "" : "transition-all duration-300"
                      }`}
                      style={{
                        left: `${windowPositions["code-editor"].x}px`,
                        top: `${windowPositions["code-editor"].y}px`,
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
                            <div className="group w-3 h-3 rounded-full bg-green-500/80 hover:bg-green-500 transition-all duration-200 flex items-center justify-center">
                              <span className="text-green-900 text-xs opacity-0 group-hover:opacity-100 transition-opacity">+</span>
                            </div>
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
                      className={`absolute w-80 h-72 card-glow rounded-lg border border-border/50 bg-slate-900/95 select-none ${
                        focusedApp === "terminal" ? "ring-2 ring-green-500/50" : ""
                      } ${
                        minimizedApps.includes("terminal") 
                          ? "scale-0 opacity-0 transform translate-x-full translate-y-full transition-all duration-300" 
                          : "scale-100 opacity-100"
                      } ${
                        dragging === "terminal" ? "" : "transition-all duration-300"
                      }`}
                      style={{
                        left: `${windowPositions["terminal"].x}px`,
                        top: `${windowPositions["terminal"].y}px`,
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
                            <div className="group w-3 h-3 rounded-full bg-green-500/80 hover:bg-green-500 transition-all duration-200 flex items-center justify-center">
                              <span className="text-green-900 text-xs opacity-0 group-hover:opacity-100 transition-opacity">+</span>
                            </div>
                          </div>
                          <span className="text-xs text-green-400 font-mono ml-1 pointer-events-none">bash</span>
                        </div>
                      </div>
                      
                      {/* Terminal Content */}
                      <div className="p-3 font-mono text-xs leading-relaxed text-green-400 pointer-events-none">
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
                      className={`absolute w-60 h-44 card-glow rounded-lg border border-border/50 bg-background/95 select-none ${
                        focusedApp === "file-explorer" ? "ring-2 ring-yellow-500/50" : ""
                      } ${
                        minimizedApps.includes("file-explorer") 
                          ? "scale-0 opacity-0 transform translate-x-full translate-y-full transition-all duration-300" 
                          : "scale-100 opacity-100"
                      } ${
                        dragging === "file-explorer" ? "" : "transition-all duration-300"
                      }`}
                      style={{
                        left: `${windowPositions["file-explorer"].x}px`,
                        top: `${windowPositions["file-explorer"].y}px`,
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
                            <div className="group w-3 h-3 rounded-full bg-green-500/80 hover:bg-green-500 transition-all duration-200 flex items-center justify-center">
                              <span className="text-green-900 text-xs opacity-0 group-hover:opacity-100 transition-opacity">+</span>
                            </div>
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
                      className={`absolute w-72 h-48 card-glow rounded-lg border border-border/50 bg-gradient-to-br from-green-900/20 to-black/95 select-none ${
                        focusedApp === "music-player" ? "ring-2 ring-green-500/50" : ""
                      } ${
                        minimizedApps.includes("music-player") 
                          ? "scale-0 opacity-0 transform translate-x-full translate-y-full transition-all duration-300" 
                          : "scale-100 opacity-100"
                      } ${
                        dragging === "music-player" ? "" : "transition-all duration-300"
                      }`}
                      style={{
                        left: `${windowPositions["music-player"]?.x || 100}px`,
                        top: `${windowPositions["music-player"]?.y || 100}px`,
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
                            <div className="group w-3 h-3 rounded-full bg-green-500/80 hover:bg-green-500 transition-all duration-200 flex items-center justify-center">
                              <span className="text-green-900 text-xs opacity-0 group-hover:opacity-100 transition-opacity">+</span>
                            </div>
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
                      className={`absolute w-[480px] h-[380px] card-glow rounded-lg border border-border/50 bg-gradient-to-br from-blue-900/20 to-slate-900/95 select-none ${
                        focusedApp === "godot" ? "ring-2 ring-blue-500/50" : ""
                      } ${
                        minimizedApps.includes("godot") 
                          ? "scale-0 opacity-0 transform translate-x-full translate-y-full transition-all duration-300" 
                          : "scale-100 opacity-100"
                      } ${
                        dragging === "godot" ? "" : "transition-all duration-300"
                      }`}
                      style={{
                        left: `${windowPositions["godot"]?.x || 80}px`,
                        top: `${windowPositions["godot"]?.y || 80}px`,
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
                            <div className="group w-3 h-3 rounded-full bg-green-500/80 hover:bg-green-500 transition-all duration-200 flex items-center justify-center">
                              <span className="text-green-900 text-xs opacity-0 group-hover:opacity-100 transition-opacity">+</span>
                            </div>
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

                  {/* Notes Window */}
                  {openApps.includes("notes") && (
                    <div 
                      className={`absolute w-80 h-64 card-glow rounded-lg border border-border/50 bg-background/95 select-none ${
                        focusedApp === "notes" ? "ring-2 ring-blue-500/50" : ""
                      } ${
                        minimizedApps.includes("notes") 
                          ? "scale-0 opacity-0 transform translate-x-full translate-y-full transition-all duration-300" 
                          : "scale-100 opacity-100"
                      } ${
                        dragging === "notes" ? "" : "transition-all duration-300"
                      }`}
                      style={{
                        left: `${windowPositions["notes"].x}px`,
                        top: `${windowPositions["notes"].y}px`,
                        zIndex: getZIndex("notes"),
                        transformOrigin: "bottom right",
                        ...(dragging === "notes" && {
                          transition: 'none',
                          transform: 'none'
                        })
                      }}
                      onClick={() => {
                        setFocusedApp("notes");
                        bringToFront("notes");
                      }}
                    >
                      {/* Notes Header */}
                      <div 
                        className="flex items-center justify-between px-3 py-2 bg-background/50 border-b border-border/50 cursor-grab active:cursor-grabbing"
                        onMouseDown={(e) => handleTitleBarMouseDown(e, "notes")}
                      >
                        <div className="flex items-center gap-2">
                          <div className="flex gap-1 window-controls">
                            <button 
                              onClick={(e) => { e.stopPropagation(); closeApp("notes"); }}
                              className="group w-3 h-3 rounded-full bg-red-500/80 hover:bg-red-500 transition-all duration-200 flex items-center justify-center"
                            >
                              <span className="text-red-900 text-xs opacity-0 group-hover:opacity-100 transition-opacity">×</span>
                            </button>
                            <button 
                              onClick={(e) => { e.stopPropagation(); setMinimizedApps(prev => [...prev, "notes"]); }}
                              className="group w-3 h-3 rounded-full bg-yellow-500/80 hover:bg-yellow-500 transition-all duration-200 flex items-center justify-center"
                            >
                              <span className="text-yellow-900 text-xs opacity-0 group-hover:opacity-100 transition-opacity">–</span>
                            </button>
                            <button className="group w-3 h-3 rounded-full bg-green-500/80 hover:bg-green-500 transition-all duration-200 flex items-center justify-center">
                              <span className="text-green-900 text-xs opacity-0 group-hover:opacity-100 transition-opacity">+</span>
                            </button>
                          </div>
                          <StickyNote size={14} className="text-blue-400" />
                          <span className="text-xs text-blue-400 font-mono ml-1 pointer-events-none">Notes</span>
                        </div>
                      </div>

                      {/* Notes Content */}
                      <div className="p-4 overflow-hidden" style={{ height: 'calc(100% - 40px)' }}>
                        <div className="h-full overflow-y-auto pr-2 custom-scrollbar">
                          {/* Note */}
                          <div className="bg-gray-800/50 rounded-lg p-3 border border-gray-700/50">
                            <div className="text-xs text-gray-300 leading-relaxed font-mono">
                              <p className="mb-2">In the shadowed prelude to an era of defiance...</p>
                              <p className="mb-2">before the rise of heroes, and the clash of titans.</p>
                              <p className="mb-2">There was a genesis... not of life...</p>
                              <p className="mb-2">but of an entity designed to redefine human existence.</p>
                              <p className="mb-2">This is the story... of The Machine.</p>
                            </div>
                          </div>
                        </div>
                      </div>
                      

                    </div>
                  )}
                </div>

                {/* MacOS-style Dock */}
                <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 z-50">
                  <div className="flex items-end gap-1 px-4 py-2 bg-slate-800/90 backdrop-blur-sm rounded-2xl border border-border/50">
                    {apps.map((app) => {
                      const isOpen = openApps.includes(app.id);
                      const isMinimized = minimizedApps.includes(app.id);
                      const isFocused = focusedApp === app.id;
                      
                      return (
                        <div
                          key={app.id}
                          className={`group relative cursor-pointer transition-all duration-200 hover:scale-125 ${
                            isOpen ? "transform scale-110" : ""
                          }`}
                          onClick={() => toggleApp(app.id)}
                        >
                          <div
                            className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-200 ${
                              isOpen && !isMinimized
                                ? isFocused
                                  ? "bg-blue-500/30 border border-blue-500/50 shadow-lg shadow-blue-500/25"
                                  : "bg-accent/20 border border-accent/30"
                                : isOpen && isMinimized
                                ? "bg-yellow-500/20 border border-yellow-500/30"
                                : "bg-gray-500/10 border border-gray-500/20 hover:bg-gray-500/20"
                            }`}
                          >
                            {app.icon === "code" && <Code size={16} />}
                            {app.icon === "terminal" && <Terminal size={16} />}
                            {app.icon === "folder" && <Folder size={16} />}
                            {app.icon === "spotify" && <SiSpotify size={16} />}
                            {app.icon === "godot" && <SiGodotengine size={16} />}
                            {app.icon === "notes" && <StickyNote size={16} />}
                          </div>
                          
                          {/* Active indicator */}
                          {isOpen && !isMinimized && (
                            <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-white rounded-full"></div>
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
                    
                    {/* Date and Time */}
                    <div className="ml-2 flex items-center gap-2 text-xs font-mono">
                      <div className="flex flex-col items-end text-right leading-tight">
                        <div className="text-white">{new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</div>
                        <div className="text-muted-foreground">{new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false })}</div>
                      </div>
                    </div>

                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Skills Showcase - Diagonal Layout */}
      <section className="py-16 px-4 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-l from-purple-500/5 to-transparent rounded-full blur-3xl"></div>
        
        <div className="max-w-7xl mx-auto">
          <div className="mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 lowercase">
              what i'm <span className="text-shimmer">building</span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-purple-400 to-yellow-400 rounded-full"></div>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left side - staggered cards */}
            <div className="space-y-8">
              <div className="card-glow p-8 ml-0 lg:ml-8 animate-fade-in lowercase">
                <div className="flex items-center gap-3 mb-4">
                  <SiGodotengine className="text-blue-400" size={24} />
                  <h3 className="text-xl font-semibold">game development</h3>
                </div>
                <p className="text-muted-foreground">
                  making 2d & 3d games, designing mechanics, and building cool stuff in godot
                </p>
              </div>

              <div className="card-glow ml-4 lg:ml-12 animate-fade-in lowercase overflow-visible" style={{ padding: '2rem 4rem 2rem 3rem' }}>
                <div className="flex items-center gap-4 mb-4 overflow-visible">
                  <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center">
                    <SiBlender className="text-orange-400" size={28} />
                  </div>
                  <h3 className="text-xl font-semibold">3d art & animation</h3>
                </div>
                <p className="text-muted-foreground">
                  modeling & animating low-poly 3d assets, worlds, and characters in blender
                </p>
              </div>

              <div className="card-glow p-8 ml-0 lg:ml-4 animate-fade-in lowercase">
                <div className="flex items-center gap-3 mb-4">
                  <Terminal className="text-green-400" size={24} />
                  <h3 className="text-xl font-semibold">programming</h3>
                </div>
                <p className="text-muted-foreground">
                  writing scripts & building systems in gdscript, c++, and python for games & tools
                </p>
              </div>
            </div>

            {/* Right side - floating project preview */}
            <div className="relative hidden lg:flex justify-center">
              <div className="relative card-glow p-6 transform rotate-2 hover:rotate-0 transition-transform w-80 ml-8">
                <div className="text-sm text-purple-300 mb-2">// currently working on</div>
                <div className="w-full h-32 mb-4 rounded-lg overflow-hidden">
                  <img 
                    src="/projects/expland.webp" 
                    alt="Expland game preview"
                    className="w-full h-full object-cover"
                  />
                </div>
                <h4 className="text-2xl font-bold mb-2">Expland</h4>
                <p className="text-sm text-muted-foreground mb-4">
                  Face adversity, hardship, enjoy adventure as well, and discover a second chance to fix past mistakes and become a better person in a mysterious world with nightmares and happiness just around the corner.
                </p>
                <div className="mt-4">
                  <a href="https://noeco.xyz/games/expland" target="_blank" rel="noopener noreferrer">
                    <Button size="sm" variant="outline" className="flex items-center justify-center gap-2 lowercase">
                      <svg
                        width="16"
                        height="16"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        viewBox="0 0 24 24"
                      >
                        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                        <polyline points="15,3 21,3 21,9" />
                        <line x1="10" y1="14" x2="21" y2="3" />
                      </svg>
                      view
                    </Button>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <div className="card-glow p-12 animate-fade-in lowercase">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              wanna <span className="text-shimmer">do something?</span>
            </h2>
            <p className="text-xl text-muted-foreground mb-8 lowercase">
              open to collabs and pretty much anything.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-9">
              <Link to="/contact">
                <Button className="btn-hero text-lg px-8 py-6 lowercase">
                  hmu
                </Button>
              </Link>
            </div>

            <div className="flex gap-4 justify-center">
              {socialLinks.map((social, index) => {
                const Icon = social.icon;
                const isFirst = index === 0;
                const isLast = index === socialLinks.length - 1;

                const buttonClasses = [
                  "btn-accent",
                  "p-6",
                  "transition-all",
                  "duration-200",
                  "hover:scale-105",
                  "hover:brightness-110",
                  "flex",
                  "items-center",
                  "justify-center",
                  isFirst ? "rounded-l-full" : "",
                  isLast ? "rounded-r-full" : "",
                  !isFirst && !isLast ? "rounded-none" : "",
                ].join(" ");

                return social.onClick ? (
                  <button
                    key={social.label}
                    onClick={social.onClick}
                    className={buttonClasses}
                  >
                    <Icon size={24} />
                  </button>
                ) : (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={buttonClasses}
                  >
                    <Icon size={24} />
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Home;