<!-- 添加动态 -->
<template>
	<div v-if='type' class='box'>
		<div class='textarea'>
			<textarea v-model="text" placeholder="想要说点什么..." />
			</div>
		<div v-if='type == "video"' class='video-box'>
			<div v-if='video.length == 0 ' class='video' @click='handlerColoseVideo()'>
				<image src="../../../static/image/video/videoBg.png" mode=""></image>
			</div>
			<div v-else class='video' @click='handlervideo()' @touchstart="handleTouchStart" @touchend="handleTouchEnd" @longtap="handlerImglongTap(0)">
				<video id='myVideo' :src="video[0].path" controls ></video>
			</div>
		</div>
		<div v-if='type == "img"' class='img-box'>
			<div class='img'>
				<image  v-if='imglist.length > 0' v-for="( item , index ) in imglist" :key='index' @touchstart="handleTouchStart" @touchend="handleTouchEnd" @click="handlerViewPicture( item.path , index )" @longtap="handlerImglongTap(index)" :src="item.path" mode="" ></image>
				<image v-if='imglist.length < 9'  src="../../../static/icon/upload.png" @click='handlerChoiceImg()'mode=""></image>
			</div>
		</div>
		<div class='box_bao' @click='handlerPreservation()'>保存</div>
		<!-- 提示 -->
		<myTipLayer ref="anRef" timer="3" autoClose="true"></myTipLayer>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				id:0,			//新增是0
				// 上传图片集合
				imglist: [],
				// 上传视频
				video: [],
				// 发布类型
				type: null,
				text:'',
				startTime:null,
				endTime:null,
				screenHeight:null,			//获取屏幕高度
				screenWidth:null			,//获取屏幕宽度
				imgStart:null,				//拖拽
				imgEnd:null					,//被替换图片
				imgStartIndex:null,			//拖拽坐标
				imgEndIndex:null			//拖拽坐标
			}
		},
		watch:{
			"text":function ( a , b ){
				var str_arr = a.split('');
				// 检测到指定字符串 跳转至人员界面
				if( str_arr.indexOf('@') != -1){
					uni.redirectTo({
						url: '../Appoint-user/Appoint-user'
					});
				}
			}
		},
		methods: {
			// 拖拽排序
			handlerDropImg(){
				let imgStart = JSON.parse(this.imgStart)
				let EndIndex = this.imgEndIndex
				if(imgStart.type && JSON.parse(this.imgEnd).type){
					this.$axios({
						url:'/xlapi/HostManage/DynamicManage/Dynamic/DragDynamicFile',
						method:'post',
						data:{ 
							id:imgStart.Id,
							newsort: EndIndex
						},
						success(res){
							console.log( res )
						},
						fail(err){
							console.log( err )
						}
					})
				}
			},
			// 获取视频
			handlerColoseVideo(){
				let _that = this
				wx.chooseVideo({
				  sourceType: ['album','camera'],
				  maxDuration: 60,
				  camera: 'back',
				  success(res) {
					  _that.video = [{
						  path:res.tempFilePath,
						  type:0
					  }]
				  }
				})
			},
			// 进入全屏播放
			handlervideo(){
				if (this.endTime - this.startTime < 350) {      
					let data = wx.createVideoContext( 'myVideo' )
					data.requestFullScreen()
					data.play()
				} 
			},
			// 选择图片
			handlerChoiceImg(){
				this.$PictureImg().then(res => {
					let imglise = res.tempFiles.map( res => {
						return {
							...res,
							type:0
						}
					})
					this.imglist = [...this.imglist,...imglise]
					if(this.imglist.length > 10){
						this.imglist.splice(8)
					}
				})
				
			},
			// 查看图片
			handlerViewPicture( path , index ){
				if (this.endTime - this.startTime < 350) {      
					let ImgList = this.imglist.map( item => {
						return item.path
					})
					wx.previewImage({
					  current: path, // 当前显示图片的http链接
					  urls:ImgList // 需要预览的图片http链接列表
					})
				} 
				
			},
			//touch start
			handleTouchStart( e ) {    
			    this.startTime = e.timeStamp;
				this.handlerImgTouch( e , ( index )=> {
					this.imgStartIndex = index;								//获取坐标
					this.imgStart = JSON.stringify(this.imglist[index])  //copy图片
				})
			},  
			// 选择的图片
			handlerImgTouch( e , callback ){
				let x = e.changedTouches[0].clientX;		//获取横坐标
				let y = e.changedTouches[0].clientY;		//获取纵坐标
				if( this.type == 'video'){
					return
				}
				if( this.imglist.length < 2){
					return
				}
				// 计算当前列
				let column = parseInt( y  /  95) - 2
				// 计算当前行
				let row = parseInt( (x - 40)  /  95) + 1
				
				// 获取坐标定点图片 以及检查是否存在
				let IMGINDEX = ( ( column * 3 ) + row ) - 1;			//重置为下标
				
				callback && callback.call( this , IMGINDEX)
			},
			//touch end
			handleTouchEnd( e ) {    
			    this.endTime = e.timeStamp; 
				this.handlerImgTouch( e , ( index )=> {
					this.imgEndIndex = index;								//获取坐标
					this.imgEnd = JSON.stringify(this.imglist[index])  //copy图片
					// 拖拽
					if( this.imgEndIndex > this.imglist.length){
						this.imglist.splice(this.imgStartIndex,1)
						this.imglist.push(JSON.parse(this.imgStart))
					}
					else{
						this.imglist.splice(this.imgStartIndex,1,JSON.parse(this.imgEnd))
						this.imglist.splice(this.imgEndIndex,1,JSON.parse(this.imgStart))
					}
					this.handlerDropImg()
				})
			}, 
			// 长按删除
			handlerImglongTap( index ){
				let _that = this
				uni.showActionSheet({
					itemList: ['删除'],
					itemColor:'#f54545',
					success(res) {
						console.log(_that.video[0])
						if( _that.type == 'img'){
							res.tapIndex == 0 && _that.imglist[index].type == 0? _that.imglist.splice( index , 1 ) : _that.handlerTenCosFile(_that.imglist[index],index)
						}else{
							res.tapIndex == 0 && _that.video[0].type == 0? _that.video.splice( 0 , 1 ) : _that.handlerTenCosFile(_that.video[0],index)
						}
						
					},
					fail(res) {
						console.log(res.errMsg)
					}
				})
			},
			// 删除腾讯云文件
			handlerTenCosFile( data , index ){
				let key = data.path.split('com')[1]
				// //图片删除
				this.$deteleImg({
					key, //图片key
					callblack(res){
						this.handlerDetelSql( data.Id , index)
					}
				})
			},
			// 删除数据库文件
			handlerDetelSql( id ,index ){
				this.$axios({
					url:'/xlapi/HostManage/DynamicManage/Dynamic/DelDynamicFile',
					method:'GET',
					data:{ id },
					success(res){
						wx.showToast({
						  title: '删除成功',
						  icon: 'success',
						  duration: 2000,
						  mask:true
						})
						if( this.type == 'img'){
							this.imglist.splice( index , 1 ) 
						}else{
							this.video.splice( index , 1 ) 
						}
						
					},
					fail(err){
						console.log( err )
					}
				})
			},
			// 保存
			handlerPreservation(){
				this.$show('正在保存')
				let data = {
					id:this.id,
					content:this.text,
					type:this.type == 'img'? 1:0   //0 视频 1图片
				}
				this.$axios({
					url:'/xlapi/HostManage/DynamicManage/Dynamic/SetDynamic',
					method:'POST',
					data,
					success(res){
						let data = res.data
						if(data.id){
							this.id = data.id
						}
						this.$hide()
							if( this.type == 'img' ){
								let data = 	this.imglist.filter( res => {
									if( res.type == 0){
										return res
									}
								})
								if( data.length > 0 ){
									this.$show('正在保存图片...')
								}else{
									setTimeout(()=>{
										wx.redirectTo({
										  url: '../index'
										})
									},2000)
								}
								
							}else if( this.type == 'video' ){
								let data = 	this.video.filter( res => {
									if( res.type == 0){
										return res
									}
								})
								if( data.length > 0 ){
									this.$show('正在保存视频...')
								}else{
									setTimeout(()=>{
										wx.redirectTo({
										  url: '../index'
										})
									},2000)
								}
								
							}
							this.handlerSaveFile()
							
					},
					fail(err){
						console.log( err )
					}
				})
			},
			// 保存视频或者文件至腾讯云
			handlerSaveFile(){
				let file = this.type == 'img'? this.imglist : this.video
				let files = file.map( ( res , index ) => {
					if(res.type == 0){
						let obj = {
							...res,
							sort:index 
						}
						return obj
					}
				})
				if(files.length == 0){
					return
				}
				let filseList = files.filter( item => item)
				
				this.$uploadTasks({
					files:filseList,
					key:'/ceshi',
					guid:true,		//是否生成随机数
					callback(a,b,i){
						let url = b.headers.Location.split('com')[1];			//获取视频路径
						this.handlerSQLFile( url ,i)
					}
				})
			},
			// 保存至数据库
			handlerSQLFile( Fileurl , i ){
				this.$axios({
					url:'/xlapi/HostManage/DynamicManage/Dynamic/SetDynamicFile',
					method:'POST',
					data:{
						pid:this.id, //动态id
						url:Fileurl, //文件路径
						id:0,  //文件id
						type: this.type == 'img'? 1:0   ,//0 视频 1图片
						sort:i
					},
					success(res){
						if( res.data.status ){
							setTimeout(()=>{
								wx.redirectTo({
								  url: '../index'
								})
							},2000)
							wx.showToast({
							  title: '保存成功',
							  icon: 'success',
							  duration: 2000,
							  mask:true
							})
							this.$hide()
						}else{
							this.$showTip('保存失败!')
						}
					},
					fail(err){
						console.log( err )
					}
				})
			},
			/******************************************编辑*******************************************/ 
			// 获取动态详情
			handlerGetDynamic( id ){
				this.$axios({
					url:'/xlapi/HostManage/DynamicManage/Dynamic/GetDynamic',
					method:'GET',
					data:{ id },
					success(res){
						let data = res.data
						if( res.data.status ){
							this.type = data.Dynamic.Type == 0 ? 'video' : 'img'
							this.handlerLook( data )
						}
					},
					fail(err){
						console.log( err )
					}
				})
			},
			// 编辑页面渲染
			handlerLook( data ){
				let cosip = 'http://hostuser-1256392453.cos.ap-chengdu.myqcloud.com'
				this.id = data.Dynamic.Id
				this.text = data.Dynamic.Content
				if( this.type == 'video'){
					this.video = [{
						path:cosip+data.DynamicFile[0].Url,
						type:1,
						Id:data.DynamicFile[0].Id
					}]
				}else{
					this.imglist = data.DynamicFile.map( res=> {
						return {
							path:cosip+res.Url,
							type:1,
							Id:res.Id
						}
					})
				}
			}
		},
		onLoad( data ) {
			let _that = this
			if( JSON.stringify(data) == '{}'){
				uni.showActionSheet({
					itemList: ['视频动态', '图文动态'],
					success(res) {
						_that.type = res.tapIndex == 0 ? 'video' : 'img'
					},
					fail(res) {
						console.log(res.errMsg)
					}
				})
			}else{
				this.id = data.id
				console.log( this )
				this.handlerGetDynamic( data.id )
			}
			// 获取屏幕信息
			wx.getSystemInfo({
				success(e) {
					_that.screenHeight = e.screenHeight
					_that.screenWidth = e.screenWidth
				}
			})
			
		},
		onShow() {
			
		},
		onReady() {

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
	.box{
		box-sizing: border-box;
		padding: 0 90upx;
	}
	.textarea{
		width: 100%;
		height: 300upx;
		position: relative;
		margin-bottom: 50upx;
	}
	.textarea textarea{
		position: absolute;
		top: 0;
		bottom: 0;
		right: 0;
		left: 0;
		margin: auto;
		font-size: 30upx;
	}
	.box_bao{
		width:420upx;
		height:100upx;
		background:rgba(246,109,99,1);
		border-radius:50upx;
		text-align: center;
		line-height: 100upx;
		color: #FFFFFF;
		font-size: 32upx;
		position: fixed;
		right: 0;
		bottom: 150upx;
		left: 0;
		margin: auto;
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
		bottom: 0;
		right: 0;
		left: 0;
		margin: auto;
	}

	.video image,
	.video video {
		width: 100%;
		height: 100%;
		border-radius: 10upx;
	}
	.img-box{
		width: 100%;
	}
	.img{
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
</style>
