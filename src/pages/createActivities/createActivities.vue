<template>
    <div class="page">
        <top title="新建抽奖" />
        <div v-if="!addPic">
            <div v-for="(item,index) in giftList" :key="index">
                <addGiftComp :addGiftPic="addGiftPic" :showCanvas="giftList[index]"
                :giftImgSrc="giftImgSrc[index]" :index="index" :deleteGiftList="deleteGiftList"
                :itemNameChange="itemNameChange" :itemNumChange="itemNumChange"
                :itemName="itemName" :itemNum="itemNum" :getImage="getImage" />
            </div>
            <div class="addGift_div">
                <div class="add_gift" @click="addGift">
                    <div>+添加奖项</div>
                </div>
            </div>
            <div class="weui-cells weui-cells_after-title" style="margin-top: 8px;">
                <div class="weui-cell weui-cell_access border-middle">
                    <div class="weui-cell__bd">抽奖说明</div>
                    <span class="weui-cell__ft" style="font-size:12px;font-family:PingFangSC-Regular;font-weight:400;color:rgba(153,153,153,1);">{{prizeTextLength}}/100</span>
                </div>
                <div class="weui-cell weui-cell_access">
                    <textarea class="weui-cell__bd" placeholder="请输入" maxlength="100" auto-height="true" :value="prizeExplainText" @input="prizeExplain"></textarea>
                </div>
            </div>
            <div class="weui-cells weui-cells_after-title" style="margin-top: 8px;">
                <div class="weui-cell weui-cell_access border-middle">
                    <div class="weui-cell__bd">奖品介绍</div>
                    <span class="weui-cell__ft" style="font-size:12px;font-family:PingFangSC-Regular;font-weight:400;color:rgba(153,153,153,1);">{{giftTextLength}}/100</span>
                </div>
                <div class="turnLine">
                    <img src="../../../static/img/addPrizePic.png" class="addPicture" @click="addPicture" />
                    <div v-if="showGiftPictures" v-for="(item, index) in giftPictures" :key="index" class="showPicDiv">
                      <img :src="item" style="width:110px;height:55px;vertical-align:top;">
                      <div class="deleteIconDiv" @click="deleteGiftPic(index)">
                        <img src="../../../static/img/delete.png" class="deleteIcon" />
                      </div>
                    </div>
                </div>
                <div class="weui-cell weui-cell_access">
                    <textarea class="weui-cell__bd" placeholder="请输入" :value="prizeDescription" maxlength="100" auto-height="true" @input="giftExplain"></textarea>
                </div>
            </div>
            <div class="weui-cells weui-cells_after-title" style="margin-top: 8px;">
                <div class="weui-cell weui-cell_access border-middle">
                    <div class="weui-cell__bd">开奖方式</div>
                    <div class="weui-cell__ft">
                      <radio-group class="radio-group" @change="radioChange">
                          <radio style="transform:scale(0.8);position:relative;left:5px;bottom:2px" value="timed" color="red" :checked="radioCheck"/>到时间
                          <radio style="transform:scale(0.8);position:relative;left:5px;bottom:2px" value="fullParticipant" :checked="!radioCheck" color="red" />满人数
                      </radio-group>
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
                    <div class="weui-cell__bd">开奖人数 <span style="color: red">*</span></div>
                    <input type="number" placeholder="数量" :value="peopleNum" @input="fullParticipantNum" class="weui-cell__ft" style="color:black;display: inline;vertical-align: middle;" />
                    <span class="weui-cell__ft" style="margin-left:5px;vertical-align: middle;">人</span>
                </div>
            </div>
            <div class="weui-cells weui-cells_after-title" style="margin-top: 8px;">
                <div class="weui-cell weui-cell_access" style="padding:5px 0">
                    <div class="weui-cell__bd">允许参与者分享</div>
                    <switch class="weui-cell__ft" @change="switchChange" :checked="isShare" style="transform:scale(0.8);position:relative;left:10px" />
                </div>
            </div>
            <div class="uperAddActivity" @click="navToUper"><span>使用基本版&nbsp;></span></div>
            <div class="weui-cells weui-cells_after-title" style="margin-top: 48px;padding:8px 15px;">
                <div class="createActivities" @click="createButton">发起抽奖</div>
            </div>
        </div>
        <div v-if="addPic">
          <chooseImage :showImage="showImage" :picIndex="picIndex" :picIndexSrc="picIndexSrc" :imageSrc="imageSrc" />
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
          radioCheck: true,
          giftList: [true],
          addPic: false,
          prizeExplainText: '',
          showCanvas: false,
          giftImgSrc: ['https://oss.qianbaocard.com/20180913/9c42bcdf5c5c4e8abf4c0dc9c14630a5.jpg'],
          picIndex: 0,
          picIndexSrc: '',
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
          giftItems: [{id: 'system', name: '', metadata: {url: '', num: 0}}],
          prizeEndTime: 0,
          jsonString: '',
          mediaData: [],
          showAttention: false
        }
      },
      components: {
        top,
        addGiftComp,
        chooseImage,
        createAttention,
        allowedShare
      },
      methods: {
        addGift () {
          let gl = this.giftList
          gl.push(true)
          this.giftList = gl
          this.giftItems.push({id: 'system', name: '', metadata: {url: '', num: 0}})
          this.giftImgSrc.push('https://oss.qianbaocard.com/20180913/9c42bcdf5c5c4e8abf4c0dc9c14630a5.jpg')
        },
        getImage (index, picIndexSrc) {
          this.$chooseImage().then(res => {
            this.imageSrc = res.tempFilePaths[0]
            this.addPic = !this.addPic
            this.picIndex = index
            this.picIndexSrc = picIndexSrc
          })
        },
        itemNameChange (e) {
          const itemNameIndex = e.mp.currentTarget.dataset.index
          this.itemName[itemNameIndex] = e.mp.detail.value
          this.giftItems[itemNameIndex].name = e.mp.detail.value
        },
        itemNumChange (e) {
          const itemNumIndex = e.mp.currentTarget.dataset.index
          this.itemNum[itemNumIndex] = e.mp.detail.value
          this.giftItems[itemNumIndex].metadata.num = e.mp.detail.value
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
        showImage (src, index) {
          this.addPic = !this.addPic
          if (this.giftList[index]) {
            this.giftList[index] = !this.giftList[index]
          }
          this.giftImgSrc[index] = src
          this.giftItems[index].metadata.image = src
        },
        prizeExplain (e) {
          this.prizeTextLength = e.mp.detail.value.length
          this.prizeExplainText = e.mp.detail.value
        },
        giftExplain (e) {
          this.giftTextLength = e.mp.detail.value.length
          this.prizeDescription = e.mp.detail.value
        },
        addPicture () {
          this.$chooseImage().then(res => {
            this.giftPictures.push(res.tempFilePaths[0])
            this.showGiftPictures = true
          })
        },
        deleteGiftPic (index) {
          this.giftPictures.splice(index, 1)
        },
        radioChange (e) {
          this.drawRule = e.mp.detail.value
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
        fullParticipantNum (e) {
          this.peopleNum = e.mp.detail.value
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
          if (e.mp.detail.value) {
            this.share = !this.share
          }
        },
        knowShare () {
          this.share = !this.share
        },
        navToUper () {
          this.$switchTab('/pages/baseCreateActivity/createActivities')
        },
        dataHandle () {
          this.prizeEndTime = new Date(this.dateTime).getTime() + 3000
          this.giftImgSrc.map((item) => {
            this.mediaData.push({
              'type': 'IMAGE',
              'url': item,
              'layout': 'COVER',
              'title': '',
              'text': '',
              'order': 0
            })
          })
          let jsonArr = []
          if (!this.giftPictures.length) return
          for (let i = 0; i < this.giftPictures.length; i++) {
            jsonArr.push({'picUrl': this.giftPictures[i]})
          }
          this.jsonString = JSON.stringify(jsonArr)
        },
        createActivity () {
          this.dataHandle()
          if (this.giftItems[0].metadata.url === '') {
            this.giftItems[0].metadata.image = this.giftImgSrc[0]
          }
          CreatePersonalActivity.createActivity({
            sellerId: 'system',
            owner: {id: this.userInfo.id, nickName: this.userInfo.nickName, avatar: this.userInfo.avatar},
            type: 'PERSONAL_LUCKY_DRAW',
            description: this.prizeDescription,
            endTime: this.prizeEndTime,
            items: this.giftItems,
            media: this.mediaData,
            metadata: {
              drawRule: this.drawRule,
              urls: this.jsonString,
              isShare: this.isShare,
              prizeExplainText: this.prizeExplainText,
              endTimeString: this.pickerDate,
              participantsNum: this.peopleNum,
              edition: 'uperEdition'
            }
          }).then(res => {
            this.$navigateTo(`/pages/activitiesDetails/index?id=${res.data.id}`)
            this.mediaData = []
            if (this.showAttention) {
              this.showAttention = !this.showAttention
            }
          })
        },
        hideAttentionModal () {
          if (this.showAttention) {
            this.showAttention = !this.showAttention
          }
        },
        createButton () {
          if (this.peopleNumInput === 'null') {
            this.$showToast('请输入开奖人数!')
            return
          }
          if (this.itemName.length < this.giftList.length) {
            this.$showToast('请输入奖品名称!')
            return
          }
          if (this.itemNum.length < this.giftList.length) {
            this.$showToast('请输入奖品数量!')
            return
          }
          if (this.drawRule === 'fullParticipant') {
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
              console.log(res.data)
              res.data.items.forEach(item => {
                this.giftImgSrc.push(item.metadata.image)
                this.itemName.push(item.name)
                this.itemNum.push(item.metadata.num)
              })
              res.data.metadata.urls = JSON.parse(res.data.metadata.urls)
              res.data.metadata.urls.forEach(element => {
                this.giftPictures.push(element.url)
              })
              this.drawRule = res.data.metadata.drawRule
              this.isShare = res.data.metadata.isShare
              this.prizeDescription = res.data.description
              this.prizeExplainText = res.data.metadata.prizeExplainText
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
        if (options.id) {
          this.getPersonalActivity(options.id)
        } else {
          this.giftPictures = []
          this.giftImgSrc = ['https://oss.qianbaocard.com/20180913/9c42bcdf5c5c4e8abf4c0dc9c14630a5.jpg']
          this.itemName = []
          this.itemNum = []
          this.prizeDescription = ''
          this.peopleNum = ''
        }
        this.userInfo = this.$getStorageSync('userInfo')
        this.getNowDate()
      }
    }
</script>

<style>
@import './createActivities.less';
</style>
