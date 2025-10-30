import { useLoading } from '@/contexts/LoadingContext';
import { motion, AnimatePresence } from 'framer-motion';

const LoadingOverlay = () => {
  const { isLoading, loadingMessage } = useLoading();

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[9999] flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <motion.div
            className="text-center"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >

            
            {/* Loading message */}
            <div className="text-white text-lg font-mono lowercase animate-pulse">
              {loadingMessage}
            </div>
            
            {/* sebashtioon.os style dots */}
            <div className="flex items-center justify-center space-x-2 mt-4">
              <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
              <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
              <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce"></div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingOverlay;