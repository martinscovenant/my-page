import React from 'react'
import { Link } from 'react-router-dom';
import './Home.css'





export const Home = () => {
    return (
    <section className="banner">
      <div className="">
        {/* <div className="fs-20px"> */}
            {/* <div className="col-lg-12 col-md-12 col-sm-12">  */}
            {/* <div className="d-flex fle"> */}
              <div id="carouselExampleInterval" className="carousel slide" data-bs-ride="carousel">
                <div className="carousel-inner">
                    <div className='back-details'>
                    {/* <p className='mb-3'></p> */}
                    {/* <h1>Home to learn</h1> */}
                    {/* <h2></h2> */}
  
                    <p className='mb-3'></p>
  
                    <Link to='/' className='center btn btn-primary' id='button-link'>Learn more</Link>
                    </div>
                </div>
              </div>
            </div>
            {/* </div> */}
        {/* </div> */}
      {/* </div> */}
    </section>
    )
}
