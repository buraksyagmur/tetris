let controls = () => {
    document.onkeydown = (e) => {     
        console.log(e.key)
        if (e.key === "ArrowRight") {   
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
            undraw()
            currentPosition--
            current.some(index => {
                if (squares[currentPosition + index].classList.contains("taken")) {
                /// if right position is taken
                currentPosition++
                }
            })
            draw()
        }
        if (e.key === " ") {
            // do not allow default scrolling -- triggers pause menu
            e.preventDefault()
            undraw()
            // update current
            randomRotation++
            if (randomRotation === 4) {
                randomRotation = 0
            }
            current = tetrominos[randomTetromino][randomRotation]
            draw()       
        }    
        if (e.key === "p") {
            handlePause()
        }
        if (e.key === "k") {
            undraw()
            currentPosition += 10
            current.some(index => {
                if (squares[currentPosition + index].classList.contains("taken")) {
                /// if right position is taken
                currentPosition++
                }
            })
            draw()
        }
    }
}