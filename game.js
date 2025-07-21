const game = document.querySelector('#game');

// ========== Стартовое окно ==========
const startContainer = document.createElement('div');
startContainer.className = 'start-container';

const startTitle = document.createElement('h1');
startTitle.className = 'start-title';
startTitle.textContent = 'Игра "Угадай ячейку"';
startContainer.appendChild(startTitle);

const rulesTitle = document.createElement('h2');
rulesTitle.className = 'rules-title';
rulesTitle.textContent = 'Правила:';
startContainer.appendChild(rulesTitle);

const rule1 = document.createElement('p');
rule1.className = 'rule';
rule1.textContent = '1. Угадайте 10 ячеек из 100';
startContainer.appendChild(rule1);

const rule2 = document.createElement('p');
rule2.className = 'rule';
rule2.textContent = '2. У вас есть 2 минуты на выполнение';
startContainer.appendChild(rule2);

const startButton = document.createElement('button');
startButton.className = 'start-button';
startButton.textContent = 'Начать игру';
startContainer.appendChild(startButton);

game.appendChild(startContainer);

// ========== Основной игровой экран (изначально скрыт) ==========
const div_1 = document.createElement("div");
div_1.className = "div_1";
div_1.style.display = "none";

// Таймер
const timerContainer = document.createElement("div");
timerContainer.className = "timer-container";
const timerText = document.createElement("span");
timerText.className = "timer-text";
timerText.textContent = "02:00";
timerContainer.appendChild(timerText);
div_1.appendChild(timerContainer);

// Заголовок игры
const h1 = document.createElement("h1");
h1.textContent = 'Угадай ячейку';
div_1.appendChild(h1);

// Счетчик угаданных
const counterElement = document.createElement("div");
counterElement.className = "counter";
counterElement.textContent = `Угадано: 0/10`;
div_1.appendChild(counterElement);

// Контейнер для кнопок
const buttonsContainer = document.createElement("div");
buttonsContainer.className = "buttons-container";
div_1.appendChild(buttonsContainer);

// Модальное окно завершения игры
const finishContainer = document.createElement("div");
finishContainer.className = "finish-container";
finishContainer.style.display = "none";

const finishText = document.createElement("p");
finishText.className = "finish-text";
finishContainer.appendChild(finishText);

const restartButton = document.createElement("button");
restartButton.className = "restart-button";
restartButton.textContent = "Играть снова";
finishContainer.appendChild(restartButton);
div_1.appendChild(finishContainer);

game.appendChild(div_1);

// ========== Игровая логика ==========
let arr = [];
let randomButtons = [];
let correctGuesses = 0;
let gameTimer;
let timeLeft = 120;

// Функция инициализации игрового поля
function initGameField() {
        buttonsContainer.innerHTML = ''; // Очищаем контейнер
        arr = []; // Очищаем массив кнопок

        // Создаем 100 кнопок
        for (let i = 0; i < 100; i++) {
                const button = document.createElement("button");
                button.className = `button_${i + 1}`;
                button.textContent = ``;
                buttonsContainer.appendChild(button);
                arr.push(button);

                // Добавляем обработчик клика
                button.addEventListener('click', handleButtonClick);
        }
}

// Функция обработки клика по кнопке
function handleButtonClick(event) {
        const button = event.currentTarget;

        if (randomButtons.includes(button)) {
                if (button.style.background !== 'green') {
                        button.style.background = 'green';
                        correctGuesses++;
                        counterElement.textContent = `Угадано: ${correctGuesses}/10`;

                        if (correctGuesses === 10) {
                                endGame(true);
                        }
                }
        } else {
                button.style.background = 'gray';
        }
}

// Функция обновления таймера
function updateTimer() {
        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;
        timerText.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

        if (timeLeft <= 0) {
                endGame(false);
        } else {
                timeLeft--;
        }
}

// Функция завершения игры
function endGame(isWin) {
        clearInterval(gameTimer);
        arr.forEach(button => button.disabled = true);

        finishText.textContent = isWin
            ? "Поздравляю! Вы победили!"
            : "Время вышло! Попробуйте еще раз!";

        finishContainer.style.display = "block";
        finishContainer.scrollIntoView({ behavior: 'smooth' });
}

// Функция сброса игры
function resetGame() {
        // Сброс состояния
        correctGuesses = 0;
        timeLeft = 120;
        randomButtons = [];

        // Обновление интерфейса
        counterElement.textContent = `Угадано: ${correctGuesses}/10`;
        timerText.textContent = "02:00";
        finishContainer.style.display = "none";

        // Очистка таймера
        if (gameTimer) clearInterval(gameTimer);
}

// Функция старта игры
function startGame() {
        resetGame();

        // Инициализация игрового поля
        initGameField();

        // Выбираем 10 случайных кнопок
        while (randomButtons.length < 10) {
                const randomIndex = Math.floor(Math.random() * arr.length);
                if (!randomButtons.includes(arr[randomIndex])) {
                        randomButtons.push(arr[randomIndex]);
                }
        }

        // Переключение экранов
        startContainer.style.display = "none";
        div_1.style.display = "flex";

        // Запуск таймера
        gameTimer = setInterval(updateTimer, 1000);
}

// Инициализация обработчиков
startButton.addEventListener('click', startGame);
restartButton.addEventListener("click", startGame);

// Первоначальная инициализация
initGameField();