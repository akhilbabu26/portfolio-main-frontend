import { useCallback, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import { ArrowRight, Download } from 'lucide-react';
import { FaGithub, FaLinkedin, FaWhatsapp } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';
import Particles from '@tsparticles/react';
import { loadSlim } from '@tsparticles/slim';

const Hero = () => {
  const particlesInit = useCallback(async (engine) => {
    await loadSlim(engine);
  }, []);

  const sectionRef = useRef(null);
  const particlesRef = useRef(null);

  // Pause particle animation when Hero is not in the viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        const container = particlesRef.current?.props?.container;
        if (!entry.isIntersecting) {
          // Pause via tsParticles container API if available
          try { window.tsParticles?.domItem(0)?.pause?.(); } catch (_) {}
        } else {
          try { window.tsParticles?.domItem(0)?.play?.(); } catch (_) {}
        }
      },
      { threshold: 0.05 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Particle Background */}
      <Particles
        ref={particlesRef}
        id="tsparticles"
        init={particlesInit}
        options={{
          background: { color: { value: 'transparent' } },
          fpsLimit: 40,
          interactivity: {
            events: {
              onHover: { enable: true, mode: 'repulse' },
              onClick: { enable: true, mode: 'push' },
            },
            modes: {
              repulse: { distance: 100, duration: 0.4 },
              push: { quantity: 2 },
            },
          },
          particles: {
            color: { value: '#3b82f6' },
            links: {
              color: '#3b82f6',
              distance: 150,
              enable: true,
              opacity: 0.08,
              width: 1,
            },
            move: {
              direction: 'none',
              enable: true,
              outModes: { default: 'bounce' },
              random: false,
              speed: 0.5,
              straight: false,
            },
            number: { density: { enable: true, area: 1000 }, value: 45 },
            opacity: { value: 0.15 },
            shape: { type: 'circle' },
            size: { value: { min: 1, max: 2.5 } },
          },
          detectRetina: false,
        }}
        className="absolute inset-0 z-0"
      />

      {/* Glowing orbs */}
      <div className="absolute top-1/4 left-1/3 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-indigo-600/8 rounded-full blur-[100px] pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          {/* Tag */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-slate-400 text-base md:text-md  font-medium"
          >
             Hi there, I am
          </motion.p>

          {/* Name */}
          <motion.h1
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-5xl sm:text-7xl md:text-8xl font-black tracking-tighter text-white mb-6 leading-none"
            style={{ fontFamily: 'Space Grotesk, sans-serif' }}
          >
            AKHIL BABU
          </motion.h1>

          {/* Typed Role */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="text-xl md:text-2xl font-semibold mb-6 h-10 flex items-center justify-center gap-2"
          >
            <span className="text-slate-300">I'm a </span>
            <TypeAnimation
              sequence={[
                'Backend Developer', 2000,
                'Go Engineer', 2000,
                'API Architect', 2000,
                'Database Designer', 2000,
              ]}
              wrapper="span"
              speed={50}
              repeat={Infinity}
              className="gradient-text font-bold"
            />
          </motion.div>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="text-slate-400 text-base md:text-lg max-w-2xl mx-auto mb-12 leading-relaxed"
          >
            Building modern, scalable web applications with Go &amp; Gin.
            Focused on performance, clean code, and developer experience.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.5 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-14"
          >
            <a href="#projects" className="btn-primary">
              View Projects <ArrowRight size={18} />
            </a>
            <a href="/cv.pdf" target="_blank" rel="noopener noreferrer" className="btn-secondary">
              Download CV <Download size={18} />
            </a>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-slate-600 text-xs uppercase tracking-widest">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="w-px h-10 bg-gradient-to-b from-blue-500/60 to-transparent"
        />
      </motion.div>
    </section>
  );
};

export default Hero;
