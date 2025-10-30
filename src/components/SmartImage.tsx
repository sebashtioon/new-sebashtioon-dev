import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useCachedImage } from '@/utils/imageCache';

interface SmartImageProps {
  src: string;
  alt: string;
  className?: string;
  placeholder?: string;
  onLoadStart?: () => void;
  onLoadComplete?: () => void;
}

const SmartImage = ({ src, alt, className = "", placeholder, onLoadStart, onLoadComplete }: SmartImageProps) => {
  const { cachedUrl, isLoading: isCaching } = useCachedImage(src);
  const [isImageLoading, setIsImageLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  
  const isLoading = isCaching || isImageLoading;

  useEffect(() => {
    if (isLoading && onLoadStart) {
      onLoadStart();
    } else if (!isLoading && onLoadComplete) {
      onLoadComplete();
    }
  }, [isLoading, onLoadStart, onLoadComplete]);

  const handleLoad = () => {
    setIsImageLoading(false);
  };

  const handleError = () => {
    setIsImageLoading(false);
    setHasError(true);
  };

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* Loading skeleton */}
      {isLoading && (
        <div className="absolute inset-0 bg-gradient-to-r from-muted/20 via-muted/10 to-muted/20 animate-pulse">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-muted-foreground/50 text-sm font-mono">loading...</div>
          </div>
        </div>
      )}
      
      {/* Error state */}
      {hasError && (
        <div className="absolute inset-0 bg-muted/10 flex items-center justify-center border-2 border-dashed border-muted/30 rounded-lg">
          <div className="text-center text-muted-foreground/70">
            <div className="text-2xl mb-2">⚠️</div>
            <div className="text-sm font-mono">failed to load</div>
          </div>
        </div>
      )}
      
      {/* Actual image */}
      <motion.img
        src={cachedUrl}
        alt={alt}
        className={`w-full h-full object-cover transition-opacity duration-300 ${
          isLoading ? 'opacity-0' : 'opacity-100'
        }`}
        loading="lazy"
        decoding="async"
        onLoad={handleLoad}
        onError={handleError}
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.3 }}
      />
    </div>
  );
};

export default SmartImage;