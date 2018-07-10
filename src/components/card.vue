<template>
  <div>
    <p class="card">
      {{text}}
    </p>
  </div>
</template>

<script>
export default {
  props: ['text'],
  created () {
    console.log('hell card')
  }
}
</script>

<style>
.card {
  padding: 10px;
}
</style>
