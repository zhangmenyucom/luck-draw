<template>
  <swiper previous-margin='150rpx' next-margin="150rpx" :current='current' v-if=" activitie.metadata && activitie.metadata.drawRule !== 'timed'" :class="{luckDraw:true}">
    <swiper-item>
      <div class="circular">
      </div>
      <div :class="{prize: true, current:current == 0 }">
        <div>
          <div class='bold antialiased'>
            <form v-if="activitie.metadata.drawRule == 'fullTicket'" :data-state="state + (current == 0 ? 1 : 0)" @submit.stop="modifyState">
              <button form-type="submit">点我<br />抽奖</button>
            </form>
            <form v-else report-submit @submit.stop="bets">
              <button form-type="submit">点我<br />抽奖</button>
            </form>
          </div>
        </div>
      </div>
      <div class="circular">
        <div v-for='i in 3' />
      </div>
    </swiper-item>
    <swiper-item>
      <div class="circular">
        <div v-for='i in 3' />
      </div>
      <div :class="{prize: true, current:current == 1 }">
        <div>
          <div class='bold antialiased'>
            <form v-if="activitie.metadata.drawRule == 'fullTicket'" :data-state="state + (current == 1 ? 1 : 0)" @submit.stop="modifyState">
              <button form-type="submit">
                加注
                <span class='tickets' >已下{{participants.tickets.length * activitie.metadata.price}}金豆</span>
              </button>
            </form>
            <form v-else>
              <button open-type="share">分享<br />加速</button>
            </form>
          </div>
        </div>
      </div>
      <div class="circular">
        <div v-for='i in 3' />
      </div>
    </swiper-item>
    <swiper-item>
      <div class="circular">
        <div v-for='i in 3' />
      </div>
      <div :class="{prize: true, current:current == 2 }">
        <div>
          <div class='bold antialiased'>
            <form>
              <button form-type="submit">等待<br />开奖</button>
            </form>
          </div>
        </div>
      </div>
      <div class="circular">
      </div>
    </swiper-item>
  </swiper>
  <!-- 按日期开奖 -->
  <div v-else :class="{'luckDraw-t':true, 'luckDraws-t':state >= 2}">
    <div class="c"></div>
    <div class="date" v-if='state == 2'>已参与，{{activitie.endTimeDay}} {{activitie.endTimeHours}}开奖</div>
    <div class="prize">
      <div>
        <div class='bold antialiased'>
          <div class="animation">
          </div>
          <form report-submit @submit.stop="bets">
            <button form-type="submit"> {{state == 2 ? "等待开奖":'参与抽奖'}} </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import drawList from '@/components/drawList'
  export default {
    props: ['state', 'activitie', 'modifyState', 'bets', 'participants'],
    components: {
      drawList
    },
    data () {
      return {
        current: 0
      }
    },
    watch: {
      state (val) {
        // console.log('val', val)
        this.current = val <= 1 ? 0 : (val <= 3 ? 1 : 2)
      }
    }
  }
