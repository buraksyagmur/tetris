const board = document.querySelector(".board")
let howManytimesDle = 0
for (let i = 1; i <= 22; i++) {
    for (let j = 1; j <= 10; j++) {
        const square = document.createElement("div");
        square.classList.add("board-div");
        square.id = `pixel-${i}_${j}`;
        // if (i===0 || i === 11) {
        //     square.classList.add("wall");
        // }
        board.appendChild(square);
    }
}
for (let k = 1; k <= 10; k++) {
    const square = document.createElement("div");
    square.classList.add("board-div");
    square.classList.add("taken");
    square.id = `outside-pixel-${k}+11`;
    board.appendChild(square);
}



let squares = Array.from(document.querySelectorAll(".board div"))

// move board up two rows
squares.forEach(element => element.style.transform = "translateY(-40px)")
// make first two rows invisible
squares.slice(0,20).forEach(index => {
    index.style.opacity = "0"
})
let lives = 3
let currentPosition = 3
let finish = false
let score = 0
let ScorePart1 = 0
let randomTetromino = Math.floor(Math.random() * tetrominos.length)
let randomRotation = Math.floor(Math.random() * 4)
let currentRotation = randomRotation
let current = tetrominos[randomTetromino][currentRotation]
// draw tetromino onto the board
let draw = () => {
    document.querySelector("#score").innerHTML = (ScorePart1)
    if (current.some(index => squares[currentPosition + index + lineWidth].classList.contains("taken"))) {
        if (currentPosition == 3) {
            console.log(lives)
            lives -= 1
            document.querySelector("#lives").innerHTML = "" + lives
            if (lives == 0) {
                play = false
                alert("game over")
                handleRestart()
            }
        }
        /// if next position is taken
        freeze()
        // create new tetromino
        currentPosition = 3
        randomTetromino = Math.floor(Math.random()*tetrominos.length)
        randomRotation = Math.floor(Math.random()*4)
        current = tetrominos[randomTetromino][randomRotation]
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
        ScorePart1++
    })
    for (let i = 0; i < squares.length; i++) {
        let squares2 = Array.from(document.querySelectorAll(".board div"))
        // console.log(squares2)
        
        if (squares2[i].className == "board-div tetromino taken") {
            if (removeLine(squares2) != false) {
                
                let removeNumber = removeLine(squares2)

                for (let p = 0; p < removeNumber.length; p++) {
                    for (let r = 0; r < 10; r++) {
                        let delet = document.getElementById(`pixel-${(removeNumber[p] + 10) / 10}_${r + 1}`)
                        console.log(`pixel-${(removeNumber[p] + 10) / 10}_${r + 1}`)
                        console.log(p, r, delet, "thats the loooop3")
                        console.log(squares.length, "------------------length")
                        console.log(squares2.length, "------------------length2")
                        board.removeChild(delet)
                        // board.removeChild(board.children[removeNumber[0]+r])
                        // const square = document.createElement("div");
                        // square.classList.add("board-div");
                        // square.id = `pixel-new-${-1*(newSqrNmbr-r)}`;
                        // board.prepend(square)
                    }
                    howManytimesDle++
                    // console.log()
                }

            }else {
                console.log("NO NEED TO REMOVE")
            }
        }
        if (howManytimesDle != 0) {
            for (let i = 0; i < (howManytimesDle); i++) {
                let squares3 = Array.from(document.querySelectorAll(".board div"))
                for (let k = 0; k < squares3.length; k++) {
                    let idName = squares3[k].id
                    if (idName.includes("_")) {
                        let idArr = idName.split("_")
                        let oldNum = idArr[0].match(/\d+/)
                        let intNum = parseInt(oldNum)
                        let newId = idArr[0].replace(/[0-9]+/g, intNum + 1);
                        squares3[k].id = newId + "_" + idArr[1]
                    }
                }
                ScorePart1+= 100
                AddNewLines()
            }
            howManytimesDle = 0
        }

    }
}


// remove tetromino from board
let undraw = () => {
    current.forEach(index => {
        squares[currentPosition + index].classList.remove("tetromino")
    })
}
function removeLine(squares) {
    let arr = []
    for (let i = 0; i < squares.length; i += 10) {
        let checkRmv = true
        if (squares[i].id.slice(-1) == "1" && squares[i].className == "board-div tetromino taken") {
            for (let k = i; k < i + 10; k++) {
                console.log("valueOfK",squares[k])
                console.log(arr.length, "ARR")
                if (squares[k].className != "board-div tetromino taken") {
                  checkRmv = false   
                }
                if (k == i+9 && checkRmv == true ){

                    console.log("have to remove line")
                    arr.push(i)
                }
            }
        }
    }
    
    if (arr == "") {

        return false
    } else {
        return arr
    }
}
function AddNewLines() {
    for (let i = 10; i > 0; i--) {
        const square = document.createElement("div");
        square.classList.add("board-div");
        square.id = `pixel-1_${i}`;
        board.prepend(square)
    }
}
