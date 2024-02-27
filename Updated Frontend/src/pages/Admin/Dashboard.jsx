import React, { useEffect, useState } from 'react';
import Sidebar from '../../components/Sidebar';
import DualPieChart from '../../components/DualPieChart';

const Dashboard = () => {
  const [npsData, setNpsData] = useState(null);
  const [surveyStatusData, setSurveyStatusData] = useState(null);
  const [recentFiles, setRecentFiles] = useState({ today: [], yesterday: [] });
  const userId = sessionStorage.getItem('userId');

  useEffect(() => {
    // Fetch data from API1: NPS
    fetch('http://localhost:4000/api/v1/dashboard/analytics/nps')
      .then(response => response.json())
      .then(data => setNpsData(data))
      .catch(error => console.error('Error fetching NPS data:', error));

    // Fetch data from API2: Survey Status
    fetch('http://localhost:4000/api/v1/dashboard/analytics/survey-status')
      .then(response => response.json())
      .then(data => setSurveyStatusData(data))
      .catch(error => console.error('Error fetching survey status data:', error));

    // Fetch data from recent files API
    fetch(`http://localhost:4000/api/v1/dashboard/analytics/recent-files/${userId}`)
      .then(response => response.json())
      .then(data => setRecentFiles(data))
      .catch(error => console.error('Error fetching recent files data:', error));
  }, []);

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 ml-64 p-8">
        <div className="w-full flex flex-col items-center justify-center">
          {npsData && surveyStatusData && <DualPieChart data1={npsData} data2={surveyStatusData} />}
        </div>
        <div className="w-full mt-8">
          <div className="relative overflow-x-auto">
            <div className="mb-4">
              <h2 className="text-lg font-semibold mb-2">Today's Uploaded Files</h2>
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
                      Uploaded At
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Total Invites
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {recentFiles.today.map(file => (
                    <tr key={file._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                      <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        {file.surveyTitle}
                      </td>
                      <td className="px-6 py-4">
                        <a href={file.filePath} target="_blank" rel="noopener noreferrer">{file.fileName}</a>
                      </td>
                      <td className="px-6 py-4">
                        {new Date(file.createdAt).toLocaleString()}
                      </td>
                      <td className="px-6 py-4">
                        {file.userCount}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div>
              <h2 className="text-lg font-semibold mb-2">Yesterday's Uploaded Files</h2>
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
                      Uploaded At
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Total Invites
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {recentFiles.yesterday.map(file => (
                    <tr key={file._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                      <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        {file.surveyTitle}
                      </td>
                      <td className="px-6 py-4">
                        <a href={file.filePath} target="_blank" rel="noopener noreferrer">{file.fileName}</a>
                      </td>
                      <td className="px-6 py-4">
                        {new Date(file.createdAt).toLocaleString()}
                      </td>
                      <td className="px-6 py-4">
                        {file.userCount}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
