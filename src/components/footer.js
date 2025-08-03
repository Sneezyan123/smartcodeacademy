import Link from 'next/link'
import styles from './footer.module.css'
import {
	FaFacebook,
	FaInstagram,
	FaTelegram,
	FaYoutube,
	FaTiktok,
	FaLinkedin,
	FaPhone,
	FaEnvelope,
	FaMapMarkerAlt,
	FaClock,
	FaUsers,
	FaGraduationCap,
	FaCode,
	FaGamepad,
	FaPalette,
	FaRocket,
	FaAward,
	FaStar,
} from 'react-icons/fa'

const Footer = () => {
	const currentYear = new Date().getFullYear()

	const courses = [
		{ name: 'Python програмування', icon: FaCode, href: '/courses/python' },
		{
			name: 'JavaScript та веб-розробка',
			icon: FaCode,
			href: '/courses/javascript',
		},
		{ name: 'Розробка ігор', icon: FaGamepad, href: '/courses/games' },
		{ name: 'Frontend розробка', icon: FaPalette, href: '/courses/frontend' },
		{ name: 'Мобільна розробка', icon: FaRocket, href: '/courses/mobile' },
		{ name: 'Unity та C#', icon: FaGamepad, href: '/courses/unity' },
	]

	const quickLinks = [
		{ name: 'Про нас', href: '/about' },
		{ name: 'Наші ментори', href: '/mentors' },
		{ name: 'Портфоліо студентів', href: '/portfolio' },
		{ name: 'Відгуки батьків', href: '/testimonials' },
		{ name: 'Блог', href: '/blog' },
		{ name: 'Новини', href: '/news' },
		{ name: "Кар'єра", href: '/careers' },
	]

	const supportLinks = [
		{ name: 'Часті питання', href: '/faq' },
		{ name: 'Технічна підтримка', href: '/support' },
		{ name: 'Як записатися', href: '/how-to-enroll' },
		{ name: 'Оплата та знижки', href: '/pricing' },
		{ name: 'Графік занять', href: '/schedule' },
		{ name: 'Контакти', href: '/contact' },
		{ name: 'Партнери', href: '/partners' },
	]

	const achievements = [
		{ number: '500+', label: 'Випускників', icon: FaGraduationCap },
		{ number: '95%', label: 'Працевлаштування', icon: FaAward },
		{ number: '4.9', label: 'Рейтинг', icon: FaStar },
		{ number: '50+', label: 'Нагород', icon: FaRocket },
	]

	return (
		<footer className={styles.footer}>
			<div className={styles.container}>
				{/* Main Footer Content */}
				<div className={styles.mainContent}>
					{/* Logo and School Info */}
					<div className={styles.schoolInfo}>
						<div className={styles.logoSection}>
							<div className={styles.logo}>
								<span className={styles.logoText}>SCA</span>
							</div>
							<div className={styles.logoContent}>
								<h3 className={styles.schoolName}>SMARTCODE</h3>
								<p className={styles.schoolSubtitle}>ACADEMY</p>
							</div>
						</div>

						<p className={styles.description}>
							Провідна школа програмування для дітей 8-17 років. Навчаємо через
							практику, створюємо майбутнє разом з вашими дітьми!
						</p>

						{/* Achievements */}
						<div className={styles.achievements}>
							{achievements.map((achievement, index) => (
								<div key={index} className={styles.achievement}>
									<div className={styles.achievementIcon}>
										<achievement.icon />
									</div>
									<div className={styles.achievementContent}>
										<div className={styles.achievementNumber}>
											{achievement.number}
										</div>
										<div className={styles.achievementLabel}>
											{achievement.label}
										</div>
									</div>
								</div>
							))}
						</div>

						{/* Contact Info */}
						<div className={styles.contactInfo}>
							<div className={styles.contactItem}>
								<FaPhone className={styles.contactIcon} />
								<div className={styles.contactDetails}>
									<div className={styles.contactLabel}>Телефон</div>
									<div className={styles.contactValue}>+38 (067) 123-45-67</div>
								</div>
							</div>
							<div className={styles.contactItem}>
								<FaEnvelope className={styles.contactIcon} />
								<div className={styles.contactDetails}>
									<div className={styles.contactLabel}>Email</div>
									<div className={styles.contactValue}>
										info@smartcode-academy.com
									</div>
								</div>
							</div>
							<div className={styles.contactItem}>
								<FaMapMarkerAlt className={styles.contactIcon} />
								<div className={styles.contactDetails}>
									<div className={styles.contactLabel}>Локація</div>
									<div className={styles.contactValue}>
										Україна, онлайн навчання
									</div>
								</div>
							</div>
							<div className={styles.contactItem}>
								<FaClock className={styles.contactIcon} />
								<div className={styles.contactDetails}>
									<div className={styles.contactLabel}>Графік</div>
									<div className={styles.contactValue}>Пн-Нд: 9:00-21:00</div>
								</div>
							</div>
						</div>
					</div>

					{/* Courses */}
					<div className={styles.section}>
						<h4 className={styles.sectionTitle}>
							<FaCode className={styles.sectionIcon} />
							Наші курси
						</h4>
						<ul className={styles.linksList}>
							{courses.map((course, index) => (
								<li key={index}>
									<Link href={course.href} className={styles.courseLink}>
										<course.icon className={styles.courseLinkIcon} />
										{course.name}
									</Link>
								</li>
							))}
						</ul>
					</div>

					{/* Quick Links */}
					<div className={styles.section}>
						<h4 className={styles.sectionTitle}>
							<FaUsers className={styles.sectionIcon} />
							Швидкі посилання
						</h4>
						<ul className={styles.linksList}>
							{quickLinks.map((link, index) => (
								<li key={index}>
									<Link href={link.href} className={styles.link}>
										{link.name}
									</Link>
								</li>
							))}
						</ul>
					</div>

					{/* Support */}
					<div className={styles.section}>
						<h4 className={styles.sectionTitle}>
							<FaAward className={styles.sectionIcon} />
							Підтримка
						</h4>
						<ul className={styles.linksList}>
							{supportLinks.map((link, index) => (
								<li key={index}>
									<Link href={link.href} className={styles.link}>
										{link.name}
									</Link>
								</li>
							))}
						</ul>

						{/* CTA Button */}
						<div className={styles.ctaSection}>
							<Link href='/free-trial' className={styles.ctaButton}>
								<FaRocket className={styles.ctaIcon} />
								<div className={styles.ctaContent}>
									<div className={styles.ctaTitle}>Безкоштовний урок</div>
									<div className={styles.ctaSubtitle}>Спробуй прямо зараз!</div>
								</div>
							</Link>
						</div>
					</div>
				</div>

				{/* Divider */}
				<div className={styles.divider}></div>

				{/* Bottom Section */}
				<div className={styles.bottomSection}>
					{/* Social Links */}
					<div className={styles.socialSection}>
						<h4 className={styles.socialTitle}>Приєднуйтесь до нас:</h4>
						<div className={styles.socialLinks}>
							<Link
								href='https://t.me/smartcodeacademy'
								className={styles.socialLink}
								title='Telegram'
							>
								<FaTelegram />
							</Link>
							<Link
								href='https://instagram.com/smartcodeacademy'
								className={styles.socialLink}
								title='Instagram'
							>
								<FaInstagram />
							</Link>
							<Link
								href='https://youtube.com/smartcodeacademy'
								className={styles.socialLink}
								title='YouTube'
							>
								<FaYoutube />
							</Link>
							<Link
								href='https://facebook.com/smartcodeacademy'
								className={styles.socialLink}
								title='Facebook'
							>
								<FaFacebook />
							</Link>
							<Link
								href='https://tiktok.com/@smartcodeacademy'
								className={styles.socialLink}
								title='TikTok'
							>
								<FaTiktok />
							</Link>
							<Link
								href='https://linkedin.com/company/smartcodeacademy'
								className={styles.socialLink}
								title='LinkedIn'
							>
								<FaLinkedin />
							</Link>
						</div>
					</div>

					{/* Newsletter */}
					<div className={styles.newsletter}>
						<h4 className={styles.newsletterTitle}>Будьте в курсі новин</h4>
						<p className={styles.newsletterText}>
							Отримуйте корисні матеріали та новини про ІТ-освіту
						</p>
						<form className={styles.newsletterForm}>
							<input
								type='email'
								placeholder='Ваш email'
								className={styles.newsletterInput}
							/>
							<button type='submit' className={styles.newsletterButton}>
								<FaRocket />
							</button>
						</form>
					</div>

					{/* Copyright and Legal */}
					<div className={styles.legal}>
						<div className={styles.copyright}>
							<p>© {currentYear} SmartCode Academy. Усі права захищені.</p>
							<p className={styles.subtitle}>Створюємо майбутнє через освіту</p>
						</div>
						<div className={styles.legalLinks}>
							<Link href='/privacy' className={styles.legalLink}>
								Політика конфіденційності
							</Link>
							<Link href='/terms' className={styles.legalLink}>
								Умови використання
							</Link>
							<Link href='/cookies' className={styles.legalLink}>
								Політика cookie
							</Link>
						</div>
					</div>
				</div>
			</div>
		</footer>
	)
}

export default Footer
