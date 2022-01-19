import Vue from 'vue'
import Vuex from 'vuex'
import createEasyFirestore from 'vuex-easy-firestore'
import { ProjectModule } from './database.js'
import { CategoryModule } from './database.js'
import { easyFirestore } from './database.js'

Vue.use(Vuex)


  export const store = new Vuex.Store({
    plugins: [easyFirestore],
    modules: {
     ProjectModule,
      CategoryModule
    }
  })
  
  store.dispatch('ProjectModule/openDBChannel')
  store.dispatch('CategoryModule/openDBChannel')