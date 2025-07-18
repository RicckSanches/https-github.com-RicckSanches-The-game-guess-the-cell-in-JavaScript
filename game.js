const game = document.querySelector('#game');

const div_1 = document.createElement("div");
div_1.className = "div_1";

const h1 = document.createElement("h1");
h1.textContent = 'Угадай ячейку';
div_1.appendChild(h1);


const buttonsContainer = document.createElement("div");
buttonsContainer.className = "buttons-container"; // Новый класс только для CSS


let arr = [];
for (let i = 0; i < 100; i++) {
        const button = document.createElement("button");
        button.className = `button_${i + 1}`; // Ваш оригинальный формат button_1, button_2...
        button.textContent = ``;
        buttonsContainer.appendChild(button);
        arr.push(button);
}
console.log(arr);

div_1.appendChild(buttonsContainer);
game.appendChild(div_1);