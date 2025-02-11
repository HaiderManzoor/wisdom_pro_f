
import React, { useState } from 'react';
import Header from '../Header/Header';
import supabase from '../../supabaseClient';
import SurveyResponse from '../SurveyResponse/SurveyResponse'; // Import the new response form
import './SurveyPreview.css';

const SurveyPreview = ({ survey, onClose }) => {
    const [showResponseForm, setShowResponseForm] = useState(false);

    const handleViewInsights = async () => {
        console.log("Attempting to store survey data:", survey);
        const { data: surveyData, error: surveyError } = await supabase
            .from('surveys')
            .insert([{ title: survey.title, user_id: 1 }])
            .select("*")
            .order('created_at', { ascending: false })
            .limit(1);

        if (surveyError) {
            console.error("Error storing survey data:", surveyError);
            return;
        }

        console.log("Preparing to store questions:", survey.questions);

        if (surveyData && surveyData.length > 0) {
            const surveyId = surveyData[0].id;

            const questionPromises = survey.questions.map(question => ({
                survey_id: surveyId,
                question_text: question.title,
                question_type: question.type,
                options: question.options ? JSON.stringify(question.options) : null
            }));

            const { error: questionError } = await supabase.from('questions').insert(questionPromises);

            if (questionError) {
                console.error("Error inserting questions:", questionError);
                return;
            }

            console.log("Survey and questions inserted successfully!");
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

                {!showResponseForm ? (
                    <>
                        <div className="survey-preview-card">
                            <div className="survey-form">
                                <h2 className="form-title">{survey.title || "Untitled Survey"}</h2>
                                <p className="form-description">Please take a few moments to complete this survey</p>

                                <div className="questions-list">
                                    {survey.questions.map((question, index) => (
                                        <div key={index} className="question-item">
                                            <label className="question-label">
                                                {question.title}
                                            </label>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="preview-actions">
                            <button className="action-btn" onClick={handleViewInsights}>
                                <span className="icon">👁</span> Submit Survey
                            </button>
                            <button className="action-btn" onClick={() => setShowResponseForm(true)}>
                                <span className="icon">✏️</span> Submit a Response
                            </button>
                            <button className="action-btn" onClick={onClose}>
                                <span className="icon">✕</span> Close preview
                            </button>
                        </div>
                    </>
                ) : (
                    <SurveyResponse survey={survey} onClose={() => setShowResponseForm(false)} />
                )}
            </main>
        </div>
    );
};

export default SurveyPreview;
