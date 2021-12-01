// "use strict";

import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
  },
};

let timerId = null;
const refs = {
  input: document.querySelector('input#datetime-picker'),
  startBtn: document.querySelector('button[data-start]'),
  days: document.querySelector('span[data-days]'),
  hours: document.querySelector('span[data-hours]'),
  minutes: document.querySelector('span[data-minutes]'),
  seconds: document.querySelector('span[data-seconds]'),
};
const calendar = flatpickr(refs.input, options);

refs.input.addEventListener('input', setData);
refs.startBtn.addEventListener('click', startTimer);
refs.startBtn.disabled = 'true';

function setData() {  
  if (calendar.selectedDates[0] > options.defaultDate) {
    refs.startBtn.removeAttribute('disabled', 'disabled');   
  }
  else {
    refs.startBtn.setAttribute('disabled', 'disabled');    
    Notify.failure('Please choose a date in the future');
  }  
};

function startTimer() {
  refs.startBtn.setAttribute('disabled', 'disabled');

  timerId = setInterval(() => {    
  let currentTime = Date.now();
  const deltaTime = calendar.selectedDates[0].getTime() - currentTime;    
  const timeDifference = convertMs(deltaTime);  

    if (deltaTime > 0) {
      refs.days.textContent = addLeadingZero(timeDifference.days);
      refs.hours.textContent = addLeadingZero(timeDifference.hours);
      refs.minutes.textContent = addLeadingZero(timeDifference.minutes);
      refs.seconds.textContent = addLeadingZero(timeDifference.seconds);
    } else {
      clearInterval(timerId);
      refs.startBtn.removeAttribute('disabled', 'disabled');
    }       
  }, 1000);
};

function addLeadingZero(value) {
    return String(value).padStart(2, '0');
};
  
function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);
  // console.log (`days ${days} hours ${hours} minutes ${minutes} seconds ${seconds}`)

  return { days, hours, minutes, seconds };
};
