'use client'

import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

const pinkColors = ['#ff9bb3', '#ffb1c3', '#ffc0d1', '#ff8ca8', '#ffb7c5', '#ffd3df']
const blackColors = ['#111111', '#1b1b1b', '#242424', '#000000', '#2a2a2a', '#0d0d0d']

type SakuraTheme = 'mixed' | 'pink' | 'black'

export default function SakuraFalling() {
  const pathname = usePathname()
  const [theme, setTheme] = useState<SakuraTheme>('mixed')

  useEffect(() => {
    const handleThemeChange = (event: Event) => {
      const customEvent = event as CustomEvent<{ mode?: SakuraTheme }>
      const nextMode = customEvent.detail?.mode ?? 'mixed'
      if (nextMode === 'mixed' || nextMode === 'pink' || nextMode === 'black') {
        setTheme(nextMode)
      }
    }

    window.addEventListener('kagenoir-sakura-theme', handleThemeChange)
    return () => window.removeEventListener('kagenoir-sakura-theme', handleThemeChange)
  }, [])

  useEffect(() => {
    if (pathname === '/') {
      setTheme('mixed')
      return
    }

    setTheme((current) => current)
  }, [pathname])

  useEffect(() => {
    if (pathname === '/') {
      return
    }

    const layer = document.createElement('div')
    layer.className = 'sakura-layer'
    document.body.appendChild(layer)

    const getColor = () => {
      if (theme === 'pink') return pinkColors[Math.floor(Math.random() * pinkColors.length)]
      if (theme === 'black') return blackColors[Math.floor(Math.random() * blackColors.length)]
      return Math.random() < 0.5
        ? pinkColors[Math.floor(Math.random() * pinkColors.length)]
        : blackColors[Math.floor(Math.random() * blackColors.length)]
    }

    const createPetal = (options?: { x?: number; y?: number; burst?: boolean }) => {
      const petal = document.createElement('span')
      const size = (Math.random() * 16 + 10) * (options?.burst ? 0.8 : 1)
      const color = getColor()

      petal.className = options?.burst ? 'sakura-petal sakura-petal-burst' : 'sakura-petal'
      petal.style.width = `${size}px`
      petal.style.height = `${size * 1.45}px`
      petal.style.background = `linear-gradient(135deg, ${color}, rgba(255, 255, 255, 0.12))`

      if (options?.burst) {
        const angle = Math.random() * Math.PI * 2
        const distance = 55 + Math.random() * 140
        petal.style.left = `${options.x ?? 0}px`
        petal.style.top = `${options.y ?? 0}px`
        petal.style.setProperty('--burst-x', `${Math.cos(angle) * distance}px`)
        petal.style.setProperty('--burst-y', `${Math.sin(angle) * distance}px`)
        petal.style.animationDuration = `${0.7 + Math.random() * 0.6}s`
      } else {
        const left = Math.random() * 100
        const drift = (Math.random() - 0.5) * 200
        const duration = Math.random() * 10 + 14
        const delay = Math.random() * 4

        petal.style.left = `${left}%`
        petal.style.setProperty('--drift', `${drift}px`)
        petal.style.animationDuration = `${duration}s`
        petal.style.animationDelay = `${delay}s`
      }

      layer.appendChild(petal)

      const life = options?.burst ? 1400 : (Number.parseFloat(petal.style.animationDuration || '14') * 1000) + 1500

      setTimeout(() => {
        petal.remove()
      }, life)
    }

    const spawnPetal = () => {
      createPetal()
    }

    const spawnBurst = (x: number, y: number) => {
      const burstCount = 12 + Math.floor(Math.random() * 10)
      for (let i = 0; i < burstCount; i += 1) {
        createPetal({ x, y, burst: true })
      }
    }

    let timer = 0

    const tick = () => {
      const perBurst = 2 + Math.floor(Math.random() * 2)
      for (let i = 0; i < perBurst; i += 1) {
        spawnPetal()
      }
      timer = window.setTimeout(tick, 900 + Math.random() * 1400)
    }

    tick()

    const handlePointerDown = (event: PointerEvent) => {
      spawnBurst(event.clientX, event.clientY)
    }

    window.addEventListener('pointerdown', handlePointerDown)

    return () => {
      window.clearTimeout(timer)
      window.removeEventListener('pointerdown', handlePointerDown)
      layer.remove()
    }
  }, [pathname, theme])

  if (pathname === '/') return null

  return null
}
