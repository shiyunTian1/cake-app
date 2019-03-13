import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state:{
        username:'',
        isLogin:false
    },
    mutations:{
        login(state,username){
            state.username=username;
            state.isLogin=true;
        },
        logout(state){
            state.isLogin=false;
        }
    }
})