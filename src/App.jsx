import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import LeetCode from './components/LeetCode';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Experience from './components/Experience';
import Contact from './components/Contact';

function App() {
  return (
    <div className="min-h-screen bg-[#060606] text-slate-50 [overflow-x:clip] selection:bg-blue-500/30 selection:text-blue-200">
      <Navbar />
      
      <main>
        <Hero />

        {/* Section divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />

        <About />

        <div className="h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />

        <LeetCode />

        <div className="h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />

        <Skills />

        <div className="h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />

        <Projects />

        <div className="h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />

        <Experience />

        <div className="h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />

        <Contact />
      </main>

      {/* Footer */}
      <footer className="border-t border-white/5 py-10 text-center">
        <p className="text-slate-600 text-sm">
          © {new Date().getFullYear()} <span className="text-slate-400 font-semibold">Akhil Babu</span>. All rights reserved.
        </p>
        <p className="text-slate-700 text-xs mt-2">
          Built with React · Tailwind CSS · Go (Gin)
        </p>
      </footer>
    </div>
  );
}

export default App;
