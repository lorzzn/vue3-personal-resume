import { createApp } from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
import request from './utils/request'
import config from './config'
import commonFn from './utils/commonFn'
import( /* webpackChunkName: "main.styl" */ "./stylus/main.styl");
import( /* webpackChunkName: "remixicon.css" */ "remixicon/fonts/remixicon.css");

const app = createApp(App);
app.use(store);
app.use(router);
app.mount('#app');

app.config.globalProperties.$http = request;
app.config.globalProperties.$config = config;
app.config.globalProperties.$commonFn = commonFn;
