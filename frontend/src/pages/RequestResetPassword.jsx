import React, { useState } from 'react';
import axios from 'axios';

const RequestResetPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleRequestReset = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/auth/reset-password', { email });
      setMessage('Reset link sent! Check your email.');
    } catch (error) {
      setMessage('Error sending reset link');
    }
  };

  return (
    <form onSubmit={handleRequestReset}>
      <input 
        type="email" 
        value={email} 
        onChange={(e) => setEmail(e.target.value)} 
        placeholder="Enter your email" 
        required 
      />
      <button type="submit">Request Password Reset</button>
      {message && <p>{message}</p>}
    </form>
  );
};

export default RequestResetPassword;