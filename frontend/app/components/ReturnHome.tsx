import React from 'react';
import { useNavigate } from 'react-router-dom';

const ReturnHomeButton: React.FC = () => {
    const navigate = useNavigate();
  
    const handleClick = () => {
      navigate('/'); // Navigate to the home route (/)
    };
  
    return (
      <button onClick={handleClick}>Return to Home</button>
    );
  };
  
  export default ReturnHomeButton;