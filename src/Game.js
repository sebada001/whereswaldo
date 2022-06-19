import React, { useEffect, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { getCoords, db } from "./FIrebase";

function useInterval(callback, delay) {
  const savedCallback = useRef();
  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);
  // Set up the interval.
  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}
let coords = [0, 0];

function Game(props) {
  let gameLoaded = false;
  {
    //game start
    const gameStart = () => {
      gameLoaded = true;
      document.querySelector("#loading").style.display = "none";
      document.querySelector("#counter").style.display = "flex";
    };
    let imgSrc =
      "https://firebasestorage.googleapis.com/v0/b/where-s-waldo-56d03.appspot.com/o/wheres-waldo-8.jpg?alt=media&token=521727ad-0f67-4536-a060-bcfe235b1eb1";
    let image = new Image();
    image.addEventListener("load", function () {
      document.querySelector(
        "#game-image"
      ).style.backgroundImage = `url(${imgSrc})`;
      gameStart();
    });
    image.src = imgSrc;
  }
  const { score, setScore, state, setState } = props;
  const app = document.querySelector(".App");
  app.style.overflow = "hidden";
  const navigate = useNavigate();

  const count = function () {
    if (state[0] === 4 && state[1] === 0) {
      hideModal();
    }
    if (state[0] === 0 && state[1] === 0) {
      gameOver();
    }
    if (state[1] === 0) {
      sixty();
    } else {
      tickDown();
    }
  };
  const tickDown = () => {
    setState((prevState) => [prevState[0], prevState[1] - 1]);
  };
  const sixty = () => {
    setState((prevState) => [prevState[0] - 1, 59]);
  };
  useInterval(() => {
    if (gameLoaded) {
      count();
    }
  }, 1000);
  const gameOver = useCallback(
    () => navigate("/gameover", { replace: true }),
    [navigate]
  );
  const clickAction = async (e, char) => {
    if (e.target !== e.currentTarget) return false;
    if (char !== undefined) {
      if (await checkTarget(coords, char)) {
        handleScore();
      }
      return;
    }
    coords = [e.pageX, e.pageY];
    if (document.querySelector("#pop-up").classList.contains("scaler")) {
      showPopUp(coords);
      showBorder(coords);
      return;
    } else {
      hidePopUp();
      return;
    }
  };
  const checkForWin = () => {
    let scoreCurrent = document.querySelector("#score-number");
    if (scoreCurrent.textContent === "2") {
      setTimeout(() => {
        gameOver();
      }, "500");
    }
  };
  const handleScore = () => {
    checkForWin();
    setScore((prv) => prv + 1);
  };
  const showBorder = (coords) => {
    const border = document.querySelector("#border");
    setTimeout(() => {
      border.style.left = coords[0] - 15 + "px";
      border.style.top = coords[1] - 15 + "px";
      border.classList.remove("scaler");
    }, "90");
  };
  const showPopUp = (coords) => {
    const popUp = document.querySelector("#pop-up");
    setTimeout(() => {
      popUp.style.left = coords[0] + 15 + "px";
      popUp.style.top = coords[1] + "px";
      popUp.classList.remove("scaler");
    }, "90");
  };
  const hidePopUp = () => {
    const popUp = document.querySelector("#pop-up");
    popUp.classList.add("scaler");
    const border = document.querySelector("#border");
    border.classList.add("scaler");
  };
  return (
    <div id="game">
      <div id="blackout"></div>
      <div id="loading">Loading img...</div>
      <div id="counter" style={{ display: "none" }}>
        <p>{state[0]}</p>:<p>{calculateNumber(state[1])}</p>
      </div>
      <div id="score">
        <p>
          Score: <span id="score-number">{score}</span>
        </p>
      </div>
      <div>
        <div id="border"></div>
        <div id="pop-up" onClick={clickAction} className="scaler">
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
      <div id="img-parent">
        <div
          style={{ filter: "blur(6px)" }}
          id="game-image"
          onClick={clickAction}
        ></div>
      </div>
    </div>
  );
}
const giveMeCoords = async (name) => {
  let array = await getCoords(db);
  let res = array.find((el) => el.name === name);
  return res;
};

const hideModal = () => {
  document.querySelector("#blackout").style.display = "none";
  document.querySelector("#game-image").style.filter = "none";
  document.querySelector("#counter").style.top = "25px";
};

const calculateNumber = function (number) {
  if (number > 9) {
    return number.toString();
  } else {
    return "0" + number.toString();
  }
};

const checkTarget = async function targetCheckerMouse(coords, char) {
  const thisChar = char;
  let coordsCheck = await giveMeCoords(thisChar);
  let coordies = coordsCheck.coordinates;
  if (
    coords[0] < coordies[0] &&
    coords[0] > coordies[1] &&
    coords[1] < coordies[2] &&
    coords[1] > coordies[3]
  ) {
    removeCharacter(thisChar);
    return true;
  }
  removeCharacter("miss");
  return false;
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
    popup.classList.add("scaler");
    border.classList.add("scaler");
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
    popup.classList.add("scaler");
    border.classList.add("scaler");
  }, "550");
};

export default Game;
