import React from 'react';

const SurveyDetail = ({ survey }) => {
  return (
    <div>
      <h2 className="text-xl font-bold mb-2">{survey.title}</h2>
      {survey.questions.map((question, index) => (
        <div key={index} className="mb-4">
          <p className="font-semibold">{question.question}</p>
          {question.type === 'MULTIPLE_CHOICE' && (
            <ul>
              {question.options.map((option, optionIndex) => (
                <li key={optionIndex}>{option}</li>
              ))}
            </ul>
          )}
          {question.type === 'RADIO_BUTTON' && (
            <form>
              {question.options.map((option, optionIndex) => (
                <div key={optionIndex} className="mb-2">
                  <input type="radio" id={`option-${index}-${optionIndex}`} name={`option-${index}`} value={option} />
                  <label htmlFor={`option-${index}-${optionIndex}`}>{option}</label>
                </div>
              ))}
            </form>
          )}
          {/* Add rendering for other question types */}
        </div>
      ))}
      <p className="font-semibold">{survey.thankYouMessage}</p>
    </div>
  );
};

export default SurveyDetail;
