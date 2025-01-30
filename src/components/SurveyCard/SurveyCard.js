import React from 'react';
import './SurveyCard.css';

const SurveyCard = ({ title, date }) => {
  return (
    <div className="survey-card">
      <div className="card-header">
        <span className="status">Draft</span>
        <button className="more-options">...</button>
      </div>
      <div className="card-content">
        <h3>{title}</h3>
        <div className="update-info">
          <span>Updated: {date}</span>
        </div>
      </div>
      <div className="card-footer">
        <div className="status-check">
          <span className="check">✓</span>
          <span>No issues</span>
        </div>
        <button className="send-button">Send survey</button>
      </div>
    </div>
  );
};

export default SurveyCard;