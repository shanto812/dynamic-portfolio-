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
  
  // কোন কার্ডটি এক্সপ্যান্ডেড থাকবে তা ট্র্যাক করার স্টেট (ডিফল্ট প্রথমটা খোলা থাকবে)
  const [expandedCard, setExpandedCard] = useState<number | null>(0);

  const profileHighlights = [
    { 
      icon: User, 
      label: 'Identity', 
      title: 'Hasibul Hassan Shanto', 
      shortDesc: 'Computer Science Student & Visual Architect.',
      detailedText: 'আমি কোডিং এবং ডিজাইনের মিশ্রণে ডিজিটাল ল্যান্ডস্কেপ তৈরি করতে ভালোবাসি। CSE ব্যাকগ্রাউন্ডের লজিক্যাল থিংকিং এবং ফ্রন্টএন্ড আর্কিটেকচারের ভিজ্যুয়াল আর্টকে একসাথে করে আমি ইউজার এক্সপেরিয়েন্সকে এক নতুন মাত্রায় নিয়ে যাই।',
      aiInsight: 'Gemini Insight: শান্তর ইউজার ইন্টারফেস ডিজাইনের গভীরতা চমৎকার। সে এমন ইন্টারফেস তৈরি করতে পারে যা একই সাথে ফাস্ট এবং রেসপনসিভ।'
    },
    { 
      icon: Briefcase, 
      label: 'Operations', 
      title: 'Fullstack Execution', 
      shortDesc: 'Bridging user interfaces with structural backend logic.',
      detailedText: 'শুধুমাত্র সুন্দর ডিজাইন নয়, ব্যাকএন্ডের আর্কিটেকচার নিয়েও আমি সমান পারদর্শী। ক্লায়েন্ট সাইড এবং সার্ভার সাইডের সুষম সমন্বয় ঘটিয়ে আমি হাই-পারফরম্যান্স ই-কমার্স ও ক্রিয়েটিভ পোর্টফোলিও মেকানিজম ডেভেলপ করি।',
      aiInsight: 'Gemini Insight: কোডের অপটিমাইজেশন এবং ডেটা হ্যান্ডলিংয়ে তার মেথড খুবই স্লিক এবং স্ট্যান্ডার্ড-কমপ্লায়েন্ট।'
    },
    { 
      icon: Award, 
      label: 'Standard', 
      title: 'Pixel Precision Protocol', 
      shortDesc: 'Strict optimization rules for fluid performance.',
      detailedText: 'প্রতিটি সেকশনে নিখুঁত পিক্সেল অ্যালাইনমেন্ট, অ্যাক্সেসিবিলিটি এবং রেসপনসিভনেস নিশ্চিত করা আমার কাজের প্রধান মূলমন্ত্র। লোডিং স্পিড এবং ক্লিন কোডবেস বজায় রাখতে আমি কোনো আপস করি না।',
      aiInsight: 'Gemini Insight: UI কিউবেশন এবং গ্রিড বেন্টো এলাইনমেন্ট লেআউটে সে অসাধারণ পারফেকশনিস্ট।'
    },
    { 
      icon: Heart, 
      label: 'Community', 
      title: 'Neural Network & Trends', 
      shortDesc: 'Exploring advanced gaming aesthetics and open source.',
      detailedText: 'আমি সবসময় টেক ট্রেন্ড আপগ্রেডেশনের মধ্যে থাকি। ডিজিটাল এজেন্সির ব্র্যান্ডিং ডিজাইন, প্রফেশনাল গেমিং ইউটিলিটি গ্রাফিক্স এক্সপ্লোর করা এবং ওপেন-সোর্স কমিউনিটিতে অবদান রাখা আমার কাজের বাইরের সবচেয়ে বড় অনুপ্রেরণা।',
      aiInsight: 'Gemini Insight: তার ভিজ্যুয়াল এস্থেটিক্সে গেমিং ও ফিউচারিস্টিক ট্রেন্ডের একটি দারুণ ইনফ্লুয়েন্স পাওয়া যায়।'
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

      <div className="max-w-[1750px] mx-auto relative z-10">
        
        {/* হেডার */}
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

        {/* মেইন ইন্টারঅ্যাক্টিভ গ্রিড লেআউট */}
        <div className="grid lg:grid-cols-12 gap-8 items-start">
          
          {/* বাম পাশ: কলাপ্সিবল অ্যাকোর্ডিয়ন কার্ড (৫ কলাম) */}
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
                  {/* কার্ডের ক্লিকেবল টপ ট্রিগার */}
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

                  {/* স্মুথ অ্যানিমেটেড এক্সপ্যান্ডেড কন্টেন্ট */}
                  <div 
                    className="transition-all duration-500 ease-in-out overflow-hidden"
                    style={{ 
                      maxHeight: isExpanded ? '320px' : '0px',
                      opacity: isExpanded ? 1 : 0
                    }}
                  >
                    <div className="px-5 pb-5 pt-1 border-t border-neutral-900/50 space-y-4">
                      {/* বিস্তারিত বাংলা বিবরণী */}
                      <p className="text-xs text-neutral-400 leading-relaxed font-normal">
                        {item.detailedText}
                      </p>
                      
                      {/* AI অ্যাসিস্ট্যান্ট ইন্সাইট বক্স (আপনার পছন্দের জন্য আলাদা ব্যাকগ্রাউন্ডসহ দেওয়া হলো) */}
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

          {/* ডান পাশ: স্কিল কন্ট্রোল প্যানেল (৭ কলাম) */}
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