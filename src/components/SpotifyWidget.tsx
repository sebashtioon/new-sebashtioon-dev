import { SiSpotify } from 'react-icons/si';
import { FiMusic } from 'react-icons/fi';
import useSpotify from '@/hooks/useSpotify';

const SpotifyWidget = () => {
  const { currentTrack, isLoading } = useSpotify();

  if (isLoading) {
    return (
      <div className="card-glow p-4 max-w-xs">
        <div className="flex items-center gap-2 mb-2">
          <SiSpotify className="text-green-500" size={16} />
          <span className="text-sm font-tech">spotify</span>
        </div>
        <div className="animate-pulse">
          <div className="h-3 bg-muted rounded w-24 mb-1"></div>
          <div className="h-2 bg-muted rounded w-16"></div>
        </div>
      </div>
    );
  }

  if (!currentTrack) {
    return (
      <div className="card-glow p-4 max-w-xs opacity-50">
        <div className="flex items-center gap-2">
          <FiMusic size={16} />
          <span className="text-sm font-tech">not listening</span>
        </div>
      </div>
    );
  }

  return (
    <a 
      href={currentTrack.url} 
      target="_blank" 
      rel="noopener noreferrer"
      className="block card-glow p-4 max-w-xs hover:bg-card-hover/60 transition-all duration-300 group"
    >
      <div className="flex items-center gap-2 mb-2">
        <SiSpotify className="text-green-500" size={16} />
        <span className="text-sm font-tech">now playing</span>
        <div className="flex gap-1 ml-auto">
          <div className="w-1 h-3 bg-green-500 rounded-full animate-pulse"></div>
          <div className="w-1 h-2 bg-green-500 rounded-full animate-pulse delay-100"></div>
          <div className="w-1 h-4 bg-green-500 rounded-full animate-pulse delay-200"></div>
        </div>
      </div>
      
      <div className="flex items-center gap-3">
        <img 
          src={currentTrack.albumArt} 
          alt={currentTrack.album}
          className="w-12 h-12 rounded-md border border-border/50"
        />
        <div className="flex-1 min-w-0">
          <div className="font-medium text-sm truncate group-hover:text-green-400 transition-colors">
            {currentTrack.name}
          </div>
          <div className="text-xs text-muted-foreground truncate font-mono">
            {currentTrack.artist}
          </div>
        </div>
      </div>
    </a>
  );
};

export default SpotifyWidget;