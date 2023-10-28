import React, { useState } from 'react';
import axios from 'axios';

export const UpdateUserName = () => {
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    middlename: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const url = 'https://timesheet-api-main.onrender.com/user/account/personal-information/name';

    const headers = {
      'x-api-key': 'a57cca53d2086ab3488b358eebbca2e7',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmcmVzaCI6ZmFsc2UsImlhdCI6MTY5Nzg3MTIyOSwianRpIjoiNjdhMTE2YTAtM2UxYy00YjA5LWIyZmUtMmM1ZGJiNzE5YmE3IiwidHlwZSI6ImFjY2VzcyIsInN1YiI6IjY1MDhmNjRhODUzMmUzZThlYjI0MmRmYiIsIm5iZiI6MTY5Nzg3MTIyOSwiZXhwIjoxNjk4NDc2MDI5fQ.f9suhTF9IjYXXvzrHND1dQA7mSwXtEpnz2mQP8604pU',
    };

    try {
      const response = await axios.put(url, formData, { headers });
      console.log("Account info updated successfully", response.data);
    } catch (error) {
      console.error('Failed to update account:', error);
    }
  };

  return (
    <div>
      <h2>Update User's Name</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="firstname">First Name:</label>
        <input
          type="text"
          name="firstname"
          value={formData.firstname}
          onChange={handleChange}
        />
        <br />
        <label htmlFor="lastname">Last Name:</label>
        <input
          type="text"
          name="lastname"
          value={formData.lastname}
          onChange={handleChange}
        />
        <br />
        <label htmlFor="middlename">Middle Name (optional):</label>
        <input
          type="text"
          name="middlename"
          value={formData.middlename}
          onChange={handleChange}
        />
        <br />
        <button type="submit">Update Name</button>
      </form>
    </div>
  );
};


