import React, { useState } from "react";
import ReactDOM from "react-dom";
import "./index.css";
import Card from "./components/card/Card";
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
  positive = Good / total * 100,
  average = (Good - Bad) / total * 100;

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
    <>
      <main id="main">
        <h1 id="question">How would you rate our services?</h1>

        <div id="options">
          <Card
            option="Good"
            stat={Good}
            btnClass="btn-good"
            btnText="Good"
            click={clickHandler}
          />

          <Card
            option="Neutral"
            stat={Neutral}
            btnClass="btn-neutral"
            btnText="Good"
            click={clickHandler}
          />

          <Card
            option="Bad"
            stat={Bad}
            btnClass="btn-bad"
            btnText="Good"
            click={clickHandler}
          />
        </div>

        <p id="total">
          We've had <span className="figure">{Good + Neutral + Bad}</span> feedback(s) so far.
        </p>
        <p id="positive">
          <span className="figure">{ isNaN(positive) || positive === Infinity ?0 : positive.toFixed(2) } %</span>{" "}
          of them are positve.
        </p>
        <p id="average">
          On average, our customers rate us <span className="figure">{ isNaN(average) ? 0 : average.toFixed(2) }%</span>.
        </p>
      </main>
    </>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
