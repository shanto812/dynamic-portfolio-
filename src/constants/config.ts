// Site constants
export const SITE_NAME = 'Hasibul Hassan | Web Designer';
export const SITE_DESCRIPTION = 'Professional Web Designer & Developer Portfolio';
export const SITE_URL = (import.meta as any).env.PROD ? 'https://hasibul-hassan.vercel.app' : 'http://localhost:5173';

// Social links
export const SOCIAL_LINKS = {
  twitter: 'https://twitter.com',
  linkedin: 'https://linkedin.com',
  github: 'https://github.com/shanto812',
  instagram: 'https://instagram.com',
};

// Contact
export const CONTACT_EMAIL = 'hasibul@example.com';
export const WHATSAPP_NUMBER = '+8801234567890';

// Portfolio sectors
export const PORTFOLIO_SECTORS = [
  { id: 'all', name: 'All Projects', slug: 'all' },
  { id: 'ecommerce', name: 'E-Commerce', slug: 'ecommerce' },
  { id: 'corporate', name: 'Corporate', slug: 'corporate' },
  { id: 'landing', name: 'Landing Pages', slug: 'landing' },
  { id: 'blog', name: 'Blogs', slug: 'blog' },
  { id: 'creative', name: 'Creative', slug: 'creative' },
];

// Technologies/Skills with proficiency levels
export const SKILLS = {
  design: [
    { name: 'Figma', level: 90 },
    { name: 'Adobe XD', level: 85 },
    { name: 'Photoshop', level: 80 },
    { name: 'Illustrator', level: 75 },
  ],
  frontend: [
    { name: 'React', level: 92 },
    { name: 'TypeScript', level: 85 },
    { name: 'Tailwind CSS', level: 95 },
    { name: 'Next.js', level: 80 },
    { name: 'Vue.js', level: 70 },
  ],
  backend: [
    { name: 'Node.js', level: 82 },
    { name: 'Express', level: 78 },
    { name: 'PostgreSQL', level: 72 },
    { name: 'MongoDB', level: 75 },
  ],
  tools: [
    { name: 'Git & GitHub', level: 88 },
    { name: 'Vercel', level: 90 },
    { name: 'Supabase', level: 80 },
    { name: 'Firebase', level: 75 },
  ],
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
