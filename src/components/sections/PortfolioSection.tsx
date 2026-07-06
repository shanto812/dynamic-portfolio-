import React, { useState, useEffect } from 'react';
import { useProjects } from '@/context/ProjectsContext';
import { PORTFOLIO_SECTORS } from '@/constants/config';
import { ProjectCard } from './ProjectCard';
import { LoadingSpinner } from '@/components/common';
import { useScrollReveal } from '@/hooks';
import { Terminal, FolderGit2, Cpu, Grid } from 'lucide-react';

export const PortfolioSection: React.FC = () => {
  const { projects, loading } = useProjects();
  const [selectedSector, setSelectedSector] = useState('all');
  const [isScanning, setIsScanning] = useState(false);
  const { ref: sectionRef, isVisible: sectionVisible } = useScrollReveal(0.05);

  // ক্যাটাগরি চেঞ্জ হলে একটি হাই-টেক স্ক্যানিং বা গ্লিচ এনিমেশন থ্রিল ট্রিগার হবে
  useEffect(() => {
    setIsScanning(true);
    const timer = setTimeout(() => setIsScanning(false), 400);
    return () => clearTimeout(timer);
  }, [selectedSector]);

  const filteredProjects =
    selectedSector === 'all'
      ? projects
      : projects.filter((project) => project.sector === selectedSector);

  return (
    <section id="portfolio" ref={sectionRef} className="relative bg-[#020202] py-28 px-4 overflow-hidden">
      {/* 3D ডিজিটাল ম্যাট্রিক্স ও লেজার ব্যাকড্রপ ওভারলে */}
      <div className="absolute inset-0 opacity-[0.015] bg-[radial-gradient(#FD1D1D_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />
      <div className="absolute top-0 right-10 w-[350px] h-[350px] bg-[#FCB045]/5 rounded-full blur-[120px] pointer-events-none animate-pulse" />
      <div className="absolute bottom-10 left-10 w-[400px] h-[400px] bg-[#FD1D1D]/5 rounded-full blur-[150px] pointer-events-none" />

      {/* গ্লোবাল ফিউচারিস্টিক স্ক্যানার সিএসএস ইনজেকশন */}
      <style>{`
        @keyframes scanline {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100%); }
        }
        .matrix-scan::after {
          content: " ";
          position: absolute;
          top: 0; left: 0; right: 0; bottom: 0;
          background: linear-gradient(to bottom, transparent 50%, rgba(253, 29, 29, 0.1) 50%), linear-gradient(to right, rgba(253, 29, 29, 0.05), rgba(252, 176, 69, 0.05));
          background-size: 100% 4px, 4px 100%;
          animation: scanline 0.4s linear infinite;
          pointer-events: none;
          z-index: 20;
        }
      `}</style>

      <div className="max-w-[1750px] mx-auto relative z-10">
        
        {/* অনন্য স্পেস-গ্রেড হেডার */}
        <div className={`mb-20 border-b border-neutral-900/60 pb-10 flex flex-col md:flex-row items-start md:items-end justify-between gap-6 transition-all duration-1000 ${sectionVisible ? 'opacity-100' : 'opacity-0'}`}>
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Terminal size={14} style={{ color: '#FD1D1D' }} className="animate-pulse" />
              <span className="text-[10px] font-mono tracking-[0.3em] text-neutral-500 uppercase">SYS_INDEX // DEPLOYMENTS</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              ARCHIVE // <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FD1D1D] via-[#FD1D1D] to-[#FCB045]">PROJ_FEED</span>
            </h2>
          </div>
          <div className="flex items-center gap-3 bg-[#070707] border border-neutral-900 px-4 py-2 rounded-xl font-mono text-[11px] text-neutral-400">
            <Cpu size={14} style={{ color: '#FCB045' }} className="animate-spin-slow" />
            <span>RENDER_MODE: ASYMMETRIC_GRID</span>
          </div>
        </div>

        {/* সাইবারপাঙ্ক সাইডবার ক্যাটাগরি ও মেইন ডিসপ্লে কন্ট্রোল (২ কলাম মেকানিজম) */}
        <div className="grid lg:grid-cols-12 gap-8 items-start">
          
          {/* বাম পাশ: ইউনিক ভার্টিক্যাল গ্লাস ডক কন্ট্রোলার (৩ কলাম) */}
          <div className={`lg:col-span-3 flex flex-col space-y-2 sticky top-24 transition-all duration-1000 delay-200 ${sectionVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
            <span className="text-[10px] font-mono font-bold tracking-wider text-neutral-600 uppercase px-3 mb-2 flex items-center gap-2">
              <Grid size={12} /> Filter Matrices
            </span>
            {PORTFOLIO_SECTORS.map((sector) => {
              const isActive = selectedSector === sector.slug;
              return (
                <button
                  key={sector.id}
                  onClick={() => setSelectedSector(sector.slug)}
                  className={`w-full px-4 py-3.5 rounded-xl font-mono text-xs font-bold uppercase tracking-widest text-left transition-all duration-300 relative group overflow-hidden border ${
                    isActive
                      ? 'border-[#FD1D1D]/30 text-white shadow-xl shadow-[#FD1D1D]/5'
                      : 'border-neutral-900 bg-[#060606]/40 text-neutral-500 hover:text-neutral-300 hover:border-neutral-800'
                  }`}
                >
                  {/* অ্যাক্টিভ বাটনের বাম পাশে ভার্টিক্যাল নিওন বার */}
                  {isActive && (
                    <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-gradient-to-b from-[#FD1D1D] to-[#FCB045]" />
                  )}

                  <div className="flex justify-between items-center relative z-10">
                    <span>{sector.name}</span>
                    <span className="text-[9px] text-neutral-600 font-normal group-hover:text-neutral-400 transition-colors">
                      {isActive ? '[ACTIVE]' : '//OPEN'}
                    </span>
                  </div>
                  
                  {/* হোভার ব্যাকগ্রাউন্ড গ্লো */}
                  {!isActive && (
                    <div className="absolute inset-0 bg-gradient-to-r from-neutral-900/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  )}
                </button>
              );
            })}
          </div>

          {/* ডান পাশ: রিয়েল-টাইম প্রজেক্ট ডিসপ্লে এরিয়া (৯ কলাম) */}
          <div className="lg:col-span-9 relative">
            
            {/* স্ক্যানিং ওভারলে এনিমেশন যখন ক্যাটাগরি চেঞ্জ হবে */}
            <div className={`transition-all duration-300 relative ${isScanning ? 'matrix-scan min-h-[300px]' : ''}`}>
              
              {loading ? (
                <div className="flex flex-col justify-center items-center min-h-[400px] bg-neutral-950/40 border border-neutral-900/60 rounded-2xl backdrop-blur-sm">
                  <LoadingSpinner message="Decrypting project payloads..." />
                </div>
              ) : filteredProjects.length > 0 ? (
                
                /* আসymmetric নিও-বেন্টো গ্রিড লেআউট: প্রতিটি কার্ডের সাইজ ও ডিজাইন ভিন্নভাবে পপ-আপ হবে */
                <div className="grid sm:grid-cols-2 gap-6 items-stretch">
                  {filteredProjects.map((project, idx) => {
                    // প্রথম এবং প্রতি ৩ নম্বর কার্ডকে একটু বড় এবং এক্সপ্যান্ডেড লুক দেওয়া
                    const isFeature = idx === 0 || idx % 3 === 0;
                    
                    return (
                      <div
                        key={project.id}
                        className={`group/item rounded-2xl border bg-neutral-950/40 backdrop-blur-sm p-2 transition-all duration-700 hover:-translate-y-1.5 ${
                          isFeature 
                            ? 'sm:col-span-2 border-neutral-900/80 hover:border-[#FCB045]/30 shadow-xl shadow-black/80' 
                            : 'border-neutral-900/60 hover:border-[#FD1D1D]/30'
                        } ${
                          sectionVisible ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 translate-y-8'
                        }`}
                        style={{ 
                          transitionDelay: `${100 + idx * 60}ms`
                        }}
                      >
                        {/* কার্ডের অভ্যন্তরীণ বর্ডার ডিজাইন */}
                        <div className="relative h-full rounded-xl bg-[#040404]/90 overflow-hidden">
                          {/* কার্ড কোণায় সাবলীল হাই-টেক লাইন */}
                          <div className="absolute top-0 right-0 w-16 h-[1px] bg-gradient-to-r from-transparent to-neutral-800 group-hover/item:to-[#FCB045]/50 transition-colors" />
                          <div className="absolute bottom-0 left-0 w-[1px] h-16 bg-gradient-to-b from-transparent to-neutral-800 group-hover/item:to-[#FD1D1D]/50 transition-colors" />

                          {/* মেইন কোড ডেক থেকে আসা প্রোজেক্ট কার্ড কম্পোনেন্ট */}
                          <ProjectCard project={project} />
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                /* ফেইল-সেফ নাল ডেটা ভিউ */
                <div className="text-center py-24 bg-neutral-950/30 border border-neutral-900/60 rounded-3xl backdrop-blur-sm">
                  <div className="inline-block p-8 rounded-2xl bg-[#050505] border border-neutral-900 relative max-w-sm">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-[2px] bg-gradient-to-r from-[#FD1D1D] to-[#FCB045]" />
                    <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-neutral-950 border border-neutral-800 flex items-center justify-center">
                      <FolderGit2 size={20} className="text-neutral-600" />
                    </div>
                    <h3 className="text-xs font-bold font-mono uppercase text-neutral-400 mb-1">DATA_STREAM_EMPTY</h3>
                    <p className="text-neutral-500 text-[11px] font-mono leading-relaxed">
                      No deployed artifacts match this specific sector code in the database feed.
                    </p>
                  </div>
                </div>
              )}

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};