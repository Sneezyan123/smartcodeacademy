import Visit from '@/components/Visit/Visit'
import HeroSection from '@/components/HeroSection/HeroSection'
import ContactForm from '@/components/ContactForm/ContactForm'
import Testimonials from '@/components/Testimonials/Testimonials'
import FAQ from '@/components/FAQ/FAQ'
import Header from '@/components/Header/Header'
export default function Home() {
	return (
		<div>
			<div className='overflow-x-hidden'>
				{/* Hero Section - Головна секція з інтро */}
				<Visit />

				{/* Features Section - Секція з функціями та можливостями */}
				<Testimonials />
				<HeroSection />

				{/* Testimonials Section - Відгуки студентів */}

				{/* Contact Form Section - Форма зв'язку */}
				<ContactForm />

				{/* FAQ Section - Часті питання */}
				<FAQ />
			</div>
		</div>
	)
}
