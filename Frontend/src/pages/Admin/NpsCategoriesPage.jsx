import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from '../../components/Sidebar';
import { useParams } from 'react-router-dom';

const Details = () => {
  const { fileId } = useParams();
  const [npsCategories, setNpsCategories] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/api/v1/nps/categories/${fileId}`);
        setNpsCategories(response.data);
      } catch (error) {
        console.error('Error fetching NPS categories:', error);
      }
    };

    fetchData();
  }, [fileId]);

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 ml-64 p-8">
        <h1 className="text-2xl font-bold mb-4">Details</h1>

        {/* Check if NPS categories are available */}
        {npsCategories && (
          <div>
            <h2 className="text-2xl font-bold mb-4">Categories</h2> {/* Title for all tables */}
            
            {/* Promoters Table */}
            <h2 className="text-xl font-bold mb-2">Promoters</h2>
            <div className="relative overflow-x-auto mb-8">
              <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                {/* Table headers */}
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" className="px-6 py-3">
                      Name
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Email
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Rating
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Feedback
                    </th>
                  </tr>
                </thead>
                {/* Table body */}
                <tbody>
                  {npsCategories.promoters.map((user, index) => (
                    <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                      <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{user.name}</td>
                      <td className="px-6 py-4">{user.email}</td>
                      <td className="px-6 py-4">{user.rating}</td>
                      <td className="px-6 py-4">{user.feedback}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Passives Table */}
            <h2 className="text-xl font-bold mb-2">Passives</h2>
            <div className="relative overflow-x-auto mb-8">
              <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                {/* Table headers */}
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" className="px-6 py-3">
                      Name
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Email
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Rating
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Feedback
                    </th>
                  </tr>
                </thead>
                {/* Table body */}
                <tbody>
                  {npsCategories.passives.map((user, index) => (
                    <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                      <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{user.name}</td>
                      <td className="px-6 py-4">{user.email}</td>
                      <td className="px-6 py-4">{user.rating}</td>
                      <td className="px-6 py-4">{user.feedback}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Detractors Table */}
            <h2 className="text-xl font-bold mb-2">Detractors</h2>
            <div className="relative overflow-x-auto">
              <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                {/* Table headers */}
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" className="px-6 py-3">
                      Name
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Email
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Rating
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Feedback
                    </th>
                  </tr>
                </thead>
                {/* Table body */}
                <tbody>
                  {npsCategories.detractors.map((user, index) => (
                    <tr key={index} className="bg-white dark:bg-gray-800">
                      <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{user.name}</td>
                      <td className="px-6 py-4">{user.email}</td>
                      <td className="px-6 py-4">{user.rating}</td>
                      <td className="px-6 py-4">{user.feedback}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Details;
