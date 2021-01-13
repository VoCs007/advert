<template>
  <div class="registration">
    <div class="header">
      <h1>Registration</h1>
      <hr>
    </div>
  <form id="registration" novalidate="true">
    <div class="registration-form shadow">
      <Errors v-if="errors.length">
      <li slot="error" v-for="error in errors" :key="error">{{ error }}</li>
      </Errors>
      <div class="name">
        <h4>Name</h4>
        <div class="name-input">
          <input type="text" placeholder="name" id="name" maxlength="16"
            @keypress="noNumber"
            v-model="user.name"
            name="name">
        </div>
      </div>
      <div class="email">
        <div class="mail-header">
          <h4>@mail</h4>
        </div>
        <div class="email-input">
          <input type="email" placeholder="@mail" id="email"
          v-model="user.email"
          @keypress="email"
          name="email">
        </div>
      </div>
      <div class="password">
        <div class="password-header">
          <h4>Create password</h4>
        </div>
        <div class="password-input">
          <input type="password" placeholder="password" v-model="user.password" name="password">
        </div>
      </div>
      <div class="password-re">
        <div class="password-header-re">
          <h4>Re-enter password</h4>
        </div>
        <div class="password-input-re">
          <input type="password" placeholder="re-enter password" v-model="user.rePassword" name="rePassword">
        </div>
      </div>
      <div class="submit">
        <input
        class="btn"
          type="button"
          value="Submit"
          @click="checkForm"
        >
      </div>
    </div>
  </form>
  </div>
  
</template>

<script>
import { Auth } from '../services/auth';
import Errors from '../components/errors.vue'
export default {
  name: 'Registration',
  components: {Errors},
  data: function() {
    return {
      errors: [],
      user: {
        name: '',
        email: '',
        password: '',
        rePassword: ''
      }
    }
  },
  methods: {
    send: function(data) {
      const user = {
        name: data.name,
        email: data.email,
        password: data.password
      }
      Auth.createUser(user)
      .then(() => {
        this.$router.push({name: 'Login'})
      })
      .catch((error) => {
        console.log(error)
        this.errors.push('You are registered already')
      })
    },
    checkForm: function (evt) {
      this.errors = [];
      if(this.user.name.length < 2) {
        this.errors.push('Name must contain at least 2 letters')
      }
      if (!this.user.email) {
        this.errors.push('Please enter your @mail.');
      } else if (!this.validEmail(this.user.email)) {
        this.errors.push('@mail must be correct');
      }
      if(!this.user.password) {
        this.errors.push('Create password')
      } else if (this.user.password.length < 8) {
        this.errors.push('Password must contain at least 8 letters')
      }
      if(this.user.password != this.user.rePassword){
        this.errors.push('Passwords dont match')
      }
      if (!this.errors.length) {
        this.send(this.user)
        return true;
      }
      evt.preventDefault();
    },
    validEmail: function (email) {
      const check = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return check.test(email);
    },
    noNumber: function(evt) {
      const regex = new RegExp("^[a-zA-Z]+$");
      const key = String.fromCharCode(!evt.charCode ? evt.which : evt.charCode);
      if (!regex.test(key)) {
        event.preventDefault();
        return false;
      }
      },
      email: function(evt) {
        const regex = new RegExp("^[a-zA-Z0-9@.]+$");
        const key = String.fromCharCode(!evt.charCode ? evt.which : evt.charCode);
        if (!regex.test(key)) {
          event.preventDefault();
          return false;
        }
      }
  }
}
</script>

<style scoped>
.problems {
  font-family: 'Raleway', sans-serif;
}
h4 {
  text-align: left;
  color: gray;
}
.wrong {
  color: red;
}
.btn {
  margin-top: 10px;
  border: none;
  background-color:rgb(200, 190, 216);
}
.submit {
  width: 101%;
  margin-top: 20px;
}
.registration-form {
  margin: 0 auto;
  padding: 20px 30px 20px 20px;
  max-width: 600px;
  background-color: #fff;
  border-radius: 6px;
}
input {
  width: 100%;
  text-align: center;
}

</style>