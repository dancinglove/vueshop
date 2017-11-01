<template>
	<div class="carcontrol">
		<!--<div class="cart-decrease" v-show="food.count>0" @click.stop.prevent="decasecart">
			<transition name="move" >
				<span class="inner icon-remove_circle_outline" v-show="food.count>0" ></span>
			</transition>
		</div>-->
		<div class="cart-decrease icon-remove_circle_outline" v-show="food.count>0" 
			@click.stop.prevent="decasecart"></div>
		<div class="cart-count"  v-show="food.count>0">{{food.count}}</div>
		
		<div class="cart-add icon-add_circle" @click.stop.prevent="addcart"></div>
	</div>
</template>

<script>
	import Vue from 'vue';			//该组件需要用到Vue.set（就是添加属性）
	export default{
		props:{
			food:{
				type:Object
			}
		},
		methods:{
			addcart($event){
				if(!event._constructed){	//当检测是否为原生的
					return;					//如果是插件的，那么久return掉
				}console.log('click+')
				//点击添加的时候给当前的food添加一个count属性
				if(!this.food.count){				//判断有没有count这个属性
					Vue.set(this.food,'count',1)
				}else{
					this.food.count++;		console.log('cartcontrol加了一次');console.log(this.food)
				}
				this.$emit('cart.add',event.target);			//dom对象作为事件的参数
			},
			decasecart($event){
				if(!event._constructed){//当检测是否为原生的
					return;				//如果是插件的，那么久return掉
				}

				if(!this.food.count){
					Vue.set(this.food,'count',0)
				}else{
					this.food.count--;		console.log('cartcontrol减了一次')
				}
			}
		},
		created(){
			//console.log(this.food)
		}
	};
</script>

<style scoped="scoped">
	.carcontrol{
		font-size: 0;
	}
	.cart-count{
		vertical-align: top;text-align: center;
		font-size: 10px;
		width: 12px;
		padding-top: 6px;
		line-height: 24px;
	}
	.cart-decrease,.cart-count,.cart-add{
		display: inline-block;
	}
	.cart-decrease,.cart-add{
		font-size: 24px;
		line-height: 24px;
		color: rgb(0,160,220);
		padding:6px;
	}
	/*动画部分*/
</style>
