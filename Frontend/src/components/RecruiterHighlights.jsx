import { useEffect, useRef, useState, useCallback } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { useInView } from '../hooks/useInView'

/* ═══════════════════════════════════════════════════════════════
   ANIMATED COUNTER HOOK
═══════════════════════════════════════════════════════════════ */
function useCounter(target, inView, duration = 1600) {
  const [count, setCount] = useState(0)
  const started = useRef(false)
  useEffect(() => {
    if (!inView || started.current || target === 0) return
    started.current = true
    const startTime = performance.now()
    const tick = (now) => {
      const elapsed = now - startTime
      const progress = Math.min(elapsed / duration, 1)
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.floor(eased * target))
      if (progress < 1) requestAnimationFrame(tick)
      else setCount(target)
    }
    requestAnimationFrame(tick)
  }, [inView, target, duration])
  return count
}

/* ═══════════════════════════════════════════════════════════════
   FLOATING PARTICLES (decorative, very lightweight)
═══════════════════════════════════════════════════════════════ */
const PARTICLES = Array.from({ length: 6 }, (_, i) => ({
  id: i,
  x: 10 + i * 15,
  y: 20 + (i % 3) * 25,
  size: 1.5 + (i % 3) * 0.8,
  delay: i * 0.4,
}))

function FloatingParticles({ color }) {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-2xl">
      {PARTICLES.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full"
          style={{
            width: p.size,
            height: p.size,
            left: `${p.x}%`,
            top: `${p.y}%`,
            background: color,
            boxShadow: `0 0 6px ${color}`,
          }}
          animate={{
            y: [-8, 8, -8],
            opacity: [0.3, 0.8, 0.3],
          }}
          transition={{
            duration: 3 + p.id * 0.3,
            repeat: Infinity,
            delay: p.delay,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  )
}

/* ═══════════════════════════════════════════════════════════════
   ANIMATED CHIP
═══════════════════════════════════════════════════════════════ */
function Chip({ label, color, delay, inView }) {
  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.7 }}
      animate={inView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.35, delay, type: 'spring', stiffness: 200 }}
      className="inline-flex items-center px-3 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase cursor-default
                 hover:scale-110 transition-transform duration-200 select-none"
      style={{
        background: `${color}18`,
        border: `1px solid ${color}40`,
        color,
        boxShadow: `0 2px 10px ${color}15`,
      }}
    >
      {label}
    </motion.span>
  )
}

/* ═══════════════════════════════════════════════════════════════
   CARD DATA
═══════════════════════════════════════════════════════════════ */
const CARDS = [
  {
    id: 'education',
    emoji: '🎓',
    title: 'Education',
    color: '#6366f1',
    type: 'education',
  },
  {
    id: 'experience',
    emoji: '💼',
    title: 'Industry Experience',
    color: '#a855f7',
    type: 'counter',
    counterValue: 3,
    counterSuffix: '+',
    counterLabel: 'Months',
  },
  {
    id: 'projects',
    emoji: '🤖',
    title: 'AI Projects',
    color: '#06b6d4',
    type: 'counter',
    counterValue: 5,
    counterSuffix: '+',
    counterLabel: 'Projects',
  },
  {
    id: 'certifications',
    emoji: '🏆',
    title: 'Certifications',
    color: '#f59e0b',
    type: 'counter',
    counterValue: 6,
    counterSuffix: '+',
    counterLabel: 'Professional Certifications',
  },
  {
    id: 'automation',
    emoji: '⚡',
    title: 'Automation',
    color: '#ec4899',
    type: 'chips',
    chips: ['n8n', 'Automation Anywhere', 'AI Agents', 'RPA', 'API Automation', 'Workflow Design'],
  },
  {
    id: 'ai',
    emoji: '🧠',
    title: 'AI Expertise',
    color: '#8b5cf6',
    type: 'chips',
    chips: ['LLMs', 'RAG', 'Prompt Engineering', 'Gen AI', 'Multi-Agent', 'Voice AI', 'Tool Calling', 'Deep Learning', 'CNN', 'RNN', 'Model Evaluation'],
  },
  {
    id: 'availability',
    emoji: '🌍',
    title: 'Availability',
    color: '#22c55e',
    type: 'availability',
  },
  {
    id: 'location',
    emoji: '📍',
    title: 'Location',
    color: '#10b981',
    type: 'location',
  },
]

