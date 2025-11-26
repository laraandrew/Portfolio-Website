export interface Project {
  id: string;
  name: string;
  shortDescription: string;
  roleOrType: string;
  techStack: string[];
  thumbnail: string;
  liveUrl?: string;
  githubUrl?: string;
  isComingSoon?: boolean;
}

export const projects: Project[] = [
  {
    id: 'habit-battles',
    name: 'Habit Battles',
    shortDescription: 'A habit-tracking "battle" app where users log daily actions and compete on consistency, built with a full MERN stack backend focus.',
    roleOrType: 'Solo project',
    techStack: ['React', 'Node.js', 'Express', 'MongoDB', 'Mongoose', 'Tailwind CSS', 'AWS'],
    thumbnail: '/images/habit-battles.jpg',
    liveUrl: 'https://habit-battles.com',
    githubUrl: 'https://github.com/andrew/habit-battles'
  },
  {
    id: 'scla-dashboard',
    name: 'SCLA Dashboard',
    shortDescription: 'An internal dashboard for a classic car dealership to track inventory, pricing, and operations, replacing spreadsheets with a modern web UI.',
    roleOrType: 'Frontend Developer',
    techStack: ['React', 'TypeScript', 'Chart.js', 'Tailwind CSS', 'REST APIs'],
    thumbnail: '/images/scla-dashboard.jpg',
    liveUrl: 'https://scla-dashboard.com'
  },
  {
    id: 'commonwheel',
    name: 'CommonWheel',
    shortDescription: 'Led product and front-end efforts for a platform aimed at increasing collaboration and accountability across teams, setting deadlines and workflows.',
    roleOrType: 'Product Manager / Developer',
    techStack: ['React', 'TypeScript', 'Figma', 'Node.js', 'PostgreSQL'],
    thumbnail: '/images/commonwheel.jpg',
    liveUrl: 'https://commonwheel.com'
  },
  {
    id: 'nato-project',
    name: 'NATO Project',
    shortDescription: 'Academic/political-tech project related to NATO, exploring policy, governance, and structured information presentation through software.',
    roleOrType: 'Research & Development',
    techStack: ['React', 'D3.js', 'Python', 'Data Visualization', 'Government APIs'],
    thumbnail: '/images/nato-project.jpg'
  },
  {
    id: 'repme',
    name: 'RepMe – Accountability & Civic Engagement App',
    shortDescription: 'A mobile-first app that helps people understand bills, track how representatives vote, and stay informed about elections — designed to give regular people a voice without needing lobbying money.',
    roleOrType: 'Lead Developer',
    techStack: ['React Native', 'React', 'Node.js', 'Government APIs', 'MongoDB', 'Civic Tech'],
    thumbnail: '/images/repme.jpg',
    liveUrl: 'https://repme.app',
    githubUrl: 'https://github.com/andrew/repme'
  },
  {
    id: 'coming-soon-1',
    name: 'AI Health Assistant',
    shortDescription: 'New AI-driven health tracking and recommendation system in progress — focused on making personalized wellness accessible to everyone.',
    roleOrType: 'Coming Soon',
    techStack: ['AI/ML', 'React', 'Python', 'Health APIs'],
    thumbnail: '/images/coming-soon.jpg',
    isComingSoon: true
  },
  {
    id: 'coming-soon-2',
    name: 'Education Automation Platform',
    shortDescription: 'Automation tools for educators and students in progress — designed to remove barriers to quality education and learning resources.',
    roleOrType: 'Coming Soon',
    techStack: ['Automation', 'React', 'Node.js', 'Education Tech'],
    thumbnail: '/images/coming-soon.jpg',
    isComingSoon: true
  },
  {
    id: 'coming-soon-3',
    name: 'Financial Freedom Tools',
    shortDescription: 'Personal finance and investment tracking tools in development — helping regular people build wealth and financial literacy.',
    roleOrType: 'Coming Soon',
    techStack: ['FinTech', 'React', 'Financial APIs', 'Data Analytics'],
    thumbnail: '/images/coming-soon.jpg',
    isComingSoon: true
  }
];

export const techCategories = [
  'All',
  'Frontend',
  'Backend', 
  'Full Stack',
  'Civic Tech',
  'AI/ML',
  'Coming Soon'
];
