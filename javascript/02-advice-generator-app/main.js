import "./style.css";
import { adviceGeneratorApp } from "./src/adviceGeneratorApp/adviceGenerator-app";
import iconDice from "./images/icon-dice.svg";

document.querySelector("#app").innerHTML = `
  <div class="box">
    <div class="box__content">
        <h1 class="name"></h1>
        <button class="dice" type="button"><img class="img" src="${iconDice}" class="dice" alt="Dice" /></button>
    </div>
</div>
`;

const element = document.querySelector(".box__content");

adviceGeneratorApp(element);