<template>
	<div>
		<ul>
			<li v-for='( item , index ) in MuenList' :key='index' @click='handlerMenu( item , index)'>
				<template v-if='state'>
					<div class='img-box' v-if='index != 2'>
						<image v-if='item.state' :src="item.selectIcon" mode="scaleToFill"></image>
						<image v-if='!item.state' :src="item.icon" mode="scaleToFill"></image>
					</div>
				</template>
				<template v-else>
					<div class='img-box'>
						<image v-if='item.state' :src="item.selectIcon" mode="scaleToFill"></image>
						<image v-if='!item.state' :src="item.icon" mode="scaleToFill"></image>
					</div>
				</template>
				
				<div v-if='index == 2 && state'>
					<div class='adding-box'>
						<div class='adding'>
							<div></div>
							<div></div>
						</div>
					</div>
				</div>
				<span :class='{"title-color":item.state}'>
					{{ item.title }}
				</span>
			</li>
		</ul>
		<min-action-sheet ref="action_sheet" ></min-action-sheet>
	</div>
</template>

<script>
	let url = '../../../../../static/icon/'; // icon地址 
	import minActionSheet from '../min-action-sheet/min-action-sheet.vue'
	export default {
		props:{
			state:{							//当前为主持人导航
				type:Boolean,
				default:false
			},
			callback:{
				type:Function,
				default: function(){
					return
				}			//菜单点击回调
			},
			actionCall:{
				type:Function,
				default: function(){
					return
				}			//发布
			}
		},
		components:{ minActionSheet },
		data() {
			return {
				MuenList:[],			//最终显示菜单
				MuenList_a: [{
						title: '首页',				//菜单名称
						icon: url + '3-1.png',		//图标路径
						selectIcon:url + '3.png',	//已选择图标
						path: '../../index/index',	//路由地址
						parms: {},					//参数
						state:true					//是否选择 
					},
					{
						title: '视频',
						icon: url + '2-1.png',
						selectIcon:url + '2.png',	//已选择图标
						path: '',
						parms: {},
						state:false
					},
					{
						title: '添加',
						icon: '',
						selectIcon:url + '2.png',	//已选择图标
						path: '',
						parms: {},
						state:false
					},
					{
						title: '动态',
						icon: url + '1-1.png',
						selectIcon:url + '1.png',	//已选择图标
						path: '',
						parms: {},
						state:false
					},
					{
						title: '我的',
						icon: url + '4-1.png',
						selectIcon:url + '4.png',	//已选择图标
						path: '',
						parms: {},
						state:false
					}
				]
				,MuenList_b:[
					{
						title: '首页',
						icon: url + '3-1.png',
						selectIcon:url + '3.png',	//已选择图标
						path: '../../index/index',
						parms: {},
						state:true
					},
					{
						title: '视频',
						icon: url + '2-1.png',
						selectIcon:url + '2.png',	//已选择图标
						path: '',
						parms: {},
						state:false
					},
					{
						title: '动态',
						icon: url + '1-1.png',
						selectIcon:url + '1.png',	//已选择图标
						path: '',
						parms: {},
						state:false
					}
				],
			}
		},
		methods: {
			// 当前菜单点击
			handlerMenu( data , index ){
				console.log(data,index)
				this.MuenList.filter(( res , i ) => ( i == index? res.state = true : res.state = false ))
				
				this.$emit('callback',{ data , index })
				// 判断当前是否是主持人
				this.state && index == 2? 
				this.bindClick() : uni.redirectTo({
					url: data.path + this.handlerParms(data.parms)
				});
			},
			// 底部弹出菜单
			bindClick(){
				let _that = this
				this.$refs.action_sheet.handleShow({
					actions: [
						{
							name: '动态',
							color: '#4C4C4C',
							content:'图片或视频'
						},
						{
							name: '作品-视频',
							color: '#4C4C4C'
						},
						{
							name: '档期',
							color: '#4C4C4C'
						}
					],
					success: (res) => {
						_that.$emit('actionCall',res)
					}
				})
			},
			// 序列化参数
			handlerParms( data ){
				let dataObjArr = []
				let url = ''
				for (var key in data) {
				  if (data.hasOwnProperty(key)) {
				    dataObjArr.push(key);
				    if (dataObjArr.length == 1) {
				      url = '?' + key + '=' + data[key];
				    } else {
				      url = '&' + key + '=' + data[key];
				    }
				  }
				}
				return url
			}
		},
		onLoad() {
			
		},
		onShow() {
			
		},
		onReady() {
			this.state? this.MuenList = this.MuenList_a : this.MuenList = this.MuenList_b
		},
		onHide() {

		},
		onUnload() {

		},
		onPullDownRefresh() {

		},
		onReachBottom() {

		},
		onShareAppMessage() {

		},
		onPageScroll() {

		}
	}
</script>

<style>
	.title-color{
		color: #F66D63 !important;
	}
	.adding div{
		position: absolute;
		top:0;
		bottom: 0;
		right:0;
		left: 0;
		margin: auto;
		background: #FFFFFF;
		border-radius: 5upx;
	}
	.adding div:nth-child(2){
		width: 5upx;
		height: 40upx;
	}
	.adding div:nth-child(1){
		width: 40upx;
		height: 5upx;
	}
	.adding-box,
	.adding {
		position: absolute;
		border-radius: 50%;
		right: 0;
		left: 0;
		margin: auto;
	}
	.adding-box{
		width: 100upx;
		height: 100upx;
		background: #FFFFFF;
		top: -28upx;
		background: rgba(255, 255, 255, 1);
		box-shadow:0px -15px 15px -18rpx rgba(0, 0, 0, 0.08);

	}
	.adding {
		width: 80upx;
		height: 80upx;
		background:linear-gradient(0deg,rgba(242,138,131,1),rgba(244,67,55,1));
		top: 18upx;
	}

	ul {
		width: 100%;
		position: fixed;
		bottom: 0;
		display: flex;
		justify-content: space-between;
		z-index: auto;
		background: rgba(255, 255, 255, 1);
		box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, 0.08);
	}

	ul li {
		width: 20%;
		height: 110upx;
		position: relative;
	}

	ul li span {
		display: inline-block;
		position: absolute;
		text-align: center;
		font-size: 18upx;
		color: #BBBBBB;
		padding: 5upx 0;
		width: 100%;
		left: 0;
		right: 0;
		bottom: 0;
		margin: 0;
	}

	.img-box {
		width: 56upx;
		height: 56upx;
		overflow: hidden;
		position: absolute;
		top: 15upx;
		left: 0;
		right: 0;
		margin: auto;
	}

	.img-box image {
		width: 100%;
		height: 100%;
	}
</style>
