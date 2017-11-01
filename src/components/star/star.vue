<template>
	<div class="star" :class="starType">
		<span v-for="itemClass in itemClasses" :class="itemClass" class="star-item">	
		</span>
	</div>
</template>

<script>
	const Length=5;
	const CLS_ON="on";
	const CLS_HALF="half";
	const CLS_OFF="off";
	export default{
		props:{						//传过来的尺寸和分数
			size:{
				type:Number			//star有24/36/48三种尺寸
			},
			score:{
				type:Number			//需要判断多少分数，然后来给星星什么样式
			}
		},
		computed:{//传过来的尺寸和分数（拼接出来不同的样式  star-24）
			starType(){
				return 'star-'+this.size
			},
			itemClasses(){
				//
				let result=[];
				let score=Math.floor(this.score*2)/2;	//算出分数有没有大于0.5
				let hasDecimal=score%1!==0	;//计算有没有half
				let integer=Math.floor(score);
				for(let i=0;i<integer;i++){//on的个数
					result.push(CLS_ON);
				}
				if(hasDecimal){//判断有没有half
					result.push(CLS_HALF);
				}
				while(result.length<Length){
					result.push(CLS_OFF);//补齐off
				}//console.log(result)
				return result
			}
		}
		
	}
</script>

<style scoped="scoped">
	.star{
		font-size: 0;
	}
	.star .star-item{
		display: inline-block;
		background-repeat:no-repeat;
	}
	
	
	.star-48 .star-item{
		width: 20px;height: 20px;margin-right: 22px;background-size:20px 20px;	
	}
	.star-48 .star-item:last-child{
		margin-right: 0;
	}
	.star-48 .on{
		background-image:url(star48_on@2x.png);
	}
	.star-48  .half{
		background-image: url(star48_half@2x.png);
	}
	.star-48  .off{
		background-image: url(star48_off@2x.png);
	}
	
	
	
	.star-36 .star-item{
		width: 15px;height: 15px;margin-right: 16px;background-size:15px 15px;	
	}
	.star-36 .star-item:last-child{
		margin-right: 0;
	}
	.star-36 .on{
		background-image: url(star36_on@2x.png);
	}
	.star-36 .half{
		background-image: url(star36_half@2x.png);
	}
	.star-36 .off{
		background-image: url(star36_off@2x.png);
	}
	
	
	
	.star-24 .star-item{
		width: 10px;height: 10px;margin-right: 3px;background-size:10px 10px;	
	}
	.star-24 .star-item:last-child{
		margin-right: 0;
	}
	.star-24 .on{
		background-image: url(star24_on@2x.png);
	}
	.star-24 .half{
		background-image: url(star24_half@2x.png);
	}
	.star-24 .off{
		background-image: url(star24_off@2x.png);
	}
</style>