import { useEffect, useMemo, useState } from "react";
import BackgroundGrid from "@/components/BackgroundGrid";
import BottomNav from "@/components/BottomNav";
import { SiSpotify } from "react-icons/si";

const Music = () => {
  const [nowPlaying, setNowPlaying] = useState<any>(null);

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
  ];


  /**
   * HEIGHT RATIOS (must sum to 1 per column)
   * tweak these to taste – layout stays stable forever
   */
  const leftColumnRatios = [
    [0.32, 0.18, 0.25, 0.25], // left sub-column
    [0.22, 0.38, 0.20, 0.20], // right sub-column
  ];

  const rightColumnRatios = [
    [0.25, 0.30, 0.20, 0.25],
    [0.35, 0.20, 0.30, 0.15],
  ];

  // Calculate total slots in the collage (after ratios are defined)
  const leftSlots = leftColumnRatios.flat().length;
  const rightSlots = rightColumnRatios.flat().length;
  const totalSlots = leftSlots + rightSlots;
  // Only use as many images as slots, and ensure uniqueness
  const uniqueImages = Array.from(new Set(collageImages)).slice(0, totalSlots);

  useEffect(() => {
    if (!apiKey || !lastfmUser) return;

    fetch(
      `https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=${lastfmUser}&api_key=${apiKey}&format=json&limit=1`
    )
      .then((r) => r.json())
      .then((d) => setNowPlaying(d?.recenttracks?.track?.[0]))
      .catch(() => {});
  }, [apiKey, lastfmUser]);

  return (
    <div className="relative min-h-screen overflow-hidden">
      <BackgroundGrid />

      {/* COLLAGE SIDES */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <div className="grid grid-cols-[1fr_minmax(0,42rem)_1fr] h-screen">
          {/* LEFT COLLAGE */}
          <div className="flex gap-2 p-2">
            {leftColumnRatios.map((column, colIdx) => (
              <div key={colIdx} className="flex flex-col gap-2 w-1/2">
                {column.map((ratio, i) => {
                  // Calculate the flat index for this slot using running total
                  const flatIdx = leftColumnRatios
                    .slice(0, colIdx)
                    .reduce((acc, arr) => acc + arr.length, 0) + i;
                  const img = uniqueImages[flatIdx];
                  return (
                    <div
                      key={i}
                      className="relative overflow-hidden rounded-md"
                      style={{ height: `${ratio * 100}vh` }}
                    >
                      <div
                        className="absolute inset-0 bg-cover bg-center"
                        style={{ backgroundImage: `url(${img})` }}
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

          {/* RIGHT COLLAGE */}
          <div className="flex gap-2 p-2">
            {rightColumnRatios.map((column, colIdx) => (
              <div key={colIdx} className="flex flex-col gap-2 w-1/2">
                {column.map((ratio, i) => {
                  // Calculate the flat index for this slot using running total, offset by leftSlots
                  const flatIdx = leftSlots + rightColumnRatios
                    .slice(0, colIdx)
                    .reduce((acc, arr) => acc + arr.length, 0) + i;
                  const img = uniqueImages[flatIdx];
                  return (
                    <div
                      key={i}
                      className="relative overflow-hidden rounded-md"
                      style={{ height: `${ratio * 100}vh` }}
                    >
                      <div
                        className="absolute inset-0 bg-cover bg-center"
                        style={{ backgroundImage: `url(${img})` }}
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

      {/* MAIN CONTENT */}
      <section className="h-screen flex items-center justify-center px-4 relative z-10">
        <div className="max-w-2xl w-full space-y-10">

          <div className="rounded-xl bg-black/55 backdrop-blur-md border border-white/10 p-6">
            <h1 className="text-4xl font-bold lowercase font-serif">
              music
            </h1>
            <p className="text-muted-foreground lowercase">
              i like music. alot.
            </p>
          </div>

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
      <div className="fixed top-3 left-1/2 -translate-x-1/2 z-40 w-[95%] max-w-5xl">
        <div className="flex items-center gap-3 bg-black/60 border border-[#1DB954] rounded-lg px-3 py-2 backdrop-blur-xl">
          <img
            src={nowPlaying?.image?.[3]?.["#text"]}
            className="w-14 h-14 rounded-md object-cover"
          />
          <div className="truncate">
            {nowPlaying?.name || "Now Playing"}
          </div>
        </div>
      </div>

      <BottomNav />
    </div>
  );
};

export default Music;
