/**
 *  使用 ES6 export default 方法暴露
 * 
 *  图片上传 or  图片删除  
 *  视频上传 or  视频删除
 * 
 * */

import COS from '@/static/js/default/cos-wx-sdk-v5.js'
import ajax from "@/api/axios.js"
import manjs from '@/static/js/default/main.js'

/**
 * 生成唯一id
 * 
 * */
const newGuid = () => {
	var guid = "";
	for (var i = 1; i <= 32; i++) {
		var n = Math.floor(Math.random() * 16.0).toString(16);
		guid += n;
		if ((i == 8) || (i == 12) || (i == 16) || (i == 20))
			guid += "-";
	}
	return guid;
}

/**
 * 图片选择
 * @method PictureImg
 * @for PictureImg
 * @param {Object}
 * @return {callblck} 方法回调
 */
async function PictureImg() {
	return await new Promise((relve, reject) => {
		uni.chooseImage({
			count: 9, //默认图片9
			sizeType: ['compressed'], //可以指定是原图还是压缩图，默认二者都有
			sourceType: ['album', 'camera'], //从相册选择
			success(res) {
				relve(res)
			},
			fail(err) {
				reject(err)
			}
		});
	})
}

/**
 * 图片上传
 * @method UpImg
 * @for UpImg
 * @param {Object}
 * @return {callblck} 方法回调
 */
async function uploadTasks(param) {

	let cos = new COS({
		getAuthorization: function Authorization(params, callback) {
			ajax.axios({
				url: '/xlapi/HostManage/HostUserManage/BaseUser/gettxkey',
				data: {
					strModel: 'POST',
					pathname: '/', //只能传 /
					qheaderlist: '',
					qurlparamlist: '',
					strtime: '',
				},
				success(res) {
					callback({
						Authorization: res.data,
					});
				}
			})
		}
	});

	if (typeof param != 'object') {
		throw 'this is no object';
		return;
	}

	// 继承父级this
	let that = this;

	// 设置存储桶信息
	let config = this.$store.state.config


	return await new Promise((relve, err) => {
		param.files.forEach((item, i) => {
			let deml = item.path.substring(item.path.lastIndexOf('.'))
			let branchid = manjs.getkevalue().branchid
			let sum = newGuid()
			cos.postObject({
				Bucket: 'hostuser-1256392453',//config.Bucket
				Region: 'ap-chengdu', //config.Region
				Key: param.key + `${ param.guid? '/'+sum:''}` + deml,
				FilePath: item.path
			}, function(a, b) {
				let data = b
				if(data.statusCode == 200 || data.statusCode == 204 ){
					data.headers = {}
					data.headers.Location = 'http://hostuser-1256392453.cos.ap-chengdu.myqcloud.com'+param.key + `${ param.guid? '/'+sum:''}` + deml
				}
				console.log( param.files )
				param.callback && param.callback.call(that, a, data , item.sort )
			})

		})



	})
}

/**
 *  图片删除
 * **/
function deteleImg(param) {

	let cos = new COS({
		getAuthorization: function Authorization(params, callback) {
			ajax.axios({
				url: '/xlapi/HostManage/HostUserManage/BaseUser/gettxkey',
				data: {
					strModel: 'DELETE',
					pathname: param.key, //只能传 /
					qheaderlist: '',
					qurlparamlist: '',
					strtime: '',
				},
				success(res) {
					callback({
						Authorization: res.data,
					});
				}
			})
		}
	});
	if (typeof param != 'object') {
		throw 'this is no object';
		return;
	}
	// 继承父级this
	let that = this;

	// 设置存储桶信息
	let config = this.$store.state.config

	cos.deleteObject({
		Bucket: 'hostuser-1256392453',//config.Bucket
		Region: 'ap-chengdu', //config.Region
		Key: param.key, // 替换为要删除的cos文件的名称
	}, function(err, data) {
		if (err) {
			throw '删除失败!';
		} else {
			param.callblack && param.callblack.call(that, data)
		}
	});
}


export default {
	PictureImg,
	uploadTasks,
	deteleImg
}
