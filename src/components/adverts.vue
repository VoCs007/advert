<template>
  <div class="advert">
    <button v-on:click="data()">Получить список</button>
      <div class="userCards">
        <div class="userCard" v-for="user in users" :key="user.name">
        <p>Name: {{ user.name }}</p>
        <p>@mail: {{user.email}}</p>
        <p>Role: {{user.role}}</p>
        </div>

    </div>
  </div>
</template>

<script>
export default {
  name: 'adverts',
  props: {
    msg: String,
    users: {}
  },
  methods: {
  data() {
    const axios = require('axios');
    axios.get('http://localhost:3000/users')
  .then((response) => {
    console.log(response.data);
    return this.users = response.data;
  })
  .catch(function (error) {
    console.log(error);
  })
  }
}
} 
</script>

<style scoped>
.userCards {
  display: flex;
  flex-direction: row;
  justify-content: center;
}
.userCard {
  max-width: 350px;
  border: 1px solid black;
  border-radius: 8px;
  padding: 1em;
  margin: 1em;
}
</style>