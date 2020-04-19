import React from 'react';

/*
=====================
Course
=====================
*/
export default ({ course }) => {
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
      {parts.map(({ id, name, exercises }) => (
        <Part key={id} part={name} exercises={exercises} />
      ))}
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
      Total of {parts.reduce((x, { exercises }) => x + exercises, 0)} exercises
    </p>
  );