'use client'

import dynamic from 'next/dynamic'
import { useEffect } from 'react'

const Visit = dynamic(() => import('@/components/Visit/Visit'), { ssr: false })
const HeroSection = dynamic(() => import('@/components/HeroSection/HeroSection'), { ssr: false })
const ContactForm = dynamic(() => import('@/components/ContactForm/ContactForm'), { ssr: false })
const Testimonials = dynamic(() => import('@/components/Testimonials/Testimonials'), { ssr: false })
const FAQ = dynamic(() => import('@/components/FAQ/FAQ'), { ssr: false })

export default function HomeClient() {
  useEffect(() => {
    // Smooth-scroll to hash target once components are mounted (handles dynamically loaded sections)
    const attemptScrollToHash = () => {
      const hash = typeof window !== 'undefined' ? window.location.hash : ''
      const id = hash ? hash.substring(1) : ''
      if (!id) return

      let attempts = 0
      const maxAttempts = 12
      const intervalMs = 150

      const intervalId = setInterval(() => {
        attempts += 1
        const target = document.getElementById(id)
        if (target) {
          target.scrollIntoView({ behavior: 'smooth', block: 'start' })
          clearInterval(intervalId)
        } else if (attempts >= maxAttempts) {
          clearInterval(intervalId)
        }
      }, intervalMs)
    }

    // Initial attempt on mount
    attemptScrollToHash()

    // Also respond to hash changes while on the page
    const onHashChange = () => attemptScrollToHash()
    window.addEventListener('hashchange', onHashChange, { passive: true })
    return () => window.removeEventListener('hashchange', onHashChange)
  }, [])

  return (
    <div>
      <div className='overflow-x-hidden'>
        <Visit />
        <Testimonials />
        <HeroSection />
        <ContactForm />
        <FAQ />
      </div>
    </div>
  )
}



