import { useState } from "react";
import { SiGithub, SiDiscord, SiYoutube } from "react-icons/si";
import { MdEmail } from "react-icons/md";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";  
import BackgroundGrid from "@/components/BackgroundGrid";
import SpotifyWidget from "@/components/SpotifyWidget";
import { toast } from "@/hooks/use-toast";

const Home = () => {

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
      
      {/* Floating Widgets */}
      <div className="fixed top-24 right-8 z-10 hidden lg:block space-y-4">
        {/* Status Widget */}
        <div className="card-glow p-4 max-w-xs">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-sm font-tech">sebashtioon.status</span>
          </div>
          <div className="text-xs text-muted-foreground font-mono">
            <div>// currently: building expland</div>
            <div>// mood: caffeinated ☕</div>
            <div>// status: online</div>
          </div>
        </div>
        
        {/* Spotify Widget */}
        <SpotifyWidget />
      </div>
      
      {/* Hero Section - Asymmetric Design */}
      <section className="pt-32 pb-12 px-4 relative">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-12 gap-8 items-center">
            {/* Main content - offset to left */}
            <div className="lg:col-span-8 lg:col-start-1 animate-fade-in">
              <div className="max-w-4xl">
                <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 lowercase leading-tight">
                  yo, i'm
                  <br />
                  <span className="text-shimmer font-tech">sebashtioon</span>
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

            {/* 🔥 REAL 3D CUBES WITH GRAVITY & PHYSICS RAGDOLL SYSTEM 🔥 */}
            <div className="lg:col-span-4 lg:col-start-9 hidden lg:block">
              <div className="relative h-[700px] overflow-hidden perspective-1000 bg-black/50" 
                   onMouseMove={(e) => {
                     const rect = e.currentTarget.getBoundingClientRect();
                     const mouseX = e.clientX - rect.left;
                     const mouseY = e.clientY - rect.top;
                     
                     // Apply physics force to cubes based on mouse position
                     const cubes = e.currentTarget.querySelectorAll('.physics-cube');
                     cubes.forEach((cube: any) => {
                       const cubeRect = cube.getBoundingClientRect();
                       const cubeCenterX = cubeRect.left + cubeRect.width / 2 - rect.left;
                       const cubeCenterY = cubeRect.top + cubeRect.height / 2 - rect.top;
                       
                       const distance = Math.sqrt(
                         Math.pow(mouseX - cubeCenterX, 2) + Math.pow(mouseY - cubeCenterY, 2)
                       );
                       
                       if (distance < 100) {
                         const force = (100 - distance) / 100;
                         const angleX = (mouseX - cubeCenterX) / distance;
                         const angleY = (mouseY - cubeCenterY) / distance;
                         
                         cube.style.transform = `
                           translate(${angleX * force * 30}px, ${angleY * force * 30}px)
                           rotateX(${angleY * force * 45}deg)
                           rotateY(${angleX * force * 45}deg)
                           rotateZ(${(angleX + angleY) * force * 30}deg)
                           scale(${1 + force * 0.3})
                         `;
                         cube.style.filter = `drop-shadow(0 0 ${20 + force * 30}px rgba(139,92,246,${0.4 + force * 0.4}))`;
                       }
                     });
                   }}
                   onMouseLeave={(e) => {
                     // Reset cubes to natural physics
                     const cubes = e.currentTarget.querySelectorAll('.physics-cube');
                     cubes.forEach((cube: any) => {
                       cube.style.transform = '';
                       cube.style.filter = '';
                     });
                   }}>
                
                {/* 🌈 TRON GRID FLOOR - ACTUAL GROUND LEVEL! 🌈 */}
                <div className="absolute bottom-0 left-0 w-full h-80 transform-gpu animate-tron-floor-glow" 
                     style={{
                       background: `
                         radial-gradient(ellipse 90% 70% at center bottom, rgba(139,92,246,0.4) 0%, rgba(139,92,246,0.2) 30%, rgba(139,92,246,0.1) 50%, transparent 80%),
                         radial-gradient(ellipse 70% 50% at center bottom, rgba(234,179,8,0.3) 0%, rgba(234,179,8,0.1) 40%, transparent 70%),
                         repeating-linear-gradient(90deg, 
                           transparent 0px, transparent 22px, 
                           rgba(139,92,246,0.5) 22px, rgba(139,92,246,0.5) 24px,
                           transparent 24px, transparent 46px
                         ),
                         repeating-linear-gradient(0deg, 
                           transparent 0px, transparent 22px, 
                           rgba(234,179,8,0.4) 22px, rgba(234,179,8,0.4) 24px,
                           transparent 24px, transparent 46px
                         ),
                         linear-gradient(0deg, rgba(139,92,246,0.2) 0%, rgba(139,92,246,0.05) 50%, transparent 100%)
                       `,
                       transform: 'perspective(1200px) rotateX(87deg)',
                       transformOrigin: 'bottom center',
                       filter: 'blur(0.2px)',
                       boxShadow: `
                         inset 0 0 120px rgba(139,92,246,0.3),
                         inset 0 0 240px rgba(234,179,8,0.15),
                         0 -30px 60px rgba(139,92,246,0.4),
                         0 -10px 20px rgba(234,179,8,0.2)
                       `
                     }}>
                  
                  {/* Ground Contact Points - Where cubes actually touch */}
                  <div className="absolute top-16 left-0 w-full h-4">
                    {/* GD Cube contact point */}
                    <div className="absolute w-20 h-20 bg-purple-500/20 border border-purple-400/40 rounded-sm animate-pulse"
                         style={{
                           left: '80px',
                           top: '0px',
                           boxShadow: '0 0 30px rgba(139,92,246,0.4), inset 0 0 20px rgba(139,92,246,0.2)'
                         }}>
                    </div>
                    
                    {/* C++ Cube contact point */}
                    <div className="absolute w-16 h-16 bg-yellow-500/20 border border-yellow-400/40 rounded-sm animate-pulse"
                         style={{
                           right: '100px',
                           top: '2px',
                           animationDelay: '1s',
                           boxShadow: '0 0 25px rgba(234,179,8,0.4), inset 0 0 15px rgba(234,179,8,0.2)'
                         }}>
                    </div>
                    
                    {/* RIOT Cube contact point */}
                    <div className="absolute w-24 h-24 bg-pink-500/20 border border-pink-400/40 rounded-sm animate-pulse"
                         style={{
                           left: '200px',
                           top: '-2px',
                           animationDelay: '2s',
                           boxShadow: '0 0 35px rgba(236,72,153,0.4), inset 0 0 25px rgba(236,72,153,0.2)'
                         }}>
                    </div>
                  </div>
                  
                  {/* Grid intersection points - Enhanced */}
                  <div className="absolute inset-0">
                    {[...Array(12)].map((_, i) => (
                      <div key={i} 
                           className="absolute w-1 h-1 bg-cyan-400/80 rounded-full animate-ping"
                           style={{
                             left: `${15 + i * 7}%`,
                             top: `${70 + Math.sin(i * 0.5) * 15}%`,
                             animationDelay: `${i * 0.15}s`,
                             animationDuration: '3s'
                           }}>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 🔥 GRAVITY PHYSICS CUBES THAT FALL AND BOUNCE ON TRON FLOOR! 🔥 */}
                <div className="absolute inset-0" id="physics-container">
                  
                  {/* GODOT CUBE - ACTUALLY SITS ON GROUND */}
                  <div className="physics-cube absolute cursor-pointer"
                       id="gd-cube"
                       style={{
                         left: '80px',
                         bottom: '64px', /* Floor height + half cube = ground contact */
                         transformStyle: 'preserve-3d',
                         animation: 'ground-bounce 4s ease-in-out infinite, cube-spin-3d 20s linear infinite'
                       }}>
                    <div className="relative w-20 h-20" style={{ transformStyle: 'preserve-3d' }}>
                      {/* Front Face */}
                      <div className="absolute w-20 h-20 bg-gradient-to-br from-purple-500/50 to-purple-700/70 border-2 border-purple-300 flex items-center justify-center font-tech text-white font-bold text-sm shadow-[0_0_20px_rgba(139,92,246,0.6)]"
                           style={{ transform: 'translateZ(10px)' }}>
                        GD
                      </div>
                      {/* Back Face */}
                      <div className="absolute w-20 h-20 bg-gradient-to-br from-purple-600/40 to-purple-800/60 border-2 border-purple-400 flex items-center justify-center font-tech text-purple-200 text-xs"
                           style={{ transform: 'translateZ(-10px) rotateY(180deg)' }}>
                        4.3
                      </div>
                      {/* Right Face */}
                      <div className="absolute w-20 h-20 bg-gradient-to-br from-purple-500/45 to-purple-700/65 border-2 border-purple-300 flex items-center justify-center text-white text-lg"
                           style={{ transform: 'rotateY(90deg) translateZ(10px)' }}>
                        ⚡
                      </div>
                      {/* Left Face */}
                      <div className="absolute w-20 h-20 bg-gradient-to-br from-purple-600/35 to-purple-800/55 border-2 border-purple-400 flex items-center justify-center font-tech text-purple-200 text-xs"
                           style={{ transform: 'rotateY(-90deg) translateZ(10px)' }}>
                        EXP
                      </div>
                      {/* Top Face */}
                      <div className="absolute w-20 h-20 bg-gradient-to-br from-purple-400/40 to-purple-600/60 border-2 border-purple-200 flex items-center justify-center text-white text-sm"
                           style={{ transform: 'rotateX(90deg) translateZ(10px)' }}>
                        🎮
                      </div>
                      {/* Bottom Face - TOUCHES THE FLOOR */}
                      <div className="absolute w-20 h-20 bg-gradient-to-br from-purple-700/60 to-purple-900/80 border-2 border-purple-500 flex items-center justify-center text-purple-300 text-xs shadow-[0_8px_16px_rgba(139,92,246,0.4)]"
                           style={{ transform: 'rotateX(-90deg) translateZ(10px)' }}>
                        ENGINE
                      </div>
                    </div>
                  </div>

                  {/* C++ CUBE - SITS ON GROUND */}
                  <div className="physics-cube absolute cursor-pointer"
                       id="cpp-cube"
                       style={{
                         right: '100px',
                         bottom: '64px', /* Floor contact */
                         transformStyle: 'preserve-3d',
                         animation: 'ground-bounce 3.5s ease-in-out infinite reverse, cube-spin-3d 15s linear infinite reverse',
                         animationDelay: '1s'
                       }}>
                    <div className="relative w-16 h-16" style={{ transformStyle: 'preserve-3d' }}>
                      {/* Front */}
                      <div className="absolute w-16 h-16 bg-gradient-to-br from-yellow-500/50 to-yellow-700/70 border-2 border-yellow-300 flex items-center justify-center font-tech text-black font-bold text-sm shadow-[0_0_20px_rgba(234,179,8,0.6)]"
                           style={{ transform: 'translateZ(8px)' }}>
                        C++
                      </div>
                      {/* Back */}
                      <div className="absolute w-16 h-16 bg-gradient-to-br from-yellow-600/40 to-yellow-800/60 border-2 border-yellow-400 flex items-center justify-center text-yellow-200 text-xs"
                           style={{ transform: 'translateZ(-8px) rotateY(180deg)' }}>
                        STD
                      </div>
                      {/* Right */}
                      <div className="absolute w-16 h-16 bg-gradient-to-br from-yellow-500/45 to-yellow-700/65 border-2 border-yellow-300 flex items-center justify-center text-black text-lg"
                           style={{ transform: 'rotateY(90deg) translateZ(8px)' }}>
                        ++
                      </div>
                      {/* Left */}
                      <div className="absolute w-16 h-16 bg-gradient-to-br from-yellow-600/35 to-yellow-800/55 border-2 border-yellow-400 flex items-center justify-center text-yellow-200 text-xs"
                           style={{ transform: 'rotateY(-90deg) translateZ(8px)' }}>
                        FAST
                      </div>
                      {/* Top */}
                      <div className="absolute w-16 h-16 bg-gradient-to-br from-yellow-400/40 to-yellow-600/60 border-2 border-yellow-200 flex items-center justify-center text-black text-sm"
                           style={{ transform: 'rotateX(90deg) translateZ(8px)' }}>
                        💻
                      </div>
                      {/* Bottom - FLOOR CONTACT */}
                      <div className="absolute w-16 h-16 bg-gradient-to-br from-yellow-700/60 to-yellow-900/80 border-2 border-yellow-500 flex items-center justify-center text-yellow-300 text-xs shadow-[0_6px_12px_rgba(234,179,8,0.4)]"
                           style={{ transform: 'rotateX(-90deg) translateZ(8px)' }}>
                        CORE
                      </div>
                    </div>
                  </div>

                  {/* RIOT CUBE - BIGGEST, SITS ON GROUND */}
                  <div className="physics-cube absolute cursor-pointer"
                       id="riot-cube"
                       style={{
                         left: '200px',
                         bottom: '64px', /* Floor contact */
                         transformStyle: 'preserve-3d',
                         animation: 'ground-bounce 5s ease-in-out infinite, cube-spin-3d 25s linear infinite',
                         animationDelay: '2s'
                       }}>
                    <div className="relative w-24 h-24" style={{ transformStyle: 'preserve-3d' }}>
                      {/* Front - Main RIOT face */}
                      <div className="absolute w-24 h-24 bg-gradient-to-br from-pink-500/50 to-pink-700/70 border-2 border-pink-300 flex items-center justify-center font-tech text-white font-bold text-lg shadow-[0_0_25px_rgba(236,72,153,0.7)]"
                           style={{ transform: 'translateZ(12px)' }}>
                        RIOT
                      </div>
                      {/* Back */}
                      <div className="absolute w-24 h-24 bg-gradient-to-br from-pink-600/40 to-pink-800/60 border-2 border-pink-400 flex items-center justify-center text-pink-200 text-sm"
                           style={{ transform: 'translateZ(-12px) rotateY(180deg)' }}>
                        BASS
                      </div>
                      {/* Right */}
                      <div className="absolute w-24 h-24 bg-gradient-to-br from-pink-500/45 to-pink-700/65 border-2 border-pink-300 flex items-center justify-center text-white text-2xl"
                           style={{ transform: 'rotateY(90deg) translateZ(12px)' }}>
                        🔊
                      </div>
                      {/* Left */}
                      <div className="absolute w-24 h-24 bg-gradient-to-br from-pink-600/35 to-pink-800/55 border-2 border-pink-400 flex items-center justify-center text-pink-200 text-sm"
                           style={{ transform: 'rotateY(-90deg) translateZ(12px)' }}>
                        DROP
                      </div>
                      {/* Top */}
                      <div className="absolute w-24 h-24 bg-gradient-to-br from-pink-400/40 to-pink-600/60 border-2 border-pink-200 flex items-center justify-center text-white text-xl"
                           style={{ transform: 'rotateX(90deg) translateZ(12px)' }}>
                        ♪
                      </div>
                      {/* Bottom - ACTUALLY RESTS ON TRON FLOOR */}
                      <div className="absolute w-24 h-24 bg-gradient-to-br from-pink-700/60 to-pink-900/80 border-2 border-pink-500 flex items-center justify-center text-pink-300 text-sm shadow-[0_10px_20px_rgba(236,72,153,0.5)]"
                           style={{ transform: 'rotateX(-90deg) translateZ(12px)' }}>
                        KILL
                      </div>
                    </div>
                  </div>
                </div>

                {/* 🎵 CUSTOMIZABLE AUDIO VISUALIZER WITH TUNING FLAGS 🎵 */}
                <div className="absolute bottom-12 left-8 cursor-pointer group z-10"
                     ref={(ref) => {
                       if (ref && !ref.hasAttribute('data-audio-initialized')) {
                         ref.setAttribute('data-audio-initialized', 'true');
                         
                         // � EXTREME KICK-REACTIVE VISUALIZER! �
                         const VISUALIZER_CONFIG = {
                           // Audio Settings - Maximum responsiveness
                           VOLUME: 0.4,                    // Safe volume level
                           SMOOTHING: 0.4,                 // More smoothing for natural movement
                           FFT_SIZE: 512,                  // Max resolution for precise frequency detection
                           
                           // Dynamic Range Settings - Balanced for kick emphasis
                           BASELINE_LEARNING_RATE: 0.97,   // Faster learning to adapt to song sections
                           COMPRESSION_THRESHOLD: 3.0,     // Much higher threshold - less compression!
                           COMPRESSION_RATIO: 30,          // MUCH LOWER! Was 800 - insanely high!
                           
                           // Kick Detection Settings - Responsive but not overwhelming
                           KICK_SENSITIVITY: 2.0,          // Higher threshold - less triggers
                           KICK_HISTORY_LENGTH: 4,         // Short history for responsive kicks
                           KICK_BOOST_MULTIPLIER: 50,      // Much lower! Was 600 - way too high!
                           
                           // Visual Settings - Maximum dynamic range
                           MIN_BAR_HEIGHT: 5,              // Very low minimum for huge contrast
                           MAX_BASS_HEIGHT: 120,           // MASSIVE height for kicks!
                           MAX_TREBLE_HEIGHT: 90,          // Tall treble too
                           BASS_BAR_COUNT: 6,              // Even more bass bars for kick detection
                           
                           // Animation Settings - Fast response, smooth decay
                           HEIGHT_UPDATE_SPEED: 0.03,      // Fast height changes for kick response
                           COLOR_UPDATE_SPEED: 0.06,       // Quick color response
                           GLOW_UPDATE_SPEED: 0.04,        // Fast glow response
                           
                           // Screen Shake Settings - Maximum kick response
                           SHAKE_THRESHOLD_HIGH: 1.2,      // Very low threshold for shake
                           SHAKE_THRESHOLD_LOW: 0.8,       // Super low for any kick detection
                           SHAKE_SPEED_INTENSE: 0.02,      // Very fast intense shake
                           SHAKE_SPEED_LIGHT: 0.06,        // Fast light shake
                           
                           // Color Settings - MAXIMUM visual impact
                           HUE_RANGE: 240,                 // Almost full rainbow
                           HUE_OFFSET_PER_BAR: 25,         // Big color shifts between bars
                           BRIGHTNESS_MULTIPLIER: 3.5,     // MASSIVE brightness boost!
                           SATURATION_MULTIPLIER: 2.5,     // Maximum saturation!
                           
                           // Glow Settings - EXPLOSIVE glow on kicks
                           MIN_GLOW: 2,                    // Tiny minimum for contrast
                           MAX_GLOW_INNER: 50,             // HUGE inner glow on kicks
                           MAX_GLOW_OUTER: 100,            // MASSIVE outer glow on kicks
                           SCALE_MULTIPLIER: 0.6,          // Moderate width scaling
                         };
                         
                         let audioContext: AudioContext | null = null;
                         let analyser: AnalyserNode | null = null;
                         let audioElement: HTMLAudioElement | null = null;
                         let animationId: number | null = null;
                         let isPlaying = false;
                         let averageLevels: number[] = [];
                         let kickDetectionHistory: number[] = [];

                         // IMMEDIATE pre-load setup
                         const preLoadAudio = async () => {
                           if (audioElement) return audioElement;
                           
                           console.log('🎵 Pre-loading with config:', VISUALIZER_CONFIG);
                           audioElement = new Audio('/overkill.mp3');
                           audioElement.crossOrigin = 'anonymous';
                           audioElement.volume = VISUALIZER_CONFIG.VOLUME;
                           audioElement.loop = true;
                           audioElement.preload = 'auto';
                           
                           // Force load the audio
                           return new Promise<HTMLAudioElement>((resolve) => {
                             audioElement!.addEventListener('canplaythrough', () => {
                               console.log('🎵 Audio loaded and ready!');
                               resolve(audioElement!);
                             });
                             audioElement!.addEventListener('error', () => {
                               console.log('🎵 Audio file not found - visual mode only');
                               resolve(audioElement!);
                             });
                             audioElement!.load();
                           });
                         };

                         // Setup Web Audio API with configurable settings
                         const initWebAudio = async () => {
                           if (audioContext) return;
                           
                           audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
                           analyser = audioContext.createAnalyser();
                           analyser.fftSize = VISUALIZER_CONFIG.FFT_SIZE;
                           analyser.smoothingTimeConstant = VISUALIZER_CONFIG.SMOOTHING;
                           
                           if (audioElement) {
                             const source = audioContext.createMediaElementSource(audioElement);
                             source.connect(analyser);
                             analyser.connect(audioContext.destination);
                           }
                           
                           // Initialize baseline levels
                           averageLevels = new Array(analyser.frequencyBinCount).fill(0);
                         };

                         // Configurable dynamic range compression and visualization
                         const visualize = () => {
                           if (!analyser || !isPlaying) return;
                           
                           const bufferLength = analyser.frequencyBinCount;
                           const dataArray = new Uint8Array(bufferLength);
                           analyser.getByteFrequencyData(dataArray);
                           
                           // Update running averages with configurable learning rate
                           for (let i = 0; i < bufferLength; i++) {
                             const learningRate = VISUALIZER_CONFIG.BASELINE_LEARNING_RATE;
                             averageLevels[i] = averageLevels[i] * learningRate + dataArray[i] * (1 - learningRate);
                           }
                           
                           const bars = ref.querySelectorAll('.audio-bar');
                           let maxKick = 0;
                           
                           bars.forEach((bar: any, i) => {
                             if (i < Math.min(16, bufferLength)) {
                               const rawValue = dataArray[i];
                               const baseline = averageLevels[i];
                               
                               // Configurable dynamic range compression
                               let normalizedValue;
                               if (baseline > 0) {
                                 const ratio = rawValue / baseline;
                                 const threshold = VISUALIZER_CONFIG.COMPRESSION_THRESHOLD;
                                 const compressionRatio = VISUALIZER_CONFIG.COMPRESSION_RATIO;
                                 normalizedValue = Math.min(255, Math.max(0, (ratio - threshold) * compressionRatio));
                               } else {
                                 normalizedValue = rawValue;
                               }
                               
                               // ULTRA KICK DETECTION - Makes kicks EXPLODE upward!
                               if (i < VISUALIZER_CONFIG.BASS_BAR_COUNT) {
                                 const kickThreshold = Math.max(20, baseline * VISUALIZER_CONFIG.KICK_SENSITIVITY);
                                 
                                 // Enhanced kick detection with multiple methods
                                 const instantKick = Math.max(0, rawValue - kickThreshold);
                                 const relativeKick = baseline > 0 ? Math.max(0, (rawValue / baseline - 1.2) * 200) : 0;
                                 const absoluteKick = Math.max(0, (rawValue - 80) * 2); // Raw power detection
                                 
                                 // Use the strongest kick detection method
                                 const kickIntensity = Math.max(instantKick, relativeKick, absoluteKick) / 100;
                                 maxKick = Math.max(maxKick, kickIntensity);
                                 
                                 // MASSIVE kick boost that overrides everything else
                                 const kickBoost = Math.min(255, kickIntensity * VISUALIZER_CONFIG.KICK_BOOST_MULTIPLIER);
                                 normalizedValue = Math.max(normalizedValue, kickBoost);
                                 
                                 // Extra boost for first 3 bars (deepest bass)
                                 if (i < 3 && kickIntensity > 0.1) {
                                   normalizedValue = Math.min(255, normalizedValue * 1.5);
                                 }
                               }
                               
                               // PURE REAL-TIME HEIGHT - No decay system!
                               const intensity = normalizedValue / 255;
                               const baseHeight = VISUALIZER_CONFIG.MIN_BAR_HEIGHT;
                               const maxHeight = i < VISUALIZER_CONFIG.BASS_BAR_COUNT ? 
                                 VISUALIZER_CONFIG.MAX_BASS_HEIGHT : 
                                 VISUALIZER_CONFIG.MAX_TREBLE_HEIGHT;
                               
                               // Direct height calculation - follows audio exactly!
                               const height = Math.max(baseHeight, baseHeight + (intensity * (maxHeight - baseHeight)));
                               
                               // Configurable visual effects
                               bar.style.height = `${height}px`;
                               bar.style.filter = `
                                 hue-rotate(${intensity * VISUALIZER_CONFIG.HUE_RANGE + i * VISUALIZER_CONFIG.HUE_OFFSET_PER_BAR}deg) 
                                 brightness(${1 + intensity * VISUALIZER_CONFIG.BRIGHTNESS_MULTIPLIER}) 
                                 saturate(${1 + intensity * VISUALIZER_CONFIG.SATURATION_MULTIPLIER})
                               `;
                               bar.style.boxShadow = `
                                 0 0 ${VISUALIZER_CONFIG.MIN_GLOW + intensity * VISUALIZER_CONFIG.MAX_GLOW_INNER}px currentColor,
                                 0 0 ${VISUALIZER_CONFIG.MIN_GLOW * 2 + intensity * VISUALIZER_CONFIG.MAX_GLOW_OUTER}px currentColor
                               `;
                               bar.style.transform = `scaleX(${1 + intensity * VISUALIZER_CONFIG.SCALE_MULTIPLIER})`;
                             }
                           });
                           
                           // Configurable kick-based screen shake
                           kickDetectionHistory.push(maxKick);
                           if (kickDetectionHistory.length > VISUALIZER_CONFIG.KICK_HISTORY_LENGTH) {
                             kickDetectionHistory.shift();
                           }
                           
                           const container = document.getElementById('physics-container');
                           if (container) {
                             const avgKick = kickDetectionHistory.reduce((a, b) => a + b) / kickDetectionHistory.length;
                             const highThreshold = avgKick * VISUALIZER_CONFIG.SHAKE_THRESHOLD_HIGH;
                             const lowThreshold = avgKick * VISUALIZER_CONFIG.SHAKE_THRESHOLD_LOW;
                             
                             if (maxKick > highThreshold) {
                               container.style.animation = `bass-shake ${VISUALIZER_CONFIG.SHAKE_SPEED_INTENSE}s ease-in-out infinite`;
                             } else if (maxKick > lowThreshold) {
                               container.style.animation = `bass-shake ${VISUALIZER_CONFIG.SHAKE_SPEED_LIGHT}s ease-in-out infinite`;
                             } else {
                               container.style.animation = '';
                             }
                           }
                           
                           animationId = requestAnimationFrame(visualize);
                         };

                         // Pre-load audio immediately
                         preLoadAudio();

                         // Mouse enter - instant play
                         ref.addEventListener('mouseenter', async () => {
                           try {
                             if (!audioElement) await preLoadAudio();
                             if (!audioContext) await initWebAudio();
                             
                             if (audioContext?.state === 'suspended') {
                               await audioContext.resume();
                             }
                             
                             if (audioElement && !isPlaying) {
                               const playPromise = audioElement.play();
                               if (playPromise) {
                                 await playPromise;
                               }
                               isPlaying = true;
                               visualize();
                               
                               console.log('🎵 Overkill playing with kick detection!');
                             }
                           } catch (error) {
                             console.log('🎵 Fallback mode - no audio file');
                             // Enhanced fallback with kick simulation
                             const bars = ref.querySelectorAll('.audio-bar');
                             let kickCounter = 0;
                             const simulateKicks = () => {
                               bars.forEach((bar: any, i) => {
                                 const isKick = kickCounter % 8 === 0 && i < 4;
                                 const height = isKick ? Math.random() * 50 + 30 : Math.random() * 25 + 15;
                                 bar.style.height = `${height}px`;
                                 bar.style.filter = `hue-rotate(${i * 20}deg) brightness(${isKick ? 2.5 : 1.5})`;
                               });
                               kickCounter++;
                               if (isPlaying) setTimeout(simulateKicks, 150);
                             };
                             isPlaying = true;
                             simulateKicks();
                           }
                         });

                         // Mouse leave - stop audio
                         ref.addEventListener('mouseleave', () => {
                           if (audioElement && isPlaying) {
                             audioElement.pause();
                             audioElement.currentTime = 0;
                             isPlaying = false;
                           }
                           
                           if (animationId) {
                             cancelAnimationFrame(animationId);
                             animationId = null;
                           }
                           
                           // Reset visuals
                           const bars = ref.querySelectorAll('.audio-bar');
                           bars.forEach((bar: any) => {
                             bar.style.height = '';
                             bar.style.filter = '';
                             bar.style.boxShadow = '';
                             bar.style.transform = '';
                           });
                           
                           const container = document.getElementById('physics-container');
                           if (container) {
                             container.style.animation = '';
                           }
                           
                           console.log('🎵 Audio stopped');
                         });
                       }
                     }}>
                  <div className="flex items-end gap-1 h-16">
                    {[...Array(16)].map((_, i) => (
                      <div key={i} 
                           className="audio-bar w-1 bg-gradient-to-t from-pink-500 via-purple-500 to-yellow-400 rounded-sm"
                           style={{ 
                             height: `${Math.sin(i * 0.8) * 8 + 12}px`,
                             transformOrigin: 'bottom',
                             transition: 'height 0.02s ease-out, filter 0.05s ease-out, box-shadow 0.03s ease-out, transform 0.04s ease-out'
                           }}>
                      </div>
                    ))}
                  </div>
                  <div className="font-tech text-[9px] text-center text-pink-300 mt-1 opacity-80 group-hover:opacity-100 group-hover:text-yellow-300 transition-all duration-200">
                    🎛️ OVERKILL.mp3
                  </div>
                  <div className="font-tech text-[7px] text-center text-purple-300 opacity-60 group-hover:text-yellow-300 group-hover:opacity-100 transition-all duration-200">
                    hover = CONFIGURABLE SYNC
                  </div>
                  <div className="font-tech text-[6px] text-center text-cyan-300 opacity-40 group-hover:opacity-80 transition-all duration-200">
                    Tunable Flags • See VISUALIZER_CONFIG.md
                  </div>
                  <div className="absolute -top-1 -left-1 w-full h-full border border-pink-500/0 group-hover:border-pink-500/50 rounded transition-all duration-200 group-hover:shadow-[0_0_20px_rgba(236,72,153,0.4)]"></div>
                </div>

                {/* Compact Terminal - Repositioned */}
                <div className="absolute top-4 right-2 card-glow p-3 w-64 font-mono text-xs border border-purple-500/20 shadow-[0_0_15px_rgba(139,92,246,0.2)] z-10">
                  <div className="flex items-center gap-1 mb-2">
                    <div className="w-2 h-2 rounded-full bg-red-400"></div>
                    <div className="w-2 h-2 rounded-full bg-yellow-400"></div>
                    <div className="w-2 h-2 rounded-full bg-green-400"></div>
                    <span className="text-purple-300 ml-1 text-[9px]">physics.exe</span>
                  </div>
                  <div className="space-y-0.5 text-[9px]">
                    <div className="text-purple-400">$ ./cube_physics --3d</div>
                    <div className="text-green-300 opacity-70">✓ gravity: 9.8m/s²</div>
                    <div className="text-yellow-400">$ collision_detect ON</div>
                    <div className="text-pink-300 opacity-70">⚡ ragdoll: ACTIVE</div>
                    <div className="text-muted-foreground opacity-60">// oi, real cubes loaded</div>
                  </div>
                </div>

                {/* Physics Force Indicator */}
                <div className="absolute top-20 left-8 opacity-60">
                  <div className="font-tech text-[8px] text-purple-300">PHYSICS ENGINE v2.0</div>
                  <div className="font-tech text-[7px] text-yellow-300">mouse = force field</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Overview - Asymmetric Layout */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Section header - offset */}
          <div className="mb-16 max-w-md">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 lowercase">
              what i <span className="font-tech text-accent-glow">build</span>
            </h2>
            <div className="w-24 h-1 bg-accent-glow/50 rounded-full"></div>
          </div>

          {/* Asymmetric grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Large featured card */}
            <div className="lg:col-span-2 lg:row-span-1">
              <div className="card-glow p-10 h-full animate-fade-in lowercase">
                <div className="flex items-start justify-between mb-6">
                  <h3 className="text-2xl font-semibold">game development</h3>
                  <span className="font-tech text-accent-glow text-sm">primary</span>
                </div>
                <p className="text-muted-foreground text-lg mb-6 leading-relaxed">
                  making 2d & 3d games, designing mechanics, and building cool stuff in godot. 
                  currently working on my biggest project yet - expland.
                </p>
                <div className="flex flex-wrap gap-2">
                  {['godot', 'gdscript', 'game design', 'level design'].map((skill) => (
                    <span key={skill} className="text-xs px-3 py-1 bg-accent/20 text-accent-glow rounded-full font-tech">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Two smaller cards */}
            <div className="space-y-8">
              <div className="card-glow p-6 animate-fade-in lowercase">
                <h3 className="text-xl font-semibold mb-3">3d art & animation</h3>
                <p className="text-muted-foreground text-sm mb-4">
                  modeling & animating low-poly 3d assets, worlds, and characters in blender
                </p>
                <div className="flex flex-wrap gap-1">
                  {['blender', 'modeling', 'animation'].map((skill) => (
                    <span key={skill} className="text-xs px-2 py-1 bg-muted/20 text-muted-foreground rounded font-tech">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div className="card-glow p-6 animate-fade-in lowercase">
                <h3 className="text-xl font-semibold mb-3">programming</h3>
                <p className="text-muted-foreground text-sm mb-4">
                  writing scripts & building systems in various languages for games & tools
                </p>
                <div className="flex flex-wrap gap-1">
                  {['gdscript', 'c++', 'python'].map((skill) => (
                    <span key={skill} className="text-xs px-2 py-1 bg-muted/20 text-muted-foreground rounded font-tech">
                      {skill}
                    </span>
                  ))}
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
              wanna <span className="fast-text-shimmer">do something?</span>
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
