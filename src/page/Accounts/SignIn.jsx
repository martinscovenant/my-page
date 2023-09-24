
import React, { useState } from 'react';
import { Link } from "react-router-dom";
import './SignUp.css';


 export const SignIn = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData ((prevData) => ({
      ...prevData, 
      [name]:
      value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
     if (!formData.email) {

      }
      
        if (!formData.password) {
          


        if (
          formData.email && 
          formData.password
          ) {
                
               setFormData((prevData) => ({
                ...prevData,
                password: '',
               email: '',
               }));
               }
           };

    try {
      const response = await fetch('https://timesheet-api-main.onrender.com/user/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': 'a57cca53d2086ab3488b358eebbca2e7',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
         console.log('Login was successful.')
      } else {
        alert('Login failed.')
      }
    } catch (error) {
      console.log('An error occured:', error)
    } 

  };

  return (
   
    <div className="App">
          <div className="w-[500px]">
         <p className="success">
             </p>
           <Link to="/SignUp">
                 <button
                className="w-full h-10 bg-primeColor text-gray-200 rounded-md text-base font-titleFont font-semibold 
            tracking-wide hover:bg-black hover:text-white duration-300"
              >
                Sign Up
              </button>
            </Link>
          </div> 
          <form onChange={handleInputChange}>
            <div className="done2">
              <h3>
                Sign in
              </h3>
                  <input
                    name='email'
                    id='email'
                    onChange={handleInputChange}
                    value={formData.email}
                    className="w-full h-8 placeholder:text-sm placeholder:tracking-wide px-4 text-base font-medium placeholder:font-normal rounded-md border-[1px] border-gray-400 outline-none"
                    type="email"
                    placeholder="Email"
                    required
                  />
                
                  <input
                  name='password'
                  id='password'
                    onChange={handleInputChange}
                    value={formData.password}
                    className="w-full h-8 placeholder:text-sm placeholder:tracking-wide px-4 text-base font-medium placeholder:font-normal rounded-md border-[1px] border-gray-400 outline-none"
                    type="password"
                    placeholder="Create password"
                    required
                  />
                 
                <button
                  onClick={handleSubmit}
                  className="bg-primeColor hover:bg-black text-gray-200 hover:text-white cursor-pointer w-full text-base font-medium h-10 rounded-md  duration-300"
                >
                  Sign In
                   </button>
                   <p className="text-sm text-center font-titleFont font-medium">
                     Don't have an Account?{" "}
                     <Link to="/">
                       <span className="hover:text-blue-600 duration-300">
                        Sign up
                      </span>
                    </Link>
                  </p>
                </div>
            </form>
           
         </div>
         
     );
   };





