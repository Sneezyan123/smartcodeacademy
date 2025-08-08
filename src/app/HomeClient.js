'use client'

import dynamic from 'next/dynamic'

const Visit = dynamic(() => import('@/components/Visit/Visit'), { ssr: false })
const HeroSection = dynamic(() => import('@/components/HeroSection/HeroSection'), { ssr: false })
const ContactForm = dynamic(() => import('@/components/ContactForm/ContactForm'), { ssr: false })
const Testimonials = dynamic(() => import('@/components/Testimonials/Testimonials'), { ssr: false })
const FAQ = dynamic(() => import('@/components/FAQ/FAQ'), { ssr: false })

export default function HomeClient() {
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



