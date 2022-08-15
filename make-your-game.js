// make-your-game.js

const startBtn = document.querySelector("#start-button")
const scoreDisplay = document.querySelector("#score")
const pMenu = document.getElementById("pauseMenu")
const cBtn = document.getElementById("continue")
const rBtn = document.getElementById("restart")
// const board = document.querySelector(".board")
const info = document.querySelector(".info")
const pauseInfo = document.querySelector(".pauseInfo")
let rect = board.getBoundingClientRect()
// position pause menu above board
let boardStyle = getComputedStyle(board)
let boardMarginLeft = parseFloat(boardStyle['marginLeft'])
let rect1 = pMenu.getBoundingClientRect()
let boardTop = rect.y-rect1.y
pMenu.style.transform = "translate("+boardMarginLeft+"px, " + boardTop +"px)"
let request = null
let auto = null
let starttime = null
let duration = 1000
let gameTimer;
let paused = false;

const handleStart = () => {
    // remove click event
    cBtn.removeEventListener("click", handleStart)
    rBtn.removeEventListener("click", handleRestart)
    // do not execute repeat if request is not null 
    if (request === null) {
        // remove pause menu using opacity to avoid repaint
        paused = false
        pMenu.style.opacity = "0"
        board.style.opacity = "1"
        info.style.opacity = "0"
        pauseInfo.style.opacity = "1"
        // move div up by previous div
        let height = info.clientHeight
        let infoStyle = getComputedStyle(info)
        let margin = parseFloat(infoStyle['marginBottom'])
        height += margin
        pauseInfo.style.transform = "translateY(-" + height + "px)"
        //continue
        request = requestAnimationFrame(repeat)
        if (!gameTimer) {
            gameTimer = new timer(Date.now());
            gameTimer.startTimer();
        } else {
            gameTimer.continueTimer();
        }
    }  
}

const handlePause = () => {
    paused = true
    // create function?
    cancelAnimationFrame(request)
    cancelAnimationFrame(auto)
    request = null
    auto = null
    starttime = null
    // do not allow left right movement when paused
    document.onkeydown = null
    // show pause menu using opacity to avoid repaint and add class
    pMenu.style.opacity = "1"
    info.style.opacity = "1"
    pauseInfo.style.opacity = "0"
    
    // fade board
    board.style.opacity = "0.25"
    if (gameTimer) gameTimer.pauseTimer()
    // add click events
    cBtn.addEventListener("click", handleStart)
    rBtn.addEventListener("click", handleRestart)

}
const handleRestart = () => {
    //remove click event
    cBtn.removeEventListener("click", handleStart)
    rBtn.removeEventListener("click", handleRestart)
    let resSquares = Array.from(document.querySelectorAll(".board div"))
    lives--
    if (lives === 0) {
        ScorePart1 = 0
        document.querySelector("#score").innerHTML = (ScorePart1)
        lives = 3
        document.querySelector("#lives").innerHTML = "" + lives
        // clear board
        resSquares.slice(0,220).forEach(index => {
            index.classList.remove("taken")
            index.classList.remove("tetromino")
            color.forEach(c=> index.classList.remove(c))
        })
        // reset values for new tetromino
        // used more than once -- create function?
        request = null
        auto = null
        starttime = null
        gameTimer = null
        gameTimer = new timer(Date.now()) // coz handleStart will check !gameTimer
        paused = false
        currentPosition = 3
        current= randomBlock()
        handlePause()
        return
    }
    document.querySelector("#lives").innerHTML = "" + lives
    cancelAnimationFrame(request)
    cancelAnimationFrame(auto)
    request = null
    auto = null
    starttime = null
    gameTimer = null
    gameTimer = new timer(Date.now()) // coz handleStart will check !gameTimer
    // remove pause menu and show board
    pMenu.style.opacity = "0"
    board.style.opacity = "1"
    // clear board - last row needs to have class taken
    resSquares.slice(0,220).forEach(index => {
        index.classList.remove("taken")
        index.classList.remove("tetromino")
        color.forEach(c=> index.classList.remove(c))
    })
    // reset values for new tetromino
    // used more than once -- create function?
    currentPosition = 3
    current = randomBlock()
    request = requestAnimationFrame(repeat)
    paused = false
}

