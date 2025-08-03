'use client'
import React, { useState, useEffect, useRef } from 'react'
import {
	ChevronDown,
	Phone,
	Menu,
	X,
	Code,
	Gamepad2,
	Monitor,
	Sparkles,
	Star,
	Users,
} from 'lucide-react'
import styles from './Header.module.css'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Реєструємо ScrollTrigger для GSAP
gsap.registerPlugin(ScrollTrigger)

const Header = () => {
	const [isCoursesOpen, setIsCoursesOpen] = useState(false)
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
	const [isScrolled, setIsScrolled] = useState(false)
	const [hasInteracted, setHasInteracted] = useState(false)
	const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
	const headerRef = useRef(null)
	const mobileMenuRef = useRef(null)
	const coursesRef = useRef(null)
	const underlineRefs = useRef([])
	const shineRef = useRef(null)

	// Використовуємо Intersection Observer замість scroll event для кращої продуктивності
	useEffect(() => {
		const header = headerRef.current
		if (!header) return

		const observer = new IntersectionObserver(
			([entry]) => {
				setIsScrolled(!entry.isIntersecting)
			},
			{ threshold: 0, rootMargin: '-88px 0px 0px 0px' }
		)

		observer.observe(header)
		return () => observer.unobserve(header)
	}, [])

	// Відстежуємо позицію миші для інтерактивного ефекту
	useEffect(() => {
		const updateMousePosition = e => {
			setMousePosition({ x: e.clientX, y: e.clientY })
		}

		window.addEventListener('mousemove', updateMousePosition)
		return () => window.removeEventListener('mousemove', updateMousePosition)
	}, [])

	// Відстежуємо взаємодію з користувачем для анімацій
	useEffect(() => {
		const handleInteraction = () => setHasInteracted(true)

		window.addEventListener('click', handleInteraction, { once: true })
		window.addEventListener('touchstart', handleInteraction, { once: true })

		return () => {
			window.removeEventListener('click', handleInteraction)
			window.removeEventListener('touchstart', handleInteraction)
		}
	}, [])

	// Анімації для мобільного меню
	useEffect(() => {
		if (!mobileMenuRef.current) return

		if (isMobileMenuOpen) {
			gsap.fromTo(
				mobileMenuRef.current,
				{ x: '100%', opacity: 0.9 },
				{
					x: 0,
					opacity: 1,
					duration: 0.6,
					ease: 'power3.out',
				}
			)

			// Анімація елементів меню з затримкою
			const menuItems = mobileMenuRef.current.querySelectorAll(
				`.${styles.mobileNavLink}, .${styles.mobileCourseLink}`
			)
			gsap.fromTo(
				menuItems,
				{ y: 20, opacity: 0 },
				{
					y: 0,
					opacity: 1,
					duration: 0.4,
					stagger: 0.05,
					ease: 'back.out(1.7)',
				}
			)
		} else {
			gsap.to(mobileMenuRef.current, {
				x: '100%',
				opacity: 0.9,
				duration: 0.5,
				ease: 'power3.in',
			})
		}
	}, [isMobileMenuOpen])

	// Анімації для dropdown
	useEffect(() => {
		if (!coursesRef.current) return

		if (isCoursesOpen) {
			// Встановлюємо visibility для показу
			gsap.set(coursesRef.current, { visibility: 'visible' })

			// Анімація відкриття
			gsap.fromTo(
				coursesRef.current,
				{
					y: 10,
					opacity: 0,
					scaleY: 0.95,
				},
				{
					y: 0,
					opacity: 1,
					scaleY: 1,
					duration: 0.4,
					ease: 'back.out(1.7)',
					force3D: true,
				}
			)

			// Анімація елементів dropdown з затримкою
			const items = coursesRef.current.querySelectorAll(
				`.${styles.dropdownItem}`
			)
			gsap.fromTo(
				items,
				{ x: -20, opacity: 0 },
				{
					x: 0,
					opacity: 1,
					duration: 0.3,
					stagger: 0.05,
					ease: 'power2.out',
				}
			)
		} else {
			// Анімація закриття
			const items = coursesRef.current.querySelectorAll(
				`.${styles.dropdownItem}`
			)

			// Спочатку анімуємо елементи
			gsap.to(items, {
				x: -10,
				opacity: 0,
				duration: 0.2,
				stagger: 0.02,
				ease: 'power2.in',
			})

			// Потім анімуємо весь контейнер
			gsap.to(coursesRef.current, {
				y: -5,
				opacity: 0,
				scaleY: 0.95,
				duration: 0.25,
				ease: 'power2.in',
				delay: 0.1,
				force3D: true,
				onComplete: () => {
					// Приховуємо елемент після завершення анімації
					gsap.set(coursesRef.current, { visibility: 'hidden' })
				},
			})
		}
	}, [isCoursesOpen])

	// Анімація входу для хедера
	useEffect(() => {
		if (headerRef.current) {
			gsap.fromTo(
				headerRef.current,
				{
					y: -50,
					opacity: 0,
				},
				{
					y: 0,
					opacity: 1,
					duration: 0.8,
					ease: 'back.out(1.7)',
					delay: 0.2,
				}
			)
		}
	}, [])

	// Subtle логотип ефект
	useEffect(() => {
		const logo = headerRef.current?.querySelector(`.${styles.logoIcon}`)
		if (!logo) return

		const handleLogoHover = () => {
			gsap.to(logo, {
				rotationY: 5,
				rotationX: 2,
				duration: 0.6,
				ease: 'power2.out',
			})
		}

		const handleLogoLeave = () => {
			gsap.to(logo, {
				rotationY: 0,
				rotationX: 0,
				duration: 0.6,
				ease: 'power2.out',
			})
		}

		const logoContainer = headerRef.current?.querySelector(`.${styles.logo}`)
		if (logoContainer) {
			logoContainer.addEventListener('mouseenter', handleLogoHover)
			logoContainer.addEventListener('mouseleave', handleLogoLeave)
		}

		return () => {
			if (logoContainer) {
				logoContainer.removeEventListener('mouseenter', handleLogoHover)
				logoContainer.removeEventListener('mouseleave', handleLogoLeave)
			}
		}
	}, [])

	// Покращена функція для закриття меню при кліку поза ним
	useEffect(() => {
		const handleClickOutside = event => {
			if (
				isCoursesOpen &&
				coursesRef.current &&
				!coursesRef.current.contains(event.target) &&
				!event.target.closest(`.${styles.navItemDropdown}`)
			) {
				setIsCoursesOpen(false)
			}

			if (
				isMobileMenuOpen &&
				mobileMenuRef.current &&
				!mobileMenuRef.current.contains(event.target) &&
				!event.target.closest(`.${styles.mobileMenuButton}`)
			) {
				setIsMobileMenuOpen(false)
			}
		}

		document.addEventListener('mousedown', handleClickOutside)
		return () => document.removeEventListener('mousedown', handleClickOutside)
	}, [isCoursesOpen, isMobileMenuOpen])

	// Додаємо затримку перед закриттям dropdown для кращого UX
	const dropdownTimerRef = useRef(null)

	const handleDropdownMouseLeave = () => {
		dropdownTimerRef.current = setTimeout(() => setIsCoursesOpen(false), 100)
	}

	const handleDropdownMouseEnter = () => {
		if (dropdownTimerRef.current) {
			clearTimeout(dropdownTimerRef.current)
			dropdownTimerRef.current = null
		}
		setIsCoursesOpen(true)
	}

	// Очищуємо таймер при розмонтуванні компонента
	useEffect(() => {
		return () => {
			if (dropdownTimerRef.current) {
				clearTimeout(dropdownTimerRef.current)
			}
		}
	}, [])

	// Покращена функція для навігації з View Transitions API (де підтримується)
	const navigateWithTransition = url => {
		if (typeof document.startViewTransition === 'function') {
			document.startViewTransition(() => {
				window.location.href = url
			})
		} else {
			window.location.href = url
		}
	}

	const courses = [
		{
			icon: <Code className={styles.courseIcon} />,
			title: 'Python & JavaScript',
			description: 'Основи програмування та алгоритми',
			age: '10-16 років',
			color: 'blue',
			popular: true,
		},
		{
			icon: <Gamepad2 className={styles.courseIcon} />,
			title: 'Розробка ігор',
			description: 'Unity, Roblox Studio, Scratch',
			age: '8-17 років',
			color: 'green',
			popular: false,
		},
		{
			icon: <Monitor className={styles.courseIcon} />,
			title: 'Веб-розробка',
			description: 'HTML, CSS, React, дизайн',
			age: '12-18 років',
			color: 'purple',
			popular: false,
		},
	]

	const navItems = [
		{ label: 'Курси', href: '#courses', dropdown: true },
		{ label: 'Про нас', href: '#about' },
		{ label: 'Відгуки', href: '#testimonials' },
		{ label: 'Контакти', href: '#contacts' },
	]

	// Покращені обробники для hover ефектів
	const handleNavLinkMouseEnter = (e, index) => {
		const underline = underlineRefs.current[index]
		if (underline) {
			gsap.killTweensOf(underline)
			gsap.fromTo(
				underline,
				{ width: 0 },
				{ width: '100%', duration: 0.4, ease: 'power2.out' }
			)
		}
	}

	const handleNavLinkMouseLeave = (e, index) => {
		const underline = underlineRefs.current[index]
		if (underline) {
			gsap.killTweensOf(underline)
			gsap.to(underline, { width: 0, duration: 0.3, ease: 'power2.in' })
		}
	}

	// Професійна анімація для CTA кнопки
	const handleCtaMouseEnter = e => {
		const button = e.currentTarget
		const shine = button.querySelector('.shine-effect')

		// Subtle glow ефект
		gsap.to(button, {
			filter: 'brightness(1.1) saturate(1.2)',
			duration: 0.3,
			ease: 'power2.out',
		})

		if (shine) {
			gsap.fromTo(
				shine,
				{ x: '-100%', opacity: 0.5 },
				{
					x: '200%',
					opacity: 0,
					duration: 0.8,
					ease: 'power2.out',
				}
			)
		}
	}

	const handleCtaMouseLeave = e => {
		const button = e.currentTarget

		gsap.to(button, {
			filter: 'brightness(1) saturate(1)',
			duration: 0.3,
			ease: 'power2.out',
		})
	}

	// Професійна анімація для контактної інформації
	const handleContactMouseEnter = e => {
		const contact = e.currentTarget
		const icon = contact.querySelector(`.${styles.contactIcon}`)

		gsap.to(contact, {
			scale: 1.02,
			duration: 0.3,
			ease: 'power2.out',
		})

		if (icon) {
			gsap.to(icon, {
				rotation: 5,
				scale: 1.1,
				duration: 0.3,
				ease: 'back.out(1.7)',
			})
		}
	}

	const handleContactMouseLeave = e => {
		const contact = e.currentTarget
		const icon = contact.querySelector(`.${styles.contactIcon}`)

		gsap.to(contact, {
			scale: 1,
			duration: 0.3,
			ease: 'power2.out',
		})

		if (icon) {
			gsap.to(icon, {
				rotation: 0,
				scale: 1,
				duration: 0.3,
				ease: 'power2.out',
			})
		}
	}

	return (
		<header
			ref={headerRef}
			className={`${styles.header} ${isScrolled ? styles.scrolled : ''}`}
			style={{
				'--mouse-x': `${mousePosition.x}px`,
				'--mouse-y': `${mousePosition.y}px`,
			}}
			aria-label='Основна навігація сайту'
		>
			<div className={styles.container}>
				<div className={styles.headerContent}>
					{/* Logo з 3D ефектом */}
					<a href='/' className={styles.logo} aria-current='page'>
						<div className={styles.logoIcon}>
							<img
								src='logo.jpg'
								alt='SmartCode Academy'
								className={styles.logoSvg}
								loading='eager'
								decoding='async'
							/>
						</div>
						<div className={styles.logoText}>
							<span className={styles.logoTitle}>SmartCode</span>
							<span className={styles.logoSubtitle}>Academy</span>
						</div>
					</a>

					{/* Navigation */}
					<nav className={styles.nav} aria-label='Головне меню'>
						{navItems.map((item, index) =>
							item.dropdown ? (
								<div
									key={index}
									className={styles.navItemDropdown}
									onMouseEnter={handleDropdownMouseEnter}
									onMouseLeave={handleDropdownMouseLeave}
									aria-expanded={isCoursesOpen}
									role='menu'
								>
									<button
										className={styles.navLink}
										aria-haspopup='true'
										aria-expanded={isCoursesOpen}
									>
										{item.label}
										<ChevronDown
											className={`${styles.chevron} ${
												isCoursesOpen ? styles.chevronRotated : ''
											}`}
											aria-hidden='true'
										/>
										<span
											className='underline-effect'
											style={{
												display: 'block',
												height: '3px',
												background:
													'linear-gradient(135deg, var(--primary-blue) 0%, var(--primary-purple) 100%)',
												borderRadius: 'var(--radius-full)',
												width: '0',
												position: 'absolute',
												bottom: 0,
												left: 0,
											}}
										></span>
									</button>

									{/* Dropdown Menu */}
									<div
										ref={coursesRef}
										className={`${styles.dropdown} ${
											isCoursesOpen ? styles.dropdownOpen : ''
										}`}
										role='menu'
										aria-label='Меню курсів'
									>
										<div className={styles.dropdownContent}>
											<div className={styles.dropdownHeader}>
												<h3 className={styles.dropdownTitle}>Наші курси</h3>
												<p className={styles.dropdownSubtitle}>
													Обери свій шлях у програмуванні
												</p>
											</div>
											{courses.map((course, courseIndex) => (
												<a
													key={courseIndex}
													href={`#course-${courseIndex}`}
													className={styles.dropdownItem}
													role='menuitem'
													onMouseEnter={e => {
														const el = e.currentTarget
														gsap.to(el, {
															background: 'rgba(37, 99, 235, 0.08)',
															duration: 0.3,
														})
													}}
													onMouseLeave={e => {
														const el = e.currentTarget
														gsap.to(el, {
															background: 'transparent',
															duration: 0.3,
														})
													}}
												>
													<div
														className={`${styles.dropdownIcon} ${
															styles[course.color]
														}`}
													>
														{course.icon}
													</div>
													<div className={styles.dropdownInfo}>
														<div className={styles.courseHeader}>
															<h4 className={styles.courseTitle}>
																{course.title}
															</h4>
															{course.popular && (
																<span className={styles.popularBadge}>
																	<Star className={styles.starIcon} />
																	Популярний
																</span>
															)}
														</div>
														<p className={styles.courseDescription}>
															{course.description}
														</p>
														<span className={styles.courseAge}>
															{course.age}
														</span>
													</div>
												</a>
											))}
											<div className={styles.dropdownFooter}>
												<a
													href='#all-courses'
													className={styles.dropdownLink}
													role='menuitem'
												>
													<Users className={styles.linkIcon} />
													Переглянути всі курси
												</a>
											</div>
										</div>
									</div>
								</div>
							) : (
								<a
									key={index}
									href={item.href}
									className={styles.navLink}
									role='menuitem'
									onMouseEnter={e => handleNavLinkMouseEnter(e, index)}
									onMouseLeave={e => handleNavLinkMouseLeave(e, index)}
									onClick={e => {
										e.preventDefault()
										navigateWithTransition(item.href)
									}}
									ref={el => {
										underlineRefs.current[index] =
											el?.querySelector('.underline-effect') || null
									}}
								>
									{item.label}
									<span
										className='underline-effect'
										style={{
											display: 'block',
											height: '3px',
											background:
												'linear-gradient(135deg, var(--primary-blue) 0%, var(--primary-purple) 100%)',
											borderRadius: 'var(--radius-full)',
											width: '0',
											position: 'absolute',
											bottom: 0,
											left: 0,
										}}
									></span>
								</a>
							)
						)}
					</nav>

					{/* Right side */}
					<div className={styles.headerRight}>
						{/* Contact Info */}
						<a
							href='tel:+380671234567'
							className={styles.contactInfo}
							aria-label='Подзвонити нам: +38 (067) 123-45-67'
							onMouseEnter={handleContactMouseEnter}
							onMouseLeave={handleContactMouseLeave}
						>
							<Phone className={styles.contactIcon} aria-hidden='true' />
							<span className={styles.contactText}>+38 (067) 123-45-67</span>
						</a>

						{/* CTA Button з advanced hover ефектами */}
						<button
							className={styles.ctaButton}
							onMouseEnter={handleCtaMouseEnter}
							onMouseLeave={handleCtaMouseLeave}
							aria-label='Записатися на безкоштовний урок'
							ref={shineRef}
						>
							<Sparkles className={styles.ctaIcon} aria-hidden='true' />
							Безкоштовний урок
							<span
								className='shine-effect'
								style={{
									position: 'absolute',
									top: 0,
									left: 0,
									width: '100%',
									height: '100%',
									background:
										'linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)',
									transform: 'skewX(-25deg)',
									pointerEvents: 'none',
									opacity: 0,
								}}
							></span>
						</button>

						{/* Mobile menu button */}
						<button
							className={styles.mobileMenuButton}
							onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
							aria-expanded={isMobileMenuOpen}
							aria-label={isMobileMenuOpen ? 'Закрити меню' : 'Відкрити меню'}
						>
							{isMobileMenuOpen ? (
								<X aria-hidden='true' />
							) : (
								<Menu aria-hidden='true' />
							)}
						</button>
					</div>
				</div>
			</div>

			{/* Mobile Menu */}
			<div
				ref={mobileMenuRef}
				className={`${styles.mobileMenu} ${
					isMobileMenuOpen ? styles.mobileMenuOpen : ''
				}`}
				role='dialog'
				aria-modal={isMobileMenuOpen}
				aria-label='Мобільне меню'
			>
				<div className={styles.mobileMenuContent}>
					<div className={styles.mobileNavSection}>
						<h3 className={styles.mobileNavTitle}>Меню</h3>
						{navItems.map((item, index) => (
							<a
								key={index}
								href={item.href}
								className={styles.mobileNavLink}
								onClick={() => {
									setIsMobileMenuOpen(false)
									navigateWithTransition(item.href)
								}}
								role='menuitem'
							>
								{item.label}
							</a>
						))}
					</div>

					<div className={styles.mobileNavSection}>
						<h3 className={styles.mobileNavTitle}>Курси</h3>
						{courses.map((course, index) => (
							<a
								key={index}
								href={`#course-${index}`}
								className={styles.mobileCourseLink}
								onClick={() => setIsMobileMenuOpen(false)}
								role='menuitem'
							>
								<div
									className={`${styles.mobileCourseIcon} ${
										styles[course.color]
									}`}
								>
									{course.icon}
								</div>
								<div>
									<div className={styles.mobileCourseTitle}>{course.title}</div>
									<div className={styles.mobileCourseAge}>{course.age}</div>
								</div>
								{course.popular && (
									<span className={styles.mobilePopularBadge}>Топ</span>
								)}
							</a>
						))}
					</div>

					<div className={styles.mobileFooter}>
						<a href='tel:+380671234567' className={styles.mobileContact}>
							<Phone className={styles.mobileContactIcon} aria-hidden='true' />
							<span>+38 (067) 123-45-67</span>
						</a>
						<button className={styles.mobileCtaButton}>
							<Sparkles className={styles.ctaIcon} aria-hidden='true' />
							Безкоштовний урок
						</button>
					</div>
				</div>
			</div>
		</header>
	)
}

export default Header
