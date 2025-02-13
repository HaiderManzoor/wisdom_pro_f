
// import React, { useState } from 'react';
// import Header from '../Header/Header';
// import supabase from '../../supabaseClient';
// import SurveyResponse from '../SurveyResponse/SurveyResponse'; // Import the new response form
// import './SurveyPreview.css';

// const SurveyPreview = ({ survey, onClose }) => {
//     const [showResponseForm, setShowResponseForm] = useState(false);

//     const handleViewInsights = async () => {
//         console.log("Attempting to store survey data:", survey);
//         const { data: surveyData, error: surveyError } = await supabase
//             .from('surveys')
//             .insert([{ title: survey.title, user_id: 1 }])
//             .select("*")
//             .order('created_at', { ascending: false })
//             .limit(1);

//         if (surveyError) {
//             console.error("Error storing survey data:", surveyError);
//             return;
//         }

//         console.log("Preparing to store questions:", survey.questions);

//         if (surveyData && surveyData.length > 0) {
//             const surveyId = surveyData[0].id;

//             const questionPromises = survey.questions.map(question => ({
//                 survey_id: surveyId,
//                 question_text: question.title,
//                 question_type: question.type,
//                 options: question.options ? JSON.stringify(question.options) : null
//             }));

//             const { error: questionError } = await supabase.from('questions').insert(questionPromises);

//             if (questionError) {
//                 console.error("Error inserting questions:", questionError);
//                 return;
//             }

//             console.log("Survey and questions inserted successfully!");
//         }
//     };

//     return (
//         <div className="preview-container">
//             <Header />

//             <main className="preview-main">
//                 <div className="preview-title-section">
//                     <h1>Preview Your Survey</h1>
//                     <p>Turn Survey Into Actionable Insights</p>
//                 </div>

//                 {!showResponseForm ? (
//                     <>
//                         <div className="survey-preview-card">
//                             <div className="survey-form">
//                                 <h2 className="form-title">{survey.title || "Untitled Survey"}</h2>
//                                 <p className="form-description">Please take a few moments to complete this survey</p>

//                                 <div className="questions-list">
//                                     {survey.questions.map((question, index) => (
//                                         <div key={index} className="question-item">
//                                             <label className="question-label">
//                                                 {question.title}
//                                             </label>
//                                         </div>
//                                     ))}
//                                 </div>
//                             </div>
//                         </div>

//                         <div className="preview-actions">
//                             <button className="action-btn" onClick={handleViewInsights}>
//                                 <span className="icon">👁</span> Submit Survey
//                             </button>
//                             <button className="action-btn" onClick={() => setShowResponseForm(true)}>
//                                 <span className="icon">✏️</span> Submit a Response
//                             </button>
//                             <button className="action-btn" onClick={onClose}>
//                                 <span className="icon">✕</span> Close preview
//                             </button>
//                         </div>
//                     </>
//                 ) : (
//                     <SurveyResponse survey={survey} onClose={() => setShowResponseForm(false)} />
//                 )}
//             </main>
//         </div>
//     );
// };

// export default SurveyPreview;
import React, { useState } from 'react';
import Header from '../Header/Header';
import supabase from '../../supabaseClient';
import SurveyResponse from '../SurveyResponse/SurveyResponse'; // Import the response form
import './SurveyPreview.css';

const SurveyPreview = ({ survey, onClose }) => {
    const [showResponseForm, setShowResponseForm] = useState(false);
    const [responses, setResponses] = useState(
        survey.questions.reduce((acc, question, index) => {
            acc[index] = question.type === "multiple-choice" ? "" : "";
            return acc;
        }, {})
    );

    const handleResponseChange = (index, value) => {
        setResponses(prevResponses => ({
            ...prevResponses,
            [index]: value
        }));
    };

    const handleViewInsights = async () => {
        console.log("Attempting to store survey data:", survey);
        console.log("User responses:", responses);

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

            const questionPromises = survey.questions.map((question, index) => ({
                survey_id: surveyId,
                question_text: question.title,
                question_type: question.type,
                options: JSON.stringify(question.options || []),
            }));

            const { data: insertedQuestions, error: questionError } = await supabase
                .from('questions')
                .insert(questionPromises)
                .select("id, question_text");

            if (questionError) {
                console.error("Error inserting questions:", questionError);
                return;
            }

            console.log("Survey and questions inserted successfully!");

            // Store responses using correct question IDs
            const responsesToInsert = insertedQuestions.map((dbQuestion, index) => ({
                question_id: dbQuestion.id,
                user_id: 1, // Change as needed for actual user authentication
                response: JSON.stringify(responses[index] || ""),
            }));

            const { error: responseError } = await supabase.from('responses').insert(responsesToInsert);

            if (responseError) {
                console.error("Error inserting responses:", responseError);
            } else {
                console.log("Responses stored successfully!");
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

                {!showResponseForm ? (
                    <>
                        <div className="survey-preview-card">
                            <div className="survey-form">
                                <h2 className="form-title">{survey.title || "Untitled Survey"}</h2>
                                <p className="form-description">Please review your responses</p>

                                <div className="questions-list">
                                    {survey.questions.map((question, index) => (
                                        <div key={index} className="question-item">
                                            <label className="question-label">
                                                {question.title}
                                                {question.required && <span className="required">*</span>}
                                            </label>

                                            {/* Short Answer */}
                                            {question.type === 'text' && (
                                                <input
                                                    type="text"
                                                    className="form-input"
                                                    placeholder="Short answer text"
                                                    value={responses[index] || ""}
                                                    onChange={(e) => handleResponseChange(index, e.target.value)}
                                                />
                                            )}

                                            {/* Long Answer */}
                                            {question.type === 'written-answer' && (
                                                <textarea
                                                    className="form-textarea"
                                                    placeholder="Long answer text"
                                                    rows="4"
                                                    value={responses[index] || ""}
                                                    onChange={(e) => handleResponseChange(index, e.target.value)}
                                                ></textarea>
                                            )}

                                            {/* Multiple Choice */}
                                            {question.type === 'multiple-choice' && (
                                                <div className="radio-group">
                                                    {question.options?.map((option, optIndex) => (
                                                        <label key={optIndex} className="radio-option">
                                                            <input
                                                                type="radio"
                                                                name={`question_${index}`}
                                                                className="radio-input"
                                                                checked={responses[index] === option}
                                                                onChange={() => handleResponseChange(index, option)}
                                                            />
                                                            <span className="radio-label">{option}</span>
                                                        </label>
                                                    ))}
                                                </div>
                                            )}

                                            {/* Rating (Stars) */}
                                            {question.type === 'rating' && (
                                                <div className="rating-group">
                                                    {[1, 2, 3, 4, 5].map((value) => (
                                                        <label key={value} className="rating-option">
                                                            <input
                                                                type="radio"
                                                                name={`question_${index}`}
                                                                value={value}
                                                                className="rating-input"
                                                                checked={responses[index] === value}
                                                                onChange={() => handleResponseChange(index, value)}
                                                            />
                                                            <span className={`star ${responses[index] >= value ? 'selected' : ''}`}>★</span>
                                                        </label>
                                                    ))}
                                                </div>
                                            )}

                                            {/* Date and Time Selection */}
                                            {question.type === 'date' && (
                                                <input
                                                    type="datetime-local"
                                                    className="form-date"
                                                    value={responses[index] || ""}
                                                    onChange={(e) => handleResponseChange(index, e.target.value)}
                                                />
                                            )}
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