document.addEventListener("keydown", (e) => {
    if (e.key === "s") {
        handleStart()
    }
    if (e.key === "r") {
        handleRestart()
    }
    if (e.key === "p") {
        handlePause()
    } 
})

// auto-down.js

let autoDown = (timestamp) => {
    

    if (!starttime) {
        starttime = timestamp;
    }

    let runtime = timestamp - starttime;

    if (runtime < duration) {
        request = requestAnimationFrame(autoDown)
    } else {
        undraw()
        if (current[0].some(index => (squares[currentPosition + index + lineWidth].classList.contains("taken")))) {
            /// if next position is taken
            // console.log("do not move down")
            draw()
        } else {
            
            currentPosition += lineWidth
            draw()
            //reset values
            starttime = null
            auto = null 
            clock.textContent = `${gameTimer.getTime()}`;
            request = requestAnimationFrame(repeat)
        }     
    }
}

const repeat = () => {
    draw()
    // enable keydown events
    controls()
    request = requestAnimationFrame(autoDown)
}

// board.js

const board = document.querySelector(".board")
let howManytimesDle = 0
let finishSq = []
for (let i=0; i< lineWidth*2; i++){
    finishSq.push(i)
}
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
squares.forEach(element => element.style.willChange = 'transform')

const nextBoard = document.querySelector(".next")
for (let i= 1; i< 5; i++){
    for (let k=1 ; k < 5 ; k++){
        const nextSq = document.createElement("div")
        nextSq.classList.add("nextBoard-div")
        nextSq.id= `next-${i}_${k}`;
        nextBoard.appendChild(nextSq);
    }
}
let nextBlock = randomBlock()
let nextSquares= Array.from(document.querySelectorAll(".next div"))
// move board up two rows
squares.forEach(element => {
    element.style.transform = "translateY(-40px)"
    element.style.willChange = 'auto';
})
// make first two rows invisible
squares.slice(0, 20).forEach(index => {
    index.classList.add("begin")
    index.style.opacity = "0"
})
let lives = 3
let currentPosition = 3
let finish = false
let score = 0
let ScorePart1 = 0
let current = randomBlock()
let frozen = null
// draw tetromino onto the board
let draw = () => {
    nextBlockDeploy(nextBlock[1])
    if (current[0].some(index => squares[currentPosition + index + lineWidth].classList.contains("taken"))) {
        if (finishSq.includes(currentPosition) ) {
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
            current[0].forEach(index => {
                squares[currentPosition + index].classList.add("tetromino")
                squares[currentPosition + index].classList.add(color[current[1]])
            })
        } else {
            // delay before freezing tetromino - to allow left/right movement and rotation
            frozen = setTimeout(() => {
                frozen = null
                freeze()
                cancelAnimationFrame(request)
                cancelAnimationFrame(auto)
                request = null
                auto = null
                starttime = null
                // create new tetromino
      // create new tetromino
      currentPosition = 3
      current = nextBlock
      removeNext()
      nextBlock = randomBlock()
                request = requestAnimationFrame(repeat)
            }, 400)
        }
        }
    } else {
        // cancel freeze time out if piece can now move to next position
        clearTimeout(frozen)
        frozen = null
        current[0].forEach(index => {
            squares[currentPosition + index].classList.add("tetromino")
            // squares[currentPosition + index].style.opacity = "1"
            squares[currentPosition + index].classList.add(color[current[1]])
        })
    }
}

