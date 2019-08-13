<template>
	<view>

	</view>
</template>

<script>
	export default {
		data() {
			return {

			}
		},
		mounted() {},
		methods: {
			//验证用户身份
			getHostUserIdentity() {
				let self = this;
				this.$show('加载中');
				this.getOpenID().then((res1) => {
					this.$axios({
						url: `/xlapi/HostManage/HostUserManage/HostUserLogin/GetHostUserIdentity`,
						method: 'POST',
						data: {
							OpenId: res1.openid,
							ShareOpenId: uni.getStorageSync('shareOpenId')
						},
						success: function(res) {
							if (res.data.status) {
								self.$hide();
								uni.setStorageSync('AuthorizationStr', res.data.AuthorizationStr);
								switch (res.data.data) {
									case "1":
										{
											//授权界面
											uni.redirectTo({
												url: `../login/authView/authView?openId=${res1.openid}`
											});
											break;
										};
									case "2":
										{
											//进入登录界面
											uni.redirectTo({
												url: `../login/loginView/loginView?openId=${res1.openid}`
											})
											break;
										};
									case "3":
										{
											//游客进入用户界面
											console.log("游客进入用户界面");
											break;
										};
									case "4":
										{
											//用户进入自己的界面
											uni.redirectTo({
												url: `/pages/index/index?openId=${res1.openid}`
											})
											break;
										};
									default:
										{
											wx.showToast({
												title: '获取身份失败',
												icon: 'none',
												duration: 2000
											})
										}
								}
							}
						}
					})
				})
			},
			//获取openId
			getOpenID() {
				let self = this;
				return new Promise((resolve, reject) => {
					uni.login({
						provider: "weixin",
						success: function(loginRes) {
							self.$axios({
								url: `/xlapi/HostManage/HostUserManage/BaseUser/GetOpenID`,
								method: 'GET',
								data: {
									loginCode: loginRes.code,
								},
								success: function(res) {
									uni.setStorageSync('openId', JSON.parse(res.data).openid);
									resolve(JSON.parse(res.data));
								},
								error: function() {
									self.$hide();
									wx.showToast({
										title: '获取身份失败',
										icon: 'none',
										duration: 2000
									})
								}
							});
						},
						fail: function(loginRes) {
							self.$hide();
							wx.showToast({
								title: '获取身份失败',
								icon: 'none',
								duration: 2000
							})
						}
					});
				});
			}
		},
		onLoad(query) {
			if (query.shareOpenId) {
				//分享进入
				uni.setStorageSync('shareOpenId', query.shareOpenId);
			}
			this.getHostUserIdentity();
		},
	}
</script>

<style>

</style>
