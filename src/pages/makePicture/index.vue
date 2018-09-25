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
    dealRule (data) {
      let rule = ''
      if (data.metadata.drawRule === 'timed') {
          const date = new Date(data.endTime)
          data.endTimeDay = `${date.getMonth() + 1}月${date.getUTCDate()}日`
          data.endTimeHours = `${date.getHours() + 1}:${date.getMinutes()}分`
          rule = data.endTimeDay + data.endTimeHours + '开奖'
        } else if (data.metadata.drawRule === 'fullTicket') {
          rule = '满' + data.metadata.ticketsNum + '金豆开奖'
        } else if (data.metadata.drawRule === 'fullParticipant') {
          rule = '满' + data.metadata.participantsNum + '人开奖'
        }
        return rule
    },
    dealPrize (data, y, line) {
      let arr = []
      data.items.forEach(function (item, index) {
            let obj = {}
            item.name = item.name.length > 6 ? item.name.slice(0, 5) + '...' : item.name
            obj.sn = index
            obj.xelementLayoutType = 'ABSOLUTELY'
            obj.yelementLayoutType = 'ABSOLUTELY'
            obj.elementContent = '[奖品] ' + item.name + ' x ' + item.metadata.num
            obj.y = y + parseInt((index + 1) * line)
            obj.x = 99
            obj.elementMediaType = 'TEXT'
            obj.font = {
              name: '黑体',
              elementFontStyle: 0,
              fontSize: 38
            }
            obj.color = {
              r: 67,
              g: 67,
              b: 67,
              a: 1
            }
            if (y === 619) {
              obj.xelementLayoutType = 'CENTER'
              obj.x = 0
            }
            arr.push(obj)
      })
      return arr
    },
    getPicture (data) {
      let creat = {
        sn: '1009',
        relativeSn: '',
        xelementLayoutType: 'CENTER',
        yelementLayoutType: 'ABSOLUTELY',
        elementContent: '「发起了一个抽奖活动 」',
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
        y: 703,
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
          sn: '1005',
          relativeSn: '',
          xelementLayoutType: 'CENTER',
          yelementLayoutType: 'ABSOLUTELY',
          elementContent: this.twoCode,
          elementMediaType: 'IMG',
          y: 785,
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
          y: 991,
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
      creatRule.elementContent = this.dealRule(data)
      // 个人发起抽奖
      if (data.owner.id === this.$getStorageSync('userInfo').id) {
        items.push(creat)
        if (data.items.length === 1) {
          items = items.concat(this.dealPrize(data, 619, 46))
          creatRule.y = 737
          items.push(creatRule)
        } else if (data.items.length === 2) {
          let arr = this.dealPrize(data, 606, 45).map(function (item, index) {
              item.font.fontSize = 32
              item.x = 138
              return item
          })
          items = items.concat(arr)
          creatRule.y = 753
          items.push(creatRule)
        } else if (data.items.length === 3) {
          let arr = this.dealPrize(data, 595, 40).map(function (item, index) {
            item.font.fontSize = 28
            item.x = 164
            return item
          })
          items = items.concat(arr)
          creatRule.y = 761
          items.push(creatRule)
        }
      }
      // 中奖
      if (this.lucky === true) {
        creat.elementContent = '「我中奖了」'
        items = items.concat(this.dealPrize(data, 619, 46))
        items.push(creat)
      }
      MakePictureService.add({
        backgroundUrl: 'https://oss.qianbaocard.com/20180925/932bf2248ed44a38a8100caa37617f73.jpg',
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
    console.log(this.activity)
    this.getPicture(this.activity)
    this.$showLoading()
  },
  onShareAppMessage: share()
}
</script>

<style scoped>
@import './index.less';
</style>
