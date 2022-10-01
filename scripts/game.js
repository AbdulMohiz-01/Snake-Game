import {SNAKE_SPEED, update as updateSnake, render as renderSnake, getSnakeHead, snakeIntersection } from "./snake.js";
import {update as updateFood, render as renderFood} from "./food.js";
import { outsideGrid } from "./grid.js";

const gameBoard = document.getElementById("game-board");
export const scoreDisplay = document.getElementById("score");

let lastRender = 0;
let gameOver = false;


function main(currentTime) {

    if (gameOver) {
        if (confirm("You lost. Press ok to restart.")) {
            window.location = "./index.html";
        }
        return;
    }

    window.requestAnimationFrame(main);
    const deltaTime = (currentTime - lastRender) / 1000;
    if (deltaTime < 1 / SNAKE_SPEED) return;
    lastRender = currentTime;
    update();
    render();
}

function update() {
    // update game state
    updateSnake();
    updateFood();
    checkDeath();
}

function render() {
    // render game state
    gameBoard.innerHTML = "";
    renderSnake(gameBoard);
    renderFood(gameBoard);
}

function checkDeath() {
    // check if snake is dead
    gameOver = outsideGrid(getSnakeHead()) || snakeIntersection();
}



window.requestAnimationFrame(main);