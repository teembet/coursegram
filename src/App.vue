<template>
  <v-app>
     <v-toolbar color="transparent" absolute flat>

    <v-toolbar-title>
     <router-link to="/" >   <img src= "./assets/logo-white.png" alt="" width="150px" class="logo">
     </router-link>
     </v-toolbar-title>
    <v-spacer></v-spacer>
     <v-icon style = "float:right;font-size:40px;color:white;margin-top:20px;" @click.stop="drawer = !drawer"  
                         class = "hidden-md-and-up">menu</v-icon> 
    <ul class = "hidden-sm-and-down">
      <router-link to="/" ><li  class="nav-link"> <p class= "linka">Home </p> </li> </router-link>
      <router-link to="/discover" ><li  class="nav-link"> <p class= "linka">Discover </p> </li> </router-link>
      <router-link to="/dashboard" ><li v-if=" isLoggedin" class="nav-link"> <p class= "linka">Dashboard </p> </li> </router-link>
    <router-link to="/profile" ><li v-if=" isLoggedin" class="nav-link"> <p class= "linka">Profile </p> </li> </router-link> 
   <router-link to="/add" ><li v-if=" isLoggedin" class="nav-link"> <p class= "linka">Upload Project </p> </li> </router-link>
  <router-link to="LoginSignup" ><li v-if=" !isLoggedin" class="nav-link">
   <v-btn color="white" class="nav-btn"> Login/SignUp  </v-btn>  </li></router-link>
    <li v-if="isLoggedin" class="nav-link" ><v-btn color="white" class="nav-btn" @click= "logout"> Logout </v-btn></li>
     <li  v-if=" isLoggedin" class="nav-link"> <span class="email black-text">
       
       <v-avatar
          :size= 30
          color="grey lighten-4"
        ><div class= "photo">
           <img :src= "photo" alt="" width="30px" >
        </div>
        
        </v-avatar>
       
      <strong> {{ user }} </strong>  </span> </li> 
            </ul>
  </v-toolbar>
  <v-navigation-drawer
      v-model="drawer"
      absolute
      temporary
    >
    
     <center>
       
       <div class = "nav-mobile">
         <div>
         <span class="email black-text" v-if="isLoggedin"> <v-avatar
          :size= 50
          color="grey lighten-4"
        >
        <div class= "photo">
           <img :src= "photo" alt="" width="50px" >
        </div>
        </v-avatar>
         </span> 
       </div> 
        <br>
        <h3> {{ user }} </h3>
       <div class= "nav-mobile-link" >  <router-link to="/" ><strong>Home</strong> </router-link> </div>
        <div class= "nav-mobile-link" ><router-link to="/discover" ><strong>Discover</strong> </router-link></div>
       <div class= "nav-mobile-link" v-if="isLoggedin" ><router-link to="/dashboard" ><strong>Dashboard</strong> </router-link></div>
       <div class= "nav-mobile-link" v-if="isLoggedin"><router-link to="/add" >  <strong>Upload Project</strong> </router-link></div>
       <div class= "nav-mobile-link" v-if="isLoggedin"> <router-link to="/profile" ><strong>Profile</strong></router-link></div>
    
    
                <div v-if="!isLoggedin">
                   <router-link to="LoginSignup" >
                <v-btn color= "#5318b3" dark class="log-btn"> Login/SignUp  </v-btn> </router-link> 
                </div>
                <div v-if="isLoggedin">
                  
                <v-btn color= "#5318b3" dark class="log-btn"  @click= "logout"> Logout </v-btn> 
                </div>
                </div>
     </center>
       
    </v-navigation-drawer>
    <v-content>
      <router-view/>
    </v-content>
    <div class="footer">
      <center>© 2019 COURSESGRAM | TERMS AND CONDITIONS APPLY</center>
    </div>
  </v-app>
</template>

<script>
import db from './components/firebaseinit.js'
import {  firebaseinit } from './components/firebaseinit.js'
import firebase from 'firebase'

