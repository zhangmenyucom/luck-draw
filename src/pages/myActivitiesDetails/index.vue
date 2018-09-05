<template>
  <div>
    <top title="抽奖" />
    <load :isshow="isShow" :isanimation="isAnimation"/>
    <signIn :isanimation.sync='isAnimation'  :signInCB = "signInCB"/>
    <div v-if='!isShow'>
      <!-- <meIntegral :score='score'/> -->
      <div class="activitiesDetails">
        <img mode='aspectFit' :src="activitie.media[0].url">
        <div class="name antialiased">
          <span>[奖品]&nbsp;{{prize.name}}</span>
        </div>
        <!-- 中间提示 -->
        <div v-if="activitie.metadata.drawRule === 'timed'" class="goldBean">
          <text class='bold'>
            <span style="color:red">{{activitie.endTime}}</span>开奖
          </text>
      <!-- <span>
        ¥{{prize.price}}
      </span> -->
      <!-- <div>
        <i />中奖规则 {{state}}
      </div> -->
    </div>
    <div v-if="activitie.metadata.drawRule === 'fullTicket'" class="goldBean">
          <text class='bold'>
            满{{activitie.metadata.ticketsNum}}注自动开奖，剩余{{activitie.metadata.ticketsNum-activitie.betNum}}注
          </text>
          <!-- <img src='/static/img/goldBean.png'>
          <text class='bold'>
            {{activitie.metadata.price}} 金豆 1 注
          </text> -->
    </div>
    <div v-if="activitie.metadata.drawRule === 'fullParticipant'" class="goldBean">
          <img src='/static/img/goldBean.png'>
          <text class='bold'>
            {{activitie.metadata.price}} 金豆 1 注
          </text>
    </div>
    <div v-if="prize.name == '定制真爱马克杯'">
      <div class='hei' />
      <div class="productsInfo">
        <div class='title'>
          <span>商品信息</span>
        </div>
        <div class="info">
          幸福浪漫一“杯”子，可自定义上传照，撰写真爱宣言
          <img mode="widthFix" src="https://oss.qianbaocard.org/20180818/ecccc76ccb24407eae7d7b333e4734f9.jpg" alt="" />
        </div>
      </div>
      <div class="hei" />
      <div class="prizeq antialiased">
        <span class="title">
          <img src='/static/img/prizeq_l.png' />兑奖方式<img src='/static/img/prizeq_r.png' />
        </span>
        <div><div class="index"> 1 </div>开奖后，收到钱包抽奖助手的服务通知，点击查看；<br/></div>
        <div><div class="index"> 2 </div>如中奖，填写中奖者信息；<br/></div>
        <div><div class="index"> 3 </div>添加合作方客服微信号，并发送手机号进行兑奖；<br/></div>

        <div class="explain">
          复制微信号，添加官方微信关注抽奖动态
        </div>
        <div class="rectangle">
          {{miniappId}}
        </div>
        <div class="button" @tap="setClipboardData">
          复制微信号
        </div>
        <sapn class='explainq'>最终服务与责任由合作方承担，本次活动最终解释权归钱包生活所有。</sapn>
      </div>
    </div>
    <div class="hint" v-if="state >= 0 && state < 5">
      <div class="c"></div>
      <div class="bets" v-if="(state >= 2 && state < 5) && participants.id">
        <span>
          已下注
        </span>
        <div>
          {{participants.tickets ? participants.tickets.length : 0}}<span>注</span>
        </div>
        <text @tap="() => {this.isLookAtTheLuckyNumber = true}">
          查看幸运号
        </text>
        <i></i>
      </div>
      提示：注数越多，获胜几率越大，开奖以幸运号为准。
    </div>
    <!-- 中间提示结束 -->

    <!-- 未中奖 -->
    <div class="draw hint" v-if="state === 5 && participants.id">
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

    <!-- 未参与 活动结束 -->
    <div class="draw hint" v-if="state >= 5 && !participants.id">
      <span></span>
      <div class="">
        本次活动已结束，去看看其他活动
      </div>
      <div class="divButton">
        <a open-type="switchTab" class="button" href='/pages/index/index'>去看看</a>
      </div>
      <span></span>
    </div>
    <!-- 未参与 活动结束 结束-->

    <!-- 中奖 -->
    <div class="draw hint" v-if="state === 6 || state === 7">
      <span></span>
      <div class="">
        恭喜，你已中奖
      </div>
      <div class="divButton">
        <button class="butotn-o" @tap="chooseAddress">{{state === 6 ? '去领奖' : '信息已填写'}}</button>
        <a :href="'/pages/imgDownload/index?url=' + melucky.metadata.image" class="button" >炫耀一下</a>
      </div>
      <span></span>
    </div>
    <!-- 中奖结束 -->

    <!-- 抽奖按钮 -->
    <div class="prize" v-if ="state >= 0 && state <= 3 ">
      <div>
        <div class='bold antialiased'>
          <form :data-state="state + 1" @submit.stop = "modifyState">
            <button v-if="state >= 0 && state <= 1" form-type = "submit">点我抽奖</button>
            <button v-if="state >= 2 && state <= 4" form-type = "submit">点我加注</button>
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
      <!-- {{luckyItemTotal}} -->
      <a :href="'/pages/drawList/index?id='+ activitie.id"  v-if="luckyItemTotal > 3">
        查看更多<img src="/static/img/right.png" alt="">
      </a>
    </div>
    <!-- 中奖名单结束 -->

    <!-- 参加列表 -->
    <div class="participant" v-if="participantTotal>0">
      <span class='antialiased'>
        已有{{participantTotal}}人参加 <a :href= "'/pages/participantList/index?id=' + activitie.id">查看全部 》</a>
      </span>
      <headPortrait :list="participantList" rangeKey="img" />
    </div>
    <!-- 参加列表结束 -->
    <button class="bottom button" open-type="share" v-if="state <= 3">
      分享领金豆
    </button>

    <!-- 弹出层 -->
    <div class="modal" @tap="hideModal" v-if="isModal && (state === 1 || state === 3 || state === 4 || isLookAtTheLuckyNumber)">
      <div class="content" @tap.stop="">
        <img src="../../../static/img/group.png" mode='widthFix'>
        <div class='title'>
          <span v-if='!isLookAtTheLuckyNumber'>下 注</span>
          <span v-else>幸运号</span>
        </div>
        <div>
          <div>
            <!-- 幸运号列表 -->
            <div class="luckyList" v-if="isLookAtTheLuckyNumber" v-for='(item, index) in participants.tickets'>
              <div class="number">
                <img src="/static/img/number.png" alt="" />
                <div>
                  {{index+1}}
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
                你有{{score}}金豆<br />
                <!-- 本次还可以下注 {{participateBet}} 次 -->
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
  </div>
