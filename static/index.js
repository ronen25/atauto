const { ipcRenderer } = require('electron');

let clockUpdater;
let clockType;

const setButtonText = (text) => {
  const button = document.getElementById('btnClock');
  button.textContent = text;
};

const onClockTypeChanged = (type) => {
  clockType = type;

  if (type === 'clockin') {
    setButtonText('Clock In');
  } else {
    setButtonText('Clock Out');
  }
};

const onBodyLoad = () => {
  // Interval clock updater
  clockUpdater = setInterval(() => {
    const clockDiv = document.getElementById('clock');

    const date = new Date();
    const hours = date.getHours();
    let minutes = date.getMinutes();
    if (minutes < 10) {
      minutes = '0' + minutes;
    }

    const timeString = `${hours}:${minutes}`;

    clockDiv.textContent = timeString;
  }, 1000);

  // If it's after 17:00, we probably wanna clock out
  if (new Date().getHours() >= 17) {
    const radClockOut = document.getElementById('radClockOut');
    radClockOut.checked = true;
    clockType = 'clockout';

    setButtonText('Clock Out');
  } else {
    const radClockIn = document.getElementById('radClockIn');
    radClockIn.checked = true;
    clockType = 'clockin';

    setButtonText('Clock In');
  }

  // If local storage data exists, put it
  const localUrl = localStorage.getItem('url') ?? '';
  const localUsername = localStorage.getItem('username') ?? '';

  document.getElementById('url').value = localUrl;
  document.getElementById('username').value = localUsername;
};

const onBodyUnload = (event) => {
  clearInterval(clockUpdater);
};

const onClockButtonClicked = () => {
  const [hours, minutes] = document.getElementById('clock').textContent.split(':');
  const url = document.getElementById('url').value;
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  // Store url and username to local storage
  localStorage.setItem('url', url);
  localStorage.setItem('username', username);

  // Send message to main process
  ipcRenderer.send('clock', {
    clockType,
    config: {
      url,
      username,
      password,
      hours,
      minutes,
    },
  });
};
