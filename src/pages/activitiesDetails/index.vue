<template>
  <div>
    <top title="抽奖" />
    <load :isshow="isShow" :isanimation="isAnimation"/>
    <signIn :isanimation.sync='isAnimation'  :signInCB = "signInCB"/>
    <div v-if='!isShow'>

      <div class="activitiesDetails">
        <!-- <img mode='aspectFit' :src="activitie.media[0].url"> -->
        <div class="name antialiased">
          <text>「奖品」</text>{{prize.name}}&nbsp;<span>X&nbsp;{{prize.metadata.num}}</span>
        </div>
        <!-- 活动信息及状态 -->
        <div class="activitieInfo">
          <div v-if="activitie.metadata.drawRule == 'fullTicket'" class='state'>满<text>{{activitie.metadata.ticketsNum * activitie.metadata.price}}</text>金豆自动开奖，剩余<text>{{(activitie.metadata.ticketsNum-activitie.betNum)*activitie.metadata.price}}</text>金豆</div>
          <div v-if="activitie.metadata.drawRule == 'fullParticipant'" class='state'>满<text>{{activitie.metadata.participantsNum}}</text>人开奖，剩余<text>{{activitie.metadata.participantsNum-activitie.betNum}}</text>人</div>
          <div v-if="activitie.metadata.drawRule == 'timed'" class='state'>{{activitie.endTimeDay}}<text>{{activitie.endTimeHours}}</text>开奖</div>
          <div class="info">
            {{activitie.metadata.price}}<img src='/static/img/goldBean.png' class="" />参与
          </div>
        </div>
        <div class="c"> </div>
        <!-- 活动信息及状态end -->

        <!-- 赞助商 -->
        <div class="hint">
          <span>赞助商{{state}}</span>
          <div class="">
            <span class='bold'>抽奖助手</span>
            <i class='icon iconfont icon-xiaochengxu' />
            <i class='icon iconfont icon-xuanzedizhi gray' />
          </div>
        </div>
        <!-- 赞助商结束 -->

        <!-- 奖品详情 -->
        <div class="mediaInfo">
          <img mode='widthFix' v-for='(item, i) in mediaInfoimg' :src="item.url">
        </div>
        <!-- 奖品详情结束 -->

        <!-- 开奖后 -->
        <openingPrizeAfter v-if='state >= 5' :participants="participants" :state="state" :activitie="activitie" />
          <!-- 开奖后 -->

          <!-- 中奖名单 -->
        <luckyitems v-if='state >= 5' :list='luckyItemList' :activitie = 'activitie' />
            <!-- 中奖名单结束 -->
            <!-- 抽奖按钮 -->
        <luckDraw :state = 'state' :modifyState= 'modifyState'/>
            <!-- 抽奖按钮结束 -->
            <!-- 参加列表 -->
        <div class="participant" v-if="participantTotal>0">
          <span class='antialiased'>
            已有{{participantTotal}}人参加 <a :href= "'/pages/participantList/index?id=' + activitie.id">查看全部 》</a>
          </span>
          <headPortrait :list="participantList" rangeKey="img" />
        </div>
            <!-- 参加列表结束 -->
            <!-- 底部 -->
        <div class='bottom'>
          <div>
            <button class="button button-o">
              发起抽奖
            </button>
          </div>
          <div v-if="state <= 3" >
            <button class="button"  @click="share">
              分享领金豆
            </button>
          </div>
        </div>
            <!-- 底部结束 -->
            <!-- 弹出层 -->
        <div class="modal" @tap="hideModal" v-if="isModal && (state === 1 || state === 3 || (participants.id && (state === 5 || state === 6)) || isLookAtTheLuckyNumber)">
          <div class="content" @tap.stop="">
            <div class="title">
              —— {{state < 5 ? '下注' : '开奖结果'}} ——
            </div>
            <div>
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
                <form report-submit @submit.stop = "bets">
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
                <div class="goodsName" v-if="state == 6">
                  奖品：{{prize.name}}
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
                      <a v-if="state == 6" class="navigate">
                        炫耀一下
                      </a>
                      <a open-type="switchTab" href='/pages/index/index' v-if="state == 5" class="navigate">
                        去看看
                      </a>
                    </div>
                </div>
                <!-- 中奖结束 -->
                <!-- 中奖者名单 -->
                <luckyitems :list='luckyItemList' :activitie = 'activitie' />
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
            <!-- 弹出层结束 -->
      </div>
    </div>
    <div class="shade" :class="{display:display}" @tap="shadeShow">
      <div class="foot">
        <button open-type="share">邀请微信好友</button>
        <button @tap="toMakeImg">生成分享图</button>
        <button>取消</button>
      </div>
    </div>
  </div>
</template>

