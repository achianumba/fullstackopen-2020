import React from "react";
import "./statistics.css";
import Statistic from "../statistic/Statistic";

const Statistics = ({
  good,
  neutral,
  bad,
  clickHandler,
  total,
  positive,
  average,
}) => {
  return (
    <main id="main">
      <h1 id="question">How would you rate our services?</h1>

      <div id="options">
        <Statistic
          type="card"
          text="Good"
          value={good}
          btnClass="btn-good"
          clickHandler={clickHandler}
          sIfFeedback="stat"
          oIfFeedback="others"
          total={total}
        />

        <Statistic
          type="card"
          text="Neutral"
          value={neutral}
          btnClass="btn-neutral"
          clickHandler={clickHandler}
          sIfFeedback="stat"
          oIfFeedback="others"
          total={total}
        />

        <Statistic
          type="card"
          text="Bad"
          value={bad}
          btnClass="btn-bad"
          clickHandler={clickHandler}
          sIfFeedback="stat"
          oIfFeedback="others"
          total={total}
        />
      </div>

      {/* When total feedback = 0 */}
      <div className={total < 1 ? "no-feedback" : "hide"}>
        <h2>No feedback given</h2>
        <p>
          Give us some feedback about our services
          <br />
          by clicking a boutton above.
        </p>
      </div>

      {/*Aggregate statistics */}
      <Statistic type="total" value={total} total={total} tIfFeedback="total" />

      <Statistic
        type="positive"
        text=""
        total={total}
        positive={positive}
        pIfFeedback="positive"
      />

      <Statistic
        type="average"
        total={total}
        average={average}
        aIfFeedback="average"
      />
    </main>
  );
};

export default Statistics;
