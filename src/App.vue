<script>
export default {
  created () {
  }
}
</script>

<style>
@import (less) '../static/iconFont/iconfont.css';
.container {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 200rpx 0;
  box-sizing: border-box;
}
/* this rule will be remove */
* {
  transition: width 2s;
  -moz-transition: width 2s;
  -webkit-transition: width 2s;
  -o-transition: width 2s;
}
view {
  font-family: DINAlternate PingFangSC-Regular;
  box-sizing: border-box;
}
page{
  background-size: 100% auto;
  background: #F1F1F1;
  /*background-image: url(https://oss.qianbaocard.org/20180704/b09c72e44ce147fc974ee3ea8616afff.png);*/
}
.antialiased{
  -webkit-font-smoothing: antialiased;
}
.bold{
  font-weight: bold;
}
.left{
  float: left;
}
.right{
  float:right;
}
.c{
  clear: both;
}

</style>
