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
squares.slice(0, 20).forEach(index => {
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

let frozen = null
// draw tetromino onto the board
let draw = () => {
    document.querySelector("#score").innerHTML = (ScorePart1)
    if (current.some(index => squares[currentPosition + index + lineWidth].classList.contains("taken"))) {
        if (currentPosition == 3) {
            lives -= 1
            document.querySelector("#lives").innerHTML = "" + lives
            if (lives == 0) {
                play = false
                alert("game over")
                handleRestart()
            }
        }else {
            /// if next position is taken
            if (frozen !== null) {
                current.forEach(index => {
                    squares[currentPosition + index].classList.add("tetromino")
                    squares[currentPosition + index].classList.add(color[randomTetromino])
                })
            } else {
                frozen = setTimeout(() => {
                    frozen = null
                    freeze()
                    cancelAnimationFrame(request)
                    cancelAnimationFrame(auto)
                    request = null
                    auto = null
                    starttime = null
                    // create new tetromino
                    currentPosition = 3
                    randomTetromino = Math.floor(Math.random() * tetrominos.length)
                    randomRotation = Math.floor(Math.random() * 4)
                    current = tetrominos[randomTetromino][randomRotation]

                    request = requestAnimationFrame(repeat)
                }, 1000)
            }
        }
    } else {
        clearTimeout(frozen)
        frozen = null
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
        ScorePart1++
    })
    // for (let i = 0; i < squares.length; i++) {
    //     let squares2 = Array.from(document.querySelectorAll(".board div"))
    //     // console.log(squares2)

    //     if (checkId(squares2[i].className)) {
    //         if (removeLine(squares2) != false) {

    //             var removeNumber = removeLine(squares2)

    //             for (let p = 0; p < removeNumber.length; p++) {
    //                 for (let r = 0; r < 10; r++) {
    //                     let delet = document.getElementById(`pixel-${(removeNumber[p] + 10) / 10}_${r + 1}`)
    //                     console.log(`pixel-${(removeNumber[p] + 10) / 10}_${r + 1}`)
    //                     console.log(p, r, delet, "thats the loooop3")
    //                     console.log(squares.length, "------------------length")
    //                     console.log(squares2.length, "------------------length2")
    //                     board.removeChild(delet)
    //                     // board.removeChild(board.children[removeNumber[0]+r])
    //                     // const square = document.createElement("div");
    //                     // square.classList.add("board-div");
    //                     // square.id = `pixel-new-${-1*(newSqrNmbr-r)}`;
    //                     // board.prepend(square)
    //                 }
    //                 howManytimesDle++
    //                 // console.log()
    //             }

    //         } else {
    //             console.log("NO NEED TO REMOVE")
    //         }
    //     }
    //     if (howManytimesDle != 0) {
    //         for (let i = 0; i < (howManytimesDle); i++) {
    //             let squares3 = Array.from(document.querySelectorAll(".board div"))
    //             console.log("HOWMANY", howManytimesDle, "SQUARES3", squares3)
    //             for (let k = 0; k < removeNumber[i]; k++) {
    //                 let idName = squares3[k].id
    //                 if (idName.includes("_")) {
    //                     squares3[k].id = changeDivNames(idName)
    //                 }
    //             }
    //             ScorePart1 += 100
    //             AddNewLines()
    //         }
    //         howManytimesDle = 0
    //     }

    // }
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
        if (squares[i].id.slice(-1) == "1" && checkId(squares[i].className)) {
            for (let k = i; k < i + 10; k++) {
                console.log("valueOfK", squares[k])
                console.log(arr.length, "ARR")
                if (!checkId(squares[k].className)) {
                    checkRmv = false
                }
                if (k == i + 9 && checkRmv == true) {

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
        square.classList.add("board-div");
        square.id = `pixel-3_${i}`;
        square.style.transform = "translateY(-40px)"
        let firstSq = document.getElementById("pixel-4_1")
        console.log(firstSq, "thats the firstsq")
        board.insertBefore(square, firstSq)
    }
}
function checkId(ele) {
    if (ele.includes(color[0]) || ele.includes(color[1]) || ele.includes(color[2]) || ele.includes(color[3]) || ele.includes(color[4]) || ele.includes(color[5]) || ele.includes(color[6])) {
        return true
    }
    return false
}
function changeDivNames(idName) {
    let idArr = idName.split("_")
    let oldNum = idArr[0].match(/\d+/)
    let intNum = parseInt(oldNum)
    if (intNum != 1 && intNum != 2) {
        let newId = idArr[0].replace(/[0-9]+/g, intNum + 1);
        let res = newId + "_" + idArr[1]
        return res
    }
    else { return idName }
}