'use client'

import React, { useState, useEffect, useRef } from 'react'
import {
	Star,
	Quote,
	ChevronLeft,
	ChevronRight,
	Users,
	Award,
	Heart,
} from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import styles from './Testimonials.module.css'

// Реєструємо ScrollTrigger
gsap.registerPlugin(ScrollTrigger)

const Testimonials = () => {
	const [currentTestimonial, setCurrentTestimonial] = useState(0)
	const [isVisible, setIsVisible] = useState(false)
	const sectionRef = useRef(null)
	const testimonialsRef = useRef(null)

	useEffect(() => {
		const timer = setTimeout(() => setIsVisible(true), 300)
		
		// GSAP анімації входу при скролі
		if (sectionRef.current) {
			gsap.fromTo(sectionRef.current.querySelectorAll('.fade-in-up'),
				{ y: 50, opacity: 0 },
				{ 
					y: 0, 
					opacity: 1, 
					duration: 0.8, 
					ease: 'power3.out',
					stagger: 0.2,
					scrollTrigger: {
						trigger: sectionRef.current,
						start: 'top 80%',
						end: 'bottom 20%',
						toggleActions: 'play none none reverse'
					}
				}
			)

			gsap.fromTo(sectionRef.current.querySelectorAll('.slide-in-left'),
				{ x: -50, opacity: 0 },
				{ 
					x: 0, 
					opacity: 1, 
					duration: 0.6, 
					ease: 'power2.out',
					stagger: 0.1,
					scrollTrigger: {
						trigger: sectionRef.current,
						start: 'top 70%',
						toggleActions: 'play none none reverse'
					}
				}
			)
		}
		
		return () => clearTimeout(timer)
	}, [])

	// Професійна анімація зміни відгуків
	const animateTestimonialChange = (newIndex) => {
		if (!testimonialsRef.current || newIndex === currentTestimonial) return
		
		const timeline = gsap.timeline()
		
		// Анімація виходу поточного відгуку
		timeline.to(testimonialsRef.current.querySelectorAll('.testimonial-content'), {
			y: -30,
			opacity: 0,
			duration: 0.3,
			ease: 'power2.in'
		})
		
		// Зміна відгуку
		timeline.call(() => {
			setCurrentTestimonial(newIndex)
		})
		
		// Анімація входу нового відгуку
		timeline.fromTo(testimonialsRef.current.querySelectorAll('.testimonial-content'), 
			{ y: 30, opacity: 0 },
			{
				y: 0,
				opacity: 1,
				duration: 0.5,
				ease: 'back.out(1.7)',
				stagger: 0.05
			}
		)
	}

	const testimonials = [
		{
			id: 1,
			name: 'Костя Горілов',
			age: 16,
			position: 'Випускник SmartCode Academy',
			company: 'Junior Developer в стартапі',
			rating: 5,
			text: 'SmartCode Academy - це найкраща школа програмування! Завдяки якісному навчанню та підтримці менторів я зміг освоїти Python та створити свій перший додаток. Тепер я навіть підробляю як джуніор розробник!',
			avatar: '👨‍💻',
			course: 'Python & Web Development',
			duration: '8 місяців',
			achievement: 'Створив власний додаток',
			gradient: 'blue',
		},
		{
			id: 2,
			name: 'Анастасія Суханова',
			age: 15,
			position: 'Випускниця SmartCode Academy',
			company: 'Фрілансер веб-дизайнер',
			rating: 5,
			text: 'Навчання в SmartCode Academy змінило моє життя! Тут я не тільки вивчила HTML, CSS та JavaScript, але й навчилася працювати в команді. Тепер я створюю сайти для малого бізнесу та заробляю власні гроші.',
			avatar: '👩‍💻',
			course: 'Frontend Development',
			duration: '6 місяців',
			achievement: 'Запустила власне агентство',
			gradient: 'purple',
		},
		{
			id: 3,
			name: 'Богдан Яремчук',
			age: 14,
			position: 'Студент SmartCode Academy',
			company: 'Переможець хакатону',
			rating: 5,
			text: 'В SmartCode Academy я знайшов друзів-однодумців та створив свою першу гру в Unity! Викладачі завжди готові допомогти, а навчальна платформа дуже зручна. Рекомендую всім, хто хоче стати програмістом!',
			avatar: '👨‍🎓',
			course: 'Game Development',
			duration: '10 місяців',
			achievement: '1-е місце на хакатоні',
			gradient: 'green',
		},
		{
			id: 4,
			name: 'Влад Шульженко',
			age: 17,
			position: 'Випускник SmartCode Academy',
			company: 'Студент технічного ВНЗ',
			rating: 5,
			text: 'Завдяки SmartCode Academy я вступив до технічного університету з відмінною підготовкою! Знання програмування, які я отримав тут, допомагають мені бути кращим за однокурсників. Дуже вдячний за якісну освіту!',
			avatar: '🧑‍💻',
			course: 'Full-Stack Development',
			duration: '12 місяців',
			achievement: 'Вступ до ТОП ВНЗ',
			gradient: 'orange',
		},
		{
			id: 5,
			name: 'Галина Петрова',
			age: 13,
			position: 'Студентка SmartCode Academy',
			company: 'Молодший розробник',
			rating: 5,
			text: 'Мені тільки 13, але завдяки SmartCode Academy я вже створюю власні проекти! Особливо подобається робота з ментором - він завжди пояснить складні моменти простими словами. Мрію стати професійним програмістом!',
			avatar: '👩‍🎓',
			course: 'Python for Kids',
			duration: '4 місяці',
			achievement: 'Наймолодший випускник',
			gradient: 'pink',
		},
	]

	const stats = [
		{ number: '500+', label: 'Випускників', icon: <Users /> },
		{ number: '4.9', label: 'Рейтинг', icon: <Star /> },
		{ number: '95%', label: 'Задоволених', icon: <Heart /> },
		{ number: '50+', label: 'Нагород', icon: <Award /> },
	]

	const nextTestimonial = () => {
		setCurrentTestimonial(prev => (prev + 1) % testimonials.length)
	}

	const prevTestimonial = () => {
		setCurrentTestimonial(
			prev => (prev - 1 + testimonials.length) % testimonials.length
		)
	}

	const renderStars = rating => {
		return Array.from({ length: 5 }, (_, index) => (
			<Star
				key={index}
				size={16}
				className={index < rating ? styles.starFilled : styles.starEmpty}
				fill={index < rating ? '#fbbf24' : 'none'}
			/>
		))
	}

	const currentTestimonialData = testimonials[currentTestimonial]

	return (
		<section className={styles.testimonialsSection} ref={sectionRef}>
			<div className={styles.container}>
				{/* Header */}
				<div
					className={`${styles.header} ${
						isVisible ? styles.headerVisible : ''
					}`}
				>
					<div className={styles.headerContent}>
						<div className={`${styles.badge} fade-in-up`}>
							<Quote className={styles.badgeIcon} />
							Відгуки студентів
						</div>
						<h2 className={`${styles.title} fade-in-up`}>
							Історії успіху наших
							<span className={styles.titleAccent}>випускників</span>
						</h2>
						<p className={styles.subtitle}>
							Дізнайтеся, як SmartCode Academy змінила життя сотень дітей та
							підлітків
						</p>
					</div>
					<button className={styles.ctaButton}>
						<Users className={styles.ctaIcon} />
						Приєднатися до спільноти
					</button>
				</div>

				{/* Main Content */}
				<div
					className={`${styles.content} ${
						isVisible ? styles.contentVisible : ''
					}`}
				>
					{/* Featured Testimonial */}
					<div className={styles.featuredTestimonial} ref={testimonialsRef}>
						<div
							className={`${styles.testimonialCard} ${
								styles[currentTestimonialData.gradient]
							}`}
						>
							<div className={styles.testimonialHeader}>
								<div className={styles.authorInfo}>
									<div className={styles.avatar}>
										{currentTestimonialData.avatar}
									</div>
									<div className={styles.authorDetails}>
										<h3 className={styles.authorName}>
											{currentTestimonialData.name}
											<span className={styles.authorAge}>
												({currentTestimonialData.age} років)
											</span>
										</h3>
										<p className={styles.authorPosition}>
											{currentTestimonialData.position}
										</p>
										<p className={styles.authorCompany}>
											{currentTestimonialData.company}
										</p>
									</div>
								</div>
								<div className={styles.rating}>
									{renderStars(currentTestimonialData.rating)}
								</div>
							</div>

							<div className={styles.testimonialContent}>
								<Quote className={styles.quoteIcon} />
								<p className={styles.testimonialText}>
									{currentTestimonialData.text}
								</p>
							</div>

							<div className={styles.testimonialFooter}>
								<div className={styles.courseInfo}>
									<div className={styles.courseTag}>
										📚 {currentTestimonialData.course}
									</div>
									<div className={styles.duration}>
										⏱️ {currentTestimonialData.duration}
									</div>
								</div>
								<div className={styles.achievement}>
									🏆 {currentTestimonialData.achievement}
								</div>
							</div>
						</div>

						{/* Navigation */}
						<div className={styles.testimonialNavigation}>
							<button className={styles.navBtn} onClick={prevTestimonial}>
								<ChevronLeft className={styles.navIcon} />
							</button>
							<div className={styles.testimonialIndicators}>
								{testimonials.map((_, index) => (
									<button
										key={index}
										className={`${styles.indicator} ${
											index === currentTestimonial ? styles.active : ''
										}`}
										onClick={() => animateTestimonialChange(index)}
									/>
								))}
							</div>
							<button className={styles.navBtn} onClick={nextTestimonial}>
								<ChevronRight className={styles.navIcon} />
							</button>
						</div>
					</div>

					{/* Statistics */}
					<div className={styles.statsSection}>
						<h3 className={styles.statsTitle}>Наші досягнення</h3>
						<div className={styles.statsGrid}>
							{stats.map((stat, index) => (
								<div
									key={index}
									className={styles.statCard}
									style={{ animationDelay: `${index * 0.1}s` }}
								>
									<div className={styles.statIcon}>{stat.icon}</div>
									<div className={styles.statNumber}>{stat.number}</div>
									<div className={styles.statLabel}>{stat.label}</div>
								</div>
							))}
						</div>
					</div>
				</div>

				{/* Additional Testimonials Grid */}
				<div className={styles.additionalTestimonials}>
					<h3 className={styles.gridTitle}>Більше відгуків</h3>
					<div className={styles.testimonialsGrid}>
						{testimonials.slice(0, 4).map((testimonial, index) => (
							<div
								key={testimonial.id}
								className={`${styles.miniTestimonial} ${
									index === currentTestimonial ? styles.highlighted : ''
								}`}
								onClick={() => animateTestimonialChange(index)}
							>
								<div className={styles.miniHeader}>
									<div className={styles.miniAvatar}>{testimonial.avatar}</div>
									<div className={styles.miniInfo}>
										<div className={styles.miniName}>{testimonial.name}</div>
										<div className={styles.miniCourse}>
											{testimonial.course}
										</div>
									</div>
									<div className={styles.miniRating}>
										{renderStars(testimonial.rating)}
									</div>
								</div>
								<p className={styles.miniText}>
									{testimonial.text.substring(0, 120)}...
								</p>
							</div>
						))}
					</div>
				</div>
			</div>
		</section>
	)
}

export default Testimonials
