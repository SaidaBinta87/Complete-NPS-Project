import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SurveyForm from '../../components/SurveyForm';

const DynamicSurvey = () => {
    const [survey, setSurvey] = useState(null);
    const userId = sessionStorage.getItem('userId');
    const surveyId = window.location.pathname.split('/').pop(); // Extract surveyId from URL

    useEffect(() => {
        fetchSurvey();
    }, []);

    const fetchSurvey = async () => {
        try {
            const response = await axios.get(`http://localhost:4000/api/v1/dynamicSurvey/surveys/${surveyId}`);
            setSurvey(response.data);
        } catch (error) {
            console.error('Error fetching survey:', error);
        }
    };

    const handleSubmit = async (formData) => {
        try {
            const surveyResponse = {
                userId: userId,
                surveyId: surveyId,
                responses: formData,
            };
            await axios.post('http://localhost:4000/api/v1/response/survey-responses', surveyResponse);
            console.log('Survey response submitted successfully');
        } catch (error) {
            console.error('Error submitting survey response:', error);
        }
    };

    return (
        <div>
            {survey ? <SurveyForm survey={survey} onSubmit={handleSubmit} /> : <p>Loading...</p>}
        </div>
    );
};

export default DynamicSurvey;
