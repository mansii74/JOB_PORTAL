import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../style/Navbar.css';
import LogoutButton from './LogoutButton';

const Navbar = () => {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [resumesDropdown, setResumesDropdown] = useState(false);
  const [onlineJobsDropdown, setOnlineJobsDropdown] = useState(false);
  const [jobsDropdown, setJobsDropdown] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const resumesRef = useRef(null);
  const onlineJobsRef = useRef(null);
  const jobsRef = useRef(null);
  const menuRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);

    const handleClickOutside = (event) => {
      if (!resumesRef.current?.contains(event.target)) setResumesDropdown(false);
      if (!onlineJobsRef.current?.contains(event.target)) setOnlineJobsDropdown(false);
      if (!jobsRef.current?.contains(event.target)) setJobsDropdown(false);
      if (!menuRef.current?.contains(event.target)) setDropdownVisible(false);
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setDropdownVisible(false);
    setIsLoggedIn(false);
    navigate('/');
  };

  const toggleDropdown = (type) => {
    setResumesDropdown(type === 'resumes' ? !resumesDropdown : false);
    setOnlineJobsDropdown(type === 'online' ? !onlineJobsDropdown : false);
    setJobsDropdown(type === 'jobs' ? !jobsDropdown : false);
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/home" className="logo-link">
          JOB<span className="highlight">PORTAL</span>
        </Link>
      </div>

      <div className="navbar-menu-right">
        <ul className="navbar-list">
          {/* Jobs Dropdown */}
          <li className="navbar-link resumes-dropdown-wrapper" ref={jobsRef}>
            <div onClick={() => toggleDropdown('jobs')} className="dropdown-toggle">
              Jobs
            </div>
            {jobsDropdown && (
              <div className="resumes-dropdown">
                <Link to="/jobs" className="dropdown-link" onClick={() => setJobsDropdown(false)}>Available Jobs</Link>
                <Link to="/post-job" className="dropdown-link" onClick={() => setJobsDropdown(false)}>Post New Job</Link>
              </div>
            )}
          </li>

          <li><Link className="navbar-link" to="/match">Match Job</Link></li>
          <li><Link className="navbar-link" to="/resume/match">Match Resumes</Link></li>

          {/* Resumes Dropdown */}
          <li className="navbar-link resumes-dropdown-wrapper" ref={resumesRef}>
            <div onClick={() => toggleDropdown('resumes')} className="dropdown-toggle">
              Resumes
            </div>
            {resumesDropdown && (
              <div className="resumes-dropdown">
                <Link to="/upload" className="dropdown-link" onClick={() => setResumesDropdown(false)}>Upload Resume</Link>
                <Link to="/resumes" className="dropdown-link" onClick={() => setResumesDropdown(false)}>Show Resumes</Link>
              </div>
            )}
          </li>

          {/* Online Jobs Dropdown */}
          <li className="navbar-link resumes-dropdown-wrapper" ref={onlineJobsRef}>
            <div onClick={() => toggleDropdown('online')} className="dropdown-toggle">
              Online Jobs
            </div>
            {onlineJobsDropdown && (
              <div className="resumes-dropdown">
                <Link to="/online-jobs" className="dropdown-link" onClick={() => setOnlineJobsDropdown(false)}>Find Online Jobs</Link>
                <Link to="/match-online-jobs" className="dropdown-link" onClick={() => setOnlineJobsDropdown(false)}>Match Online Jobs</Link>
              </div>
            )}
          </li>
        </ul>

        {/* Three-dots menu */}
        <div className="menu-wrapper" ref={menuRef}>
          <div className="menu-icon" onClick={() => setDropdownVisible(!dropdownVisible)}>
            ⋮
          </div>
          {dropdownVisible && (
            <div className="dropdown">
              {!isLoggedIn ? (
                <>
                  <Link to="/" className="dropdown-link" onClick={() => setDropdownVisible(false)}>Login</Link>
                  <Link to="/register" className="dropdown-link" onClick={() => setDropdownVisible(false)}>Register</Link>
                </>
              ) : (
                <>
                  <Link to="/profile" className="dropdown-link" onClick={() => setDropdownVisible(false)}>Profile</Link>
                  <Link to="/" className="dropdown-link" onClick={handleLogout}>Logout</Link>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
