import React, { useState } from 'react';
import './SurveyBuilder.css';

const SurveyBuilder = () => {
  const [components] = useState([
    { 
      id: 'text', 
      title: 'Text',
      icon: 'Tt',
      type: 'text'
    },
    { 
      id: 'written-answer', 
      title: 'Written answer',
      icon: '✎',
      type: 'written-answer'
    },
    { 
      id: 'multiple-choice', 
      title: 'Multiple choice',
      icon: '◉',
      type: 'multiple-choice'
    },
    { 
      id: 'rating', 
      title: 'Rating',
      icon: '★',
      type: 'rating'
    },
    { 
      id: 'date', 
      title: 'Date and time',
      icon: '📅',
      type: 'date'
    },
    { 
      id: 'location', 
      title: 'Location',
      icon: '📍',
      type: 'location'
    },
    { 
      id: 'attachment', 
      title: 'Attachment',
      icon: '📎',
      type: 'attachment'
    },
    { 
      id: 'camera', 
      title: 'Camera',
      icon: '📷',
      type: 'camera'
    },
    { 
      id: 'signature', 
      title: 'Signature',
      icon: '✍',
      type: 'signature'
    },
    { 
      id: 'survey', 
      title: 'Survey',
      icon: '📝',
      type: 'survey'
    },
    { 
      id: 'range', 
      title: 'Range',
      icon: '⟺',
      type: 'range'
    }
  ]);

  const [survey, setSurvey] = useState({
    title: '',
    questions: []
  });

  const handleQuestionChange = (index, field, value) => {
    const newQuestions = [...survey.questions];
    newQuestions[index][field] = value;
    setSurvey({ ...survey, questions: newQuestions });
  };

  const handleOptionChange = (questionIndex, optionIndex, value) => {
    const newQuestions = [...survey.questions];
    newQuestions[questionIndex].options[optionIndex] = value;
    setSurvey({ ...survey, questions: newQuestions });
  };

  const addOption = (questionIndex) => {
    const newQuestions = [...survey.questions];
    if (!newQuestions[questionIndex].options) {
      newQuestions[questionIndex].options = [];
    }
    newQuestions[questionIndex].options.push(`Option ${newQuestions[questionIndex].options.length + 1}`);
    setSurvey({ ...survey, questions: newQuestions });
  };

  const handleDragStart = (e, component) => {
    try {
      e.dataTransfer.setData('application/json', JSON.stringify(component));
      e.target.classList.add('dragging');
    } catch (error) {
      console.error('Drag start error:', error);
    }
  };

  const handleDragEnd = (e) => {
    e.target.classList.remove('dragging');
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.currentTarget.classList.add('drag-over');
  };

  const handleDragLeave = (e) => {
    e.currentTarget.classList.remove('drag-over');
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.currentTarget.classList.remove('drag-over');
    
    try {
      const componentData = JSON.parse(e.dataTransfer.getData('application/json'));
      const newQuestion = {
        id: Date.now(),
        title: '',
        ...componentData,
        options: componentData.type === 'multiple-choice' ? ['Option 1', 'Option 2'] : []
      };
      
      setSurvey(prev => ({
        ...prev,
        questions: [...prev.questions, newQuestion]
      }));
    } catch (error) {
      console.error('Drop error:', error);
    }
  };

  const renderQuestionPreview = (question, index) => {
    switch(question.type) {
      case 'text':
        return (
          <div className="question-preview">
            <input
              type="text"
              value={question.title}
              onChange={(e) => handleQuestionChange(index, 'title', e.target.value)}
              placeholder="Short text question"
              className="question-input"
            />
            <input
              type="text"
              disabled
              placeholder="Short answer text"
              className="answer-preview"
            />
          </div>
        );

      case 'written-answer':
        return (
          <div className="question-preview">
            <input
              type="text"
              value={question.title}
              onChange={(e) => handleQuestionChange(index, 'title', e.target.value)}
              placeholder="Long answer question"
              className="question-input"
            />
            <textarea
              disabled
              placeholder="Long answer text"
              className="answer-textarea"
            ></textarea>
          </div>
        );

      case 'multiple-choice':
        return (
          <div className="question-preview">
            <input
              type="text"
              value={question.title}
              onChange={(e) => handleQuestionChange(index, 'title', e.target.value)}
              placeholder="Multiple choice question"
              className="question-input"
            />
            <div className="options-container">
              {question.options?.map((option, optIndex) => (
                <div key={optIndex} className="option">
                  <input type="radio" disabled />
                  <input
                    type="text"
                    value={option}
                    onChange={(e) => handleOptionChange(index, optIndex, e.target.value)}
                    placeholder={`Option ${optIndex + 1}`}
                    className="option-input"
                  />
                </div>
              ))}
              <button 
                className="add-option-btn"
                onClick={() => addOption(index)}
              >
                Add Option
              </button>
            </div>
          </div>
        );

      case 'rating':
        return (
          <div className="question-preview">
            <input
              type="text"
              value={question.title}
              onChange={(e) => handleQuestionChange(index, 'title', e.target.value)}
              placeholder="Rating question"
              className="question-input"
            />
            <div className="rating-preview">
              {[1,2,3,4,5].map(star => (
                <span key={star} className="star">★</span>
              ))}
            </div>
          </div>
        );

      case 'date':
        return (
          <div className="question-preview">
            <input
              type="text"
              value={question.title}
              onChange={(e) => handleQuestionChange(index, 'title', e.target.value)}
              placeholder="Date question"
              className="question-input"
            />
            <input
              type="date"
              disabled
              className="date-preview"
            />
          </div>
        );

      case 'location':
        return (
          <div className="question-preview">
            <input
              type="text"
              value={question.title}
              onChange={(e) => handleQuestionChange(index, 'title', e.target.value)}
              placeholder="Location question"
              className="question-input"
            />
            <div className="location-preview">
              <span className="preview-icon">📍</span> Select location
            </div>
          </div>
        );

      case 'attachment':
        return (
          <div className="question-preview">
            <input
              type="text"
              value={question.title}
              onChange={(e) => handleQuestionChange(index, 'title', e.target.value)}
              placeholder="Attachment question"
              className="question-input"
            />
            <div className="attachment-preview">
              <span className="preview-icon">📎</span> Add attachment
            </div>
          </div>
        );

      case 'camera':
        return (
          <div className="question-preview">
            <input
              type="text"
              value={question.title}
              onChange={(e) => handleQuestionChange(index, 'title', e.target.value)}
              placeholder="Camera question"
              className="question-input"
            />
            <div className="camera-preview">
              <span className="preview-icon">📷</span> Take photo
            </div>
          </div>
        );

      case 'signature':
        return (
          <div className="question-preview">
            <input
              type="text"
              value={question.title}
              onChange={(e) => handleQuestionChange(index, 'title', e.target.value)}
              placeholder="Signature question"
              className="question-input"
            />
            <div className="signature-preview">
              <span className="preview-icon">✍</span> Add signature
            </div>
          </div>
        );

      case 'range':
        return (
          <div className="question-preview">
            <input
              type="text"
              value={question.title}
              onChange={(e) => handleQuestionChange(index, 'title', e.target.value)}
              placeholder="Range question"
              className="question-input"
            />
            <div className="range-preview">
              <input 
                type="range" 
                min="0" 
                max="100" 
                defaultValue="50"
                className="range-input"
                disabled
              />
              <div className="range-labels">
                <span>Poor</span>
                <span>Below Average</span>
                <span>Average</span>
                <span>Good</span>
                <span>Excellent</span>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="survey-builder-container">
      <div className="survey-builder-header">
        <h1>Create New Survey</h1>
        <p>Turn Survey Into Actionable Insights</p>
      </div>

      <div className="survey-builder-content">
        <h2>Make structure of your survey here</h2>
        
        <div className="survey-builder-workspace">
          <div className="available-blocks">
            <h3>Available Blocks</h3>
            <p className="blocks-subtitle">Drag blocks to build your survey structure</p>
            
            <div className="blocks-container">
              {components.map(component => (
                <div
                  key={component.id}
                  className="block-item"
                  draggable="true"
                  onDragStart={(e) => handleDragStart(e, component)}
                  onDragEnd={handleDragEnd}
                >
                  <span className="block-icon">{component.icon}</span>
                  <span className="block-text">{component.title}</span>
                </div>
              ))}
            </div>
          </div>

          <div 
            className="survey-structure"
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <h3>Survey Structure</h3>
            <p className="structure-subtitle">Create your survey structure here</p>
            
            <div className="questions-container">
              {survey.questions.map((question, index) => (
                <div key={question.id} className="question-block">
                  {renderQuestionPreview(question, index)}
                </div>
              ))}
              {survey.questions.length === 0 && (
                <div className="empty-state">
                  Drag blocks here to start building your survey
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SurveyBuilder;