import React from "react";

function GameOver(props) {
  const { score, state } = props;
  const checkScore = () => {
    let scorer = 0;
    scorer += state[1];
    if (state[0] > 0) {
      scorer += state[0] * 60;
    }
    return scorer;
  };
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
          Your score was: <span>{checkScore()}</span> !
        </h1>
        <h1>
          Hope you had <span>fun</span>!
        </h1>
      </div>
    </div>
  );
}

export default GameOver;
