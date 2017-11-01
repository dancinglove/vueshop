<template>	
<div>
	<div class="goods">
		<!--左侧的muen-->
		<div class="muen-wrapper" ref="muenscroll">
			<ul v-if="goods">
				<li v-for="(item,index) in goods" class="muen-item" 
					:class="{'current':currentIndex===index}" 			
					@click="clickMuen(index,$event)">
					
					<span class="text"  :class="{'currenttext':currentIndex===index}">
						<span v-show="item.type>0" class="icon" :class="classMap"></span>
						{{item.name}}
					</span>
				</li>
			</ul>
		</div>
		<!--右侧的内容区域-->
		<div class="foods-wrapper"  ref="foodsscroll">
			<ul>
				<li v-for="item in goods" class="food-list food-list-hook">
					<h1 class="foods-title">{{item.name}}</h1>
					<ul>
						<li  v-for="food in item.foods" class="food-item" @click="clickselectFood(food,$event)">
							<div class="foodicon">
								<img :src="food.icon"/>
							</div>
							<div class="contentrignt">
								<div class="foodcontent">
									<h2 class="foodname">{{food.name}}</h2>
									<p class="fooddesc">{{food.description}}</p>
								</div>
								
								<div class="foodextra">
									<span>月售{{food.sellCount}}</span>
									<span>好评率{{food.rating}}%</span>
								</div>
								<div class="foodprice">
									<span class="nowprice"><strong class="nowstrong">￥</strong>{{food.price}}</span>
									<span v-if="food.oldPrice" class="oldprice"><del><strong class="oldstrong">￥</strong>{{food.oldPrice}}</del></span>
								</div>
							</div>
							<!--添加/减少数量的按钮-->
							<div class="cartcontrol-wrapper" >
								<cartcontrol :food="food"></cartcontrol>
							</div>
							
						</li>
					</ul>
					
				</li>
			</ul>
		</div>
		<shopcart ref="shopcart" :selectfoods='selectFoods' :deliveryprice="seller.deliveryPrice" :minprice="seller.minPrice"></shopcart>
	</div>	
	<!--点击商品，出现商品的详情页面-->
	<fooddetail :food="selectedFoodli" ref='fooddetail'></fooddetail>
</div>
</template>

<script>
	import betterscorll from 'better-scroll'		//使用的插件，用于手机端的滚动事件
	import cartcontrol from '../../components/cartcontrol/cartcontrol.vue'
	import shopcart from '../../components/shopcart/shopcart.vue'
	import fooddetail from '../../components/fooddetail/fooddetail.vue'
