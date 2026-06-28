import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { SOCIAL_LINKS, CONTACT_EMAIL, CONTACT_PHONE_DISPLAY, WHATSAPP_NUMBER, NICKNAME } from '@/constants/config';
import { Mail, Phone, Github, Linkedin, Facebook, ArrowUp, Sparkles, Heart, ExternalLink } from 'lucide-react';

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
    { href: SOCIAL_LINKS.github, icon: Github, label: 'GitHub', color: 'hover:text-white hover:bg-gray-800 hover:border-gray-600' },
    { href: SOCIAL_LINKS.linkedin, icon: Linkedin, label: 'LinkedIn', color: 'hover:text-white hover:bg-blue-600 hover:border-blue-600' },
    { href: SOCIAL_LINKS.facebook, icon: Facebook, label: 'Facebook', color: 'hover:text-white hover:bg-blue-700 hover:border-blue-700' },
  ];

  return (
    <footer className="relative overflow-hidden border-t border-white/5 pt-0 pb-0">
      {/* SHANTO Giant Background Text */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
        <span
          className="text-[20vw] md:text-[18vw] lg:text-[16vw] font-black tracking-tighter leading-none bg-gradient-to-b from-white/[0.04] via-white/[0.06] to-transparent bg-clip-text text-transparent"
          style={{ fontFamily: "'Space Grotesk', sans-serif", letterSpacing: '-0.05em' }}
        >
          {NICKNAME}
        </span>
      </div>

      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-primary/90 to-primary/40 pointer-events-none" />
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[180px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-purple-500/5 rounded-full blur-[180px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8 py-16 md:py-20">
        {/* Top: Big CTA */}
        <div className="text-center mb-16">
          <h2
            className="text-4xl md:text-6xl lg:text-7xl font-black text-white mb-4"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            Let's Build Something
            <br />
            <span className="gradient-text">Amazing Together</span>
          </h2>
          <p className="text-gray-400 text-lg mb-8 max-w-xl mx-auto">
            Got a project idea? I'd love to hear about it. Drop me a line and let's make it real.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a href={`mailto:${CONTACT_EMAIL}`}>
              <button className="group px-8 py-4 rounded-2xl bg-gradient-to-r from-accent via-cyan-500 to-blue-500 text-white font-bold shadow-2xl shadow-accent/30 hover:shadow-accent/60 hover:-translate-y-1 hover:scale-105 transition-all duration-500 flex items-center gap-3">
                <Mail size={20} className="group-hover:rotate-12 transition-transform" />
                <span>Say Hello</span>
                <ExternalLink size={16} className="opacity-60 group-hover:opacity-100 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
              </button>
            </a>
            <a href={`tel:${CONTACT_PHONE_DISPLAY.replace(/[^+\d]/g, '')}`}>
              <button className="group px-8 py-4 rounded-2xl bg-white/5 text-white font-bold border border-white/10 hover:border-accent/40 hover:bg-white/10 hover:-translate-y-1 transition-all duration-500 flex items-center gap-3 backdrop-blur-xl">
                <Phone size={20} className="text-accent group-hover:rotate-12 transition-transform" />
                <span>{CONTACT_PHONE_DISPLAY}</span>
              </button>
            </a>
          </div>
        </div>

        {/* Contact Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-14">
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="group glass-card p-6 flex items-center gap-4 hover:border-accent/40 hover:-translate-y-1 transition-all duration-500"
          >
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-accent to-cyan-400 p-0.5 flex-shrink-0 group-hover:scale-110 transition-transform">
              <div className="w-full h-full rounded-2xl bg-primary flex items-center justify-center">
                <Mail size={20} className="text-white" />
              </div>
            </div>
            <div className="min-w-0">
              <p className="text-xs text-gray-500 font-bold uppercase tracking-widest mb-1">Email Me</p>
              <p className="text-white font-semibold text-sm truncate group-hover:text-accent transition-colors">
                {CONTACT_EMAIL}
              </p>
            </div>
          </a>

          <a
            href={`https://wa.me/${WHATSAPP_NUMBER.replace(/\D/g, '')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="group glass-card p-6 flex items-center gap-4 hover:border-green-500/40 hover:-translate-y-1 transition-all duration-500"
          >
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-green-400 to-emerald-500 p-0.5 flex-shrink-0 group-hover:scale-110 transition-transform">
              <div className="w-full h-full rounded-2xl bg-primary flex items-center justify-center">
                <Phone size={20} className="text-white" />
              </div>
            </div>
            <div className="min-w-0">
              <p className="text-xs text-gray-500 font-bold uppercase tracking-widest mb-1">Call / WhatsApp</p>
              <p className="text-white font-semibold text-sm group-hover:text-green-400 transition-colors">
                {CONTACT_PHONE_DISPLAY}
              </p>
            </div>
          </a>

          <div className="glass-card p-6 flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-400 to-pink-500 p-0.5 flex-shrink-0">
              <div className="w-full h-full rounded-2xl bg-primary flex items-center justify-center">
                <Sparkles size={20} className="text-white" />
              </div>
            </div>
            <div className="min-w-0">
              <p className="text-xs text-gray-500 font-bold uppercase tracking-widest mb-1">Status</p>
              <p className="text-white font-semibold text-sm flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                Available for work
              </p>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent mb-10" />

        {/* Bottom row: Brand | Quick Links | Social */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
          {/* Brand */}
          <div className="flex flex-col items-center md:items-start">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-accent to-cyan-400 flex items-center justify-center shadow-lg shadow-accent/30">
                <Sparkles size={18} className="text-white" />
              </div>
              <span className="text-xl font-bold text-white" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                Hasibul
              </span>
            </div>
            <p className="text-gray-500 text-xs text-center md:text-left leading-relaxed max-w-xs">
              Crafting beautiful digital experiences with passion, precision, and a whole lot of coffee.
            </p>
          </div>

          {/* Quick Links */}
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-3">
            {quickLinks.map(({ label, action }) => (
              <a
                key={label}
                href="/"
                onClick={action}
                className="text-sm text-gray-400 hover:text-accent font-medium transition-colors duration-300 cursor-pointer link-underline"
              >
                {label}
              </a>
            ))}
          </div>

          {/* Social */}
          <div className="flex justify-center md:justify-end gap-3">
            {socials.map(({ href, icon: Icon, label, color }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                title={label}
                className={`w-11 h-11 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:scale-110 hover:shadow-lg transition-all duration-300 ${color}`}
              >
                <Icon size={18} />
              </a>
            ))}
          </div>
        </div>

        {/* Copyright Bar */}
        <div className="mt-12 pt-6 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-xs flex items-center gap-1.5">
            &copy; {currentYear} Hasibul Hassan. Crafted with <Heart size={12} className="text-red-400 fill-red-400 animate-pulse" /> in Bangladesh
          </p>
          <button
            onClick={scrollToTop}
            className="group flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-gray-400 hover:text-accent hover:border-accent/40 hover:bg-accent/5 transition-all duration-300 text-xs font-bold uppercase tracking-widest"
          >
            <span>Back to Top</span>
            <ArrowUp size={14} className="group-hover:-translate-y-1 transition-transform" />
          </button>
        </div>
      </div>
    </footer>
  );
};
