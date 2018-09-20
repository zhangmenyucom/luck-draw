<template>
    <div class="page">
        <top title="新建抽奖" />
        <div>
            <div v-for="(item,index) in giftList" :key="index">
                <addGiftComp
                :showCanvas="giftList[index]" :giftImgSrc="giftImgSrc[index]"
                :index="index" :deleteGiftList="deleteGiftList"
                :inputText="inputText"
                :itemName="itemName" :itemNum="itemNum"
                :getImage="getImage" />
            </div>
            <div class="weui-cells weui-cells_after-title" style="margin-top: 8px;">
                <div class="weui-cell weui-cell_access border-middle">
                    <div class="weui-cell__bd">开奖方式</div>
                    <div class="weui-cell__ft">
                      <div class="radioDiv div-marginR" @tap="openByTime">
                        <img class="radioIcon" :src="drawRule == 'timed' ? '/static/img/radio1.png' : '/static/img/radio2.png'" />
                        <span class="radioText">到时间</span>
                      </div>
                      <div class="radioDiv" @tap="openByPeople">
                        <img class="radioIcon" :src="drawRule !== 'timed' ? '/static/img/radio1.png' : '/static/img/radio2.png'" />
                        <span class="radioText">满人数</span>
                      </div>
                    </div>
                </div>
                <div v-if="drawRule === 'timed'" class="weui-cell weui-cell_access">
                    <div class="weui-cell__bd"><div>开奖时间<span style="color: red">*</span></div></div>
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
                    <input id="fullPeopleNum" type="number" v-model="peopleNum" placeholder="数量" class="weui-cell__ft" style="color:black;display: inline;vertical-align: middle;" />
                    <span class="weui-cell__ft" style="margin-left:5px;vertical-align: middle;">人</span>
                </div>
            </div>
            <div class="uperAddActivity" @click="navToUper"><span>使用高级版&nbsp;></span></div>
            <div class="weui-cells weui-cells_after-title" style="position:fixed;bottom:0;padding:8px 15px;">
                <div class="createActivities" @click="createButton">发起抽奖</div>
            </div>
        </div>
        <createAttention v-if="showAttention" :createActivity="createActivity" :hideAttentionModal="hideAttentionModal" />
    </div>
</template>

<script>
    import top from '@/components/top'
    import createAttention from '@/components/createTimedAttention'
    import addGiftComp from '@/components/baseAddGift'
    import chooseImage from '@/components/chooseImage'
    import CreatePersonalActivity from '@/services/createPersonalActivity'
    import ActivitiesService from '@/services/activitiesService'

    export default {
      data () {
        return {
          imageSrc: '',
          dateTime: '',
          giftList: [true],
          showCanvas: false,
          giftImgSrc: ['https://oss.qianbaocard.com/20180913/9c42bcdf5c5c4e8abf4c0dc9c14630a5.jpg'],
          picIndex: 0,
          picIndexSrc: '',
          prizeTextLength: 0,
          giftTextLength: 0,
          giftPictures: [],
          radioCheck: true,
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
          isShare: true,
          itemName: [],
          itemNum: [],
          peopleNum: '',
          giftItems: [{id: 'system', name: '', metadata: {image: '', num: 0}}],
          prizeEndTime: 0,
          jsonString: '',
          mediaData: [],
          showAttention: false,
          activityId: '',
          requestMetadata: {}
        }
      },
      components: {
        top,
        addGiftComp,
        chooseImage,
        createAttention
      },
      methods: {
        inputText (e) {
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
        getImage (index, picIndexSrc) {
          this.$chooseImage().then(res => {
            this.imageSrc = res.tempFilePaths[0]
            this.$navigateTo('/pages/cutImage/index?imgSrc=' + res.tempFilePaths[0] + '&picIndex=' + index + '&edition=baseEdition')
          })
        },
        openByPeople () {
          this.drawRule = 'fullParticipant'
          // if (this.radioCheck) {
          //   this.radioCheck = !this.radioCheck
          // }
        },
        openByTime () {
          this.drawRule = 'timed'
          // if (!this.radioCheck) {
          //   this.radioCheck = !this.radioCheck
          // }
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
        navToUper () {
          this.$setStorageSync('topscene', 'createActivities')
          if (this.activityId) {
            this.$navigateTo('/pages/createActivities/createActivities?id=' + this.activityId)
          } else {
            this.$navigateTo('/pages/createActivities/createActivities')
          }
          this.clearData()
        },
        clearData () {
          this.giftImgSrc = ['https://oss.qianbaocard.com/20180913/9c42bcdf5c5c4e8abf4c0dc9c14630a5.jpg']
          this.itemName = []
          this.itemNum = []
          this.peopleNum = ''
          this.radioCheck = true
          this.drawRule = 'timed'
        },
        dataHandle () {
          this.prizeEndTime = new Date(this.dateTime).getTime() + 3000
          if (this.giftItems[0].metadata.url === '') {
            this.giftItems[0].metadata.image = this.giftImgSrc[0]
          }
          if (this.drawRule === 'timed') {
            this.requestMetadata = {
              drawRule: this.drawRule,
              isShare: this.isShare,
              endTimeString: this.pickerDate,
              edition: 'baseEdition',
              prizeExplainText: this.prizeExplainText
            }
          } else {
            this.requestMetadata = {
              drawRule: this.drawRule,
              isShare: this.isShare,
              participantsNum: this.peopleNum,
              edition: 'baseEdition',
              prizeExplainText: this.prizeExplainText
            }
          }
        },
         promiseAll () {
          console.log('2', this.mediaData)
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
              this.promiseAll()
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
            })
          }
          this.mediaData = []
          this.clearData()
          if (this.showAttention) {
            this.showAttention = !this.showAttention
          }
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
          ActivitiesService.get({
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
              this.drawRule = res.data.metadata.drawRule
              if (res.data.metadata.drawRule === 'timed') {
                this.radioCheck = true
                this.pickerDate = res.data.metadata.endTimeString
              } else {
                this.radioCheck = false
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
