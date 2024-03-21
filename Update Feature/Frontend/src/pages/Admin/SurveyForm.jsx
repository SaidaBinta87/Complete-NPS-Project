import React, { useState } from 'react';

const SurveyForm = ({ onSubmit, initialData }) => {
  const [formData, setFormData] = useState({
    title: initialData ? initialData.title : '',
    questions: initialData ? initialData.questions : [{ type: '', question: '', options: [] }],
    thankYouMessage: initialData ? initialData.thankYouMessage : '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleQuestionChange = (index, e) => {
    const { name, value } = e.target;
    const questions = [...formData.questions];
    questions[index][name] = value;
    setFormData({ ...formData, questions });
  };

  const handleAddQuestion = () => {
    setFormData({
      ...formData,
      questions: [...formData.questions, { type: '', question: '', options: [] }],
    });
  };

  const handleDeleteQuestion = (index) => {
    const questions = [...formData.questions];
    questions.splice(index, 1);
    setFormData({ ...formData, questions });
  };

  const handleAddOption = (index) => {
    const questions = [...formData.questions];
    questions[index].options.push('');
    setFormData({ ...formData, questions });
  };

  const handleOptionChange = (index, optionIndex, e) => {
    const { value } = e.target;
    const questions = [...formData.questions];
    questions[index].options[optionIndex] = value;
    setFormData({ ...formData, questions });
  };

  const handleDeleteOption = (index, optionIndex) => {
    const questions = [...formData.questions];
    questions[index].options.splice(optionIndex, 1);
    setFormData({ ...formData, questions });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedFormData = { ...formData };
  
    // Iterate through questions to check if any have type 'RATING_BAR'
    updatedFormData.questions.forEach((question, index) => {
      if (question.type === 'RATING_BAR') {
        const ratingRange = formData[`ratingRange_${index}`];
        // Add selected rating range as an option in the question object
        updatedFormData.questions[index].options = [ratingRange];
      }
    });
  
    // Remove rating range fields from formData to prevent them from being sent as separate fields
    updatedFormData.questions = updatedFormData.questions.map((question, index) => {
      if (question.type === 'RATING_BAR') {
        const { [`ratingRange_${index}`]: ratingRange, ...updatedQuestion } = question;
        return updatedQuestion;
      }
      return question;
    });
  
    // Submit updated form data
    onSubmit(updatedFormData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <label className="block text-sm font-bold mb-2">Title</label>
        <input type="text" name="title" value={formData.title} onChange={handleChange} className="border border-gray-300 rounded px-4 py-2 w-full mb-2" />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-bold mb-2">Thank You Message</label>
        <textarea name="thankYouMessage" value={formData.thankYouMessage} onChange={handleChange} className="border border-gray-300 rounded px-4 py-2 w-full mb-2" />
      </div>
      {formData.questions.map((question, index) => (
        <div key={index} className="mb-4">
          <label className="block text-sm font-bold mb-2">Question {index + 1}</label>
          <input type="text" name="question" value={question.question} onChange={(e) => handleQuestionChange(index, e)} className="border border-gray-300 rounded px-4 py-2 w-full mb-2" />
          <select name="type" value={question.type} onChange={(e) => handleQuestionChange(index, e)} className="border border-gray-300 rounded px-4 py-2 w-full mb-2">
            <option value="">Select Question Type</option>
            <option value="MULTIPLE_CHOICE">Multiple Choice</option>
            <option value="RADIO_BUTTON">Radio Button</option>
            <option value="TEXT">Text</option>
            <option value="RATING_BAR">Rating Bar</option>
          </select>
          {question.type === 'MULTIPLE_CHOICE' || question.type === 'RADIO_BUTTON' ? (
            <div>
              {question.options.map((option, optionIndex) => (
                <div key={optionIndex} className="flex mb-2">
                  <input type="text" value={option} onChange={(e) => handleOptionChange(index, optionIndex, e)} className="border border-gray-300 rounded px-4 py-2 w-full mr-2" />
                  <button type="button" onClick={() => handleDeleteOption(index, optionIndex)} className="text-red-500 font-semibold">-</button>
                </div>
              ))}
              <button type="button" onClick={() => handleAddOption(index)} className="text-blue-500 font-semibold mb-2">Add Option</button>
            </div>
          ) : null}
          {question.type === 'RATING_BAR' && (
            <select name={`ratingRange_${index}`} value={formData[`ratingRange_${index}`] || ''} onChange={handleChange} className="border border-gray-300 rounded px-4 py-2 w-full mb-2">
              <option value="">Select Rating Range</option>
              <option value="1-5">1 to 5</option>
              <option value="1-10">1 to 10</option>
</select>
)}
<button type="button" onClick={() => handleDeleteQuestion(index)} className="text-red-500 font-semibold mb-2">Delete Question</button>
</div>
))}
<button type="button" onClick={handleAddQuestion} className="text-blue-500 font-semibold mb-4">Add Question</button>
<button type="submit" className="bg-green-500 text-white font-semibold py-2 px-4 rounded hover:bg-green-600">Submit</button>
</form>
);
};

export default SurveyForm;