<template>
<div id="Pannel" class="shadow mainColor">
  <img class="logo shadow" src="../assets/advertslogo1.png" alt=""/>
  <div class="vLine shadow"></div>
    <div class="btnContainer">
    <a href="#" class="btn shadow profileBtn">MY PROFILE</a>
    <router-link tag="a" :to="{path: `/createadvert`}" class="btn shadow">CREATE ADVERT
    </router-link>
    <router-link tag="a" :to="{path: `/login`}" v-if="!hasToken" class="btn shadow">SIGN IN</router-link>
    <a v-else v-on:click="logOut" class="btn shadow">LOG OUT</a>
    </div>
</div>
</template>

<script>
export default {
  name: 'Pannel',
  data() { 
    return {
      hasToken: false
    }
  },
    mounted() {
    if (localStorage.getItem('token')) {
      this.hasToken = true;
    }
  },
  methods: {
    logOut() {
      localStorage.removeItem('token')
      window.location.reload()
    }
  }
  }

</script>

<style>
#Pannel {
  display: flex;
  padding: 10px;
  height: 55px;
}
.vLine {
  padding: 0;
  margin-left: 30px;
  width: 1.5px;
  border-radius: 1px;
  background-color: rgb(218, 215, 223);
}
.logo {
  height: 55px;
}
.btnContainer {
  display: flex;
  justify-content: flex-end;
  width: 100%;
}
</style>