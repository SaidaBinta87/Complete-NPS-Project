
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from '../../components/Sidebar';
import { useParams } from 'react-router-dom';
import Pagination from '../../components/Pagination'; // Import Pagination component

const Details = () => {
  const { fileId } = useParams();
  const [userData, setUserData] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage] = useState(5); // Number of rows per page
  const [npsData, setNpsData] = useState(null);
  const [categoryData, setCategoryData] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [resendSuccess, setResendSuccess] = useState(false); // State for resend success message
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/api/v1/surveycreate/filedata/${fileId}`);
        setUserData(response.data);
        
        // Extract unique IDs from user data after setting userData
        const uniqueIds = response.data.map(user => user.uniqueId);
        
        // Call API to calculate NPS data
        const npsResponse = await axios.post('http://localhost:4000/api/v1/nps/calculate', { uniqueIds });
        setNpsData(npsResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error);
        console.log('Error calculating NPS data:', error);
      }
    };

    fetchData();
  }, [fileId]);

  // Pagination logic...
  const indexOfLastItem = currentPage * perPage;
  const indexOfFirstItem = indexOfLastItem - perPage;
  const currentItems = userData.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(userData.length / perPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  
  const handleResendSurvey = async (uniqueId) => {
    console.log(uniqueId);
    try {
      await axios.post(`http://localhost:4000/api/v1/surveycreate/resend-survey/${uniqueId}`);
      console.log('Survey resent successfully');
      setResendSuccess(true); // Set resend success message to true
      setTimeout(() => {
        setResendSuccess(false); // Hide resend success message after 5 seconds
      }, 5000);
    } catch (error) {
      console.error('Error resending survey:', error);
    }
  };

  const handleCategoryClick = async (category) => {
    try {
      const categoryResponse = await axios.get(`http://localhost:4000/api/v1/nps/categories/${fileId}`);
      setCategoryData(categoryResponse.data[category]);
      setSelectedCategory(category);
    } catch (error) {
      console.error('Error fetching category data:', error);
    }
  };

  const handleSearch = async () => {
    try {
      const response = await axios.post(`http://localhost:4000/api/v1/surveycreate/search/${fileId}`, { searchText });
      setUserData(response.data);
    } catch (error) {
      console.error('Error searching data:', error);
    }
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 ml-64 p-8">
        <h1 className="text-2xl font-bold mb-4">Details</h1>
        
        {/* Search bar */}
        <div className="mb-4">
          <input 
            type="text" 
            placeholder="Search by name, email, etc..." 
            value={searchText} 
            onChange={(e) => setSearchText(e.target.value)} 
            className="border border-gray-300 rounded px-4 py-2 w-5/6" 
                  />
            <button 
                onClick={handleSearch} 
                className="ml-2 px-4 py-2 bg-48968 text-white rounded hover:bg-#3c7ab5"
                style={{ backgroundColor: '#489f68' }} // Apply inline style for background color
              >
        Search
        </button>
        </div>

        {/* Resend success message */}
        {resendSuccess && (
          <div className="bg-green-200 text-green-800 px-4 py-2 rounded mb-4">
            Survey resent successfully!
          </div>
        )}

        {/* NPS data */}
        {npsData && (
          <div className="grid grid-cols-2 gap-8 mb-8">
            {/* NPS Score */}
            <a href="#" className="block max-w-md p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 text-center">
              <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">NPS Score</h5>
              <p className="font-bold text-2xl text-gray-900 dark:text-white">{npsData.npsScore}%</p>
            </a>

            {/* Promoters, Passives, Detractors */}
            <div className="block max-w-md p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
  <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">Promoters, Passives, Detractors</h5>
  <p 
    className="cursor-pointer font-normal text-gray-700 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400" 
    onClick={() => handleCategoryClick('promoters')}
  >
    Promoters: {npsData.totalPromoters}
  </p>
  <p 
    className="cursor-pointer font-normal text-gray-700 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400" 
    onClick={() => handleCategoryClick('passives')}
  >
    Passives: {npsData.totalPassives}
  </p>
  <p 
    className="cursor-pointer font-normal text-gray-700 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400" 
    onClick={() => handleCategoryClick('detractors')}
  >
    Detractors: {npsData.totalDetractors}
  </p>
</div>

 </div>
        )}

        {/* Category data */}
        {selectedCategory && categoryData && (
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">Name</th>
                  <th scope="col" className="px-6 py-3">Email</th>
                  <th scope="col" className="px-6 py-3">Rating</th>
                  <th scope="col" className="px-6 py-3">Feedback</th>
                </tr>
              </thead>
              <tbody>
                {categoryData.map((item, index) => (
                  <tr key={index} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                    <td className="px-6 py-4">{item.name}</td>
                    <td className="px-6 py-4">{item.email}</td>
                    <td className="px-6 py-4">{item.rating}</td>
                    <td className="px-6 py-4">{item.feedback}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* User data */}
        {!selectedCategory && (
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">Name</th>
                  <th scope="col" className="px-6 py-3">Unique Link</th>
                  <th scope="col" className="px-6 py-3">Email</th>
                  <th scope="col" className="px-6 py-3">Mobile Number</th>
                  <th scope="col" className="px-6 py-3">Survey Status</th>
                  <th scope="col" className="px-6 py-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentItems.map((user) => (
                  <tr key={user.id} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                    <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{user.name}</td>
                    <td className="px-6 py-4">
                      <a href={user.uniqueLink} className="text-blue-600 hover:underline">{user.uniqueLink}</a>
                    </td>
                    <td className="px-6 py-4">{user.email}</td>
                    <td className="px-6 py-4">{user.phoneNumber}</td>
                    <td className="px-6 py-4">{user.status}</td>
                    <td className="px-6 py-4">
                      <button 
                        className="text-48968 hover:underline" 
                        onClick={() => handleResendSurvey(user.uniqueId)} 
                        style={{ color: '#489f68' }} // Apply inline style for text color
                      >
                        Survey Resend
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Pagination */}
        <div className="flex justify-center">
          <Pagination currentPage={currentPage} totalPages={totalPages} paginate={paginate} />
        </div>
      </div>
    </div>
  );
};

export default Details;