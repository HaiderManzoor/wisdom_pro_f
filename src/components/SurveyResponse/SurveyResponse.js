import React, { useState } from 'react';
import supabase from '../../supabaseClient';
import './SurveyResponse.css';

const SurveyResponse = ({ survey, onClose }) => {
    const [responses, setResponses] = useState([]);

    const handleResponseChange = (questionId, value) => {
        setResponses(prev => {
            const updatedResponses = prev.filter(r => r.question_id !== questionId);
            return [...updatedResponses, { question_id: questionId, value }];
        });
    };

    // const handleSubmitResponses = async () => {
    //     console.log("Submitting responses:", responses);
    
    //     if (responses.length === 0) {
    //         alert("Please answer at least one question.");
    //         return;
    //     }
    
    //     try {
    //         const responsePromises = responses.map(response => ({
    //             question_id: parseInt(response.question_id, 10), // Ensure it's an integer
    //             user_id: 1, // Assuming user_id is hardcoded
    //             response: JSON.stringify(response.value) // Ensure it's stored as JSON
    //         }));
    
    //         console.log("Formatted responses:", responsePromises);
    
    //         const { error } = await supabase.from('responses').insert(responsePromises);
    
    //         if (error) {
    //             console.error("Error inserting responses:", error);
    //             return;
    //         }
    
    //         alert("Responses submitted successfully!");
    //         onClose();
    //     } catch (error) {
    //         console.error("Response submission error:", error);
    //     }
    // };
    const handleSubmitResponses = async () => {
        try {
            // Ensure you get the latest survey ID
            const { data: latestSurvey, error: surveyError } = await supabase
                .from('surveys')
                .select('id')
                .order('created_at', { ascending: false })
                .limit(1);
    
            if (surveyError || !latestSurvey || latestSurvey.length === 0) {
                console.error('Error fetching latest survey:', surveyError);
                return;
            }
    
            const surveyId = latestSurvey[0].id;
    
            // Fetch all questions related to the survey
            const { data: questions, error: questionsError } = await supabase
                .from('questions')
                .select('id, question_text')
                .eq('survey_id', surveyId);
    
            if (questionsError || !questions || questions.length === 0) {
                console.error('Error fetching questions:', questionsError);
                return;
            }
    
            // Map responses to correct question_id
            const responsesToInsert = survey.questions.map((q) => {
                const matchedQuestion = questions.find((dbQuestion) => dbQuestion.question_text === q.title);
                if (!matchedQuestion) {
                    console.error(`No matching question found for: ${q.title}`);
                    return null;
                }
    
                return {
                    question_id: matchedQuestion.id, // Correct question ID from DB
                    user_id: 1, // Replace with dynamic user ID if needed
                    response: JSON.stringify(q.value || ''),
                };
            }).filter(response => response !== null); // Filter out invalid mappings
    
            if (responsesToInsert.length === 0) {
                console.error('No valid responses to insert.');
                return;
            }
    
            // Insert responses into the database
            const { error: responseError } = await supabase.from('responses').insert(responsesToInsert);
    
            if (responseError) {
                console.error('Error inserting responses:', responseError);
            } else {
                console.log('Responses stored successfully!');
            }
        } catch (error) {
            console.error('Unexpected error submitting responses:', error);
        }
    };
    
    
    return (
        <div className="response-container">
            <h2>{survey.title}</h2>
            <p>Fill out the survey below</p>

            {survey.questions.map((question, index) => (
                <div key={index} className="question">
                    <p>{question.title}</p>

                    {question.type === "text" && (
                        <input
                            type="text"
                            onChange={(e) => handleResponseChange(question.id, e.target.value)}
                            placeholder="Your answer"
                        />
                    )}

                    {question.type === "multiple-choice" && (
                        <select onChange={(e) => handleResponseChange(question.id, e.target.value)}>
                            {question.options.map((option, idx) => (
                                <option key={idx} value={option}>{option}</option>
                            ))}
                        </select>
                    )}

                    {question.type === "rating" && (
                        <div className="rating-group">
                            {[1, 2, 3, 4, 5].map(value => (
                                <span
                                    key={value}
                                    className={`star ${responses.find(r => r.question_id === question.id)?.value >= value ? 'selected' : ''}`}
                                    onClick={() => handleResponseChange(question.id, value)}
                                >★</span>
                            ))}
                        </div>
                    )}
                </div>
            ))}

            <button className="submit-btn" onClick={handleSubmitResponses}>Submit Responses</button>
        </div>
    );
};

export default SurveyResponse;
