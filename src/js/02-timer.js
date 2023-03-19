import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const inputDate = document.querySelector('#datetime-picker');
const startBtn = document.querySelector('button[data-start]');
const daysIn = document.querySelector('span[data-days]');
const hoursIn = document.querySelector('span[data-hours]');
const minsIn = document.querySelector('span[data-minutes]');
const secondsIn = document.querySelector('span[data-seconds]');


startBtn.addEventListener('click', startTimeCounter);
startBtn.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    startTimer(selectedDates);
  },
};

flatpickr(inputDate, options);
let selectedDates = inputDate.value;

function startTimeCounter(evt) {}

function startTimer(selectedDates) {
  if (Date.now() > selectedDates[0]) {
    alert('Please choose a date in the future');
    return;
  }

  (startBtn.disabled = false),
    setInterval(() => {
      const currentTime = Date.now();
      const deltaTime = selectedDates[0] - currentTime;
      if (deltaTime <= 0) {    
        return;
      }
      const { days, hours, minutes, seconds } = convertMs(deltaTime);
      updateClockFace(days, hours, minutes, seconds);
      startBtn.disabled = true;
    }, 1000);
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = addLeadingZero(Math.floor(ms / day));
  // Remaining hours
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = addLeadingZero(
    Math.floor((((ms % day) % hour) % minute) / second)
  );

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function updateClockFace(days, hours, minutes, seconds) {
  daysIn.textContent = `${days}`;
  hoursIn.textContent = `${hours}`;
  minsIn.textContent = `${minutes}`;
  secondsIn.textContent = `${seconds}`;
}