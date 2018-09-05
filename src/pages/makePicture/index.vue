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
import MakePictureService from '@/services/pictureService.js'
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
    console.log(this.$getStorageSync('userInfo'))
    this.title = data.title
    MakePictureService.getPicture({
      backgroundUrl: 'https://oss.qianbaocard.org/20180727/4d687199dcbd4064ab6e4838128905fb.png',
      items: [
        {
          xlayoutType: 'ABSOLUTELY',
          ylayoutType: 'ABSOLUTELY',
          elementContent: this.$getStorageSync('userInfo').avatar,
          mediaType: 'IMG',
          x: 320,
          y: 260,
          height: 100,
          width: 100,
          imageType: 'CIRCLE'
        },
        {
          xlayoutType: 'RELATIVE',
          ylayoutType: 'RELATIVE',
          elementContent: 'https://oss.qianbaocard.org/20180827/1535338517QBOperate.png',
          mediaType: 'IMG',
          x: 50,
          y: 50,
          height: 300,
          width: 560
        },
        {
          xlayoutType: 'RELATIVE',
          ylayoutType: 'RELATIVE',
          elementContent: '领金豆，抽大奖',
          mediaType: 'TEXT',
          x: 50,
          y: 33,
          font: {
            name: '黑体',
            fontStyle: 0,
            fontSize: 25
          },
          color: {
            r: 70,
            g: 70,
            b: 70
          }
        }
      ]
    }).then((res) => {
      this.url = res.data
    })
  },
  onShareAppMessage: share()
}
</script>

<style scoped>
@import './index.less';
</style>
