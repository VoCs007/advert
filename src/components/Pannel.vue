/* eslint-disable */
<template>
<div class="pannel shadow mainColor">
  <img class="logo shadow" 
  @click="$router.push({name: 'Adverts', params: {page: 1}}).catch(err => {})"
  src="../assets/advertslogo1.png" alt=""/>
    <div class="btn-container">
    <a 
    @click="$router.push({name: `Login`}).catch(err => {})" 
    v-if="!hasToken"
    class="btn">
    SIGN IN
    </a>
    <nav id="menuVertical" v-else>
      <ul>
        <li>
          <a class="profile-info"><img class="logo-image" :src="image" alt=""> <span>{{ this.name }}</span>  </a>
          <ul>
            <li>
              <a @click="$router.push({name: 'Profile'}).catch(err => {})" 
                  v-if="hasToken">
              profile
              </a>
            </li>
            <li>
              <a 
                @click="$router.push({name: 'CreateAdvert'}).catch(err => {})" 
                v-if="hasToken"> 
                Create advert 
              </a> 
            </li>
            <li>
              <a @click="logOut()"
              v-if="hasToken">
                LOG OUT
              </a>
            </li>
          </ul>
        </li>
      </ul>
    </nav>
    </div>
</div>
</template>

<script>
import router from '../router/index';
import { Auth } from '../services/auth';
export default {
  name: 'pannel',
  data() { 
    return {
      hasToken: false,
      name: '',
      id: '',
      image: localStorage.getItem('profile')
    }
  },
  mounted() {
    this.checkToken();
  },
  methods: {
        checkToken() {
      if (!localStorage.getItem('token')){
        this.hasToken = false
      } else {
        this.hasToken = true;
        this.name = localStorage.getItem('userName');
        this.id = localStorage.getItem('userID');
      }
    },
    logOut() {
        Auth.logOut()
        this.hasToken = false;
        router.push({name: 'Adverts'})
    }
  }
  }
</script>

<style>
.profile-info{
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
}
span{
  display: block;
  margin: 0px 15px;
}
.logo-image {
  display: block;
  border: 1px solid white;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  object-fit: cover;
}
#menuVertical{
  font-family: 'Raleway', sans-serif;
  min-width: 200px;
  height:auto;
}
#menuVertical ul{
  text-align: right;
	display:block;
	max-width: 200px;
	height:auto;
	margin:0px;
	padding:0px;
	list-style:none;
	position:relative;
}
#menuVertical ul li{
  max-width: 200px;
}
#menuVertical ul li a{
  padding: 0px 15px;
  font-size: 1em;
	text-transform:uppercase;
	font-weight:bold;
	color:#000000;
	line-height: 55px;
	background:rgb(200, 190, 216);
}
#menuVertical ul li ul{
	position:relative;
	display:none;
  width:auto;
}
#menuVertical ul li:hover ul{
  display:block;
}
#menuVertical ul li ul li a:hover{
	background:#000000;
	color:#f0f3fb;
}
.pannel {
  padding-top: 10px;
  padding-left: 10px;
  padding-bottom: 10px;
  display: flex;
  height: 55px;
  margin-bottom: 30px;
}
.logo {
  height: 55px;
  cursor: pointer;
}
.btn-container {
  width: 100%;
  display: flex;
  justify-content: flex-end;
}
</style>