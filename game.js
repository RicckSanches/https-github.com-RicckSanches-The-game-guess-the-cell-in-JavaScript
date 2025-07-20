const game = document.querySelector('#game');

// Создаем основной контейнер
const div_1 = document.createElement("div");
div_1.className = "div_1";

// Заголовок игры
const h1 = document.createElement("h1");
h1.textContent = 'Угадай ячейку';
div_1.appendChild(h1);

// Контейнер для кнопок
const buttonsContainer = document.createElement("div");
buttonsContainer.className = "buttons-container";

// Модальное окно завершения игры
const finishContainer = document.createElement("div");
finishContainer.className = "finish-container";
finishContainer.style.display = "none"; // Скрываем по умолчанию

const finishText = document.createElement("p");
finishText.className = "finish-text";
finishText.textContent = "Поздравляю! Вы победили!";
finishContainer.appendChild(finishText);

const restartButton = document.createElement("button");
restartButton.className = "restart-button";
restartButton.textContent = "Играть снова";
finishContainer.appendChild(restartButton);

// Счетчик угаданных кнопок
let correctGuesses = 0;
const counterElement = document.createElement("div");
counterElement.className = "counter";
counterElement.textContent = `Угадано: ${correctGuesses}/10`;
div_1.appendChild(counterElement);

// Создаем 100 кнопок
let arr = [];
for (let i = 0; i < 100; i++) {
        const button = document.createElement("button");
        button.className = `button_${i + 1}`;
        button.textContent = ``;
        buttonsContainer.appendChild(button);
        arr.push(button);
}

// Выбираем 10 случайных кнопок
let randomButtons = [];
while (randomButtons.length < 10) {
        const randomIndex = Math.floor(Math.random() * arr.length);
        if (!randomButtons.includes(arr[randomIndex])) {
                randomButtons.push(arr[randomIndex]);
        }
}

// Обработчик клика для кнопок
for (let i = 0; i < arr.length; i++) {
        arr[i].addEventListener('click', function(event) {
                if (randomButtons.includes(arr[i])) {
                        if (event.target.style.background !== 'green') {
                                event.target.style.background = 'green';
                                correctGuesses++;
                                counterElement.textContent = `Угадано: ${correctGuesses}/10`;

                                // Проверка на победу
                                if (correctGuesses === 1) {
                                        finishContainer.style.display = "block";
                                        arr.forEach(button => button.disabled = true);
                                        finishContainer.scrollIntoView({ behavior: 'smooth' });
                                }
                        }
                } else {
                        event.target.style.background = 'gray';
                }
        });
}

// Обработчик для кнопки "Играть снова"
restartButton.addEventListener("click", function() {
        // Сброс игры
        correctGuesses = 0;
        counterElement.textContent = `Угадано: ${correctGuesses}/10`;

        // Выбираем новые 10 случайных кнопок
        randomButtons = [];
        while (randomButtons.length < 10) {
                const randomIndex = Math.floor(Math.random() * arr.length);
                if (!randomButtons.includes(arr[randomIndex])) {
                        randomButtons.push(arr[randomIndex]);
                }
        }

        // Сброс стилей и состояния кнопок
        arr.forEach(button => {
                button.style.background = "";
                button.disabled = false;
        });

        // Скрываем модальное окно
        finishContainer.style.display = "none";
});

// Добавляем элементы в DOM
div_1.appendChild(buttonsContainer);
div_1.appendChild(finishContainer);
game.appendChild(div_1);