



let result = []



const winChecker = (state)=>{
return rowChecker(state) || columnChecker(state) || diagonalChecker(state) 
}

const rowChecker = (state)=>{
return (state[0][0] !== "" && state[0][0]===state[0][1] && state[0][1]===state[0][2]) 
        || (state[1][0] !== "" && state[1][0]===state[1][1] && state[1][1]===state[1][2])
        || (state[2][0] !== "" && state[2][0]===state[2][1] && state[2][1]===state[2][2])
}

const columnChecker = (state)=>{
return (state[0][0] !== "" && state[0][0]===state[1][0] && state[1][0]===state[2][0])
        || (state[0][1] !== "" && state[0][1]===state[1][1] && state[1][1]===state[2][1])
        || ((state[0][2] !== "" && state[0][2]===state[1][2] && state[1][2]===state[2][2]))
}

const diagonalChecker = (state)=>{
return (state[0][0] !== "" && state[0][0]===state[1][1] && state[1][1]===state[2][2])
        || (state[0][2] !== "" && state[0][2]===state[1][1] && state[1][1]===state[2][0])
}

    
const evaluation = (transition)=>{
    if(winChecker(transition.state) && transition.playerId) return -10
    if(winChecker(transition.state) && !transition.playerId) return 10
    return 0
}

const alphabeta = (transition, depth, α, β)=>{
    // if node が終端ノード or depth = 0
    console.log(transition)
    if(winChecker(transition.state) || (!transition.state[0].includes("") && !transition.state[1].includes("") && !transition.state[2].includes("")) || !depth){
        // return node の評価値
        console.log("hyoukati",evaluation(transition))
        return evaluation(transition)
    }
    // if node が自分のノード
    if(transition.playerId){
        console.log("me")
        // foreach child of node
        for(let i=0 ;i<3 ;i++){
            for(let j=0 ;j<3 ;j++){
                if(transition.state[i][j]===""){
                    // α = max(α, alphabeta(child, depth-1, α, β))
                    transition.state[i][j]="×"
                    transition.playerId = false
                    res=alphabeta(transition, depth-1, α, β)
                    transition.state[i][j]="×"
                    transition.playerId = false
                    if(α<res){
                        result.push([i,j])
                        console.log("push!")
                        α = res
                    }
                    // α = Math.max(α, alphabeta(transition.state, depth-1, α, β))
                    // if α ≥ β
                        // break // βカット
                    if(α>=β) break
                }
            }
        }
        return α

    }
        
    // else node が対戦者のノード
    if(!transition.playerId){
        console.log("enemy")
        // foreach child of node
        for(let i=0 ;i<3 ;i++){
            for(let j=0 ;j<3 ;j++){
                if(transition.state[i][j]===""){
                    // α = max(α, alphabeta(child, depth-1, α, β))
                    transition.state[i][j]="○"
                    transition.playerId = true
                    res=alphabeta(transition, depth-1, α, β)
                    transition.state[i][j]=""
                    transition.playerId = false
                    if(β>res){
                        
                        β = res
                    }
                }
            }
        }
    }
            // β := min(β, alphabeta(child, depth-1, α, β))
            // if α ≥ β
                // break // αカット
        // return β         
}






console.log(alphabeta({"state":[["","","×"],["","○","○"],["","",""]],"playerId":true},2,-20,20))
console.log(result)