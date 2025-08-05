'use client'
import React, { useState, useEffect, useMemo } from 'react'
import {
	Code,
	Gamepad2,
	Monitor,
	Star,
	Users,
	Clock,
	Award,
	PlayCircle,
	ArrowRight,
	Sparkles,
	Rocket,
	Target,
	CheckCircle,
	Eye,
	Calendar,
	TrendingUp,
	Heart,
	Globe,
} from 'lucide-react'

const EnhancedCourseCards = () => {
	const [hoveredCard, setHoveredCard] = useState(null)
	const [isVisible, setIsVisible] = useState(false)

	// Генеруємо зірки для космічної теми.
	// useMemo гарантує, що це відбудеться лише один раз.
	const pythonStars = useMemo(() => {
		const starTypes = [
			{ type: 'starPurple', count: 20 },
			{ type: 'starBlue', count: 15 },
			{ type: 'starPink', count: 12 },
			{ type: 'starGold', count: 8 },
			{ type: 'starTwinkle', count: 18 },
		]

		return starTypes.flatMap(({ type, count }) =>
			Array.from({ length: count }, (_, i) => ({
				id: `${type}-${i}`,
				type,
				left: Math.random() * 100,
				top: Math.random() * 100,
				animationDelay:
					Math.random() *
					(type === 'starTwinkle'
						? 4
						: type === 'starGold'
						? 6
						: type === 'starBlue'
						? 8
						: type === 'starPink'
						? 15
						: 12),
				animationDuration:
					type === 'starTwinkle'
						? 2 + Math.random() * 4
						: type === 'starGold'
						? 4 + Math.random() * 4
						: type === 'starBlue'
						? 5 + Math.random() * 6
						: type === 'starPink'
						? 10 + Math.random() * 10
						: 8 + Math.random() * 8,
			}))
		)
	}, [])

	useEffect(() => {
		const timer = setTimeout(() => setIsVisible(true), 100)
		return () => clearTimeout(timer)
	}, [])

	const courses = [
		{
			id: 'python',
			title: 'PYTHON',
			subtitle: 'Програмування майбутнього',
			icon: '🐍',
			description:
				'Відкрий космос можливостей з найпопулярнішою мовою програмування світу. Створюй ШІ, веб-додатки та аналізуй дані.',
			features: [
				'Основи Python',
				'ООП та алгоритми',
				'Django/Flask',
				'Data Science',
			],
			stats: {
				duration: '6 міс',
				age: '10-16',
				students: '324+',
				projects: '20+',
			},
			pricing: { price: '2800', discount: '25%', originalPrice: '3700' },
			badge: 'Космічний хіт',
			rating: 4.9,
			gradient: 'from-purple-600 via-purple-500 to-indigo-600',
			isSpaceTheme: true, // Спеціальний флаг для космічної теми
		},
		{
			id: 'gamedev',
			title: 'ГЕЙМДЕВ',
			subtitle: 'Створення власних ігор',
			icon: '🎮',
			description:
				'Розробляй захоплюючі ігри від Unity до Scratch. Від простих 2D до складних 3D проектів.',
			features: ['Unity 3D', 'Scratch', 'Дизайн персонажів', 'Логіка геймплею'],
			stats: {
				duration: '8 міс',
				age: '8-17',
				students: '189+',
				projects: '12+',
			},
			pricing: { price: '3200', discount: '15%', originalPrice: '3750' },
			badge: 'Тренд 2024',
			rating: 4.8,
			gradient: 'from-emerald-600 via-green-500 to-teal-600',
		},
		{
			id: 'webdev',
			title: 'ВЕБ-РОЗРОБКА',
			subtitle: 'Сучасні сайти та додатки',
			icon: '💻',
			description:
				'Створюй адаптивні сайти та веб-додатки з HTML, CSS, JavaScript та React, що вражають своєю швидкістю та дизайном.',
			features: ['HTML/CSS', 'JavaScript', 'React', 'Node.js'],
			stats: {
				duration: '7 міс',
				age: '12-18',
				students: '156+',
				projects: '10+',
			},
			pricing: { price: '3000', discount: '25%', originalPrice: '4000' },
			badge: 'Новинка',
			rating: 4.9,
			gradient: 'from-blue-600 via-cyan-500 to-blue-700',
		},
	]

	return (
		<div className='w-full h-screen flex overflow-hidden bg-[#f8fafc]'>
			{courses.map((course, index) => (
				<div
					key={course.id}
					className={`
                        flex-1 relative cursor-pointer overflow-hidden transition-all duration-700 ease-in-out
                        ${
													hoveredCard === index
														? 'flex-[1.6] shadow-2xl z-10'
														: hoveredCard !== null
														? 'flex-[0.7] brightness-90'
														: 'flex-1'
												}
                        ${
													isVisible
														? 'translate-y-0 opacity-100'
														: 'translate-y-full opacity-0'
												}
                    `}
					style={{
						transitionDelay: `${index * 100}ms`,
					}}
					onMouseEnter={() => setHoveredCard(index)}
					onMouseLeave={() => setHoveredCard(null)}
				>
					{/* --- ФОН --- */}
					<div
						className={`absolute inset-0 transition-all duration-700 ${course.gradient}`}
					></div>

					{/* --- ЕФЕКТИ --- */}
					<div className='absolute inset-0 opacity-20'>
						<div className='absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.3),transparent)]'></div>
						<div className='absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(255,255,255,0.2),transparent)]'></div>
					</div>

					{/* --- АНІМОВАНІ ЧАСТИНКИ (для кожної картки) --- */}
					{course.isSpaceTheme && (
						<div className='absolute inset-0 overflow-hidden'>
							{pythonStars.map(star => (
								<div
									key={star.id}
									className={`absolute rounded-full ${star.type}`}
									style={{
										left: `${star.left}%`,
										top: `${star.top}%`,
										animationDelay: `${star.animationDelay}s`,
										animationDuration: `${star.animationDuration}s`,
									}}
								/>
							))}
							<div
								className='absolute w-32 h-32 bg-purple-500 rounded-full opacity-10 filter blur-3xl animate-cosmicFloat'
								style={{ top: '10%', left: '5%' }}
							></div>
							<div
								className='absolute w-24 h-24 bg-yellow-400 rounded-full opacity-8 filter blur-2xl animate-cosmicFloat'
								style={{ bottom: '20%', right: '10%', animationDelay: '2s' }}
							></div>
						</div>
					)}

					{/* --- ІНТЕРАКТИВНІ ЕЛЕМЕНТИ ПРИ НАВЕДЕННІ --- */}
					<div
						className={`absolute inset-0 transition-opacity duration-500 pointer-events-none ${
							hoveredCard === index ? 'opacity-100' : 'opacity-0'
						}`}
					>
						{course.id === 'python' && (
							<>
								<div className='absolute top-1/4 left-1/4 text-3xl animate-spin-slow text-yellow-300 drop-shadow-lg'>
									⭐
								</div>
								<div className='absolute bottom-1/3 right-1/4 text-2xl animate-bounce delay-300 drop-shadow-lg'>
									🚀
								</div>
								<div className='absolute top-1/3 right-1/3 text-xl animate-pulse delay-500 text-purple-200 drop-shadow-lg'>
									🌌
								</div>
							</>
						)}
						{course.id === 'gamedev' && (
							<>
								<div className='absolute top-1/4 left-1/4 text-2xl animate-bounce text-red-500 drop-shadow-lg'>
									🎯
								</div>
								<div className='absolute top-1/3 right-1/4 text-xl animate-pulse delay-200 text-yellow-400 drop-shadow-lg'>
									💎
								</div>
								<div className='absolute bottom-1/4 right-1/3 text-2xl animate-spin-slow text-blue-400 drop-shadow-lg'>
									⚡
								</div>
							</>
						)}
						{course.id === 'webdev' && (
							<>
								<div className='absolute top-1/4 left-1/4 text-sm font-mono text-cyan-200 animate-pulse bg-black/20 p-1 rounded'>
									&lt;div&gt;
								</div>
								<div className='absolute bottom-1/3 left-1/3 text-sm font-mono text-green-200 animate-bounce bg-black/20 p-1 rounded'>
									{'{}'}
								</div>
								<div className='absolute top-1/2 left-1/2 text-lg animate-pulse delay-400'>
									⚙️
								</div>
							</>
						)}
					</div>

					{/* --- ВЕРХНЯ ЧАСТИНА (БЕЙДЖ, РЕЙТИНГ) --- */}
					<div className='absolute top-8 left-8 right-8 flex justify-between items-start z-20'>
						<div className='flex items-center gap-1 bg-black/30 backdrop-blur-sm px-3 py-1.5 rounded-full border border-white/20'>
							<Star className='w-4 h-4 text-yellow-400 fill-current' />
							<span className='text-white font-bold text-sm'>
								{course.rating}
							</span>
						</div>
						<div
							className={`px-4 py-1.5 rounded-full font-bold text-xs shadow-lg animate-pulse border ${
								course.isSpaceTheme
									? 'bg-gradient-to-r from-purple-400 to-pink-500 text-white border-purple-300/50'
									: 'bg-gradient-to-r from-yellow-300 to-orange-400 text-slate-800 border-yellow-400/50'
							}`}
						>
							🔥 {course.badge}
						</div>
					</div>

					{/* --- ЦЕНТРАЛЬНА ІКОНКА --- */}
					<div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20'>
						<div
							className={`text-8xl md:text-9xl filter drop-shadow-2xl transition-all duration-500 ${
								hoveredCard === index
									? 'scale-125 animate-icon-pop'
									: 'scale-100'
							}`}
						>
							{course.icon}
						</div>
					</div>

					{/* --- НИЖНІЙ КОНТЕНТ --- */}
					<div className='absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black/95 via-black/70 to-transparent z-20'>
						<div className='mb-6'>
							<h3
								className={`text-4xl md:text-5xl font-black mb-2 tracking-tight transition-colors duration-500 ${
									course.isSpaceTheme && hoveredCard === index
										? 'cosmic-text'
										: 'text-white'
								}`}
							>
								{course.title}
							</h3>
							<p
								className={`text-lg font-medium transition-colors duration-500 ${
									course.isSpaceTheme ? 'text-purple-200' : 'text-white/80'
								}`}
							>
								{course.subtitle}
							</p>
						</div>

						{/* --- ДЕТАЛІ (з'являються при наведенні) --- */}
						<div
							className={`transition-all duration-500 ease-out overflow-hidden ${
								hoveredCard === index
									? 'max-h-96 opacity-100'
									: 'max-h-0 opacity-0'
							}`}
						>
							<p
								className={`text-sm leading-relaxed mb-4 ${
									course.isSpaceTheme ? 'text-purple-100' : 'text-white/90'
								}`}
							>
								{course.description}
							</p>
							<div className='grid grid-cols-2 gap-x-4 gap-y-2 mb-4'>
								{course.features.map((feature, i) => (
									<div
										key={i}
										className={`flex items-center gap-2 text-sm ${
											course.isSpaceTheme ? 'text-purple-100' : 'text-white/80'
										}`}
									>
										<CheckCircle className='w-4 h-4 text-green-400 flex-shrink-0' />
										<span>{feature}</span>
									</div>
								))}
							</div>
							<div className='grid grid-cols-2 gap-3 mb-4 text-xs border-t border-white/10 pt-4'>
								<div
									className={`flex items-center gap-2 ${
										course.isSpaceTheme ? 'text-purple-200' : 'text-white/70'
									}`}
								>
									<Clock className='w-4 h-4' />
									<span>{course.stats.duration}</span>
								</div>
								<div
									className={`flex items-center gap-2 ${
										course.isSpaceTheme ? 'text-purple-200' : 'text-white/70'
									}`}
								>
									<Users className='w-4 h-4' />
									<span>{course.stats.age} років</span>
								</div>
								<div
									className={`flex items-center gap-2 ${
										course.isSpaceTheme ? 'text-purple-200' : 'text-white/70'
									}`}
								>
									<Eye className='w-4 h-4' />
									<span>
										{course.stats.students}{' '}
										{course.isSpaceTheme ? 'космонавтів' : 'учнів'}
									</span>
								</div>
								<div
									className={`flex items-center gap-2 ${
										course.isSpaceTheme ? 'text-purple-200' : 'text-white/70'
									}`}
								>
									<Target className='w-4 h-4' />
									<span>{course.stats.projects} проектів</span>
								</div>
							</div>
							<div className='flex items-center justify-between mb-4'>
								<div className='flex items-center gap-2'>
									<span className='bg-red-500 text-white text-xs px-2 py-1 rounded-full font-bold'>
										-{course.pricing.discount}
									</span>
									<div>
										<div className='text-green-400 font-bold text-xl'>
											{course.pricing.price} грн/міс
										</div>
										<div className='text-white/50 line-through text-sm'>
											{course.pricing.originalPrice} грн
										</div>
									</div>
								</div>
							</div>
							<button
								className={`w-full py-4 px-6 backdrop-blur-sm border rounded-2xl font-bold text-white transition-all duration-300 flex items-center justify-center gap-3 group ${
									course.isSpaceTheme
										? 'bg-purple-500/20 hover:bg-purple-400/30 border-purple-300/30 hover:border-purple-300/60 hover:shadow-lg hover:shadow-purple-500/30'
										: 'bg-white/20 hover:bg-white/30 border-white/30'
								}`}
							>
								<PlayCircle className='w-5 h-5' />
								<span>
									{course.isSpaceTheme
										? 'Почати космічну подорож'
										: 'Почати навчання'}
								</span>
								<ArrowRight className='w-4 h-4 group-hover:translate-x-1 transition-transform duration-300' />
							</button>
						</div>
					</div>

					{/* --- БІЧНА НАЗВА --- */}
					<div
						className={`absolute left-0 top-1/2 transform -translate-y-1/2 -rotate-90 origin-top-left bg-black/50 backdrop-blur-sm px-6 py-3 rounded-r-lg transition-all duration-500 z-30 ${
							hoveredCard === index
								? 'translate-x-6 scale-110'
								: 'translate-x-4'
						}`}
					>
						<span className='text-white font-black text-lg tracking-widest uppercase'>
							{course.title}
						</span>
					</div>
				</div>
			))}

			{/* --- СТИЛІ ДЛЯ АНІМАЦІЙ --- */}
			<style jsx>{`
				.cosmic-text {
					background-image: linear-gradient(135deg, #c084fc, #fbcfe8, #fef08a);
					-webkit-background-clip: text;
					-webkit-text-fill-color: transparent;
					animation: cosmic-text-anim 5s ease-in-out infinite;
				}
				@keyframes cosmic-text-anim {
					0%,
					100% {
						background-position: 0% 50%;
					}
					50% {
						background-position: 100% 50%;
					}
				}
				@keyframes animate-icon-pop {
					0%,
					100% {
						transform: scale(1);
					}
					50% {
						transform: scale(1.25);
					}
				}
				.animate-icon-pop {
					animation: animate-icon-pop 0.5s ease-in-out;
				}

				/* Анімації для зірок */
				@keyframes spin-slow {
					from {
						transform: rotate(0deg);
					}
					to {
						transform: rotate(360deg);
					}
				}
				.animate-spin-slow {
					animation: spin-slow 8s linear infinite;
				}

				.starPurple {
					background: #c084fc;
					width: 2px;
					height: 2px;
					animation: starDrift 12s ease-in-out infinite;
					box-shadow: 0 0 6px #c084fc;
				}
				.starBlue {
					background: #93c5fd;
					width: 1.5px;
					height: 1.5px;
					animation: starFloat 8s ease-in-out infinite;
					box-shadow: 0 0 4px #93c5fd;
				}
				.starPink {
					background: #f9a8d4;
					width: 2px;
					height: 2px;
					animation: starOrbit 15s linear infinite;
					box-shadow: 0 0 5px #f9a8d4;
				}
				.starGold {
					background: #fcd34d;
					width: 2.5px;
					height: 2.5px;
					animation: starFloat 6s ease-in-out infinite;
					box-shadow: 0 0 8px #fcd34d;
				}
				.starTwinkle {
					background: #fef08a;
					width: 1.5px;
					height: 1.5px;
					animation: starTwinkle 4s ease-in-out infinite;
					box-shadow: 0 0 3px #fef08a;
				}

				@keyframes starDrift {
					0% {
						transform: translate(0, 0) scale(0.5);
						opacity: 0.4;
					}
					50% {
						transform: translate(40px, -60px) scale(1.2);
						opacity: 1;
					}
					100% {
						transform: translate(0, 0) scale(0.5);
						opacity: 0.4;
					}
				}
				@keyframes starFloat {
					0%,
					100% {
						transform: translateY(0px) scale(0.8);
						opacity: 0.5;
					}
					50% {
						transform: translateY(-40px) scale(1.5);
						opacity: 1;
					}
				}
				@keyframes starTwinkle {
					0%,
					100% {
						transform: scale(0.5);
						opacity: 0.3;
					}
					50% {
						transform: scale(2);
						opacity: 1;
					}
				}
				@keyframes starOrbit {
					from {
						transform: rotate(0deg) translateX(40px) rotate(0deg);
					}
					to {
						transform: rotate(360deg) translateX(40px) rotate(-360deg);
					}
				}
				@keyframes cosmicFloat {
					0%,
					100% {
						transform: translateY(0px);
					}
					50% {
						transform: translateY(-20px);
					}
				}
			`}</style>
		</div>
	)
}

export default EnhancedCourseCards
