<template>
	<view class="profile">
		<!-- 导航栏阴影 -->
		<view class="my-order-top-nav-shadow"></view>
		<scroll-view scroll-y class="scrollView">
			<template v-for="(items,index) in profileList">
				<view class="profile_list" :key='index'>
					<view class="noEdit" v-if="textType==2"></view>
					<myList @getInputValue='getInputValue' :labelText='items.labelText' :myPlaceholder='items.placeholder' :ref='items.ref'
					 :keyValue='items.id'></myList>
				</view>
			</template>
			<view class="btn_box">
				<button class="no-submit-btn" :class="{'yes-submit-btn':yesSubmitBtn}" v-if="textType==1" @click="comfirm">保存</button>
				<button class="no-submit-btn yes-submit-btn" @click="edit" v-if="textType==2">编辑</button>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				yesSubmitBtn: false,
				textType: 2, //文本类型  添加1  编辑2
				addTagsObj: {
					isShowModal: false,
					inputValue: '',
				},
				delTagsObj:{
					isShowModal: false
				},
				profileList: [
					{
						labelText: '婚礼类',
						content: '',
						placeholder: '请给出您婚礼主持的价格(元)',
						ref: 'wedding',
						indexOfStr: 'wedding',
						id: 1
					},
					{
						labelText: '定金',
						content: '',
						placeholder: '请给出预订婚礼类主持需要的定金(元)',
						ref: 'weddingPrice',
						indexOfStr: 'wedding-price',
						id: 2
					},
					{
						labelText: '商演类',
						content: '',
						placeholder: '请给出您商演主持的价格(元)',
						ref: 'business',
						indexOfStr: 'business',
						id: 3
					},
					{
						labelText: '定金',
						content: '',
						placeholder: '请给出预订商演类主持需要的定金(元)',
						ref: 'businessPrice',
						indexOfStr: 'business-price',
						id: 4
					},
				],
				selectList: [{
						label: "demo1",
						value: '1'
					},
					{
						label: "demo2",
						value: '2'
					},
					{
						label: "demo3",
						value: '3'
					},
				],
				tagsData: []
			}
		},
		methods: {
			/* 保存 */
			comfirm() {
				let projectName; //小程序名字1
				let name; //姓名2
				let tel; //电话3
				let age; //年龄4
				let height; //身高5
				let weight; //体重6
				let city; //城市7
				let register; //等级8
				let profile; //简介9
				this.profileList.forEach(item => {
					if (item.id == 1) {
						projectName = item.content
					} else if (item.id == 2) {
						name = item.content;
					} else if (item.id == 3) {
						tel = item.content;
					} else if (item.id == 4) {
						age = item.content;

					} else if (item.id == 5) {
						height = item.content;

					} else if (item.id == 6) {
						weight = item.content;

					} else if (item.id == 7) {
						city = item.content;

					} else if (item.id == 8) {
						if (item.selectObj.value) {
							register = item.selectObj.value;
						} else {
							register = ''
						}
					} else if (item.id == 9) {
						profile = item.content;

					}
				})

				if (this.valueIsNull(projectName)) {
					this.$showTip('请为您的小程序取一个名字');
					return false;
				} else if (this.valueIsNull(name)) {
					this.$showTip('请为您的姓名');
					return false;
				}

				if (this.valueIsNull(tel)) {
					this.$showTip('请输入您的电话号码');
					return false;
				} else if (!this.valueIsNull(tel) && !this.sureIsTel(tel)) {
					this.$showTip('请输入正确的电话号码');
					return false;
				}

				if (this.valueIsNull(age)) {
					this.$showTip('请输入您的年龄');
					return false;
				} else if (!this.valueIsNull(age) && !this.sureIsNumber(age)) {
					this.$showTip('请输入正确的年龄');
					return false;
				}
				if (this.valueIsNull(height)) {
					this.$showTip('请输入您的身高');
					return false;
				} else if (!this.valueIsNull(height) && !this.sureIsNumber(height)) {
					this.$showTip('请输入正确的身高');
					return false;
				}

				if (this.valueIsNull(weight)) {
					this.$showTip('请输入您的身高');
					return false;
				} else if (!this.valueIsNull(weight) && !this.sureIsNumber(weight)) {
					this.$showTip('请输入正确的体重');
					return false;
				}

				if (this.valueIsNull(city)) {
					this.$showTip('请输人您的常驻城市');
					return false;
				}
				if (this.valueIsNull(register)) {
					this.$showTip('请选择您的普通话等级');
					return false;
				}
				if (this.valueIsNull(profile)) {
					this.$showTip('请输入您的个人履历或者您的特色');
					return false;
				}
			},

			/* 判断是不是数字 */
			sureIsNumber(val) {
				if (!(/^([+-]?)\d*\.?\d+$/).test(val)) {
					return false
				} else {
					return true
				}
			},
			/* 判断某属性是不是为空 */
			valueIsNull(name) {
				if (name == '' || (name.length > 0 && name.trim().length == 0)) {
					return true
				} else {
					return false
				}
			},
			
			/* 编辑 */
			edit() {
				this.textType = 1;
			},
			/* 文本框获取的值 */
			getInputValue(obj) {
				this.profileList.forEach(item => {
					if (item.id == obj.keyValue) {
						item.content = obj.value;
					}
				})
			},
			
		},
		onLoad(options) {

		},
		onShow() {
			this.$nextTick(() => {
				this.profileList.forEach(item => {
					this.$refs[item.ref][0].setInputValue(item.content);
				})
			})
		},
		watch: {
			profileList: {
				deep: true,
				handler(val) {
					let i = 0;
					val.forEach(item => {
						if (item.content != undefined && item.content == "") {
							i++;
						}
					})
					this.yesSubmitBtn = i == 0 ? true : false;
				}
			}
		}

	}
</script>

<style scoped>
	.noEdit {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		z-index: 9;
	}

	.profile_list {
		padding: 0 40upx;
		box-sizing: border-box;
		position: relative;
	}

	.profile_list {
		height: 105upx;
	}

	.tags_box_inner {
		display: flex;
		flex-wrap: wrap;
		padding: 0 40upx;
		box-sizing: border-box;
		margin-top: 50upx;
		position: relative;
	}

	.tags {
		width: 210upx;
		height: 78upx;
		line-height: 78upx;
		text-align: center;
		color: #FFF;
		font-size: 28upx;
		border-radius: 39upx;
		margin-right: 18upx;
		margin-bottom: 20upx;
	}

	.tags0 {
		border: 1upx solid rgba(187, 187, 187, 1);
		color: #BBB;
	}

	.tags:nth-child(2) {
		background: #F66D63;
	}

	.tags:nth-child(3) {
		background: #F7CD1F;
		margin-right: 0;
	}

	.tags:nth-child(4) {
		background: #F66D63;
	}

	.btn_box {
		margin: 140upx 0;
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
