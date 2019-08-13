<template>
	<view>
		<text class="source-title">请选择视频来源:</text>
		<view class="source-video">
			<view class="source-item" @click="goSearchView('0')">
				<image src="/static/image/video/host.png"></image>
				<text>本地上传</text>
			</view>
			<view class="source-item" @click="goSearchView('1')">
				<image src="/static/image/video/txVideo.png"></image>
				<text>腾讯视频</text>
			</view>
			<view class="source-item" @click="goSearchView('2')">
				<image src="/static/image/video/ykVideo.png"></image>
				<text>优酷视频</text>
			</view>
		</view>
		<view style="text-align: center;">
			<video v-if="videoUrl&&videoUrl!=''" class="video-video" :src="videoUrl"></video>
			<image v-else class="video-video" src="/static/image/video/videoBg.png"></image>
		</view>
		<view style="text-align: center;">
			<input class="video-name" v-model="videoName" placeholder="请输入视频名称(12字以内)" />
		</view>
		<text class="source-title">请选择视频标签:</text>
		<view class="video-lables">
			<view v-if="lableList.length<3" @click="isShowModal=true;lableValue=''" class="video-lable">
				新标签
			</view>
			<view class="video-lable" v-for="(lable,index) of lableList" :key="index">
				{{lable}}
			</view>
		</view>
		<button class="save-btn" @click="saveVideo" :class="{loginBtnA:isAvailable}">保存</button>
		<myModal :show="isShowModal" @close="isShowModal=false" title="新标签" @cancel="isShowModal=false" @confirm="confirmAddTagsModel">
			<view style="min-height: 90upx;padding: 28upx 24upx;">
				<input class="addTagsInput" v-model="lableValue" type="text" placeholder="标签长度不超过6个字" placeholder-style="color:#BBB;">
			</view>
		</myModal>
		<!-- 提示 -->
		<myTipLayer ref="anRef" timer="3" autoClose="true"></myTipLayer>
	</view>
</template>

<script>
	import VodUploader from "../../../static/js/default/vod-wx-sdk-v2.js";
	export default {
		data() {
			return {
				videoUrl: this.$store.state.videoUrl, //视频地址
				videoName: this.$store.state.videoName, //视频名称
				videoSource: this.$store.state.videoSource, //视频来源
				videoId: this.$store.state.videoId, //视频ID
				videoFile: {},
				lableList: [], //标签集合
				lableValue: "", //标签名称
				isShowModal: false,
				isAvailable: false,
				videoSize: "" //视频大小
			}
		},
		methods: {
			//跳转到视频搜索页面 source:0本店 1腾讯视频 2优酷视频
			goSearchView(source) {
				if (source == "0") {
					let self = this;
					uni.chooseVideo({
						count: 1,
						sourceType: ['album'],
						success: function(res) {
							console.log(res);
							self.videoUrl = res.tempFilePath;
							self.videoFile = res;
							self.videoSize = res.size;
							self.startUpload();
						}
					});
					return;
				}
				wx.navigateTo({
					url: `/pages/video_page/searchVideo/searchVideo?source=${source}`
				})
			},
			//添加新标签
			confirmAddTagsModel() {
				if (this.lableValue == "") {
					this.$showTip('标签不能为空');
					return;
				}
				if (this.lableValue.length > 6) {
					this.$showTip('标签长度不超过6个字');
					return;
				}
				if (this.lableList.find(l => l == this.lableValue)) {
					this.$showTip('标签重复');
					return;
				}
				this.lableList.push(this.lableValue);
				this.isShowModal = false;
			},
			/*视频上传相关*/

			//获取签名等
			getSignature: function(callback) {
				wx.request({
					url: 'https://xzb.qcloud.com/get_vod_sign',
					method: 'POST',
					data: {
						Action: 'GetVodSignatureV2'
					},
					dataType: 'json',
					success: function(res) {
						console.log("签名", res.data);
						if (res.data && res.data.data.signature) {
							callback(
								res.data.data.signature
							);
						} else {
							return '获取签名失败';
						}
					}
				});
			},

			//上传视频
			startUpload() {
				const self = this;
				VodUploader.start({
					mediaFile: self.videoFile, //必填，把chooseVideo回调的参数(file)传进来
					getSignature: self.getSignature, //必填，获取签名的函数
					mediaName: self.videoName, //选填，视频名称，强烈推荐填写(如果不填，则默认为“来自微信小程序”)
					//coverFile: self.coverFile, // 选填，视频封面
					success: function(result) {
						console.log('success', result);
					},
					error: function(result) {
						console.log('error', result);
						wx.showModal({
							title: '上传失败',
							content: JSON.stringify(result),
							showCancel: false
						});
					},
					progress: function(result) {
						console.log('progress', result);
						console.log(result);
						wx.showLoading({
							title: '上传中 ' + result.percent * 100 + '%',
						});
					},
					finish: function(result) {
						console.log('finish', result);
						self.videoSource = "0";
						self.videoUrl = result.videoUrl;
						wx.hideLoading();
						wx.showModal({
							title: '上传成功',
							content: 'fileId:' + result.fileId + '\nvideoName:' + result.videoName,
							showCancel: false
						});
					}
				});
			},
			//保存视频
			saveVideo() {
				if (!this.videoName || this.videoName == "") {
					this.$showTip('视频名称不能为空');
					return;
				}
				if (!this.videoUrl || this.videoUrl == "") {
					this.$showTip('未选择视频');
					return;
				}
				let labelStr = "";
				if (this.lableList.length > 0) {
					this.lableList.forEach(label => {
						labelStr += (label + ',');
					})
					labelStr = labelStr.substring(0, labelStr.length - 1);
				}
				this.$axios({
					url: "/xlapi/HostManage/HostVideoManage/HostVideoFile/GetCameraDictionaryListByBranch",
					method: 'POST',
					data: {
						UserId: "2",
						VideoName: this.videoName,
						VideoSource: this.videoSource,
						VideoUrl: this.videoUrl,
						VideoSize: this.videoSize,
						OtherId: this.videoId,
						VideoLabel: labelStr
					},
					success: function(res) {
						console.log("保存成功");
					}
				});
			}
		},
		watch: {
			videoName(val) {
				this.$store.commit('videoNameChange', val);
				if (this.videoName != "" && this.videoUrl != "") {
					this.isAvailable = true;
				} else {
					this.isAvailable = false;
				}
			},
			videoUrl(val) {
				this.$store.commit('videoUrlChange', val);
				if (this.videoName != "" && this.videoUrl != "") {
					this.isAvailable = true;
				} else {
					this.isAvailable = false;
				}
			},
			videoSource(val) {
				this.$store.commit('videoSourceChange', val);
			},
			videoId(val) {
				this.$store.commit('videoIdChange', val);
			}
		}
	}
