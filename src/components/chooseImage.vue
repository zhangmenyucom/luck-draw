<template>
    <div>
        <div class="wx-content-info">
            <div class='cropper-content'>
                <scroll-view scroll-y="true" scroll-x="true" class = "FilePath" @touchmove="scroll" @touchstart='scroll' @touchend='endTou'>
                    <img class="imgPath" :src="imageSrc" :style="'width: '+width+'px;height: '+height+'px;'" />
                </scroll-view>
            </div>
            <div class='cropper-config'>
                <button type="primary reverse" @click="getImage" style='margin-top: 30rpx'> 选择图片 </button>
                <button type="primary" @click="getImageInfo" style='margin-top: 30rpx'> 完成裁剪 </button>
            </div>
            <canvas canvas-id="myCanvas" :style="'position:absolute;border: 1px solid red; width:'+width+'px;height:'+height+'px;top:-99999px;left:-99999px;'"></canvas>
        </div>
    </div>
</template>

<script>
export default {
  props: ['showImage', 'picIndex', 'picIndexSrc'],
  data () {
    return {
      imageSrc: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1535632840778&di=62f69c4ea48467a23e329575053443f5&imgtype=0&src=http%3A%2F%2Fpic-cdn.35pic.com%2F58pic%2F19%2F55%2F11%2F91j58PICIyv_1024.jpg',
      width: 300,
      height: 150,
      olddistance: 0,
      newdistance: 0,
      diffdistance: '',
      Scale: 1,
      baseHeight: '',
      baseWidth: '',
      x: '',
      y: '',
      imgx: '',
      imgy: ''
    }
  },
  methods: {
    getImage () {
      this.$chooseImage().then(res => {
        this.imageSrc = res.tempFilePaths[0]
        this.loadImage()
      })
    },
    loadImage () {
      this.$getImageInfo(this.imageSrc).then(res => {
        this.baseHeight = res.height
        this.baseWidth = res.width
        const str = res.width / res.height
        // if (str > 1) {
        //     this.height = 150
        //     this.width = str * this.height
        // } else {
        //     this.width = 300
        //     this.height = str * this.width
        // }
        this.width = 300
        this.height = this.width / str
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
        this.$canvasToTempFilePath(x, y, 300, 150, 300, 150, 1, 'myCanvas').then(res => {
          this.showImage(res.tempFilePath, this.picIndex)
        })
      })
    },
    scroll (e) {
      if (e.mp.touches.length === 2) {
        let xMove = e.mp.touches[1].clientX - e.mp.touches[0].clientX
        let yMove = e.mp.touches[1].clientY - e.mp.touches[0].clientY
        let distance = Math.sqrt(xMove * xMove + yMove * yMove)
        if (this.olddistance === 0) {
          this.olddistance = distance
        } else {
          this.newdistance = distance
          this.diffdistance = this.newdistance - this.olddistance
          this.olddistance = this.newdistance
          this.Scale = this.Scale + 0.005 * this.diffdistance
          console.log(this.Scale)
          if (this.Scale > 2.5) {
            return
          } else if (this.Scale < 1) {
            return
          }
          this.height = 150 * this.Scale
          this.width = 300 * this.Scale
        }
      }
    },
    endTou (e) {
      this.olddistance = 0
      this.getRect()
    },
    getRect () {
      let _this = this
      this.$createSelectorQuery().select('.FilePath').boundingClientRect(function (rect) {
        _this.x = Math.abs(rect.left)
        _this.y = Math.abs(rect.top)
      }).exec()
      this.$createSelectorQuery().select('.imgPath').boundingClientRect(function (rect) {
        _this.imgx = Math.abs(rect.left)
        _this.imgy = Math.abs(rect.top)
      }).exec()
    }
  },
  onReady () {
    if (this.picIndexSrc) {
      this.imageSrc = this.picIndexSrc
    }
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
  align-items: center;
  flex-direction: column;
}

.cropper-config{
  padding: 40rpx;
}

.cropper-content{
  margin-top: 60px;
  height: 300px;
  padding-top: 40px;
  width: 100%;
  background-color: black;
}

.FilePath {
    width: 300px;
    height: 150px;
    margin: 0px auto;
    overflow: hidden;
    text-align: center;
    line-height: 150px;
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