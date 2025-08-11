"use client"
import React, { useState, useRef, useEffect } from 'react'
import { Phone, Send, CheckCircle, Briefcase, MessageSquare, X } from 'lucide-react'
import styles from './ContactForm.module.css'

const ContactForm = () => {
    const [isOpen, setIsOpen] = useState(false)
    const [formData, setFormData] = useState({ phone: '', course: '', message: '' })
    const [phoneError, setPhoneError] = useState('')
    const [touched, setTouched] = useState({ phone: false, course: false })
    const [isSubmitted, setIsSubmitted] = useState(false)
    const dialogRef = useRef(null)
    const overlayRef = useRef(null)
    const openedAtRef = useRef(0)

    // Відкриття/закриття через глобальні події (запобігаємо дублюванню)
    useEffect(() => {
        let rafId = null
        const open = () => {
            openedAtRef.current = Date.now()
            if (rafId) cancelAnimationFrame(rafId)
            rafId = requestAnimationFrame(() => setIsOpen(true))
        }
        const close = () => {
            if (rafId) cancelAnimationFrame(rafId)
            rafId = requestAnimationFrame(() => setIsOpen(false))
        }
        window.addEventListener('openContactModal', open)
        window.addEventListener('closeContactModal', close)
        return () => {
            window.removeEventListener('openContactModal', open)
            window.removeEventListener('closeContactModal', close)
            if (rafId) cancelAnimationFrame(rafId)
        }
    }, [])

    const handleOverlayClick = () => {
        if (Date.now() - (openedAtRef.current || 0) < 250) return
        setIsOpen(false)
    }

    // CSS-анімація обробляє появу, JS не потрібен

    // Scroll lock для body, коли модалка відкрита, та закриття по ESC
    useEffect(() => {
        if (!isOpen) return

        const scrollY = window.scrollY || window.pageYOffset || 0
        document.body.style.position = 'fixed'
        document.body.style.top = `-${scrollY}px`
        document.body.style.left = '0'
        document.body.style.right = '0'
        document.body.style.width = '100%'

        const onKeyDown = (e) => {
            if (e.key === 'Escape') {
                setIsOpen(false)
            }
        }
        document.addEventListener('keydown', onKeyDown)

        return () => {
            document.body.style.position = ''
            const y = Math.abs(parseInt(document.body.style.top || '0', 10)) || 0
            document.body.style.top = ''
            document.body.style.left = ''
            document.body.style.right = ''
            document.body.style.width = ''
            window.scrollTo(0, y)
            document.removeEventListener('keydown', onKeyDown)
        }
    }, [isOpen])

    const courses = [
        'Roblox Studio',
        'Python',
        'JavaScript та веб-розробка',
        'Розробка ігор на Unity',
        'Не впевнений(а), потрібна консультація'
    ];

    const handleInputChange = e => {
        const { name, value } = e.target
        if (name === 'phone') {
            const digits = value.replace(/\D/g, '').slice(0, 9)
            setFormData(prev => ({ ...prev, phone: digits }))
            if (digits.length === 0) setPhoneError('Введіть номер телефону')
            else if (digits.length !== 9) setPhoneError('Номер має містити 9 цифр')
            else setPhoneError('')
            return
        }
        setFormData(prev => ({ ...prev, [name]: value }))
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // позначаємо поля як торкнуті, щоб показати стилі помилок
        setTouched(prev => ({ ...prev, phone: true, course: true }))

        const isPhoneValid = /^\d{9}$/.test(formData.phone || '')
        const isCourseSelected = !!formData.course
        if (!isPhoneValid) {
            setPhoneError('Введіть коректний номер (9 цифр)')
            return
        }
        if (!isCourseSelected) {
            return
        }
        try {
            const response = await fetch('/api/telegram', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            })
            const data = await response.json().catch(() => ({}))
            if (!response.ok || !data?.ok) {
                console.error('Failed to send telegram message', data)
                alert('На жаль, сталася помилка при відправці. Спробуйте ще раз або напишіть нам у Telegram.')
                return
            }
            // Успіх: закриваємо модальне вікно і скидаємо форму
            setIsSubmitted(false)
            setFormData({ phone: '', course: '', message: '' })
            setPhoneError('')
            setTouched({ phone: false, course: false })
            setIsOpen(false)
        } catch (err) {
            console.error(err)
            alert('Сталася помилка мережі. Перевірте підключення та спробуйте ще раз.')
        }
    }

    if (!isOpen) return null

    return (
        <div className={styles.modalOverlay} ref={overlayRef} onClick={handleOverlayClick}>
            <div className={styles.modalContainer} onClick={(e) => e.stopPropagation()}>
                <div className={styles.backgroundElements}>
                    <div className={`${styles.floatingElement} ${styles.element1}`}></div>
                    <div className={`${styles.floatingElement} ${styles.element2}`}></div>
                    <div className={`${styles.floatingElement} ${styles.element3}`}></div>
                    <div className={`${styles.floatingElement} ${styles.element4}`}></div>
                </div>
                <div className={styles.container} ref={dialogRef}>
                    <div className={`${styles.contactCard} ${styles.compact}`}>
                        <button className={styles.modalClose} onClick={() => setIsOpen(false)} aria-label='Закрити форму'>
                            <X size={20} />
                        </button>
                    {/* Мінімалістична форма */}
                    <div className={styles.rightSection}>
                        <div className={styles.formContainer}>
                            {!isSubmitted ? (
                                <>
                                    <div className={styles.formHeader}>
                                        <h3 className={styles.formTitle}>Залишіть номер — ми зв’яжемося</h3>
                                    </div>
                                    <form onSubmit={handleSubmit} className={styles.form}>
                                        <div className={`${styles.inputWrapper} ${(phoneError || (touched.phone && !formData.phone)) ? styles.hasError : ''}`}>
                                            <Phone className={styles.inputIcon} size={18} />
                                            <span className={styles.countryCode}>+380</span>
                                            <input 
                                                type='tel'
                                                name='phone'
                                                value={formData.phone}
                                                onChange={handleInputChange}
                                                onBlur={() => setTouched(prev => ({ ...prev, phone: true }))}
                                                placeholder='__ ___ __ __'
                                                className={`${styles.input} ${styles.phoneInput}`}
                                                inputMode='numeric'
                                                required
                                                aria-invalid={!!(phoneError || (touched.phone && !formData.phone))}
                                            />
                                            {phoneError && <div className={styles.errorText}>{phoneError}</div>}
                                        </div>
                                        <div className={`${styles.inputWrapper} ${(touched.course && !formData.course) ? styles.hasError : ''}`}>
                                            <Briefcase className={styles.inputIcon} size={18} />
                                            <select 
                                                name='course' 
                                                value={formData.course} 
                                                onChange={handleInputChange} 
                                                onBlur={() => setTouched(prev => ({ ...prev, course: true }))}
                                                className={styles.select} 
                                                required
                                                aria-invalid={!!(touched.course && !formData.course)}
                                            >
                                                <option value=''>Оберіть цікавий напрямок</option>
                                                {courses.map((course, index) => (
                                                    <option key={index} value={course}>{course}</option>
                                                ))}
                                            </select>
                                            {(touched.course && !formData.course) && (
                                                <div className={styles.errorText}>Оберіть напрямок</div>
                                            )}
                                        </div>
                                        <div className={styles.inputWrapper}>
                                            <MessageSquare className={`${styles.inputIcon} ${styles.textareaIcon}`} size={18} />
                                            <textarea name='message' value={formData.message} onChange={handleInputChange} placeholder="Ваше повідомлення... (необов'язково)" className={styles.textarea} rows={3}></textarea>
                                        </div>
                                        <button type='submit' className={styles.submitBtn} disabled={!!phoneError || !(formData.phone && formData.course)}>
                                            <Send size={20} />
                                            Отримати консультацію
                                        </button>
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
            </div>
        </div>
    )
}

export default ContactForm
