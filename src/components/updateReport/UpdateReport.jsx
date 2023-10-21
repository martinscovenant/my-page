// import React, { useState, useEffect } from 'react';
// import { Helmet } from 'react-helmet';
// import { useNavigate } from "react-router-dom";
// import { faSpinner } from '@fortawesome/free-solid-svg-icons';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// export const UpdateReports = () => {
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
//     useEffect(() => {
//         const savedData = sessionStorage.getItem('reportEntries');
//         if (savedData) {
//             setReportEntries(JSON.parse(savedData));
//         }
//     }, []);

//     useEffect(() => {
//         sessionStorage.setItem('reportEntries', JSON.stringify(reportEntries));
//     }, [reportEntries]);

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
//         navigate('/login')
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
//                 // setReportEntries([...reportEntries, requestData]);
//                 const newReportEntries = [...reportEntries, requestData];
//                 setReportEntries(newReportEntries);
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
//                 <title> Send Reports </title>

//             </Helmet>
//             <div className='flex  w-full h-[75px] justify-end items-center bg-white-500'>
//                 <div className='flex p-5'>
//                     <div className="">
//                         <button className="bg-blue-500 text-white rounded-md p-1 mr-3" onClick={() => navigate("/profile")} > View profile </button>
//                     </div>
//                     <div className="">
//                         <button className="bg-blue-500 text-white rounded-md p-1 mr-[3%]" onClick={handleLogout} > LOGOUT </button>
//                     </div>
//                 </div>
//             </div>
//             <div>
//                 {isModalOpen && !isOnline && (
//                     <div className=" inset-0 flex items-center justify-center relative">
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
//                                     {loading ? (<div> <FontAwesomeIcon icon={faSpinner} spin />  <span> Submitting </span> </div>
//                                     ) : (
//                                         "Save changes"
//                                     )}
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
//                                         className="bg-brown-500 text-white p-2 rounded-lg w-20 mx-2 cursor-pointer"
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

