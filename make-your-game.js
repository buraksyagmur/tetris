const startBtn = document.querySelector("#start-button")
const scoreDisplay = document.querySelector("#score")
let request = null
document.addEventListener("DOMContentLoaded", () => {
    //// create pause
    startBtn.addEventListener("click", () => {
        if (request != null) {
           
        } else {
            request = requestAnimationFrame(repeat)
        }
        
    })
    
})

