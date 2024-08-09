import React from "react";
import images from "../../constants/images";

import "./Logo.css";

const Logo = () => {
  return (
    <div className="logoContainer">
      <div className="logo">
        <img src={images.logo} alt="logo" />
      </div>
      <div className="profile">
        <img src={images.profile} alt="profile" />
      </div>
    </div>
  );
};

export default Logo;
