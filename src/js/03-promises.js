import { Notify } from "notiflix";

const refs = {
  form: document.querySelector('.form'),
  delay: document.querySelector('input[name="delay"]'),
  step: document.querySelector('input[name="step"]'),
  amount: document.querySelector('input[name="amount"]'),
  submitButton: document.querySelector('button[type="submit"]'),
};

refs.form.addEventListener("submit", startPromise);

let amount = 0;
let delay = 0;
let step = 0;
let position = 0;

function startPromise(e) {
  e.preventDefault();
  refs.submitButton.disabled = true;
  amount = Number(refs.amount.value);
  delay = Number(refs.delay.value);
  step = Number(refs.step.value);

  runPromises(amount, delay, step)
    .then(() => {
      Notify.success(`✅ All promises fulfilled`);
    })
    .catch(() => {
      Notify.failure(`❌ Some promises rejected`);
    })
    .finally(() => {
      refs.submitButton.disabled = false;
      position = 0;
    });
}

function runPromises(amount, delay, step) {
  const promises = [];

  for (let i = 0; i < amount; i += 1) {
    position += 1;

    const promise = createPromise(position, delay)
      .then(({ position, delay }) => {
        Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });

    promises.push(promise);

    delay += step;
  }

  return Promise.all(promises);
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
