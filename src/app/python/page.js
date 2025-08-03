// src/app/courses/python/page.jsx
import PythonCoursePage from '@/components/PythonCourseComponents/PythonCoursePage'

export const metadata = {
  title: 'Python Programming Course - SmartCode Academy',
  description: 'Вивчай Python програмування з нуля до професійного рівня. Створюй веб-додатки, аналізуй дані, розробляй ІІ. Курс для дітей 10-17 років.',
  keywords: [
    'Python курс',
    'програмування для дітей',
    'Python навчання',
    'веб-розробка Python',
    'Data Science для дітей',
    'машинне навчання',
    'SmartCode Academy',
    'IT освіта',
    'курси програмування',
    'Python для підлітків'
  ].join(', '),
  authors: [{ name: 'SmartCode Academy' }],
  creator: 'SmartCode Academy',
  publisher: 'SmartCode Academy',
  robots: 'index, follow',
  openGraph: {
    title: 'Python Programming Course - SmartCode Academy',
    description: 'Відкрий космос можливостей з Python! Навчання від основ до професійного рівня.',
    url: 'https://smartcode-academy.com/courses/python',
    siteName: 'SmartCode Academy',
    images: [
      {
        url: '/courses/python-og.jpg',
        width: 1200,
        height: 630,
        alt: 'Python Programming Course - SmartCode Academy',
      },
    ],
    locale: 'uk_UA',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Python Programming Course - SmartCode Academy',
    description: 'Відкрий космос можливостей з Python! Навчання від основ до професійного рівня.',
    images: ['/courses/python-og.jpg'],
  },
  alternates: {
    canonical: 'https://smartcode-academy.com/courses/python',
  },
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#8b5cf6' },
    { media: '(prefers-color-scheme: dark)', color: '#7c3aed' },
  ],
}

export default function PythonCourse() {
  return (
    <>
      {/* Structured Data для SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Course',
            name: 'Python Programming Course',
            description: 'Повний курс програмування на Python для дітей та підлітків',
            provider: {
              '@type': 'EducationalOrganization',
              name: 'SmartCode Academy',
              url: 'https://smartcode-academy.com'
            },
            courseCode: 'PY-001',
            educationalLevel: 'Beginner to Advanced',
            timeRequired: 'P24W',
            inLanguage: 'uk',
            offers: {
              '@type': 'Offer',
              category: 'Programming Course',
              availability: 'https://schema.org/InStock'
            },
            syllabusSections: [
              {
                '@type': 'Syllabus',
                name: 'Основи Python',
                description: 'Змінні, типи даних, умови, цикли, функції'
              },
              {
                '@type': 'Syllabus', 
                name: 'ООП в Python',
                description: 'Класи, об\'єкти, наслідування, поліморфізм'
              },
              {
                '@type': 'Syllabus',
                name: 'Веб-розробка',
                description: 'Flask/Django, REST API, бази даних'
              },
              {
                '@type': 'Syllabus',
                name: 'Data Science',
                description: 'NumPy, Pandas, машинне навчання'
              }
            ]
          }),
        }}
      />
      
      <PythonCoursePage />
    </>
  )
}