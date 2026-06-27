import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/common';
import { ArrowRight, Download } from 'lucide-react';

export const HeroSection: React.FC = () => {
  return (
    <section className="min-h-screen bg-gradient-to-br from-primary via-slate-900 to-secondary flex items-center justify-center px-4 py-20 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute top-20 right-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-float"></div>
      <div className="absolute bottom-20 left-10 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }}></div>

      <div className="max-w-4xl mx-auto text-center relative z-10">
        {/* Main Heading */}
        <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 animate-fadeInUp leading-tight">
          Hi, I'm a Web <span className="gradient-text">Designer</span>
        </h1>

        {/* Subheading */}
        <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-2xl mx-auto animate-fadeInUp leading-relaxed" style={{ animationDelay: '0.2s' }}>
          I create <span className="text-accent font-semibold">beautiful</span>, <span className="text-cyan-400 font-semibold">modern</span>, and <span className="text-green-400 font-semibold">functional</span> web designs that help businesses connect with their audience and grow their brand.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12 animate-fadeInUp" style={{ animationDelay: '0.4s' }}>
          <Link to="/#portfolio">
            <Button variant="primary" size="lg" className="w-full sm:w-auto">
              View My Work
              <ArrowRight size={20} />
            </Button>
          </Link>
          <a href="/resume.pdf" download>
            <Button variant="secondary" size="lg" className="w-full sm:w-auto">
              Download Resume
              <Download size={20} />
            </Button>
          </a>
        </div>

        {/* Scroll indicator */}
        <div className="animate-bounce mt-12" style={{ animationDelay: '0.6s' }}>
          <svg className="w-6 h-6 mx-auto text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-8 pt-16 border-t border-gray-700/50 animate-fadeInUp" style={{ animationDelay: '0.6s' }}>
          <div className="group cursor-pointer transform hover:scale-110 transition-transform">
            <p className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-accent to-cyan-400 bg-clip-text text-transparent group-hover:from-cyan-400 group-hover:to-green-400">50+</p>
            <p className="text-gray-400 mt-2 text-sm md:text-base">Projects Completed</p>
          </div>
          <div className="group cursor-pointer transform hover:scale-110 transition-transform">
            <p className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent group-hover:from-blue-400 group-hover:to-purple-400">30+</p>
            <p className="text-gray-400 mt-2 text-sm md:text-base">Happy Clients</p>
          </div>
          <div className="group cursor-pointer transform hover:scale-110 transition-transform">
            <p className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent group-hover:from-purple-400 group-hover:to-pink-400">5+</p>
            <p className="text-gray-400 mt-2 text-sm md:text-base">Years Experience</p>
          </div>
        </div>
      </div>
    </section>
  );
};
