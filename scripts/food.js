import { expandSnake, onSnake } from "./snake.js";
import { randomGridPosition } from "./grid.js";
import { scoreDisplay } from "./game.js";


let food = getRandomFoodPosition();
let score = 0;
const EXPANSION_RATE = 1;

export function update() {
  // update game state
    if(onSnake(food)) {
        updateScore();
        expandSnake(EXPANSION_RATE);
        food = getRandomFoodPosition();
    }

}

export function render(gameBoard) {
    // render game state
    const foodElement = document.createElement("div");
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add("food");
    gameBoard.appendChild(foodElement);
}

function getRandomFoodPosition() {
    let newFoodPosition;
    while(newFoodPosition == null || onSnake(newFoodPosition)) {
        newFoodPosition = randomGridPosition();
    }
    return newFoodPosition;
}

function updateScore() {
    score += EXPANSION_RATE;
    scoreDisplay.innerText = score;
}
