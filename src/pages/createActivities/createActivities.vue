<template>
    <div class="page">
        <top title="新建抽奖" />
        <div>
            <div :style="index>0?'margin-top: 8px;':''" v-for="(item,index) in giftList" :key="index">
                <addGiftComp :addGiftPic="addGiftPic" :showCanvas="giftList[index]"
                :giftImgSrc="giftImgSrc[index]" :index="index" :deleteGiftList="deleteGiftList"
                :inputText="inputText"
                :itemName="itemName" :itemNum="itemNum" :getImage="getImage" />
            </div>
            <div class="addGift_div">
                <div v-if="giftList.length===1" class="add_gift" @click="addGift">
                    <span style="font-size:36rpx;">+</span><span>添加奖项</span>
                </div>
                <div v-else class="double_div">
                    <div class="delete_gift" @tap="deleteGiftList(giftList.length-1)">
                        <img src="/static/img/dustbin.png" style="width:28rpx;height:28rpx;vertical-align:middle;">
                        <span style="vertical-align:middle;">删除</span>
                    </div>
                    <div class="added_gift" @click="addGift">
                        <span style="font-size:36rpx;">+</span><span>添加奖项</span>
                    </div>
                </div>
            </div>
            <div class="weui-cells weui-cells_after-title" style="margin-top: 8px;">
                <div class="weui-cell weui-cell_access border-middle">
                    <div class="weui-cell__bd">抽奖说明</div>
                    <span class="weui-cell__ft" style="font-size:12px;font-family:PingFangSC-Regular;font-weight:400;color:rgba(153,153,153,1);">{{prizeTextLength}}/100</span>
                </div>
                <div class="weui-cell weui-cell_access">
                    <textarea class="weui-cell__bd" placeholder="请输入" maxlength="100" auto-height="true" :value="prizeExplainText" data-name="prizeExplain" @input="inputText"></textarea>
                </div>
            </div>
            <div class="weui-cells weui-cells_after-title" style="margin-top: 8px;">
                <div class="weui-cell weui-cell_access border-middle">
                    <div class="weui-cell__bd">奖品介绍</div>
                    <span class="weui-cell__ft" style="font-size:12px;font-family:PingFangSC-Regular;font-weight:400;color:rgba(153,153,153,1);">{{giftTextLength}}/100</span>
                </div>
                <div class="turnLine">
                    <div v-for="(item, index) in giftPictures" :key="index" class="showPicDiv">
                      <img :src="item" mode="widthFix" style="width:690rpx;vertical-align:top;">
                      <div class="deleteIconDiv" @click="deleteGiftPic(index)">
                        <img src="../../../static/img/delete.png" class="deleteIcon" />
                      </div>
                    </div>
                    <div class="add_pic border-middle" @click="addPicture">
                        <span style="font-size:36rpx;">+</span><span>添加图片</span>
                    </div>
                </div>
                <div class="weui-cell weui-cell_access">
                    <textarea class="weui-cell__bd" placeholder="请输入" :value="prizeDescription" maxlength="100" auto-height="true" data-name="giftExplain" @input="inputText"></textarea>
                </div>
            </div>
            <div class="weui-cells weui-cells_after-title" style="margin-top: 8px;">
                <div class="weui-cell weui-cell_access border-middle">
                    <div class="weui-cell__bd">开奖方式</div>
                    <div class="weui-cell__ft">
                      <div class="radioDiv div-marginR" @tap="openByTime">
                        <img class="radioIcon" :src=" drawRule == 'timed' ? '/static/img/radio1.png' : '/static/img/radio2.png'" />
                        <span class="radioText">到时间</span>
                      </div>
                      <div class="radioDiv" @tap="openByPeople">
                        <img class="radioIcon" :src="drawRule !== 'timed' ? '/static/img/radio1.png' : '/static/img/radio2.png'" />
                        <span class="radioText">满人数</span>
                      </div>
                    </div>
                </div>
                <div v-if="drawRule === 'timed'" class="weui-cell weui-cell_access">
                    <div class="weui-cell__bd">开奖时间 <span style="color: red">*</span></div>
                    <picker class="weui-cell__ft" mode="multiSelector" @change="MultiPickerChange" :value="indexMulPicker" :range="dateList">
                      {{pickerDate}}
                    </picker>
                    <div class="weui-cell__ft weui-cell__ft_in-access" style="font-size: 0"></div>
                </div>
                <div v-if="drawRule === 'fullParticipant'" class="weui-cell weui-cell_access">
                    <div class="weui-cell__bd">
                      <div>开奖人数 <span style="color: red">*</span></div>
                      <div class="cant_full">未满人数七天后自动开奖</div>
                    </div>
                    <input type="number" placeholder="数量" v-model="peopleNum" class="weui-cell__ft" style="color:black;display: inline;vertical-align: middle;" />
                    <span class="weui-cell__ft" style="margin-left:5px;vertical-align: middle;">人</span>
                </div>
            </div>
            <div class="weui-cells weui-cells_after-title" style="margin-top: 8px;">
                <div class="weui-cell weui-cell_access" style="padding:5px 0">
                    <div @tap="shareWarn" class="weui-cell__bd"><span style="vertival-align:middle;margin-right:6rpx;">允许参与者分享</span><img style="width:28rpx;height:28rpx;vertical-align:middle;" src="/static/img/warnIcon.png" /></div>
                    <switch class="weui-cell__ft" @change="switchChange" :checked="isShare" style="transform:scale(0.9);position:relative;left:10px" />
                </div>
            </div>
            <div class="uperAddActivity" @click="navToUper"><span>使用基本版&nbsp;></span></div>
            <div class="weui-cells weui-cells_after-title" style="margin-top: 48px;padding:8px 15px;">
                <div class="createActivities" @click="createButton">发起抽奖</div>
            </div>
        </div>
         <createAttention v-if="showAttention" :createActivity="createActivity" :hideAttentionModal="hideAttentionModal" />
         <allowedShare v-if="share" :knowShare="knowShare" />
    </div>
