<template>
  <div>
    <a class="list" v-for='(item, index) in list '>
      <div class="info">
        <text>
          注册用户
        </text>
        <br />
        <span>
          2018-06-23 11:36
        </span>
      </div>
      <span>
        +10
      </span>
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
    padding : 15*@2 15*@2 15*@2 0;
    border-bottom: 1*@1 solid RGBA(234, 234, 234, 0.5);
    box-sizing: border-box;
    >div{
      flex:1;
      text{
        font-size: 14*@2;
        line-height: 18*@2;
        color: RGBA(67, 67, 67, 1);
      }
      >span{
        font-size: 12*@2;
        line-height: 16*@2;
        color:RGBA(153, 153, 153, 1);
      }
    }
    >span {
      color:RGBA(243, 185, 19, 1);
      font-size: 22*@2;
      line-height: 28*@2;
      margin-top:10*@2;
    }
  }
</style>
