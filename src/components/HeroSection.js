'use client'
import React, { useState, useEffect } from 'react'
import {
	ChevronLeft,
	ChevronRight,
	Code,
	Users,
	Award,
	Clock,
	CheckCircle,
	Play,
} from 'lucide-react'
import styles from './HeroSection.module.css'

const HeroSection = () => {
	const [currentSlide, setCurrentSlide] = useState(0)
	const [isVisible, setIsVisible] = useState(false)

	useEffect(() => {
		const timer = setTimeout(() => setIsVisible(true), 300)
		return () => clearTimeout(timer)
	}, [])

	const slides = [
		{
			id: 'platform',
			title: 'Сучасна навчальна платформа',
			subtitle:
				'Все необхідне для ефективного навчання програмування зібрано в одному місці',
			rightTitle: 'Інтерактивне навчання',
			rightContent:
				'Навчальна платформа з відеоуроками, практичними завданнями, тестами та проектами. Прогрес відстежується автоматично.',
			features: [
				'Відеоуроки від експертів',
				'Практичні завдання',
				'Автоматична перевірка коду',
				'Персональний прогрес',
			],
			mockupContent: {
				title: 'SmartCode Platform',
				subtitle: 'Твій шлях у програмування',
				courses: [
					'Python Basics',
					'Web Development',
					'Game Creation',
					'Mobile Apps',
				],
				stats: {
					completed: 85,
					total: 120,
					level: 'Intermediate',
				},
				features: [
					'Інтерактивний редактор коду',
					'Миттєвий фідбек',
					'Спільнота студентів',
					'Сертифікати досягнень',
				],
			},
		},
		{
			id: 'mentorship',
			title: 'Персональне наставництво',
			subtitle:
				'Досвідчені ментори супроводжують кожного студента на шляху до успіху в ІТ',
			rightTitle: 'Підтримка 24/7',
			rightContent:
				'Наші ментори - практикуючі розробники з топових ІТ компаній. Вони допомагають з проектами та відповідають на питання.',
			features: [
				'Персональний ментор',
				'Щотижневі 1-на-1 сесії',
				'Ревʼю коду та проектів',
				"Допомога з кар'єрою",
			],
			mockupContent: {
				title: 'Mentor Dashboard',
				subtitle: 'Твій особистий гід',
				courses: ['Code Review', 'Career Advice', 'Project Help', 'Live Q&A'],
				stats: {
					completed: 92,
					total: 100,
					level: 'Advanced',
				},
				features: [
					'Відеодзвінки з ментором',
					'Персональний план навчання',
					'Ревʼю домашніх завдань',
					'Підготовка до співбесід',
				],
			},
		},
		{
			id: 'community',
			title: 'Активна спільнота розробників',
			subtitle:
				'Навчайся разом з однолітками, створюй команди та працюй над цікавими проектами',
			rightTitle: 'Командна робота',
			rightContent:
				'Студенти працюють в командах над реальними проектами, отримують досвід роботи з Git, Agile та іншими інструментами.',
			features: [
				'Командні проекти',
				'Хакатони та змагання',
				'Нетворкінг події',
				'Спільний чат 24/7',
			],
			mockupContent: {
				title: 'Community Hub',
				subtitle: 'Разом до успіху',
				courses: [
					'Team Projects',
					'Hackathons',
					'Code Challenges',
					'Study Groups',
				],
				stats: {
					completed: 78,
					total: 95,
					level: 'Team Leader',
				},
				features: [
					'Командна розробка',
					'Peer code review',
					'Спільні проекти',
					'Менторство один одного',
				],
			},
		},
	]

	const nextSlide = () => {
		setCurrentSlide(prev => (prev + 1) % slides.length)
	}

	const prevSlide = () => {
		setCurrentSlide(prev => (prev - 1 + slides.length) % slides.length)
	}

	const currentSlideData = slides[currentSlide]

	return (
		<section className={styles.heroSection}>
			<div className={styles.container}>
				<div
					className={`${styles.content} ${
						isVisible ? styles.contentVisible : ''
					}`}
				>
					{/* Лівий контент */}
					<div className={styles.leftContent}>
						<div className={styles.slideInfo}>
							<div className={styles.slideNumber}>
								0{currentSlide + 1} / 0{slides.length}
							</div>
							<div className={styles.slideCategory}>Особливості</div>
						</div>

						<h1 className={styles.title}>{currentSlideData.title}</h1>
						<p className={styles.subtitle}>{currentSlideData.subtitle}</p>

						<div className={styles.features}>
							{currentSlideData.features.map((feature, index) => (
								<div key={index} className={styles.feature}>
									<CheckCircle className={styles.featureIcon} />
									<span>{feature}</span>
								</div>
							))}
						</div>

						<div className={styles.leftActions}>
							<button className={styles.primaryButton}>
								<Play className={styles.buttonIcon} />
								Спробувати безкоштовно
							</button>
						</div>
					</div>

					{/* Центральний мокап */}
					<div className={styles.centerContent}>
						<div className={styles.mockupContainer}>
							<div className={styles.deviceFrame}>
								<div className={styles.screen}>
									<div className={styles.browser}>
										<div className={styles.browserHeader}>
											<div className={styles.browserButtons}>
												<span className={styles.btnClose}></span>
												<span className={styles.btnMinimize}></span>
												<span className={styles.btnMaximize}></span>
											</div>
											<div className={styles.urlBar}>smartcode-academy.com</div>
										</div>

										<div className={styles.browserContent}>
											<div className={styles.sidebar}>
												<div className={styles.logo}>
													<div className={styles.logoIcon}>💻</div>
													<span>{currentSlideData.mockupContent.title}</span>
												</div>

												<nav className={styles.nav}>
													<div className={styles.navItem}>
														<Code className={styles.navIcon} />
														Курси
													</div>
													<div className={styles.navItem}>
														<Users className={styles.navIcon} />
														Спільнота
													</div>
													<div className={styles.navItem}>
														<Award className={styles.navIcon} />
														Досягнення
													</div>
													<div className={styles.navItem}>
														<Clock className={styles.navIcon} />
														Прогрес
													</div>
												</nav>
											</div>

											<div className={styles.mainContent}>
												<div className={styles.header}>
													<h3>{currentSlideData.mockupContent.subtitle}</h3>
													<div className={styles.userProgress}>
														<div className={styles.progressBar}>
															<div
																className={styles.progressFill}
																style={{
																	width: `${
																		(currentSlideData.mockupContent.stats
																			.completed /
																			currentSlideData.mockupContent.stats
																				.total) *
																		100
																	}%`,
																}}
															></div>
														</div>
														<span className={styles.progressText}>
															{currentSlideData.mockupContent.stats.completed}/
															{currentSlideData.mockupContent.stats.total}
														</span>
													</div>
												</div>

												<div className={styles.coursesGrid}>
													{currentSlideData.mockupContent.courses.map(
														(course, index) => (
															<div key={index} className={styles.courseCard}>
																<div className={styles.courseStatus}></div>
																<div className={styles.courseContent}>
																	<div className={styles.courseIcon}>🚀</div>
																	<span className={styles.courseName}>
																		{course}
																	</span>
																</div>
															</div>
														)
													)}
												</div>

												<div className={styles.featuresList}>
													{currentSlideData.mockupContent.features.map(
														(feature, index) => (
															<div key={index} className={styles.featureItem}>
																<CheckCircle className={styles.checkIcon} />
																{feature}
															</div>
														)
													)}
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>

						{/* Навігаційні кнопки */}
						<button className={styles.navButton} onClick={prevSlide}>
							<ChevronLeft className={styles.navIcon} />
						</button>
						<button
							className={`${styles.navButton} ${styles.navButtonRight}`}
							onClick={nextSlide}
						>
							<ChevronRight className={styles.navIcon} />
						</button>
					</div>

					{/* Правий контент */}
					<div className={styles.rightContent}>
						<h2 className={styles.rightTitle}>{currentSlideData.rightTitle}</h2>
						<p className={styles.rightText}>{currentSlideData.rightContent}</p>

						<div className={styles.rightStats}>
							<div className={styles.stat}>
								<div className={styles.statNumber}>500+</div>
								<div className={styles.statLabel}>Студентів</div>
							</div>
							<div className={styles.stat}>
								<div className={styles.statNumber}>95%</div>
								<div className={styles.statLabel}>Задоволених</div>
							</div>
						</div>

						<button className={styles.secondaryButton}>Дізнатися більше</button>
					</div>
				</div>

				{/* Індикатори слайдів */}
				<div className={styles.slideIndicators}>
					{slides.map((_, index) => (
						<button
							key={index}
							className={`${styles.indicator} ${
								index === currentSlide ? styles.active : ''
							}`}
							onClick={() => setCurrentSlide(index)}
						/>
					))}
				</div>
			</div>
		</section>
	)
}

export default HeroSection
