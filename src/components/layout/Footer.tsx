import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { SOCIAL_LINKS, CONTACT_EMAIL, CONTACT_PHONE_DISPLAY, WHATSAPP_NUMBER, NICKNAME } from '@/constants/config';
import { Mail, Phone, Github, Linkedin, Facebook, ArrowUp, Sparkles, Heart, ArrowRight } from 'lucide-react';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const navigate = useNavigate();
  const location = useLocation();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToSection = (e: React.MouseEvent, sectionId: string) => {
    e.preventDefault();
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        const el = document.getElementById(sectionId);
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 300);
    } else {
      const el = document.getElementById(sectionId);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const goHome = (e: React.MouseEvent) => {
    e.preventDefault();
    if (location.pathname !== '/') {
      navigate('/');
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const quickLinks = [
    { label: 'Home', action: goHome },
    { label: 'About', action: (e: React.MouseEvent) => scrollToSection(e, 'about') },
    { label: 'Portfolio', action: (e: React.MouseEvent) => scrollToSection(e, 'portfolio') },
    { label: 'Contact', action: (e: React.MouseEvent) => scrollToSection(e, 'contact') },
  ];

  const socials = [
    { href: SOCIAL_LINKS.github, icon: Github, label: 'GitHub', bg: 'hover:bg-neutral-800' },
    { href: SOCIAL_LINKS.linkedin, icon: Linkedin, label: 'LinkedIn', bg: 'hover:bg-[#FD1D1D]/10 hover:text-[#FCB045]' },
    { href: SOCIAL_LINKS.facebook, icon: Facebook, label: 'Facebook', bg: 'hover:bg-[#FD1D1D]/10 hover:text-[#FCB045]' },
  ];

  return (
    <footer className="relative bg-[#050505] text-white pt-24 pb-8 overflow-hidden border-t border-neutral-900">
      
      {/* ব্যাকগ্রাউন্ডের জায়ান্ট ওয়াটারমার্ক টেক্সট */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full pointer-events-none select-none text-center opacity-[0.015] font-black tracking-tighter text-[25vw]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
        {NICKNAME}
      </div>

      {/* আপনার দেওয়া কাস্টম কালারের হাই-টেক অ্যাবস্ট্রাক্ট লাইটিং ও ওয়াম গ্লো ইফেক্টস */}
      <div className="absolute top-0 left-1/4 w-[450px] h-[450px] bg-[#FD1D1D]/5 rounded-full blur-[140px] pointer-events-none mix-blend-screen" />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-[#FCB045]/5 rounded-full blur-[140px] pointer-events-none mix-blend-screen" />

      <div className="relative z-10 max-w-[1750px] mx-auto px-4 md:px-8">
        
        {/* সেকশন ১: মিনিমাল হেডিং ও মেগা কল-টু-অ্যাকশন */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 mb-20">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-semibold uppercase tracking-wider mb-4" style={{ color: '#FCB045' }}>
              <Sparkles size={12} className="animate-spin duration-1000" />
              <span>Let's collaborate</span>
            </div>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              Ready to bring your <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FD1D1D] to-[#FCB045]">
                next big idea to life?
              </span>
            </h2>
          </div>
          
          {/* CTA Button: কাস্টম গ্রাডিয়েন্ট হোভার ইফেক্ট সহ */}
          <a href={`mailto:${CONTACT_EMAIL}`} className="group relative inline-flex items-center justify-center p-4 px-8 py-4 overflow-hidden font-bold rounded-2xl bg-white text-black transition duration-300 ease-out shadow-xl shadow-white/5 hover:scale-[1.02]">
            <span className="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-gradient-to-r from-[#FD1D1D] to-[#FCB045] group-hover:translate-x-0 ease-out">
              <ArrowRight size={20} />
            </span>
            <span className="absolute flex items-center justify-center w-full h-full text-black transition-all duration-300 transform group-hover:translate-x-full ease-out">
              Start A Project
            </span>
            <span className="relative invisible">Start A Project</span>
          </a>
        </div>

        {/* সেকশন ২: আল্ট্রা-মডার্ন বেন্টো গ্রিড লেআউট */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-20">
          
          {/* কার্ড ১: কুইক লিংক ও নেভিগেশন */}
          <div className="p-8 rounded-3xl bg-neutral-950/60 border border-neutral-900/80 backdrop-blur-xl flex flex-col justify-between group hover:border-neutral-800 transition-all duration-300">
            <div>
              <h3 className="text-xs font-bold text-neutral-500 uppercase tracking-widest mb-6">Navigation</h3>
              <div className="grid grid-cols-2 gap-4">
                {quickLinks.map(({ label, action }) => (
                  <a
                    key={label}
                    href="/"
                    onClick={action}
                    className="text-sm text-neutral-400 hover:text-white font-medium transition-colors duration-200 cursor-pointer flex items-center gap-1 group/link"
                  >
                    <span>{label}</span>
                    <ArrowRight size={12} className="opacity-0 -translate-x-2 group-hover/link:opacity-100 group-hover/link:translate-x-0 transition-all" style={{ color: '#FCB045' }} />
                  </a>
                ))}
              </div>
            </div>
            <div className="mt-8 pt-6 border-t border-neutral-900 text-xs text-neutral-500 font-medium">
              Explore my digital playground.
            </div>
          </div>

          {/* CARD ২: লাইভ কন্ট্যাক্ট মেথডস */}
          <div className="p-8 rounded-3xl bg-neutral-950/60 border border-neutral-900/80 backdrop-blur-xl flex flex-col justify-between hover:border-neutral-800 transition-all duration-300">
            <div>
              <h3 className="text-xs font-bold text-neutral-500 uppercase tracking-widest mb-6">Connect Directly</h3>
              <div className="space-y-4">
                <a href={`mailto:${CONTACT_EMAIL}`} className="flex items-center gap-3 text-neutral-300 hover:text-white transition-colors group">
                  <div className="w-9 h-9 rounded-xl bg-neutral-900 flex items-center justify-center border border-neutral-800 group-hover:border-[#FD1D1D]/50 transition-colors">
                    <Mail size={16} className="group-hover:text-[#FD1D1D] transition-colors" />
                  </div>
                  <span className="text-sm font-medium truncate">{CONTACT_EMAIL}</span>
                </a>
                <a href={`https://wa.me/${WHATSAPP_NUMBER.replace(/\D/g, '')}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-neutral-300 hover:text-white transition-colors group">
                  <div className="w-9 h-9 rounded-xl bg-neutral-900 flex items-center justify-center border border-neutral-800 group-hover:border-[#FCB045]/50 transition-colors">
                    <Phone size={16} className="group-hover:text-[#FCB045] transition-colors" />
                  </div>
                  <span className="text-sm font-medium">{CONTACT_PHONE_DISPLAY}</span>
                </a>
              </div>
            </div>
            <div className="mt-8 pt-6 border-t border-neutral-900 flex items-center gap-2 text-xs text-neutral-500">
              <span className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: '#FCB045' }} />
              <span>Available for freelance contracts</span>
            </div>
          </div>

          {/* CARD ৩: সোশ্যাল হাব ও ব্রান্ড আইডেন্টিটি */}
          <div className="p-8 rounded-3xl bg-neutral-950/60 border border-neutral-900/80 backdrop-blur-xl flex flex-col justify-between hover:border-neutral-800 transition-all duration-300">
            <div>
              <h3 className="text-xs font-bold text-neutral-500 uppercase tracking-widest mb-6">Follow Me</h3>
              <div className="flex gap-3">
                {socials.map(({ href, icon: Icon, label, bg }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    title={label}
                    className={`w-12 h-12 rounded-2xl bg-neutral-900 border border-neutral-800 flex items-center justify-center text-neutral-400 hover:scale-105 hover:border-neutral-700 transition-all duration-300 ${bg}`}
                  >
                    <Icon size={18} />
                  </a>
                ))}
              </div>
            </div>
            <div className="mt-8 pt-6 border-t border-neutral-900">
              <span className="text-base font-bold tracking-wide block mb-1 text-white" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                Hasibul Hassan
              </span>
              <span className="text-[11px] text-neutral-500 block leading-tight">
                Software Engineer & UI/UX Specialist.
              </span>
            </div>
          </div>

        </div>

        {/* সেকশন ৩: বটম বার এবং কপিরাইট */}
        <div className="pt-8 border-t border-neutral-900 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="text-neutral-500 text-xs font-medium text-center sm:text-left">
            <span>&copy; {currentYear} {NICKNAME}. All rights reserved. </span>
            <span className="block sm:inline sm:ml-2 mt-1 sm:mt-0 text-neutral-600">
              Made with <Heart size={10} className="inline text-[#FD1D1D] fill-[#FD1D1D] mx-0.5" /> in Bangladesh
            </span>
          </div>
          
          <button
            onClick={scrollToTop}
            className="group flex items-center gap-2 px-4 py-2 rounded-xl bg-neutral-950 hover:bg-neutral-900 border border-neutral-900 hover:border-neutral-800 text-neutral-400 hover:text-white transition-all duration-300 text-xs font-semibold tracking-wide shadow-sm"
          >
            <span>Back to top</span>
            <ArrowUp size={12} className="group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </div>

      </div>
    </footer>
  );
};