<template>
  <div class="imgDownload">
    <top :title='title' />
    <img mode="widthFix" :src="url">
    <div class="btnDiv">
      <button class="saveFile" @tap='saveFile'>保存图片</button>
    </div>
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
      title: '',
      activity: {},
      twoCode: '',
      lucky: '',
      bgUrl: ''
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
    },
    getPicture (data) {
      let creat = {
          sn: '1007',
          relativeSn: '',
          xelementLayoutType: 'CENTER',
          yelementLayoutType: 'ABSOLUTELY',
          elementContent: '发起了一个抽奖活动',
          elementMediaType: 'TEXT',
          y: 248,
          font: {
            name: '黑体',
            elementFontStyle: 0,
            fontSize: 25
          },
          color: {
            r: 102,
            g: 102,
            b: 102
          }
        }
        let creatRule = {
          sn: '1008',
          relativeSn: '',
          xelementLayoutType: 'CENTER',
          yelementLayoutType: 'ABSOLUTELY',
          elementContent: '',
          elementMediaType: 'TEXT',
          y: 238,
          font: {
            name: '黑体',
            elementFontStyle: 0,
            fontSize: 38
          },
          color: {
            r: 67,
            g: 67,
            b: 67
          }
        }
        let items = [
        {
          sn: '1001',
          relativeSn: '',
          xelementLayoutType: 'CENTER',
          yelementLayoutType: 'ABSOLUTELY',
          elementContent: this.$getStorageSync('userInfo').avatar,
          elementMediaType: 'IMG',
          y: 32,
          height: 112,
          width: 112,
          elementImageType: 'CIRCLE'
        },
        {
          sn: '1002',
          relativeSn: '',
          xelementLayoutType: 'CENTER',
          yelementLayoutType: 'ABSOLUTELY',
          elementContent: data.items[0].metadata.image ? data.items[0].metadata.image : data.items[0].metadata.url,
          elementMediaType: 'IMG',
          y: 380,
          height: 250,
          width: 500
        },
        {
          sn: '1003',
          relativeSn: '',
          xelementLayoutType: 'CENTER',
          yelementLayoutType: 'ABSOLUTELY',
          elementContent: '[ 奖品 ]  ' + data.items[0].name,
          elementMediaType: 'TEXT',
          y: 680,
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
          xelementLayoutType: 'CENTER',
          yelementLayoutType: 'ABSOLUTELY',
          elementContent: this.$getStorageSync('userInfo').nickName,
          elementMediaType: 'TEXT',
          y: 200,
          font: {
            name: '黑体',
            elementFontStyle: 0,
            fontSize: 24
          },
          color: {
            r: 67,
            g: 67,
            b: 67
          }
        },
        {
          sn: '1005',
          relativeSn: '',
          xelementLayoutType: 'CENTER',
          yelementLayoutType: 'ABSOLUTELY',
          elementContent: this.twoCode,
          elementMediaType: 'IMG',
          y: 750,
          height: 150,
          width: 150
        },
        {
          sn: '1006',
          relativeSn: '',
          xelementLayoutType: 'CENTER',
          yelementLayoutType: 'ABSOLUTELY',
          elementContent: '长按识别小程序码，参与抽奖',
          elementMediaType: 'TEXT',
          y: 950,
          font: {
            name: 'PingFangSC',
            elementFontStyle: 0,
            fontSize: 28
          },
          color: {
            r: 102,
            g: 102,
            b: 102
          }
        }
      ]
      if (data.owner.id === this.$getStorageSync('userInfo').id) {
        items.push(creat)
      }
      if (this.lucky === true) {
        creat.elementContent = '「我中奖了」'
        items.push(creat)
      }
      if (data.metadata.drawRule === 'timed') {
        const date = new Date(data.endTime)
        data.endTimeDay = `${date.getMonth() + 1}月${date.getUTCDate()}日`
        data.endTimeHours = `${date.getUTCHours() + 1}:${date.getUTCMinutes()}分`
        creatRule.elementContent = data.endTimeDay + data.endTimeHours + '开奖'
        items.push(creatRule)
      } else if (data.metadata.drawRule === 'fullTicket') {
        creatRule.elementContent = '满' + data.metadata.ticketsNum + '金豆开奖'
        items.push(creatRule)
      } else if (data.metadata.drawRule === 'fullParticipant') {
        creatRule.elementContent = '满' + data.num + '人开奖'
      }
      MakePictureService.getPicture({
        backgroundUrl: 'https://oss.qianbaocard.com/20180912/c45dced1f0564763a949c9067c209584.png',
        items
      }).then((res) => {
      this.url = res.data
    })
    }
  },
  onLoad (options) {
    if (options.lucky === 'true') {
      this.lucky = true
      this.bgUrl = 'https://oss.qianbaocard.com/20180912/c45dced1f0564763a949c9067c209584.png'
    } else {
      this.lucky = ''
    }
    this.title = options.title
    this.twoCode = options.twoCode
    this.activity = []
    this.activity = JSON.parse(options.activity)
    console.log(this.activity)
    this.getPicture(this.activity)
  },
  onShareAppMessage: share()
}
</script>

<style scoped>
@import './index.less';
</style>
