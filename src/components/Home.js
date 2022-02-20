import React, { useState } from "react";
import './Home.css';
import Course from './Course.js';

const Home = () => {
	const [courseName, setCourseName] = useState('');
	const [courses, setCourses] = useState([]);

	const updateCourseName = (event) => {
		setCourseName(event.target.value);
	}

	const addNewCourse = (event) => {
		if (courseName !== '' && !courses.includes(courseName)) {
			setCourses(courses.concat(courseName));
		}
		event.preventDefault();
	}

	return (
		<div>
			{/* Title */}
			<h1 id="title">Raymond's Favorite Courses</h1>

			{/* Form for user input */}
			<form id="courseForm">
				<label>Course Name:
					<input type="text" name="courseName" autoComplete="name" onInput={updateCourseName} />
					<button onClick={addNewCourse}>Submit</button>
				</label>
				<h1>You've entered in: {courseName}</h1>
			</form>

			{/* Display list of submitted courses */}
			<ul id="coursesList">
			{courses.map((name, index) =>
				<Course className="courseItem" key={index} courseName={name} />
			)}
			</ul>
		</div>
	);
}

export default Home;