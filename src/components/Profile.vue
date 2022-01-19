<template>
<div>
       <div class= "banner2">  
       </div>  
       
       <div class= "content"> 
         
            <v-layout row wrap>
               <v-flex xs12 sm12 md3>
                  <v-card flat class="profile-part">
         <center> 
           <img :src= "form.url" alt="" width="150px" v-if = "imgS">
           <img :src="fileUrl" height="150">
         <img :src="file">
           <br>
           <br>
           
           <v-btn style="color:white;background: rgb(170, 144, 212);" @click = "openFile">Upload Photo</v-btn>
           <br>
           <input type= "file" ref="fileInput" accept="image/*" style="display: none;" @change="pickedFile">
          <v-chip class="form-url"> {{ form.url }}</v-chip>
          <br>
              <v-btn style="color:white;background: rgb(170, 144, 212);" @click= "saveFile"
             >SAVE PHOTO</v-btn> <p v-if = "show" ><em>This may take some seconds</em></p>
             <v-snackbar
      v-model="snackbar2"
      absolute
      left
      color="success"
    >
      <span>Operation Successful</span>
      <v-icon dark>check_circle</v-icon>
    </v-snackbar>
        </center>
         
        </v-card>
               </v-flex>
                <v-flex xs12 sm12 md9 class= "main-content">
        <v-card flat>
        </v-card>
            <v-flex xs12 sm12>
      <v-card class= "content-box">
          <h2>UPDATE PROFILE</h2>
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
    <v-form ref="form" @submit.prevent= "submit">
      <v-container grprojectId-list-xl fluprojectId>
        <v-layout wrap>
          <v-flex xs12 sm6>
            <v-text-field
              v-model= "form.name"
              :rules= "rules.name"
              color="#7246eb"
              label="Full Name eg. John Doe"
              required
            ></v-text-field>
          </v-flex>
            <v-flex xs12 sm6>
               <v-text-field
              v-model= "form.gender"
              :rules= "rules.gender"
              color="#7246eb"
              label="Gender eg.Male"
              required
            ></v-text-field>
          </v-flex>
          <v-flex xs12 sm6>
               <v-text-field
              v-model= "form.location"
              :rules= "rules.location"
              color="#7246eb"
              label="Location eg.Lagos,Nigeria"
              required
            ></v-text-field>
          </v-flex>
          <v-flex xs12 sm6>
               <v-text-field
              v-model= "form.number"
              :rules= "rules.number"
              color="#7246eb"
              label="Phone Number eg.+2349098835638"
              required
            ></v-text-field>
          </v-flex>
        </v-layout>
      </v-container>
      <br>
      <br>
      <v-card-actions>
        <v-btn flat @click = "resetForm">Cancel</v-btn>
        <v-spacer></v-spacer>
        <v-btn
         :disabled="!formIsValprojectId"
          color="primary"
          type="submit"
        >UPDATE PROFILE</v-btn>
      </v-card-actions>
    
    </v-form> 
  </v-card>
    </v-flex>
        </v-flex>
            </v-layout>
           
       </div>
</div>

</template>

<script>
import db from './firebaseinit.js'
import {  firebaseinit } from './firebaseinit.js'
import firebase from 'firebase'
import { mapGetters } from 'vuex'
export default {
    data () {
      const defaultForm = Object.freeze({
        name: '',
        gender: '', 
         location: '',
        number: '',       
        url: 'Press the save button to save photo' 
      })

      return {
        imgS: true,
         show: false,
        user: '',
        getUser: '',
     fileUrl : null,
      file: null,
        form: Object.assign({}, defaultForm),
        rules: {
          name: [val => (val || '').length > 0 || 'This field is required'],
           location: [val => (val || '').length > 0 || 'This field is required'],
            gender: [val => (val || '').length > 0 || 'This field is required'],
              number: [val => (val || '').length > 0 || 'This field is required'],
              
        },
        snackbar: false,
        snackbar2 : false,
        defaultForm
      }
    },
   

    computed: {
        ...mapGetters ([
             'getProject',
             'getCategory'
         ]),
      formIsValprojectId () {
        return (
         this.form.name &&
         this.form.gender &&
         this.form.location &&
         this.form.number
        
        )
      }
    },
  created(){
            if(firebase.auth().currentUser){

                this.getUser = firebase.auth().currentUser.email;
                 db.collection('users').where('Email', '==', this.getUser).get().then(
        querySnapshot => {
          querySnapshot.forEach(doc =>{
            this.user = doc.data().Username,
            this.form.name = doc.data().Fullname,
              this.form.location = doc.data().Location,
              this.form.gender = doc.data().Gender,
              this.form.number = doc.data().PhoneNumber,
              this.form.url = doc.data().PhotoUrl
          })
        } 
      )
            }
    },
    

    methods: {
       fetchData(){
      db.collection('users').where('Email', '==', this.getUser).get().then(
        querySnapshot => {
          querySnapshot.forEach(doc =>{
            this.user = doc.data().Username
          })
        } 
      )
    },
          submit () {
           db.collection('users').where('Email', '==', this.getUser).get().then(
        querySnapshot => {
          querySnapshot.forEach(doc =>{
            doc.ref.update(
            {
              Fullname : this.form.name,
              Location : this.form.location,
              Gender : this.form.gender,
              PhoneNumber: this.form.number,
              PhotoUrl: this.form.url
            }
            )
       .then(docRef => this.$router.push('/dashboard'))
       .catch(error => console.log(err))

        this.snackbar = true
        this.resetForm()
      })
        }
           )},
      saveFile(){
     this.show = true;
  var uploadTask = firebase.storage().ref('images/' + this.file.name).put(this.file)
   
  uploadTask.then((snapshot) => { snapshot.ref.getDownloadURL().then((url => {
       console.log(url);
       this.form.url = url ; 
       this.snackbar2 = true;
    }));
});
    
     
     },
      resetForm () {
       this.form.name = '';
      this.form.gender = '';
      this.form.location = '';
    this.form.number = '';
      },
       openFile(){
         this.imgS = false;
       this.$refs.fileInput.click()
     },
     pickedFile(event){
          const files = event.target.files
          let filename = files[0].name
          if(filename.lastIndexOf('.') <= 0){
          return  alert ('Please add a valprojectId file')
          } 
          const fileReader = new FileReader()
          fileReader.addEventListener('load', () => {
            this.fileUrl = fileReader.result
          } )
          fileReader.readAsDataURL(files[0])
          this.file = files[0]
     },
    }
}
</script>

