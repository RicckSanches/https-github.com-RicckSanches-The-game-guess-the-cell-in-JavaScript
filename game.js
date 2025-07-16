const game = document.querySelector('#game')

const div_1 = document.createElement("div")
div_1.className = "div_1"

div_1.style = "background-color:red; width: 1000px; height: 1000px; display:flex; flex-direction: column; justify-content: flex-start; align-items:center;";


const container = document.querySelector(".container")
const h1 = container.createElement("h1");
h1.textContent = 'Угадай ячейку'
div_1.appendChild(h1);

for(let i = 0; i < 100; i++ ){

        const button = document.createElement("button");
        button.id = `button_${i + 1}`
        button.textContent = `${i + 1}`
        button.style = 'width: 50px; height: 50px;'
        div_1.appendChild(button);
}


game.appendChild(div_1)