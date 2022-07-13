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
    current.forEach(index => { 

        ///outside of board -- not complete
        if (squares[currentPosition + index] === undefined) {
            // undraw()
            currentPosition -= lineWidth
            draw()
            currentPosition = 3
            return
        } else {
            squares[currentPosition + index].classList.add("tetromino")
        }
        
    })
}

// remove tetromino from board
let undraw = () => {
    current.forEach(index => {
        squares[currentPosition + index].classList.remove("tetromino")
    })
}

