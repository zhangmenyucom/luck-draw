<template>
 <div class="modal" @tap="hideModal" v-if="isModal && (state === 1 || state === 3 || (participants.id && (state === 5 || state === 6)) || isFree)">
  <div class="content" @tap.stop="">
    <div class="title">
      —— {{isFree ? '提示' : (state < 5 ? '下注' : '开奖结果')}} ——
    </div>
    <div class="modalFree" v-if="isFree">
      <img src="/static/img/lightModal.png">
      <span>1.钱包抽奖助手作为提供发起及参与抽奖的平台，不对第三方发起人行为承担责任，活动奖品均由发起者提供发放</span>
      <span>2.钱包抽奖助手会在法律范围内尽可能地规范、督促用户遵守相关法律和平台使用规则。营造良好的平台使用环境，感谢支持</span>
    </div>
    <div v-else>
      <!-- 投注 -->
      <div class="betting" v-if="state == 1 || state == 3">
        <div class="operation">
          <div data-type = "reduce" @tap.stop="modifyTicketsNum">
            -
          </div>
          <div>
            {{ticketsNum}}
          </div>
          <div  data-type = "add" @tap.stop="modifyTicketsNum">
            +
          </div>
        </div>
        <span class="record">
          {{activitie.metadata.price}} 金豆/注 <br />
          你有{{score}}金豆
          <!-- 本次还可以下注 {{participateBet}} 次 -->
        </span>
        <form :data-ticketsNum='ticketsNum' report-submit @submit.stop = "bets">
          <button class="button" form-type = "submit">
            下注
          </button>
        </form>
      </div>
      <!-- 投注结束 -->
      <!-- 开奖 -->
      <div class="prizeM" v-if="participants.id && (state == 5 || state == 6)">
        <!-- participants -->
        <img :src="participants.user.avatar">
        <div class="userName">
          {{participants.user.nickName}}
        </div>
        <div class="goodsName" v-if="state == 6" >
          <div v-for="(item, i) in participants.rewards">
            奖品{{i+1}}：{{item.name}}
          </div>
        </div>
        <!-- 中奖 -->
        <div>
          <div class="tips">
            {{state == 6 ? "恭喜，大奖是你的了" : '这次没中奖，送你点别的'}}
          </div>
          <div class="navigateP" >
            <a  :href="'/pages/takePrize/index?id='+participants.id" v-if="state == 6" class="navigate o-navigate">
              领取奖品
            </a>
            <a v-if="state == 6" class="navigate" @tap="()=>toMakeImg(true)">
              炫耀一下
            </a>
            <a open-type="switchTab" href='/pages/index/index' v-if="state == 5" class="navigate">
              去看看
            </a>
          </div>
        </div>
        <!-- 中奖结束 -->
        <!-- 中奖者名单 -->
        <luckyitems :list='luckyList' :activitie = 'activitie' />
        <!-- 中奖者名单结束 -->
      </div>
      <!-- 开奖结束 -->
      <!-- 提示 -->
      <div class="point" v-if="false">
        <div>
          还差<span>4</span>金豆<br />可分享至微信群获得金豆
        </div>
        <button class="button">
          去分享
        </button>
        <span>
          还剩4次分享机会
        </span>
      </div>
      <!-- 提示结束 -->
    </div>
  </div>
