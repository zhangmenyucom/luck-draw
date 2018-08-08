<template>
  <div class="list">
    <top :hideIcone='true' title='赚金豆' />
    <div>
      <div class="left icon">
        <i class="icon iconfont icon-fenxiang" :style="{color:'RGBA(107, 200, 50, 1)'}"></i>
      </div>
      <div class="left">
        <span class='title'>
          分享微信群
        </span>
        <br />
        +{{shareRule.base}}<img src="/static/img/goldBean.png" alt=""> &nbsp;&nbsp;&nbsp;
      </div>
      <div class="right">
        <button v-if="shareRule.maxStep > shareNumber" open-type="share">
          去领取
        </button>
        <div v-else class='complete'>
          今日已领完
        </div>
        <div class="number">
          剩余{{(shareRule.maxStep - shareNumber)<0?0:(shareRule.maxStep - shareNumber)}}次
        </div>
      </div>
      <div class="c"></div>
    </div>
    <div>
      <div class="left icon">
        <i class="icon iconfont icon-bangdingshoujihao" :style="{color:'RGBA(255, 151, 58, 1)'}"></i>
      </div>
      <div class="left">
        <span class='title'>
          绑定手机号
        </span>
        <br />
        +{{rule.mobile}} <img src="/static/img/goldBean.png" alt="">
      </div>
      <div class="right">
        <a v-if="!userInfo.contactNumber" href="/pages/mobile/index">
          去绑定
        </a>
        <div v-else class='complete'>
          已完成
        </div>
      </div>
      <div class="c"></div>
    </div>
    <div>
      <div class="left icon">
        <i class="icon iconfont icon-wanshanziliao"></i>
      </div>
      <div class="left">
        <span class='title'>
          完善资料
        </span>
        <br />
        +{{rule.total}} <img src="/static/img/goldBean.png" alt="">
      </div>
      <div class="right">
        <a v-if="!(userInfo.contactNumber && userInfo.location && userInfo.birthday)" href="/pages/editInfo/index">
          去完善
        </a>
        <div v-else class='complete'>
          已完成
        </div>
      </div>
      <div class="c"></div>
    </div>
    <signIn :signInCB = "signInCB" :showModel = "!isModel"/>
  </div>
</template>

<script>
  import signIn from '@/components/signIn'
  import top from '@/components/top'
  import {getUserInfo, check} from '@/utils'
  import DailyFootprintsService from '@/services/dailyFootprintsService'
  import ScoreRulesService from '@/services/scoreRulesService'
  import share from '@/common/js/share.js'

  export default {
    data () {
      return {
        userInfo: {},
        rule: {},
        isModel: false,
        shareNumber: 0,
        shareRule: {}
      }
    },
    components: {
      signIn,
      top
    },
    methods: {
      getScoreRules () {
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
            this.rule = rule
            this.shareRule = shareRule
          }
        })
      },
      signInCB () {
        const signIn = this.$getStorageSync('signIn')
        if (signIn) {
          this.isModel = false
        }
        this.getScoreRules()
        this.getDailyFootprintsShare()
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
      }
    },
    onLoad () {
      this.$setStorageSync('signIn', false)
    },
    onShow () {
      const userInfo = getUserInfo()
      if (userInfo.id) {
        this.userInfo = userInfo
        this.signInCB()
      } else {
        this.isModel = true
      }
    },
    onShareAppMessage: share()
  }
</script>

<style scoped>
  @import '../../common/less/util.less';
  .list{
    min-height: 100vh;
    background: #fff;
    padding: 15*@2;
    >div{
      margin-bottom: 8*@2;
      background: #fff;
      padding: 17*@2;
      box-shadow: 0*@2 2*@2 16*@2 0*@2 RGBA(25, 25, 25, 0.05);
      >div{
        color: RGBA(243, 185, 19, 1);
        font-size:12*@2;
        >img{
          width: 9*@2;
          height: 9*@2;
        }
        >i{
          font-size: 35*@2;
        }
        >span{
          color: RGBA(67, 67, 67, 1);
          font-size: 14*@2;
        }
      }
      >.icon{
        margin-right: 14*@2
      }
      a, button {
        /*width: 80*@2;*/
        height: 32*@2;
        text-align: center;
        background: RGBA(254, 76, 82, 1);
        color: #fff;
        font-size: 14*@2;
        line-height: 32*@2;
        border-radius: 2*@2;
        padding:0 7*@2;
      }
      .number{
        text-align: center;
        color: #999999;
      }
      .complete{
        width: 80*@2;
        height: 32*@2;
        text-align: center;
        line-height: 32*@2;

      }
    }
  }
</style>
