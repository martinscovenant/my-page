import React, { useState } from "react";
import { Link } from "react-router-dom";
import './View.css';

export const ViewAllReport = () => {
    // ============= Initial State Start here =============
    const [date, setDate] = useState ( "");
    const [project, setProject] = useState("");
    const [task, setTask] = useState("");
    const [status, setStatus] = useState("");
    const [link, setLink] = useState("");
    const [duration, setDuration] = useState("");
    // ============= Initial State End here ===============
    // ============= Error Msg Start here =================
    const [errDate, setErrDate] = useState("");
    const [errProject, setErrProject] = useState("");
    const [errTask, setErrTask] = useState("");
    const [errStatus, setErrStatus] = useState("");
    const [errLink, setErrLink] = useState("");
    const [errDuration, setErrDuration] = useState("");
  
    // ============= Error Msg End here ===================
    const [successMsg, setSuccessMsg] = useState("");
    // ============= Event Handler Start here =============
    const handleDate = (e) => {
      setDate(e.target.value);
      setErrDate("");
    };
    const handleProject = (e) => {
      setProject(e.target.value);
      setErrProject("");
    };
    const handleTask = (e) => {
      setTask(e.target.value);
      setErrTask("");
    };
    const handleStatus = (e) => {
        setStatus(e.target.value);
        setErrStatus("");
      };
      const handleLink = (e) => {
        setLink(e.target.value);
        setErrLink("");
      };
      const handleDuration = (e) => {
        setDuration(e.target.value);
        setErrDuration("");
      };

      const LinkValidation = (link) => {
        return String(link)
          .toLowerCase()
         .match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i);
      };
    // ============= Event Handler End here ===============
  
    const handleViewAllReport = (e) => {
      e.preventDefault();
        if (!date) {
          setErrDate("input date");
        }
        if (!project) {
          setErrProject("put in ur project name");
         }
        if (!task) {
          setErrTask("put in your task name");
        }

        if (!status) {
            setErrStatus("put in ur project name");
           } 

           if (!link) {
            setErrLink("put your link");
           } else {
            if (!LinkValidation(link)) {
              setErrLink("Enter a Valid Link");
            }
          }
  
           if (!duration) {
            setErrDuration("fill in duration");
           } 
        // ============== Getting the value ==============
        if (
          date &&
          project &&
          task &&
          status &&
          link && 
          LinkValidation(link) &&
          duration
        ) {
          setSuccessMsg(
            `You have successfully sent your report`
          );
          setDate("");
          setProject("");
          setTask("");
          setStatus("");
          setLink("");
          setDuration("");
        }
      // }
    };
    return (
        <div className="App">
          {successMsg ? ( 
            <div className="w-[500px]">
              <p className="success">
                {successMsg}
              </p>
              <Link to="/">
                <button
                  className="bts"
                >
                  home
                </button>
              </Link>
            </div>
          ) : (
            <form className="done1">
              < div className="done2">
                <h4>
                  Fill in Report
                </h4>
                    <input
                      onChange={handleDate}
                      value={date}
                     className="w-full h-8 placeholder:text-sm placeholder:tracking-wide px-4 text-base font-medium placeholder:font-normal rounded-md border-[1px] border-gray-400 outline-none"
                      type="date"
                      placeholder="Date"
                    />
                    {errDate && (
                      <p className="name">
                        <span className="font-bold italic mr-1">!</span>
                        {errDate}
                      </p>
                    )}
                    <input
                      onChange={handleProject}
                      value={project}
                      className="w-full h-8 placeholder:text-sm placeholder:tracking-wide px-4 text-base font-medium placeholder:font-normal rounded-md border-[1px] border-gray-400 outline-none"
                      type="text"
                      placeholder="Project"
                    />
                    {errProject && (
                      <p className="text-sm text-red-500 font-titleFont font-semibold px-4">
                        <span className="font-bold italic mr-1">!</span>
                        {errProject}
                      </p>
                    )}
                    <input
                      onChange={handleTask}
                      value={task}
                      className="w-full h-8 placeholder:text-sm placeholder:tracking-wide px-4 text-base font-medium placeholder:font-normal rounded-md border-[1px] border-gray-400 outline-none"
                      type="text"
                      placeholder="Task"
                    />
                    {errTask && (
                      <p className="text-sm text-red-500 font-titleFont font-semibold px-4">
                        <span className="font-bold italic mr-1">!</span>
                        {errTask}
                      </p>
                    )}

                    <input
                      onChange={handleStatus}
                      value={status}
                      className="w-full h-8 placeholder:text-sm placeholder:tracking-wide px-4 text-base font-medium placeholder:font-normal rounded-md border-[1px] border-gray-400 outline-none"
                      type="text"
                      placeholder="Status"
                    />
                    {errStatus && (
                      <p className="text-sm text-red-500 font-titleFont font-semibold px-4">
                        <span className="font-bold italic mr-1">!</span>
                        {errStatus}
                      </p>
                    )}

                    <input
                      onChange={handleLink}
                      value={link}
                      className="w-full h-8 placeholder:text-sm placeholder:tracking-wide px-4 text-base font-medium placeholder:font-normal rounded-md border-[1px] border-gray-400 outline-none"
                      type="url"
                      placeholder="Link"
                    />
                    {errLink && (
                      <p className="text-sm text-red-500 font-titleFont font-semibold px-4">
                        <span className="font-bold italic mr-1">!</span>
                        {errLink}
                      </p>
                    )}

                   <input
                      onChange={handleDuration}
                      value={duration}
                      className="w-full h-8 placeholder:text-sm placeholder:tracking-wide px-4 text-base font-medium placeholder:font-normal rounded-md border-[1px] border-gray-400 outline-none"
                      type="text"
                      placeholder="Duration"
                    />
                    {errDuration && (
                      <p className="text-sm text-red-500 font-titleFont font-semibold px-4">
                        <span className="font-bold italic mr-1">!</span>
                        {errDuration}
                      </p>
                    )}
                    
                  <button
                  className="bst"
                    onClick={handleViewAllReport}
                  >
                    submit
                  </button>
                </div>
            </form>
          )}
        </div>
    );
  };


