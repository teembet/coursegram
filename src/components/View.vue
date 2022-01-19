<template>
<div>
       <div class="banner2">  
       <center><h1 class="banner-title"> {{ title }} </h1>
       <br>
       <br>
        <v-btn color="white" class="nav-btn" dark> <a :href = url>Download</a> </v-btn></center> 
       </div>  

       <div class="content">
           <v-layout row>
    <v-flex xs12 sm12>
      <v-card class="content-box">
          <div>
        <router-link
           to= "/"  >
           <v-btn style="color:white; background: rgb(73, 28, 236);">
             GO BACK</v-btn> </router-link>
           <br>
           <br>
           <br>
           <h2>Summary</h2>
           <br>
            <span class="grey--text">{{ summary }}</span>
            <br><br><br>
            <h2>Abstract</h2>
            <br>
            <span class="grey--text">{{ abstract }}</span>
            <br><br><br><br><br>
           <v-avatar
          :size= 70
          color="grey lighten-4"
        ><div class= "photo">
           <img :src= "photo" alt="" width="50px" >
        </div>
        
        </v-avatar>
        <br>
        <br>
      <strong> <h3> {{ userEmail }} </h3></strong> 

          </div>
      </v-card>
    </v-flex>
  </v-layout>
  
       </div>
  <div class="comments">
    <vue-disqus shortname="courses-gram" :identifier= "projectId" url="https://courses-gram.disqus.com/"> </vue-disqus>
  </div>
</div>

</template>

<script>
import db from './firebaseinit.js'
import {  firebaseinit } from './firebaseinit.js'
import firebase from 'firebase'
export default {
  data(){
    return{
      user: '',
      photo: '',
      name: '',
      location: '',
      email: '',
      projectId : '',
      title: null,
      summary: null,
      abstract: null,
      categoryChosen: null,
      url: null,
      userEmail: ''
    };
  },
  created(){
      
                 db.collection('users').where('Email', '==', this.userEmail).get().then(
        querySnapshot => {
          querySnapshot.forEach(doc =>{
            this.name = doc.data().Fullname,
              this.location = doc.data().Location,
              this.photo = doc.data().PhotoUrl,
              this.email = doc.data().Email
          })
        } 
      )
            },
  beforeRouteEnter (to, from, next) {
      db.collection('projects').where('projectId', '==', to.params.projectId).get().then(
        querySnapshot => {
          querySnapshot.forEach(doc =>{
            next(vm => {
               vm.projectId = doc.data().projectId
            vm.title = doc.data().title
            vm.summary = doc.data().summary
            vm.abstract = doc.data().abstract
            vm.categoryChosen = doc.data().categoryChosen
            vm.url = doc.data().url
            vm.userEmail = doc.data().userEmail
            })
           
          })
        }
      )
  },
  watch: {
    '$route' : 'fetchData'
  },
  methods:{
    fetchData(){
      db.collection('projects').where('projectId', '==', this.$route.params.projectId).get().then(
        querySnapshot => {
          querySnapshot.forEach(doc =>{
            this.projectId = doc.data().projectId
            this.title = doc.data().title
            this.summary = doc.data().summary
            this.abstract = doc.data().abstract
            this.categoryChosen = doc.data().categoryChosen
           this.url = doc.data().url
           this.userEmail = doc.data().userEmail
          })
        }
      )
    },
    pageId(){
       db.collection('projects').where('projectId', '==', this.$route.params.projectId).get().then(
        querySnapshot => {
          querySnapshot.forEach(doc =>{
            this.projectId = doc.data().projectId
            this.title = doc.data().title
            this.summary = doc.data().summary
            this.abstract = doc.data().abstract
            this.categoryChosen = doc.data().categoryChosen
           this.url = doc.data().url 
            this.userEmail = doc.data().userEmail
           return this.projectId 
          })
        }
      )
     
    },
    Delete(){
        db.collection('employees').where('projectId', '==', this.$route.params.projectId).get().then(
        querySnapshot => {
          querySnapshot.forEach(doc =>{
           doc.ref.delete()
           this.$router.push('/')
          })
        }
      )
    }
  }
}
</script>


<style scoped>
.comments { padding: 50px 100px 50px 100px;}
.photo { background-image: url("../assets/user.png"); width: 50px; height: 50px; background-size: cover;}
.banner-title { font-size: 40px; opacity: 0.6;}
a { text-decoration: none;}
.back {color:white}
.content-box {box-shadow: 1px 5px 30px -3px #d3d3d3;padding: 50px 100px 50px 100px;}
.content { padding: 80px 100px 80px 100px; background: white;}
.nav-btn {color: rgb(83, 24, 179); }
.banner2 {    
  height: 400px;
  padding: 170px 80px 0px;
  background-image:url('../assets/banner2.jpg');
  background-position: 0px 0px, 50% 0px;
  background-size: cover;
  background-repeat: no-repeat;
  background-attachment: scroll, scroll;
}


@media (max-width: 991px) {
  .comments { padding: 20px 20px 20px 20px;}
.photo { background-image: url("../assets/user.png"); width: 20px; height: 20px;}
.banner-title { font-size: 25px; opacity: 0.6;}
a { text-decoration: none;}
.back {color:white}
.content-box {box-shadow: 1px 5px 30px -3px #d3d3d3;padding: 40px 30px 40px 30px;}
.content { padding: 40px 10px 40px 10px; background: white;}
.nav-btn {color: rgb(83, 24, 179); }
.banner2 {    
  height: 350px;
  padding: 120px 80px 0px;
  background-image:url('../assets/banner2.jpg');
  background-position: 0px 0px, 50% 0px;
  background-size: cover;
  background-repeat: no-repeat;
  background-attachment: scroll, scroll;
}
}

@media (max-width: 767px) {
  .comments { padding: 20px 20px 20px 20px;}
.photo { background-image: url("../assets/user.png"); width: 20px; height: 20px;}
.banner-title { font-size: 25px; opacity: 0.6;}
a { text-decoration: none;}
.back {color:white}
.content-box {box-shadow: 1px 5px 30px -3px #d3d3d3;padding: 40px 30px 40px 30px;}
.content { padding: 40px 10px 40px 10px; background: white;}
.nav-btn {color: rgb(83, 24, 179); }
.banner2 {    
  height: 350px;
  padding: 120px 80px 0px;
  background-image:url('../assets/banner2.jpg');
  background-position: 0px 0px, 50% 0px;
  background-size: cover;
  background-repeat: no-repeat;
  background-attachment: scroll, scroll;
}
}

@media (max-width: 479px) {
  .comments { padding: 20px 20px 20px 20px;}
.photo { background-image: url("../assets/user.png"); width: 20px; height: 20px;}
.banner-title { font-size: 25px; opacity: 0.6;}
a { text-decoration: none;}
.back {color:white}
.content-box {box-shadow: 1px 5px 30px -3px #d3d3d3;padding: 40px 30px 40px 30px;}
.content { padding: 40px 10px 40px 10px; background: white;}
.nav-btn {color: rgb(83, 24, 179); }
.banner2 {    
  height: 350px;
  padding: 120px 80px 0px;
  background-image:url('../assets/banner2.jpg');
  background-position: 0px 0px, 50% 0px;
  background-size: cover;
  background-repeat: no-repeat;
  background-attachment: scroll, scroll;
}


}
</style>
