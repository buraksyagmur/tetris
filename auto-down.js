let gameArea = document.querySelector(".gamearea")

let play = true

let i = 1
 
let repeat = () => {
    //// create multiple pieces
    let piece = gameArea.insertAdjacentElement("afterbegin", document.createElement("div"))
    
    piece.innerHTML = `
        
        <div class="box"></div>
        <div class="box"></div>
        <div class="box"></div>
        <div class="box"></div>
       
    `

    piece.classList.add("piece")

    piece.id = `${i}`
    
    piece.style.transform = `translateX(80px)`

    const duration = 10000;
    let starttime = null;
    let move = gameArea.clientHeight - piece.getBoundingClientRect().height
    let x = 80
    let rotate = 0
    let amount = 0
    
    let arrowDown = (timestamp) => {
    
        if (!starttime) {
            starttime = timestamp;
        }
        
        document.onkeydown = (e) => {     
            console.log(e.key)
        
                if (e.key === "ArrowRight") {
                    x += 20  
                }
    
                if (e.key === "ArrowLeft") {
                    x -= 20 
                }
    
                if (e.key === " ") {
                    rotate += 90
                    /// shifts piece down by half the original height
                    move = gameArea.clientHeight - (piece.getBoundingClientRect().height/2) - (piece.getBoundingClientRect().width/2)
    
                    /// take into account multiple rotations - deal with 90/180/270/360
                }
    
        }
    
        const runtime = timestamp - starttime;
    
        const relativeProgress = runtime / duration;
    
        amount =  move * (Math.min(relativeProgress, 1));
    
        piece.style.transform = `translateX(${x}px) translateY(${amount}px) rotate(${rotate}deg)`
      
        if (runtime < duration) {
            requestAnimationFrame(arrowDown);
        } else {
            i++
            requestAnimationFrame(repeat)
        }
    }

    requestAnimationFrame(arrowDown)


}

    

