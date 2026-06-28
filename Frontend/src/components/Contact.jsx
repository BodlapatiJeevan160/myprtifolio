import { useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from '../hooks/useInView'
import { Mail, Phone, MapPin, Send, MessageSquare, CheckCircle2, Loader2 } from 'lucide-react'
import { FaGithub, FaLinkedinIn, FaTwitter } from 'react-icons/fa'

const contactInfo = [
  { icon: Mail,    label: 'Email',    value: '2310030160cse@gmail.com', href: 'mailto:2310030160cse@gmail.com', color: '#6366f1' },
  { icon: Phone,   label: 'Phone',    value: '+91 90143 45907',    href: 'tel:+919014345907',          color: '#a855f7' },
  { icon: MapPin,  label: 'Location', value: 'India',              href: '#',                          color: '#06b6d4' },
]

const socials = [
  { icon: FaGithub,     href: 'https://github.com/BodlapatiJeevan160', target: '_blank', label: 'GitHub',   color: '#fff' },
  { icon: FaLinkedinIn, href: 'https://www.linkedin.com/in/jeevan-bodlapati/', target: '_blank', label: 'LinkedIn', color: '#0ea5e9' },
  { icon: Mail,         href: 'mailto:2310030160cse@gmail.com', label: 'Email', color: '#6366f1' },
]

export default function Contact() {
  const [ref, inView] = useInView(0.1)
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [status, setStatus] = useState('idle') // idle | loading | success | error

  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('loading')
    // Simulate async send
    await new Promise(r => setTimeout(r, 1800))
    setStatus('success')
    setForm({ name: '', email: '', subject: '', message: '' })
    setTimeout(() => setStatus('idle'), 4000)
  }

  return (
    <section id="contact" ref={ref} className="relative py-32 px-6">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 right-1/4 w-96 h-96 rounded-full blur-3xl opacity-5"
          style={{ background: 'radial-gradient(circle, #6366f1, transparent)' }} />
      </div>

      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <p className="text-primary-400 text-sm font-semibold uppercase tracking-widest mb-3">Get In Touch</p>
          <h2 className="section-title">
            Let's <span className="gradient-text">Connect</span>
          </h2>
          <div className="w-16 h-1 mx-auto mt-4 rounded-full" style={{ background: 'linear-gradient(90deg, #6366f1, #a855f7)' }} />
          <p className="section-subtitle mt-6">
            Have a project in mind or want to collaborate? I'd love to hear from you.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-10">
          {/* Left – info */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-2 space-y-6"
          >
            {/* Intro card */}
            <div className="glass-card rounded-2xl p-7">
              <div className="flex items-center gap-3 mb-4">
                <MessageSquare size={20} className="text-primary-400" />
                <h3 className="font-bold text-white text-lg">Let's Talk</h3>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed">
                Whether you have an exciting AI project, need a full-stack developer, or just want to say hi —
                my inbox is always open. I typically respond within 24 hours.
              </p>
            </div>

            {/* Contact items */}
            <div className="space-y-3">
              {contactInfo.map(({ icon: Icon, label, value, href, color }) => (
                <a
                  key={label}
                  href={href}
                  className="glass-card-hover flex items-center gap-4 rounded-xl p-5 group"
                >
                  <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 transition-transform duration-300 group-hover:scale-110"
                    style={{ background: `${color}20`, border: `1px solid ${color}40` }}>
                    <Icon size={18} style={{ color }} />
                  </div>
                  <div>
                    <div className="text-xs text-gray-500 mb-0.5">{label}</div>
                    <div className="text-sm font-semibold text-white">{value}</div>
                  </div>
                </a>
              ))}
            </div>

            {/* Social links */}
            <div className="glass-card rounded-2xl p-6">
              <p className="text-xs text-gray-500 uppercase tracking-wider mb-4">Find Me Online</p>
              <div className="flex gap-3">
                {socials.map(({ icon: Icon, href, label, color, target }) => (
                  <a
                    key={label}
                    href={href}
                    target={target}
                    rel={target === '_blank' ? 'noopener noreferrer' : undefined}
                    aria-label={label}
                    className="w-11 h-11 rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-110"
                    style={{
                      background: 'rgba(255,255,255,0.05)',
                      border: '1px solid rgba(255,255,255,0.08)',
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.background = `${color}20`
                      e.currentTarget.style.borderColor = `${color}50`
                      e.currentTarget.style.boxShadow = `0 0 15px ${color}30`
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.background = 'rgba(255,255,255,0.05)'
                      e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'
                      e.currentTarget.style.boxShadow = 'none'
                    }}
                  >
                    <Icon size={17} style={{ color }} />
                  </a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right – form */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-3"
          >
            <div className="glass-card rounded-2xl p-8">
              <h3 className="text-xl font-bold text-white mb-7">Send a Message</h3>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  {/* Name */}
                  <div>
                    <label className="block text-xs text-gray-400 mb-2 font-medium">Your Name</label>
                    <input
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      required
                      placeholder="Jeevan"
                      className="w-full px-4 py-3 rounded-xl text-sm text-white placeholder-gray-600 outline-none transition-all duration-300 focus:ring-2"
                      style={{
                        background: 'rgba(255,255,255,0.04)',
                        border: '1px solid rgba(255,255,255,0.08)',
                      }}
                      onFocus={e => { e.target.style.borderColor = '#6366f1'; e.target.style.boxShadow = '0 0 0 2px rgba(99,102,241,0.2)' }}
                      onBlur={e => { e.target.style.borderColor = 'rgba(255,255,255,0.08)'; e.target.style.boxShadow = 'none' }}
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-xs text-gray-400 mb-2 font-medium">Email Address</label>
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      required
                      placeholder="hello@example.com"
                      className="w-full px-4 py-3 rounded-xl text-sm text-white placeholder-gray-600 outline-none transition-all duration-300"
                      style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}
                      onFocus={e => { e.target.style.borderColor = '#6366f1'; e.target.style.boxShadow = '0 0 0 2px rgba(99,102,241,0.2)' }}
                      onBlur={e => { e.target.style.borderColor = 'rgba(255,255,255,0.08)'; e.target.style.boxShadow = 'none' }}
                    />
                  </div>
                </div>

                {/* Subject */}
                <div>
                  <label className="block text-xs text-gray-400 mb-2 font-medium">Subject</label>
                  <input
                    type="text"
                    name="subject"
                    value={form.subject}
                    onChange={handleChange}
                    required
                    placeholder="Project Collaboration / Job Opportunity"
                    className="w-full px-4 py-3 rounded-xl text-sm text-white placeholder-gray-600 outline-none transition-all duration-300"
                    style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}
                    onFocus={e => { e.target.style.borderColor = '#6366f1'; e.target.style.boxShadow = '0 0 0 2px rgba(99,102,241,0.2)' }}
                    onBlur={e => { e.target.style.borderColor = 'rgba(255,255,255,0.08)'; e.target.style.boxShadow = 'none' }}
                  />
                </div>

                {/* Message */}
                <div>
                  <label className="block text-xs text-gray-400 mb-2 font-medium">Message</label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    placeholder="Tell me about your project or how I can help..."
                    className="w-full px-4 py-3 rounded-xl text-sm text-white placeholder-gray-600 outline-none transition-all duration-300 resize-none"
                    style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}
                    onFocus={e => { e.target.style.borderColor = '#6366f1'; e.target.style.boxShadow = '0 0 0 2px rgba(99,102,241,0.2)' }}
                    onBlur={e => { e.target.style.borderColor = 'rgba(255,255,255,0.08)'; e.target.style.boxShadow = 'none' }}
                  />
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={status === 'loading' || status === 'success'}
                  className="w-full btn-primary py-4 text-base font-semibold flex items-center justify-center gap-3 relative z-10 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    {status === 'loading' ? (
                      <><Loader2 size={18} className="animate-spin" /> Sending...</>
                    ) : status === 'success' ? (
                      <><CheckCircle2 size={18} /> Message Sent!</>
                    ) : (
                      <><Send size={18} /> Send Message</>
                    )}
                  </span>
                </button>

                {status === 'success' && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-2 text-green-400 text-sm justify-center"
                  >
                    <CheckCircle2 size={16} />
                    Thanks! I'll get back to you within 24 hours.
                  </motion.div>
                )}
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
