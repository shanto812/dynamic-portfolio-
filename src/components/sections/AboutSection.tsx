import React, { useState } from 'react';
import { SKILLS } from '@/constants/config';
import { useScrollReveal } from '@/hooks';
import { User, Award, Briefcase, Heart, Cpu, Activity, LayoutGrid, Layers, ChevronDown } from 'lucide-react';

interface SkillItem {
  name: string;
  level: number;
}

const LiveDataBar: React.FC<{ skill: SkillItem; idx: number; isVisible: boolean }> = ({ skill, idx, isVisible }) => {
  const getStatus = (lvl: number) => {
    if (lvl >= 90) return 'EXPERT';
    if (lvl >= 75) return 'ADVANCED';
    return 'INTERMEDIATE';
  };

  return (
    <div className="p-4 rounded-xl bg-[#090909] border border-neutral-900 group/bar relative overflow-hidden transition-all duration-300 hover:border-[#FCB045]/20">
      <div className="flex justify-between items-start mb-2.5 relative z-10">
        <div>
          <span className="text-xs font-mono text-neutral-500 block mb-0.5">TRACK_0{idx + 1}</span>
          <h4 className="text-sm font-bold text-neutral-200 group-hover/bar:text-white transition-colors">{skill.name}</h4>
        </div>
        <div className="text-right">
          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-neutral-900 border border-neutral-800 text-neutral-400 group-hover/bar:text-[#FCB045] transition-colors">
            {getStatus(skill.level)}
          </span>
          <span className="text-sm font-black font-mono block mt-1" style={{ color: '#FCB045' }}>{skill.level}%</span>
        </div>
      </div>
      <div className="w-full h-2 bg-neutral-950 rounded-sm relative overflow-hidden border border-neutral-900/50">
        <div 
          className="h-full rounded-sm transition-all duration-1000 ease-out"
          style={{ 
            width: isVisible ? `${skill.level}%` : '0%',
            background: 'linear-gradient(to right, #FD1D1D, #FCB045)' 
          }}
        >
          <div className="absolute inset-0 w-20 h-full bg-gradient-to-r from-transparent via-white/30 to-transparent skeleton-sweep" />
        </div>
      </div>
    </div>
  );
};

export const AboutSection: React.FC = () => {
  const { ref: containerRef, isVisible: sectionVisible } = useScrollReveal(0.05);
  const [selectedCategory, setSelectedCategory] = useState<'design' | 'frontend' | 'backend' | 'tools'>('design');
  
  // Tracks the expanded state index of the profile highlight cards (defaults to the first payload active)
  const [expandedCard, setExpandedCard] = useState<number | null>(0);

  const profileHighlights = [
    { 
      icon: User, 
      label: 'Identity', 
      title: 'Hasibul Hassan Shanto', 
      shortDesc: 'Computer Science Student & Visual Architect.',
      detailedText: 'Engineered at the intersection of logical computation and visual design. Leveraging a core CSE foundation, I design architectural frontend interfaces that transform clean layout parameters into ultra-fluid, human-centric visual art.',
      aiInsight: 'Gemini Insight: Exhibits deep proficiency in UI composition. Calibrates interface mechanics to ensure fast execution speeds and high-fidelity adaptive properties.'
    },
    { 
      icon: Briefcase, 
      label: 'Operations', 
      title: 'Fullstack Execution', 
      shortDesc: 'Bridging user interfaces with structural backend logic.',
      detailedText: 'Specialized in unified stack developments that transcend simple designs. Seamlessly integrates server-side computations with front-facing architectures to craft high-velocity e-commerce pipelines, automation systems, and modular digital solutions.',
      aiInsight: 'Gemini Insight: Codebase refactoring methodologies and asynchronous stream allocations adhere to standard enterprise compliance.'
    },
    { 
      icon: Award, 
      label: 'Standard', 
      title: 'Pixel Precision Protocol', 
      shortDesc: 'Strict optimization rules for fluid performance.',
      detailedText: 'Enforces absolute pixel boundaries, accessibility protocols, and cross-platform fidelity layouts. Rejects engineering shortcuts to secure clean, lightning-fast rendering indexes and optimal search engine positioning benchmarks.',
      aiInsight: 'Gemini Insight: Exceptional layout purist with deep structural mastery over modern bento layouts and asymmetric interface distributions.'
    },
    { 
      icon: Heart, 
      label: 'Community', 
      title: 'Neural Network & Trends', 
      shortDesc: 'Exploring advanced gaming aesthetics and open source.',
      detailedText: 'Constantly tracking shifting tech horizons. Exploring high-end eSports branding dynamics, constructing design assets for modern agencies, and scaling collaborative open-source packages are the primary core engines powering my technical evolution.',
      aiInsight: 'Gemini Insight: Infuses layouts with unique cinematic shadows and high-octane cyberpunk aesthetics derived from active digital creation.'
    },
  ];

  const categoryMeta = {
    design: { icon: LayoutGrid, desc: 'UI/UX & Branding Frameworks' },
    frontend: { icon: Layers, desc: 'Interactive Client-Side Systems' },
    backend: { icon: Cpu, desc: 'Server Logic & Data Engines' },
    tools: { icon: Activity, desc: 'Deployment & Workflow Boosters' },
  };

  const ActiveIcon = categoryMeta[selectedCategory].icon;

  return (
    <section id="about" ref={containerRef} className="relative bg-[#040404] py-28 px-4 overflow-hidden">
      <div className="absolute top-[-10%] left-1/4 w-[500px] h-[500px] bg-[#FD1D1D]/5 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-1/4 w-[500px] h-[500px] bg-[#FCB045]/5 rounded-full blur-[150px] pointer-events-none" />

      <style>{`
        @keyframes sweep {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(500%); }
        }
        .skeleton-sweep {
          animation: sweep 2s infinite linear;
        }
      `}</style>

      <div className="max-w-[1700px] mx-auto relative z-10">
        
        {/* Section Header */}
        <div className={`mb-16 border-b border-neutral-900 pb-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 transition-all duration-700 ${sectionVisible ? 'opacity-100' : 'opacity-0'}`}>
          <div>
            <span className="text-[10px] font-mono tracking-[0.25em] block mb-2" style={{ color: '#FD1D1D' }}>[ ENGINE_INTERFACE // 2026 ]</span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              Technical Command Center
            </h2>
          </div>
          <div className="flex items-center gap-4 bg-[#0a0a0a] border border-neutral-900 px-4 py-2.5 rounded-xl font-mono text-xs text-neutral-400">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
            <span>SYSTEM: STABLE // DATAFEED ACTIVE</span>
          </div>
        </div>

        {/* Core Interactive Layout Hub */}
        <div className="grid lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT SIDE - Collapsible Accordion Array (5-Column Layout Width) */}
          <div className="lg:col-span-5 space-y-3">
            {profileHighlights.map((item, idx) => {
              const Icon = item.icon;
              const isExpanded = expandedCard === idx;
              
              return (
                <div 
                  key={item.title}
                  className={`rounded-2xl border bg-neutral-950 transition-all duration-500 overflow-hidden ${
                    isExpanded 
                      ? 'border-[#FD1D1D]/40 shadow-lg shadow-[#FD1D1D]/5' 
                      : 'border-neutral-900/70 hover:border-neutral-800'
                  } ${sectionVisible ? 'opacity-100' : 'opacity-0'}`}
                  style={{ transitionDelay: `${idx * 60}ms` }}
                >
                  {/* Interactive Card Header Trigger */}
                  <button
                    onClick={() => setExpandedCard(isExpanded ? null : idx)}
                    className="w-full p-5 flex items-center justify-between gap-4 text-left cursor-pointer transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-10 h-10 rounded-xl bg-[#090909] border flex items-center justify-center transition-colors ${
                        isExpanded ? 'border-[#FCB045]/40 text-white' : 'border-neutral-800 text-neutral-400'
                      }`}>
                        <Icon size={18} />
                      </div>
                      <div>
                        <span className="text-[9px] font-mono text-neutral-500 block uppercase tracking-wider">{item.label}</span>
                        <h3 className="text-base font-bold text-white mt-0.5">{item.title}</h3>
                      </div>
                    </div>
                    <ChevronDown 
                      size={18} 
                      className={`text-neutral-500 transition-transform duration-500 ease-in-out ${isExpanded ? 'rotate-180 text-white' : ''}`} 
                    />
                  </button>

                  {/* Smooth Architectural Expand Wrapper */}
                  <div 
                    className="transition-all duration-500 ease-in-out overflow-hidden"
                    style={{ 
                      maxHeight: isExpanded ? '320px' : '0px',
                      opacity: isExpanded ? 1 : 0
                    }}
                  >
                    <div className="px-5 pb-5 pt-1 border-t border-neutral-900/50 space-y-4">
                      {/* Technical Breakdown Bio */}
                      <p className="text-xs text-neutral-400 leading-relaxed font-normal">
                        {item.detailedText}
                      </p>
                      
                      {/* AI Agent Insight Subsystem Shell */}
                      <div className="p-3 rounded-xl bg-[#070707] border border-neutral-900 text-[11px] font-mono text-neutral-400 leading-relaxed relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-1.5 h-full bg-gradient-to-b from-[#FD1D1D] to-[#FCB045]" />
                        <span className="text-[9px] font-bold uppercase tracking-widest text-[#FCB045] block mb-1">// AI_SYSTEM_FEED</span>
                        {item.aiInsight}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* RIGHT SIDE - Skills Control Console Panel (7-Column Layout Width) */}
          <div className={`lg:col-span-7 rounded-3xl bg-neutral-950 border border-neutral-900 p-6 sm:p-8 relative transition-all duration-1000 ${sectionVisible ? 'opacity-100' : 'opacity-0'}`}>
            <div>
              <div className="flex flex-wrap gap-2 border-b border-neutral-900 pb-4 mb-6">
                {(['design', 'frontend', 'backend', 'tools'] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setSelectedCategory(tab)}
                    className={`px-4 py-2 rounded-xl text-xs font-mono font-bold uppercase tracking-wider transition-all duration-300 border ${
                      selectedCategory === tab
                        ? 'bg-gradient-to-r from-[#FD1D1D] to-[#FCB045] text-white border-none shadow-lg shadow-[#FD1D1D]/10 scale-105'
                        : 'bg-[#060606] text-neutral-500 border-neutral-900 hover:text-neutral-300 hover:border-neutral-800'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              <div className="flex items-center justify-between mb-6 bg-[#060606] border border-neutral-900 p-4 rounded-xl">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-neutral-950 border border-neutral-900 flex items-center justify-center">
                    <ActiveIcon size={16} style={{ color: '#FCB045' }} />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold font-mono uppercase text-neutral-300 tracking-wider">
                      MODULE_FEED // {selectedCategory}
                    </h3>
                    <p className="text-[11px] text-neutral-500 font-mono">{categoryMeta[selectedCategory].desc}</p>
                  </div>
                </div>
                <span className="text-[10px] font-mono text-neutral-600 hidden sm:inline">REFRESH_RATE: 12ms</span>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                {SKILLS[selectedCategory] && (SKILLS[selectedCategory] as unknown as SkillItem[]).map((skill, idx) => (
                  <LiveDataBar 
                    key={skill.name} 
                    skill={skill} 
                    idx={idx} 
                    isVisible={sectionVisible} 
                  />
                ))}
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-neutral-900 flex flex-col sm:flex-row items-center justify-between gap-4">
              <p className="text-[11px] font-mono text-neutral-500 text-center sm:text-left">
                * Click on tabs above to analyze real-time stack distributions.
              </p>
              <button
                onClick={() => {
                  const el = document.getElementById('contact');
                  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }}
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-[#090909] border border-neutral-800 text-xs font-mono font-bold uppercase tracking-wider text-neutral-300 hover:text-white hover:border-[#FCB045]/30 transition-all duration-300"
              >
                Inquire Stack Capabilities_
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};