</script>

<style>
	@import tcplayer from "//imgcache.qq.com/open/qcloud/video/tcplayer/tcplayer.css";

	.source-title {
		font-size: 24upx;
		font-weight: bold;
		color: #666666;
		padding-left: 40upx;
		line-height: 105upx;
	}

	.source-video {
		width: 560upx;
		height: 120upx;
		display: flex;
		margin: auto;
		justify-content: space-between;
		align-items: center;
	}

	.source-item {
		display: flex;
		flex-wrap: wrap;
		width: 120upx;
		align-items: center;
		justify-content: center;
	}

	.source-item image {
		width: 60upx;
		height: 60upx;
	}

	.source-item text {
		width: 120upx;
		display: inline-block;
		text-align: center;
		font-size: 24upx;
		font-weight: bold;
		line-height: 40upx;
		color: #666666;
	}

	.video-video {
		width: 411upx;
		height: 254upx;
		margin-top: 57upx;
		border-radius: 8upx;
	}

	.video-name {
		width: 650upx;
		height: 104upx;
		line-height: 104upx;
		text-align: left;
		display: inline-block;
		margin: 40upx auto 0;
		border-bottom: 1px solid #bbbbbb;
	}

	.video-name::-webkit-input-placeholder {
		color: #BBBBBB;
	}

	.video-lables {
		width: 670upx;
		display: flex;
		/* justify-content: space-between; */
		margin: 0upx auto 0;
	}

	.video-lable {
		width: 210upx;
		height: 78upx;
		line-height: 78upx;
		font-size: 26upx;
		font-weight: bold;
		text-align: center;
		border-radius: 39upx;
	}


	.video-lable:nth-child(1) {
		background: #FFFFFF;
		color: #BBBBBB;
		border: 1upx solid #BBBBBB;
	}

	.video-lable:nth-child(2) {
		background: #F66D63;
		color: #FFFFFF;
		margin: 0 20upx;
		border: 1upx solid #F66D63;
	}

	.video-lable:nth-child(3) {
		background: #F7CD1F;
		color: #FFFFFF;
		border: 1upx solid #F7CD1F;
	}

	.save-btn {
		width: 420upx;
		height: 100upx;
		line-height: 100upx;
		text-align: center;
		background: #AAAAAA;
		border-radius: 50upx;
		color: #FFFFFF;
		margin-top: 100upx;
		font-size: 32upx;
	}

	.loginBtnA {
		width: 420upx;
		height: 100upx;
		line-height: 100upx;
		text-align: center;
		background: #F66D63;
		border-radius: 50upx;
		color: #FFFFFF;
		margin-top: 100upx;
		font-size: 32upx;
	}

	.addTagsInput {
		width: 450upx;
		height: 88upx;
		line-height: 88upx;
		padding: 0 38upx;
		box-sizing: border-box;
		background: rgba(245, 245, 245, 1);
		border-radius: 44upx;
		margin: 10upx auto;
	}
</style>
