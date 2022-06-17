import React from "react";

function Game() {
  setTimeout(() => {
    document.querySelector("#pop-up").style.scale = "0";
  }, "50");
  let coords;
  const clickAction = (e, char) => {
    if (e.target !== e.currentTarget) return false;
    if (char !== undefined) {
      checkTarget(coords, char);
      return;
    }
    coords = [e.pageX, e.pageY];
    console.log(coords);
    if (document.querySelector("#pop-up").style.scale === "0") {
      showPopUp(coords);
      showBorder(coords);
      return;
    } else {
      hidePopUp();
      return;
    }
  };
  const showBorder = (coords) => {
    const border = document.querySelector("#border");
    setTimeout(() => {
      border.style.left = coords[0] - 15 + "px";
      border.style.top = coords[1] - 15 + "px";
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
        <div id="pop-up" onClick={clickAction}>
          <div
            id="img-char-1"
            className="smaller"
            onClick={(e) => clickAction(e, "duff")}
          ></div>
          <div
            id="img-char-2"
            className="smaller"
            onClick={(e) => clickAction(e, "scoob")}
          ></div>
          <div
            id="img-char-3"
            className="smaller"
            onClick={(e) => clickAction(e, "waldo")}
          ></div>
        </div>
      </div>
      <div
        id="game-image"
        // onTouchStart={clickAction}
        onClick={clickAction}
      ></div>
    </div>
  );
}

const checkTarget = function targetCheckerMouse(coords, char) {
  if (
    coords[0] < 433 &&
    coords[0] > 388 &&
    coords[1] < 230 &&
    coords[1] > 147 &&
    char === "scoob"
  ) {
    removeCharacter(char);
    return;
  }
  if (
    coords[0] < 1816 &&
    coords[0] > 1778 &&
    coords[1] < 1105 &&
    coords[1] > 1005 &&
    char === "duff"
  ) {
    removeCharacter(char);
    return;
  }
  if (
    coords[0] < 1203 &&
    coords[0] > 1159 &&
    coords[1] < 349 &&
    coords[1] > 283 &&
    char === "waldo"
  ) {
    removeCharacter(char);
    return;
  }
  removeCharacter("miss");
};
const removeCharacter = function (char) {
  let popup = document.querySelector("#pop-up");
  const border = document.querySelector("#border");
  if (char === "miss") {
    flashMiss(popup, border);
  }
  if (char === "duff") {
    let char = document.querySelector("#img-char-1");
    flashScore(popup, border, char);
    return true;
  }
  if (char === "scoob") {
    let char = document.querySelector("#img-char-2");
    flashScore(popup, border, char);
    return true;
  }
  if (char === "waldo") {
    let char = document.querySelector("#img-char-3");
    flashScore(popup, border, char);
    return true;
  }
};

const flashScore = function (popup, border, char) {
  setTimeout(() => {
    char.style.scale = "0";
  }, "270");
  setTimeout(() => {
    char.style.display = "none";
  }, "600");
  setTimeout(() => {
    popup.style.backgroundColor = "green";
  }, "75");
  setTimeout(() => {
    popup.style.backgroundColor = "#4f2a3e";
  }, "150");
  setTimeout(() => {
    popup.style.backgroundColor = "green";
  }, "225");
  setTimeout(() => {
    popup.style.backgroundColor = "#4f2a3e";
  }, "300");
  setTimeout(() => {
    popup.style.scale = "0";
    border.style.scale = "0";
  }, "850");
};
const flashMiss = function (popup, border) {
  setTimeout(() => {
    popup.style.backgroundColor = "red";
  }, "75");
  setTimeout(() => {
    popup.style.backgroundColor = "#4f2a3e";
  }, "150");
  setTimeout(() => {
    popup.style.backgroundColor = "red";
  }, "225");
  setTimeout(() => {
    popup.style.backgroundColor = "#4f2a3e";
  }, "300");
  setTimeout(() => {
    popup.style.scale = "0";
    border.style.scale = "0";
  }, "550");
};

export default Game;