// import React, { useState, useEffect } from 'react';
// import { Helmet } from 'react-helmet';
// import { useNavigate } from "react-router-dom";
// import { faSpinner } from '@fortawesome/free-solid-svg-icons';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// export const Report = () => {
//     const [formData, setFormData] = useState({
//         date: "",
//         project: "",
//         task: "",
//         status: "",
//         duration: "",
//         link: "",
//     });
//     const [isOnline, setIsOnline] = useState(true);
//     const [isModalOpen, setIsModalOpen] = useState(false);
//     const [modalDisplayDuration, setModalDisplayDuration] = useState(4500);
//     useEffect(() => {
//         if (isModalOpen) {
//             const modalCloseTimer = setTimeout(() => {
//                 setIsModalOpen(false);
//             }, modalDisplayDuration);
//             return () => clearTimeout(modalCloseTimer);
//         }
//     }, [isModalOpen]);
//     const checkNetworkStatus = () => {
//         setIsOnline(navigator.onLine);
//     };
//     useEffect(() => {
//         checkNetworkStatus();
//         window.addEventListener("online", checkNetworkStatus);
//         window.addEventListener("offline", checkNetworkStatus);
//         return () => {
//             window.removeEventListener("online", checkNetworkStatus);
//             window.removeEventListener("offline", checkNetworkStatus);
//         };
//     }, []);
//     const [reportEntries, setReportEntries] = useState([]);
//     const [editMode, setEditMode] = useState(false);
//     const [loading, setLoading] = useState(false);
//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setFormData((prevData) => ({
//             ...prevData,
//             [name]: value,
//         }));
//     };
//     const navigate = useNavigate()
//     const handleLogout = () => {
//         sessionStorage.removeItem('access_token');
//         navigate('/SignIn')
//     }
//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setLoading(true)
//         if (!isOnline) {
//             setIsModalOpen(true);
//             setLoading(false)
//             return;
//         }
//         const accessToken = sessionStorage.getItem("access_token");
//         const requestData = {
//             date: formData.date,
//             project: formData.project,
//             task: formData.task,
//             link: formData.link,
//             status: formData.status,
//             duration: formData.duration,
//         };