<script>
  import load from '@/components/loading'
  import meIntegral from '@/components/meIntegral'
  import headPortrait from '@/components/headPortrait'
  import signIn from '@/components/signIn'
  import top from '@/components/top'
  import luckyitems from './luckyItems'
  import luckDraw from './luckDraw'
  import openingPrizeAfter from './openingPrizeAfter'
  import FootprintsActivities from '@/services/footprintsActivities'
  import ActivitiesService from '@/services/activitiesService'
  import ParticipantsService from '@/services/participantsService'
  import {
    getUserInfo
  } from '@/utils'
  import MeScoresService from '@/services/meScoresService.js'
  import TwoCodeService from '@/services/twoCodeService.js'
  import getMeScores from '@/common/js/getMeScores.js'
  const mta = require('@/common/js/mta_analysis.js')
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
          endTimeDay: '',
          endTimeHours: '',
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
        display: true,
        activity: '',
        QR: '',
        mediaInfoimg: [], // 商品详情列表
        luckyItemList: [], // 中奖者名单
        state: 0
        // 0 NotInvolved 未参与
        // 1 Bets 下注
        // 2 ParticipateIn 参与过
        // 3 重新下注
        // 3.1 已经满注
        // 5 未中奖
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
      signIn,
      top,
      meIntegral,
      luckyitems,
      openingPrizeAfter,
      luckDraw
    },
    methods: {
      share () {
        mta.Event.stat('share', {'method': '抽奖详情页分享'})
        this.display = !this.display
        mta.Event.stat('share', {
          'method': '抽奖详情页分享'
        })
      },
      getBean () {
        this.$setStorageSync('getBeanMethod', '抽奖详情-赚金豆')
      },
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
      shadeShow () {
        this.display = !this.display
      },
      toMakeImg (lucky) {
        if (lucky === true) {
          TwoCodeService.get().then((res) => {
            this.QR = res.data.url
            if (res.code === 0) {
              this.$navigateTo('../makePicture/index?title=生成分享图&lucky=true&activity=' + JSON.stringify(this.activitie) + '&twoCode=' + res.data.url)
            }
          })
          return
        }
        TwoCodeService.get().then((res) => {
          this.QR = res.data.url
          if (res.code === 0) {
            this.$navigateTo('../makePicture/index?title=生成分享图&activity=' + JSON.stringify(this.activitie) + '&twoCode=' + res.data.url)
          }
        })
      },
      getActivitie (id) { // 获取活动详情
        ActivitiesService.get({
          id,
          append: 'BET_NUM'
        }).then((res) => {
          if (res.code === 0) {
            if (res.data.metadata.ticketsNum) {
              res.data.metadata.ticketsNum = parseInt(res.data.metadata.ticketsNum)
            }
            this.prize = res.data.items[0]
            this.activitie = res.data
            this.activity = JSON.stringify(res.data)
            this.betNum = res.data.betNum

            // 转化需要注数的数据类型
            res.data.metadata.ticketsNum = res.data.metadata.ticketsNum && parseInt(res.data.metadata.ticketsNum)
            // 判断是否满注
            if (res.data.metadata.ticketsNum === res.data.betNum) {
              this.modifyState(3.1)
            }

            // 判断活动状态
            if (res.data.status === 'REWARDED') { // 活动已结束
              this.modifyState(5)
            }

            // 如果到时开奖 格式化时间
            if (res.data.metadata.drawRule === 'timed') {
              const date = new Date(res.data.endTime)
              res.data.endTimeDay = `${date.getMonth() + 1}月${date.getUTCDate()}日`
              res.data.endTimeHours = `${date.getUTCHours() + 1}:${date.getUTCMinutes()}分`
              console.log('1', res)
            }

            this.mediaInfoimg = res.data.media.filter((img) => img.layout === 'INTRODUCTION')
            this.prize = res.data.items[0] // 商品
            this.activitie = res.data
            this.betNum = res.data.betNum
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
            } else if (res.data[0].metadata.lucky && res.data[0].metadata.lucky === 'true') { // 判断是否中奖
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
              data.nickName = data.user.nickName
              return data
            }).slice(0, 9)

            this.ticketsTotal = ticketsTotal
            this.participantTotal = res.total
          }
        })
        // 获取中奖者信息
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
        const id = this.id
        this.getActivitie(id)
        this.getParticipants(id)
        this.getMeScores()
        getMeScores.start(this)
      }
    },
    onLoad (options) {
      this.id = options.id
      const userInfo = getUserInfo()
      this.userInfo = userInfo
      this.state = 0
      // setTimeout(() => {
      //   this.state = 2
      // }, 1000)
      this.ticketsNum = 1
      mta.Page.init()

      mta.Event.stat('lucky_draw', {
        'activityname': options.name
      })
      if (options.method === '全部抽奖') {
        mta.Event.stat('lucky_draw', {
          'from': '全部抽奖'
        })
      } else if (options.method === '首页') {
        mta.Event.stat('lucky_draw', {
          'from': '首页'
        })
      }

      if (this.$getStorageSync('scene') === 1014) {
        mta.Event.stat('lucky_draw', {
          'from': '模板消息'
        })
      } else if (this.$getStorageSync('scene') === 1007 || this.$getStorageSync('scene') === 1008) {
        mta.Event.stat('lucky_draw', {
          'from': '好友分享'
        })
      }
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