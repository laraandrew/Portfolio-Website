import { useState } from 'react';
import { motion } from 'framer-motion';
import ProjectCard from '../components/ProjectCard';
import { projects, techCategories } from '../data/projects';

const Projects = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredProjects = projects.filter(project => {
    if (selectedCategory === 'All') return true;
    if (selectedCategory === 'Coming Soon') return project.isComingSoon;
    if (selectedCategory === 'Frontend') return project.techStack.some(tech => 
      ['React', 'Next.js', 'Tailwind CSS', 'Framer Motion', 'TypeScript'].includes(tech)
    );
    if (selectedCategory === 'Backend') return project.techStack.some(tech => 
      ['Node.js', 'Express', 'MongoDB', 'PostgreSQL', 'AWS'].includes(tech)
    );
    if (selectedCategory === 'Full Stack') return project.techStack.some(tech => 
      ['React', 'Node.js'].includes(tech)
    ) && project.techStack.length > 3;
    if (selectedCategory === 'Civic Tech') return project.techStack.includes('Civic Tech');
    if (selectedCategory === 'AI/ML') return project.techStack.includes('AI/ML');
    return false;
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

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
            Projects
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            A showcase of my software development work, from full-stack applications to civic tech solutions. 
            Each project represents my commitment to building tools that expand opportunity and remove barriers.
          </p>
        </motion.div>

        {/* Filter Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {techCategories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full font-medium transition-all duration-200 ${
                selectedCategory === category
                  ? 'bg-primary-500 text-white shadow-lg shadow-primary-500/25'
                  : 'bg-gray-800/50 text-gray-300 hover:bg-gray-700/50 hover:text-white border border-white/10'
              }`}
            >
              {category}
            </button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {filteredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </motion.div>

        {/* No projects message */}
        {filteredProjects.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <div className="text-6xl mb-4 opacity-30">🔍</div>
            <h3 className="text-xl font-display font-semibold text-white mb-2">
              No projects found
            </h3>
            <p className="text-gray-400">
              Try selecting a different category to see more projects.
            </p>
          </motion.div>
        )}

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mt-20 p-8 bg-gradient-to-r from-primary-500/10 to-accent-500/10 rounded-2xl border border-primary-500/20"
        >
          <h2 className="text-2xl font-display font-bold text-white mb-4">
            Interested in collaborating?
          </h2>
          <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
            I'm always open to discussing new opportunities, innovative projects, and ways to use technology for social good.
          </p>
          <a
            href="mailto:andrew@example.com"
            className="inline-flex items-center px-6 py-3 bg-primary-500 hover:bg-primary-600 text-white font-semibold rounded-lg transition-colors duration-200"
          >
            Get In Touch
          </a>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Projects;
