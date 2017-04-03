// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import VueRouter from 'vue-router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import App from './App';
import login from './components/login';
import index from './components/index';
Vue.use(VueRouter);
Vue.use(ElementUI);

Vue.config.productionTip = false;

let routes = [
  {path: '/', redirect: '/login'},
  {path: '/login', component: login},
  {path: '/index', component: index}
];

let router = new VueRouter({
  routes: routes,
  linkActiveClass: 'active'
});

/* eslint-disable no-new */
let apps = new Vue({
  el: '#app',
  router: router,
  template: '<App/>',
  components: { App }
});
