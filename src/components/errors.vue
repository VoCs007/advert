<template>
  <div class="errors">
    <ul class="error-list">
      <slot name="error">
      </slot>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'Errors'
}
</script>

<style>
.error-list {
  font-family: 'Raleway', sans-serif;
  color: red;
}
</style>