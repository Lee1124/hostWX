<template>
	<view>
		<view class="view-top">
			<text class="iconfont search-icon">&#xe649;</text>
			<input class="video-url" confirm-type="search" @confirm="searchVideo" v-model="searchKey" placeholder="请输入关键字"></input>
			<!-- <input v-model="videoId" placeholder="请输入视频id"></input> -->
			<!-- <button class="play-btn" @click="searchVideo(1)">腾讯搜索</button> -->
		</view>
		<view class="video-list">
			<view class="video-item" v-for="(video,index) in videoList" :key="index" @click="getVideo(video.VID)">
				<image :src="video.VideoImgUrl"></image>
				<view class="video-info" v-html="video.UrlContent"></view>
			</view>
		</view>
		<!-- <footers></footers> -->
	</view>
</template>

<script>
	import qqVideo from "../../../static/js/default/qqVideo.js";
	export default {
		data() {
			return {
				searchKey: "",
				videoList: [],
				part_urls: {},
				ykVideoUrl: "",
				videoId: "",
				sourceType: "1" //1 腾讯，2 优酷
			}
		},

		methods: {
			//搜索视频
			searchVideo() {
				let that = this;
				this.$show('加载中');
				this.$axios({
					url: `/xlapi/HostManage/HostVideoManage/HostVideoFile/GetHostVideoSourceList`,
					method: 'post',
					data: {
						LikeName: this.searchKey,
						PageIndex: 1,
						Type: this.sourceType
					},
					success: function(res) {
						this.$hide();
						console.log(res);
						that.videoList = res.data.data;
					}
				})
			},
			//播放视频
			getVideo(videoId) {
				this.$show('加载中');
				this.videoId = videoId;
				if (this.videoId.split('=')[0]) {
					this.videoId = this.videoId.split('=')[0];
					if (this.videoId.split('_')[1]) {
						this.videoId = this.videoId.split('_')[1];
					}
				}
				if (!this.videoId || this.videoId == "") {
					this.$hide();
					wx.showToast({
						title: '获取视频失败',
						icon: 'none',
						duration: 2000
					})
					return;
				}
				switch (this.sourceType) {
					case "1":
						{
							this.getTXVideo();
							break;
						}
					case "2":
						{
							this.getYkVideo();
							break;
						}
				}
			},
			//获取优酷视频
			getYkVideo() {
				let that = this;
				this.$axios({
					url: `/xlapi/HostManage/HostVideoManage/HostVideoFile/TestYouKuUrl`,
					method: 'POST',
					data: {
						Url: `https://ups.youku.com/ups/get.json?vid=${this.videoId}&ccode=0405&client_ip=192.168.1.1&utid=7wNNESOeQS4CAXzP1pKImliK&client_ts=1499075140&r=bBLxVq7VfU4hVT%2BCjmrY20kogZckZZr%2FWdDwtoNBVjuXY5QTXYJPD7OxqmUWFe1c`
					},
					success: function(res) {
						that.$hide('');
						let ykVideo = JSON.parse(res.data.data);
						that.ykVideoUrl = ykVideo.data.stream[0].segs[0].cdn_url;
						that.$store.commit('videoUrlChange', that.ykVideoUrl);
						that.$store.commit('videoSourceChange', "2");
						that.$store.commit('videoIdChange', that.videoId);
						uni.navigateTo({
							url: "/pages/video_page/addVideo/addVideo"
						})
					},
					error(err) {
						console.log(err);
					}
				})
			},
			//播放腾讯视频
			getTXVideo() {
				//这里是直接接受视频id(videoId)
				this.videoPage = 1;
				this.part_urls = {};
				var that = this;
				qqVideo.getVideoes(that.videoId).then(function(response) {
					that.$hide();
					if (!response) {
						return;
					}
					for (var i = 1; i < response.length + 1; i++) {
						var indexStr = 'index' + (i)
						that.part_urls[indexStr] = response[i - 1];
					}
					that.ykVideoUrl = response[0];
					that.$store.commit('videoUrlChange', that.ykVideoUrl);
					that.$store.commit('videoSourceChange', "1");
					that.$store.commit('videoIdChange', that.videoId);
					uni.navigateTo({
						url: "/pages/video_page/addVideo/addVideo"
					})
				});
			}
		},
		onLoad(query) {
			if (query.source)
				this.sourceType = query.source;
		},
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

	.play-btn {
		width: 150upx;
		height: 80upx;
		line-height: 80upx;
	}

	.video-list {
		width: 690upx;
		margin: 15upx auto;
		max-height: 1050upx;
		overflow-y: auto;
	}

	.video-item {
		width: 100%;
		height: 190upx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		font-size: 28upx !important;
		color: #444444;
	}

	.video-item image {
		width: 250upx;
		height: 160upx;
		border-radius: 10px;
	}

	.video-info {
		width: 410upx;
		height: 100upx;
		font-size: 30upx;
		font-weight: 400;
		color: #4C4C4C;
	}

	@font-face {
		font-family: 'iconfont';
		src: url('~@/static/font/iconfont.ttf');
	}

	.iconfont {
		font-family: iconfont;
	}
</style>
