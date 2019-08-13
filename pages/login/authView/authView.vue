<template>
	<view class="powerPage">
		<view class="user-header">
			<view class="img-box">
				<open-data type="userAvatarUrl"></open-data>
			</view>
			<view class="user-name">
				<open-data type="userNickName"></open-data>
			</view>
		</view>
		<view class="power-tips">
			<view class="tip-title1">微信授权</view>
			<view class="tip-title2">获得您的公开信息（昵称、头像等）</view>
		</view>
		<view class="power-btn">
			<button open-type="getUserInfo" @getuserinfo="getuserinfo">确 定</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				openId: ""
			}
		},
		methods: {
			getuserinfo(userinfo) {
				this.$axios({
					url: `/xlapi/HostManage/HostUserManage/BaseUser/SetWeChat`,
					method: 'POST',
					data: {
						openid: this.openId,
						unionid: "",
						icon: userinfo.detail.userInfo.avatarUrl,
						nickname: userinfo.detail.userInfo.nickName,
						BaseUserId: "0"
					},
					success: function(res) {
						if (res.data) {
							//成功跳转页面
							uni.redirectTo({
								url: "../registerView/registerView"
							})
						} else {
							wx.showToast({
								title: "授权失败",
								icon: 'none',
								duration: 2000
							})
						}
					},
					error: function() {
						wx.showToast({
							title: '授权失败',
							icon: 'none',
							duration: 2000
						})
					}
				});
			}
		},
		onLoad(query) {
			if (query.openId) {
				this.openId = query.openId;
			}
		},
	}
</script>

<style scoped>
	.powerPage {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		text-align: center;
	}

	.user-header {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}

	.user-header .img-box {
		width: 140upx;
		height: 140upx;
		border-radius: 50%;
		overflow: hidden;
		background-repeat: no-repeat;
		background-size: cover !important;
		text-align: center;
	}

	.user-header .img-box image {
		width: 100%;
		height: 100%;
	}

	.user-header .user-name {
		color: #000;
		font-size: 42upx;
		margin-top: 40upx;
		font-weight: 700;
		text-align: center;
	}

	.power-tips {
		margin: 150upx 0;
	}

	.power-tips .tip-title1 {
		color: #4c4c4c;
		font-size: 33upx;
	}

	.power-tips .tip-title2 {
		color: #808080;
		font-size: 25upx;
		margin-top: 20upx;
	}

	.power-btn button {
		width: 380upx;
		height: 100upx;
		background: #F66D63;
		margin: 0;
		padding: 0;
		line-height: 100upx;
		text-align: center;
		color: #FFF;
		border-radius: 50upx;
	}
</style>
