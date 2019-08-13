import Vue from 'vue'
import App from './App'
import store from '@/store/index.js'
import config from '@/config/config.js'
import manjs from '@/static/js/default/main.js'
import ajax from '@/api/axios.js'
import upFile from "@/common/UpFileImg.js"
import tips from "@/common/loading.js"
import footer from '@/components/tabBar/tabBar_footer.vue';
import myTipLayer from '@/components/my-tip-layer/my-tip-layer.vue';
import myList from '@/components/my-list/my-list.vue';
import myModal from '@/components/my-modal/my-modal.vue';
import myPicker from '@/components/my-picker/w-picker.vue';
import uniSwipeAction from "@/components/uni-swipe-action/uni-swipe-action.vue"
import myBottomSlideIn from '@/components/my-bottom-slideIn/my-bottom-slideIn';

Vue.component('footers',footer);//底部导航
Vue.component('myTipLayer',myTipLayer);//提示(错误,成功...)  
Vue.component('myList',myList);//list 
Vue.component('myModal',myModal);//模态框 
Vue.component('myPicker',myPicker);//时间选择器 
Vue.component('uniSwipeAction',uniSwipeAction);//侧滑 
Vue.component('myBottomSlideIn',myBottomSlideIn);//底部滑出 

// 挂载原型方法
Vue.prototype.$config = config.config; //config 配置
Vue.prototype.$store = store.store; //Vuex
Vue.prototype.$manjs = manjs; //man.js 全局引入
Vue.prototype.$axios = ajax.axios; //请求封装
Vue.prototype.$PictureImg = upFile.PictureImg; //选择图片
Vue.prototype.$uploadTasks = upFile.uploadTasks; //上传图片
Vue.prototype.$deteleImg = upFile.deteleImg;		//删除图片
Vue.prototype.$show = tips.show			//加载中显示
Vue.prototype.$hide = tips.hide			//关闭加载中
Vue.prototype.$modal = tips.Modal		//model框
Vue.prototype.$showTip = tips.showTip	//提示框:注意:调用方式=>this.$showTip('哈哈哈','success');success为类型  默认为error



Vue.config.productionTip = false;



App.mpType = 'app';

const app = new Vue({
	...App
})
app.$mount()
