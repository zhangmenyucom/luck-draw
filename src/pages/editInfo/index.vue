<template>
   <div class="edit_container">
   	  <div class="editList">
   	  	<ul>
   	  		<li>
   	  		  <div class="list_l">头像</div>
   	  		  <div class="list_r">
   	  		  	<div class="img"></div>
   	  		  </div>
   	  		</li>
   	  		<li class="bd">
   	  		  <div class="list_l">昵称</div>
   	  		  <div class="list_r">Doke</div>
   	  		</li>
   	  		<li>
   	  		  <div class="list_l">性别</div>
   	  		  <div class="list_r list_info">
   	  		  	<div class="male" :class="{active:chooseMale == 0}"  @click="chooseMale = 0">男</div>
   	  		  	<div class="male"  @click="chooseMale = 1" :class="{active:chooseMale == 1}">女</div>
   	  		  </div>
   	  		</li>
   	  		<li class="bd">
   	  		  <div class="list_l">生日</div>
   	  		  <div class="list_r" style="display:flex;">
					<div class="index_section">
						<picker mode="date"
						  :value="startDate"
						  :start="pickerStart" end="" @change="bindDateChangeStart($event)">
						    <div class="index_picker">
						      <div class="">{{ startDate }}</div>
						    </div>
						</picker>
				   </div>
	   	  		   &nbsp;&nbsp;<i class="arrow"></i>
   	  		  </div>
   	  		</li>
   	  		<li>
   	  		  <div class="list_l">手机号 <span>+20 <i></i></span></div>
   	  		  <div class="list_r">{{getNum}}<i class="arrow"></i></div>
   	  		</li>
   	  		<li class="bd" @click ="chooseLocation">
   	  		  <div class="list_l">地区 <span>+20 <i></i></span></div>
   	  		  <div class="list_r">{{infoArea}}<i class="arrow"></i></div>
   	  		</li>
   	  	</ul>
   	  </div>
   </div>
</template>
<script>
   export default {
      data () {
		  return {
		    startDate:'',
		    pickerStart:'',
		    chooseMale:0,
		    infoArea:'未选择',	
		    getNum:'未绑定',	   
		  }
		},
		mounted(){
		  // 设置时间
		  let today = this.getToday()
		  this.startDate = today
		  this.endDate = today
		  this.pickerStart = today
		}, 
		methods: {
		   getToday(){
		     let myDate = new Date();
		     let myMonth = myDate.getMonth() + 1;
		     if(myMonth < 10){
		       myMonth = '0'+ myMonth;  //补齐
		     }
		     let mydate = myDate.getDate();
		     if(myDate.getDate()<10){
		         mydate = '0'+ myDate.getDate();  //补齐
		     }
		     let today = myDate.getFullYear() + '-' + myMonth + '-' + mydate;
		     return today
		   },
		   bindDateChangeStart(val){
		   	 this.startDate = val.target.value
		   },	
		   //选择区域
		   chooseLocation(){
		   	  const _this = this;
		   	  wx.chooseLocation( {
			      success: function( res ) {			      
			        _this.infoArea = res.name;
			      }
			    })	
		    },
		   
		    
		}
    }
</script>
<style scoped>
  @import './index.less';
</style>