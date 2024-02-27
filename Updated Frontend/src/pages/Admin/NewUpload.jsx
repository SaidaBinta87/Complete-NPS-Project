import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from '../../components/Sidebar'; // Import your Sidebar component

const UploadAndInviteForm = () => {
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState('');
  const [invitationType, setInvitationType] = useState('');
  const [userCount, setUserCount] = useState(null);
  const [successMessageVisible, setSuccessMessageVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [emailSubject, setEmailSubject] = useState('Survey Link');
  const [emailText, setEmailText] = useState('Dear User,\n\nPlease click on the following link to take the survey:');
  const [emailVisible, setEmailVisible] = useState(false);

  useEffect(() => {
    const userId = sessionStorage.getItem('userId');
    console.log(userId);
    if (!userId) {
      // Redirect or handle the absence of userId in session storage
    }
  }, []);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleInvitationTypeChange = (event) => {
    setInvitationType(event.target.value);
    setEmailVisible(event.target.value === 'email'); // Show email fields only if email is selected
  };

 const handleDownloadTemplate = async () => {
    try {
      const response = await axios.get('http://localhost:4000/api/v1/excelc/download', {
        responseType: 'blob', // Set response type to blob
      });
      // Create a link element to download the template file
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'template.xlsx'); // Set the file name
      document.body.appendChild(link);
      link.click();
      // Clean up
      link.parentNode.removeChild(link);
    } catch (error) {
      console.error('Error downloading Excel template:', error);
      // Handle error
      alert('An unexpected error occurred while downloading the Excel template.');
    }
  };

  const handleEmailSubjectChange = (event) => {
    setEmailSubject(event.target.value);
  };

  const handleEmailTextChange = (event) => {
    setEmailText(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!invitationType) {
      // Don't proceed if invitation type is not selected
      alert('Please select an invitation type (email or SMS).');
      return;
    }
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('surveyTitle', title);
      formData.append('userId', sessionStorage.getItem('userId')); // Retrieve userId from sessionStorage and append to formData
      formData.append('emailSubject', emailSubject); // Add emailSubject to form data
      formData.append('emailText', emailText); // Add emailText to form data
  
      const response = await axios.post('http://localhost:4000/api/v1/upload/uploadAndProcess', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      // Save userCount in state
      setUserCount(response.data.userCount);
  
      // Show success message
      setSuccessMessageVisible(true);
  
      // Hide form fields
      setFile(null);
      setTitle('');
      setInvitationType('');
  
      // Close success message after 5 seconds
      setTimeout(() => {
        setSuccessMessageVisible(false);
      }, 5000);
  
    } catch (error) {
      console.error('Error uploading file and processing survey:', error);
      // Handle error
      alert('An unexpected error occurred.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 ml-64 p-8">
        {loading && (
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="text-center">
              <div role="status">
                <svg aria-hidden="true" className="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                  <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                </svg>
                <span className="sr-only">Loading...</span>
              </div>
            </div>
          </div>
        )}
        {successMessageVisible ? (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative" role="alert">
            <strong className="font-bold">Success!</strong>
            <span className="block sm:inline"> {userCount} invitees uploaded and invited to the survey over the email/sms.</span>
          </div>
        ) : (
          <div>
            <h1 className="text-2xl font-bold mb-4">Upload History</h1>
            <div className="text-right mb-4">
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"  style={{ backgroundColor: '#489f68' }}
                onClick={handleDownloadTemplate}
              >
                Excel Template
              </button>
              <p className="text-xs mt-2">Download the Excel template</p>
            </div>
            <div className="max-w-md mx-auto">
              <form onSubmit={handleSubmit} className="flex flex-col items-center mt-12">
                <div className="mb-6 w-full">
                  <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Title</label>
                  <input
                    type="text"
                    id="title"
                    className="w-full p-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white focus:ring-blue-500 focus:border-blue-500"
                    value={title}
                    onChange={handleTitleChange}
                  />
                </div>
                <div className="mb-6 w-full">
                  <label htmlFor="file" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Upload Excel File</label>
                  <input
                    type="file"
                    id="file"
                    className="w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                    onChange={handleFileChange}
                  />
                </div>
                <fieldset className="mb-6 w-full flex justify-between">
                  <legend className="sr-only">Invitation Send Over</legend>
                  <div className="flex items-center">
                    <input
                      type="radio"
                      id="email-option"
                      name="invitationType"
                      value="email"
                      className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring-blue-300 dark:focus:ring-blue-600 dark:focus:bg-blue-600 dark:bg-gray-700 dark:border-gray-600"
                      checked={invitationType === 'email'}
                      onChange={handleInvitationTypeChange}
                    />
                    <label htmlFor="email-option" className="block ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Email</label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="radio"
                      id="sms-option"
                      name="invitationType"
                      value="sms"
                      className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring-blue-300 dark:focus:ring-blue-600 dark:bg-gray-700 dark:border-gray-600"
                      checked={invitationType === 'sms'}
                      onChange={handleInvitationTypeChange}
                    />
                    <label htmlFor="sms-option" className="block ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">SMS</label>
                  </div>
                </fieldset>
                {emailVisible && (
                  <div>
                    <input
                      type="text"
                      value={emailSubject}
                      onChange={handleEmailSubjectChange}
                      className="w-full p-2 mb-4 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Email Subject"
                    />
                    <textarea
                      value={emailText}
                      onChange={handleEmailTextChange}
                      className="w-full p-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Email Text"
                      rows={8}
                    />
                  </div>
                )}
                <button
                  type="submit"
                  disabled={!invitationType} // Disable button if invitation type is not selected
                  className={`block w-full py-3 text-sm font-semibold text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none focus:bg-blue-600 ${!invitationType && 'opacity-50 cursor-not-allowed'}`}
                  style={{ backgroundColor: '#489f68' }}
                >
                  Upload and Invite
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UploadAndInviteForm;
