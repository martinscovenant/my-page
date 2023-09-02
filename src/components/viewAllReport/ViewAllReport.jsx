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
            <form className="done">
              <div className="done2">
                <h3>
                  Fill in Report
                </h3>
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
                  className="bts"
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