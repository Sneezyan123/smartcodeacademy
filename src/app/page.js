import Visit from '@/components/Visit'
import HeroSection from '@/components/HeroSection'
import ContactForm from '@/components/ContactForm'
import Testimonials from '@/components/Testimonials'
import FAQ from '@/components/FAQ'

export default function Home() {
	return (
		<div className='overflow-x-hidden'>
			<Visit />
			<HeroSection />
			<Testimonials />
			<ContactForm />
			<FAQ />
		</div>
	)
}
