<template>
  <div id="app">
  	<!--header组件-->
    <Vheader :seller="seller"></Vheader>
    <!--tab导航栏-->
    <div class="tab">
    	<div class="tab-item">
    		<router-link to="/goods" active-class='active'>商品</router-link>
    	</div>
    	<div class="tab-item">
    		<router-link to="/rating" active-class='active'>评价</router-link>
    	</div>
    	<div class="tab-item">
    		<router-link to="/seller" active-class='active'>商家</router-link>
    	</div>
    </div>
    <!--通过点击上面的路由路径，来更新router-view这个容器-->
    <keep-alive><router-view :seller="seller"></router-view></keep-alive>
    
  </div>
</template>

<script>
//引入header组件
import Header from './components/Header/Header.vue'

export default {
	data(){
		return {
			seller:{}
		}
	},
	
	created(){	//组件被创建之后
		this.$http.get('../data.json').then((res)=>{		//vue-resource
			this.seller=res.data.seller;
			//console.log(res.data);	//{seller: {…}, goods: Array(9), ratings: Array(24)}
		},res=>{
			console.log("获取数据失败="+res.status)
		})
	},
	
	
	components:{
		Vheader:Header		//对上面引入的Header组件进行注册的
	}
}
</script>

<style scoped>
	#app .tab{
		display:flex;
		width:100%;
		height:40px;
		line-height:40px;
/*1px的线条的写法如下*/
		/*border-bottom: 1px solid rgba(7,17,27,0.1);*/
		position: relative;
		
	}
	
	#app .tab:after{
		display: block;
		position: absolute;
		left: 0;bottom: 0;
		border-bottom: 1px solid rgba(7,17,27,0.1);
		content:'';
	}
	/*1px的线条的写法结束*/
	
/*dpr适配*/
	@media(-webkit-min-device-pixel-ratio:1.5),(min-device-pixel-ratio:1.5){
		#app .tab:after{
			-webkit-transform: scaleY(0.7);
			transform: scaleY(0.7);
		}
	}
	@media(-webkit-min-device-pixel-ratio:2),(min-device-pixel-ratio:2){
		#app .tab:after{
			-webkit-transform: scaleY(0.5);
			transform: scaleY(0.5);
		}
	}
	/*1px的线条的写法结束*/
	
	#app .tab .tab-item{
		flex:1;
		text-align:center;
		color: rgb(77,85,93);
		font-size: 14px;
	}
	.active{
		color: rgb(240,20,20);
	}
</style>
