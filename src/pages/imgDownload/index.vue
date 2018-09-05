<template>
  <div class="imgDownload">
    <top :title='title' />
    <img mode="widthFix" :src="url">
    <button class="saveFile" @tap='saveFile'>保存图片</button>
  </div>
</template>
<script>
import share from '@/common/js/share.js'
import top from '@/components/top'
export default {
  data () {
    return {
      url: '',
      title: ''
    }
  },
  components: {
    top
  },
  methods: {
    saveFile () {
      this.$downloadFile(this.url).then(res => {
        this.$saveImageToPhotosAlbum(res.tempFilePath).then(res => {
          this.$showToast('已保存至相册')
        })
      })
    }
  },
  onLoad (data) {
    console.log(data)
    this.title = data.title
    this.url = data.url
  },
  onShareAppMessage: share()
}
</script>

<style scoped>
 @import './index.less';
</style>
