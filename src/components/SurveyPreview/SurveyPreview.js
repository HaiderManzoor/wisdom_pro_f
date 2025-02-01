import React from 'react';
import Header from '../Header/Header';
import './SurveyPreview.css';

const SurveyPreview = ({ survey, onClose }) => {
  return (
    <div className="preview-container">
      <Header />
      
      <main className="preview-main">
        <div className="preview-title-section">
          <h1>Preview Your Survey</h1>
          <p>Turn Survey Into Actionable Insights</p>
        </div>

        <div className="survey-preview-card">
          <div className="survey-form">
            <h2 className="form-title">{survey.title || "Untitled Survey"}</h2>
            <p className="form-description">Please take a few moments to complete this survey</p>

            <div className="questions-list">
              {survey.questions.map((question, index) => (
                <div key={index} className="question-item">
                  <label className="question-label">
                    {question.title}
                    {question.required && <span className="required">*</span>}
                  </label>
                  
                  {question.type === 'text' && (
                    <input 
                      type="text" 
                      className="form-input"
                      placeholder="Short answer text"
                    />
                  )}

                  {question.type === 'written-answer' && (
                    <textarea 
                      className="form-textarea"
                      placeholder="Long answer text"
                      rows="4"
                    ></textarea>
                  )}

                  {question.type === 'multiple-choice' && (
                    <div className="radio-group">
                      {question.options?.map((option, optIndex) => (
                        <label key={optIndex} className="radio-option">
                          <input 
                            type="radio" 
                            name={`question_${index}`}
                            className="radio-input"
                          />
                          <span className="radio-label">{option}</span>
                        </label>
                      ))}
                    </div>
                  )}

                  {question.type === 'rating' && (
                    <div className="rating-group">
                      {[1, 2, 3, 4, 5].map((value) => (
                        <label key={value} className="rating-option">
                          <input 
                            type="radio" 
                            name={`question_${index}`}
                            value={value}
                            className="rating-input"
                          />
                          <span className="star">★</span>
                        </label>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="preview-actions">
          <div className="preview-size">1139 x 1090</div>
          <div className="action-buttons">
            <button className="action-btn">
              <span className="icon">👁</span> View insights
            </button>
            <button className="action-btn" onClick={onClose}>
              <span className="icon">✕</span> Close preview
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default SurveyPreview;
