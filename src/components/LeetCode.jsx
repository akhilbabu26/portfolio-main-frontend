import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { SiLeetcode } from 'react-icons/si';
import { MdCode } from 'react-icons/md';

/* ─── CONFIG ─── */
const LEETCODE_USERNAME = 'akhil2672001';
const API_BASE = 'https://alfa-leetcode-api.onrender.com';

/* ─── Month label helper ─── */
const MONTHS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

/* ─── Heatmap with labels ─── */
const Heatmap = ({ calendar, totalContributions }) => {
  const now = Math.floor(Date.now() / 1000);
  const todayMidnight = now - (now % 86400);
  const start = todayMidnight - 52 * 7 * 86400;

  const weeks = [];
  const monthLabels = [];

  for (let w = 0; w < 52; w++) {
    const days = [];
    for (let d = 0; d < 7; d++) {
      const ts = start + (w * 7 + d) * 86400;
      const count = calendar[ts] ?? calendar[String(ts)] ?? 0;
      days.push({ ts, count });
    }

    // Detect new month at start of week
    const weekStart = new Date((start + w * 7 * 86400) * 1000);
    const prevWeekStart = new Date((start + (w - 1) * 7 * 86400) * 1000);
    if (w === 0 || weekStart.getMonth() !== prevWeekStart.getMonth()) {
      monthLabels.push({ week: w, label: MONTHS[weekStart.getMonth()] });
    }

    weeks.push(days);
  }

  const maxCount = Math.max(...Object.values(calendar || {}), 1);
  const getColor = (count) => {
    if (count === 0) return 'rgba(255,255,255,0.04)';
    const i = count / maxCount;
    if (i < 0.2)  return '#1e3a5f';
    if (i < 0.4)  return '#1d4ed8';
    if (i < 0.65) return '#3b82f6';
    if (i < 0.85) return '#60a5fa';
    return '#93c5fd';
  };

  return (
    <div>
      {/* Month labels */}
      <div className="relative h-5 mb-1" style={{ width: 52 * 13 }}>
        {monthLabels.map(({ week, label }) => (
          <span
            key={week}
            className="absolute text-[10px] text-slate-600"
            style={{ left: week * 13 }}
          >{label}</span>
        ))}
      </div>

      {/* Grid */}
      <div className="flex gap-[3px]">
        {/* Day labels */}
        <div className="flex flex-col gap-[3px] mr-1 justify-around">
          {['Mon','','Wed','','Fri','',''].map((d, i) => (
            <span key={i} className="text-[9px] text-slate-600 h-[10px] leading-[10px]">{d}</span>
          ))}
        </div>

        {/* Cells */}
        {weeks.map((week, wi) => (
          <div key={wi} className="flex flex-col gap-[3px]">
            {week.map(({ ts, count }) => (
              <motion.div
                key={ts}
                title={`${count} submission${count !== 1 ? 's' : ''}`}
                className="w-[10px] h-[10px] rounded-[2px] cursor-pointer hover:scale-150 transition-transform"
                style={{ background: getColor(count) }}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: wi * 0.005 }}
              />
            ))}
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between mt-3">
        <span className="text-[11px] text-slate-500">{totalContributions} contributions in the last year</span>
        <div className="flex items-center gap-1.5">
          <span className="text-[10px] text-slate-600">Less</span>
          {['rgba(255,255,255,0.04)','#1e3a5f','#1d4ed8','#3b82f6','#60a5fa'].map(c => (
            <div key={c} className="w-2.5 h-2.5 rounded-[2px]" style={{ background: c }} />
          ))}
          <span className="text-[10px] text-slate-600">More</span>
        </div>
      </div>
    </div>
  );
};

/* ─── Circular ring for each difficulty ─── */
const DiffRing = ({ label, solved, total, color, delay }) => {
  const r = 38;
  const circ = 2 * Math.PI * r;
  const pct = total > 0 ? solved / total : 0;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className="flex flex-col items-center gap-2"
    >
      <div className="relative w-24 h-24">
        <svg width="96" height="96" className="-rotate-90">
          <circle cx="48" cy="48" r={r} fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="7" />
          <motion.circle
            cx="48" cy="48" r={r} fill="none" stroke={color} strokeWidth="7"
            strokeLinecap="round"
            strokeDasharray={circ}
            initial={{ strokeDashoffset: circ }}
            whileInView={{ strokeDashoffset: circ * (1 - pct) }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, delay: delay + 0.2, ease: 'easeOut' }}
            style={{ filter: `drop-shadow(0 0 6px ${color}90)` }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-xl font-bold text-white leading-none">{solved}</span>
          <span className="text-[9px] text-slate-500">/{total}</span>
        </div>
      </div>
      <span className="text-xs font-semibold" style={{ color }}>{label}</span>
    </motion.div>
  );
};

