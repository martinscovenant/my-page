
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import './Home.css'

export const Home = () => {
  const [apiResponse, setApiResponse] = useState ("");
  React.useEffect(() => {
  }, []);
  useEffect(() => {
    axios
      .get("https://timesheet-api-main.onrender.com", {
        headers: {
          "x-api-key": "a57cca53d2086ab3488b358eebbca2e7",
        },
      })
      .then((response) => {
        setApiResponse(response.data);
      })
      .catch((error) => {
        console.error("Error fetching API data:", error);
      });
  }, []);

  return (
    <section className="banner">
      <div className="">
        {/* <p>{apiResponse}</p> */}
        <div
          id="carouselExampleInterval"
          className="carousel slide"
          data-bs-ride="carousel"
        >
          <div className="carousel-inner">
            <div className="back-details">
              <p className="mb-3"></p>

              <Link to="/" className="center btn btn-primary" id="button-link">
                Learn more
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};


