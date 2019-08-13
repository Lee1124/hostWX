<template>
	<view>
		<view class="view-top">
			<text class="iconfont search-icon">&#xe649;</text>
			<input class="video-url" confirm-type="search" @confirm="searchVideo" v-model="searchKey" placeholder="搜索"></input>
		</view>
		<view class="video-list">
			<view class="video-item" v-for="(video,index) in videoList" :key="index" @click="getVideo(video.VID)">
				<video class="video-video" :src="videoUrl"></video>
				<view class="video-info">
					<text class="video-title">一 · 意</text>
					<text class="iconfont info-icon">&#xe69b;</text>
				</view>
				<view class="video-lables">
					<text class="video-lable" v-for="(video,index) in videoList" :key="index">#{{video}}</text>
				</view>
			</view>
		</view>
		<view class="reserve-view">预约</view>
		<footers></footers>
		<!-- <footers></footers> -->
	</view>
</template>

<script>
	export default {
		data() {
			return {
				searchKey: "",
				videoList: [1, 2, 3]
			}
		},
		methods: {
			searchVideo() {
				uni.showActionSheet({
					itemList: ['编辑', '删除'],
					success(res) {
						console.log(res.tapIndex)
					},
					fail(res) {
						console.log(res.errMsg)
					}
				})
			}
		}
	}
</script>

<style scoped>
	#myVideo {
		width: 100%;
		margin-top: 20upx;
	}

	.view-top {
		width: 690upx;
		height: 66upx;
		background: #F2F2F2;
		border-radius: 33upx;
		margin: 16upx auto 0;
		display: flex;
		align-items: center;
	}

	.search-icon {
		width: 90upx;
		text-align: center;
		display: inline-block;
	}

	.view-top image {
		width: 35upx;
		height: 35upx;
	}

	.video-url {
		display: inline-block;
		font-size: 26upx;
		font-family: MicrosoftYaHei;
		font-weight: 400;
		color: #4c4c4c;
		width: 560upx;
	}

	.video-url::-webkit-input-placeholder {
		color: #BBBBBB;
	}

	.video-list {
		width: 690upx;
		margin: 15upx auto;
		max-height: 940upx;
		overflow-y: auto;
	}

	.video-item {
		width: 100%;
		height: 537upx;
		display: flex;
		flex-wrap: wrap;
		align-items: flex-start;
		justify-content: space-between;
		font-size: 28upx !important;
		color: #444444;
	}

	.video-item video {
		width: 650upx;
		height: 386upx;
		border-radius: 10px;
	}

	.video-info {
		width: 650upx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		height: 86upx;
		font-size: 30upx;
		font-weight: 400;
	}

	.info-icon {
		color: #BBBBBB;
		font-size: 35upx;
	}

	.video-title {
		font-size: 32upx;
		font-weight: 400;
		color: #222222;
	}

	.video-lables {
		height: 65upx;
	}

	.video-lable {
		color: #666666;
		font-size: 22upx;
		margin-right: 20upx;
	}

	.reserve-view {
		position: fixed;
		right: 48upx;
		bottom: 138upx;
		width: 120upx;
		height: 120upx;
		color: #666666;
		font-size: 32upx;
		font-weight: 400;
		text-align: center;
		line-height: 120upx;
		background: #FFFFFF;
		box-shadow: 0upx 0upx 29upx 0upx rgba(0, 0, 0, 0.28);
		border-radius: 50%;
	}

	@font-face {
		font-family: 'iconfont';
		src: url('~@/static/font/iconfont.ttf');
	}

	.iconfont {
		font-family: iconfont;
	}
</style>
