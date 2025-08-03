import React, { useState, useEffect, useRef } from 'react'
import {
	Users,
	Monitor,
	Gamepad2,
	Code,
	Palette,
	Cpu,
	Clock,
	ArrowRight,
	CheckCircle,
	Sparkles,
	Brain,
	Target,
	Zap,
	Trophy,
	BookOpen,
	Star,
	TrendingUp,
	ChevronLeft,
	ChevronRight,
	Pause,
	Play,
} from 'lucide-react'
import styles from './EnhancedCourseCards.module.css'

const EnhancedCourseSlider = () => {
	const [currentSlide, setCurrentSlide] = useState(0)
	const [hoveredCard, setHoveredCard] = useState(null)
	const [isVisible, setIsVisible] = useState(false)
	const [isAutoPlaying, setIsAutoPlaying] = useState(false)
	const [isDragging, setIsDragging] = useState(false)
	const [dragStart, setDragStart] = useState(0)
	const [dragOffset, setDragOffset] = useState(0)
	const sliderRef = useRef(null)
	const autoPlayRef = useRef(null)

	const courses = [
		{
			id: 'programming',
			title: 'ПРОГРАМУВАННЯ',
			subtitle: 'Основи кодування майбутнього',
			icon: <Code className={styles.courseIcon} />,
			description: 'Python, JavaScript, алгоритми та структури даних',
			features: ['Змінні та функції', 'Умови та цикли', 'Реальні проекти'],
			duration: '6 місяців',
			age: '10-16 років',
			projects: '12+ проектів',
			technologies: ['Python', 'JavaScript', 'Git', 'VS Code'],
			level: 'Початковий → Середній',
			price: 'від 2800 грн/міс',
			rating: 4.9,
			students: 180,
			elements: [
				{ type: 'code', content: 'def hello():', x: '1%', y: '1%' },
				{ type: 'code', content: '  print("Привіт!")', x: '20%', y: '65%' },
				{ type: 'code', content: 'hello()', x: '50%', y: '85%' },
				{
					type: 'icon',
					content: <Cpu className={styles.elementIcon} />,
					x: '2%',
					y: '90%',
				},
				{ type: 'bracket', content: '{ }', x: '65%', y: '60%' },
			],
		},
		{
			id: 'games',
			title: 'ГЕЙМДЕВ',
			subtitle: 'Створення власних ігор',
			icon: <Gamepad2 className={styles.courseIcon} />,
			description: 'Unity, Scratch, Roblox Studio - від ідеї до релізу',
			features: [
				'Персонажі та анімація',
				'Логіка та механіки',
				'Публікація ігор',
			],
			duration: '8 місяців',
			age: '8-17 років',
			projects: '15+ ігор',
			technologies: ['Unity', 'C#', 'Scratch', 'Roblox Studio'],
			level: 'Початковий → Експерт',
			price: 'від 3200 грн/міс',
			rating: 4.8,
			students: 145,
			elements: [
				{ type: 'game-element', content: '🎯', x: '25%', y: '25%' },
				{ type: 'game-element', content: '⭐', x: '70%', y: '20%' },
				{ type: 'game-element', content: '🚀', x: '60%', y: '65%' },
				{ type: 'game-element', content: '💎', x: '20%', y: '60%' },
				{ type: 'score', content: 'Рівень: 42', x: '15%', y: '80%' },
			],
		},
		{
			id: 'web',
			title: 'ВЕБ-РОЗРОБКА',
			subtitle: 'Сучасні сайти та додатки',
			icon: <Monitor className={styles.courseIcon} />,
			description: 'HTML, CSS, JavaScript, React - повний стек веб-розробки',
			features: [
				'Адаптивна верстка',
				'Інтерактивні інтерфейси',
				'Сучасні технології',
			],
			duration: '7 місяців',
			age: '12-18 років',
			projects: '10+ сайтів',
			technologies: ['HTML', 'CSS', 'JavaScript', 'React'],
			level: 'Початковий → Просунутий',
			price: 'від 3000 грн/міс',
			rating: 4.9,
			students: 120,
			elements: [
				{ type: 'web-element', content: '<div>', x: '20%', y: '25%' },
				{ type: 'web-element', content: '</div>', x: '70%', y: '30%' },
				{ type: 'web-element', content: 'React', x: '60%', y: '60%' },
				{
					type: 'icon',
					content: <Palette className={styles.elementIcon} />,
					x: '25%',
					y: '65%',
				},
			],
		},
	]

	useEffect(() => {
		setIsVisible(true)
	}, [])

	// Auto-play functionality
	useEffect(() => {
		if (isAutoPlaying && !isDragging) {
			autoPlayRef.current = setInterval(() => {
				setCurrentSlide(prev => (prev + 1) % courses.length)
			}, 4000)
		} else {
			clearInterval(autoPlayRef.current)
		}

		return () => clearInterval(autoPlayRef.current)
	}, [isAutoPlaying, isDragging, courses.length])

	const nextSlide = () => {
		setCurrentSlide(prev => (prev + 1) % courses.length)
	}

	const prevSlide = () => {
		setCurrentSlide(prev => (prev - 1 + courses.length) % courses.length)
	}

	const goToSlide = index => {
		setCurrentSlide(index)
	}

	// Touch/Mouse drag handlers
	const handleDragStart = e => {
		setIsDragging(true)
		setDragStart(e.type === 'mousedown' ? e.clientX : e.touches[0].clientX)
		setIsAutoPlaying(false)
	}

	const handleDragMove = e => {
		if (!isDragging) return
		const currentX = e.type === 'mousemove' ? e.clientX : e.touches[0].clientX
		const offset = currentX - dragStart
		setDragOffset(offset)
	}

	const handleDragEnd = () => {
		if (!isDragging) return
		setIsDragging(false)

		if (Math.abs(dragOffset) > 100) {
			if (dragOffset > 0) {
				prevSlide()
			} else {
				nextSlide()
			}
		}

		setDragOffset(0)
		setTimeout(() => setIsAutoPlaying(true), 1000)
	}

	const toggleAutoPlay = () => {
		setIsAutoPlaying(!isAutoPlaying)
	}

	return (
		<div className={styles.container}>
			{/* Section Header */}
			<div className={styles.header}>
				<div className={styles.badge}>
					<Sparkles className={styles.badgeIcon} />
					<span className={styles.badgeText}>Наші курси</span>
				</div>
				<h2 className={styles.title}>Навчальні напрямки</h2>
				<p className={styles.subtitle}>
					Обери свій шлях у світі IT-технологій та почни створювати майбутнє вже
					сьогодні
				</p>
			</div>

			{/* Slider Container */}
			<div className={styles.sliderContainer}>
				{/* Slider Wrapper */}
				<div
					ref={sliderRef}
					className={`${styles.sliderWrapper} ${
						isDragging ? styles.dragging : styles.grabbing
					}`}
					onMouseDown={handleDragStart}
					onMouseMove={handleDragMove}
					onMouseUp={handleDragEnd}
					onMouseLeave={handleDragEnd}
					onTouchStart={handleDragStart}
					onTouchMove={handleDragMove}
					onTouchEnd={handleDragEnd}
				>
					<div
						className={styles.slideTrack}
						style={{
							transform: `translateX(calc(-${
								currentSlide * 100
							}% + ${dragOffset}px))`,
							transitionDuration: isDragging ? '0ms' : '700ms',
						}}
					>
						{courses.map((course, index) => (
							<div
								key={course.id}
								className={styles.slide}
								onMouseEnter={() => setHoveredCard(index)}
								onMouseLeave={() => setHoveredCard(null)}
							>
								<div
									className={`
										${styles.courseCard}
										${isVisible ? styles.visible : ''}
										${index === currentSlide ? styles.activeSlide : styles.inactiveSlide}
										${hoveredCard === index ? styles.hovered : ''}
									`}
								>
									{/* Gradient Border */}
									<div
										className={`
											${styles.gradientBorder}
											${styles[`gradient${course.id.charAt(0).toUpperCase() + course.id.slice(1)}`]}
											${
												hoveredCard === index
													? styles[
															`gradientHover${
																course.id.charAt(0).toUpperCase() +
																course.id.slice(1)
															}`
													  ]
													: ''
											}
											${index === currentSlide ? styles.activeShadow : styles.normalShadow}
										`}
									>
										<div className={styles.cardContent}>
											{/* Popular/New Badge */}

											{index === 2 && (
												<div className={styles.newBadge}>
													<Zap className={styles.badgeIconSmall} />
													Новий
												</div>
											)}

											{/* Header */}
											<div className={styles.cardHeader}>
												<div className={styles.headerLeft}>
													<div className={styles.iconAndRating}>
														<div
															className={`
																${styles.iconContainer}
																${styles[`icon${course.id.charAt(0).toUpperCase() + course.id.slice(1)}`]}
																${hoveredCard === index ? styles.iconBounce : ''}
															`}
														>
															{course.icon}
														</div>
														<div className={styles.rating}>
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
															<span className={styles.ratingText}>
																{course.rating}
															</span>
														</div>
													</div>
													<h3
														className={`
															${styles.courseTitle}
															${hoveredCard === index ? styles.titleHovered : ''}
														`}
													>
														{course.title}
													</h3>
													<p className={styles.courseSubtitle}>
														{course.subtitle}
													</p>
												</div>

												<div className={styles.headerRight}>
													<div className={styles.studentsCount}>
														<span className={styles.studentsText}>
															{course.students} учнів
														</span>
													</div>
													<div className={styles.price}>{course.price}</div>
												</div>
											</div>

											{/* Interactive Demo Area */}
											<div
												className={`
													${styles.demoArea}
													${styles[`demo${course.id.charAt(0).toUpperCase() + course.id.slice(1)}`]}
													${
														hoveredCard === index
															? styles[
																	`demoHover${
																		course.id.charAt(0).toUpperCase() +
																		course.id.slice(1)
																	}`
															  ]
															: ''
													}
												`}
											>
												{/* Background Pattern */}
												<div className={styles.backgroundPattern}>
													<div className={styles.spinningCircle}></div>
													<div className={styles.bouncingSquare}></div>
													<div className={styles.pulsingOverlay}></div>
												</div>

												{/* Course Description */}
												<div className={styles.demoContent}>
													<p className={styles.demoDescription}>
														{course.description}
													</p>
												</div>

												{/* Animated Elements */}
												<div className={styles.animatedElements}>
													{course.elements.map((element, elementIndex) => (
														<div
															key={elementIndex}
															className={`
																${styles.animatedElement}
																${hoveredCard === index ? styles.elementHovered : ''}
															`}
															style={{
																left: element.x,
																top: element.y,
																animationDelay: `${elementIndex * 500}ms`,
															}}
														>
															{typeof element.content === 'string' ? (
																<span
																	className={`
																		${
																			element.type === 'code' ||
																			element.type === 'web-element'
																				? styles.codeElement
																				: element.type === 'game-element'
																				? styles.gameElement
																				: element.type === 'score'
																				? styles.scoreElement
																				: styles.textElement
																		}
																	`}
																>
																	{element.content}
																</span>
															) : (
																<div className={styles.iconElement}>
																	{element.content}
																</div>
															)}
														</div>
													))}
												</div>

												{/* Floating Icons */}
												<Brain
													className={`
														${styles.floatingBrain}
														${hoveredCard === index ? styles.brainSpin : ''}
													`}
												/>
												<Target
													className={`
														${styles.floatingTarget}
														${hoveredCard === index ? styles.targetPulse : ''}
													`}
												/>
											</div>

											{/* Features */}
											<div className={styles.featuresSection}>
												<div className={styles.features}>
													{course.features.map((feature, featureIndex) => (
														<span
															key={featureIndex}
															className={`
																${styles.feature}
																${
																	hoveredCard === index
																		? styles[
																				`featureHovered${
																					course.id.charAt(0).toUpperCase() +
																					course.id.slice(1)
																				}`
																		  ]
																		: ''
																}
															`}
														>
															<CheckCircle className={styles.featureIcon} />
															{feature}
														</span>
													))}
												</div>

												<div className={styles.technologies}>
													{course.technologies.map((tech, techIndex) => (
														<span key={techIndex} className={styles.tech}>
															{tech}
														</span>
													))}
												</div>
											</div>

											{/* Stats */}
											<div className={styles.stats}>
												{[
													{
														icon: Clock,
														label: 'Тривалість',
														value: course.duration,
													},
													{ icon: Users, label: 'Вік', value: course.age },
													{
														icon: BookOpen,
														label: 'Проекти',
														value: course.projects,
													},
													{
														icon: TrendingUp,
														label: 'Рівень',
														value: course.level,
													},
												].map((stat, statIndex) => (
													<div key={statIndex} className={styles.stat}>
														<stat.icon className={styles.statIcon} />
														<div>
															<div className={styles.statValue}>
																{stat.value}
															</div>
															<div className={styles.statLabel}>
																{stat.label}
															</div>
														</div>
													</div>
												))}
											</div>

											{/* Action Buttons */}
											<div className={styles.actions}>
												<button
													className={`
														${styles.primaryButton}
														${
															styles[
																`primaryButton${
																	course.id.charAt(0).toUpperCase() +
																	course.id.slice(1)
																}`
															]
														}
													`}
												>
													<span>Записатися на курс</span>
													<ArrowRight className={styles.buttonIcon} />
												</button>
												<button className={styles.secondaryButton}>
													<BookOpen className={styles.buttonIconSmall} />
													<span>Детальніше про курс</span>
												</button>
											</div>

											{/* Hover Overlay */}
											<div
												className={`
													${styles.hoverOverlay}
													${
														styles[
															`hoverOverlay${
																course.id.charAt(0).toUpperCase() +
																course.id.slice(1)
															}`
														]
													}
													${hoveredCard === index ? styles.overlayVisible : ''}
												`}
											/>

											{/* Shine Effect */}
											<div
												className={`
													${styles.shineEffect}
													${hoveredCard === index ? styles.shining : ''}
												`}
											/>
										</div>
									</div>
								</div>
							</div>
						))}
					</div>
				</div>

				{/* Navigation Arrows */}
				<button
					onClick={prevSlide}
					className={`${styles.navButton} ${styles.navLeft}`}
				>
					<ChevronLeft className={styles.navIcon} />
				</button>
				<button
					onClick={nextSlide}
					className={`${styles.navButton} ${styles.navRight}`}
				>
					<ChevronRight className={styles.navIcon} />
				</button>

				{/* Auto-play Control */}
				
			</div>

			{/* Dots Indicator */}
			<div className={styles.dots}>
				{courses.map((_, index) => (
					<button
						key={index}
						onClick={() => goToSlide(index)}
						className={`
							${styles.dot}
							${index === currentSlide ? styles.dotActive : ''}
						`}
					/>
				))}
			</div>

			{/* Progress Bar */}
			<div className={styles.progressContainer}>
				<div
					className={styles.progressBar}
					style={{ width: `${((currentSlide + 1) / courses.length) * 100}%` }}
				/>
			</div>
		</div>
	)
}

export default EnhancedCourseSlider
