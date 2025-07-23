import React from 'react';
import { Link } from 'react-router-dom';

const HomeExplore = () => {
  return (
    <section className="home-explore section-animate delay-3">
      <h2>Explore More</h2>
      <div className="explore-links">
        <Link to="/jobs" className="explore-link">Find a Job</Link>
        <Link to="/upload" className="explore-link">Upload Resume</Link>
        <Link to="/online-jobs" className="explore-link">Online Jobs</Link>
        <Link to="/match" className="explore-link">Job Matching</Link>
      </div>
    </section>
  );
};

export default HomeExplore;
