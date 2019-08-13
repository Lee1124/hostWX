<template>
	<view>
		<view class="logo-box">
			<image mode="aspectFit" src="/static/image/login/success.png" class="logo-img"></image>
			<p>提交成功</p>
		</view>
		<view style="margin: 34.5vh auto 0;">
			<text class="submit-info">您的账号申请已提交成功</text>
			<text class="submit-info">我们将会在两个工作日内短信通知您审核结果</text>
			<text class="submit-info">请耐心等待~</text>
			<button class="login-btn">知道了</button>
			<view class="login-buttom">
				<p class="contact-text">联系客服</p>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				userInputFocus: false,
				pswInputFocus: false
			}
		},
		methods: {
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
		}
	}
</script>

<style scoped>
	.logo-box {
		position: absolute;
		top: 175upx;
		left: 253upx;
		text-align: center;
	}

	.logo-box p {
		font-size: 34upx;
		font-weight: 400;
		margin-top: 40upx;
		color: #F66D63;
	}

	.logo-img {
		width: 250upx;
		height: 100upx;
		object-fit: cover
	}

	.login-info {
		height: 90upx;
		display: flex;
		align-items: center;
		border-bottom: 1px #CCCCCC solid;
	}

	.submit-info {
		font-size: 24upx;
		font-weight: 400;
		width: 100%;
		display: inline-block;
		text-align: center;
		color: #BBBBBB;
		line-height: 30px;
	}


	.login-btn {
		width: 460upx;
		height: 98upx;
		line-height: 98upx;
		text-align: center;
		font-size: 30upx;
		color: #FFFFFF;
		background: #F66D63;
		border-radius: 49upx;
		margin-top: 240upx;
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
		color: #BBBBBB;
		line-height: 30upx;
	}
</style>
