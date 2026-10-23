import React, { useState, useEffect } from 'react';

export default function Navbar({ theme, onToggleTheme, onOpenModal }) {
  const [activeSection, setActiveSection] = useState('hero');
  const [drawerOpen, setDrawerOpen] = useState(false);

  const navLinks = [
    { href: '#about', label: 'About' },
    { href: '#skills', label: 'Skills' },
    { href: '#experience', label: 'Experience' },
    { href: '#projects', label: 'Projects' },
    { href: '#education', label: 'Education' },
    { href: '#contact', label: 'Contact' }
  ];

  // Scrollspy to detect active section
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'about', 'skills', 'experience', 'projects', 'education', 'contact'];
      const scrollPos = window.scrollY + 160;

      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && scrollPos >= el.offsetTop) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile drawer is open
  useEffect(() => {
    if (drawerOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [drawerOpen]);

  return (
    <>
      <header className="navbar-wrapper">
        <nav className="navbar">
          <a href="#hero" className="nav-brand">
            <span className="brand-bracket">&lt;</span>
            <span className="brand-name">Rakshitha</span>
            <span className="brand-dot">.dev</span>
            <span className="brand-bracket">/&gt;</span>
          </a>

          <div className="nav-links" id="desktopNavLinks">
            {navLinks.map((link) => {
              const sectionId = link.href.replace('#', '');
              const isActive = activeSection === sectionId;
              return (
                <a
                  key={link.href}
                  href={link.href}
                  className={`nav-link ${isActive ? 'active' : ''}`}
                >
                  {link.label}
                </a>
              );
            })}
          </div>

          <div className="nav-actions">
            {/* Command Palette Trigger */}
            <button
              id="cmdPaletteBtn"
              className="cmd-trigger-btn"
              onClick={() => onOpenModal('cmdPalette')}
              aria-label="Open command palette"
              title="Search or jump to section (Ctrl + K)"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
              <span className="cmd-trigger-text">Search</span>
              <kbd className="cmd-shortcut">Ctrl K</kbd>
            </button>

            {/* Theme Toggle Button */}
            <button
              id="themeToggleBtn"
              className="theme-toggle"
              onClick={onToggleTheme}
              aria-label="Toggle dark/light theme"
              title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            >
              <svg className="sun-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="5" />
                <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
              </svg>
              <svg className="moon-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
              </svg>
            </button>

            {/* Mobile Menu Hamburger */}
            <button
              id="mobileMenuBtn"
              className="mobile-toggle"
              onClick={() => setDrawerOpen(true)}
              aria-label="Open navigation menu"
            >
              <span className="bar"></span>
              <span className="bar"></span>
              <span className="bar"></span>
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Drawer Menu */}
      <div
        id="mobileDrawerBackdrop"
        className={`drawer-backdrop ${drawerOpen ? '' : 'hidden'}`}
        onClick={() => setDrawerOpen(false)}
      />
      <aside id="mobileDrawer" className={`mobile-drawer ${drawerOpen ? 'open' : ''}`}>
        <div className="drawer-header">
          <span className="drawer-title">Navigation</span>
          <button id="closeDrawerBtn" className="btn-close" onClick={() => setDrawerOpen(false)}>
            &times;
          </button>
        </div>
        <div className="drawer-links">
          <a href="#about" className="drawer-link" onClick={() => setDrawerOpen(false)}>About & Overview</a>
          <a href="#skills" className="drawer-link" onClick={() => setDrawerOpen(false)}>Technical Skills</a>
          <a href="#experience" className="drawer-link" onClick={() => setDrawerOpen(false)}>Work Experience</a>
          <a href="#projects" className="drawer-link" onClick={() => setDrawerOpen(false)}>Projects Portfolio</a>
          <a href="#education" className="drawer-link" onClick={() => setDrawerOpen(false)}>Education</a>
          <a href="#contact" className="drawer-link" onClick={() => setDrawerOpen(false)}>Contact</a>
        </div>
        <div className="drawer-footer">
          <a
            href="https://github.com/171rakshi/Quickcare"
            className="btn btn-primary btn-block"
            target="_blank"
            rel="noopener noreferrer"
          >
            ⭐ View QuickCare on GitHub
          </a>
          <a href="mailto:rakshithasannira2003@gmail.com" className="btn btn-secondary btn-block">
            ✉️ Email Rakshitha
          </a>
        </div>
      </aside>
    </>
  );
}
