<template>
<div> 
        <div class="banner2">  
        </div>
      <div class="content"> 
            <p>Browse projects across an array of topics and discipline</p>
                <v-flex xs12 sm12>
          <v-text-field
           v-model="Filteredtext"
             prepend-inner-icon="search"
            solo
            label="Filter projects by categories "
            clearable
          ></v-text-field>
        </v-flex>
      <br>
    
       
        <v-layout row wrap>
    <v-flex   v-for= "item in filtered" :key= "item.id" xs12 sm6 md3 lg3 class="post">
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
</div>

</template>
<script>

import db from './firebaseinit.js';
import firebase from 'firebase';
import { mapGetters } from 'vuex'
  export default {

    data () {
      return {
        Userprojects: [],
        tabs: null,
        Filteredtext : '',
        tabsName: ['Engineering', 'Biochemistry','Law','Physics','Archi']
    }
    },
    created(){
          db.collection('projects').get().then(
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
    },
      computed:{ 
       ...mapGetters ([
             'getProject',
             'getCategory'
         ]),

      filtered(){
         const search = this.Filteredtext.toLowerCase().trim();

   if (!search) return this.Userprojects;

   return this.Userprojects.filter(c => c.title.toLowerCase().indexOf(search) > -1);

      //  return this.Userprojects.filter(post => {
      //   return post.toLowerCase().includes(this.Filteredtext.toLowerCase())
      // });
    }
    }
  }
</script>
<style scoped>
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
  .content {background: white;padding: 40px 80px 80px 80px;}
  .banner-title {color:white; font-size:45px;}
  .banner-subheader {text-align: justify; font-size: 18px; color:white;margin-top: 16spx;}
  .banner-btn {color:rgb(83, 24, 179);}
  .search-f {text-emphasis-color: rgb(250, 182, 187);}
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
  .headline {font-size: 6px;}
  .post-card {box-shadow: 1px 5px 30px -3px #e7e7e7;}
  .post {padding-right: 10px; padding-left : 10px;margin-top: 30px;}
  .content {background: white;padding: 40px 10px 40px 10px;}
  .banner-title {color:white; font-size:30px;}
  .banner-subheader {text-align: justify; font-size: 13px; color:white;margin-top: 16spx;}
  .banner-btn {color:rgb(83, 24, 179);}
  .search-f {text-emphasis-color: rgb(250, 182, 187);}
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
  .headline {font-size: 6px;}
  .post-card {box-shadow: 1px 5px 30px -3px #e7e7e7;}
  .post {padding-right: 10px; padding-left : 10px;margin-top: 30px;}
  .content {background: white;padding: 40px 10px 40px 10px;}
  .banner-title {color:white; font-size:30px;}
  .banner-subheader {text-align: justify; font-size: 13px; color:white;margin-top: 16spx;}
  .banner-btn {color:rgb(83, 24, 179);}
  .search-f {text-emphasis-color: rgb(250, 182, 187);}
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
  .headline {font-size: 6px;}
  .post-card {box-shadow: 1px 5px 30px -3px #e7e7e7;}
  .post {padding-right: 10px; padding-left : 10px;margin-top: 30px;}
  .content {background: white;padding: 40px 10px 40px 10px;}
  .banner-title {color:white; font-size:30px;}
  .banner-subheader {text-align: justify; font-size: 13px; color:white;margin-top: 16spx;}
  .banner-btn {color:rgb(83, 24, 179);}
  .search-f {text-emphasis-color: rgb(250, 182, 187);}
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
