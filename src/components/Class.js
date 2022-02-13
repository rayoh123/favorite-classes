import React from "react";
import './Class.css';

const Class = (props) => {
  return <h2 class="className">#{props.index}: {props.className}</h2>;
}

export default Class;