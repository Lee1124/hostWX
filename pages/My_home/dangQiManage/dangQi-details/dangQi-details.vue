<template>
	<view class="dangQiDetails">
		<!-- 导航栏阴影 -->
		<view class="my-order-top-nav-shadow"></view>
		<scroll-view scroll-y='true' class="scrollView">
			<view style="padding: 0 40upx;">
				<view class="section section1">
					<view class="section_hd">
						<view class="title">档期信息</view>
						<view class="edit_box icon_box">
							<text class="img_box"></text>
							<text class="icon_text" @click="editDangQi">编辑</text>
						</view>
					</view>
					<view class="section_ct section1_ct">
						<view class="base_news news">
							<template v-for="(items,index) in baseNewsData">
								<view class="base_news_inner" :key='index'>
									<view class="label">
										<text :class="items.className">{{items.label}}</text>：
									</view>
									<view class="value">{{items.value}}</view>
								</view>
							</template>
						</view>
						<template v-for="(items,index) in contactsData">
							<view :key='index' class="contact_news news">
								<view class="contact_news_inner">
									<view class="label">
										<text class="w3">联系人</text>：
									</view>
									<view class="value">{{items.UserName}}</view>
								</view>
								<view class="contact_news_inner">
									<view class="label">
										<text>联系电话</text>：
									</view>
									<view class="value value_tel" @click="call(items)">
										{{items.Phone}}
										<text class="tel_tip" v-if="index==0&&showTelTip">可直接拨打电话</text>
									</view>
								</view>
							</view>
						</template>
					</view>
				</view>
				<view class="section section2">
					<view class="section_hd">
						<view class="title">沟通记录</view>
						<view class="gouTong_box icon_box">
							<text class="img_box"></text>
							<text class="icon_text" @click="addGouTong">添加</text>
						</view>
					</view>
					<view class="section_ct section2_ct">
						<template v-for="(items,index) in communicationRecordList">
							<view :key='index' class="section2_ct_inner">
								<view class="record_icon">
									<view class="bigIcon" :style="{background:items.bigColor}"></view>
									<view class="smallIcon" :style="{background:items.smallColor}"></view>
								</view>
								<view class="record_content">
									<view class="record_time">{{items.time}}</view>
									<view class="record_text">{{items.Content}}</view>
									<view class="record_img">
										<template v-for="(items2,index2) in items.files">
											<view :key='index2' class="img_box" @click="previewPic(items2,items)">
												<image :src="items2.imgUrl"></image>
											</view>
										</template>
									</view>
								</view>
							</view>
						</template>
					</view>
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				showTelTip:true,
				dangQiID:'',//档期id
				/* 联系人信息 */
				contactsData: [],
				/* 基本信息 */
				baseNewsData: [{
						label: '日期时间',
						value: '2019-10-02 12:00',
						className: 'w4',
						id: 1
					},
					{
						label: '酒店',
						value: '保利皇冠',
						className: 'w2',
						id: 2
					},
					{
						label: '后台策划',
						value: '喜来婚礼',
						className: 'w4',
						id: 3
					},
				],
				/* 沟通记录 */
				communicationRecordList: []
			}
		},
		methods: {
			/* 编辑 */
			editDangQi(){
				uni.navigateTo({
					// url:'../add-communication-record/add-communication-record?id='+this.dangQiID+'&type=update'
					url:'../add-dangQi/add-dangQi?id='+this.dangQiID+'&type=update'
				})
			},
			/* 添加沟通记录 */
			addGouTong(){
				uni.navigateTo({
					url:'../add-communication-record/add-communication-record?id='+this.dangQiID+'&addType=2'
				})
			},
			getDangQiNews(){
				let url='/xlapi/HostManage/HostUserManage/HostUser/GetAppion?id='+this.dangQiID;
				this.$axios({
					mrthod:'GET',
					url:url,
					success(res){
						console.log(res)
						this.baseNewsData.forEach(item=>{
							if(item.id==1){
								item.value=res.data.data.Time
							}
							if(item.id==2){
								item.value=res.data.data.HotelName
							}
							if(item.id==3){
								item.value=res.data.data.PlanName
							}
						})
						res.data.AppionComms.forEach(item=>{
							item.bigColor='#CCC';
							item.smallColor='#FFF';
							item.files.forEach(item2=>{
								item2.imgUrl=this.$manjs.cosIp+item2.Url
							})
						})
						this.contactsData=res.data.hostAppionContInfos;
						this.communicationRecordList=res.data.AppionComms;
					}
				})
			},
			/* 根据json数据筛选某个属性值 */
			filterValue(json, attribute) {
				let filterArr = [];
				for (let i = 0; i < json.length; i++) {
					filterArr.push(json[i][attribute])
				}
				return filterArr;
			},
			/* 预览图片 */
			previewPic(itemObj, itemObj2) {
				let urls = this.filterValue(itemObj2.imgArr, 'src');
				uni.previewImage({
					urls: urls,
					current: itemObj.src,
					longPressActions: true,
					loop: true,
					longPressActions: {
						itemList: ['保存图片', '收藏'],
						success(data) {
							console.log('选中了第' + (data.tapIndex + 1) + '个按钮,第' + (data.index + 1) + '张图片');
						},
						fail(err) {
							console.log(err.errMsg);
						}
					}
				});
			},
			/* 拨打电话 */
			call(itemObj) {
				console.log(itemObj)
				let phoneNumber = itemObj.Phone;
				if(phoneNumber&&phoneNumber!=''){
					uni.makePhoneCall({
						phoneNumber: phoneNumber
					});
				}
			}
		},
		onLoad(options) {
			this.dangQiID=options.id;
		
		},
		onShow() {
			this.getDangQiNews();
			this.showTelTip=true;
			setTimeout(()=>{
				this.showTelTip=false;
			},3000)
		},
		
	}
