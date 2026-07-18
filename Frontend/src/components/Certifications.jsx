import { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useInView } from '../hooks/useInView';
import { Award, ExternalLink, CheckCircle2, Server, AppWindow, Bot, Sparkles, MessageCircle, Globe } from 'lucide-react';

/* ═══════════════════════════════════════════════════════════════
   DATA CONFIGURATION
═══════════════════════════════════════════════════════════════ */
const CERTS_DATA = [
  {
    id: 'sn-csa',
    title: 'ServiceNow Certified System Administrator (CSA)',
    issuer: 'ServiceNow',
    date: 'Recent',
    icon: <Server size={28} />,
    color: '#4ade80',
    skills: ['ServiceNow Platform', 'Administration', 'ITSM', 'Workflow Automation'],
    link: '#',
    verified: true
  },
  {
    id: 'sn-cad',
    title: 'ServiceNow Certified Application Developer (CAD)',
    issuer: 'ServiceNow',
    date: 'Recent',
    icon: <AppWindow size={28} />,
    color: '#06b6d4',
    skills: ['Application Development', 'Workflows', 'Business Rules', 'Platform Development'],
    link: '#',
    verified: true
  },
  {
    id: 'aa-adv',
    title: 'Automation Anywhere Advanced Professional',
    issuer: 'Automation Anywhere',
    date: 'Recent',
    icon: <Bot size={28} />,
    color: '#f59e0b',
    skills: ['RPA', 'Automation', 'Bots', 'Business Automation'],
    link: '#',
    verified: true
  },
  {
    id: 'openai',
    title: 'Programming with OpenAI',
    issuer: 'Columbia University / OpenAI',
    date: 'Recent',
    icon: <Sparkles size={28} />,
    color: '#ec4899',
    skills: ['Prompt Engineering', 'LLMs', 'OpenAI APIs', 'AI Development'],
    link: '#',
    verified: true
  },
  {
    id: 'cambridge',
    title: 'Cambridge Linguaskill',
    issuer: 'Cambridge University',
    date: 'Recent',
    icon: <MessageCircle size={28} />,
    color: '#ef4444',
    skills: ['Professional English', 'Communication'],
    link: '#',
    verified: true
  },
  {
    id: 'web-dev',
    title: 'Web Development Bootcamp',
    issuer: 'KLH University',
    date: 'Recent',
    icon: <Globe size={28} />,
    color: '#3b82f6',
    skills: ['HTML', 'CSS', 'JavaScript', 'React'],
    link: '#',
    verified: true
  }
];

/* ═══════════════════════════════════════════════════════════════
   CERTIFICATE CARD COMPONENT (3D TILT)
═══════════════════════════════════════════════════════════════ */
function CertCard({ cert, index, inView }) {
  const cardRef = useRef(null);
  
  // 3D Tilt Logic
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x, { stiffness: 100, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 100, damping: 20 });
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["12deg", "-12deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-12deg", "12deg"]);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseXPos = e.clientX - rect.left;
    const mouseYPos = e.clientY - rect.top;
    x.set(mouseXPos / width - 0.5);
    y.set(mouseYPos / height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 40, scale: 0.95 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1, type: "spring", stiffness: 80 }}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="perspective-1000 group relative h-full flex"
    >
      {/* Background ambient glow that appears on hover */}
      <div 
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-2xl pointer-events-none"
        style={{ background: cert.color, transform: "translateZ(-30px)", opacity: 0.15 }}
      />

      <div 
        className="glass-card rounded-2xl p-6 sm:p-8 h-full flex flex-col border w-full transition-all duration-300 group-hover:border-white/20 relative overflow-hidden"
        style={{ 
          transform: "translateZ(10px)",
          borderColor: `${cert.color}30`,
          boxShadow: `0 4px 24px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.05)`
        }}
      >
        {/* Subtle inner corner glow */}
        <div 
          className="absolute -top-12 -right-12 w-32 h-32 rounded-full blur-3xl opacity-20 pointer-events-none"
          style={{ background: cert.color }}
        />

        {/* ── Top Row: Icon & Verified Badge ── */}
        <div className="flex items-start justify-between mb-6 transform-style-3d">
          <div 
            className="w-14 h-14 rounded-xl flex items-center justify-center shadow-lg border group-hover:scale-110 transition-transform duration-500 relative"
            style={{ 
              background: `linear-gradient(135deg, ${cert.color}30, rgba(0,0,0,0.7))`, 
              borderColor: `${cert.color}50`,
              transform: "translateZ(20px)",
              color: cert.color
            }}
          >
            {cert.icon}
            {/* Pulsing ring around icon on hover */}
            <div 
              className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 group-hover:animate-ping pointer-events-none"
              style={{ border: `1px solid ${cert.color}` }}
            />
          </div>

          {cert.verified && (
            <div 
              className="flex items-center gap-1.5 text-[10px] font-bold tracking-widest uppercase px-3 py-1 rounded-full border"
              style={{ 
                color: '#4ade80',
                background: 'rgba(74, 222, 128, 0.1)',
                borderColor: 'rgba(74, 222, 128, 0.3)',
                transform: "translateZ(15px)" 
              }}
            >
              <CheckCircle2 size={12} className="animate-pulse" /> Verified
            </div>
          )}
        </div>

        {/* ── Title & Issuer ── */}
        <div style={{ transform: "translateZ(15px)" }} className="mb-6 flex-grow">
          <h3 
            className="font-bold text-white text-lg leading-snug mb-2 group-hover:text-shadow-glow transition-all duration-300" 
            style={{ '--tw-shadow-color': cert.color }}
          >
            {cert.title}
          </h3>
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-400 font-medium">{cert.issuer}</p>
            <p className="text-[10px] text-gray-500 font-mono">{cert.date}</p>
          </div>
        </div>

        {/* ── Skills Gained ── */}
        <div className="flex flex-wrap gap-1.5 mb-6" style={{ transform: "translateZ(10px)" }}>
          {cert.skills.map(s => (
            <span 
              key={s} 
              className="text-[10px] font-mono px-2.5 py-1 rounded-sm transition-all duration-300 hover:scale-105 cursor-default"
              style={{ 
                background: `${cert.color}15`, 
                border: `1px solid ${cert.color}30`, 
                color: `${cert.color}ee` 
              }}
            >
              {s}
            </span>
          ))}
        </div>

        {/* ── Action Link ── */}
        <div 
          className="flex items-center justify-between border-t pt-4 mt-auto" 
          style={{ transform: "translateZ(10px)", borderColor: 'rgba(255,255,255,0.05)' }}
        >
          <div className="flex items-center gap-1.5 text-xs text-gray-500">
            <Award size={14} /> Official Credential
          </div>
          <a
            href={cert.link}
            className="flex items-center gap-1.5 text-xs font-bold transition-all duration-300 group-hover:-translate-y-0.5 uppercase tracking-wider px-3 py-1.5 rounded-lg"
            style={{ 
              color: cert.color, 
              background: `${cert.color}10`,
              textShadow: `0 0 10px ${cert.color}80` 
            }}
          >
            View <ExternalLink size={12} />
          </a>
        </div>
      </div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   MAIN CERTIFICATIONS COMPONENT
