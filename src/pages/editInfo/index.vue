<template>
 <div class="edit_container">
  <top title="我的资料" />
  <div class="editList">
   <ul>
    <li class="bd">
      <div class="list_l">头像</div>
      <div class="list_r">
       <div class="img">
        <img :src='userInfo.avatar' />
      </div>
    </div>
  </li>
  <li class="bd">
    <div class="list_l">昵称</div>
    <div class="list_r">{{userInfo.nickName}}</div>
  </li>
  <li class="bd">
    <div class="list_l">性别</div>
    <div class="list_r list_info">
     <div class="male active" v-if="userInfo.gender === 'MALE'">男</div>
     <div class="male active" v-else>女</div>
   </div>
 </li>
 <li class="bd">
  <div class="list_l">生日 <span v-if="rule.birthday && !userInfo.birthday">+{{rule.birthday}} <img src='/static/img/goldBean.png'></span></div>
  <div class="list_r" style="display:flex;">
   <div class="index_section">
    <div class="index_picker" v-if='userInfo.birthday'>
      <div class="">{{ userInfo.birthday}}</div>
    </div>
    <picker v-else mode="date" :endDate = "endDate" @change="bindDateChangeUser('birthday', $event)">
      <div class="index_picker">
        <div class="">未添加</div>
      </div>
    </picker>
  </div>
  &nbsp;&nbsp;<i v-if="!rule.birthday" class="arrow icon iconfont icon-huise"></i>
</div>
</li>
<a v-if="userInfo.contactNumber" class="bd">
  <div class="list_l">手机号</div>
  <div class="list_r">
    {{userInfo.contactNumber}}
  </div>
</a>
<a v-else href="/pages/mobile/index" class="bd">
  <div class="list_l">手机号 <span>+{{rule.mobile}} <img src='/static/img/goldBean.png'></span></div>
  <button class="list_r button"> 去绑定
    <i class="arrow icon iconfont icon-huise"></i>
  </button>
</a>
<li v-if="userInfo.location" class="bd" >
  <div class="list_l">地址</div>
  <div class="list_r">{{userInfo.location.address}}</div>
</li>
<li v-else class="bd">
  <div class="list_l">地址 <span>+{{rule.area}} <img src='/static/img/goldBean.png'></span></div>
  <div @click ="chooseLocation" class="list_r">{{infoArea}}<i class="arrow icon iconfont icon-huise"></i></div>
  <!-- <button  v-else open-type="openSetting" @openSetting="chooseLocation" class="list_r button">{{infoArea}}<i class="arrow icon iconfont icon-huise"></i></button> -->
</li>
</ul>
</div>
</div>
</template>
<script>
  import {getUserInfo} from '@/utils'
  import userService from '@/services/userService'
  import ScoreRulesService from '@/services/scoreRulesService'
  import share from '@/common/js/share.js'
  import top from '@/components/top'
  export default {
    data () {
      return {
        startDate: '',
        pickerStart: '',
        chooseMale: 0,
        infoArea: '未选择',
        getNum: '未绑定',
        userInfo: {},
        rule: {},
        isLocation: true
      }
    },
    components: {
      top
    },
    methods: {
      getToday () {
        let myDate = new Date()
        let myMonth = myDate.getMonth() + 1
        if (myMonth < 10) {
          myMonth = '0' + myMonth // 补齐
        }
        let mydate = myDate.getDate()
        if (myDate.getDate() < 10) {
          mydate = '0' + myDate.getDate() // 补齐
        }
        let today = myDate.getFullYear() + '-' + myMonth + '-' + mydate
        return today
      },
      bindDateChangeUser (type, e) {
        const val = e.target.value
        this.userPut(type, val)
      },
      userPut (type, val) {
        userService.put({
          id: this.userInfo.id,
          [type]: val
        }).then(res => {
          if (res.code === 0) {
            console.log('res.data', res.data)
            res.data.birthday = res.data.birthday.toString()
            this.userInfo = res.data
            this.$setStorageSync('userInfo', res.data)
          }
        })
      },
      // 获取积分规则
      getScoreRules () {
        ScoreRulesService.getList().then(res => {
          if (res.code === 0) {
            this.rule = JSON.parse(res.data.filter(data => data.type === 4)[0] ? res.data.filter(data => data.type === 4)[0].rule : {})
            console.log('rule', this.rule)
          }
        })
      },
      // 选择区域
      chooseLocation () {
        this.$chooseLocation().then(res => {
          if (!res) return
          this.userPut('location', {
            addition: res.address + '-' + res.name,
            address: res.address,
            area: {
              code: '',
              name: ''
            },
            circle: {
              code: '',
              name: ''
            },
            city: {
              code: '',
              name: ''
            },
            country: {
              code: '',
              name: ''
            },
            gps: '0,0',
            province: {
              code: '',
              name: ''
            },
            region: {
              code: '',
              name: ''
            },
            street: {
              code: '',
              name: ''
            }
          })
        })
      }
    },
    onShow () {
      let today = this.getToday()
      this.startDate = today
      this.endDate = today
      this.pickerStart = today
      const userInfo = getUserInfo()
      this.userInfo = userInfo
      this.getScoreRules()
      this.$getSetting().then(res => {
        this.isLocation = res.authSetting['scope.userLocation']
      })
    },
    onShareAppMessage: share()
  }
</script>
<style scoped>
  @import './index.less';
</style>