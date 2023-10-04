
import React, { useState } from "react";
import { Link } from "react-router-dom";
import './View.css';

export const Update = () => {
    const [date, setDate] = useState("");
    const [project, setProject] = useState("");
    const [task, setTask] = useState("");
    const [status, setStatus] = useState("");
    const [link, setLink] = useState("");
    const [duration, setDuration] = useState("");

    const [errDate, setErrDate] = useState("");
    const [errProject, setErrProject] = useState("");
    const [errTask, setErrTask] = useState("");
    const [errStatus, setErrStatus] = useState("");
    const [errLink, setErrLink] = useState("");
    const [errDuration, setErrDuration] = useState("");

    const [successMsg, setSuccessMsg] = useState("");

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

    const validateLink = (url) => {
        const urlRegex = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/;
        return urlRegex.test(url);
    };

    const handleUpdate = (e) => {
        e.preventDefault();

        if (!date) {
            setErrDate("Please input date");
        }

        if (!project) {
            setErrProject("Please input project name");
        }

        if (!task) {
            setErrTask("Please input task name");
        }

        if (!status) {
            setErrStatus("Please input status");
        }

        if (!link) {
            setErrLink("Please input link");
        } else {
            if (!validateLink(link)) {
                setErrLink("Please enter a valid URL");
            }
        }

        if (!duration) {
            setErrDuration("Please fill in duration");
        }

        if (date && project && task && status && link && validateLink(link) && duration) {
            setSuccessMsg("You have successfully sent your report");
            setDate("");
            setProject("");
            setTask("");
            setStatus("");
            setLink("");
            setDuration("");
        }
    };

    return (
        <div className="App">
            {successMsg ? (
                <div className="success-message">
                    <p className="success">{successMsg}</p>
                    <Link to="/">
                        <button className="home-button">Home</button>
                    </Link>
                </div>
            ) : (
                <form className="done1">
                    <div className="done2">
                        <h4>Fill in Report</h4>
                        <label htmlFor="date">Date</label>
                        <input
                            id="date"
                            onChange={handleDate}
                            value={date}
                            className="w-full h-8 placeholder:text-sm placeholder:tracking-wide px-4 text-base font-medium placeholder:font-normal rounded-md border-[1px] border-gray-400 outline-none"
                            type="date"
                            placeholder="Date"
                        />
                        {errDate && (
                            <p className="error">
                                <span className="font-bold italic mr-1">!</span>
                                {errDate}
                            </p>
                        )}

                        <label htmlFor="project">Project</label>
                        <input
                            id="project"
                            onChange={handleProject}
                            value={project}
                            className="w-full h-8 placeholder:text-sm placeholder:tracking-wide px-4 text-base font-medium placeholder:font-normal rounded-md border-[1px] border-gray-400 outline-none"
                            type="text"
                            placeholder="Project"
                        />
                        {errDate && (
                            <p className="error">
                                <span className="font-bold italic mr-1">!</span>
                                {errProject}
                            </p>
                        )}
                         
                         <label htmlFor="task">Task</label>
                        <input
                            id="task"
                            onChange={handleTask}
                            value={task}
                            className="w-full h-8 placeholder:text-sm placeholder:tracking-wide px-4 text-base font-medium placeholder:font-normal rounded-md border-[1px] border-gray-400 outline-none"
                            type="text"
                            placeholder="task"
                        />
                        {errDate && (
                            <p className="error">
                                <span className="font-bold italic mr-1">!</span>
                                {errTask}
                            </p>
                        )}

                        <label htmlFor="status">Status</label>
                        <input
                            id="status"
                            onChange={handleStatus}
                            value={status}
                            className="w-full h-8 placeholder:text-sm placeholder:tracking-wide px-4 text-base font-medium placeholder:font-normal rounded-md border-[1px] border-gray-400 outline-none"
                            type="text"
                            placeholder="Status"
                        />
                        {errDate && (
                            <p className="error">
                                <span className="font-bold italic mr-1">!</span>
                                {errStatus}
                            </p>
                        )}

                      <label htmlFor="link">Link</label>
                        <input
                            id="link"
                            onChange={handleLink}
                            value={link}
                            className="w-full h-8 placeholder:text-sm placeholder:tracking-wide px-4 text-base font-medium placeholder:font-normal rounded-md border-[1px] border-gray-400 outline-none"
                            type="link"
                            placeholder="Link"
                        />
                        {errDate && (
                            <p className="error">
                                <span className="font-bold italic mr-1">!</span>
                                {errLink}
                            </p>
                        )}

                       <label htmlFor="duration">Duration</label>
                        <input
                            id="duration"
                            onChange={handleDuration}
                            value={duration}
                            className="w-full h-8 placeholder:text-sm placeholder:tracking-wide px-4 text-base font-medium placeholder:font-normal rounded-md border-[1px] border-gray-400 outline-none"
                            type="text"
                            placeholder="Duration"
                        />
                        {errDate && (
                            <p className="error">
                                <span className="font-bold italic mr-1">!</span>
                                {errDuration}
                            </p>
                        )}
                        
                        <button className="submit-button" onClick={handleUpdate}>
                            Submit
                        </button>
                    </div>
                </form>
            )}
        </div>
    );
};
