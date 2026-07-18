import { useRef, useState, useEffect, useCallback } from 'react'
import { motion, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion'
import { useInView } from '../hooks/useInView'

/* ═══════════════════════════════════════════════════════════
   ANIMATED COUNTER
═══════════════════════════════════════════════════════════ */
function useCounter(target, inView, duration = 1500) {
  const [count, setCount] = useState(0)
  const started = useRef(false)
  useEffect(() => {
    if (!inView || started.current || target === 0) return
    started.current = true
    const t0 = performance.now()
    const tick = (now) => {
      const p = Math.min((now - t0) / duration, 1)
      const ease = 1 - Math.pow(1 - p, 3)
      setCount(Math.floor(ease * target))
      if (p < 1) requestAnimationFrame(tick)
      else setCount(target)
    }
    requestAnimationFrame(tick)
  }, [inView, target, duration])
  return count
}

/* ═══════════════════════════════════════════════════════════
   DATA
═══════════════════════════════════════════════════════════ */
const STATS = [
  { value: 3,    suffix: '+', label: 'Months Industry Exp.', color: '#6366f1' },
  { value: 5,    suffix: '+', label: 'AI Projects',          color: '#a855f7' },
  { value: 10,   suffix: '+', label: 'Technologies',         color: '#06b6d4' },
  { value: 20,   suffix: '+', label: 'Skills',               color: '#ec4899' },
  { value: 1000, suffix: '+', label: 'Dev Hours',            color: '#f59e0b' },
]

const EXPERIENCES = [
  {
    id: 'ezmlr',
    role: 'AI / Full Stack Developer Intern',
    company: 'EZMLR Technologies',
    location: 'Mangaluru, India',
    duration: '3 Months Internship',
    badge: 'Industry Experience',
    badgeColor: '#6366f1',
    color: '#6366f1',
    icon: '🤖',
    featured: true,
    description:
      'Worked on real-world AI and web development projects in a collaborative development team.',
    responsibilities: [
      'Developed AI-powered Face Recognition Attendance System using CNN and Python',
      'Trained and optimized deep learning models for face recognition',
      'Built responsive frontend interfaces using React, HTML and CSS',
      'Integrated REST APIs with AI applications',
      'Worked with PHP backend development',
      'Participated in testing, debugging and deployment',
      'Collaborated with mentors and team members using GitHub',
    ],
    technologies: [
      'Python', 'React', 'PHP', 'HTML', 'CSS',
      'CNN', 'Face Recognition', 'REST API', 'GitHub', 'AI APIs',
    ],
    achievements: [
      'Successfully completed internship',
      'Delivered production-ready AI modules',
      'Worked on multiple real client features',
    ],
  },
  {
    id: 'freelance',
    role: 'Freelance AI & Full Stack Developer',
    company: 'Self-Employed',
    location: 'Remote',
    duration: '2025 – Present',
    badge: 'Freelancing',
    badgeColor: '#a855f7',
    color: '#a855f7',
    icon: '🚀',
    featured: false,
    description:
      'Designed and developed AI-powered applications, automation systems, websites, and business solutions for multiple clients.',
    responsibilities: [
      'AI Prototype Development for train ticket booking',
      'Café Business Websites with modern UI/UX',
      'Attendance Management System using face recognition',
      'AI Booking Assistant with conversational AI',
      'Business Automation Solutions for operational efficiency',
    ],
    technologies: [
      'Python', 'React', 'Flask', 'Automation Anywhere',
      'n8n', 'RAG', 'MongoDB', 'HTML', 'CSS', 'JavaScript',
    ],
    achievements: [
      'Multiple freelance projects completed',
      'End-to-end application development',
      'AI workflow automation',
    ],
  },
  {
    id: 'leadership',
    role: 'Student Technical Lead & Event Organizer',
    company: 'KLH University | T-Hub Hyderabad | Hackathons',
    location: 'Hyderabad, India',
    duration: 'University Period',
    badge: 'Leadership',
    badgeColor: '#06b6d4',
    color: '#06b6d4',
    icon: '🎯',
    featured: false,
    description:
      'Led technical events, organized hackathons, coordinated student teams, and managed event execution.',
    responsibilities: [
      'Organized university technical events',
      'Coordinated hackathons at KLH University',
      'Worked with T-Hub Hyderabad innovation hub',
      'Led student teams for event planning',
      'Managed event planning and execution',
      'Mentored participants in tech workshops',
    ],
    technologies: [],
    achievements: [
      'Leadership Experience',
      'Team Management',
      'Event Coordination',
      'Technical Community Building',
    ],
  },
]

/* ═══════════════════════════════════════════════════════════
   STAT ITEM
═══════════════════════════════════════════════════════════ */
function StatItem({ stat, inView, index }) {
  const count = useCounter(stat.value, inView, stat.value > 100 ? 2000 : 1400)
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: 0.08 + index * 0.08 }}
      className="flex flex-col items-center gap-1 group min-w-[90px]"
    >
      <div className="flex items-end gap-0.5 leading-none">
        <span
          className="text-3xl md:text-4xl font-black tabular-nums"
          style={{ color: stat.color, textShadow: `0 0 20px ${stat.color}70` }}
        >
          {count}
        </span>
        <span className="text-lg font-black mb-0.5" style={{ color: stat.color }}>
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

