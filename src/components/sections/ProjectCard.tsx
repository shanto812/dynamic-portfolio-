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
    <Card className="overflow-hidden flex flex-col h-full bg-[#050505] border border-neutral-900/80 rounded-xl group transition-all duration-500 hover:border-[#FD1D1D]/30 p-4 relative select-none">
      
      {/* Subtle reflective tech accent borders on corner hover intersections */}
      <div className="absolute top-0 right-0 w-12 h-[1px] bg-gradient-to-r from-transparent to-neutral-800 group-hover:to-[#FCB045]/40 transition-colors duration-500" />
      <div className="absolute bottom-0 left-0 w-[1px] h-12 bg-gradient-to-b from-transparent to-neutral-800 group-hover:to-[#FD1D1D]/40 transition-colors duration-500" />

      {/* Project Image with Slimmer Aspect Ratio for Professional Alignment */}
      <div className="relative aspect-[16/9] max-h-40 w-full overflow-hidden rounded-lg bg-[#090909] border border-neutral-900/50 mb-4 shrink-0">
        <img
          src={project.imageUrl}
          alt={project.title}
          className="w-full h-full object-cover scale-100 group-hover:scale-103 transition-transform duration-700 ease-out"
        />
        
        {/* Luminescent dark ambient gradient overlay protection */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-60 group-hover:opacity-30 transition-opacity duration-500" />
        
        {/* Category Badge: Minimalist and professional monospace formatting layout */}
        <div className="absolute top-2.5 right-2.5 bg-black/80 backdrop-blur-md text-neutral-400 border border-neutral-800/80 px-2 py-0.5 rounded text-[9px] font-mono tracking-widest uppercase transition-all duration-300 group-hover:border-[#FCB045]/40 group-hover:text-white z-10">
          {project.sector}
        </div>
      </div>

      {/* Project Content Container - Flex Grow ensures proper layout distributions */}
      <div className="flex-1 flex flex-col justify-between">
        
        {/* Top Content: Title & Description */}
        <div>
          {/* Title and Dynamic Kinetic Line */}
          <div className="mb-2">
            <h3 className="text-sm font-bold text-neutral-200 group-hover:text-white transition-colors duration-300 mb-1.5 tracking-wide line-clamp-1">
              {project.title}
            </h3>
            {/* Signature Premium Gradient Split Line */}
            <div className="h-[2px] bg-gradient-to-r from-[#FD1D1D] to-[#FCB045] w-5 group-hover:w-full transition-all duration-700 ease-out rounded-full" />
          </div>

          {/* Description - Lower line clamp and min-height fixes vertical bloating */}
          <p className="text-neutral-400 text-xs mb-4 leading-relaxed font-normal line-clamp-2 min-h-[2.5rem]">
            {truncateString(project.shortDescription, 95)}
          </p>
        </div>

        {/* Bottom Content: Technologies & Action Links */}
        <div className="mt-auto">
          {/* Technologies with Clean Code-Tag Styling */}
          <div className="mb-4 flex flex-wrap gap-1 min-h-[24px] items-center">
            {project.technologies.slice(0, 3).map((tech, idx) => (
              <span
                key={tech}
                className="text-[9px] font-mono px-2 py-0.5 rounded bg-[#0a0a0a] border border-neutral-900 text-neutral-400 transition-all duration-300 group-hover:border-neutral-800 group-hover:text-neutral-300 whitespace-nowrap"
                style={{ transitionDelay: `${idx * 30}ms` }}
              >
                {tech}
              </span>
            ))}
            {project.technologies.length > 3 && (
              <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-[#110c08] border border-[#FCB045]/10 text-[#FCB045]/80 whitespace-nowrap">
                +{project.technologies.length - 3}
              </span>
            )}
          </div>

          {/* Links with Luxury Dual-Tone Interactions */}
          <div className="flex gap-2.5 pt-3 border-t border-neutral-900/60 font-mono text-[11px] shrink-0">
            
            {/* Live Demo Button */}
            <a
              href={project.liveLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-1.5 text-white py-2 rounded-lg font-bold tracking-wider relative overflow-hidden transition-all duration-500 hover:shadow-md hover:shadow-[#FD1D1D]/5 transform hover:-translate-y-0.5 active:translate-y-0"
              style={{
                background: 'linear-gradient(135deg, #FD1D1D, #FCB045)'
              }}
            >
              <ExternalLink size={12} />
              <span>LIVE</span>
            </a>

            {/* GitHub Code Button */}
            {project.codeLink && (
              <a
                href={project.codeLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-1.5 bg-[#090909] border border-neutral-800 text-neutral-400 hover:text-white hover:border-[#FCB045]/30 py-2 rounded-lg transition-all duration-300 font-bold tracking-wider group/btn transform hover:-translate-y-0.5 active:translate-y-0"
              >
                <Github size={12} className="group-hover/btn:rotate-6 transition-transform duration-300" />
                <span>CODE</span>
              </a>
            )}
          </div>
        </div>

      </div>
    </Card>
  );
};