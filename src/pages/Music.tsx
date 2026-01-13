import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import BackgroundGrid from "@/components/BackgroundGrid";
import BottomNav from "@/components/BottomNav";
import { Skeleton } from "@/components/ui/skeleton";
import { FaSpotify } from "react-icons/fa";

const Music = () => {
  const [nowPlaying, setNowPlaying] = useState<any>(null);
  const [nowPlayingLoading, setNowPlayingLoading] = useState(true);
  const [cursorPos, setCursorPos] = useState({ x: -1000, y: -1000 });
  const [logoBurst, setLogoBurst] = useState<{
    src: string;
    id: number;
  } | null>(null);

  const apiKey = import.meta.env.VITE_LASTFM_API_KEY;
  const lastfmUser = import.meta.env.VITE_LASTFM_USER;
  const lastfmProxyUrl =
    import.meta.env.VITE_LASTFM_PROXY_URL || "/lastfm";

  // keep the layout stable by using fixed slots.
  // removed: artist4, artist8, artist12, artist16 (leave their slots as null so nothing shifts)
  const collageSlots: Array<string | null> = [
    "/collages/artist1.jpg",
    "/collages/artist2.jpg",
    "/collages/artist3.jpg",
    null,
    "/collages/artist5.jpg",
    "/collages/artist6.jpg",
    "/collages/artist7.jpg",
    null,
    "/collages/artist9.jpg",
    "/collages/artist10.jpg",
    "/collages/artist11.jpg",
    null,
    "/collages/artist13.jpg",
    "/collages/artist14.jpg",
    "/collages/artist15.jpg",
    null,
  ];

  const logoMap: Record<string, string> = {
    "/collages/artist1.jpg": "/logos/artist1.png",
    "/collages/artist5.jpg": "/logos/artist5.png",
  };

  const leftColumnRatios = [
    [0.32, 0.18, 0.25, 0.25],
    [0.22, 0.38, 0.2, 0.2],
  ];

  const rightColumnRatios = [...leftColumnRatios].reverse();

  const leftSlots = leftColumnRatios.flat().length;
  const rightSlots = rightColumnRatios.flat().length;
  const totalSlots = leftSlots + rightSlots;

  const tileImages = collageSlots.slice(0, totalSlots);

  /* LAST.FM */
  useEffect(() => {
    if (!lastfmUser) return;
    setNowPlayingLoading(true);

    const directUrl = `https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=${encodeURIComponent(
      lastfmUser
    )}&api_key=${encodeURIComponent(apiKey)}&format=json&limit=1`;

    const proxyBase =
      lastfmProxyUrl.startsWith("http://") ||
      lastfmProxyUrl.startsWith("https://")
        ? lastfmProxyUrl
        : `${window.location.origin}${lastfmProxyUrl.startsWith("/") ? "" : "/"}${lastfmProxyUrl}`;
    const proxyUrl = `${proxyBase}?user=${encodeURIComponent(lastfmUser)}`;

    const url = apiKey ? directUrl : proxyUrl;

    fetch(url)
      .then((r) => r.json())
      .then((d) => setNowPlaying(d?.recenttracks?.track?.[0] ?? null))
      .catch((err) => {
        if (import.meta.env.DEV) {
          // eslint-disable-next-line no-console
          console.warn("Last.fm now playing failed", err);
        }
      })
      .finally(() => setNowPlayingLoading(false));
  }, [apiKey, lastfmUser, lastfmProxyUrl]);

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

  const showLogoBurstAt = (logoSrc: string) => {
    const id = Date.now();

    setLogoBurst({
      src: logoSrc,
      id,
    });


    // automatically clear after the exit animation so it can fade out
    setTimeout(() => {
      setLogoBurst((current) => (current && current.id === id ? null : current));
    }, 600);
  };

  const getLogoSize = () => 200; // fixed size is fine when not tied to a tile

  const getBaseNameFromImage = (imgSrc: string) => {
    try {
      const parts = imgSrc.split("/");
      const file = parts[parts.length - 1];
      return file.split(".")[0];
    } catch {
      return "artist";
    }
  };

  // measure all collage tiles so we can place invisible click hotspots over them
  const [collageHotspots, setCollageHotspots] = useState<
    Array<{
      imgSrc: string;
      left: number;
      top: number;
      width: number;
      height: number;
    }>
  >([]);

  useEffect(() => {
    let rafId = 0;
    let startupRafId = 0;

    const updateNow = () => {
      const nodes = Array.from(
        document.querySelectorAll<HTMLElement>("[data-collage]")
      );

      const next = nodes
        .map((el) => {
          const imgSrc = el.dataset.collage || "";
          if (!imgSrc) return null;

          const rect = el.getBoundingClientRect();
          return {
            imgSrc,
            left: rect.left,
            top: rect.top,
            width: rect.width,
            height: rect.height,
          };
        })
        .filter(Boolean) as Array<{
        imgSrc: string;
        left: number;
        top: number;
        width: number;
        height: number;
      }>;

      setCollageHotspots(next);
    };

    const scheduleUpdate = () => {
      if (rafId) return;
      rafId = window.requestAnimationFrame(() => {
        rafId = 0;
        updateNow();
      });
    };

    // keep hotspots aligned during the collage entrance animation
    const startTime = performance.now();
    const startupLoop = (t: number) => {
      updateNow();
      if (t - startTime < 1000) {
        startupRafId = window.requestAnimationFrame(startupLoop);
      }
    };

    startupRafId = window.requestAnimationFrame(startupLoop);

    window.addEventListener("resize", scheduleUpdate);
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    return () => {
      if (rafId) window.cancelAnimationFrame(rafId);
      if (startupRafId) window.cancelAnimationFrame(startupRafId);
      window.removeEventListener("resize", scheduleUpdate);
      window.removeEventListener("scroll", scheduleUpdate);
    };
  }, []);

  const getLogoForImage = (imgSrc: string) => {
    if (logoMap[imgSrc]) {
      return logoMap[imgSrc];
    }
    try {
      const parts = imgSrc.split("/");
      const file = parts[parts.length - 1]; // e.g. artist1.jpg
      const base = file.split(".")[0];
      return `/logos/${base}.png`;
    } catch {
      return imgSrc;
    }
  };

  // Preload collage and logo images so they appear instantly and logos
  // are ready when the user clicks a collage tile.
  useEffect(() => {
    const collageUrls = collageSlots.filter(Boolean) as string[];
    const logoUrls = collageUrls.map((u) => getLogoForImage(u));
    const urls = Array.from(new Set([...collageUrls, ...logoUrls]));

    const links: HTMLLinkElement[] = [];
    const imgs: HTMLImageElement[] = [];

    urls.forEach((u) => {
      try {
        const link = document.createElement("link");
        link.rel = "preload";
        link.as = "image";
        link.href = u;
        document.head.appendChild(link);
        links.push(link);
      } catch (e) {
        // ignore
      }

      const img = new Image();
      img.src = u;
      imgs.push(img);
    });

    return () => {
      links.forEach((l) => l.remove());
    };
    // run once on mount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const triggerLogoBurst = (imgSrc: string) => {
    const logoSrc = getLogoForImage(imgSrc);
    showLogoBurstAt(logoSrc);
  };

  const getCollageBackgroundPosition = (imgSrc: string) => {
    if (imgSrc === "/collages/artist14.jpg") {
      // smaller % = show more of the top, which makes the subject sit lower in the tile
      return "center 40%";
    }
    return "center";
  };

  return (
    <div className="relative min-h-screen overflow-hidden">
      <BackgroundGrid />

      <AnimatePresence>
        {logoBurst && (
          <div className="pointer-events-none fixed inset-0 z-50 flex items-center justify-center">
            <div className="translate-y-10">
              <motion.div
                key={logoBurst.id}
                className="relative"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.03 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              >
                {/* soft faded circle shadow for depth */}
                <div
                  className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 blur-xl"
                  style={{
                    width: getLogoSize() * 2.8,
                    height: getLogoSize() * 2.8,
                    background:
                      "radial-gradient(circle, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.8) 38%, rgba(0,0,0,0) 78%)",
                  }}
                />

                <motion.img
                  src={logoBurst.src}
                  alt=""
                  className="relative object-contain drop-shadow-[0_0_35px_rgba(255,255,255,0.6)]"
                  style={{
                    width: getLogoSize(),
                    height: getLogoSize(),
                  }}
                  initial={{ opacity: 0, scale: 0.7 }}
                  animate={{ opacity: 1, scale: 1.15 }}
                  exit={{ opacity: 0, scale: 1.25 }}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                />
              </motion.div>
            </div>
          </div>
        )}
      </AnimatePresence>

      {collageHotspots.map((spot) => (
        <button
          key={spot.imgSrc}
          type="button"
          aria-label={`Show ${getBaseNameFromImage(spot.imgSrc)} logo`}
          className="fixed z-40 cursor-pointer"
          style={{
            left: spot.left,
            top: spot.top,
            width: spot.width,
            height: spot.height,
            background: "transparent",
            border: "none",
            padding: 0,
          }}
          onClick={() => triggerLogoBurst(spot.imgSrc)}
        />
      ))}

      {/* COLLAGE - TOP BAND ONLY */}
      <div className="absolute top-0 left-0 right-0 h-[40vh] -z-10">
        <div className="grid grid-cols-[minmax(0,1fr)_minmax(0,48rem)_minmax(0,1fr)] h-full gap-8 px-6">
          {/* LEFT */}
          <div className="flex gap-2 p-2">
            {leftColumnRatios.map((column, colIdx) => (
              <div key={colIdx} className="flex flex-col gap-2 w-1/2">
                {column.map((ratio, i) => {
                  const flatIdx =
                    leftColumnRatios
                      .slice(0, colIdx)
                      .reduce((a, b) => a + b.length, 0) + i;
                  const img = tileImages[flatIdx];

                  return (
                    <div
                      key={i}
                      className="relative overflow-hidden rounded-md"
                      data-collage={img ?? undefined}
                      style={{ height: `${ratio * 100}vh` }}
                    >
                      <div
                        className="absolute inset-0 bg-cover bg-center"
                        style={{
                          backgroundImage: img ? `url(${img})` : "none",
                          backgroundPosition: img
                            ? getCollageBackgroundPosition(img)
                            : "center",
                        }}
                      />
                      <div className="absolute inset-0 bg-black/35" />
                    </div>
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
                  const img = tileImages[flatIdx];

                  return (
                    <div
                      key={i}
                      className="relative overflow-hidden rounded-md"
                      data-collage={img ?? undefined}
                      style={{ height: `${ratio * 100}vh` }}
                    >
                      <div
                        className="absolute inset-0 bg-cover bg-center"
                        style={{
                          backgroundImage: img ? `url(${img})` : "none",
                          backgroundPosition: img
                            ? getCollageBackgroundPosition(img)
                            : "center",
                        }}
                      />
                      <div className="absolute inset-0 bg-black/35" />
                    </div>
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
      <section className="min-h-screen flex justify-center px-6 md:px-8 pt-28 pb-16 relative z-30">
        <div className="max-w-3xl w-full space-y-6">
          <div className="prose prose-invert max-w-none text-white/80 lowercase space-y-4">
            <h1 className="text-4xl font-bold font-serif tracking-tight">music</h1>
            <p className="text-muted-foreground mb-8">i love music, so i made this page to yap about it</p>

            <div className="w-full flex items-center mb-4">
              <div className="flex-1 h-px bg-white/10" />
              <div className="w-2" />
            </div>

            <h3 className="mt-0 text-sm text-white/60 tracking">what i listen to</h3>
            <p className="text-sm md:text-base text-white/80 leading-relaxed">
              <motion.span
              className="inline-block font-semibold"
              initial={{ x: 0, y: 0, rotate: 0, scale: 1 }}
              animate={{
                x: [0, -4, 4, -3, 3, -2, 0],
                y: [0, -1, 1, -1, 1, -1, 0],
                rotate: [0, -5, 5, -4, 4, -3, 0],
                scale: [1, 1.02, 0.99, 1.03, 0.98, 1.01, 1],
              }}
              transition={{
                duration: 0.18,
                ease: [0.36, 0.07, 0.19, 0.97],
                repeat: Infinity,
                repeatType: "loop",
              }}
              >
              dubstep
              </motion.span>
              . literally any subgenre. deathstep, metalstep, tearout, riddim, brostep, color bass, <span className="uppercase">ANYTHING</span> (i like my speedcore too)
            </p>

            <h4 className="mt-4 text-sm text-white/60 tracking">how much i listen to</h4>
            <p className="text-sm md:text-base text-white/80 leading-relaxed">
              i average like 11+ hours of music a day. and no i don&apos;t fake my stats (like leaving spotify playing on silent), i actually listen to my music unlike some goobers
            </p>
            <a
              href="https://stats.fm/sebashtioon"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 text-[#1DB954] font-medium underline-offset-4 hover:underline"
            >
              go see my degenerate listening stats
              <span aria-hidden>↗</span>
            </a>

            <h4 className="mt-4 text-sm text-white/60 tracking">how i listen</h4>
            <p className="text-sm md:text-base text-white/80 leading-relaxed">
              i listen to a stupid amount of music every day and i almost never shuffle. i usually start by letting whats left in my queue playlist finish. then i run my riot daily essentials playlist (basically riot without the remixes and some of the really old stuff) and i dont skip anything. while thats playing, i build out what im listening to next by picking albums, chunks of my main playlist, or just whatever i havent listened to in a minute, and adding them to my queue playlist. i like doing it this way because if my mood flips i can just add stuff to the spotify queue without wrecking the plan, and the queue can last a few hours or even a few days. also if i find a new song and its from an album or ep, i feel obligated to listen to the whole thing through and add the whole project, not just one or two tracks. i dont really fw spotify daily mixes or generated slop. i want to hear things the full way through and actually get the full lore yk? in fact i literally have seperate playlists for artists singles and treat them like albums
            </p>
          </div>

          {/* decorative cards removed per user request */}
        </div>
      </section>

      {/* PLAYLISTS SECTION (MOVED LOWER) */}
      <section className="relative z-30 px-4 pb-24">
        <div className="max-w-5xl mx-auto space-y-6">
          <div className="flex items-baseline justify-between gap-4 mb-1">
            <h2 className="text-lg md:text-xl font-semibold tracking-tight lowercase text-white">
              playlists i actually touch
            </h2>
            <span className="hidden md:inline text-xs tracking-[0.2em] text-white/50">
              spotify sucks
            </span>
          </div>

          <div className="rounded-2xl bg-black/55 backdrop-blur-xl border border-white/10 p-5 md:p-6 shadow-xl">
            <div className="grid gap-4 md:grid-cols-2">
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
        </div>
      </section>

      {/* NOW PLAYING */}
      <div className="fixed bottom-4 right-4 z-40 max-w-xs w-full">
        <div className="flex items-center gap-3 bg-black/70 border border-[#1DB954] rounded-lg px-3 py-2 backdrop-blur-xl shadow-lg">
          {nowPlayingLoading ? (
            <>
              <Skeleton className="w-14 h-14 rounded-md flex-shrink-0 bg-white/10" />
              <div className="flex flex-col min-w-0 flex-1 gap-1">
                <div className="flex items-center gap-2 text-xs text-white/60 lowercase">
                  <FaSpotify className="text-[#1DB954]" aria-hidden />
                  <span className="truncate">what i’m listening to rn</span>
                </div>
                <Skeleton className="h-5 w-40 bg-white/10" />
                <Skeleton className="h-4 w-28 bg-white/10" />
                <Skeleton className="h-3 w-24 bg-white/10" />
              </div>
            </>
          ) : (
            <>
              {nowPlaying?.image?.[3]?.["#text"] ? (
                <img
                  src={nowPlaying.image[3]["#text"]}
                  className="w-14 h-14 rounded-md object-cover flex-shrink-0"
                  alt={nowPlaying?.name || "Now Playing"}
                />
              ) : (
                <div className="w-14 h-14 rounded-md bg-white/10 flex-shrink-0" />
              )}

              <div className="flex flex-col min-w-0">
                <div className="flex items-center gap-2 text-xs text-white/60 lowercase">
                  <FaSpotify className="text-[#1DB954]" aria-hidden />
                  <span className="truncate">what i’m listening to rn</span>
                </div>
                <span className="truncate font-semibold text-white text-base">
                  {nowPlaying?.name || "Not listening"}
                </span>
                <span className="truncate text-sm text-[#1DB954]">
                  {nowPlaying?.artist?.["#text"] || nowPlaying?.artist || ""}
                </span>
                <span className="truncate text-xs text-white/70">
                  {nowPlaying?.album?.["#text"] || nowPlaying?.album || ""}
                </span>
              </div>
            </>
          )}
        </div>
      </div>

      <BottomNav />
    </div>
  );
};

export default Music;
