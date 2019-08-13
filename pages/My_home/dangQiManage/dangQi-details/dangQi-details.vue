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
							<text class="icon_text">编辑</text>
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
									<view class="value">{{items.contactName}}</view>
								</view>
								<view class="contact_news_inner">
									<view class="label">
										<text>联系电话</text>：
									</view>
									<view class="value value_tel" @click="call(items)">
										{{items.contactTel}}
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
							<text class="icon_text">添加</text>
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
									<view class="record_text">{{items.content}}</view>
									<view class="record_img">
										<template v-for="(items2,index2) in items.imgArr">
											<view :key='index2' class="img_box" @click="previewPic(items2,items)">
												<image :src="items2.src"></image>
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
				/* 联系人信息 */
				contactsData: [{
						contactName: '小花1',
						contactTel: '18582382827'
					},
					{
						contactName: '小花2',
						contactTel: '18582382827'
					}
				],
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
				communicationRecordList: [{
						time: '2019-08-01 12:05',
						content: '新人要求现场穿浅色系正装主持，搭配浅色领 结，必须要领结',
						imgArr: [{
								src: 'https://xlfile-1256392453.file.myqcloud.com/v1/e83d53a3-5745-4f54-b3e8-50756490c4f2/700dee22-9660-4328-9bd4-d527176f4522-ys.jpg'
							},
							{
								src: 'http://192.168.1.253:8095/v1/a81dccd5-e776-4ef9-9fc9-7efc1dbec053/d1327cbf-2614-422b-83ee-9d437d148adf-ys.jpeg'
							},
							{
								src: 'https://xlfile-1256392453.file.myqcloud.com/v1/e83d53a3-5745-4f54-b3e8-50756490c4f2/700dee22-9660-4328-9bd4-d527176f4522-ys.jpg'
							},
						],
						bigColor: '#CCC',
						smallColor: '#FFF'
					},
					{
						time: '2019-08-01 12:05',
						content: '新人要求现场穿浅色系正装主持，搭配浅色领 结，必须要领结',
						imgArr: [{
								src: 'http://192.168.1.253:8095/v1/a81dccd5-e776-4ef9-9fc9-7efc1dbec053/d1327cbf-2614-422b-83ee-9d437d148adf-ys.jpeg'
							},
							{
								src: 'https://xlfile-1256392453.file.myqcloud.com/v1/e83d53a3-5745-4f54-b3e8-50756490c4f2/700dee22-9660-4328-9bd4-d527176f4522-ys.jpg'
							},
						],
						bigColor: '#CCC',
						smallColor: '#FFF'
					},
				]
			}
		},
		methods: {

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
				let phoneNumber = itemObj.contactTel;
				if(phoneNumber&&phoneNumber!=''){
					uni.makePhoneCall({
						phoneNumber: phoneNumber
					});
				}
			}
		},
		onLoad(options) {
			
		},
		onShow() {
			this.showTelTip=true;
			setTimeout(()=>{
				this.showTelTip=false;
			},3000)
		}
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
		margin-bottom: 50upx;
	}

	.record_img .img_box {
		max-width: 116upx;
		max-height: 78upx;
		border-radius: 5upx;
		overflow: hidden;
		margin-right: 24upx;
	}

	.record_img .img_box image {
		max-width: 116upx;
		max-height: 78upx;
	}
</style>
