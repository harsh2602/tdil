(function () {
  const hour = document.querySelector('.hour');
  const minute = document.querySelector('.minutes');
  const seconds = document.querySelector('.seconds');

  const startBtn = document.querySelector('.start');
  const stopBtn = document.querySelector('.stop');
  const resetBtn = document.querySelector('.reset');

  let countdownTimer = null;

  startBtn.addEventListener('click', function () {
    if (!hour.value && !minute.value && !seconds.value) {
      return;
    }

    startInterval();
  });

  stopBtn.addEventListener('click', function () {
    stopInterval('pause');
  });

  resetBtn.addEventListener('click', function () {
    reset();
  });

  function startInterval() {
    startBtn.style.display = 'none';
    stopBtn.style.display = 'initial';

    countdownTimer = setInterval(() => {
      timer();
    }, 1000);
  }

  function timer() {
    if (seconds.value > 60) {
      minute.value = parseInt(minute.value) + 1;
      seconds.value = parseInt(seconds.value) - 60;
    }

    if (minute.value > 60) {
      hour.value = parseInt(hour.value) + 1;
      minute.value = parseInt(minute.value) - 60;
    }

    if (hour.value == 0 && minute.value == 0 && seconds.value == 0) {
      hour.value = '';
      minute.value = '';
      seconds.value = '';
      stopInterval();
    } else if (seconds.value != 0) {
      seconds.value = `${seconds.value <= 10 ? '0' : ''}${seconds.value - 1}`;
    } else if (minute.value != 0 && seconds.value == 0) {
      seconds.value = 59;
      minute.value = `${minute.value <= 10 ? '0' : ''}${minute.value - 1}`;
    } else if (hour.value != 0 && minute.value == 0) {
      minute.value = 60;
      hour.value = `${hour.value <= 10 ? '0' : ''}${hour.value - 1}`;
    }
  }

  function stopInterval(state) {
    startBtn.innerHTML = state === 'pause' ? 'Continue' : 'Start';

    startBtn.style.display = 'initial';
    stopBtn.style.display = 'none';

    clearInterval(countdownTimer);
  }

  function reset() {
    hour.value = '';
    minute.value = '';
    seconds.value = '';

    clearInterval(countdownTimer);
  }
})();
