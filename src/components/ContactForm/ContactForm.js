"use client"
import React, { useState, useRef, useEffect } from 'react'
import { Phone, Mail, MapPin, Clock, Send, CheckCircle, Star, Users, Award, User, Hash, Briefcase, MessageSquare } from 'lucide-react'
import styles from './ContactForm.module.css'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)

const ContactForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        email: '',
        age: '',
        course: '',
        message: ''
    })
    const [isSubmitted, setIsSubmitted] = useState(false)
    const formRef = useRef(null);

    // GSAP анімація появи з активованим ScrollTrigger
    useEffect(() => {
        const formElement = formRef.current
        if (!formElement) return
        const ctx = gsap.context(() => {
            gsap.fromTo(
                formElement,
                { opacity: 0, y: 50 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 1,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: formElement,
                        start: 'top 85%'
                    }
                }
            )
        })
        return () => ctx.revert()
    }, [])

    const courses = [
        'Python для початківців',
        'JavaScript та веб-розробка',
        'Розробка ігор (Unity/Roblox)',
        'Frontend розробка (React)',
        'Мобільна розробка',
        'Не впевнений(а), потрібна консультація'
    ];

    const benefits = [
        { icon: <CheckCircle />, title: 'Безкоштовний пробний урок', description: 'Спробуйте наш підхід до навчання без зобов\'язань' },
        { icon: <Users />, title: 'Персональний підхід', description: 'Індивідуальна програма для кожного студента' },
        { icon: <Award />, title: 'Досвідчені ментори', description: 'Навчання від практикуючих розробників' },
        { icon: <Star />, title: 'Гарантія результату', description: '95% студентів успішно завершують навчання' }
    ];

    const handleInputChange = e => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = e => {
        e.preventDefault();
        console.log('Form submitted:', formData);
        setIsSubmitted(true);
        setTimeout(() => {
            setIsSubmitted(false);
            setFormData({ name: '', phone: '', email: '', age: '', course: '', message: '' });
        }, 4000);
    };

    return (
        <section id='Contactform' className={styles.contactSection} ref={formRef}>
            <div className={styles.backgroundElements}>
                <div className={`${styles.floatingElement} ${styles.element1}`}></div>
                <div className={`${styles.floatingElement} ${styles.element2}`}></div>
                <div className={`${styles.floatingElement} ${styles.element3}`}></div>
                <div className={`${styles.floatingElement} ${styles.element4}`}></div>
            </div>
            <div className={styles.container}>
                <div className={styles.contactCard}>
                    {/* Ліва секція з інформацією */}
                    <div className={styles.leftSection}>
                        <div className={styles.content}>
                            <div className={styles.badge}>
                                <Send size={16} />
                                Зв&apos;яжіться з нами
                            </div>
                            <h2 className={styles.title}>
                                Почніть навчання
                                <span className={styles.titleAccent}>вже сьогодні</span>
                            </h2>
                            <p className={styles.subtitle}>
                                Заповніть форму і отримайте персональну консультацію. Ми допоможемо обрати ідеальний курс для вашої дитини.
                            </p>
                            <div className={styles.benefitsList}>
                                {benefits.map((benefit, index) => (
                                    <div key={index} className={styles.benefitItem}>
                                        <div className={styles.benefitIconContainer}>{React.cloneElement(benefit.icon, { className: styles.benefitIcon })}</div>
                                        <div>
                                            <h4 className={styles.benefitTitle}>{benefit.title}</h4>
                                            <p className={styles.benefitDescription}>{benefit.description}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className={styles.contactInfo}>
                                <a href="tel:+380966566243" className={styles.contactItem}><Phone size={16} />+380 96 656 62 43</a>
                                <div className={styles.contactItem}><Clock size={16} />Пн-Нд: 9:00-21:00</div>
                                <div className={styles.contactItem}><MapPin size={16} />Онлайн</div>
                            </div>
                        </div>
                    </div>

                    {/* Права секція з формою */}
                    <div className={styles.rightSection}>
                        <div className={styles.formContainer}>
                            {!isSubmitted ? (
                                <>
                                    <div className={styles.formHeader}>
                                        <h3 className={styles.formTitle}>Записатися на консультацію</h3>
                                        <p className={styles.formSubtitle}>Ми зв&apos;яжемося з вами протягом 15 хвилин</p>
                                    </div>
                                    <form onSubmit={handleSubmit} className={styles.form}>
                                        <div className={styles.formRow}>
                                            <div className={styles.inputWrapper}>
                                                <User className={styles.inputIcon} size={18} />
                                                <input type='text' name='name' value={formData.name} onChange={handleInputChange} placeholder="Ім'я дитини *" className={styles.input} required />
                                            </div>
                                            <div className={styles.inputWrapper}>
                                                <Hash className={styles.inputIcon} size={18} />
                                                <select name='age' value={formData.age} onChange={handleInputChange} className={styles.select}>
                                                    <option value=''>Вік дитини</option>
                                                    {Array.from({ length: 12 }, (_, i) => i + 6).map(age => (
                                                        <option key={age} value={age}>{age} років</option>
                                                    ))}
                                                </select>
                                            </div>
                                        </div>
                                        <div className={styles.inputWrapper}>
                                            <Phone className={styles.inputIcon} size={18} />
                                            <span className={styles.countryCode}>+380</span>
                                            <input type='tel' name='phone' value={formData.phone} onChange={handleInputChange} placeholder='_ _  _ _ _  _ _  _ _ *' className={`${styles.input} ${styles.phoneInput}`} required />
                                        </div>
                                        <div className={styles.inputWrapper}>
                                            <Briefcase className={styles.inputIcon} size={18} />
                                            <select name='course' value={formData.course} onChange={handleInputChange} className={styles.select}>
                                                <option value=''>Оберіть цікавий напрямок</option>
                                                {courses.map((course, index) => (
                                                    <option key={index} value={course}>{course}</option>
                                                ))}
                                            </select>
                                        </div>
                                        <div className={styles.inputWrapper}>
                                            <MessageSquare className={`${styles.inputIcon} ${styles.textareaIcon}`} size={18} />
                                            <textarea name='message' value={formData.message} onChange={handleInputChange} placeholder='Ваше повідомлення...' className={styles.textarea} rows={3}></textarea>
                                        </div>
                                        <button type='submit' className={styles.submitBtn}>
                                            <Send size={20} />
                                            Отримати консультацію
                                        </button>
                                        <p className={styles.disclaimer}>
                                            Натискаючи кнопку, ви погоджуєтеся з <a href='#' className={styles.link}>Політикою конфіденційності</a>.
                                        </p>
                                    </form>
                                </>
                            ) : (
                                <div className={styles.successMessage}>
                                    <div className={styles.successIconWrapper}>
                                        <CheckCircle className={styles.successIcon} />
                                    </div>
                                    <h3 className={styles.successTitle}>Дякуємо за заявку!</h3>
                                    <p className={styles.successText}>
                                        Наш менеджер вже готує для вас найкращу пропозицію і зв&apos;яжеться з вами найближчим часом.
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default ContactForm
