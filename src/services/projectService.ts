import { supabase } from './supabaseClient';
import type { Project, ProjectFormData } from '@/types';

export const projectService = {
  // Fetch all projects
  fetchProjects: async (): Promise<Project[]> => {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return (data || []).map(project => ({
      id: project.id,
      title: project.title,
      description: project.description,
      shortDescription: project.short_description,
      sector: project.sector,
      imageUrl: project.image_url,
      liveLink: project.live_link,
      codeLink: project.code_link,
      technologies: project.technologies || [],
      createdAt: project.created_at,
      updatedAt: project.updated_at,
    }));
  },

  // Fetch projects by sector
  fetchProjectsBySector: async (sector: string): Promise<Project[]> => {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .eq('sector', sector)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return (data || []).map(project => ({
      id: project.id,
      title: project.title,
      description: project.description,
      shortDescription: project.short_description,
      sector: project.sector,
      imageUrl: project.image_url,
      liveLink: project.live_link,
      codeLink: project.code_link,
      technologies: project.technologies || [],
      createdAt: project.created_at,
      updatedAt: project.updated_at,
    }));
  },

  // Fetch single project
  fetchProject: async (id: string): Promise<Project> => {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;
    return {
      id: data.id,
      title: data.title,
      description: data.description,
      shortDescription: data.short_description,
      sector: data.sector,
      imageUrl: data.image_url,
      liveLink: data.live_link,
      codeLink: data.code_link,
      technologies: data.technologies || [],
      createdAt: data.created_at,
      updatedAt: data.updated_at,
    };
  },

  // Upload project image
  uploadProjectImage: async (file: File, projectId: string): Promise<string> => {
    const fileExt = file.name.split('.').pop();
    const fileName = `${projectId}-${Date.now()}.${fileExt}`;
    const filePath = `projects/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from('projects')
      .upload(filePath, file);

    if (uploadError) throw uploadError;

    const { data } = supabase.storage
      .from('projects')
      .getPublicUrl(filePath);

    return data.publicUrl;
  },

  // Create project
  createProject: async (projectData: ProjectFormData): Promise<Project> => {
    let imageUrl = '';

    if (projectData.image) {
      const tempId = `temp-${Date.now()}`;
      imageUrl = await projectService.uploadProjectImage(projectData.image, tempId);
    }

    const { data, error } = await supabase
      .from('projects')
      .insert([
        {
          title: projectData.title,
          description: projectData.description,
          short_description: projectData.shortDescription,
          sector: projectData.sector,
          image_url: imageUrl,
          live_link: projectData.liveLink,
          code_link: projectData.codeLink || null,
          technologies: projectData.technologies,
        },
      ])
      .select()
      .single();

    if (error) throw error;
    return {
      id: data.id,
      title: data.title,
      description: data.description,
      shortDescription: data.short_description,
      sector: data.sector,
      imageUrl: data.image_url,
      liveLink: data.live_link,
      codeLink: data.code_link,
      technologies: data.technologies || [],
      createdAt: data.created_at,
      updatedAt: data.updated_at,
    };
  },

  // Update project
  updateProject: async (id: string, projectData: ProjectFormData): Promise<Project> => {
    let imageUrl = projectData.liveLink; // Using liveLink as placeholder since we don't have current image URL here

    if (projectData.image) {
      imageUrl = await projectService.uploadProjectImage(projectData.image, id);
    }

    const { data, error } = await supabase
      .from('projects')
      .update({
        title: projectData.title,
        description: projectData.description,
        short_description: projectData.shortDescription,
        sector: projectData.sector,
        ...(imageUrl && { image_url: imageUrl }),
        live_link: projectData.liveLink,
        code_link: projectData.codeLink || null,
        technologies: projectData.technologies,
        updated_at: new Date().toISOString(),
      })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return {
      id: data.id,
      title: data.title,
      description: data.description,
      shortDescription: data.short_description,
      sector: data.sector,
      imageUrl: data.image_url,
      liveLink: data.live_link,
      codeLink: data.code_link,
      technologies: data.technologies || [],
      createdAt: data.created_at,
      updatedAt: data.updated_at,
    };
  },

  // Delete project
  deleteProject: async (id: string): Promise<void> => {
    const { error } = await supabase
      .from('projects')
      .delete()
      .eq('id', id);

    if (error) throw error;
  },

  // Get sectors
  fetchSectors: async (): Promise<string[]> => {
    const { data, error } = await supabase
      .from('projects')
      .select('sector');

    if (error) throw error;
    const sectors = (data || []).map((item: any) => item.sector).filter(Boolean);
    return Array.from(new Set(sectors)); // Return unique sectors
  },
};
