<template>
  <div :class="{luckDraw:true, luckDraws:state == 2}">
    <div class="prize" v-if ="state >= 0 && state <= 3 ">
      <div>
        <div class='bold antialiased'>
          <form :data-state="state + 1" @submit.stop = "modifyState">
            <button form-type = "submit">点我抽奖</button>
          </form>
        </div>
      </div>
    </div>
    <div class="circular" v-if ="state >= 0 && state <= 3 ">
      <div v-for='i in 6' />
    </div>
    <div class="prize" v-if ="state >= 0 && state <= 3 ">
      <div>
        <div class='bold antialiased'>
          <form :data-state="state + 1" @submit.stop = "modifyState">
            <button form-type = "submit">点我加注</button>
          </form>
        </div>
      </div>
    </div>
    <div class="circular" v-if ="state >= 0 && state <= 3 ">
      <div v-for='i in 6' />
    </div>
    <div class="prize" v-if ="state >= 0 && state <= 3 ">
      <div>
        <div class='bold antialiased'>
          <form :data-state="state + 1" @submit.stop = "modifyState">
            <button form-type = "submit">等待开奖</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import drawList from '@/components/drawList'
  export default {
    props: ['state', 'modifyState'],
    components: {
      drawList
    },
    watch: {
      state (val) {
        console.log('val', val)
      }
    }
  }
</script>
<style scoped>
  @import '../../common/less/util.less';

  .loop(@count) when( @count > 0 ){
    >div:nth-child(@{count}){
      transition:all 0.2s linear @count*0.1s;
      width: (16-((6-@count)*2))*@2;
      height: (16-((6-@count)*2))*@2;
      background: #ff975e;
      border-radius: 50%;
      margin-left: 2*@2;
      margin-right: 2*@2;
      float: left;
      opacity:0;
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
      opacity:0;
    }
    .loop1((@count - 1));
  }
  .luckDraw{
    transition:all 0.5s;
    width: 520*@2;
    transform: translateX(117*@2);
    display: flex;
    justify-content:center;
    .circular{
      display: flex;
      align-items:center;
      .loop(6)
    }
    .circular:nth-child(4){
      display: flex;
      align-items:center;
      .loop1(6)
    }
    .circular:nth-child(4){
      transform: rotate(( 180deg));
    }
    .prize {
     width: 100*@2;
     height: 100*@2;
     background: -webkit-linear-gradient(RGBA(255, 151, 94, 0.3), RGBA(255, 50, 72, 0.3));
     /* Safari 5.1 - 6.0 */
     border-radius: 55*@2;
     margin: 24*@2 auto;
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
  transform: translateX(-87*@2);
  .prize:nth-child(3),.prize:nth-child(5),.circular:nth-child(2),.circular:nth-child(4){
    opacity: 1;
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
</style>