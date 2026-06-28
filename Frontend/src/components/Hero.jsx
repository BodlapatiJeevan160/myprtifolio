import { useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ChevronDown, Activity, Cpu, Database, Network } from 'lucide-react';

export default function Hero() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth out mouse values for parallax
  const springConfig = { damping: 20, stiffness: 100, mass: 0.5 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  // Background parallax (moves slightly opposite to mouse)
  const bgX = useTransform(smoothX, [-0.5, 0.5], ['2%', '-2%']);
  const bgY = useTransform(smoothY, [-0.5, 0.5], ['2%', '-2%']);

  // Content parallax (moves with mouse)
  const contentX = useTransform(smoothX, [-0.5, 0.5], ['-3%', '3%']);
  const contentY = useTransform(smoothY, [-0.5, 0.5], ['-3%', '3%']);
  
  // 3D Tilt for holographic panels
  const rotateX = useTransform(smoothY, [-0.5, 0.5], [10, -10]);
  const rotateY = useTransform(smoothX, [-0.5, 0.5], [-10, 10]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      // Normalize mouse position between -0.5 and 0.5
      mouseX.set(e.clientX / window.innerWidth - 0.5);
      mouseY.set(e.clientY / window.innerHeight - 0.5);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <section
      id="home"
      className="relative h-screen w-full overflow-hidden flex items-center justify-center perspective-1000"
    >
      {/* Cinematic Background Video with Parallax */}
      <motion.div 
        style={{ x: bgX, y: bgY, scale: 1.05 }}
        className="absolute inset-0 w-full h-full z-0"
      >
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-60"
        >
          <source src="/intro.mp4" type="video/mp4" />
        </video>
        
        {/* Holographic scanning overlay */}
        <div className="absolute inset-0 mix-blend-overlay opacity-30 bg-grid"></div>
        <div className="scanline"></div>
      </motion.div>

      {/* Dark volumetric glow overlay */}
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-black/20 via-black/50 to-dark-900 hero-overlay"></div>

      {/* Light Rays */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-20"
        style={{
          background: 'conic-gradient(from 180deg at 50% 0%, transparent 40%, #6366f1 50%, transparent 60%)',
          filter: 'blur(40px)',
          transform: 'scale(2) translateY(-20%)'
        }}
      />

      {/* Main Content with 3D Parallax */}
      <motion.div 
        style={{ x: contentX, y: contentY }}
        className="relative z-10 w-full max-w-7xl mx-auto px-4 flex flex-col items-center transform-style-3d"
      >
        
        {/* Floating Holographic UI - Left */}
        <motion.div 
          style={{ rotateX, rotateY }}
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.2, delay: 0.5 }}
          className="hidden lg:flex absolute left-0 top-1/4 flex-col gap-4 glass-card p-4 rounded-xl border-glow"
        >
          <div className="flex items-center gap-3 text-cyan-400">
            <Activity size={18} />
            <span className="text-xs font-mono tracking-widest uppercase">System Online</span>
          </div>
          <div className="w-32 h-[1px] bg-cyan-400/30"></div>
          <div className="flex items-center gap-3 text-indigo-400">
            <Cpu size={18} />
            <span className="text-xs font-mono tracking-widest uppercase">Neural Net Sync</span>
          </div>
        </motion.div>

        {/* Floating Holographic UI - Right */}
        <motion.div 
          style={{ rotateX, rotateY }}
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.2, delay: 0.7 }}
          className="hidden lg:flex absolute right-0 top-1/3 flex-col gap-4 glass-card p-4 rounded-xl border-glow"
        >
          <div className="flex items-center gap-3 text-purple-400">
            <span className="text-xs font-mono tracking-widest uppercase">Data Flow</span>
            <Database size={18} />
          </div>
          <div className="w-32 h-[1px] bg-purple-400/30 self-end"></div>
          <div className="flex items-center gap-3 text-pink-400">
            <span className="text-xs font-mono tracking-widest uppercase">Core Access</span>
            <Network size={18} />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8, filter: 'blur(10px)' }}
          animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="text-center"
        >
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="inline-block mb-4 px-4 py-1.5 rounded-full glass-card border-glow"
          >
            <span className="text-xs md:text-sm font-mono tracking-widest uppercase text-cyan-400">
              Initializing Protocol...
            </span>
          </motion.div>

          <h1 className="text-white text-4xl sm:text-6xl md:text-8xl font-bold tracking-tight mb-4 text-shadow-glow">
            Hi, I'm <span className="gradient-text">Jeevan</span>
          </h1>

          <h2 className="text-white text-xl sm:text-2xl md:text-4xl mt-4 font-light tracking-wide">
            AI Engineer <span className="text-indigo-500 font-bold mx-2">|</span> Prompt Engineer
          </h2>

          <p className="text-gray-300 mt-6 max-w-2xl mx-auto text-lg md:text-xl font-light">
            Architecting the future through <span className="text-purple-400 font-medium">Machine Learning</span>, <span className="text-cyan-400 font-medium">Automation</span>, and <span className="text-pink-400 font-medium">Intelligent Systems</span>.
          </p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.8 }}
            className="mt-12 flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center w-full sm:w-auto px-4"
          >
            <a href="#projects" className="btn-primary w-full sm:w-auto text-center justify-center">
              Initialize Sequence
            </a>
            <a href="#contact" className="btn-outline glass-card w-full sm:w-auto text-center justify-center">
              Establish Uplink
            </a>
          </motion.div>
        </motion.div>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-cyan-400 scroll-indicator z-20 mix-blend-screen"
      >
        <ChevronDown size={32} />
      </motion.div>
    </section>
  );
}
