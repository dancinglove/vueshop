<template>
	<div v-show="showFlag" class="food" ref="food">
		<div class="food-content">
			<div class="img-header">
				<img :src="food.image" alt="" />
				<div @click="back" class="back"><i class="icon-arrow_lift"></i></div>	
			</div>
			<div class="contents">
				<div class="foodcontent">
					<h1 class="foodname">{{food.name}}</h1>
				</div>
				<div class="foodextra">
					<span>月售{{food.sellCount}}</span>
					<span>好评率{{food.rating}}%</span>
				</div>
				<div class="foodprice">
					<span class="nowprice"><strong class="nowstrong">￥</strong>{{food.price}}</span>
					<span v-if="food.oldPrice" class="oldprice"><del><strong class="oldstrong">￥</strong>{{food.oldPrice}}</del></span>
				</div>
				
				<div class="cartcontrol-wrapper">
					<cartcontrol :food="food" v-show="food.count>0"></cartcontrol>
				</div>
				<div @click.stop.prevent="addFirst($event)" class="add" v-show="food.count===0||!food.count">
					加入购物车
				</div>
			</div>
			
			<spilt></spilt>
			
			<div class="goodinfo" v-show="food.info">
				<h2 class="info">商品介绍</h2>
				<p class="infodesc">{{food.info}}</p>
			</div>
			<spilt v-show="food.info"></spilt>
			
			<div class="goodrating">
				<h2 class="goodrating-title">商品评价</h2>
				
		<!--<ratingselect :setect-type='setectType' :only-content="onlyContent" :desc='desc' :ratings="food.ratings">
		</ratingselect>-->
				<div class="ratingselect">
					<div class="rating-type">
						<!--查看全部-->
						<span @click="select(0,$event)" class="block all" :class="{'active-all':setectType===0}">
							{{desc.all}}<span class="count">{{food.ratings.length}}</span>
						</span>
						<!--满意-->
						<span @click="select(1,$event)" class="block positive" :class="{'active-positive':setectType===1}">
							{{desc.positive}}<span class="count">{{goodLength}}</span>
						</span>
						<!--吐槽-->
						<span @click="select(2,$event)" class="block negative" :class="{'active-negative':setectType===2}">
							{{desc.negative}}<span class="count">{{badLength}}</span>
						</span>
					</div>
					<div class="switch" >
						<!--只看有内容的评价-->
						<span @click="" class="icon-check_circle" ></span>
						<span class="text">只看有内容的评价</span>
					</div>	
				</div>	
				
				
				<div class="rating-wrapper">
					<ul v-show="ratingdata && ratingdata.length">
						<li  v-for="rating in ratingdata" class="rating-item">
							<div class="time">
								{{rating.rateTime}}
							</div>
							<div class="user">
								<span class="name">{{rating.username}}</span>
								<img :src="rating.avatar"/>
							</div>
							<p class="text">
								<span :class="{'icon-thumb_up':rating.rateType===0,'icon-thumb_down':rating.rateType===1}"></span>
								{{rating.text}}
							</p>
						</li>
					</ul>
					<div class="norating" v-show="!ratingdata||!ratingdata.length">
						<p class="norating-text">暂无评论数据...</p><br /><br /><br />
					</div>
				</div>
				
			</div>
		</div>
	</div>
</template>

<script>
import Vue from 'vue'
import betterscorll from 'better-scroll'
import cartcontrol from '../../components/cartcontrol/cartcontrol.vue'
import spilt from '../../components/spilt/spilt.vue'
//import ratingselect from '../../components/ratingselect/ratingselect.vue'

