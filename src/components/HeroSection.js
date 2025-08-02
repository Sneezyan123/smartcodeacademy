"use client"
import React, { useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import styles from './HeroSection.module.css'

const HeroSection = () => {
	const [currentSlide, setCurrentSlide] = useState(0)

	const slides = [
		{
			title: 'Онлайн-школа програмування CodeMaster',
			subtitle:
				'Це місце, де на вас чекають найкращі викладачі, передові навчальні методики та інтерактивні заняття програмуванням онлайн. А ще:',
			rightTitle: 'Усе корисне в одному місці',
			rightContent:
				'Усі наші матеріали та курси для вивчення програмування зібрані на одній зручній платформі: від цікавого контенту до тренувальних і домашніх завдань',
			mockupContent: {
				title: 'CodeMaster',
				subtitle: 'Programming Courses',
				courses: ['JavaScript', 'Python', 'React', 'Node.js'],
				features: [
					'Interactive Coding',
					'Live Sessions',
					'Code Reviews',
					'Projects',
				],
			},
		},
		{
			title: 'Інтерактивне навчання програмування',
			subtitle:
				'Вивчайте код через практику з реальними проектами, ментором та командою однодумців. Отримайте:',
			rightTitle: 'Практичний досвід',
			rightContent:
				"Працюйте над реальними проектами, отримуйте зворотний зв'язок від менторів та будуйте портфоліо, яке допоможе знайти роботу мрії",
			mockupContent: {
				title: 'Live Coding',
				subtitle: 'Real-time Practice',
				courses: ['Full-Stack', 'Frontend', 'Backend', 'DevOps'],
				features: [
					'Git Workflow',
					'Code Reviews',
					'Team Projects',
					'Mentorship',
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
				<div className={styles.content}>
					{/* Левая часть */}
					<div className={styles.leftContent}>
						<h1 className={styles.title}>{currentSlideData.title}</h1>
						<p className={styles.subtitle}>{currentSlideData.subtitle}</p>
					</div>

					{/* Центральная часть с мокапом */}
					<div className={styles.centerContent}>
						<div className={styles.mockupContainer}>
							<div className={styles.computerMockup}>
								<div className={styles.screen}>
									<div className={styles.browser}>
										<div className={styles.browserHeader}>
											<div className={styles.browserButtons}>
												<span></span>
												<span></span>
												<span></span>
											</div>
										</div>
										<div className={styles.browserContent}>
											<div className={styles.sidebar}>
												<div className={styles.logo}>
													<div className={styles.logoIcon}>💻</div>
													<span>{currentSlideData.mockupContent.title}</span>
												</div>
												<nav className={styles.nav}>
													<div className={styles.navItem}>📚 Курси</div>
													<div className={styles.navItem}>🎯 Практика</div>
													<div className={styles.navItem}>👥 Спільнота</div>
													<div className={styles.navItem}>📊 Прогрес</div>
												</nav>
											</div>
											<div className={styles.mainContent}>
												<div className={styles.header}>
													<h3>{currentSlideData.mockupContent.subtitle}</h3>
												</div>
												<div className={styles.coursesGrid}>
													{currentSlideData.mockupContent.courses.map(
														(course, index) => (
															<div key={index} className={styles.courseCard}>
																<div className={styles.courseIcon}>🚀</div>
																<span>{course}</span>
															</div>
														)
													)}
												</div>
												<div className={styles.features}>
													{currentSlideData.mockupContent.features.map(
														(feature, index) => (
															<div key={index} className={styles.feature}>
																<span className={styles.checkmark}>✓</span>
																{feature}
															</div>
														)
													)}
												</div>
											</div>
										</div>
									</div>
								</div>
								<div className={styles.stand}></div>
							</div>
						</div>

						{/* Навигационные стрелки */}
						<button className={styles.navButton} onClick={prevSlide}>
							<ChevronLeft size={24} />
						</button>
						<button
							className={`${styles.navButton} ${styles.navButtonRight}`}
							onClick={nextSlide}
						>
							<ChevronRight size={24} />
						</button>
					</div>

					{/* Правая часть */}
					<div className={styles.rightContent}>
						<h2 className={styles.rightTitle}>{currentSlideData.rightTitle}</h2>
						<p className={styles.rightText}>{currentSlideData.rightContent}</p>
					</div>
				</div>

				{/* Индикаторы слайдов */}
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
