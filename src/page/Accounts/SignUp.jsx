import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { Link, useNavigate } from 'react-router-dom';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './SignUp.css'
export const Signup = () => {
  const [loading, setLoading] = useState(false);
  const [isOnline, setIsOnline] = useState(true);
  const [errorModal, setErrorModal] = useState(false);
  const [errorModalDuration, setErrorModalDuration] = useState(6000);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalDisplayDuration, setModalDisplayDuration] = useState(4500);
  const [formData, setFormData] = useState({
    userFirstName: '',
    userMiddleName: '',
    userLastName: '',
    userName: '',
    email: '',
    userPassword: '',
    confirmPassword: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const navigate = useNavigate();

  useEffect(() => {
    if (isModalOpen) {
      const modalCloseTimer = setTimeout(() => {
        setIsModalOpen(false);
      }, modalDisplayDuration);
      return () => clearTimeout(modalCloseTimer);
    }
  }, [isModalOpen]);

  useEffect(() => {
    if (errorModal) {
      const modalCloseTimer = setTimeout(() => {
        setIsModalOpen(false);
      }, errorModalDuration);
      return () => clearTimeout(modalCloseTimer);
    }
  }, [isModalOpen]);

  const checkNetworkStatus = () => {
    setIsOnline(navigator.onLine);
  };

  useEffect(() => {
    checkNetworkStatus();
    window.addEventListener('online', checkNetworkStatus);
    window.addEventListener('offline', checkNetworkStatus);
    return () => {
      window.removeEventListener('online', checkNetworkStatus);
      window.removeEventListener('offline', checkNetworkStatus);
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!isOnline) {
      setIsModalOpen(true);
      return;
    }

    if (
      formData.userFirstName.trim() === '' ||
      formData.userLastName.trim() === '' ||
      formData.userName.trim() === '' ||
      formData.email.trim() === '' ||
      formData.userPassword.trim() === '' ||
      formData.confirmPassword.trim() === ''
    ) {
      setError(true);
    } else if (formData.userPassword !== formData.confirmPassword) {
      setError(false);
      setPasswordsMatch(false);
    } else {
      setError(false);
      setPasswordsMatch(true);
    }

    const requestData = {
      username: formData.userName,
      firstname: formData.userFirstName,
      lastname: formData.userLastName,
      middlename: formData.userMiddleName,
      email: formData.email,
      password: formData.userPassword,
    };

    try {
      const response = await fetch('https://timesheet-api-main.onrender.com/user/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': 'a57cca53d2086ab3488b358eebbca2e7',
        },
        body: JSON.stringify(requestData),
      });

      const responseData = await response.json();
      console.log('Response:', responseData);

      if (response.status === 201) {
        const accessToken = responseData['access-token'];
        const userId = responseData['user-id'];
        sessionStorage.setItem('access_token', accessToken);
        sessionStorage.setItem('user_id', userId);
        navigate('/reports');
      } else if (response.status === 400) {
        setErrorModal(true);
      } else {
        console.error('An error occurred:', responseData.message);
      }
    } catch (error) {
      console.error('An error occurred:', error);
    } finally {
      setLoading(false);
      setFormData((prevData) => ({
        ...prevData,
        userPassword: ''
      }));
    }
  };

 return (
    <div className="center w-100  ">
      <Helmet>
        <title>SIGN UP</title>
      </Helmet>

      {isModalOpen && !isOnline && (
        <div className="fixed top-0 left-0 flex items-center justify-center w-100 h-100 bg-black-50 relative">
          <div className="bg-white p-4 rounded-lg w-80 absolute top-5">
            <p className="f4 b tc mb2">No network/WiFi detected!</p>
          </div>
        </div>
      )}

      <div className="ba w-60 w-80-m center mt2 relative bg-white">
        {errorModal && (
          <div className="fixed top-0 left-0 flex items-center justify-center w-100 h-100 bg-black-50 relative">
            <div className="bg-white p-4 rounded-lg w-80 absolute top-7">
              <p className="f4 b tc mb2">Username/Email already exists</p>
            </div>
          </div>
        )}

        <h3>CREATE ACCOUNT</h3>

        <form className='form' onSubmit={handleSubmit}>
          {/* <div className="mv3 mh5"> */}
            <input
              type="text"
              id="userFirstName"
              name="userFirstName"
              value={formData.userFirstName}
              onChange={handleChange}
              placeholder="First Name"
              className={`inputs ${error && formData.userFirstName.trim() === '' ? 'b--red' : ''}`}
            />
            {error && formData.userFirstName.trim() === '' && (
              <p className="red tc">enter fistname</p>
            )}
          {/* </div> */}

          {/* <div className="form"> */}
            <input
              type="text"
              id="userMiddleName"
              name="userMiddleName"
              value={formData.userMiddleName}
              onChange={handleChange}
              placeholder="Middle Name"
              className="inputs"
            />
          {/* </div> */}

          {/* <div className="form"> */}
            <input
              type="text"
              id="userLastName"
              name="userLastName"
              value={formData.userLastName}
              onChange={handleChange}
              placeholder="Last Name"
              className={`inputs ${error && formData.userLastName.trim() === '' ? 'b--red' : ''}`}
            />
            {error && formData.userLastName.trim() === '' && (
              <p className="red tc">enter lastname</p>
            )}
          {/* </div> */}

          {/* <div className="form"> */}
            <input
              type="text"
              id="userName"
              name="userName"
              value={formData.userName}
              onChange={handleChange}
              placeholder="username"
              className={`inputs ${error && formData.userName.trim() === '' ? 'b--red' : ''}`}
            />
            {error && formData.userName.trim() === '' && (
              <p className="red tc">enter username</p>
            )}
          {/* </div> */}

          {/* <div className="form"> */}
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email address"
              className={`inputs ${error && formData.email.trim() === '' ? 'b--red' : ''}`}
            />
            {error && formData.email.trim() === '' && (
              <p className="red tc">enter email</p>
            )}
          {/* </div> */}

          {/* <div className="form"> */}
            <input
              id="userPassword"
              name="userPassword"
              value={formData.userPassword}
              type={showPassword ? 'text' : 'password'}
              onChange={handleChange}
              placeholder="Password"
              className={`inputs ${error && formData.userPassword.trim() === '' ? 'b--red' : ''}`}
            />
            {error && formData.userPassword.trim() === '' && (
              <p className="red tc">enter password</p>
            )}
          {/* </div> */}
          <div className="bts">
          <button
            onClick={handleSubmit}
            className="my-bts"
            disabled={loading}
          >
            {loading ? (
              <div>
                <FontAwesomeIcon icon={faSpinner} spin /> <span>Sign Up</span>
              </div>
            ) : (
              'Sign Up'
            )}
          </button>
          </div>
          <h2 className="tc mt1 f5">
            Already have an account?{' '}
            <Link className="link blue f4 b" to="/login">
              Login
            </Link>
          </h2>
        </form>
      </div>
    </div>
  );
};


