// const board = document.querySelector(".board")
// let howManytimesDle = 0
// let finishSq = []
// for (let i=0; i< lineWidth*2; i++){
//     finishSq.push(i)
// }
// for (let i = 1; i <= 22; i++) {
//     for (let j = 1; j <= 10; j++) {
//         const square = document.createElement("div");
//         square.classList.add("board-div");
//         square.id = `pixel-${i}_${j}`;
//         // if (i===0 || i === 11) {
//         //     square.classList.add("wall");
//         // }
//         board.appendChild(square);
//     }
// }
// for (let k = 1; k <= 10; k++) {
//     const square = document.createElement("div");
//     square.classList.add("board-div");
//     square.classList.add("taken");
//     square.id = `outside-pixel-${k}+11`;
//     board.appendChild(square);
// }
// let squares = Array.from(document.querySelectorAll(".board div"))
// squares.forEach(element => element.style.willChange = 'transform')

// const nextBoard = document.querySelector(".next")
// for (let i= 1; i< 5; i++){
//     for (let k=1 ; k < 5 ; k++){
//         const nextSq = document.createElement("div")
//         nextSq.classList.add("nextBoard-div")
//         nextSq.id= `next-${i}_${k}`;
//         nextBoard.appendChild(nextSq);
//     }
// }
// let nextBlock = randomBlock()
// let nextSquares= Array.from(document.querySelectorAll(".next div"))
// // move board up two rows
// squares.forEach(element => {
//     element.style.transform = "translateY(-40px)"
//     element.style.willChange = 'auto';
// })
// // make first two rows invisible
// squares.slice(0, 20).forEach(index => {
//     index.classList.add("begin")
//     index.style.opacity = "0"
// })
// let lives = 3
// let currentPosition = 3
// let finish = false
// let score = 0
// let ScorePart1 = 0
// let current = randomBlock()
// let frozen = null
// // draw tetromino onto the board
// let draw = () => {
//     nextBlockDeploy(nextBlock[1])
//     if (current[0].some(index => squares[currentPosition + index + lineWidth].classList.contains("taken"))) {
//         if (finishSq.includes(currentPosition) ) {
//             lives -= 1
//             document.querySelector("#lives").innerHTML = "" + lives
//             if (lives == 0) {
//                 play = false
//                 alert("game over")
//                 handleRestart()
//             }
//         }else {
//         /// if next position is taken
//         if (frozen !== null) {
//             current[0].forEach(index => {
//                 squares[currentPosition + index].classList.add("tetromino")
//                 squares[currentPosition + index].classList.add(color[current[1]])
//             })
//         } else {
//             // delay before freezing tetromino - to allow left/right movement and rotation
//             frozen = setTimeout(() => {
//                 frozen = null
//                 freeze()
//                 cancelAnimationFrame(request)
//                 cancelAnimationFrame(auto)
//                 request = null
//                 auto = null
//                 starttime = null
//                 // create new tetromino
//       // create new tetromino
//       currentPosition = 3
//       current = nextBlock
//       removeNext()
//       nextBlock = randomBlock()
//                 request = requestAnimationFrame(repeat)
//             }, 400)
//         }
//         }
//     } else {
//         // cancel freeze time out if piece can now move to next position
//         clearTimeout(frozen)
//         frozen = null
//         current[0].forEach(index => {
//             squares[currentPosition + index].classList.add("tetromino")
//             // squares[currentPosition + index].style.opacity = "1"
//             squares[currentPosition + index].classList.add(color[current[1]])
//         })
//     }
// }

// /// fix the position of the tetromino
// let freeze = () => {
//     // adding classes to frozen squares
//     current[0].forEach(index => {
//         squares[currentPosition + index].classList.add("tetromino")
//         squares[currentPosition + index].classList.add(color[current[1]])
//         squares[currentPosition + index].classList.add("taken")
//         // ScorePart1++
//     })
//     // check board for complete lines
//     for (let i = 0; i < squares.length; i++) {
//         let squares2 = Array.from(document.querySelectorAll(".board div"))
//         // console.log(squares2)
        
//         if (checkId(squares2[i].className)) {
//             if (removeLine(squares2) != false) {

                
//                 var removeNumber = removeLine(squares2)
//                 for (let p = 0; p < removeNumber.length; p++) {
//                     for (let r = 0; r < 10; r++) {
//                         let delet = document.getElementById(`pixel-${(removeNumber[p] + 10) / 10}_${r + 1}`)
//                         // console.log(`pixel-${(removeNumber[p] + 10) / 10}_${r + 1}`)
//                         // console.log(p, r, delet, "thats the loooop3")
//                         // console.log(squares.length, "------------------length")
//                         // console.log(squares2.length, "------------------length2")
//                         board.removeChild(delet)
//                         // board.removeChild(board.children[removeNumber[0]+r])
//                         // const square = document.createElement("div");
//                         // square.classList.add("board-div");
//                         // square.id = `pixel-new-${-1*(newSqrNmbr-r)}`;
//                         // board.prepend(square)
//                     }
//                     howManytimesDle++
//                     // console.log()
//                 }

