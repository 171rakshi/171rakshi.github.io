import React from 'react';
import { aboutData } from '../data/portfolioData';

export default function AboutSection() {
  return (
    <section id="about" className="section about-section">
      <div className="container">
        <div className="section-header">
          <span className="section-tag">ENGINEERING PHILOSOPHY</span>
          <h2 className="section-title">Built for Reliability, Performance & Scale</h2>
          <p className="section-subtitle">
            Writing clean, maintainable backend services with robust layered boundaries and zero tolerance for data discrepancies.
          </p>
        </div>

        <div className="about-grid">
          {aboutData.map((item, idx) => (
            <div key={idx} className="card about-card">
              <div
                className="about-icon"
                dangerouslySetInnerHTML={{ __html: item.icon }}
              />
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
