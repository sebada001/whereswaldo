import React, { useCallback } from "react";
import { useNavigate } from "react-router-dom";

function GetReady() {
  const navigate = useNavigate();
  const fadeOut = () => {
    document.getElementById("read").style.scale = "1";
    document.getElementById("read").classList.add("fade-out");

    setTimeout(() => {
      document.getElementById("foot").style.display = "none";
      document.getElementById("head").style.display = "none";
      handleOnClick();
    }, "800");
  };
  const handleOnClick = useCallback(
    () => navigate("/game", { replace: true }),
    [navigate]
  );
  return (
    <div id="read" className="fade-in">
      <div>
        <h1 id="try-to-find">
          <span>Try</span> to find the following characters in{" "}
          <span>4 minutes</span>:
        </h1>
      </div>
      <div id="characters-section">
        <div className="character-div">
          <p>
            <span>D</span>uffman 👉
          </p>
          <div id="img-char-1"></div>
        </div>
        <div className="character-div">
          <div id="img-char-2"></div>
          <p>
            👈 <span>S</span>cooby <span>D</span>oo{" "}
          </p>
        </div>
        <div className="character-div">
          <p>
            <span>W</span>aldo 👉
          </p>
          <div id="img-char-3"></div>
        </div>
      </div>
      <div className="start-button" onClick={fadeOut}>
        Start!
      </div>
    </div>
  );
}

export default GetReady;
