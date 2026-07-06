import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/common';
import { Menu, X } from 'lucide-react';
import logoImg from '@/image/logo.png'; 

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
    <header className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-6 lg:px-8 py-4 transition-all duration-500">
      
      {/* Modern navigation container bar with a sleek rounded-2xl profile */}
      <nav className={`max-w-[1700px] mx-auto px-6 py-3.5 flex items-center justify-between transition-all duration-500 rounded-2xl border backdrop-blur-md ${
        scrolled 
          ? 'bg-neutral-950/80 border-[#FD1D1D]/20 shadow-xl shadow-black/40' 
          : 'bg-white/[0.02] border-white/5 shadow-sm'
      }`}>
        
        {/* Logo - Permanent Signature Gradient Design with Custom Asset Mark */}
        <a href="/" onClick={handleHomeClick} className="group flex items-center gap-3 relative select-none">
          {/* Geometric Custom Brand Icon Frame */}
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#FD1D1D] via-[#FCB045] to-[#FD1D1D] bg-[length:200%_auto] p-[1.5px] shadow-lg shadow-[#FD1D1D]/10 group-hover:bg-[100%_center] group-hover:scale-[1.03] transition-all duration-700 ease-out">
            <div className="w-full h-full rounded-[10px] bg-[#030303] flex items-center justify-center p-1.5 overflow-hidden">
              <img 
                src={logoImg} 
                alt="Hasibul Hasan Shanto" 
                className="w-full h-full object-contain transform group-hover:scale-105 group-hover:rotate-3 transition-transform duration-500" 
              />
            </div>
          </div>

          {/* Typography - Fluid Core Gradient */}
          <div className="flex flex-col">
            <span 
              className="text-sm md:text-base font-black tracking-wide bg-gradient-to-r from-[#FD1D1D] via-[#FCB045] to-[#FD1D1D] bg-[length:200%_auto] bg-clip-text text-transparent group-hover:bg-[100%_center] transition-all duration-700 ease-out uppercase" 
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              Hasibul Hasan Shanto
            </span>
            {/* Minimal sub-line accent line */}
            <div className="h-[2px] bg-gradient-to-r from-[#FD1D1D] to-transparent w-4 group-hover:w-full transition-all duration-500 mt-0.5 rounded-full" />
          </div>
        </a>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            link.onClick ? (
              <a key={link.label} href="/" onClick={link.onClick} className="px-4 py-2 text-sm font-medium text-neutral-400 hover:text-white transition-colors duration-300 rounded-xl hover:bg-white/5 cursor-pointer">
                {link.label}
              </a>
            ) : (
              <a key={link.label} href={`/${link.hash}`} onClick={(e) => handleNavClick(e, link.hash)} className="px-4 py-2 text-sm font-medium text-neutral-400 hover:text-white transition-colors duration-300 rounded-xl hover:bg-white/5 cursor-pointer">
                {link.label}
              </a>
            )
          ))}

          {user ? (
            <div className="flex items-center gap-3 ml-4">
              <Link to="/admin" className="px-4 py-2 text-sm font-medium text-neutral-400 hover:text-white transition-colors duration-300 rounded-xl hover:bg-white/5">
                Dashboard
              </Link>
              <Button variant="secondary" size="sm" onClick={handleLogout} className="rounded-xl">
                Logout
              </Button>
            </div>
          ) : (
            <Link to="/admin/login" className="ml-4">
              <Button variant="primary" size="sm" className="rounded-xl !bg-gradient-to-r from-[#FD1D1D] to-[#FCB045] border-0 text-white font-semibold">
                Login
              </Button>
            </Link>
          )}
        </div>

        {/* Mobile Menu Toggle Button */}
        <button className="md:hidden w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-neutral-400 hover:text-white hover:bg-white/10 transition-all duration-300 border border-white/5" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      {/* Mobile Dropdown Menu - Sleek Card Layout */}
      <div className={`md:hidden overflow-hidden transition-all duration-500 ease-in-out mt-2 max-w-[1750px] mx-auto ${
        isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
      }`}>
        <div className="bg-neutral-950/95 border border-neutral-900 rounded-2xl px-4 py-5 space-y-1 shadow-2xl backdrop-blur-xl">
          {navLinks.map((link) => (
            link.onClick ? (
              <a key={link.label} href="/" onClick={link.onClick} className="block px-4 py-2.5 text-neutral-400 hover:text-white hover:bg-white/5 rounded-xl transition-all duration-300 text-sm font-medium cursor-pointer">
                {link.label}
              </a>
            ) : (
              <a key={link.label} href={`/${link.hash}`} onClick={(e) => handleNavClick(e, link.hash)} className="block px-4 py-2.5 text-neutral-400 hover:text-white hover:bg-white/5 rounded-xl transition-all duration-300 text-sm font-medium cursor-pointer">
                {link.label}
              </a>
            )
          ))}
          <div className="pt-3 mt-2 border-t border-neutral-900">
            {user ? (
              <div className="space-y-2">
                <Link to="/admin" className="block px-4 py-2.5 text-neutral-400 hover:text-white hover:bg-white/5 rounded-xl transition-all text-sm font-medium">
                  Dashboard
                </Link>
                <Button variant="secondary" size="sm" onClick={handleLogout} className="w-full rounded-xl">
                  Logout
                </Button>
              </div>
            ) : (
              <Link to="/admin/login" className="block pt-1">
                <Button variant="primary" size="sm" className="w-full rounded-xl !bg-gradient-to-r from-[#FD1D1D] to-[#FCB045] border-0 text-white font-semibold">
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