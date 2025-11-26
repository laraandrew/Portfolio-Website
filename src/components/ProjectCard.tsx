import { motion } from 'framer-motion';
import { Project } from '../data/projects';

interface ProjectCardProps {
  project: Project;
}

const ProjectCard = ({ project }: ProjectCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-gray-900/50 backdrop-blur-sm border border-white/10 rounded-xl overflow-hidden card-hover"
    >
      {/* Project Image */}
      <div className="relative h-48 bg-gradient-to-br from-primary-500/20 to-accent-500/20 flex items-center justify-center">
        <div className="text-6xl opacity-20">
          {project.isComingSoon ? '🚀' : '💻'}
        </div>
        {project.isComingSoon && (
          <div className="absolute top-4 right-4 bg-accent-500 text-white px-3 py-1 rounded-full text-sm font-medium">
            Coming Soon
          </div>
        )}
      </div>

      {/* Project Content */}
      <div className="p-6">
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

        {/* Tech Stack */}
        <div className="flex flex-wrap gap-2 mb-6">
          {project.techStack.map((tech) => (
            <span
              key={tech}
              className="px-3 py-1 bg-primary-500/10 text-primary-300 text-sm rounded-full border border-primary-500/20"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Action Buttons */}
        {!project.isComingSoon && (
          <div className="flex gap-3">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 px-4 py-2 bg-primary-500 hover:bg-primary-600 text-white text-center rounded-lg transition-colors duration-200 font-medium"
              >
                View Live
              </a>
            )}
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 px-4 py-2 border border-white/20 hover:bg-white/5 text-white text-center rounded-lg transition-colors duration-200 font-medium"
              >
                View Code
              </a>
            )}
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default ProjectCard;
