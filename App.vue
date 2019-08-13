<script>
	export default {
		onLaunch: function() {
			console.log('App Launch');
			uni.login({
				provider: "weixin",
				success: function(loginRes) {
					console.log("信息", loginRes);
					// 获取用户信息……					
				}
			});
			this.$config().then(res => {
				this.$store.state.config = res.data.data
			})
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	/* 全局注册字体图标 */
	@font-face {
		font-family: 'iconfont';
		src: url('~@/static/font/iconfont.ttf');
	}

	.my-iconfont {
		font-family: iconfont;
	}

	/* 导航栏阴影 */
	.my-order-top-nav-shadow {
		width: 100%;
		height: 1upx;
		box-shadow: 0 0 10upx 0 rgba(0, 0, 0, 0.2);
		position: fixed;
		top: 0;
		left: 0;
	}

	/* 预约处的按钮 */
	.no-submit-btn {
		width: 420upx;
		height: 100upx;
		line-height: 100upx;
		background: rgba(204, 204, 204, 1);
		border-radius: 50upx;
		color: #fff;
		font-size: 32upx;
		border: 0;
		outline: none;
	}

	.no-submit-btn::after {
		border: none;
	}

	.yes-submit-btn {
		background: #f66d63;
	}

	.oneWord {
		width: 14upx;
		display: inline-block;
	}

	.twoWord {
		width: 53upx;
		display: inline-block;
	}
	
	.w2 {
		letter-spacing: 2em;
		margin-right: -2em;
	}
	.w3 {
		letter-spacing: 0.5em;
		margin-right: -0.5em;
	}

	.scrollView {
		position: fixed;
		top: 10upx;
		left: 0;
		right: 0;
		bottom: 0;
	}
</style>
