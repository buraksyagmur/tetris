let currentRotation = current[2]
let controls = () => {
    document.onkeydown = (e) => {     
        console.log(e.key)
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
                /// if right position is taken
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
            const prev = current[0];
            current[0] = current[0] = tetrominos[current[1]][currentRotation]
            if (prev.some(index => (currentPosition + index) % lineWidth === 0)) {
                if (current[0].some(index => (currentPosition + index) % lineWidth === lineWidth-1)) {
                    console.log("cant rotate left wall")
                    current[0]=prev;
                }
            }
            if (prev.some(index => (currentPosition + index) % lineWidth === lineWidth-1) || prev.some(index => (currentPosition + index) % lineWidth === lineWidth-2)) {
                if (current[0].some(index => (currentPosition + index) % lineWidth === 0)) {
                    console.log("cant rotate right wall")
                    current[0]=prev;
                }
            }
            draw()       
        }
        if (e.key === "p") {
            handlePause()
        }
        if (e.key === "ArrowDown") {
            undraw()
            currentPosition += 10
            current[0].some(index => {
                if (squares[currentPosition + index].classList.contains("taken")) {
                /// if right position is taken
                currentPosition++
                }
            })
            draw()
        }
    }
}