import manjs from '@/static/js/default/main.js'
/**
 *  使用 ES6 export default
 * 
 * 		请求封装 -- api 
 * 
 * */
async function axios(param) {

	// 参数是否正确
	if (typeof param != 'object') {
		throw 'this is no object'
		return
	}

	// 设置默认域名
	// let  dataBaseURL = 'https://xilai99.com'
	let dataBaseURL = 'http://192.168.1.253:8092'
	// let  dataBaseURL = 'http://192.168.1.73:8088'
	// let  dataBaseURL = 'http://127.0.0.1:8080'
	// let dataBaseURL;
	// try {
	// 	dataBaseURL = uni.getStorageSync('userInfo').split('|')[8];
	// 	
	// } catch (e) {
	// 	//TODO handle the exception
	// }

	// 继承 父级this
	let that = this

	// 默认参数
	let opstion = {
		url: 'v2transapi',
		method: 'get',
		data: {},
		header: {
			Authorization: '1|1|||||ooUwn44kalJU-4Fuc2iMRQkF9j1g|1|1|rlH76Bca5RzsLYWzz4Q55eseCscRTzlTJQCKKuBBH/l3uVFL250JTiHxvMaRg9Rm' //uni.getStorageSync('AuthorizationStr')
		},
		success() {
			return {}
		},
		fail() {
			return {}
		}
	}

	// 是否为 get 请求
	if (param.method == 'get' || param.method == 'GET') {
		//param.url = param.url + Splicing_URL(param.data)
	}
	// 合并对象
	let FROM_DATA_DEFALT = { ...opstion,
		...param
	}

	return await new Promise((resolve, reject) => {
		uni.request({
			url: dataBaseURL + FROM_DATA_DEFALT.url,
			method: FROM_DATA_DEFALT.method,
			data: {
				...FROM_DATA_DEFALT.data
			},
			header: {
				...FROM_DATA_DEFALT.header
			},
			success(res) {
				FROM_DATA_DEFALT.success.call(that, res);
			},
			fail(err) {
				FROM_DATA_DEFALT.success.call(that, err);
			}
		});

	})

}

// get 地址拼接
const Splicing_URL = (dataObj) => {
	let url = ''
	let dataObjArr = []
	if (dataObj == '') {
		return ''
	}
	for (var key in dataObj) {
		if (dataObj.hasOwnProperty(key)) {
			dataObjArr.push(key);
			if (dataObjArr.length == 1) {
				url = '?' + key + '=' + dataObj[key];
			} else {
				url = '&' + key + '=' + dataObj[key];
			}
		}
	}
	return url
}

export default {
	axios
}
