'use client'
import React, { useState, useEffect } from 'react'
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

const Header = () => {
	const [isCoursesOpen, setIsCoursesOpen] = useState(false)
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
	const [isScrolled, setIsScrolled] = useState(false)

	useEffect(() => {
		const handleScroll = () => {
			setIsScrolled(window.scrollY > 10)
		}
		window.addEventListener('scroll', handleScroll)
		return () => window.removeEventListener('scroll', handleScroll)
	}, [])

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

	return (
		<header className={`${styles.header} ${isScrolled ? styles.scrolled : ''}`}>
			<div className={styles.container}>
				<div className={styles.headerContent}>
					{/* Logo */}
					<a href='/' className={styles.logo}>
						<div className={styles.logoIcon}>
							<img
								src='logo.jpg'
								alt='SmartCode Academy'
								className={styles.logoSvg}
							/>
						</div>
						<div className={styles.logoText}>
							<span className={styles.logoTitle}>SmartCode</span>
							<span className={styles.logoSubtitle}>Academy</span>
						</div>
					</a>

					{/* Navigation */}
					<nav className={styles.nav}>
						{navItems.map((item, index) =>
							item.dropdown ? (
								<div
									key={index}
									className={styles.navItemDropdown}
									onMouseEnter={() => setIsCoursesOpen(true)}
									onMouseLeave={() => setIsCoursesOpen(false)}
								>
									<button className={styles.navLink}>
										{item.label}
										<ChevronDown
											className={`${styles.chevron} ${
												isCoursesOpen ? styles.chevronRotated : ''
											}`}
										/>
									</button>

									{/* Dropdown Menu */}
									<div
										className={`${styles.dropdown} ${
											isCoursesOpen ? styles.dropdownOpen : ''
										}`}
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
												<a href='#all-courses' className={styles.dropdownLink}>
													<Users className={styles.linkIcon} />
													Переглянути всі курси
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

					{/* Right side */}
					<div className={styles.headerRight}>
						{/* Contact Info */}
						<a href='tel:+380671234567' className={styles.contactInfo}>
							<Phone className={styles.contactIcon} />
							<span className={styles.contactText}>+38 (067) 123-45-67</span>
						</a>

						{/* CTA Button */}
						<button className={styles.ctaButton}>
							<Sparkles className={styles.ctaIcon} />
							Безкоштовний урок
						</button>

						{/* Mobile menu button */}
						<button
							className={styles.mobileMenuButton}
							onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
							aria-label='Відкрити меню'
						>
							{isMobileMenuOpen ? <X /> : <Menu />}
						</button>
					</div>
				</div>
			</div>

			{/* Mobile Menu */}
			<div
				className={`${styles.mobileMenu} ${
					isMobileMenuOpen ? styles.mobileMenuOpen : ''
				}`}
			>
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
							<Phone className={styles.mobileContactIcon} />
							<span>+38 (067) 123-45-67</span>
						</a>
						<button className={styles.mobileCtaButton}>
							<Sparkles className={styles.ctaIcon} />
							Безкоштовний урок
						</button>
					</div>
				</div>
			</div>
		</header>
	)
}

export default Header
