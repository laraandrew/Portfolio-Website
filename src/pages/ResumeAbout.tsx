import { motion } from 'framer-motion';
import { Download } from 'lucide-react';

const ResumeAbout = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6
      }
    }
  };

  // Reordered with most recent first
  const experiences = [
    {
      role: 'Technical Operations Manager',
      company: 'SportscarLA',
      period: 'Jun 2025 – Present',
      bullets: [
        'Performed ongoing software updates and modifications to internal systems, improving reliability of pricing workflows by 30%.',
        'Automated 5+ workflows (sticker gen, cross-platform listings, reply templates) cutting per-vehicle admin steps and improving time-to-list by 67% (Python/Sheets + SOPs).',
        'Collaborated with operations to align tooling updates with dealership processes and growth goals.'
      ]
    },
    {
      role: 'Instructor - Robotics & Coding',
      company: 'Keep Youth Doing Something (KYDS)',
      period: 'Oct 2024 – May 2025',
      bullets: [
        'Delivered 50+ labs on software logic, debugging, and iterative system refinement, increasing engagement by 19%.',
        'Guided students through identifying and debugging software issues, testing software behavior, and refining system logic through iterative development.',
        'Created supportive learning environments that connected coding concepts to real-world applications.'
      ]
    },
    {
      role: 'Research Software Engineer',
      company: 'North Atlantic Treaty Organization (NATO)',
      period: 'Aug 2021 – May 2024',
      bullets: [
        'Created technical models and diagrams (API flows, schema maps, data pipelines) used by developers during system updates and long-term maintenance.',
        'Implemented validation scripts and CI checks to enforce API/ETL spec compliance and automate software updates.',
        'Researched, analyzed, and documented software system behaviors for multinational engineering teams; produced API, schema, and data-pipeline documentation for long-term maintenance.'
      ]
    },
    {
      role: 'Software Engineer/PM',
      company: 'CommonWheel',
      period: 'Feb 2023 – May 2023',
      bullets: [
        'Analyzed user and business needs and translated them into technical specs, models, and acceptance criteria for app development.',
        'Maintained documentation and decision logs supporting future system updates, debugging, and long-term maintainability.',
        'Participated in SDLC planning, prioritization, and refinement to ensure changes met functionality, reliability, and security needs.'
      ]
    }
  ];

  const skills = {
    'Languages': ['JavaScript', 'TypeScript', 'Python', 'Java', 'C++'],
    'Frontend': ['React', 'Next.js', 'Tailwind CSS', 'Framer Motion', 'HTML/CSS'],
    'Backend': ['Node.js', 'Express', 'MongoDB', 'Mongoose', 'PostgreSQL'],
    'DevOps / Tools': ['Git', 'GitHub', 'AWS (basic)', 'Vercel', 'Render', 'Docker'],
    'Other': ['Figma', 'Photography', 'Teaching/Instruction', 'Product Management']
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen pt-24 pb-20 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-4xl mx-auto">
        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold text-white mb-6">
            Resume & About Me
          </h1>
          
          {/* Download Resume Button */}
          <motion.a
            href="/assets/Andrew_Lara_Resume.pdf"
            download
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white font-semibold rounded-lg transition-all duration-300 shadow-lg shadow-teal-500/25"
          >
            <Download size={20} />
            Download Resume
          </motion.a>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-16"
        >
          {/* About Me Section */}
          <motion.section variants={itemVariants}>
            <h2 className="text-3xl font-display font-bold text-white mb-8">About Me</h2>
            <div className="bg-gray-900/50 backdrop-blur-sm border border-white/10 rounded-xl p-8">
              <div className="prose prose-lg prose-invert max-w-none">
                <p className="text-gray-300 leading-relaxed mb-6">
                  I was born and raised in Los Angeles to immigrant parents, and that experience shapes everything I build. 
                  I crossed the country to attend college, studied computer science and government, and came back home 
                  determined to use software to expand opportunity for people who never had it.
                </p>
                <p className="text-gray-300 leading-relaxed mb-6">
                  A lot of people sacrificed for me to be here. Because of that, I'm obsessed with building tools that 
                  remove barriers: helping people become healthier without needing expensive trainers, helping communities 
                  understand and influence their government without millions of dollars in lobbying, and making it easier 
                  for regular people to learn, grow, and win.
                </p>
                <div className="bg-teal-500/10 border-l-4 border-teal-500 pl-6 py-4 rounded-r-lg">
                  <p className="text-gray-200 leading-relaxed italic">
                    Whether it's a habit-tracking app, a civic engagement platform like RepMe, or internal dashboards 
                    that unlock small business efficiency, my work is guided by the same goal: use my skills as a software 
                    engineer to push society higher — especially the community I come from.
                  </p>
                </div>
              </div>
            </div>
          </motion.section>

          {/* Experience Section */}
          <motion.section variants={itemVariants}>
            <h2 className="text-3xl font-display font-bold text-white mb-8">Experience</h2>
            <div className="space-y-6">
              {experiences.map((exp) => (
                <motion.div
                  key={exp.company}
                  variants={itemVariants}
                  className="bg-gray-900/50 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:border-teal-500/30 transition-all duration-300"
                >
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-4 gap-4">
                    <div className="flex-1">
                      {/* Position title - now larger and primary */}
                      <h3 className="text-2xl sm:text-3xl font-display font-bold text-white mb-2">
                        {exp.role}
                      </h3>
                      {/* Company name - now secondary */}
                      <p className="text-lg text-teal-400 font-semibold">{exp.company}</p>
                    </div>
                    <span className="text-gray-400 text-sm whitespace-nowrap">{exp.period}</span>
                  </div>
                  <ul className="space-y-2">
                    {exp.bullets.map((bullet, bulletIndex) => (
                      <li key={bulletIndex} className="text-gray-300 leading-relaxed flex items-start">
                        <span className="text-teal-400 mr-3 mt-1 flex-shrink-0">•</span>
                        {bullet}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* Skills Section */}
          <motion.section variants={itemVariants}>
            <h2 className="text-3xl font-display font-bold text-white mb-8">Skills & Tools</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {Object.entries(skills).map(([category, skillList]) => (
                <motion.div
                  key={category}
                  variants={itemVariants}
                  className="bg-gray-900/50 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:border-teal-500/30 transition-all duration-300"
                >
                  <h3 className="text-lg font-display font-semibold text-white mb-4">
                    {category}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {skillList.map((skill) => (
                      <span
                        key={skill}
                        className="px-3 py-1 bg-teal-500/10 text-teal-300 text-sm rounded-full border border-teal-500/20 hover:bg-teal-500/20 transition-colors duration-300"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* Education Section */}
          <motion.section variants={itemVariants}>
            <h2 className="text-3xl font-display font-bold text-white mb-8">Education</h2>
            <div className="bg-gray-900/50 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:border-teal-500/30 transition-all duration-300">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-4 gap-4">
                <div className="flex-1">
                  <h3 className="text-xl font-display font-semibold text-white">
                    Franklin & Marshall College
                  </h3>
                  <p className="text-lg text-teal-400 font-semibold">Bachelor's Degree</p>
                </div>
                <span className="text-gray-400 text-sm whitespace-nowrap">2018 – 2022</span>
              </div>
              <ul className="space-y-2">
                <li className="text-gray-300 leading-relaxed flex items-start">
                  <span className="text-teal-400 mr-3 mt-1 flex-shrink-0">•</span>
                  Double Major: Computer Science & Government
                </li>
                <li className="text-gray-300 leading-relaxed flex items-start">
                  <span className="text-teal-400 mr-3 mt-1 flex-shrink-0">•</span>
                  Active in student leadership and technology organizations
                </li>
                <li className="text-gray-300 leading-relaxed flex items-start">
                  <span className="text-teal-400 mr-3 mt-1 flex-shrink-0">•</span>
                  Focused on intersection of technology and public policy
                </li>
              </ul>
            </div>
          </motion.section>

          {/* Contact CTA */}
          <motion.section variants={itemVariants}>
            <div className="text-center p-8 bg-gradient-to-r from-teal-500/10 to-purple-500/10 rounded-2xl border border-teal-500/20">
              <h2 className="text-2xl font-display font-bold text-white mb-4">
                Let's Connect
              </h2>
              <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
                I'm always interested in discussing new opportunities, innovative projects, and ways to use technology for positive social impact.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="mailto:andrewlara2002@gmail.com"
                  className="inline-flex items-center px-6 py-3 bg-teal-500 hover:bg-teal-600 text-white font-semibold rounded-lg transition-colors duration-200"
                >
                  Send Email
                </a>
                <a
                  href="https://linkedin.com/in/laraandrew"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-6 py-3 border border-white/20 hover:bg-white/5 text-white font-semibold rounded-lg transition-colors duration-200"
                >
                  LinkedIn Profile
                </a>
              </div>
            </div>
          </motion.section>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ResumeAbout;
