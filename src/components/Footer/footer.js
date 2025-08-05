'use client'
import Link from 'next/link'
import styles from './footer.module.css'
import {
	Code,
	Gamepad2,
	Palette,
	Rocket,
	Award,
	Star,
	Users,
	GraduationCap,
	Phone,
	Mail,
	MapPin,
	Clock,
	Send,
	Instagram,
	Youtube,
	Facebook,
	Linkedin,
} from 'lucide-react'

const Footer = () => {
	const currentYear = new Date().getFullYear()

	const courses = [
		{ name: 'Python програмування', icon: Code, href: '/courses/python' },
		{ name: 'Веб-розробка', icon: Code, href: '/courses/javascript' },
		{ name: 'Розробка ігор', icon: Gamepad2, href: '/courses/games' },
		{ name: 'Frontend розробка', icon: Palette, href: '/courses/frontend' },
	]

	const quickLinks = [
		{ name: 'Про нас', href: '/about' },
		{ name: 'Наші ментори', href: '/mentors' },
		{ name: 'Відгуки батьків', href: '/testimonials' },
		{ name: 'Блог', href: '/blog' },
		{ name: "Кар'єра", href: '/careers' },
	]

	const supportLinks = [
		{ name: 'Часті питання', href: '/faq' },
		{ name: 'Технічна підтримка', href: '/support' },
		{ name: 'Контакти', href: '/contact' },
		{ name: 'Партнери', href: '/partners' },
	]

	const achievements = [
		{ number: '500+', label: 'Випускників', icon: GraduationCap },
		{ number: '95%', label: 'Працевлаштування', icon: Award },
		{ number: '4.9', label: 'Рейтинг', icon: Star },
	]

	const socialLinks = [
		{ name: 'Telegram', icon: Send, href: 'https://t.me/smartcodeacademy' },
		{
			name: 'Instagram',
			icon: Instagram,
			href: 'https://instagram.com/smartcodeacademy',
		},
		{
			name: 'Youtube',
			icon: Youtube,
			href: 'https://youtube.com/smartcodeacademy',
		},
		{
			name: 'Facebook',
			icon: Facebook,
			href: 'https://facebook.com/smartcodeacademy',
		},
		{
			name: 'Linkedin',
			icon: Linkedin,
			href: 'https://linkedin.com/company/smartcodeacademy',
		},
	]

	return (
		<footer className={styles.footer}>
			<div className={styles.backgroundElements}>
				<div className={`${styles.floatingElement} ${styles.element1}`}></div>
				<div className={`${styles.floatingElement} ${styles.element2}`}></div>
			</div>
			<div className={styles.container}>
				<div className={styles.mainContent}>
					{/* --- Секція з інформацією про школу --- */}
					<div className={styles.schoolInfo}>
						<div className={styles.logoSection}>
							<div className={styles.logoIconWrapper}>
								<img
									src='https://placehold.co/48x48/7c3aed/ffffff?text=SC'
									alt='SmartCode Academy Logo'
									className={styles.logoImage}
								/>
							</div>
							<div className={styles.logoText}>
								<h3 className={styles.schoolName}>SmartCode</h3>
								<p className={styles.schoolSubtitle}>Academy</p>
							</div>
						</div>
						<p className={styles.description}>
							Провідна школа програмування для дітей 8-17 років. Навчаємо через
							практику, створюємо майбутнє разом!
						</p>
						<div className={styles.achievements}>
							{achievements.map((item, index) => (
								<div key={index} className={styles.achievement}>
									<div className={styles.achievementIcon}>
										<item.icon size={16} />
									</div>
									<div>
										<div className={styles.achievementNumber}>
											{item.number}
										</div>
										<div className={styles.achievementLabel}>{item.label}</div>
									</div>
								</div>
							))}
						</div>
					</div>

					{/* --- Секція з курсами --- */}
					<div className={styles.section}>
						<h4 className={styles.sectionTitle}>Наші курси</h4>
						<ul className={styles.linksList}>
							{courses.map((course, index) => (
								<li key={index}>
									<Link href={course.href} className={styles.link}>
										<course.icon size={16} className={styles.linkIcon} />{' '}
										{course.name}
									</Link>
								</li>
							))}
						</ul>
					</div>

					{/* --- Секція швидких посилань --- */}
					<div className={styles.section}>
						<h4 className={styles.sectionTitle}>Навігація</h4>
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

					{/* --- Секція підтримки --- */}
					<div className={styles.section}>
						<h4 className={styles.sectionTitle}>Підтримка</h4>
						<ul className={styles.linksList}>
							{supportLinks.map((link, index) => (
								<li key={index}>
									<Link href={link.href} className={styles.link}>
										{link.name}
									</Link>
								</li>
							))}
						</ul>
					</div>
				</div>

				<div className={styles.divider}></div>

				{/* --- Нижня секція --- */}
				<div className={styles.bottomSection}>
					<div className={styles.copyright}>
						© {currentYear} SmartCode Academy. Усі права захищені.
					</div>
					<div className={styles.socialLinks}>
						{socialLinks.map((social, index) => (
							<a
								key={index}
								href={social.href}
								className={styles.socialLink}
								title={social.name}
								target='_blank'
								rel='noopener noreferrer'
							>
								<social.icon size={18} />
							</a>
						))}
					</div>
					<div className={styles.legalLinks}>
						<Link href='/privacy' className={styles.legalLink}>
							Політика конфіденційності
						</Link>
						<Link href='/terms' className={styles.legalLink}>
							Умови використання
						</Link>
					</div>
				</div>
			</div>
		</footer>
	)
}

export default Footer