export default{
	props: {
		food: {
			type: Object
		}
	},
	data(){
		return {
			showFlag:false,		//整个组件的显示和隐藏
		
			setectType:0,		//这个是那三个选择满意、一般、不满意
//			onlyContent:false,
			desc:{
				all:		"全部",
				positive:	"满意",
				negative:	"不满意"
			},
			
			AllLength:0,		//全部的length
			allRating:[],
			
			goodLength:0,		//满意的length
			positive:[],		//满意的ratings
			
			badLength:0,		//不满意的length
			negative:[],		//不满意的ratings
			
			ratingdata:[]		//评论的所有的数组
		}
	},
	
	methods:{
		select(type,event){
			if(!event._constructed){//当检测是否为原生的
				return;	//如果是插件的，那么久return掉
			}
			if(type===0){				//全部
				this.setectType=0
				this.AllLength=this.positive.length;
				this.ratingdata=this.allRating;
				//console.log(this.ratingdata)
			}
			if(type===1){				//满意
				this.setectType=1;
				this.goodLength=this.positive.length;
				this.ratingdata=this.positive;
				//console.log(this.ratingdata)
			}
			if(type===2){					//不满意					
				this.setectType=2;
				this.goodLength=this.negative.length;
				this.ratingdata=this.negative;	//console.log(this.ratingdata)
			}
		},
		show(){		//父组件在调用这个组件的时候加入better-scroll
			this.showFlag=true;

			
			this.$nextTick(()=>{
				if(!this.scroll){
					this.foodScroll=new betterscorll(this.$refs.food,{
						click:true	//可以用点击事件
					})
				}else{
					this.scroll.refresh();
				}
			});
		},
		back(){
			this.showFlag=false;
			this.ratingdata=[];
			
			this.allRating=[];
			this.positive=[];
			this.negative=[];
			
			this.AllLength=0;
			this.goodLength=0;
			this.badLength=0;
			console.log(this.ratingdata);
		},
		
		addFirst($event){
			if(!event._constructed){//当检测是否为原生的
				return	//如果是插件的，那么久return掉
			}
			
			if(!this.food.count){
				Vue.set(this.food,'count',1);
			}else{
				this.food.count++;console.log('jialeyixi')
			}
			
		}
	},
	beforeUpdate(){
		if(this.food &&this.allRating.length===0){			//全部
			for(var i=0;i<this.food.ratings.length;i++){
				this.allRating.push(this.food.ratings[i]);	
			}
			this.AllLength=this.allRating.length;
			this.ratingdata=this.allRating
		}
		if(this.food &&this.positive.length===0){			//满意
			for(var i=0;i<this.food.ratings.length;i++){
				if(this.food.ratings[i].rateType===0){
					this.positive.push(this.food.ratings[i]);
				}
			}
			this.goodLength=this.positive.length;
		}
		if(this.food&&this.negative.length===0){			//不难以
			for(var i=0;i<this.food.ratings.length;i++){
				if(this.food.ratings[i].rateType===1){
					this.negative.push(this.food.ratings[i]);
				}
			}
			this.badLength=this.negative.length;
		}
		
		//只看内容部分
		
		
	},
	components:{
		cartcontrol,		
		spilt
		//,
//		ratingselect
	}
}
</script>

