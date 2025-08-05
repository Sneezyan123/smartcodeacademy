'use client'
import React, { useState, useEffect, useRef } from 'react'
import {
	Gamepad2,
	Zap,
	Trophy,
	Heart,
	Star,
	Users,
	Clock,
	Award,
	Play,
	Download,
	Cpu,
	ArrowLeft,
	Gem,
	BookOpen,
	BrainCircuit,
	Code,
	Lightbulb,
} from 'lucide-react'
import Link from 'next/link'
import styles from './UnityCoursePage.module.css'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const UnityCoursePage = () => {
	const [score, setScore] = useState(0)
	const [lives, setLives] = useState(3)
	const [pacmanPosition, setPacmanPosition] = useState({ x: 0, y: 0 })
	const [ghosts, setGhosts] = useState([])
	const [coins, setCoins] = useState([])
	const mainRef = useRef(null)

	// Ініціалізація гри та анімацій
	useEffect(() => {
		// Генерація початкових позицій для монет
		const initialCoins = Array.from({ length: 50 }, (_, i) => ({
			id: `coin-${i}`,
			x: Math.random() * window.innerWidth,
			y: Math.random() * window.innerHeight,
		}))
		setCoins(initialCoins)

		// Генерація початкових позицій для привидів
		const initialGhosts = [
			{
				id: 'blinky',
				color: 'blinky',
				x: 200,
				y: 100,
				dir: { x: 1, y: 0 },
				speed: 1.5,
			},
			{
				id: 'pinky',
				color: 'pinky',
				x: 300,
				y: 500,
				dir: { x: -1, y: 0 },
				speed: 1.2,
			},
			{
				id: 'inky',
				color: 'inky',
				x: 600,
				y: 200,
				dir: { x: 0, y: 1 },
				speed: 1.8,
			},
			{
				id: 'clyde',
				color: 'clyde',
				x: 800,
				y: 400,
				dir: { x: 0, y: -1 },
				speed: 1,
			},
		]
		setGhosts(initialGhosts)

		// Відстеження курсору для Pac-Man
		

		// Анімація рахунку
		const scoreInterval = setInterval(() => {
			setScore(prev => prev + Math.floor(Math.random() * 150 + 50))
		}, 2500)

		// GSAP анімації при скролі
		const ctx = gsap.context(() => {
			const sections = gsap.utils.toArray(`.${styles.animateUp}`)
			sections.forEach(section => {
				gsap.fromTo(
					section,
					{ y: 60, opacity: 0 },
					{
						y: 0,
						opacity: 1,
						duration: 1,
						ease: 'power3.out',
						scrollTrigger: {
							trigger: section,
							start: 'top 85%',
							toggleActions: 'play none none reverse',
						},
					}
				)
			})
		}, mainRef)

		return () => {
			window.removeEventListener('mousemove', handleMouseMove)
			clearInterval(scoreInterval)
			ctx.revert()
		}
	}, [])

	// Анімація руху привидів
	useEffect(() => {
		const moveGhosts = () => {
			setGhosts(prevGhosts =>
				prevGhosts.map(ghost => {
					let { x, y, dir, speed } = ghost
					x += dir.x * speed
					y += dir.y * speed

					// Зміна напрямку при зіткненні зі стінами
					if (x < 0 || x > window.innerWidth - 40) dir.x *= -1
					if (y < 0 || y > window.innerHeight - 40) dir.y *= -1

					// Випадкова зміна напрямку
					if (Math.random() < 0.005) {
						const newDir = Math.random() > 0.5 ? 'x' : 'y'
						const newV = Math.random() > 0.5 ? 1 : -1
						if (newDir === 'x') dir = { x: newV, y: 0 }
						else dir = { x: 0, y: newV }
					}

					return { ...ghost, x, y, dir }
				})
			)
		}

		const ghostInterval = setInterval(moveGhosts, 1000 / 60) // 60 FPS
		return () => clearInterval(ghostInterval)
	}, [])

	const modules = [
		{
			title: 'Основи Unity та C#',
			duration: '4 тижні',
			topics: [
				'Інтерфейс Unity',
				'Основи C#',
				"Робота з об'єктами",
				'Створення першої сцени',
			],
			Icon: Gamepad2,
		},
		{
			title: 'Розробка 2D-ігор',
			duration: '5 тижнів',
			topics: [
				'Спрайти та анімації',
				'Фізика 2D',
				'Дизайн рівнів',
				'Створення платформера',
			],
			Icon: Zap,
		},
		{
			title: 'Світ 3D-графіки',
			duration: '6 тижнів',
			topics: [
				'3D-моделі та матеріали',
				'Освітлення та камери',
				'Створення ландшафту',
				'Контролер від першої особи',
			],
			Icon: Cpu,
		},
		{
			title: 'Публікація гри',
			duration: '3 тижні',
			topics: [
				'Оптимізація продуктивності',
				'UI/UX для ігор',
				'Збірка проекту',
				'Реліз в маркетах',
			],
			Icon: Trophy,
		},
	]

	const projects = [
		{
			name: '2D Платформер',
			difficulty: 'Легкий',
			time: '2 тижні',
			description:
				'Створіть класичну аркаду з власним дизайном рівнів та персонажів.',
			icon: '👾',
			points: 1000,
		},
		{
			name: 'Космічний шутер',
			difficulty: 'Середній',
			time: '3 тижні',
			description: 'Динамічна гра з ворогами, бонусами та системою пострілів.',
			icon: '🚀',
			points: 2500,
		},
		{
			name: '3D Перегони',
			difficulty: 'Складний',
			time: '4 тижні',
			description:
				'Створіть гоночну гру з реалістичною фізикою, трасами та суперниками.',
			icon: '🏎️',
			points: 5000,
		},
		{
			name: 'RPG-пригода',
			difficulty: 'Експерт',
			time: '5 тижнів',
			description: 'Розробіть свій світ з квестами, діалогами та системою бою.',
			icon: '🏰',
			points: 10000,
		},
	]

	const features = [
		{
			Icon: BrainCircuit,
			title: 'Ігрове мислення',
			desc: 'Навчіться думати як геймдизайнер',
		},
		{
			Icon: Code,
			title: 'Програмування на C#',
			desc: 'Опануйте мову, яку використовують професіонали',
		},
		{
			Icon: Gem,
			title: 'Дизайн рівнів',
			desc: 'Створюйте захоплюючі світи для гравців',
		},
		{
			Icon: Lightbulb,
			title: 'Креативність',
			desc: 'Втілюйте найсміливіші ідеї у власних проектах',
		},
	]

	return (
		<div className={styles.container}>
			{/* --- Інтерактивний фон --- */}
			<div className={styles.gameBackground}>
				<div className={styles.gridPattern}></div>
				{coins.map(coin => (
					<div
						key={coin.id}
						className={styles.coin}
						style={{ left: coin.x, top: coin.y }}
					/>
				))}
				{ghosts.map(ghost => (
					<div
						key={ghost.id}
						className={`${styles.ghost} ${styles[ghost.color]}`}
						style={{
							left: ghost.x,
							top: ghost.y,
							transform: `scaleX(${ghost.dir.x < 0 ? -1 : 1})`,
						}}
					>
						<div className={styles.ghostEyes}>
							<div className={styles.ghostEye}></div>
							<div className={styles.ghostEye}></div>
						</div>
					</div>
				))}
				<div
					className={styles.pacman}
					style={{ left: pacmanPosition.x, top: pacmanPosition.y }}
				></div>
			</div>

			{/* --- Ігровий HUD --- */}
			<div className={styles.gameHud}>
				<Link href='/' className={styles.backButton}>
					<ArrowLeft size={18} /> На головну
				</Link>
				<div className={styles.scoreBoard}>
					<div className={styles.scoreItem}>
						<span className={styles.scoreLabel}>SCORE</span>
						<span className={styles.scoreValue}>
							{score.toString().padStart(6, '0')}
						</span>
					</div>
					<div className={styles.scoreItem}>
						<span className={styles.scoreLabel}>LIVES</span>
						<span className={styles.livesContainer}>
							{[...Array(lives)].map((_, i) => (
								<Heart key={i} className={styles.lifeHeart} />
							))}
						</span>
					</div>
					<div className={styles.scoreItem}>
						<span className={styles.scoreLabel}>LEVEL</span>
						<span className={styles.scoreValue}>01</span>
					</div>
				</div>
			</div>

			<main className={styles.mainContent} ref={mainRef}>
				{/* --- Hero Секція --- */}
				<section className={`${styles.heroSection} ${styles.animateUp}`}>
					<div className={styles.heroContent}>
						<div className={styles.gameTitle}>
							<div className={styles.titleLine1}>UNITY</div>
							<div className={styles.titleLine2}>GAME DEV</div>
						</div>
						<p className={styles.description}>
							Перетвори свою пристрасть до ігор на професію! Навчіться
							створювати власні 2D та 3D світи на найпопулярнішому ігровому
							рушії у світі.
						</p>
						<div className={styles.ctaButtons}>
							<button className={styles.startButton}>
								<Play size={20} /> Записатись на курс
							</button>
							<button className={styles.secondaryButton}>
								<Download size={20} /> Програма курсу
							</button>
						</div>
					</div>
				</section>

				{/* --- Програма курсу --- */}
				<section
					className={`${styles.modulesSection} ${styles.animateUp}`}
					id='modules'
				>
					<header className={styles.sectionHeader}>
						<h2 className={styles.sectionTitle}>Програма курсу</h2>
						<p className={styles.sectionSubtitle}>
							Чотири ключові етапи, які перетворять вас на справжнього
							розробника ігор.
						</p>
					</header>
					<div className={styles.modulesGrid}>
						{modules.map((module, index) => (
							<div key={index} className={styles.moduleCard}>
								<div className={styles.moduleHeader}>
									<div className={styles.moduleIcon}>
										<module.Icon size={24} />
									</div>
									<span className={styles.levelBadge}>Етап {index + 1}</span>
								</div>
								<h3 className={styles.moduleTitle}>{module.title}</h3>
								<p className={styles.moduleDuration}>{module.duration}</p>
								<ul className={styles.moduleTopics}>
									{module.topics.map((topic, i) => (
										<li key={i}>{topic}</li>
									))}
								</ul>
							</div>
						))}
					</div>
				</section>

				{/* --- Приклади проектів --- */}
				<section
					className={`${styles.projectsSection} ${styles.animateUp}`}
					id='projects'
				>
					<header className={styles.sectionHeader}>
						<h2 className={styles.sectionTitle}>Приклади проектів</h2>
						<p className={styles.sectionSubtitle}>
							Кожен модуль завершується створенням власної гри, складність якої
							зростає з вашими навичками.
						</p>
					</header>
					<div className={styles.projectsGrid}>
						{projects.map((project, index) => (
							<div key={index} className={styles.projectCard}>
								<div className={styles.projectHeader}>
									<div className={styles.projectIcon}>{project.icon}</div>
									<div className={styles.projectPoints}>
										+{project.points} PTS
									</div>
								</div>
								<h3 className={styles.projectTitle}>{project.name}</h3>
								<div className={styles.difficultyBar}>
									<span className={styles.difficultyLabel}>
										{project.difficulty}
									</span>
									<div className={styles.difficultyProgress}>
										<div
											className={styles.difficultyFill}
											style={{ width: `${(index + 1) * 25}%` }}
										></div>
									</div>
								</div>
								<p className={styles.projectDescription}>
									{project.description}
								</p>
								<div className={styles.projectFooter}>
									<div className={styles.projectTime}>
										<Clock size={14} /> {project.time}
									</div>
									<button className={styles.selectButton}>Детальніше</button>
								</div>
							</div>
						))}
					</div>
				</section>

				{/* --- Ключові навички --- */}
				<section
					className={`${styles.featuresSection} ${styles.animateUp}`}
					id='features'
				>
					<header className={styles.sectionHeader}>
						<h2 className={styles.sectionTitle}>Ключові навички</h2>
						<p className={styles.sectionSubtitle}>
							Що ви отримаєте, пройшовши цей курс.
						</p>
					</header>
					<div className={styles.featuresGrid}>
						{features.map((feature, index) => (
							<div key={index} className={styles.featureCard}>
								<div className={styles.featureIcon}>
									<feature.Icon size={32} />
								</div>
								<h3 className={styles.featureTitle}>{feature.title}</h3>
								<p className={styles.featureDescription}>{feature.desc}</p>
							</div>
						))}
					</div>
				</section>

				{/* --- CTA Секція --- */}
				<section className={`${styles.ctaSection} ${styles.animateUp}`}>
					<div className={styles.ctaContainer}>
						<h2 className={styles.ctaTitle}>Готові почати гру?</h2>
						<p className={styles.ctaText}>
							Зробіть перший крок до створення ігор вашої мрії. Запишіться на
							безкоштовний пробний урок!
						</p>

					</div>
				</section>
			</main>
		</div>
	)
}

export default UnityCoursePage
