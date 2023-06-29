/**
 * @returns {Promise>Object} quote information
 */
const fetchApp = async() => {
    const api = await fetch('https://api.adviceslip.com/advice');
    const data = await api.json();
    return data.slip;
}

/**
 * 
 * @param {HTMLDivElement} element 
 */
export const adviceGeneratorApp = async(element) => {

    const quote = document.createElement('p');
    const idNumber = document.createElement('h1'); 
    const diceBotton = document.querySelector('.dice'); 
    const img = document.querySelector('.img'); 

    const renderQuote = (data) => {
        quote.innerHTML = data.advice;
        idNumber.innerHTML = `Advice #${data.id}`;
        element.replaceChildren(idNumber,quote,diceBotton);
    }

    diceBotton.addEventListener('click', async(event) => {
        img.classList.remove('rotate');
        img.classList.add('rotate');
        const quote = await fetchApp();
        renderQuote(quote);
    })

    //option 1
    const data = await fetchApp()
    //option 2
    // fetchApp().then((data)=> {
    //     return renderQuote(data);
    // } )
    renderQuote(data);
}