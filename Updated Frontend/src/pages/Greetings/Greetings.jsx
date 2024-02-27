import { useEffect, useState } from "react";

const Greetings = ({ ratingVal }) => {
    const [query, setQuery] = useState({});
    const [message, setMessage] = useState("");

    useEffect(() => {
        // Check if ratingVal exists in session storage
        const storedRatingVal = sessionStorage.getItem("ratingVal");

        if (storedRatingVal) {
            // Use the ratingVal from session storage
            const rating = parseInt(storedRatingVal);
            updateMessage(rating);
        } else if (ratingVal !== undefined) {
            // If ratingVal is provided as a prop, update the message and store it in session storage
            updateMessage(ratingVal);
            sessionStorage.setItem("ratingVal", ratingVal);
        }
    }, [ratingVal]);

    const updateMessage = (ratingVal) => {
        // Define the thank you messages based on the ratingVal
        let query;
        let message;
        if (ratingVal >= 0 && ratingVal <= 6) {
            query = {
                answer: "Thank you for your feedback!"
            };
            message = "We highly value all ideas and recommendations from our customers, whether they are positive or critical. In the future, our team will reach out to you to learn more about how we can further improve our service.";
        } else if (ratingVal === 7 || ratingVal === 8) {
            query = {
                answer: "Thank you for your feedback!"
            };
            message = "Our goal is to create the best possible service for you. Your thoughts, ideas, and recommendations play a major role in helping us identify opportunities to improve";
        } else if (ratingVal === 9 || ratingVal === 10) {
            query = {
                answer: "Thank you for your feedback!"
            };
            message = "It is great to hear that you like our service. Your response helps us discover new opportunities to improve our service and make sure you have the best possible experience.";
        } else {
            query = {
                answer: ""
            };
            message = "";
        }

        // Set the query and message state
        setQuery(query);
        setMessage(message);
    };

    return (
        <>
            <div className="flex items-center justify-center h-screen">
                <div className="flex flex-col items-center space-y-4 text-lg font-semibold max-w-md px-8">
                    
                    <svg xmlns="http://www.w3.org/2000/svg" className="text-green-600 w-28 h-28" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <h1 className="text-3xl font-bold text-center">{query?.answer}</h1>
                    <p className="text-center">{message}</p>
                </div>
            </div>
        </>
    );
};

export default Greetings;
