import React from 'react';
import { SKILLS } from '@/constants/config';
import { useScrollReveal } from '@/hooks';
import { User, Award, Briefcase, Heart } from 'lucide-react';

interface SkillItem {
  name: string;
  level: number;
}

const SkillBar: React.FC<{ skill: SkillItem; index: number; isVisible: boolean }> = ({ skill, index, isVisible }) => (
  <div className="group">
    <div className="flex justify-between items-center mb-2">
      <span className="text-sm font-medium text-gray-300 group-hover:text-white transition-colors">{skill.name}</span>
      <span className="text-xs font-bold text-accent/70">{skill.level}%</span>
    </div>
    <div className="skill-bar">
      <div
        className="skill-bar-fill"
        style={{
          width: isVisible ? `${skill.level}%` : '0%',
          transitionDelay: `${index * 100}ms`,
        }}
      />
    </div>
  </div>
);

const SkillCategory: React.FC<{
  title: string;
  emoji: string;
  skills: SkillItem[];
  color: string;
  borderColor: string;
  isVisible: boolean;
}> = ({ title, emoji, skills, color, borderColor, isVisible }) => (
  <div className={`group p-6 rounded-2xl bg-gradient-to-br ${color} border ${borderColor} hover:border-accent/40 hover:shadow-xl hover:shadow-accent/10 transition-all duration-500 hover:-translate-y-1`}>
    <h3 className="text-lg font-bold text-white mb-5 flex items-center gap-2">
      <span className="text-2xl">{emoji}</span>
      {title}
    </h3>
    <div className="space-y-4">
      {skills.map((skill, idx) => (
        <SkillBar key={skill.name} skill={skill} index={idx} isVisible={isVisible} />
      ))}
    </div>
  </div>
);

export const AboutSection: React.FC = () => {
  const { ref: aboutRef, isVisible: aboutVisible } = useScrollReveal();
  const { ref: skillsRef, isVisible: skillsVisible } = useScrollReveal(0.1);

  const timelineItems = [
    { icon: User, title: 'Who I Am', text: "A passionate web designer with 5+ years creating stunning digital experiences that users love.", color: 'from-accent to-cyan-400' },
    { icon: Briefcase, title: 'What I Do', text: "I specialize in responsive, user-friendly websites — e-commerce, corporate, and creative portfolios.", color: 'from-purple-400 to-pink-400' },
    { icon: Award, title: 'My Approach', text: "Every project gets pixel-perfect attention to detail with a focus on performance and accessibility.", color: 'from-orange-400 to-yellow-400' },
    { icon: Heart, title: 'Beyond Work', text: "I explore new design trends, contribute to open-source, and share knowledge with the community.", color: 'from-green-400 to-emerald-400' },
  ];

  return (
    <section id="about" className="section relative">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary via-slate-900/50 to-primary" />
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[150px]" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-purple-500/5 rounded-full blur-[150px]" />

      <div className="container-custom relative z-10">
        {/* Section Header */}
        <div ref={aboutRef} className={`text-center mb-20 transition-all duration-1000 ${aboutVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest text-accent bg-accent/10 border border-accent/20 mb-6">
            About Me
          </span>
          <h2 className="section-title gradient-text">Crafting Digital Experiences</h2>
          <p className="section-subtitle">
            Turning ideas into beautiful, functional websites that make an impact
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-start mb-24">
          {/* Timeline */}
          <div className="space-y-6">
            {timelineItems.map(({ icon: Icon, title, text, color }, idx) => (
              <div
                key={title}
                className={`group flex gap-5 p-5 rounded-2xl hover:bg-white/[0.03] transition-all duration-500 cursor-default
                  ${aboutVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}
                style={{ transitionDelay: `${idx * 150}ms`, transitionDuration: '0.8s' }}
              >
                <div className={`flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br ${color} p-0.5 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500`}>
                  <div className="w-full h-full rounded-xl bg-primary flex items-center justify-center">
                    <Icon size={20} className="text-white" />
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white mb-1 group-hover:text-accent transition-colors">{title}</h3>
                  <p className="text-gray-400 leading-relaxed text-sm">{text}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Profile Card */}
          <div
            className={`relative transition-all duration-1000 ${aboutVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}
            style={{ transitionDelay: '300ms' }}
          >
            <div className="glass-card p-8 relative overflow-hidden">
              {/* Decorative corner gradient */}
              <div className="absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-br from-accent/20 to-purple-500/20 rounded-full blur-3xl" />

              <div className="relative z-10">
                {/* Avatar */}
                <div className="w-24 h-24 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-accent via-cyan-400 to-purple-500 p-1 shadow-xl shadow-accent/20 animate-glow">
                  <div className="w-full h-full rounded-2xl bg-primary flex items-center justify-center">
                    <span className="text-4xl font-black gradient-text" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>H</span>
                  </div>
                </div>

                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-white mb-1" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Hasibul Hassan</h3>
                  <p className="text-accent font-medium">Web Designer & Developer</p>
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-2 gap-4 mb-8">
                  {[
                    { label: 'Based In', value: 'Bangladesh' },
                    { label: 'Experience', value: '5+ Years' },
                    { label: 'Projects', value: '50+' },
                    { label: 'Availability', value: 'Open' },
                  ].map(({ label, value }) => (
                    <div key={label} className="text-center p-3 rounded-xl bg-white/[0.03] border border-white/5">
                      <p className="text-xs text-gray-500 mb-1">{label}</p>
                      <p className="text-sm font-semibold text-white">{value}</p>
                    </div>
                  ))}
                </div>

                {/* CTA */}
                <button
                  onClick={() => {
                    const el = document.getElementById('contact');
                    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }}
                  className="w-full text-center py-3 rounded-xl bg-gradient-to-r from-accent to-cyan-500 text-white font-semibold hover:shadow-lg hover:shadow-accent/30 hover:-translate-y-0.5 transition-all duration-500 cursor-pointer"
                >
                  Let's Work Together
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Skills Section */}
        <div ref={skillsRef} className={`transition-all duration-1000 ${skillsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest text-purple-400 bg-purple-500/10 border border-purple-500/20 mb-4">
              Tech Stack
            </span>
            <h3 className="text-3xl md:text-4xl font-bold text-white" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              Skills & Technologies
            </h3>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <SkillCategory
              title="Design"
              emoji="🎨"
              skills={SKILLS.design as unknown as SkillItem[]}
              color="from-blue-500/5 to-transparent"
              borderColor="border-blue-500/20"
              isVisible={skillsVisible}
            />
            <SkillCategory
              title="Frontend"
              emoji="⚛️"
              skills={SKILLS.frontend as unknown as SkillItem[]}
              color="from-purple-500/5 to-transparent"
              borderColor="border-purple-500/20"
              isVisible={skillsVisible}
            />
            <SkillCategory
              title="Backend"
              emoji="🔧"
              skills={SKILLS.backend as unknown as SkillItem[]}
              color="from-green-500/5 to-transparent"
              borderColor="border-green-500/20"
              isVisible={skillsVisible}
            />
            <SkillCategory
              title="Tools"
              emoji="🚀"
              skills={SKILLS.tools as unknown as SkillItem[]}
              color="from-orange-500/5 to-transparent"
              borderColor="border-orange-500/20"
              isVisible={skillsVisible}
            />
          </div>
        </div>
      </div>
    </section>
  );
};
