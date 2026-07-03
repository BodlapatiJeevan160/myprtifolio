import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from '../hooks/useInView'
import { Download, X, Sparkles, CheckCircle, RefreshCw, Upload, FileText, Target, AlertCircle, Check, Briefcase, FileSearch } from 'lucide-react'
import { jsPDF } from 'jspdf'
import * as pdfjsLib from 'pdfjs-dist'
import { portfolioData } from '../data/portfolioData'

// Set up PDF.js worker via CDN to avoid bundler issues
pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.mjs`

// ─────────────────────────────────────────────────────────────────────────────
// RESUME ROLE CONFIGURATIONS
// ─────────────────────────────────────────────────────────────────────────────

const RESUME_ROLES = [
  {
    id: 'ai-engineer',
    emoji: '🤖',
    title: 'AI Engineer',
    subtitle: 'Machine Learning · RAG · Models',
    color: '#6366f1',
    borderColor: 'rgba(99,102,241,0.45)',
    glowColor: 'rgba(99,102,241,0.3)',
    atsScore: 96,
    highlightedSkills: ['Machine Learning', 'Deep Learning', 'RAG', 'AI Agents', 'Prompt Engineering', 'Python', 'FastAPI', 'Computer Vision'],
    summary: 'B.Tech Computer Science Engineering student specializing in Data Engineering for AI. Strong expertise in building AI-powered software solutions, developing Computer Vision models, and deploying RAG architectures and Multi-Agent Systems. Proven ability to integrate foundation models into full-stack applications to accelerate development and create scalable, intelligent solutions.',
    skillSections: [
      { label: 'AI & Machine Learning', skills: ['Artificial Intelligence', 'Machine Learning', 'Deep Learning', 'Computer Vision', 'CNN', 'RNN', 'Face Recognition', 'Model Evaluation'] },
      { label: 'Generative AI', skills: ['Prompt Engineering', 'LLM Integration', 'RAG', 'AI Agents', 'Multi Agent Systems', 'Conversational AI', 'Voice AI', 'Tool Calling'] },
      { label: 'Programming & Backend', skills: ['Python', 'Java', 'FastAPI', 'Flask', 'Django'] },
      { label: 'AI Tools', skills: ['ChatGPT', 'Gemini', 'Claude', 'Perplexity AI', 'GitHub Copilot', 'Cursor AI', 'NotebookLM'] },
    ],
    topProjectIds: ['JARVIS Personal AI Assistant', 'AI Driven Data Analytics Platform', 'Fraud Payment & Card Detection Platform'],
  },
  {
    id: 'software-engineer',
    emoji: '💻',
    title: 'Software Engineer',
    subtitle: 'Backend · Full Stack · APIs',
    color: '#06b6d4',
    borderColor: 'rgba(6,182,212,0.45)',
    glowColor: 'rgba(6,182,212,0.3)',
    atsScore: 93,
    highlightedSkills: ['Python', 'Java', 'React', 'FastAPI', 'Node.js', 'REST API Development', 'SQL', 'MongoDB'],
    summary: 'Software Engineer experienced in full-stack development, building scalable backend systems, RESTful APIs, and responsive frontends. Combines software engineering best practices with modern AI-assisted development tools to deliver high-performance solutions. Strong foundation in Python, Java, and modern web frameworks.',
    skillSections: [
      { label: 'Programming Languages', skills: ['Python', 'Java', 'HTML', 'CSS'] },
      { label: 'Backend & APIs', skills: ['FastAPI', 'Flask', 'Django', 'Node.js', 'REST API Development'] },
      { label: 'Frontend & DB', skills: ['React', 'UI/UX Design', 'SQL', 'MongoDB', 'Firebase'] },
      { label: 'AI Dev Tools', skills: ['GitHub Copilot', 'Cursor AI', 'ChatGPT', 'Gemini'] },
    ],
    topProjectIds: ['ShopSocial', 'JARVIS Personal AI Assistant', 'AI Driven Data Analytics Platform'],
  },
  {
    id: 'automation-engineer',
    emoji: '🔄',
    title: 'Automation Engineer',
    subtitle: 'Workflows · RPA · AI Agents',
    color: '#10b981',
    borderColor: 'rgba(16,185,129,0.45)',
    glowColor: 'rgba(16,185,129,0.3)',
    atsScore: 94,
    highlightedSkills: ['n8n', 'Automation Anywhere', 'RPA', 'Workflow Automation', 'AI Agents', 'Tool Calling', 'Python'],
    summary: 'Automation Engineer specializing in designing and deploying intelligent workflows, RPA solutions, and automated AI agent systems. Expert in utilizing n8n and Automation Anywhere to automate complex business processes. Integrates AI capabilities with full-stack development to create end-to-end automation solutions that improve productivity and operational efficiency.',
    skillSections: [
      { label: 'Automation & RPA', skills: ['n8n', 'Automation Anywhere', 'Workflow Automation', 'RPA'] },
      { label: 'AI Automation', skills: ['AI Agents', 'Multi Agent Systems', 'Tool Calling', 'LLM Integration', 'Prompt Engineering'] },
      { label: 'Programming', skills: ['Python', 'Java', 'REST API Development'] },
      { label: 'Tools', skills: ['ChatGPT', 'Cursor AI', 'GitHub Copilot'] },
    ],
    topProjectIds: ['JARVIS Personal AI Assistant', 'AI Driven Data Analytics Platform', 'Fraud Payment & Card Detection Platform'],
  },
  {
    id: 'data-engineer',
    emoji: '📊',
    title: 'Data Engineer',
    subtitle: 'Pipelines · Analytics · Python',
    color: '#f59e0b',
    borderColor: 'rgba(245,158,11,0.45)',
    glowColor: 'rgba(245,158,11,0.3)',
    atsScore: 92,
    highlightedSkills: ['Data Engineering', 'Python', 'Pandas', 'NumPy', 'SQL', 'MongoDB', 'Data Analysis'],
    summary: 'Data Engineer focused on building robust data pipelines, processing large datasets, and enabling AI-driven analytics. Proficient in Python, Pandas, NumPy, and SQL. Experienced in developing automated data analysis platforms that stream, clean, and visualize complex data structures for actionable insights and machine learning integrations.',
    skillSections: [
      { label: 'Data & Analytics', skills: ['Data Engineering', 'Data Processing', 'Data Analysis', 'Pandas', 'NumPy'] },
      { label: 'Databases', skills: ['SQL', 'MongoDB', 'Firebase'] },
      { label: 'Programming', skills: ['Python', 'Java', 'REST API Development'] },
      { label: 'AI & ML', skills: ['Machine Learning', 'Deep Learning', 'Model Evaluation'] },
    ],
    topProjectIds: ['AI Driven Data Analytics Platform', 'Fraud Payment & Card Detection Platform', 'JARVIS Personal AI Assistant'],
  },
  {
    id: 'fullstack-developer',
    emoji: '🌐',
    title: 'Full Stack Developer',
    subtitle: 'React · APIs · UI/UX',
    color: '#a855f7',
    borderColor: 'rgba(168,85,247,0.45)',
    glowColor: 'rgba(168,85,247,0.3)',
    atsScore: 95,
    highlightedSkills: ['React', 'FastAPI', 'Node.js', 'MongoDB', 'REST API Development', 'HTML', 'CSS', 'UI/UX Design'],
    summary: 'Full Stack Developer with expertise in building responsive web applications and scalable backend systems. Strong proficiency in React, FastAPI, Node.js, and database management. Integrates AI capabilities into modern web products and focuses on delivering exceptional user experiences through clean UI/UX design and optimized application performance.',
    skillSections: [
      { label: 'Frontend', skills: ['React', 'HTML', 'CSS', 'UI/UX Design', 'Figma'] },
      { label: 'Backend & APIs', skills: ['FastAPI', 'Flask', 'Django', 'Node.js', 'REST API Development'] },
      { label: 'Databases', skills: ['MongoDB', 'SQL', 'Firebase'] },
      { label: 'AI Integration', skills: ['LLM Integration', 'Prompt Engineering', 'AI Agents'] },
    ],
    topProjectIds: ['ShopSocial', 'Veggie Farmers Market', 'AI Driven Data Analytics Platform'],
  }
]

// ─────────────────────────────────────────────────────────────────────────────
// LOCAL JD ANALYSIS ENGINE
// ─────────────────────────────────────────────────────────────────────────────

function analyzeJobDescription(jdText, role) {
  if (!jdText || jdText.trim().length === 0) {
    return { score: role.atsScore, matchPercent: 100, missing: [], matched: [] }
  }

  const text = jdText.toLowerCase()
  
  // Flatten all user skills
  let allUserSkills = []
  Object.values(portfolioData.skills).forEach(arr => allUserSkills.push(...arr))
  allUserSkills = [...new Set([...allUserSkills, ...role.highlightedSkills])]

  let matched = []
  let missing = []

  // Simple heuristic keywords common in tech job descriptions
  const industryKeywords = [
    'python', 'java', 'react', 'node', 'sql', 'mongodb', 'machine learning', 
    'deep learning', 'api', 'rest', 'html', 'css', 'fastapi', 'flask', 
    'django', 'pandas', 'numpy', 'automation', 'agile', 'aws', 'docker', 
    'kubernetes', 'cloud', 'ci/cd', 'git', 'llm', 'generative ai', 'rag'
  ]

  let expectedKeywords = industryKeywords.filter(kw => text.includes(kw))

  allUserSkills.forEach(skill => {
    if (text.includes(skill.toLowerCase())) {
      matched.push(skill)
    }
  })

  // Identify missing keywords
  expectedKeywords.forEach(kw => {
    const userHasIt = allUserSkills.some(s => s.toLowerCase().includes(kw))
    if (!userHasIt) missing.push(kw)
  })

  matched = [...new Set(matched)]
  missing = [...new Set(missing)]

  const total = matched.length + missing.length
  const matchPercent = total === 0 ? 100 : Math.min(100, Math.round((matched.length / total) * 100))
  
  // Calculate dynamic ATS Score
  // Base it slightly on the default ATS score and slightly on the match percent
  const score = Math.min(99, Math.max(70, Math.round(role.atsScore * 0.4 + matchPercent * 0.6)))

  return { score, matchPercent, missing, matched }
}

// ─────────────────────────────────────────────────────────────────────────────
// PDF GENERATOR — 100% local, uses only jsPDF
// ─────────────────────────────────────────────────────────────────────────────

function hexToRgb(hex) {
  const r = parseInt(hex.slice(1, 3), 16)
  const g = parseInt(hex.slice(3, 5), 16)
  const b = parseInt(hex.slice(5, 7), 16)
  return [r, g, b]
}

function generateRolePDF(role, analysisResult) {
  const doc = new jsPDF({ unit: 'mm', format: 'a4' })
  const W   = doc.internal.pageSize.getWidth()
  const H   = doc.internal.pageSize.getHeight()
  const M   = 18          // margin
  const CW  = W - M * 2   // content width
  let y = M

  const accent   = hexToRgb(role.color)
  const TEXT     = [12, 15, 26]
  const MUTED    = [95, 100, 120]
  const DIVIDER  = [220, 223, 235]
  const WHITE    = [255, 255, 255]
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
    setFC(accent)
    doc.roundedRect(M, y, 3.5, 7.5, 1, 1, 'F')
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(9.5)
    setTC(accent)
    doc.text(label.toUpperCase(), M + 6.5, y + 5.8)
    y += 12
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

  // ── HEADER ──
  setFC(HEADERBG)
  doc.rect(0, 0, W, 44, 'F')
  setFC(accent)
  doc.rect(0, 0, 5, 44, 'F')
  setFC(accent)
  doc.rect(0, 43.2, W, 0.8, 'F')

  doc.setFont('helvetica', 'bold')
  doc.setFontSize(23)
  setTC(WHITE)
  doc.text(portfolioData.personalInfo.name, M + 5, 17)

  doc.setFont('helvetica', 'normal')
  doc.setFontSize(10)
  setTC(accent)
  doc.text(`${role.title}  ·  ${role.subtitle}`, M + 5, 25.5)

  doc.setFontSize(7.8)
  doc.setTextColor(175, 180, 210)
  const contactParts = [
    portfolioData.personalInfo.email,
    portfolioData.personalInfo.phone,
    portfolioData.personalInfo.linkedin,
    portfolioData.personalInfo.github,
    portfolioData.personalInfo.location,
  ].filter(Boolean)
  doc.text(doc.splitTextToSize(contactParts.join('   |   '), CW - 10)[0], M + 5, 34.5)

  y = 52
  setTC(TEXT)

  // ── SUMMARY ──
  sectionHeader('Professional Summary')
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(9)
  setTC(TEXT)
  const sumLines = doc.splitTextToSize(role.summary, CW)
  checkPage(sumLines.length * 5)
  doc.text(sumLines, M, y)
  y += sumLines.length * 5 + 6

  // ── SKILLS ──
  sectionHeader('Core Skills')
  
  // Reorder skills to prioritize matched skills if JD analysis exists
  const matchedSet = new Set((analysisResult?.matched || []).map(s => s.toLowerCase()))

  for (const sec of role.skillSections) {
    checkPage(10)
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(8)
    setTC(accent)
    doc.text(sec.label + ':', M, y + 4)
    
    doc.setFont('helvetica', 'normal')
    doc.setFontSize(8)
    setTC(TEXT)
    
    let sortedSkills = [...sec.skills]
    if (analysisResult) {
      sortedSkills.sort((a, b) => {
        const aMatch = matchedSet.has(a.toLowerCase()) ? 1 : 0
        const bMatch = matchedSet.has(b.toLowerCase()) ? 1 : 0
        return bMatch - aMatch
      })
    }

    const skillStr = sortedSkills.join('  ·  ')
    const skillLines = doc.splitTextToSize(skillStr, CW - 42)
    doc.text(skillLines, M + 42, y + 4)
    y += skillLines.length * 4.5 + 2
  }
  y += 4

  // ── EXPERIENCE ──
  sectionHeader('Professional Experience')
  for (const exp of portfolioData.experience) {
    checkPage(26)
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(10.5)
    setTC(TEXT)
    doc.text(exp.role, M, y)
    
    doc.setFont('helvetica', 'normal')
    doc.setFontSize(8)
    setTC(MUTED)
    doc.text(exp.duration, W - M, y, { align: 'right' })
    y += 5.5
    
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(8.5)
    setTC(accent)
    doc.text(exp.company, M, y)
    
    doc.setFont('helvetica', 'normal')
    setTC(MUTED)
    const meta = `  ·  ${exp.location}  ·  ${exp.type}`
    doc.text(meta, M + doc.getTextWidth(exp.company), y)
    y += 5.5
    
    setTC(TEXT)
    for (const h of exp.highlights) bullet(h, 5)
    tagLine(exp.tags)
    y += 3
  }

  // ── PROJECTS ──
  sectionHeader('Featured Projects')
  const roleProjects = role.topProjectIds
    .map(id => portfolioData.projects.find(p => p.title === id))
    .filter(Boolean)
    .slice(0, 3)

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

  // ── CERTIFICATIONS ──
  sectionHeader('Certifications')
  for (const cert of portfolioData.certifications.slice(0, 4)) {
    checkPage(8)
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(8.5)
    setTC(TEXT)
    doc.text('▸ ' + cert.title, M, y + 4)
    doc.setFont('helvetica', 'normal')
    doc.setFontSize(7.5)
    setTC(MUTED)
    doc.text(`${cert.issuer}  ·  Credential: ${cert.credentialId}`, M + 4, y + 8.5)
    y += 10
  }

  // ── EDUCATION ──
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

  // ── FOOTER ──
  const totalPages = doc.internal.getNumberOfPages()
  for (let p = 1; p <= totalPages; p++) {
    doc.setPage(p)
    setDC(accent)
    doc.setLineWidth(0.4)
    doc.line(M, H - 12, W - M, H - 12)
    doc.setFontSize(7)
    setTC(MUTED)
    const atsText = analysisResult ? `ATS Match Score: ${analysisResult.score}%` : `Target Role: ${role.title}`
    doc.text(
      `${portfolioData.personalInfo.name}  ·  ${atsText}  ·  Page ${p} of ${totalPages}`,
      W / 2, H - 6.5, { align: 'center' }
    )
  }

  return doc
}

// ─────────────────────────────────────────────────────────────────────────────
// RESUME SELECTION & ANALYSIS MODAL
// ─────────────────────────────────────────────────────────────────────────────

function ResumeModal({ isOpen, onClose }) {
  const [jdText, setJdText] = useState('')
  const [selectedRoleId, setSelectedRoleId] = useState(RESUME_ROLES[0].id)
  const [analysisResult, setAnalysisResult] = useState(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [generating, setGenerating] = useState(false)
  const [downloaded, setDownloaded] = useState(false)
  const fileInputRef = useRef(null)

  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose() }
    if (isOpen) window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [isOpen, onClose])

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  // Reset state on open
  useEffect(() => {
    if (isOpen) {
      setJdText('')
      setAnalysisResult(null)
      setDownloaded(false)
    }
  }, [isOpen])

  const handleFileUpload = async (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    if (file.type !== 'application/pdf') {
      alert("Please upload a valid PDF file.")
      return
    }

    setIsAnalyzing(true)
    try {
      const arrayBuffer = await file.arrayBuffer()
      const pdf = await pdfjsLib.getDocument(arrayBuffer).promise
      let fullText = ''
      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i)
        const content = await page.getTextContent()
        const strings = content.items.map(item => item.str)
        fullText += strings.join(' ') + ' '
      }
      setJdText(fullText)
    } catch (err) {
      console.error("Failed to parse PDF:", err)
      alert("Failed to read PDF file.")
    } finally {
      setIsAnalyzing(false)
      // Reset input
      if (fileInputRef.current) fileInputRef.current.value = ''
    }
  }

  const handleAnalyze = () => {
    if (!jdText.trim()) {
      alert("Please paste a job description or upload a PDF first.")
      return
    }
    setIsAnalyzing(true)
    setTimeout(() => {
      const role = RESUME_ROLES.find(r => r.id === selectedRoleId)
      const result = analyzeJobDescription(jdText, role)
      setAnalysisResult(result)
      setIsAnalyzing(false)
    }, 800) // Simulate slightly complex processing time for UI feedback
  }

  const handleDownload = async () => {
    if (generating) return
    setGenerating(true)
    await new Promise(r => setTimeout(r, 60))
    try {
      const role = RESUME_ROLES.find(r => r.id === selectedRoleId)
      const doc = generateRolePDF(role, analysisResult)
      doc.save(`Jeevan_Bodlapati_${role.title.replace(/\s+/g, '_')}_Resume.pdf`)
      setDownloaded(true)
      setTimeout(() => setDownloaded(false), 3000)
    } finally {
      setGenerating(false)
    }
  }

  const selectedRole = RESUME_ROLES.find(r => r.id === selectedRoleId)

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
          <div className="absolute inset-0 bg-black/85 backdrop-blur-2xl" />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-6xl max-h-[92vh] overflow-hidden rounded-3xl border border-white/10 flex flex-col"
            style={{
              background: 'linear-gradient(135deg, rgba(8,11,18,0.98), rgba(12,15,28,0.98))',
              boxShadow: '0 0 120px rgba(99,102,241,0.18), 0 0 0 1px rgba(255,255,255,0.06)',
            }}
          >
            {/* Header */}
            <div className="flex-shrink-0 px-8 py-5 flex items-center justify-between border-b border-white/5 bg-black/40">
              <div>
                <p className="text-xs font-mono text-indigo-400 uppercase tracking-[0.25em] mb-1 flex items-center gap-2">
                  <Sparkles size={12} className="animate-pulse" />
                  Universal AI Resume Generator
                </p>
                <h3 className="text-xl font-bold text-white">Match & Optimize (100% Local)</h3>
              </div>
              <button onClick={onClose} className="p-2 rounded-xl border border-white/10 text-gray-400 hover:text-white hover:bg-white/5 transition-all">
                <X size={20} />
              </button>
            </div>

            {/* Body */}
            <div className="flex-1 overflow-y-auto p-6 md:p-8 flex flex-col lg:flex-row gap-8">
              
              {/* Left Column: Input & Roles */}
              <div className="flex-1 flex flex-col gap-6">
                
                {/* JD Input */}
                <div className="glass-card p-5 rounded-2xl border border-white/10">
                  <h4 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
                    <FileText size={16} className="text-indigo-400"/> Job Description
                  </h4>
                  <textarea
                    value={jdText}
                    onChange={(e) => setJdText(e.target.value)}
                    placeholder="Paste job description here to analyze and optimize your resume..."
                    className="w-full h-32 bg-black/50 border border-white/10 rounded-xl p-4 text-sm text-gray-300 focus:outline-none focus:border-indigo-500/50 resize-none transition-colors"
                  />
                  <div className="mt-3 flex items-center justify-between">
                    <input
                      type="file"
                      accept=".pdf"
                      ref={fileInputRef}
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                    <button 
                      onClick={() => fileInputRef.current?.click()}
                      className="text-xs flex items-center gap-2 px-3 py-1.5 rounded-lg border border-white/10 hover:bg-white/5 text-gray-400 hover:text-white transition-colors"
                    >
                      <Upload size={14} /> Upload JD (PDF)
                    </button>
                    {jdText.trim() && (
                      <span className="text-xs text-indigo-400 font-mono flex items-center gap-1">
                        <Check size={12} /> JD Loaded
                      </span>
                    )}
                  </div>
                </div>

                {/* Role Selector */}
                <div className="glass-card p-5 rounded-2xl border border-white/10 flex-1">
                  <h4 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
                    <Target size={16} className="text-indigo-400"/> Select Target Role
                  </h4>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {RESUME_ROLES.map(role => (
                      <div 
                        key={role.id}
                        onClick={() => {
                          setSelectedRoleId(role.id)
                          setAnalysisResult(null)
                        }}
                        className={`p-3 rounded-xl border cursor-pointer transition-all ${selectedRoleId === role.id ? 'bg-white/10' : 'bg-black/30 hover:bg-white/5'}`}
                        style={{ borderColor: selectedRoleId === role.id ? role.color : 'rgba(255,255,255,0.05)' }}
                      >
                        <div className="flex items-center gap-3">
                          <div className="text-xl">{role.emoji}</div>
                          <div>
                            <div className="text-xs font-bold text-white">{role.title}</div>
                            <div className="text-[9px] text-gray-500 truncate">{role.subtitle}</div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Analyze Button */}
                <button
                  onClick={handleAnalyze}
                  disabled={isAnalyzing || !jdText.trim()}
                  className="w-full py-4 rounded-xl font-bold text-sm flex items-center justify-center gap-2 text-white transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed border border-white/10"
                  style={{
                    background: 'linear-gradient(135deg, rgba(99,102,241,0.2), rgba(168,85,247,0.2))',
                  }}
                >
                  {isAnalyzing ? (
                    <><RefreshCw size={18} className="animate-spin" /> Analyzing Job Description...</>
                  ) : (
                    <><FileSearch size={18} /> Analyze & Match Skills</>
                  )}
                </button>
              </div>

              {/* Right Column: Analysis Results & Download */}
              <div className="flex-1 flex flex-col">
                <div className="glass-card p-6 rounded-2xl border border-white/10 h-full flex flex-col relative overflow-hidden"
                     style={{ borderColor: selectedRole.borderColor }}>
                  
                  <div className="absolute top-0 right-0 p-8 blur-3xl opacity-20 pointer-events-none"
                       style={{ background: `radial-gradient(circle, ${selectedRole.color}, transparent)` }} />

                  <h4 className="text-sm font-bold text-white mb-6 flex items-center gap-2">
                    <Briefcase size={16} style={{ color: selectedRole.color }}/> Analysis Results
                  </h4>

                  {!analysisResult ? (
                    <div className="flex-1 flex flex-col items-center justify-center text-center opacity-50">
                      <Target size={48} className="mb-4 text-gray-500" />
                      <p className="text-sm text-gray-400 max-w-xs">Paste a job description and click analyze to see your ATS score and skill match.</p>
                    </div>
                  ) : (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex-1 flex flex-col gap-6"
                    >
                      {/* Scores Row */}
                      <div className="flex gap-4">
                        <div className="flex-1 bg-black/40 rounded-xl p-4 border border-white/5 flex items-center justify-between">
                          <div>
                            <div className="text-xs text-gray-400 mb-1">ATS Score</div>
                            <div className="text-3xl font-black" style={{ color: selectedRole.color }}>
                              {analysisResult.score}<span className="text-sm opacity-50">/100</span>
                            </div>
                          </div>
                          <div className="w-12 h-12 rounded-full flex items-center justify-center border-4" style={{ borderColor: `${selectedRole.color}40` }}>
                            <span className="text-sm font-bold">{analysisResult.score}%</span>
                          </div>
                        </div>
                        <div className="flex-1 bg-black/40 rounded-xl p-4 border border-white/5 flex items-center justify-between">
                          <div>
                            <div className="text-xs text-gray-400 mb-1">Skill Match</div>
                            <div className="text-3xl font-black text-emerald-400">
                              {analysisResult.matchPercent}<span className="text-sm opacity-50">%</span>
                            </div>
                          </div>
                          <div className="w-12 h-12 rounded-full flex items-center justify-center border-4 border-emerald-400/40">
                            <span className="text-sm font-bold">{analysisResult.matchPercent}%</span>
                          </div>
                        </div>
                      </div>

                      {/* Matched Skills */}
                      <div>
                        <div className="text-xs font-bold text-white mb-2 flex items-center gap-1">
                          <CheckCircle size={12} className="text-emerald-400"/> Matched Keywords
                        </div>
                        <div className="flex flex-wrap gap-1.5">
                          {analysisResult.matched.length > 0 ? analysisResult.matched.map(skill => (
                            <span key={skill} className="text-[10px] px-2 py-0.5 rounded border border-emerald-500/30 bg-emerald-500/10 text-emerald-300">
                              {skill}
                            </span>
                          )) : <span className="text-xs text-gray-500 italic">No exact matches found.</span>}
                        </div>
                      </div>

                      {/* Missing Skills */}
                      <div className="mb-auto">
                        <div className="text-xs font-bold text-white mb-2 flex items-center gap-1">
                          <AlertCircle size={12} className="text-rose-400"/> Missing Keywords (Consider Adding)
                        </div>
                        <div className="flex flex-wrap gap-1.5">
                          {analysisResult.missing.length > 0 ? analysisResult.missing.map(skill => (
                            <span key={skill} className="text-[10px] px-2 py-0.5 rounded border border-rose-500/30 bg-rose-500/10 text-rose-300">
                              {skill}
                            </span>
                          )) : <span className="text-xs text-emerald-500 italic">Great! You match all expected keywords.</span>}
                        </div>
                      </div>

                      {/* Download Button */}
                      <button
                        onClick={handleDownload}
                        disabled={generating}
                        className="w-full py-4 rounded-xl font-bold text-sm flex items-center justify-center gap-2 text-white transition-all duration-300 active:scale-95 border"
                        style={{
                          background: downloaded ? 'linear-gradient(135deg, #10b981, #059669)' : `linear-gradient(135deg, ${selectedRole.color}dd, ${selectedRole.color}99)`,
                          borderColor: `${selectedRole.color}50`,
                          boxShadow: downloaded ? 'none' : `0 4px 20px ${selectedRole.color}38`,
                        }}
                      >
                        {generating ? (
                          <><RefreshCw size={18} className="animate-spin" /> Generating PDF...</>
                        ) : downloaded ? (
                          <><CheckCircle size={18} /> Downloaded!</>
                        ) : (
                          <><Download size={18} /> Generate Tailored PDF ({selectedRole.title})</>
                        )}
                      </button>
                    </motion.div>
                  )}
                </div>
              </div>
            </div>
            
            {/* Footer */}
            <div className="px-8 py-3 text-center border-t border-white/5 bg-black/40">
              <p className="text-[10px] text-gray-500 font-mono tracking-wide">
                Strictly Local Execution · No OpenAI API · Data Never Leaves Browser
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

  useEffect(() => {
    const handler = () => setModalOpen(true)
    window.addEventListener('open-resume-modal', handler)
    return () => window.removeEventListener('open-resume-modal', handler)
  }, [])

  return (
    <>
      <ResumeModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />

      <section id="generator" ref={ref} className="relative py-32 px-6 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none z-0">
          <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] rounded-full blur-[160px] opacity-10 animate-pulse"
            style={{ background: 'radial-gradient(circle, #f59e0b, transparent)' }} />
          <div className="absolute top-0 left-1/4 w-[450px] h-[450px] rounded-full blur-[130px] opacity-10"
            style={{ background: 'radial-gradient(circle, #a855f7, transparent)' }} />
        </div>

        <div className="max-w-5xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="text-center mb-16"
          >
            <p className="text-amber-400 text-sm font-mono uppercase tracking-[0.3em] mb-3 inline-flex items-center gap-2 glass-card px-4 py-1 rounded-full border-glow">
              <Sparkles size={14} className="animate-pulse" /> Universal AI Engine
            </p>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-shadow-glow">
              AI Resume <span className="gradient-text-gold">Generator</span>
            </h2>
            <div className="w-24 h-1 mx-auto rounded-full" style={{ background: 'linear-gradient(90deg, #f59e0b, #ec4899)' }} />
            <p className="section-subtitle mt-6 font-light">
              Paste a job description or upload a PDF. Our local AI engine analyzes keywords, matches your skills, and instantly generates a highly-optimized, FAANG-ready ATS resume. No API required.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative"
          >
            <div className="absolute -inset-px rounded-3xl bg-gradient-to-r from-amber-500 via-purple-500 to-pink-500 opacity-20 blur-sm animate-pulse pointer-events-none" />

            <div className="relative bg-black/60 backdrop-blur-2xl rounded-3xl border border-white/10 p-10 md:p-16 text-center">
              <div className="text-6xl mb-6">📄</div>
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-3 tracking-tight">
                Analyze JD & Generate Custom Resume
              </h3>
              <p className="text-gray-400 mb-10 max-w-lg mx-auto text-sm leading-relaxed">
                Unlock higher ATS scores by matching your verified skills directly to job requirements. Get immediate visual feedback on missing skills before you apply.
              </p>

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
                <FileSearch size={22} />
                Open AI Generator
              </button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-4"
          >
            {[
              { icon: '🔒', label: '100% Local', desc: 'No external API calls' },
              { icon: '🎯', label: 'Smart Match', desc: 'JD keyword analysis' },
              { icon: '📈', label: 'ATS Score 90+', desc: 'Dynamic skill ranking' },
              { icon: '⚡', label: 'Instant PDF', desc: 'FAANG-ready design' },
            ].map(({ icon, label, desc }) => (
              <div key={label} className="glass-card rounded-2xl p-4 text-center group hover:border-amber-500/20 transition-colors border border-white/5 cursor-pointer" onClick={() => setModalOpen(true)}>
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
