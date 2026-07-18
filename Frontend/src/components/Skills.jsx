import { useState, useRef, useEffect } from 'react';
import { motion, useInView as useFramerInView } from 'framer-motion';
import { Brain, Code2, Globe, Zap, Database, Terminal } from 'lucide-react';
import { useInView } from '../hooks/useInView';

/* ═══════════════════════════════════════════════════════════════
   DATA CONFIGURATION
═══════════════════════════════════════════════════════════════ */
const SKILL_CATEGORIES = [
  {
    id: 'ai-ml',
    title: 'AI & Machine Learning',
    description: 'Building intelligent models, integrating large language models, and developing cognitive systems.',
    icon: <Brain size={24} />,
    color: '#6366f1',
    skills: [
      'Python', 'Deep Learning', 'CNN', 'RNN', 'LLMs', 'Generative AI',
      'Prompt Engineering', 'RAG', 'Model Evaluation', 'Voice AI',
      'Multi-Agent Systems', 'Tool Calling'
    ]
  },
  {
    id: 'programming',
    title: 'Programming Languages',
    description: 'Core languages used for backend logic, scripting, data processing, and application development.',
    icon: <Code2 size={24} />,
    color: '#06b6d4',
    skills: [
      'Python', 'Java', 'JavaScript', 'HTML', 'CSS', 'SQL', 'PHP'
    ]
  },
  {
    id: 'fullstack',
    title: 'Full Stack Development',
    description: 'End-to-end web application development from responsive interfaces to robust backend APIs.',
    icon: <Globe size={24} />,
    color: '#a855f7',
    skills: [
      'React', 'Node.js', 'Flask', 'REST APIs', 'Responsive Design',
      'Frontend Development', 'Backend Development'
    ]
  },
  {
    id: 'automation',
    title: 'Automation & AI Workflows',
    description: 'Streamlining business processes and orchestrating complex multi-agent tasks automatically.',
    icon: <Zap size={24} />,
    color: '#f59e0b',
    skills: [
      'Automation Anywhere', 'n8n', 'Workflow Automation', 'AI Agents',
      'API Integration', 'Business Process Automation'
    ]
  },
  {
    id: 'data',
    title: 'Databases & Data',
    description: 'Managing, processing, and analyzing data to derive insights and feed intelligent algorithms.',
    icon: <Database size={24} />,
    color: '#10b981',
    skills: [
      'MongoDB', 'MySQL', 'Firebase', 'Pandas', 'NumPy', 'Data Analytics'
    ]
  },
  {
    id: 'tools',
    title: 'Developer Tools',
    description: 'Essential tools and environments for version control, testing, deployment, and collaboration.',
    icon: <Terminal size={24} />,
    color: '#ec4899',
    skills: [
      'Git', 'GitHub', 'VS Code', 'Postman', 'Docker (Learning)',
      'Linux', 'Google Colab'
    ]
  }
];

const STATS_DATA = [
  { value: 20, suffix: '+', label: 'Technical Skills', color: '#3b82f6' },
  { value: 5, suffix: '+', label: 'AI Projects', color: '#ec4899' },
  { value: 6, suffix: '+', label: 'Professional Certifications', color: '#eab308' },
  { value: 1000, suffix: '+', label: 'Hours of Learning & Development', color: '#8b5cf6' },
];

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
      const ease = 1 - Math.pow(1 - p, 4);
      setCount(Math.floor(ease * target));
      if (p < 1) requestAnimationFrame(tick);
      else setCount(target);
    };
    requestAnimationFrame(tick);
  }, [inView, target, duration]);
  return count;
}

