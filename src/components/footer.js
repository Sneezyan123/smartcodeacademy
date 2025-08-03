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
} from 'react-icons/fa'

const Footer = () => {
	const currentYear = new Date().getFullYear()

	return (
		<footer className={styles.footer}>
			<div className={styles.container}>
				<div className={styles.grid}>
					{/* Логотип та інформація про школу */}
					<div className={styles.schoolInfo}>
						<div className={styles.logoSection}>
							<div className={styles.logo}>
								<span className={styles.logoText}>SCA</span>
							</div>
							<div>
								<h3 className={styles.schoolName}>SMART CODE</h3>
								<p className={styles.schoolSubtitle}>ACADEMY</p>
							</div>
						</div>
						<p className={styles.description}>
							Школа програмування для дітей 6-17 років. Перетворюємо кожен крок
							до програмування на захопливу пригоду!
						</p>
						<div className={styles.contactInfo}>
							<div className={styles.contactItem}>
								<FaPhone className={styles.icon} />
								<span>+38**************48</span>
							</div>
							<div className={styles.contactItem}>
								<FaEnvelope className={styles.icon} />
								<span>info@smartcodeacademy.com</span>
							</div>
							<div className={styles.contactItem}>
								<FaMapMarkerAlt className={styles.icon} />
								<span>Ukraine, Online навчання</span>
							</div>
							<div className={styles.contactItem}>
								<FaClock className={styles.icon} />
								<span>Гнучкий графік: будні та вихідні</span>
							</div>
						</div>
					</div>

					{/* Курси */}
					<div className={styles.section}>
						<h4 className={styles.sectionTitle}>Наші курси</h4>
						<ul className={styles.linksList}>
							<li>
								<Link href='/courses/roblox' className={styles.link}>
									Roblox Studio + Lua
								</Link>
							</li>
							<li>
								<Link href='/courses/python' className={styles.link}>
									Python програмування
								</Link>
							</li>
							<li>
								<Link href='/courses/web' className={styles.link}>
									Веб-розробка (HTML/CSS/JS)
								</Link>
							</li>
							<li>
								<Link href='/courses/react' className={styles.link}>
									React розробка
								</Link>
							</li>
							<li>
								<Link href='/courses/csharp' className={styles.link}>
									C# та Unity
								</Link>
							</li>
							<li>
								<Link href='/courses/gamedev' className={styles.link}>
									2D/3D розробка ігор
								</Link>
							</li>
						</ul>
					</div>

					{/* Для батьків та учнів */}
					<div className={styles.section}>
						<h4 className={styles.sectionTitle}>Інформація</h4>
						<ul className={styles.linksList}>
							<li>
								<Link href='/about' className={styles.link}>
									Про нас
								</Link>
							</li>
							<li>
								<Link href='/mentors' className={styles.link}>
									Наші ментори
								</Link>
							</li>
							<li>
								<Link href='/projects' className={styles.link}>
									Портфоліо учнів
								</Link>
							</li>
							<li>
								<Link href='/demo-days' className={styles.link}>
									Демо-дні
								</Link>
							</li>
							<li>
								<Link href='/schedule' className={styles.link}>
									Розклад занять
								</Link>
							</li>
							<li>
								<Link href='/reviews' className={styles.link}>
									Відгуки батьків
								</Link>
							</li>
							<li>
								<Link href='/blog' className={styles.link}>
									Блог
								</Link>
							</li>
						</ul>
					</div>

					{/* Підтримка та реєстрація */}
					<div className={styles.section}>
						<h4 className={styles.sectionTitle}>Підтримка</h4>
						<ul className={styles.linksList}>
							<li>
								<Link href='/contact' className={styles.link}>
									Контакти
								</Link>
							</li>
							<li>
								<Link href='/faq' className={styles.link}>
									Часті питання
								</Link>
							</li>
							<li>
								<Link href='/support' className={styles.link}>
									Технічна підтримка
								</Link>
							</li>
							<li>
								<Link href='/parent-meetings' className={styles.link}>
									Зустрічі з батьками
								</Link>
							</li>
						</ul>

						{/* Кнопка реєстрації */}
						<div className={styles.ctaSection}>
							<Link href='/free-trial' className={styles.ctaButton}>
								<FaUsers className={styles.ctaIcon} />
								Безкоштовна ознайомча зустріч
							</Link>
							<p className={styles.ctaText}>
								Перший крок до ІТ-кар'єри вашої дитини!
							</p>
						</div>
					</div>
				</div>

				{/* Розділювач */}
				<div className={styles.divider}>
					<div className={styles.bottomSection}>
						{/* Соціальні мережі */}
						<div className={styles.socialSection}>
							<p className={styles.socialTitle}>Слідкуйте за нами:</p>
							<div className={styles.socialLinks}>
								<Link href='#' className={styles.socialLink}>
									<FaTelegram />
								</Link>
								<Link href='#' className={styles.socialLink}>
									<FaInstagram />
								</Link>
								<Link href='#' className={styles.socialLink}>
									<FaYoutube />
								</Link>
								<Link href='#' className={styles.socialLink}>
									<FaFacebook />
								</Link>
								<Link href='#' className={styles.socialLink}>
									<FaTiktok />
								</Link>
								<Link href='#' className={styles.socialLink}>
									<FaLinkedin />
								</Link>
							</div>
						</div>

						{/* Копірайт */}
						<div className={styles.copyright}>
							<p>© {currentYear} SMART CODE ACADEMY. Всі права захищені.</p>
						</div>

						{/* Юридична інформація */}
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
			</div>
		</footer>
	)
}

export default Footer
