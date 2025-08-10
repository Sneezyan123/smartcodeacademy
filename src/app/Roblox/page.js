'use client'

import React, { useEffect, useMemo, useRef, useState } from 'react'
import Link from 'next/link'
import {
  Code,
  Monitor,
  Layers,
  Zap,
  Rocket,
  GraduationCap,
  Users,
  Clock,
  Wrench,
  Puzzle,
  Hammer,
  Cpu,
  Play,
  ChevronRight,
} from 'lucide-react'
import styles from './RobloxCoursePage.module.css'

const RobloxCoursePage = () => {
  const [isLoaded, setIsLoaded] = useState(false)
  const [visibleSections, setVisibleSections] = useState([])
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false)
  const [currentVideo, setCurrentVideo] = useState(null)
  const videoRef = useRef(null)
  const [fireworks, setFireworks] = useState([])

  const balloons = useMemo(() => {
    const count = 24
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      left: `${5 + Math.random() * 90}%`,
      size: `${26 + Math.random() * 30}px`,
      delay: `${Math.random() * 5}s`,
      dur: `${9 + Math.random() * 8}s`,
      sway: `${14 + Math.random() * 22}px`,
      swayDur: `${2.2 + Math.random() * 1.2}s`,
      color: ['blue', 'yellow', 'green', 'pink', 'purple'][i % 5],
    }))
  }, [])

  useEffect(() => {
    setIsLoaded(true)

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setVisibleSections(prev => (prev.includes(entry.target.id) ? prev : [...prev, entry.target.id]))
          }
        })
      },
      { threshold: 0.15 }
    )

    const sections = document.querySelectorAll('[data-scroll-section]')
    sections.forEach(section => observer.observe(section))
    return () => observer.disconnect()
  }, [])

  const openVideoModal = videoData => {
    setCurrentVideo(videoData)
    setIsVideoModalOpen(true)
    setTimeout(() => {
      if (videoRef.current) {
        videoRef.current.play().catch(() => {})
      }
    }, 200)
  }

  const closeVideoModal = () => {
    setIsVideoModalOpen(false)
    setCurrentVideo(null)
    if (videoRef.current) {
      videoRef.current.pause()
      videoRef.current.currentTime = 0
    }
  }

  useEffect(() => {
    const handleEscapeKey = e => {
      if (e.key === 'Escape') closeVideoModal()
    }
    if (isVideoModalOpen) {
      document.addEventListener('keydown', handleEscapeKey)
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.removeEventListener('keydown', handleEscapeKey)
      document.body.style.overflow = 'unset'
    }
  }, [isVideoModalOpen])

  // Fireworks spawner
  useEffect(() => {
    const palette = ['#ffafcc', '#ffd166', '#95d5b2', '#54b6ff', '#cdb4db']
    const spawn = () => {
      const id = Math.random().toString(36).slice(2)
      const fw = {
        id,
        left: `${10 + Math.random() * 80}%`,
        top: `${15 + Math.random() * 60}%`,
        coreColor: palette[Math.floor(Math.random() * palette.length)],
        dur: 1200 + Math.floor(Math.random() * 600),
        sparks: 12 + Math.floor(Math.random() * 8),
        sparkColors: Array.from({ length: 20 }, () =>
          palette[Math.floor(Math.random() * palette.length)]
        ),
      }
      setFireworks(prev => (prev.length > 10 ? [...prev.slice(1), fw] : [...prev, fw]))
      setTimeout(() => {
        setFireworks(prev => prev.filter(x => x.id !== id))
      }, fw.dur + 200)
    }
    const interval = setInterval(spawn, 1600)
    return () => clearInterval(interval)
  }, [])

  const modules = [
    {
      id: 1,
      title: 'Lua Основи',
      topics: ['Змінні', 'Функції', 'Таблиці', 'Події'],
      icon: <Code className='w-6 h-6' />,
      powerUp: '🧩',
    },
    {
      id: 2,
      title: 'Roblox Studio',
      topics: ['Explorer', 'Properties', 'Workspace', 'Toolbox'],
      icon: <Monitor className='w-6 h-6' />,
      powerUp: '🧰',
    },
    {
      id: 3,
      title: 'Parts & Models',
      topics: ['Куби та циліндри', 'Anchored', 'Collisions', 'Materials'],
      icon: <Layers className='w-6 h-6' />,
      powerUp: '🧱',
    },
    {
      id: 4,
      title: 'Scripting & Events',
      topics: ['Touched', 'Clicked', 'RemoteEvents', 'DataStore базово'],
      icon: <Zap className='w-6 h-6' />,
      powerUp: '⚙️',
    },
    {
      id: 5,
      title: 'UI & FX',
      topics: ['ScreenGui', 'TweenService', 'Particles', 'Billboards'],
      icon: <Cpu className='w-6 h-6' />,
      powerUp: '✨',
    },
    {
      id: 6,
      title: 'Фінальний проєкт',
      topics: ['Геймдизайн', 'Оптимізація', 'Публікація', 'Аналітика'],
      icon: <Rocket className='w-6 h-6' />,
      powerUp: '🚀',
    },
  ]

  const projects = [
    {
      name: 'Obby Course',
      difficulty: 'BEGINNER',
      time: '2 тижні',
      description: 'Динамічний паркур з перешкодами, пастками і чекпоінтами',
      icon: '🟥',
      points: 1200,
    },
    {
      name: 'Tycoon',
      difficulty: 'MIDDLE',
      time: '3 тижні',
      description: 'Економічна міні-гра з апгрейдами, кнопками і колекторами',
      icon: '🏦',
      points: 2800,
    },
    {
      name: 'Simulator',
      difficulty: 'SENIOR',
      time: '5 тижнів',
      description: 'Симулятор з прогресією, бустерами та збереженням даних',
      icon: '⚙️',
      points: 4200,
      video: { src: '/videos/roblox_simulator.mp4', title: 'SIMULATOR - ГЕЙМПЛЕЙ' },
    },
  ]

  const features = [
    {
      icon: <GraduationCap className='w-8 h-8' />,
      title: 'Сертифікат',
      desc: 'Офіційне підтвердження навичок',
      powerUp: '📜',
    },
    {
      icon: <Users className='w-8 h-8' />,
      title: 'Комʼюніті',
      desc: 'Команда однодумців та івенти',
      powerUp: '👥',
    },
    {
      icon: <Wrench className='w-8 h-8' />,
      title: 'Практика',
      desc: 'Реальні механіки та скрипти',
      powerUp: '🛠️',
    },
    {
      icon: <Hammer className='w-8 h-8' />,
      title: 'Портфоліо',
      desc: 'Проєкти, якими можна пишатись',
      powerUp: '🏆',
    },
  ]

  return (
    <div className={styles.container}>
      {/* Animated Background */}
      <div className={styles.sceneBackground}>
        <div className={styles.studGrid} />
        <div className={styles.wireGrid} />
        {/* Soft blobs */}
        <div className={styles.blobLayer}>
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className={`${styles.blob} ${styles[`b${i + 1}`]}`} />
          ))}
        </div>
        {/* Sun */}
        <div className={styles.sunLayer}>
          <div className={styles.sun} />
        </div>
        {/* Hills removed */}
        <div className={styles.cubeLayer}>
          {Array.from({ length: 16 }).map((_, i) => (
            <div key={i} className={styles.floatingCube} style={{ ['--i']: i }} />
          ))}
        </div>
        {/* Balloons */}
        <div className={styles.balloonLayer}>
          {balloons.map(b => (
            <div
              key={b.id}
              className={styles.balloon}
              style={{ left: b.left, animationDuration: b.dur, animationDelay: b.delay }}
            >
              <div
                className={`${styles.balloonInner} ${styles[`color${b.color.charAt(0).toUpperCase() + b.color.slice(1)}`]}`}
                style={{ ['--size']: b.size, ['--sway']: b.sway, ['--swayDur']: b.swayDur }}
              />
            </div>
          ))}
        </div>
        {/* Fireworks */}
        <div className={styles.fireworkLayer}>
          {fireworks.map(fw => (
            <div
              key={fw.id}
              className={styles.firework}
              style={{ left: fw.left, top: fw.top, ['--fw-core']: fw.coreColor, ['--fw-dur']: `${fw.dur}ms` }}
            >
              {Array.from({ length: fw.sparks }).map((_, i) => (
                <span
                  key={i}
                  className={styles.spark}
                  style={{
                    ['--angle']: `${(360 / fw.sparks) * i}deg`,
                    ['--fw-color']: fw.sparkColors[i % fw.sparkColors.length],
                    ['--fw-dur']: `${fw.dur}ms`,
                    ['--len']: `${30 + Math.floor(Math.random() * 60)}px`,
                  }}
                />
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className={styles.mainContent}>
        {/* Hero */}
        <section className={styles.heroSection}>
          <div className={`${styles.heroContent} ${isLoaded ? styles.visible : ''}`}>
            <div className={styles.hologram}>
              <div className={styles.holoScan} />
              <div className={styles.holoInner}>
                <div className={styles.titleBlock}>
                  <div className={styles.titleRow}>LUA & ROBLOX</div>
                  <div className={styles.titleRow}>РОЗРОБКА</div>
                </div>
                <div className={styles.ctaCaption}>РОЗПОЧНІМО СТВОРЮВАТИ</div>
                <div className={styles.ctaSub}>БЕЗКОШТОВНИЙ УРОК</div>
              </div>
              <div className={styles.holoNoise} />
            </div>

            <p className={styles.description}>
              Навчайся створювати ігри в Roblox Studio: від перших скриптів на Lua до
              повноцінних симуляторів, тайкун-ігор та паркурів. Багато практики і візуальних ефектів.
            </p>

            <div className={styles.ctaButtons}>
              <Link href='/#Contactform' className={styles.startButton} onClick={(e)=>{e.preventDefault(); window.dispatchEvent(new Event('openContactModal'))}} scroll={false}>
                <span className={styles.buttonPixel}>
                  <Play className='w-6 h-6' />
                  ПОЧАТИ КУРС
                  <ChevronRight className={styles.buttonArrow} />
                </span>
              </Link>
            </div>
          </div>
        </section>

        {/* Modules */}
        <section className={styles.modulesSection} id='modules' data-scroll-section>
          <div className={styles.sectionContainer}>
            <h2 className={`${styles.sectionTitle} ${visibleSections.includes('modules') ? styles.visible : ''}`}>
              <span className={styles.pixelText}>МОДУЛІ КУРСУ</span>
            </h2>

            <div className={styles.modulesGrid}>
              {modules.map((module, index) => (
                <div
                  key={module.id}
                  className={`${styles.moduleCard} ${visibleSections.includes('modules') ? styles.visible : ''}`}
                  style={{ animationDelay: `${index * 120}ms` }}
                >
                  <div className={styles.levelBadge}>МОДУЛЬ {index + 1}</div>
                  <div className={styles.moduleIcon}>{module.icon}</div>
                  <h3 className={styles.moduleTitle}>{module.title}</h3>
                  <div className={styles.moduleTopics}>
                    {module.topics.map((topic, i) => (
                      <div key={i} className={styles.topicItem}>
                        <span className={styles.topicDot}>•</span>
                        {topic}
                      </div>
                    ))}
                  </div>
                  <div className={styles.moduleGlow} />
                  <div className={styles.pixelBorder} />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Projects */}
        <section className={styles.projectsSection} id='projects' data-scroll-section>
          <div className={styles.sectionContainer}>
            <h2 className={`${styles.sectionTitle} ${visibleSections.includes('projects') ? styles.visible : ''}`}>
              <span className={styles.pixelText}>ПРАКТИЧНІ ПРОЄКТИ</span>
            </h2>

            <div className={styles.projectsGrid}>
              {projects.map((project, index) => (
                <div
                  key={index}
                  className={`${styles.projectCard} ${visibleSections.includes('projects') ? styles.visible : ''}`}
                  style={{ animationDelay: `${index * 150}ms` }}
                >
                  <div className={styles.projectHeader}>
                    <div className={styles.projectIcon}>{project.icon}</div>
                    <div className={styles.projectPoints}>+{project.points} XP</div>
                  </div>
                  <h3 className={styles.projectTitle}>{project.name}</h3>
                  <div className={styles.difficultyBar}>
                    <span className={styles.difficultyLabel}>{project.difficulty}</span>
                    <div className={styles.difficultyProgress}>
                      <div className={styles.difficultyFill} style={{ width: `${(index + 1) * 25}%` }} />
                    </div>
                  </div>
                  <p className={styles.projectDescription}>{project.description}</p>
                  <div className={styles.projectFooter}>
                    <div className={styles.projectTime}>
                      <Clock className='w-4 h-4' />
                      {project.time}
                    </div>
                  </div>
                  <div className={styles.projectGlow} />
                  <div className={styles.pixelCorners}>
                    <div className={styles.corner} />
                    <div className={styles.corner} />
                    <div className={styles.corner} />
                    <div className={styles.corner} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features */}
        <section className={styles.featuresSection} id='features' data-scroll-section>
          <div className={styles.sectionContainer}>
            <h2 className={`${styles.sectionTitle} ${visibleSections.includes('features') ? styles.visible : ''}`}>
              <span className={styles.pixelText}>ПЕРЕВАГИ КУРСУ</span>
            </h2>

            <div className={styles.featuresGrid}>
              {features.map((feature, index) => (
                <div
                  key={index}
                  className={`${styles.featureCard} ${visibleSections.includes('features') ? styles.visible : ''}`}
                  style={{ animationDelay: `${index * 120}ms` }}
                >
                  <div className={styles.featurePowerUp}>{feature.powerUp}</div>
                  <div className={styles.featureIcon}>{feature.icon}</div>
                  <h3 className={styles.featureTitle}>{feature.title}</h3>
                  <p className={styles.featureDescription}>{feature.desc}</p>
                  <div className={styles.featureGlow} />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className={styles.ctaSection}>
          <div className={styles.ctaContainer}>
            <div className={styles.gameOverScreen}>
              <h2 className={styles.gameOverTitle}>ГОТОВИЙ ПОЧАТИ?</h2>
              <p className={styles.continueText}>ЗАПИСАТИСЯ НА КУРС</p>
              <div className={styles.countdown}>🎈</div>
              <div className={styles.ctaButtons}>
                <Link href='/#Contactform' className={styles.continueButton} onClick={(e)=>{e.preventDefault(); window.dispatchEvent(new Event('openContactModal'))}} scroll={false}>
                  <span className={styles.buttonPixel}>
                    <Rocket className='w-6 h-6' />
                    ЗАПИСАТИСЯ
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Video Modal */}
      {isVideoModalOpen && currentVideo && (
        <div className={styles.videoModal} onClick={closeVideoModal}>
          <div className={styles.videoModalContent} onClick={e => e.stopPropagation()}>
            <div className={styles.videoHeader}>
              <h3 className={styles.videoTitle}>{currentVideo.title}</h3>
              <button className={styles.closeButton} onClick={closeVideoModal} aria-label='Close video' type='button'>
                ✕
              </button>
            </div>
            <div className={styles.videoContainer}>
              <video ref={videoRef} className={styles.gameplayVideo} controls muted playsInline preload='metadata'>
                <source src={currentVideo.src} type='video/mp4' />
                Ваш браузер не підтримує відео.
              </video>
            </div>
            <div className={styles.videoFooter}>
              <p className={styles.videoDescription}>🎮 Живі ефекти, скрипти і геймплей</p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default RobloxCoursePage


