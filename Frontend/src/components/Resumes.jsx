import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { useInView } from '../hooks/useInView'
import { Download, Eye, Bot, Code2, Globe, RefreshCw, Cpu } from 'lucide-react'

// ─── PDF helpers ────────────────────────────────────────────────────────────
const previewResume = (file) => {
  if (!file) return
  window.open(`/resumes/${file}`, '_blank')
}

const downloadResume = (file) => {
  if (!file) return
  const link = document.createElement('a')
  link.href = `/resumes/${file}`
  link.download = file
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

// ─── Resume data ─────────────────────────────────────────────────────────────
const resumesList = [
  {
    id: 'ai-engineer',
    title: 'AI Engineer',
    description: 'Highlighting LLMs, RAG systems, AI Agents, LangChain, TensorFlow, PyTorch, and end-to-end AI infrastructure.',
    color: '#6366f1',
    icon: <Bot size={24} />,
    badge: 'ATS 96+',
    bestFor: 'AI/ML product teams, research labs',
    file: 'Jeevan_Bodlapati_Resume_AIEngineer.pdf',
  },
  {
    id: 'software-engineer',
    title: 'Software Engineer',
    description: 'Showcasing Python, Java, JavaScript, FastAPI, Node.js, and AI-assisted development with Copilot & Cursor.',
    color: '#06b6d4',
    icon: <Code2 size={24} />,
    badge: 'ATS 93+',
    bestFor: 'Enterprise & product engineering',
    file: 'Jeevan_Bodlapati_Resume_SoftwareDeveloper.pdf',
  },
  {
    id: 'fullstack-developer',
    title: 'Full Stack Developer',
    description: 'Bridging React, Next.js, Node.js, and FastAPI with AI integrations including LangChain and RAG pipelines.',
    color: '#a855f7',
    icon: <Globe size={24} />,
    badge: 'ATS 95+',
    bestFor: 'SaaS startups & web agencies',
    file: 'Jeevan_Bodlapati_Resume_AIFullStackDeveloper.pdf',
  },
  {
    id: 'ai-automation',
    title: 'Automation Engineer',
    description: 'Specializing in AI agents, LangChain orchestration, LlamaIndex, RAG, and intelligent workflow automation.',
    color: '#10b981',
    icon: <RefreshCw size={24} />,
    badge: 'ATS 92+',
    bestFor: 'AI ops & automation-first companies',
    file: 'Jeevan_Bodlapati_Resume_AIAutomationEngineer.pdf',
  },
]

// ─── Card component ──────────────────────────────────────────────────────────
function HolographicResumeCard({ title, description, color, icon, badge, bestFor, file, index, inView }) {
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 20 })
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 20 })

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['12deg', '-12deg'])
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-12deg', '12deg'])

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    x.set((e.clientX - rect.left) / rect.width - 0.5)
    y.set((e.clientY - rect.top) / rect.height - 0.5)
  }

  const handleMouseLeave = () => { x.set(0); y.set(0) }

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, rotateX: 20 }}
      animate={inView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
      transition={{ duration: 0.8, delay: index * 0.1, type: 'spring', stiffness: 100 }}
      style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative glass-card-hover rounded-2xl p-7 perspective-1000 h-full flex flex-col justify-between group"
    >
      {/* Top accent line */}
      <div
        className="absolute inset-x-0 top-0 h-0.5 rounded-t-2xl opacity-70 group-hover:opacity-100 transition-opacity"
        style={{ background: `linear-gradient(90deg, transparent, ${color}, transparent)` }}
      />

      <div style={{ transform: 'translateZ(28px)' }}>
        {/* Header */}
        <div className="flex items-start gap-4 mb-4">
          <div
            className="p-3 rounded-xl glass-card flex items-center justify-center flex-shrink-0"
            style={{ color, borderColor: `${color}50`, boxShadow: `0 0 20px ${color}35` }}
          >
            {icon}
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-bold tracking-tight text-white leading-tight">{title}</h3>
            <span
              className="inline-block mt-1 text-[10px] font-black px-2.5 py-0.5 rounded-lg"
              style={{ background: `${color}20`, color, border: `1px solid ${color}35` }}
            >
              {badge}
            </span>
          </div>
        </div>

        <p className="text-gray-400 text-sm mb-3 leading-relaxed font-light">{description}</p>

        <div className="flex items-center gap-1.5 text-[11px] text-gray-500 mb-6">
          <span className="opacity-60">Best for:</span>
          <span className="font-medium" style={{ color: `${color}cc` }}>{bestFor}</span>
        </div>
      </div>

      {/* Action buttons */}
      <div className="flex gap-3" style={{ transform: 'translateZ(20px)' }}>
        {/* Preview — opens PDF in new tab, or disabled when no file */}
        <button
          onClick={() => previewResume(file)}
          disabled={!file}
          className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-xs font-semibold tracking-wide transition-all duration-300 border"
          style={file ? {
            borderColor: `${color}45`,
            color,
            background: 'transparent',
          } : {
            borderColor: 'rgba(255,255,255,0.08)',
            color: '#6b7280',
            background: 'transparent',
            cursor: 'not-allowed',
          }}
          onMouseEnter={e => {
            if (!file) return
            e.currentTarget.style.background = `${color}18`
            e.currentTarget.style.color = '#fff'
            e.currentTarget.style.boxShadow = `0 0 18px ${color}35`
          }}
          onMouseLeave={e => {
            if (!file) return
            e.currentTarget.style.background = 'transparent'
            e.currentTarget.style.color = color
            e.currentTarget.style.boxShadow = 'none'
          }}
        >
          <Eye size={15} /> {file ? 'Preview' : 'Coming Soon'}
        </button>

        {/* Download — directly downloads PDF, or disabled when no file */}
        <button
          onClick={() => downloadResume(file)}
          disabled={!file}
          className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-xs font-bold tracking-wide text-white transition-all duration-300"
          style={file ? {
            background: `linear-gradient(135deg, ${color}dd, ${color}99)`,
            boxShadow: `0 4px 18px ${color}38`,
          } : {
            background: 'rgba(255,255,255,0.06)',
            boxShadow: 'none',
            color: '#6b7280',
            cursor: 'not-allowed',
          }}
          onMouseEnter={e => {
            if (!file) return
            e.currentTarget.style.boxShadow = `0 6px 28px ${color}55`
            e.currentTarget.style.transform = 'scale(1.03)'
          }}
          onMouseLeave={e => {
            if (!file) return
            e.currentTarget.style.boxShadow = `0 4px 18px ${color}38`
            e.currentTarget.style.transform = 'scale(1)'
          }}
        >
          <Download size={15} /> {file ? 'Download' : 'Coming Soon'}
        </button>
      </div>
    </motion.div>
  )
}

