import React from 'react';
import './SurveyForm.css';
import { FaLightbulb } from 'react-icons/fa';

const SurveyForm = () => {
  return (
    <div className="survey-form-container">
      <div className="survey-form-content">
        <div className="form-header">
          <h1>Create New Survey</h1>
          <p>Turn Survey Into Actionable Insights</p>
        </div>

        <div className="form-body">
          <h2>Tell us about the survey you want to create</h2>
          
          <div className="form-group">
            <label>Title of your survey*</label>
            <input 
              type="text"
              placeholder="Customer satisfaction Survey"
              className="form-input"
            />
          </div>

          <div className="sample-prompts-section">
            <div className="sample-prompt-header">
              <FaLightbulb className="bulb-icon" />
              <span>Use a sample prompt for your survey</span>
            </div>

            <div className="prompt-cards">
              {[1, 2, 3, 4].map((index) => (
                <div key={index} className="prompt-card">
                  <h3>Customer Satisfaction</h3>
                  <p>
                    I work for a consulting firm and we're looking to gather feedback 
                    from our clients about their experience working with us. The survey should 
                    cover customer satisfaction...
                  </p>
                  <button className="prompt-button">Title of your survey*</button>
                </div>
              ))}
            </div>
          </div>

          <div className="form-group">
            <label>Write a prompt to generate your survey*</label>
            <textarea 
              className="form-textarea"
              placeholder="I work for a consulting firm and we're looking to gather feedback from our clients about their experience working with us. The survey should cover customer satisfaction..."
            />
            <span className="character-count">Tell us what you want (3000 characters)</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SurveyForm;