</script>

<style scoped>
	

	.section .section_hd {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin: 40upx 0;
	}

	.section .section_hd .img_box {
		width: 32upx;
		height: 32upx;
		display: inline-block;
		background-image: url(../../../../static/image/dangQi/edit.png);
		background-position: center center;
		background-repeat: no-repeat;
		background-size: 100%;
	}

	.section .section_hd .gouTong_box .img_box {
		background-image: url(../../../../static/image/dangQi/add.png);
	}

	.section .section_hd .title {
		font-size: 28upx;
		color: #F66D63;
		position: relative;
		margin-left: 12upx;
	}

	.section .section_hd .title::before {
		content: '';
		width: 6upx;
		height: 28upx;
		background: rgba(246, 109, 99, 1);
		position: absolute;
		left: -12upx;
		top: 50%;
		transform: translateY(-50%);
	}

	.section .section_hd .title {
		font-size: 28upx;
		color: #F66D63;
	}

	.section .section_hd .icon_text {
		font-size: 26upx;
		color: #999;
		margin-left: 8upx;
	}

	.section .section_hd .icon_box {
		display: flex;
		align-items: center;
	}

	/* 内容1 */
	.section1_ct {
		padding: 10upx 44upx;
		box-sizing: border-box;
		width: 100%;
		border: 1upx dashed #ccc;
		border-radius: 5upx;
	}

	.base_news_inner,
	.contact_news_inner {
		display: flex;
		align-items: center;
		margin-bottom: 22upx;
	}

	.base_news_inner:last-child,
	.contact_news_inner:last-child {
		margin-bottom: 0;
	}

	.label {
		color: #bbb;
		font-size: 28upx;
	}

	.value {
		color: #4C4C4C;
		font-size: 28upx;
		margin-left: 10upx;
		font-weight: 700;
	}

	.news {
		padding: 30upx 0;
		border-bottom: 1upx dashed #DDD;
	}

	.news:last-child {
		border: 0;
	}

	.value_tel {
		color: #3196FA;
		text-decoration: underline;
		position: relative;
	}

	.value_tel .tel_tip {
		width: 190upx;
		height: 50upx;
		line-height: 50upx;
		text-align: center;
		background: #C3C3C3;
		border-radius: 10upx;
		color: #FFFFFF;
		font-size: 22upx;
		position: absolute;
		top: -60upx;
		left: 85%;
		transform: translateX(-50%);
	}

	.value_tel .tel_tip::before {
		content: '';
		width: 0;
		height: 0;
		border-right: 10upx solid transparent;
		border-left: 10upx solid transparent;
		border-top: 10upx solid #C3C3C3;
		position: absolute;
		bottom: -5upx;
		left: 50%;
		transform: translateX(-50%);
	}

	/* 内容2 */
	.section2_ct_inner {
		display: flex;
	}

	.section2_ct .record_icon {
		padding-top: 5upx;
		box-sizing: border-box;
		margin-right: 16upx;
		position: relative;
	}

	.section2_ct .record_icon .bigIcon {
		width: 28upx;
		height: 28upx;
		border-radius: 50%;
	}

	.section2_ct .record_icon .bigIcon::after {
		content: '';
		width: 2upx;
		height: 100%;
		border-left: 2upx dashed #DDD;
		position: absolute;
		top: 28upx;
		left: 50%;
		transform: translateX(-50%);
	}

	.section2_ct .record_icon .smallIcon {
		width: 12upx;
		height: 12upx;
		border-radius: 50%;
		position: absolute;
		top: 13upx;
		left: 50%;
		transform: translateX(-50%);
	}

	.record_time {
		color: #999;
		font-size: 26upx;
		margin-bottom: 10upx;
		font-weight: 700;
	}

	.record_text {
		color: #4C4C4C;
		font-size: 28upx;
		font-weight: 700;
		margin: 20upx 0;
	}

	.record_img {
		display: flex;
		flex-wrap: wrap;
		margin-bottom: 30upx;
	}

	.record_img .img_box {
		max-width: 116upx;
		max-height: 78upx;
		border-radius: 5upx;
		overflow: hidden;
		margin-right: 24upx;
		margin-bottom: 20upx;
	}

	.record_img .img_box image {
		max-width: 116upx;
		max-height: 78upx;
	}
</style>