//         try {
//             const response = await fetch('https://timesheet-api-main.onrender.com/record/report', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                     'x-api-key': 'a57cca53d2086ab3488b358eebbca2e7',
//                     'Authorization': `Bearer ${accessToken}`,
//                 },
//                 body: JSON.stringify(requestData),
//             });

//             if (response.status === 201) {
//                 setReportEntries([...reportEntries, requestData]);
//                 console.log('Report submitted successfully.');
//             } else {
//                 alert('Report submission failed.');
//             }
//         } catch (error) {
//             console.error('An error occurred:', error);
//         } finally {
//             setLoading(false);
//         }
//         setFormData({
//             date: "",
//             project: "",
//             task: "",
//             status: "",
//             duration: "",
//             link: "",
//         });
//     }
//     const handleEdit = (reportData) => {
//         setEditMode(true);
//         setFormData(reportData);
//     };
//     const handleCancelEdit = () => {
//         setEditMode(false);
//         setFormData({
//             date: "",
//             project: "",
//             task: "",
//             status: "",
//             duration: "",
//             link: "",
//         });
//     };
//     const handleSaveChanges = async (e) => {
//         e.preventDefault();
//         setLoading(true)
//         try {
//             const accessToken = sessionStorage.getItem("access_token");
//             const requestData = {
//                 date: formData.date,
//                 project: formData.project,
//                 task: formData.task,
//                 link: formData.link,
//                 status: formData.status,
//                 duration: formData.duration,
//             };
//             const response = await fetch('https://timesheet-api-main.onrender.com/record/report', {
//                 method: 'PUT',
//                 headers: {
//                     'Content-Type': 'application/json',
//                     'x-api-key': 'a57cca53d2086ab3488b358eebbca2e7',
//                     'Authorization': `Bearer ${accessToken}`,
//                 },
//                 body: JSON.stringify(requestData),
//             });
//             if (response.status === 200) {
//                 const updatedReportEntries = reportEntries.map(report => {
//                     if (report.id === formData.id) {
//                         return { ...requestData, id: report.id };
//                     }
//                     return report;
//                 });
//                 setReportEntries(updatedReportEntries);
//                 console.log('Report updated successfully.');
//             } else {
//                 alert('Report update failed.');
//             }
//         } catch (error) {
//             console.error('An error occurred:', error);
//         } finally {
//             setLoading(false);
//         }
//         setEditMode(false);
//         setFormData({
//             date: "",
//             project: "",
//             task: "",
//             status: "",
//             duration: "",
//             link: "",
//         });
//     };
//     return (
//         <div>
//             <Helmet>
//                 <title> REPORTS </title>
//                 <link rel="icon" type="image/png" href="./assets/Images/adviewicon.png" />
//             </Helmet>
//             <div className="w-full p-1 h-11 flex justify-end my-4">
//                 <button className="bg-blue-500 text-white rounded-md p-1 mr-[3%]" onClick={handleLogout} > LOGOUT </button>
//             </div>
//             <div>
//                 {isModalOpen && !isOnline && (
//                     <div className="fixed inset-0 flex items-center justify-center relative">
//                         <div className="bg-white p-6 rounded-lg w-4/6 absolute top-7">
//                             <p className="text-lg font-semibold mb-4 text-center">No network/WiFi detected!</p>
//                         </div>
//                     </div>
//                 )}
//                 <div className=" border lg:w-3/5 sm:w-4/5  mt-[3%] rounded   lg:mx-[20%] sm:mx-[10%] bg-white ">
//                     <p> <h1 className="text-center text-2xl font-semibold font-mono"> {!editMode ? "Add Report" : "Edit Report"}</h1> </p>
//                     {editMode ? (
//                         <div>
//                             <div className="mx-[5%] my-[5%]">
//                                 <input
//                                     type="date"
//                                     id="date"
//                                     name="date"
//                                     value={formData.date}
//                                     onChange={handleChange}
//                                     className=" w-4/5  p-2 border-2 border-gray-500 rounded-md  outline-none "
//                                 />
//                             </div>
//                             <div className="mx-[5%] my-[5%]">
//                                 <input
//                                     type="text"
//                                     id="project"
//                                     name="project"
//                                     value={formData.project}
//                                     onChange={handleChange}
//                                     placeholder="Project"
//                                     className=" w-4/5  p-2 border-2 border-gray-500 rounded-md  outline-none "
//                                 />
//                             </div>
//                             <div className="mx-[5%] my-[5%]">
//                                 <input
//                                     type="text"
//                                     id="task"
//                                     name="task"
//                                     value={formData.task}
//                                     onChange={handleChange}
//                                     placeholder="Task"
//                                     className=" outline-none w-4/5  p-2 border-2 border-gray-500 rounded-md "
//                                 />
//                             </div>
//                             <div className="mx-[5%] my-[5%]">
//                                 <input
//                                     id='status'
//                                     name='status'
//                                     value={formData.status}
//                                     type="text"
//                                     onChange={handleChange}
//                                     placeholder="Status"
//                                     className=" w-4/5  p-2 border-2 border-gray-500 rounded-md  outline-none "
//                                 />
//                             </div>
//                             <div className="mx-[5%] mt-[5%] mb-[2%]">
//                                 <input
//                                     id="duration"
//                                     name='duration'
//                                     value={formData.duration}
//                                     onChange={handleChange}
//                                     type="text"
//                                     placeholder="Duration"
//                                     className=" w-4/5  p-2 border-2 border-gray-500 rounded-md  outline-none "
//                                 />
//                             </div>
//                             <div className="mx-[5%] mt-[5%] mb-[2%]">
//                                 <input
//                                     id="link"
//                                     name='link'
//                                     value={formData.link}
//                                     onChange={handleChange}
//                                     type="text"
//                                     placeholder="Link"
//                                     className=" w-4/5  p-2 border-2 border-gray-500 rounded-md  outline-none "
//                                 />
//                             </div>
//                             <div className=' w-[65%] p-2 mx-auto flex justify-evenly  '>
//                                 <button
//                                     className="bg-blue-500  p-2  rounded-lg"
//                                     onClick={handleSaveChanges}
//                                     disabled={loading}
//                                 >
//                                      {loading ? (<div> <FontAwesomeIcon icon={faSpinner} spin />  <span> Submitting </span> </div>
//                                 ) : (
//                                     "Save changes"
//                                 )}
//                                 </button>
//                                 <button
//                                     className="bg-gray-500  p-2 rounded-lg"
//                                     onClick={handleCancelEdit}
//                                 >
//                                     Cancel
//                                 </button>
//                             </div>
//                         </div>
//                     ) : (
//                         <form onSubmit={handleSubmit}>
//                             <div className="mx-[5%] my-[5%]">
//                                 <input
//                                     type="date"
//                                     id="date"
//                                     name="date"
//                                     value={formData.date}
//                                     onChange={handleChange}
//                                     className=" w-4/5  p-2 border-2 border-gray-500 rounded-md  outline-none "
//                                 />
//                             </div>
//                             <div className="mx-[5%] my-[5%]">
//                                 <input
//                                     type="text"
//                                     id="project"
//                                     name="project"
//                                     value={formData.project}
//                                     onChange={handleChange}
//                                     placeholder="Project"
//                                     className=" w-4/5  p-2 border-2 border-gray-500 rounded-md  outline-none "
//                                 />
//                             </div>
//                             <div className="mx-[5%] my-[5%]">
//                                 <input
//                                     type="text"
//                                     id="task"
//                                     name="task"
//                                     value={formData.task}
//                                     onChange={handleChange}
//                                     placeholder="Task"
//                                     className=" outline-none w-4/5  p-2 border-2 border-gray-500 rounded-md "
//                                 />
//                             </div>
//                             <div className="mx-[5%] my-[5%]">
//                                 <input
//                                     id='status'
//                                     name='status'
//                                     value={formData.status}
//                                     type="text"
//                                     onChange={handleChange}
//                                     placeholder="Status"
//                                     className=" w-4/5  p-2 border-2 border-gray-500 rounded-md  outline-none "
//                                 />
//                             </div>
//                             <div className="mx-[5%] mt-[5%] mb-[2%]">
//                                 <input
//                                     id="duration"
//                                     name='duration'
//                                     value={formData.duration}
//                                     onChange={handleChange}
//                                     type="text"
//                                     placeholder="Duration"
//                                     className=" w-4/5  p-2 border-2 border-gray-500 rounded-md  outline-none "
//                                 />
//                             </div>
//                             <div className="mx-[5%] mt-[5%] mb-[2%]">
//                                 <input
//                                     id="link"
//                                     name='link'
//                                     value={formData.link}
//                                     onChange={handleChange}
//                                     type="text"
//                                     placeholder="Link"
//                                     className=" w-4/5  p-2 border-2 border-gray-500 rounded-md  outline-none "
//                                 />
//                             </div>
//                             <button
//                                 className=" bg-green-600 mx-[33%] my-[5%]  p-1 w-32 rounded-lg"
//                                 disabled={loading}
//                             >
//                                 {loading ? (<div> <FontAwesomeIcon icon={faSpinner} spin />  <span> Submitting </span> </div>
//                                 ) : (
//                                     "Submit"
//                                 )}
//                             </button>
//                         </form>
//                     )}
//                 </div>
//                 <div className='my-[5%]  sm:overflow-x-scroll lg:overflow-x-hidden '>
//                     <table className=' mx-auto'>
//                         <thead>
//                             <th className='border-2 border-solid border-black p-1'> S/N </th>
//                             <th className='border-2 border-solid border-black p-1'> DATE </th>
//                             <th className='border-2 border-solid border-black p-1'> PROJECT </th>
//                             <th className='border-2 border-solid border-black p-1'> TASK </th>
//                             <th className='border-2 border-solid border-black p-1'> STATUS </th>
//                             <th className='border-2 border-solid border-black p-1'> DURATION </th>
//                             <th className='border-2 border-solid border-black p-1'> LINK </th>
//                         </thead>
//                         <tbody>
//                             {reportEntries.map((report, index) => (
//                                 <tr key={index}>

