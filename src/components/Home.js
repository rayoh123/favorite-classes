import React, { useState } from "react";
import './Home.css';
import Class from './Class.js';

const Home = () => {
  const [className, setClassName] = useState('');
  const [classes, setClasses] = useState([]);

  const updateClassName = (event) => {
    setClassName(event.target.value);
  }

  const addNewClass = (event) => {
    if (className !== '' && !classes.includes(className)) {
      setClasses(classes.concat(className));
    }
    event.preventDefault();
  }

  return (
    <div>
      {/* Title */}
      <h1 id="title">Raymond's Favorite Classes</h1>

      {/* Form for user input */}
      <form id="classForm">
        <label>Class Name:
          <input type="text" name="className" autoComplete="name" onInput={updateClassName} />
        </label>
        <button onClick={addNewClass}>Submit</button>
      </form>

      <h1 id="info">You've entered in: {className}</h1>

      {/* Display list of submitted classes */}
      <ul id="classesList">
        {classes.map((name, index) =>
          <Class class="classItem" key={index} index={index} className={name} />
        )}
      </ul>
    </div>
  );
}

export default Home;