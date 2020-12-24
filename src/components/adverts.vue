<template>
  <div class="advertCards">
    <h1>Browse all adverds</h1>
    <hr>
    <div class="advertCardsUI">
    <router-link tag="div" :to="{path: `/card/${advert._id}`}" class="advertCard shadow"
      v-for="advert in adverts" :key="advert.title">
      <img src="../assets/testimg.jpg" alt="img">
      <hr>
      <h1 class="advertTitle">{{ advert.title }}</h1>
      </router-link>
      </div>
    </div>

</template>

<script>
  import Card from './card';
  import axios from 'axios'

export default {
  name: 'advertCards',
  components: Card,
  data() {
    return { 
      adverts: {}
      }
    },
    mounted () {
      this.getAdverts()
    },
    methods: {
    getAdverts() {
      axios.get('http://localhost:3000/adverts')
      .then((response) => {
        return this.adverts = response.data
      })
      .catch(function(error) {
        console.log(error);
      })
    }
  }
  
}
</script>

<style scoped>
.advertCardsUI {
  user-select: none; 
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-direction: row;
  flex-flow: wrap;
  justify-content: space-around ;
}
.advertCard {
  font-family: 'Raleway', sans-serif;
  background-color: #fff;
  width: 280px;
  border-radius: 8px;
  padding: 1em;
  margin: 1em;
  transition: all 1s;
}
.advertCard:hover {
  background-color: rgb(209, 207, 207);
}
.advertCard:active {
  background-color: black;
  color: white;
  transition: background-color;
}
.advertTitle {
  text-align: center;
}
img {
  max-width: 280px;
  height: 200px;
}
.advert123 {
  width: 100px;
  height: 100px;
  background-color: blue;
}
</style>