import { useEffect, useRef } from 'react'

const bayerMatrix = [
  [0, 8, 2, 10],
  [12, 4, 14, 6],
  [3, 11, 1, 9],
  [15, 7, 13, 5],
]

export default function DitherCanvas() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let width, height, time = 0
    let animId

    function resize() {
      width = canvas.parentElement.clientWidth
      height = canvas.parentElement.clientHeight
      canvas.width = width
      canvas.height = height
    }

    function draw() {
      ctx.fillStyle = '#0d0d0d'
      ctx.fillRect(0, 0, width, height)
      const gridSize = 8
      const cols = Math.ceil(width / gridSize)
      const rows = Math.ceil(height / gridSize)
      const waveCenterY = rows / 2

      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
          const wave1 = Math.sin(x * 0.05 + time) * (rows / 4)
          const distFromWave = Math.abs(y - (waveCenterY + wave1))
          let intensity = Math.max(0, 1 - distFromWave / 20)
          const threshold = bayerMatrix[y % 4][x % 4] / 16 - 0.5

          if (intensity + threshold > 0.4) {
            ctx.fillStyle = 'rgba(255,255,255,0.1)'
            ctx.fillRect(x * gridSize, y * gridSize, gridSize - 2, gridSize - 2)
          }
        }
      }
      time += 0.01
      animId = requestAnimationFrame(draw)
    }

    resize()
    draw()
    window.addEventListener('resize', resize)

    return () => {
      window.removeEventListener('resize', resize)
      cancelAnimationFrame(animId)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        opacity: 0.15,
        pointerEvents: 'none',
      }}
    />
  )
}
