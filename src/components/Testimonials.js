'use client'

import React, { useState } from 'react'
import { Star } from 'lucide-react'
import styles from './Testimonials.module.css'

const Testimonials = () => {
	const [activeTestimonial, setActiveTestimonial] = useState(null)

	const testimonials = [
		{
			id: 1,
			name: 'Kostya Horilov',
			position: 'Випускник CodeMaster',
			company: 'Google',
			rating: 5,
			text: "CodeMaster - класна команда професіоналів різних IT-напрямків і спеціальностей. Рекомендую їх курси всім хто готовий і хоче вивчити багато нового, постійно практикуватись і вірити що це обов'язково принесе результат. Завдяки курсам і підтримці CodeMaster я отримав свій перший офер в IT в продуктовій IT-компанії.",
			avatar: '👨‍💻',
			companyLogo: '🔍',
		},
		{
			id: 2,
			name: 'Anastasia Sukhanova',
			position: 'Випускниця CodeMaster',
			company: 'Google',
			rating: 5,
			text: 'Проходила курс в CodeMaster. Сподобалося, що все дуже добре організовано. Навчальна платформа просто чудова — відео, багато практичних завдань, корисні чати, розділ із вакансіями, техчеки та мотиваційні змагання. Була дуже хороша підготовка до працевлаштування. А особливо сподобалася підтримка команди і дружна атмосфера)',
			avatar: '👩‍💻',
			companyLogo: '🔍',
		},
		{
			id: 3,
			name: 'Bohdan Yaremchuk',
			position: 'Випускник CodeMaster',
			company: 'DOU',
			rating: 5,
			text: 'Однозначно найкращі курси, після закінчення яких ти 99.9% знайдеш роботу в IT. Від тебе — бажання, наполегливість і важка праця, а все інше тебе навчать в CodeMaster! Перевірив на собі)',
			avatar: '👨‍🎓',
			companyLogo: '💼',
		},
		{
			id: 4,
			name: 'Vlad Shulzhenko',
			position: 'Випускник CodeMaster',
			company: 'DOU',
			rating: 5,
			text: "Найкращі курси, які можна порадити. Не варто сумніватися, чи йти в CodeMaster чи ні - якщо ти готовий змінити своє життя на краще, тобі обов'язково сюди. Усі люди, які тут працюють, у будь-який спосіб обов'язково тобі допоможуть. Навчання проходить у цікавому форматі (80% практики), на яке треба відводити достатньо часу. Але можу точно сказати - це того варте!",
			avatar: '🧑‍💻',
			companyLogo: '💼',
		},
		{
			id: 5,
			name: 'Halyna Petrova',
			position: 'Випускниця CodeMaster',
			company: 'DOU',
			rating: 5,
			text: 'Я б навіть сказала єдині, які варто закінчити. Я перед ними закінчила декілька інших, вони дали 2% знань від усього, що вивчила в мейт. Сьогодні я отримала свій перший IT-офер, без менту цього б не було. Якщо сумніваєтесь, просто пройдіть безкоштовний перший рівень, ви самі зрозумієте якість та зручність подачі інформації.',
			avatar: '👩‍🎓',
			companyLogo: '💼',
		},
	]

	const renderStars = rating => {
		return Array.from({ length: 5 }, (_, index) => (
			<Star
				key={index}
				size={16}
				className={index < rating ? styles.starFilled : styles.starEmpty}
				fill={index < rating ? '#fbbf24' : 'none'}
			/>
		))
	}

	return (
		<section className={styles.testimonialsSection}>
			<div className={styles.container}>
				{/* Header */}
				<div className={styles.header}>
					<div className={styles.headerContent}>
						<p className={styles.subtitle}>ШО ПРО НАС КАЖУТЬ?</p>
						<h2 className={styles.title}>
							CodeMaster люблять
							<br />
							тисячі студентів
						</h2>
					</div>
					<button className={styles.ctaButton}>Підібрати навчання</button>
				</div>

				{/* Main Content */}
				<div className={styles.content}>
					{/* Stats Card */}
					<div className={styles.statsCard}>
						<div className={styles.statsContent}>
							<div className={styles.statsNumber}>2000+</div>
							<div className={styles.statsText}>випускників на DOU</div>
						</div>
					</div>

					{/* Testimonials Grid */}
					<div className={styles.testimonialsGrid}>
						{testimonials.map(testimonial => (
							<div
								key={testimonial.id}
								className={styles.testimonialCard}
								onMouseEnter={() => setActiveTestimonial(testimonial.id)}
								onMouseLeave={() => setActiveTestimonial(null)}
							>
								<div className={styles.rating}>
									{renderStars(testimonial.rating)}
								</div>

								<p className={styles.testimonialText}>{testimonial.text}</p>

								<div className={styles.testimonialFooter}>
									<div className={styles.authorInfo}>
										<div className={styles.avatar}>{testimonial.avatar}</div>
										<div className={styles.authorDetails}>
											<div className={styles.authorName}>
												{testimonial.name}
											</div>
											<div className={styles.authorPosition}>
												{testimonial.position}
											</div>
										</div>
									</div>
									<div className={styles.companyLogo}>
										{testimonial.companyLogo}
									</div>
								</div>
							</div>
						))}
					</div>
				</div>
			</div>
		</section>
	)
}

export default Testimonials
