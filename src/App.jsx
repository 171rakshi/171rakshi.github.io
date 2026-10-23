import React, { useState, useEffect, useCallback } from 'react';
import ScrollProgressBar from './components/ScrollProgressBar';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import StatsRibbon from './components/StatsRibbon';
import AboutSection from './components/AboutSection';
import SkillsSection from './components/SkillsSection';
import ExperienceSection from './components/ExperienceSection';
import ProjectsSection from './components/ProjectsSection';
import EducationSection from './components/EducationSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import BackToTop from './components/BackToTop';
import Toast from './components/Toast';
import Modals from './components/Modals';

export default function App() {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('rakshitha_portfolio_theme') || 'dark';
  });
  const [activeModal, setActiveModal] = useState(null);
  const [toast, setToast] = useState({ visible: false, message: '', isError: false });
  const [activeFilterTech, setActiveFilterTech] = useState(null);

  // Theme application
  useEffect(() => {
    if (theme === 'light') {
      document.body.classList.remove('theme-dark');
      document.body.classList.add('theme-light');
    } else {
      document.body.classList.add('theme-dark');
      document.body.classList.remove('theme-light');
    }
    localStorage.setItem('rakshitha_portfolio_theme', theme);
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setTheme(prev => {
      const next = prev === 'dark' ? 'light' : 'dark';
      showToast(`Switched to ${next} mode`);
      return next;
    });
  }, []);

  const toastTimeoutRef = React.useRef(null);

  // Global Toast function with reliable timeout clearing
  const showToast = useCallback((message, isError = false) => {
    if (toastTimeoutRef.current) {
      clearTimeout(toastTimeoutRef.current);
    }
    setToast({ visible: true, message, isError });
    toastTimeoutRef.current = setTimeout(() => {
      setToast(prev => ({ ...prev, visible: false }));
    }, 3200);
  }, []);

  // Copy to clipboard
  const copyText = useCallback((text) => {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(() => {
        showToast(`Copied "${text}" to clipboard!`);
      }).catch(() => fallbackCopy(text));
    } else {
      fallbackCopy(text);
    }
  }, [showToast]);

  const fallbackCopy = (text) => {
    const ta = document.createElement('textarea');
    ta.value = text;
    document.body.appendChild(ta);
    ta.select();
    document.execCommand('copy');
    document.body.removeChild(ta);
    showToast(`Copied "${text}" to clipboard!`);
  };

  // Tech stack filter highlight
  const highlightTech = useCallback((tech) => {
    setActiveFilterTech(prev => {
      if (prev === tech) {
        showToast('Filter reset');
        return null;
      }
      showToast(`Filtering items utilizing ${tech}`);
      return tech;
    });
  }, [showToast]);

  // Global Ctrl+K listener for Command Palette
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setActiveModal(prev => prev === 'cmdPalette' ? null : 'cmdPalette');
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Lazy reveal animations observer
  useEffect(() => {
    const elements = document.querySelectorAll('.section, .card, .timeline-item');
    elements.forEach(el => el.classList.add('reveal-init'));

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target);
        }
      });
    }, { rootMargin: '0px 0px -40px 0px', threshold: 0.1 });

    elements.forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <ScrollProgressBar />

      {/* Ambient background glow elements */}
      <div className="ambient-glow glow-1"></div>
      <div className="ambient-glow glow-2"></div>
      <div className="ambient-glow glow-3"></div>

      {/* Main Navigation */}
      <Navbar
        theme={theme}
        onToggleTheme={toggleTheme}
        onOpenModal={setActiveModal}
      />

      {/* Main Sections */}
      <Hero
        onOpenModal={setActiveModal}
        onHighlightTech={highlightTech}
        onCopyText={copyText}
      />

      <StatsRibbon />

      <AboutSection />

      <SkillsSection
        onHighlightTech={highlightTech}
      />

      <ExperienceSection
        onOpenModal={setActiveModal}
        activeFilterTech={activeFilterTech}
      />

      <ProjectsSection
        onOpenModal={setActiveModal}
        onShowToast={showToast}
        activeFilterTech={activeFilterTech}
      />

      <EducationSection />

      <ContactSection
        onCopyText={copyText}
        onShowToast={showToast}
      />

      <Footer />

      <BackToTop />

      <Toast toast={toast} />

      {/* Modals & Dialogs */}
      <Modals
        activeModal={activeModal}
        onCloseModal={() => setActiveModal(null)}
        onOpenModal={setActiveModal}
        onToggleTheme={toggleTheme}
        onHighlightTech={highlightTech}
        onCopyText={copyText}
        onShowToast={showToast}
      />
    </>
  );
}
