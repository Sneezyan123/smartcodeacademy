'use client'
import React, { useState, useEffect } from 'react'
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
} from 'lucide-react'
import styles from './Visit.module.css'

const Visit = () => {
	const [isVisible, setIsVisible] = useState(false)
	const [hoveredCard, setHoveredCard] = useState(null)
	const [currentStat, setCurrentStat] = useState(0)

	useEffect(() => {
		setIsVisible(true)

		// Анімація статистики
		const interval = setInterval(() => {
			setCurrentStat(prev => (prev + 1) % 4)
		}, 3000)

		return () => clearInterval(interval)
	}, [])

	const stats = [
		{ number: '500+', label: 'Випускників', icon: <Users /> },
		{ number: '95%', label: 'Працевлаштування', icon: <Award /> },
		{ number: '2+', label: 'Роки досвіду', icon: <Clock /> },
		{ number: '4.9', label: 'Рейтинг', icon: <Star /> },
	]

	const courses = [
		{
			id: 'programming',
			title: 'ПРОГРАМУЄМО',
			subtitle: 'Основи кодингу',
			icon: <Code className={styles.courseIcon} />,
			description: 'Python, JavaScript, алгоритми',
			gradient: 'programming',
			features: ['Змінні та функції', 'Умови та цикли', 'Проекти'],
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
			title: 'СТВОРЮЄМО ІГРИ',
			subtitle: 'Геймдев для дітей',
			icon: <Gamepad2 className={styles.courseIcon} />,
			description: 'Unity, Scratch, Roblox Studio',
			gradient: 'games',
			features: ['Створення персонажів', 'Логіка гри', 'Публікація'],
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
					content: 'Рівень: 5',
					x: '15%',
					y: '80%',
					delay: '2s',
				},
			],
		},
		{
			id: 'web',
			title: 'ВЕБ-РОЗРОБКА',
			subtitle: 'Сайти та додатки',
			icon: <Monitor className={styles.courseIcon} />,
			description: 'HTML, CSS, React, дизайн',
			gradient: 'web',
			features: ['Верстка сторінок', 'Стилізація', 'Інтерактивність'],
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
					content: 'CSS',
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
		<div className={styles.container}>
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
						<h1 className={styles.title}>
							<span className={styles.titleMain}>SmartCode</span>
							<span className={styles.titleAccent}>Academy</span>
						</h1>

						<p className={styles.subtitle}>
							Школа програмування, де діти стають творцями майбутнього
						</p>

						<div className={styles.heroFeatures}>
							<div className={styles.feature}>
								<div className={styles.featureIcon}>
									<Users className={styles.icon} />
								</div>
								<span>8-17 років</span>
							</div>
							<div className={styles.feature}>
								<div className={styles.featureIcon}>
									<Monitor className={styles.icon} />
								</div>
								<span>Онлайн/Офлайн</span>
							</div>
							<div className={styles.feature}>
								<div className={styles.featureIcon}>
									<Award className={styles.icon} />
								</div>
								<span>Сертифікат</span>
							</div>
						</div>

						<div className={styles.ctaButtons}>
							<button className={styles.primaryButton}>
								<Play className={styles.buttonIcon} />
								Почати навчання
							</button>
							<button className={styles.secondaryButton}>
								Безкоштовний урок
							</button>
						</div>
					</div>

					{/* Statistics */}
					<div className={styles.statsContainer}>
						{stats.map((stat, index) => (
							<div
								key={index}
								className={`${styles.statCard} ${
									currentStat === index ? styles.statCardActive : ''
								}`}
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
						<h2 className={styles.sectionTitle}>Наші напрямки</h2>
						<p className={styles.sectionSubtitle}>
							Обери свій шлях у світі технологій
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
										Дізнатися більше
									</button>
								</div>
							</div>
						))}
					</div>
				</div>

				{/* Scroll Indicator */}
				<div className={styles.scrollIndicator}>
					<div className={styles.scrollText}>Прокрути вниз</div>
					<ChevronDown className={styles.scrollIcon} />
				</div>
			</div>
		</div>
	)
}

export default Visit
