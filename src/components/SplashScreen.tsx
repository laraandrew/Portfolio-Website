import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

interface SplashScreenProps {
  isLoading: boolean;
  onLoadingComplete: () => void;
}

const SplashScreen = ({ isLoading, onLoadingComplete }: SplashScreenProps) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!isLoading) return;

    // Simulate loading progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 90) return prev;
        return prev + Math.random() * 30;
      });
    }, 200);

    return () => clearInterval(interval);
  }, [isLoading]);

  useEffect(() => {
    if (!isLoading && progress < 100) {
      setProgress(100);
      // Complete splash screen after progress fills
      const timer = setTimeout(onLoadingComplete, 600);
      return () => clearTimeout(timer);
    }
  }, [isLoading, progress, onLoadingComplete]);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: -100, transition: { duration: 0.6, ease: "easeInOut" } }}
          className="fixed inset-0 z-50 bg-gray-950 flex items-center justify-center overflow-hidden"
        >
          {/* Animated Background Gradient Orbs */}
          <motion.div
            animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-20 left-1/4 w-96 h-96 bg-teal-500/30 rounded-full blur-3xl"
          />
          <motion.div
            animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
            transition={{ duration: 4, delay: 0.5, repeat: Infinity, ease: "easeInOut" }}
            className="absolute bottom-20 right-1/4 w-80 h-80 bg-purple-500/30 rounded-full blur-3xl"
          />

          {/* Main Content */}
          <div className="relative z-10 flex flex-col items-center justify-center w-full h-full px-4">
            {/* Logo / Title Area */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="text-center mb-16"
            >
              <motion.h1
                animate={{
                  backgroundImage: [
                    'linear-gradient(90deg, #14b8a6, #06b6d4)',
                    'linear-gradient(90deg, #06b6d4, #a855f7)',
                    'linear-gradient(90deg, #a855f7, #14b8a6)'
                  ]
                }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="text-5xl sm:text-6xl lg:text-7xl font-display font-bold text-white mb-4"
                style={{
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundSize: '200% 200%'
                } as any}
              >
                Andrew Lara
              </motion.h1>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="text-lg sm:text-xl text-gray-300 font-medium"
              >
                Software Engineer & Photographer
              </motion.p>
            </motion.div>

            {/* Loading Indicator - Animated Dots */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6, ease: "easeOut" }}
              className="flex gap-3 mb-12"
            >
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  animate={{ y: [0, -15, 0] }}
                  transition={{ duration: 1, repeat: Infinity, delay: i * 0.15, ease: "easeInOut" }}
                  className="w-3 h-3 bg-gradient-to-r from-teal-400 to-purple-400 rounded-full"
                />
              ))}
            </motion.div>

            {/* Loading Text */}
            <motion.p
              className="text-gray-400 text-sm uppercase tracking-widest mb-8"
              animate={{ opacity: [0.6, 1, 0.6] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              Loading Experience
            </motion.p>

            {/* Progress Bar - Desktop Version */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6, ease: "easeOut" }}
              className="hidden sm:block w-full max-w-xs"
            >
              <div className="relative h-1 bg-gray-800 rounded-full overflow-hidden">
                <motion.div
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className="absolute inset-y-0 left-0 bg-gradient-to-r from-teal-500 via-purple-500 to-pink-500 rounded-full"
                />
              </div>
              <motion.p
                className="text-xs text-gray-500 text-center mt-3 font-medium"
                animate={{ opacity: [0.6, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                {Math.round(progress)}%
              </motion.p>
            </motion.div>

            {/* Mobile Progress Indicator - Simplified */}
            <motion.div
              className="sm:hidden flex items-center gap-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6, ease: "easeOut" }}
            >
              <div className="flex gap-1">
                {[...Array(8)].map((_, i) => (
                  <motion.div
                    key={i}
                    animate={{
                      backgroundColor: progress > i * 12.5 ? '#14b8a6' : '#374151',
                      scale: progress > i * 12.5 ? 1.3 : 1
                    }}
                    transition={{ duration: 0.3 }}
                    className="w-1 h-1 bg-gray-600 rounded-full"
                  />
                ))}
              </div>
            </motion.div>

            {/* Inspirational Message */}
            <motion.div
              className="absolute bottom-12 left-0 right-0 text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.6, ease: "easeOut" }}
            >
              <p className="text-gray-500 text-sm italic">
                Crafting experiences that matter, one pixel at a time
              </p>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SplashScreen;
