<template>
  <div class="takePrize ">
    <!-- 地址展示 -->
    <div class='address'>
      <span class='title antialiased'>
        奖品配送至
      </span>
      <!-- 无地址 -->
      <div @tap="chooseAddress">
        {{address.addition || '选择收货地址 '}} {{isTakePrize ? '>' : ''}}
      </div>
      <text class="phone" v-if='address.phone'>
        {{address.phone}}
      </text>
      <!-- 无地址结束 -->
    </div>
    <!-- 地址展示结束 -->
    <!-- 活动内容-->
    <div class="activitie">
      <div class="top">viod</div>
      <div class="user">
        <div class="head">
          <img :src="userInfo.avatar">
        </div>
        <text class='nickName'>
          {{userInfo.nickName}}
        </text>
        <br />
        <span class="luckyNumber">
          幸运号：{{participant.tickets[0]}}
        </span>
      </div>
      <div class="content">
        <text class="expression">
          {{participant.activity.name}}
        </text>
        <img :src="participant.activity.media[0].url">
      </div>
      <div class="tips antialiased">
        友情提示：完善收货信息后我们会及时与您联
      </div>
    </div>
    <!-- 活动内容结束 -->
    <button @tap="addAddress" class="bottom" v-if='isTakePrize'>
      确认领奖
    </button>
  </div>
</template>
<script>
  import ParticipantsService from '@/services/participantsService'
  import share from '@/common/js/share.js'
  import {
    getUserInfo
  } from '@/utils'
  export default {
    data () {
      return {
        userInfo: {},
        participant: {},
        address: {},
        isTakePrize: true
      }
    },
    methods: {
      getParticipants (activityId) {
        const userInfo = getUserInfo()
        ParticipantsService.get({
          activityId,
          userId: userInfo.id
        }).then((res) => {
          if (res.code === 0 && res.data.length > 0) {
            this.participant = res.data[0]
            if (res.data[0].metadata.address) {
              this.address = JSON.parse(res.data[0].metadata.address)
              this.isTakePrize = false
            } else {
              this.address = {}
              this.isTakePrize = true
            }
          }
        })
      },
      chooseAddress () {
        if (!this.isTakePrize) return false
        this.$chooseAddress().then(res => {
          this.address = {
            phone: res.telNumber,
            name: res.userName,
            address: res.detailInfo,
            addition: res.provinceName + res.cityName + res.countyName + res.detailInfo
          }
        })
      },
      addAddress () {
        if (!this.address.phone) {
          this.$showToast('请选择地址')
          return false
        }
        ParticipantsService.addMetadata({
          id: this.participant.id,
          key: 'address',
          value: JSON.stringify(this.address)
        }).then((res) => {
          if (res.code === 0) {
            this.$navigateBack()
          }
        })
      }
    },
    onLoad (data) {
      const userInfo = getUserInfo()
      this.userInfo = userInfo
      this.getParticipants(data.id)
    },
    onShareAppMessage: share()
  }
</script>
<style scoped>
  @import './index.less';
</style>