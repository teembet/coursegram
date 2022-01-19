<template>
    <div>
          <div class= "banner2">  
       </div> 
            <div class= "content">
      <center> <v-card class= "content-box">
         <v-flex xs12 sm6 md4>
      </v-flex>
       <v-snackbar
      v-model="snackbar"
      absolute
      top
      right
      color="success"
    >
      <span>Operation successful!</span>
      <v-icon dark>check_circle</v-icon>
    </v-snackbar>
      <br>
       <v-tabs fixed-tabs>
    <v-tab>
     Add Category
    </v-tab>
     <v-tab>
     Delete Post
    </v-tab>
    <v-tab-item>
        <v-card flat>
      
           <br><br>
      <v-form ref="form" v-model="valid" lazy-validation>
    <v-text-field
      v-model="category"
      :rules="catRules"
      label= "Category"
      required
    ></v-text-field>
  <br><br>
    <v-btn
      :disabled="!valid"
      @click="Addcat"
      style="color:white;background: rgb(73, 28, 236);">
      ADD
    </v-btn>
  </v-form>

        </v-card>
      </v-tab-item>
        <v-tab-item>
        <v-card flat>
         
         <br><br>
      <v-form ref="form" v-model="valid" lazy-validation>
    <v-text-field
      v-model="projectId"
      :rules="IdRules"
      :counter="8"
      label= "Project Id"
      required
    ></v-text-field>
   
  <br><br>
    <v-btn
      :disabled="!valid"
      @click="DeletePost"
      style="color:white;background: rgb(73, 28, 236);">
      DELETE
    </v-btn>
  </v-form>
        </v-card>
      </v-tab-item>
  </v-tabs>
      
        </v-card>
        </center> 
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
          valid: false,
          snackbar: false,
          category: '',
          projectId: '',
          IdRules : [
        v => !!v || 'Project Id is required',
        v => (v && v.length <= 8) || 'Project Id must be less than 8 characters',
      ],
      catRules : [
        v => !!v || 'Category is required',
      ]
      ,

         }
    },
    methods: {
        clear () {
       this.Susername = '',
       this.Spassword = '',
       this.Semail = ''
      },
         Addcat () {
               db.collection('categories').add({
          Name: this.category,
       })
       .then(
         this.snackbar = true,
         this.category = '')
       .catch(error => console.log(err))

        
      },
        DeletePost(e){
        db.collection('categories').add({
       })
       .catch(error => console.log(err))
    e.preventDefault();
      }
    }
  }
</script>





<style scoped>
.content { padding: 80px 100px 80px 100px; background: white;}
.content-box {box-shadow: 1px 5px 30px -3px #e4e4e4;padding: 50px 50px 50px 50px; width:500px;}
.banner2 {    
  height: 50px;
  background-image:url('../assets/banner2.jpg');
  background-position: 0px 0px, 50% 0px;
  background-size: cover;
  background-repeat: no-repeat;
  background-attachment: scroll, scroll;
}
</style>
