import React from 'react';
import './CreateSurvey.css';
import { useNavigate } from 'react-router-dom';

const CreateSurvey = () => {
  const navigate = useNavigate();

  const handleStartFromScratch = () => {
    navigate('/survey-form');
  };

  const handleBuildWithAI = () => {
    navigate('/survey-builder');
  };

  return (
    <div className="create-survey-container">
      <div className="create-survey-content">
        <h1>Create New Survey</h1>
        <p className="subtitle">Turn Survey Into Actionable Insights</p>

        <h2 className="section-title">Choose a starting point</h2>

        <div className="options-grid">
        <div className="option-card" onClick={handleBuildWithAI}>
            <div className="icon-container">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" fill="currentColor"/>
              </svg>
              
            </div>
            <h3>Start from scratch</h3>
            <p>Create a survey form from scratch with our easy-to-use builder.</p>
          </div>
          <div className="option-card" onClick={handleStartFromScratch}>
            <div className="icon">
            <span className="plus-icon">+</span>
            </div>
            <h3>Build with AI</h3>
            <p>Type a short prompt. AI will create a tailored survey or a form just for you.</p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default CreateSurvey;