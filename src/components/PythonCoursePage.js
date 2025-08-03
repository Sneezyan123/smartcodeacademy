// src/components/PythonCoursePage.jsx
"use client"
import React, { useState, useEffect } from 'react'
import { 
  Code, 
  Rocket, 
  Star, 
  Zap, 
  Brain, 
  Target, 
  Users, 
  Clock, 
  Award,
  Play,
  ChevronRight,
  Download,
  Cpu,
  Globe,
  Sparkles,
  ArrowLeft,
  Terminal,
  Database
} from 'lucide-react'
import Link from 'next/link'
import styles from './PythonCoursePage.module.css'

const PythonCoursePage = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [scrollY, setScrollY] = useState(0)
  const [activeModule, setActiveModule] = useState(0)
  const [isLoaded, setIsLoaded] = useState(false)
  const [visibleSections, setVisibleSections] = useState([])

  useEffect(() => {
    setIsLoaded(true)
    
    // Intersection Observer для анімацій при скролі
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleSections(prev => [...prev, entry.target.id])
          }
        })
      },
      { threshold: 0.1 }
    )

    // Спостерігаємо за секціями
    const sections = document.querySelectorAll('[data-scroll-section]')
    sections.forEach(section => observer.observe(section))

    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }
    
    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('scroll', handleScroll)
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('scroll', handleScroll)
      observer.disconnect()
    }
  }, [])

  const modules = [
    {
      id: 1,
      title: "Основи Python",
      duration: "4 тижні",
      topics: ["Змінні та типи даних", "Умови та цикли", "Функції", "Структури даних"],
      icon: <Cpu className="w-6 h-6" />,
      color: "from-blue-500 to-purple-600"
    },
    {
      id: 2,
      title: "ООП в Python",
      duration: "3 тижні", 
      topics: ["Класи та об'єкти", "Наслідування", "Поліморфізм", "Інкапсуляція"],
      icon: <Brain className="w-6 h-6" />,
      color: "from-purple-500 to-pink-600"
    },
    {
      id: 3,
      title: "Веб-розробка",
      duration: "5 тижнів",
      topics: ["Flask/Django", "REST API", "База даних", "Деплой проектів"],
      icon: <Globe className="w-6 h-6" />,
      color: "from-green-500 to-blue-600"
    },
    {
      id: 4,
      title: "Data Science",
      duration: "4 тижні",
      topics: ["NumPy/Pandas", "Matplotlib", "Машинне навчання", "Проекти"],
      icon: <Sparkles className="w-6 h-6" />,
      color: "from-yellow-500 to-orange-600"
    }
  ]

  const projects = [
    { 
      name: "Телеграм бот", 
      difficulty: "Новачок", 
      time: "2 тижні",
      description: "Створи розумного бота для автоматизації завдань",
      icon: <Terminal className="w-8 h-8" />
    },
    { 
      name: "Веб-додаток", 
      difficulty: "Середній", 
      time: "3 тижні",
      description: "Повноцінний веб-сайт з базою даних",
      icon: <Globe className="w-8 h-8" />
    },
    { 
      name: "Аналіз даних", 
      difficulty: "Просунутий", 
      time: "4 тижні",
      description: "Візуалізація та прогнозування трендів",
      icon: <Database className="w-8 h-8" />
    },
    { 
      name: "AI чат-бот", 
      difficulty: "Експерт", 
      time: "5 тижнів",
      description: "Штучний інтелект з машинним навчанням",
      icon: <Brain className="w-8 h-8" />
    }
  ]

  const features = [
    { 
      icon: <Users className="w-8 h-8" />, 
      title: "Групи до 8 учнів", 
      desc: "Персональний підхід",
      color: "from-blue-400 to-purple-600"
    },
    { 
      icon: <Clock className="w-8 h-8" />, 
      title: "Гнучкий графік", 
      desc: "Вечірні та вихідні",
      color: "from-purple-400 to-pink-600"
    },
    { 
      icon: <Award className="w-8 h-8" />, 
      title: "Сертифікат", 
      desc: "Міжнародного зразка",
      color: "from-green-400 to-blue-600"
    },
    { 
      icon: <Target className="w-8 h-8" />, 
      title: "100% практики", 
      desc: "Реальні проекти",
      color: "from-yellow-400 to-orange-600"
    }
  ]

  return (
    <div className={styles.container}>
      {/* Back Button */}
      <Link 
        href="/"
        className={styles.backButton}
      >
        <ArrowLeft className="w-5 h-5" />
        <span className="hidden sm:inline">Назад на головну</span>
      </Link>

      {/* Animated Background */}
      <div className={styles.animatedBackground}>
        <div className={styles.gradientBackground}></div>
        
        {/* Floating particles */}
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className={styles.floatingParticle}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${2 + Math.random() * 3}s`
            }}
          />
        ))}
        
        {/* Large floating orbs */}
        <div 
          className={styles.floatingOrb}
          style={{
            left: `${mousePosition.x * 0.05}px`,
            top: `${mousePosition.y * 0.05}px`,
            transform: `translate(-50%, -50%) scale(${1 + scrollY * 0.001})`
          }}
        />
        <div 
          className={styles.floatingOrbSecondary}
          style={{
            right: `${mousePosition.x * 0.03}px`,
            bottom: `${mousePosition.y * 0.03}px`,
            transform: `translate(50%, 50%) scale(${1 + scrollY * 0.0005})`
          }}
        />
      </div>

      {/* Main Content */}
      <div className={styles.mainContent}>
        {/* Hero Section */}
        <section className={styles.heroSection}>
          <div className={`${styles.heroContent} ${isLoaded ? styles.visible : ''}`}>
            {/* Python Logo Animation */}
            <div className={styles.logoContainer}>
              <div className={styles.logoWrapper}>
                <div className={styles.logoSpinner}></div>
                <div className={styles.logoInner}>
                  <Code className={styles.logoIcon} />
                </div>
              </div>
              <div className={styles.logoDecorTop}></div>
              <div className={styles.logoDecorBottom}></div>
            </div>

            <h1 className={styles.mainTitle}>
              PYTHON
            </h1>
            <h2 className={styles.subtitle}>
              Програмування майбутнього
            </h2>
            <p className={styles.description}>
              Відкрий космос можливостей з найпопулярнішою мовою програмування світу. 
              Створюй ІІ, веб-додатки, аналізуй дані та будуй майбутнє разом з нами.
            </p>

            {/* CTA Buttons */}
            <div className={styles.ctaButtons}>
              <button className={styles.primaryButton}>
                <div className={styles.buttonOverlay}></div>
                <span className={styles.buttonContent}>
                  <Rocket className="w-6 h-6" />
                  Почати навчання
                  <ChevronRight className={styles.buttonArrow} />
                </span>
              </button>
              
              <button className={styles.secondaryButton}>
                <span className={styles.buttonContent}>
                  <Play className="w-6 h-6" />
                  Дивитися демо
                </span>
              </button>
            </div>

            {/* Stats */}
            <div className={styles.stats}>
              {[
                { number: "1000+", label: "Випускників" },
                { number: "95%", label: "Працевлаштування" },
                { number: "24", label: "Тижні навчання" },
                { number: "50+", label: "Проектів" }
              ].map((stat, index) => (
                <div key={index} className={styles.statItem}>
                  <div className={styles.statNumber}>{stat.number}</div>
                  <div className={styles.statLabel}>{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Floating Code Snippets */}
          <div className={`${styles.floatingCode} ${styles.codeLeft}`}>
            <code className={styles.codeGreen}>
              print("Hello, Future!")
            </code>
          </div>
          <div className={`${styles.floatingCode} ${styles.codeRight}`}>
            <code className={styles.codeBlue}>
              import tensorflow as tf
            </code>
          </div>
        </section>

        {/* Course Modules */}
        <section className={styles.modulesSection} data-scroll-section id="modules">
          <div className={styles.sectionContainer}>
            <h2 className={`${styles.sectionTitle} ${
              visibleSections.includes('modules') ? styles.visible : ''
            }`}>
              Модулі курсу
            </h2>
            
            <div className={styles.modulesGrid}>
              {modules.map((module, index) => (
                <div 
                  key={module.id}
                  className={`${styles.moduleCard} ${
                    activeModule === index ? styles.active : ''
                  } ${
                    visibleSections.includes('modules') ? styles.visible : ''
                  }`}
                  style={{ 
                    transitionDelay: `${index * 100}ms`,
                    animationDelay: `${index * 100}ms`
                  }}
                  onMouseEnter={() => setActiveModule(index)}
                >
                  {/* Номер модуля */}
                  <div className={styles.moduleNumber}>
                    {index + 1}
                  </div>
                  
                  {/* Іконка з анімацією */}
                  <div className={`${styles.moduleIcon} ${styles[`color${index + 1}`]}`}>
                    {module.icon}
                  </div>
                  
                  <h3 className={styles.moduleTitle}>{module.title}</h3>
                  <p className={styles.moduleDuration}>{module.duration}</p>
                  
                  <ul className={styles.moduleTopics}>
                    {module.topics.map((topic, i) => (
                      <li key={i} className={styles.moduleTopic}>
                        <div className={styles.topicDot} style={{ animationDelay: `${i * 200}ms` }}></div>
                        {topic}
                      </li>
                    ))}
                  </ul>
                  
                  {/* Ефекти */}
                  <div className={styles.moduleOverlay}></div>
                  <div className={styles.moduleGlow}></div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Projects Showcase */}
        <section className={styles.projectsSection} data-scroll-section id="projects">
          <div className={styles.sectionContainer}>
            <h2 className={`${styles.sectionTitle} ${
              visibleSections.includes('projects') ? styles.visible : ''
            }`}>
              Твої майбутні проекти
            </h2>
            
            <div className={styles.projectsGrid}>
              {projects.map((project, index) => (
                <div 
                  key={index} 
                  className={`${styles.projectCard} ${
                    visibleSections.includes('projects') ? styles.visible : ''
                  }`}
                  style={{ transitionDelay: `${index * 150}ms` }}
                >
                  {/* Іконка проекта */}
                  <div className={styles.projectHeader}>
                    <div className={styles.projectIcon}>
                      <div className={styles.projectIconInner}>
                        {project.icon}
                      </div>
                    </div>
                    <span className={`${styles.difficultyBadge} ${styles[project.difficulty.toLowerCase()]}`}>
                      {project.difficulty}
                    </span>
                  </div>

                  <h3 className={styles.projectTitle}>{project.name}</h3>
                  <p className={styles.projectDescription}>{project.description}</p>
                  <div className={styles.projectFooter}>
                    <p className={styles.projectTime}>
                      <Clock className="w-4 h-4" />
                      {project.time}
                    </p>
                    <div className={styles.projectAction}>
                      <Star className={styles.projectStar} />
                      <span>Вибрати</span>
                    </div>
                  </div>
                  
                  {/* Анімований бордер */}
                  <div className={styles.projectShimmer}></div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features */}
        <section className={styles.featuresSection} data-scroll-section id="features">
          <div className={styles.sectionContainer}>
            <h2 className={`${styles.sectionTitle} ${
              visibleSections.includes('features') ? styles.visible : ''
            }`}>
              Чому обирають нас
            </h2>
            
            <div className={styles.featuresGrid}>
              {features.map((feature, index) => (
                <div 
                  key={index} 
                  className={`${styles.featureCard} ${
                    visibleSections.includes('features') ? styles.visible : ''
                  }`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <div className={`${styles.featureIcon} ${styles[`featureColor${index + 1}`]}`}>
                    <div className={styles.featureIconInner}>
                      {feature.icon}
                    </div>
                    {/* Анімований фон */}
                    <div className={styles.featureIconBg}></div>
                  </div>
                  <h3 className={styles.featureTitle}>{feature.title}</h3>
                  <p className={styles.featureDescription}>{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className={styles.ctaSection}>
          <div className={styles.ctaContainer}>
            <h2 className={styles.ctaTitle}>
              Готовий змінити майбутнє?
            </h2>
            <p className={styles.ctaDescription}>
              Приєднуйся до космічної подорожі у світ програмування вже сьогодні
            </p>
            
            <div className={styles.ctaButtons}>
              <button className={styles.primaryButton}>
                <div className={styles.buttonOverlay}></div>
                <span className={styles.buttonContent}>
                  <Zap className="w-6 h-6" />
                  Безкоштовний урок
                </span>
              </button>
              
              <button className={styles.secondaryButton}>
                <span className={styles.buttonContent}>
                  <Download className="w-6 h-6" />
                  Програма курсу
                </span>
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

export default PythonCoursePage