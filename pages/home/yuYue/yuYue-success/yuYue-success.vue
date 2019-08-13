<template>
	<view class="yuYueSuccess">
		<!-- 导航栏阴影 -->
		<view class="my-order-top-nav-shadow"></view>
		<!-- /导航栏阴影 -->
		<view class="section section1">
			<view class="icon_box"></view>
			<view class="text1">恭喜您预约成功！ </view>
			<view class="text2">服务人员会尽快与您联系</view>
			<view class="text2">请耐心等待</view>
		</view>
		<view class="section section2">
			<view class="section2_list">
				<text class="label w3">预约人</text>
				<text class="label">：</text>
				<text class="ct">{{yuYueObj.name}}</text>
			</view>
			<view class="section2_list">
				<text class="label">预约电话：</text>
				<text class="ct">{{yuYueObj.phone}}</text>
			</view>
			<view class="section2_list">
				<text class="label">预约时间：</text>
				<text class="ct">{{yuYueObj.time|yuYueTime}}</text>
			</view>
		</view>
		<view class="section section3">
			<button @click="returnIndex">返回首页</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				yuYueObj: {
					"time": "2019-08-05T00:00:00",
					"name": "",
					"phone": "",
				}
			}
		},
		methods: {
			/* 返回首页 */
			returnIndex() {
				uni.redirectTo({
					url: '../../../index/index'
				});
			},
			getYuYueNews() {
				let that = this;
				uni.getStorage({
					key: 'openId',
					success(res) {
						let openId = res.data;
						let url = '/xlapi/HostManage/HostUserManage/HostUser/GetAppionTimes?openid=' + openId
						that.$axios({
							method: 'GET',
							url: url,
							success(res) {
								if (res.data.status) {
									console.log(res.data)
									that.yuYueObj = res.data.data[0];
								}
							}
						})
					}
				})
			}
		},
		onLoad() {
			this.getYuYueNews();
		},

		filters: {
			yuYueTime(val) {
				if (val) {
					let time = val.split('T')[0].split('-');
					return time[0] + '年' + time[1] + '月' + time[2] + '日'
				}
			}
		}
	}
</script>

<style scoped>
	.w3 {
		letter-spacing: 0.5em;
		margin-right: -0.5em;
	}

	.section1 {
		text-align: center;
		margin-top: 32upx;
	}

	.icon_box {
		width: 145upx;
		height: 100upx;
		background: url(../../../../static/image/yuYue/success.png) no-repeat center center;
		background-size: 100%;
		margin: 0 auto;
	}

	.text1 {
		color: #000;
		font-size: 38upx;
		margin: 40upx 0;
	}

	.text2 {
		color: #999;
		font-size: 26upx;
		margin-bottom: 10upx;
	}

	.section2 {
		width: 640upx;
		height: 242upx;
		background: rgba(246, 246, 246, 1);
		border-radius: 10upx;
		padding: 45upx;
		box-sizing: border-box;
		margin: 160upx auto;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		font-size: 28upx;
	}

	.section2 .label {
		color: #888;
	}

	.section2 .ct {
		color: #222;
	}

	.section3 button {
		width: 360upx;
		height: 100upx;
		line-height: 100upx;
		color: #F66D63;
		font-size: 32upx;
		border: 2upx solid rgba(246, 109, 99, 1);
		border-radius: 50upx;
		background: #fff;
	}
</style>
