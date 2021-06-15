import Vue from "vue";
import Vuex from "vuex";


Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    currentView:true,
    buttonText:"Log",
  },
  mutations: {
    setCurrentView(state){
        state.currentView = !state.currentView
        state.buttonText = "game"
    }
  },
  actions: {
    
  },
});
