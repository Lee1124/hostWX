<template>
	<view class="content">
		<view class="user-info">
			<text class="view-title">我的</text>
			<view class="icon-box">
				<image class="user-qrcode" @click="canvasQrCode" src="/static/image/home/qrcode.png"></image>
				<image class="user-icon" src="/static/image/home/icon.png"></image>
				<image class="user-qrcode" @click="logOut" src="/static/image/home/quit.png"></image>
			</view>
			<text class="user-name">夏天里的冰阔乐</text>
		</view>
		<view class="user-items">
			<view class="user-item">
				<image src="/static/image/home/home.png"></image>
				<text>首页展示</text>
			</view>
			<view class="user-item" @click="profile">
				<image src="/static/image/home/user.png"></image>
				<text>个人简介</text>
			</view>
			<view class="user-item" @click="hostOffer">
				<image src="/static/image/home/price.png"></image>
				<text>主持报价</text>
			</view>
			<view class="user-item" @click="dangQiManage">
				<image src="/static/image/home/date.png"></image>
				<text>档期管理</text>
			</view>
			<view class="user-item" @click="consultingClients">
				<image src="/static/image/home/consult.png"></image>
				<text>咨询客户</text>
				<text class="text-count">+1</text>
			</view>
			<view class="user-item" @click="myFlow">
				<image src="/static/image/home/flow.png"></image>
				<text>我的流量</text>
				<text class="text-count">+2</text>
			</view>
		</view>
		<view class="canvas-box">
			<canvas canvas-id="myCanvas"></canvas>
		</view>

		<footers :state='true' @actionCall='actionCall'></footers>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				canvasUrl: "",
				errorCount: 0
			}
		},
		onLoad() {

		},
		methods: {
			/* 添加按菜单事件 */
			actionCall(obj){
				if(obj.id==2){
					uni.navigateTo({
						url:'dangQiManage/add-dangQi/add-dangQi?type=add'
					})
				}
			},
			/* 个人简介 */
			profile(){
				uni.navigateTo({
					url:'profile/profile'
				})
			},
			/* 主持报价 */
			hostOffer(){
				uni.navigateTo({
					url:'hostOffer/hostOffer'
				})
			},
			/* 档期管理 */
			dangQiManage(){
				uni.navigateTo({
					url:'dangQiManage/dangQi-list/dangQi-list'
				})
			},
			/* 咨询客户 */
			consultingClients(){
				uni.navigateTo({
					url:'consulting-clients/consulting-clients'
				})
			},
			/* 我的流量 */
			myFlow(){
				uni.navigateTo({
					url:'my-flow/my-flow'
				})
			},
			//注销登录
			logOut() {
				wx.showModal({
					title: '提示',
					content: '是否要退出登录？',
					confirmText: "确定",
					confirmColor: "#3196FA",
					canceText: "取消",
					canceColor: "#999999",
					success(res) {
						if (res.confirm) {
							wx.navigateTo({
								url: "/pages/login/loginView/loginView"
							})
						} else if (res.cancel) {
							//console.log('用户点击取消')
						}
					}
				})
			},
			//保存二维码
			canvasQrCode() {
				let that = this;
				wx.showLoading({
					title: '正在生成名片……',
				})
				const ctx = uni.createCanvasContext('myCanvas');
				uni.chooseImage({
					success: function(res) {
						ctx.setFillStyle('#EEEEEE')
						ctx.fillRect(0, 0, 375 * 2, 360 * 2);
						ctx.setFillStyle('#FFFFFF')
						ctx.fillRect(13 * 2, 263 * 2, 351 * 2, 85 * 2);
						ctx.drawImage(res.tempFilePaths[0], 13 * 2, 13 * 2, 351 * 2, 250 * 2);
						ctx.setFillStyle('#FFFFFF')
						ctx.setFontSize(25 * 2);
						ctx.fillText('我是  姜涛', 40 * 2, 50 * 2);
						ctx.setFillStyle('#999999')
						ctx.setFontSize(14 * 2);
						ctx.fillText('在XXX小程序上传了我的主持视频', 40 * 2, 100 * 2);
						ctx.fillText('快来这里围观吧', 40 * 2, 127 * 2);
						ctx.setFontSize(17 * 2);
						ctx.setFillStyle('#FFFFFF')
						ctx.fillText('tel: 137 4482 9124', 44 * 2, 225 * 2);
						ctx.drawImage("/static/image/home/qrcodebg.png", 21 * 2, 273 * 2, 62 * 2, 62 * 2);
						ctx.setFontSize(12 * 2);
						ctx.setFillStyle('#999999')
						ctx.fillText('长按小程序码', 95 * 2, 295 * 2);
						ctx.fillText('进入姜涛的个人主页', 95 * 2, 323 * 2);
						ctx.draw(false, that.getTempFile);
					}
				});
			},
			//canvas转为图片并保存
			getTempFile() {
				let that = this;
				wx.canvasToTempFilePath({
					x: 0,
					y: 0,
					width: 375 * 2,
					height: 360 * 2,
					destWidth: 375 * 2,
					destHeight: 360 * 2,
					canvasId: 'myCanvas',
					success(res) {
						wx.saveImageToPhotosAlbum({
							filePath: res.tempFilePath,
							success(res1) {
								wx.hideLoading();
								wx.showModal({
									title: '个人名片已保存到手机相册',
									content: '快去分享给朋友,叫伙伴们来围观吧!',
									showCancel: false,
									confirmText: "知道了",
									confirmColor: "#3196FA",
									success(res) {}
								})
							}
						})
					},
					fail: (error) => {
						that.errorCount += 1;
						if (that.errorCount < 3) {
							that.getTempFile();
						} else {
							console.log("生成失败");
						}
					}
				})
			}
		}
	}
</script>

<style scoped>
	.view-title {
		font-size: 38upx;
		font-weight: bold;
		display: inline-block;
		width: 100%;
		text-align: left;
		margin: 82upx 0 0 60upx;
		color: #222222;
	}

	.user-info {
		width: 100%;
		height: 487upx;
		text-align: center;
		background: #F8F8F8;
	}

	.icon-box {
		width: 590upx;
		height: 160upx;
		display: flex;
		margin: 54upx auto 0;
		justify-content: space-between;
	}

	.user-qrcode {
		width: 68upx;
		height: 68upx;
		margin-top: 25upx;
	}

	.user-icon {
		width: 156upx;
		height: 156upx;
		border-radius: 50%;
	}

	.user-name {
		font-size: 30upx;
		font-weight: 400;
		margin-top: 38upx;
		display: inline-block;
		color: #222222;
	}

	.user-items {
		padding-top: 41upx;
	}

	.user-item {
		height: 94upx;
		display: flex;
		align-items: center;
	}

	.user-item image {
		width: 48upx;
		height: 48upx;
		margin-left: 49upx;
	}

	.user-item text {
		font-size: 28upx;
		font-weight: 400;
		margin-left: 14upx;
		color: #666666;
	}

	.text-count {
		color: #FF0000 !important;
		margin-left: 43upx;
	}

	.canvas-box {
		width: 0upx;
		height: 0upx;
		overflow: hidden;
	}

	canvas {
		width: 1500upx;
		height: 1420upx;
	}
</style>
