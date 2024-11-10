// src/pages/UpdateResumePage.js

import React from 'react';
import ResumeUpdateForm from '../components/ResumeUpdateForm';
import { useParams } from 'react-router-dom';

function UpdateResumePage() {
  const { id } = useParams(); // Assuming you're passing the resume ID in the URL

  return (
    <div>

      <ResumeUpdateForm resumeId={id} />
    </div>
  );
}

export default UpdateResumePage;
