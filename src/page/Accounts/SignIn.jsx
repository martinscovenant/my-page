import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import {  faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './Signin.css'

export const SignIn = () => {
  const [loading, setLoading] = useState(false);
  const [isOnline, setIsOnline] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalDisplayDuration, setModalDisplayDuration] = useState(4500);
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [formData, setFormData] = useState({
    emailAddress: "",
    userPassword: "",
  });
  useEffect(() => {
    if (isModalOpen) {
      const modalCloseTimer = setTimeout(() => {
        setIsModalOpen(false);
      }, modalDisplayDuration);
      return () => clearTimeout(modalCloseTimer);
    }
  }, [isModalOpen]);

  const checkNetworkStatus = () => {
    setIsOnline(navigator.onLine);
  };

  useEffect(() => {
    checkNetworkStatus();
    window.addEventListener("online", checkNetworkStatus);
    window.addEventListener("offline", checkNetworkStatus);
    return () => {
      window.removeEventListener("online", checkNetworkStatus);
      window.removeEventListener("offline", checkNetworkStatus);
    };
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const [error, setError] = useState(false);
  const [errorMessages, setErrorMessages] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (!isOnline) {
      setIsModalOpen(true);
      return;
    }
    if (formData.emailAddress.trim() === '' 
    || formData.userPassword.trim() === '') {
      setError(true);
      setLoading(false);
    } else {
      setError(false);
    }
    const requestData = {
      email: formData.emailAddress,
      password: formData.userPassword,
    };

    try {
      const response = await fetch('https://timesheet-api-main.onrender.com/user/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': 'a57cca53d2086ab3488b358eebbca2e7',
        },
        body: JSON.stringify(requestData),
      });
      if (response.status === 200) {
        const responseData = await response.json();
        sessionStorage.setItem('accessToken', responseData.accessToken);
        navigate("/UpdateReport");
        console.log("valid ");
      } else {
        setError(true);
        setModalMessage("Invalid Email address/password⚠️");
        setShowModal(true);
        setTimeout(() => {
          setShowModal(false);
        }, 5000);
        setLoading(false);
      }
    } catch (error) {
      console.error('An error occurred:', error);
      const errorMessage = error.response?.data?.message || 'An error occurred. Please try again later.';
      setErrorMessages([errorMessage]);
    } finally {
      setLoading(false);
      setError(false);
    }
    setFormData((prevData) => ({
      ...prevData,
      password: '',
    }));
  };

  return (
    <div className=" center w-auto bg-white">
      <Helmet>
        <title> SIGN IN </title>
      </Helmet>
      {showModal && (
        <div className="fixed absolute--fill flex items-center justify-center relative">
          <div className="bg-white p2 rounded-2 w-40 absolute top-2">
            <p className="f5 b text-red-500 mb2 tc"> {modalMessage}</p>
          </div>
        </div>
      )}
      {isModalOpen && !isOnline && (
        <div className="fixed absolute--fill flex items-center justify-center relative">
          <div className="bg-white p2 rounded-2 w-30 absolute top-1">
            <p className="f5 b text-red-500 mb3 tc">Check Your Internet Connection</p>
          </div>
        </div>
      )}
      <div className='form2 border w-50'>
        < form className='form' onSubmit={handleSubmit}>
        <h3 > LOGIN </h3> 
          <lable for="email">E-mail:</lable><br />
            <input
              type="text"
              id="emailAddress"
              name="emailAddress"
              value={formData.emailAddress}
              onChange={handleChange}
              placeholder="Email Address"
              className= {`inputs ${error && formData.emailAddress.trim() === '' ? 'b--red' : ''}`}
            /><br />
            {error && formData.emailAddress.trim() === '' && <p className='red tc'>enter emailAddress</p>}
           <lable for="password">Password:</lable><br />
            <input
              id='userPasword'
              name='userPassword'
              value={formData.userPassword}
              type="password"
              onChange={handleChange}
              placeholder="Password"
              className={`inputs ${error && formData.userPassword.trim() === '' ? 'b--red' : ''}`}
            /><br />

            {error && formData.userPassword.trim() === '' && <p className='red tc'>enter password⚠️</p>}
          <div className='bts'>
          <button
            onClick={handleSubmit}
            className="my-bts"
            disabled={loading}
          >
            {loading ? (
              <div> <FontAwesomeIcon icon={faSpinner} spin /> <span> Sign In </span> </div>
            ) : (
              "Sign In"
            )}
          </button>
          </div>
          <h2 className='tc my-1 fw-serif'>
            Don't have an account? <Link to="/Signup" className='blue f6 fw6'> SIGN UP </Link>
          </h2>
        </form>
      </div>
      </div>
  );
};
