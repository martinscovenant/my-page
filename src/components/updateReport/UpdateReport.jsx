import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const UpdateReport = () => {
  const [formData, setFormData] = useState({
    date: "",
    project: "",
    task: "",
    status: "",
    duration: "",
    link: "",
  });
  const [isOnline, setIsOnline] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalDisplayDuration, setModalDisplayDuration] = useState(4500);

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
  const [reportEntries, setReportEntries] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(false);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const navigate = useNavigate();
  const handleLogout = () => {
    sessionStorage.removeItem("access_token");
    navigate("/login");
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (!isOnline) {
      setIsModalOpen(true);
      setLoading(false);
      return  report;
    };

    const accessToken = sessionStorage.getItem("access_token");
    const requestData = {
      date: formData.date,
      project: formData.project,
      task: formData.task,
      link: formData.link,
      status: formData.status,
      duration: formData.duration,
    };

    try {
      const response = await fetch(
        "https://timesheet-api-main.onrender.com/record/report",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-api-key": "a57cca53d2086ab3488b358eebbca2e7",
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify(requestData),
        }
      );

      if (response.status === 201) {
        setReportEntries([...reportEntries, requestData]);
        console.log("Report submitted successfully.");
      } else {
        alert("Report submission failed.");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    } finally {
      setLoading(false);
    }
    setFormData({
      date: "",
      project: "",
      task: "",
      status: "",
      duration: "",
      link: "",
    });

  const handleEdit = (reportData) => {
    setEditMode(true);
    setFormData(reportData);
  };
  const handleCancelEdit = () => {
    setEditMode(false);
    setFormData({
      date: "",
      project: "",
      task: "",
      status: "",
      duration: "",
      link: "",
    })
  };
  const handleSaveChanges = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const accessToken = sessionStorage.getItem("access_token");
      const requestData = {
        date: formData.date,
        project: formData.project,
        task: formData.task,
        link: formData.link,
        status: formData.status,
        duration: formData.duration,
      };
      const response = await fetch(
        "https://timesheet-api-main.onrender.com/record/report",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "x-api-key": "a57cca53d2086ab3488b358eebbca2e7",
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify(requestData),
        }
      );
      if (response.status === 200) {
        const updatedReportEntries = reportEntries.map((report) => {
          if (report.id === formData.id) {
            return { ...requestData, id: report.id };
          }
          return report;
        });
        setReportEntries(updatedReportEntries);
        console.log("Report updated successfully.");
      } else {
        alert("Report update failed.");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    } finally {
      setLoading(false);
    }
    setEditMode(false);
    setFormData({
      date: "",
      project: "",
      task: "",
      status: "",
      duration: "",
      link: "",
    });
  };

  return (
    <div>
      <Helmet>
        <title>REPORTS</title>
        <link
          rel="icon"
          type="image/png"
          href="./assets/Images/adviewicon.png"
        />
      </Helmet>
      <div className="w-100 p-1 h-11 flex justify-end my-4">
        <button
          className="bg-blue text-white rounded-md p-1 mr-3"
          onClick={handleLogout}
        >
          LOGOUT
        </button>
      </div>
      <div>
        {isModalOpen && !isOnline && (
          <div className="fixed inset-0 flex items-center justify-center relative">
            <div className="bg-white p-6 rounded-lg w-4/6 absolute top-7">
              <p className="text-lg font-semibold mb-4 text-center">
                No network/WiFi detected!
              </p>
            </div>
          </div>
        )}
        <div className="border w-3/5 mt-3 rounded mx-auto bg-white">
          <p>
            <h1 className="text-center text-2xl font-semibold font-mono">
              {!editMode ? "Add Report" : "Edit Report"}
            </h1>
          </p>
          {editMode ? (
            <div>
              <div className="mx-5 my-5">
                <input
                  type="date"
                  id="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  className="w-4/5 p-2 ba br2 b--gray outline-0"
                />
              </div>
              <div className="mx-5 my-5">
                <input
                  type="text"
                  id="project"
                  name="project"
                  value={formData.project}
                  onChange={handleChange}
                  placeholder="Project"
                  className=" w-4/5 p-2 ba br2 b--gray outline-0 "
                />
              </div>
              <div className="mx-5 my-5">
                <input
                  type="text"
                  id="task"
                  name="task"
                  value={formData.task}
                  onChange={handleChange}
                  placeholder="Task"
                  className=" w-4/5 p-2 ba br2 b--gray outline-0"
                />
              </div>
              <div className="mx-5 my-5">
                <input
                  id="status"
                  name="status"
                  value={formData.status}
                  type="text"
                  onChange={handleChange}
                  placeholder="Status"
                  className=" w-4/5 p-2 ba br2 b--gray outline-0 "
                />
              </div>
              <div className="mx-5 mt-5 mb-2">
                <input
                  id="duration"
                  name="duration"
                  value={formData.duration}
                  onChange={handleChange}
                  type="text"
                  placeholder="Duration"
                  className=" w-4/5 p-2 ba br2 b--gray outline-0 "
                />
              </div>
              <div className="mx-5 mt-5 mb-2">
                <input
                  id="link"
                  name="link"
                  value={formData.link}
                  onChange={handleChange}
                  type="text"
                  placeholder="Link"
                  className=" w-4/5 p-2 ba br2 b--gray outline-0 "
                />
              </div>

              <div className="w-65 p-2 mx-auto flex justify-evenly">
                <button
                  className="bg-blue p-2 br3"
                  onClick={handleSaveChanges}
                  disabled={loading}
                >
                  {loading ? (
                    <div>
                      <FontAwesomeIcon icon={faSpinner} spin />
                      <span>Submitting</span>
                    </div>
                  ) : (
                    "Save changes"
                  )}
                </button>
                <button className="bg-gray p-2 br3" onClick={handleCancelEdit}>
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="mx-5 my-5">
                <input
                  type="date"
                  id="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  className="w-4/5 p-2 ba br2 b--gray outline-0"
                />
              </div>
              <div className="mx-5 my-5">
                <input
                  type="text"
                  id="project"
                  name="project"
                  value={formData.project}
                  onChange={handleChange}
                  placeholder="Project"
                  className=" w-4/5 p-2 ba br2 b--gray outline-0 "
                />
              </div>
              <div className="mx-5 my-5">
                <input
                  type="text"
                  id="task"
                  name="task"
                  value={formData.task}
                  onChange={handleChange}
                  placeholder="Task"
                  className="w-4/5 p-2 ba br2 b--gray outline-0 "
                />
              </div>
              <div className="mx-5 my-5">
                <input
                  id="status"
                  name="status"
                  value={formData.status}
                  type="text"
                  onChange={handleChange}
                  placeholder="Status"
                  className=" w-4/5 p-2 ba br2 b--gray outline-0"
                />
              </div>
              <div className="mx-5 mt-5 mb-2">
                <input
                  id="duration"
                  name="duration"
                  value={formData.duration}
                  onChange={handleChange}
                  type="text"
                  placeholder="Duration"
                  className=" w-4/5 p-2 ba br2 b--gray outline-0 "
                />
              </div>
              <div className="mx-5 mt-5 mb-2">
                <input
                  id="link"
                  name="link"
                  value={formData.link}
                  onChange={handleChange}
                  type="text"
                  placeholder="Link"
                  className=" w-4/5 p-2 ba br2 b--gray outline-0"
                />
              </div>
              <button className="bg-green mx-33 my-5 p1 br3" disabled={loading}>
                {loading ? (
                  <div>
                    <FontAwesomeIcon icon={faSpinner} spin />
                    <span>Submitting</span>
                  </div>
                ) : (
                  "Submit"
                )}
              </button>
            </form>
          )}
        </div>
        <div className="my-5 overflow-x-scroll">
          <table className="mx-auto">
            <thead>
              <th className="ba br2 b--black-10 pv1">S/N</th>
              <th className="ba br2 b--black-10 pv1">DATE</th>
              <th className="ba br2 b--black-10 pv1">PROJECT</th>
              <th className="ba br2 b--black-10 pv1">TASK</th>
              <th className="ba br2 b--black-10 pv1">STATUS</th>
              <th className="ba br2 b--black-10 pv1">DURATION</th>
              <th className="ba br2 b--black-10 pv1">LINK</th>
            </thead>
            <tbody>
              {reportEntries.map((report, index) => (
                <tr key={index}>
                  <td className="ba br2 b--black-10 pv3">{index + 1}</td>
                  <td className="ba br2 b--black-10 pv3">{report.date}</td>
                  <td className="ba br2 b--black-10 pv3">{report.project}</td>
                  <td className="ba br2 b--black-10 pv3">{report.task}</td>
                  <td className="ba br2 b--black-10 pv3">{report.status}</td>
                  <td className="ba br2 b--black-10 pv3">{report.duration}</td>
                  <td className="ba br2 b--black-10 pv3">
                    {report.link}
                    <a
                      href={
                        report.link.startsWith("http")
                          ? report.link
                          : `http://${report.link}`
                      }
                      target="_blank"
                      rel="noopener noreferrer"
                      className="link blue"
                    >
                      {report.link}
                    </a>
                  </td>
                  <button
                    className="bg-gray white p-2 br3 w2 ml2 pointer"
                    onClick={() => handleEdit(report)}
                  >
                    Edit
                  </button>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
