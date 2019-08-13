<!-- 列表 -->
<template>
	<view class="myList">
		<view class="list" v-if="type=='input'">
			<view class="list-label" :class="{'and3_w2':labelText.length==2&&Nword==3,'and4_w2':labelText.length==2&&Nword==4,'and4_w3':labelText.length==3&&Nword==4}"
			 :style="{color:labelColor}">{{labelText}}</view>
			<view class="list-form" :class="{'list-form-slot':inputHaveSlot}">
				<input type="text" v-model="inputValue" class="list-form-inner" :placeholder="myPlaceholder" placeholder-style="color:#bbb;" />
			</view>
			<view class="list-right" :class="{'list-right-slot':inputHaveSlot}">
				<slot name='mySlot'></slot>
			</view>
		</view>

		<view class="list" v-if="type=='inputSearch'">
			<view class="list-label" :class="{'and3_w2':labelText.length==2&&Nword==3,'and4_w2':labelText.length==2&&Nword==4,'and4_w3':labelText.length==3&&Nword==4}"
			 :style="{color:labelColor}">{{labelText}}</view>
			<view class="list-form">
				<input type="text" v-model="inputSearchValue" @click.stop="fn" @focus.stop="inputSearchFocus" @input="inputSearchFocus"
				 class="list-form-inner" :placeholder="myPlaceholder" placeholder-style="color:#bbb;" />
				<view class="list-show-box" :class="{'list-show-box-top':myInputSearchObj.site=='top','list-show-box-bottom':myInputSearchObj.site=='bottom'}">
					<view class="list-show commonScrollStyle" v-show="isShowListBox">
						<uniLoadMore status="loading" :show-icon='myInputSearchObj.showLoading' content-text=''></uniLoadMore>
						<view class="title title0" v-if="myInputSearchObj.isShowCreated">没有合适的{{myInputSearchObj.createName}}？ <text
							 class="add-btn" @click.stop="createEvent">立即创建</text>
						</view>
						<template v-for="(items,index) in myInputSearchObj.listData">
							<view class="title" :key='index' @click.stop="choiceThis(items)" :class="{selectedName:items.isSelected}">{{items.name}}</view>
						</template>
					</view>
				</view>
			</view>
		</view>

		<view class="list" v-if="type=='textarea'">
			<view class="list-label" :class="{'and3_w2':labelText.length==2&&Nword==3,'and4_w2':labelText.length==2&&Nword==4,'and4_w3':labelText.length==3&&Nword==4}"
			 :style="{color:labelColor}">{{labelText}}</view>
			<view class="list-form list-form-textArea" @click="openModel">
				<input v-show="textAreaText==''" type="text" class="list-form-inner" disabled="true" :placeholder="myPlaceholder"
				 placeholder-style="color:#bbb;" />
				<text class="returnText">{{textAreaText}}</text>
			</view>
		</view>
		<view class="list" v-if="type=='time'">
			<view class="list-label" :class="{'and3_w2':labelText.length==2&&Nword==3,'and4_w2':labelText.length==2&&Nword==4,'and4_w3':labelText.length==3&&Nword==4}"
			 :style="{color:labelColor}">{{labelText}}</view>
			<view class="list-form" @click="openPicker">
				<text class="returnText" v-if="mode=='YY年MM月DD日'">{{timeValue}}</text>
				<text class="returnText" v-if="mode=='YY.MM.DD'">{{timeValue}}</text>
				<text class="returnText" v-if="mode=='YY-MM-DD'">{{timeValue}}</text>
				<text class="returnText" v-if="mode=='YY/MM/DD'">{{timeValue}}</text>
			</view>
		</view>

		<view class="list" v-if="type=='selector'">
			<view class="list-label" :class="{'and3_w2':labelText.length==2&&Nword==3,'and4_w2':labelText.length==2&&Nword==4,'and4_w3':labelText.length==3&&Nword==4}"
			 :style="{color:labelColor}">{{labelText}}</view>
			<view class="list-form list-form-textArea" @click="openSelector">
				<input v-show="selectLabel==''" type="text" class="list-form-inner" disabled="true" :placeholder="myPlaceholder"
				 placeholder-style="color:#bbb;" />
				<text class="returnText">{{selectObj.label}}</text>
			</view>
		</view>

		<view class="list" v-if="type=='dateTime'">
			<view class="list-label" :class="{'and3_w2':labelText.length==2&&Nword==3,'and4_w2':labelText.length==2&&Nword==4,'and4_w3':labelText.length==3&&Nword==4}"
			 :style="{color:labelColor}">{{labelText}}</view>
			<view class="list-form" @click="openPicker_dateTime">
				<input type="text" @click="openPicker_dateTime" class="list-form-inner" disabled="true" v-if="dateTimeValue==''"
				 :placeholder="myPlaceholder" placeholder-style="color:#bbb;" />
				<text class="returnText" v-if="mode=='YY年MM月DD日'">{{dateTimeValue}}</text>
				<text class="returnText" v-if="mode=='YY.MM.DD'">{{dateTimeValue}}</text>
				<text class="returnText" v-if="mode=='YY-MM-DD'">{{dateTimeValue}}</text>
				<text class="returnText" v-if="mode=='YY/MM/DD'">{{dateTimeValue}}</text>
			</view>
		</view>

		<!-- 模态框 -->
		<myModal :show="isShowModal" :titleAlign='modelTitleAlign' @close="cancelModel" :title="myModalObj.title" @cancel="cancelModel"
		 @confirm="confirmModel">
			<view style="min-height: 90upx;padding: 28upx 24upx;">
				<textarea cursor-spacing='120px' maxlength=100 fixed='true' v-show="isShowModal" placeholder-style='color:#BBB;'
				 v-model="modalTextAreaValue" :placeholder="myModalObj.placeholder" style="background: #F5F5F5;width: 470upx;height:220upx;margin: 15upx auto;
					border-radius: 10upx;padding: 31upx;box-sizing: border-box;color: #222;
					font-size: 26upx;">
					</textarea>
			</view>
		</myModal>
		<!-- /模态框 -->

		<!-- 时间选择 -->
		<myPicker mode='date' :startYear='timeStartYear' endYear='2100' :current="true" @confirm="onConfirm" ref="picker"
		 themeColor="#FF6868" :selectList="selectList"></myPicker>
		<!-- 时间选择 (时分秒)-->
		<myPicker mode='dateTime' :startYear='timeStartYear' endYear='2100' :current="true" @confirm="onConfirm_dateTime" ref="picker_dateTime"
		 themeColor="#FF6868" :selectList="selectList"></myPicker>
		<!-- 单选 -->
		<myPicker v-if="selectList.length!=0" mode='selector' :selectList="selectList" :defaultVal="[1]" @confirm="onConfirm_select"
		 ref="selector" themeColor="#FF6868"></myPicker>

	</view>
