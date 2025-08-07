'use client'

import React, { useState, useEffect, useRef } from 'react'
import {
	Star,
	Quote,
	ChevronLeft,
	ChevronRight,
	Users,
	Heart,
} from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import styles from './Testimonials.module.css' // Імпортуємо CSS модуль
// Реєструємо плагін ScrollTrigger для GSAP
gsap.registerPlugin(ScrollTrigger)

// --- ДАНІ ---
const testimonials = [
	{
		id: 1,
		name: 'Костя Горілов',
		age: 16,
		position: 'Випускник SmartCode Academy',
		rating: 5,
		text: 'SmartCode Academy - це найкраща школа програмування. Завдяки якісному навчанню та підтримці менторів я зміг освоїти Python та створити свій перший додаток.',
		avatar: '👨‍💻',
		course: 'Python & Web Development',
		duration: '8 місяців',
		achievement: 'Створив власний додаток',
		color: 'blue',
	},
	{
		id: 2,
		name: 'Анастасія Суханова',
		age: 15,
		position: 'Випускниця SmartCode Academy',
		rating: 5,
		text: 'Навчання в SmartCode Academy змінило моє життя. Тут я не тільки вивчила HTML, CSS та JavaScript, але й навчилася працювати в команді.',
		avatar: '👩‍💻',
		course: 'Frontend Development',
		duration: '6 місяців',
		achievement: 'Запустила власне агентство',
		color: 'purple',
	},
	{
		id: 3,
		name: 'Богдан Яремчук',
		age: 14,
		position: 'Студент SmartCode Academy',
		rating: 5,
		text: 'В SmartCode Academy я знайшов друзів-однодумців та створив свою першу гру в Unity. Викладачі завжди готові допомогти, а навчальна платформа дуже зручна. Рекомендую всім, хто хоче стати програмістом!',
		avatar: '👨‍🎓',
		course: 'Game Development',
		duration: '10 місяців',
		achievement: '1-е місце на хакатоні',
		color: 'green',
	},
	{
		id: 4,
		name: 'Влад Шульженко',
		age: 17,
		position: 'Випускник SmartCode Academy',
		rating: 5,
		text: 'Завдяки SmartCode Academy я вступив до технічного університету з відмінною підготовкою. Знання програмування, які я отримав тут, допомагають мені бути кращим за однокурсників. Дуже вдячний за якісну освіту!',
		avatar: '🧑‍💻',
		course: 'Full-Stack Development',
		duration: '12 місяців',
		achievement: 'Вступ до ТОП ВНЗ',
		color: 'orange',
	},
	{
		id: 5,
		name: 'Галина Петрова',
		age: 13,
		position: 'Студентка SmartCode Academy',
		rating: 5,
		text: 'Мені 13 років, але завдяки SmartCode Academy я вже створюю власні проекти! Особливо подобається робота з ментором - він завжди пояснить складні моменти простими словами.',
		avatar: '👩‍🎓',
		course: 'Python for Kids',
		duration: '4 місяці',
		achievement: 'Наймолодший випускник',
		color: 'pink',
	},
]

const stats = [
	{
		number: '500+',
		label: 'Випускників',
		icon: <Users size={24} />,
		color: 'blue',
	},
	{
		number: '4.9/5',
		label: 'Рейтинг',
		icon: <Star size={24} />,
		color: 'yellow',
	},
	{
		number: '95%',
		label: 'Задоволених',
		icon: <Heart size={24} />,
		color: 'red',
	},
	
]

// --- ДОПОМІЖНІ КОМПОНЕНТИ ---
const RatingStars = ({ rating, className = '' }) => (
	<div className={`${styles.ratingStars} ${className}`}>
		{Array.from({ length: 5 }, (_, i) => (
			<Star
				key={i}
				size={18}
				className={i < rating ? styles.starFilled : styles.starEmpty}
				fill='currentColor'
			/>
		))}
	</div>
)

