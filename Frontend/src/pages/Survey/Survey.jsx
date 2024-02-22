import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate, useLocation } from "react-router-dom";

const Survey = ({ ratingVal }) => {
    const [feedback, setFeedback] = useState("");
    const navigate = useNavigate();
    const location = useLocation();
    const id = location.pathname.split("/").pop(); // Extract id from URL pathname

    const handleFeedbackChange = (e) => {
        setFeedback(e.target.value);
    };

    const handlePrev = () => {
        navigate(`/${id}`);
    };

    const handleSubmit = async () => {
        if (feedback.trim() !== "") {

            try {
                await axios.post(`http://localhost:4000/api/v1/ratings/post-feedback/${id}`, { rating: ratingVal, feedback });
                navigate("/greetings");
            } catch (error) {
                console.error("Error posting feedback:", error);
            }
        }
    };

    useEffect(() => {
        if (typeof ratingVal === "undefined" && id ) {
            navigate(`/${id}`);
        }
    }, [ratingVal, navigate]);


    let query;
    let messageColorStyle;

    if (ratingVal >= 0 && ratingVal <= 6) {
        query = {
            question: "What would you like us to Improve?",
            emojiList: [""]
        };
        messageColorStyle = { color: "#c6071c" }; // Custom color for bad ratings
    } else if (ratingVal === 7 || ratingVal === 8) {
        query = {
            question: "We appreciate your feedback; Please share the reason behind your score.",
            emojiList: [""]
        };
        messageColorStyle = { color: "#bf5b4a" }; // Custom color for medium ratings
    } else if (ratingVal === 9 || ratingVal === 10) {
        query = {
            question: "We are glad you like us; Would you like to tell us what exactly excites you?",
            emojiList: [""]
        };
        messageColorStyle = { color: "#489f68" }; // Custom color for good ratings
    } else {
        query = {
            question: "",
            emojiList: []
        };
    }

    return (
        <div className="flex justify-center items-center h-screen bg-white">
            <div>
            <ol className="flex items-center w-full text-lg font-medium text-center text-gray-500 dark:text-gray-400 sm:text-base mb-4">
                    <li className="flex md:w-full items-center text-blue-600 dark:text-blue-500 sm:after:content-[''] after:w-full after:h-1 after:border-b after:border-gray-200 after:border-1 after:hidden sm:after:inline-block after:mx-6 xl:after:mx-10 dark:after:border-gray-700">
                        <span className="flex items-center after:content-['/'] sm:after:hidden after:mx-2 after:text-gray-200 dark:after:text-gray-500">
                            <svg className="w-6 h-18 sm:w-6 sm:h-18 me-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z"/>
                            </svg>
                            Rating
                        </span>
                    </li>
                    <li className="flex md:w-full items-center text-blue-600 dark:text-blue-500 sm:after:content-[''] after:w-full after:h-1 after:border-b after:border-gray-200 after:border-1 after:hidden sm:after:inline-block after:mx-6 xl:after:mx-10 dark:after:border-gray-700">
                        <span className="flex items-center after:content-['/'] sm:after:hidden after:mx-2 after:text-gray-200 dark:after:text-gray-500">
                        <svg className="w-6 h-18 sm:w-6 sm:h-18 me-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z"/>
                            </svg>
                            Feedback
                        </span>
                    </li>
                    <li className="flex items-center">
                        <span className="me-2">3</span>
                        Submit
                    </li>
                </ol>

                <label htmlFor="feedback" className="block mb-2 text-lg font-bold dark:text-white text-center" style={messageColorStyle}>{query?.question}</label>
                <textarea
                    id="feedback"
                    cols="86"
                    rows="4"
                    className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Write your thoughts here..."
                    value={feedback}
                    onChange={handleFeedbackChange}
                ></textarea>
                <div className="flex w-full justify-between mt-2">
                    <button onClick={handlePrev} className="px-4 py-2 bg-green-500 text-white rounded-md">Previous</button>
                    <button onClick={handleSubmit} className="px-4 py-2 bg-green-500 text-white rounded-md">Submit</button>
                </div>
            </div>
        </div>
    );
};

export default Survey;
