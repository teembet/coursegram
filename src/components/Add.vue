<template>
<div>
       <div class= "banner2">  
       </div>  

       <div class= "content">
  <v-btn @click= "back"  style="color:white; background: rgb(73, 28, 236);"> GO BACK </v-btn>
  <br>
  <br>
           <v-layout row>
    <v-flex xs12 sm12>
      <v-card class= "content-box">
          <h2>UPLOAD A PROJECT</h2>
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
              v-model= "form.title"
              :rules= "rules.title"
              color="#7246eb"
              label="Project Title"
              required
            ></v-text-field>
          </v-flex>
            <v-flex xs12 sm6>
               <v-text-field
              v-model= "form.categoryChosen"
              :rules= "rules.categoryChosen"
              color="#7246eb"
              label="Category eg. Engineering, Law, Medicine, BioChemistry, Economics etc"
              required
            ></v-text-field>
          </v-flex>
          <v-flex xs12 sm12>
              <v-chip class="form-url"> {{ form.projectId }}</v-chip>
              <v-btn style= "color:white;background: rgb(170, 144, 212);"
             @click= "generate"
             >GENERATE projectId</v-btn>
          </v-flex>
             
         <v-flex xs12 >
            <v-textarea
              v-model= "form.summary"
              :rules= "rules.summary"
              color="#7246eb"
              required
              maxlength = 160
      
            >
              <div slot="label">
                Summary
              </div>
            </v-textarea>
          </v-flex>
          <v-flex xs12>
            <v-textarea
            :rules= "rules.abstract"
              v-model= "form.abstract"
              color= "#7246eb"
              required
            >
              <div slot="label">
                Abstract
              </div>
            </v-textarea>
          </v-flex>
          <v-flex xs12>
              <center>
        <v-btn class= "dropbox" @click = "openFile" flat >
          <center> <p>Choose File (Pdf,Word document.etc)</p></center>
            </v-btn>
            <input type= "file" ref="fileInput" accept="/*" @change= "pickedFile">
            
            </center>
            <br><br>
             <v-snackbar
      v-model="snackbar2"
      absolute
      left
      color="success"
    >
      <span>Operation Successful</span>
      <v-icon dark>check_circle</v-icon>
    </v-snackbar>
            <br>
            
            <v-flex xs12 sm12>
              <v-chip class="form-url"> {{ form.url }}</v-chip>
              <v-btn style="color:white;background: rgb(170, 144, 212);" @click= "saveFile"
             >SAVE FILE</v-btn> <p v-if = "show" ><em>This may take some seconds</em></p>
          </v-flex>
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
        >UPLOAD PROJECT</v-btn>
      </v-card-actions>
    
    </v-form> 
  </v-card>
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
        title: '',
        categoryChosen: '', 
         projectId: 'Press the button to generate your projectId',
        summary: '',
        abstract: '',
        url: 'Press the save button',
        
      })

      return {
        show: false,
       date: new Date(),
        user: '',
        getUser: '',
        max: 160,
     fileUrl : null,
      file: null,
        form: Object.assign({}, defaultForm),
        rules: {
          title: [val => (val || '').length > 0 || 'This field is required'],
           categoryChosen: [val => (val || '').length > 0 || 'This field is required'],
             summary: [val => (val || '').length > 0 || 'This field is required'],
              abstract: [val => (val || '').length > 0 || 'This field is required'],
              
        },
        category: ['Engineering', 'Art', 'Economics', 'Medicine'],
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
         this.form.title &&
         this.form.categoryChosen &&
         this.form.summary &&
         this.form.abstract
        
        )
      }
    },
  created(){
            if(firebase.auth().currentUser){

                this.getUser = firebase.auth().currentUser.email;
                 db.collection('users').where('Email', '==', this.getUser).get().then(
        querySnapshot => {
          querySnapshot.forEach(doc =>{
            this.user = doc.data().Username
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
               db.collection('projects').add({
          title: this.form.title,
        categoryChosen: this.form.categoryChosen, 
         projectId: this.form.projectId,
        summary: this.form.summary,
        abstract: this.form.abstract,
        url: this.form.url,
        username: this.user,
        userEmail: this.getUser
       }).then(   db.collection('users').doc(this.getUser).collection('Activity').add({
                      Date : this.date,
                      Activity: "Uploaded the project with title: " + this.form.title
})
)
       .then(docRef => this.$router.push('/dashboard'))
       .catch(error => console.log(err))

        this.snackbar = true
        this.resetForm()
      },
      saveFile(){
        this.show = true;
  var uploadTask = firebase.storage().ref('projects/' + this.file.name).put(this.file)
   
  uploadTask.then((snapshot) => { snapshot.ref.getDownloadURL().then((url => {
       console.log(url);
       this.form.url = url ; 
       this.snackbar2 = true;
    }));
});
    
     
     },
      resetForm () {
       this.form.title = '';
      this.form.categoryChosen = '';
      this.form.projectId = 'Press the button to generate your projectId';
    this.form.summary = '';
    this.form.abstract = '';
    this.form.url = 'Press the save button';
      },
       openFile(){
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
     generate(){
         var text = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (var i = 0; i < 8; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));
    this.form.projectId = text;
     },
     back(){
       this.$router.go(-1);
     }
    }
}
</script>

<style scoped>
.form-url { width:200px;overflow: hidden; text-overflow: ellipsis;white-space: nowrap}
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
  }



  @media (max-width: 991px) {
    .form-url { width:100px;overflow: hidden; text-overflow: ellipsis;white-space: nowrap}
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

  }
}

@media (max-width: 767px) {
  .form-url { width:100px;overflow: hidden; text-overflow: ellipsis;white-space: nowrap}
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
    width: 220px;
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
    font-size: 9px;;
    text-align: center;

  }
}

@media (max-width: 479px) {
  .form-url { width:200px;overflow: hidden; text-overflow: ellipsis;white-space: nowrap}
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
    width: 220px;
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
    font-size: 8px;;
    text-align: center;

  }

}
</style>
