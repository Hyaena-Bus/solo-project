<template>
  <div id="app">
    <div>{{states}}</div>
    <table id="table">
            <tr>
                <td>{{states[0][0]}}</td>
                <td>{{states[0][1]}}</td>
                <td>{{states[0][2]}}</td>
            </tr>
            <tr>
                <td>{{states[1][0]}}</td>
                <td>{{states[1][1]}}</td>
                <td>{{states[1][2]}}</td>
            </tr>
            <tr>
                <td>{{states[2][0]}}</td>
                <td>{{states[2][1]}}</td>
                <td>{{states[2][2]}}</td>
            </tr>
        </table>
  </div>
</template>

<script>


export default {
  name: 'App',
  data() {
    return {
      states: [
        [1,2,3],
        [4,5,6],
        [7,8,9],
      ],
      playerId: 1,
    };
  },
  components: {
    
  }
}
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
