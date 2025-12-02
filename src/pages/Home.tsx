import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Hero from '../components/Hero';
import { projects } from '../data/projects';
import { portfolioPhotos } from '../data/photos';

const Home = () => {
  const featuredProjects = projects.filter(p => !p.isComingSoon).slice(0, 2);
  const featuredPhotos = portfolioPhotos.slice(0, 4);

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut" as const
      }
    }
  };

  const navigationCards = [
    {
      title: 'Projects',
      description: 'Explore my software development work and technical projects',
      icon: '💻',
      path: '/projects',
      gradient: 'from-primary-500 to-primary-600'
    },
    {
      title: 'Photography',
      description: 'A collection of moments I\'ve captured through my lens',
      icon: '📸',
      path: '/photography',
      gradient: 'from-accent-500 to-accent-600'
    },
    {
      title: 'Resume / About',
      description: 'Learn more about my background, experience, and story',
      icon: '👨‍💻',
      path: '/resume',
      gradient: 'from-primary-600 to-accent-500'
    }
  ];

  return (
    <div className="min-h-screen">
      <Hero />
      
      {/* Quick Navigation Cards */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-white mb-4">
              Explore My Work
            </h2>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              Discover my projects, photography, and learn more about my journey as a software engineer.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {navigationCards.map((card, index) => (
              <motion.div
                key={card.title}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Link
                  to={card.path}
                  className="block p-8 bg-gray-900/50 backdrop-blur-sm border border-white/10 rounded-xl card-hover group"
                >
                  <div className="text-center">
                    <div className="text-4xl mb-4">{card.icon}</div>
                    <h3 className="text-xl font-display font-semibold text-white mb-3 group-hover:text-primary-400 transition-colors">
                      {card.title}
                    </h3>
                    <p className="text-gray-300 leading-relaxed">
                      {card.description}
                    </p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Work Strip */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-900/30">
        <div className="max-w-7xl mx-auto">
          {/* Featured Projects */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-display font-bold text-white">
                Featured Projects
              </h2>
              <Link
                to="/projects"
                className="text-primary-400 hover:text-primary-300 font-medium transition-colors"
              >
                View All Projects →
              </Link>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {featuredProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  variants={cardVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-gray-900/50 backdrop-blur-sm border border-white/10 rounded-xl p-6 card-hover"
                >
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-xl font-display font-semibold text-white">
                      {project.name}
                    </h3>
                    <span className="text-sm text-primary-400 font-medium">
                      {project.roleOrType}
                    </span>
                  </div>
                  <p className="text-gray-300 mb-4 leading-relaxed">
                    {project.shortDescription}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.techStack.slice(0, 4).map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 bg-primary-500/10 text-primary-300 text-sm rounded-full border border-primary-500/20"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.techStack.length > 4 && (
                      <span className="px-3 py-1 text-gray-400 text-sm">
                        +{project.techStack.length - 4} more
                      </span>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Featured Photos */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-display font-bold text-white">
                Recent Photography
              </h2>
              <Link
                to="/photography"
                className="text-primary-400 hover:text-primary-300 font-medium transition-colors"
              >
                View Gallery →
              </Link>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {featuredPhotos.map((photo, index) => (
                <motion.div
                  key={photo.id}
                  variants={cardVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="aspect-square bg-gradient-to-br from-primary-500/20 to-accent-500/20 rounded-xl flex items-center justify-center card-hover border border-white/10"
                >
                  <div className="text-3xl opacity-30">📸</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;
