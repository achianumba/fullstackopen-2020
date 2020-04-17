import React from "react";
import './button.css';

const Button = ({ handleClick, text, addClass }) => (
  <button className={"btn " + addClass}>
    {text}
  </button>
);

export default Button;