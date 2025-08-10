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
	Code,
	BookOpen,
	Rocket,
	GraduationCap,
	Monitor,
	Layers,
	Settings,
	Target,
	Briefcase,
	Coffee,
	Lightbulb,
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
	const [isVideoModalOpen, setIsVideoModalOpen] = useState(false)
	const [currentVideo, setCurrentVideo] = useState(null)
	const [isMobile, setIsMobile] = useState(false)
	const videoRef = useRef(null)
	
	// Bigger pixelated ghosts with collision detection
	const [ghostPositions, setGhostPositions] = useState([
		{ 
			x: 200, 
			y: 100, 
			color: 'blinky',
			direction: 'right',
			speed: 4,
			lastDirectionChange: 0,
			size: 60 // Bigger ghosts
		},
		{ 
			x: 300, 
			y: 200, 
			color: 'pinky',
			direction: 'down',
			speed: 3.5,
			lastDirectionChange: 0,
			size: 60
		},
		{ 
			x: 150, 
			y: 300, 
			color: 'inky',
			direction: 'left',
			speed: 5,
			lastDirectionChange: 0,
			size: 60
		},
		{ 
			x: 400, 
			y: 150, 
			color: 'clyde',
			direction: 'up',
			speed: 4.2,
			lastDirectionChange: 0,
			size: 60
		},
	])
	
	const [coins, setCoins] = useState([])
	const [powerUps, setPowerUps] = useState([])
	const heroRef = useRef(null)

	// Modal functions
	const openVideoModal = (videoData) => {
		setCurrentVideo(videoData)
		setIsVideoModalOpen(true)
		// Auto-play video when modal opens
		setTimeout(() => {
			if (videoRef.current) {
				videoRef.current.play().catch(err => {
					console.log('Auto-play prevented:', err)
				})
			}
		}, 200)
	}

	const closeVideoModal = () => {
		setIsVideoModalOpen(false)
		setCurrentVideo(null)
		// Pause video when modal closes
		if (videoRef.current) {
			videoRef.current.pause()
			videoRef.current.currentTime = 0
		}
	}

	// Detect mobile viewport to tune animations and sizes
	useEffect(() => {
		const updateIsMobile = () => {
			try {
				setIsMobile(window.innerWidth <= 768)
			} catch {}
		}
		updateIsMobile()
		window.addEventListener('resize', updateIsMobile, { passive: true })
		return () => window.removeEventListener('resize', updateIsMobile)
	}, [])

	// Handle escape key to close modal
	useEffect(() => {
		const handleEscapeKey = (event) => {
			if (event.key === 'Escape') {
				closeVideoModal()
			}
		}

		if (isVideoModalOpen) {
			document.addEventListener('keydown', handleEscapeKey)
			document.body.style.overflow = 'hidden'
		} else {
			document.body.style.overflow = 'unset'
		}

		return () => {
			document.removeEventListener('keydown', handleEscapeKey)
			document.body.style.overflow = 'unset'
		}
	}, [isVideoModalOpen])

	// Collision detection function
	const checkCollision = (obj1, obj2, obj1Size = 60, obj2Size = 20) => {
		const distance = Math.sqrt(
			Math.pow(obj1.x - obj2.x, 2) + Math.pow(obj1.y - obj2.y, 2)
		)
		return distance < (obj1Size + obj2Size) / 2
	}

	// Respawn item at random location
	const respawnItem = () => {
		const margin = 100
		return {
			x: margin + Math.random() * (window.innerWidth - margin * 2),
			y: margin + Math.random() * (window.innerHeight - margin * 2),
		}
	}

	useEffect(() => {
		setIsLoaded(true)

		// On mobile, normalize ghost sizes/speeds to match CSS and reduce jank
		if (isMobile) {
			setGhostPositions(prev => prev.slice(0, 3).map(ghost => ({
				...ghost,
				size: 45,
				speed: Math.max(2.5, (ghost.speed || 4) - 1.5),
			})))
		}

		// Generate coins with bigger size for collision
        const generateCoins = () => {
			const newCoins = []
			const coinCount = isMobile ? 10 : 25
			for (let i = 0; i < coinCount; i++) {
				const position = respawnItem()
				newCoins.push({
					id: i,
					x: position.x,
					y: position.y,
					collected: false,
                    size: 12,
                    delay: Math.random() * 5,
				})
			}
			setCoins(newCoins)
		}

		generateCoins()

		// Generate power-ups with bigger size for collision
        const generatePowerUps = () => {
			const newPowerUps = []
			const powerUpCount = isMobile ? 3 : 8
			for (let i = 0; i < powerUpCount; i++) {
				const position = respawnItem()
				newPowerUps.push({
					id: i,
					x: position.x,
					y: position.y,
					type: ['cherry', 'strawberry', 'orange', 'apple', 'melon', 'cherry', 'strawberry', 'orange'][i],
					collected: false,
					size: 24,
                    delay: Math.random() * 3,
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

        // Enhanced ghost movement with collision detection (fixed-step timing)
        const baseTickMs = isMobile ? 60 : 40
        const stepMs = isMobile ? 33 : 20 // ~30 FPS mobile, ~50 FPS desktop
        const baseFrameMs = 16.6667

        const moveGhosts = () => {
			setGhostPositions(prev => {
				const newGhostPositions = prev.map(ghost => {
					let newX = ghost.x
					let newY = ghost.y
					let newDirection = ghost.direction
                    let newLastDirectionChange = ghost.lastDirectionChange + stepMs

					// Get viewport dimensions with margins
					const margin = 80 // Bigger margin for bigger ghosts
					const viewportWidth = window.innerWidth - margin * 2
					const viewportHeight = window.innerHeight - margin * 2
					const ghostSize = ghost.size

					// Each ghost has different behavior patterns - more frequent changes
                    const ghostBehaviors = {
                        blinky: { speed: 4, changeFrequency: 60 },
                        pinky: { speed: 3.5, changeFrequency: 80 },
                        inky: { speed: 5, changeFrequency: 45 },
                        clyde: { speed: 4.2, changeFrequency: 70 },
                    }

                    const behavior = ghostBehaviors[ghost.color]
                    // Scale speed to preserve perceived velocity across step sizes
                    const speed = behavior.speed * (stepMs / baseTickMs)

					// Move ghost in current direction
					switch (ghost.direction) {
						case 'right':
							newX += speed
							break
						case 'left':
							newX -= speed
							break
						case 'up':
							newY -= speed
							break
						case 'down':
							newY += speed
							break
					}

					// Check boundaries
					const hitLeftBoundary = newX <= margin
					const hitRightBoundary = newX >= viewportWidth + margin - ghostSize
					const hitTopBoundary = newY <= margin
					const hitBottomBoundary = newY >= viewportHeight + margin - ghostSize

					const hitBoundary = hitLeftBoundary || hitRightBoundary || hitTopBoundary || hitBottomBoundary

					// Check if it's time for random direction change (with some randomness)
                    const baseFrequencyFrames = behavior.changeFrequency
                    const baseFrequencyMs = baseFrequencyFrames * baseFrameMs
                    const randomVariationMs = (Math.random() * 30 - 15) * baseFrameMs // ±15 frames in ms
                    const timeForRandomChange = newLastDirectionChange > (baseFrequencyMs + randomVariationMs)

					if (hitBoundary || timeForRandomChange) {
						// Determine valid directions based on position
						const validDirections = []
						
						if (!hitLeftBoundary && newX > margin + 50) validDirections.push('left')
						if (!hitRightBoundary && newX < viewportWidth + margin - ghostSize - 50) validDirections.push('right')
						if (!hitTopBoundary && newY > margin + 50) validDirections.push('up')
						if (!hitBottomBoundary && newY < viewportHeight + margin - ghostSize - 50) validDirections.push('down')

						// If we hit a boundary, prioritize directions that move away
						if (hitBoundary) {
							const escapeDirections = []
							if (hitLeftBoundary) escapeDirections.push('right')
							if (hitRightBoundary) escapeDirections.push('left')
							if (hitTopBoundary) escapeDirections.push('down')
							if (hitBottomBoundary) escapeDirections.push('up')
							
							// Use escape directions if available, otherwise use valid directions
							const directionsToUse = escapeDirections.length > 0 ? escapeDirections : validDirections
							if (directionsToUse.length > 0) {
								newDirection = directionsToUse[Math.floor(Math.random() * directionsToUse.length)]
							}
						} else if (validDirections.length > 0) {
							// Encourage variety - avoid staying on same axis
							const currentAxis = (ghost.direction === 'up' || ghost.direction === 'down') ? 'vertical' : 'horizontal'
							
							// Prefer opposite axis for variety (horizontal if currently vertical, vice versa)
							const oppositeAxisDirections = validDirections.filter(dir => {
								const dirAxis = (dir === 'up' || dir === 'down') ? 'vertical' : 'horizontal'
								return dirAxis !== currentAxis
							})
							
							// Also avoid immediate reversal
							const nonReverseDirections = validDirections.filter(dir => {
								const opposites = { up: 'down', down: 'up', left: 'right', right: 'left' }
								return dir !== opposites[ghost.direction]
							})
							
							// Priority: opposite axis + non-reverse > opposite axis > non-reverse > any valid
							let directionsToUse = []
							
							if (oppositeAxisDirections.length > 0 && nonReverseDirections.length > 0) {
								// Best case: opposite axis and not reverse
								directionsToUse = oppositeAxisDirections.filter(dir => nonReverseDirections.includes(dir))
							}
							
							if (directionsToUse.length === 0 && oppositeAxisDirections.length > 0) {
								// Second choice: opposite axis (even if reverse)
								directionsToUse = oppositeAxisDirections
							}
							
							if (directionsToUse.length === 0 && nonReverseDirections.length > 0) {
								// Third choice: same axis but not reverse
								directionsToUse = nonReverseDirections
							}
							
							if (directionsToUse.length === 0) {
								// Last resort: any valid direction
								directionsToUse = validDirections
							}
							
							newDirection = directionsToUse[Math.floor(Math.random() * directionsToUse.length)]
						}

                        // Reset direction change timer
                        newLastDirectionChange = 0

						// Correct position if outside boundaries
						if (hitLeftBoundary) newX = margin + 1
						if (hitRightBoundary) newX = viewportWidth + margin - ghostSize - 1
						if (hitTopBoundary) newY = margin + 1
						if (hitBottomBoundary) newY = viewportHeight + margin - ghostSize - 1
					}

					return {
						...ghost,
						x: newX,
						y: newY,
						direction: newDirection,
						lastDirectionChange: newLastDirectionChange
					}
				})

				// Check collisions after movement
                // Check coin collisions with minimal state churn
                setCoins(prevCoins => {
                    let anyChanged = false
                    for (let i = 0; i < prevCoins.length; i++) {
                        const coin = prevCoins[i]
                        if (coin.collected) continue
                        const collision = newGhostPositions.some(ghost =>
                            checkCollision(ghost, coin, ghost.size, coin.size)
                        )
                        if (collision) { anyChanged = true; break }
                    }
                    if (!anyChanged) return prevCoins
                    return prevCoins.map(coin => {
                        if (coin.collected) return coin
                        const collision = newGhostPositions.some(ghost =>
                            checkCollision(ghost, coin, ghost.size, coin.size)
                        )
                        if (collision) {
                            const newPosition = respawnItem()
                            return { ...coin, x: newPosition.x, y: newPosition.y }
                        }
                        return coin
                    })
                })

				// Check power-up collisions
                setPowerUps(prevPowerUps => {
                    let anyChanged = false
                    for (let i = 0; i < prevPowerUps.length; i++) {
                        const p = prevPowerUps[i]
                        if (p.collected) continue
                        const collision = newGhostPositions.some(ghost =>
                            checkCollision(ghost, p, ghost.size, p.size)
                        )
                        if (collision) { anyChanged = true; break }
                    }
                    if (!anyChanged) return prevPowerUps
                    return prevPowerUps.map(powerUp => {
                        if (powerUp.collected) return powerUp
                        const collision = newGhostPositions.some(ghost =>
                            checkCollision(ghost, powerUp, ghost.size, powerUp.size)
                        )
                        if (collision) {
                            const newPosition = respawnItem()
                            return { ...powerUp, x: newPosition.x, y: newPosition.y }
                        }
                        return powerUp
                    })
                })

				return newGhostPositions
			})
		}

        // Ghost movement with requestAnimationFrame and fixed steps
        let rafId
        let lastTs = performance.now()
        let accumulator = 0

        const loop = ts => {
            const delta = ts - lastTs
            lastTs = ts
            accumulator += delta
            while (accumulator >= stepMs) {
                moveGhosts()
                accumulator -= stepMs
            }
            rafId = requestAnimationFrame(loop)
        }
        rafId = requestAnimationFrame(loop)

		// Score animation
		const scoreInterval = setInterval(() => {
			setScore(prev => {
				const newScore = prev + Math.floor(Math.random() * 15)
				return newScore > 999999 ? 0 : newScore
			})
		}, 2000)

		return () => {
			observer.disconnect()
            if (rafId) cancelAnimationFrame(rafId)
			clearInterval(scoreInterval)
		}
	}, [isMobile])

	const modules = [
		{
			id: 1,
			title: 'C# Основи',
			topics: ['Змінні і типи', 'Умови та цикли', 'Методи', 'ООП базово'],
			icon: <Code className='w-6 h-6' />,
			powerUp: '🍒',
		},
		{
			id: 2,
			title: 'Unity Інтерфейс',
			topics: ['Scene View', 'Inspector', 'Hierarchy', 'Project Window'],
			icon: <Monitor className='w-6 h-6' />,
			powerUp: '🍓',
		},
		{
			id: 3,
			title: 'GameObjects',
			topics: ['Components', 'Transform', 'Prefabs', 'Instancing'],
			icon: <Layers className='w-6 h-6' />,
			powerUp: '🍊',
		},
		{
			id: 4,
			title: 'Physics & Animation',
			topics: ['Rigidbody', 'Colliders', 'Animator', 'Timeline'],
			icon: <Zap className='w-6 h-6' />,
			powerUp: '🍉',
		},
		{
			id:5,
			title: "Unity 3D",
			topics: ['3D Models', 'Materials', 'Lighting', 'Shadows'],
			icon: <Gamepad2 className='w-6 h-6' />,
			powerUp: '🍎',
		},
		{
			id: 6,
			title: "Final Project",
			topics: ['Game Design', 'Scripting', 'UI/UX', 'Publishing'],
			icon: <Rocket className='w-6 h-6' />,
			powerUp: '🍒'
		},
	]

	const projects = [
		{
			name: 'Flappy Bird',
			difficulty: 'BEGINNER',
			time: '2 тижні',
			description: '2D гра з фізикою та анімаціями',
			icon: '🐦',
			points: 1500,
			video: {
				src: '/flappyyappy.MOV',
				title: 'FLAPPY BIRD - ГЕЙМПЛЕЙ'
			}
		},
		{
			name: "Parkour Game",
			difficulty: 'MIDDLE',
			time: '3 тижні',
			description: '3D гра з паркур механіками та анімаціями',
			icon: '🏃‍♂️',
			points: 3500,
			video: {
				src: '/shmobby.MOV',
				title: 'HOLLOW KNIGHT PARODY - ГЕЙМПЛЕЙ'
			}
		},
		{
			name: 'Swing Simulator',
			difficulty: 'SENIOR',
			time: '5 тижнів',
			description: 'Симулятор польоту на грапплері з реалістичною фізикою',
			icon: '🕷️',
			points: 4000,
			video: {
				src: '/bobo.MOV',
				title: 'SWING SIMULATOR - ГЕЙМПЛЕЙ'
			}
		},
	]

	const features = [
		{
			icon: <GraduationCap className='w-8 h-8' />,
			title: 'Certification',
			desc: 'Офіційний сертифікат',
			powerUp: '📜',
		},
		{
			icon: <Users className='w-8 h-8' />,
			title: 'Community',
			desc: 'Спільнота студентів',
			powerUp: '👥',
		},
		{
			icon: <Briefcase className='w-8 h-8' />,
			title: 'Job Support',
			desc: 'Допомога з працевлаштуванням',
			powerUp: '💼',
		},
		{
			icon: <Coffee className='w-8 h-8' />,
			title: 'Code Review',
			desc: 'Перевірка коду менторами',
			powerUp: '☕',
		},
	]

	return (
		<div className={styles.container}>

			{/* Score Board */}
			<div className={styles.scoreBoard}>
				<div className={styles.scoreItem}>
					<span className={styles.scoreLabel}>ПРОГРЕС</span>
					<span className={styles.scoreValue}>
						{score.toString().padStart(6, '0')}
					</span>
				</div>
				<div className={styles.scoreItem}>
					<span className={styles.scoreLabel}>РІВЕНЬ</span>
					<span className={styles.livesContainer}>
						{[...Array(lives)].map((_, i) => (
							<Heart key={i} className={styles.lifeHeart} fill='#ff0066' />
						))}
					</span>
				</div>
				<div className={styles.scoreItem}>
					<span className={styles.scoreLabel}>ДОСВІД</span>
					<span className={styles.scoreValue}>C#</span>
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

				{/* Bigger Pixelated Ghosts */}
				{ghostPositions.map((ghost, index) => (
					<div
						key={index}
						className={`${styles.ghost} ${styles[ghost.color]} ${styles.pixelated}`}
						style={{
							left: `${ghost.x}px`,
							top: `${ghost.y}px`,
							width: `${ghost.size}px`,
							height: `${ghost.size + 10}px`,
							transform: `${
								ghost.direction === 'left' ? 'scaleX(-1)' : 
								ghost.direction === 'right' ? 'scaleX(1)' : 
								''
							}`,
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
									<div className={styles.titleLine}>C# & UNITY</div>
									<div className={styles.titleLine}>РОЗРОБКА</div>
								</div>
								<div className={styles.pressStart}>РОЗПОЧАТИ НАВЧАННЯ</div>
								<div className={styles.insertCoin}>БЕЗКОШТОВНИЙ УРОК</div>
							</div>
							<div className={styles.screenScanlines}></div>
						</div>

						<p className={styles.description}>
							Стань розробником ігор з нуля! Вивчай C# програмування та Unity Engine. 
							Від перших рядків коду до повноцінних проектів в портфоліо.
						</p>

						{/* CTA Buttons */}
						<div className={styles.ctaButtons}>
                            <Link href='/#Contactform' className={styles.startButton} onClick={(e)=>{e.preventDefault(); window.dispatchEvent(new Event('openContactModal'))}} scroll={false}>
								<span className={styles.buttonPixel}>
									<Play className='w-6 h-6' />
									ПОЧАТИ КУРС
									<ChevronRight className={styles.buttonArrow} />
								</span>
							</Link>
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
							<span className={styles.pixelText}>МОДУЛІ КУРСУ</span>
						</h2>

                        <div className={styles.modulesGrid}>
                            {modules.map((module, index) => (
                                <div
                                    key={module.id}
                                    className={`${styles.moduleCard} ${
                                        activeModule === index ? styles.active : ''
                                    } ${
                                        visibleSections.includes('modules') ? styles.visible : ''
                                    } ${
                                        isMobile && visibleSections.includes('modules') ? styles.playOnScroll : ''
                                    }`}
                                    style={{
                                        animationDelay: `${index * 100}ms`,
                                        // Stagger shine on mobile sequentially
                                        '--anim-delay': isMobile && visibleSections.includes('modules') ? `${index * 180}ms` : '0ms'
                                    }}
                                    onMouseEnter={() => setActiveModule(index)}
                                >
									{/* Level Badge */}
									<div className={styles.levelBadge}>МОДУЛЬ {index + 1}</div>

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
							<span className={styles.pixelText}>ПРАКТИЧНІ ПРОЕКТИ</span>
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
											+{project.points} XP
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
										<button 
											className={styles.selectButton}
											onClick={(e) => {
												e.preventDefault()
												e.stopPropagation()
												openVideoModal(project.video)
											}}
											type="button"
										>
											ГЕЙМПЛЕЙ
										</button>
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
							<span className={styles.pixelText}>ПЕРЕВАГИ КУРСУ</span>
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
							<h2 className={styles.gameOverTitle}>ГОТОВИЙ ПОЧАТИ?</h2>
							<p className={styles.continueText}>ЗАПИСАТИСЯ НА КУРС</p>
							<div className={styles.countdown}>💻</div>

                            <div className={styles.ctaButtons}>
                                <Link href='/#Contactform' className={styles.continueButton} onClick={(e)=>{e.preventDefault(); window.dispatchEvent(new Event('openContactModal'))}} scroll={false}>
                                    <span className={styles.buttonPixel}>
                                        <Rocket className='w-6 h-6' />
                                        ЗАПИСАТИСЯ
                                    </span>
                                </Link>
                            </div>
						</div>
					</div>
				</section>
			</div>

			{/* Video Modal */}
			{isVideoModalOpen && currentVideo && (
				<div 
					className={styles.videoModal} 
					onClick={closeVideoModal}
					style={{ 
						position: 'fixed',
						top: 0,
						left: 0,
						right: 0,
						bottom: 0,
						zIndex: 9999,
						display: 'flex'
					}}
				>
					<div className={styles.videoModalContent} onClick={(e) => e.stopPropagation()}>
						<div className={styles.videoHeader}>
							<h3 className={styles.videoTitle}>{currentVideo.title}</h3>
							<button 
								className={styles.closeButton}
								onClick={closeVideoModal}
								aria-label="Close video"
								type="button"
							>
								✕
							</button>
						</div>
						<div className={styles.videoContainer}>
							<video
								ref={videoRef}
								className={styles.gameplayVideo}
								controls
								muted
								playsInline
								preload="metadata"
							>
								<source src={currentVideo.src} type="video/quicktime" />
								<source src={currentVideo.src} type="video/mp4" />
								Ваш браузер не підтримує відео.
							</video>
						</div>
						<div className={styles.videoFooter}>
							<p className={styles.videoDescription}>
								🎮 Унікальний геймплей та механіки
							</p>
						</div>
					</div>
				</div>
			)}
		</div>
	)
}

export default UnityCoursePage