import React, { useState, useEffect, useRef } from 'react';
import { statsRibbonData } from '../data/portfolioData';

export default function StatsRibbon() {
  const [counts, setCounts] = useState(statsRibbonData.map(() => 0));
  const ribbonRef = useRef(null);
  const animatedRef = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !animatedRef.current) {
          animatedRef.current = true;
          animateAll();
        }
      });
    }, { threshold: 0.25 });

    if (ribbonRef.current) observer.observe(ribbonRef.current);
    return () => observer.disconnect();
  }, []);

  const animateAll = () => {
    const duration = 1600;
    const startTime = performance.now();

    const frame = (now) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const ease = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);

      setCounts(statsRibbonData.map(item => {
        const current = ease * item.target;
        return item.decimals ? parseFloat(current.toFixed(item.decimals)) : Math.floor(current);
      }));

      if (progress < 1) {
        requestAnimationFrame(frame);
      } else {
        setCounts(statsRibbonData.map(item => item.target));
      }
    };

    requestAnimationFrame(frame);
  };

  return (
    <section className="stats-ribbon" ref={ribbonRef}>
      <div className="container stats-grid">
        {statsRibbonData.map((stat, idx) => (
          <div key={idx} className="stat-box">
            <span className="stat-number">
              {stat.decimals ? counts[idx].toFixed(stat.decimals) : counts[idx]}
              {stat.suffix || ''}
            </span>
            <span className="stat-title">{stat.title}</span>
            <span className="stat-desc">{stat.desc}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
