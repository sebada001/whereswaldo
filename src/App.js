import "./App.css";
import RouteSwitch from "./RouteSwitch";
import React, { useState } from "react";

//prevent double click
document.addEventListener("mousedown", (e) => {
  if (e.detail > 1) {
    e.preventDefault();
  }
});

function App() {
  const [state, setState] = useState([4, 4]);
  const [score, setScore] = useState(0);
  function clearSelection() {
    if (document.selection && document.selection.empty) {
      document.selection.empty();
    } else if (window.getSelection) {
      var sel = window.getSelection();
      sel.removeAllRanges();
    }
  }
  clearSelection();
  const changeColor = function colorChanger() {
    function colorMe(color) {
      document.documentElement.style.setProperty(
        "--current-val",
        `var(--${color})`
      );
    }
    const currentColor = getComputedStyle(
      document.documentElement
    ).getPropertyValue("--current-val");
    if (currentColor === `#f0917b`) colorMe("light2");
    if (currentColor === `#eed6bb`) colorMe("light1");
  };
  return (
    <div className="App">
      <header id="head">
        <h1>
          W<span>h</span>e<span>r</span>e'<span>s</span> W<span>a</span>l
          <span>d</span>o
        </h1>
      </header>
      <RouteSwitch
        changeColor={changeColor}
        score={score}
        setScore={setScore}
        state={state}
        setState={setState}
      ></RouteSwitch>
      <footer id="foot">
        Only <span> fun </span> allowed!
      </footer>
    </div>
  );
}

export default App;
