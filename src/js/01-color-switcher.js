// "use strict";

let timerId = null;
const refs = {
  startBtn: document.querySelector('button[data-start]'),
  stopBtn: document.querySelector('button[data-stop]'),  
};

refs.startBtn.addEventListener('click', () => {
    timerId = setInterval(changeColor, 1000);

    refs.startBtn.disabled = 'true';
    if (refs.stopBtn.hasAttribute('disabled')) {
        refs.stopBtn.removeAttribute('disabled', 'disabled');
    }
    
});

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

function changeColor() {  
  document.body.style.background = getRandomHexColor(); 
};

refs.stopBtn.addEventListener('click', () => {
    clearInterval(timerId);
    
    refs.stopBtn.disabled = 'true';
    if (refs.startBtn.hasAttribute('disabled')) {
        refs.startBtn.removeAttribute('disabled', 'disabled');
    }
    
});
