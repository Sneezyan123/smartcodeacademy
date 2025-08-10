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
import EnhancedCourseCards from './EnhancedCourseCards'
import Link from 'next/link'
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
		{ number: '500+', label: 'Випускників', icon: <Users /> },
		{ number: '200+', label: 'Годин кодування', icon: <Code /> },
		{ number: '3+', label: 'Роки досвіду', icon: <Clock /> },
		{ number: '4.9', label: 'Рейтинг', icon: <Star /> },
		{ number: '8+', label: 'Курсів', icon: <BookOpen /> },
		{ number: '15+', label: 'Викладачів', icon: <Monitor /> },
		{ number: '20+', label: 'Проектів', icon: <Rocket /> },
		{ number: '98%', label: 'Задоволених учнів', icon: <Trophy /> },
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
								<span>Онлайн заняття</span>
							</div>
							<div className={styles.feature}>
								<div className={styles.featureIcon}>
									<Award className={styles.icon} />
								</div>
								<span>Міжнародний сертифікат</span>
							</div>
						</div>

                        <div className={styles.ctaButtons}>
                            <Link href="/#Contactform" className={styles.primaryButton} onClick={(e) => { e.preventDefault(); window.dispatchEvent(new Event('openContactModal')) }} scroll={false}>
                                <Play className={styles.buttonIcon} />
                                Почати навчання безкоштовно
                            </Link>
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

				<EnhancedCourseCards/>


			</div>
		</div>
	)
}

export default Visit
