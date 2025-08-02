import Header from '@/components/Header'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import Footer from '@/components/footer'

const geistSans = Geist({
	variable: '--font-geist-sans',
	subsets: ['latin'],
	display: 'swap',
})

const geistMono = Geist_Mono({
	variable: '--font-geist-mono',
	subsets: ['latin'],
	display: 'swap',
})

export const metadata = {
	title: 'SmartCode Academy - Школа програмування для дітей',
	description:
		'Навчаємо дітей 8-17 років програмуванню через інтерактивні заняття. Python, JavaScript, розробка ігор, веб-дизайн. Перший урок безкоштовно!',
	keywords:
		'програмування для дітей, школа програмування, Python, JavaScript, Roblox, Unity, веб-дизайн, онлайн навчання',
	openGraph: {
		title: 'SmartCode Academy - Школа програмування для дітей',
		description: 'Навчаємо дітей програмуванню через захопливі проекти',
		images: ['/og-image.jpg'],
	},
}

export default function RootLayout({ children }) {
	return (
		<html lang='uk'>
			<body
				className={`${geistSans.variable} ${geistMono.variable} antialiased`}
			>
				<Header />
				<main className='min-h-screen pt-16'>{children}</main>
				<Footer />
			</body>
		</html>
	)
}
