'use client'
import React, { useState, useEffect, useRef } from 'react'
import {
	Code,
	Monitor,
	Palette,
	Server,
	Users,
	Clock,
	Award,
	Play,
	ChevronRight,
	Download,
	ArrowLeft,
	Bot,
	Layers,
	Wind,
	MousePointerClick,
	ShieldCheck,
	Rocket,
} from 'lucide-react'
import Link from 'next/link'
import styles from './WebCoursePage.module.css'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const WebCoursePage = () => {
	const mainRef = useRef(null)
	const [stats, setStats] = useState({ linesOfCode: 12345, projects: 56 })

	// Анімація статистики
	useEffect(() => {
		const linesTl = gsap.to(stats, {
			linesOfCode: 99999,
			duration: 20,
			ease: 'none',
			repeat: -1,
			onUpdate: () =>
				setStats(prev => ({
					...prev,
					linesOfCode: Math.floor(stats.linesOfCode),
				})),
		})

		const projectsTl = gsap.to(stats, {
			projects: 200,
			duration: 30,
			ease: 'none',
			repeat: -1,
			onUpdate: () =>
				setStats(prev => ({ ...prev, projects: Math.floor(stats.projects) })),
		})

		return () => {
			linesTl.kill()
			projectsTl.kill()
		}
	}, [])

	// GSAP анімації при скролі
	useEffect(() => {
		const ctx = gsap.context(() => {
			gsap.fromTo(
				`.${styles.animateUp}`,
				{ y: 60, opacity: 0 },
				{
					y: 0,
					opacity: 1,
					duration: 1,
					ease: 'power3.out',
					stagger: 0.15,
					scrollTrigger: {
						trigger: mainRef.current,
						start: 'top 80%',
						toggleActions: 'play none none reverse',
					},
				}
			)
		}, mainRef)
		return () => ctx.revert()
	}, [])

	const modules = [
		{
			title: 'Frontend Основи',
			duration: '4 тижні',
			topics: [
				'HTML5 семантика',
				'CSS Flexbox & Grid',
				'Адаптивна верстка',
				'Основи JavaScript',
			],
			Icon: Layers,
		},
		{
			title: 'Інтерактивний JavaScript',
			duration: '6 тижнів',
			topics: [
				'DOM-маніпуляції',
				'Робота з API (Fetch)',
				'Асинхронність',
				'ES6+ синтаксис',
			],
			Icon: MousePointerClick,
		},
		{
			title: 'React та Сучасні Фреймворки',
			duration: '6 тижнів',
			topics: [
				'Компонентний підхід',
				'State та Props',
				'React Hooks',
				'Створення Single Page Application',
			],
			Icon: Wind,
		},
		{
			title: 'Backend та Бази Даних',
			duration: '4 тижні',
			topics: [
				'Node.js та Express',
				'REST API',
				'Робота з базами даних',
				'Деплоймент проекту',
			],
			Icon: Server,
		},
	]

	const projects = [
		{
			name: 'Сайт-портфоліо',
			difficulty: 'Легкий',
			time: '2 тижні',
			description:
				'Створіть свій перший професійний сайт з анімаціями та адаптивним дизайном.',
			icon: '🧑‍🎨',
		},
		{
			name: 'Веб-додаток "To-Do List"',
			difficulty: 'Середній',
			time: '3 тижні',
			description:
				'Розробіть інтерактивний планувальник завдань з можливістю зберігання даних.',
			icon: '📝',
		},
		{
			name: 'Клон Instagram',
			difficulty: 'Складний',
			time: '5 тижнів',
			description:
				'Створіть соціальну мережу з профілями, завантаженням фото та лайками.',
			icon: '📸',
		},
		{
			name: 'Інтернет-магазин',
			difficulty: 'Експерт',
			time: '6 тижнів',
			description:
				'Повноцінний e-commerce проект з каталогом товарів, кошиком та оформленням замовлення.',
			icon: '🛒',
		},
	]

	const features = [
		{
			Icon: Palette,
			title: 'UI/UX Дизайн',
			desc: 'Створюйте не тільки функціональні, але й красиві інтерфейси.',
		},
		{
			Icon: Code,
			title: 'Чистий код',
			desc: 'Пишіть професійний, читабельний та ефективний код.',
		},
		{
			Icon: Rocket,
			title: 'Оптимізація',
			desc: 'Навчіться робити сайти швидкими та продуктивними.',
		},
		{
			Icon: ShieldCheck,
			title: 'Безпека',
			desc: 'Дізнайтесь основи захисту веб-додатків від загроз.',
		},
	]

	return (
		<div className={styles.container}>
			<div className={styles.backgroundElements}>
				<span className={`${styles.floatingTag} ${styles.tag1}`}>
					&lt;div&gt;
				</span>
				<span className={`${styles.floatingTag} ${styles.tag2}`}>{'{ }'}</span>
				<span className={`${styles.floatingTag} ${styles.tag3}`}>
					&lt;/body&gt;
				</span>
				<span className={`${styles.floatingTag} ${styles.tag4}`}>React</span>
				<span className={`${styles.floatingTag} ${styles.tag5}`}>
					&lt;h1&gt;
				</span>
			</div>

			<div className={styles.pageHud}>
				<Link href='/' className={styles.backButton}>
					<ArrowLeft size={18} /> На головну
				</Link>
				<div className={styles.statsBoard}>
					<div className={styles.statItem}>
						<span className={styles.statLabel}>РЯДКІВ КОДУ</span>
						<span className={styles.statValue}>{stats.linesOfCode}</span>
					</div>
					<div className={styles.statItem}>
						<span className={styles.statLabel}>ПРОЕКТІВ</span>
						<span className={styles.statValue}>{stats.projects}</span>
					</div>
				</div>
			</div>

			<main className={styles.mainContent} ref={mainRef}>
				<section className={`${styles.heroSection} ${styles.animateUp}`}>
					<div className={styles.heroContent}>
						<div className={styles.browserWindow}>
							<div className={styles.browserHeader}>
								<div className={styles.browserDots}>
									<span></span>
									<span></span>
									<span></span>
								</div>
								<div className={styles.browserUrl}>smartcode-academy.com</div>
							</div>
							<div className={styles.browserBody}>
								<h1 className={styles.heroTitle}>WEB DEVELOPMENT</h1>
								<p className={styles.heroSubtitle}>
									Створюй майбутнє Інтернету
								</p>
							</div>
						</div>
						<p className={styles.description}>
							Від простого сайту до складної веб-платформи. Опануйте повний цикл
							розробки та станьте затребуваним спеціалістом у світі цифрових
							технологій.
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

				<section
					className={`${styles.modulesSection} ${styles.animateUp}`}
					id='modules'
				>
					<header className={styles.sectionHeader}>
						<h2 className={styles.sectionTitle}>Програма курсу</h2>
						<p className={styles.sectionSubtitle}>
							Чотири модулі, що проведуть вас від основ HTML до створення
							повноцінних веб-додатків.
						</p>
					</header>
					<div className={styles.modulesGrid}>
						{modules.map((module, index) => (
							<div key={index} className={styles.moduleCard}>
								<div className={styles.moduleHeader}>
									<div className={styles.moduleIcon}>
										<module.Icon size={24} />
									</div>
									<span className={styles.levelBadge}>Модуль {index + 1}</span>
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

				<section
					className={`${styles.projectsSection} ${styles.animateUp}`}
					id='projects'
				>
					<header className={styles.sectionHeader}>
						<h2 className={styles.sectionTitle}>Ваші майбутні проекти</h2>
						<p className={styles.sectionSubtitle}>
							Навчіться створювати реальні проекти, які можна додати до свого
							першого портфоліо.
						</p>
					</header>
					<div className={styles.projectsGrid}>
						{projects.map((project, index) => (
							<div key={index} className={styles.projectCard}>
								<div className={styles.projectHeader}>
									<div className={styles.projectIcon}>{project.icon}</div>
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

				<section className={`${styles.ctaSection} ${styles.animateUp}`}>
					<div className={styles.ctaContainer}>
						<h2 className={styles.ctaTitle}>Готові почати кодити?</h2>
						<p className={styles.ctaText}>
							Зробіть перший крок до кар'єри веб-розробника. Запишіться на
							безкоштовний пробний урок!
						</p>
						
					</div>
				</section>
			</main>
		</div>
	)
}

export default WebCoursePage
