import React, { useEffect, useState } from "react";
import './Course.css';

const PETERPORTAL_GRAPHQL_API = 'https://api.peterportal.org/graphql/';
const PETERPORTAL_REST_API = 'https://api.peterportal.org/rest/v0/instructors/';

const Course = (props) => {
    const [courseName, setCourseName] = useState(props.courseName);
    const [courseInfo, setCourseInfo] = useState(null);


    useEffect(() => {
        const get_course_data = async (courseName) => {
            const query = `
                query {
                    course(id: "${courseName.toUpperCase()}"){
                        title
                        department
                        number
                        description
                        instructor_history{
                            ucinetid
                            shortened_name
                        }
                    }
                }`;

            const response = await fetch(PETERPORTAL_GRAPHQL_API, {
                "method": "POST",
                "body": JSON.stringify({query}),
                "headers": {
                    "Content-Type": "application/json",
                }
            });

            const json_response = await response.json();
            setCourseInfo(json_response.data.course);
        }

        get_course_data(courseName);
    }, [courseName]);


    const displayInstructorDetails = async (ucinetid) => {
        const response = await fetch(PETERPORTAL_REST_API + ucinetid);
        const json_response = await response.json();
        let message = `${json_response.title} ${json_response.name}\nEmail: ${json_response.email}\nDepartment: ${json_response.department}`;
        window.alert(message);
    }


    // Generate course card if course exists
    if (courseInfo != null){
        return (
            <div className="courseCard">
                <h1 className="courseCode">{courseInfo.department} {courseInfo.number}</h1>
                <h2 className="courseName">{courseInfo.title}</h2>
                <h4>Past Instructors:</h4>
                <ul className="instructors">
                    {courseInfo.instructor_history.map((instructor) =>
                        <li key={instructor.ucinetid}>
                            <button onClick={() => displayInstructorDetails(instructor.ucinetid)}>
                                {instructor.shortened_name}
                            </button>
                        </li>
                    )}
                </ul>
                <p>{courseInfo.description}</p>
            </div>
        );
    }else{

        // Course was not found
        return (
            <div className="courseCard">
                <h1 className="courseCode">Loading {courseName}...</h1>
            </div>
        );
    }
}

export default Course;