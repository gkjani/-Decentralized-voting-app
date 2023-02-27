import React from "react";
import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <div className="landing">
      <div className="left">
        <div className="logo">
          <img src="logo.png" />
        </div>
        <div className="title-small">THE FUTURE OF VOTING</div>
        <div className="title-large">DECENTRALIZED VOTING APP</div>

        <div className="button-wrapper">
          <Link to="/login">
            <button>Login</button>
          </Link>
          <Link to="/view">
            <button>Result</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Landing;
