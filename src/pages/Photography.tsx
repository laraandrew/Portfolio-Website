import { motion } from 'framer-motion';
import PhotoGallery from '../components/PhotoGallery';
import { portfolioPhotos, personalPhotos } from '../data/photos';

const Photography = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen pt-24 pb-20 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-7xl mx-auto">
        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold text-white mb-6">
            Photography
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Capturing moments, stories, and the beauty in everyday life through my lens. 
            From street photography to portraits, each image tells a unique story.
          </p>
        </motion.div>

        {/* My Photography Section */}
        <PhotoGallery
          photos={portfolioPhotos}
          title="My Photography"
          subtitle="A collection of moments I've captured — street, portraits, journeys, and everyday life."
        />

        {/* Personal Photos Section */}
        <PhotoGallery
          photos={personalPhotos}
          title="With Friends & Loved Ones"
          subtitle="Personal moments and memories with the people who matter most."
        />
      </div>
    </motion.div>
  );
};

export default Photography;
