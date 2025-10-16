import { useState, useEffect } from 'react';

interface SpotifyTrack {
  name: string;
  artist: string;
  album: string;
  albumArt: string;
  isPlaying: boolean;
  url: string;
}

// Spotify API configuration
const SPOTIFY_CLIENT_ID = import.meta.env.VITE_SPOTIFY_CLIENT_ID || '';
const SPOTIFY_CLIENT_SECRET = import.meta.env.VITE_SPOTIFY_CLIENT_SECRET || '';
const SPOTIFY_REFRESH_TOKEN = import.meta.env.VITE_SPOTIFY_REFRESH_TOKEN || '';

const useSpotify = () => {
  const [currentTrack, setCurrentTrack] = useState<SpotifyTrack | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const getAccessToken = async () => {
    const basic = btoa(`${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`);
    
    const response = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        Authorization: `Basic ${basic}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        grant_type: 'refresh_token',
        refresh_token: SPOTIFY_REFRESH_TOKEN,
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to get access token');
    }

    const data = await response.json();
    return data.access_token;
  };

  const getCurrentlyPlaying = async () => {
    try {
      // Skip if no credentials are set
      if (!SPOTIFY_CLIENT_ID || !SPOTIFY_CLIENT_SECRET || !SPOTIFY_REFRESH_TOKEN) {
        // Use mock data when no Spotify config
        const mockTrack: SpotifyTrack = {
          name: "Resonance",
          artist: "HOME", 
          album: "Odyssey",
          albumArt: "/api/placeholder/64/64",
          isPlaying: true,
          url: "https://spotify.com"
        };
        setCurrentTrack(mockTrack);
        setIsLoading(false);
        return;
      }

      const accessToken = await getAccessToken();
      
      const response = await fetch('https://api.spotify.com/v1/me/player/currently-playing', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (response.status === 204 || response.status === 202) {
        // No content or not playing
        setCurrentTrack(null);
        return;
      }

      if (!response.ok) {
        throw new Error('Failed to fetch currently playing track');
      }

      const data = await response.json();
      
      if (data && data.item) {
        const track: SpotifyTrack = {
          name: data.item.name,
          artist: data.item.artists.map((artist: any) => artist.name).join(', '),
          album: data.item.album.name,
          albumArt: data.item.album.images[0]?.url || '/api/placeholder/64/64',
          isPlaying: data.is_playing,
          url: data.item.external_urls.spotify,
        };
        
        setCurrentTrack(track);
      } else {
        setCurrentTrack(null);
      }
    } catch (err) {
      console.error('Spotify API error:', err);
      setError(err instanceof Error ? err.message : 'Unknown error');
      
      // Fallback to mock data if API fails
      const mockTrack: SpotifyTrack = {
        name: "Resonance",
        artist: "HOME",
        album: "Odyssey",
        albumArt: "/api/placeholder/64/64",
        isPlaying: true,
        url: "https://spotify.com"
      };
      setCurrentTrack(mockTrack);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getCurrentlyPlaying();
    
    // Refresh every 30 seconds
    const interval = setInterval(getCurrentlyPlaying, 30000);
    
    return () => clearInterval(interval);
  }, []);

  return { currentTrack, isLoading, error };
};

export default useSpotify;