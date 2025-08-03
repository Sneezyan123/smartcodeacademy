'use client'
import React, { useState } from 'react'
import {
	ChevronDown,
	ChevronUp,
	HelpCircle,
	Clock,
	Users,
	Award,
	MessageCircle,
} from 'lucide-react'
import styles from './FAQ.module.css'

const FAQ = () => {
	const [openItems, setOpenItems] = useState({ 0: true }) // Перше питання відкрите за замовчуванням

	const faqCategories = [
		{
			title: 'Загальні питання',
			icon: <HelpCircle />,
			questions: [
				{
					id: 0,
					question: 'Як проходить урок? Що для цього потрібно?',
					answer:
						"Уроки проходять онлайн через Zoom або офлайн в наших навчальних центрах. Для онлайн навчання потрібен комп'ютер або ноутбук з веб-камерою, мікрофоном та стабільним інтернет-з'єднанням від 10 Мбіт/с. Ми надаємо всі необхідні матеріали, доступ до навчальних платформ та програмного забезпечення.",
					category: 'general',
				},
				{
					id: 1,
					question: 'Чи потрібен потужний ноутбук для навчання?',
					answer:
						"Ні, потужний ноутбук не обов'язковий для початку навчання. Достатньо звичайного комп'ютера або ноутбука з 4ГБ RAM, процесором Intel i3 або аналогічним AMD та 50ГБ вільного місця на диску. Для деяких просунутих курсів (Unity, 3D-моделювання) можуть знадобитися додаткові вимоги, про які ми повідомимо заздалегідь.",
					category: 'general',
				},
				{
					id: 2,
					question: 'Чи можна займатися з планшету?',
					answer:
						"Для повноцінного навчання програмуванню рекомендуємо використовувати комп'ютер або ноутбук, оскільки потрібно встановлювати спеціальне програмне забезпечення та зручно набирати код. Планшет можна використовувати тільки для перегляду відеоуроків або теоретичних матеріалів.",
					category: 'general',
				},
			],
		},
		{
			title: 'Навчальний процес',
			icon: <Users />,
			questions: [
				{
					id: 3,
					question: 'Заняття індивідуальні чи групові? Скільки дітей в групі?',
					answer:
						'Ми пропонуємо обидва формати навчання. У групових заняттях зазвичай 4-8 учнів, що дозволяє викладачу приділити персональну увагу кожному студенту та створити здорову конкуренцію. Індивідуальні заняття проводяться за окремим графіком з персональним ментором. Також є можливість парного навчання для друзів або братів/сестер.',
					category: 'process',
				},
				{
					id: 4,
					question: 'Частота занять та формат навчання?',
					answer:
						'Стандартний формат: 2 заняття на тиждень по 1.5 години. Заняття включають теоретичну частину (30%), практичні завдання (50%) та роботу над проектами (20%). Також доступні інтенсивні курси (3-4 заняття на тиждень), літні табори та індивідуальний графік для зайнятих студентів.',
					category: 'process',
				},
				{
					id: 5,
					question: 'Як відстежується прогрес дитини?',
					answer:
						'Ми використовуємо комплексну систему оцінювання: онлайн-платформа автоматично відстежує виконання завдань, ментори проводять щотижневі оцінки проектів, батьки отримують детальні звіти кожного місяця. Також проводимо регулярні демо-дні, де діти презентують свої проекти.',
					category: 'process',
				},
			],
		},
		{
			title: 'Результати та сертифікація',
			icon: <Award />,
			questions: [
				{
					id: 6,
					question: 'Що отримає дитина після закінчення курсу?',
					answer:
						'Після успішного завершення курсу студенти отримують: офіційний сертифікат SmartCode Academy з QR-кодом для верифікації, персональне портфоліо з 3-5 реальними проектами, рекомендаційний лист від ментора, доступ до спільноти випускників та допомогу в працевлаштуванні для студентів 16+. Найголовніше - практичні навички та впевненість у собі.',
					category: 'results',
				},
				{
					id: 7,
					question: 'Чи допоможете з працевлаштуванням після навчання?',
					answer:
						'Так! Для випускників 16+ ми надаємо: підготовку резюме та LinkedIn профілю, тренування співбесід, рекомендації в партнерські IT-компанії, можливість стажування в стартапах. 85% наших випускників 17-18 років знаходять роботу або стажування протягом 3 місяців після закінчення курсу.',
					category: 'results',
				},
				{
					id: 8,
					question: 'Чи можна продовжити навчання на наступному рівні?',
					answer:
						'Звичайно! Ми маємо багаторівневу систему навчання: Початковий → Середній → Просунутий → Спеціалізація. Також є можливість перейти на суміжні напрямки (з програмування на дизайн, з веб-розробки на мобільну тощо). Постійні студенти отримують знижки до 30% на наступні курси.',
					category: 'results',
				},
			],
		},
		{
			title: 'Технічні питання',
			icon: <Clock />,
			questions: [
				{
					id: 9,
					question: 'Що робити, якщо дитина пропустила заняття?',
					answer:
						'Не хвилюйтеся! Всі заняття записуються та доступні в особистому кабінеті протягом всього курсу. Можна переглянути пропущений матеріал, виконати домашнє завдання та отримати індивідуальну консультацію ментора. За потреби організовуємо додаткове заняття для відпрацювання.',
					category: 'technical',
				},
				{
					id: 10,
					question: 'Як проходить технічна підтримка?',
					answer:
						'Технічна підтримка доступна 24/7 через чат у навчальній платформі, Telegram-бот та гарячу лінію. Середній час відповіді - 15 хвилин. Для складних питань призначаємо індивідуальну сесію з технічним ментором. Також є база знань з найчастішими питаннями.',
					category: 'technical',
				},
				{
					id: 11,
					question: 'Чи можна змінити графік або перенести заняття?',
					answer:
						"Так, ми розуміємо, що діти мають різні зобов'язання. Можна перенести заняття за 24 години до початку, змінити групу при наявності вільних місць або перейти на індивідуальний графік. Влітку працює гнучкий режим з урахуванням канікул та відпусток.",
					category: 'technical',
				},
			],
		},
	]

	const allQuestions = faqCategories.flatMap(category => category.questions)

	const toggleItem = id => {
		setOpenItems(prev => ({
			...prev,
			[id]: !prev[id],
		}))
	}

	const openCategory = categoryQuestions => {
		const newOpenItems = {}
		categoryQuestions.forEach(q => {
			newOpenItems[q.id] = true
		})
		setOpenItems(prev => ({ ...prev, ...newOpenItems }))
	}

	const closeAllInCategory = categoryQuestions => {
		const newOpenItems = { ...openItems }
		categoryQuestions.forEach(q => {
			newOpenItems[q.id] = false
		})
		setOpenItems(newOpenItems)
	}

	return (
		<section className={styles.faqSection}>
			<div className={styles.container}>
				{/* Header */}
				<div className={styles.header}>
					<div className={styles.badge}>
						<MessageCircle className={styles.badgeIcon} />
						Часті питання
					</div>
					<h2 className={styles.title}>
						Відповіді на популярні
						<span className={styles.titleAccent}>питання</span>
					</h2>
					<p className={styles.subtitle}>
						Зібрали найпопулярніші питання від батьків та відповіді наших
						експертів
					</p>
				</div>

				{/* Categories */}
				<div className={styles.categories}>
					{faqCategories.map((category, categoryIndex) => (
						<div key={categoryIndex} className={styles.category}>
							<div className={styles.categoryHeader}>
								<div className={styles.categoryTitle}>
									<div className={styles.categoryIcon}>{category.icon}</div>
									<h3>{category.title}</h3>
								</div>
								<div className={styles.categoryActions}>
									<button
										onClick={() => openCategory(category.questions)}
										className={styles.actionBtn}
									>
										Розгорнути все
									</button>
									<button
										onClick={() => closeAllInCategory(category.questions)}
										className={styles.actionBtn}
									>
										Згорнути все
									</button>
								</div>
							</div>

							<div className={styles.questionsList}>
								{category.questions.map(item => {
									const isOpen = openItems[item.id]
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
												<span className={styles.questionText}>
													{item.question}
												</span>
												<div className={styles.questionIcon}>
													{isOpen ? (
														<ChevronUp className={styles.chevron} />
													) : (
														<ChevronDown className={styles.chevron} />
													)}
												</div>
											</button>

											<div
												className={`${styles.answerContainer} ${
													isOpen ? styles.answerContainerOpen : ''
												}`}
											>
												<div className={styles.answerContent}>
													<p className={styles.answerText}>{item.answer}</p>
												</div>
											</div>
										</div>
									)
								})}
							</div>
						</div>
					))}
				</div>

				{/* CTA Section */}
				<div className={styles.ctaSection}>
					<div className={styles.ctaContent}>
						<h3 className={styles.ctaTitle}>Не знайшли відповідь?</h3>
						<p className={styles.ctaText}>
							Наші консультанти готові відповісти на будь-які питання та
							допомогти обрати найкращий курс для вашої дитини
						</p>
						<div className={styles.ctaButtons}>
							<button className={styles.primaryCtaBtn}>
								<MessageCircle className={styles.ctaIcon} />
								Задати питання
							</button>
							<button className={styles.secondaryCtaBtn}>
								Записатися на консультацію
							</button>
						</div>
					</div>
					<div className={styles.ctaStats}>
						<div className={styles.ctaStat}>
							<div className={styles.ctaStatNumber}>15 хв</div>
							<div className={styles.ctaStatLabel}>Час відповіді</div>
						</div>
						<div className={styles.ctaStat}>
							<div className={styles.ctaStatNumber}>24/7</div>
							<div className={styles.ctaStatLabel}>Підтримка</div>
						</div>
						<div className={styles.ctaStat}>
							<div className={styles.ctaStatNumber}>500+</div>
							<div className={styles.ctaStatLabel}>Задоволених батьків</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	)
}

export default FAQ
