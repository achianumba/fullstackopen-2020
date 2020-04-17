import React from 'react';
import Card from '../card/Card';
import './statistics.css';

const Statistics = ({
    good,
    neutral,
    bad,
    clickHandler,
    total,
    positive,
    average
}) => {
    return (
        <main id="main">
        <h1 id="question">How would you rate our services?</h1>

        <div id="options">
          <Card
            option="Good"
            stat={good}
            btnClass="btn-good"
            btnText="Good"
            click={clickHandler}
            statClass={ total < 1 ? 'hide' : 'stat'}
            othersClass={ total < 1 ? 'hide' : 'others'}
          />

          <Card
            option="Neutral"
            stat={neutral}
            btnClass="btn-neutral"
            btnText="Good"
            click={clickHandler}
            statClass={ total < 1 ? 'hide' : 'stat'}
            othersClass={ total < 1 ? 'hide' : 'others'}
          />

          <Card
            option="Bad"
            stat={bad}
            btnClass="btn-bad"
            btnText="Good"
            click={clickHandler}
            statClass={ total < 1 ? 'hide' : 'stat'}
            othersClass={ total < 1 ? 'hide' : 'others'}
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
      <p className={total < 1 ? "hide" : "total"}>
        We've had <span className="figure">{total}</span> feedback(s) so far.
      </p>
      <p className={total < 1 ? "hide" : "positive"}>
        <span className="figure">
          {isNaN(positive) || positive === Infinity ? 0 : positive.toFixed(2)} %
        </span>{" "}
        of them are positve.
      </p>
      <p className={total < 1 ? "hide" : "average"}>
        On average, our customers rate us{" "}
        <span className="figure">
          {isNaN(average) ? 0 : average.toFixed(2)}%
        </span>
        .
      </p>
      </main>
    )
}

export default Statistics
