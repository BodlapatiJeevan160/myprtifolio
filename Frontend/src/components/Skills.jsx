import { useState } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { useInView } from '../hooks/useInView'
import { Brain, Code2, CloudCog } from 'lucide-react'

const skillCategories = [
  {
    label: 'AI & Machine Learning',
    color: '#6366f1',
    icon: <Brain size={24} />,
    skills: [
      { name: 'Large Language Models',  level: 92 },
      { name: 'Prompt Engineering',     level: 95 },
      { name: 'TensorFlow / PyTorch',   level: 78 },
      { name: 'LangChain / LlamaIndex', level: 85 },
      { name: 'RAG Systems',            level: 88 },
      { name: 'OpenAI / Anthropic APIs',level: 93 },
    ],
  },
  {
    label: 'Frontend Development',
    color: '#a855f7',
    icon: <Code2 size={24} />,
    skills: [
      { name: 'React / Next.js',   level: 90 },
      { name: 'TypeScript',        level: 82 },
      { name: 'Tailwind CSS',      level: 88 },
      { name: 'Framer Motion',     level: 78 },
      { name: 'HTML5 / CSS3',      level: 92 },
      { name: 'Three.js / WebGL',  level: 65 },
    ],
  },
  {
    label: 'Backend & Cloud',
    color: '#06b6d4',
    icon: <CloudCog size={24} />,
    skills: [
      { name: 'Python / FastAPI',   level: 88 },
      { name: 'Node.js / Express',  level: 80 },
      { name: 'PostgreSQL / MongoDB', level: 82 },
      { name: 'AWS / GCP',          level: 72 },
      { name: 'Docker / Kubernetes',level: 70 },
      { name: 'REST / GraphQL',     level: 85 },
    ],
  },
]

const techStack = [
  // Programming Languages
  'Python', 'Java', 'JavaScript', 'TypeScript',
  // AI & Prompt Engineering
  'Prompt Engineering', 'ChatGPT', 'Gemini', 'NotebookLM', 'Claude',
  'Perplexity AI', 'GitHub Copilot', 'Cursor AI',
  // AI Development
  'Large Language Models (LLMs)', 'Prompt Optimization', 'AI Agents',
  'RAG Systems', 'LangChain', 'LlamaIndex', 'Hugging Face', 'TensorFlow', 'PyTorch',
  // Web & Software
  'React', 'Next.js', 'Node.js', 'FastAPI', 'Git', 'Figma', 'MongoDB',
]

// Holographic 3D Card Component
function HolographicCard({ children, className, mouseX, mouseY }) {
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 20 })
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 20 })

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["15deg", "-15deg"])
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-15deg", "15deg"])

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const width = rect.width
    const height = rect.height
    const mouseXPos = e.clientX - rect.left
    const mouseYPos = e.clientY - rect.top
    const xPct = mouseXPos / width - 0.5
    const yPct = mouseYPos / height - 0.5
    x.set(xPct)
    y.set(yPct)
    
    // Pass global mouse coordinates for radial gradients in CSS
    if(mouseX && mouseY) {
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)
    }
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative glass-card-hover rounded-2xl p-8 perspective-1000 ${className}`}
    >
      <div style={{ transform: "translateZ(30px)" }}>
        {children}
      </div>
    </motion.div>
  )
}

function SkillBar({ name, level, color, delay, inView }) {
  return (
    <div className="mb-5 relative z-10">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-medium text-gray-300 font-mono tracking-wide">{name}</span>
        <span className="text-xs font-bold" style={{ color, textShadow: `0 0 10px ${color}` }}>{level}%</span>
      </div>
      <div className="h-2 rounded-full overflow-hidden bg-white/5 relative">
        <div className="absolute inset-0 bg-grid opacity-20 pointer-events-none"></div>
        <motion.div
          className="h-full rounded-full relative"
          initial={{ width: 0 }}
          animate={inView ? { width: `${level}%` } : { width: 0 }}
          transition={{ duration: 1.5, delay, ease: [0.22, 1, 0.36, 1] }}
          style={{ 
            background: `linear-gradient(90deg, ${color}40, ${color})`,
            boxShadow: `0 0 15px ${color}80, inset 0 0 5px ${color}`
          }}
        >
          {/* Animated scanning line on the progress bar */}
          <motion.div 
            className="absolute top-0 bottom-0 right-0 w-4 mix-blend-screen"
            animate={{ opacity: [0, 1, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            style={{ background: `linear-gradient(90deg, transparent, #fff)` }}
          />
        </motion.div>
      </div>
    </div>
  )
}