</template>

<script>
	import uniLoadMore from "@/components/uni-load-more/uni-load-more.vue" //加载中
	export default {
		data() {
			return {
				inputValue: '',
				textAreaText: '',
				isShowModal: false,
				modalTextAreaValue: '',
				timeValue: '',
				dateTimeValue: '', //时分秒的时间
				defaultTimeValue: '', //默认就是-的时间
				selectObj: {}, //单选的对象
				selectLabel: '',
				inputSearchValue: '',
				inputSearchChoiceObj: {},
				isShowListBox: false,
			}
		},
		props: {

			/* 输入搜索 */
			myInputSearchObj: {
				type: Object,
				default () {
					return {
						site: 'bottom',
						isShowCreated: false,
						showLoading: false,
						createName: '',
						listData: []
					}
				}
			},
			/* 单选的json数据 */

			selectList: {
				type: Array,
				default () {
					return []
				}
			},
			/* label与几个字对齐 */
			/*如果需要y个字两端对齐，则为((x-y)/(y-1))em */
			Nword: {
				type: Number,
				default: 3
			},
			/* label文字 */
			labelText: {
				type: String,
				default: 'demo'
			},
			/* 左边标题颜色 */
			labelColor: {
				type: String,
				default () {
					return '#666'
				}
			},
			/* input插槽是否有内容 */
			inputHaveSlot: {
				type: Boolean,
				default: false
			},
			/* 类型 */
			type: {
				type: String,
				default () {
					return 'input'
				}
			},
			/* placeholder */
			myPlaceholder: {
				type: String,
				default () {
					return '请输入...'
				}
			},
			/* 模态框对象 */
			myModalObj: {
				type: Object,
				default () {
					return {
						placeholder: '请输入内容...',
						title: 'TITLE'
					}
				}
			},
			modelTitleAlign: {
				type: String,
				default: 'center'
			},
			/* 时间展示类型 */
			mode: {
				type: String,
				default: 'YY年MM月DD日'
			},
			/* 是否当前时间站位 */
			showCurrentTime: {
				type: Boolean,
				default: true
			},
			/* 开始年 */
			timeStartYear: {
				type: Number,
				default: 2000
			},
			/* keyValue是唯一的id */
			keyValue: {
				type: Number,
				default: 1
			}
		},
		methods: {
			fn() {

			},
			/* 为搜索创建后赋值 */
			setInputSearchValue(obj) {
				if (obj.name) {
					this.inputSearchValue = obj.name;
					this.inputSearchChoiceObj = obj;
					this.$emit('inputSearchChoiceThis', {
						val: this.inputSearchValue,
						type: this.myInputSearchObj.type,
						itemObj: this.inputSearchChoiceObj,
					})
				} else {
					this.$emit('inputSearchChoiceThis', {
						val: '',
						type: this.myInputSearchObj.type,
						itemObj: {},
					})
				}
			},
			/* 创建 */
			createEvent() {
				this.$emit('createEvent', {
					val: this.inputSearchValue,
					type: this.myInputSearchObj.type
				})
			},

			/* 隐藏搜索菜单 */
			hide() {
				this.isShowListBox = false;
			},
			/* 获取焦点 */
			inputSearchFocus() {
				this.inputFocus = true;
				this.isShowListBox = true;
				if (this.inputSearchChoiceObj.name && this.inputSearchChoiceObj.name != this.inputSearchValue) {
					this.setInputSearchValue({type: this.myInputSearchObj.type});
				}
				this.$emit('inputSearchFocus', {
					val: this.inputSearchValue,
					type: this.myInputSearchObj.type,
					itemObj: this.inputSearchChoiceObj,
				});
			},
			/* 搜索选择当前 */
			choiceThis(itemObj) {
				// this.isSelected=true;
				this.isShowListBox = false;
				this.inputSearchValue = itemObj.name;
				this.inputSearchChoiceObj = itemObj;
				this.$emit('inputSearchChoiceThis', {
					val: this.inputSearchValue,
					type: this.myInputSearchObj.type,
					itemObj: this.inputSearchChoiceObj,
				})
			},
			/* 此方法给input赋值 */
			setInputValue(val) {
				this.inputValue = val;
			},
			/* 此方法给textArea赋值 */
			setTextAreaValue(val) {
				this.textAreaText = val;
			},
			/* 此方法给seletor赋值 */
			setSelectValue(obj) {
				this.selectLabel = obj.label;
				this.selectObj = obj;
			},
			/* 打开模态框 */
			openModel() {
				this.isShowModal = true;
				this.modalTextAreaValue = this.textAreaText;
			},
			/* 关闭模态框 */
			cancelModel() {
				this.isShowModal = false;
			},
			/* 确认模态框 */
			confirmModel() {
				this.textAreaText = this.modalTextAreaValue;
				this.isShowModal = false;
			},
			/* 打开时间选择 */
			openPicker() {
				this.$refs.picker.show();
			},
			/* 打开年月日时分秒选择 */
			openPicker_dateTime() {
				this.$refs.picker_dateTime.show();
			},
			/* 单选 */
			openSelector() {
				this.$refs.selector.show();
			},
			/* 确认选择的时间 */
			onConfirm(val) {
				this.defaultTimeValue = val.result;
				if (this.mode == 'YY年MM月DD日') {
					let getTime = val.result.split('-');
					this.timeValue = getTime[0] + '年' + getTime[1] + '月' + getTime[2] + '日'
				} else if (this.mode == 'YY.MM.DD') {
					this.timeValue = val.result.replace(/\-/g, '.');
				} else if (this.mode == 'YY-MM-DD') {
					this.timeValue = val.result;
				} else if (this.mode == 'YY/MM/DD') {
					this.timeValue = val.result.replace(/\-/g, '/');
				}
			},
			/* 选择年月日时分秒确定 */
			onConfirm_dateTime(val) {
				console.log(val)
				this.dateTimeValue = val.result;
				// if(this.mode=='YY年MM月DD日'){
				// 	let getTime=val.result.split('-');
				// 	this.dateTimeValue=getTime[0]+'年'+getTime[1]+'月'+getTime[2]+'日'
				// }else if(this.mode=='YY.MM.DD'){
				// 	this.dateTimeValue=val.result.replace(/\-/g,'.');
				// }else if(this.mode=='YY-MM-DD'){
				// 	this.dateTimeValue=val.result;
				// }else if(this.mode=='YY/MM/DD'){
				// 	this.dateTimeValue=val.result.replace(/\-/g,'/');
				// }
			},
			/* 确认单选的选中 */
			onConfirm_select(val) {
				this.selectObj = val.checkArr;
				this.selectLabel = val.result;
			}
		},
		mounted() {
			if (this.type == 'time') {
				if (this.mode == 'YY年MM月DD日') {
					let getTime = this.defaultTimeValue.split('-');
					this.timeValue = getTime[0] + '年' + getTime[1] + '月' + getTime[2] + '日'
				} else if (this.mode == 'YY.MM.DD') {
					this.timeValue = this.defaultTimeValue.replace(/-/g,'.');
				} else if (this.mode == 'YY-MM-DD') {
					this.timeValue = this.defaultTimeValue;
				} else if (this.mode == 'YY/MM/DD') {
					this.timeValue = this.defaultTimeValue.replace(/-/g,'/');
				}
			} 
		},
		watch: {
			inputValue(val) {
				this.$emit('getInputValue', {
					value: val,
					keyValue: this.keyValue
				})
			},
			textAreaText(val) {
				this.$emit('getTextAreaValue', {
					value: val,
					keyValue: this.keyValue
				})
			},
			defaultTimeValue(val) {
				this.$emit('getTimeValue', {
					value: val,
					keyValue: this.keyValue
				})
			},
			dateTimeValue(val) {
				this.$emit('getDateTimeValue', {
					value: val,
					keyValue: this.keyValue
				})
			},
			selectObj: {
				deep: true,
				handler(val) {
					this.$emit('getSelectedValue', {
						value: val,
						keyValue: this.keyValue
					})
				}
			}
		}
	}