//             } else {
//                 // console.log("NO NEED TO REMOVE")
//             }
//         }
//         if (howManytimesDle != 0) {

//             for (let i = 0; i < (howManytimesDle); i++) {
//                 let squares3 = Array.from(document.querySelectorAll(".board div"))
//                 // console.log("HOWMANY", howManytimesDle, "SQUARES3", squares3)
//                 for (let k = 0; k < removeNumber[i]; k++) {
//                     let idName = squares3[k].id
//                     if (idName.includes("_")) {
//                         squares3[k].id = changeDivNames(idName)
//                     }
//                 }
//                 ScorePart1 += 100
//                 AddNewLines()
//             }
//             if (howManytimesDle== 4){
//                 ScorePart1+=400
//             }
//             howManytimesDle = 0
//         }
//         document.querySelector("#score").innerHTML = (ScorePart1)
//     }
//     // update squares after line remove/add
//     squares = Array.from(document.querySelectorAll(".board div"))
// }


// // remove tetromino from board
// let undraw = () => {
//         // removing classes to make squares disappear
//     current[0].forEach(index => {
//         squares[currentPosition + index].classList.remove("tetromino")
//         // squares[currentPosition + index].style.opacity = "0"
//         squares[currentPosition + index].classList.remove(color[current[1]])
//     })
// }
// function removeLine(squares) {
//     let arr = []
//     for (let i = 0; i < squares.length; i += 10) {
//         let checkRmv = true
//         if (squares[i].id.slice(-1) == "1" && checkId(squares[i].className)) {
//             for (let k = i; k < i + 10; k++) {
//                 if (!checkId(squares[k].className)) {
//                     checkRmv = false
//                 }
//                 if (k == i + 9 && checkRmv == true) {

//                     // console.log("have to remove line")
//                     arr.push(i)
//                 }
//             }
//         }
//     }

//     if (arr == "") {

//         return false
//     } else {
//         return arr
//     }
// }
// function AddNewLines() {
//     for (let i = 1; i < 11; i++) {
//         const square = document.createElement("div");
//         square.style.willChange = 'transform';
//         square.classList.add("board-div");
//         square.id = `pixel-3_${i}`;
//         let firstSq = document.getElementById("pixel-4_1")
//         square.style.transform = "translateY(-40px)"
//         board.insertBefore(square, firstSq)
//         square.style.willChange = 'auto';
//     }
// }
// function checkId(ele) {
//     if (ele.includes(color[0]) || ele.includes(color[1]) || ele.includes(color[2]) || ele.includes(color[3]) || ele.includes(color[4]) || ele.includes(color[5]) || ele.includes(color[6])) {
//         return true
//     }
//     return false
// }
// function changeDivNames(idName) {
//     let idArr = idName.split("_")
//     let oldNum = idArr[0].match(/\d+/)
//     let intNum = parseInt(oldNum)
//     if (intNum != 1 && intNum != 2) {
//         let newId = idArr[0].replace(/[0-9]+/g, intNum + 1);
//         let res = newId + "_" + idArr[1]
//         return res
//     }
//     else { return idName }
// }
// function randomBlock(){
//     let randomTetromino = Math.floor(Math.random() * tetrominos.length)
//     let randomRotation = Math.floor(Math.random() * 4)
//     let current = tetrominos[randomTetromino][randomRotation]
//     return [current, randomTetromino, randomRotation]
// }
// function nextBlockDeploy(name){
//     let numbers = []
//     let squares = Array.from(document.querySelectorAll(".next div"))
//     if (color[name] == "lTetromino"){
//         numbers.push(1,5,9,10)
//     }else if (color[name] == "rlTetromino"){
//         numbers.push(1,5,8,9)
//     }else if (color[name] == "iTetromino"){
//         numbers.push(1,5,9,13)
//     }else if (color[name] == "oTetromino"){
//         numbers.push(5,6,9,10)
//     }else if (color[name] == "sTetromino"){
//         numbers.push(5,6,8,9)
//     }else if (color[name] == "tTetromino"){
//         numbers.push(5,8,9,10)
//     }else if(color[name] == "zTetromino"){
//         numbers.push(5,6,10,11)
//     }
//     for (let i=0; i< numbers.length; i++){
//         squares[numbers[i]].classList.add("tetromino") 
//         squares[numbers[i]].classList.add(color[name])
//     }
//     numbers = []
// }
// function removeNext(){
//     for (let i=0 ; i< nextSquares.length;i++){
//         nextSquares[i].classList.remove("tetromino")
//         nextSquares[i].classList.remove(color[current[1]])
//     }
// }