<style>
	
	.food{
		position: fixed;
		left: 0;
		top: 0;
		bottom: 48px;
		z-index: 30;
		width: 100%;
		background: #f3f5f7;
	}
	/*头部图片*/
	.food .food-content .img-header{
		position: relative;
		width: 100%;
		height: 0;
		padding-top: 100%;
	}
	.food .food-content .img-header img{
		position: absolute;top: 0;left: 0;width: 100%;height: 100%;
	}
	.food .food-content .img-header .back{
		position:absolute;
		top: 10px;left: 10px;text-align: center;
		background: rgba(17,27,37,0.3);padding: 6px;
	}
	/*返回图标*/
	.icon-arrow_lift{
		font-size: 20px;color: #fff;
	}
	/*名字*/
	.food .food-content .contents{
		position: relative;
		padding: 18px;
		display: block;
		background: #fff;
	}
	.food .food-content .contents .foodcontent .foodname{
		margin: 2px 0 8px 0;
		height: 14px;
		line-height: 14px;
		font-size: 14px;
		color: rgb(7 ,17,27);
		font-weight: 700;
	}
	/*月售/好评率*/
	.food .food-content .contents .foodextra{
		line-height: 10px;
		font-size: 10px;
		color: rgb(147 ,153,159);
		margin-bottom: 18px;
	}
	.food .food-content .contents .foodextra span{
		margin:0 12px 8px 0;
	}
	
	.food .food-content .contents .foodprice{
		font-weight: bolder;
		line-height: 27px;
		
	}
	.food .food-content .contents .foodprice .nowstrong,.food .food-content .contents .foodprice .oldstrong{
		font-size: 8px;
	}
	.food .food-content .contents .foodprice .nowstrong{
		color: red;
	}
	.food .food-content .contents .foodprice .nowstrong{
		color: rgb(147 ,153,159);
	}
	.food .food-content .contents .foodprice .nowprice{
		font-size: 15px;
		color: red;font-weight: 800;
	}
	.food .food-content .contents .foodprice .oldprice{
		font-size: 10px;
		color: rgb(147 ,153,159);
	}
	/*添加按钮*/
	.food .food-content .contents .cartcontrol-wrapper{
		position: absolute;right:18px;bottom: 18px;
	}
	/*加入购物车*/
	.food .food-content .contents .add{
		position: absolute;right:18px;bottom: 18px;/*padding: 6px 12px;*/
		width: 84px;
		height: 24px;
		background: rgb(0,160,220);
		font-size: 10px;
		line-height: 24px;
		color: rgb(255,255,255);
		border-radius: 12px;text-align: center;
	}
	
	
	/*商品介绍*/
	.food .food-content .goodinfo{
		flex: 1;
		padding: 18px;
		display: block;
		background: #fff;
		margin-bottom: 16px;
	}
	.food .food-content .goodinfo .info{
		height: 14px;
		line-height: 14px;
		font-size: 14px;
		color: rgb(7 ,17,27);
		font-weight: 200;
		margin: 2px 0 8px 0;	
	}
	.food .food-content .goodinfo .infodesc{
		padding: 0 8px;
		line-height: 16px;
		font-weight: 200;
		font-size: 12px;
		color: rgb(77,85,93);
	}
	
	/*商品评价部分*/
	.food .food-content .goodrating{
		background: #fff;
	}
	.food .food-content .goodrating .goodrating-title{
		padding: 18px;
		display: block;
		
		height: 14px;
		line-height: 14px;
		font-size: 14px;
		color: rgb(7 ,17,27);
		font-weight: 200;
		margin: 2px 0 8px 0;
	}
	
	
	/*评价部分*/
	.food .food-content .goodrating .rating-wrapper{
		padding: 0 18px;
	}
	.food .food-content .goodrating .rating-wrapper .rating-item{
		position: relative;
		padding: 16px 0;
		border-bottom: 1px solid rgba(7,17,27,0.1);
	}
	.food .food-content .goodrating .rating-wrapper .user{
		position: absolute;
		right: 0;top: 16px;font-size: 0;line-height: 12px;
	}
	.food .food-content .goodrating .rating-wrapper .name{
		margin-right: 6px;
		display: inline-block;
		vertical-align: top;font-size: 10px;color: rgb(147,153,159);
	}
	.food .food-content .goodrating .rating-wrapper .awart{
		
	}
	.food .food-content .goodrating .rating-wrapper img{
		width: 12px;height: 12px;border-radius:50% ;
	}
	.food .food-content .goodrating .rating-wrapper .time{
		line-height: 12px;
		font-size: 10px;
		color: rgb(147,153,159);
		margin-bottom: 6px;
	}
	
	.food .food-content .goodrating .rating-wrapper .text{
		font-size: 12px;line-height: 16px;color: rgb(7,17,27);
	}
	.food .food-content .goodrating .rating-wrapper .icon-thumb_up,
	.food .food-content .goodrating .rating-wrapper .icon-thumb_down{
		margin-right: 4px;
		line-height: 24px;
		font-size: 12px;
	}
	.food .food-content .goodrating .rating-wrapper .icon-thumb_up{
		color: rgb(0,160,220);
	}
	.food .food-content .goodrating .rating-wrapper .icon-thumb_down{
		color: rgb(147,153,159);
	}
	
	.food .norating .norating-text{
		padding: 10px;
		text-align: center;
		font-size: 16px;
		color: #7e8c8d;
	}
	
	
	
	
	
	
	
	
	.ratingselect .rating-type{
		padding: 18px 0;
		margin: 0 18px;
		border-bottom: 1px solid rgba(7,17,27,0.1);
		font-size: 0;
	}
	
	.ratingselect .rating-type .block{
		display: inline-block;
		padding: 8px 12px;
		margin-right: 8px;
		border-radius: 2px;
		/*line-height: 16px;*/
		font-size: 14px;
		
	}
	
	
	.ratingselect .rating-type .all{
		background: rgba(0,160,220,0.2);color: rgb(77,85,93);
	}
	.active-all{
		background: rgb(0,160,220) !important;color: rgb(255,255,255)!important;
	}
	.ratingselect .rating-type .positive{
		background: rgba(0,160,220,0.2);color: rgb(77,85,93);
	}
	.active-positive{
		background: rgb(0,160,220)!important;color: rgb(255,255,255)!important;
	}
	
	.negative{
		background: rgba(77,85,93,0.2);color: rgb(77,85,93);
	}
	.active-negative{
		background: rgb(0,160,220)!important;color: rgb(255,255,255)!important;
	}
	
	
	
	.ratingselect .rating-type .count{
		font-size: 8px;
		margin-left: 4px;
	}
	/*switch部分*/
	.ratingselect  .switch{
		padding: 12px 18px;
		font-size: 12px;
		color: rgb(147,153,159);
	}
	.ratingselect  .icon-check_circle{
		display: inline-block;
		vertical-align: top;
		margin-right: 4px;
		font-size: 24px;
		
	}
	.ratingselect .text{
		display: inline-block;
		vertical-align: top;
		font-size: 12px;
		line-height: 24px;
	}
	.on{
		color:#00c850;
	}
</style>