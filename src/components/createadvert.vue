<template>
  <div class="create-advert">
    <h2 class="card-header">Advert description</h2>
    <div class="line"></div>
    <div class="advert-form">
        <input class="advert-input" placeholder="Title" maxlength="40" v-model="body.title" type="text">
        <br>
        <textarea rows="9" maxlength="2000" placeholder="Enter description..." v-model="body.text"></textarea>
        <input type="file" id="file" ref="file" accept="image/*,image/jpeg" class="custom-file-input" name="file">
        <h2>Select category</h2>
        <div class="categories">
        <select v-model="body.category" class="categories-select" name="category">
        <option
        v-for="category in categories" :key="category"
        :value="category"
        > {{ category }} 
        </option>
        </select>
        </div>
        <div class="errors">
          <ul>
            <li v-for="(error, index) in errors" :key="index"> {{ error }}</li>
          </ul>
        </div>
        <a href="#" class="btn btn-create" id="show-modal" @click="showModal = true">SUBMIT</a>
        <Model v-if="showModal" @close="showModal = false" @confirm="addAdvert()">
        <h2 slot="header">Create advert?</h2>
      </Model>
    </div>
  </div>
</template>

<script>
import { Advert } from '../services/adverts.js'
import { Categories } from '../services/categories.js'
import Model from '../components/model.vue'
import { Auth } from '../services/auth.js'
import router from '../router/index'
export default {
  name: 'createAdvert',
  components: {Model},
  data() {
    return { 
      body: {
          title: '',
          text: '',
          category: 'Other',
        creator: {
          id: localStorage.getItem('userID'),
          name: localStorage.getItem('userName')
        },
      },
    categories: [],
    showModal: false,
    errors: [],
    }
  },
  mounted() {
    Categories.getCategories()
    .then((res) => this.categories = res.data.name)
  },
  methods: {
      addAdvert() {
        var formData = new FormData();
        formData.append('title', this.body.title);
        formData.append('text', this.body.text);
        formData.append('file', this.$refs.file.files[0]);
        formData.append('category', this.body.category);
        formData.append('id', this.body.creator.id);
        formData.append('name', this.body.creator.name);
        this.errors = [];
        Advert.createAdvert(formData)
        .then((res) => {
          router.push({name: 'Adverts'})
        })
        .catch((error) => {
          this.errors.push('Token expired. You need to login again', error);
          this.showModal = false;
        })
}, 

}
}
</script>

<style scoped>
.advert-input {
  width: 100%;
  margin-bottom: 20px;
  padding: 0 15px 0 15px;
}
.create-advert {
  background-color: #fff;
  max-width: 800px;
  margin: 0 auto;
  border-radius: 10px;
}
.card-header {
  display: inline-block;
  text-align: left;
  margin-left: 20px;
}
.advert-form {
  padding-top: 20px;
  padding-bottom: 20px;
  margin: 0 auto;
  max-width: 80%;
}
textarea {
  margin: 0 auto;
  width: 100%;
  padding: 15px;
}
.btn-create {
  width: 150px;
  border-radius: 6px;
  text-align: center;
  margin: 0 auto;
  margin-top: 50px;
  border: 1px solid black;
}
.categories {
  display: flex;
  margin: 0 auto;
  flex-direction: row;
  justify-content: space-around;
  width: 50%;
}
.categories-select {
  width: 200px;
  font-size: 1.2em;
  border: none;
  outline: none;
}
.custom-file-input::-webkit-file-upload-button {
  visibility: hidden;
}
.custom-file-input::before {
  font-family: 'Raleway', sans-serif;
  content: 'Select file';
  display: inline-block;
  background: white;
  border: 1px solid #999;
  border-radius: 3px;
  padding: 10px 8px;
  outline: none;
  white-space: nowrap;
  user-select: none;
  cursor: pointer;
  text-shadow: 1px 1px #fff;
  font-weight: 700;
}
.custom-file-input:hover::before {
  border-color: black;
}
.custom-file-input:active::before {
  background: -webkit-linear-gradient(top, #e3e3e3, #f9f9f9);
}
</style>