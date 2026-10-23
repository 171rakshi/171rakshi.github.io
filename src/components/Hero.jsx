import React, { useState } from 'react';
import { heroData } from '../data/portfolioData';

export default function Hero({ onOpenModal, onHighlightTech, onCopyText }) {
  const [copiedField, setCopiedField] = useState(null);

  const handleCopy = (text, fieldName) => {
    onCopyText(text);
    setCopiedField(fieldName);
    setTimeout(() => setCopiedField(null), 2000);
  };

  return (
    <section id="hero" className="hero-section">
      <div className="container hero-grid">
        <div className="hero-content">
          <div className="status-pill">
            <span className="pulse-green"></span>
            <span>{heroData.badge}</span>
          </div>

          <h1 className="hero-title">
            {heroData.titlePart1} <span className="gradient-text">{heroData.titleGradient}</span> {heroData.titlePart2}
          </h1>

          <p className="hero-bio">
            I'm <strong>Rakshitha E</strong>, a software developer delivering production-grade web applications, REST APIs, role-based access control (RBAC), and third-party integrations using <strong>Node.js</strong>, <strong>Express.js</strong>, <strong>Python</strong>, <strong>Django</strong>, and <strong>MongoDB</strong>.
          </p>

          <div className="hero-cta-group">
            <a
              href={heroData.githubQuickCare}
              className="btn btn-primary"
              target="_blank"
              rel="noopener noreferrer"
              id="liveProjectHeroBtn"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
              </svg>
              <span>View QuickCare (GitHub)</span>
            </a>
            <a href="#projects" className="btn btn-secondary">
              <span>Explore Projects</span>
            </a>
            <button
              id="viewResumeBtn"
              className="btn btn-ghost"
              onClick={() => onOpenModal('resume')}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14 2 14 8 20 8" />
                <line x1="16" y1="13" x2="8" y2="13" />
                <line x1="16" y1="17" x2="8" y2="17" />
              </svg>
              <span>View Resume</span>
            </button>
          </div>

          <div className="hero-contact-quick">
            <button
              type="button"
              className={`quick-chip copyable ${copiedField === 'email' ? 'copied' : ''}`}
              onClick={() => handleCopy(heroData.email, 'email')}
              title="Click to copy email address"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22,6 12,13 2,6" />
              </svg>
              <span className="chip-text">{heroData.email}</span>
              <span className="copy-hint-pill">{copiedField === 'email' ? '✓ Copied!' : 'Copy'}</span>
            </button>
            <button
              type="button"
              className={`quick-chip copyable ${copiedField === 'phone' ? 'copied' : ''}`}
              onClick={() => handleCopy(heroData.phone, 'phone')}
              title="Click to copy phone number"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
              <span className="chip-text">{heroData.phone}</span>
              <span className="copy-hint-pill">{copiedField === 'phone' ? '✓ Copied!' : 'Copy'}</span>
            </button>
          </div>
        </div>

        {/* Hero Developer Profile & Engineering Overview Card */}
        <div className="hero-visual">
          <div className="card dev-profile-card">
            <div className="dev-card-header">
              <div className="dev-avatar-monogram" title="Rakshitha E">
                <span className="avatar-fallback-text">RE</span>
                <span className="avatar-online-ring"></span>
              </div>
              <div className="dev-header-text">
                <div className="dev-name-row">
                  <h3>Rakshitha E</h3>
                  <span className="verified-check" title="Verified Software Developer">
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </span>
                </div>
                <p className="dev-role">Software Developer</p>
                <div className="dev-location-pill">
                  <span className="pulse-green"></span>
                  <span>Bengaluru, India &bull; Open for Hire</span>
                </div>
              </div>
            </div>

            {/* Mini Metrics Grid */}
            <div className="dev-metrics-grid">
              {heroData.metrics.map((m, idx) => (
                <div key={idx} className="metric-mini-box">
                  <span className={`mm-val ${m.isEmerald ? 'text-emerald' : ''}`}>{m.val}</span>
                  <span className="mm-lbl">{m.lbl}</span>
                </div>
              ))}
            </div>


            {/* Primary Stack */}
            <div className="dev-tech-chips-block">
              <span className="block-title">PRIMARY STACK (CLICK TO FILTER)</span>
              <div className="tech-chips-row">
                {heroData.primaryStack.map((tech, idx) => (
                  <span
                    key={idx}
                    className="tech-chip"
                    onClick={() => onHighlightTech(tech)}
                    title={`Highlight items utilizing ${tech}`}
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Footer buttons */}
            <div className="dev-card-footer">
              <button className="btn btn-sm btn-primary" onClick={() => onOpenModal('resume')}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <polyline points="14 2 14 8 20 8" />
                </svg>
                <span>View Resume</span>
              </button>
              <a href="#contact" className="btn btn-sm btn-secondary">
                <span>Contact Me</span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
