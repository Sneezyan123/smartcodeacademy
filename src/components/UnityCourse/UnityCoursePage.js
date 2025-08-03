// src/components/UnityCoursePage.jsx
'use client'
import React, { useState, useEffect, useRef } from 'react'
import {
	Gamepad2,
	Zap,
	Trophy,
	Heart,
	Star,
	Coins,
	Users,
	Clock,
	Award,
	Play,
	ChevronRight,
	Download,
	Cpu,
	Sparkles,
	ArrowLeft,
	Sword,
	Shield,
	Gem,
} from 'lucide-react'
import Link from 'next/link'
import styles from './UnityCoursePage.module.css'

const UnityCoursePage = () => {
	const [score, setScore] = useState(0)
	const [lives, setLives] = useState(3)
	const [activeModule, setActiveModule] = useState(0)
	const [isLoaded, setIsLoaded] = useState(false)
	const [visibleSections, setVisibleSections] = useState([])
	const [pacmanPosition, setPacmanPosition] = useState({ x: 50, y: 50 })
	const [ghostPositions, setGhostPositions] = useState([
		{ x: 200, y: 100, color: 'blinky' },
		{ x: 300, y: 200, color: 'pinky' },
		{ x: 150, y: 300, color: 'inky' },
		{ x: 400, y: 150, color: 'clyde' },
	])
	const [coins, setCoins] = useState([])
	const [powerUps, setPowerUps] = useState([])
	const heroRef = useRef(null)

	useEffect(() => {
		setIsLoaded(true)

		// Генерація монет
		const generateCoins = () => {
			const newCoins = []
			for (let i = 0; i < 30; i++) {
				newCoins.push({
					id: i,
					x: Math.random() * window.innerWidth,
					y: Math.random() * window.innerHeight,
					collected: false,
				})
			}
			setCoins(newCoins)
		}

		generateCoins()

		// Генерація power-ups
		const generatePowerUps = () => {
			const newPowerUps = []
			for (let i = 0; i < 5; i++) {
				newPowerUps.push({
					id: i,
					x: Math.random() * window.innerWidth,
					y: Math.random() * window.innerHeight,
					type: ['cherry', 'strawberry', 'orange', 'apple', 'melon'][i],
					collected: false,
				})
			}
			setPowerUps(newPowerUps)
		}

		generatePowerUps()

		// Intersection Observer
		const observer = new IntersectionObserver(
			entries => {
				entries.forEach(entry => {
					if (entry.isIntersecting) {
						setVisibleSections(prev => [...prev, entry.target.id])
					}
				})
			},
			{ threshold: 0.1 }
		)

		const sections = document.querySelectorAll('[data-scroll-section]')
		sections.forEach(section => observer.observe(section))

		

		// Рух привидів
		const moveGhosts = () => {
			setGhostPositions(prev =>
				prev.map(ghost => ({
					...ghost,
					x: ghost.x + (Math.random() - 0.5) * 10,
					y: ghost.y + (Math.random() - 0.5) * 10,
				}))
			)
		}

		const ghostInterval = setInterval(moveGhosts, 100)

		// Score animation
		const scoreInterval = setInterval(() => {
			setScore(prev => {
				const newScore = prev + Math.floor(Math.random() * 10)
				return newScore > 999999 ? 0 : newScore
			})
		}, 2000)

		

		return () => {
			observer.disconnect()
			
			clearInterval(ghostInterval)
			clearInterval(scoreInterval)
		}
	}, [])

	const modules = [
		{
			id: 1,
			title: 'Unity Basics',
			duration: '4 тижні',
			topics: ['Інтерфейс Unity', 'C# основи', 'GameObject', 'Prefabs'],
			icon: <Gamepad2 className='w-6 h-6' />,
			powerUp: '🍒',
		},
		{
			id: 2,
			title: '2D Games',
			duration: '5 тижнів',
			topics: ['Спрайти', 'Анімації', '2D фізика', 'Платформер'],
			icon: <Zap className='w-6 h-6' />,
			powerUp: '🍓',
		},
		{
			id: 3,
			title: '3D Games',
			duration: '6 тижнів',
			topics: ['3D моделі', 'Освітлення', 'Terrain', 'FPS Controller'],
			icon: <Cpu className='w-6 h-6' />,
			powerUp: '🍊',
		},
		{
			id: 4,
			title: 'Publishing',
			duration: '3 тижні',
			topics: ['Оптимізація', 'UI/UX', 'Білд', 'Магазини'],
			icon: <Trophy className='w-6 h-6' />,
			powerUp: '🍉',
		},
	]

	const projects = [
		{
			name: 'Pac-Man Clone',
			difficulty: 'LEVEL 1',
			time: '2 тижні',
			description: 'Класична аркада з власним дизайном',
			icon: '👾',
			points: 1000,
		},
		{
			name: 'Platformer 2D',
			difficulty: 'LEVEL 2',
			time: '3 тижні',
			description: 'Маріо-стайл гра з рівнями',
			icon: '🎮',
			points: 2500,
		},
		{
			name: 'Racing 3D',
			difficulty: 'LEVEL 3',
			time: '4 тижні',
			description: 'Гонки з фізикою та AI',
			icon: '🏎️',
			points: 5000,
		},
		{
			name: 'FPS Shooter',
			difficulty: 'BOSS',
			time: '5 тижнів',
			description: 'Мультиплеєрний шутер',
			icon: '🔫',
			points: 10000,
		},
	]

	const features = [
		{
			icon: <Sword className='w-8 h-8' />,
			title: 'Battle Mode',
			desc: 'PvP проекти',
			powerUp: '⚔️',
		},
		{
			icon: <Shield className='w-8 h-8' />,
			title: 'Shield Up',
			desc: 'Захист коду',
			powerUp: '🛡️',
		},
		{
			icon: <Gem className='w-8 h-8' />,
			title: 'Loot Box',
			desc: 'Бонуси щотижня',
			powerUp: '💎',
		},
		{
			icon: <Trophy className='w-8 h-8' />,
			title: 'High Score',
			desc: 'Топ студентів',
			powerUp: '🏆',
		},
	]

	return (
		<div className={styles.container}>
			{/* Back Button */}
			<Link href='/' className={styles.backButton}>
				<ArrowLeft className='w-5 h-5' />
				<span className='hidden sm:inline'>MENU</span>
			</Link>

			{/* Score Board */}
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
							<Heart key={i} className={styles.lifeHeart} fill='#ff0066' />
						))}
					</span>
				</div>
				<div className={styles.scoreItem}>
					<span className={styles.scoreLabel}>LEVEL</span>
					<span className={styles.scoreValue}>01</span>
				</div>
			</div>

			{/* Animated Background */}
			<div className={styles.gameBackground}>
				{/* Grid Pattern */}
				<div className={styles.gridPattern}></div>

				{/* Floating Coins */}
				{coins.map(coin => (
					<div
						key={coin.id}
						className={`${styles.coin} ${
							coin.collected ? styles.collected : ''
						}`}
						style={{
							left: `${coin.x}px`,
							top: `${coin.y}px`,
							animationDelay: `${Math.random() * 5}s`,
						}}
					/>
				))}

				{/* Power Ups */}
				{powerUps.map(powerUp => (
					<div
						key={powerUp.id}
						className={`${styles.powerUp} ${styles[powerUp.type]} ${
							powerUp.collected ? styles.collected : ''
						}`}
						style={{
							left: `${powerUp.x}px`,
							top: `${powerUp.y}px`,
						}}
					>
						{powerUp.type === 'cherry' && '🍒'}
						{powerUp.type === 'strawberry' && '🍓'}
						{powerUp.type === 'orange' && '🍊'}
						{powerUp.type === 'apple' && '🍎'}
						{powerUp.type === 'melon' && '🍉'}
					</div>
				))}

				{/* Ghosts */}
				{ghostPositions.map((ghost, index) => (
					<div
						key={index}
						className={`${styles.ghost} ${styles[ghost.color]}`}
						style={{
							left: `${ghost.x}px`,
							top: `${ghost.y}px`,
						}}
					>
						<div className={styles.ghostEyes}>
							<div className={styles.ghostEye}></div>
							<div className={styles.ghostEye}></div>
						</div>
						<div className={styles.ghostBottom}>
							<div className={styles.ghostWave}></div>
							<div className={styles.ghostWave}></div>
							<div className={styles.ghostWave}></div>
							<div className={styles.ghostWave}></div>
						</div>
					</div>
				))}

				{/* Pac-Man Cursor */}
				<div
					className={styles.pacman}
					style={{
						left: `${pacmanPosition.x}px`,
						top: `${pacmanPosition.y}px`,
					}}
				>
					<div className={styles.pacmanTop}></div>
					<div className={styles.pacmanBottom}></div>
				</div>

				{/* Maze Lines */}
				<svg className={styles.mazeLines}>
					<path
						d='M100,100 L300,100 L300,200 L500,200'
						className={styles.mazePath}
					/>
					<path
						d='M600,50 L600,250 L700,250 L700,350'
						className={styles.mazePath}
					/>
					<path
						d='M50,300 L250,300 L250,400 L450,400'
						className={styles.mazePath}
					/>
				</svg>
			</div>

			{/* Main Content */}
			<div className={styles.mainContent}>
				{/* Hero Section */}
				<section className={styles.heroSection} ref={heroRef}>
					<div
						className={`${styles.heroContent} ${
							isLoaded ? styles.visible : ''
						}`}
					>
						{/* Arcade Screen */}
						<div className={styles.arcadeScreen}>
							<div className={styles.screenGlow}></div>
							<div className={styles.screenContent}>
								<div className={styles.gameTitle}>
									<div className={styles.titleLine}>UNITY</div>
									<div className={styles.titleLine}>GAME DEV</div>
								</div>
								<div className={styles.pressStart}>PRESS START</div>
								<div className={styles.insertCoin}>INSERT COIN</div>
							</div>
							<div className={styles.screenScanlines}></div>
						</div>

						<p className={styles.description}>
							Створюй власні ігри як справжній розробник! Від ретро аркад до AAA
							проектів. Unity + C# = твоя суперсила в gamedev
						</p>

						{/* CTA Buttons */}
						<div className={styles.ctaButtons}>
							<button className={styles.startButton}>
								<span className={styles.buttonPixel}>
									<Play className='w-6 h-6' />
									START GAME
									<ChevronRight className={styles.buttonArrow} />
								</span>
							</button>

							<button className={styles.coinButton}>
								<span className={styles.buttonPixel}>
									<Coins className='w-6 h-6' />
									FREE PLAY
								</span>
							</button>
						</div>

						{/* High Scores */}
						<div className={styles.highScores}>
							<h3 className={styles.highScoresTitle}>HIGH SCORES</h3>
							<div className={styles.scoresList}>
								{[
									{ rank: 1, name: 'AAA', score: 999999 },
									{ rank: 2, name: 'PRO', score: 750000 },
									{ rank: 3, name: 'DEV', score: 500000 },
								].map(item => (
									<div key={item.rank} className={styles.scoreEntry}>
										<span className={styles.rank}>{item.rank}ST</span>
										<span className={styles.playerName}>{item.name}</span>
										<span className={styles.playerScore}>{item.score}</span>
									</div>
								))}
							</div>
						</div>
					</div>
				</section>

				{/* Course Modules */}
				<section
					className={styles.modulesSection}
					data-scroll-section
					id='modules'
				>
					<div className={styles.sectionContainer}>
						<h2
							className={`${styles.sectionTitle} ${
								visibleSections.includes('modules') ? styles.visible : ''
							}`}
						>
							<span className={styles.pixelText}>GAME LEVELS</span>
						</h2>

						<div className={styles.modulesGrid}>
							{modules.map((module, index) => (
								<div
									key={module.id}
									className={`${styles.moduleCard} ${
										activeModule === index ? styles.active : ''
									} ${
										visibleSections.includes('modules') ? styles.visible : ''
									}`}
									style={{
										animationDelay: `${index * 100}ms`,
									}}
									onMouseEnter={() => setActiveModule(index)}
								>
									{/* Level Badge */}
									<div className={styles.levelBadge}>LEVEL {index + 1}</div>

									{/* Power Up Icon */}
									<div className={styles.modulePowerUp}>{module.powerUp}</div>

									{/* Module Icon */}
									<div className={styles.moduleIcon}>{module.icon}</div>

									<h3 className={styles.moduleTitle}>{module.title}</h3>
									<p className={styles.moduleDuration}>{module.duration}</p>

									<div className={styles.moduleTopics}>
										{module.topics.map((topic, i) => (
											<div key={i} className={styles.topicItem}>
												<span className={styles.topicDot}>•</span>
												{topic}
											</div>
										))}
									</div>

									<div className={styles.moduleGlow}></div>
									<div className={styles.pixelBorder}></div>
								</div>
							))}
						</div>
					</div>
				</section>

				{/* Projects Showcase */}
				<section
					className={styles.projectsSection}
					data-scroll-section
					id='projects'
				>
					<div className={styles.sectionContainer}>
						<h2
							className={`${styles.sectionTitle} ${
								visibleSections.includes('projects') ? styles.visible : ''
							}`}
						>
							<span className={styles.pixelText}>BOSS BATTLES</span>
						</h2>

						<div className={styles.projectsGrid}>
							{projects.map((project, index) => (
								<div
									key={index}
									className={`${styles.projectCard} ${
										visibleSections.includes('projects') ? styles.visible : ''
									}`}
									style={{ animationDelay: `${index * 150}ms` }}
								>
									{/* Project Header */}
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
											<Clock className='w-4 h-4' />
											{project.time}
										</div>
										<button className={styles.selectButton}>SELECT</button>
									</div>

									<div className={styles.projectGlow}></div>
									<div className={styles.pixelCorners}>
										<div className={styles.corner}></div>
										<div className={styles.corner}></div>
										<div className={styles.corner}></div>
										<div className={styles.corner}></div>
									</div>
								</div>
							))}
						</div>
					</div>
				</section>

				{/* Features */}
				<section
					className={styles.featuresSection}
					data-scroll-section
					id='features'
				>
					<div className={styles.sectionContainer}>
						<h2
							className={`${styles.sectionTitle} ${
								visibleSections.includes('features') ? styles.visible : ''
							}`}
						>
							<span className={styles.pixelText}>POWER-UPS</span>
						</h2>

						<div className={styles.featuresGrid}>
							{features.map((feature, index) => (
								<div
									key={index}
									className={`${styles.featureCard} ${
										visibleSections.includes('features') ? styles.visible : ''
									}`}
									style={{ animationDelay: `${index * 100}ms` }}
								>
									<div className={styles.featurePowerUp}>{feature.powerUp}</div>
									<div className={styles.featureIcon}>{feature.icon}</div>
									<h3 className={styles.featureTitle}>{feature.title}</h3>
									<p className={styles.featureDescription}>{feature.desc}</p>
									<div className={styles.featureGlow}></div>
								</div>
							))}
						</div>
					</div>
				</section>

				{/* CTA Section */}
				<section className={styles.ctaSection}>
					<div className={styles.ctaContainer}>
						<div className={styles.gameOverScreen}>
							<h2 className={styles.gameOverTitle}>GAME OVER</h2>
							<p className={styles.continueText}>CONTINUE?</p>
							<div className={styles.countdown}>9</div>

							<div className={styles.ctaButtons}>
								<button className={styles.continueButton}>
									<span className={styles.buttonPixel}>
										<Zap className='w-6 h-6' />
										INSERT COIN
									</span>
								</button>

								<button className={styles.downloadButton}>
									<span className={styles.buttonPixel}>
										<Download className='w-6 h-6' />
										SAVE GAME
									</span>
								</button>
							</div>
						</div>
					</div>
				</section>
			</div>
		</div>
	)
}

export default UnityCoursePage