<style scoped>
.form-url { width:150px;overflow: hidden; text-overflow: ellipsis;white-space: nowrap}
.back {color:white}
.content-box {box-shadow: 1px 5px 30px -3px #e4e4e4;padding: 50px 50px 50px 50px;}
.content { padding: 80px 100px 80px 100px; background: white;}
.nav-btn {color: rgb(83, 24, 179); }
.banner2 {    
  height: 80px;
  background-image:url('../assets/banner2.jpg');
  background-position: 0px 0px, 50% 0px;
  background-size: cover;
  background-repeat: no-repeat;
  background-attachment: scroll, scroll;
}
.dropbox {
    width: 500px;
    outline: 2px dashed grey; /* the dash box */
    outline-offset: -10px;
    background: rgb(181, 204, 204);
    color: dimgray;
    padding: 20px 20px;
    min-height: 200px; /* minimum height */
    position: relative;
    cursor: pointer;
  }
   .dropbox p {
    font-size: 13px;;
    text-align: center;
    padding: 50px 0;
  }



  @media (max-width: 991px) {
 .back {color:white}
.content-box {box-shadow: 1px 5px 30px -3px #e4e4e4;padding: 50px 20px 50px 20px;}
.content { padding: 40px 10px 40px 10px; background: white;}
.nav-btn {color: rgb(83, 24, 179); }
.banner2 {    
  height: 80px;
  background-image:url('../assets/banner2.jpg');
  background-position: 0px 0px, 50% 0px;
  background-size: cover;
  background-repeat: no-repeat;
  background-attachment: scroll, scroll;
}
.dropbox {
    width: 280px;
    outline: 2px dashed grey; /* the dash box */
    outline-offset: -10px;
    background: rgb(181, 204, 204);
    color: dimgray;
    padding: 20px 20px;
    min-height: 150px; /* minimum height */
    position: relative;
    cursor: pointer;
  }
   .dropbox p {
    font-size: 13px;;
    text-align: center;
    padding: 50px 0;
  }

}

@media (max-width: 767px) {
 .back {color:white}
.content-box {box-shadow: 1px 5px 30px -3px #e4e4e4;padding: 50px 20px 50px 20px;}
.content { padding: 40px 10px 40px 10px; background: white;}
.nav-btn {color: rgb(83, 24, 179); }
.banner2 {    
  height: 80px;
  background-image:url('../assets/banner2.jpg');
  background-position: 0px 0px, 50% 0px;
  background-size: cover;
  background-repeat: no-repeat;
  background-attachment: scroll, scroll;
}
.dropbox {
    width: 280px;
    outline: 2px dashed grey; /* the dash box */
    outline-offset: -10px;
    background: rgb(181, 204, 204);
    color: dimgray;
    padding: 20px 20px;
    min-height: 150px; /* minimum height */
    position: relative;
    cursor: pointer;
  }
   .dropbox p {
    font-size: 13px;;
    text-align: center;
    padding: 50px 0;
  }

}

@media (max-width: 479px) {
.back {color:white}
.content-box {box-shadow: 1px 5px 30px -3px #e4e4e4;padding: 50px 20px 50px 20px;}
.content { padding: 40px 10px 40px 10px; background: white;}
.nav-btn {color: rgb(83, 24, 179); }
.banner2 {    
  height: 80px;
  background-image:url('../assets/banner2.jpg');
  background-position: 0px 0px, 50% 0px;
  background-size: cover;
  background-repeat: no-repeat;
  background-attachment: scroll, scroll;
}
.dropbox {
    width: 280px;
    outline: 2px dashed grey; /* the dash box */
    outline-offset: -10px;
    background: rgb(181, 204, 204);
    color: dimgray;
    padding: 20px 20px;
    min-height: 150px; /* minimum height */
    position: relative;
    cursor: pointer;
  }
   .dropbox p {
    font-size: 13px;;
    text-align: center;
    padding: 50px 0;
  }

}
</style>
