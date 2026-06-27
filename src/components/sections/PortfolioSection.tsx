import React, { useState } from 'react';
import { useProjects } from '@/context/ProjectsContext';
import { PORTFOLIO_SECTORS } from '@/constants/config';
import { ProjectCard } from './ProjectCard';
import { LoadingSpinner } from '@/components/common';

export const PortfolioSection: React.FC = () => {
  const { projects, loading } = useProjects();
  const [selectedSector, setSelectedSector] = useState('all');

  const filteredProjects =
    selectedSector === 'all'
      ? projects
      : projects.filter((project) => project.sector === selectedSector);

  return (
    <section id="portfolio" className="section bg-gradient-to-b from-slate-900 to-primary">
      <div className="container-custom">
        <h2 className="section-title text-center gradient-text">My Portfolio</h2>

        {/* Sector Filter */}
        <div className="flex justify-center flex-wrap gap-3 mb-16 stagger">
          {PORTFOLIO_SECTORS.map((sector, idx) => (
            <button
              key={sector.id}
              onClick={() => setSelectedSector(sector.slug)}
              className={`px-6 py-2.5 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 relative overflow-hidden group ${
                selectedSector === sector.slug
                  ? 'bg-gradient-to-r from-accent to-cyan-500 text-primary shadow-lg shadow-accent/50 scale-105'
                  : 'bg-gradient-to-br from-secondary to-slate-900 text-gray-300 hover:text-accent border border-gray-700 hover:border-accent/50 hover:shadow-lg hover:shadow-accent/20'
              }`}
              style={{ transitionDelay: `${idx * 50}ms` }}
            >
              <span className="relative z-10">{sector.name}</span>
              {selectedSector !== sector.slug && (
                <div className="absolute inset-0 bg-gradient-to-r from-accent/0 to-accent/10 translate-x-full group-hover:translate-x-0 transition-transform duration-500"></div>
              )}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        {loading ? (
          <div className="flex justify-center items-center min-h-96">
            <LoadingSpinner message="Loading projects..." />
          </div>
        ) : filteredProjects.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 stagger">
            {filteredProjects.map((project, idx) => (
              <div key={project.id} style={{ animationDelay: `${idx * 50}ms` }}>
                <ProjectCard project={project} />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 animate-fadeInUp">
            <div className="inline-block p-8 rounded-lg bg-gradient-to-br from-secondary to-slate-900 border border-gray-700/50">
              <p className="text-gray-400 text-lg mb-2">No projects found in this category.</p>
              <p className="text-gray-500 text-sm">Try selecting a different category or check back soon!</p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