</div>
</template>
<script>
  import luckyitems from './luckyItems'
  export default {
    props: ['isFree', 'luckyItemList', 'state', 'activitie', 'oldState', 'participants', 'score', 'toMakeImg', 'bets'],
    data () {
      return {
        isModal: false,
        ticketsNum: 1,
        luckyList: []
      }
    },
    watch: {
      state () {
        this.isModal = true
      },
      isFree () {
        this.isModal = true
      },
      luckyItemList (newVal) {
        this.luckyList = newVal
      }
    },
    components: {
      luckyitems
    },
    methods: {
      hideModal () {
        if (this.isFree) return (this.isFree = false)
        if (this.state === 3 || this.state === 1) this.$emit('update:state', this.oldState)
        this.ticketsNum = 1
        this.isModal = false
      },
      modifyTicketsNum (e) {
        const type = e.target.dataset.type
        let newTicketsNum
        if (type === 'add') {
          newTicketsNum = this.ticketsNum + 1
        } else {
          newTicketsNum = this.ticketsNum - 1
        }
        // 开始判断是否可添加
        const surplusTicketsNum = parseInt(this.activitie.metadata.ticketsNum) - parseInt(this.activitie.betNum) // 活动剩余注数
        const price = this.activitie.metadata.price // 每注需要金豆
        const totalTicketsNum = newTicketsNum * price // 需要金豆数

        if (newTicketsNum > 0 && this.score >= totalTicketsNum && surplusTicketsNum >= newTicketsNum) {
          this.ticketsNum = newTicketsNum
        }
      }
    }
  }
  </script>
  <style scoped>
    @import '../../common/less/util.less';
    text {
      font-size: 16*@2;
    }
    span {
      font-size: 13*@2;
      display: inline-block;
    }
    .button {
      background: RGBA(243, 185, 19, 1);
      color: RGBA(255, 255, 255, 1);
      font-size: 16*@2;
      height: 40*@2;
      line-height: 40*@2;
      text-align: center;
    }
    .modal {
      background: RGBA(0, 0, 0, 0.6);
      position: fixed;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      z-index: 100;
      .modalFree {
        text-align: center;
        >img {
          width: 92*@2;
          height: 103*@2;
          margin: 13*@2 auto;
        }
        >span {
          color: RGBA(153, 153, 153, 1);
          font-size: 14*@2;
          line-height: 21*@2;
          margin-top: 20*@2;
          display: inline-block;
        }
      }
      .content {
        position: absolute;
        top: 50%;
        left: 50%;
        width: 265*@2;
        margin: auto;
        transform: translate(-50%, -50%);
        /*background: rgba(254, 251, 234, 1);*/
        border-width: 76*@2 10*@2 10*@2;
        border-style: solid;
        border-color: transparent;
        -webkit-border-image: url(https://oss.qianbaocard.org/20180914/7b0e9c5fc57f482c97d47c34c541b03c.png) 152 20 20 stretch;
        border-radius: 4*@2;
        .title {
          margin: -51*@2 0 0;
          height: 25*@2;
          line-height: 25*@2;
          font-size: 18*@2;
          text-align: center;
          color: #434343;
        }
        >div {
          max-height: 465*@2;
          overflow: auto;
          button {
            width: 120*@2;
          }
          /*开奖*/
          .prizeM {
            text-align: center;
            margin-top: 25*@2;
            >img {
              width: 56*@2;
              height: 56*@2;
              border-radius: 28*@2;
            }
            .userName {
              color: RGBA(153, 153, 153, 1);
              margin-top: 8*@2;
              font-size: 14*@2;
              line-height: 18*@2;
            }
            .goodsName {
              color: RGBA(102, 102, 102, 1);
              line-height: 16*@2;
              font-size: 12*@2;
              margin-top: 17*@2;
            }
            .tips {
              color: RGBA(254, 76, 82, 1);
              font-size: 18*@2;
              line-height: 22*@2;
              text-align: center;
              margin-top: 18*@2;
              font-family: PingFang-SC-Medium;
            }
            .navigateP {
              text-align: center;
              height: 40*@2;
              margin: 17*@2 0;
              display: flex;
              justify-content: center;
              .navigate {
                display: inline-block;
                margin: 0 8*@2;
                background: RGBA(243, 185, 19, 1);
                line-height: 40*@2;
                font-size: 16*@2;
                color: #fff;
                border-radius: 2*@2;
                width: 104*@2;
              }
              .o-navigate {
                border: 1*@2 solid rgba(243, 185, 19, 1);
                color: RGBA(253, 183, 0, 1);
                background: transparent;
              }
            }
          }
          /*下注*/
          .betting {
            margin-top: 55*@2;
            .operation {
              width: 185*@2;
              height: 51*@2;
              background: RGBA(243, 185, 19, 0.2);
              border: 1*@2 solid #F3B913;
              margin: 0 auto;
              border-radius: 26*@2;
              overflow: hidden;
              display: flex;
              >div {
                line-height: 51*@2;
                flex: 1;
                text-align: center;
                color: RGBA(243, 185, 19, 1)
              }
              >div:nth-child(2) {
                font-size: 24*@2;
                color: RGBA(67, 67, 67, 1);
                border-left: 1*@2 solid RGBA(243, 185, 19, 1);
                border-right: 1*@2 solid RGBA(243, 185, 19, 1);
                background: RGBA(255, 255, 255, 1);
              }
            }
            .cancel {
              line-height: 20*@2;
              margin: 18*@2 auto 29*@2;
              display: inline-block;
              width: 100%;
              text-align: center;
              color: RGBA(252, 229, 194, 1);
            }
            .record {
              text-align: center;
              color: RGBA(240, 145, 66, 1);
              font-family: PingFang-SC-Medium;
              line-height: 21*@2;
              width: 100%;
              margin: 40*@2 auto 42*@2;
            }
            .button::after {
              border: none;
            }
            .button {
              width: 180*@2;
              height: 40*@2;
              line-height: 40*@2;
              border-radius: 2*@2;
            }
          }
          .point {
            >div {
              font-size: 18*@2;
              color: RGBA(252, 229, 194, 1);
              margin: 50*@2 auto 56*@2;
              text-align: center;
              line-height: 26*@2;
              span {
                font-size: 22*@2;
              }
            }
            >span {
              font-size: 12*@2;
              line-height: 16*@2;
              margin: 8*@2 auto;
              display: block;
              color: RGBA(252, 229, 194, 0.6);
              text-align: center;
            }
          }
        }
      }
    }

  </style>
