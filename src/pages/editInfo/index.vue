<template>
 <div class="edit_container">
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
     <div class="male" :class="{active:userInfo.gender === 'MALE'}">男</div>
     <div class="male" :class="{active:chooseMale == 1}">女</div>
   </div>
 </li>
 <li class="bd">
  <div class="list_l">生日 <span v-if="rule.birthday">+{{rule.birthday}} <img src='/static/img/goldBean.png'></span></div>
  <div class="list_r" style="display:flex;">
   <div class="index_section">
    <picker mode="date" :endDate = "endDate" @change="bindDateChangeUser('birthday', $event)">
      <div class="index_picker">
        <div class="">{{ userInfo.birthday||'未添加' }}</div>
      </div>
    </picker>
  </div>
  &nbsp;&nbsp;<i class="arrow icon iconfont icon-huise"></i>
</div>
</li>
<a href="/pages/mobile/index" class="bd">
  <div class="list_l">手机号 <span>+{{rule.mobile}} <img src='/static/img/goldBean.png'></span></div>
  <div class="list_r">{{getNum}}<i class="arrow icon iconfont icon-huise"></i></div>
</a>
<li class="bd" @click ="chooseLocation">
  <div class="list_l">地址 <span>+{{rule.area}} <img src='/static/img/goldBean.png'></span></div>
  <div class="list_r">{{infoArea}}<i class="arrow icon iconfont icon-huise"></i></div>
</li>
</ul>
</div>
</div>
</template>
<script>
  import {getUserInfo} from '@/utils'
  import userService from '@/services/userService'
  import ScoreRulesService from '@/services/scoreRulesService'

  export default {
    data () {
      return {
        startDate: '',
        pickerStart: '',
        chooseMale: 0,
        infoArea: '未选择',
        getNum: '未绑定',
        userInfo: {},
        rule: {}
      }
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
        userService.put({
          id: this.userInfo.id,
          [type]: val
        }).then(res => {
          if (res.code === 0) {
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
          }
        })
      },
      // 选择区域
      chooseLocation () {
        this.$chooseLocation().then(res => {
          console.log('res', res)
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
    }
  }
</script>
<style scoped>
  @import './index.less';
</style>