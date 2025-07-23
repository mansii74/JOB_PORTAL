import React, { useEffect, useState } from 'react';
import API from '../api/api';
import '../style/MatchOnlineJobs.css';

function MatchOnlineJobs() {
  const [resumes, setResumes] = useState([]);
  const [resumeId, setResumeId] = useState('');
  const [query, setQuery] = useState('Developer');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchResumes = async () => {
      try {
        const res = await API.get('resumes/');
        setResumes(res.data);
      } catch (err) {
        console.error('Failed to fetch resumes', err);
      }
    };
    fetchResumes();
  }, []);

  const handleMatch = async () => {
    setLoading(true);
    try {
      const res = await API.post(`match-online-jobs/`, {
        resume_id: resumeId,
        query: query,
      });
      setResults(res.data.results || []);
    } catch (err) {
      console.error('Error matching online jobs', err);
    }
    setLoading(false);
  };

  return (
    <div className="match-online-jobs-container">
      <h2 className="match-online-jobs-title">Match Resumes with Online Jobs</h2>

      <div className="match-form">
        <label>Select Resume:</label>
        <select value={resumeId} onChange={(e) => setResumeId(e.target.value)}>
          <option value="">-- Select Resume --</option>
          {resumes.map((resume) => (
            <option key={resume.id} value={resume.id}>
              Resume {resume.id}
            </option>
          ))}
        </select>

        <label>Job Title / Query:</label>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="e.g. Python Developer"
        />

        <button onClick={handleMatch} disabled={!resumeId}>
          Match Jobs
        </button>
      </div>

      {loading ? (
        <p className="match-loading">Loading Matching Jobs...</p>
      ) : results.length > 0 ? (
        <div>
          <h3 className="match-results-title">Matching Jobs</h3>
          {results.map((job, idx) => (
            <div key={idx} className="job-match-card">
              <h4>{job.job_title}</h4>
              <p className="job-meta">{job.company}</p>
              <p className="job-score">Score: <strong>{job.score}%</strong></p>
              <p className="job-keywords">Matched: {job.matched_keywords.join(', ')}</p>
              <p className="job-keywords">Missing: {job.missing_keywords.join(', ')}</p>
              <a
                href={job.apply_link}
                target="_blank"
                rel="noopener noreferrer"
                className="apply-link"
              >
                Apply Now →
              </a>
            </div>
          ))}
        </div>
      ) : (
        <p className="match-no-results">No matching jobs found.</p>
      )}
    </div>
  );
}

export default MatchOnlineJobs;
