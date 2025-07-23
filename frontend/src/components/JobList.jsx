import React, { useEffect, useState } from 'react';
import API from '../api/api';
import '../style/JobList.css'; // ✅ Import your custom CSS file

function JobList() {
  const [jobs, setJobs] = useState([]);

  const fetchJobs = async () => {
    try {
      const res = await API.get('http://127.0.0.1:8000/api/jobs/');
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
