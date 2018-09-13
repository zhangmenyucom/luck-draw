<template>
  <div class="takePrize ">
    <top title='领奖' />
    <!-- 地址展示 -->
    <div class='tips'>
      请在开奖七天内填写，超时后不能填写
    </div>
    <div class="address">
        <span class="title bold">
          收货地址
        </span>
      <div @tap="chooseAddress" class="center">
          <div>
          <span v-if='!address.phone'>选择收货地址</span>
          <span v-else>
            {{address.name}}   {{address.phone}}<br />
            {{address.addition}}
          </span>
          </div>
          <i class ='icon iconfont icon-xuanzedizhi' />
      </div>
    </div>
    <div class="address">
      <span class="title bold">
        备注
      </span>
      <div class="center">
        <textarea auto-height :disabled='isTakePrize' v-model='remarks' placeholder='请输入' name=""></textarea>
      </div>
    </div>
    <button @tap="addAddress"  class="bottom" v-if='isTakePrize'>
      确认领奖
    </button>
  </div>
</template>
<script>
  import ParticipantsService from '@/services/participantsService'
  import top from '@/components/top'
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
        isTakePrize: true,
        remarks: ''
      }
    },
    components: {
      top
    },
    methods: {
      getParticipants (participantId) {
        const userInfo = getUserInfo()
        ParticipantsService.get({
          id: participantId,
          userId: userInfo.id
        }).then((res) => {
          if (res.code === 0 && res.data.id) {
            this.participant = res.data
            if (res.data.metadata.address) {
              this.address = JSON.parse(res.data.metadata.address)
              this.remarks = this.address.remarks
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
        this.address.remarks = this.remarks
        console.log('this.participant', this.participant)
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