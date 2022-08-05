const board = document.querySelector(".board")
let howManytimesDle = 0
for (let i = 1; i <= 22; i++) {
    for (let j = 1; j <= 10; j++) {
        const square = document.createElement("div");
        square.id = `pixel-${i}_${j}`;
        board.appendChild(square);
    }
}
for (let k = 1; k <= 10; k++) {
    const square = document.createElement("div");
    square.classList.add("taken");
    square.id = `outside-pixel-${k}+11`;
    board.appendChild(square);
}



let squares = Array.from(document.querySelectorAll(".board div"))

// move board up two rows
squares.forEach(element => element.style.transform = "translateY(-40px)")
// make first two rows invisible
squares.slice(0, 20).forEach(index => {
    index.style.opacity = "0"
})
let lives = 3
let currentPosition = 3
let finish = false
// let score = 0
let ScorePart1 = 0
// let randomTetromino = Math.floor(Math.random() * tetrominos.length)
let randomTetromino = 2;
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
        // randomTetromino = Math.floor(Math.random() * tetrominos.length)
        let randomTetromino = 2;
        randomRotation = Math.floor(Math.random() * 4)
        current = tetrominos[randomTetromino][randomRotation]
    } else {

        current.forEach(index => {
            squares[currentPosition + index].classList.add("tetromino")
            squares[currentPosition + index].classList.add(color[randomTetromino])
        })
    }
}

/// fix the position of the tetromino
let freeze = () => {
    current.forEach(index => {
        squares[currentPosition + index].classList.add("tetromino")
        squares[currentPosition + index].classList.add(color[randomTetromino])
        squares[currentPosition + index].classList.add("taken")
        // ScorePart1++ // remove this when done
    })
    for (let i = 0; i < squares.length; i++) {
        let squares2 = Array.from(document.querySelectorAll(".board div"))

        if (checkId(squares2[i].className)) {
            // removeLine either return false or arr of row num to be removed
            var removeNumber = removeLine(squares2)
            if (removeNumber != false) {
                for (let p = 0; p < removeNumber.length; p++) {
                    // delete every pixel in that row
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
                    howManytimesDle++ // num of deleted rows
                    // console.log()
                }

            } else {
                console.log("NO NEED TO REMOVE")
            }
        }

        if (howManytimesDle != 0) {
            // for each deleted row
            for (let i = 0; i < (howManytimesDle); i++) {
                let squares3 = Array.from(document.querySelectorAll(".board div"))
                console.log("HOWMANY", howManytimesDle, "SQUARES3", squares3)
                // removeNumber[i] is the deleted row number
                // looping the row
                for (let k = 0; k < removeNumber[i]; k++) {
                    let idName = squares3[k].id
                    if (idName.includes("_")) {
                        squares3[k].id = changeDivNames(idName)
                    }
                }
                ScorePart1 += 100
                AddNewLines()
            }
            if (howManytimesDle === 4) {
                ScorePart1 += 400;
            }
            howManytimesDle = 0
        }

    }
}


// remove tetromino from board
let undraw = () => {
    current.forEach(index => {
        squares[currentPosition + index].classList.remove("tetromino")
        squares[currentPosition + index].classList.remove(color[randomTetromino])
    })
}
function removeLine(squares) {
    let arr = []
    for (let i = 0; i < squares.length; i += 10) {
        let checkRmv = true
        // if first square in the row is filled
        if (squares[i].id.slice(-1) == "1" && checkId(squares[i].className)) {
            for (let k = i; k < i + 10; k++) {
                console.log("valueOfK", squares[k])
                console.log(arr.length, "ARR")

                // not removing if any sq in the row is not filled
                if (!checkId(squares[k].className)) {
                    checkRmv = false 
                }
                // if k reached the next line and no prev sq is not filled
                // push the first sq into arr
                if (k === i + 9 && checkRmv === true) {
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
    for (let i = 1; i < 11; i++) {
        const square = document.createElement("div");
        // square.classList.add("board-div");
        square.id = `pixel-3_${i}`;
        square.style.transform = "translateY(-40px)"
        let firstSq = document.getElementById("pixel-4_1")
        console.log(firstSq, "thats the firstsq")
        board.insertBefore(square, firstSq)
    }
}

function checkId(ele) {
    // if filled
    if (ele.includes(color[0]) || ele.includes(color[1]) || ele.includes(color[2]) || ele.includes(color[3]) || ele.includes(color[4]) || ele.includes(color[5]) || ele.includes(color[6])) {
        return true
    }
    return false
}

// move ids down a row
// changing ids of the sqs in the row
function changeDivNames(idName) {
    let idArr = idName.split("_")
    let oldNum = idArr[0].match(/\d+/)
    let intNum = parseInt(oldNum)
    if (intNum != 1 && intNum != 2) { // since first two rows are invisible
        let newId = idArr[0].replace(/[0-9]+/g, intNum + 1);
        let res = newId + "_" + idArr[1]
        return res
    }
    else { return idName }
}