import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from '../hooks/useInView'
import { Download, X, Sparkles, CheckCircle, RefreshCw } from 'lucide-react'
import { jsPDF } from 'jspdf'
import { portfolioData } from '../data/portfolioData'

// ─────────────────────────────────────────────────────────────────────────────
// RESUME ROLE CONFIGURATIONS
// Each role defines its own summary, skill layout, project priority, and color.
// ─────────────────────────────────────────────────────────────────────────────

const RESUME_ROLES = [
  {
    id: 'ai-engineer',
    emoji: '🤖',
    title: 'AI Engineer',
    subtitle: 'LLMs · RAG · AI Systems',
    color: '#6366f1',
    borderColor: 'rgba(99,102,241,0.45)',
    glowColor: 'rgba(99,102,241,0.3)',
    bestFor: 'AI/ML product teams, LLM startups, research labs, enterprise AI',
    atsScore: 96,
    highlightedSkills: ['Large Language Models', 'RAG Systems', 'LangChain', 'LlamaIndex', 'TensorFlow', 'PyTorch', 'Hugging Face', 'AI Agents'],
    summary:
      'Results-driven AI Engineer with hands-on expertise in building production-grade LLM applications, Retrieval-Augmented Generation (RAG) systems, and intelligent AI agents. Experienced in end-to-end model deployment, prompt optimization, and integrating cutting-edge foundation models (GPT-4, Claude, Gemini) into enterprise products. Proficient in LangChain, LlamaIndex, TensorFlow, PyTorch, Hugging Face, and full-stack AI infrastructure using Python and FastAPI.',
    skillSections: [
      { label: 'AI & Machine Learning',  skills: ['Large Language Models (LLMs)', 'RAG Systems', 'AI Agents', 'Prompt Optimization', 'LangChain', 'LlamaIndex', 'Hugging Face', 'TensorFlow', 'PyTorch'] },
      { label: 'Programming Languages',  skills: ['Python', 'Java', 'JavaScript (ES6+)', 'TypeScript'] },
      { label: 'AI Tools & Platforms',   skills: ['ChatGPT / GPT-4', 'Claude (Anthropic)', 'Gemini (Google)', 'Prompt Engineering', 'GitHub Copilot', 'Cursor AI', 'NotebookLM'] },
      { label: 'Web & Infrastructure',   skills: ['FastAPI', 'React.js', 'Next.js', 'Node.js', 'MongoDB', 'Git', 'Figma'] },
    ],
    topProjectIds: ['AI Chat Assistant', 'RAG Knowledge Base', 'Prompt Optimizer', 'AI Image Generator'],
  },
  {
    id: 'prompt-engineer',
    emoji: '⚡',
    title: 'Prompt Engineer',
    subtitle: 'AI Communication · Optimization',
    color: '#f59e0b',
    borderColor: 'rgba(245,158,11,0.45)',
    glowColor: 'rgba(245,158,11,0.3)',
    bestFor: 'AI product teams, content automation, LLM fine-tuning, conversational AI',
    atsScore: 94,
    highlightedSkills: ['Prompt Engineering', 'ChatGPT', 'Gemini', 'Claude', 'Perplexity AI', 'NotebookLM', 'GitHub Copilot', 'Cursor AI'],
    summary:
      'Specialized Prompt Engineer with deep expertise in designing, optimizing, and benchmarking prompts across leading AI platforms including ChatGPT, Claude, Gemini, Perplexity AI, and NotebookLM. Proficient in chain-of-thought prompting, few-shot learning, prompt chaining, and building reusable prompt libraries that reduce LLM costs while maximizing output quality. Experienced in AI agent workflows, LangChain orchestration, and RAG-based knowledge retrieval systems.',
    skillSections: [
      { label: 'AI Tools & Platforms',  skills: ['Prompt Engineering', 'Prompt Optimization', 'ChatGPT / GPT-4', 'Claude (Anthropic)', 'Gemini (Google)', 'Perplexity AI', 'NotebookLM', 'GitHub Copilot', 'Cursor AI'] },
      { label: 'AI Development',        skills: ['Large Language Models (LLMs)', 'AI Agents', 'RAG Systems', 'LangChain', 'LlamaIndex', 'Hugging Face'] },
      { label: 'Programming Languages', skills: ['Python', 'Java', 'JavaScript (ES6+)', 'TypeScript'] },
      { label: 'Tools & Frameworks',    skills: ['FastAPI', 'React.js', 'Node.js', 'MongoDB', 'Git', 'Figma'] },
    ],
    topProjectIds: ['Prompt Optimizer', 'AI Chat Assistant', 'RAG Knowledge Base', 'Full Stack E-Commerce'],
  },
  {
    id: 'software-engineer',
    emoji: '💻',
    title: 'Software Engineer',
    subtitle: 'Backend · Systems · Architecture',
    color: '#06b6d4',
    borderColor: 'rgba(6,182,212,0.45)',
    glowColor: 'rgba(6,182,212,0.3)',
    bestFor: 'Product engineering teams, startups, enterprise software, SaaS companies',
    atsScore: 93,
    highlightedSkills: ['Python', 'Java', 'JavaScript', 'TypeScript', 'Node.js', 'FastAPI', 'React', 'Git'],
    summary:
      'Versatile Software Engineer with strong foundations in Python, Java, and JavaScript, experienced in building scalable backend systems, RESTful APIs, and full-stack web applications. Combines software engineering best practices with modern AI-assisted development using GitHub Copilot and Cursor AI. Proven track record of delivering high-performance, maintainable code and mentoring junior developers across fast-paced agile environments.',
    skillSections: [
      { label: 'Programming Languages',    skills: ['Python', 'Java', 'JavaScript (ES6+)', 'TypeScript'] },
      { label: 'Backend & APIs',           skills: ['FastAPI', 'Node.js', 'Express.js', 'REST APIs', 'MongoDB', 'Git'] },
      { label: 'Frontend',                 skills: ['React.js', 'Next.js', 'HTML5 / CSS3', 'Figma'] },
      { label: 'AI-Assisted Development',  skills: ['GitHub Copilot', 'Cursor AI', 'Prompt Engineering', 'ChatGPT', 'Gemini', 'Large Language Models'] },
    ],
    topProjectIds: ['Full Stack E-Commerce', 'RAG Knowledge Base', 'AI Chat Assistant', 'DevOps AI Pipeline'],
  },
  {
    id: 'fullstack-developer',
    emoji: '🌐',
    title: 'Full Stack Developer',
    subtitle: 'React · Node.js · Modern Web',
    color: '#a855f7',
    borderColor: 'rgba(168,85,247,0.45)',
    glowColor: 'rgba(168,85,247,0.3)',
    bestFor: 'Product companies, SaaS startups, digital agencies, web-first teams',
    atsScore: 95,
    highlightedSkills: ['React', 'Next.js', 'Node.js', 'TypeScript', 'FastAPI', 'MongoDB', 'Python', 'Figma'],
    summary:
      'Full Stack Developer specializing in React, Next.js, and Node.js ecosystems with strong expertise in building end-to-end web applications. Integrates AI capabilities into web products using LangChain, RAG pipelines, and leading LLM APIs (ChatGPT, Gemini, Claude). Experienced in UI/UX design with Figma and delivering pixel-perfect, responsive interfaces that are both performant and accessible. Leverages GitHub Copilot and Cursor AI for accelerated development.',
    skillSections: [
      { label: 'Frontend',          skills: ['React.js', 'Next.js', 'TypeScript', 'JavaScript (ES6+)', 'HTML5 / CSS3', 'Figma'] },
      { label: 'Backend & Database', skills: ['Node.js', 'FastAPI', 'Python', 'Java', 'MongoDB', 'REST APIs', 'Git'] },
      { label: 'AI Integration',    skills: ['LangChain', 'LlamaIndex', 'RAG Systems', 'Large Language Models', 'Prompt Engineering', 'AI Agents'] },
      { label: 'AI Dev Tools',      skills: ['GitHub Copilot', 'Cursor AI', 'ChatGPT', 'Gemini', 'Claude', 'Hugging Face'] },
    ],
    topProjectIds: ['Full Stack E-Commerce', 'AI Chat Assistant', 'Prompt Optimizer', 'RAG Knowledge Base'],
  },
  {
    id: 'ai-automation',
    emoji: '🔄',
    title: 'AI Automation Engineer',
    subtitle: 'Agents · Workflows · Pipelines',
    color: '#10b981',
    borderColor: 'rgba(16,185,129,0.45)',
    glowColor: 'rgba(16,185,129,0.3)',
    bestFor: 'Automation-first companies, AI ops, enterprise workflow automation, no-code/AI hybrid teams',
    atsScore: 92,
    highlightedSkills: ['AI Agents', 'LangChain', 'LlamaIndex', 'RAG Systems', 'Prompt Optimization', 'Python', 'FastAPI'],
    summary:
      'AI Automation Engineer focused on designing and deploying intelligent agent systems, automated LLM pipelines, and workflow orchestration tools. Expert in LangChain, LlamaIndex, and RAG architectures that automate complex knowledge-intensive tasks at scale. Combines prompt engineering mastery with full-stack development (Python, FastAPI, React) to build end-to-end AI automation solutions. Skilled in using ChatGPT, Claude, Gemini, and Perplexity AI for real-world automation use cases that deliver measurable business impact.',
    skillSections: [
      { label: 'AI Automation',         skills: ['AI Agents', 'LangChain', 'LlamaIndex', 'RAG Systems', 'Prompt Optimization', 'Large Language Models (LLMs)'] },
      { label: 'AI Tools & Platforms',  skills: ['Prompt Engineering', 'ChatGPT / GPT-4', 'Claude (Anthropic)', 'Gemini (Google)', 'Perplexity AI', 'Hugging Face', 'GitHub Copilot'] },
      { label: 'Programming Languages', skills: ['Python', 'Java', 'JavaScript (ES6+)', 'TypeScript'] },
      { label: 'Infrastructure & Web',  skills: ['FastAPI', 'Node.js', 'React.js', 'MongoDB', 'Git', 'Figma'] },
    ],
    topProjectIds: ['DevOps AI Pipeline', 'RAG Knowledge Base', 'AI Chat Assistant', 'Prompt Optimizer'],
  },
]

