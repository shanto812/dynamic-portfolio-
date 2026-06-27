import React from 'react';
import { Card } from '@/components/common';
import { ExternalLink, Github } from 'lucide-react';
import { truncateString } from '@/utils/helpers';
import type { Project } from '@/types';

interface ProjectCardProps {
  project: Project;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  return (
    <Card hoverable className="overflow-hidden flex flex-col h-full group">
      {/* Project Image with overlay */}
      <div className="relative h-48 overflow-hidden bg-gradient-to-br from-gray-900 to-gray-800 mb-4">
        <img
          src={project.imageUrl}
          alt={project.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        {/* Category badge */}
        <div className="absolute top-3 right-3 bg-accent/90 backdrop-blur-sm text-primary px-3 py-1 rounded-full text-xs font-bold transform -translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
          {project.sector}
        </div>
      </div>

      {/* Project Content */}
      <div className="flex-1 flex flex-col">
        {/* Title and Category */}
        <div className="mb-3">
          <h3 className="text-lg font-bold text-white group-hover:text-accent transition-colors duration-300 mb-2">{project.title}</h3>
          <div className="h-1 w-12 bg-gradient-to-r from-accent to-cyan-400 rounded-full group-hover:w-full transition-all duration-500"></div>
        </div>

        {/* Description */}
        <p className="text-gray-300 text-sm mb-4 flex-1 leading-relaxed">
          {truncateString(project.shortDescription, 100)}
        </p>

        {/* Technologies with stagger animation */}
        <div className="mb-4 flex flex-wrap gap-2">
          {project.technologies.slice(0, 3).map((tech, idx) => (
            <span
              key={tech}
              className="badge bg-gradient-to-r from-blue-900 to-blue-800 text-blue-300 transform group-hover:scale-105 transition-transform"
              style={{ transitionDelay: `${idx * 50}ms` }}
            >
              {tech}
            </span>
          ))}
          {project.technologies.length > 3 && (
            <span className="badge bg-gradient-to-r from-purple-900 to-purple-800 text-purple-300">
              +{project.technologies.length - 3}
            </span>
          )}
        </div>

        {/* Links */}
        <div className="flex gap-3 pt-4 border-t border-gray-700/50 stagger">
          <a
            href={project.liveLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-accent to-cyan-500 hover:from-cyan-600 hover:to-blue-600 text-primary py-2 rounded-lg transition-all duration-300 font-semibold text-sm group/link hover:shadow-lg hover:shadow-accent/50 transform hover:-translate-y-0.5"
          >
            <ExternalLink size={16} />
            Live Demo
          </a>
          {project.codeLink && (
            <a
              href={project.codeLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-br from-secondary to-slate-900 border border-accent/30 hover:border-accent text-gray-300 hover:text-accent py-2 rounded-lg transition-all duration-300 font-semibold text-sm group/link hover:shadow-lg hover:shadow-accent/30 transform hover:-translate-y-0.5"
            >
              <Github size={16} />
              Code
            </a>
          )}
        </div>
      </div>
    </Card>
  );
};
