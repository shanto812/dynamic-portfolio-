import React from 'react';
import { SKILLS } from '@/constants/config';

export const AboutSection: React.FC = () => {
  return (
    <section id="about" className="section bg-gradient-to-b from-primary to-slate-900">
      <div className="container-custom">
        <h2 className="section-title text-center gradient-text">About Me</h2>

        <div className="grid md:grid-cols-2 gap-12 items-center mb-16 stagger">
          {/* About Content */}
          <div className="space-y-6 animate-fadeInUp">
            <p className="text-gray-300 text-lg leading-relaxed hover:text-gray-200 transition-colors">
              I'm a <span className="text-accent font-semibold">passionate web designer</span> with over 5 years of experience creating stunning digital experiences. My journey in web design started with a curiosity about how the web works, and it has evolved into a mission to help businesses succeed online through beautiful and functional design.
            </p>
            <p className="text-gray-300 text-lg leading-relaxed hover:text-gray-200 transition-colors">
              I specialize in creating <span className="text-cyan-400 font-semibold">responsive</span>, <span className="text-green-400 font-semibold">user-friendly</span> websites that not only look amazing but also <span className="text-yellow-400 font-semibold">drive results</span>. Whether it's an e-commerce platform, corporate website, or creative portfolio, I approach every project with attention to detail and a focus on the user experience.
            </p>
            <p className="text-gray-300 text-lg leading-relaxed hover:text-gray-200 transition-colors">
              When I'm not designing, you can find me exploring new design trends, contributing to open-source projects, or sharing my knowledge with the community.
            </p>
          </div>

          {/* Skills Grid */}
          <div className="space-y-8 animate-fadeInUp" style={{ animationDelay: '0.2s' }}>
            {/* Design Tools */}
            <div className="group p-6 rounded-lg bg-gradient-to-br from-blue-900/20 to-blue-800/10 border border-blue-700/30 hover:border-blue-500/60 hover:shadow-lg hover:shadow-blue-500/20 transition-all duration-300">
              <h3 className="text-xl font-bold text-blue-300 mb-4 group-hover:text-blue-200 transition-colors">🎨 Design Tools</h3>
              <div className="flex flex-wrap gap-2">
                {SKILLS.design.map((skill, idx) => (
                  <span
                    key={skill}
                    className="badge bg-blue-900/50 text-blue-300 hover:bg-blue-800 transform hover:scale-110 transition-all"
                    style={{ transitionDelay: `${idx * 30}ms` }}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Frontend Technologies */}
            <div className="group p-6 rounded-lg bg-gradient-to-br from-purple-900/20 to-purple-800/10 border border-purple-700/30 hover:border-purple-500/60 hover:shadow-lg hover:shadow-purple-500/20 transition-all duration-300">
              <h3 className="text-xl font-bold text-purple-300 mb-4 group-hover:text-purple-200 transition-colors">⚛️ Frontend</h3>
              <div className="flex flex-wrap gap-2">
                {SKILLS.frontend.map((skill, idx) => (
                  <span
                    key={skill}
                    className="badge bg-purple-900/50 text-purple-300 hover:bg-purple-800 transform hover:scale-110 transition-all"
                    style={{ transitionDelay: `${idx * 30}ms` }}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Backend Technologies */}
            <div className="group p-6 rounded-lg bg-gradient-to-br from-green-900/20 to-green-800/10 border border-green-700/30 hover:border-green-500/60 hover:shadow-lg hover:shadow-green-500/20 transition-all duration-300">
              <h3 className="text-xl font-bold text-green-300 mb-4 group-hover:text-green-200 transition-colors">🔧 Backend</h3>
              <div className="flex flex-wrap gap-2">
                {SKILLS.backend.map((skill, idx) => (
                  <span
                    key={skill}
                    className="badge bg-green-900/50 text-green-300 hover:bg-green-800 transform hover:scale-110 transition-all"
                    style={{ transitionDelay: `${idx * 30}ms` }}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Tools & Platforms */}
            <div className="group p-6 rounded-lg bg-gradient-to-br from-orange-900/20 to-orange-800/10 border border-orange-700/30 hover:border-orange-500/60 hover:shadow-lg hover:shadow-orange-500/20 transition-all duration-300">
              <h3 className="text-xl font-bold text-orange-300 mb-4 group-hover:text-orange-200 transition-colors">🚀 Tools & Platforms</h3>
              <div className="flex flex-wrap gap-2">
                {SKILLS.tools.map((skill, idx) => (
                  <span
                    key={skill}
                    className="badge bg-orange-900/50 text-orange-300 hover:bg-orange-800 transform hover:scale-110 transition-all"
                    style={{ transitionDelay: `${idx * 30}ms` }}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
