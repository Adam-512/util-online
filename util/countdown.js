import { requestInterval } from "./exctInterval.js";

//main
let $el = document.getElementById("countdownWrapper");
let deadline = $el && $el.dataset.deadline;
let timer = null;
onVisible(function () {
  cancelAnimationFrame(timer && timer.value);
  countdown(deadline);
});
countdown(deadline);

function countdown(deadline) {
  let time = (new Date(deadline).getTime() - Date.now()) / 1000;
  let days, hours, minutes, seconds;

  const updateTime = () => {
    let text = `${addHtml(hours)}:${addHtml(minutes)}:${addHtml(seconds)}`;
    $el.innerHTML = text;
  };
  const addHtml = (num) => {
    let _num = (num + "").split("");
    if (_num.length === 1) {
      return `<span>0</span><span>${_num[0]}</span>`;
    }
    return `<span>${_num[0]}</span><span>${_num[1]}</span>`;
  };
  timer = requestInterval(function () {
    time--;
    if (time > 0) {
      days = Math.floor(time / 60 / 60 / 24);
      hours = Math.floor((time % (60 * 60 * 24)) / (60 * 60));
      minutes = Math.floor((time % (60 * 60)) / 60);
      seconds = Math.floor(time % 60);
      updateTime();
    }
  }, 1000);
}

function onVisible(cb) {
  const callback = (event) => {
    if (document.visibilityState === "visible") {
      cb(event);
    }
  };
  document.addEventListener("visibilitychange", callback, true);
}

const styles = `
  #countdownWrapper span{
    display:inline-block;
    padding:5px 0;
    font-size:21px;
    color:white;
    background:#000;
    width:28px;
    text-align:center;
  }
  #countdownWrapper span:nth-child(odd){
    margin:0 3px;
  }
  #countdownWrapper span:nth-child(even):not(:last-child){
    margin-right:3px;
  }
`;
const styleEl = document.createElement("style");
styleEl.innerText = styles;
document.head.appendChild(styleEl);
