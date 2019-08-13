<template>
	<div class='make_box' @click='openYuYue'>
		预约
	</div>
</template>

<script>
	export default {
		data(){
			return {
				
			}
		},
		methods:{
			openYuYue(){
				uni.navigateTo({
					url:'../../pages/home/yuYue/yuYue-calendar/yuYue-calendar'
				})
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
	.make_box{
		width:120upx;
		height:120upx;
		background:rgba(255,255,255,1);
		box-shadow:0upx 0upx 30upx 0px rgba(0, 0, 0, 0.28);
		border-radius:50%;
		text-align: center;
		line-height: 120upx;
		position: fixed;
		bottom: 150upx;
		color: #666666;
		font-size: 32upx;
		right: 50upx;
	}
</style>
