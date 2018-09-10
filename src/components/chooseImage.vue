<template>
    <div class="wx-content-info">
        <!-- <div class="FilePath" @touchmove="scroll" @touchstart='scroll' @touchend='endTou'>
            <img class="imgPath" :src="imageSrc" :style="'position:absolute;width: '+width+'px;height: '+height+'px;top:'+topDistance+'px;left:'+leftDiatance+'px;'" />
        </div> -->
        <!-- <div class='cropper-config'>
            <button type="primary" @click="getImageInfo" style='margin-top: 30rpx'> 完成裁剪 </button>
        </div> -->
        <movable-area class="viewPic" :style="'position:absolute;width:375px;height:187.5px;top:'+topDistance+'px;'" scale-area>
          <movable-view :style="'width: '+width+'px;height: '+height+'px;top:'+viewTop+'px;'" direction="all" scale scale-min="1" scale-max="2.5">
            <img class="FilePath" :src="imageSrc" :style="'width: '+width+'px;height: '+height+'px;'" />
          </movable-view>
        </movable-area>
        <div class="topHideHalf" :style="'height:'+hideHeight+'px;'">
        </div>
        <div class="bottomHideHalf" :style="'height:'+hideHeight+'px;'">
        </div>
        <div class='cropper-config'>
            <div @click="getImageInfo"> 完成 </div>
        </div>
        <canvas canvas-id="myCanvas" :style="'position:absolute;border: 1px solid red; width:'+width+'px;height:'+height+'px;top:-99999px;left:-99999px;'"></canvas>
    </div>
</template>

<script>
export default {
  props: ['showImage', 'picIndex', 'picIndexSrc', 'imageSrc'],
  data () {
    return {
      width: 375,
      height: 187.5,
      olddistance: 0,
      oldSingleDisX: 0,
      viewTop: 0,
      singleDisX: 0,
      oldSingleDisY: 0,
      singleDisY: 0,
      topDistance: 0,
      leftDiatance: 0,
      newdistance: 0,
      diffdistance: '',
      Scale: 1,
      baseHeight: '',
      baseWidth: '',
      hideHeight: 0,
      maxLeft: 0,
      maxTop: 0,
      x: '',
      y: '',
      imgx: '',
      imgy: ''
    }
  },
  methods: {
    loadImage () {
      this.$getImageInfo(this.imageSrc).then(res => {
        this.baseHeight = res.height
        this.baseWidth = res.width
        const str = this.baseWidth / this.baseHeight
        this.width = 375
        this.height = this.width / str
        const windowH = this.$getWindowH()
        this.topDistance = (windowH - 187.5) / 2
        this.viewTop = (187.5 - this.height) / 2
        this.hideHeight = (windowH - 187.5) / 2
      })
    },
    getImageInfo () {
      let ctx = this.$createCanvasContext('myCanvas')
      this.Scale = (this.width / this.baseWidth).toFixed(3)
      this.baseWidth = this.baseWidth * this.Scale
      this.baseHeight = this.baseHeight * this.Scale
      let x = this.x - this.imgx
      let y = this.y - this.imgy
      ctx.drawImage(this.imageSrc, 0, 0, this.baseWidth, this.baseHeight)
      ctx.draw(true, () => {
        this.$canvasToTempFilePath(x, y, 375, 187.5, 375, 187.5, 1, 'myCanvas').then(res => {
          this.showImage(res.tempFilePath, this.picIndex)
        })
      })
    },
    // scroll (e) {
    //   this.maxLeft = 375 - this.width
    //   this.maxTop = 375 - this.height
    //   if (e.mp.touches.length === 2) {
    //     let xMove = e.mp.touches[1].clientX - e.mp.touches[0].clientX
    //     let yMove = e.mp.touches[1].clientY - e.mp.touches[0].clientY
    //     let distance = Math.sqrt(xMove * xMove + yMove * yMove)
    //     if (this.olddistance === 0) {
    //       this.olddistance = distance
    //     } else {
    //       this.newdistance = distance
    //       this.diffdistance = this.newdistance - this.olddistance
    //       this.olddistance = this.newdistance
    //       this.Scale = this.Scale + 0.005 * this.diffdistance
    //       if (this.Scale > 2.5) {
    //         return
    //       } else if (this.Scale < 1) {
    //         return
    //       }
    //       this.height = 150 * this.Scale
    //       this.width = 300 * this.Scale
    //     }
    //   }
    // },
    endTou () {
      // this.olddistance = 0
      // this.oldSingleDisX = 0
      // this.oldSingleDisY = 0
      this.getRect()
    },
    getRect () {
      let _this = this
      this.$createSelectorQuery().select('.FilePath').boundingClientRect(function (rect) {
        _this.x = Math.abs(rect.left)
        _this.y = Math.abs(rect.top)
      }).exec()
      this.$createSelectorQuery().select('.viewPic').boundingClientRect(function (rect) {
        _this.imgx = Math.abs(rect.left)
        _this.imgy = Math.abs(rect.top)
      }).exec()
    }
  },
  onReady () {
    this.loadImage()
  }
}
</script>

<style>
::-webkit-scrollbar{
    width: 0;
    height: 0;
    color: transparent;
}
.wx-content-info{
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: block;
  background-color: black;
  align-items: center;
  flex-direction: column;
}
.topHideHalf {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background-color: rgb(61, 61, 61);
  opacity: 0.8;
  z-index: 9999999999999999999;
}
.bottomHideHalf {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgb(61, 61, 61);
  opacity: 0.8;
  z-index: 9999999999999999999;
}

.cropper-config{
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 40px;
  color: white;
  background-color: rgb(83, 83, 83);
  z-index: 9999999999999999999999999999;
  text-align: center;
  line-height: 40px;
  font-size: 16px;
  font-weight: bold;
}

