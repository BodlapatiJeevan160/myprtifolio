import { useState, useEffect, useRef, useCallback } from 'react';
/* eslint-disable react-hooks/set-state-in-effect */
import { motion, useSpring, useMotionValue, useTransform } from 'framer-motion';
import { ChevronDown, Download, Terminal, Mail } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';
import { useInView } from '../hooks/useInView';
import heroImg from '../assets/hero.png';

/* ═══════════════════════════════════════════════════════════════
   TYPEWRITER COMPONENT
═══════════════════════════════════════════════════════════════ */
const ROLES = [
  'AI Powered Software Engineer',
  'AI Engineer',
  'Automation Engineer',
  'Full Stack Developer'
];

function Typewriter() {
  const [text, setText] = useState('');
  const [roleIndex, setRoleIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  
  useEffect(() => {
    const currentRole = ROLES[roleIndex];
    
    const typeSpeed = isDeleting ? 40 : 80;
    const pauseBeforeDelete = 2000;
    const pauseBeforeType = 500;

    let timer;

    if (!isDeleting && text === currentRole) {
      // Finished typing, pause before deleting
      timer = setTimeout(() => setIsDeleting(true), pauseBeforeDelete);
    } else if (isDeleting && text === '') {
      // Finished deleting, move to next role
      setIsDeleting(false);
      setRoleIndex((prev) => (prev + 1) % ROLES.length);
      timer = setTimeout(() => {}, pauseBeforeType);
    } else {
      // Actively typing or deleting
      timer = setTimeout(() => {
        setText(prev => 
          isDeleting 
            ? currentRole.substring(0, prev.length - 1)
            : currentRole.substring(0, prev.length + 1)
        );
      }, typeSpeed);
    }

    return () => clearTimeout(timer);
  }, [text, isDeleting, roleIndex]);

  return (
    <div className="h-10 sm:h-12 flex items-center">
      <span className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-light text-gray-200 tracking-wide">
        {text}
        <motion.span
          animate={{ opacity: [1, 0, 1] }}
          transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
          className="inline-block w-[3px] h-[1.2em] bg-indigo-500 ml-1 -mb-1"
        />
      </span>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   BACKGROUND PARTICLES
═══════════════════════════════════════════════════════════════ */
function BackgroundEffects() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {/* Dynamic Gradient Blobs */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          x: [0, 50, 0],
          y: [0, -30, 0],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
        className="absolute top-[10%] left-[10%] w-[500px] h-[500px] rounded-full blur-[120px] opacity-[0.15]"
        style={{ background: 'radial-gradient(circle, #6366f1, transparent 70%)' }}
      />
      <motion.div
        animate={{
          scale: [1, 1.3, 1],
          x: [0, -60, 0],
          y: [0, 40, 0],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        className="absolute bottom-[10%] right-[10%] w-[600px] h-[600px] rounded-full blur-[150px] opacity-[0.12]"
        style={{ background: 'radial-gradient(circle, #a855f7, transparent 70%)' }}
      />
      
      {/* Subtle Grid */}
      <div className="absolute inset-0 bg-grid opacity-20 mask-image:linear-gradient(to_bottom,white,transparent)" />
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   FLOATING BADGE (ORBIT)
═══════════════════════════════════════════════════════════════ */
function OrbitingBadge({ label, angle, radius, duration = 20, color = '#6366f1' }) {
  // We use CSS animations for smooth orbiting without React renders
  return (
    <div 
      className="absolute top-1/2 left-1/2 w-0 h-0"
      style={{
        animation: `spin-slow ${duration}s linear infinite`,
      }}
    >
      <motion.div
        className="absolute flex items-center justify-center px-3 py-1.5 rounded-full border backdrop-blur-md shadow-lg"
        style={{
          transform: `rotate(${angle}deg) translateX(${radius}px) rotate(-${angle}deg)`,
          background: `rgba(10, 14, 23, 0.7)`,
          borderColor: `${color}40`,
          color: '#e2e8f0',
          // Counter-rotate to keep text upright
          animation: `spin-reverse-slow ${duration}s linear infinite`,
        }}
        whileHover={{ scale: 1.1, borderColor: `${color}80`, boxShadow: `0 0 15px ${color}40` }}
      >
        <span className="text-[10px] font-bold tracking-wider uppercase whitespace-nowrap">
          {label}
        </span>
      </motion.div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   ANIMATED COUNTER HOOK
═══════════════════════════════════════════════════════════════ */
function useCounter(target, inView, duration = 2000) {
  const [count, setCount] = useState(0);
  const started = useRef(false);

  useEffect(() => {
    if (!inView || started.current) return;
    started.current = true;
    const t0 = performance.now();
    const tick = (now) => {
      const p = Math.min((now - t0) / duration, 1);
      const ease = 1 - Math.pow(1 - p, 4); // Quartic ease out
      setCount(Math.floor(ease * target));
      if (p < 1) requestAnimationFrame(tick);
      else setCount(target);
    };
    requestAnimationFrame(tick);
  }, [inView, target, duration]);
  return count;
}

/* ═══════════════════════════════════════════════════════════════
   STAT CARD
═══════════════════════════════════════════════════════════════ */
function StatCard({ stat, index }) {
  const [ref, inView] = useInView(0.1);
  const count = useCounter(stat.value, inView);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: 0.1 * index }}
      className="relative p-5 rounded-2xl glass-card overflow-hidden group border-glow hover:-translate-y-1 transition-transform duration-300"
      style={{ '--tw-shadow-color': `${stat.color}20`, borderColor: `${stat.color}30` }}
    >
      <div 
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{ background: `radial-gradient(circle at 50% 0%, ${stat.color}15 0%, transparent 70%)` }}
      />
      
      <div className="flex flex-col items-center text-center relative z-10">
        <div className="flex items-end gap-1 mb-2 leading-none">
          <span className="text-4xl md:text-5xl font-black tabular-nums" style={{ color: stat.color, textShadow: `0 0 20px ${stat.color}60` }}>
            {count}
          </span>
          <span className="text-2xl font-black text-white mb-0.5">{stat.suffix}</span>
        </div>
        <div className="h-px w-12 rounded-full mb-3" style={{ background: `linear-gradient(90deg, transparent, ${stat.color}, transparent)` }} />
        <span className="text-xs text-gray-400 font-mono tracking-widest uppercase">
          {stat.label}
        </span>
      </div>
    </motion.div>
  );
}

const STATS_DATA = [
  { value: 5, suffix: '+', label: 'AI Projects', color: '#06b6d4' },
  { value: 6, suffix: '+', label: 'Certifications', color: '#f59e0b' },
  { value: 3, suffix: '+', label: 'Months Ind. Exp.', color: '#a855f7' },
  { value: 10, suffix: '+', label: 'Core Tech', color: '#ec4899' },
];

/* ═══════════════════════════════════════════════════════════════
   MAIN HERO COMPONENT
═══════════════════════════════════════════════════════════════ */
export default function Hero() {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const mxS = useSpring(mx, { stiffness: 50, damping: 20 });
  const myS = useSpring(my, { stiffness: 50, damping: 20 });
  const rotX = useTransform(myS, [-0.5, 0.5], ['8deg', '-8deg']);
  const rotY = useTransform(mxS, [-0.5, 0.5], ['-8deg', '8deg']);

  const handleMouseMove = useCallback((e) => {
    mx.set(e.clientX / window.innerWidth - 0.5);
    my.set(e.clientY / window.innerHeight - 0.5);
  }, [mx, my]);

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [handleMouseMove]);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="relative min-h-screen w-full flex flex-col justify-between pt-24 pb-8 overflow-hidden">
      
      {/* Backgrounds */}
      <BackgroundEffects />
      
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes spin-slow { 100% { transform: rotate(360deg); } }
        @keyframes spin-reverse-slow { 100% { transform: rotate(-360deg); } }
      `}} />

      {/* Main Content Area */}
      <div className="relative z-10 flex-1 flex items-center w-full max-w-7xl mx-auto px-6 py-12">
        <div className="grid lg:grid-cols-2 gap-16 items-center w-full">
          
          {/* ── LEFT SIDE: Text & CTA ── */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex flex-col items-start"
          >
            {/* Open to Work Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border mb-8 glass-card"
                 style={{ background: 'rgba(34, 197, 94, 0.1)', borderColor: 'rgba(34, 197, 94, 0.3)' }}>
              <span className="w-2 h-2 rounded-full bg-green-500 animate-ping absolute" />
              <span className="w-2 h-2 rounded-full bg-green-400 relative z-10 shadow-[0_0_8px_#4ade80]" />
              <span className="text-[10px] font-bold text-green-400 tracking-widest uppercase">
                Open To Work
              </span>
            </div>

            {/* Name */}
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight mb-2 text-shadow-glow text-white">
              Hi, I'm <span className="gradient-text">Jeevan</span>
            </h1>

            {/* Typing Effect */}
            <Typewriter />

            {/* Description */}
            <p className="mt-8 text-gray-400 text-sm sm:text-base leading-relaxed max-w-xl font-light">
              I build intelligent <span className="text-indigo-400 font-medium">AI-powered software</span>, 
              workflow automation systems, and scalable full-stack applications that solve real-world business problems. 
              My passion is transforming ideas into <span className="text-cyan-400 font-medium">production-ready solutions</span> using 
              Artificial Intelligence.
            </p>

            {/* Highlight Chips */}
            <div className="flex flex-wrap gap-2 mt-8">
              {[
                { icon: '🤖', text: 'AI Development' },
                { icon: '⚡', text: 'Workflow Automation' },
                { icon: '🧠', text: 'Generative AI' },
                { icon: '💻', text: 'Full Stack' },
                { icon: '🚀', text: 'Production Ready' }
              ].map((chip, i) => (
                <motion.span 
                  key={chip.text}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5 + (i * 0.1), type: 'spring' }}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-md border text-[11px] font-mono tracking-wider text-gray-300 glass-card hover:text-white transition-colors cursor-default"
                  style={{ borderColor: 'rgba(255,255,255,0.1)' }}
                >
                  <span>{chip.icon}</span> {chip.text}
                </motion.span>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-4 mt-12 w-full sm:w-auto">
              <button 
                onClick={() => scrollTo('projects')}
                className="btn-primary flex items-center gap-2 text-sm px-6 py-3.5 w-full sm:w-auto justify-center"
              >
                <Terminal size={16} /> View Projects
              </button>
              
              <a 
                href="/resumes/Jeevan_Bodlapati_Resume_AIAutomationEngineer.pdf"
                download
                className="btn-outline glass-card flex items-center gap-2 text-sm px-6 py-3.5 w-full sm:w-auto justify-center hover:bg-white/5"
              >
                <Download size={16} /> Download Resume
              </a>

              <button 
                onClick={() => scrollTo('contact')}
                className="px-6 py-3.5 rounded-full border border-white/10 text-gray-300 text-sm font-semibold hover:text-white hover:bg-white/5 transition-all w-full sm:w-auto justify-center flex items-center gap-2"
              >
                <Mail size={16} /> Contact Me
              </button>

              <a 
                href="https://github.com/BodlapatiJeevan160"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub Profile"
                className="p-3.5 rounded-full border border-white/10 text-gray-400 hover:text-white hover:bg-white/5 transition-all flex items-center justify-center"
                title="GitHub"
              >
                <FaGithub size={18} />
              </a>
            </div>
          </motion.div>

          {/* ── RIGHT SIDE: Visual Profile ── */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
            className="hidden lg:flex relative w-full h-[500px] items-center justify-center perspective-1000"
          >
            {/* Animated Orbiting Badges */}
            <OrbitingBadge label="Python" angle={0} radius={220} duration={25} color="#3b82f6" />
            <OrbitingBadge label="React" angle={45} radius={200} duration={20} color="#06b6d4" />
            <OrbitingBadge label="AI/ML" angle={90} radius={240} duration={30} color="#8b5cf6" />
            <OrbitingBadge label="LLMs" angle={135} radius={190} duration={22} color="#ec4899" />
            <OrbitingBadge label="RAG" angle={180} radius={230} duration={28} color="#f59e0b" />
            <OrbitingBadge label="n8n" angle={225} radius={210} duration={24} color="#ea580c" />
            <OrbitingBadge label="Automation" angle={270} radius={250} duration={35} color="#10b981" />
            <OrbitingBadge label="Node.js" angle={315} radius={180} duration={18} color="#22c55e" />

            {/* 3D Profile Frame */}
            <motion.div 
              style={{ rotateX: rotX, rotateY: rotY, transformStyle: 'preserve-3d' }}
              className="relative w-80 h-80 rounded-full flex items-center justify-center"
            >
              {/* Glowing rings */}
              <div className="absolute inset-[-20px] rounded-full border border-indigo-500/30 shadow-[0_0_40px_rgba(99,102,241,0.2)] animate-spin-slow" style={{ animationDuration: '15s' }} />
              <div className="absolute inset-[-40px] rounded-full border border-dashed border-cyan-500/30 animate-spin-slow" style={{ animationDirection: 'reverse', animationDuration: '25s' }} />
              
              {/* Image container */}
              <div 
                className="relative w-full h-full rounded-full overflow-hidden border-2 border-indigo-500/50 glass-card"
                style={{ transform: 'translateZ(20px)', boxShadow: '0 0 30px rgba(99,102,241,0.4), inset 0 0 20px rgba(0,0,0,0.8)' }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-dark-900 via-transparent to-transparent z-10 opacity-60" />
                <img 
                  src={heroImg} 
                  alt="Jeevan Bodlapati - AI Software Engineer"
                  fetchpriority="high"
                  className="w-full h-full object-cover object-top opacity-90 mix-blend-luminosity hover:mix-blend-normal transition-all duration-700"
                  style={{ filter: 'contrast(1.1) brightness(1.1)' }}
                  onError={(e) => {
                    // Fallback to a futuristic abstract avatar if image not found
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'flex';
                  }}
                />
                {/* Fallback avatar */}
                <div className="hidden absolute inset-0 bg-dark-800 items-center justify-center flex-col gap-2">
                  <Terminal size={48} className="text-indigo-400 opacity-50" />
                  <span className="text-xs font-mono text-indigo-400/50">SYSTEM.USER</span>
                </div>
              </div>
            </motion.div>
          </motion.div>

        </div>
      </div>

      {/* ── BOTTOM STATS ── */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 pb-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {STATS_DATA.map((stat, i) => (
            <StatCard key={stat.label} stat={stat} index={i} />
          ))}
        </div>
      </div>

      {/* ── SCROLL INDICATOR ── */}
      <motion.button 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        onClick={() => scrollTo('about')}
        aria-label="Scroll to About section"
        className="absolute bottom-6 left-1/2 -translate-x-1/2 text-cyan-400 z-20 mix-blend-screen flex flex-col items-center gap-2 hover:text-white transition-colors"
      >
        <span className="text-[9px] font-mono uppercase tracking-[0.3em] opacity-50">Initiate</span>
        <ChevronDown size={24} className="animate-bounce-slow" />
      </motion.button>

    </section>
  );
}
