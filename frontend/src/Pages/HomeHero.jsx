import React from 'react';

const HomeHero = () => {
  return (
    <section className="home-hero section-animate delay-1">
      <div className="hero-content">
        <h1>
          Welcome to <span className="brand-accent">JobPortal</span>
        </h1>
        <p className="hero-tagline">
          Your Gateway to the Best Job Opportunities
        </p>
        <p className="hero-desc">
          Discover jobs that match your skills. Upload your resume, find the perfect fit, or hire top talent — all in one place.
        </p>
        <a href="/register" className="hero-cta">
          Get Started
        </a>
      </div>
      <div className="hero-image">
        <img src="/jobportal_logo.png" alt="Job search illustration" />
      </div>
    </section>
  );
};

export default HomeHero;
