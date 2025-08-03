'use client'
import React, { useState, useEffect, useRef } from 'react'
import {
	Users,
	Monitor,
	Gamepad2,
	Code,
	Palette,
	ChevronDown,
	Cpu,
	Zap,
	Rocket,
	Play,
	Star,
	Award,
	Clock,
	BookOpen,
	Trophy,
	TrendingUp,
} from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import styles from './Visit.module.css'

// Реєструємо ScrollTrigger
gsap.registerPlugin(ScrollTrigger)

const Visit = () => {
	const [isVisible, setIsVisible] = useState(false)
	const [hoveredCard, setHoveredCard] = useState(null)
	const [currentStat, setCurrentStat] = useState(0)
	const sectionRef = useRef(null)
	const cardsRef = useRef(null)

	useEffect(() => {
		setIsVisible(true)

		// GSAP анімації появи при скролі
		if (sectionRef.current) {
			gsap.fromTo(
				sectionRef.current.querySelectorAll('.animate-up'),
				{ y: 60, opacity: 0 },
				{
					y: 0,
					opacity: 1,
					duration: 0.8,
					ease: 'power3.out',
					stagger: 0.15,
					scrollTrigger: {
						trigger: sectionRef.current,
						start: 'top 85%',
						end: 'bottom 15%',
						toggleActions: 'play none none reverse',
					},
				}
			)

			gsap.fromTo(
				sectionRef.current.querySelectorAll('.animate-slide'),
				{ x: -60, opacity: 0 },
				{
					x: 0,
					opacity: 1,
					duration: 0.7,
					ease: 'power2.out',
					stagger: 0.1,
					scrollTrigger: {
						trigger: sectionRef.current,
						start: 'top 75%',
						toggleActions: 'play none none reverse',
					},
				}
			)

			gsap.fromTo(
				sectionRef.current.querySelectorAll('.animate-scale'),
				{ scale: 0.8, opacity: 0 },
				{
					scale: 1,
					opacity: 1,
					duration: 0.6,
					ease: 'back.out(1.7)',
					stagger: 0.05,
					scrollTrigger: {
						trigger: sectionRef.current,
						start: 'top 80%',
						toggleActions: 'play none none reverse',
					},
				}
			)
		}

		// Анімація статистики
		const interval = setInterval(() => {
			setCurrentStat(prev => (prev + 1) % 8)
		}, 3000)

		return () => clearInterval(interval)
	}, [])

	const stats = [
		{ number: '500+', label: 'вВипускникі', icon: <Users /> },
		{ number: '95%', label: 'Працевлаштування', icon: <Award /> },
		{ number: '3+', label: 'Роки досвіду', icon: <Clock /> },
		{ number: '4.9', label: 'Рейтинг', icon: <Star /> },
		{ number: '8+', label: 'Курсів', icon: <BookOpen /> },
		{ number: '15+', label: 'Викладачів', icon: <Monitor /> },
		{ number: '20+', label: 'Проектів', icon: <Rocket /> },
		{ number: '98%', label: 'Задоволених учнів', icon: <Trophy /> },
	]

	const courses = [
		{
			id: 'programming',
			title: 'ПРОГРАМУВАННЯ',
			subtitle: 'Основи кодування майбутнього',
			icon: <Code className={styles.courseIcon} />,
			description: 'Python, JavaScript, алгоритми та структури даних',
			gradient: 'programming',
			features: ['Змінні та функції', 'Умови та цикли', 'Реальні проекти'],
			duration: '6 місяців',
			age: '10-16 років',
			elements: [
				{
					type: 'code',
					content: 'def hello():',
					x: '15%',
					y: '25%',
					delay: '0s',
				},
				{
					type: 'code',
					content: '  print("Привіт!")',
					x: '20%',
					y: '35%',
					delay: '0.5s',
				},
				{ type: 'code', content: 'hello()', x: '15%', y: '45%', delay: '1s' },
				{
					type: 'icon',
					content: <Cpu className={styles.elementIcon} />,
					x: '70%',
					y: '30%',
					delay: '1.5s',
				},
				{
					type: 'bracket',
					content: '{ }',
					x: '65%',
					y: '60%',
					delay: '2s',
				},
			],
		},
		{
			id: 'games',
			title: 'ГЕЙМДЕВ',
			subtitle: 'Створення власних ігор',
			icon: <Gamepad2 className={styles.courseIcon} />,
			description: 'Unity, Scratch, Roblox Studio - від ідеї до релізу',
			gradient: 'games',
			features: [
				'Персонажі та анімація',
				'Логіка та механіки',
				'Публікація ігор',
			],
			duration: '8 місяців',
			age: '8-17 років',
			elements: [
				{
					type: 'game-element',
					content: '🎯',
					x: '25%',
					y: '25%',
					delay: '0s',
				},
				{
					type: 'game-element',
					content: '⭐',
					x: '70%',
					y: '20%',
					delay: '0.5s',
				},
				{
					type: 'game-element',
					content: '🚀',
					x: '60%',
					y: '65%',
					delay: '1s',
				},
				{
					type: 'game-element',
					content: '💎',
					x: '20%',
					y: '60%',
					delay: '1.5s',
				},
				{
					type: 'score',
					content: 'Рівень: 42',
					x: '15%',
					y: '80%',
					delay: '2s',
				},
			],
		},
		{
			id: 'web',
			title: 'ВЕБ-РОЗРОБКА',
			subtitle: 'Сучасні сайти та додатки',
			icon: <Monitor className={styles.courseIcon} />,
			description: 'HTML, CSS, JavaScript, React - повний стек веб-розробки',
			gradient: 'web',
			features: [
				'Адаптивна верстка',
				'Інтерактивні інтерфейси',
				'Сучасні технології',
			],
			duration: '7 місяців',
			age: '12-18 років',
			elements: [
				{
					type: 'web-element',
					content: '<div>',
					x: '20%',
					y: '25%',
					delay: '0s',
				},
				{
					type: 'web-element',
					content: '</div>',
					x: '70%',
					y: '30%',
					delay: '0.5s',
				},
				{
					type: 'web-element',
					content: 'React',
					x: '60%',
					y: '60%',
					delay: '1s',
				},
				{
					type: 'icon',
					content: <Palette className={styles.elementIcon} />,
					x: '25%',
					y: '65%',
					delay: '1.5s',
				},
			],
		},
	]

	return (
		<div className={styles.container} ref={sectionRef}>
			{/* Floating background elements */}
			<div className={styles.backgroundElements}>
				<div className={`${styles.floatingElement} ${styles.element1}`}></div>
				<div className={`${styles.floatingElement} ${styles.element2}`}></div>
				<div className={`${styles.floatingElement} ${styles.element3}`}></div>
				<div className={`${styles.floatingElement} ${styles.element4}`}></div>
			</div>

			<div className={styles.mainContainer}>
				{/* Hero Header */}
				<div
					className={`${styles.hero} ${isVisible ? styles.heroVisible : ''}`}
				>
					<div className={styles.heroContent}>
						<h1 className={`${styles.title} animate-up`}>
							<span className={styles.titleMain}>SmartCode</span>
							<span className={styles.titleAccent}>Academy</span>
						</h1>

						<p className={`${styles.subtitle} animate-up`}>
							Школа програмування нового покоління, де діти створюють технології
							майбутнього
						</p>

						<div className={`${styles.heroFeatures} animate-slide`}>
							<div className={styles.feature}>
								<div className={styles.featureIcon}>
									<Users className={styles.icon} />
								</div>
								<span>Віком 8-17 років</span>
							</div>
							<div className={styles.feature}>
								<div className={styles.featureIcon}>
									<Monitor className={styles.icon} />
								</div>
								<span>Онлайн і офлайн</span>
							</div>
							<div className={styles.feature}>
								<div className={styles.featureIcon}>
									<Award className={styles.icon} />
								</div>
								<span>Міжнародний сертифікат</span>
							</div>
						</div>

						<div className={styles.ctaButtons}>
							<button className={styles.primaryButton}>
								<Play className={styles.buttonIcon} />
								Почати навчання безкоштовно
							</button>
							<button className={styles.secondaryButton}>
								Записатися на пробний урок
							</button>
						</div>
					</div>

					{/* Statistics */}
					<div className={`${styles.statsContainer} animate-up`}>
						{stats.map((stat, index) => (
							<div
								key={index}
								className={`${styles.statCard} ${
									currentStat === index ? styles.statCardActive : ''
								} animate-scale`}
								style={{ animationDelay: `${index * 0.1}s` }}
							>
								<div className={styles.statIcon}>{stat.icon}</div>
								<div className={styles.statContent}>
									<div className={styles.statNumber}>{stat.number}</div>
									<div className={styles.statLabel}>{stat.label}</div>
								</div>
							</div>
						))}
					</div>
				</div>

				{/* Courses Showcase */}
				<div className={styles.coursesSection}>
					<div className={styles.sectionHeader}>
						<h2 className={styles.sectionTitle}>Наші навчальні напрямки</h2>
						<p className={styles.sectionSubtitle}>
							Обери свій шлях у світі IT-технологій та почни створювати майбутнє
							вже сьогодні
						</p>
					</div>

					<div className={styles.coursesGrid}>
						{courses.map((course, index) => (
							<div
								key={course.id}
								className={`${styles.courseCard} ${
									isVisible ? styles.courseCardVisible : ''
								}`}
								style={{ animationDelay: `${0.5 + index * 0.2}s` }}
								onMouseEnter={() => setHoveredCard(index)}
								onMouseLeave={() => setHoveredCard(null)}
							>
								<div className={styles.courseHeader}>
									<div className={styles.courseInfo}>
										<h3 className={styles.courseTitle}>{course.title}</h3>
										<p className={styles.courseSubtitle}>{course.subtitle}</p>
									</div>
									<div
										className={`${styles.courseIconContainer} ${
											styles[course.gradient]
										}`}
									>
										{course.icon}
									</div>
								</div>

								{/* Interactive Screen */}
								<div
									className={`${styles.courseScreen} ${
										styles[course.gradient]
									}`}
								>
									<div className={styles.screenContent}>
										<p className={styles.courseDescription}>
											{course.description}
										</p>
									</div>

									{/* Animated Elements */}
									<div className={styles.animatedElements}>
										{course.elements.map((element, elementIndex) => (
											<div
												key={elementIndex}
												className={`${styles.animatedElement} ${
													styles[element.type]
												} ${hoveredCard === index ? styles.elementActive : ''}`}
												style={{
													left: element.x,
													top: element.y,
													animationDelay: element.delay,
												}}
											>
												{element.content}
											</div>
										))}
									</div>
								</div>

								{/* Course Details */}
								<div className={styles.courseDetails}>
									<div className={styles.courseFeatures}>
										{course.features.map((feature, featureIndex) => (
											<span key={featureIndex} className={styles.featureTag}>
												{feature}
											</span>
										))}
									</div>

									<div className={styles.courseMeta}>
										<div className={styles.metaItem}>
											<Clock className={styles.metaIcon} />
											<span>{course.duration}</span>
										</div>
										<div className={styles.metaItem}>
											<Users className={styles.metaIcon} />
											<span>{course.age}</span>
										</div>
									</div>

									<button className={styles.courseButton}>
										Дізнатися більше про курс
									</button>
								</div>
							</div>
						))}
					</div>
				</div>

				{/* Scroll Indicator */}
				<div className={styles.scrollIndicator}>
					<div className={styles.scrollText}>
						Прокрути для більш детальної інформації
					</div>
					<ChevronDown className={styles.scrollIcon} />
				</div>
			</div>
		</div>
	)
}

export default Visit