═══════════════════════════════════════════════════════════════ */
export default function Certifications() {
  const [ref, inView] = useInView(0.05);

  return (
    <section id="certifications" ref={ref} className="relative py-32 px-6 overflow-hidden perspective-1000">
      
      {/* ── Ambient Backgrounds ── */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div 
          className="absolute top-1/3 left-1/4 w-[700px] h-[700px] rounded-full blur-[150px] opacity-[0.06]"
          style={{ background: 'radial-gradient(circle, #4ade80, transparent)' }} 
        />
        <div 
          className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] rounded-full blur-[140px] opacity-[0.07]"
          style={{ background: 'radial-gradient(circle, #06b6d4, transparent)' }} 
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
            <div className="h-px w-8" style={{ background: 'linear-gradient(90deg, transparent, #4ade80)' }} />
            <span className="text-green-400 text-xs font-mono uppercase tracking-[0.35em] glass-card px-4 py-1.5 rounded-full border-glow" style={{ borderColor: 'rgba(74,222,128,0.3)' }}>
              Achievements
            </span>
            <div className="h-px w-8" style={{ background: 'linear-gradient(90deg, #4ade80, transparent)' }} />
          </div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 text-shadow-glow leading-tight">
            Certifications & <span className="gradient-text">Learning</span>
          </h2>
          
          <div className="w-24 h-1 mx-auto rounded-full mb-6" style={{ background: 'linear-gradient(90deg, #4ade80, #06b6d4, #3b82f6)' }} />
          
          <p className="section-subtitle mt-4 font-light max-w-3xl mx-auto text-gray-400 leading-relaxed text-sm md:text-base">
            Continuous learning and industry-recognized certifications in AI, automation, software development, and cloud technologies.
          </p>
        </motion.div>

        {/* ═══ CERTIFICATIONS GRID ═══ */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-20">
          {CERTS_DATA.map((cert, index) => (
            <CertCard key={cert.id} cert={cert} index={index} inView={inView} />
          ))}
        </div>

        {/* ═══ BOTTOM BANNER ═══ */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="relative rounded-2xl glass-card overflow-hidden border border-white/10"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-green-500/5 via-cyan-500/5 to-blue-500/5 opacity-50" />
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent" />
          
          <div className="relative p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8 z-10">
            {/* Huge Number */}
            <div className="flex items-center gap-6">
              <div className="text-5xl md:text-7xl font-black tabular-nums text-transparent bg-clip-text bg-gradient-to-br from-white to-gray-500 drop-shadow-2xl">
                6<span className="text-cyan-400">+</span>
              </div>
              <div className="flex flex-col">
                <span className="text-xl md:text-2xl font-bold text-white tracking-wide">Professional</span>
                <span className="text-lg text-cyan-400 tracking-widest uppercase font-mono">Certifications</span>
              </div>
            </div>

            {/* Tags line */}
            <div className="flex flex-wrap justify-center md:justify-end gap-3 md:gap-4 max-w-xl">
              {['AI', 'Automation', 'Software Development', 'Continuous Learning'].map((tag, i) => (
                <div key={tag} className="flex items-center gap-3 md:gap-4">
                  <span className="text-xs md:text-sm font-medium text-gray-300 whitespace-nowrap">{tag}</span>
                  {i < 3 && <div className="w-1.5 h-1.5 rounded-full bg-cyan-500/50" />}
                </div>
              ))}
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
