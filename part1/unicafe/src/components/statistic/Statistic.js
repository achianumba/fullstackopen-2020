import React from "react";
import Card from "../card/Card";

const Statistic = ({
  type,
  text,
  value,
  btnClass,
  clickHandler,
  sIfFeedback,
  oIfFeedback,
  total,
  positive,
  average,
  tIfFeedback,
  pIfFeedback,
  aIfFeedback,
}) => {
  switch (type) {
    case "card":
      return (
        <Card
          option={text}
          stat={value}
          btnClass={btnClass}
          click={clickHandler}
          statClass={total < 1 ? "hide" : sIfFeedback}
          othersClass={total < 1 ? "hide" : oIfFeedback}
        />
      );

    case "total":
      return (
        <p className={total < 1 ? "hide" : tIfFeedback}>
          We've had <span className="figure">{total}</span> feedback(s) so far.
        </p>
      );

    case "positive":
      return (
        <p className={total < 1 ? "hide" : pIfFeedback}>
          <span className="figure">
            {isNaN(positive) || positive === Infinity ? 0 : positive.toFixed(2)}{" "}
            %
          </span>{" "}
          of them are positve.
        </p>
      );

    case "average":
      return (
        <p className={total < 1 ? "hide" : aIfFeedback}>
          On average, our customers rate us{" "}
          <span className="figure">
            {isNaN(average) ? 0 : average.toFixed(2)}%
          </span>
          .
        </p>
      );

    default:
      return;
  }
};

export default Statistic;
