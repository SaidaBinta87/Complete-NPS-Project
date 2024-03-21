import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SurveyForm from './SurveyForm';
import SurveyDetail from './SurveyDetails';

const DynamicSurvey = () => {
  const [surveys, setSurveys] = useState([]);
  const [selectedSurvey, setSelectedSurvey] = useState(null);

  useEffect(() => {
    fetchSurveys();
  }, []);

  const fetchSurveys = async () => {
    try {
      const response = await axios.get('http://localhost:4000/api/v1/dynamicSurvey/surveys');
      setSurveys(response.data);
    } catch (error) {
      console.error('Error fetching surveys:', error);
    }
  };

  const handleSurveySubmit = async (formData) => {
    console.log(formData);
    try {
      if (selectedSurvey) {
        await axios.put(`http://localhost:4000/api/v1/dynamicSurvey/surveys/${selectedSurvey._id}`, formData);
      } else {
        await axios.post('http://localhost:4000/api/v1/dynamicSurvey/surveys', formData);
      }
      fetchSurveys();
      setSelectedSurvey(null);
    } catch (error) {
      console.error('Error submitting survey:', error);
    }
  };

  const handleSurveySelect = (survey) => {
    setSelectedSurvey(survey);
  };

  const handleSurveyDelete = async (surveyId) => {
    try {
      await axios.delete(`http://localhost:4000/api/v1/dynamicSurvey/surveys/${surveyId}`);
      fetchSurveys();
    } catch (error) {
      console.error('Error deleting survey:', error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Surveys</h1>
      <div className="grid grid-cols-3 gap-4">
        <div>
          <h2 className="text-xl font-bold mb-2">Create/Edit Survey</h2>
          <SurveyForm onSubmit={handleSurveySubmit} initialData={selectedSurvey} />
        </div>
        <div>
          <h2 className="text-xl font-bold mb-2">Surveys List</h2>
          <ul>
            {surveys.map(survey => (
              <li key={survey._id} className="mb-4">
                <p onClick={() => handleSurveySelect(survey)} className="cursor-pointer text-blue-500 font-semibold">{survey.title

}</p>
                <button onClick={() => handleSurveyDelete(survey._id)} className="text-red-500 font-semibold ml-2">Delete</button>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="text-xl font-bold mb-2">Survey Detail</h2>
          {selectedSurvey && <SurveyDetail survey={selectedSurvey} />}
        </div>
      </div>
    </div>
  );
};

export default DynamicSurvey;