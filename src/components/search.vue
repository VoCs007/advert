<template>
  <div id="search">
    <input type="text" class="shadow" placeholder="SEARCH">
  </div>
</template>

<script>
export default {
  name: 'search'
}
</script>

<style scoped>
#search {
  padding-top: 40px;
  padding-bottom: 40px;
  align-content: center;
}
input {
  display: block;
  margin: 0 auto;
  border: none;
  font-family: 'Raleway', sans-serif;
  font-size: 20px;
  font-weight: 800;
  align-items: center;
  width: 80%;
  height: 50px;
  border-radius: 6px;
}
input:focus {
  outline: none;
}
</style>