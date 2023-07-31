import { intervalToDuration,isExists } from 'date-fns'

const dayInput = document.querySelector('#day');
const monthInput = document.querySelector('#month');
const yearInput = document.querySelector('#year');
const enterBotton = document.querySelector('.card__date-arrow');

/* Funcion Principal */
const calculatorAge = () => {
    if(!validate()) return false;

    const today = new Date();
    const birthdayData = `${yearInput.value}/${monthInput.value}/${dayInput.value}`;
    const birthday = new Date(birthdayData);

    if(birthday > today){
        alert('La fecha no corresponde a un periodo actual');
        return false;   
    }

    const totalAge = intervalToDuration({
        start: today,
        end: birthday,
    });
    console.log(totalAge);
    const yearResult = document.querySelector('#year-result');
    const monthResult = document.querySelector('#month-result');
    const dayResult = document.querySelector('#day-result');
    yearResult.textContent = totalAge.years;
    monthResult.textContent = totalAge.months;
    dayResult.textContent = totalAge.days;

}

/*OTRAS FUNCIONES UTILES*/
//Funcion para añadir alerta
const addAlert = (title, input, alert, message) => {
    title.classList.add('card__block-name--alert');
    input.classList.add('card__block-input--alert');
    alert.style.display = 'block';
    alert.textContent = message;
}
//Funcion para remover alerta
const removeAlert = (title, input, alert) => {
    title.classList.remove('card__block-name--alert');
    input.classList.remove('card__block-input--alert');
    alert.style.display = 'none';
}

/* EVENTOS */
//Evento al input DAY
dayInput.addEventListener('input', (e) => {
    const dayTitle = document.querySelector('#dayTitle');
    const dayAlert = document.querySelector('#dayAlert');
    const dayNumber = dayInput.value;

    if (dayNumber < 1 || dayNumber > 31 ) {
        addAlert(dayTitle, dayInput, dayAlert, 'Debe ser un dia valido');
       
      } else{
        removeAlert(dayTitle, dayInput, dayAlert);
      }
})

//Evento al input MONTH
monthInput.addEventListener('input', (e) => {
    const monthNumber = monthInput.value;
    const monthTitle = document.querySelector('#monthTitle');
    const monthAlert = document.querySelector('#monthAlert');

    if (monthNumber < 1 || monthNumber > 12 ) {
        addAlert(monthTitle, monthInput, monthAlert, 'Debe ser un mes valido')

      } else{
        removeAlert(monthTitle, monthInput, monthAlert);
      }
})

//Evento al input YEAR
yearInput.addEventListener('input', (e) => {
    const yearNumber = yearInput.value;
    const yearTitle = document.querySelector('#yearTitle');
    const yearAlert = document.querySelector('#yearAlert');

    if (yearNumber > new Date().getFullYear()) {
        addAlert(yearTitle, yearInput, yearAlert, 'Debe ser un año pasado o actual')
    } else{
        removeAlert(yearTitle, yearInput, yearAlert);
    }
})

//Evento al circulo Enter
enterBotton.addEventListener('click', calculatorAge);

/*Funcion Para validar que los input esten correctos*/
const validate = () => {
    const dayEmpty = document.querySelector('#dayEmpty');
    const monthEmpty = document.querySelector('#monthEmpty');
    const yearEmpty = document.querySelector('#yearEmpty');
    let isEmpty = false;

    if(dayInput.value === ""){
        addAlert(dayTitle, dayInput, dayEmpty, 'El campo es requerido');
        isEmpty = true;
    } else{
        removeAlert(dayTitle, dayInput, dayEmpty);  
    }

    if(monthInput.value === ""){
        addAlert(monthTitle, monthInput, monthEmpty, 'El campo es requerido');
        isEmpty = true;
    } else{
        removeAlert(monthTitle, monthInput, monthEmpty);
    }

    if(yearInput.value === ""){
        addAlert(yearTitle, yearInput, yearEmpty, 'El campo es requerido');
        isEmpty = true;
    } else{
        removeAlert(yearTitle, yearInput, yearEmpty);
    }
    
    if(isEmpty) return false;

    if(!isExists(parseInt(yearInput.value),parseInt(monthInput.value)-1,parseInt(dayInput.value))){
        addAlert(dayTitle, dayInput, dayAlert, 'Fecha invalida de calendario');
        addAlert(monthTitle, monthInput, monthAlert);
        addAlert(yearTitle, yearInput, yearAlert);
        return false;
    } else{
        removeAlert(dayTitle, dayInput, dayAlert);
        removeAlert(monthTitle, monthInput, monthAlert);
        removeAlert(yearTitle, yearInput, yearAlert);
    }

    return true;
}