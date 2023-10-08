import React, { useState } from 'react';
import axios from 'axios';

const UpdateReport = () => {
  const [reportData, setReportData] = useState({
    date: '2023-08-14',
    project: 'Test project',
    task: 'Did some tasks (This is an update)',
    link: 'https://example.com',
    status: 'complete',
    duration: '4 hours',
  });

  const [responseMessage, setResponseMessage] = useState('');
  const [isReportUpdated, setIsReportUpdated] = useState(false);

  const handleUpdate = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.put(
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
      setIsReportUpdated(true);
    } catch (error) {
      console.error('Error updating report:', error);
      setResponseMessage('Error updating report.');
    }
  };

  return (
    <div>
      <h1>Update Report</h1>
      <form onSubmit={handleUpdate}>
        <div>
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
        <div>
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
        <div>
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
        <div>
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
        <div>
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
        <div>
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
        <button type="submit">Update Report</button>
      </form>
      {isReportUpdated && <p>{responseMessage}</p>}
    </div>
  );
};

export default UpdateReport;
