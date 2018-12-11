<template>
  <div>
    <top title="抽奖" />
    <load :isshow="isShow" :isanimation="isAnimation"/>
    <signIn :isanimation.sync='isAnimation'  :signInCB = "signInCB"/>
    <div v-if='!isShow'>
      <div class="activitiesDetails" >
        <swiper class='swiper' autoplay circular display-multiple-items>
          <swiper-item v-for="(item, i) in activitie.items" :key="i">
          <img mode='aspectFill' :src="item.metadata.image">
        </swiper-item>
      </swiper>
      <div class="name antialiased">
        <div v-for="(item, i) in activitie.items" :key= "i">
          <text>「奖品{{i+1}}」</text>{{item.name}}&nbsp;<span>X&nbsp;{{item.metadata.num}}</span>
        </div>
      </div>
      <!-- 活动信息及状态 -->
      <div class="activitieInfo">
        <div v-if="activitie.metadata.drawRule == 'fullTicket'" class='state'>满<text>{{activitie.metadata.ticketsNum * activitie.metadata.price}}</text>金豆自动开奖，剩余<text>{{(activitie.metadata.ticketsNum-activitie.betNum)*activitie.metadata.price}}</text>金豆</div>

        <div v-if="activitie.metadata.drawRule == 'fullParticipant'" class='state'>满<text>{{activitie.metadata.participantsNum}}</text>人开奖，剩余<text>{{activitie.metadata.participantsNum-activitie.realNum}}</text>人</div>

        <div v-if="activitie.metadata.drawRule == 'timed'" class='state'>{{activitie.endTimeDay}}<text>{{activitie.endTimeHours}}</text>开奖</div>
        <div v-if='activitie.metadata.price' class="info">
          {{activitie.metadata.price}}<img src='/static/img/goldBean.png' class="" />参与
        </div>
      </div>

      <div class="c">
        <img src="https://oss.qianbaocard.org/20180914/7b0e9c5fc57f482c97d47c34c541b03c.png" />
      </div>
      <!-- 活动信息及状态end -->

      <!-- 赞助商 -->
      <navigator target='miniProgram' class="hint" v-if="activitie.metadata.hasSponsor == 'true' || activitie.type == 'PERSONAL_LUCKY_DRAW'" :app-id="activitie.metadata.sponsor&&activitie.metadata.sponsor.appId" :path="activitie.metadata.sponsor&&activitie.metadata.sponsor.path" :extra-data="activitie.metadata.sponsor&&activitie.metadata.sponsor.params">
        <span>{{activitie.type == "PERSONAL_LUCKY_DRAW" ? '抽奖发起人' : '赞助商'}}</span>
        <div v-if='activitie.metadata.hasSponsor' class="">
          <span class='bold'>{{activitie.metadata.sponsor.appName}}</span>
          <i class='icon iconfont icon-xiaochengxu' />
          <i class='icon iconfont icon-xuanzedizhi' />
        </div>
        <div v-else>
          <img :src="activitie.owner.avatar" />
          {{activitie.owner.nickName}}
        </div>
      </navigator>
      <!-- 赞助商结束 -->

      <!-- 编辑 -->
      <div class="edit" v-if="participantTotal == 0 && activitie.status == 'CREATED' && activitie.owner.id == userInfo.id" >
        <a :href="activitie.metadata.edition === 'baseEdition'?'/pages/baseCreateActivity/createActivities?id='+activitie.id:'/pages/createActivities/createActivities?id='+activitie.id+'&navPage=1'">
          编辑抽奖
        </a>
      </div>
      <!-- 编辑结束 -->

      <!-- 我发起的活动 可以看到中奖者信息 -->
      <div class="participantMe" v-if="activitie.owner.id == userInfo.id && activitie.type == 'PERSONAL_LUCKY_DRAW' && state >= 5 && participantTotal > 0">
        <a :href="'/pages/luckierList/index?id=' + activitie.id" class="participantInfo">
          查看中奖者收货信息（{{addressExistTotal}}/{{ticketsTotal}}） <i class ='icon iconfont icon-xuanzedizhi' />
        </a>
        <div class="explain">
          抽奖开奖后，请根据中奖人联系信息于7日内发奖，<br />
          若中奖人不满足发奖品要求时，建议短信告知.
        </div>
      </div>
      <!-- 我发起的活动 可以看到中奖者信息 结束 -->
      <div class="interval c"></div>
      <!-- 奖品详情 -->
      <div class="description" v-if='activitie.description'>
        <!-- <span>
          奖品说明：
        </span></br> -->
        {{activitie.description}}
      </div>
      <div class="interval c"></div>
      <div class="mediaInfo" v-if="mediaInfoimg.length > 0">
        <img mode='widthFix' v-for='(item, i) in mediaInfoimg' :src="item.url">
      </div>
      <!-- 奖品详情结束 -->

      <!-- 开奖后 -->
      <openingPrizeAfter v-if='state >= 5' :participants="participants" :state="state" :activitie="activitie" />
        <!-- 开奖后 -->

        <!-- 中奖名单 -->
        <luckyitems v-if='state >= 5 && luckyItemList.length > 0' :list='luckyItemList' :activitie = 'activitie' />
          <!-- 中奖名单结束 -->
          <div class="gray">
            <div class="c"></div>
            <!-- 抽奖按钮 -->
            <luckDraw v-if='state >= 0 && state <= 3.1' :state = 'state' :participants='participants' :activitie = 'activitie' :modifyState= 'modifyState' :bets='bets'/>
              <!-- 抽奖按钮结束 -->
              <!-- 参加列表 -->
              <div class="participant" v-if="participantTotal>0">
                <span class='antialiased'>
                  已有{{participantTotal}}人参加 <a :href= "'/pages/participantList/index?id=' + activitie.id">查看全部 》</a>
                </span>
                <headPortrait :list="participantList" rangeKey="img" />
              </div>
              <!-- 参加列表结束 -->
              <!-- 免责说明 -->
              <div v-if="activitie.type !== 'PLATFORM_LUCKY_DRAW'" class="free" @tap='() => {this.isFree = true; this.isModal = true}'>
                点此查看免责说明
              </div>
              <!-- 免责说明结束 -->
            </div>
            <!-- 底部 -->
            <div :class='{bottom:true, bottomShow:isBottom}'>
              <!-- #warning  暂时不上 -->
              <!-- <div v-if="activitie.owner.id != userInfo.id">
                <a href="/pages/baseCreateActivity/createActivities" class="button">
                  发起抽奖
                </a>
              </div> -->
              <div v-if="state <= 3" >
                <button v-if="activitie.owner.id == userInfo.id" class="button button-o" @click="share">
                  发送抽奖邀请
                </button>
                <button v-else class="button button-o" @click="share">
                  分享领金豆
                </button>
              </div>
            </div>
            <!-- 底部结束 -->

            <!-- 弹出层 -->
            <model :luckyItemList='luckyItemList' :modifyState='modifyState' :bets='bets' :toMakeImg='toMakeImg' :score = 'score' :participants='participants' :activitie = 'activitie' :state.sync = 'state' :isFree.sync = 'isFree' :oldState= 'oldState'  />
            <!-- 弹出层结束 -->
          </div>
        </div>
        <div class="shade" v-if="display" @tap="shadeShow">
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
import model from './model'
import openingPrizeAfter from './openingPrizeAfter'
import FootprintsActivities from '@/services/footprintsActivities'
import ActivitiesService from '@/services/activitiesService'
import ParticipantsService from '@/services/participantsService'
import PictureService from '@/services/pictureService.js'
import { getUserInfo } from '@/utils'
import MeScoresService from '@/services/meScoresService.js'
import TwoCodeService from '@/services/twoCodeService.js'
import getMeScores from '@/common/js/getMeScores.js'
const mta = require('@/common/js/mta_analysis.js')
export default {
  data () {
    return {
      isFree: false,
      isShow: true,
      id: '',
      score: 0,
      participantList: [],
      participantTotal: 0,
      luckyList: [],
      activitie: {
        owner: {},
        endTimeDay: '',
        endTimeHours: '',
        id: '',
        metadata: {
          ticketsNum: 0,
          drawRule: ''
        },
        items: [
          {
            metadata: {}
          }
        ],
        media: [
          {
            url: ''
          }
        ],
        type: ''
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
      addressExistTotal: 0, // 填写过地址的总数
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
      miniappId: 'qianbaocard_mkt',
      display: false,
      activity: '',
      QR: '',
      mediaInfoimg: [], // 商品详情列表
      luckyItemList: [], // 中奖者名单
      isBottom: false,
      state: 0
      // 0 NotInvolved 未参与
      // 1 Bets 下注
      // 2 ParticipateIn 参与过
      // 3 重新下注
      // 3.1 已经满注 等待开奖
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
    luckDraw,
    model
  },
  methods: {
    share () {
      mta.Event.stat('share', {
        method: '抽奖详情页分享'
      })
      if (this.activitie.owner.id !== this.$getStorageSync('userInfo').id) {
        if (this.activitie.metadata.isShare === 'false') {
          this.$showToast('该活动不允许参与者分享！')
          return
        }
      }
      this.display = !this.display
    },
    getBean () {
      this.$setStorageSync('getBeanMethod', '抽奖详情-赚金豆')
    },
    getMeScores () {
      MeScoresService.getList().then(res => {
        if (res.code === 0) {
          this.score = res.data.score
          this.participateBet = parseInt(
            this.score / parseInt(this.activitie.metadata.price)
          )
          this.isShow = false
        }
      })
    },
    getShareImg (activitie) {
      let text = ''
      switch (activitie.metadata.drawRule) {
        case 'fullTicket':
          text = `满${activitie.metadata.ticketsNum *
            activitie.metadata.price}金豆自动开奖，剩余${(activitie.metadata
            .ticketsNum -
            activitie.betNum) *
            activitie.metadata.price}金豆`
          break
        case 'fullParticipant':
          text = `满${activitie.metadata.participantsNum}人开奖，剩余${activitie
            .metadata.participantsNum - activitie.realNum}人`
          break
        case 'timed':
          text = `${activitie.endTimeDay}-${activitie.endTimeHours}开奖`
          break
      }
      const imgData = {
        backgroundUrl:
          'https://oss.qianbaocard.org/20180920/f16b013a2e3f454487b6fdbdbb419edc.jpg',
        items: [
          {
            xelementLayoutType: 'CENTER',
            yelementLayoutType: 'ABSOLUTELY',
            elementContent: activitie.items[0].metadata.image,
            elementMediaType: 'IMG',
            y: 30,
            height: 388,
            width: 690,
            sn: 0
          },
          {
            xelementLayoutType: 'ABSOLUTELY',
            yelementLayoutType: 'ABSOLUTELY',
            elementContent: `[奖品]${activitie.items[0].name}`,
            elementMediaType: 'TEXT',
            font: {
              elementFontStyle: 1,
              fontSize: 36
            },
            y: 480,
            x: 32,
            height: 388,
            width: 690,
            sn: 1
          },
          {
            xelementLayoutType: 'ABSOLUTELY',
            yelementLayoutType: 'ABSOLUTELY',
            elementContent: text,
            elementMediaType: 'TEXT',
            y: 528,
            x: 32,
            font: {
              elementFontStyle: 0,
              fontSize: 32
            },
            height: 388,
            width: 690,
            sn: 2
          }
        ]
      }
      PictureService.add(imgData).then(res => {
        if (res.code === 0) {
          console.log('res', res)
          this.shareImg = res.data
        }
      })
      // https://oss.qianbaocard.org/20180920/f16b013a2e3f454487b6fdbdbb419edc.jpg
    },
    setClipboardData () {
      this.$setClipboardData(this.miniappId)
    },
    shadeShow () {
      this.display = !this.display
    },
    toMakeImg (lucky) {
      TwoCodeService.get().then(res => {
        this.QR = res.data.url
        if (res.code === 0) {
          lucky === true
            ? this.$navigateTo(
              '../makePicture/index?title=生成分享图&lucky=true&activity=' +
                  JSON.stringify(this.activitie) +
                  '&twoCode=' +
                  res.data.url
            )
            : this.$navigateTo(
              '../makePicture/index?title=生成分享图&activity=' +
                  JSON.stringify(this.activitie) +
                  '&twoCode=' +
                  res.data.url
            )
        }
      })
    },
    getActivitie (id) {
      // 获取活动详情
      ActivitiesService.get({
        id,
        append: 'BET_NUM'
      }).then((res) => {
        console.log('this', this)
        if (res.code === 0) {
          if (res.data.metadata.sponsor) {
            res.data.metadata.sponsor = JSON.parse(res.data.metadata.sponsor)
          }
          if (res.data.metadata.ticketsNum) {
            res.data.metadata.ticketsNum = parseInt(
              res.data.metadata.ticketsNum
            )
          }
          // 处理不能二次分享
          if (res.data.metadata.isShare && res.data.metadata.isShare === 'false') {
            wx.updateShareMenu({
              withShareTicket: true
            })
          }
          // 转化需要注数的数据类型
          res.data.metadata.ticketsNum =
            res.data.metadata.ticketsNum &&
            parseInt(res.data.metadata.ticketsNum)

          // 判断是否待开奖
          switch (res.data.metadata.drawRule) {
            case 'fullTicket':
              if (parseInt(res.data.metadata.ticketsNum) === res.data.betNum) {
                this.modifyState(3.1)
              }infodetal
              break
            case 'fullParticipant':
              if (
                parseInt(res.data.metadata.participantsNum) === res.data.realNum
              ) {
                this.modifyState(3.1)
              }
              break
            default:
              if (
                new Date(res.data.endTime).getTime() <= new Date().getTime()
              ) {
                this.modifyState(3.1)
              }
          }
          // 判断活动状态
          if (res.data.status === 'REWARDED') {
            // 活动已结束
            this.modifyState(5)
          }

          // 如果到时开奖 格式化时间
          if (res.data.metadata.drawRule === 'timed') {
            const date = new Date(res.data.endTime)
            res.data.endTimeDay = `${date.getMonth() + 1}月${date.getDate()}日`
            res.data.endTimeHours = `${date.getHours()}:${date.getMinutes()}分`
          }
          // 过滤商品介绍图
          this.mediaInfoimg = res.data.media.filter(
            img => img.layout === 'INTRODUCTION'
          )
          this.prize = res.data.items[0] // 商品
          this.activitie = res.data
          this.betNum = res.data.betNum
          this.participateBet = parseInt(
            this.score / parseInt(this.activitie.metadata.price)
          )
          debugger
          this.getShareImg(res.data)
        }
      })
    },
    modifyState (e) {
      const state =
        typeof e === 'number' ? e : parseInt(e.target.dataset.state, 10)
      // 下注或重新下注前查看 积分是否够用
      if (state === 1 || state === 3) {
        if (this.activitie.metadata.price > this.score) {
          this.$showToast('金豆不足')
          return false
        }
      }
      setTimeout(() => {
        if (state > this.state) {
          this.isModal = true
          this.oldState = this.state
          // 等待子组件调整
          this.state = state
        }
      }, 100)
    },
    getParticipants (activityId) {
      const userInfo = getUserInfo()
      // 查询用户是否参与活动
      ParticipantsService.getList({
        activityId,
        userId: userInfo.id
      }).then(res => {
        if (res.code === 0 && res.data.length > 0) {
          this.participants = res.data[0]
          if (res.data[0].metadata.address) {
            // 判断是否添加过地址
            this.modifyState(7)
          } else if (
            res.data[0].metadata.lucky &&
            res.data[0].metadata.lucky === 'true'
          ) {
            // 判断是否中奖
            this.modifyState(6)
          } else {
            this.modifyState(2)
          }
        }
      })

      // 查询活动总参与人数
      ParticipantsService.getList({
        activityId
      }).then(res => {
        if (res.code === 0) {
          this.participantList = res.data
            .map(data => {
              data.img = data.user.avatar
              data.nickName = data.user.nickName
              return data
            })
            .slice(0, 9)
          this.participantTotal = res.total
        }
      })
      // 获取中奖者信息
      ParticipantsService.getList({
        activityId,
        lucky: true
      }).then(res => {
        if (res.code === 0) {
          this.luckyItemList = res.data.map(data => {
            data.img = data.user.avatar
            data.nickName = data.user.nickName
            return data
          })
          this.ticketsTotal = res.total
        }
      })

      // 查询填写地址的参与者信息
      ParticipantsService.getList({
        activityId,
        addressExist: true
      }).then(res => {
        if (res.code === 0) {
          this.addressExistTotal = res.total
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
    bets (e) {
      // 下注 参与活动
      this.$showLoading()
      const { activitie } = this
      const user = getUserInfo()
      ParticipantsService.add({
        activityId: activitie.id,
        scene: 'MEMBER_JOIN_LUCKY_DRAW',
        ticketsNum: e.target.dataset.ticketsnum
          ? e.target.dataset.ticketsnum
          : this.ticketsNum,
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
  onReachBottom () {
    this.isBottom = true
  },
  onLoad (options) {
    this.isBottom = false
    this.id = options.id
    const userInfo = getUserInfo()
    this.userInfo = userInfo
    this.state = 0
    this.display = true
    // setTimeout(() => {
    //   this.state = 6
    // }, 1000)
    this.ticketsNum = 1
    mta.Page.init()
    let from = options.method
    if (this.$getStorageSync('scene') === 1014) {
      from = '模板消息'
    } else if (
      this.$getStorageSync('scene') === 1007 ||
      this.$getStorageSync('scene') === 1008
    ) {
      from = '好友分享'
    }
    mta.Event.stat('lucky_draw', {
      activityname: options.name,
      from: from
    })
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
      this.isLoad()
      this.userInfo = userInfo
      this.display = false
    } else {
      this.$navigateTo('/pages/login/index')
    }
  },
  onShareAppMessage () {
    // const introductionImageUrl = this.activitie.media.filter(media => media.layout === 'INTRODUCTION')[0]
    const _this = this
    return {
      title: this.activitie.description || this.activitie.name,
      path: `pages/activitiesDetails/index?id=${this.activitie.id}`,
      imageUrl: this.shareImg,
      success (res) {
        if (res) {
          FootprintsActivities.add({
            type: 'SHARE',
            target: {
              type: 'VINCI_CC_FOOTPRINT',
              id: _this.activitie.id,
              name: _this.activitie.name
            }
          }).then(res => {
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
@import "./index.less";
</style>