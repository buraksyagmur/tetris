// currentRotation= current[2]
// let controls = () => {
    
//     document.onkeydown = throttle((e) => { 
            
//         // console.log(e.key)
//         if (e.key === "ArrowRight") {   
//             undraw()
//             const isAtRightEdge = current[0].some(index => (currentPosition + index) % lineWidth === lineWidth - 1);
//             if (!isAtRightEdge) currentPosition += 1
//             current[0].some(index => {
//                 if (squares[currentPosition + index].classList.contains("taken")) {
//                 /// if right position is taken
//                 currentPosition--
//                 }
//             })
//             draw() 
//         }
//         if (e.key === "ArrowLeft") {  
//             undraw()
//             const isAtLeftEdge = current[0].some(index => (currentPosition + index) % lineWidth === 0);
//             if (!isAtLeftEdge) currentPosition -= 1
//             current[0].some(index => {
//                 if (squares[currentPosition + index].classList.contains("taken")) {
//                 /// if left position is taken
//                 currentPosition++
//                 }
//             })
//             draw()
//         }
//         if (e.key === " ") {
//             undraw()
//             // update current[0]
//             currentRotation++
            
//             if (currentRotation === 4) {
//                 currentRotation = 0
//             }
//             // save current[0] to prev and then update current[0] to have new currentRotation
//             const prev = current[0];
//             current[0] = current[0] = tetrominos[current[1]][currentRotation]
//             // if prev position is at the left
//             if (prev.some(index => (currentPosition + index) % lineWidth === 0)) {
//                 // do not rotate if new current[0] has any square on the previous line
//                 if (current[0].some(index => (currentPosition + index) % lineWidth === lineWidth-1)) {
//                     // console.log("cant rotate left wall")
//                     current[0]=prev;
//                 }
//             }
//             // if prev position is at the right
//             if (prev.some(index => (currentPosition + index) % lineWidth === lineWidth-1) || prev.some(index => (currentPosition + index) % lineWidth === lineWidth-2)) {
//                 // do not rotate if new curent has any square on the next line
//                 if (current[0].some(index => (currentPosition + index) % lineWidth === 0)) {
//                     // console.log("cant rotate right wall")
//                     current[0]=prev;
//                 }
//             }
//             // check if new position has any taken class
//             if (current[0].some(index => squares[currentPosition + index].classList.contains("taken"))) {
//                 // console.log("cant rotate - taken")
//                 current[0]=prev;
//             }
//             draw()       
//         }
//         if (e.key === "p") {
//             handlePause()
//         }
//         if (e.key === "ArrowDown") { 
            
//             // check if next position has and taken sqaures
//             if (current[0].some(index => (squares[currentPosition + index + lineWidth].classList.contains("taken")))) {
//                 /// if next position is taken
//                 // console.log("do not move down")
//                 // do not move to next position
//                 // draw()
//             } else {
//                 // move to next position
//                 undraw()
//                 currentPosition += lineWidth
//                 draw()
//             }      
//         }
//     }, 200);
// }