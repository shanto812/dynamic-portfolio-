// Site constants
export const SITE_NAME = 'Portfolio';
export const SITE_DESCRIPTION = 'Professional Web Designer Portfolio';
export const SITE_URL = (import.meta as any).env.PROD ? 'https://yourportfolio.com' : 'http://localhost:3000';

// Social links
export const SOCIAL_LINKS = {
  twitter: 'https://twitter.com',
  linkedin: 'https://linkedin.com',
  github: 'https://github.com',
  instagram: 'https://instagram.com',
};

// Contact
export const CONTACT_EMAIL = 'your-email@example.com';
export const WHATSAPP_NUMBER = '+1234567890'; // Replace with your WhatsApp number

// Portfolio sectors
export const PORTFOLIO_SECTORS = [
  { id: 'all', name: 'All Projects', slug: 'all' },
  { id: 'ecommerce', name: 'E-Commerce', slug: 'ecommerce' },
  { id: 'corporate', name: 'Corporate', slug: 'corporate' },
  { id: 'landing', name: 'Landing Pages', slug: 'landing' },
  { id: 'blog', name: 'Blogs', slug: 'blog' },
  { id: 'creative', name: 'Creative', slug: 'creative' },
];

// Technologies/Skills
export const SKILLS = {
  design: ['Figma', 'Adobe XD', 'Photoshop', 'Illustrator'],
  frontend: ['React', 'TypeScript', 'Tailwind CSS', 'Next.js', 'Vue.js'],
  backend: ['Node.js', 'Express', 'PostgreSQL', 'MongoDB'],
  tools: ['Vercel', 'GitHub', 'Supabase', 'Firebase'],
};

// Form validation
export const VALIDATION_RULES = {
  nameMinLength: 2,
  nameMaxLength: 50,
  emailMaxLength: 100,
  messageMinLength: 10,
  messageMaxLength: 2000,
  projectTitleMaxLength: 100,
  projectDescriptionMaxLength: 5000,
};

// API endpoints
export const API_ENDPOINTS = {
  projects: '/api/projects',
  projectDetail: '/api/projects/:id',
  sendEmail: '/api/send-email',
  uploadImage: '/api/upload',
};

// Image constants
export const IMAGE_CONSTRAINTS = {
  maxSize: 5 * 1024 * 1024, // 5MB
  acceptedFormats: ['image/jpeg', 'image/png', 'image/webp'],
  acceptedExtensions: ['.jpg', '.jpeg', '.png', '.webp'],
};

// Animation timings
export const ANIMATION_DURATION = {
  short: 300,
  medium: 500,
  long: 800,
};

// Breakpoints
export const BREAKPOINTS = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
};
