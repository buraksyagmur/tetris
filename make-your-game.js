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

let handleStart = () => {
    // do not execute repeat if request is not null 
    if (request === null) {
        // remove pause menu using opacity to avoid repaint
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
    }  
}

let handlePause = () => {
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
}

let handleRestart = () => {
    let resSquares = Array.from(document.querySelectorAll(".board div"))
    ScorePart1 = 0
    document.querySelector("#score").innerHTML = (ScorePart1)
    lives = 3
    cancelAnimationFrame(request)
    cancelAnimationFrame(auto)
    request = null
    auto = null
    starttime = null
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
    randomTetromino = Math.floor(Math.random()*tetrominos.length)
    randomRotation = Math.floor(Math.random()*4)
    current = tetrominos[randomTetromino][randomRotation]
    request = requestAnimationFrame(repeat)
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

cBtn.addEventListener("click", handleStart)
rBtn.addEventListener("click", handleRestart)