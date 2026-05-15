import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SiGo, SiPostgresql, SiDocker, SiPostman, SiRedis, SiGit, SiReact, SiTailwindcss, SiJavascript, SiGithub, SiVercel, SiRailway, SiRedux } from 'react-icons/si';
import { MdApi, MdPeople, MdLightbulb, MdDevices, MdBuild } from 'react-icons/md';

const categories = [
  {
    label: 'Backend', accent: '#3b82f6', glow: 'rgba(59,130,246,0.08)', tag: '⚙️', skills: [
      { name: 'Go', icon: SiGo, color: '#00ADD8' }, { name: 'Gin', icon: MdApi, color: '#60a5fa' },
      { name: 'PostgreSQL', icon: SiPostgresql, color: '#336791' }, { name: 'Redis', icon: SiRedis, color: '#DC382D' },
      { name: 'REST APIs', icon: MdApi, color: '#818cf8' },
    ]
  },
  {
    label: 'Frontend', accent: '#61DAFB', glow: 'rgba(97,218,251,0.06)', tag: '🎨', skills: [
      { name: 'React', icon: SiReact, color: '#61DAFB' }, { name: 'JavaScript', icon: SiJavascript, color: '#F7DF1E' },
      { name: 'Tailwind CSS', icon: SiTailwindcss, color: '#38BDF8' }, { name: 'Redux', icon: SiRedux, color: '#9945ff' },
    ]
  },
  {
    label: 'Tools & Deployment', accent: '#10b981', glow: 'rgba(16,185,129,0.06)', tag: '🚀', skills: [
      { name: 'Docker', icon: SiDocker, color: '#2496ED' }, { name: 'Git', icon: SiGit, color: '#F05032' },
      { name: 'GitHub', icon: SiGithub, color: '#e2e8f0' }, { name: 'Vercel', icon: SiVercel, color: '#e2e8f0' },
      { name: 'Railway', icon: SiRailway, color: '#7c3aed' },
      { name: 'Postman', icon: SiPostman, color: '#FF6C37' },
    ]
  },
  {
    label: 'Soft Skills', accent: '#f472b6', glow: 'rgba(244,114,182,0.06)', tag: '🤝', skills: [
      { name: 'Teamwork', icon: MdPeople, color: '#f472b6' }, { name: 'Problem Solving', icon: MdLightbulb, color: '#fbbf24' },
      { name: 'Adaptability', icon: MdDevices, color: '#60a5fa' }, { name: 'Communication', icon: MdPeople, color: '#a78bfa' },
      { name: 'Clean Code', icon: MdBuild, color: '#34d399' },
    ]
  },
];

const allSkills = categories.flatMap(c => c.skills);

const SIZE_OF = { 1: 26, 2: 38, 3: 50, 4: 62 };
const AMP_OF  = { 1: 0.28, 2: 0.5, 3: 0.75, 4: 1.0 };
const ICON_OF = { 1: 10, 2: 14, 3: 18, 4: 22 };

let _uid = 0;
const uid  = () => ++_uid;
const rnd  = (a, b) => Math.random() * (b - a) + a;
const clamp = (v, lo, hi) => Math.max(lo, Math.min(hi, v));

function buildFloat(seed, value) {
  const s   = seed * 137.5;
  const amp = AMP_OF[value] ?? 1;
  return {
    x: [Math.sin(s * 0.05) * 50 * amp, Math.sin((s + 60) * 0.05) * 70 * amp, Math.sin((s + 120) * 0.05) * 30 * amp, Math.sin((s + 180) * 0.05) * 60 * amp, Math.sin(s * 0.05) * 50 * amp],
    y: [Math.cos(s * 0.07) * 35 * amp, Math.cos((s + 60) * 0.07) * 50 * amp, Math.cos((s + 120) * 0.07) * 25 * amp, Math.cos((s + 180) * 0.07) * 45 * amp, Math.cos(s * 0.07) * 35 * amp],
  };
}

function makeInitial(skills) {
  return skills.map((skill, i) => ({
    id: uid(), skill, value: 4,
    x: rnd(10, 72), y: rnd(15, 62),
    seed: i, dur: rnd(6, 14), repositioned: false,
  }));
}

