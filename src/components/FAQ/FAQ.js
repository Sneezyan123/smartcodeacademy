'use client'
import React, { useState, useEffect, useRef } from 'react'
import {
	ChevronDown,
	HelpCircle,
	Clock,
	Users,
	Award,
	MessageCircle,
} from 'lucide-react'
import styles from './FAQ.module.css'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const FAQ = () => {
	const [openItemId, setOpenItemId] = useState('') // Тільки одне питання може бути відкритим
	const [activeCategory, setActiveCategory] = useState('general')
	const sectionRef = useRef(null)

	const faqData = {
		general: {
			title: 'Загальні питання',
			icon: <HelpCircle />,
			questions: [
				{
					id: 0,
					question: 'Як проходить урок? Що для цього потрібно?',
					answer:
						"Уроки проходять онлайн через Zoom або офлайн в наших навчальних центрах. Для онлайн навчання потрібен комп'ютер або ноутбук з веб-камерою, мікрофоном та стабільним інтернет-з'єднанням від 10 Мбіт/с. Ми надаємо всі необхідні матеріали та доступ до платформ.",
				},
				{
					id: 1,
					question: 'Чи потрібен потужний ноутбук для навчання?',
					answer:
						"Ні, достатньо звичайного комп'ютера з 4ГБ RAM та процесором Intel i3 або аналогічним. Для просунутих курсів (Unity, 3D) можуть бути додаткові вимоги, про які ми повідомимо заздалегідь.",
				},
				{
					id: 2,
					question: 'Чи можна займатися з планшету?',
					answer:
						"Для повноцінного навчання програмуванню рекомендуємо використовувати комп'ютер або ноутбук. Планшет можна використовувати для перегляду відеоуроків або теоретичних матеріалів.",
				},
			],
		},
		process: {
			title: 'Навчальний процес',
			icon: <Users />,
			questions: [
				{
					id: 3,
					question: 'Заняття індивідуальні чи групові?',
					answer:
						'Ми пропонуємо обидва формати. У групових заняттях зазвичай 4-8 учнів, що дозволяє викладачу приділити увагу кожному. Індивідуальні заняття проводяться за окремим графіком.',
				},
				{
					id: 4,
					question: 'Яка частота занять та їх формат?',
					answer:
						'Стандартний формат: 2 заняття на тиждень по 1.5 години. Заняття включають теорію (30%), практику (50%) та роботу над проектами (20%). Також доступні інтенсивні курси.',
				},
				{
					id: 5,
					question: 'Як відстежується прогрес дитини?',
					answer:
						'Ми використовуємо комплексну систему: онлайн-платформа відстежує виконання завдань, ментори проводять оцінки проектів, а батьки отримують детальні звіти кожного місяця.',
				},
			],
		},
		results: {
			title: 'Результати',
			icon: <Award />,
			questions: [
				{
					id: 6,
					question: 'Що отримає дитина після закінчення курсу?',
					answer:
						'Після успішного завершення студенти отримують офіційний сертифікат, персональне портфоліо з 3-5 реальними проектами, рекомендаційний лист та доступ до спільноти випускників.',
				},
				{
					id: 7,
					question: 'Чи допоможете з працевлаштуванням?',
					answer:
						'Так! Для випускників 16+ ми надаємо підготовку резюме, тренування співбесід та рекомендації в партнерські IT-компанії. 85% наших випускників 17-18 років знаходять роботу протягом 3 місяців.',
				},
				{
					id: 8,
					question: 'Чи можна продовжити навчання на наступному рівні?',
					answer:
						'Звичайно! Ми маємо багаторівневу систему навчання (Початковий → Середній → Просунутий). Постійні студенти отримують знижки до 30% на наступні курси.',
				},
			],
		},
		technical: {
			title: 'Технічні питання',
			icon: <Clock />,
			questions: [
				{
					id: 9,
					question: 'Що робити, якщо дитина пропустила заняття?',
					answer:
						'Всі заняття записуються та доступні в особистому кабінеті. Можна переглянути матеріал, виконати завдання та отримати консультацію ментора.',
				},
				{
					id: 10,
					question: 'Як проходить технічна підтримка?',
					answer:
						'Технічна підтримка доступна 24/7 через чат у платформі, Telegram-бот та гарячу лінію. Середній час відповіді - 15 хвилин.',
				},
				{
					id: 11,
					question: 'Чи можна змінити графік або перенести заняття?',
					answer:
						'Так, можна перенести заняття за 24 години до початку, змінити групу при наявності вільних місць або перейти на індивідуальний графік.',
				},
			],
		},
	}

	useEffect(() => {
		const ctx = gsap.context(() => {
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
		return () => ctx.revert()
	}, [])

	const toggleItem = id => {
		setOpenItemId(openItemId === id ? null : id)
	}

	return (
		<section className={styles.faqSection} ref={sectionRef}>
			<div className={styles.backgroundElements}>
				<div className={`${styles.floatingElement} ${styles.element1}`}></div>
				<div className={`${styles.floatingElement} ${styles.element2}`}></div>
			</div>
			<div className={styles.container}>
				<header className={`${styles.header} ${styles.animateUp}`}>
					<div className={styles.badge}>
						<MessageCircle size={16} /> Часті питання
					</div>
					<h2 className={styles.title}>
						Відповіді на все, що вас
						<span className={styles.titleAccent}>цікавить</span>
					</h2>
					<p className={styles.subtitle}>
						Зібрали найпопулярніші питання від батьків та відповіді наших
						експертів.
					</p>
				</header>

				<div className={`${styles.faqLayout} ${styles.animateUp}`}>
					{/* Навігація по категоріях (сайдбар) */}
					<aside className={styles.sidebar}>
						<h3 className={styles.sidebarTitle}>Категорії</h3>
						{Object.entries(faqData).map(([key, { title, icon }]) => (
							<button
								key={key}
								className={`${styles.categoryButton} ${
									activeCategory === key ? styles.categoryButtonActive : ''
								}`}
								onClick={() => setActiveCategory(key)}
							>
								{React.cloneElement(icon, { size: 20 })}
								<span>{title}</span>
							</button>
						))}
					</aside>

					{/* Список питань */}
					<main className={styles.questionsList}>
						{faqData[activeCategory].questions.map(item => {
							const isOpen = openItemId === item.id
							return (
								<div
									key={item.id}
									className={`${styles.questionItem} ${
										isOpen ? styles.questionItemOpen : ''
									}`}
								>
									<button
										onClick={() => toggleItem(item.id)}
										className={styles.questionButton}
									>
										<span className={styles.questionText}>{item.question}</span>
										<div className={styles.questionIcon}>
											<ChevronDown className={styles.chevron} />
										</div>
									</button>
									<div
										className={styles.answerContainer}
										style={{ maxHeight: isOpen ? '500px' : '0' }}
									>
										<div className={styles.answerContent}>
											<p className={styles.answerText}>{item.answer}</p>
										</div>
									</div>
								</div>
							)
						})}
					</main>
				</div>

				{/* CTA Секція */}
				<div className={`${styles.ctaSection} ${styles.animateUp}`}>
					<div className={styles.ctaContent}>
						<h3 className={styles.ctaTitle}>Не знайшли відповідь?</h3>
						<p className={styles.ctaText}>
							Наші консультанти готові відповісти на будь-які питання та
							допомогти обрати найкращий курс.
						</p>
						<button className={styles.primaryCtaBtn}>
							<MessageCircle size={20} />
							Задати питання
						</button>
					</div>
				</div>
			</div>
		</section>
	)
}

export default FAQ
