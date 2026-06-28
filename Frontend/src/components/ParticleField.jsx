import { useEffect, useRef } from 'react'

export default function ParticleField() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let animId
    let particles = []
    
    // Mouse interaction
    let mouse = { x: null, y: null, radius: 150 }

    const handleMouseMove = (e) => {
      mouse.x = e.clientX
      mouse.y = e.clientY
    }

    const handleMouseOut = () => {
      mouse.x = null
      mouse.y = null
    }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseout', handleMouseOut)

    const resize = () => {
      canvas.width  = window.innerWidth
      canvas.height = window.innerHeight
    }

    resize()
    window.addEventListener('resize', resize)

    class Particle {
      constructor() { this.reset() }
      reset() {
        this.x    = Math.random() * canvas.width
        this.y    = Math.random() * canvas.height
        this.size = Math.random() * 2 + 0.5
        this.speedX = (Math.random() - 0.5) * 0.5
        this.speedY = (Math.random() - 0.5) * 0.5
        this.opacity = Math.random() * 0.6 + 0.2
        this.color = Math.random() > 0.5 ? '#6366f1' : '#a855f7'
        this.baseX = this.x
        this.baseY = this.y
      }
      update() {
        this.x += this.speedX
        this.y += this.speedY

        // Bounce off edges
        if (this.x < 0 || this.x > canvas.width) this.speedX *= -1
        if (this.y < 0 || this.y > canvas.height) this.speedY *= -1

        // Mouse interaction (push particles slightly)
        if (mouse.x != null && mouse.y != null) {
          let dx = mouse.x - this.x
          let dy = mouse.y - this.y
          let distance = Math.sqrt(dx * dx + dy * dy)
          if (distance < mouse.radius) {
            const forceDirectionX = dx / distance
            const forceDirectionY = dy / distance
            const force = (mouse.radius - distance) / mouse.radius
            const directionX = forceDirectionX * force * 2
            const directionY = forceDirectionY * force * 2
            this.x -= directionX
            this.y -= directionY
          }
        }
      }
      draw() {
        ctx.save()
        ctx.globalAlpha = this.opacity
        ctx.fillStyle   = this.color
        ctx.shadowBlur  = 10
        ctx.shadowColor = this.color
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fill()
        ctx.restore()
      }
    }

    for (let i = 0; i < 120; i++) particles.push(new Particle()) // Increased particle count

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      particles.forEach(p => { p.update(); p.draw() })

      // Draw connections
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const dist = Math.sqrt(dx * dx + dy * dy)
          
          if (dist < 100) {
            ctx.save()
            ctx.globalAlpha = (1 - dist / 100) * 0.25
            ctx.strokeStyle = particles[i].color
            ctx.lineWidth   = 0.8
            ctx.beginPath()
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.stroke()
            ctx.restore()
          }
        }

        // Connection to mouse
        if (mouse.x != null && mouse.y != null) {
          const dx = particles[i].x - mouse.x
          const dy = particles[i].y - mouse.y
          const dist = Math.sqrt(dx * dx + dy * dy)
          
          if (dist < 150) {
            ctx.save()
            ctx.globalAlpha = (1 - dist / 150) * 0.4
            ctx.strokeStyle = '#06b6d4' // Neon blue connection to mouse
            ctx.lineWidth = 1.2
            ctx.shadowBlur = 10
            ctx.shadowColor = '#06b6d4'
            ctx.beginPath()
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(mouse.x, mouse.y)
            ctx.stroke()
            ctx.restore()
          }
        }
      }

      animId = requestAnimationFrame(animate)
    }

    animate()
    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseout', handleMouseOut)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 opacity-60 mix-blend-screen"
    />
  )
}
