import React, { useState } from 'react';
import axios from 'axios';
import './Record.css'

export const RecordReport = () => {
  const [reportData, setReportData] = useState({
    date: '',
    project: '',
    task: '',
    link: '',
    status: '',
    duration: '',
  });

  const [responseMessage, setResponseMessage] = useState('');
  const [isReportRecorded, setIsReportRecorded] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        'https://timesheet-api-main.onrender.com/record/report',
        reportData,
        {
          headers: {
            'x-api-key': 'a57cca53d2086ab3488b358eebbca2e7',
            Authorization: 'Bearer <user_access_token>', // Replace with the actual user access token
          },
        }
      );

      setResponseMessage(response.data.message);
      setIsReportRecorded(true);
    } catch (error) {
      console.error('Error recording report:', error);
      setResponseMessage('Error recording report.');
    }
  };

  return (
    <div className="container">
      <h1>Record Report</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Date:</label>
          <input
            type="date"
            name="date"
            value={reportData.date}
            onChange={(e) =>
              setReportData({ ...reportData, date: e.target.value })
            }
            required
          />
        </div>
        <div className="form-group">
          <label>Project:</label>
          <input
            type="text"
            name="project"
            value={reportData.project}
            onChange={(e) =>
              setReportData({ ...reportData, project: e.target.value })
            }
            required
          />
        </div>
        <div className="form-group">
          <label>Task:</label>
          <input
            type="text"
            name="task"
            value={reportData.task}
            onChange={(e) =>
              setReportData({ ...reportData, task: e.target.value })
            }
            required
          />
        </div>
        <div className="form-group">
          <label>Link:</label>
          <input
            type="url"
            name="link"
            value={reportData.link}
            onChange={(e) =>
              setReportData({ ...reportData, link: e.target.value })
            }
            required
          />
        </div>
        <div className="form-group">
          <label>Status:</label>
          <input
            type="text"
            name="status"
            value={reportData.status}
            onChange={(e) =>
              setReportData({ ...reportData, status: e.target.value })
            }
            required
          />
        </div>
        <div className="form-group">
          <label>Duration:</label>
          <input
            type="text"
            name="duration"
            value={reportData.duration}
            onChange={(e) =>
              setReportData({ ...reportData, duration: e.target.value })
            }
            required
          />
        </div>
        <button type="submit">Submit Report</button>
      </form>
      {isReportRecorded && <p>{responseMessage}</p>}
    </div>
  );
};

