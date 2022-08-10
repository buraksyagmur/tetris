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

let repeat = () => {
    draw()
    // enable keydown events
    controls()
    request = requestAnimationFrame(autoDown)
}