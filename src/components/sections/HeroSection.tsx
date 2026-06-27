import React, { useState, useEffect, useMemo } from 'react';
import { Button } from '@/components/common';
import { ArrowRight, Download, Sparkles, Code2, Palette, Rocket } from 'lucide-react';

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
    Array.from({ length: 20 }, (_, i) => ({
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
    <section className="min-h-screen relative flex items-center justify-center px-4 py-20 overflow-hidden">
      <div className="aurora-bg" />
      <div className="absolute inset-0 grid-bg opacity-40" />
      {particles.map((p) => (
        <FloatingParticle key={p.id} {...p} />
      ))}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] md:w-[700px] md:h-[700px] bg-gradient-to-br from-accent/10 via-cyan-500/5 to-purple-500/10 morph-blob blur-3xl animate-morph" />

      <div className="max-w-5xl mx-auto text-center relative z-10">
        <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full glass mb-8 animate-fadeInDown">
          <Sparkles size={16} className="text-accent animate-pulseGlow" />
          <span className="text-sm font-medium text-gray-300">Available for Freelance Work</span>
          <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
        </div>

        <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-white mb-4 animate-fadeInUp leading-[1.1] tracking-tight" style={{ fontFamily: "'Space Grotesk', 'Inter', sans-serif" }}>
          Hi, I'm <span className="gradient-text">Hasibul</span>
        </h1>

        <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white/80 mb-8 animate-fadeInUp h-14 md:h-16 flex items-center justify-center" style={{ animationDelay: '0.2s', fontFamily: "'Space Grotesk', 'Inter', sans-serif" }}>
          <span className="typing-cursor">{typingText}</span>
        </div>

        <p className="text-base sm:text-lg md:text-xl text-gray-400 mb-12 max-w-2xl mx-auto leading-relaxed animate-fadeInUp" style={{ animationDelay: '0.3s' }}>
          I craft <span className="text-accent font-semibold">stunning</span>, <span className="text-cyan-400 font-semibold">pixel-perfect</span>, and <span className="text-purple-400 font-semibold">high-performance</span> web experiences that captivate users and elevate brands.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16 animate-fadeInUp" style={{ animationDelay: '0.4s' }}>
          <button onClick={scrollToPortfolio} className="w-full sm:w-auto">
            <Button variant="primary" size="lg" className="w-full group text-lg">
              <span>View My Work</span>
              <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
            </Button>
          </button>
          <button onClick={scrollToContact} className="w-full sm:w-auto">
            <Button variant="secondary" size="lg" className="w-full group text-lg">
              <Download size={20} />
              <span>Hire Me</span>
            </Button>
          </button>
        </div>

        <div className="hidden md:flex justify-center gap-8 mb-16 animate-fadeInUp" style={{ animationDelay: '0.5s' }}>
          {[
            { icon: Code2, label: 'Clean Code', color: 'from-blue-500 to-cyan-400', delay: '0s' },
            { icon: Palette, label: 'UI Design', color: 'from-purple-500 to-pink-400', delay: '0.5s' },
            { icon: Rocket, label: 'Performance', color: 'from-orange-500 to-yellow-400', delay: '1s' },
          ].map(({ icon: Icon, label, color, delay }) => (
            <div key={label} className="group flex flex-col items-center gap-3 cursor-pointer" style={{ animationDelay: delay }}>
              <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${color} p-0.5 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-lg`}>
                <div className="w-full h-full rounded-2xl bg-primary flex items-center justify-center">
                  <Icon size={24} className="text-white" />
                </div>
              </div>
              <span className="text-xs text-gray-500 group-hover:text-gray-300 font-medium transition-colors">{label}</span>
            </div>
          ))}
        </div>

        <div className="animate-bounce mb-8">
          <div className="w-6 h-10 rounded-full border-2 border-white/20 mx-auto flex justify-center pt-2">
            <div className="w-1 h-3 rounded-full bg-accent animate-pulse" />
          </div>
        </div>

        <div className="grid grid-cols-3 gap-6 md:gap-12 pt-12 border-t border-white/10 animate-fadeInUp" style={{ animationDelay: '0.6s' }}>
          {[
            { value: '50+', label: 'Projects Done', gradient: 'from-accent to-cyan-400' },
            { value: '30+', label: 'Happy Clients', gradient: 'from-cyan-400 to-purple-400' },
            { value: '5+', label: 'Years Experience', gradient: 'from-purple-400 to-pink-400' },
          ].map(({ value, label, gradient }) => (
            <div key={label} className="group cursor-pointer">
              <p className={`text-3xl sm:text-4xl md:text-5xl font-black bg-gradient-to-r ${gradient} bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-500 inline-block`}>
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
