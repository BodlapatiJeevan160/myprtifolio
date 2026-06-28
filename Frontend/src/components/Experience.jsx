import { useRef } from 'react'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'
import { useInView } from '../hooks/useInView'
import { MapPin, Calendar, Briefcase } from 'lucide-react'

const experiences = [
  {
    role: 'AI Engineer',
    company: 'TechVision AI Labs',
    location: 'Bangalore, India',
    duration: 'Jan 2024 – Present',
    type: 'Full-time',
    color: '#6366f1',
    icon: '🤖',
    highlights: [
      'Architected and deployed RAG-based document intelligence system serving 10K+ users',
      'Engineered prompt pipelines reducing LLM costs by 40% while maintaining quality',
      'Led integration of GPT-4o and Claude APIs into enterprise SaaS product',
      'Built real-time AI chat infrastructure handling 50K+ daily messages',
    ],
    tags: ['LangChain', 'OpenAI', 'FastAPI', 'AWS', 'React'],
  },
  {
    role: 'Full Stack Developer',
    company: 'Innovate Digital Solutions',
    location: 'Hyderabad, India',
    duration: 'Jun 2022 – Dec 2023',
    type: 'Full-time',
    color: '#a855f7',
    icon: '💻',
    highlights: [
      'Built and shipped 8+ full-stack web applications using React and Node.js',
      'Reduced API response time by 60% through caching and query optimization',
      'Mentored 3 junior developers on React best practices and code review',
      'Integrated AI-powered features including smart search and recommendations',
    ],
    tags: ['React', 'Node.js', 'PostgreSQL', 'Docker', 'TypeScript'],
  },
  {
    role: 'Prompt Engineer & AI Consultant',
    company: 'Freelance / Remote',
    location: 'Remote',
    duration: 'Jan 2022 – May 2022',
    type: 'Freelance',
    color: '#06b6d4',
    icon: '✨',
    highlights: [
      'Consulted for 12+ clients on AI integration strategies and prompt design',
      'Created comprehensive prompt templates for marketing, content, and coding tasks',
      'Evaluated and benchmarked leading LLMs for client-specific use cases',
      'Delivered AI automation workflows saving clients 15+ hours/week',
    ],
    tags: ['GPT-4', 'Claude', 'Prompt Design', 'Python', 'Automation'],
  },
  {
    role: 'Frontend Developer Intern',
    company: 'StartUp Hub',
    location: 'Hyderabad, India',
    duration: 'Jun 2021 – Dec 2021',
    type: 'Internship',
    color: '#ec4899',
    icon: '🚀',
    highlights: [
      'Built responsive UI components using React and Tailwind CSS',
      'Collaborated with design team to implement pixel-perfect interfaces',
      'Improved page load performance by 35% through code splitting and lazy loading',
    ],
    tags: ['React', 'Tailwind CSS', 'JavaScript', 'Figma'],
  },
]

