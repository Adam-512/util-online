import { requestInterval } from "./exctInterval.js";

function countdown(deadline) {
  let time = (new Date(deadline).getTime() - Date.now()) / 1000;
  let days, hours, minutes, seconds;
  let $div = document.createElement("DIV");
  $div.id = "countdownEl";
  document.documentElement.appendChild($div);
  const updateTime = () => {
    const el = document.getElementById("countdownEl") || $div;
    let text = `${days} : ${hours} : ${minutes} : ${seconds}`;
    console.log(text);
    el.innerText = text;
  };
  requestInterval(function () {
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

console.log(12);

countdown("2023-7-28 11:00");
