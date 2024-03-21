import { useEffect, useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Greetings from './pages/Greetings/Greetings.jsx';
import Rating from './pages/Rating/Rating.jsx';
import Survey from './pages/Survey/Survey.jsx';
import { routes } from './paths/router.js';
import Login from './pages/Admin/Login.jsx';
import Signup from './pages/Admin/Signup.jsx';
import UploadHistory from './pages/Admin/UploadHistory.jsx';
import Details from './pages/Admin/Details.jsx';
import UploadAndInviteform from './pages/Admin/NewUpload.jsx';
import Dashboard  from './pages/Admin/Dashboard.jsx';
import LogoutPage from './pages/Admin/Logout.jsx';
import NpsCategoriesPage from './pages/Admin/NpsCategoriesPage.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import DynamicSurvey from './pages/Admin/DynamicSurvey.jsx';
import ResponseSurvey from './pages/Admin/Response.jsx';

function App() {
  const [rating, setRating] = useState();
  const [fileId, setFileId] = useState('');

  // Function to handle rating change and store it in session storage
  const ratingHandler = (ratingVal) => {
    setRating(ratingVal);
    sessionStorage.setItem('ratingVal', ratingVal); // Store ratingVal in session storage
  };

  const fileIdHandler = (fileId) => {
    setFileId(fileId);
  };
  
  useEffect(() => {
    // Retrieve ratingVal from session storage when component mounts
    const storedRatingVal = sessionStorage.getItem('ratingVal');
    if (storedRatingVal) {
      setRating(parseInt(storedRatingVal));
    }
  }, []);

  return (
    <Routes> 
      <Route path="/" element={<Navigate to="/login" />} /> {/* Redirect to login page when root path is accessed */}
      <Route path='/login' element={<Login />} />
      <Route path='/logout' element={<LogoutPage />} />
      <Route path='/signup' element={<Signup />} />
      <Route path='/:id' element={<Rating ratingHandler={ratingHandler} />} />
      <Route path='/survey/:id' element={<Survey ratingVal={rating} />} />
      <Route path='/greetings' element={<Greetings ratingVal={rating} />} />
      <Route path='/responseSurvey/:id' element={<ResponseSurvey />}/>
      <Route path="/uploadhistory" element={<ProtectedRoute><UploadHistory fileIdHandler={fileIdHandler} /></ProtectedRoute>} />
      <Route path="/details/:fileId" element={<ProtectedRoute><Details /></ProtectedRoute>} />
      <Route path="/newUpload" element={<ProtectedRoute><UploadAndInviteform /></ProtectedRoute>} />
      <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
      <Route path="/categories/:fileId" element={<ProtectedRoute><NpsCategoriesPage /></ProtectedRoute>} />
      <Route path="/dynamicSurvey" element={<ProtectedRoute><DynamicSurvey /></ProtectedRoute>} />
     
      



    </Routes>
  );
}

export default App;
