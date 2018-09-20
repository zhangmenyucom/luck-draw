<template>
    <div>
        <top title='中奖者'/>
        <div class="head">
            <div class="IconDiv">
                <img class="activityPic" :src="activity.items[0].metadata.image"/>
                <div class="joinNum">参与人数<span style="color:#FDB700;">{{activity.realNum}}</span>人</div>
            </div>
            <div class="activityInfo">
                <div class="title">[ 奖品 ]&nbsp;{{activity.name}}</div>
                <div class="person">中奖人数: <span style="color: #FE4C52">{{luckyItems.length}}</span>人</div>
                <div class="person">已领奖人数:<span style="color: #FE4C52">{{getAddressNum}}</span>人</div>
            </div>
        </div>
        <div class="boxImage">
            <img src="/static/img/luckier.png" class="imgTitle">
            <span>中奖名单</span>
            <div class="list">
                <div class="list-content">
                    <div v-for="(item, index) in luckyItems" :class="index === luckyItems.length-1?'bottomMargin':''">
                        <div class="list-content-one">
                            <div >
                                <div class="avatar"><img :src="item.user.avatar" alt=""></div>
                                <div class="name">{{item.user.nickName}}</div>
                                <div class="prizeInfo">奖品：&nbsp;{{item.metadata.rewards[0].name}}&nbsp;&nbsp;&nbsp;&nbsp;X{{item.metadata.rewards[0].metadata || '1'}}</div>
                            </div>
                            <p class="name-call" style="font-size:12px">收货信息</p>
                            <div v-if="item.metadata.address">
                                <p class="name-call">{{item.metadata.address.name}}&nbsp;&nbsp;&nbsp;{{item.metadata.address.phone}}</p>
                                <p class="address">{{item.metadata.address.addition}}</p>
                            </div>
                            <div v-else class="noAddress">
                                未填写
                            </div>
                        </div>
                        <div v-if="index<luckyItems.length-1" class="solidDiv"></div>
                    </div>
                </div>
                <div class="foot" >
                    <button class="btn" @tap="copyAll">复制全部</button>
                    <button class="btn btn2" @tap="sendToEmail">发送邮箱</button>
                </div>
            </div>
        </div>
        <sendEmail v-if="showEmailModal" :cancleButton="cancleButton" :confirmButton="confirmButton" :emailId="emailId" :emailInputChange="emailInputChange" />
    </div>
</template>
<script>
import top from '@/components/top'
import sendEmail from '@/components/sendEmail'
import participantsService from '@/services/participantsService'
import ActivitiesService from '@/services/activitiesService'
import SendEmail from '@/services/sendEmailService'
import share from '@/common/js/share.js'
export default {
  data () {
    return {
      luckyItems: [{
        user: {},
        metadata: {rewards: [{metadata: {num: 0}}]}
      }],
      activity: {realNum: 0, media: [ 'url' ], items: [{metadata: {image: ''}}]},
      getAddressNum: 0,
      copyData: '',
      emailId: '',
      showEmailModal: false
    }
  },
  components: {
    top,
    sendEmail
  },
  methods: {
    copyAll () {
      this.$setClipboardData({
        data: this.copyData
      })
    },
    sendToEmail () {
      this.showEmailModal = !this.showEmailModal
    },
    getParticipants (id) { // 获取活动详情
      participantsService.getList({
        activityId: id,
        lucky: true
      }).then((res) => {
        if (res.code === 0) {
          // 处理中奖信息
          this.luckyItems = res.data
          this.luckyItems.forEach(element => {
            let tel = ''
            let address = ''
            element.metadata.rewards = JSON.parse(element.metadata.rewards)
            if (element.metadata.address) {
              element.metadata.address = JSON.parse(element.metadata.address)
              this.getAddressNum += 1
              tel = element.metadata.address.phone
              address = element.metadata.address.addition
            } else {
              tel = '未填写'
              address = '未填写'
            }

            if (element.metadata.rewards[0].metadata) {
              this.copyData += '姓名:' + element.user.nickName +
                                      '    奖品:' + element.metadata.rewards[0].name + 'X' + (element.metadata.rewards[0].metadata.num || '0') +
                                      '    联系电话:' + tel +
                                      '    收货地址:' + address + '        '
            }
          })
        }
      })
    },
    getActivities (id) {
      ActivitiesService.get({
        id,
        append: 'PARTICIPANT'
      }).then(res => {
        this.activity = res.data
      })
    },
    cancleButton () {
      this.showEmailModal = !this.showEmailModal
    },
    confirmButton () {
      this.$showLoading()
      SendEmail.sendEmail({
        subject: '中奖者名单',
        targetAddress: this.emailId,
        text: this.copyData
      }).then(res => {
        this.$hideLoading()
        this.$emailToast('发送成功!')
      })
      this.showEmailModal = !this.showEmailModal
    },
    emailInputChange (e) {
      this.emailId = e.mp.detail.value
    }
  },
  onLoad (data) {
    this.getParticipants(data.id)
    this.getActivities(data.id)
  },
  onShareAppMessage: share()
}
</script>

<style scoped>
@import './index.less';
</style>

