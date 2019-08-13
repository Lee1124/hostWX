<template>
	<view class="profile">
		<!-- 导航栏阴影 -->
		<view class="my-order-top-nav-shadow"></view>
		<scroll-view scroll-y class="scrollView">
			<template v-for="(items,index) in profileList">
				<view class="profile_list" :key='index' v-if="items.id!=8&&items.id!=9">
					<view class="noEdit" v-if="textType==2"></view>
					<myList @getInputValue='getInputValue' :labelText='items.labelText' :myPlaceholder='items.placeholder' :ref='items.ref'
					 :keyValue='items.id'></myList>
				</view>
				<view class="profile_list" :key='index' v-if="items.id==8">
					<view class="noEdit" v-if="textType==2"></view>
					<myList @getSelectedValue='getSelectedValue' type='selector' :myPlaceholder='items.placeholder' :labelText='items.labelText'
					 :selectList='selectList' :keyValue='items.id' :ref='items.ref'></myList>
				</view>
				<view class="profile_list" :key='index' v-if="items.id==9">
					<view class="noEdit" v-if="textType==2"></view>
					<myList @getTextAreaValue='getTextAreaValue' type='textarea' :myPlaceholder='items.placeholder' :myModalObj="{'placeholder':'请输入您的个人履历或者您的特色...','title':'个人简介'}"
					 :labelText='items.labelText' :ref='items.ref' :keyValue='items.id'></myList>
				</view>
			</template>

			<view class="tags_box">
				<view class="noEdit" v-if="textType==2"></view>
				<view class="tags_box_inner">
					<view class="tags tags0" @click="addTags">新标签</view>
					<template v-for="(items,index) in tagsData">
						<view class="tags" :key='index' @longpress="delTag(items)">{{items}}</view>
					</template>
				</view>
			</view>

			<view class="btn_box">
				<button class="no-submit-btn" :class="{'yes-submit-btn':yesSubmitBtn}" v-if="textType==1" @click="comfirm">保存</button>
				<button class="no-submit-btn yes-submit-btn" @click="edit" v-if="textType==2">编辑</button>
			</view>
		</scroll-view>

		<!-- 提示 -->
		<myTipLayer ref="anRef" timer="3" autoClose="true"></myTipLayer>

		<!-- 添加新标签模态框 -->
		<myModal :show="addTagsObj.isShowModal" @close="cancelAddTagsModel" title="新标签" @cancel="cancelAddTagsModel" @confirm="confirmAddTagsModel">
			<view style="min-height: 90upx;padding: 28upx 24upx;">
				<input class="addTagsInput" v-model="addTagsObj.inputValue" type="text" placeholder="标签长度不超过6个字" placeholder-style="color:#BBB;">
			</view>
		</myModal>
		<!-- /添加新标签模态框 -->
		
		
		<!-- 删除标签模态框 -->
		<myModal :show="delTagsObj.isShowModal" @close="cancelDelTagsModel" title="提示" @cancel="cancelDelTagsModel" @confirm="confirmDelTagsModel">
			<view style="min-height: 90upx;padding: 28upx 24upx;text-align: center;line-height: 75rpx;">
				<text class="delText" >确定移除该标签？</text>
			</view>
		</myModal>
		<!-- /删除标签模态框 -->
	</view>
</template>

