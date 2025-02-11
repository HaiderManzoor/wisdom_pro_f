
import React from 'react';
import Header from '../Header/Header';
import supabase from '../../supabaseClient'; 
import './SurveyPreview.css';

  const SurveyPreview = ({ survey, onClose }) => {
    const handleViewInsights = async () => {
        console.log("Attempting to store survey data:", survey);
        const { data: surveyData, error: surveyError } = await supabase
    .from('surveys')
    .insert([{ title: survey.title, user_id: 1 }]) 
    .select("*")
    .eq('user_id', 1)
    .order('created_at', { ascending: false })
    .limit(1); 
    console.log(surveyData,'surveyData'); 


      if (surveyError) {
        console.error('Error storing survey data:', surveyError);
        return;
      }

      console.log("Preparing to store questions:", survey.questions);
      // console.log(surveyData,'length',surveyData.length);

      if (surveyData && surveyData.length >= 0) {
    const questionPromises = survey.questions.map(question => {
      const questionData = {
          survey_id: surveyData[0].id,
          question_text: question.title,  
          question_type: question.type,
          options: JSON.stringify(question.options || []) 
        };
        console.log("Inserting question data:", questionData);
        return supabase.from('questions').insert([questionData]);
      });

    try {
      const results = await Promise.all(questionPromises);
      results.forEach((result, index) => {
        if (result.error) {
          console.error(`Error storing question ${index + 1}:`, result.error);
        } else {
          console.log(`Question ${index + 1} stored successfully.`);
        }
      });
    } catch (error) {
      console.error('Error processing question inserts:', error);
    }
  }

    };

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
            <button className="action-btn" onClick={handleViewInsights}>
              <span className="icon">👁</span> Submit Survey
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
