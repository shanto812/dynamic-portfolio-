import React, { useState, useEffect, useMemo } from 'react';
import { Button } from '@/components/common';
import { ArrowRight, Send, Sparkles, Code2, Palette, Rocket, Github, Linkedin, Facebook } from 'lucide-react';
import { SOCIAL_LINKS } from '@/constants/config';
import mainImg from '@/image/main.png'; // Imported your signature image file directly from the image folder

const TYPING_WORDS = ['Web Designer', 'UI/UX Creator', 'Frontend Dev', 'Problem Solver'];

const FloatingParticle: React.FC<{ delay: number; size: number; left: number; duration: number }> = ({ delay, size, left, duration }) => (
  <div
    className="particle"
    style={{
      width: size,
      height: size,
      left: `${left}%`,
      bottom: '-20px',
      backgroundColor: '#FCB045',
      opacity: 0.15,
      position: 'absolute',
      borderRadius: '2px', // Sleek square particle design
      animationDelay: `${delay}s`,
      animationDuration: `${duration}s`,
    }}
  />
);

export const HeroSection: React.FC = () => {
  const [typingText, setTypingText] = useState('');
  const [wordIndex, setWordIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentWord = TYPING_WORDS[wordIndex];
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        if (charIndex < currentWord.length) {
          setTypingText(currentWord.slice(0, charIndex + 1));
          setCharIndex(charIndex + 1);
        } else {
          setTimeout(() => setIsDeleting(true), 1500);
        }
      } else {
        if (charIndex > 0) {
          setTypingText(currentWord.slice(0, charIndex - 1));
          setCharIndex(charIndex - 1);
        } else {
          setIsDeleting(false);
          setWordIndex((wordIndex + 1) % TYPING_WORDS.length);
        }
      }
    }, isDeleting ? 50 : 100);

    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, wordIndex]);

  const particles = useMemo(() =>
    Array.from({ length: 15 }, (_, i) => ({
      id: i,
      delay: Math.random() * 15,
      size: Math.random() * 4 + 2,
      left: Math.random() * 100,
      duration: Math.random() * 10 + 15,
    })), []);

  const scrollToPortfolio = () => {
    const el = document.getElementById('portfolio');
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const scrollToContact = () => {
    const el = document.getElementById('contact');
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <section className="min-h-screen relative flex items-center px-4 py-24 overflow-hidden bg-[#050505]">
      {/* Warm Fire Dark Ambient Background Glows */}
      <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-[#FD1D1D]/5 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] bg-[#FCB045]/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute inset-0 grid-bg opacity-15" />
      
      {particles.map((p) => (
        <FloatingParticle key={p.id} {...p} />
      ))}

      <div className="max-w-[1700px] mx-auto w-full relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          {/* LEFT SIDE - TEXT CONTENT */}
          <div className="order-2 lg:order-1">
            {/* Context Badge with Gentle Curvature */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-xl bg-neutral-950 border border-neutral-900 mb-6 animate-fadeInDown">
              <Sparkles size={14} style={{ color: '#FCB045' }} className="animate-pulse" />
              <span className="text-xs font-bold uppercase tracking-wider text-neutral-400">Available for Freelance</span>
              <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: '#FCB045' }} />
            </div>

            {/* Main Heading */}
            <h1
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white mb-4 animate-fadeInUp leading-[1.05] tracking-tight"
              style={{ fontFamily: "'Space Grotesk', 'Inter', sans-serif" }}
            >
              Hi, I'm<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FD1D1D] to-[#FCB045]">
                Hasibul Hassan Shanto
              </span>
            </h1>

            {/* Typing Effect */}
            <div
              className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-6 animate-fadeInUp h-10 md:h-12 flex items-center"
              style={{ 
                animationDelay: '0.2s', 
                fontFamily: "'Space Grotesk', 'Inter', sans-serif",
                color: '#FCB045'
              }}
            >
              <span className="typing-cursor border-r-2 border-[#FD1D1D] pr-1">{typingText}</span>
            </div>

            {/* Subtitle */}
            <p className="text-base md:text-lg text-neutral-400 mb-8 max-w-xl leading-relaxed animate-fadeInUp" style={{ animationDelay: '0.3s' }}>
              I craft <span className="font-semibold text-white">stunning</span>,{' '}
              <span className="font-semibold" style={{ color: '#FD1D1D' }}>pixel-perfect</span>, and{' '}
              <span className="font-semibold" style={{ color: '#FCB045' }}>high-performance</span> web
              experiences that captivate users and elevate brands.
            </p>

            {/* CTA Buttons with Custom Theme Styles */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8 animate-fadeInUp" style={{ animationDelay: '0.4s' }}>
              <button onClick={scrollToPortfolio} className="w-full sm:w-auto">
                <Button variant="primary" size="lg" className="w-full group text-base !bg-gradient-to-r from-[#FD1D1D] to-[#FCB045] border-0 text-white font-bold rounded-xl shadow-lg shadow-[#FD1D1D]/10">
                  <span>View My Work</span>
                  <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
                </Button>
              </button>
              <button onClick={scrollToContact} className="w-full sm:w-auto">
                <Button variant="secondary" size="lg" className="w-full group text-base rounded-xl border-neutral-800 bg-neutral-950 text-neutral-300 hover:text-white hover:bg-neutral-900">
                  <Send size={18} />
                  <span>Hire Me</span>
                </Button>
              </button>
            </div>

            {/* Social Icons Row */}
            <div className="flex items-center gap-4 animate-fadeInUp" style={{ animationDelay: '0.5s' }}>
              <span className="text-xs uppercase tracking-widest text-neutral-600 font-bold">Follow</span>
              <div className="h-px flex-1 max-w-[40px] bg-neutral-900" />
              {[
                { href: SOCIAL_LINKS.github, icon: Github, label: 'GitHub' },
                { href: SOCIAL_LINKS.linkedin, icon: Linkedin, label: 'LinkedIn' },
                { href: SOCIAL_LINKS.facebook, icon: Facebook, label: 'Facebook' },
              ].map(({ href, icon: Icon, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-xl bg-neutral-950 border border-neutral-900 flex items-center justify-center text-neutral-400 hover:text-white hover:border-[#FD1D1D]/30 hover:scale-105 transition-all duration-300"
                  title={label}
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* RIGHT SIDE - CYBERPUNK BENTO BOX IMAGE FRAME */}
          <div className="order-1 lg:order-2 flex justify-center lg:justify-end animate-fadeInUp" style={{ animationDelay: '0.3s' }}>
            <div className="relative w-72 h-72 sm:w-80 sm:h-80 md:w-96 md:h-96 lg:w-[420px] lg:h-[420px]">
              
              {/* Background Ambient Aura Glow */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-[#FD1D1D] to-[#FCB045] opacity-20 blur-2xl" />

              {/* Unique Neon Tech Frame with Sharp Corner Accents */}
              <div className="absolute inset-[-8px] rounded-3xl border border-neutral-900 p-2" />
              <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-[#FD1D1D] rounded-tl-3xl" />
              <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-[#FCB045] rounded-br-3xl" />

              {/* Main Image Container - Sleek Rounded-3xl Card Shape */}
              <div className="relative w-full h-full rounded-3xl p-[1.5px] bg-gradient-to-br from-[#FD1D1D] to-[#FCB045] shadow-2xl shadow-black">
                <div className="w-full h-full rounded-3xl overflow-hidden bg-neutral-950 relative">
                  <img
                    src={mainImg}
                    alt="Hasibul Hassan Shanto"
                    className="w-full h-full object-cover opacity-90 transition-transform duration-700 hover:scale-105"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = 'none';
                    }}
                  />
                  {/* Image Fail Fallback Text Gradient */}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <span
                      className="text-8xl md:text-9xl font-black text-transparent bg-clip-text bg-gradient-to-br from-[#FD1D1D]/20 to-[#FCB045]/20"
                      style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                    >
                      H
                    </span>
                  </div>
                  {/* Overlaid Pro-Tone Filter */}
                  <div className="absolute inset-0 rounded-3xl bg-gradient-to-tr from-[#FD1D1D]/5 via-transparent to-[#FCB045]/5 mix-blend-color-burn" />
                </div>
              </div>

              {/* Floating Tech Skill Badges - Square Glass Style */}
              <div className="hidden lg:flex absolute -left-6 top-1/4 w-12 h-12 rounded-xl bg-neutral-950 border border-neutral-900 p-0.5 shadow-xl animate-float" style={{ animationDelay: '0.5s' }}>
                <div className="w-full h-full rounded-xl bg-neutral-900/50 backdrop-blur-md flex items-center justify-center border border-white/5">
                  <Code2 size={20} className="text-[#FD1D1D]" />
                </div>
              </div>
              <div className="hidden lg:flex absolute -right-6 top-1/2 w-12 h-12 rounded-xl bg-neutral-950 border border-neutral-900 p-0.5 shadow-xl animate-float" style={{ animationDelay: '1.2s' }}>
                <div className="w-full h-full rounded-xl bg-neutral-900/50 backdrop-blur-md flex items-center justify-center border border-white/5">
                  <Palette size={20} className="text-[#FCB045]" />
                </div>
              </div>
              <div className="hidden lg:flex absolute -bottom-4 right-1/4 w-12 h-12 rounded-xl bg-neutral-950 border border-neutral-900 p-0.5 shadow-xl animate-float" style={{ animationDelay: '2s' }}>
                <div className="w-full h-full rounded-xl bg-neutral-900/50 backdrop-blur-md flex items-center justify-center border border-white/5">
                  <Rocket size={20} style={{ color: '#FCB045' }} />
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* Stats Bar - Sleek Straight Border Layout */}
        <div className="grid grid-cols-3 gap-6 md:gap-12 mt-20 pt-10 border-t border-neutral-900 animate-fadeInUp" style={{ animationDelay: '0.7s' }}>
          {[
            { value: '10+', label: 'Projects Done' },
            { value: '5+', label: 'Happy Clients' },
            { value: '3+', label: 'Years Experience' },
          ].map(({ value, label }) => (
            <div key={label} className="group cursor-pointer text-center lg:text-left">
              <p
                className="text-3xl sm:text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#FD1D1D] to-[#FCB045] group-hover:scale-105 transition-transform duration-500 inline-block"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              >
                {value}
              </p>
              <p className="text-neutral-500 mt-1 text-xs sm:text-sm md:text-base font-bold uppercase tracking-wider">{label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};