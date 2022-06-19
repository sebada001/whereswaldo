import { BrowserRouter, Routes, Route } from "react-router-dom";
import Body from "./Body";
import GetReady from "./GetReady";
import Game from "./Game";
import GameOver from "./GameOver";

const RouteSwitch = (props) => {
  const { changeColor, setScore, score } = props;
  const { state, setState } = props;
  return (
    <BrowserRouter basename="/">
      <Routes>
        <Route path="/" element={<Body changeColor={changeColor} />} />
        <Route path="/getReady" element={<GetReady />} />
        <Route
          path="/game"
          element={
            <Game
              setScore={setScore}
              score={score}
              state={state}
              setState={setState}
            />
          }
        />
        <Route
          path="/gameover"
          element={<GameOver score={score} state={state} setState={setState} />}
        />
      </Routes>
    </BrowserRouter>
  );
};

export default RouteSwitch;
