let autoDown = (timestamp) => {
    // enable keydown events
    controls()

    if (!starttime) {
        starttime = timestamp;
    }

    let runtime = timestamp - starttime;

    if (runtime < duration) {
        auto = requestAnimationFrame(autoDown)
        clock.textContent = `${gameTimer.getMin}:${gameTimer.getSec}`;
    } else {
        undraw()
        currentPosition += lineWidth
        //reset values
        starttime = null
        auto = null
        draw()
        request = requestAnimationFrame(repeat)
    }
}

let repeat = () => {
    draw()
    auto = requestAnimationFrame(autoDown)
}