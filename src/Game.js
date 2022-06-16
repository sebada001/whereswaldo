import React from "react";

function Game() {
  setTimeout(() => {
    document.querySelector("#pop-up").style.scale = "0";
  }, "50");
  const clickAction = (e) => {
    if (document.querySelector("#pop-up").style.scale == "0") {
      let coords = [e.pageX, e.pageY];
      showPopUp(coords);
      showBorder(coords);
    } else {
      hidePopUp();
    }
  };
  const showBorder = (coords) => {
    const border = document.querySelector("#border");
    setTimeout(() => {
      border.style.left = coords[0] - 20 + "px";
      border.style.top = coords[1] - 20 + "px";
      border.style.scale = "1";
    }, "90");
  };
  const showPopUp = (coords) => {
    const popUp = document.querySelector("#pop-up");
    setTimeout(() => {
      popUp.style.left = coords[0] + 15 + "px";
      popUp.style.top = coords[1] + "px";
      popUp.style.scale = "1";
    }, "90");
  };
  const hidePopUp = () => {
    const popUp = document.querySelector("#pop-up");
    popUp.style.scale = "0";
    const border = document.querySelector("#border");
    border.style.scale = "0";
  };
  return (
    <div id="game">
      <div>
        <div id="border"></div>
        <button id="pop-up" onClick={hidePopUp}>
          Pop up!
        </button>
      </div>
      <div
        id="game-image"
        onTouchStart={clickAction}
        onClick={clickAction}
      ></div>
    </div>
  );
}

export default Game;
