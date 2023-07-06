import { generateAlert } from "../../utils/alert";
const percentButton = document.querySelectorAll(".info__button");
const inputBill = document.querySelector("#inputBill");
const inputPeople = document.querySelector("#inputPeople");
const resultTip = document.querySelector("#resultTip");
const resultPerson = document.querySelector("#resultPerson");
const inputCustom = document.querySelector(".info__custom");
const resetButton = document.querySelector(".result__button");

//FUNCION PRINCIPAL
const calculateTip = () => {

  const totalBill = inputBill.value;
  const buttonActive = document.querySelector(".info__button-active");
  const customActive = document.querySelector(".info__custom-active");
  if (!buttonActive && !customActive) {
    return;
  }

  const percentActive = buttonActive ? buttonActive.value : customActive.value;
  const totalTip = parseFloat((totalBill * percentActive) / 100).toFixed(2);
  const totalPerson = parseFloat(totalTip / inputPeople.value).toFixed(2);

  resultTip.textContent = `$${totalTip}`;
  resultPerson.textContent = `$${totalPerson}`;
};

//EVENTOS
/**Evento de los botones de Porcentajes */
percentButton.forEach((percent) => {
  percent.addEventListener("click", (e) => {
    if (
      parseFloat(inputBill.value) === 0 ||
      isNaN(parseFloat(inputBill.value))
    ) {
      generateAlert("Digite el monto de la factura");
      return;
    }

    removeCustomActive();
    removePercentActive();
    percent.classList.add("info__button-active");

    calculateTip();
  });
});

/**Evento para el monto Factura */
inputBill.addEventListener("input", (e) => {
    if (inputBill.value < 1) {
        inputBill.value = "";
        generateAlert("Monto debe ser mayor a 1");
        return;
      }
  calculateTip();
});

/**Evento cantidad Personas */
inputPeople.addEventListener("input", (e) => {
  if (inputPeople.value < 1 || inputPeople.value > 50) {
    inputPeople.value = "";
    generateAlert("Cantidad de personas: Min 1 - Max 50");
    return;
  }
  calculateTip();
});

/**Evento porcentaje manual */
inputCustom.addEventListener("input", (e) => {
  if (inputCustom.value < 1 || inputCustom.value > 100 ) {
    inputCustom.value = "";
    generateAlert("El porcentaje debe ser entre 1 y 100");
    return;
  }

  const customActive = document.querySelector(".info__button-active");
  if (customActive) {
    customActive.classList.remove("info__button-active");
  }
  inputCustom.classList.add("info__custom-active");

  calculateTip();
});

/**Evento boton Reset */
resetButton.addEventListener("click", (e) => {
  inputBill.value = "";
  inputCustom.value = "";
  inputPeople.value = 1;
  
  resultTip.textContent = `$0.00`;
  resultPerson.textContent = `$0.00`;

  removeCustomActive();
  removePercentActive();
});

/**OTRAS FUNCIONES */
const removePercentActive = () => {
  const percentActive = document.querySelector(".info__button-active");
  if (percentActive) {
    percentActive.classList.remove("info__button-active");
  }
};

const removeCustomActive = () => {
  const customActive = document.querySelector(".info__custom-active");
  if (customActive) {
    customActive.classList.remove("info__custom-active");
    inputCustom.value = "";
  }
};
