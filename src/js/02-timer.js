import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

const button = document.querySelector("[data-start]");
const daysElement = document.querySelector("[data-days]");
const hoursElement = document.querySelector("[data-hours]");
const minutesElement = document.querySelector("[data-minutes]");
const secondsElement = document.querySelector("[data-seconds]");

button.addEventListener("click", startCounter);

let countdownInterval;
let targetDate;

button.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selectedDate = selectedDates[0];
    if (selectedDate < Date.now()) {
      alert("Please choose a date in the future");
    } else {
      button.disabled = false;
    }
  },
};

const datePicker = flatpickr("#datetime-picker", options);

function startCounter() {
  targetDate = datePicker.selectedDates[0];
  const currentDate = Date.now();

  if (targetDate <= currentDate) {
    alert("Please choose a date in the future");
    return;
  }

  clearInterval(countdownInterval);
  countdownInterval = setInterval(updateTimer, 1000);
}

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

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}

function updateTimer() {
  const timeDifference = targetDate - Date.now();
  const time = convertMs(timeDifference);

  daysElement.textContent = addLeadingZero(time.days);
  hoursElement.textContent = addLeadingZero(time.hours);
  minutesElement.textContent = addLeadingZero(time.minutes);
  secondsElement.textContent = addLeadingZero(time.seconds);

  if (timeDifference <= 1000) {
    clearInterval(countdownInterval);
  }
}

// const divTimer = document.querySelector(".timer");
// const divFields = document.querySelectorAll(".field");

// divTimer.style.display = 'flex';
// divTimer.style.gap = '16px';

// divFields.forEach(divField => {
//   divField.style.display = 'flex';
//   divField.style.flexDirection = 'column';
//   divField.style.alignItems = 'center';

//   const divValue = divField.querySelector(".value");
//   const divLabel = divField.querySelector(".label");

//   divValue.style.fontSize = '36px';

//   divLabel.style.fontSize = '12px';
//   divLabel.style.textTransform = 'uppercase';
// });
