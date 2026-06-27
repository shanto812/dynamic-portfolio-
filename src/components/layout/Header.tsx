import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/common';
import { Menu, X } from 'lucide-react';

export const Header: React.FC = () => {
  const { user, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await logout();
      window.location.href = '/';
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <header className="bg-gradient-to-r from-secondary via-slate-900 to-secondary border-b border-gray-700/50 sticky top-0 z-40 backdrop-blur-md bg-opacity-95 shadow-lg shadow-black/50">
      <nav className="max-w-7xl mx-auto px-4 md:px-8 py-4 flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold bg-gradient-to-r from-accent to-cyan-400 bg-clip-text text-transparent hover:from-cyan-400 hover:to-green-400 transition-all duration-300 hover:scale-110">
          Portfolio
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          <Link to="/" className="text-gray-300 hover:text-accent transition-colors duration-300 font-medium relative group">
            Home
            <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-accent to-cyan-400 group-hover:w-full transition-all duration-300"></div>
          </Link>
          <Link to="/#about" className="text-gray-300 hover:text-accent transition-colors duration-300 font-medium relative group">
            About
            <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-accent to-cyan-400 group-hover:w-full transition-all duration-300"></div>
          </Link>
          <Link to="/#portfolio" className="text-gray-300 hover:text-accent transition-colors duration-300 font-medium relative group">
            Portfolio
            <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-accent to-cyan-400 group-hover:w-full transition-all duration-300"></div>
          </Link>
          <Link to="/#contact" className="text-gray-300 hover:text-accent transition-colors duration-300 font-medium relative group">
            Contact
            <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-accent to-cyan-400 group-hover:w-full transition-all duration-300"></div>
          </Link>
          {user ? (
            <>
              <Link to="/admin" className="text-gray-300 hover:text-accent transition-colors duration-300 font-medium relative group">
                Admin
                <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-accent to-cyan-400 group-hover:w-full transition-all duration-300"></div>
              </Link>
              <Button
                variant="secondary"
                size="sm"
                onClick={handleLogout}
                className="hover:shadow-lg hover:shadow-accent/30"
              >
                Logout
              </Button>
            </>
          ) : (
            <Link to="/admin/login">
              <Button variant="primary" size="sm" className="hover:shadow-lg hover:shadow-accent/50">
                Login
              </Button>
            </Link>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-gray-300 hover:text-accent transition-all duration-300 transform hover:scale-110"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-gradient-to-b from-primary to-slate-900 border-t border-gray-700/50 px-4 py-4 space-y-4 animate-slideDown">
          <Link to="/" className="block text-gray-300 hover:text-accent transition-colors font-medium py-2">
            Home
          </Link>
          <Link to="/#about" className="block text-gray-300 hover:text-accent transition-colors font-medium py-2">
            About
          </Link>
          <Link to="/#portfolio" className="block text-gray-300 hover:text-accent transition-colors font-medium py-2">
            Portfolio
          </Link>
          <Link to="/#contact" className="block text-gray-300 hover:text-accent transition-colors font-medium py-2">
            Contact
          </Link>
          {user ? (
            <>
              <Link to="/admin" className="block text-gray-300 hover:text-accent transition-colors font-medium py-2">
                Admin
              </Link>
              <Button
                variant="secondary"
                size="sm"
                onClick={handleLogout}
                className="w-full"
              >
                Logout
              </Button>
            </>
          ) : (
            <Link to="/admin/login" className="block">
              <Button variant="primary" size="sm" className="w-full">
                Login
              </Button>
            </Link>
          )}
        </div>
      )}
    </header>
  );
};
