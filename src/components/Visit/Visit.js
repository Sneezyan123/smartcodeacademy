'use client'
import React, { useState, useEffect, useRef, useMemo } from 'react'
import {
	Users,
	Monitor,
	Star,
	Award,
	Clock,
	BookOpen,
	Trophy,
	Rocket,
	Play,
	CheckCircle,
	Eye,
	Target,
} from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import styles from './Visit.module.css'
import EnhancedCourseCards from './EnhancedCourseCards'
gsap.registerPlugin(ScrollTrigger)

// --- Компонент для частинок (для карток курсів) ---
const generateParticles = colors => {
	return Array.from({ length: 50 }, (_, i) => ({
		id: `particle-${i}`,
		color: colors[Math.floor(Math.random() * colors.length)],
		left: `${Math.random() * 100}%`,
		top: `${Math.random() * 100}%`,
		animationDelay: `${Math.random() * 15}s`,
		animationDuration: `${8 + Math.random() * 10}s`,
		size: `${1 + Math.random() * 2}px`,
	}))
}

const ParticleBackground = ({ colors }) => {
	const particles = useMemo(() => generateParticles(colors), [colors])
	return (
		<div className={styles.particleContainer}>
			{particles.map(p => (
				<div
					key={p.id}
					className={styles.particle}
					style={{
						'--particle-color': p.color,
						left: p.left,
						top: p.top,
						width: p.size,
						height: p.size,
						animationDelay: p.animationDelay,
						animationDuration: p.animationDuration,
					}}
				/>
			))}
		</div>
	)
}

const Visit = () => {
	const sectionRef = useRef(null)
	const [currentStat, setCurrentStat] = useState(0)

	// --- GSAP Анімації ---
	useEffect(() => {
		const ctx = gsap.context(() => {
			// Анімація елементів, що з'являються знизу
			gsap.fromTo(
				`.${styles.animateUp}`,
				{ y: 50, opacity: 0 },
				{
					y: 0,
					opacity: 1,
					duration: 1,
					ease: 'power3.out',
					stagger: 0.15,
					scrollTrigger: {
						trigger: sectionRef.current,
						start: 'top 80%',
						toggleActions: 'play none none reverse',
					},
				}
			)
		}, sectionRef)

		// Анімація статистики
		const interval = setInterval(() => {
			setCurrentStat(prev => (prev + 1) % stats.length)
		}, 3000)

		return () => {
			ctx.revert()
			clearInterval(interval)
		}
	}, [])

	// --- Дані ---
	const stats = [
		{ number: '500+', label: 'Випускників', icon: <Users /> },
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
			id: 'python',
			title: 'PYTHON',
			subtitle: 'Програмування майбутнього',
			icon: '🐍',
			description:
				'Відкрий космос можливостей з найпопулярнішою мовою програмування світу. Створюй ШІ, веб-додатки та аналізуй дані.',
			features: [
				'Основи Python',
				'ООП та алгоритми',
				'Django/Flask',
				'Data Science',
			],
			stats: {
				duration: '6 міс',
				age: '10-16',
				students: '324+',
				projects: '20+',
			},
			theme: 'themePython',
			particleColors: ['#c084fc', '#93c5fd', '#f9a8d4', '#fcd34d'],
		},
		{
			id: 'gamedev',
			title: 'ГЕЙМДЕВ',
			subtitle: 'Створення власних ігор',
			icon: '🎮',
			description:
				'Розробляй захоплюючі ігри від Unity до Scratch. Від простих 2D до складних 3D проектів.',
			features: ['Unity 3D', 'Scratch', 'Дизайн персонажів', 'Логіка геймплею'],
			stats: {
				duration: '8 міс',
				age: '8-17',
				students: '189+',
				projects: '12+',
			},
			theme: 'themeGamedev',
			particleColors: ['#6ee7b7', '#5eead4', '#a7f3d0', '#34d399'],
		},
		{
			id: 'webdev',
			title: 'ВЕБ-РОЗРОБКА',
			subtitle: 'Сучасні сайти та додатки',
			icon: '💻',
			description:
				'Створюй адаптивні сайти та веб-додатки з HTML, CSS, JavaScript та React, що вражають своєю швидкістю та дизайном.',
			features: ['HTML/CSS', 'JavaScript', 'React', 'Node.js'],
			stats: {
				duration: '7 міс',
				age: '12-18',
				students: '156+',
				projects: '10+',
			},
			theme: 'themeWebdev',
			particleColors: ['#7dd3fc', '#67e8f9', '#a5f3fc', '#38bdf8'],
		},
	]

	return (
		<div className={styles.container} ref={sectionRef}>
			<div className={styles.backgroundElements}>
				<div className={`${styles.floatingElement} ${styles.element1}`}></div>
				<div className={`${styles.floatingElement} ${styles.element2}`}></div>
				<div className={`${styles.floatingElement} ${styles.element3}`}></div>
				<div className={`${styles.floatingElement} ${styles.element4}`}></div>
			</div>

			<div className={styles.mainContainer}>
				{/* --- Секція Hero --- */}
				<header className={styles.hero}>
					<h1 className={`${styles.title} ${styles.animateUp}`}>
						<span className={styles.titleMain}>SmartCode</span>
						<span className={styles.titleAccent}>Academy</span>
					</h1>
					<p className={`${styles.subtitle} ${styles.animateUp}`}>
						Школа програмування нового покоління, де діти створюють технології
						майбутнього
					</p>
					<div className={`${styles.heroFeatures} ${styles.animateUp}`}>
						<div className={styles.feature}>
							<div className={styles.featureIcon}>
								<Users size={18} />
							</div>
							<span>Віком 8-17 років</span>
						</div>
						<div className={styles.feature}>
							<div className={styles.featureIcon}>
								<Monitor size={18} />
							</div>
							<span>Онлайн і офлайн</span>
						</div>
						<div className={styles.feature}>
							<div className={styles.featureIcon}>
								<Award size={18} />
							</div>
							<span>Міжнародний сертифікат</span>
						</div>
					</div>
					<div className={`${styles.ctaButtons} ${styles.animateUp}`}>
						<button className={styles.primaryButton}>
							<Play size={20} />
							Почати навчання безкоштовно
						</button>
						<button className={styles.secondaryButton}>
							Записатися на пробний урок
						</button>
					</div>
				</header>

				{/* --- Секція Статистики --- */}
				<section className={styles.statsContainer}>
					{stats.map((stat, index) => (
						<div
							key={index}
							className={`${styles.statCard} ${
								currentStat === index ? styles.statCardActive : ''
							} ${styles.animateUp}`}
						>
							<div className={styles.statIcon}>{stat.icon}</div>
							<div className={styles.statContent}>
								<div className={styles.statNumber}>{stat.number}</div>
								<div className={styles.statLabel}>{stat.label}</div>
							</div>
						</div>
					))}
				</section>

				{/* --- Секція Курсів --- */}
				<section className={styles.coursesSection}>
					<header className={`${styles.sectionHeader} ${styles.animateUp}`}>
						<h2 className={styles.sectionTitle}>Наші флагманські курси</h2>
						<p className={styles.sectionSubtitle}>
							Обери свій шлях у світі IT та почни створювати дивовижні проекти
							вже сьогодні
						</p>
					</header>
					
				</section>
				<EnhancedCourseCards/>
			</div>
		</div>
	)
}

export default Visit
