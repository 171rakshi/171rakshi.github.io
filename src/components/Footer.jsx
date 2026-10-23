import React from 'react';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-content">
        <div className="footer-brand">
          <div className="footer-logo">
            <span className="brand-bracket">&lt;</span>
            <strong>Rakshitha</strong>
            <span className="brand-dot">.dev</span>
            <span className="brand-bracket">/&gt;</span>
          </div>
          <p>Software Developer &bull; Bengaluru, India</p>
          <span className="footer-tagline">Building scalable backend architectures, RESTful APIs, and full-stack solutions.</span>
        </div>

        <div className="footer-links-group">
          <div className="footer-nav-links">
            <a href="#hero">Overview</a>
            <a href="#about">Philosophy</a>
            <a href="#skills">Arsenal</a>
            <a href="#experience">Experience</a>
            <a href="#projects">Projects</a>
            <a href="#contact">Contact</a>
          </div>

          <div className="footer-external-links">
            <a href="https://github.com/171rakshi" target="_blank" rel="noopener noreferrer">
              GitHub Profile &rarr;
            </a>
            <a href="https://github.com/171rakshi/Quickcare" target="_blank" rel="noopener noreferrer">
              QuickCare Repo &rarr;
            </a>
            <a href="mailto:rakshithasannira2003@gmail.com">
              Email Me &rarr;
            </a>
            <a href="#hero" className="back-top-link">
              Back to Top &uarr;
            </a>
          </div>
        </div>
      </div>

      <div className="container footer-bottom">
        <p>&copy; 2026 Rakshitha E. All rights reserved.</p>
        <span className="footer-tech-stamp">Engineered with React 19 &bull; Vite &bull; Vanilla CSS</span>
      </div>
    </footer>
  );
}