/* ─── Main Component ─── */
const LeetCode = () => {
  const [stats, setStats]       = useState(null);
  const [calendar, setCalendar] = useState({});
  const [totalContrib, setTotalContrib] = useState(0);
  const [loading, setLoading]   = useState(true);
  const [error, setError]       = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [profileRes, solvedRes, calRes] = await Promise.all([
          fetch(`${API_BASE}/${LEETCODE_USERNAME}`),
          fetch(`${API_BASE}/${LEETCODE_USERNAME}/solved`),
          fetch(`${API_BASE}/${LEETCODE_USERNAME}/calendar`),
        ]);
        const profileData = await profileRes.json();
        const solvedData  = await solvedRes.json();
        const calData     = await calRes.json();

        if (profileData.errors || !profileData.username) throw new Error('User not found');

        // Acceptance rate: accepted submissions / total submissions
        const totalSubs = solvedData.totalSubmissionNum?.find(s => s.difficulty === 'All')?.submissions || 1;
        const acSubs    = solvedData.acSubmissionNum?.find(s => s.difficulty === 'All')?.submissions   || 0;
        const acceptRate = ((acSubs / totalSubs) * 100).toFixed(1);

        setStats({
          totalSolved:    solvedData.solvedProblem  || 0,
          easySolved:     solvedData.easySolved     || 0,
          mediumSolved:   solvedData.mediumSolved   || 0,
          hardSolved:     solvedData.hardSolved     || 0,
          totalEasy:      940,
          totalMedium:    2048,
          totalHard:      927,
          totalAll:       3915,
          ranking:        profileData.ranking       || '—',
          name:           profileData.name          || LEETCODE_USERNAME,
          avatar:         profileData.avatar,
          streak:         calData.streak            || 0,
          activeDays:     calData.totalActiveDays   || 0,
          acceptanceRate: acceptRate,
        });

        const rawCal = calData.submissionCalendar;
        const parsed = rawCal ? JSON.parse(rawCal) : {};
        setCalendar(parsed);
        setTotalContrib(Object.values(parsed).reduce((a, b) => a + b, 0));
      } catch (e) {
        setError(e.message || 'Failed to load LeetCode data');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <section id="leetcode" className="py-28 relative">
      <div className="absolute top-1/2 left-0 w-[400px] h-[400px] bg-yellow-500/3 rounded-full blur-[120px] pointer-events-none -translate-y-1/2" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          {/* <span className="section-tag">Problem Solving</span> */}
          <h2 className="section-heading flex items-center justify-center gap-3">
            <SiLeetcode className="text-[#FFA116]" />
            Coding & Contributions
          </h2>
          <p className="text-slate-500 mt-3 max-w-md mx-auto text-sm">
            Consistent problem solving across algorithms and data structures
          </p>
          <div className="w-16 h-1 bg-yellow-500 rounded-full mx-auto mt-4" />
        </motion.div>

        {/* Loading */}
        {loading && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {[0,1].map(i => (
              <div key={i} className="glass rounded-3xl border border-white/5 h-64 animate-pulse" />
            ))}
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="text-center py-16 glass rounded-3xl border border-yellow-500/10 p-12">
            <SiLeetcode size={40} className="mx-auto mb-4 text-yellow-500/40" />
            <p className="text-slate-400">Could not load LeetCode data</p>
            <p className="text-slate-600 text-sm mt-2">
              Username: <code className="text-yellow-500">{LEETCODE_USERNAME}</code>
            </p>
          </div>
        )}

        {/* Dashboard */}
        {stats && !error && (
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-6">

            {/* LEFT — Heatmap */}
            <motion.div
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.5 }}
              className="glass rounded-3xl border border-white/5 p-8"
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-blue-500/10 border border-blue-500/20">
                    <SiLeetcode size={18} className="text-[#FFA116]" />
                  </div>
                  <div>
                    <p className="text-white font-semibold text-sm">{stats.name}</p>
                    <p className="text-slate-500 text-xs">@{LEETCODE_USERNAME}</p>
                  </div>
                </div>
                <span className="text-xs text-slate-600 font-mono">// ACTIVITY_DASHBOARD</span>
              </div>

              <div className="overflow-x-auto">
                <Heatmap calendar={calendar} totalContributions={totalContrib} />
              </div>

              {/* Bottom meta */}
              <div className="flex items-center justify-between mt-5 pt-4 border-t border-white/5">
                <span className="text-[11px] text-slate-600 font-mono">// {stats.activeDays}_ACTIVE_DAYS</span>
                <span className="text-[11px] text-slate-600 font-mono">🔥 {stats.streak} day streak</span>
              </div>
            </motion.div>

            {/* RIGHT — Problem Solving */}
            <motion.div
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.15 }}
              className="glass rounded-3xl border border-white/5 p-8 flex flex-col"
            >
              {/* Header */}
              <div className="flex items-center gap-2 mb-6">
                <MdCode size={18} className="text-blue-400" />
                <h3 className="text-white font-semibold">Problem Solving</h3>
              </div>

              {/* Total Solved */}
              <div className="flex items-end justify-between mb-6 pb-5 border-b border-white/5">
                <span className="text-slate-400 text-sm">Total Solved</span>
                <span className="text-4xl font-bold text-white">{stats.totalSolved}</span>
              </div>

              {/* Difficulty rings */}
              <div className="flex justify-around mb-6">
                <DiffRing label="Easy"   solved={stats.easySolved}   total={stats.totalEasy}   color="#00b8a3" delay={0.1} />
                <DiffRing label="Medium" solved={stats.mediumSolved} total={stats.totalMedium} color="#FFA116" delay={0.2} />
                <DiffRing label="Hard"   solved={stats.hardSolved}   total={stats.totalHard}   color="#ef4743" delay={0.3} />
              </div>

              {/* Progress bars */}
              <div className="flex flex-col gap-3 mb-6">
                {[
                  { label: 'Easy',   solved: stats.easySolved,   total: stats.totalEasy,   color: '#00b8a3' },
                  { label: 'Medium', solved: stats.mediumSolved, total: stats.totalMedium, color: '#FFA116' },
                  { label: 'Hard',   solved: stats.hardSolved,   total: stats.totalHard,   color: '#ef4743' },
                ].map(({ label, solved, total, color }) => (
                  <div key={label}>
                    <div className="flex justify-between text-xs mb-1">
                      <span style={{ color }}>{label}</span>
                      <span className="text-slate-500">{solved} / {total}</span>
                    </div>
                    <div className="h-1.5 rounded-full bg-white/5 overflow-hidden">
                      <motion.div
                        className="h-full rounded-full"
                        style={{ background: color }}
                        initial={{ width: 0 }}
                        whileInView={{ width: `${(solved / total) * 100}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, ease: 'easeOut' }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              {/* Stats row */}
              <div className="mt-auto pt-4 border-t border-white/5 grid grid-cols-2 gap-4">
                <div>
                  <p className="text-slate-500 text-xs mb-1">Acceptance Rate</p>
                  <p className="text-white font-semibold">{stats.acceptanceRate}%</p>
                </div>
                <div>
                  <p className="text-slate-500 text-xs mb-1">Global Rank</p>
                  <p className="text-white font-semibold">#{stats.ranking?.toLocaleString()}</p>
                </div>
              </div>
            </motion.div>

          </div>
        )}
      </div>
    </section>
  );
};

export default LeetCode;
