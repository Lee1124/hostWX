<template>
	<view class="add-communication-record">
		<!-- 导航栏阴影 -->
		<view class="my-order-top-nav-shadow"></view>

		<view class="textArea_box">
			<textarea class="textArea" placeholder="请输入沟通内容" placeholder-style="color:#BBB;" v-model="textAreaValue"></textarea>
		</view>

		<view class="img_box">
			<view class="imgBox imgBox1" @click="updateImg"></view>
			<template v-for="(items,index) in imgArr">
				<view class="imgBox" :key='index'>
					<view class="delImgBox" @click="delImg(items)"></view>
					<image :src="items.url"></image>
				</view>
			</template>
		</view>

		<view class="confirm_btn">
			<button class="no-submit-btn" @click="submit" :class="{'yes-submit-btn':isSubmitBtn}">保存</button>
		</view>

		<!-- 底部滑出 -->
		<myBottomSlideIn ref="as"></myBottomSlideIn>
		<!-- 删除图片模态框 -->
		<myModal :show="delImgObj.isShowModal" @close="cancelModel" title="提示" headerFontSize='28upx' headerColor='#999'
		 @cancel="cancelModel" @confirm="confirmModel">
			<view style="min-height: 90upx;line-height:90upx;padding: 40upx 24upx;text-align: center;font-size: 30upx;color: #4C4C4C;">
				您确认删除该张图片?
			</view>
		</myModal>
		<!-- /删除图片模态框 -->
		
		<!-- 提示 -->
		<myTipLayer ref="anRef" timer="3" autoClose="true"></myTipLayer>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				isSubmitBtn: false,
				textAreaValue: '',
				delImgObj: {
					isShowModal: false,
				},
				imgArr: [{
						url: 'https://xlfile-1256392453.file.myqcloud.com/v1/e83d53a3-5745-4f54-b3e8-50756490c4f2/700dee22-9660-4328-9bd4-d527176f4522-ys.jpg'
					},
					{
						url: 'https://xlfile-1256392453.file.myqcloud.com/v1/e83d53a3-5745-4f54-b3e8-50756490c4f2/700dee22-9660-4328-9bd4-d527176f4522-ys.jpg'
					},
					{
						url: 'https://xlfile-1256392453.file.myqcloud.com/v1/e83d53a3-5745-4f54-b3e8-50756490c4f2/700dee22-9660-4328-9bd4-d527176f4522-ys.jpg'
					},
				]
			}
		},
		methods: {

			/* 保存 */
			submit() {
				if(this.textAreaValue==''||(this.textAreaValue.length>0&&this.textAreaValue.trim().length==0)){
					this.$showTip('请输入沟通记录');
					return false;
				}
			},
			/* 取消 */
			cancelModel() {
				this.delImgObj.isShowModal = false;
			},
			/* 确定 */
			confirmModel() {
				this.delImgObj.isShowModal = false;
			},
			/* 删除图片 */
			delImg(itemObj) {
				this.delImgObj.isShowModal = true;
			},
			updateImg() {
				this.$refs.as.handleShow({
					actions: [{
							name: '拍照',
							color: '#444'
						},
						{
							name: '从手机相册选择',
							color: '#444'
						},

					],
					success: (res) => {
						switch (res.id) {
							// -1代表取消按钮
							case -1:
								console.log(res)
								break
							case 0:
								{
									let that = this;
									uni.chooseImage({
										count: 1, //默认9
										sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
										sourceType: ['camera'], //拍照										
										success(res) {
											const url = '/' + that.$manjs.getkevalue().branchid + '/' + that.orderId
											// that.$uploadTasks({
											// 	files: res.tempFiles,
											// 	key: url,
											// 	guid: true,
											// 	callback(a, b) {
											// 		that.keepImg({
											// 			key: b.headers.Location.split('com')[1],
											// 			fileName: b.headers.ETag
											// 		});
											// 	}
											// })
										}
									});
									break;
								}
							case 1:
								{
									let that = this;
									uni.chooseImage({
										count: 1, //默认9
										sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
										sourceType: ['album'], //从相册选择
										success(res) {
											const url = '/' + that.$manjs.getkevalue().branchid + '/' + that.orderId
											// that.$uploadTasks({
											// 	files: res.tempFiles,
											// 	key: url,
											// 	guid: true,
											// 	callback(a, b) {
											// 		that.keepImg({
											// 			key: b.headers.Location.split('com')[1],
											// 			fileName: b.headers.ETag
											// 		});
											// 	}
											// })
										}
									});
									break;
								}
						}
					}
				})
			}
		},
		watch: {
			textAreaValue(val) {
				this.isSubmitBtn=val==''?false:true
			}
		}
	}
</script>

<style scoped>
	.textArea_box {
		height: 434upx;
		border-bottom: 6upx solid #F2F2F2;
	}

	.textArea_box .textArea {
		color: #4c4c4c;
		font-size: 28upx;
		padding: 35upx 55upx;
		box-sizing: border-box;
		height: 100%;
	}

	.img_box {
		padding: 42upx 55upx;
		box-sizing: border-box;
		display: flex;
		flex-wrap: wrap;
	}

	.imgBox1 {
		width: 180upx;
		height: 135upx;
		background: url(../../../../static/icon/upload.png) no-repeat center center;
		background-size: 100%;
	}

	.imgBox {
		max-width: 180upx;
		max-height: 135upx;
		margin: 0 45upx 30upx 0;
		position: relative;
	}

	.imgBox image {
		max-width: 180upx;
		max-height: 135upx;
	}

	.imgBox:nth-child(3n) {
		margin-right: 0;
	}

	.delImgBox {
		width: 41upx;
		height: 41upx;
		position: absolute;
		right: -20upx;
		top: -20upx;
		background: url(../../../../static/image/dangQi/close.png) no-repeat center center;
		background-size: 100%;
	}

	.confirm_btn {
		margin-top: 200upx;
	}
</style>
