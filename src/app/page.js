import ContactForm from "@/components/ContactForm"
import HeroSection from "@/components/HeroSection"
import Testimonials from "@/components/Testimonials"
import Visit from "@/components/Visit"
import FAQ from "@/components/FAQ"



export default function Home() {
  return (
    <div>
      <Visit/>
      <ContactForm/>
      <HeroSection/>
      <Testimonials/>
      <FAQ/>
    </div>
  )
  }