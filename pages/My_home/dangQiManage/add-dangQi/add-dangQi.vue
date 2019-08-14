<template>
	<view class="addDangQi">
		<!-- 导航栏阴影 -->
		<view class="my-order-top-nav-shadow"></view>
		<scroll-view scroll-y class="scrollView" @click="hide">
			<view class="scroll_inner">
				<!-- 基本信息 -->
				<view class="base_news">
					<view class="base_news_list">
						<myList @getDateTimeValue='getDateTimeValue' labelText='日期时间' myPlaceholder='请选择日期和时间' type='dateTime' ref='timeRef'
						 mode='YY年MM月DD日' showCurrentTime='true'></myList>
					</view>
					<view class="base_news_list">
						<myList labelText='酒店' type='inputSearch' Nword='4' ref='hostAddress' myPlaceholder='输入搜索主持地点' :myInputSearchObj='myInputSearchObj'
						 @inputSearchFocus='hostAddressFocus' @inputSearchChoiceThis='hostAddressChoice' @createEvent='createHostAddress'></myList>
					</view>
					<view class="base_news_list">
						<myList labelText='婚礼策划' type='inputSearch' ref='myPlan' myPlaceholder='输入搜索婚礼策划' :myInputSearchObj='myPlanObj'
						 @inputSearchFocus='hostAddressFocus' @inputSearchChoiceThis='hostAddressChoice' @createEvent='createHostAddress'></myList>
					</view>
				</view>

				<!-- 联系人 -->
				<template v-for="(items,index) in contactsData">
					<view class="contants" :key='index'>
						<uni-swipe-action :options="items.options" :auto-close='false' @click="bindClickDel(items)">
							<view class="content">
								<view class="base_news_list">
									<myList @getInputValue='getInputValue_name' labelText='联系人' :keyValue='items.id' myPlaceholder='请输入联系人名字'
									 Nword=4 :ref='items.ref1'></myList>
								</view>
								<view class="base_news_list">
									<myList @getInputValue='getInputValue_tel' labelText='联系电话' :keyValue='items.id' myPlaceholder='请输入联系人电话' :ref='items.ref2'></myList>
								</view>
							</view>
						</uni-swipe-action>
					</view>
				</template>

				<view class="addContacts" @click="addContacts">新增联系人</view>
				<view class="confirm_btn">
					<button class="no-submit-btn" @click="submit" :class="{'yes-submit-btn':isSubmitBtn}">保存</button>
				</view>
			</view>
		</scroll-view>

		<!-- 创建主持地点模态框 -->
		<myModal :show="addObj.isShowModal" @close="cancelModel" :title="addObj.title" @cancel="cancelModel" @confirm="confirmModel">
			<view style="min-height: 90upx;padding: 28upx 24upx;">
				<input class="addInput" v-model="addObj.inputValue" type="text" :placeholder="addObj.placeholder" placeholder-style="color:#BBB;">
			</view>
		</myModal>
		<!-- /创建主持地点模态框 -->

		<!-- 添加成功模态框 -->
		<myModal :show="addSuccessObj.isShowModal" @close="cancelModel2" title="提示" headerFontSize='28upx' headerColor='#999'
		 confirmText='添加' @cancel="cancelModel2" @confirm="confirmModel2">
			<view style="min-height: 90upx;padding: 40upx 24upx 50upx;text-align: center;font-size: 30upx;color: #4C4C4C;">
				<view class="text1">档期添加成功</view>
				<view class="text2">是否需要继续添加沟通记录</view>
			</view>
		</myModal>
		<!-- /添加成功模态框 -->

		<!-- 删除图片模态框 -->
		<myModal :show="delObj.isShowModal" @close="cancelModel_del" title="提示" headerFontSize='28upx' headerColor='#999'
		 @cancel="cancelModel_del" @confirm="confirmModel_del">
			<view style="min-height: 90upx;line-height:90upx;padding: 40upx 24upx;text-align: center;font-size: 30upx;color: #4C4C4C;">
				您确认删除该联系人?
			</view>
		</myModal>
		<!-- /删除图片模态框 -->

		<!-- 提示 -->
		<myTipLayer ref="anRef" timer="3" autoClose="true"></myTipLayer>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				dangQiID: '', //档期id
				delObj: {
					isShowModal: false,
					id: '',
					ID: '',
				},
				manageArr: ['', '', '', '', ''],
				timeValue: '', //日期时间
				addSuccessObj: {
					isShowModal: false,
				},
				myInputSearchObj: {
					site: 'bottom',
					isShowCreated: true,
					showLoading: true,
					createName: '主持地点',
					type: 2,
					choiceObj: {},
					listData: []
				},
				myPlanObj: {
					site: 'bottom',
					isShowCreated: true,
					showLoading: true,
					createName: '婚礼策划',
					type: 1,
					choiceObj: {},
					listData: []
				},
				addObj: {
					isShowModal: false,
					inputValue: '',
					title: '',
					placeholder: '',
					type: 0,
				},
				contactsData: [{
					ID: 0,
					name: '',
					tel: '',
					ref1: 'name1Ref',
					ref2: 'tel1Ref',
					id: 1,
				}, ],
				isSubmitBtn: false,
				num: 0, //监测是不是全部填写了
			}
		},
		methods: {
			/* 编辑时获取信息 */
			getDangQiNews() {
				this.$show('正在加载');
				let url = '/xlapi/HostManage/HostUserManage/HostUser/GetAppion?id=' + this.dangQiID;
				this.$axios({
					mrthod: 'GET',
					url: url,
					success(res) {
						console.log(res)
						let getData = res.data.data;
						this.$refs.timeRef.onConfirm_dateTime({
							result: getData.Time
						}); //时间赋值
						this.$refs.hostAddress.setInputSearchValue({
							id: getData.HotelId,
							name: getData.HotelName
						}); //主持人地点赋值
						this.myInputSearchObj.choiceObj = {
							id: getData.HotelId,
							name: getData.HotelName
						};
						this.$refs.myPlan.setInputSearchValue({
							id: getData.PlanId,
							name: getData.PlanName
						}); //策划赋值
						this.myPlanObj.choiceObj = {
							id: getData.PlanId,
							name: getData.PlanName
						};
						res.data.hostAppionContInfos.forEach((item, index) => {
							if (index == 0) {
								this.contactsData[0].name = item.UserName;
								this.contactsData[0].tel = item.Phone;
								this.contactsData[0].ID = item.ID;
							} else {
								let id = index + 1;
								let ref1 = 'name' + id + 'Ref';
								let ref2 = 'tel' + id + 'Ref';
								this.contactsData.push({
									ID: item.ID,
									name: item.UserName,
									tel: item.Phone,
									ref1: ref1,
									ref2: ref2,
									id: id,
									options: [{
										text: '删除',
										style: {
											backgroundColor: '#FF0000',
											height: '100%'
										}
									}]
								});
							}
						})
						this.$nextTick(() => {
							this.contactsData.forEach(item => {
								this.$refs[item.ref1][0].inputValue = item.name;
								this.$refs[item.ref2][0].inputValue = item.tel;
							})
							this.$hide();
						})
					}
				})
			},
			cancelModel_del() {
				this.delObj.isShowModal = false;
			},
			confirmModel_del() {
				if(this.type=='add'){
					this.contactsData.forEach((item, index) => {
						if (this.delObj.id == item.id) {
							this.contactsData.splice(index, 1);
						}
					})
					this.$showTip('移除联系人成功','success');
				}else{
					if(this.delObj.ID==0){
						this.contactsData.forEach((item, index) => {
							if (this.delObj.id == item.id) {
								this.contactsData.splice(index, 1);
							}
						})
						this.$showTip('移除联系人成功','success');
					}else {
						let url = '/xlapi/HostManage/HostUserManage/HostUser/DelInsAppionCont';
						let data = {
							appioncontid: this.delObj.ID,
						}
						this.$axios({
							method: 'POST',
							url: url,
							data: data,
							success(res) {
								console.log(res)
								if(res.data.status){
									this.$showTip('移除联系人成功','success');
									this.contactsData.forEach((item, index) => {
										if (this.delObj.id == item.id) {
											this.contactsData.splice(index, 1);
										}
									})
								}
							}
						})
					}
				}
				this.delObj.isShowModal = false;
			},
			/* 删除 */
			bindClickDel(itemObj) {
				console.log(itemObj)
				this.delObj.isShowModal = true;
				this.delObj.id = itemObj.id;
				this.delObj.ID = itemObj.ID;
			},
			/* 成功提示框 */
			cancelModel2() {
				this.addSuccessObj.isShowModal = false;
			},
			/* 成功提示框 */
			confirmModel2() {
				uni.navigateTo({
					url: '../add-communication-record/add-communication-record?id=' + this.dangQiID + '&addType=1'
				});
				this.addSuccessObj.isShowModal = false;
			},
			/* 保存 */
			submit() {
				// return
				let time = this.timeValue;
				let hostAddress = this.myInputSearchObj.choiceObj;
				let myPlan = this.myPlanObj.choiceObj;
				if (this.valueIsNull(time)) {
					this.$showTip('请选择日期时间');
					return false;
				} else if (!hostAddress.id) {
					this.$showTip('请选择主持地点');
					return false;
				} else if (!myPlan.id) {
					this.$showTip('请选择婚礼策划');
					return false;
				}
				let num1 = 0;
				let num2 = 0;
				let tel = '';
				this.contactsData.forEach(item => {
					if (!this.valueIsNull(item.name)) {
						num1++;
						if (!this.valueIsNull(item.tel)) {
							num2++;
							tel = item.tel;
						}
					}
				})
				if (num1 == 0) {
					this.$showTip('至少有一个联系人');
					return false;
				}
				if (num2 == 0) {
					this.$showTip('至少有一个联系电话');
					return false;
				} else {
					if (!this.sureIsTel(tel)) {
						this.$showTip('请输入正确的电话号码');
						return false;
					}
				}
				let data = {};
				if (this.type == 'add') {
					data = {
						// 	hotelname	是	string	
						// planname	是	string	策划
						// time	是	string	时间 2019-08-05
						// hotelid	是	int	酒店id
						// planid	是	int	策划id
						time: time.value, //时间
						hotelname: hostAddress.name, //酒店
						planname: myPlan.name, //策划
						hotelid: hostAddress.id, //酒店id
						planid: myPlan.id, //策划id
					};
				} else {
					data = {
						id: this.dangQiID,
						time: time.value, //时间
						hotelname: hostAddress.name, //酒店
						planname: myPlan.name, //策划
						hotelid: hostAddress.id, //酒店id
						planid: myPlan.id, //策划id
					};
				}
				this.addRequest(data);
			},
			/* 添加请求 */
			addRequest(data) {
				this.$show('正在保存')
				let url = '';
				if (this.type == 'add') {
					url = '/xlapi/HostManage/HostUserManage/HostUser/InsAppion';
				} else {
					url = '/xlapi/HostManage/HostUserManage/HostUser/UpAppion';
				}

				this.$axios({
					method: 'POST',
					url: url,
					data: data,
					success(res) {
						console.log(res)
						if (res.data.status) {
							if (this.type == 'add') {
								let dangQiID = res.data.id;
								this.dangQiID = res.data.id;
								this.contactsData.forEach(item => {
									this.addContactsRequest(dangQiID, item);
								})
							} else {
								this.updateContactsRequest();
							}
						}
					}
				})
			},
			/* 修改联系人 */
			updateContactsRequest() {
				this.$hide()
				let dangQiID = this.dangQiID;
				let newArr = this.contactsData.map(item => {
					return {
						UserName: item.name,
						Phone: item.tel,
						AppionId: dangQiID,
						ID: item.ID,
					}
				})
				let url = '/xlapi/HostManage/HostUserManage/HostUser/UpAppionConts';
				let data = {
					appionid: dangQiID,
					data: newArr
				}
				this.$axios({
					method: 'POST',
					url: url,
					data: data,
					success(res) {
						// console.log(res)
						uni.navigateBack({
							delta: 1
						});
					}
				})
			},
			/* 添加联系人请求 */
			addContactsRequest(id, itemObj) {
				let data = {
					appionid: id, //档期id
					username: itemObj.name, //名字
					phone: itemObj.tel, //联系方式
				};
				let url = '/xlapi/HostManage/HostUserManage/HostUser/InsAppionCont';
				this.$axios({
					method: 'POST',
					url: url,
					data: data,
					success(res) {
						console.log(res)
						if (res.data.status) {
							this.$hide();
							this.addSuccessObj.isShowModal = true;
						}
					}
				})
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
			/* 新增联系人 */
			addContacts() {
				let contactsLength = this.contactsData.length;
				let id = contactsLength + 1;
				let ref1 = 'name' + id + 'Ref';
				let ref2 = 'tel' + id + 'Ref';
				this.contactsData.push({
					ID: 0,
					name: '',
					tel: '',
					ref1: ref1,
					ref2: ref2,
					id: id,
					options: [{
						text: '删除',
						style: {
							backgroundColor: '#FF0000',
							height: '100%'
						}
					}]
				});
			},
			/* 联系人 */
			getInputValue_name(obj) {
				// let myArr = [];
				// this.contactsData.forEach((item, index) => {
				// 	if (item.name == '' && item.tel == '') {
				// 		myArr.push(1)
				// 	}
				// })
				// console.log(myArr)
				// console.log(this.contactsData)
				// if (myArr.length == this.contactsData.length) {
				// 	this.manageArr.splice(3, 1, '')
				// } else {
				// 	this.manageArr.splice(3, 1, 11)
				// }
				this.contactsData.forEach(item => {
					if (item.id == obj.keyValue) {
						item.name = obj.value
					}
				})
			},
			/* 联系电话 */
			getInputValue_tel(obj) {
				// let myArr = [];
				// this.contactsData.forEach((item, index) => {
				// 	if (item.name == '' && item.tel == '') {
				// 		myArr.push(1)
				// 	}
				// })
				// if (myArr.length == this.contactsData.length) {
				// 	this.manageArr.splice(4, 1, '')
				// } else {
				// 	this.manageArr.splice(4, 1, 11)
				// }

				this.contactsData.forEach(item => {
					if (item.id == obj.keyValue) {
						item.tel = obj.value
					}
				})
			},
			hide() {
				this.$refs.hostAddress.hide();
				this.$refs.myPlan.hide();
			},
			getDateTimeValue(val) {
				console.log(val)
				this.timeValue = val;
				this.manageArr.splice(0, 1, val.value)
			},
			/* 创建地点 */
			createHostAddress(obj) {
				this.addObj.isShowModal = true;
				this.addObj.inputValue = obj.val;
				this.addObj.type = obj.type;
				if (obj.type == 1) {
					this.addObj.title = '新建婚礼策划';
					this.addObj.placeholder = '请输入婚礼策划名称';
				} else {
					this.addObj.title = '新建主持地点';
					this.addObj.placeholder = '请输入主持地点';
				}
			},
			/* 获取主持地点数据 */
			hostAddressFocus(obj) {
				let key = obj.val;
				let type = obj.type;
				let url = '/xlapi/HostManage/HostUserManage/HostUser/GetCooper?key=' + key + '&type=' + type;
				this.$axios({
					method: 'GET',
					url: url,
					success(res) {
						// console.log(res)
						let resData = res.data.map(item => {
							return {
								name: item.Name,
								id: item.Id,
								isSelected: false
							}
						})
						if (resData.length != 0 && this.myInputSearchObj.choiceObj.id && type == 2) {
							resData.forEach(item => {
								if (item.id == this.myInputSearchObj.choiceObj.id) {
									item.isSelected = true;
								}
							})
						} else if (resData.length != 0 && this.myPlanObj.choiceObj.id && type == 1) {
							resData.forEach(item => {
								if (item.id == this.myPlanObj.choiceObj.id) {
									item.isSelected = true;
								}
							})
						}
						if (type == 1) {
							this.$refs.hostAddress.isShowListBox = false;
							this.myPlanObj.listData = resData;
						} else {
							this.$refs.myPlan.isShowListBox = false;
							this.myInputSearchObj.listData = resData;
						}
					}
				})
			},
			hostAddressChoice(obj) {
				if (obj.type == 1) { //选择主持地点
					this.myPlanObj.choiceObj = obj.itemObj;
					this.manageArr.splice(2, 1, obj.val)
				} else { //选择婚礼策划
					this.myInputSearchObj.choiceObj = obj.itemObj;
					this.manageArr.splice(1, 1, obj.val)
				}
			},
			cancelModel() {
				this.addObj.isShowModal = false;
			},
			confirmModel() {
				let url = '/xlapi/HostManage/HostUserManage/HostUser/InsCooper';
				let data = {
					name: this.addObj.inputValue,
					type: this.addObj.type
				}
				this.$axios({
					method: 'POST',
					url: url,
					data: data,
					success(res) {
						// console.log(res)
						if (res.data.status) {
							this.$showTip('添加成功', 'success');
							this.addObj.isShowModal = false;
							if (this.addObj.type == 1) {
								this.$refs.myPlan.setInputSearchValue({
									name: res.data.name,
									id: res.data.id
								});
								this.$refs.myPlan.isShowListBox = false;
							} else {
								this.$refs.hostAddress.isShowListBox = false;
								this.$refs.hostAddress.setInputSearchValue({
									name: res.data.name,
									id: res.data.id
								});
							}
						}
					}
				})

			}
		},
		onLoad(options) {
			
			this.dangQiID = options.id;
			this.type = options.type;
			if(this.type=='update'){
				uni.setNavigationBarTitle({
					title: '编辑档期'
				});
			}else {
				uni.setNavigationBarTitle({
					title: '添加档期'
				});
			}
		},
		onShow() {
			if (this.type == 'update') {
				this.getDangQiNews();
			}
			this.contactsData.forEach(item => {
				this.$refs[item.ref1][0].inputValue = item.name;
				this.$refs[item.ref2][0].inputValue = item.tel;
			})
		},
		watch: {
			manageArr(val) {
				if (!this.valueIsNull(val[0]) && !this.valueIsNull(val[1]) && !this.valueIsNull(val[2]) && !this.valueIsNull(val[3])) {
					this.isSubmitBtn = true;
				} else {
					this.isSubmitBtn = false;
				}
			},
			contactsData: {
				deep: true,
				handler(val) {
					let myArr = [];
					val.forEach((item, index) => {
						if (item.name != '' && item.tel != '') {
							myArr.push(1)
						}
					})
					if (myArr.length>0) {
						this.manageArr.splice(3, 1, 11)
					} else {
						this.manageArr.splice(3, 1, '')
					}
				}
			}
		}
	}
</script>

<style scoped>
	.scroll_inner {
		padding: 18upx 30upx;
		box-sizing: border-box;
	}

	.base_news {
		background: #F8F8F8;
		padding: 0 25upx;
		box-sizing: border-box;
		border-radius: 10upx;
	}


	.base_news_list {
		height: 105upx;
	}

	.base_news_list:last-child>>>.list {
		border-bottom: 0;
	}

	.addInput {
		width: 450upx;
		height: 88upx;
		line-height: 88upx;
		padding: 0 38upx;
		box-sizing: border-box;
		background: rgba(245, 245, 245, 1);
		border-radius: 44upx;
		margin: 10upx auto;
	}

	.contants {
		margin-top: 30upx;
	}

	.contants .content {
		padding: 0 25upx;
		background: #F8F8F8;
	}

	.addContacts {
		color: #F66D63;
		font-size: 28upx;
		text-align: center;
		margin-top: 64upx;
	}

	.confirm_btn {
		margin: 166upx 0;
	}
</style>
