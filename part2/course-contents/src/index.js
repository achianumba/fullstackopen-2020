import React from "react";
import ReactDOM from "react-dom";
import './index.css';
/*
=====================
App
=====================
*/
const App = () => {
  const course = {
    id: 1,
    name: "Half Stack application development",
    parts: [
      {
        name: "Fundamentals of React",
        exercises: 10,
        id: 1,
      },
      {
        name: "Using props to pass data",
        exercises: 7,
        id: 2,
      },
      {
        name: "State of a component",
        exercises: 14,
        id: 3,
      },
      {
        name: "Redux",
        exercises: 11,
        id: 4
      }
    ]
  };
  
  return (
    <div>
      <Course course={course} />
    </div>
  );
};
/*
=====================
Course
=====================
*/
const Course = ({ course }) => {
  return (
    <div className="course">
      <Header name={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  );
};
/*
=====================
Header
=====================
*/
const Header = ({ name }) => <h1 className="header">{name}</h1>;

const Content = ({ parts }) => (
  <>
  {
    parts.map(({ id, name, exercises}) => <Part key={ id } part={name} exercises={exercises} />)
  }
  </>
);
/*
=====================
Part
=====================
*/
const Part = ({ part, exercises }) => (
  <p className="part">
    {part} {exercises}
  </p>
);
/*
=====================
Total
=====================
*/
const Total = ({ parts }) => (
  <p className="total">
    Total of {
      parts.reduce((x, { exercises}) => x + exercises, 0)
    } exercises
  </p>
);


ReactDOM.render(<App />, document.getElementById("root"));