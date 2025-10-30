import { useState, useEffect, useCallback } from 'react';

interface ImageCache {
  [key: string]: {
    blob: string;
    timestamp: number;
  };
}

class ImageCacheManager {
  private cache: ImageCache = {};
  private readonly CACHE_KEY = 'sebashtioon-image-cache';
  private readonly CACHE_EXPIRY = 24 * 60 * 60 * 1000; // 24 hours

  constructor() {
    this.loadFromStorage();
    // Clear cache when page unloads (user leaves site)
    window.addEventListener('beforeunload', () => {
      this.clearCache();
    });
  }

  private loadFromStorage() {
    try {
      const cached = sessionStorage.getItem(this.CACHE_KEY);
      if (cached) {
        this.cache = JSON.parse(cached);
        // Clean expired entries
        this.cleanExpiredEntries();
      }
    } catch (error) {
      console.warn('Failed to load image cache:', error);
    }
  }

  private saveToStorage() {
    try {
      sessionStorage.setItem(this.CACHE_KEY, JSON.stringify(this.cache));
    } catch (error) {
      console.warn('Failed to save image cache:', error);
    }
  }

  private cleanExpiredEntries() {
    const now = Date.now();
    Object.keys(this.cache).forEach(key => {
      if (now - this.cache[key].timestamp > this.CACHE_EXPIRY) {
        delete this.cache[key];
      }
    });
  }

  async cacheImage(url: string): Promise<string> {
    // Check if already cached
    if (this.cache[url]) {
      return this.cache[url].blob;
    }

    try {
      const response = await fetch(url);
      const blob = await response.blob();
      const objectUrl = URL.createObjectURL(blob);
      
      // Cache the blob URL
      this.cache[url] = {
        blob: objectUrl,
        timestamp: Date.now()
      };
      
      this.saveToStorage();
      return objectUrl;
    } catch (error) {
      console.warn('Failed to cache image:', url, error);
      return url; // Fallback to original URL
    }
  }

  getCachedImage(url: string): string | null {
    const cached = this.cache[url];
    if (cached && (Date.now() - cached.timestamp < this.CACHE_EXPIRY)) {
      return cached.blob;
    }
    return null;
  }

  clearCache() {
    // Revoke all blob URLs to free memory
    Object.values(this.cache).forEach(({ blob }) => {
      if (blob.startsWith('blob:')) {
        URL.revokeObjectURL(blob);
      }
    });
    this.cache = {};
    sessionStorage.removeItem(this.CACHE_KEY);
  }

  getCacheSize(): number {
    return Object.keys(this.cache).length;
  }
}

// Singleton instance
export const imageCache = new ImageCacheManager();

// Hook for using cached images
export const useCachedImage = (url: string) => {
  const [cachedUrl, setCachedUrl] = useState<string>(url);
  const [isLoading, setIsLoading] = useState(false);

  const loadImage = useCallback(async () => {
    // Check cache first
    const cached = imageCache.getCachedImage(url);
    if (cached) {
      setCachedUrl(cached);
      return;
    }

    // Load and cache
    setIsLoading(true);
    try {
      const newCachedUrl = await imageCache.cacheImage(url);
      setCachedUrl(newCachedUrl);
    } catch (error) {
      console.warn('Failed to load cached image:', error);
      setCachedUrl(url); // Fallback
    } finally {
      setIsLoading(false);
    }
  }, [url]);

  useEffect(() => {
    loadImage();
  }, [loadImage]);

  return { cachedUrl, isLoading };
};