export default {
     data(){
      return{
           photo: '',
          isLoggedin : false,
          currentUser : '',
          user: '',
            drawer: null,
        items: [
          { title: 'Home', icon: 'home' },
          { title: 'About', icon: 'question_answer' },
          { title: 'Blog', icon: 'message' },
          { title: 'Our Programmes', icon: 'dashboard' },
          { title: 'Podcasts', icon: 'mic' },
          { title: 'Contact Us', icon: 'phone' }
        ]
      }
    },
    created(){
            if(firebase.auth().currentUser){
              
                this.isLoggedin = true;
                this.currentUser = firebase.auth().currentUser.email;
                 db.collection('users').where('Email', '==', this.currentUser).get().then(
        querySnapshot => {
          querySnapshot.forEach(doc =>{
            this.user = doc.data().Username
              this.photo = doc.data().PhotoUrl
          })
        } 
      )
            }
    },
    methods:{
       logout(){
           firebase.auth().signOut()
           .then(() => {
               this.$router.go({ path: this.$router.path })
           });
       }
    }
}
</script>
<style scoped>
  .photo { background-image: url("./assets/user.png"); width: 30px; height: 30px;}
  .linka { font-size: 15px;}
 .log-btn  {color: white; text-decoration: none; }
 .log-btn a{color: white; text-decoration: none; }
.nav-mobile-link {font-size: 25px; margin: 20px 0px 20px 0px;}
.nav-mobile-link a {color: rgb(36, 36, 36); text-decoration: none;}
.nav-mobile-link :hover {color: #5318b3; transition: all 1s; }
.nav-mobile { padding: 40px 0px 40px 0px}
 .nav-btn {color: #5318b3; }
 .nav-link {display: inline-block;margin-right: 40px;
              margin-top: 20px;color: white; }
 .nav-link a{color: white; text-decoration: none; }
   .nav-link :hover {color: #272727; transition: all 1s; }
.nav-bar {height:100px;}
 .logo {margin-top:30px;margin-left:50px;}
 .footer {background: #272727; color: white;padding: 40px; text-align: center;}



      
@media (max-width: 991px) {
   .nav-mobile-link a {color: rgb(36, 36, 36); text-decoration: none;}
  .photo { background-image: url("./assets/user.png"); width: 50px; height: 50px;}
.nav-mobile-link {font-size: 25px; margin: 20px 0px 20px 0px;}
.nav-mobile-link :hover {color: #5318b3; transition: all 1s; }
.nav-mobile { padding: 40px 0px 40px 0px}
 .nav-btn {color: #5318b3; }
 .nav-link {display: inline-block;margin-right: 40px;
              margin-top: 30px;color: white; }
   .nav-link :hover {color: #272727; transition: all 1s; }
.nav-bar {height:100px;}
 .logo {margin-top:40px;margin-left :0px;}
 .footer {background: #272727; color: white;padding: 40px; text-align: center;}
}

@media (max-width: 767px) {
   .nav-mobile-link a {color: rgb(36, 36, 36); text-decoration: none;}
  .photo { background-image: url("./assets/user.png"); width: 50px; height: 50px;}
.nav-mobile-link {font-size: 25px; margin: 20px 0px 20px 0px;}
.nav-mobile-link :hover {color: #5318b3; transition: all 1s; }
.nav-mobile { padding: 40px 0px 40px 0px}
 .nav-btn {color: #5318b3; }
 .nav-link {display: inline-block;margin-right: 40px;
              margin-top: 30px;color: white; }
   .nav-link :hover {color: #272727; transition: all 1s; }
.nav-bar {height:100px;}
 .logo {margin-top:40px;margin-left :0px;}
 .footer {background: #272727; color: white;padding: 40px; text-align: center;}
}

@media (max-width: 479px) {
  .nav-mobile-link a {color: rgb(36, 36, 36); text-decoration: none;}
  .photo { background-image: url("./assets/user.png"); width: 70px; height: 70px;}
.nav-mobile-link {font-size: 25px; margin: 20px 0px 20px 0px;}
.nav-mobile-link :hover {color: #5318b3; transition: all 1s; }
.nav-mobile { padding: 40px 0px 40px 0px}
 .nav-btn {color: #5318b3; }
 .nav-link {display: inline-block;margin-right: 40px;
              margin-top: 30px;color: white; }
   .nav-link :hover {color: #272727; transition: all 1s; }
.nav-bar {height:100px;}
 .logo {margin-top:40px;margin-left :0px;}
 .footer {background: #272727; color: white;padding: 40px; text-align: center;}
}
</style>