function splitBubble(parent) {
  const half = parent.value / 2;
  const sp   = parent.value === 4 ? 10 : 6;
  return [
    { id: uid(), skill: parent.skill, value: half, x: clamp(parent.x - sp, 5, 80), y: clamp(parent.y - sp, 8, 70), seed: parent.seed + 17, dur: rnd(4, 10), repositioned: false },
    { id: uid(), skill: parent.skill, value: half, x: clamp(parent.x + sp, 5, 80), y: clamp(parent.y + sp, 8, 70), seed: parent.seed + 31, dur: rnd(4, 10), repositioned: false },
  ];
}

/* ── Bubble component ── */
const Bubble = ({ bubble, onSplit, circleRef, containerRef, onDragEnd, isVisible }) => {
  const [dragging, setDragging] = useState(false);
  const { skill, value, x, y, seed, dur, repositioned } = bubble;
  const Icon    = skill.icon;
  const size    = SIZE_OF[value] ?? SIZE_OF[1];
  const iconSz  = ICON_OF[value] ?? ICON_OF[1];
  const canSplit = value === 4 || value === 2;

  const handleClick = useCallback(() => {
    if (!dragging && canSplit) onSplit(bubble);
  }, [dragging, canSplit, bubble, onSplit]);

  // Float animation — paused when section is off-screen to free up the main thread
  const floatAnimate = isVisible
    ? (dragging ? { x: 0, y: 0 } : buildFloat(seed, value))
    : { x: 0, y: 0 };
  const floatTransition = isVisible && !dragging
    ? { duration: dur, repeat: Infinity, ease: 'easeInOut', repeatType: 'loop' }
    : { duration: 0.1 };

  return (
    <motion.div
      drag
      dragConstraints={containerRef}
      dragMomentum={false}
      dragElastic={0}
      onDragStart={() => setDragging(true)}
      onDragEnd={(e) => { setDragging(false); onDragEnd(bubble, e); }}
      className="absolute flex flex-col items-center group"
      style={{
        left: `${x}%`, top: `${y}%`,
        zIndex: dragging ? 50 : 2,
        cursor: dragging ? 'grabbing' : 'grab',
        willChange: 'transform', // GPU-composited layer → no layout reflow on move
      }}
      initial={repositioned ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0, opacity: 0, transition: { duration: 0.18 } }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      onClick={handleClick}
      whileDrag={{ scale: 1.2 }}
      title={canSplit ? 'Click to split · Drag to fuse' : `Value: ${value}/4 · Drag to fuse`}
    >
      <motion.div
        animate={floatAnimate}
        transition={floatTransition}
        className="flex flex-col items-center"
        whileHover={!dragging ? { scale: 1.2, transition: { duration: 0.15 } } : {}}
      >
        {/* Bubble circle */}
        <div
          ref={circleRef}
          style={{
            width: size, height: size, borderRadius: '50%',
            background: `radial-gradient(circle at 35% 35%, ${skill.color}38, ${skill.color}08)`,
            border: `${value === 4 ? 2 : 1.5}px solid ${dragging ? skill.color : skill.color + '60'}`,
            boxShadow: dragging
              ? `0 0 30px ${skill.color}70, inset 0 0 14px ${skill.color}20`
              : `0 0 ${value * 5}px ${skill.color}40, inset 0 0 ${value * 2}px ${skill.color}15`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: skill.color, position: 'relative',
            transition: 'box-shadow 0.2s, width 0.3s, height 0.3s',
          }}
        >
          <Icon size={iconSz} />

          {value < 4 && (
            <div className="absolute -bottom-3 flex gap-0.5">
              {[...Array(value)].map((_, i) => (
                <div key={i} className="w-1 h-1 rounded-full" style={{ background: skill.color, opacity: 0.8 }} />
              ))}
            </div>
          )}

          {canSplit && !dragging && (
            <div className="absolute inset-0 rounded-full border-2 border-dashed opacity-0 group-hover:opacity-40 transition-opacity duration-300"
              style={{ borderColor: skill.color }} />
          )}

          {dragging && (
            <div className="absolute inset-[-6px] rounded-full border-2 opacity-50 animate-ping"
              style={{ borderColor: skill.color }} />
          )}
        </div>

        {value === 4 && (
          <span className="mt-2 text-[10px] font-semibold whitespace-nowrap select-none"
            style={{ color: skill.color, textShadow: `0 0 8px ${skill.color}80` }}>
            {skill.name}
          </span>
        )}
      </motion.div>
    </motion.div>
  );
};

