import React, { useState, useEffect, useMemo } from 'react'
import {
	Code,
	Gamepad2,
	Monitor,
	Star,
	Users,
	Clock,
	BookOpen,
	Trophy,
	Zap,
	Sparkles,
	ArrowRight,
	CheckCircle,
	PlayCircle,
	Award,
	Target,
	Brain,
	Rocket,
	Heart,
	TrendingUp,
	Eye,
	Calendar,
	Palette,
	Cpu,
	Globe,
	Terminal,
	Database
} from 'lucide-react'
import styles from './EnhancedCourseCards.module.css'

const EnhancedCourseCards = () => {
	const [hoveredCard, setHoveredCard] = useState(null)
	const [isVisible, setIsVisible] = useState(false)

	// Генеруємо зірки тільки для Python картки
	const pythonStars = useMemo(() => {
		const starTypes = [
			{ type: 'starPurple', count: 20 },
			{ type: 'starBlue', count: 15 },
			{ type: 'starPink', count: 12 },
			{ type: 'starGold', count: 8 },
			{ type: 'starTwinkle', count: 18 }
		];

		const allStars = [];

		starTypes.forEach(({ type, count }) => {
			for (let i = 0; i < count; i++) {
				allStars.push({
					id: `${type}-${i}`,
					type,
					left: Math.random() * 100,
					top: Math.random() * 100,
					animationDelay: Math.random() * (type === 'starTwinkle' ? 4 : type === 'starGold' ? 6 : type === 'starBlue' ? 8 : type === 'starPink' ? 15 : 12),
					animationDuration: type === 'starTwinkle' ? 2 + Math.random() * 4 : 
									   type === 'starGold' ? 4 + Math.random() * 4 : 
									   type === 'starBlue' ? 5 + Math.random() * 6 :
									   type === 'starPink' ? 10 + Math.random() * 10 :
									   8 + Math.random() * 8
				});
			}
		});

		return allStars;
	}, []);

	const courses = [
		{
			id: 'programming',
			title: 'PYTHON',
			subtitle: 'Програмування майбутнього',
			icon: <Code className={styles.cardIcon} />,
			description:
				'Відкрий космос можливостей з найпопулярнішою мовою програмування світу. Створюй ІІ, веб-додатки та аналізуй дані.',
			longDescription:
				"Повний курс Python програмування для початківців та досвідчених учнів. Від основ до машинного навчання та веб-розробки.",
			features: [
				'Основи Python та синтаксис',
				'ООП та алгоритми',
				'Веб-розробка з Django/Flask',
				'Data Science та ML',
				'Telegram боти та API',
			],
			technologies: ['Python', 'Django', 'NumPy', 'Pandas', 'TensorFlow'],
			stats: {
				duration: '6 місяців',
				age: '10-16 років',
				projects: '20+ проектів',
				level: 'Початковий → Експерт',
			},
			pricing: {
				price: '2800',
				discount: '25%',
				originalPrice: '3700',
			},
			rating: 4.9,
			students: 324,
			badge: {
				text: 'Космічний хіт',
				icon: <Rocket className={styles.badgeIcon} />,
				type: 'cosmic',
			},
			gradient: 'programming',
			demoElements: [
				{
					type: 'code',
					content: 'print("Hello, Universe!")',
					x: '5%',
					y: '115%',
				},
				{ type: 'code', content: 'import numpy as np', x: '45%', y: '130%' },
				{ type: 'code', content: 'def explore_space():', x: '75%', y: '110%' },
				{ type: 'variable', content: 'AI = True', x: '25%', y: '145%' },
				{
					type: 'icon',
					content: <Terminal className={styles.demoIcon} />,
					x: '85%',
					y: '140%',
				},
			],
			isSpaceTheme: true, // Спеціальний флаг для космічної теми
		},
		{
			id: 'gamedev',
			title: 'ГЕЙМДЕВ',
			subtitle: 'Створення власних ігор',
			icon: <Gamepad2 className={styles.cardIcon} />,
			description:
				'Розробляй ігри в Unity та Scratch. Від простих 2D до складних 3D проектів.',
			longDescription:
				'Навчись створювати захоплюючі ігри від концепції до релізу. Вивчай Unity, Scratch та публікуй свої ігри в магазинах додатків.',
			features: [
				'Unity 3D розробка',
				'Scratch для початківців',
				'Дизайн персонажів',
				'Геймплей механіки',
				'Публікація ігор',
			],
			technologies: ['Unity', 'C#', 'Scratch', 'Blender', 'Photoshop'],
			stats: {
				duration: '8 місяців',
				age: '8-17 років',
				projects: '12+ ігор',
				level: 'Початковий → Експерт',
			},
			pricing: {
				price: '3200',
				discount: '15%',
				originalPrice: '3750',
			},
			rating: 4.8,
			students: 189,
			badge: {
				text: 'Тренд 2024',
				icon: <Trophy className={styles.badgeIcon} />,
				type: 'trending',
			},
			gradient: 'gamedev',
			demoElements: [
				{ type: 'game', content: '🎮', x: '10%', y: '125%' },
				{ type: 'game', content: '⭐', x: '100%', y: '0%' },
				{ type: 'game', content: '🚀', x: '85%', y: '150%' },
				{ type: 'score', content: 'Score: 1250', x: '45%', y: '125%' },
			],
		},
		{
			id: 'webdev',
			title: 'ВЕБ-РОЗРОБКА',
			subtitle: 'Сучасні сайти та додатки',
			icon: <Monitor className={styles.cardIcon} />,
			description:
				'Створюй адаптивні сайти та веб-додатки. HTML, CSS, JavaScript та React.',
			longDescription:
				'Освой повний стек веб-розробки. Від основ HTML до складних React додатків. Створюй сучасні, адаптивні інтерфейси.',
			features: [
				'HTML5 та CSS3',
				'JavaScript ES6+',
				'React та компоненти',
				'Адаптивний дизайн',
				'REST API інтеграція',
			],
			technologies: ['HTML', 'CSS', 'JavaScript', 'React', 'Node.js'],
			stats: {
				duration: '7 місяців',
				age: '12-18 років',
				projects: '10+ сайтів',
				level: 'Початковий → Професійний',
			},
			pricing: {
				price: '3000',
				discount: '25%',
				originalPrice: '4000',
			},
			rating: 4.9,
			students: 156,
			badge: {
				text: 'Новинка',
				icon: <Zap className={styles.badgeIcon} />,
				type: 'new',
			},
			gradient: 'webdev',
			demoElements: [
				{ type: 'html', content: '<div>', x: '20%', y: '25%' },
				{ type: 'html', content: '</div>', x: '70%', y: '30%' },
				{ type: 'css', content: '.container {}', x: '15%', y: '55%' },
				{
					type: 'icon',
					content: <Palette className={styles.demoIcon} />,
					x: '65%',
					y: '65%',
				},
				{ type: 'react', content: 'React', x: '45%', y: '70%' },
			],
		},
	]

	useEffect(() => {
		const timer = setTimeout(() => {
			setIsVisible(true)
		}, 200)
		return () => clearTimeout(timer)
	}, [])

	const handleCardHover = index => {
		setHoveredCard(index)
	}

	const handleCardLeave = () => {
		setHoveredCard(null)
	}

	return (
		<section className={styles.courseSection}>
			{/* Header */}
			<div className={styles.sectionHeader}>
				<h2 className={styles.sectionTitle}>
					Обери свій шлях
				</h2>
				<p className={styles.sectionSubtitle}>
					Від початківця до професіонала за декілька місяців. Практичні знання,
					реальні проекти та підтримка досвідчених менторів.
				</p>
			</div>

			{/* Cards Grid */}
			<div className={styles.cardsContainer}>
				{courses.map((course, index) => (
					<article
						key={course.id}
						className={`
							${styles.courseCard} 
							${styles[`card${course.gradient}`]}
							${isVisible ? styles.cardVisible : styles.cardHidden}
							${hoveredCard === index ? styles.cardHovered : ''}
							${course.isSpaceTheme ? styles.spaceCard : ''}
						`}
						style={{ '--delay': `${index * 150}ms` }}
						onMouseEnter={() => handleCardHover(index)}
						onMouseLeave={handleCardLeave}
					>
						{/* Background Effects */}
						<div className={styles.cardBackground}>
							<div className={styles.gradientOverlay}></div>
							<div className={styles.meshGradient}></div>
							<div className={styles.glowEffect}></div>
							
							{/* Космічні ефекти тільки для Python */}
							{course.isSpaceTheme && (
								<>
									<div className={styles.spaceBackground}></div>
									<div className={styles.pythonStarField}>
										{pythonStars.map((star) => (
											<div
												key={star.id}
												className={`${styles.spaceStar} ${styles[star.type]}`}
												style={{
													left: `${star.left}%`,
													top: `${star.top}%`,
													animationDelay: `${star.animationDelay}s`,
													animationDuration: `${star.animationDuration}s`
												}}
											/>
										))}
									</div>
									<div className={styles.cosmicOrbs}>
										<div className={styles.cosmicOrb}></div>
										<div className={styles.cosmicOrbSecondary}></div>
									</div>
								</>
							)}
						</div>

						{/* Badge */}
						<div
							className={`${styles.courseBadge} ${
								styles[`badge${course.badge.type}`]
							} ${course.isSpaceTheme ? styles.spaceBadge : ''}`}
						>
							{course.badge.icon}
							<span>{course.badge.text}</span>
						</div>

						{/* Card Header */}
						<header className={styles.cardHeader}>
							<div className={styles.iconContainer}>
								<div
									className={`${styles.iconBackground} ${
										styles[`iconBg${course.gradient}`]
									} ${course.isSpaceTheme ? styles.spaceIcon : ''}`}
								>
									{course.icon}
									<div className={styles.iconShine}></div>
								</div>
							</div>

							<div className={styles.courseInfo}>
								<div className={styles.ratingContainer}>
									<div className={styles.stars}>
										{[...Array(5)].map((_, i) => (
											<Star
												key={i}
												className={`${styles.star} ${
													i < Math.floor(course.rating)
														? styles.starFilled
														: styles.starEmpty
												}`}
											/>
										))}
									</div>
									<span className={`${styles.ratingValue} ${course.isSpaceTheme ? styles.spaceText : ''}`}>
										{course.rating}
									</span>
								</div>

								<h3 className={`${styles.courseTitle} ${course.isSpaceTheme ? styles.spaceTitle : ''}`}>
									{course.title}
								</h3>
								<p className={`${styles.courseSubtitle} ${course.isSpaceTheme ? styles.spaceSubtitle : ''}`}>
									{course.subtitle}
								</p>
							</div>
						</header>

						{/* Interactive Demo */}
						<div
							className={`${styles.demoSection} ${
								styles[`demo${course.gradient}`]
							} ${course.isSpaceTheme ? styles.spaceDemo : ''}`}
						>
							<div className={styles.demoBackground}>
								<div className={styles.animatedPattern}></div>
								<div className={styles.floatingParticles}>
									{[...Array(8)].map((_, i) => (
										<div
											key={i}
											className={styles.particle}
											style={{ '--i': i }}
										></div>
									))}
								</div>
							</div>

							<div className={styles.demoContent}>
								<p className={styles.demoDescription}>{course.description}</p>

								{/* Demo Elements */}
								<div className={styles.demoElements}>
									{course.demoElements.map((element, i) => (
										<div
											key={i}
											className={`${styles.demoElement} ${
												styles[`element${element.type}`]
											} ${course.isSpaceTheme ? styles.spaceElement : ''}`}
											style={{
												left: element.x,
												top: element.y,
												'--delay': `${i * 0.2}s`,
											}}
										>
											{typeof element.content === 'string' ? (
												<span>{element.content}</span>
											) : (
												element.content
											)}
										</div>
									))}
								</div>
							</div>
						</div>

						{/* Features List */}
						<div className={styles.featuresSection}>
							<h4 className={`${styles.featuresTitle} ${course.isSpaceTheme ? styles.spaceText : ''}`}>
								{course.isSpaceTheme ? 'Що вивчатимеш у космосі:' : 'Що вивчатимеш:'}
							</h4>
							<ul className={styles.featuresList}>
								{course.features.map((feature, i) => (
									<li key={i} className={`${styles.featureItem} ${course.isSpaceTheme ? styles.spaceFeature : ''}`}>
										<CheckCircle className={styles.featureIcon} />
										<span>{feature}</span>
									</li>
								))}
							</ul>
						</div>

						{/* Technologies */}
						<div className={styles.technologiesSection}>
							<div className={styles.techList}>
								{course.technologies.map((tech, i) => (
									<span key={i} className={`${styles.techBadge} ${course.isSpaceTheme ? styles.spaceTech : ''}`}>
										{tech}
									</span>
								))}
							</div>
						</div>

						{/* Stats Grid */}
						<div className={styles.statsGrid}>
							<div className={`${styles.statItem} ${course.isSpaceTheme ? styles.spaceStat : ''}`}>
								<Clock className={styles.statIcon} />
								<div className={styles.statInfo}>
									<span className={styles.statValue}>
										{course.stats.duration}
									</span>
									<span className={styles.statLabel}>Тривалість</span>
								</div>
							</div>
							<div className={`${styles.statItem} ${course.isSpaceTheme ? styles.spaceStat : ''}`}>
								<Users className={styles.statIcon} />
								<div className={styles.statInfo}>
									<span className={styles.statValue}>{course.stats.age}</span>
									<span className={styles.statLabel}>Вік</span>
								</div>
							</div>
							<div className={`${styles.statItem} ${course.isSpaceTheme ? styles.spaceStat : ''}`}>
								<BookOpen className={styles.statIcon} />
								<div className={styles.statInfo}>
									<span className={styles.statValue}>
										{course.stats.projects}
									</span>
									<span className={styles.statLabel}>Проекти</span>
								</div>
							</div>
							<div className={`${styles.statItem} ${course.isSpaceTheme ? styles.spaceStat : ''}`}>
								<TrendingUp className={styles.statIcon} />
								<div className={styles.statInfo}>
									<span className={styles.statValue}>{course.stats.level}</span>
									<span className={styles.statLabel}>Рівень</span>
								</div>
							</div>
						</div>

						{/* Pricing & CTA */}
						<footer className={styles.cardFooter}>
							<div className={styles.pricingSection}>
								<div className={styles.priceContainer}>
									<span className={styles.discountBadge}>
										-{course.pricing.discount}
									</span>
									<div className={styles.priceInfo}>
										<span className={styles.currentPrice}>
											{course.pricing.price} грн/міс
										</span>
										<span className={styles.originalPrice}>
											{course.pricing.originalPrice} грн
										</span>
									</div>
								</div>
								<div className={`${styles.studentsInfo} ${course.isSpaceTheme ? styles.spaceStudents : ''}`}>
									<Eye className={styles.eyeIcon} />
									<span>{course.students} {course.isSpaceTheme ? 'космонавтів' : 'учнів'}</span>
								</div>
							</div>

							<div className={styles.actionButtons}>
								<button
									className={`${styles.primaryButton} ${
										styles[`btnPrimary${course.gradient}`]
									} ${course.isSpaceTheme ? styles.spaceButton : ''}`}
								>
									<span>{course.isSpaceTheme ? 'Почати космічну подорож' : 'Записатися на курс'}</span>
									<ArrowRight className={styles.buttonIcon} />
									<div className={styles.buttonShine}></div>
								</button>
								<button className={`${styles.secondaryButton} ${course.isSpaceTheme ? styles.spaceSecondaryButton : ''}`}>
									<PlayCircle className={styles.secondaryIcon} />
									<span>{course.isSpaceTheme ? 'Дослідити програму' : 'Переглянути програму'}</span>
								</button>
							</div>
						</footer>

						{/* Hover Effects */}
						<div className={styles.hoverEffects}>
							<div className={styles.shimmerEffect}></div>
							<div className={styles.glowBorder}></div>
						</div>
					</article>
				))}
			</div>

			{/* Bottom Section */}
			<div className={styles.bottomSection}>
				<div className={styles.benefitsGrid}>
					<div className={styles.benefitItem}>
						<div className={styles.benefitIcon}>
							<Award className={styles.benefitIconSvg} />
						</div>
						<div className={styles.benefitContent}>
							<h4>Сертифікат про завершення</h4>
							<p>Офіційний документ після успішного проходження курсу</p>
						</div>
					</div>
					<div className={styles.benefitItem}>
						<div className={styles.benefitIcon}>
							<Heart className={styles.benefitIconSvg} />
						</div>
						<div className={styles.benefitContent}>
							<h4>Персональний ментор</h4>
							<p>Індивідуальний підхід та підтримка протягом навчання</p>
						</div>
					</div>
					<div className={styles.benefitItem}>
						<div className={styles.benefitIcon}>
							<Globe className={styles.benefitIconSvg} />
						</div>
						<div className={styles.benefitContent}>
							<h4>Онлайн та офлайн</h4>
							<p>Гнучкий формат навчання: вдома або в класі</p>
						</div>
					</div>
				</div>
			</div>
		</section>
	)
}

export default EnhancedCourseCards