// ─────────────────────────────────────────────────────────────────────────────
// PDF GENERATOR — 100% local, uses only jsPDF, zero network calls
// ─────────────────────────────────────────────────────────────────────────────

function hexToRgb(hex) {
  const r = parseInt(hex.slice(1, 3), 16)
  const g = parseInt(hex.slice(3, 5), 16)
  const b = parseInt(hex.slice(5, 7), 16)
  return [r, g, b]
}

function generateRolePDF(role) {
  const doc = new jsPDF({ unit: 'mm', format: 'a4' })
  const W   = doc.internal.pageSize.getWidth()
  const H   = doc.internal.pageSize.getHeight()
  const M   = 18          // left/right margin
  const CW  = W - M * 2   // content width
  let y = M

  const accent   = hexToRgb(role.color)
  const TEXT     = [12, 15, 26]
  const MUTED    = [95, 100, 120]
  const DIVIDER  = [220, 223, 235]
  const WHITE    = [255, 255, 255]
  const DARKBG   = [16, 18, 32]
  const HEADERBG = [22, 24, 40]

  const setTC = (c) => doc.setTextColor(c[0], c[1], c[2])
  const setFC = (c) => doc.setFillColor(c[0], c[1], c[2])
  const setDC = (c) => doc.setDrawColor(c[0], c[1], c[2])

  function checkPage(needed = 10) {
    if (y + needed > H - M) {
      doc.addPage()
      y = M + 4
    }
  }

  function sectionHeader(label) {
    checkPage(16)
    y += 4
    // Left accent pill
    setFC(accent)
    doc.roundedRect(M, y, 3.5, 7.5, 1, 1, 'F')
    // Label text
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(9.5)
    setTC(accent)
    doc.text(label.toUpperCase(), M + 6.5, y + 5.8)
    y += 12
    // Separator line
    setDC(DIVIDER)
    doc.setLineWidth(0.25)
    doc.line(M, y - 2, W - M, y - 2)
    y += 2
    setTC(TEXT)
  }

  function bullet(text, indent = 5) {
    const maxW = CW - indent - 4
    const lines = doc.splitTextToSize(text, maxW)
    checkPage(lines.length * 4.6 + 1.5)
    doc.setFont('helvetica', 'normal')
    doc.setFontSize(8.5)
    setTC(accent)
    doc.text('▸', M + indent - 3.5, y + 3.5)
    setTC(TEXT)
    doc.text(lines, M + indent + 1, y + 3.5)
    y += lines.length * 4.6 + 0.5
  }

  function tagLine(tags) {
    if (!tags?.length) return
    checkPage(7)
    doc.setFontSize(7.5)
    doc.setFont('helvetica', 'italic')
    setTC(MUTED)
    doc.text('◆ ' + tags.slice(0, 7).join('  ·  '), M + 5, y + 3)
    y += 6.5
  }

  // ── HEADER ──────────────────────────────────────────────────────────────
  // Dark background
  setFC(HEADERBG)
  doc.rect(0, 0, W, 44, 'F')
  // Accent left stripe
  setFC(accent)
  doc.rect(0, 0, 5, 44, 'F')
  // Subtle accent line at bottom of header
  setFC(accent)
  doc.rect(0, 43.2, W, 0.8, 'F')

  // Name
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(23)
  setTC(WHITE)
  doc.text(portfolioData.personalInfo.name, M + 5, 17)

  // Role title (role-specific)
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(10)
  setTC(accent)
  doc.text(`${role.title}  ·  ${role.subtitle}`, M + 5, 25.5)

  // Contact info row
  doc.setFontSize(7.8)
  doc.setTextColor(175, 180, 210)
  const contactParts = [
    portfolioData.personalInfo.email,
    portfolioData.personalInfo.phone,
    portfolioData.personalInfo.linkedin,
    portfolioData.personalInfo.github,
    portfolioData.personalInfo.location,
  ].filter(Boolean)
  const contactLine = contactParts.join('   |   ')
  const contactSplit = doc.splitTextToSize(contactLine, CW - 10)
  doc.text(contactSplit[0], M + 5, 34.5)

  y = 52
  setTC(TEXT)

  // ── PROFESSIONAL SUMMARY ───────────────────────────────────────────────
  sectionHeader('Professional Summary')
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(9)
  setTC(TEXT)
  const sumLines = doc.splitTextToSize(role.summary, CW)
  checkPage(sumLines.length * 5)
  doc.text(sumLines, M, y)
  y += sumLines.length * 5 + 6

  // ── CORE SKILLS ────────────────────────────────────────────────────────
  sectionHeader('Core Skills')
  for (const sec of role.skillSections) {
    checkPage(10)
    // Label col
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(8)
    setTC(accent)
    doc.text(sec.label + ':', M, y + 4)
    // Skills col
    doc.setFont('helvetica', 'normal')
    doc.setFontSize(8)
    setTC(TEXT)
    const skillStr   = sec.skills.join('  ·  ')
    const skillLines = doc.splitTextToSize(skillStr, CW - 42)
    doc.text(skillLines, M + 42, y + 4)
    y += skillLines.length * 4.5 + 2
  }
  y += 4

  // ── PROFESSIONAL EXPERIENCE ────────────────────────────────────────────
  sectionHeader('Professional Experience')
  for (const exp of portfolioData.experience) {
    checkPage(26)
    // Role title
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(10.5)
    setTC(TEXT)
    doc.text(exp.role, M, y)
    // Date (right-aligned)
    doc.setFont('helvetica', 'normal')
    doc.setFontSize(8)
    setTC(MUTED)
    doc.text(exp.duration, W - M, y, { align: 'right' })
    y += 5.5
    // Company + meta
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(8.5)
    setTC(accent)
    doc.text(exp.company, M, y)
    doc.setFont('helvetica', 'normal')
    setTC(MUTED)
    const meta = `  ·  ${exp.location}  ·  ${exp.type}`
    doc.text(meta, M + doc.getTextWidth(exp.company), y)
    y += 5.5
    // Highlights
    setTC(TEXT)
    for (const h of exp.highlights) bullet(h, 5)
    tagLine(exp.tags)
    y += 3
  }

  // ── FEATURED PROJECTS ──────────────────────────────────────────────────
  sectionHeader('Featured Projects')
  const roleProjects = role.topProjectIds
    .map(id => portfolioData.projects.find(p => p.title === id))
    .filter(Boolean)
    .slice(0, 4)

  for (const proj of roleProjects) {
    checkPage(22)
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(10)
    setTC(TEXT)
    doc.text(proj.title, M, y)
    doc.setFont('helvetica', 'italic')
    doc.setFontSize(7.5)
    setTC(MUTED)
    doc.text(proj.category, W - M, y, { align: 'right' })
    y += 5.5
    bullet(proj.description, 5)
    tagLine(proj.tags)
    y += 2
  }

  // ── CERTIFICATIONS ─────────────────────────────────────────────────────
  sectionHeader('Certifications')
  for (const cert of portfolioData.certifications.slice(0, 5)) {
    checkPage(12)
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(8.5)
    setTC(TEXT)
    doc.text('▸ ' + cert.title, M, y + 4)
    doc.setFont('helvetica', 'normal')
    doc.setFontSize(7.5)
    setTC(MUTED)
    doc.text(`${cert.issuer}  ·  ${cert.date}  ·  Credential: ${cert.credentialId}`, M + 4, y + 8.5)
    y += 13
  }

  // ── EDUCATION ──────────────────────────────────────────────────────────
  sectionHeader('Education')
  for (const edu of portfolioData.education) {
    checkPage(16)
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(10.5)
    setTC(TEXT)
    doc.text(edu.degree, M, y)
    doc.setFont('helvetica', 'normal')
    doc.setFontSize(8)
    setTC(MUTED)
    doc.text(`${edu.year}  ·  ${edu.grade}`, W - M, y, { align: 'right' })
    y += 5.5
    doc.setFont('helvetica', 'italic')
    doc.setFontSize(8.5)
    setTC(accent)
    doc.text(`${edu.institution}  —  ${edu.location}`, M, y)
    y += 10
  }

  // ── FOOTER ON EVERY PAGE ───────────────────────────────────────────────
  const totalPages = doc.internal.getNumberOfPages()
  for (let p = 1; p <= totalPages; p++) {
    doc.setPage(p)
    setDC(accent)
    doc.setLineWidth(0.4)
    doc.line(M, H - 12, W - M, H - 12)
    doc.setFontSize(7)
    setTC(MUTED)
    doc.text(
      `${portfolioData.personalInfo.name}  ·  ${role.title}  ·  Page ${p} of ${totalPages}  ·  Generated locally — no API, no data sent`,
      W / 2, H - 6.5, { align: 'center' }
    )
  }

  return doc
}

