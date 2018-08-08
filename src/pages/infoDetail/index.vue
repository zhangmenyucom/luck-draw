<template>
  <div class="info_container">
    <top :hideIcone='true' title='我的' />
    <load :isshow="isShow" />
    <div v-if='!isShow'>
      <div class="infoHeader">
        <div class="infoImg">
          <img :src='userInfo.wx.avatar' />
          <text>{{userInfo.wx.nickName}}</text>
        </div>
        <div class="info_r">
          <div class="editInfo">
            <a href="/pages/editInfo/index" class="antialiased">
              <span v-if="rule.total">完善资料&nbsp;&nbsp;</span>
              <span v-else>查看资料&nbsp;&nbsp;</span>
              <span v-if="rule.total">+{{rule.total}}</span>&nbsp;
              <img v-if="rule.total" src="/static/img/goldBean.png">
            </a>
          </div>
        </div>
      </div >
      <div class="info_content">
        <div class="content_detail">
          <div class="infoDetail clearfix">
            <a href="/pages/meIntegral/index" class="" style="flex:1">
              <div class="detailNum">{{score + ''}}</div>
              <div class="detailContent">我的金豆</div>
              <div class="interval"></div>
            </a>
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
                  <span>分享</span>
                  <div class="right">
                    <span>
                      {{shareRule.base * (shareNumber > shareRule.maxStep ? shareRule.maxStep : shareNumber )}}
                    </span>
                    /{{shareRule.maxStep * shareRule.base}}
                  </div>
                </div>
                <span>
                 一次/{{shareRule.base}}<img src="/static/img/goldBean.png" />
               </span>
               <button open-type="share">
                立即领取
              </button>
            </div>
          </li>
          <a :href="!userInfo.contactNumber? '/pages/mobile/index' : ''">
            <div>
              <div>
                <span>绑定手机号</span>
                <div class="right">
                  <span>
                    {{userInfo.contactNumber ? rule.mobile : 0}}
                  </span>
                  /{{rule.mobile}}
                </div>
              </div>
              <span>
               可得：{{rule.mobile}}<img src="/static/img/goldBean.png" />
             </span>
             <button :class="{disableButton:userInfo.contactNumber}">
              {{userInfo.contactNumber ? '已领取' : '去领取'}}
            </button>
          </div>
        </a>
      </ul>
    </div>
  </div>
  <div class="infoQue">
    <div>常见问题</div>
    <div class="arrow"></div>
  </div>
</div>
<signIn :signInCB = "signInCB" :showModel = "!isModel"/>
</div>
</div>

</template>
<style scoped>
  @import './index.less';
</style>
<script>
  import load from '@/components/loading'
  import top from '@/components/top'
  import {getUserInfo, check} from '@/utils'
  import signIn from '@/components/signIn'
  import ParticipantsService from '@/services/participantsService'
  import MeScoresService from '@/services/meScoresService.js'
  import ScoreRulesService from '@/services/scoreRulesService'
  import getMeScores from '@/common/js/getMeScores.js'
  import share from '@/common/js/share.js'
  import DailyFootprintsService from '@/services/dailyFootprintsService'
  export default {
    data () {
      return ({
        userInfo: {
          wx: {}
        },
        activitieTotal: 0,
        LuckyActivitieTotal: 0,
        isModel: true,
        score: 0,
        rule: {},
        shareRule: {},
        shareNumber: 0,
        isShow: true
      })
    },
    components: {
      signIn,
      load,
      top
    },
    methods: {
      signInCB (data) {
        const userInfo = getUserInfo()
        const signIn = this.$getStorageSync('signIn')
        if (signIn) {
          this.isModel = false
        }
        this.userInfo = userInfo
        this.getParticipants(userInfo)
        this.getScoreRules()
        if (data.score) {
          // 签到后 直接获取积分数
          this.score = data.score
        } else {
          this.getMeScores()
        }
        this.getDailyFootprintsShare()
        getMeScores.start(this)
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
      },
      getMeScores () {
        MeScoresService.getList().then(res => {
          if (res.code === 0) {
            this.score = res.data.score
          }
        })
      },
      getScoreRules () { // 获取积分规则
        ScoreRulesService.getList().then(res => {
          if (res.code === 0) {
            const map = {
              area: 'location',
              mobile: 'contactNumber',
              birthday: 'birthday',
              gender: 'gender'
            }
            const rule = JSON.parse(res.data.filter(data => data.type === 4)[0] ? res.data.filter(data => data.type === 4)[0].rule : {})
            rule.total = Object.entries(rule).reduce((total, num) => {
              if (Array.isArray(total)) {
                total = (!this.userInfo[map[total[0]]] ? parseInt(total[1], 10) : 0)
              }
              return parseInt(total, 10) + (!this.userInfo[map[num[0]]] ? parseInt(num[1], 10) : 0)
            })
            const shareRule = JSON.parse(res.data.filter(data => data.type === 3)[0] ? res.data.filter(data => data.type === 3)[0].rule : {})
            this.shareRule = shareRule
            this.rule = rule
            this.isShow = false
          }
        })
      },
      getDailyFootprintsShare () {
        DailyFootprintsService.getList({
          userId: this.userInfo.id,
          pageNum: 1,
          pageSize: 1,
          type: 'SHARE'
        }).then((res) => {
          if (res.code === 0) {
            const scoreCounters = res.data[0]
            const lastSignInTime = scoreCounters.lastOperationTime
            if (lastSignInTime) {
              const newDate = new Date()
              const date = parseInt(newDate.getFullYear() + '' + check(newDate.getMonth() + 1) + check(newDate.getDate()), 10)
              if (date <= parseInt(lastSignInTime)) {
                this.shareNumber = res.data[0].number
              }
            }
          }
        })
      },
      shareCb () {
        this.shareNumber = this.shareNumber + 1
      }
    },
    onLoad () {
      this.$setStorageSync('signIn', false)
    },
    onHide () {
      getMeScores.end()
    },
    onShow () {
      const userInfo = getUserInfo()
      if (userInfo.id) {
        this.signInCB({})
      } else {
        this.isModel = true
      }
    },
    onShareAppMessage: share(this.shareCb)
  }
</script>

