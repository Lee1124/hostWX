import Vue from 'vue';
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		config: {},
		videoUrl: '',
		videoName: '',
		videoSource: '',
		videoId: ''
	},
	mutations: {
		config(state, provider) {
			console.log(state)
			console.log(provider)
		},
		videoUrlChange(state, videoUrl) {
			state.videoUrl = videoUrl;
		},
		videoNameChange(state, videoName) {
			state.videoName = videoName;
		},
		videoSourceChange(state, videoSource) {
			state.videoSource = videoSource;
		},
		videoIdChange(state, videoId) {
			state.videoId = videoId;
		}
	}
})
export default {
	store
}