function ExperienceCard({ exp, index }) {
  const [ref, inView] = useInView(0.2)
  const isEven = index % 2 === 0

  return (
    <div ref={ref} className="relative w-full flex justify-between items-center mb-16 md:mb-24 last:mb-0 group perspective-1000">
      {/* Node / Dot */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={inView ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
        transition={{ duration: 0.5, delay: 0.2, type: "spring" }}
        className="absolute left-6 md:left-1/2 -translate-x-1/2 w-10 h-10 md:w-14 md:h-14 rounded-full flex items-center justify-center text-lg md:text-2xl z-20 border border-white/10"
        style={{
          background: `radial-gradient(circle at center, ${exp.color}40, rgba(0,0,0,0.8))`,
          boxShadow: `0 0 20px ${exp.color}60, inset 0 0 10px ${exp.color}40`,
        }}
      >
        <span className="relative z-10">{exp.icon}</span>
        {/* Pulsing glow behind node */}
        <div className="absolute inset-0 rounded-full animate-ping opacity-40 mix-blend-screen" style={{ background: exp.color }}></div>
      </motion.div>

      {/* Content Card container */}
      <div className={`w-full pl-16 md:pl-0 md:w-5/12 ${isEven ? 'md:text-right md:pr-8' : 'md:text-left md:pl-8 md:ml-auto'} transform-style-3d`}>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
          className="glass-card rounded-2xl p-6 md:p-8 relative overflow-hidden transition-all duration-500 hover:scale-[1.02] border-glow"
          style={{ '--tw-shadow-color': `${exp.color}30`, borderColor: `${exp.color}40` }}
        >
          {/* Subtle background glow inside card */}
          <div className="absolute top-0 right-0 w-32 h-32 blur-3xl opacity-20 pointer-events-none" style={{ background: exp.color }}></div>

          {/* Header */}
          <div className={`flex flex-col gap-2 mb-6 items-start ${isEven ? 'md:items-end' : 'md:items-start'}`}>
            <span className="flex items-center gap-1.5 text-xs font-mono tracking-widest uppercase text-gray-400 mb-1">
              <Calendar size={12} /> {exp.duration}
            </span>
            <h3 className="text-xl md:text-2xl font-bold text-white group-hover:text-shadow-glow transition-colors duration-300" style={{ '--tw-shadow-color': exp.color }}>
              {exp.role}
            </h3>
            <div className="flex items-center gap-2 mt-1">
              <Briefcase size={14} style={{ color: exp.color }} />
              <span className="font-bold tracking-wide text-sm md:text-base" style={{ color: exp.color }}>{exp.company}</span>
            </div>
            
            <div className="flex flex-wrap items-center gap-3 mt-3">
              <span className="flex items-center gap-1.5 text-xs text-gray-500 font-mono">
                <MapPin size={12} /> {exp.location}
              </span>
              <span className="text-[10px] md:text-xs px-2 md:px-3 py-1 rounded-sm font-bold uppercase tracking-widest border"
                style={{ background: `${exp.color}10`, color: exp.color, borderColor: `${exp.color}30` }}>
                {exp.type}
              </span>
            </div>
          </div>

          {/* Highlights */}
          <ul className={`space-y-3 mb-6 text-xs md:text-sm text-gray-400 font-light text-left ${isEven ? 'md:text-right' : 'md:text-left'}`}>
            {exp.highlights.map((h, j) => (
              <li key={j} className={`flex items-start gap-3 flex-row ${isEven ? 'md:flex-row-reverse' : 'md:flex-row'}`}>
                <span className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0"
                  style={{ background: exp.color, boxShadow: `0 0 8px ${exp.color}` }} />
                <span>{h}</span>
              </li>
            ))}
          </ul>

          {/* Tags */}
          <div className={`flex flex-wrap gap-2 justify-start ${isEven ? 'md:justify-end' : 'md:justify-start'}`}>
            {exp.tags.map(tag => (
              <span key={tag} className="text-[10px] md:text-xs font-mono px-2 md:px-3 py-1 bg-black/40 border border-white/5 rounded-sm text-gray-300 transition-colors hover:text-white"
                style={{ borderLeftColor: exp.color, borderLeftWidth: '2px' }}>
                {tag}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default function Experience() {
  const [ref, inView] = useInView(0.1)
  const containerRef = useRef(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  })

  // Smooth progress bar
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  })

  return (
    <section id="experience" ref={ref} className="relative py-32 px-6 overflow-hidden perspective-1000">
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-1/2 right-1/4 w-[600px] h-[600px] rounded-full blur-[120px] opacity-10"
          style={{ background: 'radial-gradient(circle, #a855f7, transparent)' }} />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 50, rotateX: 20 }}
          animate={inView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-24 transform-style-3d"
        >
          <p className="text-pink-400 text-sm font-mono uppercase tracking-[0.3em] mb-3 inline-block glass-card px-4 py-1 rounded-full border-glow">
            Timeline Core
          </p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-shadow-glow">
            Professional <span className="gradient-text">Journey</span>
          </h2>
          <div className="w-24 h-1 mx-auto mt-4 rounded-full" style={{ background: 'linear-gradient(90deg, #a855f7, #ec4899)' }} />
        </motion.div>

        {/* Cinematic Timeline */}
        <div ref={containerRef} className="relative max-w-4xl mx-auto py-10">
          
          {/* Background Line */}
          <div className="absolute left-6 md:left-1/2 -translate-x-1/2 top-0 bottom-0 w-1 bg-white/5 rounded-full" />
          
          {/* Animated Progress Line */}
          <motion.div 
            style={{ scaleY, transformOrigin: "top" }}
            className="absolute left-6 md:left-1/2 -translate-x-1/2 top-0 bottom-0 w-1 rounded-full z-10 mix-blend-screen"
            initial={{ background: 'linear-gradient(180deg, #6366f1, #a855f7, #ec4899)' }}
          >
            <div className="absolute top-full left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-pink-500 blur-sm animate-pulse" />
          </motion.div>

          {/* Timeline Events */}
          <div className="relative z-20">
            {experiences.map((exp, i) => (
              <ExperienceCard key={i} exp={exp} index={i} />
            ))}
          </div>

        </div>
      </div>
    </section>
  )
}
