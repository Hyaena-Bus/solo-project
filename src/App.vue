<template>
  <div id="app">
    <button @click="$store.commit('setCurrentView')">{{this.$store.state.buttonText}}</button>
    <div v-if="this.$store.state.currentView">
      
      <div>{{state.text}}</div>
      <div>{{`${state.playerId}の番です`}}</div>
        <table id="table">
          <tr>
              <td @click="clicked(0,0)">{{state.states[0][0]}}</td>
              <td @click="clicked(0,1)">{{state.states[0][1]}}</td>
              <td @click="clicked(0,2)">{{state.states[0][2]}}</td>
          </tr>
          <tr>
              <td @click="clicked(1,0)">{{state.states[1][0]}}</td>
              <td @click="clicked(1,1)">{{state.states[1][1]}}</td>
              <td @click="clicked(1,2)">{{state.states[1][2]}}</td>
          </tr>
          <tr>
              <td @click="clicked(2,0)">{{state.states[2][0]}}</td>
              <td @click="clicked(2,1)">{{state.states[2][1]}}</td>
              <td @click="clicked(2,2)">{{state.states[2][2]}}</td>
          </tr>
        </table>
        <button @click="newGame">newGame</button>
    </div>
    <div v-else>
    <Log />
    
    </div>
  </div>
</template>

<script>
import { defineComponent, reactive } from '@vue/composition-api'
import axios from "axios";
import Log from "./components/Log.vue"

export default defineComponent({
  components:{Log},
  setup() {
    const state = reactive({
      states: [
        ["","",""],
        ["","",""],
        ["","",""],
      ],
      playerId: true,
      text: "",
      transition: [],
      dbTransition: [],
      
    });

    const clicked = (row,column)=>{
      if(winChecker()) return
      if(state.states[row][column]){
        console.log("そこには置けないよ")
      }else{
        state.playerId ? state.states[row][column]="○" : state.states[row][column]="×"
        
        const newArr = []
        newArr[0]=Array.from(state.states[0])
        newArr[1]=Array.from(state.states[1])
        newArr[2]=Array.from(state.states[2])
        state.transition.push({state:newArr,player:state.playerId})
        
        state.playerId = !state.playerId
        
        if(winChecker()) {
          state.text=`${!state.playerId}の勝ち！`
          postData(state.transition)
          getData()
          console.log(state.dbTransition)
          
        }else if(state.transition.length===9){
          state.text="引き分け！"
          postData(state.transition)
        }
      }
    }

    const winChecker = ()=>{
      return rowChecker() || columnChecker() || diagonalChecker() 
    }

    const rowChecker = ()=>{
      return (state.states[0][0] !== "" && state.states[0][0]===state.states[0][1] && state.states[0][1]===state.states[0][2]) 
              || (state.states[1][0] !== "" && state.states[1][0]===state.states[1][1] && state.states[1][1]===state.states[1][2])
              || (state.states[2][0] !== "" && state.states[2][0]===state.states[2][1] && state.states[2][1]===state.states[2][2])
    }

    const columnChecker = ()=>{
      return (state.states[0][0] !== "" && state.states[0][0]===state.states[1][0] && state.states[1][0]===state.states[2][0])
              || (state.states[0][1] !== "" && state.states[0][1]===state.states[1][1] && state.states[1][1]===state.states[2][1])
              || ((state.states[0][2] !== "" && state.states[0][2]===state.states[1][2] && state.states[1][2]===state.states[2][2]))
    }

    const diagonalChecker = ()=>{
      return (state.states[0][0] !== "" && state.states[0][0]===state.states[1][1] && state.states[1][1]===state.states[2][2])
              || (state.states[0][2] !== "" && state.states[0][2]===state.states[1][1] && state.states[1][1]===state.states[2][0])
    }

    const getData = async()=>{
      await axios.get('http://localhost:9000/match').then(d=>{
        state.dbTransition = d.data
      })
    }

    const postData = async(data)=>{
      await axios.post('http://localhost:9000/match', {
        method: 'POST', 
        mode: 'cors', 
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data) 
      })
    }

    const newGame = () => {
      state.states=[
        ["","",""],
        ["","",""],
        ["","",""],
      ]
      state.playerId=true
      state.transition = []
    }

    return {
      state,
      clicked,
      newGame,
    };
  },
});

</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

#table {
  margin:0 auto;
  border-collapse: collapse;
  border: 3px solid #ccc;
}

#table td {
  border:1px solid #ccc;
  height: 85px;
  width: 85px;
  text-align: center;
  vertical-align: middle;
  font-size: 70px;
  cursor: pointer;
}


</style>
