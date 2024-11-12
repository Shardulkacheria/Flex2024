import React, { useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const UpdatePassword = () => {
  const { token } = useParams();
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleUpdatePassword = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`/api/auth/update-password/${token}`, { newPassword });
      setMessage('Password updated successfully!');
    } catch (error) {
      setMessage('Error updating password');
    }
  };

  return (
    <form onSubmit={handleUpdatePassword}>
      <input 
        type="password" 
        value={newPassword} 
        onChange={(e) => setNewPassword(e.target.value)} 
        placeholder="Enter new password" 
        required 
      />
      <button type="submit">Update Password</button>
      {message && <p>{message}</p>}
    </form>
  );
};

export default UpdatePassword;