import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useNavigate } from "react-router-dom";
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const UpdateReports = () => {
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

    useEffect(() => {
        const savedData = sessionStorage.getItem('reportEntries');
        if (savedData) {
            setReportEntries(JSON.parse(savedData));
        }
    }, []);

    useEffect(() => {
        sessionStorage.setItem('reportEntries', JSON.stringify(reportEntries));
    }, [reportEntries]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const navigate = useNavigate();

    const handleLogout = () => {
        sessionStorage.removeItem('access_token');
        navigate('/login');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        if (!isOnline) {
            setIsModalOpen(true);
            setLoading(false);
            return;
        }
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
            const response = await fetch('https://timesheet-api-main.onrender.com/record/report', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-api-key': 'a57cca53d2086ab3488b358eebbca2e7',
                    'Authorization': `Bearer ${accessToken}`,
                },
                body: JSON.stringify(requestData),
            });

            if (response.status === 201) {
                const newReportEntries = [...reportEntries, requestData];
                setReportEntries(newReportEntries);
                console.log('Report submitted successfully.');
            } else {
                alert('Report submission failed.');
            }
        } catch (error) {
            console.error('An error occurred:', error);
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
    };

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
        });
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
            const response = await fetch('https://timesheet-api-main.onrender.com/record/report', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'x-api-key': 'a57cca53d2086ab3488b358eebbca2e7',
                    'Authorization': `Bearer ${accessToken}`,
                },
                body: JSON.stringify(requestData),
            });
            if (response.status === 200) {
                const updatedReportEntries = reportEntries.map(report => {
                    if (report.id === formData.id) {
                        return { ...requestData, id: report.id };
                    }
                    return report;
                });
                setReportEntries(updatedReportEntries);
                console.log('Report updated successfully.');
            } else {
                alert('Report update failed.');
            }
        } catch (error) {
            console.error('An error occurred:', error);
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
                <title>Send Reports</title>
            </Helmet>
            <div className='flex w-full h-[75px] justify-end items-center bg-white-500'>
                <div className='flex p-5'>
                    <div className="mr-3">
                        <button className="bg-blue white p-1 br3" onClick={() => navigate("/profile")}>View Profile</button>
                    </div>
                    <div className="mr-[3%]">
                        <button className="bg-blue white p-1 br3" onClick={handleLogout}>LOGOUT</button>
                    </div>
                </div>
            </div>
            <div>
                {isModalOpen && !isOnline && (
                    <div className="inset-0 flex items-center justify-center relative">
                        <div className="bg-white p-6 br2 w-4/6 absolute top-7">
                            <p className="f3 fw6 mb4 tc">No network/WiFi detected!</p>
                        </div>
                    </div>
                )}
                <div className="b br3 mt-[3%] bg-white">
                    <p>
                        <h1 className="tc f2 fw6 code">{!editMode ? "Add Report" : "Edit Report"}</h1>
                    </p>
                    {editMode ? (
                        <div>
                            <div className="mv5 mh5">
                                <input
                                    type="date"
                                    id="date"
                                    name="date"
                                    value={formData.date}
                                    onChange={handleChange}
                                    className="w-80 pa2 b--black-500 br2 outline-0"
                                />
                            </div>
                            <div className="mv5 mh5">
                                <input
                                    type="text"
                                    id="project"
                                    name="project"
                                    value={formData.project}
                                    onChange={handleChange}
                                    placeholder="Project"
                                    className="w-80 pa2 b--black-500 br2 outline-0"
                                />
                            </div>
                            <div className="mv5 mh5">
                                <input
                                    type="text"
                                    id="task"
                                    name="task"
                                    value={formData.task}
                                    onChange={handleChange}
                                    placeholder="Task"
                                    className="w-80 pa2 b--black-500 br2 outline-0"
                                />
                            </div>
                            <div className="mv5 mh5">
                                <input
                                    id='status'
                                    name='status'
                                    value={formData.status}
                                    type="text"
                                    onChange={handleChange}
                                    placeholder="Status"
                                    className="w-80 pa2 b--black-500 br2 outline-0"
                                />
                            </div>
                            <div className="mv5">
                                <input
                                    id="duration"
                                    name='duration'
                                    value={formData.duration}
                                    onChange={handleChange}
                                    type="text"
                                    placeholder="Duration"
                                    className="w-80 pa2 b--black-500 br2 outline-0"
                                />
                            </div>
                            <div className="mv5">
                                <input
                                    id="link"
                                    name='link'
                                    value={formData.link}
                                    onChange={handleChange}
                                    type="text"
                                    placeholder="Link"
                                    className="w-80 pa2 b--black-500 br2 outline-0"
                                />
                            </div>
                            <div className='w-65 pa2 mh-auto flex justify-between'>
                                <button
                                    className="bg-blue white pa2 br3"
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
                                <button
                                    className="bg-gray pa2 br3"
                                    onClick={handleCancelEdit}
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit}>
                            <div className="mv5 mh5">
                                <input
                                    type="date"
                                    id="date"
                                    name="date"
                                    value={formData.date}
                                    onChange={handleChange}
                                    className="w-80 pa2 b--black-500 br2 outline-0"
                                />
                            </div>
                            <div className="mv5 mh5">
                                <input
                                    type="text"
                                    id="project"
                                    name="project"
                                    value={formData.project}
                                    onChange={handleChange}
                                    placeholder="Project"
                                    className="w-80 pa2 b--black-500 br2 outline-0"
                                />
                            </div>
                            <div className="mv5 mh5">
                                <input
                                    type="text"
                                    id="task"
                                    name="task"
                                    value={formData.task}
                                    onChange={handleChange}
                                    placeholder="Task"
                                    className="w-80 pa2 b--black-500 br2 outline-0"
                                />
                            </div>
                            <div className="mv5 mh5">
                                <input
                                    id='status'
                                    name='status'
                                    value={formData.status}
                                    type="text"
                                    onChange={handleChange}
                                    placeholder="Status"
                                    className="w-80 pa2 b--black-500 br2 outline-0"
                                />
                            </div>
                            <div className="mv5">
                                <input
                                    id="duration"
                                    name='duration'
                                    value={formData.duration}
                                    onChange={handleChange}
                                    type="text"
                                    placeholder="Duration"
                                    className="w-80 pa2 b--black-500 br2 outline-0"
                                />
                            </div>
                            <div className="mv5">
                                <input
                                    id="link"
                                    name='link'
                                    value={formData.link}
                                    onChange={handleChange}
                                    type="text"
                                    placeholder="Link"
                                    className="w-80 pa2 b--black-500 br2 outline-0"
                                />
                            </div>
                            <button
                                className="bg-blue pa1 br3 mh3 w-32"
                                disabled={loading}
                            >
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
                <div className='mv5 overflow-x-scroll'>
                    <table className='mh-auto'>
                        <thead>
                            <tr className='b--black-500 ba'>
                                <th className='pa1'>S/N</th>
                                <th className='pa1'>DATE</th>
                                <th className='pa1'>PROJECT</th>
                                <th className='pa1'>TASK</th>
                                <th className='pa1'>STATUS</th>
                                <th className='pa1'>DURATION</th>
                                <th className='pa1'>LINK</th>
                            </tr>
                        </thead>
                        <tbody>
                            {reportEntries.map((report, index) => (
                                <tr key={index} className='b--black-500 ba'>
                                    <td className="pa3">
                                        {index + 1}
                                    </td>
                                    <td className="pa3">
                                        {report.date}
                                    </td>
                                    <td className="pa3">
                                        {report.project}
                                    </td>
                                    <td className="pa3">
                                        {report.task}
                                    </td>
                                    <td className="pa3">
                                        {report.status}
                                    </td>
                                    <td className="pa3">
                                        {report.duration}
                                    </td>
                                    <td className="pa3 blue">
                                        <a href={report.link.startsWith("http") ? report.link : `http://${report.link}`} target="_blank" rel="noopener noreferrer">{report.link}</a>
                                    </td>
                                    <td>
                                        <button
                                            className="bg-brown white pa2 br3 w-20 mh2 pointer"
                                            onClick={() => handleEdit(report)}
                                        >
                                            Edit
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
