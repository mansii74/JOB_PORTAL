import React, { useEffect, useState } from "react";
import axios from 'axios';
import '../style/ResumeList.css'; // ✅ Add this import

function ResumeList() {
  const [resumes, setResumes] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");

    axios
      .get("http://localhost:8000/api/resumes/", {
        headers: {
          Authorization: `Token ${token}`,
        },
      })
      .then((res) => setResumes(res.data))
      .catch((err) => console.error(err));
  }, []);

  const handleViewFile = (fileUrl) => {
    const finalUrl = fileUrl.startsWith("http") ? fileUrl : `http://localhost:8000${fileUrl}`;
    window.open(finalUrl, "_blank");
  };

  return (
    <div className="resume-list-container">
      <h2 className="resume-list-heading">Your Uploaded Resumes</h2>

      {resumes.length === 0 ? (
        <p>No resumes found.</p>
      ) : (
        resumes.map((resume) => (
          <div key={resume.id} className="resume-card">
            <p><strong>Resume ID:</strong> {resume.id}</p>
            <p><strong>Uploaded At:</strong> {new Date(resume.uploaded_at).toLocaleDateString()}</p>
            <p><strong>Parsed Text:</strong> {resume.parsed_text.slice(0, 300)}...</p>
            <button
              onClick={() => handleViewFile(resume.file)}
              className="view-button"
            >
              View File
            </button>
          </div>
        ))
      )}
    </div>
  );
}

export default ResumeList;
