<template>
  <div class="advert-card">
    <div class="card-header">
      <h1 v-if="!showModify"> {{ payload.advert.title }} </h1>
      <a v-if="canDelete" class="delete"
        id="show-modal" @click="showModal = true"> <img class="delete-icon" src="../assets/icons/can.png" alt="Delete"> </a>       
    </div>
    <div v-if="!showModify" class="image-container">
      <img :src="payload.advert.file">
    </div>
    <p class="description" v-if="!showModify"> {{ payload.advert.text }}</p>
    <!--- Modify -------------------->
      <div v-if="showModify" class="modify-container">
        <h2>Title</h2>
        <input type="text" ref="title" :value="payload.advert.title">
        <h2>Image</h2>
        <label for="upload-photo" class="btn mainColor">Upload image</label>
        <input type="file" name="photo" ref="uploadImage" accept="image/*,image/jpeg" id="upload-photo"/>
        <h2>Description</h2>
        <textarea type="text" rows="9" maxlength="540" ref="text" :value="payload.advert.text"></textarea>
      </div>
    <div class="info">
    <p> <span class="sub"> creator: </span>{{ payload.advert.creator.name }}</p>
    <p> <span class="sub"> category: </span>{{ payload.advert.category }}</p>
    <p><span class="sub">Publicated: {{payload.advert.date}}</span></p>
    </div>
      <a class="btn btn-modify mainColor shadow" v-if="!showModify && canDelete" @click="showModify = true">Modify</a>
      <a class="btn btn-modify mainColor shadow" v-if="showModify" @click="updateAdvert()">Save</a>
      <Model v-if="showModal" @close="showModal = false" @confirm="deleteAdvert()">
        <h2 slot="header">Delete advert?</h2>
      </Model>
  </div>
</template>

<script>
import { Advert } from '../services/adverts.js';
import Model from '../components/model.vue';
import router from '../router/index.js';
export default {
  name: 'AdvertCard',
  components: {Model},
  data() {
    return {
      image: '',
      payload: {
        advert: {
          id: '',
          title: '',
          text: '',
          creator: {
            name: '',
            id: ''
          },
          category: '',
          file: '',
        },
        user: {
          id: localStorage.getItem('userID'),
          role: localStorage.getItem('Role'),
        }
      },
      canDelete: false,
      showModal: false,
      showModify: false
    }
  },
  mounted: function() {
    Advert.getAdvert(this.$route.params.id)
      .then((res) => {
        this.payload.advert = res.data
      if (this.payload.user.id === this.payload.advert.creator.id || this.payload.user.role === "Admin") {
      console.log(this.payload.user.id)
      this.canDelete = true;
    }
      })
      .catch((error) => console.error(error))

  },
  methods: {
    deleteAdvert() {
      Advert.deleteAdvert(this.payload)
        .then((res) => {
          this.showModal = false;
          router.go(-1);
        })
        .catch((error) => {
          console.error(error)
          this.showModal = false;
          alert('Token expired! Please re-login');
        });
    },
    updateAdvert() {
      var formData = new FormData();
        formData.append('title', this.$refs.title.value);
        formData.append('text', this.$refs.text.value);
        formData.append('file', this.$refs.uploadImage.files[0]);
        console.log(formData.get('title'))
        Advert.updateAdvert(this.$route.params.id, formData)
        .then(() => {
          this.showModify = false;
          window.location.reload();
        })
        .catch((error) => {
          alert("Token expired!Please login again")
        })
    }
  }
}
</script>

<style scoped>
label {
  display: block;
  text-align: center;
  user-select: none;
  cursor: pointer;
  padding: 5px;
}

#upload-photo {
  opacity: 0;
  position: absolute;
  z-index: -1;
}
textarea {
  width: 100%;
}
.modify-container {
  margin: 0 auto;
  width: 70%;
  padding: 20px;
}
.delete {
  position: absolute;
  top: 10px;
  right: 10px;
  user-select: none;
}
.btn {
  padding: 0;
  margin: 0;
}
.advert-card {
  position: relative;
  word-break: break-word;
  max-width: 50%;
  margin: 0 auto;
  text-align: center;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0,0,0,0.5);
}
.description {
  padding: 20px;
  letter-spacing: 0.1em;
  line-height: 2em;
  word-break: break-word;
  font-size: 1.2em;
  white-space: pre-wrap;
}
.card-header {
  display: inline-block;
  max-width: 70%;
}
img {
  max-width: 100%;
  max-height: 350px;
}
input {
  width: 100%;
}
.info {
  display: flex;
  justify-content: flex-end;
  user-select: none;
}
.sub {
  display: inline-block;
  color: rgb(149, 148, 148);
  font-size: 1em;
}
.info p {
  display: inline-block;
  font-size: 1em;
  margin-right: 20px;
}

</style>