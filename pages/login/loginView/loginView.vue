<template>
	<view class="main-view">
		<view class="logo-box">
			<image mode="aspectFit" src="/static/image/login/success.png" class="logo-img"></image>
		</view>
		<view style="width: 460upx;margin: 34.5vh auto 0;">
			<view class="login-info" :class="{'inputBox-focus':userInputFocus}">
				<image :src="userInputFocus?'/static/image/login/phone-active.png':'/static/image/login/phone.png'"></image>
				<input class="user-info" type="text" @focus="inputFocus('phone')" @blur="inputBlur('phone')" cursor-spacing='80px'
				 placeholder="输入手机号" v-model="phone" placeholder-style="color:#999999;">
			</view>
			<view class="login-info" :class="{'inputBox-focus':pswInputFocus}">
				<image :src="pswInputFocus?'/static/image/login/psw-active.png':'/static/image/login/psw.png'"></image>
				<input class="user-info" type="text" @focus="inputFocus('psw')" @blur="inputBlur('psw')" cursor-spacing='80px'
				 placeholder="输入验证码" v-model="yzCode" placeholder-style="color:#999999;">
				<text v-if="isShow" @click="getYzCode">获取</text>
				<text style="color: #BBBBBB" v-else>{{countDownStr}}s后获取</text>
			</view>
			<button class="login-btn" :class="{loginBtnA:isAvailable}" @click="userLogin">登录</button>
			<view class="login-buttom">
				<p class="register-text" @click="goRegister">注册账号</p>
				<p class="contact-text">联系客服</p>
			</view>
		</view>
		<!-- 提示 -->
		<myTipLayer ref="anRef" timer="3" autoClose="true"></myTipLayer>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				phone: "",
				yzCode: "",
				userInputFocus: false,
				pswInputFocus: false,
				isAvailable: false,
				isShow: true, //是否显示获取按钮
				countDownStr: 120, //重新获取验证码间隔
				openId: ""
			}
		},
		watch: {
			phone(val) {
				if (this.phone != "" && this.yzCode != "") {
					this.isAvailable = true;
				} else {
					this.isAvailable = false;
				}
			},
			yzCode(val) {
				if (this.phone != "" && this.yzCode != "") {
					this.isAvailable = true;
				} else {
					this.isAvailable = false;
				}
			}
		},
		methods: {
			//获取登录验证码
			getYzCode() {
				let self = this;
				this.$axios({
					url: `/xlapi/HostManage/HostUserManage/HostUserLogin/GetHostUserLoginYzmCode`,
					method: 'POST',
					data: {
						UserPhone: this.phone
					},
					success: function(res) {
						if (res.data.status) {
							self.isShow = false;
							let interval = setInterval(() => {
								if (self.countDownStr > 1) {
									self.countDownStr--;
								} else {
									self.countDownStr = 120;
									self.isShow = true;
									clearInterval(interval);
								}
							}, 1000);
							wx.showToast({
								title: res.data.msg,
								icon: 'none',
								duration: 1000
							})
						} else {
							wx.showToast({
								title: '验证码发送失败',
								icon: 'none',
								duration: 2000
							})
						}
					},
					error: function() {
						wx.showToast({
							title: '验证码发送失败',
							icon: 'none',
							duration: 2000
						})
					}
				});
			},
			//登录
			userLogin() {
				if (!this.phone || this.phone == "") {
					wx.showToast({
						title: '手机号不能为空',
						icon: 'none',
						duration: 2000
					})
					return;
				}
				if (!this.yzCode || this.yzCode == "") {
					wx.showToast({
						title: '验证码不能为空',
						icon: 'none',
						duration: 2000
					})
					return;
				}
				this.$axios({
					url: `/xlapi/HostManage/HostUserManage/HostUserLogin/HostUserLogin`,
					method: 'POST',
					data: {
						UserPhone: this.phone,
						YZM: this.yzCode,
						OpenId: this.openId
					},
					success: function(res) {
						if (res.data.status) {
							//成功 判断是否第一次进入或信息是否完善
							console.log("登录成功");
						} else {
							wx.showToast({
								title: res.data.msg,
								icon: 'none',
								duration: 2000
							})
						}
					},
					error: function() {
						wx.showToast({
							title: '登录失败',
							icon: 'none',
							duration: 2000
						})
					}
				});
			},
			//跳转到注册页面
			goRegister() {
				uni.navigateTo({
					url: "../registerView/registerView"
				})
			},
			inputFocus(type) {
				if (type == "phone") {
					this.userInputFocus = true;
				} else {
					this.pswInputFocus = true;
				}
			},
			inputBlur(type) {
				if (type == "phone") {
					this.userInputFocus = false;
				} else {
					this.pswInputFocus = false;
				}
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
	.main-view {
		height: 100vh;
		background-image: url("../../../static/image/login/host_login_bg.png");
		background-size: cover;
		padding-top: 1upx;
	}

	.logo-box {
		position: absolute;
		top: 175upx;
		left: 253upx;
		text-align: center;
	}

	.logo-img {
		width: 250upx;
		height: 100upx;
		object-fit: cover
	}

	.login-info {
		width: 460upx;
		height: 90upx;
		margin-top: 30upx;
		display: flex;
		align-items: center;
		border-bottom: 1px #CCCCCC solid;
	}

	.inputBox-focus {
		border-bottom: 1px #F66D63 solid;
	}

	.user-info {
		line-height: 90upx;
		width: 220upx;
		font-size: 28upx;
		font-weight: 400;
		margin-left: 50upx;
		color: #222222;
	}

	.login-info image {
		width: 40upx;
		height: 40upx;
		margin-left: 17upx;
	}

	.login-info text {
		font-size: 28upx;
		display: inline-block;
		width: 180upx;
		text-align: right;
		font-weight: 400;
		color: #F66D63;
		line-height: 90upx;
	}

	.login-btn {
		width: 460upx;
		height: 98upx;
		line-height: 98upx;
		text-align: center;
		font-size: 30upx;
		color: #FFFFFF;
		background: #AAAAAA;
		border-radius: 49upx;
		border: none;
		margin-top: 98upx;
	}

	.loginBtnA {
		width: 460upx;
		height: 98upx;
		line-height: 98upx;
		text-align: center;
		font-size: 30upx;
		color: #FFFFFF;
		background: #F66D63 !important;
		border-radius: 49upx;
		margin-top: 98upx;
	}

	.login-buttom {
		width: 100%;
		text-align: center;
		position: fixed;
		bottom: 65upx;
		left: 0upx;
	}

	.register-text {
		font-size: 24upx;
		font-weight: 400;
		text-decoration: underline;
		color: #F66D63;
		line-height: 30upx;
	}

	.contact-text {
		font-size: 24upx;
		margin-top: 55upx;
		font-weight: 400;
		color: #BBBBBB !important;
		line-height: 30upx;
	}
</style>