/* ═══════════════════════════════════════════════════════════
   TIMELINE NODE
═══════════════════════════════════════════════════════════ */
function TimelineNode({ color, icon, inView, featured }) {
  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={inView ? { scale: 1, opacity: 1 } : {}}
      transition={{ duration: 0.5, delay: 0.15, type: 'spring', stiffness: 200 }}
      className={`absolute left-6 md:left-1/2 -translate-x-1/2 z-20 flex items-center justify-center
                  rounded-full border border-white/10 ${featured ? 'w-14 h-14 md:w-16 md:h-16' : 'w-11 h-11 md:w-14 md:h-14'}`}
      style={{
        background: `radial-gradient(circle at 35% 35%, ${color}50, rgba(0,0,0,0.85))`,
        boxShadow: `0 0 24px ${color}50, inset 0 0 12px ${color}30`,
      }}
    >
      <span className="relative z-10 text-xl md:text-2xl select-none">{icon}</span>
      {/* Pulsing ring */}
      <motion.div
        className="absolute inset-[-4px] rounded-full"
        style={{ border: `2px solid ${color}40` }}
        animate={{ scale: [1, 1.3, 1], opacity: [0.6, 0, 0.6] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
      />
    </motion.div>
  )
}

/* ═══════════════════════════════════════════════════════════
   EXPERIENCE CARD
═══════════════════════════════════════════════════════════ */
function ExperienceCard({ exp, index }) {
  const [cardRef, cardInView] = useInView(0.15)
  const isEven = index % 2 === 0

  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const mxS = useSpring(mx, { stiffness: 130, damping: 18 })
  const myS = useSpring(my, { stiffness: 130, damping: 18 })
  const rotX = useTransform(myS, [-0.5, 0.5], ['5deg', '-5deg'])
  const rotY = useTransform(mxS, [-0.5, 0.5], ['-5deg', '5deg'])

  const innerRef = useRef(null)
  const onMouseMove = useCallback((e) => {
    if (!innerRef.current) return
    const r = innerRef.current.getBoundingClientRect()
    mx.set((e.clientX - r.left) / r.width - 0.5)
    my.set((e.clientY - r.top) / r.height - 0.5)
  }, [mx, my])
  const onMouseLeave = useCallback(() => { mx.set(0); my.set(0) }, [mx, my])

  const { color, badgeColor } = exp

  return (
    <div
      ref={cardRef}
      className="relative w-full flex justify-between items-start mb-16 md:mb-28 last:mb-0 group perspective-1000"
    >
      {/* Timeline node */}
      <TimelineNode color={color} icon={exp.icon} inView={cardInView} featured={exp.featured} />

      {/* Card container */}
      <div
        className={`w-full pl-20 md:pl-0 md:w-5/12 ${
          isEven ? 'md:pr-10 md:text-right' : 'md:pl-10 md:text-left md:ml-auto'
        } transform-style-3d`}
      >
        <motion.div
          ref={innerRef}
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          animate={cardInView ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ duration: 0.6, type: 'spring', stiffness: 90 }}
          style={{ rotateX: rotX, rotateY: rotY, transformStyle: 'preserve-3d' }}
          onMouseMove={onMouseMove}
          onMouseLeave={onMouseLeave}
          className={`relative rounded-2xl overflow-hidden border transition-all duration-500
                      hover:translate-y-[-4px] cursor-default ${
                        exp.featured
                          ? 'p-[1px] bg-gradient-to-br'
                          : ''
                      }`}
          {...(exp.featured
            ? {
                style: {
                  ...{ rotateX: rotX, rotateY: rotY, transformStyle: 'preserve-3d' },
                  borderColor: 'transparent',
                  background: `linear-gradient(135deg, ${color}60, transparent 50%, ${color}30)`,
                },
              }
            : {
                style: {
                  rotateX: rotX,
                  rotateY: rotY,
                  transformStyle: 'preserve-3d',
                  borderColor: `${color}30`,
                  boxShadow: `0 4px 24px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.05)`,
                },
              })}
        >
          <div
            className="relative rounded-2xl p-6 md:p-8 overflow-hidden"
            style={{
              background: 'rgba(6,10,20,0.82)',
              backdropFilter: 'blur(20px)',
              transform: 'translateZ(5px)',
            }}
          >
            {/* Internal glow blob */}
            <div
              className="absolute -top-6 -right-6 w-40 h-40 rounded-full blur-3xl opacity-15 pointer-events-none"
              style={{ background: color }}
            />
            <div
              className="absolute bottom-0 left-0 w-28 h-28 rounded-full blur-3xl opacity-10 pointer-events-none"
              style={{ background: color }}
            />

            {/* ── Header row ── */}
            <div className={`flex flex-col gap-2.5 mb-5 items-start ${isEven ? 'md:items-end' : ''}`}>
              {/* Badge + Duration */}
              <div className={`flex flex-wrap items-center gap-2 ${isEven ? 'md:flex-row-reverse' : ''}`}>
                <span
                  className="text-[10px] font-black px-3 py-1 rounded-full tracking-widest uppercase"
                  style={{
                    background: `${badgeColor}18`,
                    border: `1px solid ${badgeColor}50`,
                    color: badgeColor,
                    boxShadow: `0 0 10px ${badgeColor}20`,
                  }}
                >
                  {exp.badge}
                </span>
                <span className="flex items-center gap-1.5 text-[11px] font-mono tracking-wider text-gray-500">
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <circle cx="6" cy="6" r="5" stroke="currentColor" strokeWidth="1" />
                    <path d="M6 3v3.5l2.5 1.5" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
                  </svg>
                  {exp.duration}
                </span>
              </div>

              {/* Role */}
              <h3
                className="text-lg md:text-xl font-black text-white leading-tight tracking-tight"
                style={{ textShadow: `0 0 20px ${color}30` }}
              >
                {exp.role}
              </h3>

              {/* Company & Location */}
              <div className={`flex flex-wrap items-center gap-3 ${isEven ? 'md:flex-row-reverse' : ''}`}>
                <span className="flex items-center gap-1.5 text-sm font-bold" style={{ color }}>
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <rect x="2" y="4" width="10" height="8" rx="1.5" stroke="currentColor" strokeWidth="1.2" />
                    <path d="M5 4V3a2 2 0 014 0v1" stroke="currentColor" strokeWidth="1.2" />
                  </svg>
                  {exp.company}
                </span>
                <span className="flex items-center gap-1 text-[11px] text-gray-500 font-mono">
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                    <path d="M5 1C3 1 1.5 3 1.5 5c0 2.5 3.5 4 3.5 4s3.5-1.5 3.5-4C8.5 3 7 1 5 1z"
                      stroke="currentColor" strokeWidth="1" />
                    <circle cx="5" cy="4.8" r="1.2" stroke="currentColor" strokeWidth="0.8" />
                  </svg>
                  {exp.location}
                </span>
              </div>
            </div>

            {/* ── Description ── */}
            <p
              className={`text-xs text-gray-400 font-light leading-relaxed mb-5 ${
                isEven ? 'md:text-right' : ''
              }`}
            >
              {exp.description}
            </p>

            {/* ── Responsibilities ── */}
            <div className="mb-5">
              <div
                className={`flex items-center gap-2 mb-3 ${isEven ? 'md:flex-row-reverse' : ''}`}
              >
                <div className="w-5 h-5 rounded-md flex items-center justify-center"
                  style={{ background: `${color}20`, border: `1px solid ${color}40` }}>
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                    <path d="M2 5h6M5 2v6" stroke={color} strokeWidth="1.3" strokeLinecap="round" />
                  </svg>
                </div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-gray-500">
                  Responsibilities
                </span>
              </div>
              <ul className={`space-y-2 text-left ${isEven ? 'md:text-right' : ''}`}>
                {exp.responsibilities.map((r, j) => (
                  <li
                    key={j}
                    className={`flex items-start gap-2.5 text-[11px] md:text-xs text-gray-400 ${
                      isEven ? 'md:flex-row-reverse' : ''
                    }`}
                  >
                    <span
                      className="mt-1.5 w-1.5 h-1.5 rounded-full shrink-0"
                      style={{ background: color, boxShadow: `0 0 6px ${color}` }}
                    />
                    <span className="leading-relaxed">{r}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* ── Technologies ── */}
            {exp.technologies.length > 0 && (
              <div className="mb-5">
                <div
                  className={`flex items-center gap-2 mb-3 ${isEven ? 'md:flex-row-reverse' : ''}`}
                >
                  <div className="w-5 h-5 rounded-md flex items-center justify-center"
                    style={{ background: `${color}20`, border: `1px solid ${color}40` }}>
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                      <rect x="1" y="1" width="8" height="8" rx="1.5" stroke={color} strokeWidth="1" />
                      <path d="M3 5l1.5 1.5L7 4" stroke={color} strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-gray-500">
                    Technologies
                  </span>
                </div>
                <div className={`flex flex-wrap gap-1.5 ${isEven ? 'md:justify-end' : ''}`}>
                  {exp.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="text-[10px] font-bold px-2.5 py-1 rounded-full tracking-wider uppercase
                                 hover:scale-105 transition-transform duration-200 cursor-default"
                      style={{
                        background: `${color}14`,
                        border: `1px solid ${color}35`,
                        color: `${color}dd`,
                      }}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* ── Achievements ── */}
            <div
              className={`border-t pt-4 ${isEven ? 'md:text-right' : ''}`}
              style={{ borderColor: `${color}15` }}
            >
              <div
                className={`flex items-center gap-2 mb-3 ${isEven ? 'md:flex-row-reverse' : ''}`}
              >
                <div className="w-5 h-5 rounded-md flex items-center justify-center"
                  style={{ background: '#22c55e18', border: '1px solid #22c55e40' }}>
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                    <circle cx="5" cy="5" r="4" stroke="#22c55e" strokeWidth="1" />
                    <path d="M3.2 5.2l1.3 1.3 2.5-2.8" stroke="#22c55e" strokeWidth="1"
                      strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-gray-500">
                  Achievements
                </span>
              </div>
              <div className={`flex flex-wrap gap-2 ${isEven ? 'md:justify-end' : ''}`}>
                {exp.achievements.map((a) => (
                  <span
                    key={a}
                    className="flex items-center gap-1.5 text-[11px] text-green-400/80 font-medium"
                  >
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <circle cx="6" cy="6" r="5" stroke="#22c55e" strokeWidth="1.2" />
                      <path d="M3.8 6.2l1.5 1.5 3-3.2" stroke="#22c55e" strokeWidth="1.2"
                        strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    {a}
                  </span>
                ))}
              </div>
            </div>

            {/* Featured indicator glow */}
            {exp.featured && (
              <div
                className="absolute top-0 left-0 right-0 h-px"
                style={{
                  background: `linear-gradient(90deg, transparent, ${color}, transparent)`,
                }}
              />
            )}
          </div>
        </motion.div>
      </div>
    </div>
  )
}

/* ═══════════════════════════════════════════════════════════
   MAIN SECTION
═══════════════════════════════════════════════════════════ */
export default function Experience() {
  const [sectionRef, inView] = useInView(0.05)
  const containerRef = useRef(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start center', 'end center'],
  })

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  })

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="relative py-32 px-6 overflow-hidden perspective-1000"
    >
      {/* ── Ambient background ── */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div
          className="absolute top-1/4 right-1/4 w-[600px] h-[600px] rounded-full blur-[140px] opacity-[0.08]"
          style={{ background: 'radial-gradient(circle, #a855f7, transparent)' }}
        />
        <div
          className="absolute bottom-1/4 left-1/3 w-[500px] h-[500px] rounded-full blur-[130px] opacity-[0.06]"
          style={{ background: 'radial-gradient(circle, #6366f1, transparent)' }}
        />
      </div>
      <div className="absolute inset-0 bg-grid opacity-15 pointer-events-none z-0" />

      <div className="max-w-6xl mx-auto relative z-10">

        {/* ═══ HEADER ═══ */}
        <motion.div
          initial={{ opacity: 0, y: 50, rotateX: 15 }}
          animate={inView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="text-center mb-8 transform-style-3d"
        >
          <div className="inline-flex items-center gap-2 mb-5">
            <div
              className="h-px w-8"
              style={{ background: 'linear-gradient(90deg, transparent, #a855f7)' }}
            />
            <span className="text-pink-400 text-xs font-mono uppercase tracking-[0.35em] glass-card px-4 py-1.5 rounded-full border-glow">
              Career Timeline
            </span>
            <div
              className="h-px w-8"
              style={{ background: 'linear-gradient(90deg, #a855f7, transparent)' }}
            />
          </div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black mb-5 text-shadow-glow leading-tight">
            <span className="gradient-text">Experience</span>
          </h2>

          <div
            className="w-24 h-1 mx-auto rounded-full"
            style={{ background: 'linear-gradient(90deg, #a855f7, #ec4899, #6366f1)' }}
          />

          <p className="section-subtitle mt-5 font-light max-w-2xl mx-auto">
            Building real-world AI solutions through internships, leadership, and hands-on projects.
          </p>
        </motion.div>

        {/* ═══ STATS BAR ═══ */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="relative rounded-2xl mb-20 border border-white/8 overflow-hidden"
          style={{
            background: 'rgba(6,10,20,0.82)',
            backdropFilter: 'blur(20px)',
            boxShadow: '0 4px 30px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.05)',
          }}
        >
          <div
            className="absolute top-0 left-0 right-0 h-px"
            style={{ background: 'linear-gradient(90deg, transparent, #a855f7, #6366f1, transparent)' }}
          />
          <div className="flex flex-wrap justify-around items-center gap-6 px-8 py-6">
            {STATS.map((stat, i) => (
              <StatItem key={stat.label} stat={stat} inView={inView} index={i} />
            ))}
          </div>
        </motion.div>

        {/* ═══ TIMELINE ═══ */}
        <div ref={containerRef} className="relative max-w-5xl mx-auto py-4">
          {/* Track (background) */}
          <div className="absolute left-6 md:left-1/2 -translate-x-1/2 top-0 bottom-0 w-[3px] bg-white/[0.04] rounded-full" />

          {/* Animated progress */}
          <motion.div
            style={{ scaleY, transformOrigin: 'top' }}
            className="absolute left-6 md:left-1/2 -translate-x-1/2 top-0 bottom-0 w-[3px] rounded-full z-10"
          >
            <div
              className="w-full h-full rounded-full"
              style={{
                background: 'linear-gradient(180deg, #6366f1, #a855f7, #ec4899, #06b6d4)',
                boxShadow: '0 0 12px rgba(99,102,241,0.5)',
              }}
            />
            {/* Glow tip */}
            <motion.div
              className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full"
              style={{
                background: '#ec4899',
                boxShadow: '0 0 16px #ec4899, 0 0 30px #ec489980',
              }}
              animate={{ scale: [1, 1.5, 1], opacity: [0.8, 1, 0.8] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </motion.div>

          {/* Cards */}
          <div className="relative z-20">
            {EXPERIENCES.map((exp, i) => (
              <ExperienceCard key={exp.id} exp={exp} index={i} />
            ))}
          </div>
        </div>

        {/* ═══ BOTTOM CTA ═══ */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-12 text-center"
        >
          <div className="inline-flex flex-col sm:flex-row items-center gap-4">
            <a
              href="mailto:bodlapatijeevan160@gmail.com"
              className="btn-primary text-sm px-8 py-3 rounded-full"
            >
              <span className="relative z-10 flex items-center gap-2">
                📩 Schedule Interview
              </span>
            </a>
            <button
              onClick={() =>
                document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
              }
              className="btn-outline text-sm px-8 py-3 rounded-full"
            >
              View Full Profile →
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
