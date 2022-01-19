// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import { store } from './store/store.js'
import './components/firebaseinit'
import firebase from 'firebase'
import VueDisqus from 'vue-disqus'
import DateF from './components/date.js'
import Ads from 'vue-google-adsense'

Vue.use(require('vue-script2'))

Vue.use(Ads.Adsense)
Vue.use(Ads.InArticleAdsense)
Vue.use(Ads.InFeedAdsense)
Vue.use(VueDisqus)
Vue.use(Vuetify)
Vue.filter('date', DateF)
Vue.use(require('vue-moment'))
Vue.config.productionTip = false


router.beforeResolve((to, from, next) => {
  // If this isn't an initial page load.
  if (to.name) {
      // Start the route progress bar.
      NProgress.start()
  }
  next()
})

router.afterEach((to, from) => {
  // Complete the animation of the route progress bar.
  NProgress.done()
})



/* eslint-disable no-new */
let app;

firebase.auth().onAuthStateChanged( user => {
   if(!app){

    app = new Vue({
  el: '#app',
  store,
  router,
  components: { App },
  template: '<App/>'
});
   }

});
