import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const Rating = ({ ratingHandler }) => {
    const [rating, setRating] = useState();
    const ratings = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const navigate = useNavigate();
    const location = useLocation();
    const id = location.pathname.split("/").pop(); // Extract id from URL pathname

    const passRating = (ratingval) => {
        setRating(ratingval);
        ratingHandler(ratingval);
    };

    const handleNext = () => {
        if (rating !== undefined && id) { // Check if rating and id are defined
            navigate(`/survey/${id}`); // Redirect to survey page with id
        }
    };
    return (
        <div className="flex justify-center items-center h-screen bg-white">

            
            <div className="flex flex-col h-full justify-center items-center">

                     <ol className="flex items-center w-full text-lg font-medium text-center text-gray-500 dark:text-gray-400 sm:text-base mb-24">
                    <li className="flex md:w-full items-center text-blue-600 dark:text-blue-500 sm:after:content-[''] after:w-full after:h-1 after:border-b after:border-gray-200 after:border-1 after:hidden sm:after:inline-block after:mx-6 xl:after:mx-10 dark:after:border-gray-700">
                        <span className="flex items-center after:content-['/'] sm:after:hidden after:mx-2 after:text-gray-200 dark:after:text-gray-500">
                            <svg className="w-6 h-18 sm:w-6 sm:h-18 me-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z"/>
                            </svg>
                            Rating
                        </span>
                    </li>
                    <li className="flex md:w-full items-center after:content-[''] after:w-full after:h-1 after:border-b after:border-gray-200 after:border-1 after:hidden sm:after:inline-block after:mx-6 xl:after:mx-10 dark:after:border-gray-700">
                        <span className="flex items-center after:content-['/'] sm:after:hidden after:mx-2 after:text-gray-200 dark:after:text-gray-500">
                            <span className="me-2">2</span>
                            Feedback
                        </span>
                    </li>
                    <li className="flex items-center">
                        <span className="me-2">3</span>
                        Submit
                    </li>
                </ol>
           
                <p className="text-black text-center mb-2">
                    How likely are you to recommend{' '}
                    <img src="/carcopolo.png" alt="Carcopolo" className="inline h-6 w-auto" />{' '}
                    to a friend or colleague?
                </p>
                <div className="flex flex-wrap justify-center gap-1">
                    {ratings.map((ratingVal) => (
                        <button
                            className={`w-16 h-10 flex items-center justify-center border border-gray-400 hover:bg-green-300 ${
                                rating === ratingVal && "bg-green-400"
                            }`}
                            key={ratingVal}
                            onClick={() => passRating(ratingVal)}
                        >
                            {ratingVal}
                        </button>
                    ))}
                </div>
                <div className="flex justify-between mt-2 w-full">
                    <p className="text-black">Not at all likely</p>
                    <p className="text-black">Extremely likely</p>
                </div>

                <div className="flex justify-end mt-4">
                    <button
                        onClick={handleNext}
                        className={`px-4 py-2 bg-green-500 text-white rounded-md ${rating === undefined && "opacity-50 cursor-not-allowed"}`}
                        disabled={rating === undefined}
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Rating;
