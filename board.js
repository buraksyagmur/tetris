"use strict";
const board = document.querySelector(".board")
for (let i = 1; i <= 10; i++) {
    for (let j = 1; j < 20; j++) {
        const square = document.createElement("div");
        square.classList.add("board-div");
        square.id = `pixel-${i}-${j}`;
        board.append(square);
    }
}
for (let k = 1; k <=10; k++) {
    const square = document.createElement("div");
    square.classList.add("board-div");
    square.classList.add("taken");
    square.id = `pixel-${k}-20`;
    board.append(square);
    
}
let squares = Array.from(document.querySelectorAll(".board-div"))
let currentPosition = 3

/// select random tetromino
let randomTetromino = Math.floor(Math.random()*tetrominos.length)
let randomRotation = Math.floor(Math.random()*4)
let currentRotation = randomRotation
let current = tetrominos[randomTetromino][currentRotation]


// draw tetromino onto the board
let draw = () => {
    if (current.some(index => squares[currentPosition + index + lineWidth].classList.contains("taken"))) {
        /// if next position is taken
        freeze()
        // create new tetromino
        currentPosition = 3
        randomTetromino = Math.floor(Math.random()*tetrominos.length)
        current = tetrominos[randomTetromino][currentRotation]
    } else {
        current.forEach(index => { 
            squares[currentPosition + index].classList.add("tetromino")
        })
    }  
}

/// fix the position of the tetromino
let freeze = () => {
    current.forEach(index => {
        squares[currentPosition + index].classList.add("tetromino")
        squares[currentPosition + index].classList.add("taken")
    })
}

// remove tetromino from board
let undraw = () => {
    current.forEach(index => {
        squares[currentPosition + index].classList.remove("tetromino")
    })
}

