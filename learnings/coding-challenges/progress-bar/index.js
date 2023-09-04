const [progressbar, progressFilled, progressText] = [
  '.progressbar',
  '.progress-filled',
  '.progress-text',
].map((el) => document.querySelector(el));

const fillProgressBar = () => {
  let progress = 0;
  let currentProgress = 0;

  const intervalId = setInterval(() => {
    progress += Math.floor(Math.random() * 10);

    if (currentProgress < 100 && progress >= 100) {
      currentProgress = 100;
    } else {
      currentProgress = progress;
    }

    if ((currentProgress === 100)) {
      clearInterval(intervalId);
    }

    progressFilled.style.transform = `translateX(${currentProgress - 100}%)`;
    progressText.textContent = `${currentProgress}`;
  }, 1000);
};

fillProgressBar();
