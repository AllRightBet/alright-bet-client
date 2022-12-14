import "./HeadingComponent.css";
import React from "react";
import { Link } from "react-router-dom";

const HeadingComponent = () => {
  return (
    <div className="headingComponent">


      <div className="headingComponent__container">
        <p className="headingComponent__app-name">Alright Bet</p>
        <p className="headingComponent__app-slogan">Wager Ventures</p>
      </div>



      <div className="headingComponent__secondary-heading-container">
        <h3 className="headingComponent__secondary-heading">New Customers</h3>
        <div className="headingComponent__secondary-heading-text-container">
          <h3 className="headingComponent__secondary-heading-text">
            <Link to="/signUp" className="">
              Join Us
            </Link>
          </h3>
        </div>
      </div>



      <div className="headingComponent__main-heading-container">
        <h2 className="headingComponent__main-heading-text">The worlds first</h2>
        <h1 className="headingComponent__main-heading-text-two">
          E-Sports Betting App
        </h1>
      </div>




      <br />

      <div className="btn__link-container">
        <Link to="/signIn" className="btn__link-main">
          Login
        </Link>
      </div>


      <br />
      <br />
      <br />
      <br />
      <br />
      <br />

      <footer>
        <h4>
        Authors
        </h4>
        <p>
          Affan Fareed<br />
          <a href="mailto:affan.fareed@gmail.com">affan.fareed@gmail.com</a>
        </p>
        <p>
          Moe Yassine<br />
          <a href="mailto:moeyassine1993@gmail.com">moeyassine1993@gmail.com</a>
        </p>
      </footer>


    </div>
  );
};

export default HeadingComponent;
