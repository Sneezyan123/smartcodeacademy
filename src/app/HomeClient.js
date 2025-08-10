"use client"

import dynamic from 'next/dynamic'
import { useEffect } from 'react'

// Lightweight skeletons to keep layout stable while chunks load
const SectionSkeleton = ({ height = '60vh' }) => (
  <div style={{ minHeight: height, width: '100%' }} />
)
const HeroSkeleton = () => <SectionSkeleton height='75vh' />

// Enable SSR (default) and provide client-side loading fallbacks.
// Removing ssr:false prevents the server from sending an empty <main>,
// which previously let the footer appear first.
const HeroSection = dynamic(() => import('@/components/HeroSection/HeroSection'), {
  loading: () => <HeroSkeleton />,
})
const Visit = dynamic(() => import('@/components/Visit/Visit'), {
  loading: () => <SectionSkeleton height='1200px' />,
})
const Testimonials = dynamic(() => import('@/components/Testimonials/Testimonials'), {
  loading: () => <SectionSkeleton height='800px' />,
})
const FAQ = dynamic(() => import('@/components/FAQ/FAQ'), {
  loading: () => <SectionSkeleton height='800px' />,
})

export default function HomeClient() {
  // Прибрали поведінку з hash, щоб уникнути гонок відкриття модалки

  useEffect(() => {
    // Авто-відкриття модалки, коли користувач дійшов до середини сторінки (одноразово за сесію)
    try {
      if (typeof window !== 'undefined' && sessionStorage.getItem('contactModalShownMid') === '1') {
        return
      }
    } catch {}

    let triggered = false
    const onScroll = () => {
      const doc = document.documentElement
      const scrollTop = window.scrollY || doc.scrollTop || 0
      const docHeight = doc.scrollHeight
      const winHeight = window.innerHeight || doc.clientHeight
      const maxScrollable = Math.max(1, docHeight - winHeight)
      const ratio = scrollTop / maxScrollable
      if (!triggered && ratio >= 0.5) {
        triggered = true
        window.dispatchEvent(new Event('openContactModal'))
        try { sessionStorage.setItem('contactModalShownMid', '1') } catch {}
        window.removeEventListener('scroll', onScroll)
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    // Перевірка відразу після завантаження (раптом вже внизу)
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div>
      <div className='overflow-x-hidden'>
        <Visit />
        <Testimonials />
        <HeroSection />
        <FAQ />
      </div>
    </div>
  )
}
