<template>
<div> 
  
 <v-flex xs12>
        <div class="banner2">  
        <h1 class="banner-title">Projects at your disposal</h1>
          <p class="banner-subheader">Explore thousands of projects today for free</p>
          <br>
     <div class="banner-btn">  <router-link to="/discover" >  
     <v-btn large color="white"  class="banner-btn2"> Discover</v-btn> </router-link>
       </div> 
     
        <div class="headline"></div>
       </div>
      </v-flex>
      <div class="content"> 
         
       <center> <h1>Top Projects</h1> 
       <p>Browse projects across an array of topics and discipline</p></center>
          <div class="Engineering">
        <v-layout row wrap>
    <v-flex   v-for= "item in getProject" :key= "item.id" xs12 sm6 md3 lg3 class="post">
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
            <br><br>
           <center>
             <div class="btn">
         <router-link to="/discover" > <v-btn large  style="color:white; background: #4a7fdd;">VIEW MORE</v-btn>    </router-link>      
           
             </div>
           </center>
            <br>
            <br>
           <div>
    <v-layout row wrap>
      <v-flex xs12 sm6 md6>
        <v-card color="transparent" flat>
          <img src= "../assets/mad.png" class="last-img"/>
        </v-card>
      </v-flex>
      <v-flex xs12 sm6 md6>
        <v-card color="transparent" flat class="last-text">
          <center><p> <strong>Unlimited access to projects and resources</strong>  </p></center>
        </v-card> 
      </v-flex>
    </v-layout>
     </div>
    
      </div>
</div>

</template>
<script>
import { mapGetters } from 'vuex'
  export default {
    data () {
      return {
        tabs: null,
        Filteredtext : '',
        tabsName: ['Engineering', 'Biochemistry','Law','Physics','Archi']
    }
    },
      computed:{ 
       ...mapGetters ([
             'getProject',
             'getCategory'
         ]),

      filtered(){
       return this.getProject.filter(post => {
        return post.toLowerCase().includes(this.Filteredtext.toLowerCase())
      });
    }
    }
  }
</script>
<style scoped>
.btn a{ text-decoration: none;}
.last-img {width:600px;}
.last-text {padding: 150px 10px 0px 10px; font-size: 45px;}
.grey--text { 
  font-size: 13px;
  }
  .headline {font-size: 6px;}
  .post-card {box-shadow: 1px 5px 30px -3px #e7e7e7;}
  .post {padding-right: 10px; padding-left : 10px;margin-top: 30px;}
  .content {background: white;padding: 40px 80px 80px 80px;}
  .banner-title {color:white; font-size:45px;}
  .banner-subheader {text-align: justify; font-size: 18px; color:white;margin-top: 16spx;}
   .banner-btn2 {color: #5318b3;}
  .banner-btn {color: #5318b3;}
  .banner-btn a {color:rgb(83, 24, 179); text-decoration: none;}
  .search-f {text-emphasis-color: rgb(250, 182, 187);}
  .banner2 {    
  height: 650px;
  padding: 220px 80px 0px;
  background-image:url('../assets/banner.jpg');
  background-position: 0px 0px, 50% 0px;
  background-size: cover;
  background-repeat: no-repeat;
  background-attachment: scroll, scroll;
}


      
@media (max-width: 991px) {
  .btn a{ text-decoration: none;}
 .last-img {width:400px;}
.last-text {padding:70px 0px 0px 10px; font-size: 30px;}
.grey--text { 
  font-size: 13px;
  overflow: hidden;
   text-overflow: ellipsis;
   display: -webkit-box;
   line-height: 21px;     /* fallback */    /* fallback */
   -webkit-line-clamp: 4; /* number of lines to show */
   -webkit-box-orient: vertical;

  }
  .headline {font-size: 6px;}
  .post-card {box-shadow: 1px 5px 30px -3px #e7e7e7;}
  .post {padding-right: 10px; padding-left : 10px;margin-top: 30px;}
  .content {background: white;padding: 40px 10px 40px 10px;}
  .banner-title {color:white; font-size:30px;}
  .banner-subheader {text-align: justify; font-size: 13px; color:white;margin-top: 16spx;}
  .banner-btn {color:rgb(83, 24, 179);}
     .banner-btn a{color:rgb(83, 24, 179); text-decoration: none;}
  .search-f {text-emphasis-color: rgb(250, 182, 187);}
  .banner2 {    
  height: 450px;
  padding: 130px 50px 0px;
  background-image:url('../assets/banner.jpg');
  background-position: 0px 0px, 50% 0px;
  background-size: cover;
  background-repeat: no-repeat;
  background-attachment: scroll, scroll;
}
}

@media (max-width: 767px) {
  .btn a{ text-decoration: none;}
 .last-img {width:300px;}
.last-text {padding: 0px 10px 0px 10px; font-size: 25px;}
.grey--text { 
  font-size: 13px;

  }
  .headline {font-size: 6px;}
  .post-card {box-shadow: 1px 5px 30px -3px #e7e7e7;}
  .post {padding-right: 10px; padding-left : 10px;margin-top: 30px;}
  .content {background: white;padding: 40px 10px 40px 10px;}
  .banner-title {color:white; font-size:30px;}
  .banner-subheader {text-align: justify; font-size: 13px; color:white;margin-top: 16spx;}
  .banner-btn {color:rgb(83, 24, 179);}
  .banner-btn a{color:rgb(83, 24, 179); text-decoration: none;}
  .search-f {text-emphasis-color: rgb(250, 182, 187);}
  .banner2 {    
  height: 450px;
  padding: 130px 50px 0px;
  background-image:url('../assets/banner.jpg');
  background-position: 0px 0px, 50% 0px;
  background-size: cover;
  background-repeat: no-repeat;
  background-attachment: scroll, scroll;
}
}

@media (max-width: 479px) {
  .btn a{ text-decoration: none;}
.last-img {width:300px;}
.last-text {padding: 0px 10px 0px 10px; font-size: 25px;}
.grey--text { 
  font-size: 13px;

  }
  .headline {font-size: 6px;}
  .post-card {box-shadow: 1px 5px 30px -3px #e7e7e7;}
  .post {padding-right: 10px; padding-left : 10px;margin-top: 30px;}
  .content {background: white;padding: 40px 10px 40px 10px;}
  .banner-title {color:white; font-size:30px;}
  .banner-subheader {text-align: justify; font-size: 13px; color:white;margin-top: 16spx;}
  .banner-btn {color:rgb(83, 24, 179);}
   .banner-btn a {color:rgb(83, 24, 179); text-decoration: none;}
  .search-f {text-emphasis-color: rgb(250, 182, 187);}
  .banner2 {    
  height: 450px;
  padding: 130px 50px  0px 30px;
  background-image:url('../assets/banner.jpg');
  background-position: 0px 0px, 50% 0px;
  background-size: cover;
  background-repeat: no-repeat;
  background-attachment: scroll, scroll;
}
}
</style>
