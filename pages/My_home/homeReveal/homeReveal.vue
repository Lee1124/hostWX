<template>
	<view>
		<view class="receal-view">
			<view class="receal-box">
				<image class="receal-image" src="/static/image/home/photo.png"></image>
				<video class="receal-image" :src="video.Url"></video>
			</view>
			<view class="receal-images">
				<imageDragSort ref="imageDragSort" :list="imgList" :isSelect="isSelect" style="width: 100%;"></imageDragSort>
			</view>
		</view>
		<view class="button-view">
			<button v-if="!isSelect" class="bottom-btn" @click="isSelect=true">选择</button>
			<button v-else class="delete-btn" @click="deleteImg">删除</button>
		</view>
	</view>
</template>

<script>
	import imageDragSort from "@/components/image-drag-sort/index.vue"
	export default {
		data() {
			return {
				imgList: [{
					imgUrl: "/static/image/home/photo.png",
					isSelect: false
				}, {
					imgUrl: "/static/image/home/photo.png",
					isSelect: false
				}], //已经增加的列表
				video: {},
				isSelect: false //是否处于选择状态
			}
		},
		components: {
			imageDragSort
		},
		mounted() {
			this.getImgList();
		},
		methods: {
			//初始化所有选择状态
			initSelect() {
				this.imgList.forEach(img => {
					img.isSelect = false;
				});
			},
			deleteImg() {
				wx.showModal({
					title: '提示',
					content: '是否要删除1张图片？',
					confirmText: "确定",
					confirmColor: "#3196FA",
					canceText: "取消",
					canceColor: "#999999",
					success(res) {
						if (res.confirm) {
							this.$axios({
								url: `xlapi/HostManage/HostUserManage/HostUser/DelBanner`,
								method: 'get',
								data: {
									id: ""
								},
								success: function(res) {
									console.log(res);
								}
							});
						}
					}
				});
			},
			//获取首页展示图片
			getImgList() {
				this.$axios({
					url: `/xlapi/HostManage/HostUserManage/HostUser/GetBanners`,
					method: 'get',
					success: function(res) {
						if (res && res.data.status) {
							this.video = res.data.video[0];
						}
						this.imgList = res.data.img;
					}
				});
			}
		}
	}
</script>

<style scoped>
	.receal-view {
		max-height: 80%;
		overflow: auto;
	}

	.receal-box {
		width: 650upx;
		display: flex;
		justify-content: space-between;
		flex-wrap: wrap;
		margin: auto;
	}

	.receal-images {
		width: 650upx;
		display: flex;
		justify-content: space-between;
		flex-wrap: wrap;
		margin: auto;
	}

	.receal-item {
		position: absolute;
	}

	.receal-image {
		width: 315upx;
		height: 210upx;
		margin-top: 20upx;
		border-radius: 10upx;
	}


	.button-view {
		position: fixed;
		width: 100%;
		text-align: center;
		bottom: 90upx;
	}

	.bottom-btn {
		width: 420upx;
		height: 99upx;
		line-height: 99upx;
		text-align: center;
		border: 2upx solid #F66D63;
		border-radius: 50upx;
		background: #FFFFFF;
		font-size: 32upx;
		font-weight: 400;
		color: #F66D63;
	}

	.delete-btn {
		width: 420upx;
		height: 99upx;
		line-height: 99upx;
		text-align: center;
		border: 2upx solid #F66D63;
		border-radius: 50upx;
		background: #F66D63;
		font-size: 32upx;
		font-weight: 400;
		color: #FFFFFF;
	}
</style>
