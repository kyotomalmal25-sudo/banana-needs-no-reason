(() => {
  const stateButtons = [...document.querySelectorAll("[data-state]")];
  const stateReadout = document.querySelector(".state-readout");
  stateButtons.forEach((button) => button.addEventListener("click", () => {
    stateButtons.forEach((item) => item.classList.remove("selected"));
    button.classList.add("selected");
    const [title, note] = button.dataset.state.split("|");
    stateReadout.querySelector("p").textContent = title;
    stateReadout.querySelector("strong").textContent = note;
  }));

  const steps = [...document.querySelectorAll("[data-step]")];
  const diagram = document.querySelector(".banana-diagram");
  const readout = document.querySelector(".step-readout");
  let activeStep = 0;
  const selectStep = (index) => {
    if (!steps.length) return;
    activeStep = index;
    steps.forEach((item) => item.classList.remove("active"));
    steps[index].classList.add("active");
    const [number, ja, en, note] = steps[index].dataset.step.split("|");
    diagram.className = `banana-diagram stage-${number}`;
    readout.querySelector("span").textContent = `${String(number).padStart(2,"0")} / 06`;
    readout.querySelector("p").textContent = en;
    readout.querySelector("h2").textContent = ja;
    readout.querySelector("strong").textContent = note;
  };
  steps.forEach((button, index) => button.addEventListener("click", () => selectStep(index)));
  document.querySelector(".advance-button")?.addEventListener("click", () => selectStep((activeStep + 1) % steps.length));

  const phoneDisplay = document.querySelector(".phone-display");
  document.querySelectorAll("[data-phone]").forEach((button) => button.addEventListener("click", () => { phoneDisplay.textContent = button.dataset.phone; }));
})();
