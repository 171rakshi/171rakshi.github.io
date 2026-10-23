import React, { useState } from 'react';
import { heroData } from '../data/portfolioData';

export default function ContactSection({ onCopyText, onShowToast }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [submitting, setSubmitting] = useState(false);

  const fallbackMailto = () => {
    const mailtoUrl = `mailto:rakshithasannira2003@gmail.com?subject=${encodeURIComponent(formData.subject || `Portfolio Inquiry from ${formData.name}`)}&body=${encodeURIComponent(`Hi Rakshitha,\n\n${formData.message}\n\n---\nSender: ${formData.name}\nEmail: ${formData.email}`)}`;
    window.location.href = mailtoUrl;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      onShowToast('Please fill out all required fields', true);
      return;
    }

    setSubmitting(true);
    try {
      const response = await fetch("https://formsubmit.co/ajax/rakshithasannira2003@gmail.com", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          _subject: formData.subject || `Portfolio Connection Request from ${formData.name}`,
          message: formData.message,
          _template: 'table'
        })
      });

      const data = await response.json();
      if (response.ok && (data.success === "true" || data.success === true)) {
        onShowToast(`Thank you, ${formData.name}! Your email was delivered directly to Rakshitha's inbox.`);
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        fallbackMailto();
        onShowToast('Opening your default mail app to send directly...');
      }
    } catch (err) {
      fallbackMailto();
      onShowToast('Opening your default mail app to send directly...');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="contact" className="section contact-section">
      <div className="container">
        <div className="section-header">
          <span className="section-tag">LET'S CONNECT</span>
          <h2 className="section-title">Get In Touch</h2>
          <p className="section-subtitle">
            Interested in collaborating or discussing full-time opportunities? Feel free to reach out directly.
          </p>
        </div>

        <div className="contact-grid">
          <div className="contact-info-cards">
            <div
              className="card contact-card copyable"
              onClick={() => onCopyText(heroData.email)}
              title="Click to copy email address"
              style={{ cursor: 'pointer' }}
            >
              <div className="c-icon purple">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
              </div>
              <div className="c-details">
                <span className="c-label">Email Address (Click to copy)</span>
                <strong className="c-val">{heroData.email}</strong>
              </div>
            </div>

            <div
              className="card contact-card copyable"
              onClick={() => onCopyText(heroData.phone)}
              title="Click to copy phone number"
              style={{ cursor: 'pointer' }}
            >
              <div className="c-icon cyan">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
              </div>
              <div className="c-details">
                <span className="c-label">Direct Phone (Click to copy)</span>
                <strong className="c-val">{heroData.phone}</strong>
              </div>
            </div>

            <div className="card contact-card">
              <div className="c-icon emerald">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
              </div>
              <div className="c-details">
                <span className="c-label">Current Location</span>
                <strong className="c-val">Bengaluru, Karnataka, India</strong>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="card contact-form-card">
            <form id="portfolioContactForm" onSubmit={handleSubmit}>
              <h3>Send a Message</h3>
              <p className="form-desc">Messages are delivered directly to rakshithasannira2003@gmail.com.</p>

              <div className="form-group">
                <label htmlFor="contactName">Your Name</label>
                <input
                  type="text"
                  id="contactName"
                  required
                  placeholder="Alex Turner"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label htmlFor="contactEmail">Your Email</label>
                <input
                  type="email"
                  id="contactEmail"
                  required
                  placeholder="alex@company.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label htmlFor="contactSubject">Subject</label>
                <input
                  type="text"
                  id="contactSubject"
                  required
                  placeholder="Software Developer Opportunity"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label htmlFor="contactMessage">Message</label>
                <textarea
                  id="contactMessage"
                  rows="4"
                  required
                  placeholder="Hi Rakshitha, we were impressed by your profile and would like to talk..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                />
              </div>

              <button
                type="submit"
                className="btn btn-primary btn-block"
                id="sendMessageBtn"
                disabled={submitting}
              >
                <span>{submitting ? 'Sending Message...' : 'Send Message'}</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="22" y1="2" x2="11" y2="13" />
                  <polygon points="22 2 15 22 11 13 2 9 22 2" />
                </svg>
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
