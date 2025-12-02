import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Hero = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.15
      }
    }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 1,
        ease: "easeOut"
      }
    }
  };

  const floatingVariants = {
    animate: {
      y: [-30, 30, -30],
      transition: {
        duration: 8,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  const gradientVariants = {
    animate: {
      backgroundPosition: ['0% center', '100% center', '0% center'],
      transition: {
        duration: 5,
        repeat: Infinity,
        ease: 'easeInOut'
      }
    }
  };

  const buttonHoverVariants = {
    hover: {
      scale: 1.05,
      transition: { duration: 0.3 }
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24">
      {/* Animated Background - Enhanced */}
      <div className="absolute inset-0 -z-10 bg-gray-950">
        {/* Floating orbs with improved animation */}
        <motion.div
          variants={floatingVariants}
          animate="animate"
          className="absolute top-20 left-10 w-72 h-72 bg-teal-500/20 rounded-full blur-3xl"
        />
        <motion.div
          variants={floatingVariants}
          animate="animate"
          transition={{ delay: 2 }}
          className="absolute top-40 right-20 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl"
        />
        <motion.div
          variants={floatingVariants}
          animate="animate"
          transition={{ delay: 4 }}
          className="absolute bottom-20 left-1/3 w-80 h-80 bg-pink-500/15 rounded-full blur-3xl"
        />
        
        {/* Additional accent orbs for visual depth */}
        <motion.div
          animate={{ x: [0, 50, 0], y: [0, -50, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-1/4 right-1/4 w-60 h-60 bg-cyan-500/10 rounded-full blur-3xl"
        />
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-5xl mx-auto text-center px-4 sm:px-6 lg:px-8 relative z-10"
      >
        {/* Animated subtitle */}
        <motion.div
          variants={itemVariants}
          className="mb-4"
        >
          <span className="text-sm sm:text-base font-semibold text-teal-400 uppercase tracking-widest">
            Welcome to my portfolio
          </span>
        </motion.div>

        {/* Main heading with animated gradient */}
        <motion.h1
          variants={itemVariants}
          className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-display font-bold text-white mb-8 leading-tight"
        >
          Building software that{' '}
          <motion.span
            variants={gradientVariants}
            animate="animate"
            className="inline-block bg-gradient-to-r from-teal-400 via-purple-400 to-pink-400 bg-clip-text text-transparent bg-300% font-extrabold"
          >
            unlocks opportunity
          </motion.span>
        </motion.h1>

        {/* Subheading */}
        <motion.p
          variants={itemVariants}
          className="text-lg sm:text-xl lg:text-2xl text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed"
        >
          Los Angeles–born software engineer focused on building tools that remove barriers to health, education, and civic power. Every line of code I write is designed to make a difference.
        </motion.p>

        {/* CTA Buttons - Enhanced with better interaction */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
        >
          <motion.div
            whileHover="hover"
            variants={buttonHoverVariants}
          >
            <Link
              to="/projects"
              className="px-8 py-4 bg-gradient-to-r from-teal-500 to-teal-600 text-white font-semibold rounded-lg hover:from-teal-600 hover:to-teal-700 transition-all duration-300 shadow-lg shadow-teal-500/25 transform block"
            >
              View Projects
            </Link>
          </motion.div>
          <motion.div
            whileHover="hover"
            variants={buttonHoverVariants}
          >
            <Link
              to="/resume"
              className="px-8 py-4 border-2 border-white/30 text-white font-semibold rounded-lg hover:border-white/60 hover:bg-white/5 transition-all duration-300 block"
            >
              Resume & About
            </Link>
          </motion.div>
        </motion.div>

        {/* Secondary CTA - Photography */}
        <motion.div
          variants={itemVariants}
          className="flex justify-center"
        >
          <motion.div
            whileHover="hover"
            variants={buttonHoverVariants}
          >
            <Link
              to="/photography"
              className="px-6 py-3 text-gray-300 font-medium hover:text-white transition-colors duration-300 flex items-center gap-2"
            >
              Explore Photography
              <motion.span
                animate={{ x: [0, 4, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                →
              </motion.span>
            </Link>
          </motion.div>
        </motion.div>

        {/* Animated scroll indicator */}
        <motion.div
          variants={itemVariants}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
            className="flex flex-col items-center"
          >
            <p className="text-xs text-gray-400 mb-2 uppercase tracking-widest">Scroll to explore</p>
            <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center p-2">
              <motion.div
                animate={{ y: [0, 6, 0] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
                className="w-1 h-2 bg-white rounded-full"
              />
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
