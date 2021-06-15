<template>
  <div>
    <h1>Log</h1>
    <table id="table">
          <tr>
              <td >{{state.states[0][0]}}</td>
              <td >{{state.states[0][1]}}</td>
              <td >{{state.states[0][2]}}</td>
          </tr>
          <tr>
              <td >{{state.states[1][0]}}</td>
              <td >{{state.states[1][1]}}</td>
              <td >{{state.states[1][2]}}</td>
          </tr>
          <tr>
              <td >{{state.states[2][0]}}</td>
              <td >{{state.states[2][1]}}</td>
              <td >{{state.states[2][2]}}</td>
          </tr>
    </table>
    <input v-model="state.text"/><div></div>
    <button @click="init(state.text)">init</button>
    <button @click="init(state.latest)">latest</button>
    <button @click="next">next</button>
    <button @click="prev">perv</button>
  </div>
</template>

<script>
import { defineComponent, reactive } from '@vue/composition-api'
import axios from "axios";

export default defineComponent({
  setup() {
    const state = reactive({
      states: [
        ["","",""],
        ["","",""],
        ["","",""],
      ],
      dbTransition:[],
      currentTransition:[],
      counter:0,
      text:0,
      latest:0,
    });

    const getData = async()=>{
      await axios.get('/match/').then(d=>{
        state.dbTransition = d.data
        state.latest=state.dbTransition.length-1
      })
    }
    
    const init = (num) => {
        state.counter=0
        state.currentTransition = state.dbTransition[num].transition
        state.states = [
            ["","",""],
            ["","",""],
            ["","",""],
        ]
    }

    const next = () =>{
        if(state.counter<JSON.parse(state.currentTransition).length){
            state.states = JSON.parse(state.currentTransition)[state.counter].state
            state.counter++
        }
    }

    const prev = () =>{
        if(state.counter-2>-1){
            state.states = JSON.parse(state.currentTransition)[state.counter-2].state
            state.counter--
        }
    }

    return {
      state,
      getData,
      next,
      prev,
      init,
    };
  },

  mounted () {
    this.getData()
  }

});

</script>

<style>



</style>
