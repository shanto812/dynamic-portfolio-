import React, { useState, useEffect, useMemo } from 'react';
import { Button } from '@/components/common';
import { ArrowRight, Send, Sparkles, Code2, Palette, Rocket, Github, Linkedin, Facebook } from 'lucide-react';
import { HERO_IMAGE, SOCIAL_LINKS } from '@/constants/config';

const TYPING_WORDS = ['Web Designer', 'UI/UX Creator', 'Frontend Dev', 'Problem Solver'];

const FloatingParticle: React.FC<{ delay: number; size: number; left: number; duration: number }> = ({ delay, size, left, duration }) => (
  <div
    className="particle bg-accent/20"
    style={{
      width: size,
      height: size,
      left: `${left}%`,
      bottom: '-20px',
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
    <section className="min-h-screen relative flex items-center px-4 py-24 overflow-hidden">
      {/* Aurora Background */}
      <div className="aurora-bg" />
      <div className="absolute inset-0 grid-bg opacity-30" />
      {particles.map((p) => (
        <FloatingParticle key={p.id} {...p} />
      ))}

      <div className="max-w-7xl mx-auto w-full relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* LEFT SIDE - TEXT */}
          <div className="order-2 lg:order-1">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full glass mb-6 animate-fadeInDown">
              <Sparkles size={16} className="text-accent animate-pulseGlow" />
              <span className="text-sm font-medium text-gray-300">Available for Freelance</span>
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            </div>

            {/* Main Heading */}
            <h1
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white mb-4 animate-fadeInUp leading-[1.05] tracking-tight"
              style={{ fontFamily: "'Space Grotesk', 'Inter', sans-serif" }}
            >
              Hi, I'm<br />
              <span className="gradient-text">Hasibul Hassan</span>
            </h1>

            {/* Typing Effect */}
            <div
              className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white/80 mb-6 animate-fadeInUp h-10 md:h-12 flex items-center"
              style={{ animationDelay: '0.2s', fontFamily: "'Space Grotesk', 'Inter', sans-serif" }}
            >
              <span className="typing-cursor">{typingText}</span>
            </div>

            {/* Subtitle */}
            <p className="text-base md:text-lg text-gray-400 mb-8 max-w-xl leading-relaxed animate-fadeInUp" style={{ animationDelay: '0.3s' }}>
              I craft <span className="text-accent font-semibold">stunning</span>,{' '}
              <span className="text-cyan-400 font-semibold">pixel-perfect</span>, and{' '}
              <span className="text-purple-400 font-semibold">high-performance</span> web
              experiences that captivate users and elevate brands.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8 animate-fadeInUp" style={{ animationDelay: '0.4s' }}>
              <button onClick={scrollToPortfolio} className="w-full sm:w-auto">
                <Button variant="primary" size="lg" className="w-full group text-base">
                  <span>View My Work</span>
                  <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
                </Button>
              </button>
              <button onClick={scrollToContact} className="w-full sm:w-auto">
                <Button variant="secondary" size="lg" className="w-full group text-base">
                  <Send size={18} />
                  <span>Hire Me</span>
                </Button>
              </button>
            </div>

            {/* Social Icons Row */}
            <div className="flex items-center gap-4 animate-fadeInUp" style={{ animationDelay: '0.5s' }}>
              <span className="text-xs uppercase tracking-widest text-gray-500 font-bold">Follow</span>
              <div className="h-px flex-1 max-w-[40px] bg-gray-700" />
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
                  className="w-10 h-10 rounded-xl glass flex items-center justify-center text-gray-400 hover:text-accent hover:border-accent/40 hover:scale-110 hover:shadow-lg hover:shadow-accent/20 transition-all duration-300"
                  title={label}
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* RIGHT SIDE - IMAGE */}
          <div className="order-1 lg:order-2 flex justify-center lg:justify-end animate-fadeInUp" style={{ animationDelay: '0.3s' }}>
            <div className="relative w-72 h-72 sm:w-80 sm:h-80 md:w-96 md:h-96 lg:w-[440px] lg:h-[440px]">
              {/* Outer rotating glow ring */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-accent via-cyan-400 to-purple-500 opacity-30 blur-3xl animate-pulseGlow" />

              {/* Animated orbit ring */}
              <div className="absolute inset-[-12px] rounded-full border-2 border-dashed border-accent/30 animate-spin-slow" />
              <div className="absolute inset-[-24px] rounded-full border border-cyan-400/20 animate-spin-reverse" />

              {/* Floating orbital dots */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-accent shadow-lg shadow-accent/50 animate-float" />
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-3 h-3 rounded-full bg-cyan-400 shadow-lg shadow-cyan-400/50 animate-float" style={{ animationDelay: '1s' }} />
              <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-purple-400 shadow-lg shadow-purple-400/50 animate-float" style={{ animationDelay: '2s' }} />
              <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-4 h-4 rounded-full bg-pink-400 shadow-lg shadow-pink-400/50 animate-float" style={{ animationDelay: '1.5s' }} />

              {/* Main image frame with gradient border */}
              <div className="relative w-full h-full rounded-full p-1.5 bg-gradient-to-br from-accent via-cyan-400 to-purple-500 shadow-2xl shadow-accent/40 animate-glow">
                <div className="w-full h-full rounded-full overflow-hidden bg-primary relative">
                  <img
                    src={HERO_IMAGE}
                    alt="Hasibul Hassan"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = 'none';
                    }}
                  />
                  {/* Decorative initial fallback if image fails */}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <span
                      className="text-8xl md:text-9xl font-black gradient-text opacity-20"
                      style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                    >
                      S
                    </span>
                  </div>
                  {/* Inner glow overlay */}
                  <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-accent/10 via-transparent to-purple-500/10 mix-blend-overlay" />
                </div>
              </div>

              {/* Decorative floating skill icons */}
              <div className="hidden lg:flex absolute -left-6 top-1/4 w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-400 p-0.5 shadow-xl animate-float" style={{ animationDelay: '0.5s' }}>
                <div className="w-full h-full rounded-2xl bg-primary flex items-center justify-center">
                  <Code2 size={22} className="text-white" />
                </div>
              </div>
              <div className="hidden lg:flex absolute -right-6 top-1/2 w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-400 p-0.5 shadow-xl animate-float" style={{ animationDelay: '1.2s' }}>
                <div className="w-full h-full rounded-2xl bg-primary flex items-center justify-center">
                  <Palette size={22} className="text-white" />
                </div>
              </div>
              <div className="hidden lg:flex absolute -bottom-4 right-1/4 w-14 h-14 rounded-2xl bg-gradient-to-br from-orange-500 to-yellow-400 p-0.5 shadow-xl animate-float" style={{ animationDelay: '2s' }}>
                <div className="w-full h-full rounded-2xl bg-primary flex items-center justify-center">
                  <Rocket size={22} className="text-white" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Bar */}
        <div className="grid grid-cols-3 gap-6 md:gap-12 mt-16 pt-10 border-t border-white/10 animate-fadeInUp" style={{ animationDelay: '0.7s' }}>
          {[
            { value: '50+', label: 'Projects Done', gradient: 'from-accent to-cyan-400' },
            { value: '30+', label: 'Happy Clients', gradient: 'from-cyan-400 to-purple-400' },
            { value: '5+', label: 'Years Experience', gradient: 'from-purple-400 to-pink-400' },
          ].map(({ value, label, gradient }) => (
            <div key={label} className="group cursor-pointer text-center lg:text-left">
              <p
                className={`text-3xl sm:text-4xl md:text-5xl font-black bg-gradient-to-r ${gradient} bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-500 inline-block`}
              >
                {value}
              </p>
              <p className="text-gray-500 mt-2 text-xs sm:text-sm md:text-base font-medium">{label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
