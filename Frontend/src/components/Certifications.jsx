import { useRef } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { useInView } from '../hooks/useInView'
import { Award, ExternalLink, CheckCircle2 } from 'lucide-react'

const certifications = [
  {
    title: 'AWS Certified Machine Learning – Specialty',
    issuer: 'Amazon Web Services',
    date: 'Mar 2024',
    icon: '☁️',
    color: '#f59e0b',
    credentialId: 'AWS-MLS-2024',
    skills: ['SageMaker', 'ML Ops', 'Deep Learning', 'Data Engineering'],
    verified: true,
    link: '#',
  },
  {
    title: 'Deep Learning Specialization',
    issuer: 'deeplearning.ai / Coursera',
    date: 'Nov 2023',
    icon: '🧠',
    color: '#6366f1',
    credentialId: 'DL-SPEC-2023',
    skills: ['Neural Networks', 'CNNs', 'RNNs', 'Transformers'],
    verified: true,
    link: '#',
  },
  {
    title: 'LangChain for LLM Application Development',
    issuer: 'deeplearning.ai',
    date: 'Sep 2023',
    icon: '⛓️',
    color: '#a855f7',
    credentialId: 'LC-LLM-2023',
    skills: ['LangChain', 'RAG', 'Agents', 'Memory'],
    verified: true,
    link: '#',
  },
  {
    title: 'Meta Front-End Developer Professional',
    issuer: 'Meta / Coursera',
    date: 'Jun 2023',
    icon: '⚛️',
    color: '#06b6d4',
    credentialId: 'META-FE-2023',
    skills: ['React', 'Advanced JS', 'UI/UX', 'Testing'],
    verified: true,
    link: '#',
  },
  {
    title: 'OpenAI Prompt Engineering Certificate',
    issuer: 'OpenAI',
    date: 'Apr 2023',
    icon: '✨',
    color: '#ec4899',
    credentialId: 'OAI-PE-2023',
    skills: ['GPT-4', 'Chain-of-Thought', 'Few-shot', 'Fine-tuning'],
    verified: true,
    link: '#',
  },
  {
    title: 'Google Cloud Professional Data Engineer',
    issuer: 'Google Cloud',
    date: 'Jan 2023',
    icon: '🔵',
    color: '#22c55e',
    credentialId: 'GCP-DE-2023',
    skills: ['BigQuery', 'Dataflow', 'Pub/Sub', 'Vertex AI'],
    verified: true,
    link: '#',
  },
  {
    title: 'MongoDB Developer Certification',
    issuer: 'MongoDB University',
    date: 'Oct 2022',
    icon: '🍃',
    color: '#4ade80',
    credentialId: 'MDB-DEV-2022',
    skills: ['Aggregation', 'Atlas', 'Indexing', 'Atlas Search'],
    verified: true,
    link: '#',
  },
  {
    title: 'Docker Certified Associate',
    issuer: 'Docker Inc.',
    date: 'Jul 2022',
    icon: '🐳',
    color: '#38bdf8',
    credentialId: 'DCA-2022',
    skills: ['Containers', 'Compose', 'Swarm', 'Security'],
    verified: true,
    link: '#',
  },
]

