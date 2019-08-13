<template>
	<div class='input-box'> 
		<input focus v-if='inStart' type="text" ref="asd" v-model="input" id='input' :placeholder="title" @confirm='handlerConfirm' @blur="handlerblus()" class="input-defukes" confirm-type='search'/>
		<div v-else class="input-defukes input-defult" @click="handlerfocus()">{{ input || '搜索'}}</div>
		<i class='serch-icon'></i>
	</div>
</template>

<script>
	export default {
		data(){
			return { 
				input:'',			//搜索内容
				inStart:false,			//是否启用搜索框
			}
		},
		props:{
			searchs:{
				type:Object,
				default:function(){
					return {}
				}
			},
			title:{
				type:String,
				default:''
			}
		},
		watch:{
			// 判断输入框是否为空
			'input':function( a , b){
				a == ''? this.inStart = false : this.inStart = true;
			}
		},
		methods:{
			//恢复输入框
			handlerfocus(){
				this.inStart = true;
			},
			// 失去焦点
			handlerblus(){
				this.input == ''? this.inStart = false : this.inStart = true;
			},
			// ,键盘搜索回调
			handlerConfirm(data){
				this.$parent.handlerCallblack( data.detail.value )
			}
		},
		onLoad(){

		},
		onShow(){

		},
		onReady(){

		},
		onHide(){
			
		},
		onUnload(){
			
		},
		onPullDownRefresh(){
			
		},
		onReachBottom(){
			
		},	
		onShareAppMessage(){

		},
		onPageScroll(){
			
		}
	}
</script>

<style>
.input-box{
	position: relative;
	width: 100%;
	height: 70upx;
	box-sizing:border-box;
}
.input-defukes{
	background:#EEEEEE;
	border-radius:70upx;
	width: 100%;
	height: 100%;
	box-sizing: border-box;
	padding: 0 80upx;
	font-size: 26upx;
}
.input-defult{
	color: #BBBBBB;
	font-size: 26upx;
	text-align: left;
	line-height: 70upx;
}
.input-modify{
	text-align: left;
	display: inline-block;
}
.serch-icon{
	position:absolute;
	top: 2upx;
	left: 30upx;
	bottom: 0;
	margin: auto; 
	width: 30upx;
	height:30upx;
	background: red;
	background: url(../../static/icon/serch-icon.png) no-repeat center;
	background-size: cover;
}
</style>
