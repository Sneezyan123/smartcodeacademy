import Image from 'next/image';
import styles from './Header.module.css';

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.headerContent}>
          {/* Logo */}
          <div className={styles.logoSection}>
            <div className={styles.logo}>
              <div className={styles.logoIcon}>
                Ma
              </div>
              <div className={styles.logoText}>
                <span className={styles.logoTitle}>Mate</span>
                <span className={styles.logoSubtitle}>academy</span>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className={styles.navigation}>
            <div className={styles.navItem}>
              <button className={styles.navButton}>
                Курси
                <svg className={styles.chevron} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            </div>
            <a href="#" className={styles.navLink}>
              Вартість
            </a>
            <a href="#" className={styles.navLink}>
              Відгуки
            </a>
            <a href="#" className={styles.navLink}>
              Про нас
            </a>
            <a href="#" className={styles.navLink}>
              Найняти випускника
            </a>
          </nav>

          {/* Right side */}
          <div className={styles.rightSection}>
            {/* Phone */}
            <div className={styles.phoneIcon}>
              <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
            </div>

            {/* Language/Country */}
            <div className={styles.languageSelector}>
              <div className={styles.flag}>
                <div className={styles.flagBlue}></div>
                <div className={styles.flagYellow}></div>
              </div>
              <svg className={styles.chevronSmall} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>

            {/* User Account */}
            <button className={styles.userButton}>
              <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </button>

            {/* CTA Button */}
            <button className={styles.ctaButton}>
              Підібрати навчання
            </button>

            {/* Mobile menu button */}
            <button className={styles.mobileMenuButton}>
              <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}