/// fix the position of the tetromino
let freeze = () => {
    // adding classes to frozen squares
    current[0].forEach(index => {
        squares[currentPosition + index].classList.add("tetromino")
        squares[currentPosition + index].classList.add(color[current[1]])
        squares[currentPosition + index].classList.add("taken")
        // ScorePart1++
    })
    // check board for complete lines
    for (let i = 0; i < squares.length; i++) {
        let squares2 = Array.from(document.querySelectorAll(".board div"))
        // console.log(squares2)
        
        if (checkId(squares2[i].className)) {
            if (removeLine(squares2) != false) {

                
                var removeNumber = removeLine(squares2)
                for (let p = 0; p < removeNumber.length; p++) {
                    for (let r = 0; r < 10; r++) {
                        let delet = document.getElementById(`pixel-${(removeNumber[p] + 10) / 10}_${r + 1}`)
                        // console.log(`pixel-${(removeNumber[p] + 10) / 10}_${r + 1}`)
                        // console.log(p, r, delet, "thats the loooop3")
                        // console.log(squares.length, "------------------length")
                        // console.log(squares2.length, "------------------length2")
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

            } else {
                // console.log("NO NEED TO REMOVE")
            }
        }
        if (howManytimesDle != 0) {

            for (let i = 0; i < (howManytimesDle); i++) {
                let squares3 = Array.from(document.querySelectorAll(".board div"))
                // console.log("HOWMANY", howManytimesDle, "SQUARES3", squares3)
                for (let k = 0; k < removeNumber[i]; k++) {
                    let idName = squares3[k].id
                    if (idName.includes("_")) {
                        squares3[k].id = changeDivNames(idName)
                    }
                }
                ScorePart1 += 100
                AddNewLines()
            }
            if (howManytimesDle== 4){
                ScorePart1+=400
            }
            howManytimesDle = 0
        }
        document.querySelector("#score").innerHTML = (ScorePart1)
    }
    // update squares after line remove/add
    squares = Array.from(document.querySelectorAll(".board div"))
}


// remove tetromino from board
let undraw = () => {
        // removing classes to make squares disappear
    current[0].forEach(index => {
        squares[currentPosition + index].classList.remove("tetromino")
        // squares[currentPosition + index].style.opacity = "0"
        squares[currentPosition + index].classList.remove(color[current[1]])
    })
}
function removeLine(squares) {
    let arr = []
    for (let i = 0; i < squares.length; i += 10) {
        let checkRmv = true
        if (squares[i].id.slice(-1) == "1" && checkId(squares[i].className)) {
            for (let k = i; k < i + 10; k++) {
                if (!checkId(squares[k].className)) {
                    checkRmv = false
                }
                if (k == i + 9 && checkRmv == true) {

                    // console.log("have to remove line")
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
        square.style.willChange = 'transform';
        square.classList.add("board-div");
        square.id = `pixel-3_${i}`;
        let firstSq = document.getElementById("pixel-4_1")
        square.style.transform = "translateY(-40px)"
        board.insertBefore(square, firstSq)
        square.style.willChange = 'auto';
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
function randomBlock(){
    let randomTetromino = Math.floor(Math.random() * tetrominos.length)
    let randomRotation = Math.floor(Math.random() * 4)
    let current = tetrominos[randomTetromino][randomRotation]
    return [current, randomTetromino, randomRotation]
}
function nextBlockDeploy(name){
    let numbers = []
    let squares = Array.from(document.querySelectorAll(".next div"))
    if (color[name] == "lTetromino"){
        numbers.push(1,5,9,10)
    }else if (color[name] == "rlTetromino"){
        numbers.push(1,5,8,9)
    }else if (color[name] == "iTetromino"){
        numbers.push(1,5,9,13)
    }else if (color[name] == "oTetromino"){
        numbers.push(5,6,9,10)
    }else if (color[name] == "sTetromino"){
        numbers.push(5,6,8,9)
    }else if (color[name] == "tTetromino"){
        numbers.push(5,8,9,10)
    }else if(color[name] == "zTetromino"){
        numbers.push(5,6,10,11)
    }
    for (let i=0; i< numbers.length; i++){
        squares[numbers[i]].classList.add("tetromino") 
        squares[numbers[i]].classList.add(color[name])
    }
    numbers = []
}
function removeNext(){
    for (let i=0 ; i< nextSquares.length;i++){
        nextSquares[i].classList.remove("tetromino")
        nextSquares[i].classList.remove(color[current[1]])
    }
}

// controls.js

currentRotation= current[2]
let controls = () => {
    
    document.onkeydown = throttle((e) => { 
            
        // console.log(e.key)
        if (e.key === "ArrowRight") {   
            undraw()
            const isAtRightEdge = current[0].some(index => (currentPosition + index) % lineWidth === lineWidth - 1);
            if (!isAtRightEdge) currentPosition += 1
            current[0].some(index => {
                if (squares[currentPosition + index].classList.contains("taken")) {
                /// if right position is taken
                currentPosition--
                }
            })
            draw() 
        }
        if (e.key === "ArrowLeft") {  
            undraw()
            const isAtLeftEdge = current[0].some(index => (currentPosition + index) % lineWidth === 0);
            if (!isAtLeftEdge) currentPosition -= 1
            current[0].some(index => {
                if (squares[currentPosition + index].classList.contains("taken")) {
                /// if left position is taken
                currentPosition++
                }
            })
            draw()
        }
        if (e.key === " ") {
            undraw()
            // update current[0]
            currentRotation++
            
            if (currentRotation === 4) {
                currentRotation = 0
            }
            // save current[0] to prev and then update current[0] to have new currentRotation
            const prev = current[0];
            current[0] = current[0] = tetrominos[current[1]][currentRotation]
            // if prev position is at the left
            if (prev.some(index => (currentPosition + index) % lineWidth === 0)) {
                // do not rotate if new current[0] has any square on the previous line
                if (current[0].some(index => (currentPosition + index) % lineWidth === lineWidth-1)) {
                    // console.log("cant rotate left wall")
                    current[0]=prev;
                }
            }
            // if prev position is at the right
            if (prev.some(index => (currentPosition + index) % lineWidth === lineWidth-1) || prev.some(index => (currentPosition + index) % lineWidth === lineWidth-2)) {
                // do not rotate if new curent has any square on the next line
                if (current[0].some(index => (currentPosition + index) % lineWidth === 0)) {
                    // console.log("cant rotate right wall")
                    current[0]=prev;
                }
            }
            // check if new position has any taken class
            if (current[0].some(index => squares[currentPosition + index].classList.contains("taken"))) {
                // console.log("cant rotate - taken")
                current[0]=prev;
            }
            draw()       
        }
        if (e.key === "p") {
            handlePause()
        }
        if (e.key === "ArrowDown") { 
            
            // check if next position has and taken sqaures
            if (current[0].some(index => (squares[currentPosition + index + lineWidth].classList.contains("taken")))) {
                /// if next position is taken
                // console.log("do not move down")
                // do not move to next position
                // draw()
            } else {
                // move to next position
                undraw()
                currentPosition += lineWidth
                draw()
            }      
        }
    }, 200);
}

// tetrominoes.js

// number of squares per line of the board
const lineWidth = 10

// array of tetromino positions
const lTetromino = [
    [1, lineWidth+1, lineWidth*2+1, lineWidth*2+2],
    [lineWidth, lineWidth+1, lineWidth+2, lineWidth*2],
    [0, 1, lineWidth+1, lineWidth*2+1],
    [2, lineWidth, lineWidth+1, lineWidth+2]
]

const rlTetromino = [
    [1, lineWidth+1, lineWidth*2+1, lineWidth*2],
    [0, lineWidth, lineWidth+1, lineWidth+2],
    [1, 2, lineWidth+1, lineWidth*2+1],
    [lineWidth, lineWidth+1, lineWidth+2, lineWidth*2+2]
]
const iTetromino = [
    [1, lineWidth+1, lineWidth*2+1, lineWidth*3+1],
    [lineWidth, lineWidth+1, lineWidth+2, lineWidth+3],
    [1, lineWidth+1, lineWidth*2+1, lineWidth*3+1],
    [lineWidth, lineWidth+1, lineWidth+2, lineWidth+3]
]
const oTetromino = [
    [0, 1, lineWidth, lineWidth+1],
    [0, 1, lineWidth, lineWidth+1],
    [0, 1, lineWidth, lineWidth+1],
    [0, 1, lineWidth, lineWidth+1]
]
const sTetromino = [
    [lineWidth+1, lineWidth+2, lineWidth*2, lineWidth*2+1],
    [0, lineWidth, lineWidth+1, lineWidth*2+1],
    [lineWidth+1, lineWidth+2, lineWidth*2, lineWidth*2+1],
    [0, lineWidth, lineWidth+1, lineWidth*2+1]
]
const tTetromino = [
    [1, lineWidth, lineWidth+1, lineWidth+2],
    [1, lineWidth+1, lineWidth+2, lineWidth*2+1],
    [lineWidth, lineWidth+1, lineWidth+2, lineWidth*2+1],
    [1, lineWidth, lineWidth+1, lineWidth*2+1]
]
const zTetromino = [
    [lineWidth, lineWidth+1, lineWidth*2+1, lineWidth*2+2],
    [1, lineWidth, lineWidth+1, lineWidth*2],
    [lineWidth, lineWidth+1, lineWidth*2+1, lineWidth*2+2],
    [1, lineWidth, lineWidth+1, lineWidth*2]
]

const tetrominos = [
    lTetromino,
    rlTetromino,
    iTetromino,
    oTetromino,
    sTetromino,
    tTetromino,
    zTetromino
]

const color = [
    "lTetromino",
    "rlTetromino",
    "iTetromino",
    "oTetromino",
    "sTetromino",
    "tTetromino",
    "zTetromino"
]

// timer.js

class timer {
    constructor(gameStartTime) {
        this.gameStartTime = gameStartTime;
        this._pauseTime = 0;
        this._continueTime = 0;
        this._prevPauseDurs = [];
        this._playTime = 0;
        this._pauseDur = 0;
    }

    getTime() {
        // console.log("pause duration be4", this.pauseDur);
        const totalPrevPauseDur = this._prevPauseDurs.reduce((prev, cur) => prev+cur, 0);
        // console.log("total pd", totalPrevPauseDur);
        if (this._pauseTime && this._continueTime) {
            this._pauseDur = this._continueTime - this._pauseTime;
            // console.log("pause duration after", this.pauseDur);
            this._playTime = Date.now() - this.gameStartTime - this._pauseDur - totalPrevPauseDur;
            this._prevPauseDurs.push(this._pauseDur); 
            this._pauseTime = 0;
            this._continueTime = 0;
        } else {
            this._playTime = Date.now() - this.gameStartTime - totalPrevPauseDur;
        }
        const min = Math.floor((this._playTime/60/1000)%60).toString().padStart(2, "0");
        const sec = Math.floor((this._playTime/1000)%60).toString().padStart(2, "0");
        return `${min}:${sec}`;
    }

    startTimer() {
        const playTime = Date.now() - this.gameStartTime;
        // const min = Math.floor((playTime/60/1000)%60).toString().padStart(2, "0");
        // const sec = Math.floor((playTime/1000)%60).toString().padStart(2, "0");
        // console.log("start", `${min}:${sec}` );
    }
    pauseTimer() {
        // the condition is to prevent recording new pauseTime when it's already paused
        if (!this._pauseTime) this._pauseTime = Date.now();
        // const min = Math.floor((this._pauseTime/60/1000)%60).toString().padStart(2, "0");
        // const sec = Math.floor((this._pauseTime/1000)%60).toString().padStart(2, "0");
        // console.log("pause", `${min}:${sec}` );
    }
    continueTimer() {
        if (!this._continueTime) this._continueTime = Date.now();
        // const min = Math.floor((this._continueTime/60/1000)%60).toString().padStart(2, "0");
        // const sec = Math.floor((this._continueTime/1000)%60).toString().padStart(2, "0");
        // console.log("con", `${min}:${sec}`);
    }
}



