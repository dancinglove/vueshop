import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'//引入vue-router模块，
import VueResource from 'vue-resource'
import routes from './router.config.js'		//路由的配置全写在了router.config.js文件里，所以需要引入




//引入的router后需要配置一下
Vue.use(VueRouter);//使用vue-router


const router=new VueRouter({
	mode:'history',
	scrollBehavior:()=>({ // 滚动条滚动的行为，不加这个默认就会记忆原来滚动条的位置
　　　　	y:0
　　	}),
	routes
})

//使用vue-resource
Vue.use(VueResource);

new Vue({
  el: '#app',
  router,					//router需要挂载到Vue的实例上
  render: h => h(App)
})