/* ── Floating Space ── */
const FloatingSpace = ({ category, isVisible }) => {
  const [bubbles, setBubbles]   = useState(() => makeInitial(category.skills));
  const containerRef            = useRef(null);
  const circleRefs              = useRef({});
  const bubblesRef              = useRef(bubbles);
  const isVisibleRef            = useRef(isVisible);

  useEffect(() => { bubblesRef.current = bubbles; }, [bubbles]);
  useEffect(() => { isVisibleRef.current = isVisible; }, [isVisible]);

  const handleSplit = useCallback((b) => {
    setBubbles(prev => [...prev.filter(x => x.id !== b.id), ...splitBubble(b)]);
  }, []);

  const handleDragEnd = useCallback((bubble) => {
    const container = containerRef.current;
    if (!container) return;
    const cRect = container.getBoundingClientRect();
    const el    = circleRefs.current[bubble.id];
    if (!el) return;
    const r    = el.getBoundingClientRect();
    const newX = clamp(((r.left + r.width / 2 - cRect.left) / cRect.width) * 100, 4, 82);
    const newY = clamp(((r.top  + r.height / 2 - cRect.top) / cRect.height) * 100, 4, 76);
    setBubbles(prev => prev.map(b =>
      b.id === bubble.id ? { ...b, id: uid(), x: newX, y: newY, repositioned: true } : b
    ));
  }, []);

  /* RAF collision loop — only runs when section is visible */
  useEffect(() => {
    let rafId, last = 0;
    const loop = (t) => {
      rafId = requestAnimationFrame(loop);

      // Skip entirely when section is scrolled out of view
      if (!isVisibleRef.current) return;

      // Throttle to ~167ms (6fps for collision detection is plenty)
      if (t - last < 167) return;
      last = t;

      const container = containerRef.current;
      if (!container) return;
      const cRect = container.getBoundingClientRect();
      const bubs  = bubblesRef.current;
      const frags = bubs.filter(b => b.value < 4);
      if (frags.length < 2) return;

      const pos = {};
      frags.forEach(b => {
        const el = circleRefs.current[b.id];
        if (!el) return;
        const r = el.getBoundingClientRect();
        pos[b.id] = { cx: r.left + r.width / 2 - cRect.left, cy: r.top + r.height / 2 - cRect.top, rad: r.width / 2 };
      });

      const toFuse = [], used = new Set();
      for (let i = 0; i < frags.length; i++) {
        for (let j = i + 1; j < frags.length; j++) {
          const b1 = frags[i], b2 = frags[j];
          if (b1.skill.name !== b2.skill.name) continue;
          if (b1.value + b2.value > 4) continue;
          if (used.has(b1.id) || used.has(b2.id)) continue;
          const p1 = pos[b1.id], p2 = pos[b2.id];
          if (!p1 || !p2) continue;
          const dx = p1.cx - p2.cx, dy = p1.cy - p2.cy;
          const thresh = (p1.rad + p2.rad) * 1.8;
          if (Math.sqrt(dx * dx + dy * dy) < thresh) {
            toFuse.push([b1, b2]); used.add(b1.id); used.add(b2.id);
          }
        }
      }

      if (toFuse.length > 0) {
        setBubbles(prev => {
          let next = [...prev];
          toFuse.forEach(([b1, b2]) => {
            next = next.filter(b => b.id !== b1.id && b.id !== b2.id);
            const newVal = b1.value + b2.value;
            next.push({
              id: uid(), skill: b1.skill, value: newVal,
              x: clamp((b1.x + b2.x) / 2, 8, 75),
              y: clamp((b1.y + b2.y) / 2, 10, 68),
              seed: rnd(0, 200), dur: rnd(5, 13),
              repositioned: false,
            });
          });
          return next;
        });
      }
    };
    rafId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(rafId);
  }, []);

  return (
    <div ref={containerRef} className="relative w-full h-72 rounded-3xl overflow-hidden border select-none"
      style={{ background: `radial-gradient(ellipse at center, ${category.glow} 0%, rgba(6,6,6,0.95) 75%)`, borderColor: `${category.accent}25` }}>
      <div className="absolute top-3 left-4 z-20 flex items-center gap-1.5 text-xs font-bold px-3 py-1 rounded-full border"
        style={{ color: category.accent, borderColor: `${category.accent}40`, background: `${category.accent}12` }}>
        <span>{category.tag}</span><span>{category.label}</span>
      </div>
      <div className="absolute top-3 right-4 z-20 text-[9px] text-slate-600 font-mono">click(4) to split · drag to fuse</div>

      {[...Array(18)].map((_, i) => (
        <div key={i} className="absolute rounded-full pointer-events-none"
          style={{ width: rnd(1, 2) + 'px', height: rnd(1, 2) + 'px', top: rnd(5, 95) + '%', left: rnd(5, 95) + '%', background: `${category.accent}50` }} />
      ))}
      <div className="absolute bottom-0 right-0 w-32 h-32 rounded-full blur-3xl pointer-events-none opacity-25" style={{ background: category.accent }} />

      <AnimatePresence>
        {bubbles.map(bubble => (
          <Bubble
            key={bubble.id}
            bubble={bubble}
            onSplit={handleSplit}
            containerRef={containerRef}
            onDragEnd={handleDragEnd}
            isVisible={isVisible}
            circleRef={el => {
              if (el) circleRefs.current[bubble.id] = el;
              else delete circleRefs.current[bubble.id];
            }}
          />
        ))}
      </AnimatePresence>
    </div>
  );
};