function CertCard({ cert, index, inView }) {
  const cardRef = useRef(null)

  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 20 })
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 20 })

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"])
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"])

  const handleMouseMove = (e) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const width = rect.width
    const height = rect.height
    const mouseXPos = e.clientX - rect.left
    const mouseYPos = e.clientY - rect.top
    const xPct = mouseXPos / width - 0.5
    const yPct = mouseYPos / height - 0.5
    x.set(xPct)
    y.set(yPct)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50, rotateX: 10 }}
      animate={inView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
      transition={{ duration: 0.6, delay: 0.1 + index * 0.05, type: "spring" }}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="perspective-1000 group relative"
    >
      <div 
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl"
        style={{ background: cert.color, transform: "translateZ(-30px)" }}
      ></div>

      <div 
        className="glass-card-hover rounded-2xl p-6 h-full flex flex-col border border-white/5 transition-all duration-300"
        style={{ transform: "translateZ(10px)" }}
      >
        {/* Icon + verified badge */}
        <div className="flex items-start justify-between mb-6 transform-style-3d">
          <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl shadow-lg border border-white/10 group-hover:scale-110 transition-transform duration-500"
            style={{ background: `linear-gradient(135deg, ${cert.color}40, rgba(0,0,0,0.8))`, transform: "translateZ(30px)", boxShadow: `0 0 20px ${cert.color}40` }}>
            <span className="drop-shadow-lg">{cert.icon}</span>
          </div>
          {cert.verified && (
            <div className="flex items-center gap-1.5 text-xs text-green-400 font-bold tracking-widest uppercase bg-green-500/10 px-3 py-1 rounded-full border border-green-500/30" style={{ transform: "translateZ(20px)" }}>
              <CheckCircle2 size={14} className="animate-pulse" /> Verified
            </div>
          )}
        </div>

        {/* Title & issuer */}
        <div style={{ transform: "translateZ(20px)" }}>
          <h3 className="font-bold text-white text-lg mb-2 leading-tight group-hover:text-shadow-glow transition-all duration-300" style={{ '--tw-shadow-color': cert.color }}>
            {cert.title}
          </h3>
          <p className="text-sm text-gray-400 mb-1 font-medium">{cert.issuer}</p>
          <p className="text-xs text-gray-600 mb-6 font-mono">{cert.date}</p>
        </div>

        {/* Skill chips */}
        <div className="flex flex-wrap gap-2 mb-8 mt-auto" style={{ transform: "translateZ(20px)" }}>
          {cert.skills.map(s => (
            <span key={s} className="text-[10px] font-mono px-2 py-1 rounded-sm transition-colors duration-300"
              style={{ background: `${cert.color}15`, border: `1px solid ${cert.color}30`, color: cert.color }}>
              {s}
            </span>
          ))}
        </div>

        {/* Credential ID + link */}
        <div className="flex items-center justify-between border-t border-white/10 pt-5" style={{ transform: "translateZ(20px)" }}>
          <span className="text-[10px] text-gray-600 font-mono tracking-widest">{cert.credentialId}</span>
          <a
            href={cert.link}
            className="flex items-center gap-1.5 text-xs font-bold transition-all duration-300 hover:scale-110 uppercase tracking-widest"
            style={{ color: cert.color, textShadow: `0 0 10px ${cert.color}80` }}
          >
            Access <ExternalLink size={12} />
          </a>
        </div>
      </div>
    </motion.div>
  )
}

export default function Certifications() {
  const [ref, inView] = useInView(0.1)

  return (
    <section id="certifications" ref={ref} className="relative py-32 px-6 perspective-1000">
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 w-[800px] h-[800px] rounded-full blur-[150px] opacity-10"
          style={{ background: 'radial-gradient(circle, #06b6d4, transparent)' }} />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 50, rotateX: 20 }}
          animate={inView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-20 transform-style-3d"
        >
          <p className="text-cyan-400 text-sm font-mono uppercase tracking-[0.3em] mb-3 inline-block glass-card px-4 py-1 rounded-full border-glow">
            Authentication Matrix
          </p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-shadow-glow">
            Verified <span className="gradient-text">Credentials</span>
          </h2>
          <div className="w-24 h-1 mx-auto mt-4 rounded-full" style={{ background: 'linear-gradient(90deg, #06b6d4, #3b82f6)' }} />
          <p className="section-subtitle mt-6 font-light">
            Industry-recognized certifications validating expertise across AI, cloud, and modern architectures.
          </p>
        </motion.div>

        {/* Holographic Stats banner */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, rotateX: -10 }}
          animate={inView ? { opacity: 1, scale: 1, rotateX: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="glass-card rounded-2xl p-8 mb-16 flex flex-wrap justify-center gap-12 md:gap-24 border-glow"
        >
          {[
            { value: '8+',   label: 'Certificates',   icon: Award },
            { value: '5+',   label: 'Platforms',       icon: CheckCircle2 },
            { value: '100%', label: 'Verified',         icon: CheckCircle2 },
          ].map(({ value, label }) => (
            <div key={label} className="text-center group w-full md:w-auto">
              <div className="text-4xl md:text-5xl font-black gradient-text mb-3 drop-shadow-xl group-hover:scale-110 transition-transform duration-500">{value}</div>
              <div className="text-xs text-gray-400 font-mono uppercase tracking-[0.2em]">{label}</div>
            </div>
          ))}
        </motion.div>

        {/* Cert grid */}
        <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-8">
          {certifications.map((cert, i) => (
            <CertCard key={i} cert={cert} index={i} inView={inView} />
          ))}
        </div>
      </div>
    </section>
  )
}
