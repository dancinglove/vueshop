<template>
	<div class="header">
		<!--上面的整个内容区域-->
		<div class="content-warpper">
			<div class="awart">		<!--头像-->
				<img :src="seller.avatar" alt="" width="64" height="64"/>
			</div>
			<div class="content">
				<div class="title">
					<span class="brand"></span>
					<span class="name">{{seller.name}}</span>
				</div>
				<div class="descript">
					{{seller.description}}/{{seller.deliveryTime}}分钟送达
				</div>
				<div v-if="seller.supports">
					<span class="icon" :class="classMap[seller.supports[0].type]"></span>
					<span class="text">{{seller.supports[0].description}}</span>
				</div>
				<div  v-if="seller.supports" class="suppot-count" @click="showDetail">
					<span class="count">{{seller.supports.length}}个</span>
					<i class="icon-keyboard_arrow_right"></i>
				</div>
			</div>
			<!--<span class="icon-add_circle"></span>-->
		</div>


		<!--下面的公告区域-->
		<div class="bulletin-warpper" @click="showDetail">
			<span class="bulletin-title"></span><span class="bulletin-text">{{seller.bulletin}}</span>
			<i class="icon-keyboard_arrow_right"></i>
		</div>



		<!--背景层部分-->
		<div class="background">
			<img :src="seller.avatar" width="100%" height="100%" alt="" />
		</div>



		<!--这是蒙层部分-->
		<div class="detail" v-show="detailShow">
			<div class="detail-wrapper">
				<div class="detail-main clearfix">
					<h1 class="name">{{seller.name}}</h1>
				</div>

				<div class="star-warpper">
					<star :score='seller.score' :size='48' ></star>
				</div>

				<div class="detailTitle">
					<div class="line"></div>
					<div class="detailText">优惠信息</div>
					<div class="line"></div>
				</div>

				<div class="supports-part">
					<ul v-if="seller.supports" class="supports">
						<li v-for="(item,index) in seller.supports" class="supports-item">
							<span class="icon" :class="classMap[seller.supports[index].type]"></span>
							{{item.description}}
						</li>
					</ul>
				</div>
				
				<div class="detailTitle">
					<div class="line"></div>
					<div class="detailText">商家公告</div>
					<div class="line"></div>
				</div>
				<div class="shopTolder">
					{{seller.bulletin}}
				</div>
			</div>
			<div class="detail-close " @click="closeDetail">
				<strong class="icon-close"></strong>
			</div>
		</div>



	</div>
</template>

<script>
import star from '../../components/star/star.vue'		//商家评论分数的组件

export default{
	props:{		//接收App.vue传过来的seller数据
		seller:{
			type:Object
		}
	},
	data(){
		return{
			detailShow:false
		}

	},
	methods:{
		showDetail(){
			this.detailShow=true
		},
		closeDetail(){
			this.detailShow=false
		}
	},
	created(){
		this.classMap=['decrease','discount','guarantee','invoice','special']
	},
	
	components:{		//引入的组件，需要挂载到components
		star
	}
}
</script>

