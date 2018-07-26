<template>
 <div :class ="{model:true, showModel : isModel || showModel  }">
  {{isModel}}
  <div :class="{signIn:true, showModel : isModel || showModel}" >
    <img :class="{ transform: isModel || showModel }" src="/static/img/light.png" />
    <div class="sign">
      <img src="/static/img/signIn.png" />
      <div class="goldBean">
        <img src="/static/img/goldBean.png" />
      </div>
      <button class="signButton" open-type='getUserInfo' @getuserinfo="bindgetuserinfo">
        签到领金豆
      </button>
    </div>
  </div>
</div>
</template>

<script>
  import AuthService from '@/services/authService'
  import ScoreActivities from '@/services/scoreActivities'
  import ScoreCountersService from '@/services/scoreCountersService'
  import MeScoresService from '@/services/meScoresService'

  import { getUserInfo } from '@/utils'
  export default {
    name: 'signIn',
    props: [`signInCB`, `showModel`],
    data () {
      return {
        isModel: false,
        userInfo: {},
        scoreCounters: {},
        signIn: false
      }
    },
    methods: {
      bindgetuserinfo (e) {
        const userInfo = getUserInfo()
        AuthService.wxLogin(e.mp.detail).then((res) => {
          if (!userInfo.id) { // 判断之前是否 执行过 this.isSignIn
            return this.isSignIn() // 判断是否今天签到过
          } else {
            return this.signIn
          }
        }).then((res) => {
          if (!res) {
            // 签到
            const newUserInfo = getUserInfo()
            return ScoreActivities.signIn({
              user: newUserInfo
            })
          } else {
            // 获取用户积分数
            return MeScoresService.getList()
          }
        }).then(res => {
          if (res.code === 0) {
            this.isModel = false

            if (!this.signIn) {
              this.scoreCounters.durationSignInDays = this.scoreCounters.durationSignInDays ? ++this.scoreCounters.durationSignInDays : 1
            }

            this.$setStorageSync('score', res.data.score)
            this.$setStorageSync('scoreCounters', this.scoreCounters)
            this.signInCB({
              scoreCounters: this.scoreCounters,
              score: res.data.score
            })
          }
        })
      },
      isSignIn () { // 判断今天是否签到
        const userInfo = getUserInfo()
        return ScoreCountersService.getList({
          userId: userInfo.id,
          pageNum: 1,
          pageSize: 1
        }).then(res => {
          if (res.code === 0 && res.data.length > 0) {
            const scoreCounters = res.data[0]
            // 记录最新签到信息
            this.scoreCounters = scoreCounters

            // 对比今天是否签到
            const lastSignInTime = scoreCounters.lastSignInTime
            if (!lastSignInTime) return false
            const newDate = new Date()
            const date = parseInt(newDate.getFullYear() + '' + this.check(newDate.getMonth() + 1) + this.check(newDate.getDate()), 10)
            if (date > parseInt(lastSignInTime)) {
              return false
            } else {
              return true
            }
          } else {
            return false
          }
        })
      },
      check (str) {
        str = str.toString()
        if (str.length < 2) {
          str = '0' + str
        }
        return str
      }
    },
    onLoad () {
      const userInfo = getUserInfo()
      // 判断是否登录过
      if (!userInfo.id) {
        this.isModel = true
      } else {
        // 判断今天是否签到过
        this.isSignIn().then(res => {
          if (!res) {
            this.isModel = true
          } else {
            this.signIn = true
          }
        })
      }
    }
  }
</script>

<style scoped>
  @import '../common/util.less';

  @keyframes myfirst {
   from {
     transform: rotate(0deg);
     -webkit-transform: rotate(0deg);
     /* Safari and Chrome */
   }
   to {
     transform: rotate(180deg);
     -webkit-transform: rotate(180deg);
     /* Safari and Chrome */
   }
 }

 .showModel {
   transform: scale3d(1, 1, 1)!important;
   opacity: 1!important;
   pointer-events:auto!important;
 }
 .model {
   pointer-events:none;
   position: fixed;
   top: 0;
   left: 0;
   bottom: 0;
   right: 0;
   background: RGBA(0, 0, 0, 0.6);
   opacity:0;
   transition: opacity 2s;
   .welfare {
     top: 150*@1;
     width: 280*@2;
     height: 345*@2;
     margin: auto;
     position: relative;
     >img {
       width: 100%;
       height: 100%;
     }
     >div {
       position: absolute;
       bottom: 0;
       width: 100%;
       >div {
         text-align: center;
         position: relative;
         >div {
           width: 100%;
           font-size: 30*@2;
           font-weight: bold;
           font-family: helvetica;
           text-align: center;
           background: -webkit-linear-gradient(top, RGBA(255, 236, 164, 1), RGBA(252, 241, 85, 1));
           /* 背景色渐变 */
           -webkit-background-clip: text;
           /* 规定背景的划分区域 */
           color: transparent;
           position: absolute;
         }
         >span {
           font-size: 30*@2;
           text-shadow: 0 1*@1 2*@2 RGBA(0, 0, 0, 0.2);
         }
       }
       >span {
         color: RGBA(252, 239, 128, 1);
         font-size: 32*@1;
         line-height: 45*@1;
         text-align: center;
         display: inline-block;
         width: 100%;
         margin: 44*@1 auto 41*@1;
       }
       button {
         background: RGBA(243, 185, 19, 1);
         height: 80*@1;
         width: 402*@1;
         color: #fff;
         font-size: 32*@1;
         box-shadow: 10*@1 2*@1 20*@1 RGBA(206, 35, 10, 0.6);
         margin-bottom: 56*@1;
       }
     }
   }
   .signIn {
     transform: scale3d(0, 0, 0);
     transition: transform 1s;
     width: 319*@2;
     height: 319*@2;
     position: absolute;
     top: 0;
     bottom: 0;
     left: 0;
     right: 0;
     margin: auto;
     >img {
       position: absolute;
       width: 100%;
       height: 100%;
       animation-delay:1s;
       animation: myfirst 1.5s;
       -webkit-animation: myfirst 1.5s;
       animation-iteration-count:infinite;
       -webkit-animation-iteration-count:infinite; /*Safari and
       Chrome*/
       animation-timing-function:linear;
       -webkit-animation-timing-function:linear; /* Safari and Chrome */
       /* Safari 与 Chrome */
     }
     >.sign {
       width: 160*@2;
       height: 120*@2;
       position: relative;
       top: 100*@2;
       margin: auto;
       img {
         width: 100%;
         height: 100%;
       }
       .signButton {
         width: 132*@2;
         height: 40*@2;
         background: -webkit-linear-gradient(top, #FF484E, #FF2D34);
         color: #fff;
         font-size: 16*@2;
         margin-top: 10*@2;
         box-shadow: 2*22 4*@2 #B3191E;
         transition: width 2s;
         -webkit-transition: width 2s;
         /* Safari */
       }
       .goldBean {
         height: 80*@1;
         width: 79*@1;
         position: absolute;
         top: 0;
         bottom: 0;
         left: 0;
         right: 0;
         margin: auto;
       }
     }
   }
 }
</style>
