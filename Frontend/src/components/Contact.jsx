import { motion } from 'framer-motion'
import { useInView } from '../hooks/useInView'
import { Mail, Phone, MapPin, Download, CheckCircle2, MessageSquare, Clock, Globe } from 'lucide-react'
import { FaGithub, FaLinkedinIn, FaWhatsapp } from 'react-icons/fa'

const roles = [
  'AI Engineer',
  'Software Engineer',
  'Automation Engineer',
  'Full Stack Developer',
  'Prompt Engineer'
]

const contactMethods = [
  {
    id: 'whatsapp',
    icon: FaWhatsapp,
    label: 'Chat on WhatsApp',
    href: 'https://wa.me/919014345907?text=Hi%20Jeevan,%20I%20found%20your%20portfolio%20and%20would%20like%20to%20discuss%20an%20opportunity.',
    color: '#25D366',
    target: '_blank'
  },
  {
    id: 'email',
    icon: Mail,
    label: 'Email Me',
    href: 'mailto:2310030160cse@gmail.com?subject=Job%20Opportunity&body=Hi%20Jeevan,%0A%0AI%20found%20your%20portfolio%20and%20would%20like%20to%20discuss%20an%20opportunity.%0A%0ALooking%20forward%20to%20hearing%20from%20you.',
    color: '#6366f1',
    target: undefined
  },
  {
    id: 'linkedin',
    icon: FaLinkedinIn,
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/jeevan-bodlapati/',
    color: '#0ea5e9',
    target: '_blank'
  },
  {
    id: 'github',
    icon: FaGithub,
    label: 'GitHub',
    href: 'https://github.com/BodlapatiJeevan160',
    color: '#ffffff',
    target: '_blank'
  },
  {
    id: 'resume',
    icon: Download,
    label: 'Download Resume',
    href: '/resumes/Jeevan_Bodlapati_Resume_AIEngineer.pdf',
    color: '#a855f7',
    target: '_blank',
    download: 'Jeevan_Bodlapati_Resume_AIEngineer.pdf'
  },
  {
    id: 'phone',
    icon: Phone,
    label: (
      <>
        <span className="sm:hidden">Call Me</span>
        <span className="hidden sm:block">+91 90143 45907</span>
      </>
    ),
    href: 'tel:+919014345907',
    color: '#06b6d4',
    target: undefined
  }
]

const reasons = [
  'One-click WhatsApp conversation',
  'Instant email contact',
  'Direct LinkedIn profile',
  'GitHub projects',
  'Resume download',
  'Usually replies within 24 hours'
]

export default function Contact() {
  const [ref, inView] = useInView(0.1)

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
            Ready to build AI-powered products together? I'm actively seeking full-time opportunities, internships, freelance projects, and AI collaborations.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-10">
          {/* Left Panel */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="md:col-span-1 lg:col-span-2 space-y-6"
          >
            <div className="glass-card rounded-2xl p-7 h-full flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <Globe size={24} className="text-primary-400" />
                  <h3 className="font-bold text-white text-xl">Open to Opportunities</h3>
                </div>
                
                <p className="text-gray-400 text-sm mb-4">
                  I'm currently looking for opportunities in:
                </p>
                
                <ul className="space-y-3 mb-8">
                  {roles.map((role, idx) => (
                    <li key={idx} className="flex items-center gap-3 text-white text-sm font-medium">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary-400" />
                      {role}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="space-y-4 pt-6 border-t border-white/5">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center border border-white/10">
                    <MapPin size={18} className="text-[#06b6d4]" />
                  </div>
                  <div>
                    <div className="text-xs text-gray-500">Location</div>
                    <div className="text-sm font-semibold text-white">📍 Hyderabad, India</div>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center border border-white/10">
                    <CheckCircle2 size={18} className="text-[#25D366]" />
                  </div>
                  <div>
                    <div className="text-xs text-gray-500">Availability</div>
                    <div className="text-sm font-semibold text-white">🟢 Open to Work</div>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center border border-white/10">
                    <Clock size={18} className="text-[#a855f7]" />
                  </div>
                  <div>
                    <div className="text-xs text-gray-500">Response Time</div>
                    <div className="text-sm font-semibold text-white">⚡ Usually replies within 24 hours</div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Panel - Actions */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="md:col-span-1 lg:col-span-3 flex flex-col gap-6"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {contactMethods.map(({ id, icon: Icon, label, href, color, target, download }) => (
                <a
                  key={id}
                  href={href}
                  target={target}
                  rel={target === '_blank' ? 'noopener noreferrer' : undefined}
                  download={download}
                  className="glass-card-hover group flex flex-col items-center justify-center p-8 rounded-2xl transition-all duration-300 hover:scale-[1.02]"
                  style={{
                    background: 'rgba(255,255,255,0.03)',
                    border: '1px solid rgba(255,255,255,0.08)',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.background = `${color}15`
                    e.currentTarget.style.borderColor = `${color}40`
                    e.currentTarget.style.boxShadow = `0 0 20px ${color}20`
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.background = 'rgba(255,255,255,0.03)'
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'
                    e.currentTarget.style.boxShadow = 'none'
                  }}
                >
                  <div 
                    className="w-14 h-14 rounded-xl flex items-center justify-center mb-4 transition-transform duration-300 group-hover:-translate-y-1"
                    style={{ background: `${color}20`, border: `1px solid ${color}40` }}
                  >
                    <Icon size={24} style={{ color }} />
                  </div>
                  <span className="text-white font-semibold text-center">{label}</span>
                </a>
              ))}
            </div>

            {/* Bottom Info Card */}
            <div className="glass-card rounded-2xl p-6 mt-2">
              <h4 className="text-white font-semibold mb-4 flex items-center gap-2">
                <MessageSquare size={18} className="text-primary-400" />
                Why Recruiters Prefer This
              </h4>
              <div className="grid sm:grid-cols-2 gap-3">
                {reasons.map((reason, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-sm text-gray-400">
                    <CheckCircle2 size={14} className="text-green-400 flex-shrink-0" />
                    {reason}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
