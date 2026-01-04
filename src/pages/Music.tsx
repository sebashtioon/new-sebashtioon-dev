import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import BackgroundGrid from "@/components/BackgroundGrid";
import BottomNav from "@/components/BottomNav";

const Music = () => {
  const [nowPlaying, setNowPlaying] = useState<any>(null);
  const [cursorPos, setCursorPos] = useState({ x: -1000, y: -1000 });

  const apiKey = import.meta.env.VITE_LASTFM_API_KEY;
  const lastfmUser = import.meta.env.VITE_LASTFM_USER;

  const collageImages = [
    "/collages/artist1.jpg",
    "/collages/artist2.jpg",
    "/collages/artist3.jpg",
    "/collages/artist4.jpg",
    "/collages/artist5.jpg",
    "/collages/artist6.jpg",
    "/collages/artist7.jpg",
    "/collages/artist8.jpg",
    "/collages/artist9.jpg",
    "/collages/artist10.jpg",
    "/collages/artist11.jpg",
    "/collages/artist12.jpg",
    "/collages/artist13.jpg",
    "/collages/artist14.jpg",
    "/collages/artist15.jpg",
    "/collages/artist16.jpg",
  ];

  const leftColumnRatios = [
    [0.32, 0.18, 0.25, 0.25],
    [0.22, 0.38, 0.2, 0.2],
  ];

  const rightColumnRatios = [...leftColumnRatios].reverse();

  const leftSlots = leftColumnRatios.flat().length;
  const rightSlots = rightColumnRatios.flat().length;
  const totalSlots = leftSlots + rightSlots;

  const uniqueImages = Array.from(new Set(collageImages)).slice(0, totalSlots);

  /* LAST.FM */
  useEffect(() => {
    if (!apiKey || !lastfmUser) return;

    fetch(
      `https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=${lastfmUser}&api_key=${apiKey}&format=json&limit=1`
    )
      .then((r) => r.json())
      .then((d) => setNowPlaying(d?.recenttracks?.track?.[0]))
      .catch(() => {});
  }, [apiKey, lastfmUser]);

  /* GLOBAL MOUSE TRACKING */
  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      setCursorPos({
        x: e.clientX,
        y: e.clientY,
      });
    };

    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  const holeSize = 900;

  return (
    <div className="relative min-h-screen overflow-hidden">
      <BackgroundGrid />

      {/* COLLAGE */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <div className="grid grid-cols-[1fr_minmax(0,42rem)_1fr] h-screen">
          {/* LEFT */}
          <div className="flex gap-2 p-2">
            {leftColumnRatios.map((column, colIdx) => (
              <div key={colIdx} className="flex flex-col gap-2 w-1/2">
                {column.map((ratio, i) => {
                  const flatIdx =
                    leftColumnRatios
                      .slice(0, colIdx)
                      .reduce((a, b) => a + b.length, 0) + i;
                  const img = uniqueImages[flatIdx];

                  return (
                    <motion.div
                      key={i}
                      className="relative overflow-hidden rounded-md"
                      style={{ height: `${ratio * 100}vh` }}
                      initial={{ opacity: 0, y: 40, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      transition={{
                        duration: 0.7,
                        ease: [0.22, 1, 0.36, 1],
                        delay: flatIdx * 0.05,
                      }}
                    >
                      <div
                        className="absolute inset-0 bg-cover bg-center"
                        style={{ backgroundImage: `url(${img})` }}
                      />
                      <div className="absolute inset-0 bg-black/35" />
                    </motion.div>
                  );
                })}
              </div>
            ))}
          </div>

          {/* CENTER */}
          <div />

          {/* RIGHT */}
          <div className="flex gap-2 p-2">
            {rightColumnRatios.map((column, colIdx) => (
              <div key={colIdx} className="flex flex-col gap-2 w-1/2">
                {column.map((ratio, i) => {
                  const flatIdx =
                    leftSlots +
                    rightColumnRatios
                      .slice(0, colIdx)
                      .reduce((a, b) => a + b.length, 0) +
                    i;
                  const img = uniqueImages[flatIdx];

                  return (
                    <motion.div
                      key={i}
                      className="relative overflow-hidden rounded-md"
                      style={{ height: `${ratio * 100}vh` }}
                      initial={{ opacity: 0, y: 40, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      transition={{
                        duration: 0.7,
                        ease: [0.22, 1, 0.36, 1],
                        delay: flatIdx * 0.05,
                      }}
                    >
                      <div
                        className="absolute inset-0 bg-cover bg-center"
                        style={{ backgroundImage: `url(${img})` }}
                      />
                      <div className="absolute inset-0 bg-black/35" />
                    </motion.div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 🔥 INVERTED BLUR OVERLAY */}
      <div
        className="pointer-events-none fixed inset-0 z-20 backdrop-blur transition-[mask-position] duration-100"
        style={{
          WebkitMaskImage: `radial-gradient(
            circle ${holeSize / 2}px at ${cursorPos.x}px ${cursorPos.y}px,
            transparent 0%,
            transparent 55%,
            black 90%
          )`,
          maskImage: `radial-gradient(
            circle ${holeSize / 2}px at ${cursorPos.x}px ${cursorPos.y}px,
            transparent 0%,
            transparent 50%,
            black 90%
          )`,
        }}
      />

      {/* MAIN CONTENT */}
      <section className="h-screen flex items-center justify-center px-4 relative z-30">
        <div className="max-w-2xl w-full space-y-10">
          <motion.div
            className="rounded-xl bg-black/55 backdrop-blur-md border border-white/10 p-6"
            initial={{ opacity: 0, y: 24, scale: 0.97, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
          >
            <motion.h1
              className="text-4xl font-bold lowercase font-serif tracking-tight"
              initial={{ opacity: 0, x: -24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.4 }}
            >
              music
            </motion.h1>
            <p className="text-muted-foreground lowercase">
              i like music. alot.
            </p>
          </motion.div>

          <div className="bg-background/95 rounded-lg p-6 space-y-6">
            <iframe
              className="w-full rounded-md"
              style={{ aspectRatio: "16 / 8.5" }}
              src="https://open.spotify.com/embed/playlist/01DOi2E8oKAnsVBZp1OpZ4"
            />
            <iframe
              className="w-full rounded-md"
              style={{ aspectRatio: "16 / 8.5" }}
              src="https://open.spotify.com/embed/playlist/5xnxd2mqa5BlpxoX3KWEEM"
            />
          </div>
        </div>
      </section>

      {/* NOW PLAYING */}
      <div className="fixed bottom-4 right-4 z-40 max-w-xs w-full">
        <div className="flex items-center gap-3 bg-black/70 border border-[#1DB954] rounded-lg px-3 py-2 backdrop-blur-xl shadow-lg">
          <img
            src={nowPlaying?.image?.[3]?.["#text"]}
            className="w-14 h-14 rounded-md object-cover flex-shrink-0"
            alt={nowPlaying?.name || "Now Playing"}
          />
          <div className="flex flex-col min-w-0">
            <span className="truncate font-semibold text-white text-base">
              {nowPlaying?.name || "Now Playing"}
            </span>
            <span className="truncate text-sm text-[#1DB954]">
              {nowPlaying?.artist?.["#text"] ||
                nowPlaying?.artist ||
                "Artist"}
            </span>
            <span className="truncate text-xs text-white/70">
              {nowPlaying?.album?.["#text"] ||
                nowPlaying?.album ||
                "Album"}
            </span>
          </div>
        </div>
      </div>

      <BottomNav />
    </div>
  );
};

export default Music;
