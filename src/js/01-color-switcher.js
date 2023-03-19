const startBtn = document.querySelector('button[data-start]');
const stopBtn = document.querySelector('button[data-stop]');
const body = document.querySelector('body');
let timerId = null;

startBtn.addEventListener('click', onStartBtnClick);
stopBtn.addEventListener('click', onStopBtnClick);

function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
  }

function onStartBtnClick() {
    timerId = setInterval(() => {
        body.style.background = getRandomHexColor();
        startBtn.setAttribute('disabled', true);
        stopBtn.removeAttribute('disabled');
    }, 1000);
};

function onStopBtnClick() {
    clearInterval(timerId);
    startBtn.removeAttribute('disabled');
    stopBtn.setAttribute('disabled', true);
};