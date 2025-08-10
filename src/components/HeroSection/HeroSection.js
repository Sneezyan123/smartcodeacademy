'use client'
import React, { useState, useEffect, useRef } from 'react'
import {
	ChevronLeft,
	ChevronRight,
	Code,
	Users,
	Play,
	CheckCircle,
	Zap,
	ShieldCheck,
	BarChart,
} from 'lucide-react'
import { gsap } from 'gsap'
import styles from './HeroSection.module.css'
import Link from 'next/link'

// Оновлені дані для слайдів з новою палітрою
const slides = [
	{
		id: 'platform',
		icon: <Code size={24} />,
		superTitle: 'Інтерактивна Платформа',
		title: 'Навчання, що захоплює',
		subtitle:
			'Пориньте у світ коду з нашою платформою, де теорія миттєво перетворюється на практику.',
		features: [
			"24/7 зв'зок з менторами",
			'Інтерактивні завдання',
			'Запис відеоуроків',
			'Гейміфікований прогрес',
		],
		accentColor: '#2563eb', // Синій з градієнту
	},
	{
		id: 'mentorship',
		icon: <Users size={24} />,
		superTitle: 'Персональне Менторство',
		title: 'Ваш особистий IT-гід',
		subtitle:
			'Отримуйте підтримку від досвідчених розробників, які допоможуть вам уникнути помилок та прискорити ріст.',
		features: [
			'Індивідуальний підхід',
			"Детальне рев'ю коду",
			"Кар'єрні консультації",
			'Підготовка до справжніх проектів',
		],
		accentColor: '#10b981', // Зелений з градієнту
	},
	{
		id: 'community',
		icon: <Zap size={24} />,
		superTitle: 'Активна Спільнота',
		title: 'Сила в єдності',
		subtitle:
			'Приєднуйтесь до спільноти однодумців, де ви можете обмінюватися ідеями, створювати проекти та зростати разом.',
		features: [
			'Командні хакатони',
			'Спільні проекти (open-source)',
			'Експертні вебінари',
			'Нетворкінг та обмін досвідом',
		],
		accentColor: '#f59e0b', // Бурштиновий з градієнту
	},
]

