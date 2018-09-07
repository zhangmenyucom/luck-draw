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
  onLoad (options) {
    this.title = options.title
    MakePictureService.getPicture({
      backgroundUrl: 'https://oss.qianbaocard.org/20180905/8e46d2fa565e42a38678d3ee72514c21.png',
      items: [
        {
          sn: '1001',
          relativeSn: '',
          xelementLayoutType: 'ABSOLUTELY',
          yelementLayoutType: 'ABSOLUTELY',
          elementContent: this.$getStorageSync('userInfo').avatar,
          elementMediaType: 'IMG',
          x: 319,
          y: 104,
          height: 112,
          width: 112,
          elementImageType: 'CIRCLE'
        },
        {
          sn: '1002',
          relativeSn: '',
          xelementLayoutType: 'ABSOLUTELY',
          yelementLayoutType: 'ABSOLUTELY',
          elementContent: options.url,
          elementMediaType: 'IMG',
          x: 125,
          y: 400,
          height: 250,
          width: 500
        },
        {
          sn: '1003',
          relativeSn: '',
          xelementLayoutType: 'ABSOLUTELY',
          yelementLayoutType: 'ABSOLUTELY',
          elementContent: this.$getStorageSync('userInfo').nickName,
          elementMediaType: 'TEXT',
          x: 280,
          y: 260,
          font: {
            name: '黑体',
            elementFontStyle: 0,
            fontSize: 25
          },
          color: {
            r: 70,
            g: 70,
            b: 70
          }
        },
        {
          sn: '1004',
          relativeSn: '',
          xelementLayoutType: 'ABSOLUTELY',
          yelementLayoutType: 'ABSOLUTELY',
          elementContent: 'https://oss.qianbaocard.org/20180904/4d42ed9420d74db1ad19f035ef6b6bea.jpg',
          elementMediaType: 'IMG',
          x: 319,
          y: 700,
          height: 112,
          width: 112
        },
        {
          sn: '1005',
          relativeSn: '',
          xelementLayoutType: 'ABSOLUTELY',
          yelementLayoutType: 'ABSOLUTELY',
          elementContent: '长按识别小程序码，参与抽奖。',
          elementMediaType: 'TEXT',
          x: 220,
          y: 860,
          font: {
            name: 'PingFangSC',
            elementFontStyle: 0,
            fontSize: 24
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
