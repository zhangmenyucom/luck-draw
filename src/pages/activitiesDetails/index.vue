<template>
  <div class="activitiesDetails">
    <img src="https://img.zcool.cn/community/0124b15b3dc502a80120b9598bbe15.jpg">
    <div class="prompt antialiased">
      <div class="left">
        剩余<span>XXX</span> 注
      </div>
      <div class="right">
        |  满XXX注开奖
      </div>
    </div>
    <div class="name antialiased">
      <span>
        「奖品」
      </span>
      超酷炫iPhoneX(256G)深空灰深空灰深空灰深空灰深空灰
    </div>
    <!-- 中间提示 -->
    <div class="goldBean">
      <img src='/static/img/goldBean.png'>
      <text class='bold'>
        10 金豆 1 注
      </text>
      <span>
        ¥8799
      </span>
      <div>
        <i />中奖规则
      </div>
    </div>

    <div class="hint"  v-if="state == 'NotInvolved' || state == 'ParticipateIn'">
      <div class="c"></div>
      <div class="bets" v-if="state == 'ParticipateIn'">
        <span>
          已下注
        </span>
        <div>
          5<span>注</span>
        </div>
        <text>
          查看辛运号
        </text>
        <i></i>
      </div>
      提示：注数越多，获胜几率越大，开奖以幸运号为准。
    </div>
    <!-- 中间提示结束 -->

    <!-- 中奖 -->
    <div class="draw hint" v-if="false">
      <span></span>
      <div class="">
        恭喜，你已中奖
      </div>
      <div class="divButton">
        <button class="butotn-o">去领奖</button>
        <button class="button">炫耀一下</button>
      </div>
      <span></span>
    </div>
    <!-- 中奖结束 -->

    <!-- 抽奖按钮 -->
    <div class="prize" v-if ="state == 'NotInvolved' || state == 'ParticipateIn' ">
      <div>
        <div class='bold antialiased'>
          点我抽奖
        </div>
      </div>
    </div>
    <!-- 抽奖按钮结束 -->
    <!-- 中奖名单 -->
    <div class="drawList" v-if='false'>
      <div class="border">
        <div>
          中奖名单
        </div>
      </div>
      <div class="list">
        <headPortrait :list="['http://www.runoob.com/images/compatible_chrome.gif']" :size="56" />
        <text>
          幸运号：111111
        </text>
      </div>
    </div>
    <!-- 中奖名单结束 -->
    <!-- 参加列表 -->
    <div class="participant">
      <span class='antialiased'>
        已有XXX人参加
      </span>
      <headPortrait :list="participantList" />
    </div>
    <div class="bottom button">
      分享领金币
    </div>
    <!-- 参加列表结束 -->

    <!-- 弹出层 -->
    <div class="modal" v-if='isModal'>
      <div class="content">
        <img src="../../../static/img/group.png" mode='widthFix'>
        <div>
          <div>
            <!-- 幸运号列表 -->
            <div v-if="false" class="luckyList" v-for='(item, index) in luckyList'>
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
            <div class="betting" v-if="false">
              <div class="operation">
                <div>
                  -
                </div>
                <div>
                  15
                </div>
                <div>
                  +
                </div>
              </div>
              <span class="record antialiased">
                你有152金豆<br />
                本次还可以下注25次
              </span>
              <button class="button">
                下注
              </button>
              <text class='cancel'>
                取消
              </text>
            </div>
            <!-- 投注结束 -->
            <!-- 提示 -->
            <div class="point">
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

</template>

<script>
  import ActivitiesService from '@/services/activitiesService'
  import headPortrait from '@/components/headPortrait'
  export default {
    data () {
      return {
        participantList: [
          'http://www.runoob.com/images/compatible_chrome.gif',
          'http://www.runoob.com/images/compatible_chrome.gif',
          'http://www.runoob.com/images/compatible_chrome.gif'
        ],
        luckyList: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 14],
        isModal: false,
        state: `NotInvolved` // 页面总的状态
        // NotInvolved 未参与
        // Bets 下注
        // ParticipateIn 参与过
        // LookAtTheLuckyNumber 查看幸运号
        // WinningThePrize 中奖
        // NotWinningThePrize 未中奖
      }
    },
    onPullDownRefresh () {
      this.$stopPullDownRefresh()
    },
    components: {
      headPortrait
    },
    methods: {
      getActivitie (id) {
        ActivitiesService.get({
          id
        }).then((res) => {
          if (res.code === 0) {
            this.activitie = res.data
          }
        })
      },
      bets () {
        this.isModal = true
      }
    },
    onLoad (a) {
      this.getActivitie(a.id)
    }
  }
</script>

<style scoped>
 @import './index.less';
</style>