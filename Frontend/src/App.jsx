import { useState, useEffect, useRef, Suspense, lazy } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Footer from './components/Footer'
import GlobalBackground from './components/GlobalBackground'

// Lazy loaded components to reduce initial bundle size (Performance Optimization)
const About = lazy(() => import('./components/About'))
const Skills = lazy(() => import('./components/Skills'))
const Projects = lazy(() => import('./components/Projects'))
const Experience = lazy(() => import('./components/Experience'))
const RecruiterHighlights = lazy(() => import('./components/RecruiterHighlights'))
const Certifications = lazy(() => import('./components/Certifications'))
const Resumes = lazy(() => import('./components/Resumes'))
const AIResumeGenerator = lazy(() => import('./components/AIResumeGenerator'))
const Contact = lazy(() => import('./components/Contact'))

// Loading fallback component
const Loader = () => (
  <div className="flex items-center justify-center min-h-[50vh] text-cyan-400 opacity-50">
    <div className="w-8 h-8 rounded-full border-2 border-cyan-400 border-t-transparent animate-spin" />
  </div>
)

function App() {
  const [activeSection, setActiveSection] = useState('home')
  const [scrolled, setScrolled] = useState(false)
  const [introState, setIntroState] = useState('waiting')
  const [fadeIntro, setFadeIntro] = useState(false)
  const videoRef = useRef(null)

  const handleIntroEnd = () => {
    setFadeIntro(true)
    setTimeout(() => {
      setIntroState('finished')
    }, 1200) // Cinematic slow fade
  }

  const startIntro = () => {
    setIntroState('playing')
    if (videoRef.current) {
      videoRef.current.play().catch(e => console.error('Video playback failed', e))
    }
  }

  useEffect(() => {
    if (introState !== 'finished') {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'auto'
    }
  }, [introState])

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)

      const sections = ['home', 'about', 'skills', 'projects', 'experience', 'recruiter', 'certifications', 'resumes', 'generator', 'contact']
      const scrollPos = window.scrollY + 100

      for (const section of sections) {
        const el = document.getElementById(section)
        if (el) {
          const { offsetTop, offsetHeight } = el
          if (scrollPos >= offsetTop && scrollPos < offsetTop + offsetHeight) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      {introState !== 'finished' && (
        <div 
          className={`fixed inset-0 z-[100] flex items-center justify-center bg-black transition-opacity duration-1000 ease-in-out ${fadeIntro ? 'opacity-0' : 'opacity-100'}`}
          onClick={introState === 'waiting' ? startIntro : undefined}
        >
          {introState === 'waiting' && (
            <div className="absolute inset-0 flex flex-col items-center justify-center z-[120] text-white cursor-pointer group">
              <div className="text-5xl md:text-7xl font-bold tracking-[0.3em] uppercase mb-10 opacity-90 transition-transform duration-700 group-hover:scale-105">
                Portfolio
              </div>
              <div className="text-sm md:text-base font-light tracking-[0.4em] uppercase opacity-60 animate-pulse">
                Click Anywhere to Enter
              </div>
            </div>
          )}
          
          <video
            ref={videoRef}
            playsInline
            onEnded={handleIntroEnd}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${introState === 'playing' ? 'opacity-100' : 'opacity-0'}`}
          >
            <source src="/intro.mp4" type="video/mp4" />
          </video>

          {introState === 'playing' && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleIntroEnd();
              }}
              className="absolute top-8 right-8 z-[130] px-6 py-3 bg-black/40 hover:bg-black/60 backdrop-blur-xl text-white border border-white/10 rounded-full transition-all duration-300 text-xs font-semibold tracking-[0.2em] flex items-center gap-3 uppercase group"
            >
              Skip Intro
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          )}
        </div>
      )}

      <div className={`noise relative min-h-screen bg-dark-900 text-white overflow-x-hidden transition-all duration-1000 ease-in-out ${introState === 'finished' || fadeIntro ? 'opacity-100 blur-none' : 'opacity-0 blur-lg h-screen overflow-hidden'}`}>
        {/* Global ambient background */}
        <div className="fixed inset-0 pointer-events-none z-0">
          <div className="absolute top-1/4 -left-40 w-96 h-96 rounded-full opacity-10 blur-3xl"
            style={{ background: 'radial-gradient(circle, #6366f1, transparent)' }} />
          <div className="absolute top-3/4 -right-40 w-96 h-96 rounded-full opacity-10 blur-3xl"
            style={{ background: 'radial-gradient(circle, #a855f7, transparent)' }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-5 blur-3xl"
            style={{ background: 'radial-gradient(circle, #06b6d4, transparent)' }} />
        </div>

        <GlobalBackground />
      
        <div className={`transition-opacity duration-1000 delay-700 ${introState === 'finished' ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
          <Navbar activeSection={activeSection} scrolled={scrolled} />
        </div>

        <main>
          {/* Eagerly load Hero as it is critical above-the-fold content */}
          <Hero />
          
          <Suspense fallback={<Loader />}>
            <About />
            <Skills />
            <Projects />
            <Experience />
            <RecruiterHighlights />
            <Certifications />
            <Resumes />
            <AIResumeGenerator />
            <Contact />
          </Suspense>
        </main>

        <Footer />
      </div>
    </>
  )
}

export default App