<style>
/*清除浮动的部分*/
	.clearfix{
		display: inline-block;
	}
	.clearfix:after{
		display: block;
		content:" .";
		height: 0;
		line-height: 0;
		clear: both;
		visibility: hidden;
	}


	.header{
		background: rgba(7,17,27,0.5);
		color:rgb(255,255,255) ;
		position: relative;
		overflow: hidden;
	}
	/*<!--上面的整个内容区域-->*/
	.header .content-warpper{
		position: relative;
		padding: 24px 16px 18px 24px;
		font-size: 0;
	}
	/*左边的图片*/
	.header .content-warpper .awart{
		display: inline-block;
		vertical-align: top;
	}
	.header .content-warpper .awart img{
		border-radius: 2px;width: 64px;height: 64px;
	}
	/*右边的文本*/
	.header .content-warpper .content{
		display: inline-block;
		font-size: 14px;
		margin-left:16px ;
	}
	.header .content-warpper .content .title{
		margin:2px 0 8px 0 ;
	}
	.header .content-warpper .content .title .brand{
		display: inline-block;
		width: 30px;height: 18px;
		background-image: url(brand@2x.png);
		background-size:30px 18px;
		background-repeat:no-repeat;
		vertical-align: top;
	}
	.header .content-warpper .content .title .name{
		margin-left: 6px;
		font-size: 16px;
		font-weight: bold;
		line-height: 18px;

	}
	.header .content-warpper .content .descript{
		margin-bottom: 10px;
		font-weight: 200;
		font-size: 12px;line-height: 12px;color:rgb(255,255,255) ;
	}
	.header .content-warpper .content .icon{
		width: 12px;
		height: 12px;
		display: inline-block;
		background-size:12px 12px ;
		background-repeat:no-repeat;
	}
	
	/*五个增删该查的部分的图片*/
	.decrease{
		background-image: url(decrease_1@2x.png);
	}
	.discount{
		background-image: url(discount_1@2x.png);
	}
	.guarantee{
		background-image: url(guarantee_1@2x.png);
	}
	.invoice{
		background-image: url(invoice_1@2x.png);
	}
	.special{
		background-image: url(special_1@2x.png);
	}




	.header .content-warpper .content .text{
		font-size: 10px;line-height: 12px;font-weight: 200;vertical-align: top;
	}
	.header .content-warpper .content .suppot-count{
		position: absolute;
		right: 12px;bottom:18px;
		padding: 0px 8px;
		height: 24px;
		line-height: 24px;
		border-radius: 14px;
		background: rgba(0,0,0,0.2);
		text-align: center;font-size: 0;
	}
	.header .content-warpper .content .suppot-count .count{
		vertical-align: top;
		font-size: 10px;
	}
	.header .content-warpper .content .suppot-count .icon-keyboard_arrow_right{
		margin: 2px 0 0 2px;
		font-size: 10px;
		line-height: 24px;
	}


	/*商家公告部分*/
	.header .bulletin-warpper{
		height: 28px;
		line-height: 28px;
		padding: 0 22px 0 12px;
		white-space: nowrap;
		text-overflow: ellipsis;
		overflow: hidden;
		background-color: rgba(7,17,27,0.2);
		position: relative;
	}
	.header .bulletin-warpper .bulletin-title{
		vertical-align: top;
		display: inline-block;
		width: 22px;
		height: 12px;
		background-image:url(bulletin@2x.png) ;
		background-size:22px 12px ;
		background-repeat:no-repeat;
		margin-top: 8px;
	}
	.header .bulletin-warpper .bulletin-text{
		vertical-align: top;font-size: 10px;margin:0  4px;
	}
	.header .bulletin-warpper .icon-keyboard_arrow_right{
		position: absolute;right: 12px;top: 8px;font-size: 10px;
	}

	/*最底层的背景图片*/
	.header .background{
		position: absolute;
		top: 0;left: 0;
		width: 100%;height: 100%;
		z-index: -1;

	}

	/*蒙层部分的详细介绍页面*/
	.header .detail{
		position: fixed;top: 0;
		z-index: 100;
		width: 100%;height: 100%;
		overflow: auto;
		background: rgba(7,17,27,0.8);
	}

	.header .detail .detail-wrapper{
		min-height: 100%;
	}
	.header .detail .detail-wrapper .detail-main{
		margin-top: 64px;
		width: 100%;
		padding-bottom: 64px;
	}

	.header .detail .detail-wrapper .detail-main .name{
		line-height: 16px;
		font-weight: 700;
		font-size: 16px;
		text-align: center;
	}
	.header .detail .detail-wrapper .star-warpper{
		margin-top:18px ;padding: 2px 0;text-align: center;
	}
	.header .detail .detail-wrapper .detailTitle {
		display: flex;
		width: 80%;
		margin: 30px auto 24px auto;
	}
	.header .detail .detail-wrapper .detailTitle .line{
		flex: 1;
		position: relative;
		top: -6px;
		border-bottom: 1px solid rgba(255,255,255,0.2);
	}
	.header .detail .detail-wrapper .detailTitle .detailText{
		padding: 0 12px;font-size: 14px;
	}
	.header .detail .detail-wrapper .supports-part{
		width: 80%;margin-left: 10%;/*margin-top: 24px;*/
	}
	.header .detail .detail-wrapper .supports-part li{
		font-size: 12px;font-weight: 200;line-height: 12px;color: rgb(255,255,255);
		margin: 0 0 12px 0;
	}
	.header .detail .detail-wrapper .supports-part .supports .supports-item .icon{
		width: 12px;
		height: 12px;
		display: inline-block;
		background-size:12px 12px ;
		background-repeat:no-repeat;
		margin: 0px 6px 0 0;vertical-align: top;
	}
	.header .detail .detail-wrapper .shopTolder{
		width: 80%;
		margin: 0 12px;
		margin: auto;
		font-size: 12px;
		font-weight: 200;
		color: rgb(255,255,255);
		line-height: 24px;
	}

	.header .detail .detail-close{
		position: relative;
		width: 32px;
		height: 32px;
		margin: -64px auto 0 auto;clear:both;
		font-size: 32px;
	}


	/*布局这块的写法  2x和3x图片*/
	@media(-webkit-min-device-pixel-ratio:3),(min-device-pixel-ratio:3){
		.bulletin-warpper .bulletin-title{
			background-image: url(bulletin@3x.png);
		}
		.header .content-warpper .content .title .brand{
			background-image: url(brand@3x.png);
		}
		.decrease{
			background-image: url(decrease_1@3x.png);
		}
		.discount{
			background-image: url(discount_1@3x.png);
		}
		.guarantee{
			background-image: url(guarantee_1@3x.png);
		}
		.invoice{
			background-image: url(invoice_1@3x.png);
		}
		.special{
			background-image: url(special_1@3x.png);
		}
	}

</style>