// ─── Section ─────────────────────────────────────────────────────────────────
export default function Resumes() {
  const [ref, inView] = useInView(0.1)

  const scrollToGenerator = () =>
    document.getElementById('generator')?.scrollIntoView({ behavior: 'smooth' })

  return (
    <section
      id="resumes"
      ref={ref}
      className="relative py-32 px-6 perspective-1000 overflow-hidden"
    >
      {/* Background ambient lighting */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div
          className="absolute top-1/2 left-0 w-[500px] h-[500px] rounded-full blur-[120px] opacity-10 animate-pulse"
          style={{ background: 'radial-gradient(circle, #6366f1, transparent)' }}
        />
        <div
          className="absolute top-1/3 right-0 w-[400px] h-[400px] rounded-full blur-[100px] opacity-8"
          style={{ background: 'radial-gradient(circle, #a855f7, transparent)' }}
        />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 50, rotateX: 30 }}
          animate={inView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="text-center mb-16 transform-style-3d"
        >
          <p className="text-indigo-400 text-sm font-mono uppercase tracking-[0.3em] mb-3 inline-block glass-card px-4 py-1 rounded-full border-glow">
            Professional Profiles
          </p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-shadow-glow">
            Tailored <span className="gradient-text">Resumes</span>
          </h2>
          <div className="w-24 h-1 mx-auto mt-4 rounded-full" style={{ background: 'linear-gradient(90deg, #6366f1, #a855f7)' }} />
          <p className="section-subtitle mt-6 font-light">
            Four role-specific resumes, each ATS-optimized and ready to preview or download instantly.
          </p>
        </motion.div>

        {/* 4-card grid: 2 + 2 */}
        <div className="grid md:grid-cols-2 gap-6 perspective-1000">
          {resumesList.map((resume, i) => (
            <HolographicResumeCard
              key={resume.id}
              {...resume}
              index={i}
              inView={inView}
            />
          ))}
        </div>

        {/* Bottom CTA — scrolls to AI Generator section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-14 text-center"
        >
          <button
            onClick={scrollToGenerator}
            className="inline-flex items-center gap-3 px-10 py-4 rounded-full font-bold text-white transition-all duration-300 hover:scale-105 hover:shadow-2xl active:scale-95"
            style={{
              background: 'linear-gradient(135deg, #6366f1, #a855f7)',
              boxShadow: '0 0 40px rgba(99,102,241,0.4)',
            }}
          >
            <Cpu size={20} />
            Generate a Custom AI Resume
          </button>
          <p className="text-xs text-gray-600 mt-3 font-mono">Tailored to any job description · Powered by AI</p>
        </motion.div>
      </div>
    </section>
  )
}
