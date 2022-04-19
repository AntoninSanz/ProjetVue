import { createStore } from "vuex";

// Create a new store instance.
export default createStore({
  state() {
    return {
      key: "03368cad0c0c6a178cdf790f63692758",
      imgUrlBase: "https://image.tmdb.org/t/p/w200",
      urlYtBase: "https://www.youtube.com/embed/",
    };
  },
  getters: {
    getKey(state) {
      return state.key;
    },
    getUrlYtBase(state) {
      return state.urlYtBase;
    },
    getImgUrlBase(state) {
      return state.imgUrlBase;
    },
  },
  mutations: {
    initKey(state, key) {
      state.key = key;
    },
    initUrlYtBase(state, url) {
      state.urlYtBase = url;
    },
    initImgUrlBase(state, url) {
      state.imgUrlBase = url;
    },
  },
});
