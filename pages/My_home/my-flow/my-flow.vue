<!-- 我的流量 -->
<template>
	<view class="myFlow">
		<!-- 导航栏阴影 -->
		<view class="my-order-top-nav-shadow"></view>
		<scroll-view scroll-y class="scrollView">
			<template v-for="(items,index) in listData">
				<view :key='index' class="big_list">
					<view class="big_list_title">
						<view class="time">{{items.time}}</view>
						<view class="flow">
							<text>流量：</text>
							<text>{{items.flow}}</text>
						</view>
					</view>
					<template v-for="(items2,index2) in items.data">
						<view :key='index2' class="small-list">
							<view class="person_base_news">
								<view class="person_img_box" :style="{background:'url('+items2.personImg+')'}"></view>
								<view class="person_name">{{items2.name}}</view>
							</view>
							<view class="time">{{items2.time}}</view>
						</view>
					</template>
				</view>
			</template>
		</scroll-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				listData: [{
						time: '2018年8月1日',
						flow: '5',
						data: [{
							name: 'one·Z',
							time: '10:32',
							personImg: 'https://xlfile-1256392453.file.myqcloud.com/v1/e83d53a3-5745-4f54-b3e8-50756490c4f2/700dee22-9660-4328-9bd4-d527176f4522-ys.jpg'
						}, ]
					},
					{
						time: '2018年7月11日',
						flow: '10',
						data: [{
								name: 'one·Z',
								time: '10:32',
								personImg: 'https://xlfile-1256392453.file.myqcloud.com/v1/e83d53a3-5745-4f54-b3e8-50756490c4f2/700dee22-9660-4328-9bd4-d527176f4522-ys.jpg'
							},
							{
								name: 'one·Z',
								time: '10:32',
								personImg: 'https://xlfile-1256392453.file.myqcloud.com/v1/e83d53a3-5745-4f54-b3e8-50756490c4f2/700dee22-9660-4328-9bd4-d527176f4522-ys.jpg'
							},
							{
								name: 'one·Z',
								time: '10:32',
								personImg: 'https://xlfile-1256392453.file.myqcloud.com/v1/e83d53a3-5745-4f54-b3e8-50756490c4f2/700dee22-9660-4328-9bd4-d527176f4522-ys.jpg'
							}
						]
					},{
						time: '2018年7月11日',
						flow: '10',
						data: [{
								name: 'one·Z',
								time: '10:32',
								personImg: 'https://xlfile-1256392453.file.myqcloud.com/v1/e83d53a3-5745-4f54-b3e8-50756490c4f2/700dee22-9660-4328-9bd4-d527176f4522-ys.jpg'
							},
							{
								name: 'one·Z',
								time: '10:32',
								personImg: 'https://xlfile-1256392453.file.myqcloud.com/v1/e83d53a3-5745-4f54-b3e8-50756490c4f2/700dee22-9660-4328-9bd4-d527176f4522-ys.jpg'
							},
							{
								name: 'one·Z',
								time: '10:32',
								personImg: 'https://xlfile-1256392453.file.myqcloud.com/v1/e83d53a3-5745-4f54-b3e8-50756490c4f2/700dee22-9660-4328-9bd4-d527176f4522-ys.jpg'
							}
						]
					},{
						time: '2018年7月11日',
						flow: '10',
						data: [{
								name: 'one·Z',
								time: '10:32',
								personImg: 'https://xlfile-1256392453.file.myqcloud.com/v1/e83d53a3-5745-4f54-b3e8-50756490c4f2/700dee22-9660-4328-9bd4-d527176f4522-ys.jpg'
							},
							{
								name: 'one·Z',
								time: '10:32',
								personImg: 'https://xlfile-1256392453.file.myqcloud.com/v1/e83d53a3-5745-4f54-b3e8-50756490c4f2/700dee22-9660-4328-9bd4-d527176f4522-ys.jpg'
							},
							{
								name: 'one·Z',
								time: '10:32',
								personImg: 'https://xlfile-1256392453.file.myqcloud.com/v1/e83d53a3-5745-4f54-b3e8-50756490c4f2/700dee22-9660-4328-9bd4-d527176f4522-ys.jpg'
							}
						]
					},
				]
			}
		},
		methods: {

		}
	}
</script>

<style scoped>
	.big_list {
		padding: 0 30upx;
		box-sizing: border-box;
		border-bottom: 3upx solid #EEE;
	}

	.big_list_title {
		display: flex;
		justify-content: space-between;
		border-bottom: 1upx solid #DDD;
		padding: 26upx 0;
	}

	.big_list_title .time {
		font-size: 26upx;
		color: #666;
	}

	.big_list_title .flow {
		font-size: 24upx;
		color: #999;
	}

	.small-list {
		display: flex;
		justify-content: space-between;
		border-bottom: 1upx dashed #DDD;
		padding: 30upx 0;
		align-items: center;
	}

	.small-list:last-child {
		border-bottom: 0;
	}

	.small-list .time {
		font-size: 26upx;
		color: #999;
	}

	.person_base_news {
		display: flex;
		align-items: center;
		flex-wrap: nowrap;
	}

	.person_base_news .person_name {
		font-size: #222;
		font-size: 30upx;
		margin-left: 20upx;
	}

	.person_img_box {
		width: 50upx;
		height: 50upx;
		border-radius: 5upx;
		background-position: center center !important;
		background-size: 100% 100% !important;
	}
</style>