.cropper-content{
  margin-top: 60px;
  height: 80;
  padding-top: 40px;
  width: 100%;
  overflow: visible;
}
.wx-corpper{
  position: relative;
  overflow: hidden;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  -webkit-tap-highlight-color: transparent;
  -webkit-touch-callout: none;
  box-sizing: border-box;
}

.wx-corpper-content{
  position: relative;
}

.wx-corpper-content image {
  display: block;
  width: 100%;
  min-width: 0 !important;
  max-width: none !important;
  height: 100%;
  min-height: 0 !important;
  max-height: none !important;
  image-orientation: 0deg !important;
  margin: 0 auto;
}

.wx-cropper-drag-box{
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  cursor: move;
  background: rgba(0,0,0,0.6);
  z-index: 1;
}

.wx-corpper-crop-box{
  position: absolute;
  background: rgba(255,255,255,0.3) ;
  z-index: 2;
}

.wx-corpper-crop-box .wx-cropper-view-box {
  position: relative;
  display: block;
  width: 100%;
  height: 100%;
  overflow: visible;
  outline: 1px solid #69f;
  outline-color: rgba(102, 153, 255, .75);
}

.wx-cropper-dashed-h{
  position: absolute;
  top: 33.33333333%;
  left: 0;
  width: 100%;
  height: 33.33333333%;
  border-top: 1px dashed rgba(255,255,255,0.5);
  border-bottom: 1px dashed rgba(255,255,255,0.5);
}

.wx-cropper-dashed-v{
  position: absolute;
  left: 33.33333333%;
  top: 0;
  width: 33.33333333%;
  height: 100%;
  border-left: 1px dashed rgba(255,255,255,0.5);
  border-right: 1px dashed rgba(255,255,255,0.5);
}

.wx-cropper-line-t{
  position: absolute;
  display: block;
  width: 100%;
  background-color: #69f;
  top: 0;
  left: 0;
  height: 1px;
  opacity: 0.1;
  cursor: n-resize;
}

.wx-cropper-line-t::before{
  content: '';
  position: absolute;
  top: 50%;
  right: 0rpx;
  width: 100%;
  -webkit-transform: translate3d(0,-50%,0);
  transform: translate3d(0,-50%,0);
  bottom: 0;
  height: 41rpx;
  background: transparent;
  z-index: 11;
}

.wx-cropper-line-r{
  position: absolute;
  display: block;
  background-color: #69f;
  top: 0;
  right: 0px;
  width: 1px;
  opacity: 0.1;
  height: 100%;
  cursor: e-resize;
}
.wx-cropper-line-r::before{
  content: '';
  position: absolute;
  top: 0;
  left: 50%;
  width: 41rpx;
  -webkit-transform: translate3d(-50%,0,0);
  transform: translate3d(-50%,0,0);
  bottom: 0;
  height: 100%;
  background: transparent;
  z-index: 11;
}

.wx-cropper-line-b{
  position: absolute;
  display: block;
  width: 100%;
  background-color: #69f;
  bottom: 0;
  left: 0;
  height: 1px;
  opacity: 0.1;
  cursor: s-resize;
}

.wx-cropper-line-b::before{
  content: '';
  position: absolute;
  top: 50%;
  right: 0rpx;
  width: 100%;
  -webkit-transform: translate3d(0,-50%,0);
  transform: translate3d(0,-50%,0);
  bottom: 0;
  height: 41rpx;
  background: transparent;
  z-index: 11;
}

.wx-cropper-line-l{
  position: absolute;
  display: block;
  background-color: #69f;
  top: 0;
  left: 0;
  width: 1px;
  opacity: 0.1;
  height: 100%;
  cursor: w-resize;
}
.wx-cropper-line-l::before{
  content: '';
  position: absolute;
  top: 0;
  left: 50%;
  width: 41rpx;
  -webkit-transform: translate3d(-50%,0,0);
  transform: translate3d(-50%,0,0);
  bottom: 0;
  height: 100%;
  background: transparent;
  z-index: 11;
}

.wx-cropper-point{
  width: 5px;
  height: 5px;
  background-color: #69f;
  opacity: .75;
  position: absolute;
  z-index: 3;
}

.point-t{
  top: -3px;
  left: 50%;
  margin-left: -3px;
  cursor: n-resize;
}

.point-tr{
  top: -3px;
  left: 100%;
  margin-left: -3px;
  cursor: n-resize;
}

.point-r{
  top: 50%;
  left:100%;
  margin-left: -3px;
  margin-top: -3px;
  cursor: n-resize;
}

.point-rb{
  left: 100%;
  top: 100%;
  -webkit-transform: translate3d(-50%,-50%,0);
  transform: translate3d(-50%,-50%,0);
  cursor: n-resize;
  width: 24rpx;
  height: 24rpx;
  background-color: #69f;
  position: absolute;
  z-index: 1112;
  opacity: 1;
}

.point-b{
  left:50%;
  top: 100%;
  margin-left: -3px;
  margin-top: -3px;
  cursor: n-resize;
}

.point-bl{
  left:0%;
  top: 100%;
  margin-left: -3px;
  margin-top: -3px;
  cursor: n-resize;
}

.point-l{
  left:0%;
  top: 50%;
  margin-left: -3px;
  margin-top: -3px;
  cursor: n-resize;
}

.point-lt{
  left:0%;
  top: 0%;
  margin-left: -3px;
  margin-top: -3px;
  cursor: n-resize;
}

.wx-cropper-viewer{
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.wx-cropper-viewer image{
  position: absolute;
  z-index: 2;
}
</style>