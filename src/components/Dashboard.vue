<template>
    <div>
          <div class= "banner2">  
       </div> 
          
        <div class ="content">
            <v-layout row wrap>
               <v-flex xs12 sm12 md3>
        <v-card flat class="profile-part">
         <center> 
           <div class="bg-img">
<img :src= "photourl" alt="" width = '150px'>
           </div>
           
           <br>
           <br>
           <div class="link">
              <router-link to="/profile" >  <v-btn style="color:white;background: rgb(170, 144, 212);">Edit Profile</v-btn></router-link>
           </div >
           <div  class="link">
         <router-link to="/add" >   <v-btn style="color:white; background: rgb(73, 28, 236);">Upload Project</v-btn></router-link>
       
           </div>
                  </center>
         
        </v-card>
      </v-flex> 
            
     <v-flex xs12 sm12 md9 class= "main-content">
        <v-card flat>
        
          <div class= "protip">
              <strong>ProTip! </strong>
            Updating your profile with your name, location, 
            and a profile picture helps other Coursesgram users get to know you.
            <span>X</span>
            </div>
            <v-tabs fixed-tabs>
    <v-tab ripple>Overview</v-tab>
     <v-tab ripple>Projects</v-tab>
     <v-tab-item>
         <v-card flat>
             <div class="overview">
           <h3>Popular Projects</h3> 
           <br>
            <div class="popular-pro">
                You don't have any popular projects yet
            </div>
            <br>
            <br>
            <h3>Contribution Activity</h3> 
            <br>
            <br>
            <div>
                 <v-timeline align-top dense>
                      <v-timeline-item
          color="#6231d6"
          small
          v-for = "act in Activity" :key= "act.id"
        >
          <v-layout pt-3>
            <v-flex xs12>
              <strong> {{ act.Date }} </strong>
            </v-flex>
            <v-flex >
              <strong>{{ act.Activity }}</strong>
            </v-flex>
          </v-layout>
        </v-timeline-item>
                 </v-timeline>
            </div>
             </div>
         </v-card>
     </v-tab-item>
     <v-tab-item>
         <v-card flat>
          <div class="overview">
                     <v-layout row wrap>
    <v-flex   v-for= "item in Userprojects" :key= "item.id" xs12 sm6 md4 lg4 class="post">
      <v-card class="post-card" flat>
        <v-toolbar dark color="#4a7fdd" flat>
     <v-icon>import_contacts</v-icon>
    <v-spacer></v-spacer>

    <h4>Ref : {{ item.projectId }}</h4>

  </v-toolbar>

      
          <div style="padding:15px 10px 10px 10px">
           <router-link
           :to="{
           name: 'View',
           params: {projectId: item.projectId}
            }"> <h3>{{ item.title }}</h3></router-link>
         <span class="grey--text">{{ item.summary }}</span>
          </div>
  

        <v-card-actions>
          <v-chip>{{ item.categoryChosen }}</v-chip>
           <v-chip color="#4a7fdd" text-color="white">
      <v-avatar>
        <v-icon>account_circle</v-icon>
      </v-avatar>
      {{ item.username }}
    </v-chip>
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>
             </div>
         </v-card>
     </v-tab-item>
            </v-tabs>
            
        </v-card>
      </v-flex>
          </v-layout> 
        </div>
    </div>
</template>

<script>
import db from './firebaseinit.js';
import firebase from 'firebase';
import { error } from 'util';
  export default {
    data () {
      return {
          date: new Date(),
          currentUser: '',
          user: '',
          Userprojects: [],
          Activity: [],
          photourl: ''
         }
    },
      created(){
            if(firebase.auth().currentUser){
                this.currentUser = firebase.auth().currentUser.email;
                 db.collection('projects').where('userEmail', '==', this.currentUser).get().then(
        querySnapshot => {
          querySnapshot.forEach(doc =>{
           const data = {
             'projectId': doc.data().projectId,
             'title': doc.data().title,
             'categoryChosen': doc.data().categoryChosen,
             'summary': doc.data().summary,
             'abstract': doc.data().abstract,
             'username': doc.data().username,
           }
           this.Userprojects.push(data)
          })
        } 
      )
         db.collection('users').doc(this.currentUser).collection('Activity').get().then(
        querySnapshot => {
          querySnapshot.forEach(doc =>{
           const data2 = {
              'Date' : doc.data().Date,
             'Activity': doc.data().Activity,
           }
           this.Activity.push(data2)
          })
        } 
      )

        db.collection('users').where('Email', '==', this.currentUser).get().then(
        querySnapshot => {
          querySnapshot.forEach(doc =>{
              this.photourl = doc.data().PhotoUrl
          })
        } 
      )
            }
    },
    methods: {
      time(){
         return new Date();
      }
    }
  }
</script>





<style scoped>
.grey--text { 
  font-size: 13px;


  }
