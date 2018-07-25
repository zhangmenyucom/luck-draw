<template>
  <div class="activitiesDetails">
    <top title="首页" />
    <img mode='center' :src="activitie.media[0].url">
    <div class="prompt antialiased">
      <div class="left">
        剩余<span>{{0+activitie.metadata.ticketsNum-ticketsTotal}}</span> 注
      </div>
      <div class="right">
        |  满{{activitie.metadata.ticketsNum}}注开奖
      </div>
    </div>
    <div class="name antialiased">
      <span>
        「奖品」
      </span>
      {{prize.name}}
    </div>
    <!-- 中间提示 -->
    <div class="goldBean">
      <img src='/static/img/goldBean.png'>
      <text class='bold'>
        {{activitie.metadata.price}} 金豆 1 注
      </text>
      <span>
        ¥{{prize.price}}
      </span>
      <div>
        <i />中奖规则 {{state}}
      </div>
    </div>

    <div class="hint" v-if="state >= 0 && state <= 4">
      <div class="c"></div>
      <div class="bets" v-if="state >= 2 && state <= 4">
        <span>
          已下注
        </span>
        <div>
          {{participants.tickets ? participants.tickets.length : 0}}<span>注</span>
        </div>
        <text data-state="4" @tap="modifyState">
          查看幸运号
        </text>
        <i></i>
      </div>
      提示：注数越多，获胜几率越大，开奖以幸运号为准。
    </div>
    <!-- 中间提示结束 -->

    <!-- 未中奖 -->
    <div class="draw hint" v-if="state === 5">
      <span></span>
      <div class="">
        很遗憾，您未中奖<br />
        去看看其他活动
      </div>
      <div class="divButton">
        <a open-type="switchTab" class="button" href='/pages/index/index'>去看看</a>
      </div>
      <span></span>
    </div>
    <!-- 未中奖结束 -->
    <!-- 中奖 -->
    <div class="draw hint" v-if="state === 6">
      <span></span>
      <div class="">
        恭喜，你已中奖
      </div>
      <div class="divButton">
        <button class="butotn-o" @tap="chooseAddress">去领奖</button>
        <button class="button" open-type="share" >炫耀一下</button>
      </div>
      <span></span>
    </div>
    <!-- 中奖结束 -->
    <!-- 中奖 -->
    <div class="draw hint" v-if="state === 7">
      <span></span>
      <div class="">
        本次活动已结束，去看看其他活动
      </div>
      <div class="divButton">
        <a open-type="switchTab" class="button" href='/pages/index/index'>去看看</a>
      </div>
      <span></span>
    </div>
    <!-- 中奖结束 -->
    <!-- 抽奖按钮 -->
    <div class="prize" v-if ="state >= 0 && state <= 1">
      <div>
        <div class='bold antialiased'>
          <form report-submit @submit.stop = "bets">
            <button form-type = "submit">点我抽奖</button>
          </form>
        </div>
      </div>
    </div>
    <!-- 抽奖按钮结束 -->
    <!-- 中奖名单 -->
    <div class="drawList" v-if='state >= 5'>
      <div class="border">
        <div>
          中奖名单
        </div>
      </div>
      <div class="list">
        <drawList :list="luckyItems" />
      </div>
      <a :href="'/pages/drawList/index?id='+ activitie.id" v-if="luckyItems.length < 4" >
        查看更多<img src="/static/img/right.png" alt="">
      </a>
    </div>
    <!-- 中奖名单结束 -->
    <!-- 参加列表 -->
    <div class="participant" v-if="participantTotal>0">
      <span class='antialiased'>
        已有{{participantTotal}}人参加
      </span>
      <headPortrait :list="participantList" rangeKey="img" />
    </div>
    <!-- 参加列表结束 -->

    <button class="bottom button" open-type="share">
      分享领金币
    </button>


    <!-- 弹出层 -->
    <div class="modal" @tap="hideModal" v-if="isModal && (state === 1 || state === 3 || state === 4)">
      <div class="content" @tap.stop="">
        <img src="../../../static/img/group.png" mode='widthFix'>
        <div class='title'>
          <span v-if='state==1'>下 注</span>
          <span v-else>幸运号</span>
        </div>
        <div>
          <div>
            <!-- 幸运号列表 -->
            <div class="luckyList" v-if="state === 4" v-for='(item, index) in participants.tickets'>
              <div class="number">
                <img src="/static/img/number.png" alt="" />
                <div>
                  {{index}}
                </div>
              </div>
              <text>
                {{item}}
              </text>
            </div>
            <!-- 幸运号列表结束 -->

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
              <span class="record antialiased">
                你有152金豆<br />
                本次还可以下注25次
              </span>
              <form report-submit @submit.stop = "bets">
                <button class="button" form-type = "submit">
                  下注
                </button>
              </form>
              <text class='cancel' @tap="hideModal">
                取消
              </text>
            </div>
            <!-- 投注结束 -->
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
    </div>
    <signIn :signInCB = "signInCB"/>
  </div>
</template>

