import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from '../../components/Sidebar';
import { Link } from 'react-router-dom';
import Pagination from '../../components/Pagination'; // Import Pagination component

const UploadHistory = ({ fileIdHandler }) => {
  const [uploadHistory, setUploadHistory] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage] = useState(10); // Number of rows per page
  const userId = sessionStorage.getItem('userId');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/api/v1/excel/fileInfo/${userId}`);
        setUploadHistory(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  // Calculate index of the last item on the current page
  const indexOfLastItem = currentPage * perPage;
  // Calculate index of the first item on the current page
  const indexOfFirstItem = indexOfLastItem - perPage;
  // Get current items to display on the current page
  const currentItems = uploadHistory.slice(indexOfFirstItem, indexOfLastItem);
  // Calculate total number of pages
  const totalPages = Math.ceil(uploadHistory.length / perPage);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const passFileId = (fileId) => {
    fileIdHandler(fileId);
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 ml-64 p-8">
        <h1 className="text-2xl font-bold mb-4">Upload History</h1>
        <div className="text-right mb-4">
          <Link to="/newUpload">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" style={{ backgroundColor: '#489f68' }}>
              Upload Invitees
            </button>
          </Link>
        </div>
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Title
                </th>
                <th scope="col" className="px-6 py-3">
                  File
                </th>
                <th scope="col" className="px-6 py-3">
                  Uploaded at
                </th>
                <th scope="col" className="px-6 py-3">
                  Total Invites
                </th>
                <th scope="col" className="px-6 py-3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((upload, index) => (
                <tr
                  key={index} // Use index as the key for unique identification
                  className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
                >
                  <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {upload.surveyTitle}
                  </td>
                  <td className="px-6 py-4">{upload.fileName}</td>
                  
                  <td className="px-6 py-4">{new Date(upload.createdAt).toLocaleString()}</td>
                  <td className="px-6 py-4">{upload.userCount}</td>
                  <td className="px-6 py-4">
                    <Link to={`/details/${upload.fileId}`}>
                      <button
                        onClick={() => passFileId(upload.fileId)}
                        className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                        style={{ color: '#489f68' }}
                      >
                        Details
                      </button>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* Pagination */}
        <div className="flex justify-center">
          <Pagination currentPage={currentPage} totalPages={totalPages} paginate={paginate} />
        </div>
      </div>
    </div>
  );
};

export default UploadHistory;
