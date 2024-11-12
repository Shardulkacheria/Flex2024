import axios from 'axios';

export const API_URL = 'https://flex2024.onrender.com/api';

export const uploadResume = (file) => {
  const formData = new FormData();
  formData.append('resume', file);

  formData.append('username',   localStorage.getItem("username")); // Add the username here
  return axios.post(`${API_URL}/resume/upload`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
};

export const getResumeById = (id) => axios.get(`${API_URL}/resume/${id}`);

export const getAllResumes = async () => {
  const username = localStorage.getItem("username"); // Get the username from local storage
  return await axios.get(`${API_URL}/resumes`, {
    params: { username } // Pass username as a query parameter
  });
};

export const deleteResume = async (id) => {
  return await axios.delete(`${API_URL}/resumes/${id}`);
};

export const updateResume = async (id, updatedData) => {
  return await axios.put(`${API_URL}/resume/${id}`, updatedData);
};

