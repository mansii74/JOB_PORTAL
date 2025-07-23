import React, { useEffect, useState } from 'react';
import API from '../api/api';
import '../style/OnlineJobs.css';

function OnlineJobs() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchJobs = async () => {
    setLoading(true);
    try {
      const res = await API.get('online-jobs/');
      setJobs(res.data.results || []);
    } catch (err) {
      console.error("Failed to fetch online jobs:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  return (
    <div className="online-jobs-container">
      <h2 className="online-jobs-title">Latest Online Jobs (Adzuna)</h2>

      {loading ? (
        <p className="loading-text">Loading jobs...</p>
      ) : jobs.length === 0 ? (
        <p className="no-jobs-text">No jobs found.</p>
      ) : (
        <div className="job-cards-grid">
          {jobs.map((job, idx) => (
            <div key={idx} className="job-card">
              <h3 className="job-title">{job.title}</h3>
              <p className="job-meta">
                {job.company?.display_name} — {job.location?.display_name}
              </p>
              <p className="job-description">{job.description?.slice(0, 180)}...</p>
              <a
                href={job.redirect_url}
                target="_blank"
                rel="noopener noreferrer"
                className="job-apply-link"
              >
                Apply Now →
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default OnlineJobs;
