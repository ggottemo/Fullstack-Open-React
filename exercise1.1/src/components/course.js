// Course component from exercise 2.1 Full Stack Open 2022
import React from "react";
import Content from "./content";
import Header from "./header";
import Total from "./total";
const Course = ({ course }) => {
    return (
        <div>
        <Header course={course.name} />


        <Content parts={course.parts} />

        <Total parts={course.parts} />
  
 
        </div>
    );
    }
export default Course;
