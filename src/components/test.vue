<template>
 <div class="row">
   <form @submit.prevent class="col s12">
     <br>
     <br>
           <input type= "text" v-model="form.employ_id" required style = "background:red">
    <br><br>
           <input type= "text" v-model="form.name" required style= "background:blue">
<br><br>
      <v-btn
      @click="submit"
      >UPLOAD PROJECT</v-btn>
   </form>
  </div>
</template>

<script>
import db from './firebaseinit.js'
export default {
  data(){
    const defaultForm = Object.freeze({
      employ_id : '',
      name: ''
      })
    return{
      form: Object.assign({}, defaultForm)
    }
  },
  methods:{
     submit(){
       db.collection('macho').add({
         employ_id : this.form.employ_id,
         name : this.form.name,
       })
       .catch(error => console.log(err))
     }
   
  }
}
</script>
