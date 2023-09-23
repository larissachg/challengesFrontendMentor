import "./style.css";

const pomodoroBtn = document.querySelector("#pomodoroBtn");
const shortBtn = document.querySelector("#shortBtn");
const longBtn = document.querySelector("#longBtn");
const timeText = document.querySelector("#timeText");
const state = document.querySelector("#state");
const timerBox = document.querySelector("#timerBox");

const times = {
  pomodoro: 30,
  short: 5,
  long: 15,
};

let globalTimerInSeconds = times.pomodoro * 60;

//Eventos
pomodoroBtn.addEventListener("click", () => {
  btnActive(pomodoroBtn);
  timerBtn(times.pomodoro);
});

shortBtn.addEventListener("click", () => {
  btnActive(shortBtn);
  timerBtn(times.short);
});

longBtn.addEventListener("click", () => {
  btnActive(longBtn);
  timerBtn(times.long);
});

timerBox.addEventListener("click", () => {
  if (state.textContent === "play") {
    state.textContent = "pause";
    timerOn();
  } else {
    state.textContent = "play";
    clearInterval(intervalo);
  }
});

//Funcion Principal
let intervalo = null;

const timerOn = () => {
  intervalo = setInterval(() => {
    globalTimerInSeconds = globalTimerInSeconds - 1;
    const operacion = globalTimerInSeconds / 60; //29,9833
    const resultadoMinuto = Math.floor(operacion);
    const resultadoSegundo = Math.round((operacion - resultadoMinuto) * 60);

    timeText.textContent = `${resultadoMinuto}:${resultadoSegundo}`;

    if (globalTimerInSeconds <= 0) {
      clearInterval(intervalo);
    }
  }, 1000);
};

function btnActive(btn) {
  const btnSelect = document.getElementsByClassName("bg-[#f87070]");
  const firstClass = btnSelect[0];

  if (firstClass) {
    firstClass.classList.remove("bg-[#f87070]");
    firstClass.classList.add("text-[#60647d]");
  }

  btn.classList.remove("text-[#60647d]");
  btn.classList.add("bg-[#f87070]", "text-[#151932]");
}

function timerBtn(type) {
  timeText.textContent = `${type}:00`;
  state.textContent = "play";
  clearInterval(intervalo);
  globalTimerInSeconds = type * 60;
}
