<template>
	<view class="calendar">
		<!-- 日历 -->
		<my-calendar ref="calendar" :insert="true" :lunar="true" :disable-before="true" :start-date="startDate" :end-date="'2100-1-1'"
		 @change="change" />
		<!-- /日历-->

		<!-- <footers :state='true' @callback='demo'></footers> -->
		<view class="btn">
			<button @click="myYuYue">我要预约</button>
		</view>
	</view>
</template>

<script>
	import {
		myCalendar
	} from "@/components/my-calendar/uni-calendar"
	export default {
		components: {
			myCalendar
		},
		data() {
			return {
				startDate: '',
				yuYueYear:'',
				yuYueMonth:'',
				yuYueDay:''
			}
		},
		methods: {
			change(e) {
				console.log(e);
				this.yuYueYear=e.year;
				this.yuYueMonth=e.month;
				this.yuYueDay=e.date;
			},
			myYuYue(){
				let url='../yuYue-news/yuYue-news?year='+this.yuYueYear+'&month='+this.yuYueMonth+'&day='+this.yuYueDay
				uni.navigateTo({
					url:url
				})
			}
		},
		onLoad() {
			this.startDate = this.$manjs.getFormatTime(new Date, '-');
		},
		onShow() {
			this.$refs.calendar.open();
		}
	}
</script>

<style scoped>
	.btn {
		margin-top: 150upx;
		text-align: center;
	}

	.btn button {
		width: 420upx;
		height: 100upx;
		line-height: 100upx;
		background: rgba(246, 109, 99, 1);
		border-radius: 50upx;
		color: #FFFFFF;
		font-size: 32upx;
	}
</style>
