import { BrowserRouter, Routes, Route } from "react-router-dom";
import Body from "./Body";
import GetReady from "./GetReady";
import Game from "./Game";

const RouteSwitch = (props) => {
  const changeColor = props.changeColor;
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Body changeColor={changeColor} />} />
        <Route path="/getReady" element={<GetReady />} />
        <Route path="/game" element={<Game />} />
      </Routes>
    </BrowserRouter>
  );
};

export default RouteSwitch;
