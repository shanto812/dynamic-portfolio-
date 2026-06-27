export interface Project {
  id: string;
  title: string;
  description: string;
  shortDescription: string;
  sector: string;
  imageUrl: string;
  liveLink: string;
  codeLink?: string;
  technologies: string[];
  createdAt: string;
  updatedAt: string;
}

export interface ProjectFormData {
  title: string;
  description: string;
  shortDescription: string;
  sector: string;
  liveLink: string;
  codeLink?: string;
  technologies: string[];
  image?: File;
}

export interface Sector {
  id: string;
  name: string;
  slug: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface User {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  role: 'user' | 'admin';
}

export interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  signup: (email: string, password: string) => Promise<void>;
}

export interface ProjectsContextType {
  projects: Project[];
  loading: boolean;
  error: string | null;
  fetchProjects: () => Promise<void>;
  addProject: (projectData: ProjectFormData) => Promise<void>;
  updateProject: (id: string, projectData: ProjectFormData) => Promise<void>;
  deleteProject: (id: string) => Promise<void>;
}