/* ── Marquee ── */
const Marquee = () => {
  const [hovered, setHovered] = useState(false);
  useEffect(() => {
    if (!document.getElementById('marquee-kf')) {
      const s = document.createElement('style'); s.id = 'marquee-kf';
      s.textContent = `@keyframes marquee-scroll{from{transform:translateX(0)}to{transform:translateX(-50%)}}`;
      document.head.appendChild(s);
    }
  }, []);
  const doubled = [...allSkills, ...allSkills];
  return (
    <div className="relative mt-8 overflow-hidden rounded-2xl border border-white/5 py-4 cursor-pointer transition-all duration-500"
      style={{ background: 'rgba(255,255,255,0.02)', filter: hovered ? 'blur(0)' : 'blur(2px)', opacity: hovered ? 1 : 0.55 }}
      onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
      <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-24 z-10" style={{ background: 'linear-gradient(to right,#060606,transparent)' }} />
      <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-24 z-10" style={{ background: 'linear-gradient(to left,#060606,transparent)' }} />
      {!hovered && (
        <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
          <span className="text-slate-400 text-xs tracking-widest uppercase font-medium">Hover to explore</span>
        </div>
      )}
      <div className="flex gap-4 w-max" style={{ animation: 'marquee-scroll 32s linear infinite', animationPlayState: hovered ? 'paused' : 'running', willChange: 'transform' }}>
        {doubled.map((skill, i) => {
          const Icon = skill.icon;
          return (
            <div key={i} className="flex items-center gap-2 px-4 py-2 rounded-full whitespace-nowrap text-sm font-medium border"
              style={{ background: `${skill.color}10`, borderColor: `${skill.color}30`, color: skill.color }}>
              <Icon size={16} />{skill.name}
            </div>
          );
        })}
      </div>
    </div>
  );
};

/* ── Main ── */
const Skills = () => {
  const sectionRef  = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  // IntersectionObserver → pause all animations when Skills is off-screen
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.05 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="skills" ref={sectionRef} className="py-28 relative">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-blue-600/4 rounded-full blur-[140px] pointer-events-none" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center mb-14">
          <span className="section-tag">Technical Skills</span>
          <h2 className="section-heading">My Tech Stack</h2>
          <p className="text-slate-500 mt-3 max-w-lg mx-auto text-sm">
            🖱 Click bubble → 4 fragments · Drag to fuse: 1+1=2, 1+2=3, 2+2=4
          </p>
          <div className="w-16 h-1 bg-blue-500 rounded-full mx-auto mt-4" />
        </motion.div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {categories.map((cat, i) => (
            <motion.div key={cat.label} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: i * 0.1 }}>
              <FloatingSpace category={cat} isVisible={isVisible} />
            </motion.div>
          ))}
        </div>
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.3 }}>
          <Marquee />
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
