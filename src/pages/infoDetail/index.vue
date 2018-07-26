<template>
  <div  class="info_container">
    <div class="infoHeader">
      <div class="infoImg">
        <img :src='userInfo.wx.avatar' />
        <text>{{userInfo.wx.nickName}}</text>
      </div>
      <div class="info_r">
        <div class="editInfo">
          <a :href="'/pages/editInfo/index'">
            <span >完善资料</span>
          <!--   <span >+100 <i calss="icon"></i></span>
        </a> -->
        <span >+100 </span><img src="/static/img/goldBean.png">
      </a>
    </div>
  </div>
</div >
<div class="info_content">
  <div class="content_detail">
    <div class="infoDetail clearfix">
      <div  class="" style="flex:1">
        <div class="detailNum">{{score + ''}}</div>
        <div class="detailContent">我的金豆</div>
        <div class="interval"></div>
      </div>
      <a href="/pages/meActivitiesList/index?type=all" style="flex:1">
        <div  class="detailNum">{{activitieTotal}}</div>
        <div  class="detailContent">全部抽奖</div>
        <div class="interval"></div>
      </a>
      <a href="/pages/meActivitiesList/index?type=lucky" style="flex:1">
        <div class="detailNum">{{LuckyActivitieTotal}}</div>
        <div class="detailContent">中奖记录</div>
      </a>
    </div>
  </div>
  <div class="makeJob">
   <h5 class="antialiased">做任务 赚金豆</h5>
   <div class="jobDetail">
     <ul>
      <li>
        <div>
          <div>
            <span>绑定手机号</span>
            <div class="right">
              <span>
                0
              </span>
              /10
            </div>
          </div>
          <span>
           可得：10<img src="/static/img/goldBean.png" />
         </span>
         <button>
          立即领取
        </button>
      </div>
    </li>
    <li>
      <div>
        <div>
          <span>分享</span>
          <div class="right">
            <span>
              0
            </span>
            /10
          </div>
        </div>
        <span>
         一次可得：10<img src="/static/img/goldBean.png" />
       </span>
       <button>
        立即领取
      </button>
    </div>
  </li>
</ul>
</div>
</div>
<div class="infoQue">
  <div>常见问题</div>
  <div class="arrow"></div>
</div>
</div>
<signIn :signInCB = "signInCB" :showModel = "isModel"/>
</div>

</template>
<style scoped>
  @import './index.less';
</style>
<script>
  import {getUserInfo} from '@/utils'
  import signIn from '@/components/signIn'
  import ParticipantsService from '@/services/participantsService'
  import config from 'config'
  export default {
    data () {
      return ({
        userInfo: {
          wx: {}
        },
        activitieTotal: 0,
        LuckyActivitieTotal: 0,
        isModel: false,
        score: 0
      })
    },
    components: {
      signIn
    },
    methods: {
      signInCB (data) {
        const userInfo = getUserInfo()
        this.isModel = false
        this.userInfo = userInfo
        this.getParticipants(userInfo)
        this.score = data.score || this.$getStorageSync('score')
      },
      getParticipants (userInfo) {
        // 查询用户一共参与多少活动
        ParticipantsService.get({
          userId: userInfo.id
        }).then((res) => {
          if (res.code === 0 && res.data.length > 0) {
            this.activitieTotal = res.total
          }
        })
        // 查询中奖活动
        ParticipantsService.get({
          userId: userInfo.id,
          lucky: true
        }).then((res) => {
          if (res.code === 0) {
            this.LuckyActivitieTotal = res.total
          }
        })
      }
    },
    onShow () {
      const userInfo = getUserInfo()
      if (userInfo.id) {
        this.signInCB({})
      }
    },
    onShareAppMessage () {
      return config.share
    }
  }
</script>

