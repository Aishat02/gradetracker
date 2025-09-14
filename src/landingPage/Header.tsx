import React from "react";
import AnimatedImg from "../assets/images/graduation.svg";
import { Link } from "react-router-dom";

const Header: React.FC = () => {
  return (
    <header id="header" className="pt-5" aria-label="Hero section">
      <div className="row gap-5 d-flex justify-content-center">
        <div className="col-md-5">
          <img
            src={AnimatedImg}
            alt="Illustration of a graduating student"
            className="img-fluid rounded"
            loading="lazy"
          />
        </div>

        <div className="col-md justify-content-center my-auto">
          <h1 className="fw-bolder">
            Track Your Grades, Stay On Top, Graduate with Confidence
          </h1>
          <p>
            Easily monitor your academic performance with our intuitive grade
            tracking tool. Input your course details, define your course
            structure, and view your grades in real-time. Stay informed and
            achieve your academic goals.
          </p>
          <Link to="signup" className="btn btn-gray fw-bold">
            Create Account
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
