import React, { useState } from "react";
import ReactDOM from "react-dom";
import "./index.css";
/*
=====================
App
=====================
*/
const App = () => {
  //App state and variables
  let [stats, setStats] = useState({
      Good: 0,
      Neutral: 0,
      Bad: 0,
    }),
    { Good, Neutral, Bad } = stats,
    all = Good + Neutral + Bad,
    positive = (Good / all) * 100,
    average = ((Good - Bad) / all) * 100,
    clickHandler = (e) => {
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
    <main id="main">
      <h1 id="question">How would you rate our services?</h1>

      <div id="btn-container" onClick={clickHandler}>
        <Button text="Good" addClass="btn-good" />
        <Button text="Neutral" addClass="btn-neutral" />
        <Button text="Bad" addClass="btn-bad" />
      </div>

      <NoFeedback all={ all }/>

      <Statistics
        good={Good}
        neutral={Neutral}
        bad={Bad}
        clickHandler={clickHandler}
        all={all}
        positive={positive}
        average={average}
      />
    </main>
  );
};
/*
=====================
Button
=====================
*/
const Button = ({ text, addClass }) => (
  <button className={"btn " + addClass}>{text}</button>
);
/*
=====================
StatisticS
=====================
*/
const Statistics = ({
  good,
  neutral,
  bad,
  all,
  positive,
  average,
}) => {
  return (
    <table className={ all < 1 ? "hide" : "statistics"}>
      <caption>Statistics</caption>
      <tbody>
        <Statistic text="Good" value={good} />
        <Statistic text="Neutral" value={neutral} />
        <Statistic text="Bad" value={bad} />
        <Statistic text="All" value={all} />
        <Statistic
          text="Average"
          value={isNaN(average) || average === Infinity ? 0 : average.toFixed(2)}
        />
        <Statistic
          text="Positive"
          value={isNaN(positive) || positive === Infinity ? 0 + "%": positive.toFixed(2) + "%"}
        />
      </tbody>
    </table>
  );
};
/*
=====================
Statistic
=====================
*/
const Statistic = ({ text, value }) => (
  <>
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  </>
);
/*
=====================
NoFeedback
=====================
*/
const NoFeedback = ({ all }) => (
  <div className={all < 1 ? "no-feedback" : "hide"}>
    <h2>No feedback given</h2>
    <p>
      Give us some feedback about our services
      <br />
      by clicking a button above.
    </p>
  </div>
);

ReactDOM.render(<App />, document.getElementById("root"));
