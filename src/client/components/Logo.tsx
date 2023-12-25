import LogoCrown from "../assets/crown.svg";
import * as React from "react";
const Logo = () => {
  return (
    <img
      src={LogoCrown}
      alt="Crown"
      style={{ width: "40px", height: "40px", marginRight: "10px" }}
    />
  );
};

export default Logo;
