<template>
    <div>
          <div class= "banner2">  
       </div> 
            <div class= "content">
      <center> <v-card class= "content-box">
      <v-flex
        xs12
        sm6
        md8
        align-center
        justify-center
        layout
        text-xs-center
      >
        <v-avatar
          :size= 120
          color="grey lighten-4"
        >
         <img src="../assets/user.png" alt="" width="200px" class="logo">
        </v-avatar>
      </v-flex>
       <v-snackbar
      v-model="snackbar"
      absolute
      top
      right
      color="success"
    >
      <span>Registration successful!</span>
      <v-icon dark>check_circle</v-icon>
    </v-snackbar>
      <br>
       <v-tabs fixed-tabs>
    <v-tab>
     Login
    </v-tab>
     <v-tab>
      Signup
    </v-tab>
    <v-tab-item>
        <v-card flat>
      
           <br><br>
      <v-form ref="form" v-model="valid" lazy-validation>
    <v-text-field
      v-model="Lemail"
      :rules="LemailRules"
      label= "E-mail"
      required
    ></v-text-field>
        <v-text-field
        hint="At least 8 characters"
        type="password"
      v-model="Lpassword"
      :rules="LpasswordRules"
      label= "Password"
      required
    ></v-text-field>
  <br><br>
    <v-btn
    @click= "Login"
      :disabled="!valid"
      style="color:white;background: rgb(73, 28, 236);">
      LOGIN
    </v-btn>
  </v-form>

        </v-card>
      </v-tab-item>
        <v-tab-item>
        <v-card flat>
         
         <br><br>
      <v-form ref="form" v-model="valid" lazy-validation>
    <v-text-field
      v-model="Susername"
      :rules="SnameRules"
      :counter="15"
      label= "Username"
      required
    ></v-text-field>
    <v-text-field
      v-model="Semail"
      :rules="SemailRules"
      label= "E-mail"
      required
    ></v-text-field>
      <v-text-field
       hint="At least 8 characters"
        type="password"
      v-model="Spassword"
      :rules="SpasswordRules"
      label= "Password"
      required
      loading
    >
      <v-progress-linear
        slot="progress"
        :value="progress"
        :color="color"
        height="7"
      ></v-progress-linear>
    </v-text-field>
  <br><br>
    <v-btn
      :disabled="!valid"
      @click="register"
      style="color:white;background: rgb(73, 28, 236);">
      SIGNUP
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
           date: new Date(),
          valid: false,
          snackbar: false,
          Lemail : '',
          Lpassword: '',
         
      LemailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+/.test(v) || 'E-mail must be valid'
      ],
      LpasswordRules: [
        v => !!v || 'Password is required',
      ],  
      SnameRules: [
        v => !!v || 'Name is required',
        v => (v && v.length <= 20) || 'Name must be less than 15 characters',
      ],
      Sactivity: 'Joined Coursesgram',
      Sname: '',
      Slocation: '',
      Sgender: '',
      Snumber: '',
      Sphoto: 'Press the save button to save photo',
       Susername: '',
          Semail : '',
          Spassword: '',
      SemailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+/.test(v) || 'E-mail must be valid'
      ],
      SpasswordRules: [
        v => !!v || 'Password is required',
      ]
         }
    },
    computed: {
      progress () {
        return Math.min(100, this.Spassword.length * 10)
      },
      color () {
        return ['error', 'warning', 'success'][Math.floor(this.progress / 40)]
      }
    },
    methods: {
        clear () {
       this.Susername = '',
       this.Spassword = '',
       this.Semail = ''
      },
        register(e){
                     db.collection('users').doc(this.Semail).set({
          Username: this.Susername,
        Email: this.Semail, 
         Password: this.Spassword,
         Fullname: this.Sname,
      Location: this.Slocation,
      Gender: this.Sgender,
      PhoneNumber: this.Snumber,
     PhotoUrl: this.Sphoto
       }).then(   db.collection('users').doc(this.Semail).collection('Activity').add({
                      Date : this.date,
                      Activity: this.Sactivity
})
)
       .then(
         firebase.auth().createUserWithEmailAndPassword(this.Semail,this.Spassword)
          .then( user => {
               this.snackbar = true
              this.clear();
              this.$router.go({ path: this.$router.path })
          },
          err => {
              alert(err.message);
          }
          )
       )
       .catch(error => console.log(err))
    e.preventDefault();
      },
            Login(e){
          firebase.auth().signInWithEmailAndPassword(this.Lemail,this.Lpassword)
          .then( user => {
              alert("You are Logged in");
              this.$router.go({ path: this.$router.path })
          },
          err => {
              alert(err.message);
          }
          );


       e.preventDefault();
       
      }
    }
  }
</script>





<style scoped>
.content { padding: 80px 0px 80px 0px; background: white;}
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
  .content { padding: 70px 70px 70px 70px; background: white;}
.content-box {box-shadow: 1px 5px 30px -3px #e4e4e4;padding: 50px 15px 50px 15px; width:auto;}
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
 .content { padding: 40px 0px 40px 0px; background: white;}
.content-box {box-shadow: 1px 5px 30px -3px #e4e4e4;padding: 50px 15px 50px 15px; width:auto;}
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
.content { padding: 40px 20px 40px 20px; background: white;}
.content-box {box-shadow: 1px 5px 30px -3px #e4e4e4;padding: 50px 15px 50px 15px; width:auto;}
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
