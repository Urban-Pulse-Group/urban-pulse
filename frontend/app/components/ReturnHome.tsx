import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
const ReturnHomeButton: React.FC = () => {
    const navigate = useNavigate();
  
    const handleClick = () => {
      navigate('/'); // Navigate to the home route (/)
    };
  
    return (
      <ArrowLeft onClick={handleClick}>Return to Home</ArrowLeft>
    );
  };
  
  export default ReturnHomeButton;