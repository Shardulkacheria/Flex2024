import React, { useEffect, useState } from 'react';
import { getAllResumes, deleteResume } from '../api/resumeApi';
import { Link } from 'react-router-dom/dist';
import NavBar from './NavBar';
const ResumesList = () => {
  const [resumes, setResumes] = useState([]);
  const [message, setMessage] = useState('');

  const fetchResumes = async () => {
    try {
      const response = await getAllResumes();
      setResumes(response.data);
    } catch (error) {
      console.error('Error fetching resumes:', error);
      setMessage('Error fetching resumes');
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await deleteResume(id);
      setMessage(response.data.message);
      fetchResumes();
    } catch (error) {
      console.error('Error deleting resume:', error);
      setMessage('Error deleting resume');
    }
  };

  useEffect(() => {
    fetchResumes();
  }, []);

  return (
    <>
    <NavBar/>
     <div className="min-h-screen  p-6">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold text-center  mb-8">Resumes List</h2>
        
        {message && <p className="text-center text-green-500 mb-4">{message}</p>}
        
        <ul className="space-y-4">
          {resumes.map((resume) => (
            <li key={resume._id} className="bg-white shadow-md rounded-lg p-6 flex justify-between items-center">
              <div>
                <strong className="text-lg font-semibold text-gray-800">{resume.name}</strong>
                <p className="text-gray-600">{resume.email}</p>
              </div>
              <div className="flex space-x-4">
                <Link
                  to={`/resume/${resume._id}`}
                  className="text-blue-600 hover:underline font-semibold"
                >
                  View
                </Link>
                <Link
                  to={`/update-resume/${resume._id}`}
                  className="text-blue-600 hover:underline font-semibold"
                >
                  Update
                </Link>
                <button
                  onClick={() => handleDelete(resume._id)}
                  className="bg-red-500 hover:bg-red-600 text-white font-semibold py-1 px-3 rounded-lg transition duration-200"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
    </>
   
  );
};

export default ResumesList;