<script>
  import headPortrait from '@/components/headPortrait'
  import drawList from '@/components/drawList'
  import signIn from '@/components/signIn'
  import top from '@/components/top'
  import ActivitiesService from '@/services/activitiesService'
  import ParticipantsService from '@/services/participantsService'
  import {
    getUserInfo
  } from '@/utils'
  export default {
    data () {
      return {
        id: '',
        participantList: [],
        participantTotal: 0,
        luckyList: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 14],
        activitie: {
          id: '',
          metadata: {
            ticketsNum: 0
          },
          media: [{
            url: ''
          }]
        },
        prize: {},
        participants: {
          tickets: []
        },
        isModal: false,
        ticketsNum: 1, // 下注数
        ticketsTotal: 0, // 用户下注总数
        state: 0
        // 0 NotInvolved 页面总的状态
        // 1 Bets 下注
        // 2 ParticipateIn 参与过
        // 3 重新下注
        // 4 LookAtTheLuckyNumber 查看幸运号
        // 5 NotWinningThePrize 未中奖
        // 6 已中奖
        // 7 已添加地址
      }
    },
    onPullDownRefresh () {
      this.$stopPullDownRefresh()
    },
    components: {
      headPortrait,
      drawList,
      signIn,
      top
    },
    methods: {
      getActivitie (id) { // 获取活动详情
        const userInfo = getUserInfo()
        ActivitiesService.get({
          id
        }).then((res) => {
          if (res.code === 0) {
            if (res.data.metadata.ticketsNum) {
              res.data.metadata.ticketsNum = parseInt(res.data.metadata.ticketsNum)
            }
            this.prize = res.data.items[0]
            this.activitie = res.data
            // 处理中奖信息
            if (res.data.metadata.luckyItems) {
              const luckyItems = JSON.parse(res.data.metadata.luckyItems)
              this.luckyItems = luckyItems.slice(0, 3)
              console.log('this.luckyItems', this.luckyItems)
              if (luckyItems.some(luckyItem => luckyItem.luckyGuy.eid === userInfo.id)) {
                this.modifyState(6)
              } else {
                this.modifyState(5)
              }
            }
          }
        })
      },
      modifyTicketsNum (e) {
        const type = e.target.dataset.type
        let newTicketsNum
        if (type === 'add') {
          newTicketsNum = ++this.ticketsNum
        } else {
          newTicketsNum = --this.ticketsNum
        }
        this.ticketsNum = newTicketsNum
      },
      modifyState (e) {
        const state = typeof e === 'number' ? e : parseInt(e.target.dataset.state, 10)
        if (state > this.state) {
          this.isModal = true
          this.oldState = this.state
          this.state = state
        }
      },
      getParticipants (activityId) {
        const userInfo = getUserInfo()
        // 查询用户是否参与活动
        ParticipantsService.get({
          activityId,
          userId: userInfo.id
        }).then((res) => {
          if (res.code === 0 && res.data.length > 0) {
            this.participants = res.data[0]
            if (res.data[0].metadata.address) {
              this.modifyState(7)
            } else {
              this.modifyState(2)
            }
          }
        })
        // 查询活动总参与人数
        ParticipantsService.get({
          activityId
        }).then((res) => {
          if (res.code === 0) {
            let ticketsTotal = 0
            res.data = res.data.slice(0, 7)
            this.participantList = res.data.map((data) => {
              ticketsTotal += data.tickets.length
              data.img = data.user.avatar
              return data
            })

            this.ticketsTotal = ticketsTotal
            this.participantTotal = res.total
          }
        })
      },
      bets (e) { // 下注 参与活动
        const {
          activitie
        } = this
        const user = getUserInfo()
        ParticipantsService.add({
          activityId: activitie.id,
          scene: 'MEMBER_JOIN_LUCKY_DRAW',
          ticketsNum: 1,
          sellerId: 'system',
          user,
          metadata: {
            formId: e.mp.detail.formId
          }
        }).then(res => {
          if (res.code === 0) {
            this.modifyState(2)
            this.participants = res.data
            this.signInCB()
          }
        })
      },
      hideModal () {
        if (this.oldState) {
          this.state = this.oldState
        }
        this.isModal = false
      },
      async chooseAddress () {
        const address = await this.$chooseAddress()
        ParticipantsService.addMetadata({
          id: this.participants.id,
          key: 'address',
          value: JSON.stringify(address)
        }).then((res) => {
          if (res.code === 0) {
            this.modifyState(7)
          }
        })
      },
      signInCB () {
        const id = this.id
        this.getActivitie(id)
        this.getParticipants(id)
      }
    },
    onLoad (a) {
      this.state = 0
      const userInfo = getUserInfo()
      this.id = a.id
      if (userInfo.id) {
        this.signInCB()
      }
    },
    onShareAppMessage () {
      const introductionImageUrl = this.activitie.media.filter(media => media.layout === 'INTRODUCTION')[0]
      return {
        title: this.activitie.name,
        path: `pages/activitiesDetails/index?id=${this.activitie.id}`,
        imageUrl: introductionImageUrl && introductionImageUrl.url
      }
    }
  }
</script>

<style scoped>
 @import './index.less';
</style>