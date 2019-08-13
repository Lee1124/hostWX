<template>
	<div style='width: 100%;height: 100%;'>
		<div v-for='( item , index ) in list' :key='index' @click='handlerDynamId( item , index )' class='box-item'>
			<div class='box-item-bar'>
				<!-- 评论文字部分 -->
				<div class='comment-box' :data='item.content'>
					<text :class='{"shouqi":item.content.length > 150}'>{{ item.content }}</text>
					<span class='is-show' v-if='item.content.length > 150' @click='handlerishow( index )'>{{ item.isShow? '全部':'收起'}}</span>
				</div>
				<!-- 图片区 -->
				<div v-if='item.fileList.length > 0'>
					<div v-if='item.type' class='img'>
						<image @click="handlerViewPicture( cos+items ,item.fileList )" v-for='( items , indexs ) in item.fileList' :src="cos+items" mode="" :key='items'></image>
					</div>
					<div v-else class='video-box'>
						<div class="video">
							<video id='myVideo' @click="handlervideo" v-for='( items , indexs ) in item.fileList' :src="cos+items" controls
							 :key='items'></video>
						</div>
					</div>
				</div>
				<!-- 点赞 时间 评论 -->
				<p class='box-item-footer'>
					<span class='time'>{{ item.time }}</span>
					<span>
						<span class='give' style='height: 25upx;' @click='handlerisGive( item , index )'>
							<!-- 点赞-icon -->
							<span class='give-icon' :class='{ "is-give":item.isGive }'></span>
							<span style='font-size: 24upx;height: 25upx;line-height: 25upx;margin-left: 10upx;' :style='{color:item.isGive? "#F66D63":"#999999"}'>{{ item.give }}</span>
						</span>
						<span v-if='user != 1' style='margin-left: 52upx;' @click='handlerComment( item , index )'>
							<!-- 评论-icon -->
							<span class='com-icon' style='height: 25upx;top: 2px;' ></span>
							<span style='font-size: 24upx;height: 25upx ;line-height: 25upx;margin-left: 10upx;color: #999999;'>评论</span>
						</span>
						<!-- 当前本人操作 -->
						<span v-else style='margin-left: 100upx;' @click='handlerUserEdit( item , index )'>
							<text style='font-size: 26upx;color: #BBBBBB;'>
								• • •
							</text>
						</span>
					</span>
				</p>
				<!-- 用户评论区 -->
				<div style='margin-top: 30upx;'>
					<div class='dynamic-box' @click='handlerDynamic( itemss , indexss )' v-for='( itemss , indexss ) in item.dynamicCommObjs'
					 :key='itemss'>
						<div>
							<image class='user-icon-item' :src="itemss.icon" mode=""></image>
						</div>
						<div>
							<p class='user-name-item'>
								<span>{{ itemss.nickname }}</span>
								<span>{{ itemss.time }}</span>
							</p>
							<div class='user-content-item'>
								{{ itemss.content }}
							</div>
							<div class='user-content-item--childern' v-if='itemss.pmodel'>
								<div style='word-wrap: break-word;'>
									<span style='color: #5996F8;display: inline-block;min-width: 70upx;'>{{ itemss.pmodel.nickname }}:</span>{{ itemss.pmodel.content }}
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<!-- 评论弹出 -->
		<div class='comment' @click='flage=false' v-if='flage' :style='{width:screenWidth+"px !important",height:screenHeight+"px !important"}'>
			<div class='comment-boxs' @click.stop>
				<input type="text" focus cursor-spacing='50rpx' v-model='text' placeholder="有什么想说的呢..." value="" />
				<span @click='handlerFaComment(text)'>发送</span>
			</div>
		</div>
		<!-- 回复评论 -->
		<reply :width="screenWidth" v-if='Repflage' :top='574' :name='"Repflage"' ref='replys' :height="screenHeight">
			<div slot='reply-content'>
				<div class='replys'>
					<div>
						<image class='user-icon-item' :src="RowItem.icon" mode=""></image>
					</div>
					<div class='user-name-items'>
						<span> {{ RowItem.nickname }} </span>
						<div class='user-content-item'>
							{{ RowItem.content }}
						</div>
					</div>
				</div>
				<!-- 操作 -->
				<div class='reply-operation'>
					<div  @click='handlerDynamics()'>
						<i class='reply-operation-icon'></i>
						<span class='reply-operation-text'>回复评论</span>
					</div>
					<div @click='handlerDynamicsDetel()'>
						<i class='reply-operation-icon'></i>
						<span class='reply-operation-text'>删除评论</span>
					</div>
				</div>
			</div>
		</reply>
		<!-- 编辑 删除动态 -->
		<reply :height="screenHeight" :top='400' :width="screenWidth" :name='"RepflagEdit"' v-if='RepflagEdit' ref='replyEdit'>
			<div slot='reply-content'>
				<!-- 操作 -->
				<div class='repflag-edit'>
					<div @click='hanlderGetDynamic()'>编辑</div>
					<div @click='handlerDetelDynamic()'>删除</div>
				</div>
			</div>
		</reply>
		
		<!-- 提示 -->
		<myTipLayer ref="anRef" timer="3" autoClose="true"></myTipLayer>
	</div>
