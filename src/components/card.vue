<template>
  <div id="Card">
    <h1> {{ advert.title }} </h1>
    <hr>
    <img src='../assets/testimg.jpg'>
    <p>{{ advert.text }} </p>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'Card',
  data() {
    return { 
      advert: {}
      }
    },
    mounted () {
      this.getAdvert()
    },
  methods: {
    getAdvert() {
      axios.get(`http://localhost:3000/advert/${this.$route.params.id}`)
      .then((response) => {
        return this.advert = response.data
      })
      .catch(function(error) {
        console.log(error);
      })
  }
}
}
</script>

<style scoped>
img {
  max-width: 500px;
}
#Card {
  height: 500px;
  margin: 0 auto;
  text-align: center;
}
</style>