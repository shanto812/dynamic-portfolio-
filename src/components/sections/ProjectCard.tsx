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
    <Card className="overflow-hidden flex flex-col h-full bg-[#050505] border border-neutral-900/80 rounded-2xl group transition-all duration-500 hover:border-[#FD1D1D]/30 p-4 relative">
      
      {/* কোণায় সূক্ষ্ম রিফ্লেক্টিভ টেক অ্যাকসেন্ট */}
      <div className="absolute top-0 right-0 w-12 h-[1px] bg-gradient-to-r from-transparent to-neutral-800 group-hover:to-[#FCB045]/40 transition-colors duration-500" />
      <div className="absolute bottom-0 left-0 w-[1px] h-12 bg-gradient-to-b from-transparent to-neutral-800 group-hover:to-[#FD1D1D]/40 transition-colors duration-500" />

      {/* Project Image with Cinematic Scale */}
      <div className="relative h-48 overflow-hidden rounded-xl bg-[#090909] border border-neutral-900/50 mb-5">
        <img
          src={project.imageUrl}
          alt={project.title}
          className="w-full h-full object-cover scale-100 group-hover:scale-105 transition-transform duration-700 ease-out"
        />
        
        {/* লুমিনেসেন্ট ডার্ক গ্রেডিয়েন্ট ওভারলে */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/10 to-transparent opacity-70 group-hover:opacity-40 transition-opacity duration-500" />
        
        {/* ক্যাটাগরি ব্যাজ: মিনিমালিস্ট ও প্রফেশনাল মোনোস্পেস লুক */}
        <div className="absolute top-3 right-3 bg-black/80 backdrop-blur-md text-neutral-400 border border-neutral-800/80 px-2.5 py-1 rounded-md text-[10px] font-mono tracking-widest uppercase transition-all duration-300 group-hover:border-[#FCB045]/40 group-hover:text-white">
          {project.sector}
        </div>
      </div>

      {/* Project Content */}
      <div className="flex-1 flex flex-col">
        
        {/* Title and Dynamic Kinetic Line */}
        <div className="mb-4">
          <h3 className="text-base font-bold text-neutral-200 group-hover:text-white transition-colors duration-300 mb-2 tracking-wide">
            {project.title}
          </h3>
          {/* সিগনেচার প্রিমিয়াম গ্রাডিয়েন্ট স্প্লিট লাইন */}
          <div className="h-[2px] bg-gradient-to-r from-[#FD1D1D] to-[#FCB045] w-6 group-hover:w-full transition-all duration-700 ease-out rounded-full" />
        </div>

        {/* Description */}
        <p className="text-neutral-400 text-xs md:text-sm mb-5 flex-1 leading-relaxed font-normal">
          {truncateString(project.shortDescription, 100)}
        </p>

        {/* Technologies with Clean Code-Tag Styling */}
        <div className="mb-6 flex flex-wrap gap-1.5">
          {project.technologies.slice(0, 3).map((tech, idx) => (
            <span
              key={tech}
              className="text-[10px] font-mono px-2.5 py-1 rounded-md bg-[#0a0a0a] border border-neutral-900 text-neutral-400 transition-all duration-300 group-hover:border-neutral-800 group-hover:text-neutral-300"
              style={{ transitionDelay: `${idx * 40}ms` }}
            >
              {tech}
            </span>
          ))}
          {project.technologies.length > 3 && (
            <span className="text-[10px] font-mono px-2 py-1 rounded-md bg-[#110c08] border border-[#FCB045]/10 text-[#FCB045]/80">
              +{project.technologies.length - 3}
            </span>
          )}
        </div>

        {/* Links with Luxury Dual-Tone Interactions */}
        <div className="flex gap-3 pt-4 border-t border-neutral-900/60 font-mono text-xs">
          
          {/* Live Demo Button: নিখুঁত ব্র্যান্ড গ্রাডিয়েন্ট */}
          <a
            href={project.liveLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-2 text-white py-2.5 rounded-xl font-bold tracking-wider relative overflow-hidden transition-all duration-500 hover:shadow-lg hover:shadow-[#FD1D1D]/10 transform hover:-translate-y-0.5 active:translate-y-0"
            style={{
              background: 'linear-gradient(135deg, #FD1D1D, #FCB045)'
            }}
          >
            <ExternalLink size={13} />
            <span>LIVE_DEMO</span>
          </a>

          {/* GitHub Code Button */}
          {project.codeLink && (
            <a
              href={project.codeLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-2 bg-[#090909] border border-neutral-800 text-neutral-400 hover:text-white hover:border-[#FCB045]/30 py-2.5 rounded-xl transition-all duration-300 font-bold tracking-wider group/btn transform hover:-translate-y-0.5 active:translate-y-0"
            >
              <Github size={13} className="group-hover/btn:rotate-6 transition-transform duration-300" />
              <span>REPOSITORY</span>
            </a>
          )}
        </div>
      </div>
    </Card>
  );
};