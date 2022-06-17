import React from "react";

function GameOver(props) {
  const { score } = props;
  const checkWin = () => {
    if (score < 3) {
      return "lost";
    } else {
      return "won";
    }
  };
  return (
    <div id="read" className="fade-in">
      <div id="game-over">
        <h1>
          You <span>{checkWin()}</span> the game!
        </h1>
        <h1>
          Your score was: <span>{score}</span> !
        </h1>
        <h1>
          Hope you had <span>fun</span>!
        </h1>
      </div>
    </div>
  );
}

export default GameOver;
