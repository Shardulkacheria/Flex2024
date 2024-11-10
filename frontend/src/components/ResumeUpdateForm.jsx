import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getResumeById, updateResume } from '../api/resumeApi'; // Adjust the path as necessary

const ResumeUpdateForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [resume, setResume] = useState({
    name: '',
    email: '',
    skills: []
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    getResumeById(id)
      .then(response => {
        setResume(response.data);
        setLoading(false);
      })
      .catch(err => {
        setError('Failed to fetch resume');
        setLoading(false);
      });
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setResume(prevResume => ({
      ...prevResume,
      [name]: value
    }));
  };

  const handleSkillsChange = (e) => {
    const skills = e.target.value.split(',').map(skill => skill.trim());
    setResume(prevResume => ({
      ...prevResume,
      skills
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    updateResume(id, resume)
      .then(() => {
        navigate(`/resume/${id}`);
      })
      .catch(err => {
        setError('Failed to update resume');
        setLoading(false);
      });
  };

  if (loading) return <div className="text-center text-gray-500 mt-10">Loading...</div>;
  if (error) return <div className="text-center text-red-500 mt-10">{error}</div>;

  return (
    <div className="flex justify-center items-center min-h-screen ">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-lg w-full space-y-6">
        <h2 className="text-2xl font-bold text-gray-800 text-center">Update Resume</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-gray-700 font-semibold mb-1">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={resume.name}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-gray-700 font-semibold mb-1">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={resume.email}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label htmlFor="skills" className="block text-gray-700 font-semibold mb-1">Skills (comma-separated):</label>
            <input
              type="text"
              id="skills"
              value={resume.skills.join(', ')}
              onChange={handleSkillsChange}
              required
              className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="text-center">
            <button
              type="submit"
              disabled={loading}
              className={`w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-200 ${loading && 'opacity-50 cursor-not-allowed'}`}
            >
              {loading ? 'Updating...' : 'Update Resume'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ResumeUpdateForm;
