<template>
	<div class="ratings" ref="rating">
		<div class="ratings-contain">
			<div class="overview">
				<div class="overview-left">
					<h1 class="score">{{seller.score}}</h1>
					<div class="title">综合评分</div>
					<div class="rank">高于周边商家{{seller.rankRate}}%</div>
				</div>
				<div class="overview-right">
					<div class="serviceScore">
						<span class="rating-name">服务态度</span>
						<div class="star-warpper-rating">
							<star :score='seller.serviceScore' :size='24' ></star>
						</div><span class="star-score">{{seller.serviceScore}}</span>
					</div>
					<div class="foodScore">
						<span class="rating-name">美食打分</span>
						<div class="star-warpper-rating">
							<star :score='seller.foodScore' :size='24' ></star>
						</div><span class="star-score">{{seller.foodScore}}</span>
					</div>
					<div class="arriveTime">
						<span class="rating-name">送达时间</span>
						<div class="time star-warpper-rating">{{seller.deliveryTime}}分钟</div>
					</div>
				</div>
			</div>
			<spilt></spilt>
				<div class="ratingselect">
					<div class="rating-type">
						<!--查看全部-->
						<span @click="select(0,$event)" class="block all" :class="{'active-all':setectType===0}">
							{{desc.all}}<span class="count">{{shoperRatings.length}}</span>
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
					<ul v-show="shoperRatings && shoperRatings.length">
						<li  v-for="rating in shoperRatings" class="rating-item">
						<div class="user">
								<span class="name">{{rating.username}}</span>
								<img :src="rating.avatar"/>
							</div>
							<div class="time">
								{{rating.rateTime}}
							</div>
							
							<p class="text">
								<span :class="{'icon-thumb_up':rating.rateType===0,'icon-thumb_down':rating.rateType===1}"></span>
								{{rating.text}}
							</p>
							<div class="command">
								<span :class="{'icon-thumb_up':rating.rateType===0,'icon-thumb_down':rating.rateType===1}"></span>
								
							</div>
						</li>
						
					</ul>
					<div class="norating" v-show="!ratingdata||!ratingdata.length">
						<p class="norating-text">暂无评论数据...</p><br /><br /><br />
					</div>
				</div>
		</div>
	</div>
	
</template>

<script>
import betterscorll from 'better-scroll'
import star from '../../components/star/star.vue'
import spilt from '../../components/spilt/spilt.vue'
//import ratingselect from '../../components/ratingselect/ratingselect.vue'

//	const POSITIVE=0;
//	const NEGATIVE=1;
//	const ALL=2;
	
export default{
	
	props:{
		seller:{
			type:Object
		}
	},components:{
		star,
		spilt
//		,
//		ratingselect
	},
	
	data(){
		return{
			shoperRatings:[],
			showFlag:false,
//			setectType:ALL,
			onlyContent:false,
			
			
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
				this.badLength=this.negative.length;
				this.ratingdata=this.negative;	//console.log(this.ratingdata)
			}
		}
	},
	beforeUpdate(){
		//只看内容部分
		
		
	},
	created(){
		this.$http.get('data.json').then((response)=>{
			//console.log(response.data)
			this.shoperRatings=response.data.ratings;
			//console.log(this.shoperRatings)
			this.allRating=this.shoperRatings
			for(var i=0;i<this.shoperRatings.length;i++){
				
				if(this.shoperRatings[i].rateType===0){			//满意
					this.positive.push(this.shoperRatings[i]);
					this.goodLength=this.positive.length;
				}
				if(this.shoperRatings[i].rateType===1){			//不满意
					this.negative.push(this.shoperRatings[i]);
					this.badLength=this.negative.length;
				}
			}
		
		
			this.$nextTick(()=>{
				if(!this.scroll){
					this.foodScroll=new betterscorll(this.$refs.rating,{
						click:true				//可以用点击事件
					})
				}else{
					this.scroll.refresh();
				}
			});
		})
	}
}
</script>

<style>
	.ratings{
		position: absolute;
		top: 174px;bottom: 0;
		left: 0;
		width: 100%;
		overflow: hidden;	
		border-top: 1px solid rgba(7,17,27,0.1);
	}
	.overview{
		display: flex;
		padding: 18px 0;
	}
	.overview-left{
		flex: 0 0 137px;
		width: 137px;
		text-align: center;
		border-right: solid 1px rgba(7,17,27,0.1);
		text-align: center;
	}
	@media only screen and  (max-width: 320px) {
		.overview-left{
			flex: 0 0 120px;
			width: 120px;
			text-align: center;
			border-right: solid 1px rgba(7,17,27,0.1);
			text-align: center;
		}
	}
	.overview-left .score{
		font-size: 20px;
		color: rgb(255,153,0);
		line-height: 28px;
	}
	.overview-left .title{
		font-size: 12px;line-height: 25px;
		color: rgb(7,17,27);
	}
	.overview-left .rank{
		font-size: 10px;line-height: 10px;
		color: rgba(7,17,27,0.5);
	}
	
	
	
	.overview-right{
		flex: 1;
		padding-left: 18px;
	}
	.star-warpper-rating{
		display: inline-block;margin-left: 12px;
	}
	.arriveTime .time{
		line-height: 18px;color: rgb(147,153,159);margin-left: 12px;font-size: 12px;
	}
	.star-score{
		font-size: 12px;line-height: 18px;color: rgb(255,153,0);margin-left: 12px;
	}
	
	.serviceScore,.foodScore,.arriveTime{
		margin-bottom: 8px;
	}
	.rating-name{
		font-size: 12px;line-height: 18px;color: rgb(7,17,27);
	}
	
	
	
	
	
	
	
	
	
	
	/*评价部分*/
	.ratings-contain  .rating-wrapper{
		padding: 0 18px;
	}
	.ratings-contain .rating-wrapper .rating-item{
		position: relative;
		padding: 16px 0;
		border-bottom: 1px solid rgba(7,17,27,0.1);
	}
	.ratings-contain .rating-wrapper .user{
		position: absolute;
		right: 0;top: 16px;font-size: 0;line-height: 12px;
	}
	.ratings-contain .rating-wrapper .name{
		margin-right: 6px;
		display: inline-block;
		vertical-align: top;font-size: 10px;color: rgb(147,153,159);
	}
	
	.ratings-contain .rating-wrapper img{
		width: 12px;height: 12px;border-radius:50% ;
	}
	.ratings-contain .rating-wrapper .time{
		line-height: 12px;
		font-size: 10px;
		color: rgb(147,153,159);
		margin-bottom: 6px;
	}
	
	.ratings-contain .rating-wrapper .text{
		font-size: 12px;line-height: 16px;color: rgb(7,17,27);
	}
	.ratings-contain .rating-wrapper .icon-thumb_up,
	.ratings-contain .rating-wrapper .icon-thumb_down{
		margin-right: 4px;
		line-height: 24px;
		font-size: 12px;
	}
	.ratings-contain .rating-wrapper .icon-thumb_up{
		color: rgb(0,160,220);
	}
	.ratings-contain .rating-wrapper .icon-thumb_down{
		color: rgb(147,153,159);
	}
	
	.ratings-contain .norating .norating-text{
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