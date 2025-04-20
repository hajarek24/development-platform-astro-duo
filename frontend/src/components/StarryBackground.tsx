import { useEffect, useRef } from 'react'
import { Box } from '@chakra-ui/react'

class Star {
  x: number
  y: number
  size: number
  speedX: number
  speedY: number
  opacity: number
  twinkleSpeed: number
  twinklePhase: number

  constructor(canvasWidth: number, canvasHeight: number) {
    this.x = Math.random() * canvasWidth
    this.y = Math.random() * canvasHeight
    this.size = Math.random() * 1.5 + 1
    
    // Random direction movement
    const angle = Math.random() * Math.PI * 2
    const speed = Math.random() * 0.2 + 0.1
    this.speedX = Math.cos(angle) * speed
    this.speedY = Math.sin(angle) * speed
    
    this.opacity = Math.random() * 0.5 + 0.5
    this.twinkleSpeed = Math.random() * 0.05 + 0.02
    this.twinklePhase = Math.random() * Math.PI * 2
  }

  update(canvasWidth: number, canvasHeight: number) {
    // Update position
    this.x += this.speedX
    this.y += this.speedY

    // Wrap around screen edges
    if (this.x < 0) this.x = canvasWidth
    if (this.x > canvasWidth) this.x = 0
    if (this.y < 0) this.y = canvasHeight
    if (this.y > canvasHeight) this.y = 0

    // Update twinkle
    this.twinklePhase += this.twinkleSpeed
    const currentOpacity = this.opacity * (0.7 + 0.3 * Math.sin(this.twinklePhase))
    
    return currentOpacity
  }

  draw(ctx: CanvasRenderingContext2D, opacity: number) {
    // Create a glow effect
    const glow = this.size * 2
    const gradient = ctx.createRadialGradient(
      this.x, this.y, 0,
      this.x, this.y, glow
    )
    
    gradient.addColorStop(0, `rgba(255, 255, 255, ${opacity})`)
    gradient.addColorStop(0.4, `rgba(255, 255, 255, ${opacity * 0.6})`)
    gradient.addColorStop(1, 'rgba(255, 255, 255, 0)')

    ctx.beginPath()
    ctx.fillStyle = gradient
    ctx.arc(this.x, this.y, glow, 0, Math.PI * 2)
    ctx.fill()

    // Draw the core of the star
    ctx.beginPath()
    ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
    ctx.fill()
  }
}

const StarryBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const starsRef = useRef<Star[]>([])
  const animationFrameRef = useRef<number>()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      // Create stars
      starsRef.current = Array.from({ length: 200 }, () => new Star(canvas.width, canvas.height))
    }

    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    const animate = () => {
      if (!ctx || !canvas) return

      // Clear the canvas with very dark background
      ctx.fillStyle = 'rgba(0, 0, 0, 0.8)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      starsRef.current.forEach(star => {
        const opacity = star.update(canvas.width, canvas.height)
        star.draw(ctx, opacity)
      })

      animationFrameRef.current = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
      window.removeEventListener('resize', resizeCanvas)
    }
  }, [])

  return (
    <Box
      position="fixed"
      top={0}
      left={0}
      width="100%"
      height="100%"
      zIndex={0}
      overflow="hidden"
      bg="black"
    >
      <canvas
        ref={canvasRef}
        style={{
          width: '100%',
          height: '100%',
          display: 'block',
        }}
      />
    </Box>
  )
}

export default StarryBackground 