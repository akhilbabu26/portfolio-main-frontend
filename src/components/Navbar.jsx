import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { FaGithub, FaLinkedin, FaWhatsapp } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';

const navLinks = [
  { name: 'Home', href: '#hero' },
  { name: 'About', href: '#about' },
  { name: 'Skills', href: '#skills' },
  { name: 'Projects', href: '#projects' },
  { name: 'Experience', href: '#experience' },
  { name: 'Contact', href: '#contact' },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Active section tracking via IntersectionObserver
  useEffect(() => {
    const sectionIds = navLinks.map(l => l.href.replace('#', ''));
    const observers = [];

    sectionIds.forEach(id => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveSection(id); },
        { rootMargin: '-40% 0px -55% 0px', threshold: 0 }
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach(obs => obs.disconnect());
  }, []);

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#060606]/80 backdrop-blur-xl border-b border-white/5 py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Logo */}
        <a
          href="#hero"
          className="text-2xl font-black tracking-tighter text-white hover:text-blue-400 transition-colors"
          style={{ fontFamily: 'Space Grotesk, sans-serif' }}
        >
          AKHIL.
        </a>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map(link => (
            <a
              key={link.name}
              href={link.href}
              className={`nav-link ${activeSection === link.href.replace('#','') ? 'active' : ''}`}
            >
              {link.name}
            </a>
          ))}
          <a
            href="/cv.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="ml-2 px-5 py-2 rounded-full border border-blue-500/50 text-blue-400 text-sm font-semibold hover:bg-blue-500/10 hover:border-blue-400 transition-all"
          >
            CV
          </a>
        </div>

        {/* Desktop socials */}
        <div className="hidden md:flex items-center gap-3">
          <a href="https://github.com/akhilbabu" target="_blank" rel="noopener noreferrer" className="social-icon"><FaGithub size={18} /></a>
          <a href="https://linkedin.com/in/akhilbabu" target="_blank" rel="noopener noreferrer" className="social-icon"><FaLinkedin size={18} /></a>
          <a href="mailto:akhil@example.com" className="social-icon"><MdEmail size={18} /></a>
          <a href="https://wa.me/919876543210" target="_blank" rel="noopener noreferrer" className="social-icon" style={{ color: '#25D366' }}><FaWhatsapp size={18} /></a>
        </div>

        {/* Mobile menu toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-slate-300 hover:text-white transition-colors"
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="md:hidden bg-[#060606]/95 backdrop-blur-xl border-t border-white/5"
          >
            <div className="px-4 py-6 space-y-1">
              {navLinks.map(link => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={`block px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                    activeSection === link.href.replace('#','')
                      ? 'text-blue-400 bg-blue-500/10'
                      : 'text-slate-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {link.name}
                </a>
              ))}
              <a
                href="/cv.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="block px-4 py-3 text-sm font-semibold text-blue-400 hover:text-blue-300 transition-colors"
              >
                Download CV
              </a>
              <div className="flex gap-4 px-4 pt-4">
                <a href="https://github.com/akhilbabu" target="_blank" rel="noopener noreferrer" className="social-icon"><FaGithub size={18} /></a>
                <a href="https://linkedin.com/in/akhilbabu" target="_blank" rel="noopener noreferrer" className="social-icon"><FaLinkedin size={18} /></a>
                <a href="mailto:akhil@example.com" className="social-icon"><MdEmail size={18} /></a>
                <a href="https://wa.me/919876543210" target="_blank" rel="noopener noreferrer" className="social-icon"><FaWhatsapp size={18} /></a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
