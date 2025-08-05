// src/components/Visit/EnhancedCourseCards.js
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
  Globe
} from 'lucide-react'

const EnhancedCourseCards = () => {
  const [hoveredCard, setHoveredCard] = useState(null)
  const [isVisible, setIsVisible] = useState(false)

  // Генеруємо зірки тільки для Python картки
  const pythonStars = useMemo(() => {
    const starTypes = [
      { type: 'starPurple', count: 20 },
      { type: 'starBlue', count: 15 },
      { type: 'starPink', count: 12 },
      { type: 'starGold', count: 8 },
      { type: 'starTwinkle', count: 18 }
    ];

    const allStars = [];

    starTypes.forEach(({ type, count }) => {
      for (let i = 0; i < count; i++) {
        allStars.push({
          id: `${type}-${i}`,
          type,
          left: Math.random() * 100,
          top: Math.random() * 100,
          animationDelay: Math.random() * (type === 'starTwinkle' ? 4 : type === 'starGold' ? 6 : type === 'starBlue' ? 8 : type === 'starPink' ? 15 : 12),
          animationDuration: type === 'starTwinkle' ? 2 + Math.random() * 4 : 
                             type === 'starGold' ? 4 + Math.random() * 4 : 
                             type === 'starBlue' ? 5 + Math.random() * 6 :
                             type === 'starPink' ? 10 + Math.random() * 10 :
                             8 + Math.random() * 8
        });
      }
    });

    return allStars;
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 300)
    return () => clearTimeout(timer)
  }, [])

  const courses = [
    {
      id: 'python',
      title: 'PYTHON',
      subtitle: 'Програмування майбутнього',
      icon: '🐍',
      description: 'Відкрий космос можливостей з найпопулярнішою мовою програмування світу. Створюй ІІ, веб-додатки та аналізуй дані.',
      gradient: 'from-purple-600 via-purple-500 to-purple-700',
      features: ['Основи Python', 'ООП та алгоритми', 'Django/Flask', 'Data Science'],
      stats: { 
        duration: '6 міс', 
        age: '10-16', 
        students: '324+',
        projects: '20+'
      },
      pricing: { price: '2800', discount: '25%', originalPrice: '3700' },
      badge: 'Космічний хіт',
      rating: 4.9,
      bgColor: 'bg-gradient-to-br from-purple-600 via-purple-500 to-indigo-600',
      isSpaceTheme: true // Спеціальний флаг для космічної теми
    },
    {
      id: 'gamedev',
      title: 'ГЕЙМДЕВ',
      subtitle: 'Створення власних ігор',
      icon: '🎮',
      description: 'Розробляй захоплюючі ігри від Unity до Scratch. Від простих 2D до складних 3D проектів.',
      gradient: 'from-emerald-600 via-green-500 to-teal-600',
      features: ['Unity 3D', 'Scratch', 'Персонажі', 'Геймплей'],
      stats: { 
        duration: '8 міс', 
        age: '8-17', 
        students: '189+',
        projects: '12+'
      },
      pricing: { price: '3200', discount: '15%', originalPrice: '3750' },
      badge: 'Тренд 2024',
      rating: 4.8,
      bgColor: 'bg-gradient-to-br from-emerald-600 via-green-500 to-teal-600'
    },
    {
      id: 'webdev',
      title: 'ВЕБ-РОЗРОБКА',
      subtitle: 'Сучасні сайти та додатки',
      icon: '💻',
      description: 'Створюй адаптивні сайти та веб-додатки з HTML, CSS, JavaScript та React.',
      gradient: 'from-blue-600 via-cyan-500 to-blue-600',
      features: ['HTML/CSS', 'JavaScript', 'React', 'Node.js'],
      stats: { 
        duration: '7 міс', 
        age: '12-18', 
        students: '156+',
        projects: '10+'
      },
      pricing: { price: '3000', discount: '25%', originalPrice: '4000' },
      badge: 'Новинка',
      rating: 4.9,
      bgColor: 'bg-gradient-to-br from-blue-600 via-cyan-500 to-blue-600'
    }
  ]

  return (
    <div className="w-full h-screen flex overflow-hidden">
      {courses.map((course, index) => (
        <div
          key={course.id}
          className={`
            flex-1 relative cursor-pointer overflow-hidden transition-all duration-700 ease-out
            ${course.bgColor}
            ${hoveredCard === index ? 'flex-[1.4] shadow-2xl z-10' : hoveredCard !== null ? 'flex-[0.8] brightness-75' : 'flex-1'}
            ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'}
          `}
          style={{ 
            transitionDelay: `${index * 100}ms`
          }}
          onMouseEnter={() => setHoveredCard(index)}
          onMouseLeave={() => setHoveredCard(null)}
        >
          {/* Background Effects */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.3),transparent)]"></div>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(255,255,255,0.2),transparent)]"></div>
          </div>

          {/* Animated Particles */}
          <div className="absolute inset-0 overflow-hidden">
            {course.id === 'python' && (
              <>
                {/* Космічний фон для Python */}
                <div className="absolute inset-0 bg-gradient-to-br from-purple-900/30 via-indigo-900/20 to-purple-800/30"></div>
                
                {/* Зоряне поле для Python */}
                <div className="absolute inset-0 pointer-events-none overflow-hidden">
                  {pythonStars.map((star) => (
                    <div
                      key={star.id}
                      className={`absolute rounded-full ${
                        star.type === 'starPurple' ? 'bg-purple-400 w-1 h-1' :
                        star.type === 'starBlue' ? 'bg-blue-400 w-0.5 h-0.5' :
                        star.type === 'starPink' ? 'bg-pink-400 w-1 h-1' :
                        star.type === 'starGold' ? 'bg-yellow-400 w-1.5 h-1.5' :
                        'bg-yellow-200 w-0.5 h-0.5'
                      } ${
                        star.type === 'starPurple' ? 'animate-starDrift' :
                        star.type === 'starBlue' ? 'animate-starFloat' :
                        star.type === 'starPink' ? 'animate-starOrbit' :
                        star.type === 'starGold' ? 'animate-starFloat' :
                        'animate-starTwinkle'
                      }`}
                      style={{
                        left: `${star.left}%`,
                        top: `${star.top}%`,
                        animationDelay: `${star.animationDelay}s`,
                        animationDuration: `${star.animationDuration}s`,
                        boxShadow: star.type === 'starGold' ? '0 0 8px rgba(251, 191, 36, 0.9)' :
                                  star.type === 'starPurple' ? '0 0 6px rgba(196, 132, 252, 0.8)' :
                                  star.type === 'starBlue' ? '0 0 4px rgba(96, 165, 250, 0.7)' :
                                  star.type === 'starPink' ? '0 0 5px rgba(244, 114, 182, 0.6)' :
                                  '0 0 3px rgba(254, 243, 199, 0.8)'
                      }}
                    />
                  ))}
                </div>

                {/* Космічні орби */}
                <div className="absolute inset-0 pointer-events-none overflow-hidden">
                  <div 
                    className="absolute w-32 h-32 bg-purple-500 rounded-full opacity-10 filter blur-3xl animate-cosmicFloat"
                    style={{ top: '10%', left: '5%' }}
                  ></div>
                  <div 
                    className="absolute w-24 h-24 bg-yellow-400 rounded-full opacity-8 filter blur-2xl animate-cosmicFloat"
                    style={{ bottom: '20%', right: '10%', animationDelay: '2s' }}
                  ></div>
                </div>

                {/* Додаткові космічні елементи при hover */}
                {hoveredCard === index && (
                  <>
                    <div className="absolute top-1/4 left-1/4 text-3xl animate-spin-slow">⭐</div>
                    <div className="absolute bottom-1/3 right-1/4 text-2xl animate-bounce delay-300">🚀</div>
                    <div className="absolute top-1/3 right-1/3 text-xl animate-pulse delay-500">🌌</div>
                    <div className="absolute bottom-1/4 left-1/3 text-lg animate-pulse delay-700">🛸</div>
                    <div className="absolute top-1/2 right-1/4 text-sm animate-bounce delay-1000 text-purple-200 font-bold">AI READY!</div>
                  </>
                )}
              </>
            )}
            
            {course.id === 'gamedev' && hoveredCard === index && (
              <>
                <div className="absolute top-1/4 left-1/4 text-2xl animate-bounce">🎯</div>
                <div className="absolute top-1/3 right-1/4 text-xl animate-pulse delay-200">💎</div>
                <div className="absolute bottom-1/3 left-1/3 text-2xl animate-spin-slow delay-500">⚡</div>
                <div className="absolute bottom-1/4 right-1/3 text-lg animate-bounce delay-700 text-yellow-300 font-bold">LEVEL UP!</div>
                <div className="absolute top-1/2 left-1/2 text-xl animate-pulse delay-300">🏆</div>
              </>
            )}
            
            {course.id === 'webdev' && hoveredCard === index && (
              <>
                <div className="absolute top-1/4 left-1/4 text-sm font-mono text-cyan-200 animate-pulse">&lt;div&gt;</div>
                <div className="absolute top-1/3 right-1/4 text-sm font-mono text-blue-200 animate-pulse delay-200">React</div>
                <div className="absolute bottom-1/3 left-1/3 text-sm font-mono text-green-200 animate-bounce">{'{}'}</div>
                <div className="absolute bottom-1/4 right-1/3 text-2xl animate-spin-slow">🌐</div>
                <div className="absolute top-1/2 left-1/2 text-lg animate-pulse delay-400">⚙️</div>
              </>
            )}
          </div>

          {/* Top Section - Badge and Rating */}
          <div className="absolute top-8 left-8 right-8 flex justify-between items-start z-20">
            {/* Rating */}
            <div className="flex items-center gap-1 bg-black/30 backdrop-blur-sm px-3 py-2 rounded-full">
              <Star className="w-4 h-4 text-yellow-400 fill-current" />
              <span className="text-white font-bold">{course.rating}</span>
            </div>
            
          {/* Badge */}
          <div className={`absolute top-8 right-8 z-10 ${
            course.isSpaceTheme ? 'animate-cosmicPulse' : ''
          }`}>
            <div className={`px-4 py-2 rounded-full font-bold text-sm shadow-lg animate-pulse ${
              course.isSpaceTheme 
                ? 'bg-gradient-to-r from-purple-400 to-pink-500 border border-purple-300/50' 
                : 'bg-gradient-to-r from-yellow-400 to-orange-500'
            } text-black`}>
              🔥 {course.badge}
            </div>
          </div>
          </div>

          {/* Center Icon */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20">
            <div className={`
              text-8xl md:text-9xl filter drop-shadow-2xl transition-all duration-500
              ${hoveredCard === index ? 'scale-125 animate-bounce' : 'scale-100'}
            `}>
              {course.icon}
            </div>
          </div>

          {/* Bottom Content */}
          <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black/95 via-black/60 to-transparent z-20">
            
            {/* Title */}
            <div className="mb-6">
              <h3 className={`text-4xl md:text-5xl font-black mb-2 tracking-tight ${
                course.isSpaceTheme && hoveredCard === index 
                  ? 'bg-gradient-to-r from-purple-300 via-pink-300 to-yellow-300 bg-clip-text text-transparent' 
                  : 'text-white'
              }`}>
                {course.title}
              </h3>
              <p className={`text-lg font-medium ${
                course.isSpaceTheme ? 'text-purple-200' : 'text-white/80'
              }`}>
                {course.subtitle}
              </p>
            </div>

            {/* Features - показуємо тільки при hover */}
            <div className={`
              transition-all duration-500 overflow-hidden mb-6
              ${hoveredCard === index ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'}
            `}>
              <p className={`text-sm leading-relaxed mb-4 ${
                course.isSpaceTheme 
                  ? 'text-purple-100' 
                  : 'text-white/90'
              }`}>
                {course.description}
              </p>
              
              <div className="grid grid-cols-2 gap-2 mb-4">
                {course.features.map((feature, i) => (
                  <div key={i} className={`flex items-center gap-2 text-sm ${
                    course.isSpaceTheme ? 'text-purple-100' : 'text-white/80'
                  }`}>
                    <CheckCircle className="w-3 h-3 text-green-400 flex-shrink-0" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-3 mb-4 text-xs">
                <div className={`flex items-center gap-2 ${
                  course.isSpaceTheme ? 'text-purple-200' : 'text-white/70'
                }`}>
                  <Clock className="w-3 h-3" />
                  <span>{course.stats.duration}</span>
                </div>
                <div className={`flex items-center gap-2 ${
                  course.isSpaceTheme ? 'text-purple-200' : 'text-white/70'
                }`}>
                  <Users className="w-3 h-3" />
                  <span>{course.stats.age} років</span>
                </div>
                <div className={`flex items-center gap-2 ${
                  course.isSpaceTheme ? 'text-purple-200' : 'text-white/70'
                }`}>
                  <Eye className="w-3 h-3" />
                  <span>{course.stats.students} {course.isSpaceTheme ? 'космонавтів' : 'учнів'}</span>
                </div>
                <div className={`flex items-center gap-2 ${
                  course.isSpaceTheme ? 'text-purple-200' : 'text-white/70'
                }`}>
                  <Target className="w-3 h-3" />
                  <span>{course.stats.projects} проектів</span>
                </div>
              </div>

              {/* Pricing */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full font-bold">
                    -{course.pricing.discount}
                  </span>
                  <div>
                    <div className="text-green-400 font-bold text-xl">
                      {course.pricing.price} грн/міс
                    </div>
                    <div className="text-white/50 line-through text-sm">
                      {course.pricing.originalPrice} грн
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <button className={`w-full py-4 px-6 backdrop-blur-sm border rounded-2xl font-bold text-white transition-all duration-300 flex items-center justify-center gap-3 group ${
                course.isSpaceTheme 
                  ? 'bg-purple-500/20 hover:bg-purple-400/30 border-purple-300/30 hover:border-purple-300/60 hover:shadow-lg hover:shadow-purple-500/30' 
                  : 'bg-white/20 hover:bg-white/30 border-white/30'
              }`}>
                <PlayCircle className="w-5 h-5" />
                <span>{course.isSpaceTheme ? 'Почати космічну подорож' : 'Почати навчання'}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
              </button>
            </div>
          </div>

          {/* Side Label */}
          <div className={`
            absolute left-0 top-1/2 transform -translate-y-1/2 -rotate-90 origin-left
            bg-black/50 backdrop-blur-sm px-6 py-3 rounded-r-lg
            transition-all duration-500 z-30
            ${hoveredCard === index ? 'translate-x-4 scale-110' : 'translate-x-0'}
          `}>
            <span className="text-white font-black text-lg tracking-widest">
              {course.title}
            </span>
          </div>

          {/* Hover Overlay */}
          <div className={`
            absolute inset-0 transition-opacity duration-500
            bg-gradient-to-t from-black/20 via-transparent to-white/10
            ${hoveredCard === index ? 'opacity-100' : 'opacity-0'}
          `}></div>
        </div>
      ))}

      {/* Custom Styles */}
      <style jsx>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        @keyframes starDrift {
          0% { 
            transform: translate(0, 0) rotate(0deg) scale(0.5);
            opacity: 0.4;
          }
          25% { 
            transform: translate(30px, -40px) rotate(90deg) scale(1.5);
            opacity: 1;
          }
          50% { 
            transform: translate(-20px, -80px) rotate(180deg) scale(2);
            opacity: 0.7;
          }
          75% { 
            transform: translate(-40px, -40px) rotate(270deg) scale(1.5);
            opacity: 1;
          }
          100% { 
            transform: translate(0, 0) rotate(360deg) scale(0.5);
            opacity: 0.4;
          }
        }

        @keyframes starFloat {
          0%, 100% { 
            transform: translateY(0px) scale(0.6);
            opacity: 0.5;
          }
          50% { 
            transform: translateY(-60px) scale(2);
            opacity: 1;
          }
        }

        @keyframes starTwinkle {
          0% { 
            transform: scale(0.3) rotate(0deg);
            opacity: 0.2;
          }
          25% { 
            transform: scale(2.5) rotate(90deg);
            opacity: 1;
          }
          50% { 
            transform: scale(1.5) rotate(180deg);
            opacity: 0.4;
          }
          75% { 
            transform: scale(3) rotate(270deg);
            opacity: 1;
          }
          100% { 
            transform: scale(0.3) rotate(360deg);
            opacity: 0.2;
          }
        }

        @keyframes starOrbit {
          0% { 
            transform: rotate(0deg) translateX(50px) rotate(0deg) scale(0.7);
          }
          50% { 
            transform: rotate(180deg) translateX(50px) rotate(-180deg) scale(1.8);
          }
          100% { 
            transform: rotate(360deg) translateX(50px) rotate(-360deg) scale(0.7);
          }
        }

        @keyframes cosmicFloat {
          0%, 100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-20px) rotate(2deg);
          }
        }

        @keyframes cosmicPulse {
          0%, 100% {
            opacity: 0.8;
            transform: scale(1);
          }
          50% {
            opacity: 1;
            transform: scale(1.05);
          }
        }
        
        .animate-spin-slow {
          animation: spin-slow 4s linear infinite;
        }

        .animate-starDrift {
          animation: starDrift 12s ease-in-out infinite;
        }

        .animate-starFloat {
          animation: starFloat 8s ease-in-out infinite;
        }

        .animate-starTwinkle {
          animation: starTwinkle 4s ease-in-out infinite;
        }

        .animate-starOrbit {
          animation: starOrbit 15s linear infinite;
        }

        .animate-cosmicFloat {
          animation: cosmicFloat 6s ease-in-out infinite;
        }

        .animate-cosmicPulse {
          animation: cosmicPulse 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  )
}

export default EnhancedCourseCards