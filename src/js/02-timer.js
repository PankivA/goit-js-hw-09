import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const date = document.querySelector('#datetime-picker');
const startBtn = document.querySelector('button[data-start]');
const daysAmount = document.querySelector('span[data-days]');
const minutesAmount = document.querySelector('span[data-hours]');
const hoursAmount = document.querySelector('span[data-minutes]');
const secondsAmount = document.querySelector('span[data-seconds]');

let timerId = null;
let formatDate = null;
let timeDifference = 0;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    calcDateDifference(selectedDates[0]);
    },
};

startBtn.setAttribute('disabled', true);

flatpickr(date, options);

startBtn.addEventListener('click', turnStartBtn);

function  turnStartBtn() {
    timerId = setInterval(startTimer, 1000)
};

function startTimer() {
    startBtn.setAttribute('disabled', true);

    timeDifference -= 1000;

    if (secondsAmount.textContent === 0 && minutesAmount.textContent === 0 && hoursAmount.textContent === 0 && daysAmount.textContent === 0) {
        Notify.success('Time end');
        clearInterval(timerId);
    } else {
        formatDate = convertMs(timeDifference);
        recreateDate(formatDate);
    }
};


function calcDateDifference(selectedDates) {
    const currentDate = Date.now();

    if (selectedDates < currentDate) {
       startBtn.setAttribute('disabled', true);
       return Notify.failure('Please choose a date in the future');
    } else {
        timeDifference = selectedDates.getTime() - currentDate;
        formatDate = convertMs(timeDifference);
        recreateDate(formatDate);
        startBtn.removeAttribute('disabled');
    }
}

function recreateDate(formatDate) {
    secondsAmount.textContent = formatDate.seconds;
    minutesAmount.textContent = formatDate.minutes;
    hoursAmount.textContent = formatDate.hours;
    daysAmount.textContent = formatDate.days;
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

window.addEventListener('keydown', evt => {
    if (evt.code === 'Escape' && timerId) {
        clearInterval(timerId);

        secondsAmount.textContent = '00';
        minutesAmount.textContent = '00';
        hoursAmount.textContent = '00';
        daysAmount.textContent = '00';
    }
})