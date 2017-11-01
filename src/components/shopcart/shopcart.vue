<template>
<div class="shopcart-wrapper">
	<div class="shopcart" >
		<div class="shopcart-content">
			<div class="content-left" @click="toggleList">
				<div class="log-wrapper">
					<div class="logo"  :class="{'highlight':totalCount>0}">
						<i class="icon-shopping_cart" :class="{'highlight':totalCount>0}"></i>
					</div>
					<div class="logo-count" v-show="totalCount>0">{{totalCount}}</div>
				</div>
				<div class="price" :class="{'highlight':totalCount>0}">
					￥{{totalPrice}}	
				</div>
				<div class="desc">
					另需配送费￥{{deliveryprice}}元
				</div>
			</div>
			<div class="content-right" :class="payClass" @click="gopay">
				{{payfn}}
			</div>
			
		</div>
		
		
		<!--购物车详情列表-->
		<div class="shopcat-list" v-show="fold" ref="shopcartList">
			<div class="list-header">
				<h1 class="title">购物车</h1>
				<span class="empty" v-show="totalCount>0" @click="enpty">清空</span>
				<span class="empty" v-show="totalCount===0" @click="goback">返回</span>
			</div>
			<div class="list-content" ref="listcontent">
				<ul>
					<li class="listfood" v-for="food in selectfoods">
						<span class="listname">{{food.name}}</span>
						<div class="listprice">
							<span>￥{{food.price*food.count}}</span>
						</div>
						<div class="cartcontrol-wrapper">
							<cartcontrol :food="food"></cartcontrol>
						</div>		
					</li>
				</ul>
			</div>
			
			<div class="nocount" v-show="totalCount===0">
				<div class="context">
					<span class="text">你还没有添加任何的商品哦！</span><br />
					<span class="text">再去逛逛~</span>
				</div>	
			</div>
		</div>
	</div>
	<div class="cover">
		
	</div>
</div>
</template>

<script>
	import betterscorll from 'better-scroll'
	import cartcontrol from '../../components/cartcontrol/cartcontrol.vue'
	
export default{
	props:{
		selectfoods:{			//选择了多少个，由goods传过来的
			type:Array,
			default(){
				return [
//				{
//					price:10,
//					count:2
//				}
				];
			}
		},
		deliveryprice:{			//配送费
			type:Number,
			default:0			//默认值位0
		},
		minprice:{				//起送价格
			type:Number,
			default:0			//默认值位0
		}
		
	},
	data(){
		return {
			balls:[
				{
					show:false
				},{
					show:false
				},{
					show:false
				},{
					show:false
				},{
					show:false
				}
			],
			fold:false
		}
		
	},
	computed:{
		//总价
		totalPrice(){
			let total=0;
			this.selectfoods.forEach((food)=>{		
				total+=food.price*food.count
			})
			return total;
		},	
		//总共的数量(购物车小图标)
		totalCount(){
			let count=0;
			this.selectfoods.forEach((food)=>{
				count+=food.count
			})
			return count;
		},	
		//最右边的付款按钮的内容
		payfn(){
			if(this.totalPrice===0){
				return `￥${this.minprice}起送`
			}else if( this.totalPrice < this.minprice){
				let diff= this.minprice - this.totalPrice;//console.log(diff)
				return `还差￥${diff}元起送`
			}else{
				return `去结算`
			}
		},
		//计算最右边的背景颜色class的样式应该是什么养的
		payClass(){
			if(this.totalPrice < this.minprice){
				return 'notenough'
			}else{
				return 'enough'
			}
		}
		//,
		
//		listShow(){
//			if(!this.totalCount){
//				this.fold=true;
//				return false;
//			}
//			let show =!this.fold;	console.log('show='+show)	
//				if(show){	console.log('jinlailema 666')							//当购物车详情组件展开的时候，再调用better-scroll
//					this.$nextTick(() =>{
//						if(!this.scroll){			//没有
//							this.scroll=new betterscorll(this.$refs.listcontent,{
//								click:true			//可以用点击事件
//							})
//						}else{
//							this.scroll.refresh();	//重新计算高度差，是否需要滚动
//						}
//						
//					});
//				}
//				
//			return show;
//		}
		
	},
	methods:{
		drop(el){
			console.log(el)
		},	
		toggleList(){				//下面的购物清单部分显示出来
			if(!this.totalCount){
				return
			}
			this.fold=!this.fold;
			
			if(this.fold){	console.log('jinlailema 666')	//当购物车详情组件展开的时候，再调用better-scroll
				this.$nextTick(() =>{
					if(!this.scroll){			//没有
						this.scroll=new betterscorll(this.$refs.listcontent,{
							click:true			//可以用点击事件
						})
					}else{
						this.scroll.refresh();	//重新计算高度差，是否需要滚动
					}
						
				});
			}
		},	
		enpty(){
			this.selectfoods.forEach((food)=>{
				food.count=0;
			})
		},
		goback(){
			this.fold=!this.fold;
		},
		gopay(){
			if(this.totalPrice < this.minprice){
				let diff= this.minprice - this.totalPrice;//console.log(diff)
				window.alert(`商家需￥${this.minprice}起送,您的订单还差￥${diff}元`);
			}else{
				window.alert(`去支付￥${this.totalPrice}`)
			}
		}
		
		
		
	},
	created(){
		
	},
	
	components:{
		cartcontrol
	}
}
</script>

