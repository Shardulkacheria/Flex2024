import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import UploadResume from './components/UploadResume';
import Login from './pages/Login';
import Signup from './pages/Signup';
import RequestResetPassword from './pages/RequestResetPassword';
import UpdatePassword from './pages/UpdatePassword';
import './index.css'
import ResumeList from './components/ResumeList';
import ResumeDetail from './components/ResumeDetail';
import UpdateResumePage from './pages/UpdateResumePage';
import ProtectedRoute from './components/ProtectedRoute';
const App = () => {
  return (

        <Router>
            <Routes> 
                <Route path="/login" element={<Login />} /> {/* Route for Login */}
                <Route path="/upload" element={<ProtectedRoute><UploadResume /></ProtectedRoute>} />
               
                <Route path="/signup" element={<Signup />} /> {/* Route for Signup */}
                <Route path="/resumes" element={<ProtectedRoute><ResumeList /></ProtectedRoute>} /> {/* Route for Signup */}
                <Route path="/resume/:id" element={<ProtectedRoute><ResumeDetail /></ProtectedRoute>} />
                <Route path="/update-resume/:id" element={<ProtectedRoute><UpdateResumePage /></ProtectedRoute>} />
                <Route path="/request-reset-password" element={<RequestResetPassword />} /> {/* Route for requesting password reset */}
                <Route path="/reset-password/:token" element={<UpdatePassword />} /> {/* Route for updating password */}
            </Routes>
        </Router>
    
  )
}

export default App

