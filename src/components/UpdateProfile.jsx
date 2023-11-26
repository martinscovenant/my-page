
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const UpdateProfile = () => {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState(null);
  const [editedData, setEditedData] = useState({ firstname: '', middlename: '',lastname: '',});

  const accessToken = sessionStorage.getItem('access_token');
  const editApiUrl = 'https://timesheet-api-main.onrender.com/user/account/personal-information/name';
  const apiUrl = 'https://timesheet-api-main.onrender.com/user/account/personal-information/';
  const headers = {
    'x-api-key': 'a57cca53d2086ab3488b358eebbca2e7',
    Authorization: `Bearer ${accessToken}`,
  };

  useEffect(() => {
    fetch(apiUrl, { headers })
      .then((response) => (response.status === 200 ? response.json() : Promise.reject(response.status)))
      .then((data) => setUserData(data.data))
      .catch((error) => console.error('Error fetching data:', error));
  }, [apiUrl, headers]);

  const handleEditProfile = () => setIsEditing(true);

  const handleSaveProfile = () => {
    fetch(editApiUrl, {
      method: 'PUT',
      headers,
      body: JSON.stringify(editedData),
    })
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        } else {
          console.error('API request failed with status code:', response.status);
          return response.json(); 
        }
      })
      .then((data) => {
      
        console.log('API Response Data:', data);

        setUserData(data.data);
        setIsEditing(false); 
      })
      .catch((error) => {
        console.error('An error occurred while making the API request:', error);
      });
  };

  return (
    <div>
      <h1>{!isEditing ? `User Profile` : 'Edit Profile'}</h1>
      <button onClick={() => navigate('/reports')}>Back</button>
      {isEditing ? (
        <div>
          {['firstname', 'lastname', 'middlename'].map((name) => (
            <input
              key={name}
              type='text'
              placeholder={name.charAt(0).toUpperCase() + name.slice(1)}
              value={editedData[name]}
              onChange={(e) => setEditedData({ ...editedData, [name]: e.target.value })}
            />
          ))}
          <button onClick={handleSaveProfile}>Save Profile</button>
        </div>
      ) : (
        <div>
          {['firstname', 'lastname', 'middlename'].map((name) => (
            <div key={name}>
              <div>
                <h1>{name.charAt(0).toUpperCase() + name.slice(1)}</h1>
              </div>
              <div>
                <h2>{userData?.[name]}</h2>
              </div>
            </div>
          ))}
          <button onClick={handleEditProfile}>Edit Profile</button>
        </div>
      )}
    </div>
  );
};

