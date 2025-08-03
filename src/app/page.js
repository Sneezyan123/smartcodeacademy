import Visit from '@/components/Visit'
import HeroSection from '@/components/HeroSection'
import ContactForm from '@/components/ContactForm'
import Testimonials from '@/components/Testimonials'
import FAQ from '@/components/FAQ'

export default function Home() {
	return (
		<div className='overflow-x-hidden'>
			{/* Hero Section - Головна секція з інтро */}
			<Visit />

			{/* Features Section - Секція з функціями та можливостями */}
			<HeroSection />

			{/* Testimonials Section - Відгуки студентів */}
			<Testimonials />

			{/* Contact Form Section - Форма зв'язку */}
			<ContactForm />

			{/* FAQ Section - Часті питання */}
			<FAQ />
		</div>
	)
}
