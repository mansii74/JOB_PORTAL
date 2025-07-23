import React, { useEffect, useState } from 'react';
import API from '../api/api';
import '../style/ResumeMatchAllJobs.css'; // ✅ Import your new CSS

function ResumeMatchAllJobs() {
  const [resumes, setResumes] = useState([]);
  const [resumeId, setResumeId] = useState('');
  const [results, setResults] = useState([]);

  useEffect(() => {
    const fetchResumes = async () => {
      try {
        const res = await API.get('resumes/');
        setResumes(res.data);
      } catch (err) {
        console.error('Error fetching resumes:', err);
        alert('Failed to load resumes.');
      }
    };
    fetchResumes();
  }, []);

  const handleMatchAll = async () => {
    if (!resumeId) return;
    try {
      const res = await API.get(`resumes/${resumeId}/match_jobs/`);
      const jobs = res.data.results || [];
      if (jobs.length === 0) {
        alert("No matching jobs found for this resume.");
      }
      setResults(jobs);
    } catch (err) {
      console.error("Error while matching jobs:", err);
      alert("Could not fetch matching jobs.");
    }
  };

  return (
    <div className="resume-match-container">
      <h2 className="resume-match-header">Job Search with Resume Matching</h2>

      <div className="resume-match-form">
        <select
          value={resumeId}
          onChange={(e) => setResumeId(e.target.value)}
          className="resume-selector"
        >
          <option value="">-- Choose Resume --</option>
          {resumes.map((resume) => (
            <option key={resume.id} value={resume.id}>
              Resume {resume.id}
            </option>
          ))}
        </select>

        <button
          onClick={handleMatchAll}
          className="resume-submit-button"
          disabled={!resumeId}
        >
          Match Jobs
        </button>
      </div>

      {results.length > 0 && (
        <div className="match-results-section">
          <h3 className="match-results-title">
            Matching Jobs for Resume {resumeId}
          </h3>

          {results.map((job, index) => (
            <div key={index} className="job-match-card">
              <h4>{job.job_title}</h4>
              <p><strong>Score:</strong> {job.match_score}%</p>
              <p><strong>Matched Skills:</strong> {job.matched_skills?.join(', ') || 'None'}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ResumeMatchAllJobs;
