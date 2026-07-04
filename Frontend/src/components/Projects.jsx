import { useState, useRef } from 'react'
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { useInView } from '../hooks/useInView'
import { ExternalLink, Star, Zap } from 'lucide-react'
import { FaGithub } from 'react-icons/fa'

import { portfolioData } from '../data/portfolioData'

const projects = portfolioData.projects

const filters = ['All', 'AI / ML / Automation', 'Data Engineering / AI', 'AI / Machine Learning', 'Full Stack / Social Impact', 'Full Stack', 'Freelance']

function Project3DCard({ project, index, inView }) {
  const { title, description, tags, category, gradient, glowColor, icon, stars, featured, demo, github, impact } = project
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
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1, type: "spring" }}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative perspective-1000 group cursor-pointer"
    >
      {/* Ambient glowing shadow behind the card */}
      <div 
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-2xl"
        style={{ background: glowColor, transform: "translateZ(-50px) scale(0.95)" }}
      ></div>

      <div 
        className="glass-card rounded-2xl overflow-hidden relative z-10 transition-colors duration-500 border border-white/10 group-hover:border-white/30 h-full flex flex-col"
        style={{ background: 'rgba(10, 14, 23, 0.8)', transform: "translateZ(20px)" }}
      >
        {/* Card header / image area */}
        <div className={`relative h-56 bg-gradient-to-br ${gradient} p-6 flex items-end overflow-hidden`}>
          {/* Zoom effect container */}
          <div className="absolute inset-0 bg-black/20 group-hover:scale-110 transition-transform duration-700 origin-center" />
          
          {/* Decorative bg shapes */}
          <div className="absolute -top-8 -right-8 w-40 h-40 rounded-full opacity-20 bg-white group-hover:scale-150 transition-transform duration-1000" />
          <div className="absolute -bottom-4 -left-4 w-24 h-24 rounded-full opacity-10 bg-white group-hover:scale-150 transition-transform duration-700" />

          {/* Grid overlay */}
          <div className="absolute inset-0 bg-grid opacity-30 mix-blend-overlay"></div>

          {/* Icon & badges */}
          <div className="absolute top-4 right-4 flex items-center gap-2 z-20" style={{ transform: "translateZ(30px)" }}>
            {featured && (
              <span className="flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-white/20 text-white backdrop-blur-md shadow-lg border border-white/20">
                <Zap size={12} className="text-yellow-300" /> Featured
              </span>
            )}
            <span className="flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-black/30 text-white backdrop-blur-md shadow-lg border border-white/10">
              <Star size={12} className="text-yellow-400" /> {stars}
            </span>
          </div>

          <div className="relative z-20 transform-style-3d w-full" style={{ transform: "translateZ(40px)" }}>
            <div className="text-6xl mb-4 group-hover:scale-125 transition-transform duration-500 drop-shadow-2xl">{icon}</div>
            <span className="text-xs font-mono tracking-widest uppercase px-3 py-1 rounded-sm bg-black/40 text-white/90 backdrop-blur-md border-l-2" style={{ borderColor: glowColor }}>
              {category}
            </span>
          </div>
        </div>

        {/* Card body */}
        <div className="p-6 flex flex-col flex-grow relative z-20" style={{ transform: "translateZ(30px)" }}>
          <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-shadow-glow transition-all duration-300" style={{ '--tw-shadow-color': glowColor }}>
            {title}
          </h3>
          <p className="text-gray-400 text-sm leading-relaxed mb-4 line-clamp-3 font-light">{description}</p>
          
          {impact && (
            <div className="mb-6 p-3 rounded-lg bg-white/5 border border-white/10">
              <p className="text-xs font-bold uppercase tracking-wider mb-1" style={{ color: glowColor }}>Key Impact</p>
              <p className="text-sm text-gray-300 font-medium">{impact}</p>
            </div>
          )}

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-8 mt-auto">
            {tags.map(tag => (
              <span key={tag} className="text-[10px] font-mono tracking-wide px-2 py-1 rounded-sm bg-white/5 border border-white/10 text-gray-300 group-hover:border-white/20 transition-colors">
                {tag}
              </span>
            ))}
          </div>

          {/* Actions */}
          <div className="flex flex-wrap gap-3 w-full">
            {/* Initialize — opens live demo in new tab, or shows Coming Soon */}
            <button
              onClick={() => {
                if (demo) window.open(demo, '_blank', 'noopener,noreferrer')
              }}
              disabled={!demo}
              className="flex-1 flex justify-center items-center gap-2 text-xs font-bold px-4 md:px-5 py-2.5 rounded-full transition-all duration-300 group/btn"
              style={demo ? {
                background: `${glowColor}30`,
                border: `1px solid ${glowColor}60`,
                color: '#fff',
                boxShadow: `0 0 15px ${glowColor}40`,
              } : {
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.08)',
                color: '#6b7280',
                cursor: 'not-allowed',
              }}
              onMouseEnter={e => { if (demo) e.currentTarget.style.transform = 'scale(1.05)' }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)' }}
            >
              <ExternalLink size={14} className={demo ? 'group-hover/btn:rotate-45 transition-transform' : ''} />
              {demo ? 'Initialize' : 'Coming Soon'}
            </button>

            {/* Source — opens GitHub in new tab */}
            <button
              onClick={() => {
                if (github && github !== '#') window.open(github, '_blank', 'noopener,noreferrer')
              }}
              className="flex-1 flex justify-center items-center gap-2 text-xs font-bold px-4 md:px-5 py-2.5 rounded-full transition-all duration-300 hover:scale-105 hover:bg-white/10"
              style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: '#d1d5db' }}
            >
              <FaGithub size={14} /> Source
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default function Projects() {
  const [ref, inView] = useInView(0.1)
  const [filter, setFilter] = useState('All')

  const filtered = filter === 'All' ? projects : projects.filter(p => p.category === filter)

  return (
    <section id="projects" ref={ref} className="relative py-32 px-6 perspective-1000">
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-1/2 left-1/4 w-[800px] h-[800px] rounded-full blur-[150px] opacity-10 animate-pulse"
          style={{ background: 'radial-gradient(circle, #6366f1, transparent)' }} />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 50, rotateX: 20 }}
          animate={inView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-16 transform-style-3d"
        >
          <p className="text-purple-400 text-sm font-mono uppercase tracking-[0.3em] mb-3 inline-block glass-card px-4 py-1 rounded-full border-glow">
            Deployed Systems
          </p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-shadow-glow">
            Featured <span className="gradient-text">Projects</span>
          </h2>
          <div className="w-24 h-1 mx-auto mt-4 rounded-full" style={{ background: 'linear-gradient(90deg, #6366f1, #ec4899)' }} />
          <p className="section-subtitle mt-6 font-light">
            A curated selection of advanced AI systems and full-stack architectures.
          </p>
        </motion.div>

        {/* Holographic Filter tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex justify-center gap-4 flex-wrap mb-16"
        >
          {filters.map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-6 py-2.5 rounded-full text-sm font-bold font-mono tracking-wide transition-all duration-500 transform-style-3d ${
                filter === f
                  ? 'text-white scale-110 shadow-2xl z-10'
                  : 'text-gray-400 glass-card hover:text-white hover:scale-105'
              }`}
              style={filter === f ? {
                background: 'linear-gradient(135deg, rgba(99,102,241,0.4), rgba(168,85,247,0.2))',
                border: '1px solid rgba(99,102,241,0.8)',
                boxShadow: '0 0 25px rgba(99,102,241,0.5), inset 0 0 10px rgba(99,102,241,0.3)',
                transform: 'translateZ(20px)'
              } : {}}
            >
              {f}
            </button>
          ))}
        </motion.div>

        {/* Project grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={filter}
            initial={{ opacity: 0, scale: 0.95, filter: 'blur(10px)' }}
            animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
            exit={{ opacity: 0, scale: 1.05, filter: 'blur(10px)' }}
            transition={{ duration: 0.4 }}
            className="grid md:grid-cols-2 xl:grid-cols-3 gap-8"
          >
            {filtered.map((project, i) => (
              <Project3DCard key={project.id} project={project} index={i} inView={inView} />
            ))}
          </motion.div>
        </AnimatePresence>

        {/* View more */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="text-center mt-16"
        >
          <a href="#" className="btn-outline glass-card text-sm px-8 py-4 inline-flex items-center gap-3 tracking-[0.2em] font-mono uppercase">
            <FaGithub size={18} /> Access Full Repository
          </a>
        </motion.div>
      </div>
    </section>
  )
}
