<<<<<<< HEAD
import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const Signup = () => {
    const [loading, setLoading] = useState(false);
    const [isOnline, setIsOnline] = useState(true);
    const [errorModal, setErrorModal] = useState(false);
    const [errorModalDuration, setErrorModalDuration] = useState(6000);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalDisplayDuration, setModalDisplayDuration] = useState(4500);
    const [formData, setFormData] = useState({
        userFirstName: "",
        userMiddleName: "",
        userLastName: "",
        userName: "",
        email: "",
        userPassword: "",
        confirmPassword: "",
    });
   
    const navigate = useNavigate()
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
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true)
        if (!isOnline) {
            setIsModalOpen(true);
            return;
        }
        if (formData.userFirstName.trim() === '' || formData.userLastName.trim() === '' || formData.userName.trim() === '' || formData.email.trim() === '' || formData.userPassword.trim() === '' || formData.confirmPassword.trim() === '') {
            setError(true);
        } else if (formData.userPassword) {
            setError(false);
            setPasswordsMatch(false);
        } else {
            setError(false);
            setPasswordsMatch(true)
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
                const accessToken = responseData["access-token"];
                const userId = responseData["user-id"];
                sessionStorage.setItem("access_token", accessToken);
                sessionStorage.setItem("user_id", userId);
                navigate("/reports");
            } else if (response.status === 400) {
                setErrorModal(true)
            } else {
                console.error('An error occurred:', responseData.message);
            }
        } catch (error) {
            console.error('An error occurred:', error);
        } finally {
            setLoading(false);
            setFormData((prevData) => ({
                ...prevData,
                userPassword: '',
            }));
        }
    }
    return (
        <div className="w-full h-screen bg-[#232f3e] ">
            <Helmet>
                <title> SIGN UP </title>
                <link rel="icon" type="image/png" href="./assets/Images/signup-icon.jpeg" />
            </Helmet>
            {isModalOpen && !isOnline && (
                 <div className="fixed inset-0 flex items-center justify-center relative">
                 <div className="bg-white p-6 rounded-lg w-4/6 absolute top-5">
                     <p className="text-lg font-semibold mb-4 text-center">No network/WiFi detected!</p>
                 </div>
             </div>
            )}
            <div className=" border lg:w-3/5 sm:w-4/5  mb-2  rounded absolute top-[10%]  lg:mx-[20%] sm:mx-[10%] bg-white ">
                {errorModal && (
                    <div className="fixed inset-0 flex items-center justify-center relative">
                        <div className="bg-white p-6 rounded-lg w-4/6 absolute top-7">
                            <p className="text-lg font-semibold mb-4 text-center"> Username/Email already exists</p>
                        </div>
                    </div>
                )}
                <p> <h1 className="text-center text-2xl font-semibold font-mono"> CREATE ACCOUNT</h1> </p>
                <form onSubmit={handleSubmit}>
                    <div className="mx-[5%] my-[3%]">
                        <input
                            type="text"
                            id="userFirstName"
                            name="userFirstName"
                            value={formData.userFirstName}
                            onChange={handleChange}
                            placeholder="First Name"
                            className={` w-4/5  p-2 border-2 border-gray-500 rounded-md  outline-none ${error && formData.userFirstName.trim() === '' ? 'border-red-500' : ''} `}
                        />
                        {error && formData.userFirstName.trim() === '' && <p className='text-red-500 text-center'> First Name is required </p>}
                    </div>
                    <div className="mx-[5%] my-[3%]">
                        <input
                            type="text"
                            id="userMiddleName"
                            name="userMiddleName"
                            value={formData.userMiddleName}
                            onChange={handleChange}
                            placeholder="Middle Name"
                            className={` w-4/5  p-2 border-2 border-gray-500 rounded-md  outline-none `}
                        />
                    </div>
                    <div className="mx-[5%] my-[3%]">
                        <input
                            type="text"
                            id="userLastName"
                            name="userLastName"
                            value={formData.userLastName}
                            onChange={handleChange}
                            placeholder="Last Name"
                            className={` w-4/5  p-2 border-2 border-gray-500 rounded-md  outline-none ${error && formData.userLastName.trim() === '' ? 'border-red-500' : ''} `}
                        />
                        {error && formData.userLastName.trim() === '' && <p className='text-red-500 text-center'> Last Name is required </p>}
                    </div>
                    <div className="mx-[5%] my-[4%]">
                        <input
                            type="text"
                            id="userName"
                            name="userName"
                            value={formData.userName}
                            onChange={handleChange}
                            placeholder="username"
                            className={`w-4/5  p-2 border-2 border-gray-500 rounded-md  outline-none ${error && formData.userName.trim() === '' ? 'border-red-500' : ''} `}
                        />
                        {error && formData.userName.trim() === '' && <p className='text-red-500 text-center'> Username is required </p>}
                    </div>
                    <div className="mx-[5%] my-[4%]">
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Email address"
                            className={`outline-none w-4/5  p-2 border-2 border-gray-500 rounded-md ${error && formData.email.trim() === '' ? 'border-red-500' : ''} `}
                        />
                        {error && formData.email.trim() === '' && <p className='text-red-500 text-center'>   Email address is required </p>}
                    </div>
                    <div className="mx-[5%] my-[3%] relative ">
                        <input
                            id='userPassword'
                            name='userPassword'
                            value={formData.userPassword}
                            type={showPassword ? "text" : "password"}
                            onChange={handleChange}
                            placeholder="Password"
                            className={`w-4/5  p-2 border-2 border-gray-500 rounded-md  outline-none ${error && formData.userPassword.trim() === '' ? 'border-red-500' : ''}`}
                        />
                        {error && formData.userPassword.trim() === '' && <p className='text-red-500 text-center'>   Please setup your password </p>}
                    </div>
                   
                    <button
                        onClick={handleSubmit}
                        className=" bg-gray-400 lg:mx-[45%] sm:mx-[25%] mt-2  p-1 w-32 rounded-lg"
                        disabled={loading}
                    >
                        {loading ? (<div> <FontAwesomeIcon icon={faSpinner} spin />  <span> Sign Up </span> </div>
                        ) : (
                            "Sign Up"
                        )}
                    </button>
                    <h2 className='text-center my-[1%] font-serif'>
                        Already a registered user? <Link className='text-blue-600 font-semibold' to="/login"> Login </Link>
                    </h2>
                </form>
            </div>
=======
import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import {
  faSpinner,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import './SignUp.css';

export const Signup = () => {
  const [loading, setLoading] = useState(false);
  const [isOnline, setIsOnline] = useState(true);
  const [errorModal, setErrorModal] = useState(false);
  const [errorModalDuration, setErrorModalDuration] = useState(6000);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalDisplayDuration, setModalDisplayDuration] = useState(4500);
  const [formData, setFormData] = useState({
    userFirstName: "",
    userMiddleName: "",
    userLastName: "",
    userName: "",
    email: "",
    userPassword: "",
    confirmPassword: "",
  });
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
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
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (!isOnline) {
      setIsModalOpen(true);
      return;
    }
    if (
      formData.userFirstName.trim() === "" ||
      formData.userLastName.trim() === "" ||
      formData.userName.trim() === "" ||
      formData.email.trim() === "" ||
      formData.userPassword.trim() === "" 
    ) {
      setError(true);
    } else {
      setError(false);
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
      const response = await fetch(
        "https://timesheet-api-main.onrender.com/user/signup",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-api-key": "a57cca53d2086ab3488b358eebbca2e7",
          },
          body: JSON.stringify(requestData),
        }
      );
      const responseData = await response.json();
      console.log("Response:", responseData);
      if (response.status === 201) {
        const accessToken = responseData["access-token"];
        const userId = responseData["user-id"];
        sessionStorage.setItem("access_token", accessToken);
        sessionStorage.setItem("user_id", userId);
        navigate("/UpdateReport");
      } else if (response.status === 400) {
        setErrorModal(true);
      } else {
        console.error("An error occurred:", responseData.message);
      }
    } catch (error) {
      console.error("An error occurred:", error);
    } finally {
      setLoading(false);
      setFormData((prevData) => ({
        ...prevData,
        userPassword: "",
      }));
    }
  };
  return (
    <div className=" w-full tc ">
      <Helmet>
        <title> SIGN UP </title>
      </Helmet>
      {isModalOpen && !isOnline && (
        <div className="fixed inset-0 flex items-center justify-center relative">
          <div className="bg-white p-2 w-20  rounded-lg  absolute top-1">
            <p className="text-lg font-semibold mb-1 text-red-500 text-center">
              No network/WiFi detected!
            </p>
          </div>
>>>>>>> aef59e3419b839fb6fb97801f75dcb0bc587e4f2
        </div>
      )}
      <div className="custom-box-shadow border lg:w-3/5 sm:w-4/5  mb-0  rounded absolute top-[11%]  lg:mx-[20%] sm:mx-[10%] ">
        {errorModal &&  (
          <div className="fixed inset-0 flex items-center justify-center relative">
            <div className="bg-white p-6 rounded-lg w-4/6 absolute top-7">
              <p className="text-lg font-semibold mb-4 text-center">
                Username/Email already exists
              </p>
            </div>
          </div>
        )}
        <p>
          <h1 className="text-center text-2xl font-semibold font-mono">
            CREATE ACCOUNT
          </h1>
        </p>
        <form onSubmit={handleSubmit}>
          <div className="mx-[5%] my-[3%]">
            <input
              type="text"
              id="userFirstName"
              name="userFirstName"
              value={formData.userFirstName}
              onChange={handleChange}
              placeholder="First Name"
              className={` w-4/5  p-2 border-2 border-gray-500 rounded-md  outline-none ${
                error && formData.userFirstName.trim() === ""
                  ? "border-red-500"
                  : ""
              } `}
            />
            {error && formData.userFirstName.trim() === "" && (
              <p className="text-red-500 text-center">
                Please enter your firstname
              </p>
            )}
          </div>
          <div className="mx-[5%] my-[3%]">
            <input
              type="text"
              id="userMiddleName"
              name="userMiddleName"
              value={formData.userMiddleName}
              onChange={handleChange}
              placeholder="Middle Name"
              className={` w-4/5  p-2 border-2 border-gray-500 rounded-md  outline-none ${
                error && formData.userMiddleName.trim() === ""
                  ? "border-red-500"
                  : ""
              } `}
            />
              {error && formData.userMiddleName.trim() === "" && (
              <p className="text-red-500 text-center">
                Please enter your middlename
              </p>
            )}
          </div>
          <div className="mx-[5%] my-[3%]">
            <input
              type="text"
              id="userLastName"
              name="userLastName"
              value={formData.userLastName}
              onChange={handleChange}
              placeholder="Last Name"
              className={` w-4/5  p-2 border-2 border-gray-500 rounded-md  outline-none ${
                error && formData.userLastName.trim() === ""
                  ? "border-red-500"
                  : ""
              } `}
            />
            {error && formData.userLastName.trim() === "" && (
              <p className="text-red-500 text-center">
                please enter your last name
              </p>
            )}
          </div>
          <div className="mx-[5%] my-[4%]">
            <input
              type="text"
              id="userName"
              name="userName"
              value={formData.userName}
              onChange={handleChange}
              placeholder="username"
              className={`w-4/5  p-2 border-2 border-gray-500 rounded-md  outline-none ${
                error && formData.userName.trim() === "" ? "border-red-500" : ""
              } `}
            />
            {error && formData.userName.trim() === "" && (
              <p className="text-red-500 text-center"> Please choose a username </p>
            )}
          </div>
          <div className="mx-[5%] my-[4%]">
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email address"
              className={`outline-none w-4/5  p-2 border-2 border-gray-500 rounded-md ${
                error && formData.email.trim() === "" ? "border-red-500" : ""
              } `}
            />
            {error && formData.email.trim() === "" && (
              <p className="text-red-500 text-center">
                Please enter your email address
              </p>
            )}
          </div>
          <div className="mx-[5%] my-[3%] relative ">
            <input
              id="userPassword"
              name="userPassword"
              value={formData.userPassword}
              type={showPassword ? "text" : "password"}
              onChange={handleChange}
              placeholder="Password"
              className={`w-4/5  p-2 border-2 border-gray-500 rounded-md  outline-none ${
                error && formData.userPassword.trim() === ""
                  ? "border-red-500"
                  : ""
              }`}
            />
            {error && formData.userPassword.trim() === "" && (
              <p className="text-red-500 text-center">
                Please create a password
              </p>
            )}
          </div>
          <button
            onClick={handleSubmit}
            className=" bg-gray-400 lg:mx-[45%] sm:mx-[25%] mt-2  p-1 w-32 rounded-lg"
            disabled={loading}
          >
            {loading ? (
              <div>
                {" "}
                <FontAwesomeIcon icon={faSpinner} spin /> <span> Sign Up </span>{" "}
              </div>
            ) : (
              "Sign Up"
            )}
          </button>
          <h2 className="text-center my-[1%] font-serif">
            Already have an account?
            <Link className="text-blue-600 font-semibold" to="/Signin">
              Login
            </Link>
          </h2>
        </form>
      </div>
    </div>
  );
};
