<template>
  <div>
    log
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
    <button @click="init(18)">init</button>
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

    });

    const getData = async()=>{
      await axios.get('http://localhost:9000/match').then(d=>{
        state.dbTransition = d.data
      })
    }
    
    const init = (num) => {
        console.log("init")
        state.counter=0
        state.currentTransition = state.dbTransition[num].transition
        state.states = [
            ["","",""],
            ["","",""],
            ["","",""],
        ]
    }

    const next = () =>{
        console.log("next")
        if(state.counter<JSON.parse(state.currentTransition).length){
            state.states = JSON.parse(state.currentTransition)[state.counter].state
            state.counter++
        }
    }

    const prev = () =>{
        console.log("prev")
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
