import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Cpu } from 'lucide-react'

const links = [
  { id: 'about',          label: 'About' },
  { id: 'skills',         label: 'Skills' },
  { id: 'projects',       label: 'Projects' },
  { id: 'experience',     label: 'Experience' },
  { id: 'recruiter',      label: 'Highlights' },
  { id: 'certifications', label: 'Certifications' },
  { id: 'resumes',        label: 'Resumes' },
  { id: 'generator',      label: 'AI Generator' },
  { id: 'contact',        label: 'Contact' },
]

export default function Navbar({ activeSection, scrolled }) {
  const [menuOpen, setMenuOpen] = useState(false)

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    setMenuOpen(false)
  }

  return (
    <nav className={`fixed left-0 right-0 z-50 transition-all duration-700 ease-in-out flex justify-center ${
      scrolled
        ? 'top-4'
        : 'top-0'
    }`}
    >
      <div className={`transition-all duration-700 w-full max-w-7xl px-6 flex items-center justify-between ${
        scrolled 
        ? 'py-3 bg-black/40 backdrop-blur-xl border border-white/10 rounded-full shadow-[0_8px_32px_rgba(0,0,0,0.5),_0_0_20px_rgba(99,102,241,0.2)] mx-4' 
        : 'py-5 bg-transparent border-transparent mx-0'
      }`}>
        {/* Logo */}
        <button
          onClick={() => scrollTo('home')}
          className="flex items-center gap-2 group"
        >
          <div className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-500 group-hover:scale-110 shadow-[0_0_15px_rgba(99,102,241,0.5)] border border-white/20"
            style={{ background: 'linear-gradient(135deg, rgba(99,102,241,0.2), rgba(168,85,247,0.2))' }}>
            <Cpu size={20} className="text-cyan-400 group-hover:text-white transition-colors" />
          </div>
          <span className="text-xl font-black tracking-widest uppercase text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]">Jeevan</span>
        </button>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-8">
          {links.map(({ id, label }) => (
            <li key={id}>
              <button
                onClick={() => scrollTo(id)}
                className={`nav-link text-sm font-medium pb-1 ${activeSection === id ? 'active text-white' : ''}`}
              >
                {label}
              </button>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <button
          onClick={() => scrollTo('contact')}
          className="hidden md:flex relative overflow-hidden group px-6 py-2.5 rounded-full font-bold tracking-widest uppercase text-xs"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-indigo-500 to-purple-500 opacity-80 group-hover:opacity-100 transition-opacity duration-300"></div>
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-md bg-gradient-to-r from-cyan-500 via-indigo-500 to-purple-500"></div>
          <span className="relative z-10 text-white flex items-center gap-2">Initialize <div className="w-1.5 h-1.5 rounded-full bg-white animate-ping"></div></span>
        </button>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-gray-300 hover:text-white transition-colors"
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
            animate={{ opacity: 1, backdropFilter: "blur(16px)" }}
            exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
            transition={{ duration: 0.3 }}
            className="md:hidden fixed inset-0 -z-10 bg-dark-900/90 flex flex-col justify-center items-center h-screen w-screen"
          >
            <div className="flex flex-col items-center w-full max-w-sm px-6 space-y-4">
              {links.map(({ id, label }, i) => (
                <motion.button
                  key={id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + i * 0.05 }}
                  onClick={() => scrollTo(id)}
                  className={`block w-full text-center px-4 py-4 rounded-2xl text-xl font-bold tracking-wide transition-all duration-300 ${
                    activeSection === id
                      ? 'text-white bg-primary-500/20 border border-primary-500/30 shadow-[0_0_20px_rgba(99,102,241,0.2)]'
                      : 'text-gray-400 hover:text-white hover:bg-white/10'
                  }`}
                >
                  {label}
                </motion.button>
              ))}
              <motion.button
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 + links.length * 0.05 }}
                onClick={() => scrollTo('contact')}
                className="w-full mt-8 btn-primary text-lg text-center rounded-2xl py-4 relative z-10 font-bold tracking-widest uppercase"
              >
                <span className="relative z-10 flex items-center justify-center w-full">Hire Me</span>
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
