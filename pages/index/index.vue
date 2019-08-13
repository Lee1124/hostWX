<template>
	<div style='height: 100%;'>
		<div class='box'>
			<p class='title'>主持人姜涛</p>
			<div class='bw-swiper'>
				<bw-swiper :videoAutoplay='true' :swiperList="swiperList" indicatorActiveColor="#ff0000" @clickItem="clickItem"
				 style="width:100%" :textTip="true"> </bw-swiper>
			</div>
			<div class='display-panel'>
				<ul>
					<li  v-for='( item , index ) in meulist' :key='index' @click='handlerMeulist( item , index )'>
						<span :class='{"panel-select":item.state}'> {{ item.name }} </span>
					</li>
				</ul>
				<div v-show='MuenIndex == 0'>
					<div class='label-box'>
						<div class='label' v-if='item.name' :style='{"background":item.color}' v-for='( item , index ) in Label' :key='index'>#{{ item.name }}</div>
					</div>
					<div class='brief-box'>
						<span>
							<i style='background: url(../../static/icon/Birthday.png) no-repeat center;'></i>
							<span>{{ user.Age }}岁</span>
						</span>
						<span>
							<i style='background: url(../../static/icon/user.png) no-repeat center;'></i>
							<span>{{ user.Height }}cm | {{ user.Weight }}kg</span>
						</span>
						<span>
							<i style='background: url(../../static/icon/achment.png) no-repeat center;'></i>
							<span>{{ user.Level }}</span>
						</span>
						<span>
							<i style='background: url(../../static/icon/Location.png) no-repeat center;'></i>
							<span>{{ user.City }}</span>
						</span>
					</div>
					<div class='brief-content'>
						<p style='word-break: break-word;'>{{ user.Remark }}</p>.
					</div>
				</div>
				<div v-show='MuenIndex == 1 && !user.IsOff' class='offer_box_index'>
					<p class='offer_box'>
						<span>
							婚礼/宴会：
						</span>
						<span>
							{{ offer.WedDingMoney }},
						</span>
						<span>
							定金:
						</span>
						<span>
							{{ offer.WedDingEarnestMoney }}元
						</span>
					</p>
					<p class='offer_box'>
						<span>
							商业/其他：
						</span>
						<span>
							{{ offer.BusShow }},
						</span>
						<span>
							定金:
						</span>
						<span>
							{{ offer.BusEarnestMoney }}元
						</span>
					</p>
					<p style='color: #999999;font-size: 28upx;margin-top: 54upx;'>注：异地费，服务项目的变更，请与主持人协商</p>
				</div>
				<div v-show='MuenIndex == 2 && !user.IsOff'>
					2
				</div>
			</div>
		</div>
		<make></make>
		<footers></footers>
	</div>
</template>

<script>
	import bwSwiper from '@/components/bw-swiper/bw-swiper.vue'
	import make from '@/components/my-make/my-make.vue'
	export default {
		data() {
			return {
				cos:'https://xlfile-1256392453.file.myqcloud.com',
				title: 'Hello',
				swiperList:[],		//banner图
				user:null,			//用户信息
				offer:null,				//报价
				meulist:[
					{name:'简介',state:true},
					{name:'报价',state:false},
					{name:'档期',state:false}
				],
				MuenIndex:0		,//当前小菜单
				Label:[
					{name:'',id:1,color:'#F66D63'},
					{name:'',id:2,color:'#F7CD1F'},
					{name:'',id:3,color:'#F66D63'}
				]
			}
		},
		components: {
			bwSwiper,
			make
		},
		onLoad(data) {
			console.log(data)
		},
		onShareAppMessage() {
			let path = `/pages/startpage/startpage?shareOpenId=${uni.getStorageSync('shareOpenId')}`;
			let imageUrl = "http://xilai99.com/camerashootingWXIMG/share.png"
			return {
				title: 'XX的个人主页',
				path: path,
				imageUrl: imageUrl
			}
		},
		methods: {
			// 菜单点击
			handlerMeulist(item, index) {
				this.meulist.forEach((item, i) => (i == index ? item.state = true : item.state = false))
				this.MuenIndex = index
			},
			clickItem(data) {
				console.log(data)
			},
			// 数据处理
			handlerFilter( data ){
				// banner图
				this.swiperList = data.banner.map( res => {
					return {
						id: res.ID,
						type: 'image',
						img: this.cos+res.Url,
						text:''
					}
				})
				// 用户数据
				this.user = data.user;
				// 标签
				let arr = data.user.Label.split('&')
				arr.map( ( res , index ) => {
					this.Label[index].name = res
				})
				// 报价
				this.offer = data.offer
			},
			handlerInit(){
				this.$axios({
					url:'/xlapi/HostManage/HostUserManage/HostUser/GetHostUserContent',
					method:'POST',
					success(res){
						this.handlerFilter( res.data.data )
					},
					fail(err) {

					}
				})
			}
		},
		onLoad() {
			this.handlerInit()
		},
	}
</script>

<style>
	page {
		background: #f8f8f8;
		height: 100%;
	}

	.box {
		padding: 120rpx 30rpx;
		height: 80%;
	}

	.title {
		color: #222222;
		font-size: 38rpx;
		width: 100%;
		box-sizing: border-box;
		padding: 0upx 60upx;
		margin-bottom: 40upx;
	}

	.bw-swiper {
		padding-top: 40upx;
	}

	.display-panel {
		min-height: calc(100% - 450upx);
		max-height: calc(100% - 450upx);
		background: rgba(255, 255, 255, 1);
		border-radius: 15upx;
		margin-top: 30upx;
		box-sizing: border-box;
		padding: 48upx 36upx;
	}

	.display-panel ul {
		display: flex;
	}

	.display-panel ul li {
		margin-right: 51upx;
		color: #333333;
		font-size: 26upx;
	}

	.panel-select:after {
		content: '';
		display: inline-block;
		width: 100%;
		height: 4upx;
		background: #E9E9E9;
		position: relative;
		top: -5upx;
	}

	.label {
		width: 134upx;
		height: 43upx;
		background: rgba(246, 109, 99, 1);
		border-radius: 22upx;
		color: #FFFFFF;
		font-size: 20upx;
		text-align: center;
		line-height: 43upx;
		margin-right: 15upx;
	}

	.label-box {
		display: flex;
		margin: 20upx 0;
	}

	.brief-box {
		margin-bottom: 43upx;
	}

	.brief-box span {
		margin-right: 15upx;
	}

	.brief-box span i {
		display: inline-block;
		width: 30upx;
		height: 30upx;
		background-size: 100% !important;
	}

	.brief-box span span {
		color: #666666;
		font-size: 24upx;
		position: relative;
		top: -5upx;
	}

	.brief-content p:nth-child(1) {
		margin-bottom: 20upx;
	}

	.brief-content {
		color: #222222;
		font-size: 28upx;
	}

	.offer_box {
		font-size: 28upx;
	}

	.offer_box:nth-child(1) {
		margin-bottom: 48upx;
	}

	.offer_box span:nth-child(odd) {
		color: #4C4C4C !important;
	}

	.offer_box span {
		color: #F66D63 !important;
		margin-right: 20upx;
	}

	.offer_box_index {
		margin-top: 78upx;
	}
</style>
