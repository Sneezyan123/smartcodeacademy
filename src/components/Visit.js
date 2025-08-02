"use client"
import React, { useState, useEffect } from 'react'
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
} from 'lucide-react'
import styles from './Visit.module.css'

const Visit = () => {
	const [isVisible, setIsVisible] = useState(false)
	const [hoveredCard, setHoveredCard] = useState(null)
	const [hoveredAgeGroup, setHoveredAgeGroup] = useState(null)
	const [hoveredButton, setHoveredButton] = useState(false)

	useEffect(() => {
		setIsVisible(true)
	}, [])

	const devices = [
		{
			id: 'programming',
			title: 'ПРОГРАМУЄМО',
			icon: <Code className={styles.deviceIcon} />,
			description: 'Вивчаємо мови програмування',
			gradient: 'programming',
			elements: [
				{
					type: 'code',
					content: 'function hello() {',
					x: '10%',
					y: '20%',
					delay: '0s',
				},
				{
					type: 'code',
					content: '  console.log("Hi!");',
					x: '15%',
					y: '30%',
					delay: '0.5s',
				},
				{ type: 'code', content: '}', x: '10%', y: '40%', delay: '1s' },
				{
					type: 'icon',
					content: <Code className={styles.elementIcon} />,
					x: '70%',
					y: '25%',
					delay: '1.5s',
				},
				{
					type: 'icon',
					content: <Cpu className={styles.elementIconSmall} />,
					x: '75%',
					y: '60%',
					delay: '2s',
				},
				{ type: 'bracket', content: '</', x: '60%', y: '75%', delay: '2.5s' },
				{ type: 'bracket', content: '{...}', x: '20%', y: '70%', delay: '3s' },
			],
		},
		{
			id: 'games',
			title: 'СТВОРЮЄМО ІГРИ',
			icon: <Gamepad2 className={styles.deviceIcon} />,
			description: 'Розробляємо власні ігри',
			gradient: 'games',
			elements: [
				{
					type: 'game-element',
					content: '🎯',
					x: '20%',
					y: '25%',
					delay: '0s',
				},
				{
					type: 'game-element',
					content: '⭐',
					x: '70%',
					y: '20%',
					delay: '0.5s',
				},
				{
					type: 'game-element',
					content: '🚀',
					x: '60%',
					y: '70%',
					delay: '1s',
				},
				{
					type: 'game-element',
					content: '💎',
					x: '25%',
					y: '65%',
					delay: '1.5s',
				},
				{
					type: 'icon',
					content: <Gamepad2 className={styles.elementIcon} />,
					x: '75%',
					y: '45%',
					delay: '2s',
				},
				{
					type: 'score',
					content: 'Score: 1250',
					x: '15%',
					y: '80%',
					delay: '2.5s',
				},
				{ type: 'level', content: 'Level 3', x: '65%', y: '85%', delay: '3s' },
			],
		},
		{
			id: 'robots',
			title: 'ЗБИРАЄМО РОБОТІВ',
			icon: <Monitor className={styles.deviceIcon} />,
			description: 'Конструюємо та програмуємо',
			gradient: 'robots',
			elements: [
				{ type: 'robot-part', content: '⚙️', x: '25%', y: '25%', delay: '0s' },
				{
					type: 'robot-part',
					content: '🔧',
					x: '70%',
					y: '30%',
					delay: '0.5s',
				},
				{ type: 'robot-part', content: '⚡', x: '60%', y: '60%', delay: '1s' },
				{
					type: 'robot-part',
					content: '📡',
					x: '20%',
					y: '70%',
					delay: '1.5s',
				},
				{
					type: 'icon',
					content: <Zap className={styles.elementIcon} />,
					x: '75%',
					y: '20%',
					delay: '2s',
				},
				{
					type: 'icon',
					content: <Rocket className={styles.elementIconSmall} />,
					x: '15%',
					y: '50%',
					delay: '2.5s',
				},
				{ type: 'circuit', content: '●─●─●', x: '40%', y: '80%', delay: '3s' },
			],
		},
	]

	return (
		<div className={styles.container}>
			{/* Background Pattern */}
			<div className={styles.backgroundPattern}>
				<div className={`${styles.patternDot} ${styles.dot1}`}></div>
				<div className={`${styles.patternDot} ${styles.dot2}`}></div>
				<div className={`${styles.patternDot} ${styles.dot3}`}></div>
				<div className={`${styles.patternDot} ${styles.dot4}`}></div>
			</div>

			<div className={styles.mainContainer}>
				{/* Header */}
				<div
					className={`${styles.header} ${
						isVisible ? styles.headerVisible : ''
					}`}
				>
					<h1 className={styles.title}>
						SmartCode
						<span className={styles.titleGradient}>Academy</span>
					</h1>
					<p className={styles.subtitle}>
						Створена, щоб підготувати дітей до майбутнього вже зараз
					</p>
				</div>

				{/* Age Groups */}
				<div
					className={`${styles.ageGroups} ${
						isVisible ? styles.ageGroupsVisible : ''
					}`}
				>
					<div
						className={`${styles.ageGroup} ${
							hoveredAgeGroup === 0 ? styles.ageGroupHover : ''
						}`}
						onMouseEnter={() => setHoveredAgeGroup(0)}
						onMouseLeave={() => setHoveredAgeGroup(null)}
					>
						<Users className={`${styles.ageGroupIcon} ${styles.iconBlue}`} />
						<span className={styles.ageGroupText}>8-14 років</span>
					</div>
					<div
						className={`${styles.ageGroup} ${
							hoveredAgeGroup === 1 ? styles.ageGroupHover : ''
						}`}
						onMouseEnter={() => setHoveredAgeGroup(1)}
						onMouseLeave={() => setHoveredAgeGroup(null)}
					>
						<Monitor
							className={`${styles.ageGroupIcon} ${styles.iconPurple}`}
						/>
						<span className={styles.ageGroupText}>Офлайн / Онлайн</span>
					</div>
				</div>

				{/* CTA Button */}
				<div
					className={`${styles.ctaContainer} ${
						isVisible ? styles.ctaContainerVisible : ''
					}`}
				>
					<button
						className={`${styles.ctaButton} ${
							hoveredButton ? styles.ctaButtonHover : ''
						}`}
						onMouseEnter={() => setHoveredButton(true)}
						onMouseLeave={() => setHoveredButton(false)}
					>
						Почати навчання
					</button>
				</div>

				{/* Devices Showcase */}
				<div className={styles.devicesGrid}>
					{devices.map((device, index) => (
						<div
							key={device.id}
							className={`${styles.deviceCard} ${
								isVisible ? styles.deviceCardVisible : ''
							}`}
							style={{ animationDelay: `${0.7 + index * 0.2}s` }}
						>
							<div className={styles.deviceFrame}>
								<div
									className={`${styles.deviceContainer} ${
										hoveredCard === index ? styles.deviceContainerHover : ''
									}`}
									onMouseEnter={() => setHoveredCard(index)}
									onMouseLeave={() => setHoveredCard(null)}
								>
									{/* Screen */}
									<div
										className={`${styles.deviceScreen} ${
											styles[device.gradient]
										}`}
									>
										{/* Screen Content */}
										<div className={styles.screenContent}>
											<div className={styles.screenIcon}>{device.icon}</div>
											<p className={styles.screenDescription}>
												{device.description}
											</p>
										</div>

										{/* Animated Background Elements */}
										<div className={styles.animatedElements}>
											{device.elements.map((element, elementIndex) => (
												<div
													key={elementIndex}
													className={`${styles.animatedElement} ${
														styles[element.type]
													}`}
													style={{
														left: element.x,
														top: element.y,
														animationDelay: element.delay,
													}}
												>
													{element.content}
												</div>
											))}
										</div>
									</div>

									{/* Device Label */}
									<div className={styles.deviceLabel}>
										<h3 className={styles.deviceTitle}>{device.title}</h3>
										<div
											className={`${styles.deviceIndicator} ${
												styles[device.gradient]
											}`}
										></div>
									</div>
								</div>
							</div>
						</div>
					))}
				</div>

				{/* Floating Elements */}
				<div className={`${styles.floatingElement} ${styles.floatingIcon1}`}>
					<Palette className={styles.floatingIconContent} />
				</div>

				<div className={`${styles.floatingElement} ${styles.floatingIcon2}`}>
					<Code className={styles.floatingIconContentSmall} />
				</div>

				<div className={`${styles.floatingElement} ${styles.floatingIcon3}`}>
					<Gamepad2 className={styles.floatingIconContentMedium} />
				</div>

				{/* Scroll Indicator */}
				<div className={styles.scrollIndicator}>
					<ChevronDown className={styles.scrollIcon} />
				</div>
			</div>
		</div>
	)
}

export default Visit