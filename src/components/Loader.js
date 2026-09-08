export function initLoader() {
  const loader = document.getElementById("loader");
  const fill = document.getElementById("loader-bar-fill");
  const percentLabel = document.getElementById("loader-percent");

  let progress = 0;
  const timer = setInterval(() => {
    progress += Math.random() * 20;
    if (progress >= 100) {
      progress = 100;
      clearInterval(timer);
      fill.style.width = "100%";
      percentLabel.textContent = "LOADING 100%";
      setTimeout(() => {
        loader.classList.add("loader-hidden");
        setTimeout(() => loader.remove(), 500);
      }, 300);
      return;
    }
    fill.style.width = `${progress}%`;
    percentLabel.textContent = `LOADING ${Math.floor(progress)}%`;
  }, 120);
}