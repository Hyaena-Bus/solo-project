const bestMove = require("qm-tictactoe-minimax").bestMove


const calcMove = (state)=>{
    const arr = state[0].concat(state[1].concat(state[2]))
    // console.log(arr)
    for (let i = 0;  i < arr.length; i++) {
        if(arr[i] === "○"){
            arr.splice(i,1,"O");
        }
        if(arr[i] === "×"){
            arr.splice(i,1,"X");
        }
    }
    // console.log(arr)
    const num = bestMove(arr,"X")
    return [Math.floor(num/3),num%3]
}
// console.log(calcMove([["○","",""],["","○","×"],["","",""]]))

module.exports = calcMove