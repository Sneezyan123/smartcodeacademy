'use client'
import React, { useState, useEffect } from 'react'
import {
	ChevronDown,
	Phone,
	User,
	Menu,
	X,
	Code,
	Gamepad2,
	Monitor,
	MapPin,
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
			title: 'Програмування',
			description: 'Python, JavaScript, Java',
			age: '8-16 років',
			color: 'blue',
		},
		{
			icon: <Gamepad2 className={styles.courseIcon} />,
			title: 'Розробка ігор',
			description: 'Unity, Scratch, Roblox',
			age: '9-17 років',
			color: 'green',
		},
		{
			icon: <Monitor className={styles.courseIcon} />,
			title: 'Веб-дизайн',
			description: 'HTML, CSS, Figma',
			age: '10-18 років',
			color: 'purple',
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
							<img src= "logo.jpg" className={styles.logoSvg}/>

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
														<h4 className={styles.dropdownTitle}>
															{course.title}
														</h4>
														<p className={styles.dropdownDescription}>
															{course.description}
														</p>
														<span className={styles.dropdownAge}>
															{course.age}
														</span>
													</div>
												</a>
											))}
											<div className={styles.dropdownFooter}>
												<a href='#all-courses' className={styles.dropdownLink}>
													Переглянути всі курси →
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
						<button className={styles.ctaButton}>Безкоштовний урок</button>

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
							</a>
						))}
					</div>

					<div className={styles.mobileFooter}>
						<a href='tel:+380671234567' className={styles.mobileContact}>
							<Phone className={styles.mobileContactIcon} />
							<span>+38 (067) 123-45-67</span>
						</a>
						<button className={styles.mobileCtaButton}>
							Безкоштовний урок
						</button>
					</div>
				</div>
			</div>
		</header>
	)
}

export default Header
