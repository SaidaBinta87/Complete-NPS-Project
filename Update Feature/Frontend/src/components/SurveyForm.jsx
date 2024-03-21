import React, { useState } from 'react';

const SurveyForm = ({ survey, onSubmit }) => {
    const [formData, setFormData] = useState({});
    const [selectedRating, setSelectedRating] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleCheckboxChange = (e, index, option) => {
        const { name, checked } = e.target;
        const updatedOptions = [...(formData[`response_${index}`] || [])];
        if (checked) {
            updatedOptions.push(option);
        } else {
            const indexToRemove = updatedOptions.indexOf(option);
            if (indexToRemove !== -1) {
                updatedOptions.splice(indexToRemove, 1);
            }
        }
        setFormData({ ...formData, [name]: updatedOptions });
    };

    const handleRatingBarChange = (index, rating) => {
        setSelectedRating({ ...selectedRating, [index]: rating });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
    
        // Include selected rating in formData before submitting
        const updatedFormData = { ...formData };
    
        // Iterate through selectedRating and add each rating to the corresponding formData entry
        Object.entries(selectedRating).forEach(([index, rating]) => {
            updatedFormData[`response_${index}`] = rating;
        });
    
        onSubmit(updatedFormData);
    };

    const renderRatingBar = (index, ratingRange) => {
        const ratings = Array.from({ length: ratingRange.split('-')[1] }, (_, i) => i + 1);
        return (
            <div className="flex flex-wrap justify-center gap-1">
                {ratings.map((ratingVal) => (
                    <button
                        key={ratingVal}
                        type="button" // Change the button type to "button"
                        className={`w-16 h-10 flex items-center justify-center border border-gray-400 ${
                            selectedRating[index] === ratingVal ? "bg-green-400" : "hover:bg-green-300"
                        }`}
                        onClick={() => handleRatingBarChange(index, ratingVal)}
                    >
                        {ratingVal}
                    </button>
                ))}
                <div className="flex justify-between mt-2 w-full">
                    <p className="text-black">Not at all likely</p>
                    <p className="text-black">Extremely likely</p>
                </div>
            </div>
        );
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>{survey.title}</h2>
            {survey.questions.map((question, index) => (
                <div key={index}>
                    <p>{question.question}</p>
                    {question.type === 'TEXT' && (
                        <input
                            type="text"
                            name={`response_${index}`}
                            value={formData[`response_${index}`] || ''}
                            onChange={handleChange}
                        />
                    )}
                    {question.type === 'MULTIPLE_CHOICE' && (
                        <>
                            {question.options.map((option, optionIndex) => (
                                <div key={optionIndex}>
                                    <input
                                        type="checkbox"
                                        name={`response_${index}`}
                                        value={option}
                                        checked={(formData[`response_${index}`] || []).includes(option)}
                                        onChange={(e) => handleCheckboxChange(e, index, option)}
                                    />
                                    <label>{option}</label>
                                </div>
                            ))}
                        </>
                    )}
                    {question.type === 'RADIO_BUTTON' && (
                        <>
                            {question.options.map((option, optionIndex) => (
                                <div key={optionIndex}>
                                    <input
                                        type="radio"
                                        name={`response_${index}`}
                                        value={option}
                                        checked={formData[`response_${index}`] === option}
                                        onChange={handleChange}
                                    />
                                    <label>{option}</label>
                                </div>
                            ))}
                        </>
                    )}
                    {question.type === 'RATING_BAR' && (
                        renderRatingBar(index, question.options[0])
                    )}
                </div>
            ))}
            <button type="submit">Submit Response</button>
        </form>
    );
};

export default SurveyForm;
