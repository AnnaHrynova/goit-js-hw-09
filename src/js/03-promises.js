import { Notify } from "notiflix";

const refs = {
  form: document.querySelector('.form'),
  delay: document.querySelector('input[name="delay"]'),
  step: document.querySelector('input[name="step"]'),
  amount: document.querySelector('input[name="amount"]'),
};

refs.form.addEventListener("submit", startPromise);

let amount = 0;
let delay = 0;
let step = 0;
let i = 0;
let position = 0;

function startPromise(e) {
  e.preventDefault();
  amount = Number(refs.amount.value);
  delay = Number(refs.delay.value);
  step = Number(refs.step.value);

  for (i = 0; i < amount; i += 1) {
    position += 1;

    createPromise(position, delay)
      .then(({ position, delay }) => {
        Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });

    delay += step;
  }

  position = 0;
  i = 0;
}

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;

    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}


