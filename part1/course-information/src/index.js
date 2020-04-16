import React from "react";
import ReactDOM from "react-dom";
/*
=====================
App
=====================
*/
const App = () => {
  const course = "Half Stack application development";

  const parts = [
    {
      name: "Fundamentals of React",
      exercises: 10,
    },
    {
      name: "Using props to pass data",
      exercises: 7,
    },
    {
      name: "State of a component",
      exercises: 14,
    },
  ];

  return (
    <div>
      <Header course={course} />
      <Content parts={parts} />
      <Total parts={parts} />
    </div>
  );
};
/*
=====================
Header
=====================
*/
const Header = ({ course }) => <h1>{course}</h1>;

const Content = ({ parts }) => (
  <>
    <Part part={parts[0].name} exercises={parts[0].exercises} />
    <Part part={parts[1].name} exercises={parts[1].exercises} />
    <Part part={parts[2].name} exercises={parts[2].exercises} />
  </>
);
/*
=====================
Part
=====================
*/
const Part = ({ part, exercises }) => (
  <p>
    {part} {exercises}
  </p>
);
/*
=====================
Total
=====================
*/
const Total = ({ parts }) => <p>
Number of exercises {parts[0].exercises + parts[1].exercises + parts[2].exercises}
</p>;

ReactDOM.render(<App />, document.getElementById("root"));