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
      activity: {

      },
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
        sn: '1009',
        relativeSn: '',
        xelementLayoutType: 'CENTER',
        yelementLayoutType: 'ABSOLUTELY',
        elementContent: '发起了一个抽奖活动',
        elementMediaType: 'TEXT',
        y: 250,
        font: {
          name: '黑体',
          elementFontStyle: 0,
          fontSize: 38
        },
        color: {
          r: 102,
          g: 102,
          b: 102
        }
      }
      let creatRule = {
        sn: '1010',
        relativeSn: '',
        xelementLayoutType: 'CENTER',
        yelementLayoutType: 'ABSOLUTELY',
        elementContent: '',
        elementMediaType: 'TEXT',
        y: 680,
        font: {
          name: '黑体',
          elementFontStyle: 0,
          fontSize: 26
        },
        color: {
          r: 102,
          g: 102,
          b: 102,
          a: 1
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
          elementContent: this.$getStorageSync('userInfo').nickName,
          elementMediaType: 'TEXT',
          y: 192,
          font: {
            name: '黑体',
            elementFontStyle: 0,
            fontSize: 28
          },
          color: {
            r: 80,
            g: 45,
            b: 1,
            a: 1
          }
        },
        {
          sn: '1003',
          relativeSn: '',
          xelementLayoutType: 'CENTER',
          yelementLayoutType: 'ABSOLUTELY',
          elementContent: data.items[0].metadata.image ? data.items[0].metadata.image : data.items[0].metadata.url,
          elementMediaType: 'IMG',
          y: 306,
          height: 275,
          width: 550
        },
        {
          sn: '1004',
          relativeSn: '',
          xelementLayoutType: 'CENTER',
          yelementLayoutType: 'ABSOLUTELY',
          elementContent: '[ 奖品1 ]  ' + data.items[0].name,
          elementMediaType: 'TEXT',
          y: 663,
          font: {
            name: '黑体',
            elementFontStyle: 0,
            fontSize: 34
          },
          color: {
            r: 67,
            g: 67,
            b: 67,
            a: 1
          }
        },
        {
          sn: '1005',
          relativeSn: '',
          xelementLayoutType: 'CENTER',
          yelementLayoutType: 'ABSOLUTELY',
          elementContent: this.twoCode,
          elementMediaType: 'IMG',
          y: 769,
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
          y: 975,
          font: {
            name: 'PingFangSC',
            elementFontStyle: 0,
            fontSize: 28
          },
          color: {
            r: 102,
            g: 102,
            b: 102,
            a: 1
          }
        },
        {
          sn: '1007',
          relativeSn: '',
          xelementLayoutType: 'ABSOLUTELY',
          yelementLayoutType: 'ABSOLUTELY',
          elementContent: 'https://oss.qianbaocard.com/20180918/4948be7a3ca6451a8eda67a04bc71930.png',
          elementMediaType: 'IMG',
          x: 420,
          y: 330,
          height: 56,
          width: 176
        },
        {
          sn: '1008',
          relativeSn: '',
          xelementLayoutType: 'ABSOLUTELY',
          yelementLayoutType: 'ABSOLUTELY',
          elementContent: '抽奖助手 赞助',
          elementMediaType: 'TEXT',
          x: 432,
          y: 367,
          font: {
            name: 'PingFangSC',
            elementFontStyle: 0,
            fontSize: 24
          },
          color: {
            r: 255,
            g: 255,
            b: 255,
            a: 1
          }
        }
      ]
      this.bgUrl = 'https://oss.qianbaocard.com/20180912/c45dced1f0564763a949c9067c209584.png'
      // 个人发起抽奖
      if (data.owner.id === this.$getStorageSync('userInfo').id) {
        items.push(creat)
        if (data.metadata.drawRule === 'timed') {
          const date = new Date(data.endTime)
          data.endTimeDay = `${date.getMonth() + 1}月${date.getUTCDate()}日`
          data.endTimeHours = `${date.getHours() + 1}:${date.getMinutes()}分`
          creatRule.elementContent = data.endTimeDay + data.endTimeHours + '开奖'
        } else if (data.metadata.drawRule === 'fullTicket') {
          creatRule.elementContent = '满' + data.metadata.ticketsNum + '金豆开奖'
        } else if (data.metadata.drawRule === 'fullParticipant') {
          creatRule.elementContent = '满' + data.num + '人开奖'
        }
        // 两种奖品
        if (data.items.length === 1) {
          this.bgUrl = 'https://oss.qianbaocard.com/20180912/c45dced1f0564763a949c9067c209584.png'
          creatRule.y = 721
          items.push(creatRule)
        } else if (data.items.length >= 2) {
          this.bgUrl = 'https://oss.qianbaocard.com/20180912/58ceabb9c6df4067acdfe6c7a2f70954.png'
          data.items.forEach(function (item, index) {
            let obj = {}
            obj.sn = index
            obj.xelementLayoutType = 'CENTER'
            obj.yelementLayoutType = 'ABSOLUTELY'
            obj.elementContent = '[奖品' + (index + 2) + '] ' + item.name
            obj.y = 621 + parseInt((index + 2) * 42)
            obj.elementMediaType = 'TEXT'
            obj.font = {
              name: '黑体',
              elementFontStyle: 0,
              fontSize: 34
            }
            obj.color = {
              r: 67,
              g: 67,
              b: 67,
              a: 1
            }
            items.push(obj)
          })
          items[4].y = 1166
          items[5].y = 1372
          creatRule.creatRule = 1318
          creatRule.y = 1118
          console.log(items)
        //   let secondPrize = [
        //     {
        //       sn: '1011',
        //       relativeSn: '',
        //       xelementLayoutType: 'CENTER',
        //       yelementLayoutType: 'ABSOLUTELY',
        //       elementContent: data.items[1].metadata.image ? data.items[1].metadata.image : data.items[0].metadata.url,
        //       elementMediaType: 'IMG',
        //       y: 703,
        //       height: 275,
        //       width: 550
        //     },
        //     {
        //       sn: '1012',
        //       relativeSn: '',
        //       xelementLayoutType: 'CENTER',
        //       yelementLayoutType: 'ABSOLUTELY',
        //       elementContent: '[ 奖品 ]  ' + data.items[1].name,
        //       elementMediaType: 'TEXT',
        //       y: 1060,
        //       font: {
        //         name: '黑体',
        //         elementFontStyle: 0,
        //         fontSize: 34
        //       },
        //       color: {
        //         r: 67,
        //         g: 67,
        //         b: 67,
        //         a: 1
        //       }
        //     },
        //     {
        //     sn: '1013',
        //     relativeSn: '',
        //     xelementLayoutType: 'ABSOLUTELY',
        //     yelementLayoutType: 'ABSOLUTELY',
        //     elementContent: 'https://oss.qianbaocard.com/20180918/4948be7a3ca6451a8eda67a04bc71930.png',
        //     elementMediaType: 'IMG',
        //     x: 420,
        //     y: 727,
        //     height: 56,
        //     width: 176
        //   },
        //   {
        //     sn: '1014',
        //     relativeSn: '',
        //     xelementLayoutType: 'ABSOLUTELY',
        //     yelementLayoutType: 'ABSOLUTELY',
        //     elementContent: '抽奖助手 赞助',
        //     elementMediaType: 'TEXT',
        //     x: 432,
        //     y: 764,
        //     font: {
        //       name: 'PingFangSC',
        //       elementFontStyle: 0,
        //       fontSize: 24
        //     },
        //     color: {
        //       r: 255,
        //       g: 255,
        //       b: 255,
        //       a: 1
        //     }
        //   }
        //   ]
        //   this.bgUrl = 'https://oss.qianbaocard.com/20180912/58ceabb9c6df4067acdfe6c7a2f70954.png'
        //   items = items.concat(secondPrize)
        //   items[4].y = 1166
        //   items[5].y = 1372
        //   creatRule.creatRule = 1318
        //   creatRule.y = 1118
        //   items.push(creatRule)
        }
      }
      // 中奖
      if (this.lucky === true) {
        creat.elementContent = '「我中奖了」'
        this.bgUrl = 'https://oss.qianbaocard.com/20180912/5eb971d853a849c8a22f4e10a3c53cc4.png'
        items[4].y = 711
        items[5].y = 917
        items.push(creat)
      }
      MakePictureService.add({
        backgroundUrl: this.bgUrl,
        items
      }).then((res) => {
        if (res.code === 0) {
          this.url = res.data
          this.$hideLoading()
        }
      })
    }
  },
  onLoad (options) {
    if (options.lucky === 'true') {
      this.lucky = true
    } else {
      this.lucky = ''
    }
    this.url = ''
    this.title = options.title
    this.twoCode = options.twoCode
    this.activity = []
    this.activity = JSON.parse(options.activity)
    this.getPicture(this.activity)
    this.$showLoading()
  },
  onShareAppMessage: share()
}
</script>

<style scoped>
@import './index.less';
</style>
