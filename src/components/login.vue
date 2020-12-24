<template>
  <div id="Login">
    <h1>You can Log In or <router-link to="/register" tag="h1">Register</router-link></h1>
    <hr>
    <input placeholder="@mail" maxlength="30" v-model="email" type="text">
    <input placeholder="password" maxlength="16" v-model="password" type="password">
    <button class="btn" v-on:click="logIn()">LOGIN</button>
  </div>
</template>

<script>
import axios from 'axios'
import router from '../router'
export default {
  name: 'Login',
  data: function() {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    logIn() {
      var payload = {
        email: this.email,
        password: this.password
      }
      axios({
          method: 'post',
          url: 'http://localhost:3000/login',
          data: payload
        })
        .then(function (response) {
          if (response.status === 200) {
            if (response.data.token != undefined) {
              localStorage.setItem('token', response.data.token);
              router.push('/')
            } else return
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    }
    }
  }
</script>

<style scoped>
.btn {
  display: block;
  margin: 0 auto;
}
</style>