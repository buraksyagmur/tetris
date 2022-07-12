document.onkeydown = (e) => {     
    console.log(e.key)

        if (e.key === "ArrowDown" || e.key === " ") { 
          
            requestAnimationFrame(arrowDown)

        }

}
