<template>
  <div class="adverts">
    <h1>Adverts</h1>
    <hr>
    <div class="navigation">
      <div class="navigation-container">
        <button class="btn-nav mainColor shadow" @click="prevPage()" v-if="options.hasPrevPage">Back page</button>
        </div>
      <div class="navigation-container">
        <button class="btn-nav mainColor shadow" @click="nextPage()" v-if="options.hasNextPage">Next Page</button>
      </div>
    </div>
    <div class="advert-view">
      <div class="side-menu shadow">
        <div class="categories">
          <div class="category-item">
            <button class="btn btn-category"
              @click="$router.push({name: 'Adverts', params: {page: 1}})"
              >All adverts
            </button>
          </div>
          <div class="category-item" v-for="category in categories.name" 
            :key="category"
            @click="$router.push({name: 'Adverts', params: {page: 1, category: category}})"> 
              <button class="btn btn-category" >{{ category }}</button>
          </div>
        </div>
      </div>
      <div class="advert-cards">
        <div v-if="options.totalDocs === 0" class="no-adverts">
          <h1>No adverts found</h1>
        </div>
          <div class="advert-card shadow"
            v-for="doc in options.docs"
            :key="doc._id"
            @click="$router.push({ name: 'AdvertCard', params: { id: doc._id } })"
          >
          <div class="image-container">
            <img :src="doc.file" alt="img">
          </div>
          <h4 class="advert-title">{{ doc.title }}</h4>
          <hr>
          <p 
            @click="$router.push({name: 'Adverts', params: {page: 1, category: category}})">
              Category:
                <a class="category-link">
                  {{doc.category}}
                </a>
          </p>
          <p>Publicated: {{doc.date}}</p>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
import { Advert } from '../services/adverts';
import { Categories } from '../services/categories';

export default {
  name: 'Adverts',
  data() {
    return {
      options: {},
      categories: {}
    };
  },
  mounted() {
      Advert.getAdverts(this.$route.params.category , this.$route.params.page)
        .then((res) => {
          this.options = res.data
          console.log(res.data)
          console.log('My options: ', this.options)
      })

    Categories.getCategories()
      .then((res) => this.categories = res.data)
      .catch((error) => error);
  },
methods: {
  nextPage() {
    let page = this.options.nextPage;
    let category = this.$route.params.category;
    this.$router.push({name: 'Adverts', params: {page, category}})
    Advert.getAdverts(page, category)
      .then((res) => {
        this.options = res.data
        console.log('My options: ', this.options)
      });
  },
    prevPage() {
      let page = this.options.prevPage;
      let category = this.$route.params.category;
      this.$router.push({name: 'Adverts', params: {page, category}})
      Advert.getAdverts(page, category)
        .then((res) => {
          this.options = res.data
          console.log('My options: ', this.options)
      })
    }
},
  watch: {
    '$route.params.category': function(category) {
        Advert.getAdverts(category, 1)
          .then((res) => {
            console.log(res.data)
            this.options = res.data
          });
      },
      '$route.params.page': function(page) {
        Advert.getAdverts(this.$route.params.category ,page)
          .then((res) => {
            console.log(res.data)
            this.options = res.data
          });
      }
    }
};
</script>

<style scoped>
.advert-view {
  display: flex;
  flex-direction: row;
}
.navigation {
  height: 50px;
  display: flex;
  justify-content: space-between;
  width: 12%;
  margin: 0 auto;
}
.btn-nav {
  border: none;
  cursor: pointer;
  font-size: 1em;
  font-weight: 600;
  padding: 5px;
}
.btn-nav:focus {
  outline: none;
}
.side-menu {
  height: 100vh;
  min-width: 150px;
  background-color: rgb(200, 190, 216);
  border-radius: 6px;
}
.categories {
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  list-style: none;
}
.btn-category {
  background-color:transparent;
  border: none;
  width: 100%;
}
.btn-category:focus {
  outline: none;
}
.category-link {
  background-color: rgb(200, 190, 216);
  padding: 5px;
  border-radius: 6px;
  display: inline-block;
  z-index: 9999;
}
.advert-cards {
  width:70%;
  user-select: none;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
}
.advert-card {
  user-select: none;
  margin: 20px;
  font-family: 'Raleway', sans-serif;
  background-color: #fff;
  width: 320px;
  height: 400px;
  border-radius: 8px;
  transition: all 1s;
}
.advert-card:hover {
  background-color: rgb(209, 207, 207);
}
.advert-card:active {
  background-color: black;
  color: white;
  transition: background-color;
}
.advert-title {
  padding: 0px 20px 0px 20px;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden; 
}

img {
  display: block;
  width: 100%;
  height: 180px;
  margin: 0 auto;
}
p {
  padding-left: 15px;
  margin-top: 30px;
  display: block;
  font-size: 0.8em;
}
</style>
