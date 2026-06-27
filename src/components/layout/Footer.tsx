import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { SOCIAL_LINKS, CONTACT_EMAIL, WHATSAPP_NUMBER } from '@/constants/config';
import { Mail, MessageCircle, Github, Linkedin, Twitter, Instagram, ArrowUp, Sparkles } from 'lucide-react';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const navigate = useNavigate();
  const location = useLocation();

  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER.replace(/\D/g, '')}`;

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

  return (
    <footer className="relative border-t border-white/5 py-16 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-t from-primary via-slate-900 to-transparent" />
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-accent/5 rounded-full blur-[150px]" />
      <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-purple-500/5 rounded-full blur-[150px]" />

      <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-accent to-cyan-400 flex items-center justify-center shadow-lg shadow-accent/20">
                <Sparkles size={16} className="text-white" />
              </div>
              <span className="text-lg font-bold text-white" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                Hasibul
              </span>
            </div>
            <p className="text-gray-500 text-sm leading-relaxed">
              Creating beautiful, modern web experiences that help businesses grow and succeed online.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-5">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map(({ label, action }) => (
                <li key={label}>
                  <a href="/" onClick={action} className="text-gray-400 hover:text-accent transition-colors duration-300 text-sm font-medium link-underline inline-block cursor-pointer">
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-5">Services</h4>
            <ul className="space-y-3 text-sm text-gray-400">
              <li>Web Design</li>
              <li>UI/UX Design</li>
              <li>Frontend Development</li>
              <li>Responsive Design</li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-5">Get In Touch</h4>
            <div className="space-y-3">
              <a href={`mailto:${CONTACT_EMAIL}`} className="flex items-center gap-2 text-gray-400 hover:text-accent transition-colors duration-300 text-sm group">
                <Mail size={15} className="group-hover:rotate-12 transition-transform" />
                {CONTACT_EMAIL}
              </a>
              <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-gray-400 hover:text-accent transition-colors duration-300 text-sm group">
                <MessageCircle size={15} className="group-hover:rotate-12 transition-transform" />
                WhatsApp
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-white/5 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex gap-4">
              {[
                { href: SOCIAL_LINKS.github, icon: Github, title: 'GitHub' },
                { href: SOCIAL_LINKS.linkedin, icon: Linkedin, title: 'LinkedIn' },
                { href: SOCIAL_LINKS.twitter, icon: Twitter, title: 'Twitter' },
                { href: SOCIAL_LINKS.instagram, icon: Instagram, title: 'Instagram' },
              ].map(({ href, icon: Icon, title }) => (
                <a key={title} href={href} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-accent hover:bg-accent/10 hover:border-accent/30 hover:scale-110 transition-all duration-300" title={title}>
                  <Icon size={18} />
                </a>
              ))}
            </div>

            <p className="text-gray-500 text-sm">&copy; {currentYear} Hasibul Hassan. All rights reserved.</p>

            <button onClick={scrollToTop} className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-gray-400 hover:text-accent hover:border-accent/30 hover:bg-accent/5 transition-all duration-300 text-sm font-medium group">
              Back to Top
              <ArrowUp size={14} className="group-hover:-translate-y-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
