<template>
	<div style='width: 100%;height: 100%;background: #f8f8f8;'>
		<div class='box'>
			<div class='box-headers'>
				<div class='box-header'>
					<p class='title'>动态</p>
					<seach></seach>
				</div>
			</div>
			<div class='box-content' >
				<item :data='list' ref='item'></item>
			</div>
			<div class='login'>
				<image src="../../static/icon/logo.png" style="width:208upx;height:42upx;" mode=""></image>
			</div>
		</div>
		
		<make v-if='false'></make>
		<footers :state='true' @actionCall='handlerCall'></footers>
	</div>
</template>

<script>
	import seach from '@/components/my-search/search.vue'
	import item from '../dynamic/comment-item/comment-item'
	import make from '@/components/my-make/my-make.vue'
	export default {
		data() {
			return {
				list: [],
				page: 1,
				key: '',
			}
		},
		components: {
			seach,
			item,
			make
		},
		methods: {
			// 添加动态
			handlerCall(data) {
				if (data.id == 0) {
					uni.redirectTo({
						url: 'add-dynamic/add-dynamic'
					});
				}
			},
			// 初始化数据
			handlerInit() {
				this.$show('加载中...')
				this.$axios({
					url: '/xlapi/HostManage/DynamicManage/Dynamic/GetDynamicList',
					method: 'POST',
					data: {
						page: this.page,
						size: 6,
						key: this.key
					},
					success(res) {
						if(this.list.length > 0){
							this.$hide()
							return
						}
						if( res.data.status ){
							let data = res.data.data
							let respensr = data.map( res => {
								return {
									...res,
									isShow:true
								}
							})
							this.list = [...this.list,...respensr]
							this.$refs.item.list = this.list
							this.$hide()
						}
					},
					fail(err) {
						console.log(res)
					}
				})
			}
		},
		onLoad() {

		},
		onShow() {
			this.page = 1
			this.handlerInit()
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
			this.page++
			this.handlerInit()
		},
		onShareAppMessage() {

		},
		onPageScroll() {

		}
	}
</script>

<style>
	.login{
		width: 100%;
		height: 200upx;
		background: #FFFFFF;
		margin-bottom: 110upx;
		position: relative;
	}
	.login image {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		margin: auto;
	}
	.box {
		height: 80%;
		position: relative;
	}
	.box-headers{
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		background: #f8f8f8;
		width: 100%;
		padding-top: 120upx;
		z-index: 9;
		padding-bottom: 20upx;
	}
	.box-header {
		box-sizing: border-box;
		padding: 0upx 30upx;
	}

	.box-content {
		margin-top: 300upx;
		background: #f8f8f8;
	}

	.title {
		color: #222222;
		font-size: 38rpx;
		width: 100%;
		box-sizing: border-box;
		padding: 0upx 60upx;
		margin-bottom: 40upx;
	}
</style>
