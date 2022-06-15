import "./App.css";

//prevent double click
document.addEventListener("mousedown", (e) => {
  if (e.detail > 1) {
    e.preventDefault();
  }
});

function App() {
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
    if (currentColor == `#fdfaf8`) colorMe("yellow");
    if (currentColor == `#f3e600`) colorMe("pink");
    if (currentColor == `#ec9dd0`) colorMe("white");
  };
  return (
    <div className="App">
      <header id="head">
        <h1>
          W<span>h</span>e<span>r</span>e'<span>s</span> W<span>a</span>l
          <span>d</span>o
        </h1>
      </header>
      <div id="bod">
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
          If you find all characters before the timer ends, you{" "}
          <span>win!</span>
        </p>
      </div>
      <footer id="foot">
        Only <span> fun </span> allowed!
      </footer>
    </div>
  );
}

export default App;