/* ═══════════════════════════════════════════════════════════════
   STAT CARD COMPONENT
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
      className="relative p-6 rounded-2xl glass-card overflow-hidden group border-glow hover:-translate-y-1 transition-transform duration-300 flex flex-col justify-center h-full"
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
        <span className="text-xs md:text-sm text-gray-400 font-mono tracking-widest uppercase leading-relaxed max-w-[200px]">
          {stat.label}
        </span>
      </div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   CATEGORY CARD COMPONENT
═══════════════════════════════════════════════════════════════ */
function CategoryCard({ category, index, globalInView }) {
  const ref = useRef(null);
  const cardInView = useFramerInView(ref, { once: true, margin: "-50px" });
  
  // Decide if we animate based on global view (for initial load) or individual scroll
  const shouldAnimate = globalInView || cardInView;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={shouldAnimate ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1, type: "spring", stiffness: 80 }}
      className="relative rounded-2xl p-6 md:p-8 glass-card border-glow group hover:-translate-y-1 transition-transform duration-500 h-full flex flex-col"
      style={{ '--tw-shadow-color': `${category.color}20`, borderColor: `${category.color}30` }}
    >
      {/* Background glow on hover */}
      <div 
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl"
        style={{ background: `radial-gradient(circle at 100% 0%, ${category.color}15 0%, transparent 60%)` }}
      />
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-4 relative z-10">
        <div 
          className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 border transform group-hover:scale-110 transition-transform duration-300"
          style={{ 
            background: `${category.color}15`, 
            borderColor: `${category.color}40`,
            color: category.color,
            boxShadow: `0 0 20px ${category.color}20` 
          }}
        >
          {category.icon}
        </div>
        <div>
          <h3 className="text-xl md:text-2xl font-bold text-white tracking-tight group-hover:text-shadow-glow transition-all" style={{ '--tw-shadow-color': category.color }}>
            {category.title}
          </h3>
        </div>
      </div>
      
      {/* Description */}
      <p className="text-gray-400 text-sm font-light leading-relaxed mb-6 relative z-10 flex-grow">
        {category.description}
      </p>

      {/* Skills Chips */}
      <div className="flex flex-wrap gap-2 relative z-10">
        {category.skills.map((skill, i) => (
          <motion.span
            key={skill}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={shouldAnimate ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.4, delay: (index * 0.1) + (i * 0.03) + 0.2 }}
            className="text-[11px] md:text-xs font-mono px-3 py-1.5 rounded-md border text-gray-300 bg-black/40 cursor-default transition-all duration-300 hover:text-white hover:scale-105"
            style={{ 
              borderColor: `${category.color}30`,
              borderLeftColor: category.color,
              borderLeftWidth: '2px'
            }}
          >
            {skill}
          </motion.span>
        ))}
      </div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   MAIN SKILLS COMPONENT
═══════════════════════════════════════════════════════════════ */
export default function Skills() {
  const [sectionRef, inView] = useInView(0.05);

  return (
    <section 
      id="skills" 
      ref={sectionRef} 
      className="relative py-32 px-6 overflow-hidden perspective-1000"
    >
      {/* Ambient Backgrounds */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div 
          className="absolute top-1/3 left-0 w-[500px] h-[500px] rounded-full blur-[140px] opacity-[0.08]"
          style={{ background: 'radial-gradient(circle, #06b6d4, transparent)' }} 
        />
        <div 
          className="absolute bottom-1/4 right-0 w-[600px] h-[600px] rounded-full blur-[150px] opacity-[0.06]"
          style={{ background: 'radial-gradient(circle, #a855f7, transparent)' }} 
        />
      </div>
      <div className="absolute inset-0 bg-grid opacity-[0.15] pointer-events-none z-0 mask-image:linear-gradient(to_bottom,transparent,white,transparent)" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* ═══ SECTION HEADER ═══ */}
        <motion.div
          initial={{ opacity: 0, y: 50, rotateX: 15 }}
          animate={inView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-16 md:mb-24 transform-style-3d"
        >
          <div className="inline-flex items-center gap-2 mb-5">
            <div className="h-px w-8" style={{ background: 'linear-gradient(90deg, transparent, #06b6d4)' }} />
            <span className="text-cyan-400 text-xs font-mono uppercase tracking-[0.35em] glass-card px-4 py-1.5 rounded-full border-glow" style={{ borderColor: 'rgba(6,182,212,0.3)' }}>
              Technical Expertise
            </span>
            <div className="h-px w-8" style={{ background: 'linear-gradient(90deg, #06b6d4, transparent)' }} />
          </div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 text-shadow-glow leading-tight">
            Skills & <span className="gradient-text">Technologies</span>
          </h2>
          
          <div className="w-24 h-1 mx-auto rounded-full mb-6" style={{ background: 'linear-gradient(90deg, #6366f1, #06b6d4, #a855f7)' }} />
          
          <p className="section-subtitle mt-4 font-light max-w-3xl mx-auto text-gray-400 leading-relaxed text-sm md:text-base">
            A comprehensive overview of the technologies, tools, and platforms I use to build intelligent AI-powered software and automation solutions.
          </p>
        </motion.div>

        {/* ═══ SKILL CATEGORIES GRID ═══ */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 mb-24">
          {SKILL_CATEGORIES.map((category, idx) => (
            <CategoryCard 
              key={category.id} 
              category={category} 
              index={idx} 
              globalInView={inView} 
            />
          ))}
        </div>

        {/* ═══ BOTTOM STATS ═══ */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {STATS_DATA.map((stat, i) => (
            <StatCard key={stat.label} stat={stat} index={i} />
          ))}
        </div>
        
      </div>
    </section>
  );
}
