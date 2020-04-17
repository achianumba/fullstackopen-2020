import React, { useState } from "react";
import ReactDOM from "react-dom";
import "./index.css";
import Statistics from './components/statistics/Statistics';
/*
=====================
App
=====================
*/
const App = () => {
  const [stats, setStats] = useState({
    Good: 0,
    Neutral: 0,
    Bad: 0,
  });

  let { Good, Neutral, Bad } = stats,
    total = Good + Neutral + Bad,
    positive = (Good / total) * 100,
    average = ((Good - Bad) / total) * 100;

  const clickHandler = (e) => {
    e.preventDefault();
    let rating = e.target.textContent,
      update = {};
    update[rating] = stats[rating] + 1;

    if (rating in stats)
      setStats({
        ...stats,
        ...update,
      });

    return;
  };

  return (
    <Statistics
      good={Good}
      neutral={Neutral}
      bad={Bad}
      clickHandler={clickHandler}
      total={total}
      positive={positive}
      average={average}
    />
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
