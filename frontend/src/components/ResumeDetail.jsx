import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getResumeById } from '../api/resumeApi';

const ResumeDetail = () => {
  const { id } = useParams();
  const [resume, setResume] = useState(null);

  useEffect(() => {
    const fetchResume = async () => {
      try {
        const response = await getResumeById(id);
        setResume(response.data);
      } catch (error) {
        console.error('Error fetching resume:', error);
      }
    };
    fetchResume();
  }, [id]);

  if (!resume) return <p className="text-center  mt-10">Loading...</p>;

  return (
    <div className="min-h-screen  p-6 flex items-center justify-center">
      <div className="bg-white shadow-lg rounded-lg max-w-lg w-full p-8 space-y-6">
        <h2 className="text-3xl font-bold text-gray-800 text-center">Resume Details</h2>

        <div className="space-y-4">
          <p className="text-gray-700">
            <span className="font-semibold">Email:</span> {resume.email}
          </p>
          <p className="text-gray-700">
            <span className="font-semibold">Skills:</span> {resume.skills.join(', ')}
          </p>
        </div>

        <div>
          <h3 className="text-2xl font-semibold text-gray-800 mb-3">Interview Questions</h3>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            {resume.interviewQuestions.map((question, index) => (
              <li key={index}>{question}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ResumeDetail;
