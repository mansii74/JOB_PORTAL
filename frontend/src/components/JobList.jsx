import React, { useEffect, useState } from 'react';
import API from '../api/api';
import '../style/JobList.css';

function JobList() {
  const [jobs, setJobs] = useState([]);

  const fetchJobs = async () => {
    try {
      // No need to include full URL; baseURL is handled by API instance
      const res = await API.get('/jobs/');
      setJobs(res.data);
    } catch (error) {
      console.error("Error fetching jobs:", error);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  return (
    <div className="job-list-container">
      <h2 className="job-list-heading">Available Jobs</h2>

      {jobs.length === 0 ? (
        <p className="no-jobs">No jobs available.</p>
      ) : (
        <div className="job-grid">
          {jobs.map((job) => (
            <div key={job.id} className="job-card">
              <h3 className="job-title">{job.title}</h3>
              <p className="job-description">{job.description}</p>
              <p className="job-skills">
                <strong>Required Skills:</strong> {job.skills_required}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default JobList;
