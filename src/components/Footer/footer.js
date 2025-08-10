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
	Box,
} from 'lucide-react'
import Image from 'next/image'

const Footer = () => {
	const currentYear = new Date().getFullYear()

	const courses = [
		{ name: 'Python програмування', icon: Code, href: '/python' },
		{ name: 'Веб-розробка', icon: Code, href: '/webDev' },
		{ name: 'Розробка ігор на Unity', icon: Gamepad2, href: '/Unity' },
		{ name: 'Roblox Studio', icon: Box, href: '/Roblox' },
	]

    const quickLinks = [
        { name: 'Про нас', href: '/#about' },
        { name: 'Відгуки', href: '/#testimonials' },
        { name: 'Контакти', href: '/#Contactform', openModal: true },
    ]

	const supportLinks = [
		{ name: 'Часті питання', href: '/#faq' },
	]

	const achievements = [
		{ number: '500+', label: 'Випускників', icon: GraduationCap },
		{ number: '3+', label: 'Роки досвіду', icon: Award },
		{ number: '4.9', label: 'Рейтинг', icon: Star },
	]

	const socialLinks = [
		{
			name: 'Instagram',
			icon: Instagram,
			href: 'https://instagram.com/smartcodeacademy',
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
								<Image
									src='/logo.jpg'
									alt='SmartCode Academy Logo'
									className={styles.logoImage}
									width={48}
									height={48}
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
                                    <Link 
                                        href={link.href} 
                                        className={styles.link}
                                        onClick={link.openModal ? (e)=>{ e.preventDefault(); window.dispatchEvent(new Event('openContactModal')) } : undefined}
                                        scroll={link.openModal ? false : undefined}
                                    >
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
				</div>
			</div>
		</footer>
	)
}

export default Footer
