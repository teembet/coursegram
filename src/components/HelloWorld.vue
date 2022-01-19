<template>
<div id="app">
  <div class="search-wrapper">
    <input type="text" v-model="search" placeholder="Search title.."/>
        <label>Search title:</label>
  </div>
  <div class="wrapper">
    <div class="card" v-for="post in filteredList" :key='post.id'>
        <p>posted by: {{ post }}</p>
    </div>
  </div>
</div>

</template>

<script>

export default {
 data() {
   return {
      search: '',
    postList : ['Apple','Bannana','Guava','React', 'Vue']
   }
   
  },
  computed: {
    filteredList() {
      return this.postList.filter(post => {
        return post.toLowerCase().includes(this.search.toLowerCase())
      })
    }
}
}
</script>

<style scoped>
html, body {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin-top: 16px;
  margin-bottom: 16px;
}
div#app {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}
.search-wrapper {
    position: relative;}
    label {
      position: absolute;
      font-size: 12px;
      color: rgba(0,0,0,.50);
      top: 8px;
      left: 12px;
      z-index: -1;
      transition: .15s all ease-in-out;
    }
</style>
