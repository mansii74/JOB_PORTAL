import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';


import LoginPage from './components/LoginPage';
import Register from './Pages/Register';
import Profile from './Pages/Profile';
import Footer from './components/Footer';
import JobList from './components/JobList';
import ResumeUpload from './components/ResumeUpload';
import JobMatch from './components/JobMatch';
import JobPostForm from './components/JobPostForm';
import ResumeList from './components/ResumeList';
import ResumeMatchAllJobs from './components/ResumeMatchAllJobs';
import OnlineJobs from './components/OnlineJobs';
import MatchOnlineJobs from './components/MatchOnlineJobs';
import Navbar from './components/Navbar';
import HomePage from './Pages/HomePage';
import FeaturedCompanies from './Pages/FeaturedCompanies';

function App() {
  return (
    <AuthProvider>
      <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <Navbar />
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/register" element={<Register />} />
          {/* <Route path="/home" element={<Homepage />} /> */}
          <Route path="/jobs" element={<JobList />} />
          <Route path="/upload" element={<ResumeUpload />} />
          <Route path="/match" element={<JobMatch />} />
          <Route path="/post-job" element={<JobPostForm />} />
          <Route path="/resumes" element={<ResumeList />} />
          <Route path="/resume/match" element={<ResumeMatchAllJobs />} />
          <Route path="/online-jobs" element={<OnlineJobs />} />
          <Route path="/match-online-jobs" element={<MatchOnlineJobs />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/companies" element={<FeaturedCompanies />} />
        </Routes>
        <Footer />
      </Router>
    </AuthProvider>
  );
}

export default App;