export default function Skills() {
  const [ref, inView] = useInView(0.1)
  const [activeTab, setActiveTab] = useState(0)

  // Global mouse coordinates for glass-card hover radial effects
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const handleGlobalMouseMove = (e) => {
    mouseX.set(e.clientX)
    mouseY.set(e.clientY)
  }

  const cat = skillCategories[activeTab]

  return (
    <section 
      id="skills" 
      ref={ref} 
      className="relative py-32 px-6 perspective-1000 overflow-hidden"
      onMouseMove={handleGlobalMouseMove}
    >
      {/* Background ambient lighting */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-1/4 right-0 w-[500px] h-[500px] rounded-full blur-[120px] opacity-10 animate-pulse"
          style={{ background: 'radial-gradient(circle, #06b6d4, transparent)' }} />
        <div className="absolute bottom-0 left-1/4 w-[600px] h-[600px] rounded-full blur-[150px] opacity-10"
          style={{ background: 'radial-gradient(circle, #a855f7, transparent)' }} />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 50, rotateX: 30 }}
          animate={inView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-16 transform-style-3d"
        >
          <p className="text-cyan-400 text-sm font-mono uppercase tracking-[0.3em] mb-3 inline-block glass-card px-4 py-1 rounded-full border-glow">
            System Capabilities
          </p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-shadow-glow">
            Core <span className="gradient-text">Architecture</span>
          </h2>
          <div className="w-24 h-1 mx-auto mt-4 rounded-full" style={{ background: 'linear-gradient(90deg, #6366f1, #06b6d4)' }} />
          <p className="section-subtitle mt-6 font-light">
            A highly optimized matrix of technologies powering intelligent, scalable solutions.
          </p>
        </motion.div>

        {/* Holographic Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-4 mb-16"
        >
          {skillCategories.map(({ label, icon, color }, i) => (
            <button
              key={i}
              onClick={() => setActiveTab(i)}
              className={`flex items-center gap-3 px-6 py-3 rounded-full text-sm font-semibold transition-all duration-500 transform-style-3d ${
                activeTab === i
                  ? 'text-white scale-110 shadow-2xl z-10'
                  : 'text-gray-400 glass-card hover:text-white hover:scale-105'
              }`}
              style={activeTab === i ? {
                background: `linear-gradient(135deg, ${color}40, ${color}10)`,
                border: `1px solid ${color}80`,
                boxShadow: `0 0 30px ${color}40, inset 0 0 10px ${color}20`,
                transform: 'translateZ(20px)'
              } : {}}
            >
              <span className={activeTab === i ? 'animate-pulse' : ''} style={{ color: activeTab === i ? color : undefined }}>{icon}</span>
              <span className="tracking-wide">{label}</span>
            </button>
          ))}
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-start perspective-1000">
          {/* Main Skill Hologram Card */}
          <motion.div
            key={`card-${activeTab}`}
            initial={{ opacity: 0, x: -50, rotateY: -30 }}
            animate={{ opacity: 1, x: 0, rotateY: 0 }}
            exit={{ opacity: 0, x: 50, rotateY: 30 }}
            transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
            className="transform-style-3d"
          >
            <HolographicCard mouseX={mouseX} mouseY={mouseY} className="border-glow bg-black/40">
              <div className="flex items-center gap-4 mb-10">
                <div className="p-3 rounded-xl glass-card flex items-center justify-center animate-pulse" style={{ color: cat.color, borderColor: `${cat.color}50`, boxShadow: `0 0 20px ${cat.color}40` }}>
                  {cat.icon}
                </div>
                <h3 className="text-2xl font-bold tracking-tight text-white">{cat.label}</h3>
              </div>
              
              <div className="space-y-2">
                {cat.skills.map((skill, i) => (
                  <SkillBar
                    key={skill.name}
                    {...skill}
                    color={cat.color}
                    delay={0.3 + i * 0.1}
                    inView={inView}
                  />
                ))}
              </div>
            </HolographicCard>
          </motion.div>

          {/* Tech Stack Cloud */}
          <motion.div
            initial={{ opacity: 0, x: 50, rotateY: 30 }}
            animate={inView ? { opacity: 1, x: 0, rotateY: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3, type: "spring", stiffness: 100 }}
            className="space-y-8 transform-style-3d"
          >
            <HolographicCard mouseX={mouseX} mouseY={mouseY}>
              <h3 className="text-lg font-mono font-bold text-cyan-400 mb-8 tracking-[0.2em] uppercase flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-cyan-400 animate-ping"></div>
                Neural Network Index
              </h3>
              <div className="flex flex-wrap gap-3">
                {techStack.map((tech, i) => (
                  <motion.span
                    key={tech}
                    initial={{ opacity: 0, scale: 0.5, rotateZ: -10 }}
                    animate={inView ? { opacity: 1, scale: 1, rotateZ: 0 } : {}}
                    transition={{ duration: 0.4, delay: 0.4 + i * 0.02, type: "spring" }}
                    className="tag-pill cursor-default hover:scale-110 transition-transform duration-300 transform-style-3d"
                    style={{
                      background: `linear-gradient(135deg, rgba(${i % 3 === 0 ? '99,102,241' : i % 3 === 1 ? '168,85,247' : '6,182,212'}, 0.2), transparent)`,
                      borderColor: `rgba(${i % 3 === 0 ? '99,102,241' : i % 3 === 1 ? '168,85,247' : '6,182,212'}, 0.4)`,
                      color: i % 3 === 0 ? '#a5b4fc' : i % 3 === 1 ? '#d8b4fe' : '#67e8f9',
                      boxShadow: `0 4px 12px rgba(0,0,0,0.5)`,
                      transform: 'translateZ(10px)'
                    }}
                  >
                    {tech}
                  </motion.span>
                ))}
              </div>
            </HolographicCard>

            {/* Proficiency Legend */}
            <HolographicCard mouseX={mouseX} mouseY={mouseY} className="p-6">
              <h3 className="text-xs font-mono font-bold text-gray-400 mb-6 uppercase tracking-[0.2em]">Synchronization Levels</h3>
              <div className="space-y-4">
                {[
                  { range: '90–100%', label: 'Master Sync',   color: '#6366f1' },
                  { range: '75–89%',  label: 'High Output',   color: '#a855f7' },
                  { range: '60–74%',  label: 'Stable Link',   color: '#06b6d4' },
                  { range: '< 60%',   label: 'Initializing',  color: '#f59e0b' },
                ].map(({ range, label, color }) => (
                  <div key={label} className="flex items-center gap-4 group">
                    <div className="relative flex items-center justify-center w-4 h-4">
                      <div className="absolute inset-0 rounded-full animate-ping opacity-50" style={{ background: color }}></div>
                      <div className="w-2 h-2 rounded-full relative z-10" style={{ background: color, boxShadow: `0 0 10px ${color}, 0 0 20px ${color}` }} />
                    </div>
                    <span className="text-xs font-mono text-gray-500 group-hover:text-gray-300 transition-colors">{range}</span>
                    <span className="text-xs font-medium text-white ml-auto tracking-wide group-hover:text-shadow-glow transition-all" style={{ '--tw-shadow-color': color }}>{label}</span>
                  </div>
                ))}
              </div>
            </HolographicCard>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
