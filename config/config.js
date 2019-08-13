/**
 *   获取当前用户存储桶信息
 * 
 * */
 
 import ajax from '@/api/axios.js'
 
async function config(){
	 return await new Promise (( relve, reject ) => {
		this.$axios({
		 	url:'/xlapi/CameraManage/CameraUploadImgManage/CameraUploadImgManage/GetBucketRegionByBranchId',
			method:'POST',
		 	success(res){
		 		relve(res)
			},
			fail(err){
				reject(err) 
			}
		})
	})
};



 export default {
	config
 }