const HeroSection = () => {
	const [currentSlide, setCurrentSlide] = useState(0)
	const containerRef = useRef(null)
	const timeline = useRef(null)

	// Початкова анімація при завантаженні компонента
	useEffect(() => {
		const ctx = gsap.context(() => {
			gsap.fromTo(
				'.anim-element',
				{ y: 40, opacity: 0 },
				{
					y: 0,
					opacity: 1,
					duration: 1,
					ease: 'power3.out',
					stagger: 0.15,
					delay: 0.5,
				}
			)
		}, containerRef)

		return () => ctx.revert() // Очищення анімацій при розмонтуванні
	}, [])

	// Функція для анімації зміни слайду
	const changeSlide = newIndex => {
		if (
			(timeline.current && timeline.current.isActive()) ||
			newIndex === currentSlide
		) {
			return
		}

		const direction = newIndex > currentSlide ? 1 : -1

		timeline.current = gsap.timeline({
			onComplete: () => {
				setCurrentSlide(newIndex)
				// Анімація появи нового контенту
				gsap.fromTo(
					'.slide-content',
					{
						x: -30 * direction,
						opacity: 0,
					},
					{
						x: 0,
						opacity: 1,
						duration: 0.6,
						ease: 'power3.out',
						stagger: 0.08,
					}
				)
				gsap.to('.indicator-fill', {
					backgroundColor: slides[newIndex].accentColor,
					duration: 0.5,
				})
			},
		})

		// Анімація зникнення поточного контенту
		timeline.current.to('.slide-content', {
			x: 30 * direction,
			opacity: 0,
			duration: 0.4,
			ease: 'power3.in',
			stagger: 0.05,
		})
	}

	const nextSlide = () => {
		const newIndex = (currentSlide + 1) % slides.length
		changeSlide(newIndex)
	}

	const prevSlide = () => {
		const newIndex = (currentSlide - 1 + slides.length) % slides.length
		changeSlide(newIndex)
	}

	const goToSlide = index => {
		changeSlide(index)
	}

	const { icon, superTitle, title, subtitle, features, accentColor } =
		slides[currentSlide]

	return (
		<section className={styles.heroSection} ref={containerRef}>
			<div className={styles.backgroundElements}>
				<div className={styles.element1}></div>
				<div className={styles.element2}></div>
				<div className={styles.element3}></div>
				<div className={styles.element4}></div>
			</div>
			<div className={styles.container}>
				<div className={styles.contentWrapper}>
					{/* Ліва частина - текстовий контент */}
					<div className={styles.leftContent}>
						<div className={`${styles.superTitle} slide-content anim-element`}>
							<div
								className={styles.superTitleIcon}
								style={{ '--accent-color': accentColor }}
							>
								{icon}
							</div>
							<span>{superTitle}</span>
						</div>
						<h1 className={`${styles.title} slide-content anim-element`}>
							{title}
						</h1>
						<p className={`${styles.subtitle} slide-content anim-element`}>
							{subtitle}
						</p>

						<ul className={`${styles.featuresList} slide-content anim-element`}>
							{features.map((feature, index) => (
								<li key={index} className={styles.featureItem}>
									<CheckCircle
										size={18}
										className={styles.featureIcon}
										style={{ color: accentColor }}
									/>
									<span>{feature}</span>
								</li>
							))}
						</ul>

                        <div className={`${styles.actions} anim-element`}>
                            <Link
                                href="/#Contactform"
                                className={styles.primaryButton}
                                style={{ '--accent-color': accentColor }}
                            >
                                <Play size={18} />
                                Спробувати безкоштовно
                            </Link>
                        </div>
					</div>

					{/* Права частина - візуальний мокап */}
					<div className={styles.rightContent}>
						<div className={`${styles.mockupWrapper} anim-element`}>
							<div
								className={styles.mockup}
								style={{ '--accent-color': accentColor }}
							>
								<div className={styles.mockupHeader}>
									<div className={styles.mockupDots}>
										<span></span>
										<span></span>
										<span></span>
									</div>
									<div className={styles.mockupTitle}>{superTitle}</div>
								</div>
								<div className={styles.mockupBody}>
									<div className={`${styles.mockupIcon} slide-content`}>
										{icon}
									</div>
									<h3 className={`${styles.mockupMainText} slide-content`}>
										{title}
									</h3>
									<div className={`${styles.mockupStats} slide-content`}>
										<div className={styles.statItem}>
											<BarChart size={16} />
											<span>Прогрес: 75%</span>
										</div>
										<div className={styles.statItem}>
											<ShieldCheck size={16} />
											<span>Рівень: Senior</span>
										</div>
									</div>
									<div className={`${styles.mockupProgressBar} slide-content`}>
										<div
											className={styles.mockupProgressFill}
											style={{ width: '75%' }}
										></div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>

				{/* Навігація та індикатори */}
				<div className={styles.navigation}>
					<div className={`${styles.navButtons} anim-element`}>
						<button
							onClick={prevSlide}
							className={styles.navButton}
							aria-label='Previous Slide'
						>
							<ChevronLeft size={24} />
						</button>
						<button
							onClick={nextSlide}
							className={styles.navButton}
							aria-label='Next Slide'
						>
							<ChevronRight size={24} />
						</button>
					</div>
					<div className={`${styles.slideIndicators} anim-element`}>
						{slides.map((slide, index) => (
							<button
								key={slide.id}
								onClick={() => goToSlide(index)}
								className={styles.indicator}
								aria-label={`Go to slide ${index + 1}`}
							>
								<div
									className={`${styles.indicatorFill} indicator-fill`}
									style={{
										transform:
											currentSlide === index ? 'scaleX(1)' : 'scaleX(0)',
										backgroundColor:
											currentSlide === index ? accentColor : 'transparent',
									}}
								></div>
							</button>
						))}
					</div>
				</div>
			</div>
		</section>
	)
}

export default HeroSection
