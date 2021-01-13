/* eslint-disable */
<template>
  <div class="profile-component">
    <div class="user shadow">
      <h3>Information</h3>
      <img :src="image" alt="">
      <div class="info">
        <div class="name">
          <h4>name: </h4>
          <p v-if="user">
            {{user.name}}
          </p>
        </div>

        <div class="email">
          <h4>@mail :</h4>
          <p v-if="user">{{user.email}}</p>
        </div>

        <div class="count">
          <h4>Total adverts:</h4>
          <p>{{ lenght }}</p>
        </div>
      </div>
      <label for="upload-photo" class="btn mainColor">Upload Photo</label>
      <input type="file" name="photo" ref="uploadPhoto" accept="image/*,image/jpeg" @change="uploadPhoto()" id="upload-photo"/>
    </div>

      <div class="profile data shadow">
        <h1>My adverts</h1>
        <hr>
        <div class="adverts"
          v-for="advert in adverts" :key="advert._id">
          <div class="advert"
            @click="$router.push({ name: 'AdvertCard', params: { id: advert._id } })">
              <div class="advert-header">
                  <h3>{{advert.title}}</h3>
              </div>
          </div>
        </div>
      </div>
  </div>
</template>

<script>
import { Users } from '../services/users';
import { Advert } from '../services/adverts';
import { Auth } from '../services/auth';
import router from '../router/index';
export default {
  name: 'ProfileComponent',
  data() {
    return { 
      user: {},
      adverts: {},
      lenght: '0',
      userId: localStorage.getItem('userID'),
      image: localStorage.getItem('profile')
  }
  },
  mounted() {
    Users.getUser(this.userId)
    .then((res) => {
      this.user = res.data
    })
    .catch((error) => {
      alert('Token expired. Please re-login')
      Auth.logOut();
      router.push({ name: 'Login' })
      window.location.reload();
    });

    Advert.getUserAdverts(this.userId)
    .then((res) => {
      this.adverts = res.data;
      var leng = 0;
      for (var s in res.data) {
        if (res.data[s]) {
          leng++;
        }
      } 
      this.lenght = leng
    })
  },
  methods: {
    uploadPhoto() {
      var formData = new FormData();
      formData.append('image', this.$refs.uploadPhoto.files[0]);
      formData.append('_id', localStorage.getItem('userID'));
      const req = {
        id: localStorage.getItem('userID'),
        formData
      }
      Users.updateUser(req)
      .then((res) => {
        localStorage.setItem('profile', res.data);
        window.location.reload();
      })
      .catch((error) => console.log(error))
    }
    }
  }
</script>

<style scoped>
.adverts {
  display: flex;
  flex-direction: column;
}
.advert {
  margin: 10px 20px 10px 20px;
  user-select: none;
  cursor: pointer;
  display: flex;
}
.profile-component {
  margin: 0px 50px;
  display: flex;
  flex-direction: column;
  flex-flow: wrap;
  justify-content: space-between;
}
a{ 
  display: inline-block;
  text-decoration: none;
  color: black;
  font-weight: 600;
  font-size: 1.3em;
  margin-left: 10px;
}
p {
  display: inline-block;
  font-size: 1.1em;
  font-weight: 600;
  margin-left: 10px;
}
h4 {
  display: inline-block;
  color: gray;
}
img {
  margin: 0 auto;
  object-fit: cover;
  width: 100%;
  height: 400px;
}
.user {
  max-height: 713px;
  background-color: #fff;
  width: 350px;
  border-radius: 8px;
}
.btn-photo {
  display: block;
  text-align: center;
}
.data {
  word-break: break-all;
  padding-top: 5px;
  padding-bottom: 5px;
  background-color: #fff;
  border-radius: 7px;
  width: 70%;
}
.info {
  display: flex;
  flex-direction: column;
  padding: 0px 0px 0px 10px;
}
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
</style>