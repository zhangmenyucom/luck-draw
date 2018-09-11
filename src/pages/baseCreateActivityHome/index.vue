<template>
  <div>
  </div>
</template>
<script>
  export default {
    onShow () {
      this.$setStorageSync('scene', 'createActivities')
      this.$navigateTo('/pages/baseCreateActivity/createActivities')
    }
  }
</script>