</template>

<script>
	import reply from '../Reply-tips/Reply-tips'
	export default {
		props: {
			data: {
				type: Array,
				default: []
			}
		},
		components: {
			reply
		},
		data() {
			return {
				cos: 'http://hostuser-1256392453.cos.ap-chengdu.myqcloud.com',
				user: 1, //当前用户
				list: [], //列表数据
				screenHeight: 0, //屏幕高度
				screenWidth: 0, //屏幕宽度
				flage: false, //评论弹窗
				text: '', //评论内容
				DataItem: null, //当前动态数据
				Repflage: false, //回复弹窗
				RowItem: null, //当前一级评论
				Dynamic: 'add',
				DynamId: null, //当前动态id
				index:null,			//当前动态下标
				RowIndex:null			,//当前评论下标
				RepflagEdit:false			,//编辑或者删除
				DataIndex:null				//当前动态下标
			}
		},
		methods: {
			// 查看图片
			handlerViewPicture( path , data){    
				let ImgList = data.map( item => {
					return this.cos+item.path
				})
				wx.previewImage({
				  current: path, // 当前显示图片的http链接
				  urls:ImgList // 需要预览的图片http链接列表
				})
				
			},
			// 删除动态
			handlerDetelDynamic(){
				let id = this.DynamId
				this.$modal('提示','是否要删除此动态?',()=>{
					this.$axios({
						url: '/xlapi/HostManage/DynamicManage/Dynamic/DelDynamic',
						method: 'get',
						data: { id },
						success(res) {
							if( res.data.status ){
								this.list.splice(this.DataIndex,1)
							}
						},
						fail( err ) {
							console.log(res)
						}
					})
				})
			},
			// 动态编辑
			hanlderGetDynamic(){
				let id = this.DataItem.id
				uni.navigateTo({
					url:'add-dynamic/add-dynamic?id='+id
				});
			},
			// 编辑操作
			handlerUserEdit( data , index ){
				this.RepflagEdit = true
				this.$nextTick(() => {
					this.$refs.replyEdit.reply = true
				})
				this.DataItem = data;
				this.DataIndex = index;
			},
			// 删除评论
			handlerDynamicsDetel(){
				this.$modal('提示','是否要删除此评论?',()=>{
					this.$show('删除中...')
					let id = this.RowItem.id
					this.$axios({
						url: '/xlapi/HostManage/DynamicManage/Dynamic/DelDynaComm',
						method: 'get',
						data: { id },
						success(res) {
							if( res.data.status ){
								this.$showTip('删除评论成功','success')
								this.flage = false
								this.Repflage = false
								this.list[this.index].dynamicCommObjs.splice(this.RowIndex,1)
							}else{
								this.$showTip('删除失败')
							}
						},
						fail(err) {
							console.log(res)
						}
					})
				})
			},
			// 获取当前动态id
			handlerDynamId( data , index ) {
				this.DynamId = data.id
				this.index = index
			},
			// 回复一级评论
			handlerDynamics() {
				this.flage = true
			},
			// 点击当前以及评论
			handlerDynamic(data, index) {
				this.Repflage = true
				this.$nextTick(() => {
					this.$refs.replys.reply = true
				})
				this.RowItem = data
				this.RowIndex = index
				this.Dynamic = 'edit'
			},
			// 展开或者收起
			handlerishow(index) {
				this.list[index].isShow = !this.list[index].isShow
			},
			// 进入全屏播放
			handlervideo(a, b) {
				let LOL = ('myVideo' + a) + b
				let Video = wx.createVideoContext('myVideo')
				Video.requestFullScreen()
				Video.play()
			},
			// 点赞
			handlerisGive(data, index) {
				let a = this.list[index]
				a.isGive = !a.isGive
				if (a.isGive) {
					a.give += 1
				} else {
					a.give -= 1
				}
				this.$axios({
					url: '/xlapi/HostManage/DynamicManage/Dynamic/SetGive',
					method: 'get',
					data: {
						dynamid:data.id
					},
					success(res) {
						if( !res.data.status ){
							this.$showTip('网络错误')
						}
					},
					fail(err) {
						console.log(err)
					}
				})
			},
			// 评论弹出
			handlerComment(data, index) {
				this.DataItem = data
				this.flage = true
				this.Dynamic = 'add'
			},
			//发表评论
			handlerFaComment() {
				let fromdata = {
					Content: this.text,
				}
				if (this.Dynamic == 'add') {
					fromdata = {
						...fromdata,
						dynamid: this.DataItem.id,
						pid: 0
					}
				} else {
					fromdata = {
						...fromdata,
						dynamid: this.DynamId,
						pid: this.RowItem.id
					}
				}
				this.$axios({
					url: '/xlapi/HostManage/DynamicManage/Dynamic/InsDynaComm',
					method: 'POST',
					data: {
						...fromdata
					},
					success(res) {
						if( res.data.status ){
							this.$showTip('评论成功','success')
							this.flage = false
							this.handlerRefresh()
							this.text = ''
						}else{
							this.$showTip('评论失败')
						}
						
					},
					fail(err) {
						console.log(err)
					}
				})
			},
			// 刷新数据
			handlerRefresh(){
				this.$parent.list = []
				this.$parent.handlerInit()
			}
		},
		onLoad() {

		},
		onShow() {

		},
		onReady() {
			let _that = this
			wx.getSystemInfo({
				success(e) {
					_that.screenHeight = e.screenHeight
					_that.screenWidth = e.screenWidth
				}
			})
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
	page {
		width: 100%;
		height: 100%;
	}
	.repflag-edit > div:nth-child(1){
		border-bottom: 2upx solid #EEEEEE;
	}
	.repflag-edit > div:nth-child(2){
		margin: 20upx 0;
	}
	.repflag-edit > div{
		width: 100%;
		height: 115upx;
		text-align: center;
		height: 115upx;
		color: #4C4C4C;
		font-size: 30upx;
		line-height: 115upx;
		
	}
	.user-content-item--childern {
		border-left: 1px solid #ECECEC;
		padding-left: 10upx;
	}

	.user-content-item--childern>div {
		font-size: 26upx;
	}

	.reply-operation-text {
		font-size: 28upx;
		color: rgba(102, 102, 102, 1);
		margin-left: 20upx;
	}

	.reply-operation-icon {
		width: 40upx;
		height: 40upx;
		background-size: 100% !important;
		position: relative;
		top: 30upx;
	}

	.reply-operation>div:nth-child(1) i {
		background: url(../../../static/icon/Reply.png) no-repeat;
	}

	.reply-operation>div:nth-child(2) i {
		background: url(../../../static/icon/detel.png) no-repeat;
	}

	.reply-operation,
	.reply-operation>div {
		width: 100%;
		height: 100%;
	}

	.reply-operation>div {
		height: 100upx;
		display: flex;
		justify-content: flex-start;
		margin: 15upx 0;
		line-height: 100upx;
	}

	.user-content-item {
		font-size: 28upx;
		color: #666666;
		margin: 28upx 0;
	}

	.user-name-item {
		display: flex;
		justify-content: space-between;
	}

	.user-content-item {
		width: 100%;
		height: 72upx;
		text-overflow: -o-ellipsis-lastline;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box !important;
		-webkit-line-clamp: 2;
		line-clamp: 2;
		-webkit-box-orient: vertical;
		word-wrap: break-word;
	}

	.user-name-items span:nth-child(1),
	.user-name-item span:nth-child(1) {
		font-size: 28upx;
		color: #444444;
	}

	.user-name-item span:nth-child(2) {
		font-size: 20upx;
		color: #BBBBBB;
	}

	.user-icon-item {
		width: 66upx;
		height: 66upx;
		border-radius: 50%;
	}

	.dynamic-box {
		width: 100%;
		display: flex;
		padding-top: 20upx;
		padding-bottom: 30upx;
	}

	.replys {
		width: 100%;
		display: flex;
		border-bottom: 2upx solid #DDDDDD;
	}

	.replys>div:nth-child(1),
	.dynamic-box>div:nth-child(1) {
		width: 120upx;
		height: 100%;
		text-align: center;
	}

	.replys>div:nth-child(1) {
		width: 70upx;
		margin-right: 30upx;
	}

	.replys>div:nth-child(2),
	.dynamic-box>div:nth-child(2) {
		width: calc(100% - 120upx);
		height: 100%;
	}

	.comment {
		position: fixed;
		top: 0;
		left: 0;
		background: rgba(0, 0, 0, .5);
		z-index: 999;
	}

	.comment-boxs {
		width: 100%;
		height: 120upx;
		background: rgba(243, 243, 243, 1);
		box-sizing: border-box;
		padding: 20upx 31upx;
		line-height: 120upx;
		position: absolute;
		left: 0;
		bottom: 0;
	}

	.comment-boxs input {
		background: #FFFFFF;
		display: inline-block;
		width: 85%;
		height: 70upx;
		font-size: 28upx;
		border-radius: 10upx;
		box-sizing: border-box;
		padding: 0 10upx;
	}

	.comment-boxs span {
		padding-left: 40upx;
		position: relative;
		top: -22.5upx;
		font-size: 28upx;
		color: #5996F8;
	}

	.com-icon {
		background: url(../../../static/icon/comment-icon.png) no-repeat;
		background-size: 100%;
	}

	.give-icon,
	.com-icon {
		display: inline-block;
		width: 29upx;
		height: 28upx;
		position: relative;
	}

	.give-icon {
		top: 3upx;
		background: url(../../../static/icon/praise.png) no-repeat;
		background-size: 100%;
	}

	.is-give {
		background: url(../../../static/icon/praise-select.png);
		background-size: 100%;
	}

	.box-item-footer {
		width: 100%;
		height: 60upx;
		line-height: 60upx;
		position: relative;
	}

	.box-item-footer>span:nth-child(2) {
		position: absolute;
		width: 30%;
		right: 0;
		top: 0;
		bottom: 0;
		margin: auto;

	}

	.box-item-footer .time,
	.box-item-footer .give {
		font-size: 22upx;
		color: rgba(187, 187, 187, 1);
	}

	.video-box,
	.img {
		margin: 45upx 0;
	}

	.box-item-bar {
		box-sizing: border-box;
		padding: 55rpx 30rpx;
	}

	.box-item {
		border-bottom: 8upx solid #FFFFFF;
	}

	.video video {
		width: 100%;
		height: 100%;
		border-radius: 10upx;
	}

	.video-box {
		width: 100%;
		height: 300upx;
		position: relative;
	}

	.video {
		width: 510upx;
		height: 300upx;
		position: absolute;
		top: 0;
		left: 0;
	}

	.img {
		width: 100%;
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		justify-content: flex-start;
	}

	.img image {
		width: 180upx;
		height: 180upx;
		margin-bottom: 10upx;
		margin-right: 10upx;
	}

	.comment-box {
		width: 100%;
		height: auto;
		position: relative;
		font-size: 28upx;
	}

	.comment-box text {
		width: 100%;
		height: 100%;
		display: inline-block;
		word-wrap: break-word;
		background: #f8f8f8;
	}

	.shouqi {
		width: 100% !important;
		height: 185upx !important;
		text-overflow: -o-ellipsis-lastline;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box !important;
		-webkit-line-clamp: 5;
		line-clamp: 5;
		-webkit-box-orient: vertical;
	}

	.is-show {
		height: 32upx;
		font-size: 28upx;
		display: inline-block;
		color: #5A83AB;
	}
</style>