// --- ОСНОВНИЙ КОМПОНЕНТ ---
const Testimonials = () => {
	const [currentTestimonial, setCurrentTestimonial] = useState(0)
	const sectionRef = useRef(null)
	const testimonialCardRef = useRef(null) // Ref на всю картку
	const timelineRef = useRef(null)

	// Анімації при першій появі компонента
	useEffect(() => {
		const section = sectionRef.current
		if (!section) return

		// Плавна поява елементів заголовку
		gsap.fromTo(
			section.querySelectorAll('.gsap-fade-up'),
			{ y: 50, opacity: 0 },
			{
				y: 0,
				opacity: 1,
				duration: 0.8,
				ease: 'power3.out',
				stagger: 0.15,
				scrollTrigger: {
					trigger: section,
					start: 'top 80%',
					toggleActions: 'play none none reverse',
				},
			}
		)

		// Плавна поява карток статистики
		gsap.fromTo(
			section.querySelectorAll('.gsap-stat-card'),
			{ scale: 0.8, opacity: 0, y: 30 },
			{
				scale: 1,
				opacity: 1,
				y: 0,
				duration: 0.6,
				ease: 'back.out(1.7)',
				stagger: 0.1,
				scrollTrigger: {
					trigger: `.${styles.statsGrid}`,
					start: 'top 85%',
					toggleActions: 'play none none reverse',
				},
			}
		)
	}, [])

	// Покращена функція анімації зміни відгуку
	const animateTestimonialChange = newIndex => {
		if (
			newIndex === currentTestimonial ||
			(timelineRef.current && timelineRef.current.isActive())
		) {
			return
		}

		const card = testimonialCardRef.current
		if (!card) return

		// Отримуємо всі дочірні елементи, які будемо анімувати
		const contentToAnimate = card.querySelector(
			`.${styles.testimonialContentWrapper}`
		)

		timelineRef.current = gsap.timeline({
			// Колбек onComplete тепер не потрібен тут для оновлення стану
		})

		timelineRef.current
			// 1. Анімуємо зникнення поточного контенту
			.to(contentToAnimate, {
				opacity: 0,
				y: -25,
				duration: 0.4,
				ease: 'expo.in',
			})
			// 2. ОНОВЛЮЄМО СТАН В СЕРЕДИНІ АНІМАЦІЇ - це виправляє баг
			.call(() => {
				setCurrentTestimonial(newIndex)
			})
			// 3. Готуємо елементи до появи (вони будуть невидимі та зміщені)
			.set(contentToAnimate.children, {
				opacity: 0,
				y: 25,
			})
			// 4. Повертаємо контейнер у видимий стан
			.set(contentToAnimate, {
				opacity: 1,
				y: 0,
			})
			// 5. Анімуємо появу нових елементів по черзі (stagger)
			.to(contentToAnimate.children, {
				opacity: 1,
				y: 0,
				duration: 0.5,
				ease: 'power3.out',
				stagger: 0.08, // Ключ до професійного вигляду!
			})
	}

	const handleNext = () => {
		animateTestimonialChange((currentTestimonial + 1) % testimonials.length)
	}

	const handlePrev = () => {
		animateTestimonialChange(
			(currentTestimonial - 1 + testimonials.length) % testimonials.length
		)
	}

	const handleIndicatorClick = index => {
		animateTestimonialChange(index)
	}

	const currentData = testimonials[currentTestimonial]

	// Функція для отримання рядка з класами кольорів
	const getColorClasses = color => {
		const colorName = color.charAt(0).toUpperCase() + color.slice(1)
		return {
			badge: styles[`badge${colorName}`],
			titleAccent: styles[`titleAccent${colorName}`],
			cardBorder: styles[`cardBorder${colorName}`],
			avatarBg: styles[`avatarBg${colorName}`],
			positionText: styles[`positionText${colorName}`],
			tag: styles[`tag${colorName}`],
			navButton: styles[`navButton${colorName}`],
			indicatorActive: styles[`indicatorActive${colorName}`],
			avatarButtonActive: styles[`avatarButtonActive${colorName}`],
		}
	}

	const currentTheme = getColorClasses(currentData.color)

	return (
		<section ref={sectionRef} className={styles.testimonialsSection}>
			<div className={styles.container}>
				<div className={styles.header}>
					<div className={`gsap-fade-up ${styles.badge} ${currentTheme.badge}`}>
						<Quote size={16} />
						<span>Відгуки студентів</span>
					</div>
					<h2 className={`gsap-fade-up ${styles.title}`}>
						Історії успіху наших{' '}
						<span
							className={`${styles.titleAccent} ${currentTheme.titleAccent}`}
						>
							випускників
						</span>
					</h2>
					<p className={`gsap-fade-up ${styles.subtitle}`}>
						Дізнайтеся, як SmartCode Academy змінила життя сотень дітей та
						підлітків.
					</p>
				</div>

				<div className={styles.contentGrid}>
					<div ref={testimonialCardRef} className={styles.testimonialCard}>
						<div
							className={`${styles.cardBorder} ${currentTheme.cardBorder}`}
						></div>

						{/* Створюємо обгортку для контенту, щоб анімувати його */}
						<div className={styles.testimonialContentWrapper}>
							<div className={styles.cardHeader}>
								<div className={`${styles.avatar} ${currentTheme.avatarBg}`}>
									{currentData.avatar}
								</div>
								<div className={styles.authorInfo}>
									<h3 className={styles.authorName}>
										{currentData.name}, {currentData.age} років
									</h3>
									<p
										className={`${styles.authorPosition} ${currentTheme.positionText}`}
									>
										{currentData.position}
									</p>
								</div>
								<RatingStars
									rating={currentData.rating}
									className={styles.ratingStarsWrapper}
								/>
							</div>

							<div className={styles.testimonialBody}>
								<Quote
									size={48}
									className={`${styles.quoteIcon} ${currentTheme.positionText}`}
								/>
								<p className={styles.testimonialText}>&quot;{currentData.text}&quot;</p>
							</div>

							<div className={styles.cardFooter}>
								<span className={`${styles.tag} ${currentTheme.tag}`}>
									📚 {currentData.course}
								</span>
								<span className={`${styles.tag} ${styles.tagSlate}`}>
									⏱️ {currentData.duration}
								</span>
								<span className={`${styles.tag} ${styles.tagGreen}`}>
									🏆 {currentData.achievement}
								</span>
							</div>
						</div>

						<div className={styles.cardNavigation}>
							<button
								onClick={handlePrev}
								aria-label='Попередній відгук'
								className={styles.navButton}
							>
								<ChevronLeft size={20} />
							</button>
							<button
								onClick={handleNext}
								aria-label='Наступний відгук'
								className={`${styles.navButton} ${styles.navButtonColored} ${currentTheme.navButton}`}
							>
								<ChevronRight size={20} />
							</button>
						</div>
					</div>

					<div className={`${styles.statsGrid} stats-grid`}>
						{stats.map((stat, index) => (
							<div
								key={index}
								className={`gsap-stat-card ${styles.statCard} ${
									styles[
										`statCard${
											stat.color.charAt(0).toUpperCase() + stat.color.slice(1)
										}`
									]
								}`}
							>
								<div className={styles.statContent}>
									<div className={styles.statIconWrapper}>{stat.icon}</div>
									<div>
										<div className={styles.statNumber}>{stat.number}</div>
										<div className={styles.statLabel}>{stat.label}</div>
									</div>
								</div>
							</div>
						))}
					</div>
				</div>

				<div className={styles.bottomNav}>
					<div className={styles.indicatorGroup}>
						{testimonials.map((_, index) => (
							<button
								key={index}
								onClick={() => handleIndicatorClick(index)}
								aria-label={`Перейти до відгуку ${index + 1}`}
								className={`${styles.indicator} ${
									currentTestimonial === index
										? `${styles.indicatorActive} ${currentTheme.indicatorActive}`
										: ''
								}`}
							/>
						))}
					</div>
					<div className={styles.avatarGroup}>
						{testimonials.map((testimonial, index) => (
							<button
								key={testimonial.id}
								onClick={() => handleIndicatorClick(index)}
								aria-label={`Перейти до відгуку ${testimonial.name}`}
								className={`${styles.avatarButton} ${
									currentTestimonial === index
										? `${styles.avatarButtonActive} ${
												getColorClasses(testimonial.color).avatarButtonActive
										  }`
										: ''
								}`}
							>
								<span>{testimonial.avatar}</span>
							</button>
						))}
					</div>
				</div>
			</div>
		</section>
	)
}

export default Testimonials
