import "./src/scss/style.scss"; 
import calculator from "./src/components/calculator/calculator.html?raw";

const app = document.querySelector("#app");
const newComponent = (component) => (app.innerHTML = app.innerHTML + component);

newComponent(calculator); 