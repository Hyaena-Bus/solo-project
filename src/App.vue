<template>
  <div id="app">
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
  </div>
</template>

<script>
import { defineComponent, reactive } from '@vue/composition-api'

export default defineComponent({
  setup() {
    const state = reactive({
      states: [
        ["","",""],
        ["","",""],
        ["","",""],
      ],
      playerId: true,
      text: "",
    });

    const clicked = (row,column)=>{
      if(state.states[row][column]){
        console.log("そこには置けないよ")
      }else{
        state.playerId ? state.states[row][column]="○" : state.states[row][column]="×"
        state.playerId = !state.playerId
        if(winChecker()) state.text=`${!state.playerId}の勝ち！`
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

    return {
      state,
      clicked,
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
  height: 80px;
  width: 80px;
  text-align: center;
  vertical-align: middle;
  font-size: 75px;
  cursor: pointer;
}


</style>
