import { useEffect, useState } from 'react';
import { useLoading } from '@/contexts/LoadingContext';

interface LoadingDetectorOptions {
  threshold?: number; // Number of items that trigger loading
  delay?: number; // Minimum loading time to show
  loadingMessage?: string;
}

export const useSmartLoading = (
  itemCount: number, 
  options: LoadingDetectorOptions = {}
) => {
  const { threshold = 6, delay = 500, loadingMessage = 'loading content...' } = options;
  const { setLoading } = useLoading();
  const [hasShownLoading, setHasShownLoading] = useState(false);

  useEffect(() => {
    // Only show loading if we have enough items and haven't shown it yet
    if (itemCount >= threshold && !hasShownLoading) {
      setLoading(true, loadingMessage);
      setHasShownLoading(true);

      const timer = setTimeout(() => {
        setLoading(false);
      }, delay);

      return () => clearTimeout(timer);
    }
  }, [itemCount, threshold, delay, loadingMessage, setLoading, hasShownLoading]);

  // Reset when component unmounts
  useEffect(() => {
    return () => {
      setHasShownLoading(false);
    };
  }, []);
};

// Hook for detecting heavy image loading
export const useImageLoadingDetector = (imageUrls: string[]) => {
  const [loadingCount, setLoadingCount] = useState(0);
  const [totalCount] = useState(imageUrls.length);

  const onImageLoadStart = () => {
    setLoadingCount(prev => prev + 1);
  };

  const onImageLoadComplete = () => {
    setLoadingCount(prev => Math.max(0, prev - 1));
  };

  const isHeavyLoading = loadingCount > 3; // More than 3 images loading
  const loadingProgress = totalCount > 0 ? ((totalCount - loadingCount) / totalCount) * 100 : 100;

  return {
    isHeavyLoading,
    loadingProgress,
    onImageLoadStart,
    onImageLoadComplete,
    loadingCount
  };
};