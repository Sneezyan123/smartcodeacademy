"use client"
import React, { useState } from 'react'
import { Phone, Mail, MapPin, Clock, Send, CheckCircle, Star, Users, Award } from 'lucide-react'
import styles from './ContactForm.module.css'

const ContactForm = () => {
	const [formData, setFormData] = useState({
		name: '',
		phone: '',
		email: '',
		age: '',
		course: '',
		message: ''
	})
	const [isSubmitted, setIsSubmitted] = useState(false)

	const courses = [
		'Python для початківців',
		'JavaScript та веб-розробка',
		'Розробка ігор (Unity/Roblox)',
		'Frontend розробка (React)',
		'Мобільна розробка',
		'Не впевнений(а), потрібна консультація'
	]

	const benefits = [
		{
			icon: <CheckCircle className={styles.benefitIcon} />,
			title: 'Безкоштовний пробний урок',
			description: 'Спробуйте наш підхід до навчання без зобов\'язань'
		},
		{
			icon: <Users className={styles.benefitIcon} />,
			title: 'Персональний підхід',
			description: 'Індивідуальна програма навчання для кожного студента'
		},
		{
			icon: <Award className={styles.benefitIcon} />,
			title: 'Досвідчені ментори',
			description: 'Навчання від практикуючих розробників з топових IT компаній'
		},
		{
			icon: <Star className={styles.benefitIcon} />,
			title: 'Гарантія результату',
			description: '95% студентів успішно завершують навчання'
		}
	]

	const handleInputChange = e => {
		const { name, value } = e.target
		setFormData(prev => ({
			...prev,
			[name]: value,
		}))
	}

	const handleSubmit = e => {
		e.preventDefault()
		console.log('Form submitted:', formData)
		setIsSubmitted(true)
		// Тут буде логіка відправки форми
		setTimeout(() => setIsSubmitted(false), 3000)
	}

	return (
		<section className={styles.contactSection}>
			<div className={styles.container}>
				<div className={styles.contactCard}>
					{/* Ліва секція з інформацією */}
					<div className={styles.leftSection}>
						<div className={styles.overlay}></div>
						
						<div className={styles.content}>
							<div className={styles.badge}>
								<Send className={styles.badgeIcon} />
								Зв&apos;яжіться з нами
							</div>
							
							<h2 className={styles.title}>
								Почніть навчання
								<span className={styles.titleAccent}>вже сьогодні</span>
							</h2>
							
							<p className={styles.subtitle}>
								Заповніть форму і отримайте персональну консультацію від наших експертів. 
								Ми допоможемо обрати ідеальний курс для вашої дитини.
							</p>

							<div className={styles.benefitsList}>
								{benefits.map((benefit, index) => (
									<div key={index} className={styles.benefitItem}>
										<div className={styles.benefitIconContainer}>
											{benefit.icon}
										</div>
										<div className={styles.benefitContent}>
											<h4 className={styles.benefitTitle}>{benefit.title}</h4>
											<p className={styles.benefitDescription}>{benefit.description}</p>
										</div>
									</div>
								))}
							</div>

							{/* Контактна інформація */}
							<div className={styles.contactInfo}>
								<div className={styles.contactItem}>
									<Phone className={styles.contactIcon} />
									<div>
										<div className={styles.contactLabel}>Телефон</div>
										<div className={styles.contactValue}>+38 (067) 123-45-67</div>
									</div>
								</div>
								<div className={styles.contactItem}>
									<Mail className={styles.contactIcon} />
									<div>
										<div className={styles.contactLabel}>Email</div>
										<div className={styles.contactValue}>info@smartcode-academy.com</div>
									</div>
								</div>
								<div className={styles.contactItem}>
									<Clock className={styles.contactIcon} />
									<div>
										<div className={styles.contactLabel}>Графік роботи</div>
										<div className={styles.contactValue}>Пн-Нд: 9:00-21:00</div>
									</div>
								</div>
								<div className={styles.contactItem}>
									<MapPin className={styles.contactIcon} />
									<div>
										<div className={styles.contactLabel}>Формат</div>
										<div className={styles.contactValue}>Онлайн та офлайн</div>
									</div>
								</div>
							</div>
						</div>
					</div>

					{/* Права секція з формою */}
					<div className={styles.rightSection}>
						<div className={styles.formContainer}>
							<div className={styles.formHeader}>
								<h3 className={styles.formTitle}>Записатися на консультацію</h3>
								<p className={styles.formSubtitle}>
									Заповніть форму і ми зв&apos;яжемося з вами протягом 15 хвилин
								</p>
							</div>

							{!isSubmitted ? (
								<form onSubmit={handleSubmit} className={styles.form}>
									<div className={styles.formRow}>
										<div className={styles.formGroup}>
											<label className={styles.label}>Ім&apos;я дитини *</label>
											<input
												type='text'
												name='name'
												value={formData.name}
												onChange={handleInputChange}
												placeholder="Введіть ім\'я"
												className={styles.input}
												required
											/>
										</div>
										<div className={styles.formGroup}>
											<label className={styles.label}>Вік дитини</label>
											<select
												name='age'
												value={formData.age}
												onChange={handleInputChange}
												className={styles.select}
											>
												<option value=''>Оберіть вік</option>
												{Array.from({length: 10}, (_, i) => i + 8).map(age => (
													<option key={age} value={age}>{age} років</option>
												))}
											</select>
										</div>
									</div>

									<div className={styles.formGroup}>
										<label className={styles.label}>Телефон *</label>
										<div className={styles.phoneGroup}>
											<div className={styles.countryCode}>
												<div className={styles.flag}></div>
												<span>+380</span>
											</div>
											<input
												type='tel'
												name='phone'
												value={formData.phone}
												onChange={handleInputChange}
												placeholder='67 123 45 67'
												className={`${styles.input} ${styles.phoneInput}`}
												required
											/>
										</div>
									</div>

									<div className={styles.formGroup}>
										<label className={styles.label}>Email</label>
										<input
											type='email'
											name='email'
											value={formData.email}
											onChange={handleInputChange}
											placeholder='your.email@example.com'
											className={styles.input}
										/>
									</div>

									<div className={styles.formGroup}>
										<label className={styles.label}>Цікавий напрямок</label>
										<select
											name='course'
											value={formData.course}
											onChange={handleInputChange}
											className={styles.select}
										>
											<option value=''>Оберіть курс</option>
											{courses.map((course, index) => (
												<option key={index} value={course}>{course}</option>
											))}
										</select>
									</div>

									<div className={styles.formGroup}>
										<label className={styles.label}>Повідомлення</label>
										<textarea
											name='message'
											value={formData.message}
											onChange={handleInputChange}
											placeholder='Розкажіть більше про інтереси та цілі вашої дитини...'
											className={styles.textarea}
											rows={4}
										/>
									</div>

									<button type='submit' className={styles.submitBtn}>
										<Send className={styles.submitIcon} />
										Отримати консультацію
									</button>

									<p className={styles.disclaimer}>
										Натискаючи кнопку, ви погоджуєтеся з{' '}
										<a href='#' className={styles.link}>Політикою конфіденційності</a>
										{' '}та{' '}
										<a href='#' className={styles.link}>Умовами використання</a>
									</p>
								</form>
							) : (
								<div className={styles.successMessage}>
									<div className={styles.successIcon}>
										<CheckCircle />
									</div>
									<h3 className={styles.successTitle}>Дякуємо за заявку!</h3>
									<p className={styles.successText}>
										Ми отримали вашу заявку та зв&apos;яжемося з вами найближчим часом для 
										обговорення деталей навчання.
									</p>
									<div className={styles.successStats}>
										<div className={styles.successStat}>
											<strong>15 хв</strong>
											<span>Час відповіді</span>
										</div>
										<div className={styles.successStat}>
											<strong>500+</strong>
											<span>Задоволених батьків</span>
										</div>
									</div>
								</div>
							)}
						</div>
					</div>
				</div>
			</div>
		</section>
	)
}

export default ContactForm