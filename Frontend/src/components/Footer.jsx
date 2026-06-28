import { Cpu, Mail, Heart, ArrowUp } from 'lucide-react'
import { FaGithub, FaLinkedinIn, FaTwitter } from 'react-icons/fa'
import { motion } from 'framer-motion'
import { useInView } from '../hooks/useInView'

const navLinks = ['About', 'Skills', 'Projects', 'Experience', 'Certifications', 'Contact']

export default function Footer() {
  const [ref, inView] = useInView(0.1)
  const scrollTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })

  return (
    <footer ref={ref} className="relative border-t border-white/10 pt-20 pb-10 px-6 overflow-hidden">
      {/* Soft gradient top & scanning line */}
      <div className="absolute top-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, #06b6d4, #a855f7, transparent)', boxShadow: '0 0 20px #06b6d4' }} />
      <div className="absolute top-0 left-0 right-0 h-[2px] w-1/3 bg-cyan-400 blur-sm mix-blend-screen animate-pulse"
        style={{ animation: 'scanline 6s linear infinite alternate' }} />

      {/* Ambient glowing orb */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] rounded-[100%] blur-[120px] opacity-10 pointer-events-none"
        style={{ background: 'radial-gradient(circle, #6366f1, transparent)' }} />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid md:grid-cols-3 gap-12 mb-16">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center shadow-[0_0_15px_rgba(6,182,212,0.5)] border border-white/20"
                style={{ background: 'linear-gradient(135deg, rgba(6,182,212,0.2), rgba(168,85,247,0.2))' }}>
                <Cpu size={20} className="text-cyan-400" />
              </div>
              <span className="text-2xl font-black tracking-widest uppercase text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]">Jeevan</span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed max-w-xs font-light">
              Architecting intelligent digital experiences through <span className="text-cyan-400">AI</span>, <span className="text-purple-400">Machine Learning</span>, and advanced <span className="text-indigo-400">Full-Stack Development</span>.
            </p>

            <div className="flex gap-4 mt-8">
              {[
                { icon: FaGithub,     href: '#', color: '#fff', shadow: '#ffffff' },
                { icon: FaLinkedinIn, href: '#', color: '#0ea5e9', shadow: '#0ea5e9' },
                { icon: FaTwitter,    href: '#', color: '#38bdf8', shadow: '#38bdf8' },
                { icon: Mail,         href: 'mailto:jeevan@example.com', color: '#ec4899', shadow: '#ec4899' },
              ].map(({ icon: Icon, href, color, shadow }, i) => (
                <a key={i} href={href}
                  className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 group glass-card"
                  onMouseEnter={e => { e.currentTarget.style.borderColor = `${color}80`; e.currentTarget.style.boxShadow = `0 0 20px ${shadow}60, inset 0 0 10px ${shadow}30` }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'; e.currentTarget.style.boxShadow = '0 8px 32px rgba(0,0,0,0.5)' }}
                >
                  <Icon size={16} className="text-gray-400 group-hover:text-white transition-colors" style={{ filter: `drop-shadow(0 0 5px ${shadow})` }} />
                </a>
              ))}
            </div>
          </motion.div>

          {/* Quick links */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h4 className="text-xs font-mono font-bold text-gray-500 mb-6 uppercase tracking-[0.2em]">System Directories</h4>
            <ul className="space-y-4">
              {navLinks.map(link => (
                <li key={link}>
                  <button
                    onClick={() => document.getElementById(link.toLowerCase())?.scrollIntoView({ behavior: 'smooth' })}
                    className="text-sm font-mono tracking-wide text-gray-400 hover:text-cyan-400 transition-colors duration-300 flex items-center gap-3 group"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-gray-600 group-hover:bg-cyan-400 group-hover:shadow-[0_0_10px_#06b6d4] transition-all duration-300" />
                    {link}
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Status */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h4 className="text-xs font-mono font-bold text-gray-500 mb-6 uppercase tracking-[0.2em]">Operational Status</h4>
            <div className="space-y-4">
              <div className="flex items-center gap-4 group cursor-default">
                <div className="relative flex items-center justify-center w-4 h-4">
                  <div className="absolute inset-0 rounded-full bg-green-500 animate-ping opacity-50"></div>
                  <div className="w-2 h-2 rounded-full bg-green-400 relative z-10 shadow-[0_0_10px_#4ade80]"></div>
                </div>
                <span className="text-sm font-mono text-gray-400 group-hover:text-green-400 transition-colors">Available for deployment</span>
              </div>
              <div className="flex items-center gap-4 group cursor-default">
                <div className="relative flex items-center justify-center w-4 h-4">
                  <div className="absolute inset-0 rounded-full bg-blue-500 animate-ping opacity-50" style={{ animationDelay: '0.5s' }}></div>
                  <div className="w-2 h-2 rounded-full bg-blue-400 relative z-10 shadow-[0_0_10px_#60a5fa]"></div>
                </div>
                <span className="text-sm font-mono text-gray-400 group-hover:text-blue-400 transition-colors">Open to collaborations</span>
              </div>
              <div className="flex items-center gap-4 group cursor-default">
                <div className="w-4 h-4 flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-purple-400 relative shadow-[0_0_10px_#c084fc]"></div>
                </div>
                <span className="text-sm font-mono text-gray-400 group-hover:text-purple-400 transition-colors">Based in India 🇮🇳</span>
              </div>

              <div className="glass-card rounded-xl p-5 mt-6 border-glow">
                <p className="text-[10px] font-mono text-gray-500 mb-2 uppercase tracking-[0.2em]">Latency</p>
                <p className="text-sm font-bold text-cyan-400 tracking-wide">⚡ Response &lt; 24h</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 border-t border-white/10 pt-8 mt-10">
          <p className="text-sm font-mono text-gray-500 flex items-center gap-2">
            Engineered with <Heart size={14} className="text-pink-500 animate-pulse drop-shadow-[0_0_5px_#ec4899]" /> by{' '}
            <span className="text-white font-bold tracking-widest uppercase drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]">Jeevan</span>
            <span className="text-gray-600">|</span> {new Date().getFullYear()}
          </p>

          <p className="text-xs font-mono text-gray-600">
            SYS.REQ: REACT_19_0 // T_WIND_3_4 // F_MOTION
          </p>

          {/* Back to top */}
          <button
            onClick={scrollTop}
            className="w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-500 hover:scale-110 group border border-cyan-400/30 hover:border-cyan-400"
            style={{ background: 'linear-gradient(135deg, rgba(6,182,212,0.2), rgba(168,85,247,0.2))', boxShadow: '0 0 20px rgba(6,182,212,0.2)' }}
            aria-label="Back to top"
          >
            <ArrowUp size={20} className="text-cyan-400 group-hover:text-white group-hover:-translate-y-1 transition-all duration-300 drop-shadow-[0_0_8px_#06b6d4]" />
          </button>
        </div>
      </div>
    </footer>
  )
}
