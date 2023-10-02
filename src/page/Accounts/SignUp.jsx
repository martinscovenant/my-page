 

// // Signup.js
// import React, { useState } from 'react';
// import axios from 'axios';
// import './SignUp.css' 

// export const Signup = () => {
//   const [formData, setFormData] = useState({
//     username: '',
//     firstname: '',
//     lastname: '',
//     middlename: '',
//     email: '',
//     password: '',
//   });

//   const [message, setMessage] = useState('');

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleSignup = async () => {
//     try {
//       const response = await axios.post(
//         'https://timesheet-api-main.onrender.com/user/signup',
//         formData,
//         {
//           headers: {
//             'x-api-key': 'a57cca53d2086ab3488b358eebbca2e7',
//             'Content-Type': 'application/json',
//           },
//         }
//       );

//       if (response.data.status) {
      
//         console.log('User created successfully');
//         setMessage('User created successfully');

//       } else {
       
//         console.error('Signup failed');
//         setMessage('Signup failed');
//       }
//     } catch (error) {
//       console.error('Error during signup:', error);
//     }
//   };

//   return (
//     <div className='App'>
//       <div className='done'>
//       <h3>User Signup</h3>
//       {message && <p>{message}</p>}
//       <input
//         type="text"
//         name="username"
//         placeholder="Username"
//         value={formData.username}
//         onChange={handleChange}
//       />
//       <input
//         type="text"
//         name="firstname"
//         placeholder="First Name"
//         value={formData.firstname}
//         onChange={handleChange}
//       />
//       <input
//         type="text"
//         name="lastname"
//         placeholder="Last Name"
//         value={formData.lastname}
//         onChange={handleChange}
//       />
//       <input
//         type="text"
//         name="middlename"
//         placeholder="Middle Name"
//         value={formData.middlename}
//         onChange={handleChange}
//       />
//       <input
//         type="email"
//         name="email"
//         placeholder="Email"
//         value={formData.email}
//         onChange={handleChange}
//       />
//       <input
//         type="password"
//         name="password"
//         placeholder="Password"
//         value={formData.password}
//         onChange={handleChange}
//       />
//       <button onClick={handleSignup}>Signup</button>
//     </div>
//     </div>
//   );
// };



import React, { useState } from 'react';
import axios from 'axios';
import './SignUp.css';

export const Signup = () => {
  const [formData, setFormData] = useState({
    username: '',
    firstname: '',
    lastname: '',
    middlename: '',
    email: '',
    password: '',
  });

  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSignup = async () => {
    try {
      setLoading(true);
      const response = await axios.post(
        'https://timesheet-api-main.onrender.com/user/signup',
        formData,
        {
          headers: {
            'x-api-key': 'a57cca53d2086ab3488b358eebbca2e7',
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.data.status) {
        console.log('User created successfully');
        setMessage('User created successfully');
      } else {
        console.error('Signup failed');
        setMessage('Signup failed');
      }
    } catch (error) {
      console.error('Error during signup:', error);
      setMessage('Error during signup. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='App'>
      <div className='done'>
        <h3>User Signup</h3>
        {message && <p>{message}</p>}
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
        />
        <input
          type="text"
          name="firstname"
          placeholder="First name"
          value={formData.firstname}
          onChange={handleChange}
        />
        <input
          type="text"
          name="middlename"
          placeholder="Middle name"
          value={formData.username}
          onChange={handleChange}
        />
        <input
          type="text"
          name="lastname"
          placeholder="Last name"
          value={formData.lastname}
          onChange={handleChange}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
        />
        <button onClick={handleSignup} disabled={loading}>
          {loading ? 'Signing up...' : 'Signup'}
        </button>
      </div>
    </div>
  );
};





