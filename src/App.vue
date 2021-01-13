<template>
  <div id="App">
    <PannelComponent/>
    <router-view/>
  </div>
</template>

<script>
import PannelComponent from './components/Pannel.vue'

export default {
  name: 'App',
  components: {
    PannelComponent
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Raleway');
body {
  margin: 0;
  padding: 0;
  background-color: rgb(230, 230, 230);
  letter-spacing: 0.1em;
}
a {
  text-decoration: none;
  display: block;
  user-select: none;
  cursor: pointer;
}
h1, h2, h3, h4 {
  font-family: 'Raleway', sans-serif;
  text-align: center;
  font-weight: 600;
  letter-spacing: 0.1em;
}
input[type=text], input[type=password], input[type=email] {
  letter-spacing: 0.1em;
  border: none;
  font-family: 'Raleway', sans-serif;
  font-size: 1.1em;
  font-weight: 600;
  height: 48px;
  border: 3px solid #e1e8ee;
  border-radius: 6px;
} 
input:focus, textarea:focus {
  outline: none;
}
textarea {
  letter-spacing: 0.1em;
  font-family: 'Raleway', sans-serif;
  font-weight: 600;
  font-size: 1.1em;
  resize: none;
  border: 3px solid #e1e8ee;
  border-radius: 6px;
}
p {
  font-family: 'Raleway', sans-serif;
  font-weight: 600;
}
.line {
  height: 1.5px;
  width: 100%;
  background-color: #e1e8ee;
}
.mainColor {
  background-color: rgb(200, 190, 216);
}
.shadow {
  box-shadow: 0 0 10px rgba(0,0,0,0.5);
}
.btn{
  font-family: 'Raleway', sans-serif;
  min-height: 55px;
  line-height: 55px;
  text-decoration: none;
  padding-left: 15px;
  padding-right: 15px;
  font-size: 1em;
  font-weight: 600;
  color: black;
  border-radius: 2px;
  transition: 1s;
}
.btn:active {
  background-color: black;
  color: white;
  transition: 0.1s;
}
button {
  font-family: 'Raleway', sans-serif;
}
#app {
  font-family: 'Raleway', sans-serif;
  margin: 0;
  padding: 0;
}
</style>