/* ═══════════════════════════════════════════════════════════════
   CARD INNER CONTENT VARIANTS
═══════════════════════════════════════════════════════════════ */

function EducationContent({ color }) {
  return (
    <div className="flex flex-col gap-3 mt-auto">
      <div>
        <div className="text-white font-black text-sm leading-snug mb-1"
          style={{ textShadow: `0 0 20px ${color}50` }}>
          B.Tech Computer Science
        </div>
        <div className="text-white font-black text-sm leading-snug">& Engineering</div>
      </div>
      <div className="h-px w-full opacity-20 rounded-full"
        style={{ background: `linear-gradient(90deg,${color},transparent)` }} />
      <div className="space-y-1.5">
        {[
          ['Specialization', 'Data Engineering for AI'],
          ['University', 'KLH University, Hyderabad'],
          ['CGPA', '8.5+'],
        ].map(([label, val]) => (
          <div key={label} className="flex items-start gap-2">
            <span className="text-[10px] font-mono uppercase tracking-wider shrink-0 mt-0.5"
              style={{ color: `${color}aa` }}>
              {label}
            </span>
            <span className="text-[11px] text-gray-300 font-medium">{val}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

function CounterContent({ card, inView }) {
  const count = useCounter(card.counterValue, inView)
  const { color } = card

  const details = {
    experience: {
      company: 'EZMLR Technologies',
      sub: 'AI / ML Internship',
      items: ['Face Recognition', 'React', 'PHP', 'APIs', 'CNN Models'],
    },
    projects: {
      sub: 'Including',
      items: [
        'JARVIS — AI Personal Assistant',
        'AI Data Analytics Platform',
        'Fraud Detection System',
        'Smart Commerce Platform',
        'Agriculture Marketplace',
      ],
    },
    certifications: {
      sub: 'Certified in',
      items: [
        'ServiceNow CSA',
        'ServiceNow CAD',
        'Automation Anywhere',
        'OpenAI Prompt Engineering',
        'Cambridge Linguaskill',
        'Web Development',
      ],
    },
  }

  const d = details[card.id]

  return (
    <div className="flex flex-col gap-3 mt-auto">
      {/* Big number */}
      <div className="flex items-end gap-1 leading-none">
        <span className="text-5xl font-black"
          style={{ color, textShadow: `0 0 30px ${color}80, 0 0 60px ${color}30` }}>
          {count}
        </span>
        <span className="text-2xl font-black mb-1" style={{ color }}>{card.counterSuffix}</span>
        <span className="text-xs text-gray-500 font-mono mb-1.5 ml-1 uppercase tracking-wider">
          {card.counterLabel}
        </span>
      </div>

      <div className="h-px w-full opacity-20 rounded-full"
        style={{ background: `linear-gradient(90deg,${color},transparent)` }} />

      {d?.company && (
        <div>
          <div className="text-xs font-bold text-white mb-0.5">{d.company}</div>
          <div className="text-[10px] text-gray-500 font-mono">{d.sub}</div>
        </div>
      )}
      {d?.sub && !d.company && (
        <div className="text-[10px] text-gray-500 font-mono">{d.sub}</div>
      )}

      <ul className="space-y-1">
        {d?.items.slice(0, 5).map((item) => (
          <li key={item} className="flex items-center gap-2 text-[11px] text-gray-400">
            <span className="w-1 h-1 rounded-full shrink-0"
              style={{ background: color, boxShadow: `0 0 4px ${color}` }} />
            {item}
          </li>
        ))}
      </ul>
    </div>
  )
}

function ChipsContent({ card, inView }) {
  const { chips, color } = card
  return (
    <div className="flex flex-wrap gap-1.5 mt-auto">
      {chips.map((chip, i) => (
        <Chip key={chip} label={chip} color={color} delay={0.1 + i * 0.05} inView={inView} />
      ))}
    </div>
  )
}

function AvailabilityContent({ color }) {
  const options = ['Full-Time', 'Internship', 'Freelance', 'Remote', 'Hybrid', 'On-site']
  return (
    <div className="flex flex-col gap-3 mt-auto">
      {/* Status badge */}
      <div className="flex items-center gap-2 px-3 py-2 rounded-xl border self-start"
        style={{ background: `${color}12`, borderColor: `${color}40` }}>
        <motion.span className="w-2 h-2 rounded-full"
          style={{ background: color, boxShadow: `0 0 8px ${color}` }}
          animate={{ scale: [1, 1.4, 1], opacity: [1, 0.6, 1] }}
          transition={{ duration: 1.8, repeat: Infinity }}
        />
        <span className="text-xs font-black tracking-widest uppercase" style={{ color }}>
          Open to Work
        </span>
      </div>
      <div className="h-px w-full opacity-20 rounded-full"
        style={{ background: `linear-gradient(90deg,${color},transparent)` }} />
      <div className="text-[10px] text-gray-500 font-mono uppercase tracking-wider mb-1">
        Available for
      </div>
      <div className="grid grid-cols-2 gap-x-3 gap-y-1.5">
        {options.map((opt) => (
          <div key={opt} className="flex items-center gap-1.5 text-[11px] text-gray-300">
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
              <circle cx="5" cy="5" r="4" stroke={color} strokeWidth="1.2" />
              <path d="M3 5l1.3 1.3 2.7-2.6" stroke={color} strokeWidth="1.2"
                strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            {opt}
          </div>
        ))}
      </div>
    </div>
  )
}

function LocationContent({ color }) {
  return (
    <div className="flex flex-col gap-3 mt-auto">
      {/* Animated globe SVG */}
      <motion.div
        className="w-16 h-16 mx-auto rounded-full flex items-center justify-center relative"
        style={{
          background: `radial-gradient(circle at 35% 35%, ${color}30, rgba(0,0,0,0.8))`,
          border: `2px solid ${color}50`,
          boxShadow: `0 0 30px ${color}30`,
        }}
        animate={{ rotate: [0, 360] }}
        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
      >
        <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
          <circle cx="18" cy="18" r="15" stroke={color} strokeWidth="1.5" opacity="0.7" />
          <ellipse cx="18" cy="18" rx="7" ry="15" stroke={color} strokeWidth="1.5" opacity="0.5" />
          <line x1="3" y1="18" x2="33" y2="18" stroke={color} strokeWidth="1.5" opacity="0.5" />
          <line x1="18" y1="3" x2="18" y2="33" stroke={color} strokeWidth="1" opacity="0.3" />
          <path d="M6 11 Q18 8 30 11" stroke={color} strokeWidth="1" opacity="0.4" fill="none" />
          <path d="M6 25 Q18 28 30 25" stroke={color} strokeWidth="1" opacity="0.4" fill="none" />
        </svg>
      </motion.div>
      <div className="text-center">
        <div className="text-2xl font-black text-white"
          style={{ textShadow: `0 0 20px ${color}60` }}>
          Hyderabad
        </div>
        <div className="text-sm text-gray-400 font-medium tracking-widest uppercase">India</div>
      </div>
      <div className="h-px w-full opacity-20 rounded-full"
        style={{ background: `linear-gradient(90deg,transparent,${color},transparent)` }} />
      <div className="flex flex-wrap gap-1.5 justify-center">
        {['Remote Ready', 'Open to Relocate', 'IST (UTC+5:30)'].map((t) => (
          <span key={t} className="text-[9px] font-mono px-2 py-0.5 rounded-full"
            style={{ background: `${color}15`, color, border: `1px solid ${color}30` }}>
            {t}
          </span>
        ))}
      </div>
    </div>
  )
}

/* ═══════════════════════════════════════════════════════════════
   PREMIUM CARD COMPONENT
═══════════════════════════════════════════════════════════════ */
function PremiumCard({ card, index, inView }) {
  const cardRef = useRef(null)
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const mxSpring = useSpring(mx, { stiffness: 120, damping: 18 })
  const mySpring = useSpring(my, { stiffness: 120, damping: 18 })
  const rotX = useTransform(mySpring, [-0.5, 0.5], ['8deg', '-8deg'])
  const rotY = useTransform(mxSpring, [-0.5, 0.5], ['-8deg', '8deg'])

  const onMouseMove = useCallback((e) => {
    if (!cardRef.current) return
    const r = cardRef.current.getBoundingClientRect()
    mx.set((e.clientX - r.left) / r.width - 0.5)
    my.set((e.clientY - r.top) / r.height - 0.5)
  }, [mx, my])

  const onMouseLeave = useCallback(() => {
    mx.set(0)
    my.set(0)
  }, [mx, my])

  const { color } = card

  const renderContent = () => {
    switch (card.type) {
      case 'education': return <EducationContent color={color} inView={inView} />
      case 'counter': return <CounterContent card={card} inView={inView} />
      case 'chips': return <ChipsContent card={card} inView={inView} />
      case 'availability': return <AvailabilityContent color={color} />
      case 'location': return <LocationContent color={color} />
      default: return null
    }
  }

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50, scale: 0.93 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.6, delay: 0.06 * index, type: 'spring', stiffness: 85 }}
      style={{ rotateX: rotX, rotateY: rotY, transformStyle: 'preserve-3d' }}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      className="perspective-1000 group relative h-full"
    >
      {/* Glow bloom behind card */}
      <div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-50
                   transition-opacity duration-500 blur-2xl pointer-events-none -z-10"
        style={{ background: color }}
      />

      {/* Animated gradient border ring */}
      <div
        className="absolute inset-[-1px] rounded-2xl opacity-0 group-hover:opacity-100
                   transition-opacity duration-500 pointer-events-none -z-[1]"
        style={{
          background: `linear-gradient(135deg, ${color}80, transparent 50%, ${color}40)`,
        }}
      />

      {/* Card surface */}
      <div
        className="relative h-full rounded-2xl p-5 flex flex-col overflow-hidden cursor-default
                   border transition-all duration-500"
        style={{
          background: 'rgba(6,10,20,0.75)',
          backdropFilter: 'blur(20px)',
          borderColor: `${color}25`,
          boxShadow: `0 4px 24px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,255,255,0.06)`,
          transform: 'translateZ(10px)',
        }}
      >
        {/* Particles */}
        <FloatingParticles color={color} />

        {/* Inner hover radial */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500
                     pointer-events-none rounded-2xl"
          style={{ background: `radial-gradient(circle at 50% 0%, ${color}18 0%, transparent 65%)` }}
        />

        {/* Top shimmer line */}
        <div
          className="absolute top-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100
                     transition-opacity duration-500"
          style={{ background: `linear-gradient(90deg, transparent, ${color}cc, transparent)` }}
        />

        {/* Card header */}
        <div className="flex items-start justify-between mb-4 relative z-10">
          <div className="flex items-center gap-3">
            <motion.div
              className="text-3xl select-none leading-none"
              whileHover={{ rotate: [-5, 5, -3, 0], scale: 1.2 }}
              transition={{ duration: 0.5 }}
              style={{ filter: `drop-shadow(0 0 12px ${color}90)` }}
            >
              {card.emoji}
            </motion.div>
            <div>
              <p className="text-[10px] font-mono uppercase tracking-[0.22em] leading-none mb-0.5"
                style={{ color: `${color}cc` }}>
                {card.title}
              </p>
              {/* Micro accent bar */}
              <div className="w-8 h-px rounded-full"
                style={{ background: `linear-gradient(90deg,${color},transparent)` }} />
            </div>
          </div>

          {/* Top-right accent dot */}
          <motion.div
            className="w-2 h-2 rounded-full mt-1"
            style={{ background: color, boxShadow: `0 0 8px ${color}` }}
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </div>

        {/* Dynamic content */}
        <div className="relative z-10 flex-1 flex flex-col">
          {renderContent()}
        </div>

        {/* Bottom shimmer */}
        <div
          className="absolute bottom-0 left-0 right-0 h-px opacity-0 group-hover:opacity-60
                     transition-opacity duration-500"
          style={{ background: `linear-gradient(90deg, transparent, ${color}80, transparent)` }}
        />
      </div>
    </motion.div>
  )
}

/* ═══════════════════════════════════════════════════════════════
   QUICK STATS BAR
═══════════════════════════════════════════════════════════════ */
const QUICK_STATS = [
  { value: 5,    suffix: '+',  label: 'AI Projects',                color: '#06b6d4' },
  { value: 6,    suffix: '+',  label: 'Certifications',             color: '#f59e0b' },
  { value: 3,    suffix: '+',  label: 'Months Industry Exp.',       color: '#a855f7' },
  { value: 10,   suffix: '+',  label: 'Core Technologies',          color: '#ec4899' },
  { value: 100,  suffix: '%',  label: 'AI-Powered Development',     color: '#22c55e' },
]

function QuickStatItem({ stat, inView, index }) {
  const count = useCounter(stat.value, inView, 1400)
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: 0.1 + index * 0.08 }}
      className="flex flex-col items-center gap-1 group min-w-[100px]"
    >
      <div className="flex items-end gap-0.5 leading-none">
        <span className="text-3xl md:text-4xl font-black"
          style={{ color: stat.color, textShadow: `0 0 20px ${stat.color}70` }}>
          {count}
        </span>
        <span className="text-xl font-black mb-0.5" style={{ color: stat.color }}>
          {stat.suffix}
        </span>
      </div>
      <div className="text-[10px] text-gray-500 font-mono uppercase tracking-wider text-center leading-tight">
        {stat.label}
      </div>
      <motion.div
        className="h-px w-0 group-hover:w-full rounded-full transition-all duration-500"
        style={{ background: stat.color }}
      />
    </motion.div>
  )
}

