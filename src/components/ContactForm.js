"use client"
import React, { useState } from 'react'
import styles from './ContactForm.module.css'

const ContactForm = () => {
	const [formData, setFormData] = useState({
		name: '',
		phone: '',
		email: '',
	})

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
		// Тут буде логіка відправки форми
	}

	return (
		<div className={styles.container}>
			<div className={styles.contactCard}>
				{/* Ліва секція */}
				<div className={styles.leftSection}>
					<div className={styles.overlay}></div>

					<div className={styles.content}>
						<p className={styles.subtitle}>ХОЧЕШ ДІЗНАТИСЯ БІЛЬШЕ?</p>

						<h1 className={styles.title}>Зв'яжись з нами</h1>

						<ul className={styles.benefitsList}>
							<li className={styles.benefitItem}>
								<div className={styles.checkmark}>
									<span>✓</span>
								</div>
								Отримай відповіді на всі запитання
							</li>

							<li className={styles.benefitItem}>
								<div className={styles.checkmark}>
									<span>✓</span>
								</div>
								З'ясуй, який формат навчання тобі підійде
							</li>

							<li className={styles.benefitItem}>
								<div className={styles.checkmark}>
									<span>✓</span>
								</div>
								Дізнайся про наші ексклюзивні пропозиції
							</li>
						</ul>
					</div>
				</div>

				{/* Права секція з формою */}
				<div className={styles.rightSection}>
					<form onSubmit={handleSubmit} className={styles.form}>
						<div className={styles.formGroup}>
							<label className={styles.label}>Ім'я *</label>
							<input
								type='text'
								name='name'
								value={formData.name}
								onChange={handleInputChange}
								placeholder='Іван'
								className={styles.input}
								required
							/>
						</div>

						<div className={styles.formGroup}>
							<label className={styles.label}>Телефон</label>
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
									className={`${styles.input} ${styles.phoneInput}`}
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
								placeholder='email@example.com'
								className={styles.input}
							/>
						</div>

						<button type='submit' className={styles.submitBtn}>
							Отримати консультацію
						</button>

						<p className={styles.disclaimer}>
							Натискаючи на «Отримати консультацію», ти погоджуєшся з нашими{' '}
							<a href='#' className={styles.link}>
								Умовами використання
							</a>
							.{' '}
							<a href='#' className={styles.link}>
								Політикою конфіденційності
							</a>{' '}
							та{' '}
							<a href='#' className={styles.link}>
								Політикою файлів cookie
							</a>
							.
						</p>
					</form>
				</div>
			</div>
		</div>
	)
}

export default ContactForm
