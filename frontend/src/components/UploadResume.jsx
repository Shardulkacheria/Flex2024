import React, { useState } from 'react';
import { uploadResume } from '../api/resumeApi';
import { Link } from 'react-router-dom/dist';
import NavBar from './NavBar';
const UploadResume = () => {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');
  const [interviewQuestions, setInterviewQuestions] = useState([]);

  const handleFileChange = (e) => setFile(e.target.files[0]);

  const handleUpload = async () => {
    if (!file) return setMessage('Please select a file.');

    try {
      const response = await uploadResume(file);
      setMessage(response.data.message);

      if (response.data.interviewQuestions) {
        setInterviewQuestions(response.data.interviewQuestions);
      }
    } catch (error) {
      console.error('Upload failed:', error);
      setMessage('Error uploading resume.');
    }
  };

  return (
    <>
    <NavBar />
    <div className="flex justify-center items-center min-h-screen p-6 w-full">
     
      <div className="bg-white shadow-md rounded-lg p-8 max-w-md w-full space-y-6">
        <h2 className="text-2xl font-bold text-gray-800 text-center">Upload Resume</h2>
        <input
          type="file"
          onChange={handleFileChange}
          className="block w-full text-gray-700 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <button
          onClick={handleUpload}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-200"
        >
          Upload
        </button>
        {message && <p className="text-center text-gray-700 mt-4">{message}</p>}

        {interviewQuestions.length > 0 && (
          <div>
            <h3 className="text-xl font-semibold text-gray-800 mt-6">Interview Questions</h3>
            <ul className="list-disc list-inside space-y-2 mt-3 text-gray-700">
              {interviewQuestions.map((question, index) => (
                <li key={index}>{question}</li>
              ))}
            </ul>
          </div>
        )}

        <Link
          to="/resumes"
          className="block text-center text-blue-600 hover:underline mt-6"
        >
          View All Resumes
        </Link>
      </div>
    </div>
    </>
  );
};

export default UploadResume;