</div>
</div>
</template>

<script>
  import load from '@/components/loading'
  import meIntegral from '@/components/meIntegral'
  import headPortrait from '@/components/headPortrait'
  import drawList from '@/components/drawList'
  import signIn from '@/components/signIn'
  import top from '@/components/top'
  import FootprintsActivities from '@/services/footprintsActivities'
  import ActivitiesService from '@/services/getMyActivityDetail'
  import ParticipantsService from '@/services/participantsService'
  import { getUserInfo } from '@/utils'
  import MeScoresService from '@/services/meScoresService.js'
  import getMeScores from '@/common/js/getMeScores.js'

  export default {
    data () {
      return {
        isShow: true,
        id: '',
        score: 0,
        participantList: [],
        participantTotal: 0,
        luckyList: [],
        activitie: {
          id: '',
          metadata: {
            ticketsNum: 0
          },
          media: [{
            url: ''
          }]
        },
        prize: {
          metadata: {
            num: 0
          }
        },
        participants: {
          tickets: []
        },
        isModal: false,
        ticketsNum: 1, // 当前用户下注数
        ticketsTotal: 0, // 所有用户下注总数
        luckyItemTotal: 0,
        userInfo: {},
        participateBet: 0,
        betNum: 0,
        oldState: 0,
        melucky: {
          metadata: {
            image: ''
          }
        },
        isAnimation: false,
        isLookAtTheLuckyNumber: false,
        miniappId: 'qianbaocard_mkt',
        state: 0
        // 0 NotInvolved 未参与
        // 1 Bets 下注
        // 2 ParticipateIn 参与过
        // 3 重新下注
        // 3.1 已经满注
        // 5 NotWinningThePrize 未中奖
        // 6 已中奖
        // 7 已添加地址
        // 8 未参加活动结束
      }
    },
    onPullDownRefresh () {
      this.$stopPullDownRefresh()
    },
    components: {
      load,
      headPortrait,
      drawList,
      signIn,
      top,
      meIntegral
    },
    methods: {
      getMeScores () {
        MeScoresService.getList().then(res => {
          if (res.code === 0) {
            this.score = res.data.score
            this.participateBet = parseInt(this.score / parseInt(this.activitie.metadata.price))
            this.isShow = false
          }
        })
      },
      setClipboardData () {
        this.$setClipboardData(this.miniappId)
      },
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
            this.betNum = res.data.betNum

            if (res.data.metadata.ticketsNum === res.data.betNum) {
              this.modifyState(3.1)
            }

            if (res.data.status === 'REWARDED') { // 活动已结束
              this.modifyState(5)
              // 处理中奖信息
              const luckyItems = JSON.parse(res.data.metadata.luckyItems)
              console.log('luckyItems', luckyItems)
              this.luckyItemTotal = luckyItems.length
              this.luckyItems = luckyItems.slice(0, 3)
              const melucky = luckyItems.filter(luckyItem => luckyItem.luckyGuy.eid === userInfo.id)
              if (melucky.length > 0) {
                this.melucky = melucky[0]
                this.modifyState(6)
              }
            }
            this.participateBet = parseInt(this.score / parseInt(this.activitie.metadata.price))
          }
        })
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
        const surplusTicketsNum = parseInt(this.activitie.metadata.ticketsNum) - parseInt(this.betNum) // 活动剩余注数
        const price = this.activitie.metadata.price // 每注需要金豆
        const totalTicketsNum = newTicketsNum * price // 需要金豆数
        if (newTicketsNum > 0 && this.score >= totalTicketsNum && surplusTicketsNum >= newTicketsNum) {
          this.ticketsNum = newTicketsNum
        }
      },
      modifyState (e) {
        const state = typeof e === 'number' ? e : parseInt(e.target.dataset.state, 10)
        // 下注或重新下注前查看 积分是否够用
        if (state === 1 || state === 3) {
          if (this.activitie.metadata.price > this.score) {
            this.$showToast('金豆不足')
            return false
          }
        }
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
            if (res.data[0].metadata.address) { // 判断是否添加过地址
              this.modifyState(7)
            } else if (res.data[0].metadata.lucky && res.data[0].metadata.lucky === 'true') {
              this.modifyState(6)
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
            this.participantList = res.data.map((data) => {
              ticketsTotal += data.tickets.length
              data.img = data.user.avatar
              return data
            }).slice(0, 9)

            this.ticketsTotal = ticketsTotal
            this.participantTotal = res.total
          }
        })
      },
      isLoad () {
        if (this.$getStorageSync('activitieId') !== this.id || this.isShow) {
          const _this = this
          _this.isShow = true
          _this.$setStorageSync('activitieId', this.id)
        }
      },
      bets (e) { // 下注 参与活动
        this.$showLoading()
        const {
          activitie
        } = this
        const user = getUserInfo()
        ParticipantsService.add({
          activityId: activitie.id,
          scene: 'MEMBER_JOIN_LUCKY_DRAW',
          ticketsNum: this.ticketsNum,
          sellerId: 'system',
          user,
          metadata: {
            formId: e.mp.detail.formId
          }
        }).then(res => {
          this.$hideLoading()

          if (res.code === 0) {
            this.participants = res.data
            // 下注后
            this.state = 2
            this.ticketsNum = 1
            getMeScores.end()
            this.signInCB()
          } else if (res.code === 202800002) {
            this.$clearStorageSync()
            this.$switchTab('/pages/index/index')
          }
        })
      },
      hideModal () {
        if (this.isLookAtTheLuckyNumber) {
          this.isLookAtTheLuckyNumber = false
          return false
        }
        if (this.oldState || this.oldState === 0) {
          this.state = this.oldState
        }
        this.ticketsNum = 1
        this.isModal = false
      },
      chooseAddress () {
        this.$navigateTo('/pages/takePrize/index?id=' + this.activitie.id)
      },
      signInCB () {
        // this.ticketsNum = 1
        // this.state = 0
        const id = this.id
        this.getActivitie(id)
        this.getParticipants(id)
        this.getMeScores()
        getMeScores.start(this)
      }
    },
    onLoad (options) {
      // console.log('options', options)
      this.id = options.id
      const userInfo = getUserInfo()
      this.userInfo = userInfo
      this.state = 0
      this.ticketsNum = 1
    },
    onHide () {
      getMeScores.end()
    },
    onUnload () {
      getMeScores.end()
    },
    onShow () {
      this.isAnimation = false
      const userInfo = getUserInfo()
      if (userInfo.id) {
        this.signInCB()
      }
      this.isLoad()
    },
    onShareAppMessage () {
      const introductionImageUrl = this.activitie.media.filter(media => media.layout === 'INTRODUCTION')[0]
      const _this = this
      return {
        title: this.activitie.description || this.activitie.name,
        path: `pages/activitiesDetails/index?id=${this.activitie.id}`,
        imageUrl: introductionImageUrl && `${introductionImageUrl.url}?x-oss-process=image/resize,w_200,limit_0,m_fill`,
        success (res) {
          if (res) {
            FootprintsActivities.add({
              type: 'SHARE',
              target: {
                type: 'VINCI_CC_FOOTPRINT',
                id: _this.activitie.id,
                name: _this.activitie.name
              }
            }).then((res) => {
              if (res.code === 0) {
                _this.$showToast('分享成功')
              }
            })
          }
        }
      }
    }
  }
</script>

<style scoped>
 @import './index.less';
</style>