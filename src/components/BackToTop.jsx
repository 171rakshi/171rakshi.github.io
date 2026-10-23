import React, { useState, useEffect } from 'react';

export default function BackToTop() {
  const [visible, setVisible] = useState(false);
  const [offset, setOffset] = useState(119.38);

  const totalLength = 119.38; // 2 * PI * 19

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;

      if (scrollY > 350) {
        setVisible(true);
      } else {
        setVisible(false);
      }

      if (maxScroll > 0) {
        const scrollPercent = Math.min(1, Math.max(0, scrollY / maxScroll));
        setOffset(totalLength - (scrollPercent * totalLength));
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <button
      id="backToTopBtn"
      className={`back-to-top ${visible ? 'visible' : ''}`}
      onClick={scrollToTop}
      aria-label="Scroll back to top"
      title="Back to top"
    >
      <svg className="progress-ring" width="46" height="46">
        <circle
          className="progress-ring-bg"
          stroke="rgba(255,255,255,0.1)"
          strokeWidth="3"
          fill="transparent"
          r="19"
          cx="23"
          cy="23"
        />
        <circle
          id="progressRingCircle"
          className="progress-ring-circle"
          stroke="var(--accent-purple)"
          strokeWidth="3"
          strokeLinecap="round"
          fill="transparent"
          r="19"
          cx="23"
          cy="23"
          style={{ strokeDashoffset: offset }}
        />
      </svg>
      <svg className="arrow-up-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
        <polyline points="18 15 12 9 6 15"></polyline>
      </svg>
    </button>
  );
}