.bg-img { background-image: url('../assets/user.png'); width:150px;height:150px;}
.link a{text-decoration: none; color: white;}
.grey--text { font-size: 13px;}
  .headline {font-size: 6px;}
  .post-card {box-shadow: 1px 5px 30px -3px #e7e7e7;}
  .post {padding-right: 10px; padding-left : 10px;margin-top: 30px;}
.popular-pro {padding:50px 20px 50px 20px;background: rgba(202, 190, 226, 0.425);text-align: center;}
.overview {padding: 20px 0px 20px 0px;}
.main-content {padding: 0px 20px 0px 20px;}
.protip { padding: 20px; background: rgba(175, 204, 224, 0.384)}
.content { padding: 40px 100px 40px 100px; background: white;}
.content-box {box-shadow: 1px 5px 30px -3px #e4e4e4;padding: 50px 50px 50px 50px; width:500px;}
.banner2 {    
  height: 80px;
  background-image:url('../assets/banner2.jpg');
  background-position: 0px 0px, 50% 0px;
  background-size: cover;
  background-repeat: no-repeat;
  background-attachment: scroll, scroll;
}

@media (max-width: 991px) {
 .grey--text { 
  font-size: 13px;


  }
.bg-img { background-image: url('../assets/user.png'); width:150px;height:150px;}
.link a{text-decoration: none; color: white;}
.grey--text { font-size: 13px;}
  .headline {font-size: 6px;}
  .post-card {box-shadow: 1px 5px 30px -3px #e7e7e7;}
  .post {padding-right: 10px; padding-left : 10px;margin-top: 30px;}
.popular-pro {padding:50px 20px 50px 20px;background: rgba(202, 190, 226, 0.425);text-align: center;}
.overview {padding: 20px 0px 20px 0px;}
.main-content {padding: 0px 20px 0px 20px;}
.protip { padding: 20px; background: rgba(175, 204, 224, 0.384)}
.content { padding: 40px 0px 40px 0px; background: white;}
.content-box {box-shadow: 1px 5px 30px -3px #e4e4e4;padding: 50px 50px 50px 50px; width:500px;}
.banner2 {    
  height: 80px;
  background-image:url('../assets/banner2.jpg');
  background-position: 0px 0px, 50% 0px;
  background-size: cover;
  background-repeat: no-repeat;
  background-attachment: scroll, scroll;
}
}

@media (max-width: 767px) {
 .grey--text { 
  font-size: 13px;

  }
.bg-img { background-image: url('../assets/user.png'); width:150px;height:150px;}
.link a{text-decoration: none; color: white;}
.grey--text { font-size: 13px;}
  .headline {font-size: 6px;}
  .post-card {box-shadow: 1px 5px 30px -3px #e7e7e7;}
  .post {padding-right: 10px; padding-left : 10px;margin-top: 30px;}
.popular-pro {padding:50px 20px 50px 20px;background: rgba(202, 190, 226, 0.425);text-align: center;}
.overview {padding: 20px 0px 20px 0px;}
.main-content {padding: 0px 20px 0px 20px;}
.protip { padding: 20px; background: rgba(175, 204, 224, 0.384)}
.content { padding: 40px 0px 40px 0px; background: white;}
.content-box {box-shadow: 1px 5px 30px -3px #e4e4e4;padding: 50px 50px 50px 50px; width:500px;}
.banner2 {    
  height: 80px;
  background-image:url('../assets/banner2.jpg');
  background-position: 0px 0px, 50% 0px;
  background-size: cover;
  background-repeat: no-repeat;
  background-attachment: scroll, scroll;
}
}

@media (max-width: 479px) {
.grey--text { 
  font-size: 13px;
  

  }
.bg-img { background-image: url('../assets/user.png'); width:150px;height:150px;}
.link a{text-decoration: none; color: white;}
.grey--text { font-size: 13px;}
  .headline {font-size: 6px;}
  .post-card {box-shadow: 1px 5px 30px -3px #e7e7e7;}
  .post {padding-right: 10px; padding-left : 10px;margin-top: 30px;}
.popular-pro {padding:50px 20px 50px 20px;background: rgba(202, 190, 226, 0.425);text-align: center;}
.overview {padding: 20px 0px 20px 0px;}
.main-content {padding: 0px 10px 0px 10px;}
.protip { padding: 20px; background: rgba(175, 204, 224, 0.384)}
.content { padding: 40px 0px 40px 0px; background: white;}
.content-box {box-shadow: 1px 5px 30px -3px #e4e4e4;padding: 50px 50px 50px 50px; width:500px;}
.banner2 {    
  height: 80px;
  background-image:url('../assets/banner2.jpg');
  background-position: 0px 0px, 50% 0px;
  background-size: cover;
  background-repeat: no-repeat;
  background-attachment: scroll, scroll;
}

}

</style>