export default{
	props:{
		seller:{		//接收App.vue传来的数据的
			type:Object
		}
	},
	data(){
		return {
			goods:[],		//用于放ajax请求来的数据
			listHeight:[],	//这个是右边部分每一个li标签到顶端的距离
			scrollY:0,		//右边content的scrolly的值
			
			selectedFoodli:{}	//只是记录下被点击的当前的li标签所代表的食物，由clickselectFood方法传来
		}
	},
	
	
	
	methods:{
		_initscroll(){		//这个方法是实现页面滚动的方法，并且得出scrolly
			//左边的目录按钮
			this.meunScroll=new betterscorll(this.$refs.muenscroll,{
				click:true		//可以用点击事件
			})
			//右边的foods内容部分
			this.foodsScroll=new betterscorll(this.$refs.foodsscroll,{
				probeType:3,	//支持快速滑动，并且也触发事件(监测时时滚动的位置)这样可以使得在滚动的时候时时的告诉我们滚动的位置
				click:true
			})
			
			//这是better-scroll里面的一个接口api，可以时时的获取scrollY的值是多少
			this.foodsScroll.on('scroll',(pos)=>{		//scroll函数可以把我们滚动的时候的位置时时的暴露出来
				this.scrollY=Math.abs(Math.round(pos.y));	//时时的拿到右边的scrollY
				//console.log("scrollY="+this.scrollY);
			})
			
		},
			
		_calculateHeight(){	//计算左右联动（时时的获取右边部分整体的scrollY值，用于计算）
			//获取到每一个li标签
			let foodlist=this.$refs.foodsscroll.getElementsByClassName('food-list-hook');
			
			//设置一个高度为0
			let height=0;
			this.listHeight.push(height);
			//循环获得所有的li标签的高度，然后相加的值就是当前li标签到顶端的y值
			for(let i=0;i<foodlist.length;i++){
				let item =foodlist[i];
				height+=item.clientHeight;	//获取每一个li标签的高度值，累加后放到数组中
				this.listHeight.push(height);
			}
		},
		
		//点击左侧的按钮，右侧跟着动
		clickMuen(index,$event){
			if(!event._constructed){	//当检测是否为原生的
				return					//如果是插件的，那么就return掉
			}
			//获取到li标签集合
			let foodlist=this.$refs.foodsscroll.getElementsByClassName('food-list-hook');
			//得到点击的左边的哪一个li标签
			let  el=foodlist[index];
			//调用better-scroll的一个用法
			this.foodsScroll.scrollToElement(el,300);//300是动画的时间300ms
		},
		
		
		//购物车的部分
		_drop(){
			this.$refs.shopcart.drop(target);
		},
		
		//当点击一个li标签的时候调用组件fooddetail
		clickselectFood(food,$event){
			if(!event._constructed){	//当检测是否为原生的
				return					//如果是插件的，那么久return掉
			}
			this.selectedFoodli=food;		//把该li标签的food传给组件，food是循环li的时候出来的
			this.$refs.fooddetail.show();		//调用子组建fooddetail的方法
		}
	},
	computed:{		//计算属性一般配合着class来用
		currentIndex(){				//左侧的索引应该在哪
			for(let i=0;i<this.listHeight.length;i++){
				let height1=this.listHeight[i]		//当前索引值的高度
				let height2=this.listHeight[i + 1];	//下一个索引值的高度
				
				//！height2的意思是滑动到最后一个时，会爆出undefind
				if(!height2 ||( this.scrollY >= height1 && this.scrollY<height2)){
					return i;
				}
			}
			return 0;		//最开始让他定位在第一个高亮
		},
		
		//
		selectFoods(){			//计算所有被选择过的属性（主要的额作用是传给购物车的列表那一块）方法是把有count的拿出来放到数组里
			let foods=[];		
			this.goods.forEach((good)=>{
				good.foods.forEach((food)=>{
					if(food.count){					//如果有count这个属性，则就是被点击过的
						foods.push(food);
					}
				})
			})
			return foods;
		}
	},
	//组件创建完成之后
	created(){
		this.$http.get('../data.json').then((res)=>{
			this.goods=res.data.goods;
			//console.log(res.data.goods);
			this.$nextTick(()=>{		//在操作dom的时候必须加这个，因为操作dom的结果实在$nextTick之后的
				this._initscroll();
				this._calculateHeight();		//计算右边的scroll的y值
			});	
		}),
		//这个是用来添加那5个图标的
		this.classMap=['decrease','discount','guarantee','invoice','special']
	},
	
	
	
	components:{
		shopcart,
		cartcontrol,
		fooddetail
	},
	
	events:{
		'cart.add'(target){
			this._drop(target);
		}
	}
	
	
}
</script>

