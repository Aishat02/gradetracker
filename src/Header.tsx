import React from "react";
import AnimatedImg from "./assets/images/graduation.svg";

const Header: React.FC = () => {
  return (
    <header id="header" className="pt-5">
      <div className="row gap-4 d-flex justify-content-center">
        <div className="col-md row">
          <img
            src={AnimatedImg}
            alt="Graduating student illustration"
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
          <div className="d-flex gap-2">
            <a href="/" className="btn btn-green fw-bold" role="button">
              Try It First
            </a>
            <a href="/" className="btn btn-gray fw-bold">
              Create Account
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
