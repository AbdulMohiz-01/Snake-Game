import { getInputDirection } from "./input.js";

export const SNAKE_SPEED = 10;
const snakeBody = [
    {x: 10, y: 11}
];
let newSegments = 0;

export function update() {
    // update game state
    addSegments();
    const inputDirection = getInputDirection();
    for (let i = snakeBody.length - 2 ; i >= 0; i--) {
        snakeBody[i + 1] = {...snakeBody[i]};
    }
    snakeBody[0].x += inputDirection.x;
    snakeBody[0].y += inputDirection.y;
}

export function render(gameBoard) {
    // render game state
    snakeBody.forEach(segment => {
        const snakeElement = document.createElement("div");
        snakeElement.style.gridRowStart = segment.y;
        snakeElement.style.gridColumnStart = segment.x;
        snakeElement.classList.add("snake");
        gameBoard.appendChild(snakeElement);
    });
}

export function expandSnake(amount) {
    newSegments += amount;
}


export function onSnake(foodPosition , {ignoreHead = false} = {}) {
    return snakeBody.some(segment => {
        if (ignoreHead && segment === snakeBody[0]) return false;
        return equalPositions(segment, foodPosition);
    });
}

function equalPositions(pos1, pos2) {
    return pos1.x === pos2.x && pos1.y === pos2.y;
}

function addSegments() {
    for (let i = 0; i < newSegments; i++) {
        snakeBody.push({...snakeBody[snakeBody.length - 1]});
    }
    newSegments = 0;
}

export function getSnakeHead() {
    return snakeBody[0];
}

export function snakeIntersection() {
    return onSnake(snakeBody[0], {ignoreHead: true});
}