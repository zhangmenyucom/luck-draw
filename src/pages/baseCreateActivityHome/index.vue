<template>
  <div>
  </div>
</template>
<script>
  export default {
    onShow () {
      this.$setStorageSync('topscene', 'createActivities')
      this.$navigateTo('/pages/baseCreateActivity/createActivities')
    }
  }
</script>
