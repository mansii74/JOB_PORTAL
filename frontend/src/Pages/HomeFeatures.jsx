import { FaBriefcase, FaFileUpload, FaRobot, FaGlobeAmericas } from 'react-icons/fa';

const HomeFeatures = () => {
  return (
    <section className="home-features section-animate delay-2">
      <h2>Why Choose <span className="brand-accent">JobPortal?</span></h2>
      <div className="features-grid">
        <div className="feature-card">
          <FaBriefcase size={48} color="#0876dd" />
          <h3>Explore Jobs</h3>
          <p>Browse thousands of updated job listings across industries.</p>
        </div>
        <div className="feature-card">
          <FaFileUpload size={48} color="#0876dd" />
          <h3>Upload Resume</h3>
          <p>Maximize your reach by uploading your resume for recruiters.</p>
        </div>
        <div className="feature-card">
          <FaRobot size={48} color="#0876dd" />
          <h3>Smart Matching</h3>
          <p>AI-Powered job matching tailored for your skills and goals.</p>
        </div>
        <div className="feature-card">
          <FaGlobeAmericas size={48} color="#0876dd" />
          <h3>Remote Jobs</h3>
          <p>Work from anywhere with verified freelance & remote openings.</p>
        </div>
      </div>
    </section>
  );
};

export default HomeFeatures;
