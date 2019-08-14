<template>
	<view class="dangQiList">
		<!-- 导航栏阴影 -->
		<view class="my-order-top-nav-shadow"></view>
		<scroll-view scroll-y='true' class="scrollView">
			<!-- /导航栏阴影 -->
			<view class="search_box">
				<view class="search_icon_box">
					<text class="my-iconfont">&#xe623;</text>
				</view>
				<input type="text" placeholder="搜索" placeholder-style="color:#BBB;">
			</view>
			<!-- 列表处 -->
			<view class="list_box">
				<template v-for="(items,index) in listData">
					<view :key='index' style="margin-bottom: 20upx;">
						<uni-swipe-action :options="items.options" :auto-close='false' @click="bindClickDel(items)">
							<view class='content_box'>
								<view class="content">
									<view class="content_time" @click="openDetails(items)">
										<text class="time">{{items.time}}</text>
										<text class="my-iconfont">&#xe64a;</text>
									</view>
									<view class="content_news">
										<view class="content_news_title">{{items.Hotel}}</view>
										<view class="content_news_box">
											<view class="content_news_person">
												<text class="label">联<text class="oneWord"></text>系<text class="oneWord"></text>人</text>
												<text class="ct">{{items.appionCont.UserName}}</text>
											</view>
											<view class="content_news_tel">
												<text class="label">联系电话</text>
												<text class="ct">{{items.appionCont.Phone}}</text>
											</view>
										</view>
									</view>
								</view>
							</view>
						</uni-swipe-action>
					</view>
				</template>
			</view>
		</scroll-view>

		<!-- 删除提示模态框 -->
		<myModal :show="delListObj.isShowModal" @close="cancelModel" title="提示" @cancel="cancelModel" @confirm="confirmModel">
			<view class="tip_view">
				<view class="tip-title">确定删除该档期？</view>
				<view class="tip-content">（包含档期信息、沟通记录）</view>
			</view>
		</myModal>
		<!-- /删除提示模态框 -->
		
		<!-- 提示 -->
		<myTipLayer ref="anRef" timer="3" autoClose="true"></myTipLayer>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				delListObj: {
					isShowModal: false,
					id: ''
				},
				listData: [
					// {
					// 	time: '2019-08-02 12:00',
					// 	Hotel: '保利皇冠酒店',
					// 	person: '哈哈哈',
					// 	tel: '18582382827',
					// 	options: [{
					// 		text: '删除',
					// 		style: {
					// 			backgroundColor: '#FF0000',
					// 			height: '100%'
					// 		}
					// 	}]
					// },
				],

			}
		},
		methods: {
			/* 获取档期列表信息 */
			getDangQiListData() {
				let url = '/xlapi/HostManage/HostUserManage/HostUser/GetAppionList';
				let data = {
					key: '',
					stime: '2019-07-01',
					etime: ''
				};
				this.$axios({
					method: 'POST',
					url: url,
					data: data,
					success(res) {
						// console.log(res)
						if (res.statusCode == 200) {
							res.data.forEach(item => {
								item.options = [{
									text: '删除',
									style: {
										backgroundColor: '#FF0000',
										height: '100%'
									}
								}]
							})
							this.listData = res.data
						}
					}
				})
			},
			bindClickDel(itemObj) {
				this.delListObj.isShowModal = true;
				this.delListObj.id = itemObj.appionCont.AppionId;
			},
			cancelModel() {
				this.delListObj.isShowModal = false;
			},
			confirmModel() {
				let url = '/xlapi/HostManage/HostUserManage/HostUser/DelAppion';
				let data = {
					id:this.delListObj.id
				};
				this.$axios({
					method: 'POST',
					url: url,
					data: data,
					success(res) {
						if(res.data.status){
							this.$showTip('移除成功','success');
							this.getDangQiListData();
						}
					}
				})
				this.delListObj.isShowModal = false;
			},
			openDetails(itemObj) {
				uni.navigateTo({
					url: '../dangQi-details/dangQi-details?id='+itemObj.ID
				})
			}
		},
		onLoad() {
			this.getDangQiListData();
		},
	}
</script>

<style scoped>
	.scrollView {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
	}

	.search_box {
		padding: 0 30upx;
		box-sizing: border-box;
		height: 66upx;
		margin: 16upx 0 45upx;
		position: relative;
	}

	.search_box input {
		background: #F2F2F2;
		border-radius: 33upx;
		width: 100%;
		height: 100%;
		padding-left: 90upx;
		box-sizing: border-box;
		color: #222;
		font-size: 28upx;
	}

	.search_icon_box {
		position: absolute;
		left: 30upx;
		height: 100%;
		width: 90upx;
	}

	.search_box .my-iconfont {
		position: absolute;
		left: 50%;
		top: 50%;
		transform: translate(-50%, -50%);
		color: #AAA;
	}

	.list_box .content_box {
		padding: 0 30upx;
		box-sizing: border-box;
	}

	.list_box .content_box .content {
		background: #fff;
		border: 1upx solid rgba(238, 238, 238, 1);
		border-radius: 10px;
		padding: 33upx;
		box-sizing: border-box;
	}

	.list_box .content_box .content .content_time {
		border-bottom: 1upx dashed #CCC;
		padding-bottom: 30upx;
		color: #999;
		font-size: 28upx;
		display: flex;
		justify-content: space-between;
	}

	.list_box .content_box .content .content_news .content_news_title {
		color: #222;
		font-size: 30upx;
		margin: 30upx 0;
	}

	.list_box .content_box .content .content_news {
		font-size: 26upx;
	}

	.list_box .content_box .content .content_news .label {
		color: #999;
	}

	.list_box .content_box .content .content_news .ct {
		color: #4C4C4C;
		margin-left: 20upx;
	}

	.list_box .content_box .content .content_news .content_news_box {
		margin-bottom: 30upx;
	}

	.list_box .content_box .content .content_news .content_news_box:last-of-type {
		margin-bottom: 0;
	}

	.list_box .content_box .content .content_news .content_news_tel {
		margin-top: 15upx;
	}

	.tip_view {
		min-height: 90upx;
		padding: 40upx 24upx;
		text-align: center;
	}

	.tip_view .tip-title {
		color: #666;
		font-size: 34upx;
	}

	.tip_view .tip-content {
		color: #999;
		font-size: 26upx;
		margin-top: 15upx;
	}

	>>>.neil-modal__header {
		color: #999;
	}
</style>
