
import React, { useState } from 'react';
import { Link } from "react-router-dom";
import './SignUp.css';

 export const SignUp = () => {
  const [formData, setFormData] = useState({
    userName: '',
    firstName: '',
    lastName: '',
    middleName: '',
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
    if (!formData.userName) {

    }

    if (!formData.firstName) {

    }

    if (!formData.lastName) {

    }

    if (!formData.middleName) {

    }

     if (!formData.email) {

      }
      
        if (!formData.password) {
          
        if (
          formData.userName &&
          formData.firstName &&
          formData.lastName &&
          formData.middleName &&
          formData.email && 
          formData.password
          ) {
                
               setFormData((prevData) => ({
                ...prevData,
                userName: '',
                firstName: '',
                lastName: '',
                middleName: '',
               email: '',
               password: '',
               }));
               }
           };

    try {
      const response = await fetch('https://timesheet-api-main.onrender.com/user/signup', {
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
        alert('Signup failed.')
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
           <Link to="/signIn">
            </Link>
          </div> 
          <form onChange={handleInputChange}>
            <div className="done">
              <h3>
                Sign up
              </h3>
                  <input 
                  name='userName'
                  id='userName'
                  onChange={handleInputChange}
                  value={formData.userName}
                  className="w-full h-8 placeholder:text-sm placeholder:tracking-wide px-4 text-base font-medium placeholder:font-normal rounded-md border-[1px] border-gray-400 outline-none"
                  type='userName'
                  placeholder='User Name'
                  required
                  />

                   <input 
                     name='firstName'
                     id='firstName'
                     onChange={handleInputChange}
                     value={formData.firstName}
                    className="w-full h-8 placeholder:text-sm placeholder:tracking-wide px-4 text-base font-medium placeholder:font-normal rounded-md border-[1px] border-gray-400 outline-none"
                    type='text'
                    placeholder='first name'
                    required
                  />
                <input 
                  name='lastName'
                  id='lastName'
                  onChange={handleInputChange}
                  value={formData.lastName}
                  className="w-full h-8 placeholder:text-sm placeholder:tracking-wide px-4 text-base font-medium placeholder:font-normal rounded-md border-[1px] border-gray-400 outline-none"
                  type='text'
                  placeholder='Last name'
                  required
                  />
                  
                  <input 
                  name='middleName'
                  id='middleName'
                  onChange={handleInputChange}
                  value={formData.middleName}
                  className="w-full h-8 placeholder:text-sm placeholder:tracking-wide px-4 text-base font-medium placeholder:font-normal rounded-md border-[1px] border-gray-400 outline-none"
                  type='text'
                  placeholder='Middle name'
                  required
                  />

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
                  Sign up
                   </button>
                   <p className="text-sm text-center font-titleFont font-medium">
                     Don't have an Account?{" "}
                     <Link to="/SigIn">
                       <span className="hover:text-blue-600 duration-300">
                        Sign in
                      </span>
                    </Link>
                  </p>
                </div>
            </form>
           
         </div>
     );
   };







