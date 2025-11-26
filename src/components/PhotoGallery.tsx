import { motion } from 'framer-motion';
import { Photo } from '../data/photos';

interface PhotoGalleryProps {
  photos: Photo[];
  title: string;
  subtitle?: string;
}

const PhotoGallery = ({ photos, title, subtitle }: PhotoGalleryProps) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <section className="mb-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl sm:text-4xl font-display font-bold text-white mb-4">
          {title}
        </h2>
        {subtitle && (
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            {subtitle}
          </p>
        )}
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
      >
        {photos.map((photo) => (
          <motion.div
            key={photo.id}
            variants={itemVariants}
            className="group relative overflow-hidden rounded-xl bg-gray-900/50 border border-white/10 card-hover"
          >
            {/* Actual image */}
            <img
              src={photo.src}
              alt={photo.alt}
              className="aspect-square object-cover w-full h-full"
              loading="lazy"
            />
            
            {/* Overlay with caption */}
            {photo.caption && (
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                <div className="p-4 w-full">
                  <p className="text-white text-sm font-medium">
                    {photo.caption}
                  </p>
                </div>
              </div>
            )}
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default PhotoGallery;
