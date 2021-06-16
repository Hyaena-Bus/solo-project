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
    
    <button @click="deleteAll">delete all</button>
    <button @click="latest">latest</button>
    <button @click="prev">perv</button>
    <button @click="next">next</button>



    <div>
      <li id="list" v-for="n in state.dbTransition">
       
        id:{{n.id}}  date:{{n.date.slice(0,10)}} <button @click="init(n.id)">load</button>  <button @click="deleteOne(n.id)">delete</button>
        
      </li>
      
    </div>
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
      
    });

    const getData = async()=>{
      await axios.get('/match/').then(d=>{
        state.dbTransition = d.data
        state.latest=state.dbTransition.length-1
      })
    }
    
    const latest = ()=>{
      state.currentTransition = state.dbTransition[state.dbTransition.length-1].transition
      state.counter=0
        state.states = [
            ["","",""],
            ["","",""],
            ["","",""],
        ]
    }

    const init = (num) => {
      
        state.dbTransition.forEach((d,index)=>{
          if(d.id===num)state.currentTransition = state.dbTransition[index].transition
        })
        state.counter=0
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

    const deleteAll = async()=>{
        await axios.delete('/match/')
        getData()
    }

    const deleteOne = async(num)=>{
        await axios.delete(`/match/${num}`)
        getData()
    }


    return {
      state,
      getData,
      next,
      prev,
      init,
      deleteOne,
      deleteAll,
      latest,
    };
  },

  mounted () {
    this.getData()
  }

});

</script>

<style>
#list {
  margin:10px;
  
  
  text-align: center;
  vertical-align: middle;
  font-size:20px;
  
}


</style>
