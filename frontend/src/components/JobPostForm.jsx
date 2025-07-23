import React, { useState } from "react";
import axios from "axios";
import '../style/JobPostForm.css'; // ✅ Link CSS

function JobPostForm() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [skills_required, setSkillRequired] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8000/api/jobs/', {
        title,
        description,
        skills_required,
      });

      setMessage('✅ Job posted successfully!');
      setTitle('');
      setDescription('');
      setSkillRequired('');
    } catch (error) {
      setMessage('❌ Failed to post job');
      console.error('Post job error: ', error);
    }
  };

  return (
    <div className="job-form-container">
      <h2 className="job-form-heading">Post a New Job</h2>
      <form onSubmit={handleSubmit} className="job-form">
        <input
          type="text"
          placeholder="Job Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="form-input"
          required
        />

        <textarea
          placeholder="Job Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="form-textarea"
          rows={5}
          required
        />

        <input
          type="text"
          placeholder="Skills Required (comma-separated)"
          value={skills_required}
          onChange={(e) => setSkillRequired(e.target.value)}
          className="form-input"
        />

        <button type="submit" className="form-button">Submit</button>

        {message && <p className="form-message">{message}</p>}
      </form>
    </div>
  );
}

export default JobPostForm;
