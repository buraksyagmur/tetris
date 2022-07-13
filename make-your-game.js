let start = document.querySelector("#start-button")
let request = null
document.addEventListener("DOMContentLoaded", () => {
    //// create pause
    start.addEventListener("click", () => {
        if (request != null) {
           
        } else {
            request = requestAnimationFrame(repeat)
        }
        
    })
    
})