</script>

<style scoped>
	.myList {
		height: 100%;
	}

	.list {
		border-bottom: 1upx solid #DDDDDD;
		height: 100%;
		display: flex;
		font-size: 28upx;
	}

	.list-label {
		flex-basis: 27%;
		line-height: 105upx;
	}

	.list-form {
		line-height: 105upx;
		flex-basis: 73%;
		position: relative;
	}

	.list-form-slot {
		flex-basis: 50%;
	}

	.list-right-slot {
		flex-basis: 25%;
	}

	.list-form .list-form-inner {
		width: 100%;
		height: 100%;
		line-height: 105upx;
		color: #222;
		font-weight: 700;
	}

	.list-form-textArea {
		display: flex;
		align-items: center;
		line-height: 32upx;
		padding: 5upx 0 6upx;
		box-sizing: border-box;
		word-break: break-all;
	}

	.returnText {
		font-weight: 700;
	}

	.and3_w2 {
		letter-spacing: 1em;
		/* margin-right: -1em; */
	}

	.and4_w2 {
		letter-spacing: 2em;
		/* margin-right: -2em; */
	}

	.and4_w3 {
		letter-spacing: 0.5em;
		/* margin-right: -0.5em; */
	}

	/* 搜索框 */
	.list-show-box {
		position: absolute;
		width: 100%;
	}

	.list-show {
		max-height: 300upx;
		overflow: auto;
		font-size: 26upx;
		padding: 35upx;
		box-sizing: border-box;
		background: rgba(255, 255, 255, 1);
		box-shadow: 0px 9px 16px 0px rgba(0, 0, 0, 0.2);
		border-bottom-left-radius: 5upx;
		border-bottom-right-radius: 5upx;
		position: absolute;
		left: 0;
		z-index: 88;
		width: 100%;
		/* border: 1px solid rgba(49, 150, 250, 1);
		border-top: 0; */
	}

	.list-show-box-top {
		top: -2upx;
	}

	.list-show-box-top .list-show {
		/* border: 1px solid rgba(49, 150, 250, 1); */
		border-bottom: 0;
		bottom: -100%;
	}

	.list-show-box-bottom .list-show {
		top: 2upx;
	}

	.list-show .title {
		height: 60rpx;
		line-height: 60rpx;
		color: #222222;
	}

	.list-show .title .add-btn {
		text-decoration: underline;
		color: #3196FA;
	}

	.list-show .selectedName {
		color: #3196FA;
	}
</style>
