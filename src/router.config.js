//下面组件的路由路径需要用到什么组件就需要引入什么组件
import goods from './components/goods/goods.vue'
import rating from './components/rating/rating.vue'
import seller from './components/seller/seller.vue'

export default[
	{
		path:'/goods',
		component:goods
	},
	{
		path:'/rating',
		component:rating
	},
	{
		path:'/seller',
		component:seller
	},
	{
		path:'/',							//访问根目录的时候，全部重定向到/goods页面
		redirect:'/goods'
	}
]
