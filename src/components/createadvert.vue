<template>
  <div id="CreateAdvert">
    <h1>Create your advert</h1>
    <hr>
    <div class="advertform">
        <input placeholder="Title" maxlength="13" v-model="title" type="text">
        <hr>
        <textarea rows="4" placeholder="Enter description" v-model="text"></textarea>
        <button class="btn" v-on:click="addAdvert()">CREATE ADVERT</button>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import router from '../router/index.js'
export default {
  name: 'CreateAdvert',
  data() {
    return { 
        title : '',
        text : ''
    }
  },
  methods: {
    addAdvert() {
      var body = {
        title: this.title,
        text: this.text
      }
      if (this.title && this.text){
      this.title = '';
      this.text = '';
        axios({
          method: 'post',
          url: 'http://localhost:3000/createadvert',
          data: body
        })
        .then(function (response) {
          console.log(response);
          if (response.status === 200) {
            console.log(response.data)
          }
        })
        .catch(function (error) {
          console.log(error);
        });
      }
      router.go(0);
    }
  }
}
</script>

<style scoped>
textarea {
  text-align: center;
  width: 70%;
  display: block;
  margin: 0 auto;
  border: none;
  font-family: 'Raleway', sans-serif;
  font-size: 26px;
  font-weight: 800;
  resize: none;
}
.btn {
  display: block;
  margin: 0 auto;
}
</style>