// ─────────────────────────────────────────────────────────────────────────────
// RESUME SELECTION MODAL
// ─────────────────────────────────────────────────────────────────────────────

function ResumeModal({ isOpen, onClose }) {
  const [generating, setGenerating] = useState(null)
  const [downloaded, setDownloaded] = useState(null)

  // Close on Escape
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose() }
    if (isOpen) window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [isOpen, onClose])

  // Prevent body scroll while modal is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  const handleDownload = async (role) => {
    if (generating) return
    setGenerating(role.id)
    // Give React one tick to render loading state
    await new Promise(r => setTimeout(r, 60))
    try {
      const doc = generateRolePDF(role)
      doc.save(`Jeevan_Bodlapati_${role.title.replace(/\s+/g, '_')}_Resume.pdf`)
      setDownloaded(role.id)
      setTimeout(() => setDownloaded(null), 2800)
    } finally {
      setGenerating(null)
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-[300] flex items-center justify-center p-4"
          onClick={(e) => e.target === e.currentTarget && onClose()}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/85 backdrop-blur-2xl" />

          {/* Modal panel */}
          <motion.div
            initial={{ opacity: 0, scale: 0.88, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.88, y: 50 }}
            transition={{ type: 'spring', stiffness: 130, damping: 22 }}
            className="relative w-full max-w-5xl max-h-[92vh] overflow-y-auto rounded-3xl border border-white/10"
            style={{
              background: 'linear-gradient(135deg, rgba(8,11,18,0.98), rgba(12,15,28,0.98))',
              boxShadow: '0 0 120px rgba(99,102,241,0.18), 0 0 0 1px rgba(255,255,255,0.06), 0 40px 80px rgba(0,0,0,0.7)',
            }}
          >
            {/* Scanline effect */}
            <div className="scanline pointer-events-none" />

            {/* Top accent line */}
            <div className="absolute inset-x-0 top-0 h-px" style={{ background: 'linear-gradient(90deg, transparent, #6366f1, #a855f7, #06b6d4, transparent)' }} />

            {/* ── Modal Header ── */}
            <div className="sticky top-0 z-10 px-8 py-6 flex items-center justify-between border-b border-white/5"
              style={{ background: 'rgba(8,11,18,0.95)', backdropFilter: 'blur(20px)' }}>
              <div>
                <p className="text-xs font-mono text-indigo-400 uppercase tracking-[0.25em] mb-1.5 flex items-center gap-2">
                  <Sparkles size={12} className="animate-pulse" />
                  100% Offline · No API · Instant PDF
                </p>
                <h3 className="text-2xl font-bold text-white tracking-tight">Choose Resume Version</h3>
                <p className="text-gray-500 text-xs mt-1">Each version is customized for a specific role with optimized keywords and skill ordering.</p>
              </div>
              <button
                onClick={onClose}
                aria-label="Close modal"
                className="p-2.5 rounded-xl border border-white/10 text-gray-400 hover:text-white hover:border-white/25 hover:bg-white/5 transition-all duration-200"
              >
                <X size={20} />
              </button>
            </div>

            {/* ── Role Cards Grid ── */}
            <div className="p-8 grid sm:grid-cols-2 xl:grid-cols-3 gap-5">
              {RESUME_ROLES.map((role, i) => {
                const isGen  = generating === role.id
                const isDone = downloaded === role.id
                const isDisabled = generating !== null && !isGen

                return (
                  <motion.div
                    key={role.id}
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.35, delay: i * 0.07, type: 'spring', stiffness: 180 }}
                    className="relative flex flex-col rounded-2xl p-6 border overflow-hidden group"
                    style={{
                      background: 'linear-gradient(160deg, rgba(12,15,26,0.97), rgba(16,19,34,0.97))',
                      borderColor: role.borderColor,
                      transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                    }}
                    onMouseEnter={e => {
                      if (!isDisabled) {
                        e.currentTarget.style.transform = 'translateY(-5px)'
                        e.currentTarget.style.boxShadow = `0 12px 48px ${role.glowColor}, 0 0 0 1px ${role.borderColor}`
                      }
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.transform = 'translateY(0)'
                      e.currentTarget.style.boxShadow = 'none'
                    }}
                  >
                    {/* Top shimmer line */}
                    <div className="absolute inset-x-0 top-0 h-px opacity-70"
                      style={{ background: `linear-gradient(90deg, transparent, ${role.color}cc, transparent)` }} />

                    {/* Disabled overlay */}
                    {isDisabled && (
                      <div className="absolute inset-0 bg-black/40 rounded-2xl z-10 pointer-events-none" />
                    )}

                    {/* Role header row */}
                    <div className="flex items-start gap-3 mb-4">
                      <div
                        className="text-2xl w-12 h-12 flex items-center justify-center rounded-xl flex-shrink-0"
                        style={{ background: `${role.color}18`, border: `1px solid ${role.color}40` }}
                      >
                        {role.emoji}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-bold text-white text-[15px] leading-tight">{role.title}</h4>
                        <p className="text-[11px] text-gray-500 mt-0.5 truncate">{role.subtitle}</p>
                      </div>
                      {/* ATS Score */}
                      <div
                        className="flex-shrink-0 text-center px-2.5 py-1.5 rounded-xl"
                        style={{ background: `${role.color}20`, border: `1px solid ${role.color}35` }}
                      >
                        <div className="text-sm font-black leading-none" style={{ color: role.color }}>{role.atsScore}</div>
                        <div className="text-[9px] font-bold mt-0.5 opacity-70 leading-none" style={{ color: role.color }}>ATS</div>
                      </div>
                    </div>

                    {/* Best For */}
                    <div className="mb-4">
                      <p className="text-[9px] font-mono font-bold uppercase tracking-[0.18em] text-gray-500 mb-1.5">Best For</p>
                      <p className="text-xs text-gray-300 leading-relaxed">{role.bestFor}</p>
                    </div>

                    {/* Skills chips */}
                    <div className="mb-5 flex-1">
                      <p className="text-[9px] font-mono font-bold uppercase tracking-[0.18em] text-gray-500 mb-2">Skills Highlighted</p>
                      <div className="flex flex-wrap gap-1.5">
                        {role.highlightedSkills.slice(0, 6).map(skill => (
                          <span
                            key={skill}
                            className="text-[10px] px-2.5 py-0.5 rounded-full font-semibold"
                            style={{ background: `${role.color}14`, color: role.color, border: `1px solid ${role.color}30` }}
                          >
                            {skill}
                          </span>
                        ))}
                        {role.highlightedSkills.length > 6 && (
                          <span className="text-[10px] px-2.5 py-0.5 rounded-full text-gray-500 border border-white/8">
                            +{role.highlightedSkills.length - 6}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Download button */}
                    <button
                      onClick={() => handleDownload(role)}
                      disabled={isDisabled || isGen}
                      className="w-full py-2.5 rounded-xl font-bold text-sm flex items-center justify-center gap-2 text-white transition-all duration-300 active:scale-95"
                      style={{
                        background: isDone
                          ? 'linear-gradient(135deg, #10b981, #059669)'
                          : isGen
                            ? `${role.color}50`
                            : `linear-gradient(135deg, ${role.color}dd, ${role.color}99)`,
                        boxShadow: isDone || isGen ? 'none' : `0 4px 20px ${role.color}38`,
                        cursor: isDisabled ? 'not-allowed' : 'pointer',
                      }}
                    >
                      {isGen ? (
                        <><RefreshCw size={15} className="animate-spin" /> Generating PDF…</>
                      ) : isDone ? (
                        <><CheckCircle size={15} /> Downloaded!</>
                      ) : (
                        <><Download size={15} /> Download PDF</>
                      )}
                    </button>
                  </motion.div>
                )
              })}
            </div>

            {/* ── Footer note ── */}
            <div className="px-8 pb-7 pt-2 text-center border-t border-white/5">
              <p className="text-[11px] text-gray-600 font-mono tracking-wide">
                All PDFs generated instantly in your browser  ·  No API calls  ·  No data leaves your device  ·  Works fully offline
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// MAIN SECTION COMPONENT
// ─────────────────────────────────────────────────────────────────────────────

