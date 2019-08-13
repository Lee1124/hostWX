<!-- 预约信息 -->
<template>
	<view class="yuYueNews">
		<!-- 导航栏阴影 -->
		<view class="my-order-top-nav-shadow"></view>
		<!-- /导航栏阴影 -->
		<view class="listBox">
			<myList @getTimeValue='getTimeValue' labelText='预约时间' type='time' ref='timeRef' mode='YY年MM月DD日' showCurrentTime='true'></myList>
		</view>
		<view class="listBox">
			<myList @getInputValue='getInputValue_name' labelText='预约姓名' myPlaceholder='请输入您的姓名' ref='nameRef' inputHaveSlot='true'>
				<template slot='mySlot'>
					<view class="slectSex">
						<template v-for="(items,index) in sexData">
							<text class='sex' :key='index' :class="{'sex_selected':items.isSelected}" @click="selectSex(items)">{{items.name}}</text>
						</template>
					</view>
				</template>
			</myList>
		</view>
		<view class="listBox">
			<myList @getInputValue='getInputValue_tel' labelText='预约电话' myPlaceholder='请输入您的电话' ref='telRef'></myList>
		</view>

		<view class="btn-box">
			<button class="no-submit-btn" @click="submit" :class="{'yes-submit-btn':isSubmitBtn}">提交预约信息</button>
		</view>
		<!-- 提示 -->
		<myTipLayer ref="anRef" timer="3" autoClose="true"></myTipLayer>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				isSubmitBtn: false,
				timeValue: '',
				name: '',
				tel: '',
				sexData: [{
						name: '女士',
						isSelected: true
					},
					{
						name: '男士',
						isSelected: false
					}
				]
			}
		},
		methods: {
			/* 选择性别 */
			selectSex(itemObj){
				this.sexData.forEach(item=>{
					item.isSelected=false;
				})
				itemObj.isSelected=true;
			},
			/* 时间选择 */
			getTimeValue(val) {
				this.timeValue = val.value;
				this.isAllNews();
			},
			getInputValue_name(val) {
				this.name = val.value;
				this.isAllNews();
			},
			getInputValue_tel(val) {
				this.tel = val.value;
				this.isAllNews();
			},
			/* 判断是不是信息填完 */
			isAllNews() {
				if (this.timeValue != '' && this.name != '' && this.tel != '') {
					this.isSubmitBtn = true;
				} else {
					this.isSubmitBtn = false;
				}
			},
			/* 提交 */
			submit() {
				if (this.isSubmitBtn) {
					let sex='';
					this.sexData.forEach(item=>{
						if(item.isSelected){
							sex=item.name;
						}
					})
					let that = this;
					uni.getStorage({
						key: 'openId',
						success(res) {
							// console.log(res);
							let openId = res.data;
							let url = '/xlapi/HostManage/HostUserManage/HostUser/ExitisAppionTime';
							let data = {
								openid: openId
							}
							that.$axios({
								method: 'POST',
								url: url,
								data: data,
								success(res) {
									// console.log(res)
									if (!res.data.status) {
										this.$showTip(res.data.msg, 'success');
										return false;
									} else {
										let url2 = '/xlapi/HostManage/HostUserManage/HostUser/InsAppionTime';
										let data2 = {
											username: that.name, //预约姓名
											phone: that.tel, //电话
											openid: openId, //openId
											sex: sex, //性别
											time: that.timeValue, //预约时间
										}
										that.$axios({
											method: 'POST',
											url: url2,
											data: data2,
											success(res) {
												console.log(res);
												uni.navigateTo({
													url: '../yuYue-success/yuYue-success',
												});
											}
										})
									}
								}
							})
						}
					});

				} else {
					if (this.name == '' || (this.name.length > 0 && this.name.trim().length == 0)) {
						this.$showTip('请输入您的姓名');
					} else if (this.tel == '' || (this.tel.length > 0 && this.tel.trim().length == 0)) {
						this.$showTip('请输入您的电话');
					}
				}
			}
		},
		onLoad(options) {
			this.$refs.timeRef.timeValue = options.year + '年' + options.month + '月' + options.day + '日';
			this.$refs.timeRef.defaultTimeValue = options.year + '-' + options.month + '-' + options.day;
		},
		onShow() {
			// this.$refs.ref1.setInputValue('哈哈哈啊');
			uni.setStorage({
				key: 'openId',
				data: 'oufDE5KztD6rBxAe0Scg_Ojygcl0',
				success: function() {
					console.log('success');
				}
			});
		},
		watch: {

		}
	}
</script>

<style scoped>
	.listBox {
		line-height: 105upx;
		height: auto;
		padding: 0 30upx;
		box-sizing: border-box;
	}

	.slectSex {
		text-align: right;
		color: #BBBBBB;
		font-weight: 700;
	}

	.slectSex .sex {
		margin-right: 40upx;
	}
	.slectSex .sex.sex_selected {
		color: #F66D63;
	}

	.slectSex .sex:last-child {
		margin-right: 0;
	}

	.btn-box {
		margin-top: 440upx;
		text-align: center;
	}
</style>