<style scoped="scoped">
	.shopcart-wrapper{
		
	}
	.shopcart{
		position: fixed;
		left: 0;
		bottom: 0;
		z-index: 50;
		width: 100%;
		height: 48px;
	}
	.shopcart .shopcart-content{
		display: flex;
		background: #141d27;
		font-size: 0;
		width: 100%;
		height: 48px;
	}
	.shopcart .shopcart-content .content-left{
		flex: 1;
	}
	.shopcart .shopcart-content .content-left .log-wrapper{
		display: inline-block;
		position: relative;
		top: -10px;
		margin: 0 12px;
		padding: 6px;
		width: 56px;
		height: 56px;
		box-sizing: border-box;
		vertical-align: top;
		border-radius:50% ;
		background: #141d27;
	}
	.shopcart .shopcart-content .content-left .log-wrapper .logo{
		width: 100%;
		height: 100%;
		border-radius: 50%;
		text-align: center;
		background:#2B343C;	
	}
	.shopcart .shopcart-content .content-left .log-wrapper .highlight{
		background:#049DD9;		
	}
	.shopcart .shopcart-content .content-left .log-wrapper .logo .icon-shopping_cart{
		line-height: 44px;
		font-size: 24px;
		color: #80858A;vertical-align: top;
	}
	
	.shopcart .shopcart-content .content-left .log-wrapper .logo .highlight{ 
		color:#fff;
	}
	
	.logo-count{
		position: absolute;
		top: 0;right: 0;
		background: rgb(240,20,20);
		box-shadow: 0 4px 8px 0 rgba(0,0,0,0.4);
		border-radius: 10px;
		text-align: center;
		width: 24px;height: 16px;
		line-height: 16px;
		font-size: 9px;
		font-weight: 300;
		color: rgb(255,255,255);
	}
	
	
	
	
	.shopcart .shopcart-content .content-left .price{
		display: inline-block;
		vertical-align: top;
		margin-top:12px ;
		line-height: 24px;padding-right:12px ;
		box-sizing: border-box;
		border-right: 1px solid rgba(255,255,255,0.1);
		font-size: 16px;font-weight: 700;
		color: rgba(255,255,255,0.4);
	}
	.shopcart .shopcart-content .content-left .highlight{
		color: #fff;
	}
	
	.shopcart .shopcart-content .content-left .desc{
		display: inline-block;
		vertical-align: top;
		margin-top:12px ;
		line-height: 24px;padding-left:12px ;
		box-sizing: border-box;
		
		font-size: 12px;
		font-weight: 300;
		color: rgba(255,255,255,0.4);
	}
		
	.shopcart .shopcart-content .content-right{
		flex: 0 0 115px;
		width: 115px;
		vertical-align: ;
		line-height: 24px;padding:12px 6px 0 6px;text-align: center;
		box-sizing: border-box;
		background: #2B333B;
		font-size: 14px;font-weight: 300;
		color: rgba(255,255,255,0.4);
	}	
	
	.shopcart .shopcart-content .notenough{
		background: #2b333b;
		color: #fff;
	}
	.shopcart .shopcart-content .enough{
		background: #00b43c;
		color: #fff;
	}
	
	
	
	
	/*购物车清单列表*/
	.shopcart .shopcat-list {
		position: absolute;
		left: 0;
		bottom: 48px;
		z-index: -1;
		width: 100%;
		background: #fff;
		height: 257px;
	}
	
	
	
	
	.shopcart .shopcat-list .list-header{
		position: relative;
		background:#f3f5f7 ;
		height: 40px;line-height: 40px;
		padding: 0 18px;
		border-bottom: 1px solid rgba(7,17,27,0.1);	
	}
	.shopcart .shopcat-list .list-header:after{
		display: block;width: 100%;
		position: absolute;
		left: 0;bottom: 0;
		border-top: 1px solid rgba(7,17,27,0.1);
		content:''
	}
	.shopcart .shopcat-list .list-header .title{
		display: inline-block;
		font-size: 14px;
		font-weight: 200;
		line-height: 40px;
		color: rgb(7,17,27);
	}
	.shopcart .shopcat-list .list-header .empty{
		float: right;
		font-size: 14px;
		font-weight: 200;
		line-height: 40px;
		color: rgb(0,160,220);
	}
	
	
	
	.shopcart .shopcat-list .list-content{
		padding: 0 18px;
		background: #fff;
		max-height: 217px;
		overflow: hidden;
	}
	.shopcart .shopcat-list .list-content .listfood{
		position: relative;
		padding: 12px 0px;
		box-sizing: border-box;	
		border-bottom: 1px solid rgba(7,17,27,0.1);
		font-weight: 700;
	}
	.shopcart .shopcat-list .list-content .listfood:after{
		display: block;width: 100%;
		position: absolute;
		left: 0;bottom: 0;
		border-top: 1px solid rgba(7,17,27,0.1);
		content:''
	}
	.shopcart .shopcat-list .list-content .listfood .listname{
		line-height: 24px;
		font-size: 14px;
		color: rgb(7,17,27);
	} 
	.shopcart .shopcat-list .list-content .listfood .listprice{
		position: absolute;
		right: 90px;
		bottom: 12px;
		line-height: 24px;
		font-size: 14px;font-weight: 700;
		color: rgb(240,20,20);
		
	}
	
	.shopcart .shopcat-list .list-content .listfood .cartcontrol-wrapper{
		position: absolute;
		right: 0;
		bottom: 5px;
	}
	
	.nocount{
		text-align: center;
		height: 100%;
		color: #7e8c8d;
	}
	.nocount .context{
		vertical-align: middle;
		height: 100%;
		margin-top: 50px;
	}
	.nocount .context .text{
		
		line-height: 30px;
	}
	
	/*小球抛物线运动*/
	/*.ball-container .ball{
		position: fixed;
		left: 32px;bottom: 22px;z-index: 200;
	}
	.drop-transition{
		transition:all 0.4s
	}
	.inner{
		width: 16px;height: 16px;border-radius:50% ;
		background: rgb(0,160,220);
	}*/
</style>