<template>
  <div class="search">
    <input type="text" class="search-input" placeholder="SEARCH" v-model="search">
    <a class="btn" @click="findText"> SEARCH </a>
  </div>
</template>

<script>
import { Advert } from '../services/adverts.js'
export default {
  name: 'search',
  data: function() {
    return {
      search: '',
      adverts: {}
    }
  },
  methods: {
    findText() {
      Advert.findAdverts(this.search)
      .then((res) => {
        this.adverts = res.data
        console.log(this.adverts)
      })
      .catch((error) => {
        console.log(error)
      })
    }
  }
};
</script>

<style scoped>
.search {
  display: flex;
  width: 100%;
  margin-left: 50px;
  height: 100%;
}
.search-input {
  margin: 0 auto;
  text-align: center;
  width: 100%;
  vertical-align: middle;
  border: none;
}
</style>
