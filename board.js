"use strict";

const body = document.querySelector("body");
const wrapper = document.querySelector(".wrapper");

const box1 = document.createElement("div");
const box2 = document.createElement("div");
const box3 = document.createElement("div");

wrapper.append(box1);
wrapper.append(box2);
wrapper.append(box3);

const gameTable = document.createElement("div");
gameTable.classList.add("board");
box2.append(gameTable);

// create game area
const maxY=20, maxX=20;
for (let j = 0; j < maxY; j++) {
    for (let i = 0; i <maxX; i++) {
        const tablePixel = document.createElement("div");
        tablePixel.classList.add("table-pixel");
        tablePixel.id = `pixel-${i}-${j}`;
        // const pixelVal = document.createElement("input");
        // pixelVal.value = 0; // 0 means free, 1 means occupied
        // pixelVal.style.display = "none";
        // tablePixel.append(pixelVal);
        gameTable.append(tablePixel);
    }
}





const board = document.querySelector(".board")
let squares = Array.from(document.querySelectorAll(".board div"))

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

