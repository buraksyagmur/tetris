let play = true

let i = 1
let duration;
let repeat = () => {
    //// create multiple pieces

    duration = 100;
    let starttime = null;
    draw()
    
    let autoDown = (timestamp) => {
    
        if (!starttime) {
            starttime = timestamp;
        }
        
        document.onkeydown = (e) => {     
            console.log(e.key)
        
                if (e.key === "ArrowRight") {
                    // make into function?
                    // if ()
                    undraw()
                    currentPosition += 1
                    current.some(index => {
                        if (squares[currentPosition + index].classList.contains("taken")) {
                        /// if right position is taken
                        currentPosition--
                        }
                    })
                    draw() 
                }
    
                if (e.key === "ArrowLeft") {
                    // make into function?
                    undraw()
                    currentPosition -= 1
                    current.some(index => {
                        if (squares[currentPosition + index].classList.contains("taken")) {
                        /// if right position is taken
                        currentPosition++
                        }
                    })
                    draw()
                }
    
                if (e.key === " ") {
                    undraw()
                    // update current
                    currentRotation++
                    if (currentRotation === 4) {
                        currentRotation = 0
                    }
                    current = current = tetrominos[randomTetromino][currentRotation]
                    draw()       
                }
                if (e.key === "ArrowDown") {
                    undraw()
                    // change duration
                    draw()
                }
        }
    
        let runtime = timestamp - starttime;

      
        if (runtime < duration) {
            requestAnimationFrame(autoDown);
        } else {
            i++
            undraw()
            currentPosition += lineWidth
            draw()
            
            requestAnimationFrame(repeat)
        }
    }

    requestAnimationFrame(autoDown)


}

    

