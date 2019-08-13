<template>
	<view class="consulting-clients">
		<!-- 导航栏阴影 -->
		<view class="my-order-top-nav-shadow"></view>
		<scroll-view scroll-y class="scrollView">
			<view class="inner">
				<template v-for="(item,index) in listData">
					<view class="list" :key='index'>
						<view class="list-line" :style="{background:item.linebgcolor}"></view>
						<view class="list-hd">
							<view class="list-time1">
								<text class="label">预约日期：</text>
								<text>{{item.time1}}</text>
							</view>
							<view class="list-time2">{{item.time2}}</view>
						</view>
						<view class="list-bt">
							<view class="list-person">
								<text class="label w3">联系人</text>
								<text class="label">：</text>
								<text class="person">{{item.name}}</text>
								<text>{{item.tel}}</text>
							</view>
						</view>
					</view>
				</template>
			</view>
		</scroll-view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				listData:[
					{time1:'2019-10-24',time2:'2019-08-01 14:23',name:'章女士',tel:'18201245252',linebgcolor:'#FF4444'},
					{time1:'2019-10-24',time2:'2019-08-01 14:23',name:'章女士',tel:'18201245252',linebgcolor:'#BBB'},
					{time1:'2019-10-24',time2:'2019-08-01 14:23',name:'章女士',tel:'18201245252',linebgcolor:'#FF4444'},
					{time1:'2019-10-24',time2:'2019-08-01 14:23',name:'章女士',tel:'18201245252',linebgcolor:'#BBB'},
					{time1:'2019-10-24',time2:'2019-08-01 14:23',name:'章女士',tel:'18201245252',linebgcolor:'#FF4444'},
					{time1:'2019-10-24',time2:'2019-08-01 14:23',name:'章女士',tel:'18201245252',linebgcolor:'#BBB'},
					{time1:'2019-10-24',time2:'2019-08-01 14:23',name:'章女士',tel:'18201245252',linebgcolor:'#FF4444'},
					{time1:'2019-10-24',time2:'2019-08-01 14:23',name:'章女士',tel:'18201245252',linebgcolor:'#BBB'},
					{time1:'2019-10-24',time2:'2019-08-01 14:23',name:'章女士',tel:'18201245252',linebgcolor:'#FF4444'},
					{time1:'2019-10-24',time2:'2019-08-01 14:23',name:'章女士',tel:'18201245252',linebgcolor:'#BBB'},
					{time1:'2019-10-24',time2:'2019-08-01 14:23',name:'章女士',tel:'18201245252',linebgcolor:'#FF4444'},
					{time1:'2019-10-24',time2:'2019-08-01 14:23',name:'章女士',tel:'18201245252',linebgcolor:'#BBB'},
					{time1:'2019-10-24',time2:'2019-08-01 14:23',name:'章女士',tel:'18201245252',linebgcolor:'#FF4444'},
					{time1:'2019-10-24',time2:'2019-08-01 14:23',name:'章女士',tel:'18201245252',linebgcolor:'#BBB'},
					{time1:'2019-10-24',time2:'2019-08-01 14:23',name:'章女士',tel:'18201245252',linebgcolor:'#FF4444'},
					{time1:'2019-10-24',time2:'2019-08-01 14:23',name:'章女士',tel:'18201245252',linebgcolor:'#BBB'},
					{time1:'2019-10-24',time2:'2019-08-01 14:23',name:'章女士',tel:'18201245252',linebgcolor:'#FF4444'},
					{time1:'2019-10-24',time2:'2019-08-01 14:23',name:'章女士',tel:'18201245252',linebgcolor:'#BBB'},
					{time1:'2019-10-24',time2:'2019-08-01 14:23',name:'章女士',tel:'18201245252',linebgcolor:'#FF4444'},
					{time1:'2019-10-24',time2:'2019-08-01 14:23',name:'章女士',tel:'18201245252',linebgcolor:'#BBB'},
					{time1:'2019-10-24',time2:'2019-08-01 14:23',name:'章女士',tel:'18201245252',linebgcolor:'#FF4444'},
					{time1:'2019-10-24',time2:'2019-08-01 14:23',name:'章女士',tel:'18201245252',linebgcolor:'#BBB'},
					{time1:'2019-10-24',time2:'2019-08-01 14:23',name:'章女士',tel:'18201245252',linebgcolor:'#FF4444'},
					{time1:'2019-10-24',time2:'2019-08-01 14:23',name:'章女士',tel:'18201245252',linebgcolor:'#BBB'},
					{time1:'2019-10-24',time2:'2019-08-01 14:23',name:'章女士',tel:'18201245252',linebgcolor:'#FF4444'},
					{time1:'2019-10-24',time2:'2019-08-01 14:23',name:'章女士',tel:'18201245252',linebgcolor:'#BBB'},
					{time1:'2019-10-24',time2:'2019-08-01 14:23',name:'章女士',tel:'18201245252',linebgcolor:'#FF4444'},
					{time1:'2019-10-24',time2:'2019-08-01 14:23',name:'章女士',tel:'18201245252',linebgcolor:'#BBB'}
				]
			}
		},
		methods: {

		}
	}
</script>

<style scoped>
	.consulting-clients {
		font-size: 26upx;
		color: #4C4C4C;
	}
	.inner {
		padding: 20upx 30upx;
		box-sizing: border-box;
	}

	.consulting-clients .label {
		color: #BBB;
	}

	.consulting-clients .list {
		border: 1upx solid #EEE;
		padding: 25upx;
		box-sizing: border-box;
		border-radius: 15upx;
		position: relative;
		margin-bottom: 20upx;
	}

	.consulting-clients .list .list-time2 {
		font-size: 24upx;
		color: #BBB;
	}

	.consulting-clients .list .list-hd {
		display: flex;
		justify-content: space-between;
		margin-bottom: 15upx;
	}

	.consulting-clients .list .list-bt .person {
		color: #666;
		margin-right: 20upx;
	}

	.consulting-clients .list .list-line {
		width: 4upx;
		height: 72upx;
		background: rgba(255, 68, 68, 1);
		position: absolute;
		left: 0;
		top: 50%;
		transform: translateY(-50%);
	}
</style>
