'use client'
import React, { useState } from 'react'
import { ChevronDown, ChevronUp, X } from 'lucide-react'

const FAQ = () => {
	const [openItems, setOpenItems] = useState({})

	const faqItems = [
		{
			id: 1,
			question: 'Як проходить урок? Що для цього потрібно?',
			answer:
				"Уроки проходять онлайн через Zoom або офлайн в наших класах. Для онлайн навчання потрібен комп'ютер або ноутбук з стабільним інтернет-з'єднанням. Ми надаємо всі необхідні матеріали та доступ до навчальних платформ.",
		},
		{
			id: 2,
			question: 'Чи потрібен потужний ноут?',
			answer:
				"Ні, потужний ноутбук не обов'язковий для початку навчання. Достатньо звичайного комп'ютера або ноутбука з 4ГБ RAM та стабільним інтернетом. Для деяких просунутих курсів можуть знадобитися додаткові вимоги, про які ми повідомимо заздалегідь.",
		},
		{
			id: 3,
			question: 'Чи можна з планшету займатися?',
			answer: "Ні, краще і зручніше робити це з комп'ютеру або ноутбуку",
			isExpanded: true,
		},
		{
			id: 4,
			question: 'Заняття індивідуальне чи групове. Скільки дітей в групі?',
			answer:
				'Ми пропонуємо як індивідуальні, так і групові заняття. У групах зазвичай 4-8 учнів, що дозволяє викладачу приділити увагу кожному студенту. Індивідуальні заняття доступні за окремим тарифом.',
		},
		{
			id: 5,
			question: 'Що отримає після закінчення курсу?',
			answer:
				'Після успішного завершення курсу студенти отримують сертифікат про проходження навчання, портфоліо з реальними проектами, знання та навички програмування, а також допомогу в працевлаштуванні для старших студентів.',
		},
		{
			id: 6,
			question: 'Частота занять, формат навчання?',
			answer:
				'Заняття проходять 2 рази на тиждень по 1.5 години. Формат навчання включає теоретичну частину, практичні завдання та проектну роботу. Також доступні інтенсивні курси та індивідуальний графік.',
		},
	]

	const toggleItem = id => {
		setOpenItems(prev => ({
			...prev,
			[id]: !prev[id],
		}))
	}

	return (
		<div className='max-w-4xl mx-auto p-6 bg-gray-50 min-h-screen'>
			<h1 className='text-3xl font-bold text-gray-800 mb-6'>
				Відповіді / Запитання
			</h1>

			<div className='space-y-3'>
				{faqItems.map(item => {
					const isOpen = item.isExpanded || openItems[item.id]

					return (
						<div
							key={item.id}
							className={`bg-blue-100 rounded-lg transition-all duration-200 ${
								isOpen ? 'shadow-md' : 'shadow-sm'
							}`}
						>
							<button
								onClick={() => toggleItem(item.id)}
								className='w-full px-6 py-4 text-left flex justify-between items-center hover:bg-blue-150 transition-colors duration-150 rounded-lg'
							>
								<span className='text-gray-700 font-medium text-base pr-4'>
									{item.question}
								</span>
								<div className='flex-shrink-0'>
									{isOpen ? (
										item.isExpanded ? (
											<X className='w-5 h-5 text-gray-600' />
										) : (
											<ChevronUp className='w-5 h-5 text-gray-600' />
										)
									) : (
										<ChevronDown className='w-5 h-5 text-gray-600' />
									)}
								</div>
							</button>

							{isOpen && (
								<div className='px-6 pb-4'>
									<div className='pt-2 border-t border-blue-200'>
										<p className='text-gray-600 text-sm leading-relaxed'>
											{item.answer}
										</p>
									</div>
								</div>
							)}
						</div>
					)
				})}
			</div>
		</div>
	)
}

export default FAQ
