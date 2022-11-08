const display = document.getElementById("clock");
const audio = new Audio(
  "http://www.accesscontrolsales.com/Ingram_Products/mp3/pb120amb-x.mp3"
);
audio.loop = true;
let alarmTime = null;
let alarmTimeOut = null;
let alarmRing = false;
let counter = 0;
// update time
function updateTime() {
  const data = new Date();
  const hour = formatTime(data.getHours());
  const minutes = formatTime(data.getMinutes());
  const seconds = formatTime(data.getSeconds());
  display.innerHTML = `${hour}:${minutes}:${seconds}`;
}
function formatTime(time) {
  if (time < 10) {
    return "0" + time;
  }
  return time;
}

function setAlarmTime(value) {
  alarmTime = value;
}

function setAlarm() {
  if (alarmTime) {
    const current = new Date();
    const timeToAlarm = new Date(alarmTime);

    if (timeToAlarm > current) {
      const timeout = timeToAlarm.getTime() - current.getTime();
      alarmTimeOut = setTimeout(() => audio.play(), timeout);
      alarmRing = true;
      alert("Alarm Set");
    }
  }
}
function clearAlarm() {
  audio.pause();
  if (alarmTimeOut) {
    clearTimeout(alarmTimeOut);
    alert("Alarm Cleared");
    alarmRing = false;
  }
}

function snoozeAlarm() {
  if (counter < 3) {
    if (alarmRing) {
      audio.pause();
      alert("Alarm Snoozed for 5 minutes");
      alarmTimeOut = setTimeout(() => audio.play(), 300000);
    }
    counter++;
  } else {
    clearAlarm();
    counter = 0;
  }
}

setInterval(updateTime, 1000);
