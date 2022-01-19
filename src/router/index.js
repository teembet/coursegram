import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import View from '@/components/View'
import Add from '@/components/Add'
import Admin from '@/components/Admin'
import LoginSignup from '@/components/LoginSignup'
import Dashboard from '@/components/Dashboard'
import Profile from '@/components/Profile'
import Discover from '@/components/discover'
import firebase from 'firebase'

Vue.use(Router)

let router = new Router({
  routes: [
    {
      path: '/discover',
      name: 'Discover',
      component: Discover,
    },
    {
      path: '/',
      name: 'Home',
      component: Home,
    },
    {
      path: '/view/:projectId',
      name: 'View',
      component: View,
      meta :{
        requiresAuth : true
      }
    },
    {
      path: '/add',
      name: 'Add',
      component: Add,
      meta :{
        requiresAuth : true
      }
    },
    {
      path: '/loginsignup',
      name: 'LoginSignup',
      component: LoginSignup,
      meta :{
        requiresGuest : true
      }
    },
    {
      path: '/0816admin',
      name: 'Admin',
      component: Admin,
      meta :{
        requiresAuth : true
      }
    },
    {
      path: '/dashboard',
      name: 'Dashboard',
      component: Dashboard,
      meta :{
        requiresAuth : true
      }
    },
    {
      path: '/profile',
      name: 'Profile',
      component: Profile,

    },
    {
    path: '*',
    redirect : '/'
  }
  ],
  mode: 'history'
})
router.beforeEach(
  (to, from, next) =>{
    if(to.matched.some(record => record.meta.requiresAuth)){
       if(!firebase.auth().currentUser){
         next({
           path: 'LoginSignup',
           query: {
             redirect: to.fullPath
           }
         })
       }
       else{
         next();
       }

    }
    else   if(to.matched.some(record => record.meta.requiresGuest)){
      if(firebase.auth().currentUser){
        next({
          path: '/dashboard',
          query: {
            redirect: to.fullPath
          }
        })
      }
      else{
        next();
      }

   }
   else{
    next();
  }

  } 
  ); 

  export default router;