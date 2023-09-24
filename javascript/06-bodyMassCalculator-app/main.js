import './style.css'

//DOM Input
const metricOption = document.querySelector('#metric');
const imperialOption = document.querySelector('#imperial');
const heightInput = document.querySelector('#height');
const weightInput = document.querySelector('#weight');

//DOM Result
const resulTextBMI = document.querySelector('#resultBMI');
const pesoMin = document.querySelector('#pesoMin');
const pesoMax = document.querySelector('#pesoMax');

//IMC
const bajoPeso = 18.5;
const pesoNormal = 24.9;

//Eventos
// metricOption.addEventListener('change', () => {
//     console.log('metric');
// })

// imperialOption.addEventListener('change', () => {
//     console.log('imperial');
// })

heightInput.addEventListener('input', (e) => {
    BMIcalculate();
})

weightInput.addEventListener('input', (e) => {
    BMIcalculate();
})

//Funcion de Calculo
const BMIcalculate = () => {
    const height = heightInput.value / 100;
    const weight = parseInt(weightInput.value)

    const bmi = (weight / Math.pow(height, 2));

    if(!isNaN(bmi)){
        resulTextBMI.textContent = bmi.toFixed(2);
    }

    const pesoMinimoIdeal = bajoPeso * (height * height);
    const pesoMaximoIdeal = pesoNormal * (height * height);

    pesoMin.textContent = `${pesoMinimoIdeal.toFixed(2)}Kg`;
    pesoMax.textContent = `${pesoMaximoIdeal.toFixed(2)}Kg`;
}
