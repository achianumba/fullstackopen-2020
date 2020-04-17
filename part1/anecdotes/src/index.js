import React, { useState } from "react";
import ReactDOM from "react-dom";
import "./index.css";

const App = (props) => {
  const [selected, setSelected] = useState(0);
  let points = [];

  for (let i = 0; i < anecdotes.length; i++) {
    points.push(0);
  }

  const [vote, setVote] = useState(points);
  let max = Math.max(...vote);

  const randomQuote = () => {
    let quote = Math.floor(Math.random() * anecdotes.length);
    setSelected(quote);
  };

  const voteHanler = () => {
    let copy = [...vote];
    copy[selected] = copy[selected] + 1;
    setVote(copy);
  };

  return (
    <>
      <div id="anecdote-today">
        <h1>Anecdote of the day</h1>
        <p className="anecdote">{props.anecdotes[selected]}</p>

        <div id="btn-container">
          <p className="votes">Votes: {vote[selected]}</p>
          <button className="btn btn-vote" onClick={voteHanler}>
            Vote
          </button>

          <button className="btn btn-random" onClick={randomQuote}>
            Next Anecdote
          </button>
        </div>
      </div>

      <div id="anecdote-most-votes">
        <h1 className="most-votes">Anecdote with the most votes</h1>
        <p className="anecdote">{props.anecdotes[vote.indexOf(max)]}</p>
        <p className="votes">Votes: {Math.max(...vote)}</p>
      </div>
    </>
  );
};

const anecdotes = [
  "If it hurts, do it more often",
  "Adding manpower to a late software project makes it later!",
  "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
  "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
  "Premature optimization is the root of all evil.",
  "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
];

ReactDOM.render(<App anecdotes={anecdotes} />, document.getElementById("root"));
