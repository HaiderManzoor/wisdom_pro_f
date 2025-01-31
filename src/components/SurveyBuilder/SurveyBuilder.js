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

  const handleDeleteQuestion = (indexToDelete) => {
    setSurvey(prev => ({
      ...prev,
      questions: prev.questions.filter((_, index) => index !== indexToDelete)
    }));
  };

  const renderQuestionPreview = (question, index) => {
    const questionWrapper = (content) => (
      <div className="question-preview">
        <div className="question-header">
          <input
            type="text"
            value={question.title}
            onChange={(e) => handleQuestionChange(index, 'title', e.target.value)}
            placeholder="Add your question here"
            className="question-input"
          />
          <button 
            className="delete-question"
            onClick={() => handleDeleteQuestion(index)}
          >
            ✕
          </button>
        </div>
        {content}
      </div>
    );

    switch(question.type) {
      case 'text':
        return questionWrapper(
          <input
            type="text"
            disabled
            placeholder="Short answer text"
            className="answer-preview"
          />
        );

      case 'written-answer':
        return questionWrapper(
          <textarea
            disabled
            placeholder="Long answer text"
            className="answer-textarea"
          ></textarea>
        );

      case 'multiple-choice':
        return questionWrapper(
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
        );

      case 'rating':
        return questionWrapper(
          <div className="rating-preview">
            {[1,2,3,4,5].map(star => (
              <span key={star} className="star">★</span>
            ))}
          </div>
        );

      case 'date':
        return questionWrapper(
          <input
            type="date"
            disabled
            className="date-preview"
          />
        );

      case 'location':
        return questionWrapper(
          <div className="location-preview">
            <span className="preview-icon">📍</span> Select location
          </div>
        );

      case 'attachment':
        return questionWrapper(
          <div className="attachment-preview">
            <span className="preview-icon">📎</span> Add attachment
          </div>
        );

      case 'camera':
        return questionWrapper(
          <div className="camera-preview">
            <span className="preview-icon">📷</span> Take photo
          </div>
        );

      case 'signature':
        return questionWrapper(
          <div className="signature-preview">
            <span className="preview-icon">✍</span> Add signature
          </div>
        );

      case 'range':
        return questionWrapper(
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
            <div className="structure-header">
              <div>
                <h3>Survey Structure</h3>
                <p className="structure-subtitle">Create your survey structure here</p>
              </div>
              <button className="preview-survey-btn">
                <span className="preview-icon">👁</span>
                Preview Survey
              </button>
            </div>
            
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