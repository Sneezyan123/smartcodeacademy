import Footer from '@/components/Footer/footer'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header/Header'

const geistSans = Geist({
	variable: '--font-geist-sans',
	subsets: ['latin'],
	display: 'swap',
	weight: ['300', '400', '500', '600', '700', '800', '900'],
})

const geistMono = Geist_Mono({
	variable: '--font-geist-mono',
	subsets: ['latin'],
	display: 'swap',
	weight: ['300', '400', '500', '600', '700'],
})

export const metadata = {
	title: 'SmartCode Academy - Школа програмування для дітей та підлітків',
	description:
		'Навчаємо дітей 8-17 років програмуванню через інтерактивні заняття. Python, JavaScript, розробка ігор, веб-дизайн. Перший урок безкоштовно! Онлайн та офлайн формати навчання в Україні.',
	keywords: [
		'програмування для дітей',
		'школа програмування',
		'Python для дітей',
		'JavaScript навчання',
		'Roblox Studio',
		'Unity розробка',
		'веб-дизайн для дітей',
		'онлайн навчання програмування',
		'ІТ-освіта',
		'курси програмування',
		'SmartCode Academy',
		'кодинг для дітей',
		'програмування Україна',
		'дитячі ІТ курси',
		'навчання програмування онлайн',
		'розробка ігор для дітей',
	].join(', '),
	authors: [{ name: 'SmartCode Academy' }],
	creator: 'SmartCode Academy',
	publisher: 'SmartCode Academy',
	robots: 'index, follow',
	openGraph: {
		title: 'SmartCode Academy - Школа програмування для дітей',
		description:
			'Навчаємо дітей програмуванню через захопливі проекти. Перший урок безкоштовно!',
		url: 'https://smartcode-academy.com',
		siteName: 'SmartCode Academy',
		images: [
			{
				url: '/og-image.jpg',
				width: 1200,
				height: 630,
				alt: 'SmartCode Academy - Школа програмування для дітей',
			},
		],
		locale: 'uk_UA',
		type: 'website',
	},
	twitter: {
		card: 'summary_large_image',
		title: 'SmartCode Academy - Школа програмування для дітей',
		description: 'Навчаємо дітей програмуванню через захопливі проекти',
		images: ['/og-image.jpg'],
	},
	verification: {
		google: 'your-google-verification-code',
		yandex: 'your-yandex-verification-code',
	},
	alternates: {
		canonical: 'https://smartcode-academy.com',
		languages: {
			'uk-UA': 'https://smartcode-academy.com',
			'en-US': 'https://smartcode-academy.com/en',
		},
	},
}

export const viewport = {
	width: 'device-width',
	initialScale: 1,
	themeColor: [
		{ media: '(prefers-color-scheme: light)', color: '#2563eb' },
		{ media: '(prefers-color-scheme: dark)', color: '#1d4ed8' },
	],
}

export default function RootLayout({ children }) {




	return (
		<html lang='uk' suppressHydrationWarning>
			<head>
				<meta name='format-detection' content='telephone=no' />
				<meta name='apple-mobile-web-app-capable' content='yes' />
				<meta name='apple-mobile-web-app-status-bar-style' content='default' />
				<meta name='mobile-web-app-capable' content='yes' />
				<link rel='icon' href='/logo.jpg' />
			</head>
			<body
				className={`${geistSans.variable} ${geistMono.variable} antialiased`}
				suppressHydrationWarning
			>
				<div className='min-h-screen flex flex-col bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50'>
					<Header />
					<main className='flex-1 pt-16 relative'>{children}</main>
					<Footer />
				</div>

				{/* Structured Data */}
				<script
					type='application/ld+json'
					dangerouslySetInnerHTML={{
						__html: JSON.stringify({
							'@context': 'https://schema.org',
							'@type': 'EducationalOrganization',
							name: 'SmartCode Academy',
							description: 'Школа програмування для дітей 8-17 років',
							url: 'https://smartcode-academy.com',
							logo: 'https://smartcode-academy.com/logo.png',
							image: 'https://smartcode-academy.com/og-image.jpg',
							telephone: '+380671234567',
							email: 'info@smartcode-academy.com',
							address: {
								'@type': 'PostalAddress',
								addressCountry: 'UA',
								addressRegion: 'Україна',
							},
							sameAs: [
								'https://www.facebook.com/smartcodeacademy',
								'https://www.instagram.com/smartcodeacademy',
								'https://t.me/smartcodeacademy',
							],
							offers: {
								'@type': 'Offer',
								name: 'Безкоштовний пробний урок',
								description: 'Перший урок програмування безкоштовно',
								price: '0',
								priceCurrency: 'UAH',
							},
							hasOfferCatalog: {
								'@type': 'OfferCatalog',
								name: 'Курси програмування',
								itemListElement: [
									{
										'@type': 'Offer',
										name: 'Python для дітей',
										description: 'Основи програмування на Python',
										category: 'Programming Course',
									},
									{
										'@type': 'Offer',
										name: 'JavaScript та веб-розробка',
										description: 'Створення веб-сайтів і додатків',
										category: 'Web Development Course',
									},
									{
										'@type': 'Offer',
										name: 'Розробка ігор',
										description: 'Unity, Roblox Studio, Scratch',
										category: 'Game Development Course',
									},
								],
							},
						}),
					}}
				/>
			</body>
		</html>
	)
}
