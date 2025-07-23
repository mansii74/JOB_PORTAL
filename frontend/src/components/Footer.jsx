// src/components/Footer.jsx

import React from 'react';
import { Link } from 'react-router-dom';
import { FaLinkedin, FaTwitter, FaInstagram } from 'react-icons/fa';
import '../style/Footer.css';

const Footer = () => (
  <footer className="footer">
    <div className="footer-main">
      <div className="footer-brand">
        <span className="footer-logo">Job<span className="footer-highlight">Portal</span></span>
        <p className="footer-tagline">
          Your trusted partner for job search and hiring.
        </p>
      </div>

      <div className="footer-links">
        <div>
          <h4>For Candidates</h4>
          <Link to="/jobs">Browse Jobs</Link>
          <Link to="/online-jobs">Online Jobs</Link>
          <Link to="/upload">Upload Resume</Link>
          <Link to="/match">Job Matching</Link>
        </div>
        <div>
          <h4>Company</h4>
          <Link to="/about">About Us</Link>
          <Link to="/contact">Contact</Link>
          <Link to="/privacy-policy">Privacy Policy</Link>
          <Link to="/terms">Terms</Link>
        </div>
      </div>

      <div className="footer-social">
        <h4>Connect</h4>
        <div className="footer-social-icons">
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer"><FaLinkedin /></a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"><FaTwitter /></a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
        </div>
      </div>
    </div>
    <div className="footer-bottom">
      <span>© {new Date().getFullYear()} JobPortal. All rights reserved.</span>
    </div>
  </footer>
);

export default Footer;
