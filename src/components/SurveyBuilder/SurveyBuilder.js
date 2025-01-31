import React, { useState } from 'react';
import './SurveyBuilder.css';

const SurveyBuilder = () => {
  const [components] = useState([
    { 
      id: 'text', 
      title: 'Add your question here', 
      icon: 'T',
      type: 'text-input'
    },
    { 
      id: 'rating', 
      title: 'Add your question here', 
      icon: '★',
      type: 'rating'
    },
    { 
      id: 'radio', 
      title: 'Add your question here', 
      icon: '○',
      type: 'radio'
    },
    { 
      id: 'dropdown', 
      title: 'Add your question here', 
      icon: '▼',
      type: 'dropdown'
    },
    { 
      id: 'checkbox', 
      title: 'Add your question here', 
      icon: '☐',
      type: 'checkbox'
    }
  ]);

  const [survey, setSurvey] = useState({
    title: '',
    questions: []
  });

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
        ...componentData
      };
      
      setSurvey(prev => ({
        ...prev,
        questions: [...prev.questions, newQuestion]
      }));
    } catch (error) {
      console.error('Drop error:', error);
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
                  <input
                    type="text"
                    value={question.title}
                    onChange={(e) => {
                      const newQuestions = [...survey.questions];
                      newQuestions[index].title = e.target.value;
                      setSurvey({ ...survey, questions: newQuestions });
                    }}
                    placeholder="Add your question here"
                  />
                  {question.type === 'radio' && (
                    <div className="options-container">
                      <div className="option">
                        <input type="radio" disabled />
                        <span>Option 1</span>
                      </div>
                      <div className="option">
                        <input type="radio" disabled />
                        <span>Option 2</span>
                      </div>
                    </div>
                  )}
                  {question.type === 'rating' && (
                    <div className="rating-preview">
                      {[1,2,3,4,5].map(star => (
                        <span key={star} className="star">★</span>
                      ))}
                    </div>
                  )}
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