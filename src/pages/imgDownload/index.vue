<template>
  <div class="imgDownload">
    <img mode="widthFix" :src="url">
    <button class="saveFile" @tap='saveFile'>保存图片</button>
  </div>
</template>
<script>
import share from '@/common/js/share.js'
  export default {
    data () {
      return {
        url: ''
      }
    },
    methods: {
      saveFile () {
        this.$downloadFile(this.url).then(res => {
          this.$saveImageToPhotosAlbum(res.tempFilePath).then(res => {
            this.$showToast('下载成功')
          })
        })
      }
    },
    onLoad (data) {
      this.url = data.url
    },
    onShareAppMessage: share()
  }
</script>

<style scoped>
 @import './index.less';
</style>
