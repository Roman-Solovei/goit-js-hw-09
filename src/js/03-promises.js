// "use strict";

import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
    submitForm: document.querySelector('form.form'),
    delay: document.querySelector('input[name=delay]'),
    step: document.querySelector('input[name=step]'),
    amount: document.querySelector('input[name=amount]'),
};

refs.submitForm.addEventListener('submit', submit);

function submit(e) {
  e.preventDefault();
  
  let delay = refs.delay.value;
  
  for (let i = 1; i <= refs.amount.value; i += 1) {
    
    console.log(`'i': ${i}, 'delay:' ${delay}`)

    createPromise(i, delay)
      .then(({ position, delay }) => {
        Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });

    delay = Number(refs.delay.value) + Number(refs.step.value);
  }
};


function createPromise(position, delay) {    
  
   return new Promise((resolve, reject) => {
      
    const shouldResolve = Math.random() > 0.3;
   
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position: position, delay: delay })
      }
      reject({ position: position, delay: delay });
    }, delay);

  });
  
};
