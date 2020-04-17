import React from "react";
import './button.css';

const Button = ({ text, addClass }) => (
  <button className={"btn " + addClass}>
    {text}
  </button>
);

export default Button;