import { BrowserRouter, Routes, Route } from "react-router-dom";
import Body from "./Body";
import GetReady from "./GetReady";
import Game from "./Game";
import GameOver from "./GameOver";

const RouteSwitch = (props) => {
  const { changeColor, setScore, score } = props;
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Body changeColor={changeColor} />} />
        <Route path="/getReady" element={<GetReady />} />
        <Route
          path="/game"
          element={<Game setScore={setScore} score={score} />}
        />
        <Route path="/gameover" element={<GameOver score={score} />} />
      </Routes>
    </BrowserRouter>
  );
};

export default RouteSwitch;
