<template>
	<view class="image-drag-sort">
		<view class="inner">
			<movable-area class="movable-area">
				<view class="item" v-for="(item, index) in list"  :key="index" @click="imageTap(index)" @longpress="longtap"
				 @touchend="touchend" @touchmove.stop="touchm">
					<image class="img" :src="item.imgUrl" mode="aspectFill"></image>
					<image v-if="item.isSelect" class="image-select" src="/static/image/home/select.png"></image>
				</view>
				<movable-view class="movable-view" :x="x" :y="y" direction="all" damping="5000" friction="1" v-show="active">
					<view class="item-move" :class="{'item-move-active': active}">
						<image class="img" :src="list[beginIndex].imgUrl" mode="aspectFill"></image>
					</view>
				</movable-view>
			</movable-area>
		</view>
	</view>
</template>
<script>
	let wrapW = 0, // 拖拽范围的总宽度
		wrapH = 0, // 拖拽范围的总高度
		wrapW2 = 0, // 可拖拽区域宽度
		wrapH2 = 0, // 可拖拽区域高度
		wrapTop = 0, // 拖拽范围的上边界坐标
		wrapLeft = 0, // 拖拽范围的左边界坐标
		wrapDragTop = 0, // 可拖拽范围的上边界坐标
		wrapDragLeft = 0, // 可拖拽范围的左边界坐标
		itemW = 0, // 拖拽元素的宽
		itemH = 0, // 拖拽元素的高
		itemXNun = 0 // 拖拽元素的列数
	export default {
		name: 'image-drag-sort',
		data() {
			return {
				lists: this.list,
				active: false, // 是否拖拽状态
				flag: false, // 是否可拖拽
				x: 0,
				y: 0,
				beginIndex: null // 当前拖拽元素的索引
			}
		},
		props: {
			list: {
				type: Array,
				default: function() {
					return []
				}
			},
			isSelect: {
				type: Boolean,
				default: function() {
					return false
				}
			}
		},
		mounted() {
			let l = this.list.length
			if (l) { // 有图片时初始化
				this.init()
			}
		},
		methods: {
			init() { // 初始化数据
				// 设置拖拽区域信息
				let wrap = uni.createSelectorQuery().in(this).select('.inner')
				wrap.boundingClientRect(data => {
					// console.log(data)
					wrapW = data.width // 设置拖拽范围的总宽度
					wrapH = data.height // 设置拖拽范围的总高度
					wrapTop = data.top // 设置拖拽范围的上边界坐标
					wrapLeft = data.left // 设置拖拽范围的左边界坐标
					this.setNodeWH()
				}).exec()
			},
			setNodeWH() { // 设置拖拽元素的宽高
				// 获取拽拖元素的信息
				let item = uni.createSelectorQuery().in(this).select('.item')
				item.boundingClientRect(data => {
					// console.log(data)
					itemW = data.width // 拖拽元素的宽度
					itemH = data.height // 拖拽元素的高度
					this.setDragData()
				}).exec()
			},
			setDragData() { // 设置拖拽区域及元素配置
				wrapDragTop = wrapTop + itemH / 2 // 设置拖拽范围上边距
				wrapDragLeft = wrapLeft + itemW / 2 // 设置可拖拽范围左边距
				wrapW2 = wrapW - itemW // 设置可拖拽区域宽度
				wrapH2 = wrapH - itemH // 设置可拖拽区域高度
				itemXNun = Math.round(wrapW / itemW) - 1 // 设置拖拽元素的列数
			},
			longtap(e) { // 长按
				const left = e.currentTarget.offsetLeft,
					top = e.currentTarget.offsetTop
				this.beginIndex = this.computationIndex({
					left: left,
					top: top
				}) // 获取所在位置索引
				this.x = left
				this.y = top
				this.active = true
				this.flag = true
			},
			computationIndex(e) { // 计算元素索引
				const left = e.left,
					top = e.top
				let index = 0, // 计算拖拽元素所在的索引位置
					x = Math.round(left / itemW), // 计算拖拽元素所在的横向索引位置
					y = Math.round(top / itemH), // 计算拖拽元素所在的纵向索引位置
					num = itemXNun * y
				if (x && !y) { // 第一行
					index = x
				}
				if (y) { // 第一行以下
					index = x + y + num
				}
				return index
			},
			touchm(e) { // 拖拽过程
				if (this.flag) {
					let x = e.touches[0].pageX - wrapDragLeft,
						y = e.touches[0].pageY - wrapDragTop
					if (x < 0) {
						x = 0
					}
					if (x > wrapW2) {
						x = wrapW2
					}
					if (y < 0) {
						y = 0
					}
					if (y > wrapH2) {
						y = wrapH2
					}
					this.x = x
					this.y = y
				}
			},
			touchend(e) { // 拖拽结束
				this.active = false
				const left = e.currentTarget.offsetLeft,
					top = e.currentTarget.offsetTop
				if (!this.flag || this.x === left && this.y === top) {
					return
				}
				const x = this.x, // 计算拖拽横向距离
					y = this.y, // 计算拖拽纵向距离
					itemNum = this.list.length - 1 // 拖拽元素的总数量
				let endIndex = this.computationIndex({
					left: x,
					top: y
				}) // 获取所在位置索引
				if (endIndex > itemNum) {
					endIndex = itemNum
				}
				// 交换位置
				const beginIndex = this.beginIndex // 当前拖拽元素索引
				let data = this.list,
					tem = data[beginIndex]
				data[beginIndex] = data[endIndex]
				data[endIndex] = tem
				this.flag = false
			},
			// 图片点击事件
			imageTap(index) {
				if (this.isSelect) {
					this.list[index].isSelect = !this.list[index].isSelect;
				} else {
					this.previewImage(index);
				}

			},
			// 预览图片
			previewImage(index) {
				uni.previewImage({
					current: this.list[index],
					urls: this.list
				})
			},
		}
	}
</script>

<style scoped>
	.img {
		width: 100%;
		height: 100%;
	}

	.image-select {
		width: 44upx;
		height: 44upx;
		position: absolute;
		bottom: 20upx;
		right: 20upx;
	}


	.image-drag-sort {
		width: 100%;
		/* padding: 30upx; */
		box-sizing: border-box;
	}

	.movable-area {
		width: 100%;
		height: auto;
		display: flex;
		flex-flow: wrap;
		justify-content: space-between;
	}

	.item {
		width: 315upx;
		height: 210upx;
		overflow: hidden;
		border-radius: 10upx;
		position: relative;
		margin-top: 20upx;
	}

	.item:not(:nth-child(3n + 3)) {
		/* margin-right: 3.4%; */
	}

	.item:nth-child(n + 4) {
		/* margin-top: 3.4%; */
	}

	.img-upload-btn {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		background-color: #F5F5F5;
	}

	.img-upload-btn .icon {
		width: 48upx;
		height: 48upx;
	}

	.img-upload-btn .text {
		font-size: 28upx;
		color: #CCCCCC;
		margin-top: 10upx;
	}

	.movable-view {
		width: 315upx;
		height: 210upx;
	}

	.item-move {
		width: 100%;
		height: 100%;
		overflow: hidden;
		border-radius: 10upx;
	}

	.item-move-active {
		box-shadow: 0 0 30px #000;
	}

	.prompt {
		font-size: 28upx;
		line-height: 40upx;
		color: #999;
		margin-top: 28upx;
	}
</style>
