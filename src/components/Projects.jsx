import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';
import { MdRocketLaunch } from 'react-icons/md';
import axios from 'axios';

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.15 } },
};

const card = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const statusColor = {
  Completed: { bg: 'rgba(16,185,129,0.1)', border: 'rgba(16,185,129,0.3)', text: '#10b981' },
  'In Progress': { bg: 'rgba(245,158,11,0.1)', border: 'rgba(245,158,11,0.3)', text: '#f59e0b' },
  default: { bg: 'rgba(59,130,246,0.1)', border: 'rgba(59,130,246,0.3)', text: '#3b82f6' },
};

const ProjectSkeleton = () => (
  <div className="glass rounded-3xl p-8 border border-white/5 animate-pulse">
    <div className="h-5 bg-white/5 rounded-full w-3/4 mb-4" />
    <div className="h-4 bg-white/5 rounded-full w-full mb-2" />
    <div className="h-4 bg-white/5 rounded-full w-5/6 mb-6" />
    <div className="flex gap-2">
      {[1,2,3].map(i => <div key={i} className="h-7 w-16 bg-white/5 rounded-full" />)}
    </div>
  </div>
);

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL}/api/projects`)
      .then(res => { setProjects(res.data); setLoading(false); })
      .catch(() => { setError('Failed to load projects.'); setLoading(false); });
  }, []);

  return (
    <section id="projects" className="py-28 relative">
      <div className="absolute top-0 right-0 w-[500px] h-[400px] bg-blue-600/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <span className="section-tag">Portfolio</span>
          <h2 className="section-heading">Featured Projects</h2>
          <p className="text-slate-500 mt-4 max-w-xl mx-auto">
            A selection of projects that showcase my backend development skills.
          </p>
          <div className="w-16 h-1 bg-blue-500 rounded-full mx-auto mt-4" />
        </motion.div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1,2,3].map(i => <ProjectSkeleton key={i} />)}
          </div>
        ) : error ? (
          <div className="text-center py-16 text-red-400/80 glass rounded-3xl border border-red-500/10 p-12">
            <MdRocketLaunch size={40} className="mx-auto mb-4 opacity-40" />
            <p>{error}</p>
            <p className="text-slate-600 text-sm mt-2">Make sure the backend is running on port 8080.</p>
          </div>
        ) : (
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.1 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {projects.map((project) => {
              const sc = statusColor[project.status] || statusColor.default;
              return (
                <motion.div
                  key={project.id}
                  variants={card}
                  className="project-card glass rounded-3xl border border-white/5 flex flex-col overflow-hidden group"
                >
                  {/* Top accent bar */}
                  <div className="h-1 w-full bg-gradient-to-r from-blue-500 via-indigo-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  <div className="p-8 flex flex-col flex-grow">
                    {/* Header */}
                    <div className="flex items-start justify-between mb-5">
                      <div className="p-3 glass rounded-2xl border border-blue-500/20 text-blue-400 group-hover:bg-blue-500/10 transition-all">
                        <MdRocketLaunch size={22} />
                      </div>
                      <div className="flex items-center gap-3">
                        <a
                          href={project.github_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-slate-500 hover:text-white transition-colors"
                          aria-label="GitHub"
                        >
                          <FaGithub size={18} />
                        </a>
                        <a
                          href={project.demo_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-slate-500 hover:text-blue-400 transition-colors"
                          aria-label="Live Demo"
                        >
                          <FaExternalLinkAlt size={16} />
                        </a>
                      </div>
                    </div>

                    {/* Status badge */}
                    <span
                      className="inline-block self-start px-3 py-1 rounded-full text-xs font-semibold mb-4 border"
                      style={{ background: sc.bg, borderColor: sc.border, color: sc.text }}
                    >
                      {project.status}
                    </span>

                    {/* Title */}
                    <h3 className="text-white font-bold text-xl mb-3 group-hover:text-blue-400 transition-colors leading-tight">
                      {project.title}
                    </h3>

                    {/* Description */}
                    <p className="text-slate-400 text-sm leading-relaxed mb-6 flex-grow">
                      {project.description}
                    </p>

                    {/* Tech stack chips */}
                    <div className="flex flex-wrap gap-2 mt-auto">
                      {project.stack.map(tech => (
                        <span
                          key={tech}
                          className="text-xs font-mono px-2.5 py-1 rounded-full border text-slate-400"
                          style={{
                            background: 'rgba(255,255,255,0.03)',
                            borderColor: 'rgba(255,255,255,0.08)',
                          }}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        )}

        {/* GitHub CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mt-14"
        >
          <a
            href="https://github.com/akhilbabu26?tab=repositories"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary inline-flex"
          >
            <FaGithub size={18} />
            See All Projects on GitHub
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
