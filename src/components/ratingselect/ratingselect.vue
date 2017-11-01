<template>
	<div class="ratingselect">
		<div class="rating-type">
			<!--查看全部-->
			<span @click="select(2,$event)" class="block all" :class="{'active-all':setectType===2}">
				{{desc.all}}<span class="count">{{ratings.length}}</span>
			</span>
			<!--满意-->
			<span @click="select(0,$event)" class="block positive" :class="{'active-positive':setectType===0}">
				{{desc.positive}}<span class="count">{{positives.length}}</span>
			</span>
			<!--吐槽-->
			<span @click="select(1,$event)" class="block negative" :class="{'active-negative':setectType===1}">
				{{desc.negative}}<span class="count">{{negatives.length}}</span>
			</span>
		</div>
		<div class="switch" >
			<!--只看有内容的评价-->
			<span @click="toggleContent" class="icon-check_circle" :class="{'on':onlyContent}"></span>
			<span class="text">只看有内容的评价</span>
		</div>	
	</div>	
</template>

<script>
	const POSITIVE=0;		//满意
	const NEGATIVE=1;		//吐槽
	const ALL=2;			//全部
export default{
	props:{
		ratings:{			//把评论的数据传给子组件
			type:Array,
			default(){
				return [];
			}
		},
		setectType:{		//
			type:Number,
			default:ALL
		},
		onlyContent:{		//仅显示内容
			type:Boolean,
			default:false
		},
		desc:{				//描述
			type:Object,
			default(){
				return {
					all:		"全部",
					positive:	"满意",
					negative:	"不满意"
				};
			}
		}
	},
	methods:{
		select(type,event){
			if(!event._constructed){//当检测是否为原生的
				return;	//如果是插件的，那么久return掉
			}
			this.setectType=type;
			this.$emit('ratingtype.select',type);	//向负组件派发一个事件把type值传出去
		},
		
		toggleContent(){
			if(!event._constructed){//当检测是否为原生的
				return;	//如果是插件的，那么久return掉
			}
			this.onlyContent=!this.onlyContent;
			this.$emit('content.toggle',this.onlyContent);
		}
		
	},
	computed:{
		positives(){
			return this.ratings.filter((rating)=>{
				return rating.rateType===POSITIVE;
			})	
		},
		negatives(){
			return this.ratings.filter((rating)=>{
				return rating.rateType===NEGATIVE;
			})	
		}
	}
	
	
}
</script>

<style >
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
		color: rgb(77,85,93);
	}
	
	
	.ratingselect .rating-type .all{
		background: rgba(0,160,220,0.2);
	}
	.ratingselect .rating-type .active-all{
		background: rgb(0,160,220);color: rgb(255,255,255);
	}
	
	.ratingselect .rating-type .positive{
		background: rgba(0,160,220,0.2);
	}
	.active-positive{
		background: rgb(0,160,220);
		color: rgb(255,255,255);
	}
	
	.negative{
		background: rgba(77,85,93,0.2);
	}
	.active-negative{
		background: rgb(0,160,220);color: rgb(255,255,255);
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