</script>
<style scoped>
  @import '../../common/less/util.less';
  .scroll{
    width: 100*@2;
  }
  form, button {
    position: relative;
    z-index: 100
  }
  .tickets{
    font-size: 10*@2;
    /*margin: 0 10*@2;*/
    display: inline-block;
    text-align: center;
    line-height: 11*@2;
  }
  .loop(@count) when( @count > 0 ){
    >div:nth-child(@{count}){
      transition:all 0.2s linear @count*0.1s;
      /*width: (16-((6-@count)*2))*@2;
      height: (16-((6-@count)*2))*@2;*/
      width: 8*@2;
      height: 8*@2;
      background: #ff975e;
      border-radius: 50%;
      /*margin-left: 2*@2;
      margin-right: 2*@2;*/
      /*float: left;*/
      /*opacity:0;*/
    }
    .loop((@count - 1));
  }

  .loop1(@count) when( @count > 0 ){
    >div:nth-child(@{count}){
      transition:all 0.2s linear ((@count*0.1) + 1)*1s;
      width: (16-((6-@count)*2))*@2;
      height: (16-((6-@count)*2))*@2;
      background: #ff975e;
      border-radius: 50%;
      margin-left: 2*@2;
      margin-right: 2*@2;
      float: left;
      /*opacity:0;*/
    }
    .loop1((@count - 1));
  }
  @keyframes animation {
    0%   {transform: scale(0)}
    50%   {transform: scale(1)}
    57%   {transform: scale(0.9)}
    65%   {transform: scale(1)}
    100%   {transform: scale(1.2)}
  }
  @keyframes prizeAnimation {
    0%   {transform: scale(0.9); opacity: 0.8}
    45%   {transform: scale(1.3); opacity: 0.5}
    100%   {transform: scale(1.3); opacity: 0}
  }
  .date{
    color: RGBA(67, 67, 67, 1);
    font-size: 14*@2;
    line-height: 18*@2;
    text-align: center;
    margin-top: 40*@2;
  }
  .luckDraw-t{
    .prize {
      opacity:1;
      transition:all 0.7s linear 0.5s;
      width: 100*@2;
      height: 100*@2;
      position: relative;
      margin: 16*@2 auto;
      background:#F9F9F9;
      >div {
       width: 90*@2;
       height: 90*@2;
       background: -webkit-linear-gradient(RGBA(255, 151, 94, 1), RGBA(255, 50, 72, 1));
       /* Safari 5.1 - 6.0 */
       border-radius: 50*@2;
       margin: auto;
       position: relative;
       top: 5*@2;
       >div {
         width: 84*@2;
         height: 84*@2;
         background: -webkit-linear-gradient(RGBA(255, 115, 42, 1), RGBA(255, 100, 113, 1));
         /* Safari 5.1 - 6.0 */
         border-radius: 42*@2;
         margin: auto;
         position: relative;
         top: 3*@2;
         font-size: 22*@2;
         color: #fff;
         text-align: center;
         padding: 16*@2 20*@2;
         box-sizing: border-box;
         position: relative;
         .animation{
          position: absolute;
          top:0;
          left: 0;
          right: 0;
          bottom:0;
          border-radius: 50%;
          border:2*@2 solid #fff;
          transform: scale(0);
        }
        button {
         font-family: "HYe4gj";
         background: transparent!important;
         padding: 0;
         color: #fff;
         line-height: 28*@2;
         border: none;

       }
       button::after {
         border: none;
       }
     }
   }
 }
}
.luckDraws-t{
  .prize{
    opacity: 0.3!important;
  }
  .animation{
    animation: animation 1s ease-in forwards;
  }
}
.luckDraw{
  transition:all 0.5s;
  width: 100%;
  height: 150*@2;
  display: flex;
  justify-content:center;
  .circular{
    display: flex;
    align-items:center;
    flex:1;
    justify-content:space-around;
    .loop(3)
  }
  .circular:nth-child(4){
    display: flex;
    align-items:center;
    .loop1(6)
  }
  .circular:nth-child(4){
    transform: rotate(( 180deg));
  }
  .prize::after{
    content:" ";
    position:absolute;
    width: 100%;
    height: 100%;
    top:0;
    bottom:0;
    background: -webkit-linear-gradient(RGBA(255, 151, 94, 0.3), RGBA(255, 50, 72, 0.3));
    border-radius: 55*@2;
    animation: prizeAnimation 1.5s ease-in forwards infinite;
  }
  swiper-item{
    display: flex;
  }
  .prize {
    background:#F9F9F9;
    transform: scale(0.7);
    opacity: 0.7;
    position: relative;
    width: 110*@2;
    height: 110*@2;
    margin: 24*@2 auto;
    >div {
     width: 90*@2;
     height: 90*@2;
     background: -webkit-linear-gradient(RGBA(255, 151, 94, 1), RGBA(255, 50, 72, 1));
     /* Safari 5.1 - 6.0 */
     border-radius: 50*@2;
     margin: auto;
     position: relative;
     top: 10*@2;
     >div {
       width: 84*@2;
       height: 84*@2;
       background: -webkit-linear-gradient(RGBA(255, 115, 42, 1), RGBA(255, 100, 113, 1));
       /* Safari 5.1 - 6.0 */
       border-radius: 42*@2;
       margin: auto;
       position: relative;
       top: 3*@2;
       font-size: 22*@2;
       color: #fff;
       text-align: center;
       padding: 16*@2 0;
       box-sizing: border-box;
       button {
         font-family: "HYe4gj";
         background: transparent!important;
         /*padding: -10*@2 0;*/
         /*margin: 0 10*@2;*/
         color: #fff;
         line-height: 28*@2;
         border: none;
       }
       button::after {
         border: none;
       }
     }
   }
 }
 .current{
  transform: scale(1);
  opacity: 1;
}
.circular:nth-child(2),.circular:nth-child(4){
  opacity: 0;
  transition:all 0.5s linear 0.5s;
}
.prize:nth-child(3){
  opacity: 0;
  transform: scale(0.7);
  transition:all 0.5s linear 0.2s;
}
.prize:nth-child(5){
  opacity: 0;
  transform: scale(0.7) translateX(-15%);
  transition:all 0.5s linear 1s;
}
}

.luckDraws{
  /*transform: translateX(-87*@2);*/
  .prize:nth-child(3),.prize:nth-child(5),.circular:nth-child(2),.circular:nth-child(4){
    opacity: 1;
  }
  .prize:nth-child(1)::after, .prize:nth-child(5)::after {
    animation: none;
  }
  .prize:nth-child(3){
    transform: scale(1);
  }
  .circular {
    >div{
      opacity: 1!important;
    }
  }
  .prize:nth-child(1){
    transform: scale(0.7) translateX(15%)
  }
}
.luckDrawt{
  /*transform: translateX(-290*@2);*/
  /*padding-right: 290*@2;*/
  box-sizing: inherit;
  .prize:nth-child(3),.prize:nth-child(5),.circular:nth-child(2),.circular:nth-child(4){
    opacity: 1;
  }
  .prize:nth-child(1)::after, .prize:nth-child(3)::after {
    animation: none;
  }
  .prize:nth-child(5){
    transform: scale(1);
  }
  .circular {
    >div{
      opacity: 1!important;
    }
  }
  .prize:nth-child(1), .prize:nth-child(3){
    transform: scale(0.7) translateX(15%)
  }
}
</style>