import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';

/* ─── Static project data ─── */
const PROJECTS = [
  {
    id: 1,
    title: 'Multibrand',
    subtitle: 'Full-Stack Backend System',
    description:
      'A production-ready e-commerce REST API with product catalog, order management, JWT auth, and role-based access control. Deployed with Docker on Railway.',
    stack: ['Go', 'Gin', 'PostgreSQL', 'Docker', 'Redis'],
    github: 'https://github.com/akhilbabu26/multibrand_database_4',
    demo: 'https://multibrand-database-4.vercel.app/',
    status: 'Completed',
    accent: '#3b82f6',
    images: ['/multibrand_1.png', '/multibrand_2.png'],
    num: '01',
  },
  {
    id: 2,
    title: 'Task Manager',
    subtitle: 'Real-Time Collaboration Tool',
    description:
      'A collaborative task management system with real-time updates via WebSockets, Redis pub/sub for live notifications, and a clean REST API for task CRUD operations.',
    stack: ['Go', 'Gin', 'Redis', 'WebSockets'],
    github: 'https://github.com/akhil-babu/task-manager',
    demo: null,
    status: 'In Progress',
    accent: '#7c3aed',
    images: ['/project_taskmanager.png'],  // add more: ['/img1.png', '/img2.png']
    num: '02',
  },
  {
    id: 3,
    title: 'Portfolio Website',
    subtitle: 'Full-Stack Developer Portfolio',
    description:
      'This very site — a modern full-stack portfolio with an interactive physics-based skills section, LeetCode stats dashboard, and Go backend for the contact form.',
    stack: ['React', 'Framer Motion', 'Go', 'Gin', 'Tailwind CSS'],
    github: 'https://github.com/akhilbabu26/portfolio-main-frontend',
    demo: 'https://portfolio-main-frontend.vercel.app/',
    status: 'Completed',
    accent: '#10b981',
    images: ['/project_portfolio.png'],  // add more: ['/img1.png', '/img2.png']
    num: '03',
  },
];

const N = PROJECTS.length;

/* ─── Single progress dot — own component so hooks are valid ─── */
const ProgressDot = ({ index, progress }) => {
  // Each project owns a band: [index/N … (index+1)/N]
  const start = index / N;
  const mid   = (index + 0.5) / N;
  const end   = (index + 1) / N;

  const opacity = useTransform(progress, [start, mid, end], [0.25, 1, 0.25]);
  const width   = useTransform(progress, [start, mid, end], ['8px', '28px', '8px']);
  return (
    <motion.div
      className="h-2 rounded-full bg-white"
      style={{ opacity, width }}
    />
  );
};

