import React from 'react';
import { Link } from 'react-router-dom';
import { SOCIAL_LINKS, CONTACT_EMAIL, WHATSAPP_NUMBER } from '@/constants/config';
import { Mail, MessageCircle, Github, Linkedin, Twitter, Instagram, ArrowUp } from 'lucide-react';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER.replace(/\D/g, '')}`;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-gradient-to-b from-primary via-slate-900 to-primary border-t border-gray-700/50 py-12 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl -z-10"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-cyan-500/5 rounded-full blur-3xl -z-10"></div>

      <div className="max-w-7xl mx-auto px-4 md:px-8">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8 stagger">
          {/* About */}
          <div className="animate-fadeInUp group">
            <h3 className="text-lg font-semibold bg-gradient-to-r from-accent to-cyan-400 bg-clip-text text-transparent mb-4 group-hover:to-green-400 transition-all">
              Portfolio
            </h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Creating beautiful, modern, and functional web designs that help businesses grow and succeed online.
            </p>
          </div>

          {/* Quick Links */}
          <div className="animate-fadeInUp" style={{ animationDelay: '0.1s' }}>
            <h4 className="text-sm font-semibold bg-gradient-to-r from-gray-200 to-gray-300 bg-clip-text text-transparent mb-4">Quick Links</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link to="/" className="text-gray-400 hover:text-accent transition-colors duration-300 font-medium relative group inline-block">
                  Home
                  <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-accent to-cyan-400 group-hover:w-full transition-all duration-300"></div>
                </Link>
              </li>
              <li>
                <Link to="/#about" className="text-gray-400 hover:text-accent transition-colors duration-300 font-medium relative group inline-block">
                  About
                  <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-accent to-cyan-400 group-hover:w-full transition-all duration-300"></div>
                </Link>
              </li>
              <li>
                <Link to="/#portfolio" className="text-gray-400 hover:text-accent transition-colors duration-300 font-medium relative group inline-block">
                  Portfolio
                  <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-accent to-cyan-400 group-hover:w-full transition-all duration-300"></div>
                </Link>
              </li>
              <li>
                <Link to="/#contact" className="text-gray-400 hover:text-accent transition-colors duration-300 font-medium relative group inline-block">
                  Contact
                  <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-accent to-cyan-400 group-hover:w-full transition-all duration-300"></div>
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="animate-fadeInUp" style={{ animationDelay: '0.2s' }}>
            <h4 className="text-sm font-semibold bg-gradient-to-r from-gray-200 to-gray-300 bg-clip-text text-transparent mb-4">Get In Touch</h4>
            <div className="space-y-3">
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="flex items-center gap-2 text-gray-400 hover:text-accent transition-colors duration-300 text-sm font-medium group"
              >
                <Mail size={16} className="group-hover:rotate-12 transition-transform" />
                {CONTACT_EMAIL}
              </a>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-gray-400 hover:text-accent transition-colors duration-300 text-sm font-medium group"
              >
                <MessageCircle size={16} className="group-hover:rotate-12 transition-transform" />
                WhatsApp
              </a>
            </div>
          </div>
        </div>

        {/* Social Links */}
        <div className="border-t border-gray-700/50 pt-8">
          <div className="flex justify-center gap-6 mb-8 stagger">
            {[
              { href: SOCIAL_LINKS.github, icon: Github, title: 'GitHub' },
              { href: SOCIAL_LINKS.linkedin, icon: Linkedin, title: 'LinkedIn' },
              { href: SOCIAL_LINKS.twitter, icon: Twitter, title: 'Twitter' },
              { href: SOCIAL_LINKS.instagram, icon: Instagram, title: 'Instagram' },
            ].map(({ href, icon: Icon, title }, idx) => (
              <a
                key={title}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-accent hover:scale-125 transform transition-all duration-300 group relative"
                title={title}
                style={{ transitionDelay: `${idx * 50}ms` }}
              >
                <Icon size={20} className="group-hover:rotate-12" />
                <div className="absolute -inset-2 bg-accent/0 group-hover:bg-accent/10 rounded-full blur-xl transition-all duration-300 -z-10"></div>
              </a>
            ))}
          </div>

          {/* Copyright and Back to Top */}
          <div className="flex flex-col md:flex-row items-center justify-between text-gray-500 text-sm">
            <p>&copy; {currentYear} Portfolio. All rights reserved.</p>
            <button
              onClick={scrollToTop}
              className="mt-4 md:mt-0 flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-accent/10 to-cyan-500/10 hover:from-accent/20 hover:to-cyan-500/20 text-gray-400 hover:text-accent transition-all duration-300 font-medium group border border-accent/20 hover:border-accent/50"
            >
              Back to Top
              <ArrowUp size={16} className="group-hover:-translate-y-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
