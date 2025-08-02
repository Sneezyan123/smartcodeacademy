'use client'
import React, { useState, useEffect } from 'react'
import {
	ChevronDown,
	Phone,
	User,
	Menu,
	X,
	Code,
	Gamepad2,
	Monitor,
	Clock,
	Users,
	Star,
	MapPin,
} from 'lucide-react'

const Header = () => {
	const [isCoursesOpen, setIsCoursesOpen] = useState(false)
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
	const [isScrolled, setIsScrolled] = useState(false)

	useEffect(() => {
		const handleScroll = () => {
			setIsScrolled(window.scrollY > 10)
		}
		window.addEventListener('scroll', handleScroll)
		return () => window.removeEventListener('scroll', handleScroll)
	}, [])

	const courses = [
		{
			icon: <Code className='w-5 h-5' />,
			title: 'Програмування',
			description: 'Python, JavaScript, Java',
			age: '8-16 років',
			color: 'text-blue-600',
		},
		{
			icon: <Gamepad2 className='w-5 h-5' />,
			title: 'Розробка ігор',
			description: 'Unity, Scratch, Roblox',
			age: '9-17 років',
			color: 'text-green-600',
		},
		{
			icon: <Monitor className='w-5 h-5' />,
			title: 'Веб-дизайн',
			description: 'HTML, CSS, Figma',
			age: '10-18 років',
			color: 'text-purple-600',
		},
	]

	const navItems = [
		{ label: 'Вартість', href: '#pricing' },
		{ label: 'Відгуки', href: '#reviews' },
		{ label: 'Викладачі', href: '#teachers' },
		{ label: 'Контакти', href: '#contacts' },
	]

	return (
		<header
			className={`fixed top-0 w-full z-50 transition-all duration-300 ${
				isScrolled
					? 'bg-white/95 backdrop-blur-md shadow-lg'
					: 'bg-white shadow-sm'
			}`}
		>
			<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
				<div className='flex justify-between items-center h-16'>
					{/* Logo */}
					<div className='flex items-center cursor-pointer group'>
						<div className='flex-shrink-0 flex items-center'>
							<div className='w-10 h-10 mr-3 transform group-hover:scale-110 transition-transform duration-300'>
								<svg viewBox='0 0 100 100' className='w-full h-full'>
									<defs>
										<linearGradient
											id='logoGradient'
											x1='0%'
											y1='0%'
											x2='100%'
											y2='100%'
										>
											<stop offset='0%' stopColor='#2563eb' />
											<stop offset='50%' stopColor='#8b5cf6' />
											<stop offset='100%' stopColor='#4f46e5' />
										</linearGradient>
									</defs>
									<circle cx='50' cy='50' r='45' fill='url(#logoGradient)' />
									<path
										d='M25 35 Q25 25 35 25 L65 25 Q75 25 75 35 L75 45 Q75 50 70 50 L60 50 L60 40 L65 40 L65 35 L35 35 L35 40 L40 40 L40 50 L30 50 Q25 50 25 45 Z'
										fill='#fff'
									/>
									<path
										d='M40 55 L60 55 L60 60 L50 60 L50 75 L40 75 Z'
										fill='#fff'
									/>
									<path d='M30 60 L70 60 L70 65 L30 65 Z' fill='#fff' />
								</svg>
							</div>
							<div className='text-xl font-bold text-gray-900'>
								SmartCode
								<span className='block text-sm font-normal bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent'>
									Academy
								</span>
							</div>
						</div>
					</div>

					{/* Navigation */}
					<nav className='hidden md:flex space-x-8'>
						{/* Courses Dropdown */}
						<div className='relative group'>
							<button
								className='flex items-center text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors'
								onMouseEnter={() => setIsCoursesOpen(true)}
								onMouseLeave={() => setIsCoursesOpen(false)}
							>
								Курси
								<ChevronDown
									className={`ml-1 h-4 w-4 transition-transform duration-200 ${
										isCoursesOpen ? 'rotate-180' : ''
									}`}
								/>
							</button>

							{/* Dropdown Menu */}
							<div
								className={`absolute top-full left-0 w-80 bg-white rounded-lg shadow-xl border border-gray-100 py-4 transition-all duration-200 ${
									isCoursesOpen
										? 'opacity-100 visible translate-y-0'
										: 'opacity-0 invisible -translate-y-2'
								}`}
								onMouseEnter={() => setIsCoursesOpen(true)}
								onMouseLeave={() => setIsCoursesOpen(false)}
							>
								{courses.map((course, index) => (
									<a
										key={index}
										href={`#course-${index}`}
										className='flex items-start px-6 py-3 hover:bg-gray-50 transition-colors'
									>
										<div className={`${course.color} mr-4 mt-1`}>
											{course.icon}
										</div>
										<div>
											<h4 className='font-semibold text-gray-900 mb-1'>
												{course.title}
											</h4>
											<p className='text-sm text-gray-600 mb-1'>
												{course.description}
											</p>
											<span className='text-xs text-blue-600 font-medium'>
												{course.age}
											</span>
										</div>
									</a>
								))}
								<div className='border-t border-gray-100 mt-2 pt-2 px-6'>
									<a
										href='#all-courses'
										className='text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors'
									>
										Переглянути всі курси →
									</a>
								</div>
							</div>
						</div>

						{/* Regular Nav Items */}
						{navItems.map((item, index) => (
							<a
								key={index}
								href={item.href}
								className='text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors relative group'
							>
								{item.label}
								<span className='absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full'></span>
							</a>
						))}
					</nav>

					{/* Right side */}
					<div className='flex items-center space-x-4'>
						{/* Contact Info */}
						<div className='hidden lg:flex items-center text-gray-600 hover:text-blue-600 transition-colors cursor-pointer'>
							<Phone className='w-4 h-4 mr-2' />
							<span className='text-sm font-medium'>+38 (067) 123-45-67</span>
						</div>

						{/* Location & Language */}
						<div className='hidden md:flex items-center space-x-3'>
							<div className='flex items-center text-gray-600 hover:text-blue-600 transition-colors cursor-pointer'>
								<MapPin className='w-4 h-4 mr-1' />
								<span className='text-sm'>Львів</span>
							</div>

							<div className='flex items-center cursor-pointer group'>
								<div className='w-6 h-4 mr-2 bg-blue-500 relative overflow-hidden rounded-sm shadow-sm'>
									<div className='absolute top-0 left-0 w-full h-1/2 bg-blue-500'></div>
									<div className='absolute bottom-0 left-0 w-full h-1/2 bg-yellow-400'></div>
								</div>
								<ChevronDown className='w-4 h-4 text-gray-400 group-hover:text-gray-600 transition-colors' />
							</div>
						</div>

						{/* User Account */}
						<button className='flex items-center justify-center w-9 h-9 bg-gray-100 rounded-full hover:bg-blue-100 hover:text-blue-600 transition-all duration-300 group'>
							<User className='w-5 h-5 text-gray-600 group-hover:text-blue-600 transition-colors' />
						</button>

						{/* CTA Button */}
						<button className='bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-2 rounded-lg text-sm font-medium transition-all duration-300 transform hover:-translate-y-0.5 hover:shadow-lg'>
							Безкоштовний урок
						</button>

						{/* Mobile menu button */}
						<div className='md:hidden'>
							<button
								className='p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 transition-colors'
								onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
							>
								{isMobileMenuOpen ? (
									<X className='h-6 w-6' />
								) : (
									<Menu className='h-6 w-6' />
								)}
							</button>
						</div>
					</div>
				</div>
			</div>

			{/* Mobile Menu */}
			<div
				className={`md:hidden transition-all duration-300 ${
					isMobileMenuOpen
						? 'max-h-screen opacity-100'
						: 'max-h-0 opacity-0 overflow-hidden'
				}`}
			>
				<div className='bg-white border-t border-gray-100 py-4'>
					<div className='px-4 space-y-3'>
						{/* Mobile Courses */}
						<div className='space-y-2'>
							<h3 className='text-sm font-semibold text-gray-900 px-3'>
								Курси
							</h3>
							{courses.map((course, index) => (
								<a
									key={index}
									href={`#course-${index}`}
									className='flex items-center px-3 py-2 text-gray-700 hover:bg-gray-50 rounded-md'
								>
									<div className={`${course.color} mr-3`}>{course.icon}</div>
									<div>
										<div className='font-medium text-sm'>{course.title}</div>
										<div className='text-xs text-gray-500'>{course.age}</div>
									</div>
								</a>
							))}
						</div>

						<div className='border-t border-gray-100 pt-3 space-y-1'>
							{navItems.map((item, index) => (
								<a
									key={index}
									href={item.href}
									className='block px-3 py-2 text-gray-700 hover:bg-gray-50 rounded-md text-sm font-medium'
								>
									{item.label}
								</a>
							))}
						</div>

						<div className='border-t border-gray-100 pt-3'>
							<div className='flex items-center justify-between px-3 py-2'>
								<div className='flex items-center text-gray-600'>
									<Phone className='w-4 h-4 mr-2' />
									<span className='text-sm'>+38 (067) 123-45-67</span>
								</div>
							</div>
							<button className='w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-lg text-sm font-medium mx-3 mt-2'>
								Безкоштовний урок
							</button>
						</div>
					</div>
				</div>
			</div>
		</header>
	)
}

export default Header
