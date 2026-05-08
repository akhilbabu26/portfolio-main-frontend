import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

// ── Add photos here ──────────────────────────────────
const PHOTOS = [
  '/profile_4.1.jpeg',
  '/profile_4.jpeg',
  '/profile_3.jpeg',
  '/profile_1.jpeg',
  '/profile_5.jpeg',
  '/profile_6.jpeg',
  '/profile_7.jpeg',
  '/profile_8.jpeg',
  '/profile_9.jpeg',
  '/profile_10.jpeg',
  '/profile_11.jpeg',
  
];
// ─────────────────────────────────────────────────────────

const About = () => {
  const [activePhoto, setActivePhoto] = useState(0);

  // Auto-cycle photos every 3.5s when there are multiple
  useEffect(() => {
    if (PHOTOS.length <= 1) return;
    const timer = setInterval(() => {
      setActivePhoto(i => (i + 1) % PHOTOS.length);
    }, 3500);
    return () => clearInterval(timer);
  }, []);

  return (
    <section id="about" className="py-28 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <span className="section-tag">About Me</span>
          <h2 className="section-heading">Who Am I?</h2>
          <div className="w-16 h-1 bg-blue-500 rounded-full mx-auto mt-4" />
        </motion.div>

        {/* Two-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Photo Carousel */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7 }}
            className="flex justify-center"
          >
            <div className="relative">
              {/* Glowing ring */}
              <div className="absolute inset-0 rounded-3xl bg-blue-500/20 blur-2xl scale-110" />
              <div className="relative glass rounded-3xl p-1 border border-blue-500/20 glow-blue">
                {/* Photo carousel */}
                <div className="w-72 h-72 md:w-80 md:h-80 rounded-3xl overflow-hidden relative">
                  {PHOTOS.map((src, i) => (
                    <img
                      key={src}
                      src={src}
                      alt={`Akhil Babu ${i + 1}`}
                      className="absolute inset-0 w-full h-full object-cover object-top transition-opacity duration-700"
                      style={{ opacity: i === activePhoto ? 1 : 0 }}
                    />
                  ))}
                </div>

                {/* Dot indicators — only shown when multiple photos */}
                {PHOTOS.length > 1 && (
                  <div className="flex justify-center gap-2 pt-2 pb-1">
                    {PHOTOS.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setActivePhoto(i)}
                        className="w-1.5 h-1.5 rounded-full transition-all duration-300"
                        style={{
                          background: i === activePhoto ? '#3b82f6' : 'rgba(255,255,255,0.25)',
                          transform: i === activePhoto ? 'scale(1.4)' : 'scale(1)',
                        }}
                      />
                    ))}
                  </div>
                )}
              </div>

              {/* Floating badge */}
              <div className="absolute -bottom-4 -right-4 glass px-4 py-2 rounded-2xl border border-blue-500/20 text-sm">
                <span className="text-slate-400 font-semibold">Full Stack Developer</span>
                <span className="text-blue-500 ml-2">· Go</span>
              </div>
            </div>
          </motion.div>

          {/* Text content */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="space-y-6"
          >
            <p className="text-slate-300 text-base md:text-lg leading-relaxed">
              My journey into backend development began with a curiosity about how systems communicate, process data, and scale efficiently. This led me to specialize in
               <span className="text-blue-400 font-semibold">Go</span> 
               where I leverage its simplicity, performance, and concurrency model to build reliable backend systems.
            </p>
            <p className="text-slate-300 text-base md:text-lg leading-relaxed">
              Using the <span className="text-blue-400 font-semibold">Gin framework</span>, I design and develop high-performance REST APIs. I work with <span className="text-blue-400 font-semibold">PostgreSQL</span> for structured data management and <span className="text-blue-400 font-semibold">Redis</span> for caching and optimizing application performance. 
            </p>
            <p className="text-slate-300 text-base md:text-lg leading-relaxed">
              I also focus on the complete development lifecycle — from writing clean, maintainable code to containerizing applications with  
              <span className="text-blue-400 font-semibold"> Docker</span>, 
              and deploying them on platforms like Railway and Vercel. I continuously explore ways to improve system design, scalability, and overall performance.
            </p>

            {/* Stats row */}
            <div className="grid grid-cols-3 gap-4 pt-4">
              {[
                { value: '3+', label: 'Projects Built' },
                { value: '1+', label: 'Year of Experience' },
                { value: '3+', label: 'APIs Deployed' },
              ].map((stat) => (
                <div key={stat.label} className="glass rounded-2xl p-4 text-center border border-white/5">
                  <div className="text-2xl font-black gradient-text" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                    {stat.value}
                  </div>
                  <div className="text-slate-500 text-xs mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
