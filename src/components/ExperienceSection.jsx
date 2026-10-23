import React from 'react';
import { experienceData } from '../data/portfolioData';

export default function ExperienceSection({ onOpenModal, activeFilterTech }) {
  return (
    <section id="experience" className="section experience-section">
      <div className="container">
        <div className="section-header">
          <span className="section-tag">WORK EXPERIENCE</span>
          <h2 className="section-title">Professional Experience</h2>
          <p className="section-subtitle">
            Hands-on enterprise engineering. <em>(Note: Proprietary enterprise client systems with internal architectures &bull; external links restricted for data confidentiality)</em>
          </p>
        </div>

        <div className="experience-timeline">
          {experienceData.map((job, idx) => {
            const matchesActiveTech = activeFilterTech && (
              job.tags?.some(t => t.toLowerCase().includes(activeFilterTech.toLowerCase())) ||
              job.projects?.some(p => p.tags.some(t => t.toLowerCase().includes(activeFilterTech.toLowerCase()))) ||
              job.bullets?.some(b => b.toLowerCase().includes(activeFilterTech.toLowerCase()))
            );

            return (
              <div
                key={idx}
                className={`timeline-item ${matchesActiveTech ? 'highlighted-match' : ''}`}
              >
                <div className="timeline-dot"></div>
                <div className="timeline-content card">
                  <div className="exp-header">
                    <div>
                      <span className="company-badge">{job.badge}</span>
                      <h3 className="role-title">{job.role}</h3>
                      <h4 className="company-name">{job.company}</h4>
                    </div>
                    <div className="exp-duration">
                      <span className="badge-time">{job.duration}</span>
                    </div>
                  </div>

                  {/* Company Projects if present */}
                  {job.projects && job.projects.map((proj, pIdx) => (
                    <div key={pIdx} className="company-project-box">
                      <div className="cp-title-row">
                        <div className="cp-title-meta">
                          <span className="status-confidential">{proj.meta}</span>
                          <h4>{proj.title}</h4>
                        </div>
                        <button
                          className="btn btn-sm btn-secondary"
                          onClick={() => onOpenModal(proj.modalId === 'activLineModal' ? 'activline' : 'joms')}
                        >
                          {proj.modalBtnText}
                        </button>
                      </div>
                      <p className="cp-desc">{proj.desc}</p>
                      <ul className="bullet-list">
                        {proj.bullets.map((b, bIdx) => (
                          <li key={bIdx} dangerouslySetInnerHTML={{ __html: b.replace(/(Node\.js|Express\.js|MongoDB|SQL|4\+ third-party REST APIs|Razorpay|Firebase|Socket\.io|PDFKit|ExcelJS|Controller-Service-Repository|Vitest)/g, '<strong>$1</strong>') }} />
                        ))}
                      </ul>
                      <div className="cp-tags">
                        {proj.tags.map((t, tIdx) => (
                          <span key={tIdx}>{t}</span>
                        ))}
                      </div>
                    </div>
                  ))}

                  {/* Standard Bullets if no projects array */}
                  {job.bullets && (
                    <ul className="bullet-list">
                      {job.bullets.map((b, bIdx) => (
                        <li key={bIdx} dangerouslySetInnerHTML={{ __html: b.replace(/(Django MVT \(Model-View-Template\)|Django ORM|SQL|HTML5|CSS3|JavaScript|Git)/g, '<strong>$1</strong>') }} />
                      ))}
                    </ul>
                  )}

                  {job.tags && (
                    <div className="cp-tags">
                      {job.tags.map((t, tIdx) => (
                        <span key={tIdx}>{t}</span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
