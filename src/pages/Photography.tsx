import { motion } from 'framer-motion';
import { useState } from 'react';
import PhotoGallery from '../components/PhotoGallery';
import PhotoManagerModal from '../components/PhotoManagerModal';
import { portfolioPhotos, personalPhotos } from '../data/photos';

const Photography = () => {
  const [showManager, setShowManager] = useState(false);
  const [portfolioList, setPortfolioList] = useState(portfolioPhotos);
  const [personalList, setPersonalList] = useState(personalPhotos);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen pt-24 pb-20 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-7xl mx-auto">
        {/* Page Header */}
        <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between mb-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-center md:text-left"
          >
            {/* Instagram Handle */}
            <motion.a
              href="https://instagram.com/lensbylara"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              className="inline-block mb-6 px-4 py-2 bg-gradient-to-r from-pink-500/20 to-purple-500/20 border border-pink-500/30 rounded-full text-pink-300 hover:text-pink-200 transition-colors duration-300 text-sm sm:text-base font-medium"
            >
              📸 @lensbylara on Instagram
            </motion.a>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold text-white mb-6">
              Photography
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl leading-relaxed">
              Capturing moments, stories, and the beauty in everyday life through my lens.
              From street photography to portraits, each image tells a unique story.
            </p>
          </motion.div>

          <motion.button
            type="button"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setShowManager(true)}
            className="self-end inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-sm font-semibold text-white hover:bg-white/20 transition"
          >
            Manage & upload photos
          </motion.button>
        </div>

        {/* My Photography Section */}
        <PhotoGallery
          photos={portfolioList}
          title="My Photography"
          subtitle="A collection of moments I've captured — street, portraits, journeys, and everyday life."
        />

        {/* Personal Photos Section */}
        <PhotoGallery
          photos={personalList}
          title="With Friends & Loved Ones"
          subtitle="Personal moments and memories with the people who matter most."
        />

        <PhotoManagerModal
          isOpen={showManager}
          onClose={() => setShowManager(false)}
          portfolioPhotos={portfolioList}
          personalPhotos={personalList}
          onUpdatePortfolio={setPortfolioList}
          onUpdatePersonal={setPersonalList}
        />
      </div>
    </motion.div>
  );
};

export default Photography;