/* ═══════════════════════════════════════════════════════════════
   LOOKING FOR STRIP
═══════════════════════════════════════════════════════════════ */
const LOOKING_FOR = [
  { label: 'AI Engineer',         icon: '🤖', color: '#6366f1' },
  { label: 'Software Engineer',   icon: '💻', color: '#a855f7' },
  { label: 'Automation Engineer', icon: '⚡', color: '#ec4899' },
  { label: 'Full Stack Developer',icon: '🚀', color: '#06b6d4' },
  { label: 'Prompt Engineer',     icon: '🧠', color: '#8b5cf6' },
  { label: 'Data Engineer',       icon: '📊', color: '#f59e0b' },
]

/* ═══════════════════════════════════════════════════════════════
   RECRUITER CALLOUT
═══════════════════════════════════════════════════════════════ */
function RecruiterCallout({ inView }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: 0.4 }}
      className="relative rounded-2xl overflow-hidden border border-white/8 group"
      style={{
        background: 'linear-gradient(135deg, rgba(6,10,20,0.92) 0%, rgba(14,8,32,0.92) 50%, rgba(6,10,20,0.92) 100%)',
        backdropFilter: 'blur(20px)',
        boxShadow: '0 8px 40px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.05)',
      }}
    >
      {/* Top gradient line */}
      <div className="h-[2px] w-full"
        style={{ background: 'linear-gradient(90deg, transparent, #6366f1, #a855f7, #06b6d4, #22c55e, transparent)' }} />

      <div className="grid md:grid-cols-[1fr_auto] gap-8 p-8 md:p-10 items-center">
        <div>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center"
              style={{ background: 'rgba(99,102,241,0.2)', border: '1px solid rgba(99,102,241,0.4)' }}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M8 1L10 6H15L11 9.5L12.5 15L8 11.5L3.5 15L5 9.5L1 6H6L8 1Z"
                  fill="#6366f1" opacity="0.9" />
              </svg>
            </div>
            <h3 className="text-lg md:text-xl font-black text-white tracking-tight">
              Why Work With Me?
            </h3>
          </div>
          <p className="text-sm text-gray-400 leading-relaxed max-w-2xl font-light">
            I specialize in building <span className="text-indigo-400 font-semibold">AI-powered software solutions</span>,
            workflow automation systems, multi-agent applications, and modern full-stack products.
            My focus is delivering <span className="text-cyan-400 font-semibold">production-ready solutions</span> using
            AI to accelerate development while maintaining clean architecture, scalability, and user experience.
          </p>

          {/* Skill pills row */}
          <div className="flex flex-wrap gap-2 mt-5">
            {[
              { t: 'FAANG Ready',        c: '#6366f1' },
              { t: 'AI-First Mindset',   c: '#a855f7' },
              { t: 'ServiceNow Certified', c: '#06b6d4' },
              { t: 'Full Stack',         c: '#f59e0b' },
              { t: 'Immediate Joiner',   c: '#22c55e' },
            ].map(({ t, c }) => (
              <span key={t}
                className="text-[10px] font-bold px-3 py-1 rounded-full tracking-wider uppercase"
                style={{ background: `${c}15`, border: `1px solid ${c}40`, color: c }}>
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="flex flex-col gap-3 shrink-0">
          <a
            href="mailto:bodlapatijeevan160@gmail.com"
            className="btn-primary text-sm px-7 py-3 rounded-full whitespace-nowrap text-center"
          >
            <span className="relative z-10 flex items-center gap-2">
              📩 Schedule Interview
            </span>
          </a>
          <button
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="btn-outline text-sm px-7 py-3 rounded-full whitespace-nowrap text-center"
          >
            View Full Profile →
          </button>
        </div>
      </div>

      {/* Bottom gradient line */}
      <div className="h-px w-full"
        style={{ background: 'linear-gradient(90deg, transparent, #a855f7, #06b6d4, transparent)' }} />
    </motion.div>
  )
}

/* ═══════════════════════════════════════════════════════════════
   MAIN SECTION
═══════════════════════════════════════════════════════════════ */
export default function RecruiterHighlights() {
  const [sectionRef, inView] = useInView(0.05)

  return (
    <section
      id="recruiter"
      ref={sectionRef}
      className="relative py-32 px-6 overflow-hidden perspective-1000"
    >
      {/* ── Ambient background ── */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-1/4 w-[700px] h-[700px] rounded-full blur-[160px] opacity-[0.08]"
          style={{ background: 'radial-gradient(circle, #6366f1, transparent)' }} />
        <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] rounded-full blur-[140px] opacity-[0.08]"
          style={{ background: 'radial-gradient(circle, #a855f7, transparent)' }} />
        <div className="absolute top-1/2 -translate-y-1/2 left-0 w-[400px] h-[400px] rounded-full blur-[120px] opacity-[0.06]"
          style={{ background: 'radial-gradient(circle, #06b6d4, transparent)' }} />
      </div>
      <div className="absolute inset-0 bg-grid opacity-20 pointer-events-none z-0" />

      <div className="max-w-7xl mx-auto relative z-10">

        {/* ═══ SECTION HEADER ═══ */}
        <motion.div
          initial={{ opacity: 0, y: 50, rotateX: 15 }}
          animate={inView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="text-center mb-6 transform-style-3d"
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-2 mb-5">
            <div className="h-px w-8" style={{ background: 'linear-gradient(90deg, transparent, #6366f1)' }} />
            <span className="text-cyan-400 text-xs font-mono uppercase tracking-[0.35em] glass-card px-4 py-1.5 rounded-full border-glow">
              RECRUITER OVERVIEW
            </span>
            <div className="h-px w-8" style={{ background: 'linear-gradient(90deg, #6366f1, transparent)' }} />
          </div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black mb-5 text-shadow-glow leading-tight">
            Why Recruiters{' '}
            <span className="gradient-text">Hire Me</span>
          </h2>

          <div className="w-24 h-1 mx-auto rounded-full"
            style={{ background: 'linear-gradient(90deg, #6366f1, #a855f7, #06b6d4)' }} />

          <p className="section-subtitle mt-5 font-light max-w-xl mx-auto">
            Everything you need to know about me in less than 30 seconds.
          </p>
        </motion.div>

        {/* ═══ QUICK STATS BAR ═══ */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative rounded-2xl mb-12 border border-white/8 overflow-hidden"
          style={{
            background: 'rgba(6,10,20,0.80)',
            backdropFilter: 'blur(20px)',
            boxShadow: '0 4px 30px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.05)',
          }}
        >
          <div className="absolute top-0 left-0 right-0 h-px"
            style={{ background: 'linear-gradient(90deg, transparent, #6366f1, #a855f7, transparent)' }} />

          <div className="flex flex-wrap justify-around items-center gap-6 px-8 py-6">
            {QUICK_STATS.map((stat, i) => (
              <QuickStatItem key={stat.label} stat={stat} inView={inView} index={i} />
            ))}
          </div>
        </motion.div>

        {/* ═══ 8 CARD GRID ═══ */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-12">
          {CARDS.map((card, i) => (
            <PremiumCard key={card.id} card={card} index={i} inView={inView} />
          ))}
        </div>

        {/* ═══ CURRENTLY LOOKING FOR STRIP ═══ */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="relative rounded-2xl border border-white/8 overflow-hidden mb-6"
          style={{
            background: 'rgba(6,10,20,0.80)',
            backdropFilter: 'blur(16px)',
            boxShadow: '0 4px 24px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.04)',
          }}
        >
          <div className="absolute top-0 left-0 right-0 h-px"
            style={{ background: 'linear-gradient(90deg, transparent, #a855f7, #06b6d4, transparent)' }} />

          <div className="px-8 py-6">
            <div className="flex items-center justify-center gap-3 mb-5">
              <div className="h-px flex-1 max-w-[60px]"
                style={{ background: 'linear-gradient(90deg, transparent, #6366f1)' }} />
              <p className="text-[10px] font-mono uppercase tracking-[0.35em] text-cyan-400 whitespace-nowrap">
                Currently Looking For
              </p>
              <div className="h-px flex-1 max-w-[60px]"
                style={{ background: 'linear-gradient(90deg, #6366f1, transparent)' }} />
            </div>

            <div className="flex flex-wrap justify-center gap-3">
              {LOOKING_FOR.map(({ label, icon, color }, i) => (
                <motion.div
                  key={label}
                  initial={{ opacity: 0, scale: 0.8, y: 10 }}
                  animate={inView ? { opacity: 1, scale: 1, y: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.45 + i * 0.06, type: 'spring' }}
                  className="group flex items-center gap-2 px-4 py-2.5 rounded-xl
                             border cursor-default hover:-translate-y-1 transition-all duration-300"
                  style={{
                    background: `${color}10`,
                    borderColor: `${color}35`,
                    boxShadow: `0 2px 12px rgba(0,0,0,0.3)`,
                  }}
                >
                  <span className="text-sm group-hover:scale-125 transition-transform duration-300">
                    {icon}
                  </span>
                  <span className="text-xs font-bold tracking-wide"
                    style={{ color, textShadow: `0 0 10px ${color}50` }}>
                    {label}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* ═══ RECRUITER CALLOUT ═══ */}
        <RecruiterCallout inView={inView} />

      </div>
    </section>
  )
}
