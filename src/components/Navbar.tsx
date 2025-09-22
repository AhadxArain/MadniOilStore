import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Home', href: '#home' },
    { name: 'Services', href: '#services' },
    { name: 'About', href: '#about' },
    { name: 'Contact', href: '#contact' }
  ];

  const handleNavClick = (href: string) => {
    if (isHomePage && href.startsWith('#')) {
      // Smooth scroll to section on home page  
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
    setIsOpen(false);
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-secondary/95 backdrop-blur-md shadow-lg' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <img 
              src="/uploads/b7a9fc8b-1b12-4cc9-93ee-4934ae12e7de.png" 
              alt="Madni Oil Store Logo"
              className="w-12 h-12 object-contain"
            />
            <div>
              <h1 className="text-xl font-automotive font-bold text-primary-foreground">
                Madni Oil Store
              </h1>
              <p className="text-xs text-primary-foreground/80">FROM OIL TO OVERHAUL, WE FIX IT ALL AT MADNI</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              {isHomePage ? (
                <>
                  {navItems.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className="nav-link text-primary-foreground"
                      onClick={(e) => {
                        e.preventDefault();
                        handleNavClick(item.href);
                      }}
                    >
                      {item.name}
                    </a>
                  ))}
                </>
              ) : (
                <Link 
                  to="/" 
                  className="nav-link text-primary-foreground hover:text-accent transition-colors"
                >
                  Back to Home
                </Link>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-primary-foreground hover:text-primary transition-colors duration-200"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-secondary/95 backdrop-blur-md rounded-lg mt-2">
              {isHomePage ? (
                <>
                  {navItems.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className="block px-3 py-2 text-primary-foreground hover:text-primary transition-colors duration-200"
                      onClick={(e) => {
                        e.preventDefault();
                        handleNavClick(item.href);
                      }}
                    >
                      {item.name}
                    </a>
                  ))}
                </>
              ) : (
                <Link 
                  to="/" 
                  className="block px-3 py-2 text-primary-foreground hover:text-accent transition-colors duration-200"
                  onClick={() => setIsOpen(false)}
                >
                  Back to Home
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;