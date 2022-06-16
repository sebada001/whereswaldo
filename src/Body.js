import React, { useCallback } from "react";
import { useNavigate } from "react-router-dom";

function Body(props) {
  const changeColor = props.changeColor;
  const navigate = useNavigate();
  const fadeOut = () => {
    document.getElementById("bod").style.scale = "1";
    document.getElementById("bod").classList.add("fade-out");
    setTimeout(() => {
      handleOnClick();
    }, "800");
  };
  const handleOnClick = useCallback(
    () => navigate("/getReady", { replace: true }),
    [navigate]
  );

  return (
    <div id="bod" className="fade-in">
      <h2 className="subtitle">How to play:</h2>
      <p className="text">
        <span>Look</span> for each one of the characters in the picture.
      </p>
      <div className="image-block">
        <div className="characters-tutorial"></div>
        <div className="wrap-p">
          <p className="one">👈 Character </p>
          <p className="two">Picture 👉 </p>
        </div>
        <div className="picture-tutorial"></div>
      </div>
      <p className="text">
        <span id="click" onClick={changeColor}>
          Click
        </span>{" "}
        when you have found a character, and select it from the dropdown menu.
      </p>
      <p className="text">
        When you start the game, a <span>timer</span> starts.
      </p>
      <p className="text">
        If you find all characters before the timer ends, you <span>win!</span>
      </p>
      <div className="start-button" onClick={fadeOut}>
        Start!
      </div>
    </div>
  );
}

export default Body;
