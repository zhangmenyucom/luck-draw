<template>
  <div>
    <a class="list" v-for='(item, index) in list '>
      <img src="http://fanyi.bdstatic.com/static/translation/img/header/logo_cbfea26.png" alt="">
      <div>
        <span class='title'>
          超炫酷iphone X（256G）深灰色
        </span>
        <div class="info">
          <span>
            已有999人参与
          </span>
          <br />
          <span>
            满1000人开奖
            <span class="state">
              已结束
            </span>
          </span>
        </div>

      </div>
    </a>
  </div>
</template>

<script>
  export default {
    props: ['list', 'rangeKey', 'size']
  }
</script>

<style scoped>
  @import '../common/util.less';

  .list{
    display: flex;
    padding : 15*@2;
    border-bottom: 1*@1 solid RGBA(234, 234, 234, 0.5);

    box-sizing: border-box;
    > img {
      width:80*@2;
      height: 80*@2;
      margin-right: 16*@2;
    }
    >div{
      flex:1;
      position: relative;
      .title{
        font-size: 14*@2;
        line-height: 18*@2;
      }
      .info{
        position: absolute;
        bottom:0;
        font-size: 12*@2;
        line-height: 16*@2;
        color: RGBA(153, 153, 153, 1);
        width: 100%;
        .state{
          color: RGBA(153, 153, 153, 1);
          float: right;
          font-size: 14*@2;
          line-height: 18*@2;
          color: RGBA(254, 76, 82, 1)
        }
      }

    }
  }
</style>
