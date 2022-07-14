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

        if (squares[currentPosition + index + lineWidth].classList.contains("taken")) {
            /// if next position is taken
            freeze()
            // create new tetromino
            currentPosition = 3
            randomTetromino = Math.floor(Math.random()*tetrominos.length)
            current = tetrominos[randomTetromino][currentRotation]
            return
        } else {
            squares[currentPosition + index].classList.add("tetromino")
        }
        
    })
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

