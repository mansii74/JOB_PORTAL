import React, { useState } from 'react';
import API from '../api/api';
import '../style/ResumeUpload.css'; // ✅ Import the new CSS

function ResumeUpload() {
    const [file, setFile] = useState(null);
    const [skills, setSkills] = useState([]);
    const [error, setError] = useState("");

    const handleUpload = async () => {
        try {
            const formData = new FormData();
            formData.append('file', file);
            const res = await API.post('resumes/upload/', formData, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('authToken')}`, // ✅ Add auth if needed
                    'Content-Type': 'multipart/form-data',
                },
            });
            setSkills(res.data.skills);
            setError("");
        } catch (err) {
            setError("Failed to upload resume");
            setSkills([]);
        }
    };

    return (
        <div className="resume-upload-container">
            <div className="resume-upload-box">
                <h2 className="resume-title">Upload Your Resume</h2>
                <input
                    type="file"
                    onChange={(e) => setFile(e.target.files[0])}
                    className="resume-input"
                />
                <button
                    className="resume-upload-btn"
                    onClick={handleUpload}
                    disabled={!file}
                >
                    Upload Resume
                </button>

                <div className="resume-result">
                    {error && <p className="resume-error">{error}</p>}
                    {skills.length > 0 && (
                        <>
                            <h3 className="resume-skills-heading">Extracted Skills:</h3>
                            <ul className="resume-skills-list">
                                {skills.map((s, i) => (
                                    <li key={i} className="resume-skill">{s}</li>
                                ))}
                            </ul>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}

export default ResumeUpload;
