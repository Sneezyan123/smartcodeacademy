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
import { usePathname, useRouter } from 'next/navigation'
import Image from 'next/image'

const Header = () => {
	const [isCoursesOpen, setIsCoursesOpen] = useState(false)
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
	const [isScrolled, setIsScrolled] = useState(false)
	const headerRef = useRef(null)
    const router = useRouter()
    const pathname = usePathname()
    const scrollLockYRef = useRef(0)

	// Відстеження прокрутки для зміни стилю хедера
	useEffect(() => {
		const handleScroll = () => {
			setIsScrolled(window.scrollY > 20)
		}
		window.addEventListener('scroll', handleScroll, { passive: true })
		return () => window.removeEventListener('scroll', handleScroll)
	}, [])

	// Анімація випадаючого меню
	useEffect(() => {
		const dropdown = headerRef.current?.querySelector(`.${styles.dropdown}`)
		if (!dropdown) return

		if (isCoursesOpen) {
			gsap
				.timeline()
				.set(dropdown, { display: 'block' })
				.to(dropdown, { opacity: 1, duration: 0.3, ease: 'power2.out' })
				.fromTo(
					`.${styles.dropdownItem}`,
					{ opacity: 0, y: 10 },
					{
						opacity: 1,
						y: 0,
						stagger: 0.05,
						duration: 0.3,
						ease: 'power2.out',
					},
					'-=0.2'
				)
		} else {
			gsap.to(dropdown, {
				opacity: 0,
				duration: 0.2,
				ease: 'power2.in',
				onComplete: () => gsap.set(dropdown, { display: 'none' }),
			})
		}
	}, [isCoursesOpen])

    // ПОВНОЕКРАННА анімація мобільного меню + Scroll Lock як у модального вікна
	useEffect(() => {
		const mobileMenu = headerRef.current?.querySelector(`.${styles.mobileMenu}`)
		if (!mobileMenu) return

		if (isMobileMenuOpen) {
            // Блокуємо скрол сторінки (навіть на iOS)
            scrollLockYRef.current = window.scrollY || window.pageYOffset || 0
            document.body.style.position = 'fixed'
            document.body.style.top = `-${scrollLockYRef.current}px`
            document.body.style.left = '0'
            document.body.style.right = '0'
            document.body.style.width = '100%'
			
			// Показуємо меню
			gsap.set(mobileMenu, { 
				display: 'flex', 
				opacity: 0,
				scale: 0.95
			})
			
			// Анімація входу (fade + scale)
			gsap.to(mobileMenu, { 
				opacity: 1,
				scale: 1,
				duration: 0.3, 
				ease: 'power2.out' 
			})
			
			// Анімація контенту всередині
			gsap.fromTo(
				mobileMenu.querySelectorAll(`.${styles.mobileMenuItem}`),
				{ 
					opacity: 0, 
					y: 20
				},
				{
					opacity: 1,
					y: 0,
					stagger: 0.1,
					duration: 0.4,
					ease: 'power2.out',
					delay: 0.2
				}
			)
		} else {
            // Розблоковуємо скрол і відновлюємо позицію
            const y = Math.abs(parseInt(document.body.style.top || '0', 10)) || 0
            document.body.style.position = ''
            document.body.style.top = ''
            document.body.style.left = ''
            document.body.style.right = ''
            document.body.style.width = ''
			
			// Анімація виходу
			gsap.to(mobileMenu, {
				opacity: 0,
				scale: 0.95,
				duration: 0.25,
				ease: 'power2.in',
				onComplete: () => {
					gsap.set(mobileMenu, { display: 'none' })
                    window.scrollTo(0, y)
				}
			})
		}

		// Cleanup функція
        return () => {
            if (!isMobileMenuOpen) {
                document.body.style.position = ''
                document.body.style.top = ''
                document.body.style.left = ''
                document.body.style.right = ''
                document.body.style.width = ''
            }
        }
	}, [isMobileMenuOpen])

	// Закриття dropdown по ESC або кліку поза меню
	useEffect(() => {
		const handleEscape = (e) => {
			if (e.key === 'Escape') {
				setIsCoursesOpen(false)
			}
		}

		const handleClickOutside = (e) => {
			if (isCoursesOpen && !e.target.closest(`.${styles.dropdown}`) && !e.target.closest(`.${styles.navItemDropdown}`)) {
				setIsCoursesOpen(false)
			}
		}

		if (isCoursesOpen) {
			document.addEventListener('keydown', handleEscape)
			document.addEventListener('mousedown', handleClickOutside)
		}

		return () => {
			document.removeEventListener('keydown', handleEscape)
			document.removeEventListener('mousedown', handleClickOutside)
		}
	}, [isCoursesOpen])

	// Закриття мобільного меню по ESC
	useEffect(() => {
		const handleEscape = (e) => {
			if (e.key === 'Escape') {
				setIsMobileMenuOpen(false)
			}
		}

		if (isMobileMenuOpen) {
			document.addEventListener('keydown', handleEscape)
		}

		return () => {
			document.removeEventListener('keydown', handleEscape)
		}
	}, [isMobileMenuOpen])

	// Логіка для dropdown меню (тільки клік, без hover)
	const handleDropdownToggle = () => {
		setIsCoursesOpen(!isCoursesOpen)
	}

	const handleMobileMenuToggle = () => {
		setIsMobileMenuOpen(!isMobileMenuOpen)
	}

	const handleMobileMenuClose = () => {
		setIsMobileMenuOpen(false)
	}

    const handleCtaClick = (e) => {
        e.preventDefault()
        if (pathname === '/') {
            const target = document.getElementById('Contactform')
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' })
            } else {
                // fallback to hash – HomeClient will handle deferred scrolling
                window.location.hash = '#Contactform'
            }
        } else {
            router.push('/#Contactform')
        }
        setIsMobileMenuOpen(false)
    }

	const navItems = [
		{ label: 'Курси', dropdown: true },
		{ label: 'Відгуки', href: '/#testimonials' },
		{ label: 'Контакти', href: '/#Contactform' },
	]
	
	const courses = [
		{
			icon: <Code size={24} />,
			title: 'Python',
			description: 'Основи програмування на Python',
			link: "/python",
			age: '10-16 років',
			theme: 'blue',
			popular: true,
		},
		{
			icon: <Gamepad2 size={24} />,
			title: 'Розробка ігор',
			description: 'C# та Unity',
			link: "/Unity",
			age: '8-17 років',
			theme: 'green',
		},
		{
			icon: <Monitor size={24} />,
			title: 'Веб-розробка',
			description: 'HTML, CSS, React, дизайн',
			link: "/webDev",
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
								>
									<button 
										className={styles.navLink}
										onClick={handleDropdownToggle}
									>
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

											<div className={styles.dropdownGrid}>
												{courses.map((course, courseIndex) => (
													<Link
														key={courseIndex}
														href={course.link}
														className={styles.dropdownItem}
														onClick={() => setIsCoursesOpen(false)}
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
													</Link>
												))}
											</div>
										</div>
									</div>
								</div>
							) : (
								<Link key={index} href={item.href} className={styles.navLink}>
									{item.label}
								</Link>
							)
						)}
					</nav>

					{/* Права частина хедера */}
                    <div className={styles.headerRight}>
                        <Link href="/#Contactform" className={styles.ctaButton} onClick={handleCtaClick} scroll={false}>
							<Sparkles size={18} />
							Безкоштовний урок
						</Link>
						<button
							className={styles.mobileMenuButton}
							onClick={handleMobileMenuToggle}
							aria-label='Меню'
						>
							<Menu size={24} />
						</button>
					</div>
				</div>
			</div>

			{/* Повноекранне мобільне меню */}
            <div 
                className={styles.mobileMenu}
                role="dialog" 
                aria-modal="true" 
                aria-hidden={!isMobileMenuOpen}
                onClick={handleMobileMenuClose}
            >
				{/* Кнопка закриття зверху справа */}
				<button 
					className={styles.mobileMenuClose}
					onClick={handleMobileMenuClose}
					aria-label="Закрити меню"
				>
					<X size={24} />
				</button>

                <div className={styles.mobileMenuContent} onClick={(e) => e.stopPropagation()}>
					{/* Логотип в меню */}
					<div className={styles.mobileMenuHeader}>
						<div className={styles.mobileMenuLogo}>
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
						</div>
					</div>

					{/* Меню пунктів */}
					<div className={styles.mobileMenuNav}>
						{/* Курси */}
						<div className={styles.mobileMenuSection}>
							<h3 className={styles.mobileMenuSectionTitle}>Курси</h3>
							{courses.map((course, index) => (
								<Link
									key={index}
									href={course.link}
									className={`${styles.mobileMenuItem} ${styles.mobileCourseItem}`}
									onClick={handleMobileMenuClose}
								>
									<div className={`${styles.mobileCourseIcon} ${styles[course.theme]}`}>
										{course.icon}
									</div>
									<div className={styles.mobileCourseInfo}>
										<div className={styles.mobileCourseTitle}>
											{course.title}
											{course.popular && (
												<span className={styles.mobilePopularBadge}>
													<Star size={10} /> Топ
												</span>
											)}
										</div>
										<div className={styles.mobileCourseDescription}>
											{course.description}
										</div>
										<div className={styles.mobileCourseAge}>{course.age}</div>
									</div>
								</Link>
							))}
						</div>

						{/* Навігація */}
						<div className={styles.mobileMenuSection}>
							<h3 className={styles.mobileMenuSectionTitle}>Сторінки</h3>
							{navItems
								.filter(item => !item.dropdown)
								.map((item, index) => (
									<Link
										key={index}
										href={item.href}
										className={`${styles.mobileMenuItem} ${styles.mobileNavItem}`}
										onClick={handleMobileMenuClose}
									>
										{item.label}
									</Link>
								))}
						</div>
					</div>

					{/* Контакти та CTA */}
					<div className={styles.mobileMenuFooter}>
                        <Link 
                            href="/#Contactform" 
                            className={`${styles.mobileMenuItem} ${styles.mobileCtaButton}`}
                            onClick={handleCtaClick}
                            scroll={false}
                        >
							<Sparkles size={20} />
							Безкоштовний урок
						</Link>
					</div>
				</div>
			</div>
		</header>
	)
}

export default Header