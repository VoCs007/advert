/* eslint-disable */
<template>
  <div id="LoginComponent">
    <h3>Not registered yet?<a class="mainColor btn register" @click="$router.push({name: `Registration`})">register</a></h3>
    <hr>
    <div class="container">
      <input class="login-input" placeholder="@mail" maxlength="30" v-model="payload.email" type="text">
    </div>
    <div class="container">
      <input class="login-input" placeholder="password" maxlength="16" v-model="payload.password" type="password">
    </div>
    <a href="#" class="btn aBtn mainColor" v-on:click="logIn()">LOGIN</a>
    <Error v-if="showErrors">
      <li slot="error" v-if="error"> {{error}}</li>
    </Error>
  </div>
</template>

<script>
import { Auth } from '../services/auth.js';
import Error from '../components/errors.vue'
export default {
  name: 'LoginComponent',
  components: {Error},
  data: function() {
    return {
      payload: {  
        email: '',
        password: ''
      },
      error: '',
      showErrors: false
    }
  },
  methods: {
    logIn() {
      this.error = '';
        Auth.login(this.payload).then((response) => {
          localStorage.setItem('token', response.data.token);
          localStorage.setItem('userID', response.data.userInfo.id);
          localStorage.setItem('userName', response.data.userInfo.name);
          localStorage.setItem('Role', response.data.userInfo.role);
          localStorage.setItem('profile', response.data.userInfo.image);
          this.$router.push({ name: 'Adverts'});
          window.location.reload();
        })
        .catch((error) => {
          if(this.payload.email === '' || this.payload.password === '') {
            this.showErrors = true;
            this.error = 'Fill all fields'
          } else {
            this.showErrors = true;
            this.error = 'Wrong email or password'
          }
        })
    }
    }
  }
</script>

<style scoped>
.register {
  margin: 0 auto;
  margin-top: 10px;
  width: 50%;
  border-radius: 6px;
}
.container {
  padding-top: 10px;
  padding-bottom: 10px;
  padding-right: 20px;
}
.login-input {
  width: 100%;
  padding-left: 10px;
}
.aBtn{
  text-align: center;
  margin: 0 auto;
  border-radius: 6px;
}
#LoginComponent {
  padding: 10px;
  max-width: 350px;
  margin: 0 auto;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0,0,0,0.5);
}
</style>