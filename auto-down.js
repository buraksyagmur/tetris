let gameArea = document.querySelector(".gamearea")
let piece = document.querySelector(".piece")

piece.style.transform = `translateX(${(gameArea.clientWidth - piece.clientWidth) / 2}px)`

const duration = 10000;
let starttime = null;
let move = gameArea.clientHeight - piece.getBoundingClientRect().height
let x = (gameArea.clientWidth - piece.clientWidth) / 2
let rotate = 0
let amount = 0

let arrowDown = (timestamp) => {

    if (!starttime) {
        starttime = timestamp;
    }
    
    document.onkeydown = (e) => {     
        console.log(e.key)
    
            if (e.key === "ArrowRight") {
                x += 10  
            }

            if (e.key === "ArrowLeft") {
                x -= 10  
            }

            if (e.key === " ") {
                rotate += 90
                /// shifts piece down by half the original height
                move = gameArea.clientHeight - (piece.getBoundingClientRect().height/2) - (piece.getBoundingClientRect().width/2)
            }

    }

    const runtime = timestamp - starttime;

    const relativeProgress = runtime / duration;

    amount =  move * (Math.min(relativeProgress, 1));

    piece.style.transform = `translateX(${x}px) translateY(${amount}px) rotate(${rotate}deg)`
  
    if (runtime < duration) {
        requestAnimationFrame(arrowDown);
    } else {
        starttime = null
    }
}