const startButton = document.querySelector("[data-start]");
const stopButton = document.querySelector("[data-stop]");
const body = document.body;
let id;

stopButton.disabled = true;

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
};

const changeColor = () => {
  startButton.disabled = true;
  stopButton.disabled = false;
    id = setInterval(() => {
        const randomColor = getRandomHexColor();
        body.style.backgroundColor = randomColor;
}, 1000);
};

const stopChange = () => {
  startButton.disabled = false;
  stopButton.disabled = true;
    setTimeout(() => clearInterval(id));
};

startButton.addEventListener("click", changeColor);
stopButton.addEventListener("click", stopChange);