<script>
	export default {
		data() {
			return {
				yesSubmitBtn: false,
				textType: 1, //文本类型  添加1  编辑2
				addTagsObj: {
					isShowModal: false,
					inputValue: '',
				},
				delTagsObj:{
					isShowModal: false
				},
				profileList: [{
						labelText: '小程序',
						content: '',
						placeholder: '请为您的小程序取一个名字',
						ref: 'projectNameRef',
						indexOfStr: 'text1',
						id: 1
					},
					{
						labelText: '姓名',
						content: '',
						placeholder: '请输人您的真实姓名',
						ref: 'nameRef',
						indexOfStr: 'text2',
						id: 2
					},
					{
						labelText: '电话',
						content: '',
						placeholder: '请输人您的联系电话',
						ref: 'telRef',
						indexOfStr: 'text3',
						id: 3
					},
					{
						labelText: '年龄',
						content: '',
						placeholder: '请输人您的年龄',
						ref: 'ageRef',
						indexOfStr: 'text4',
						id: 4
					},
					{
						labelText: '身高',
						content: '',
						placeholder: '请输人您的身高(cm)',
						ref: 'heightRef',
						indexOfStr: 'text5',
						id: 5
					},
					{
						labelText: '体重',
						content: '',
						placeholder: '请输人您的体重(kg)',
						ref: 'weightRef',
						indexOfStr: 'text6',
						id: 6
					},
					{
						labelText: '城市',
						content: '',
						placeholder: '请输人您的常驻城市',
						ref: 'cityRef',
						indexOfStr: 'text7',
						id: 7
					},
					{
						labelText: '等级',
						selectObj: {},
						placeholder: '请选择您的普通话等级',
						ref: 'registerRef',
						indexOfStr: 'select',
						id: 8
					},
					{
						labelText: '简介',
						content: '',
						placeholder: '请输入您的个人履历或者您的特色',
						ref: 'profileRef',
						indexOfStr: 'textArea',
						id: 9
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
			/* 判断是不是电话号码 */
			sureIsTel(val) {
				if (!(/[0-9-()（）]{7,18}/).test(val)) {
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

			/* 取消 */
			cancelAddTagsModel() {
				this.addTagsObj.isShowModal = false;
			},
			/* 确认添加标签 */
			confirmAddTagsModel() {
				if(this.addTagsObj.inputValue.length>6){
					this.$showTip('标签长度不超过6个字');
					return false;
				}else{
					this.tagsData.push(this.addTagsObj.inputValue);
				}
				this.addTagsObj.isShowModal = false;
			},

			/* 添加新标签 */
			addTags() {
				this.addTagsObj.isShowModal = true;
				this.addTagsObj.inputValue = '';
			},
			
			/* 删除 */
			delTag(itemObj){
				this.delTagsObj.isShowModal = true;
				this.delTagsObj.tagName = itemObj;
			},
			
			/* 删除取消 */
			cancelDelTagsModel(){
				this.delTagsObj.isShowModal = false;
			},
			/* 删除确认 */
			confirmDelTagsModel(){
				for(let i=this.tagsData.length-1;i>=0;i--) {
					if(this.tagsData[i]==this.delTagsObj.tagName){
						this.tagsData.splice(i,1)
					}
				}
				this.delTagsObj.isShowModal = false;
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
			/* 单选获取的值 */
			getSelectedValue(obj) {
				this.profileList.forEach(item => {
					if (item.id == obj.keyValue) {
						item.selectObj = {
							label: obj.value.label,
							value: obj.value.value
						};
					}
				})
			},
			/* 输入文本 */
			getTextAreaValue(obj) {
				this.profileList.forEach(item => {
					if (item.id == obj.keyValue) {
						item.content = obj.value;
					}
				})
			}
		},
		onLoad(options) {

		},
		onShow() {
			this.$nextTick(() => {
				this.profileList.forEach(item => {
					if (item.indexOfStr.indexOf('text') != -1) {
						this.$refs[item.ref][0].setInputValue(item.content);
					}
					if (item.indexOfStr.indexOf('select') != -1) {
						this.$refs[item.ref][0].setSelectValue(item.selectObj);
					}
					if (item.indexOfStr.indexOf('textArea') != -1) {
						this.$refs[item.ref][0].setTextAreaValue(item.content);
					}
				})
			})
		},
		watch: {
			profileList: {
				deep: true,
				handler(val) {
					let i = 0;
					val.forEach(item => {
						if ((item.content != undefined && item.content == "") || (item.selectObj != undefined && !item.selectObj.label)) {
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
