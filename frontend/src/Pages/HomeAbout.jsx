import React from 'react';

const HomeAbout = () => (
  <section className="home-about about-flex section-animated-bg">
    <div className="about-img-side">
      <img src="/jobportal_logo.png" alt="About JobPortal" className="about-img floating-img" />
    </div>
    <div className="about-content-side">
      <h2>About JobPortal</h2>
      <p>
        JobPortal is your digital job-hunting companion, built to bridge the gap between talent and opportunity.
        Our platform empowers job seekers to land their dream roles, and enables companies to find the best-fit candidates with ease.
      </p>
    </div>
  </section>
);

export default HomeAbout;
