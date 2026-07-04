import { motion } from 'framer-motion'
import { useInView } from '../hooks/useInView'
import { Brain, Code2, Rocket, Heart } from 'lucide-react'

const highlights = [
  { icon: Brain,  color: '#6366f1', label: 'AI & ML',         desc: 'Building intelligent systems with LLMs and neural networks' },
  { icon: Code2,  color: '#a855f7', label: 'Full Stack',      desc: 'End-to-end web apps with React, Node.js & cloud services' },
  { icon: Rocket, color: '#06b6d4', label: 'Prompt Engineer', desc: 'Crafting precise prompts for optimal AI model performance' },
  { icon: Heart,  color: '#ec4899', label: 'Passionate',      desc: 'Deeply passionate about the future of AI and technology' },
]

export default function About() {
  const [ref, inView] = useInView(0.2)

  const downloadResume = () => {
    const link = document.createElement("a");
    link.href = "/Bodlapati_Jeevan_AI_Engineer_Resume.pdf";
    link.download = "Bodlapati_Jeevan_AI_Engineer_Resume.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section id="about" ref={ref} className="relative py-32 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <p className="text-primary-400 text-sm font-semibold uppercase tracking-widest mb-3">Who I Am</p>
          <h2 className="section-title">
            About <span className="gradient-text">Me</span>
          </h2>
          <div className="w-16 h-1 mx-auto mt-4 rounded-full" style={{ background: 'linear-gradient(90deg, #6366f1, #a855f7)' }} />
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left – visual */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="relative flex justify-center"
          >
            {/* Avatar ring */}
            <div className="relative w-72 h-72">
              {/* Spinning ring */}
              <div className="absolute inset-0 rounded-full animate-spin-slow"
                style={{ background: 'conic-gradient(from 0deg, #6366f1, #a855f7, #06b6d4, #6366f1)', padding: '3px' }}>
                <div className="w-full h-full rounded-full" style={{ background: '#080b10' }} />
              </div>

              {/* Avatar content */}
              <div className="absolute inset-3 rounded-full flex items-center justify-center text-8xl"
                style={{ background: 'linear-gradient(135deg, rgba(99,102,241,0.15), rgba(168,85,247,0.15))', border: '1px solid rgba(99,102,241,0.2)' }}>
                👨‍💻
              </div>

              {/* Floating badges */}
              <div className="absolute -top-4 -right-4 glass-card px-3 py-2 rounded-xl text-xs font-semibold text-primary-300 animate-float"
                style={{ animationDelay: '0s' }}>
                🤖 AI Engineer
              </div>
              <div className="absolute -bottom-4 -left-4 glass-card px-3 py-2 rounded-xl text-xs font-semibold text-purple-300 animate-float"
                style={{ animationDelay: '2s' }}>
                ⚡ Full Stack
              </div>
              <div className="absolute top-1/2 -right-12 glass-card px-3 py-2 rounded-xl text-xs font-semibold text-cyan-300 animate-float"
                style={{ animationDelay: '1s' }}>
                ✨ Prompt Eng.
              </div>
            </div>
          </motion.div>

          {/* Right – text */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="space-y-6"
          >
            <h3 className="text-3xl font-bold text-white">
              Turning Ideas into{' '}
              <span className="gradient-text">Intelligent Reality</span>
            </h3>

            <p className="text-gray-400 leading-relaxed text-lg">
              I'm <strong className="text-white">Jeevan</strong>, an AI Engineer and Full Stack Developer
              with a passion for building cutting-edge applications that leverage the power of artificial
              intelligence. I bridge the gap between complex AI models and beautiful, user-friendly interfaces.
            </p>

            <p className="text-gray-400 leading-relaxed">
              My expertise spans across Large Language Models, prompt engineering, RESTful APIs,
              and modern frontend frameworks. I thrive at the intersection of AI and software engineering,
              creating products that are both technically sophisticated and delightfully intuitive.
            </p>

            {/* Quick facts */}
            <div className="grid grid-cols-2 gap-4 pt-2">
              {[
                { label: 'Location',    value: 'India 🇮🇳' },
                { label: 'Focus',       value: 'AI & Web Dev' },
                { label: 'Languages',   value: 'Python, JS, TS' },
                { label: 'Available',   value: 'Open to Work ✅' },
              ].map(({ label, value }) => (
                <div key={label} className="glass-card rounded-xl p-4">
                  <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">{label}</div>
                  <div className="text-sm font-semibold text-white">{value}</div>
                </div>
              ))}
            </div>

            <div className="flex gap-4 pt-2">
              <button
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                className="btn-primary text-sm px-6 py-3 relative z-10"
              >
                <span className="relative z-10">Get In Touch</span>
              </button>
              <button
                onClick={downloadResume}
                className="btn-outline text-sm px-6 py-3"
              >
                Download CV
              </button>
            </div>
          </motion.div>
        </div>

        {/* Highlight cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-20">
          {highlights.map(({ icon: Icon, color, label, desc }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
              className="glass-card-hover rounded-2xl p-6 text-center cursor-default"
            >
              <div className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4 transition-transform duration-300 hover:scale-110"
                style={{ background: `${color}20`, border: `1px solid ${color}40` }}>
                <Icon size={22} style={{ color }} />
              </div>
              <h4 className="font-semibold text-white text-sm mb-2">{label}</h4>
              <p className="text-gray-500 text-xs leading-relaxed">{desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
