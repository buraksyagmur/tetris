let controls = () => {
    document.onkeydown = (e) => {     
        console.log(e.key)
        if (e.key === "ArrowRight") {   
            undraw()
            const isAtRightEdge = current.some(index => (currentPosition + index) % lineWidth === lineWidth - 1);
            if (!isAtRightEdge) currentPosition += 1
            current.some(index => {
                if (squares[currentPosition + index].classList.contains("taken")) {
                /// if right position is taken
                currentPosition--
                }
            })
            draw() 
        }
        if (e.key === "ArrowLeft") {  
            undraw()
            const isAtLeftEdge = current.some(index => (currentPosition + index) % lineWidth === 0);
            if (!isAtLeftEdge) currentPosition -= 1
            current.some(index => {
                if (squares[currentPosition + index].classList.contains("taken")) {
                /// if left position is taken
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
            // save current to prev and then update current to have new currentRotation
            const prev = current;
            current = current = tetrominos[randomTetromino][currentRotation]
            // if prev position is at the left
            if (prev.some(index => (currentPosition + index) % lineWidth === 0)) {
                // do not rotate if new current has any square on the previous line
                if (current.some(index => (currentPosition + index) % lineWidth === lineWidth-1)) {
                    console.log("cant rotate left wall")
                    current=prev;
                }
            }
            // if prev position is at the right
            if (prev.some(index => (currentPosition + index) % lineWidth === lineWidth-1) || prev.some(index => (currentPosition + index) % lineWidth === lineWidth-2)) {
                // do not rotate if new curent has any square on the next line
                if (current.some(index => (currentPosition + index) % lineWidth === 0)) {
                    console.log("cant rotate right wall")
                    current=prev;
                }
            }
            // check if new position has any taken class
            if (current.some(index => squares[currentPosition + index].classList.contains("taken"))) {
                console.log("cant rotate - taken")
                current=prev;
            }
            draw()       
        }
        if (e.key === "p") {
            handlePause()
        }
        if (e.key === "ArrowDown") { 
            undraw()
            // check if next position has and taken sqaures
            if (current.some(index => (squares[currentPosition + index + lineWidth].classList.contains("taken")))) {
                /// if next position is taken
                console.log("do not move down")
                // do not move to next position
                draw()
            } else {
                // move to next position
                currentPosition += lineWidth
                draw()
            }      
        }
    }
}