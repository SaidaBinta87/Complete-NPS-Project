import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import the useNavigate hook

const SignupPage = () => {
  const navigate = useNavigate(); // Initialize the useNavigate hook
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    confirmPassword: ''
  });
  const [signupSuccess, setSignupSuccess] = useState(false);
  const [passwordMismatch, setPasswordMismatch] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setPasswordMismatch(true);
      return;
    }
    try {
      const response = await axios.post('http://localhost:4000/api/v1/admin/register', formData);
      if (response.status === 201) { // Check if response status is 201 Created
        setSignupSuccess(true);
        setFormData({
          username: '',
          password: '',
          confirmPassword: ''
        });
        navigate("/login"); // Redirect to the login page after successful signup
      } else {
        console.error('Signup failed:', response.statusText);
        // Display error message if registration was not completed
        alert('Registration was not completed. Please try again.');
      }
    } catch (error) {
      console.error('Error during signup:', error);
      // Display error message if registration was not completed
      alert('Registration was not completed. Please try again.');
    }
  };

  return (
    <div className="bg-grey-lighter min-h-screen flex flex-col">
      <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
        <div className="bg-white px-6 py-8 rounded shadow-md text-black w-full">
          <h1 className="mb-8 text-3xl text-center">Sign up</h1>
          <input 
            type="text"
            className="block border border-grey-light w-full p-3 rounded mb-4"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            required
          />
          <input 
            type="password"
            className="block border border-grey-light w-full p-3 rounded mb-4"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <input 
            type="password"
            className={`block border border-grey-light w-full p-3 rounded mb-4 ${passwordMismatch ? 'border-red-500' : ''}`}
            name="confirmPassword"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
          {passwordMismatch && (
            <p className="text-red-500 text-xs italic mb-2">Passwords do not match.</p>
          )}
          <button
            type="submit"
            onClick={handleSubmit}
            className="w-full text-center py-3 rounded bg-green-600 text-white hover:bg-green-700 focus:outline-none my-1"
          >
            Create Account
          </button>
          {signupSuccess && (
            <p className="text-green-500 text-sm mt-4">Account created successfully!</p>
          )}
          <div className="text-center text-sm text-grey-dark mt-4">
            By signing up, you agree to the 
            <a className="no-underline border-b border-grey-dark text-grey-dark" href="#">
              Terms of Service
            </a> and 
            <a className="no-underline border-b border-grey-dark text-grey-dark" href="#">
              Privacy Policy
            </a>
          </div>
        </div>
        <div className="text-grey-dark mt-6">
          Already have an account? 
          <a className="no-underline border-b border-blue text-blue" href="../login/">
            Log in
          </a>.
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