export default function AIResumeGenerator() {
  const [ref, inView] = useInView(0.1)
  const [modalOpen, setModalOpen] = useState(false)

  // Listen for the custom event dispatched by Resumes.jsx and Navbar buttons
  useEffect(() => {
    const handler = () => setModalOpen(true)
    window.addEventListener('open-resume-modal', handler)
    return () => window.removeEventListener('open-resume-modal', handler)
  }, [])

  return (
    <>
      <ResumeModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />

      <section
        id="generator"
        ref={ref}
        className="relative py-32 px-6 overflow-hidden"
      >
        {/* Ambient glow */}
        <div className="absolute inset-0 pointer-events-none z-0">
          <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] rounded-full blur-[160px] opacity-10 animate-pulse"
            style={{ background: 'radial-gradient(circle, #f59e0b, transparent)' }} />
          <div className="absolute top-0 left-1/4 w-[450px] h-[450px] rounded-full blur-[130px] opacity-10"
            style={{ background: 'radial-gradient(circle, #a855f7, transparent)' }} />
        </div>

        <div className="max-w-5xl mx-auto relative z-10">

          {/* ── Section Header ── */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="text-center mb-16"
          >
            <p className="text-amber-400 text-sm font-mono uppercase tracking-[0.3em] mb-3 inline-flex items-center gap-2 glass-card px-4 py-1 rounded-full border-glow">
              <Sparkles size={14} className="animate-pulse" /> 100% Offline Engine
            </p>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-shadow-glow">
              AI Resume <span className="gradient-text-gold">Generator</span>
            </h2>
            <div className="w-24 h-1 mx-auto rounded-full" style={{ background: 'linear-gradient(90deg, #f59e0b, #ec4899)' }} />
            <p className="section-subtitle mt-6 font-light">
              Instantly generate 5 role-specific, ATS-optimized PDF resumes from your portfolio data — entirely inside your browser. No API. No server. No waiting.
            </p>
          </motion.div>

          {/* ── Role Preview Cards (teasers) ── */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 mb-14"
          >
            {RESUME_ROLES.map((role, i) => (
              <motion.button
                key={role.id}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.28 + i * 0.08, type: 'spring', stiffness: 200 }}
                onClick={() => setModalOpen(true)}
                className="glass-card rounded-2xl p-4 text-center border group hover:scale-105 transition-all duration-300 cursor-pointer text-left w-full"
                style={{ borderColor: role.borderColor }}
              >
                <div className="text-2xl mb-2.5 group-hover:scale-110 transition-transform duration-300">{role.emoji}</div>
                <div className="text-xs font-bold text-white leading-tight mb-2">{role.title}</div>
                <div
                  className="text-[10px] font-black px-2 py-0.5 rounded-lg w-fit mx-auto"
                  style={{ background: `${role.color}20`, color: role.color }}
                >
                  ATS {role.atsScore}+
                </div>
              </motion.button>
            ))}
          </motion.div>

          {/* ── Main CTA Card ── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="relative"
          >
            {/* Animated border glow */}
            <div className="absolute -inset-px rounded-3xl bg-gradient-to-r from-amber-500 via-purple-500 to-pink-500 opacity-20 blur-sm animate-pulse pointer-events-none" />

            <div className="relative bg-black/60 backdrop-blur-2xl rounded-3xl border border-white/10 p-10 md:p-16 text-center">
              <div className="text-6xl mb-6">📄</div>
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-3 tracking-tight">
                Ready to Download Your Resume?
              </h3>
              <p className="text-gray-400 mb-10 max-w-lg mx-auto text-sm leading-relaxed">
                Choose from 5 professionally tailored versions — each automatically customized with role-specific skills, project ordering, professional summaries, and ATS keywords.
              </p>

              {/* Main CTA button */}
              <button
                id="download-cv-btn"
                onClick={() => setModalOpen(true)}
                className="inline-flex items-center gap-3 px-12 py-5 rounded-full font-black text-white text-lg transition-all duration-300 hover:scale-105 active:scale-95"
                style={{
                  background: 'linear-gradient(135deg, #f59e0b, #ec4899, #a855f7)',
                  boxShadow: '0 0 50px rgba(245,158,11,0.4), 0 0 100px rgba(168,85,247,0.2)',
                  letterSpacing: '0.04em',
                }}
              >
                <Download size={22} />
                Download CV
              </button>

              <p className="text-xs text-gray-600 mt-5 font-mono tracking-wider">
                Instant  ·  Offline  ·  No API  ·  No Data Leaves Your Browser
              </p>
            </div>
          </motion.div>

          {/* ── Feature Badges ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-4"
          >
            {[
              { icon: '🔒', label: 'Zero API Calls',   desc: '100% local jsPDF engine' },
              { icon: '📡', label: 'Works Offline',    desc: 'No internet required'     },
              { icon: '🎯', label: 'ATS Score 90+',   desc: 'Keyword optimized PDF'    },
              { icon: '⚡', label: '5 Role Versions',  desc: 'Instantly generated'      },
            ].map(({ icon, label, desc }) => (
              <div
                key={label}
                className="glass-card rounded-2xl p-4 text-center group hover:border-amber-500/20 transition-colors border border-white/5 cursor-pointer"
                onClick={() => setModalOpen(true)}
              >
                <div className="text-2xl mb-2 group-hover:scale-110 transition-transform duration-300">{icon}</div>
                <div className="text-xs font-bold text-white mb-1">{label}</div>
                <div className="text-[10px] text-gray-500">{desc}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>
    </>
  )
}
