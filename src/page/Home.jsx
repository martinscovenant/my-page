
import React, { useState, useEffect } from "react";
import axios from "axios";
import './Home.css'

export const Home = () => {

  const [apiResponse, setApiResponse] = useState ("");
  const [isOpen, setIsOpen] = useState(false);

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
    <div>
      <header className="navbar">
      <nav>
        <ul>
          <li><a href="/">Home</a></li>
          {/* <li><a href="/ViewSpecificReport">View</a></li> */}
          {/* <li><a href="/Signin">Login</a></li> */}
          <li><a href="/Signup">signup</a></li>
      </ul>
      </nav>
    </header>
    <section className="banner">
      <div className="">
        <div
          id="carouselExampleInterval"
          className="carousel slide"
          data-bs-ride="carousel"
        >
          <div className="carousel-inner">
            <div className="back-details">
              <p className="mb-3"></p>
            </div>
          </div>
        </div>
      </div>
    </section>
    </div>
  );
};