/* ─── Project Card — own component so hooks are valid ─── */
const ProjectCard = ({ project }) => {
  const images = project.images || [project.image];
  const [activeImg, setActiveImg] = useState(0);

  // Auto-cycle images every 3.5s when there are multiple
  useEffect(() => {
    if (images.length <= 1) return;
    const timer = setInterval(() => {
      setActiveImg(i => (i + 1) % images.length);
    }, 3500);
    return () => clearInterval(timer);
  }, [images.length]);

  const handleCardClick = () => {
    const url = project.demo || project.github;
    window.open(url, '_blank');
  };

  return (
    <div
      className="relative flex-shrink-0 w-screen h-screen flex items-center justify-center px-8 lg:px-28"
    >
      <div
        className="relative w-full max-w-4xl rounded-[2rem] overflow-hidden group cursor-pointer"
        style={{ height: '65vh' }}
        onClick={handleCardClick}
      >
        {/* Background images with fade carousel */}
        {images.map((src, i) => (
          <div
            key={src}
            className="absolute inset-0 bg-cover bg-center transition-all duration-700 ease-out"
            style={{
              backgroundImage: `url(${src})`,
              opacity: i === activeImg ? 1 : 0,
              transform: `scale(${i === activeImg ? 1.02 : 1})`,
            }}
          />
        ))}

        {/* Image dot indicators (only if multiple) */}
        {images.length > 1 && (
          <div className="absolute top-4 right-8 flex gap-1.5 z-20" onClick={e => e.stopPropagation()}>
            {images.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveImg(i)}
                className="w-1.5 h-1.5 rounded-full transition-all duration-300"
                style={{ background: i === activeImg ? project.accent : 'rgba(255,255,255,0.3)' }}
              />
            ))}
          </div>
        )}

        {/* Layer 1 — permanent strong bottom gradient: ALWAYS keeps text readable */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#060606] via-[#060606]/95 to-transparent" />

        {/* Layer 2 — full dim overlay: lightens on hover to reveal image */}
        <div className="absolute inset-0 bg-[#060606]/40 transition-opacity duration-500 group-hover:opacity-0" />

        {/* Layer 3 — left gradient: fades on hover */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#060606]/60 via-transparent to-transparent transition-opacity duration-500 group-hover:opacity-20" />

        {/* Bottom accent line */}
        <div
          className="absolute bottom-0 left-0 right-0 h-[2px] transition-opacity duration-500 opacity-50 group-hover:opacity-100"
          style={{ background: `linear-gradient(to right, ${project.accent}, transparent 60%)` }}
        />

        {/* Top bar */}
        <div className="absolute top-6 left-8 right-8 flex items-center justify-between">
          <span
            className="text-xs font-mono font-semibold px-3 py-1 rounded-full border"
            style={{
              color: project.accent,
              borderColor: `${project.accent}50`,
              background: `${project.accent}18`,
            }}
          >
            {project.status}
          </span>
          <span className="text-6xl font-bold font-mono select-none text-white/[0.04]">
            {project.num}
          </span>
        </div>

        {/* Bottom content */}
        <div className="absolute bottom-0 left-0 right-0 p-8 lg:p-10">
          {/* Stack chips */}
          <div className="flex flex-wrap gap-2 mb-3">
            {project.stack.map(tech => (
              <span
                key={tech}
                className="text-xs font-mono px-2.5 py-1 rounded-full text-white font-medium"
                style={{
                  background: 'rgba(16, 16, 16, 0.6)',
                  border: '1px solid rgba(255, 255, 255, 0.19)',
                }}
              >
                {tech}
              </span>
            ))}
          </div>

          <p className="text-xs uppercase tracking-widest mb-1 font-bold" style={{ color: project.accent }}>
            {project.subtitle}
          </p>
          <h3 className="text-3xl lg:text-4xl font-bold text-white mb-2 leading-tight">
            {project.title}
          </h3>
          <p className="text-white text-sm leading-relaxed max-w-lg mb-5">
            {project.description}
          </p>

          {/* Links — hidden by default, slide up on hover */}
          <div
            className="flex gap-5 opacity-0 translate-y-3 transition-all duration-400 group-hover:opacity-100 group-hover:translate-y-0"
            onClick={e => e.stopPropagation()}
          >
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-white/90 hover:text-white transition-colors font-medium"
            >
              <FaGithub size={15} />
              View Code
            </a>
            {project.demo && (
              <a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm font-medium hover:underline transition-colors"
                style={{ color: project.accent }}
              >
                <FaExternalLinkAlt size={13} />
                Live Demo
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

/* ─── Main Projects Component ─── */
const Projects = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],   // 0 = section top at viewport top, 1 = section bottom at viewport bottom
  });

  // All hooks at top level — no hooks inside JSX or loops
  const x          = useTransform(scrollYProgress, [0, 1], ['0vw', `${-(N - 1) * 100}vw`]);
  const hintOpacity = useTransform(scrollYProgress, [0, 0.08], [1, 0]);

  return (
    <section id="projects" className="relative">
      {/* Section heading — sits above the sticky scroll area */}
      <div className="text-center pt-14 pb-2 px-4">
        <span className="section-tag">Portfolio</span>
        <h2 className="section-heading mt-2">My Projects &amp; Works</h2>
        <p className="text-slate-500 text-sm mt-2">Scroll to explore →</p>
        <div className="w-16 h-1 bg-blue-500 rounded-full mx-auto mt-4" />
      </div>

      {/* Tall wrapper gives vertical scroll room */}
      <div ref={containerRef} style={{ height: `${N * 100}vh` }} className="relative">

        {/* Sticky viewport */}
        <div className="sticky top-0 h-screen overflow-hidden">


          {/* Horizontal strip of cards */}
          <motion.div
            style={{ x }}
            className="flex h-full will-change-transform"
          >
            {PROJECTS.map((project, i) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={i}
                progress={scrollYProgress}
              />
            ))}
          </motion.div>

          {/* Progress dots */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3 z-20">
            {PROJECTS.map((_, i) => (
              <ProgressDot key={i} index={i} progress={scrollYProgress} />
            ))}
          </div>

          {/* Scroll hint */}
          <motion.div
            style={{ opacity: hintOpacity }}
            className="absolute bottom-10 right-12 flex items-center gap-2 text-slate-500 text-xs select-none"
          >
            <span>Scroll</span>
            <motion.span
              animate={{ x: [0, 6, 0] }}
              transition={{ repeat: Infinity, duration: 1.4, ease: 'easeInOut' }}
            >
              →
            </motion.span>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default Projects;