//                                     <td className="border-2 border-solid border-black p-3 ">
//                                         {index + 1}
//                                     </td>
//                                     <td className="border-2 border-solid border-black p-3 ">
//                                         {report.date}
//                                     </td>
//                                     <td className="border-2 border-solid border-black p-3 ">
//                                         {report.project}
//                                     </td>
//                                     <td className="border-2 border-solid border-black p-3 ">
//                                         {report.task}
//                                     </td>
//                                     <td className="border-2 border-solid border-black p-3 ">
//                                         {report.status}
//                                     </td>
//                                     <td className="border-2 border-solid border-black p-3 ">
//                                         {report.duration}
//                                     </td>
//                                     <td className="border-2 border-solid border-black p-3 text-blue-500">
//                                         <a href={report.link.startsWith("http") ? report.link : `http://${report.link}`} target="_blank" rel="noopener noreferrer">{report.link} </a>

//                                     </td>
//                                     <button
//                                         className="bg-gray-500 text-white p-2 rounded-lg w-20 mx-2 cursor-pointer"
//                                         onClick={() => handleEdit(report)}
//                                     >
//                                         Edit
//                                     </button>
//                                 </tr>
//                             ))}
//                         </tbody>
//                     </table>
//                 </div>
//             </div>
//         </div>
//     )
// }