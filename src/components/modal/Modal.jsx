import React, { useState } from "react";
import "./Modal.css";

export const Modal = ({ closeModal, onSubmit, defaultValue }) => {
  const [formState, setFormState] = useState(
    defaultValue || {
      date: "",
      project: "",
      task: "",
      status: "live",
      link: "",
      duration: "",
    }
  );
  const [errors, setErrors] = useState("");

  const validateForm = () => {
    if (
        formState.date && 
     formState.project && 
     formState.task &&
     formState.status &&
     formState.link &&
     formState.duration
     ) {
      setErrors("");
      return true;
    } else {
      let errorFields = [];
      for (const [key, value] of Object.entries(formState)) {
        if (!value) {
          errorFields.push(key);
        }
      }
      setErrors(errorFields.join(", "));
      return false;
    }
  };

  const handleChange = (e) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    onSubmit(formState);

    closeModal();
  };

  return (
    <div
      className="modal-container"
      onClick={(e) => {
        if (e.target.className === "modal-container") closeModal();
      }}
    >
      <div className="modal">
        <form>
          <div className="form-group">
            <label htmlFor="date">Date</label>
            <input name="date" onChange={handleChange} value={formState.date} />
          </div>
          <div className="form-group">
            <label htmlFor="project">Project</label>
            <textarea
              name="project"
              onChange={handleChange}
              value={formState.project}
            />
          </div>
          <div className="form-group">
            <label htmlFor="project">Task</label>
            <textarea
              name="task"
              onChange={handleChange}
              value={formState.task}
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="task">Status</label>
            <select
              name="status"
              onChange={handleChange}
              value={formState.status}
            >
              <option value="live">Live</option>
              <option value="draft">Draft</option>
              <option value="error">Error</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="link">Link</label>
            <textarea
              name="link"
              onChange={handleChange}
              value={formState.link}
            />
          </div>
          <div className="form-group">
            <label htmlFor="duration">Duration</label>
            <textarea
              name="duration"
              onChange={handleChange}
              value={formState.duration}
            />
          </div>
          {errors && <div className="error">{`Please include: ${errors}`}</div>}
          <button type="submit" className="btn" onClick={handleSubmit}>
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};