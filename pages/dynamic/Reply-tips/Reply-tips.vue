<!-- 回复评论 -->
<template>
	<div catchtouchmove='true' class='reply-box' @click='handlercolose()' :style='{width:width+"px",height:height+"px"}'>
		<div class='reply' :style='{height:top+"rpx"}' :class='{"reply-top":reply}' @click.stop>
			<div  class='reply-content'>
				<slot name='reply-content'></slot>
			</div>
			<div class='reply-footer' :class='{"reply-footer-bar":top <= 400 }' @click='handlercolose()'>取消</div>
		</div>
	</div>
</template>

<script>
	export default {
		props: {
			width: {
				type: Number,
				default: 0
			},
			height: {
				type: Number,
				default: 0
			},
			name:{
				type: String,
				default: ''
			},
			top:{
				type: Number,
				default: 0
			}
		},
		data() {
			return {
				reply: false
			}
		},
		methods: {
			// 点击遮罩关闭
			handlercolose(){
				this.reply = false
				setTimeout(()=>{
					this.$parent[this.name] = false
				},300)
			}
		},
		onLoad() {

		},
		onShow() {

		},
		onReady() {

		},
		onHide() {

		},
		onUnload() {

		},
		onPullDownRefresh() {

		},
		onReachBottom() {

		},
		onShareAppMessage() {

		},
		onPageScroll() {

		}
	}
</script>

<style>
	.reply-footer-bar{
		border-top: 6upx solid #EEEEEE;
		background: #FFFFFF !important;
	}
	.reply-content{
		width: 100%;
		box-sizing: border-box;
		padding: 30upx;
		padding-bottom: 0;
	}
	.reply-footer{
		position: absolute;
		left: 0;
		bottom: 0;
		width: 100%;
		height:100upx;
		background:rgba(243,243,243,1);
		font-size:28upx;
		color:rgba(170,170,170,1);
		line-height:100upx;
		text-align: center;
	}
	.reply-box {
		background: rgba(0, 0, 0, .5);
		position: fixed;
		top: 0;
		left: 0;
		z-index: 99;
	}

	.reply {
		width: 100%;
		background: rgba(255, 255, 255, 1);
		border-radius: 10rpx 10rpx 0 0;
		position: absolute;
		bottom: 0;
		transition: all .2s; 
		transform: translateY(574upx);
		z-index: 100;
	}

	.reply-top {
		transition: all .2s; 
		transform: translateY(0upx);
	}
</style>
