let gameArea = document.querySelector(".gamearea")
let piece = document.querySelector(".piece")


const duration = 10000;
let starttime = null;
let move = gameArea.clientHeight - piece.getBoundingClientRect().height
let x = 0
let rotate = 0


let arrowDown = (timestamp) => {

    move = gameArea.clientHeight - piece.getBoundingClientRect().height

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
                
            }

    }

    const runtime = timestamp - starttime;

    const relativeProgress = runtime / duration;

    console.log(move)

    let amount =  move * (Math.min(relativeProgress, 1));


    piece.style.transform = `translateX(${x}px) translateY(${amount}px) rotate(${rotate}deg)`
  
    if (runtime < duration) {
        requestAnimationFrame(arrowDown);
    } else {
        starttime = null
    }
}