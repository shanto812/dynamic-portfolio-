import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/common';
import { Menu, X, Sparkles } from 'lucide-react';

const scrollToHash = (hash: string) => {
  const id = hash.replace('#', '');
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
};

export const Header: React.FC = () => {
  const { user, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
    if (location.hash) {
      setTimeout(() => scrollToHash(location.hash), 100);
    }
  }, [location]);

  const handleLogout = async () => {
    try {
      await logout();
      window.location.href = '/';
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const handleNavClick = (e: React.MouseEvent, hash: string) => {
    e.preventDefault();
    if (location.pathname !== '/') {
      navigate(`/${hash}`);
    } else {
      scrollToHash(hash);
    }
    setIsMenuOpen(false);
  };

  const handleHomeClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (location.pathname !== '/') {
      navigate('/');
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  const navLinks = [
    { hash: '', label: 'Home', onClick: handleHomeClick },
    { hash: '#about', label: 'About' },
    { hash: '#portfolio', label: 'Portfolio' },
    { hash: '#contact', label: 'Contact' },
  ];

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      scrolled ? 'glass shadow-xl shadow-black/20 border-b border-white/5' : 'bg-transparent'
    }`}>
      <nav className="max-w-7xl mx-auto px-4 md:px-8 py-4 flex items-center justify-between">
        <a href="/" onClick={handleHomeClick} className="group flex items-center gap-2 relative">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-accent to-cyan-400 flex items-center justify-center shadow-lg shadow-accent/30 group-hover:shadow-accent/50 group-hover:scale-110 transition-all duration-500">
            <Sparkles size={20} className="text-white" />
          </div>
          <span className="text-xl font-bold text-white group-hover:text-accent transition-colors duration-300" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            Hasibul
          </span>
        </a>

        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            link.onClick ? (
              <a key={link.label} href="/" onClick={link.onClick} className="link-underline px-4 py-2 text-sm font-medium text-gray-300 hover:text-white transition-colors duration-300 rounded-lg hover:bg-white/5 cursor-pointer">
                {link.label}
              </a>
            ) : (
              <a key={link.label} href={`/${link.hash}`} onClick={(e) => handleNavClick(e, link.hash)} className="link-underline px-4 py-2 text-sm font-medium text-gray-300 hover:text-white transition-colors duration-300 rounded-lg hover:bg-white/5 cursor-pointer">
                {link.label}
              </a>
            )
          ))}

          {user ? (
            <div className="flex items-center gap-3 ml-4">
              <Link to="/admin" className="link-underline px-4 py-2 text-sm font-medium text-gray-300 hover:text-white transition-colors duration-300 rounded-lg hover:bg-white/5">
                Dashboard
              </Link>
              <Button variant="secondary" size="sm" onClick={handleLogout}>
                Logout
              </Button>
            </div>
          ) : (
            <Link to="/admin/login" className="ml-4">
              <Button variant="primary" size="sm">
                Login
              </Button>
            </Link>
          )}
        </div>

        <button className="md:hidden w-10 h-10 rounded-xl glass flex items-center justify-center text-gray-300 hover:text-white hover:bg-white/10 transition-all duration-300" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      <div className={`md:hidden overflow-hidden transition-all duration-500 ease-in-out ${
        isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
      }`}>
        <div className="glass border-t border-white/5 px-4 py-6 space-y-2">
          {navLinks.map((link) => (
            link.onClick ? (
              <a key={link.label} href="/" onClick={link.onClick} className="block px-4 py-3 text-gray-300 hover:text-white hover:bg-white/5 rounded-xl transition-all duration-300 font-medium cursor-pointer">
                {link.label}
              </a>
            ) : (
              <a key={link.label} href={`/${link.hash}`} onClick={(e) => handleNavClick(e, link.hash)} className="block px-4 py-3 text-gray-300 hover:text-white hover:bg-white/5 rounded-xl transition-all duration-300 font-medium cursor-pointer">
                {link.label}
              </a>
            )
          ))}
          <div className="pt-4 border-t border-white/5">
            {user ? (
              <div className="space-y-2">
                <Link to="/admin" className="block px-4 py-3 text-gray-300 hover:text-white hover:bg-white/5 rounded-xl transition-all font-medium">
                  Dashboard
                </Link>
                <Button variant="secondary" size="sm" onClick={handleLogout} className="w-full">
                  Logout
                </Button>
              </div>
            ) : (
              <Link to="/admin/login" className="block">
                <Button variant="primary" size="sm" className="w-full">
                  Login
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