<style scoped>
	.goods{
		display: flex;
		position: absolute;
		top: 174px;bottom: 46px;
		width: 100%;overflow: hidden;
		border-top: 1px solid rgba(7,17,27,0.1);
	}
	/*左边菜单按钮*/
	.goods .muen-wrapper{
		flex: 0 0 80px;
		width: 80px;
		background: #f3f5f7;
	}
	.goods .muen-wrapper .muen-item{
		display: table;
		height: 54px;width: 56px;line-height: 14px;font-size: 12px;
		font-weight: 200;
		padding: 0 12px;
	}
	.goods .muen-wrapper .current{
		position: relative;
		z-index: 10;
		margin: -1px 0;
		background: #fff;
		font-weight: 700;
		/*border-bottom: 1px solid white;*/
	}
	.currenttext{
		color: rgb(17,26,35) !important;border: 0 !important;
	}
	
	.goods .muen-wrapper .muen-item .text{
		display: table-cell;
		width: 56px;
		vertical-align: middle;
		font-size: 12px;
		border-bottom: 1px solid rgba(7,17,27,0.1);
		color: rgb(147,153,159);
	}
	.goods .muen-wrapper .muen-item .text .icon{
		display: inline-block;
		width: 12px;
		height: 12px;
		background-size:12px 12px ;
		background-repeat:no-repeat;
	}
	
	
	
	
	
	/*五个图标的css*/
	.decrease{
		background-image: url(../Header/decrease_1@2x.png);
		@media(-webkit-min-device-pixel-ratio:3),(min-device-pixel-ratio:3){
			background-image: url(../Header/decrease_1@3x.png);
		}
	}
	.discount{
		background-image: url(../Header/discount_1@2x.png);
		@media(-webkit-min-device-pixel-ratio:3),(min-device-pixel-ratio:3){
			background-image: url(../Header/discount_1@3x.png);
		}
	}
	.guarantee{
		background-image: url(../Header/guarantee_1@2x.png);
		@media(-webkit-min-device-pixel-ratio:3),(min-device-pixel-ratio:3){
			background-image: url(../Header/guarantee_1@3x.png);
		}
	}
	.invoice{
		background-image: url(../Header/invoice_1@2x.png);
		@media(-webkit-min-device-pixel-ratio:3),(min-device-pixel-ratio:3){
			background-image: url(../Header/invoice_1@3x.png);
		}
	}
	.special{
		background-image: url(../Header/special_1@2x.png);
		@media(-webkit-min-device-pixel-ratio:3),(min-device-pixel-ratio:3){
			background-image: url(../Header/special_1@3x.png);
		}
	}
	
	
	/*右侧的部分*/
	.goods .foods-wrapper{
		flex: 1;
	}
	/*h1*/
	.goods .foods-wrapper .food-list .foods-title{
		padding-left: 14px;
		border-left:1px solid #d9dde1 ;
		font-size: 12px;
		color: rgb(147,153,159);
		height: 26px;
		line-height: 26px;
		background: #f3f5f7;
	}
	.goods .foods-wrapper .food-list .food-item{
		display: flex;
		margin: 18px;
		padding-bottom: 18px;
		border-bottom: 1px solid rgba(7,17,27,0.1);position: relative;
	}
	.goods .foods-wrapper .food-list .food-item:last-child{
		border-bottom: 0px solid rgba(7,17,27,0.1);
		margin-bottom: 0;
	}
	
	/*图片*/
	.goods .foods-wrapper .food-list .food-item .foodicon{
		flex: 0 0 57px;
		width: 57px;
		height: 57px;
		display: inline-block;
		margin-right: 10px;
	}
	.foodicon img{height: 57px;}
	/*右侧的内容区域*/
	.goods .foods-wrapper .food-list .food-item .contentrignt{
		flex: 1;	
	}
	/*名字*/
	.goods .foods-wrapper .food-list .food-item .contentrignt .foodcontent .foodname{
		margin: 2px 0 8px 0;
		height: 14px;
		line-height: 14px;
		font-size: 14px;
		color: rgb(7 ,17,27);
	}
	.goods .foods-wrapper .food-list .food-item .contentrignt .foodcontent .fooddesc{
		font-size: 10px;
		margin-bottom: 8px;
		line-height: 16px;
		color: rgb(147 ,153,159);
	}
	
	/*月售/好评率*/
	.foodextra{
		line-height: 10px;
		font-size: 10px;
		color: rgb(147 ,153,159);
	}
	.foodextra span{
		margin:0 12px 8px 0;
	}
	
	.goods .foods-wrapper .food-list .food-item .contentrignt .foodprice{
		
		font-weight: bolder;
		line-height: 27px;
		
	}
	.goods .foods-wrapper .food-list .food-item .contentrignt .foodprice .nowstrong,
	.goods .foods-wrapper .food-list .food-item .contentrignt .foodprice .oldstrong{
		font-size: 8px;
	}
	.goods .foods-wrapper .food-list .food-item .contentrignt .foodprice .nowstrong{
		color: red;
	}
	.goods .foods-wrapper .food-list .food-item .contentrignt .foodprice .nowstrong{
		color: rgb(147 ,153,159);
	}
	.goods .foods-wrapper .food-list .food-item .contentrignt .foodprice .nowprice{
		font-size: 15px;
		color: red;
	}
	.goods .foods-wrapper .food-list .food-item .contentrignt .foodprice .oldprice{
		font-size: 10px;
		color: rgb(147 ,153,159);
	}
	
	/*加减按钮*/
	.goods .foods-wrapper .food-list .food-item .cartcontrol-wrapper{
		position: absolute;
		right:0;bottom: 6px;
	}
	
	
</style>