import { useEffect, useMemo, useState } from "react";
import BackgroundGrid from "@/components/BackgroundGrid";
import BottomNav from "@/components/BottomNav";
import { SiSpotify } from "react-icons/si";

const Music = () => {
  const [nowPlaying, setNowPlaying] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const apiKey = import.meta.env.VITE_LASTFM_API_KEY;
  const lastfmUser = import.meta.env.VITE_LASTFM_USER;

  const bars = useMemo(() => {
    const rand = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;
    return Array.from({ length: 3 }).map((_, i) => {
      const minHeight = `${rand(20, 45)}%`;
      const maxHeight = `${rand(60, 90)}%`;
      const duration = (1.1 + i * 0.25 + Math.random() * 0.2).toFixed(2);
      const delay = (Math.random() * 0.6).toFixed(2);
      return { minHeight, maxHeight, duration, delay };
    });
  }, []);

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
    "/collages/artist17.jpg",
    "/collages/artist18.jpg",
  ];

  const collageLayout = [
    "row-span-2 col-span-2",
    "row-span-2 col-span-2",
    "row-span-1 col-span-1",
    "row-span-1 col-span-1",
    "row-span-3 col-span-1",
    "row-span-2 col-span-2",
    "row-span-3 col-span-1",
    "row-span-2 col-span-1",
    "row-span-1 col-span-2",
    "row-span-2 col-span-2",
  ];

  useEffect(() => {
    if (!apiKey || !lastfmUser) return;

    setLoading(true);
    const url = `https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=${lastfmUser}&api_key=${apiKey}&format=json&limit=1`;

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        const track = data?.recenttracks?.track?.[0];
        if (track) setNowPlaying(track);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [apiKey, lastfmUser]);

  return (
    <div className="min-h-screen">
      <BackgroundGrid />

      <section className="h-screen flex items-start justify-center px-4 pt-20 pb-6 relative">
        {/* Collage Background Template */}
        <div className="absolute inset-0 -z-10 opacity-100 pointer-events-none">
          <div className="grid grid-rows-6 grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-0 h-full p-0 w-full">
            {collageImages.map((src, idx) => (
              <div
                key={idx}
                className={`relative overflow-hidden ${collageLayout[idx % collageLayout.length]}`}
              >
                {src && (
                  <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: `url(${src})`, ...(idx === 0 ? { backgroundPosition: "center 25%" } : {}) }}
                  />
                )}
                <div className="absolute inset-0 bg-black/35" />
                <div className="absolute top-1.5 left-1.5 bg-white/20 backdrop-blur-sm border border-white/30 rounded px-2 py-1 text-xs font-semibold text-white">
                  artist{idx + 1}
                </div>
              </div>
            ))}
          </div>
          <div className="absolute inset-0 bg-gradient-to-b from-background/10 via-background/5 to-background/20" />
        </div>

        <div className="max-w-2xl mx-auto w-full space-y-10 relative z-20 max-h-[80vh] overflow-auto">
          <div className="rounded-xl bg-black/55 backdrop-blur-md border border-white/10 shadow-lg shadow-black/30 p-4 sm:p-6">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-3 lowercase font-serif drop-shadow-[0_2px_8px_rgba(0,0,0,0.45)]">music</h1>
            <p className="text-muted-foreground/90 lowercase drop-shadow-[0_1px_6px_rgba(0,0,0,0.35)]">i like music. alot.</p>
          </div>

          <div className="space-y-6 bg-background/95 rounded-lg p-6 -mx-4 relative z-20">
            <div>
              <h2 className="text-lg font-medium lowercase">spotify playlists</h2>
              <p className="text-sm text-muted-foreground/80 mb-2">Embedded playlists (replace with your own playlist IDs).</p>
              <div className="w-full bg-muted p-3 rounded-lg">
                <div className="flex flex-col gap-4 max-w-4xl mx-auto">
                  <div className="rounded overflow-hidden w-full" style={{ aspectRatio: '16 / 8.5' }}>
                    <iframe
                      title="spotify-playlist-1"
                      src="https://open.spotify.com/embed/playlist/01DOi2E8oKAnsVBZp1OpZ4"
                      allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                      className="w-full h-full"
                    ></iframe>
                  </div>
                  <div className="rounded overflow-hidden w-full" style={{ aspectRatio: '16 / 8.5' }}>
                    <iframe
                      title="spotify-playlist-2"
                      src="https://open.spotify.com/embed/playlist/5xnxd2mqa5BlpxoX3KWEEM"
                      allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                      className="w-full h-full"
                    ></iframe>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-medium lowercase mb-2">top artist</h3>
              <div className="p-3 bg-muted rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">Your Top Artist</div>
                    <div className="text-sm text-muted-foreground/80">(hardcoded — edit `src/pages/Music.tsx` to change)</div>
                  </div>
                  <a
                    className="flex items-center gap-2 text-sm text-foreground"
                    href={`https://open.spotify.com/search/Your%20Top%20Artist`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <SiSpotify /> listen
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Now Playing Top Overlay */}
          <div className="fixed top-3 left-1/2 -translate-x-1/2 z-40 w-[95%] max-w-5xl">
            <div className="flex items-center gap-2 bg-black/55 border border-[#1DB954] shadow-[0_0_26px_rgba(29,185,84,0.36)] rounded-lg px-3 py-1.5 backdrop-blur-2xl backdrop-saturate-150">
              <div className="flex items-center gap-2.5">
                <div className="relative">
                  <img
                    src={nowPlaying?.image?.[3]?.["#text"] || nowPlaying?.image?.[2]?.["#text"] || ""}
                    alt="album"
                    className="w-14 h-14 md:w-16 md:h-16 rounded-md object-cover transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-accent/20 cursor-pointer"
                  />
                </div>
                <div className="min-w-0 leading-tight">
                  <div className="flex items-center gap-2">
                    <SiSpotify className="text-[#1DB954]" size={16} />
                    <div className="font-semibold text-sm md:text-base truncate">{nowPlaying?.name || "Now Playing"}</div>
                  </div>
                  <div className="text-[11px] md:text-xs text-muted-foreground/80 truncate">{nowPlaying?.artist?.["#text"] || "artist"}</div>
                  <div className="text-[10px] text-muted-foreground/70 truncate">{nowPlaying?.album?.["#text"] || "album"}</div>
                </div>
              </div>

              <div className="flex-1" />

              <div className="hidden sm:flex flex-col items-end gap-1">
                <div className="flex items-end gap-[3px] opacity-80">
                  {bars.map((bar, idx) => (
                    <div
                      key={idx}
                      className="w-1.5 md:w-2 bg-accent rounded-t-full"
                      style={{
                        animation: `visualizerPulse ${bar.duration}s ease-in-out infinite`,
                        animationDelay: `${bar.delay}s`,
                        height: bar.minHeight,
                        ['--minHeight' as any]: bar.minHeight,
                        ['--maxHeight' as any]: bar.maxHeight,
                      }}
                    ></div>
                  ))}
                </div>
                <div className="text-[10px] text-muted-foreground/60">updated from Last.fm</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <BottomNav />
    </div>
  );
};

export default Music;
