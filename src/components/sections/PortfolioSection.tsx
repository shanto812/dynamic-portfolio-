import React, { useState } from 'react';
import { useProjects } from '@/context/ProjectsContext';
import { PORTFOLIO_SECTORS } from '@/constants/config';
import { ProjectCard } from './ProjectCard';
import { LoadingSpinner } from '@/components/common';
import { useScrollReveal } from '@/hooks';
import { Layers } from 'lucide-react';

export const PortfolioSection: React.FC = () => {
  const { projects, loading } = useProjects();
  const [selectedSector, setSelectedSector] = useState('all');
  const { ref, isVisible } = useScrollReveal();

  const filteredProjects =
    selectedSector === 'all'
      ? projects
      : projects.filter((project) => project.sector === selectedSector);

  return (
    <section id="portfolio" className="section relative">
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900/50 via-primary to-slate-900/50" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-accent/3 rounded-full blur-[200px]" />

      <div className="container-custom relative z-10">
        <div ref={ref} className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest text-cyan-400 bg-cyan-500/10 border border-cyan-500/20 mb-6">
            <Layers size={14} />
            Portfolio
          </span>
          <h2 className="section-title gradient-text">Featured Projects</h2>
          <p className="section-subtitle">
            A showcase of my best work across different industries and technologies
          </p>
        </div>

        <div className={`flex justify-center flex-wrap gap-3 mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} style={{ transitionDelay: '200ms' }}>
          {PORTFOLIO_SECTORS.map((sector) => (
            <button
              key={sector.id}
              onClick={() => setSelectedSector(sector.slug)}
              className={`px-5 py-2.5 rounded-xl font-medium text-sm transition-all duration-500 transform hover:scale-105 relative overflow-hidden group ${
                selectedSector === sector.slug
                  ? 'bg-gradient-to-r from-accent to-cyan-500 text-white shadow-lg shadow-accent/30'
                  : 'bg-white/5 text-gray-400 hover:text-white border border-white/10 hover:border-accent/30 hover:bg-white/10'
              }`}
            >
              <span className="relative z-10">{sector.name}</span>
              {selectedSector !== sector.slug && (
                <div className="absolute inset-0 bg-gradient-to-r from-accent/0 via-accent/5 to-accent/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
              )}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="flex justify-center items-center min-h-96">
            <LoadingSpinner message="Loading projects..." />
          </div>
        ) : filteredProjects.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project, idx) => (
              <div
                key={project.id}
                className={`transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                style={{ transitionDelay: `${300 + idx * 100}ms` }}
              >
                <ProjectCard project={project} />
              </div>
            ))}
          </div>
        ) : (
          <div className={`text-center py-20 transition-all duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
            <div className="inline-block p-10 rounded-3xl glass-card">
              <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-accent/10 flex items-center justify-center">
                <Layers size={28} className="text-accent/50" />
              </div>
              <p className="text-gray-400 text-lg mb-2">No projects in this category yet.</p>
              <p className="text-gray-500 text-sm">Check back soon or explore other categories!</p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