</template>

<script>
    import top from '@/components/top'
    import allowedShare from '@/components/allowedShare'
    import createAttention from '@/components/createTimedAttention'
    import addGiftComp from '@/components/addGift'
    import chooseImage from '@/components/chooseImage'
    import CreatePersonalActivity from '@/services/createPersonalActivity'
    import ActivitiesService from '@/services/activitiesService'

    export default {
      data () {
        return {
          dateTime: '',
          giftList: [true],
          prizeExplainText: '',
          showCanvas: false,
          giftImgSrc: ['https://oss.qianbaocard.com/20180913/9c42bcdf5c5c4e8abf4c0dc9c14630a5.jpg'],
          prizeTextLength: 0,
          giftTextLength: 0,
          giftPictures: [],
          showGiftPictures: false,
          drawRule: 'timed',
          pickerDate: '',
          dateList: [[],
            ['00', '01', '02', '03', '04', '05', '06',
              '07', '08', '09', '10', '11', '12', '13',
              '14', '15', '16', '17', '18', '19', '20',
              '21', '22', '23'],
            ['00', '30']],
          indexMulPicker: [0],
          initIndexMulPicker: [],
          userInfo: {},
          prizeDescription: '',
          isShare: false,
          share: false,
          itemName: [],
          itemNum: [],
          peopleNum: '',
          giftItems: [{id: 'system', name: '', metadata: {image: '', num: 0}}],
          prizeEndTime: 0,
          jsonString: '',
          mediaData: [],
          showAttention: false,
          activityId: ''
        }
      },
      components: {
        top,
        addGiftComp,
        chooseImage,
        createAttention,
        allowedShare
      },
      // watch: {
      //   prizeDescription: (e) => {
      //     this.giftTextLength = e.length
      //     console.log(this.giftTextLength)
      //   },
      //   prizeExplainText: (e) => {
      //     this.prizeTextLength = e.length
      //     console.log(this.prizeTextLength)
      //   }
      // },
      methods: {
        inputText (e) {
          if (e.mp.currentTarget.dataset.name === 'prizeExplain') {
            this.prizeTextLength = e.mp.detail.value.length
            this.prizeExplainText = e.mp.detail.value
          }
          if (e.mp.currentTarget.dataset.name === 'giftExplain') {
            this.giftTextLength = e.mp.detail.value.length
            this.prizeDescription = e.mp.detail.value
          }
          if (e.mp.currentTarget.dataset.name === 'itemName') {
            const itemNameIndex = e.mp.currentTarget.dataset.index
            this.itemName[itemNameIndex] = e.mp.detail.value
            this.giftItems[itemNameIndex].name = e.mp.detail.value
          }
          if (e.mp.currentTarget.dataset.name === 'itemNum') {
            const itemNumIndex = e.mp.currentTarget.dataset.index
            this.itemNum[itemNumIndex] = e.mp.detail.value
            this.giftItems[itemNumIndex].metadata.num = e.mp.detail.value
          }
        },
        addGift () {
          let gl = this.giftList
          gl.push(true)
          this.giftList = gl
          this.giftItems.push({id: 'system', name: '', metadata: {image: 'https://oss.qianbaocard.com/20180913/9c42bcdf5c5c4e8abf4c0dc9c14630a5.jpg', num: 0}})
          this.giftImgSrc.push('https://oss.qianbaocard.com/20180913/9c42bcdf5c5c4e8abf4c0dc9c14630a5.jpg')
        },
        getImage (index) {
          this.$chooseImage().then(res => {
            this.imageSrc = res.tempFilePaths[0]
            this.$navigateTo('/pages/cutImage/index?imgSrc=' + res.tempFilePaths[0] + '&picIndex=' + index + '&edition=uperEdition')
          })
        },
        deleteGiftList (index) {
          this.giftList.splice(index, 1)
          if (this.giftImgSrc[index]) {
            this.giftImgSrc.splice(index, 1)
          }
          if (this.itemName[index]) {
            this.itemName.splice(index, 1)
          }
          if (this.itemNum[index]) {
            this.itemNum.splice(index, 1)
          }
          if (this.giftItems[index]) {
            this.giftItems.splice(index, 1)
          }
        },
        addPicture () {
          this.$chooseImage().then(res => {
            return this.pictureInService(res.tempFilePaths[0])
          })
        },
        pictureInService (filePath) {
          this.$uploadFile(filePath).then(res => {
            this.giftPictures.push(res.data.url)
          }).catch(err => {
            console.log(err)
            this.$showToast('图片上传失败！请稍后再试...')
          })
        },
        deleteGiftPic (index) {
          this.giftPictures.splice(index, 1)
        },
        openByPeople () {
          this.drawRule = 'fullParticipant'
        },
        openByTime () {
          this.drawRule = 'timed'
        },
        check (str) {
          str = str.toString()
          if (str.length < 2) {
            str = '0' + str
          }
          return str
        },
        getNowDate () {
          const newDate = new Date()
          const getYear = newDate.getFullYear()
          const getMonth = this.check(newDate.getMonth() + 1)
          const getDay = this.check(newDate.getDate())
          const getHours = newDate.getHours()
          const getMinutes = newDate.getMinutes()
          let endYear = parseInt(getYear)
          let endMonth = parseInt(getMonth)
          let endDay = parseInt(getDay)
          let endHours = parseInt(getHours)
          let endMinutes = parseInt(getMinutes)
          let timeIndex = 0
          if (endMinutes < 30) {
            timeIndex = this.dateList[1].indexOf(this.check(endHours))
            this.indexMulPicker = [0, timeIndex, 1]
            this.initIndexMulPicker = [0, timeIndex, 1]
            this.pickerDate = this.check(endYear) + '/' + this.check(endMonth) + '/' + this.check(endDay) + '  ' + this.check(endHours) + ':30'
          } else {
            endHours += 1
            if (endHours > 23) {
              endHours = endHours - 24
              endDay += 1
              if (getMonth === '01' || getMonth === '03' || getMonth === '05' || getMonth === '07' || getMonth === '08' || getMonth === '10' || getMonth === '12') {
                if (endDay > 31) {
                  endMonth += 1
                  endDay = endDay - 31
                  if (endMonth > 12) {
                    endYear += 1
                    endMonth = endMonth - 12
                  }
                }
              } else if (getMonth === '02') {
                if (endDay > 28) {
                  endMonth += 1
                  endDay = endDay - 28
                  if (endMonth > 12) {
                    endYear += 1
                    endMonth = endMonth - 12
                  }
                }
              } else {
                if (endDay > 30) {
                  endMonth += 1
                  endDay = endDay - 30
                  if (endMonth > 12) {
                    endYear += 1
                    endMonth = endMonth - 12
                  }
                }
              }
            }
            timeIndex = this.dateList[1].indexOf(this.check(endHours))
            this.indexMulPicker = [0, timeIndex, 0]
            this.initIndexMulPicker = [0, timeIndex, 0]
            this.pickerDate = this.check(endYear) + '/' + this.check(endMonth) + '/' + this.check(endDay) + '  ' + this.check(endHours) + ':00'
          }
          this.dateList[0].push(this.check(endYear) + '/' + this.check(endMonth) + '/' + this.check(endDay))
          for (let i = 0; i < 7; i++) {
            endDay += 1
            if (getMonth === '01' || getMonth === '03' || getMonth === '05' || getMonth === '07' || getMonth === '08' || getMonth === '10' || getMonth === '12') {
              if (endDay > 31) {
                endMonth += 1
                endDay = endDay - 31
                if (endMonth > 12) {
                  endYear += 1
                  endMonth = endMonth - 12
                }
              }
            } else if (getMonth === '02') {
              if (endDay > 28) {
                endMonth += 1
                endDay = endDay - 28
                if (endMonth > 12) {
                  endYear += 1
                  endMonth = endMonth - 12
                }
              }
            } else {
              if (endDay > 30) {
                endMonth += 1
                endDay = endDay - 30
                if (endMonth > 12) {
                  endYear += 1
                  endMonth = endMonth - 12
                }
              }
            }
            this.dateList[0].push(this.check(endYear) + '/' + this.check(endMonth) + '/' + this.check(endDay))
          }
          this.dateTime = this.pickerDate + ':00'
        },
        MultiPickerChange (e) {
          if (e.mp.detail.value[0] === 0) {
            if (e.mp.detail.value[1] < this.initIndexMulPicker[1]) {
              this.$showModal()
              return
            }
            if (e.mp.detail.value[1] === this.initIndexMulPicker[1] && e.mp.detail.value[2] < this.initIndexMulPicker[2]) {
              this.$showModal()
              return
            }
          }
          this.indexMulPicker = e.mp.detail.value
          this.pickerDate = this.dateList[0][e.mp.detail.value[0]] + ' ' + this.dateList[1][e.mp.detail.value[1]] + ':' + this.dateList[2][e.mp.detail.value[2]]
          this.dateTime = this.pickerDate + ':00'
        },
        switchChange (e) {
          this.isShare = e.mp.detail.value
        },
        shareWarn () {
          if (!this.share) {
            this.share = !this.share
          }
        },
        knowShare () {
          this.share = !this.share
        },
        navToUper () {
          this.$setStorageSync('topscene', 'createActivities')
          this.$navigateTo('/pages/baseCreateActivity/createActivities')
          this.clearData()
        },
        dataHandle () {
          this.prizeEndTime = new Date(this.dateTime).getTime() + 3000
          const mediaData = this.giftPictures.map((item) => {
            return {
              'type': 'IMAGE',
              'url': item,
              'layout': 'INTRODUCTION',
              'title': '',
              'text': '',
              'order': 0
            }
          })
          if (this.giftItems[0].metadata.image === '') {
            this.giftItems[0].metadata.image = this.giftImgSrc[0]
          }
          if (this.drawRule === 'timed') {
            this.requestMetadata = {
              drawRule: this.drawRule,
              isShare: this.isShare,
              endTimeString: this.pickerDate,
              edition: 'uperEdition',
              prizeExplainText: this.prizeExplainText
            }
          } else {
            this.requestMetadata = {
              drawRule: this.drawRule,
              isShare: this.isShare,
              participantsNum: this.peopleNum,
              edition: 'uperEdition',
              prizeExplainText: this.prizeExplainText
            }
          }
          this.mediaData = mediaData
        },
        promiseAll () {
          const create1 = ActivitiesService.putActivity({
            id: this.activityId,
            request: {
              description: this.prizeDescription,
              endTime: this.prizeEndTime,
              media: this.mediaData
            }
          })
          const create2 = ActivitiesService.postItems({
            id: this.activityId,
            itemsData: this.giftItems
          })
          const create3 = this.metadataService()
          Promise.all([create1, create2, create3]).then(res => {
            this.$hideLoading()
            this.$showToast('修改成功！')
            this.$navigateBack(1)
            this.clearData()
          })
        },
        metadataService () {
          if (this.drawRule === 'timed') {
            ActivitiesService.deleteMetadata({
              id: this.activityId,
              key: 'participantsNum'
            })
          } else {
            ActivitiesService.deleteMetadata({
              id: this.activityId,
              key: 'endTimeString'
            })
          }
          for (const key in this.requestMetadata) {
            ActivitiesService.postMetadata({
              id: this.activityId,
              metadataData: {'key': key, 'value': this.requestMetadata[key]}
            })
          }
        },
        createActivity () {
          this.$showLoading()
          this.dataHandle()
          if (this.activityId) {
            ActivitiesService.deleteItems(this.activityId).then(res => {
              return this.promiseAll()
            })
          } else {
            CreatePersonalActivity.add({
              sellerId: 'system',
              owner: {id: this.userInfo.id, nickName: this.userInfo.nickName, avatar: this.userInfo.avatar},
              type: 'PERSONAL_LUCKY_DRAW',
              description: this.prizeDescription,
              endTime: this.prizeEndTime,
              items: this.giftItems,
              media: this.mediaData,
              metadata: this.requestMetadata
            }).then(res => {
              this.$hideLoading()
              this.$showToast('发起成功！')
              this.$navigateTo(`/pages/activitiesDetails/index?id=${res.data.id}`)
              this.clearData()
            })
          }
          if (this.showAttention) {
            this.showAttention = !this.showAttention
          }
        },
        clearData () {
          this.giftPictures = []
          this.giftImgSrc = ['https://oss.qianbaocard.com/20180913/9c42bcdf5c5c4e8abf4c0dc9c14630a5.jpg']
          this.itemName = []
          this.itemNum = []
          this.prizeDescription = ''
          this.peopleNum = ''
          this.prizeExplainText = ''
          this.isShare = false
          this.drawRule = 'timed'
          this.giftList = [true]
          this.mediaData = []
        },
        hideAttentionModal () {
          if (this.showAttention) {
            this.showAttention = !this.showAttention
          }
        },
        createButton () {
          if (this.itemName.length < this.giftList.length) {
            this.$showToast('请输入奖品名称!')
            return
          }
          if (this.itemNum.length < this.giftList.length) {
            this.$showToast('请输入奖品数量!')
            return
          }
          if (this.drawRule === 'fullParticipant') {
            if (!this.peopleNum) {
              this.$showToast('请输入开奖人数!')
              return
            }
            const openNum = parseInt(this.peopleNum)
            let giftTotalNum = 0
            this.itemNum.forEach(element => {
              giftTotalNum += parseInt(element)
            })
            if (giftTotalNum > openNum) {
              this.$showToast('奖品总数不能大于开奖人数，请重新输入！')
            } else {
              this.showAttention = !this.showAttention
            }
          } else {
            this.createActivity()
          }
        },
        getPersonalActivity (id) {
          CreatePersonalActivity.get({
            id,
            append: 'BET_NUM'
          }).then(res => {
            if (res.code === 0) {
              this.giftImgSrc = []
              res.data.items.forEach(item => {
                this.giftImgSrc.push(item.metadata.image)
                this.itemName.push(item.name)
                this.itemNum.push(item.metadata.num)
              })
              for (let i = 0; i < res.data.items.length - 1; i++) {
                this.giftList.push(true)
              }
              res.data.media.forEach(mediaData => {
                this.giftPictures.push(mediaData.url)
              })
              this.drawRule = res.data.metadata.drawRule
              this.isShare = res.data.metadata.isShare
              this.prizeDescription = res.data.description
              this.prizeExplainText = res.data.metadata.prizeExplainText
              if (res.data.metadata.drawRule === 'timed') {
                this.pickerDate = res.data.metadata.endTimeString
              } else {
                this.peopleNum = res.data.metadata.participantsNum
              }
            }
          })
        }
      },
      onLoad (options) {
        this.clearData()
        this.getNowDate()
        if (options.id) {
          this.activityId = options.id
          this.getPersonalActivity(this.activityId)
        }
        this.userInfo = this.$getStorageSync('userInfo')
      },
      onShow () {
        const cutPicIndex = this.$getStorageSync('cutPicIndex')
        const cutImageSrc = this.$getStorageSync('cutImageSrc')
        this.giftImgSrc[cutPicIndex] = cutImageSrc
        this.giftItems[cutPicIndex].metadata.image = cutPicIndex
      }
    }
</script>

<style>
@import './createActivities.less';
</style>
