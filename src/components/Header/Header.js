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
import Link from 'next/link'
import Image from 'next/image'

const Header = () => {
	const [isCoursesOpen, setIsCoursesOpen] = useState(false)
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
	const [isScrolled, setIsScrolled] = useState(false)
	const headerRef = useRef(null)
	const dropdownTimerRef = useRef(null)

	// Відстеження прокрутки для зміни стилю хедера
	useEffect(() => {
		const handleScroll = () => {
			setIsScrolled(window.scrollY > 20)
		}
		window.addEventListener('scroll', handleScroll, { passive: true })
		return () => window.removeEventListener('scroll', handleScroll)
	}, [])

	// Анімація появи хедера
	useEffect(() => {
		gsap.fromTo(
			headerRef.current,
			{ y: -80, opacity: 0 },
			{ y: 0, opacity: 1, duration: 1, ease: 'power3.out', delay: 0.2 }
		)
	}, [])

	// Анімація випадаючого меню
	useEffect(() => {
		const dropdown = headerRef.current?.querySelector(`.${styles.dropdown}`)
		if (!dropdown) return

		if (isCoursesOpen) {
			gsap
				.timeline()
				.set(dropdown, { display: 'block' })
				.to(dropdown, { opacity: 1, y: 0, duration: 0.3, ease: 'power2.out' })
				.fromTo(
					`.${styles.dropdownItem}`,
					{ opacity: 0, x: -15 },
					{
						opacity: 1,
						x: 0,
						stagger: 0.05,
						duration: 0.3,
						ease: 'power2.out',
					},
					'-=0.2'
				)
		} else {
			gsap.to(dropdown, {
				opacity: 0,
				y: -10,
				duration: 0.2,
				ease: 'power2.in',
				onComplete: () => gsap.set(dropdown, { display: 'none' }),
			})
		}
	}, [isCoursesOpen])

	// Анімація мобільного меню
	useEffect(() => {
		const mobileMenu = headerRef.current?.querySelector(`.${styles.mobileMenu}`)
		if (!mobileMenu) return

		if (isMobileMenuOpen) {
			gsap
				.timeline()
				.set(mobileMenu, { display: 'block' })
				.to(mobileMenu, { opacity: 1, x: 0, duration: 0.5, ease: 'power3.out' })
				.fromTo(
					`.${styles.mobileNavLink}, .${styles.mobileCourseLink}`,
					{ opacity: 0, y: 20 },
					{
						opacity: 1,
						y: 0,
						stagger: 0.07,
						duration: 0.4,
						ease: 'power2.out',
					},
					'-=0.3'
				)
		} else {
			gsap.to(mobileMenu, {
				opacity: 0,
				x: '100%',
				duration: 0.4,
				ease: 'power3.in',
				onComplete: () => gsap.set(mobileMenu, { display: 'none' }),
			})
		}
	}, [isMobileMenuOpen])

	// Логіка для плавного відкриття/закриття випадаючого меню
	const handleDropdownMouseEnter = () => {
		clearTimeout(dropdownTimerRef.current)
		setIsCoursesOpen(true)
	}
	const handleDropdownMouseLeave = () => {
		dropdownTimerRef.current = setTimeout(() => setIsCoursesOpen(false), 200)
	}

	// Дані для навігації та курсів
	const navItems = [
		{ label: 'Курси', dropdown: true },
		{ label: 'Про нас', href: '#about' },
		{ label: 'Відгуки', href: '#testimonials' },
		{ label: 'Контакти', href: '#contacts' },
	]
	const courses = [
		{
			icon: <Code size={24} />,
			title: 'Python & JavaScript',
			description: 'Основи програмування та алгоритми',
			age: '10-16 років',
			theme: 'blue',
			popular: true,
		},
		{
			icon: <Gamepad2 size={24} />,
			title: 'Розробка ігор',
			description: 'Unity, Roblox Studio, Scratch',
			age: '8-17 років',
			theme: 'green',
		},
		{
			icon: <Monitor size={24} />,
			title: 'Веб-розробка',
			description: 'HTML, CSS, React, дизайн',
			age: '12-18 років',
			theme: 'purple',
		},
	]

	return (
		<header
			ref={headerRef}
			className={`${styles.header} ${isScrolled ? styles.scrolled : ''}`}
		>
			<div className={styles.container}>
				<div className={styles.headerContent}>
					{/* Логотип */}
					<Link href="/" className={styles.logo}>
						<div className={styles.logoIconWrapper}>
							<Image
								src="/logo.jpg"
								alt="SmartCode Academy Logo"
								className={styles.logoImage}
								width={48}
								height={48}
							/>
						</div>
						<div className={styles.logoText}>
							<span className={styles.logoTitle}>SmartCode</span>
							<span className={styles.logoSubtitle}>Academy</span>
						</div>
					</Link>

					{/* Навігація для десктопу */}
					<nav className={styles.nav}>
						{navItems.map((item, index) =>
							item.dropdown ? (
								<div
									key={index}
									className={styles.navItemDropdown}
									onMouseEnter={handleDropdownMouseEnter}
									onMouseLeave={handleDropdownMouseLeave}
								>
									<button className={styles.navLink}>
										{item.label}
										<ChevronDown
											size={16}
											className={`${styles.chevron} ${
												isCoursesOpen ? styles.chevronRotated : ''
											}`}
										/>
									</button>
									<div className={styles.dropdown}>
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
												>
													<div
														className={`${styles.dropdownIcon} ${
															styles[course.theme]
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
																	<Star size={10} /> Популярний
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
												<a href='#all-courses' className={styles.dropdownLink}>
													<Users size={14} /> Переглянути всі курси
												</a>
											</div>
										</div>
									</div>
								</div>
							) : (
								<a key={index} href={item.href} className={styles.navLink}>
									{item.label}
								</a>
							)
						)}
					</nav>

					{/* Права частина хедера */}
					<div className={styles.headerRight}>
						<a href='tel:+380671234567' className={styles.contactInfo}>
							<Phone size={18} />
							<span className={styles.contactText}>+38 (067) 123-45-67</span>
						</a>
						<button className={styles.ctaButton}>
							<Sparkles size={18} />
							Безкоштовний урок
						</button>
						<button
							className={styles.mobileMenuButton}
							onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
							aria-label='Меню'
						>
							{isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
						</button>
					</div>
				</div>
			</div>

			{/* Мобільне меню */}
			<div className={styles.mobileMenu}>
				<div className={styles.mobileMenuContent}>
					<div className={styles.mobileNavSection}>
						<h3 className={styles.mobileNavTitle}>Меню</h3>
						{navItems.map((item, index) => (
							<a
								key={index}
								href={item.href}
								className={styles.mobileNavLink}
								onClick={() => setIsMobileMenuOpen(false)}
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
							>
								<div
									className={`${styles.mobileCourseIcon} ${
										styles[course.theme]
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
							<Phone size={18} />
							<span>+38 (067) 123-45-67</span>
						</a>
						<button className={styles.mobileCtaButton}>
							<Sparkles size={20} />
							Безкоштовний урок
						</button>
					</div>
				</div>
			</div>
		</header>
	)
}

export default Header
