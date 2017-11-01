<template>
	<div class="sellervue" ref="sellervue">
		<div class="seller-content" >
			<div class="seller-overview">
				<h1 class="title">{{seller.name}}</h1>
				<div class="desc">
					<star :size="36" :score="seller.score"></star>
					<span class="text textpadding">({{seller.ratingCount}})</span>
					<span class="text">月售{{seller.sellCount}}单</span>
				</div>
				<ul class="remark">
					<li class="block">
						<h2 class="blocktext">起送价</h2>
						<div class="content">
							<span>{{seller.minPrice}}</span>
						</div>
					</li>
					<li class="block bd-left-right">
						<h2 class="blocktext">商家配送</h2>
						<div class="content">
							<span>{{seller.deliveryPrice}}</span>
						</div>
					</li>
					<li class="block">
						<h2 class="blocktext">平均配送时间</h2>
						<div class="content">
							<span>{{seller.deliveryTime}}</span>
						</div>
					</li>
				</ul>
				<div class="favorite" @click='favorite'>
					<span class="icon-favorite" :class="{'favoritelove':favoriteData}"></span>
					<span class="text" >{{favoriteText}}</span>
				</div>
			</div>
			<spilt></spilt>
			<!--公告与活动-->
			<div class="bulletin-wrapper">
				<div class="bulletin">
					<p class="title">公告与活动</p>
					<p class="content">{{seller.bulletin}}</p>
				</div>	
			</div>
			<!--优惠活动部分-->
			<div class="supports">
				<ul >
					<li class="supportsli" v-for="(item,index) in seller.supports">
						<span class="icon" :class="classMap[seller.supports[index].type]"></span>
						<span class="text">{{seller.supports[index].description}}</span>		
					</li>
				</ul>
			</div>
			<spilt></spilt>
			<div class="sellerPic-wrapper">
				<div class="sellerPic">
					<p class="title">商家实景</p>
					<div class="pics-wrapper" ref='picwrapper'>
						<ul class='sellerPicBox' ref="piclist">
							<li class="sellerPicList" v-for='pic in seller.pics'> 
								<img :src="pic" alt="" />
							</li>
						</ul>
					</div>
					
				</div>
				
			</div>
			<spilt></spilt>
			<div class="sellerInfo-wrapper">
				<div class="sellerInfo">	
					<p class="title">商家信息</p>
					<ul>
						<li class="info" v-for="info in seller.infos">{{info}}</li>
					</ul>
				</div>
			</div>
		</div>

	</div>
	<!--<shopcart></shopcart>-->
</template>

<script>
	import betterscorll from 'better-scroll'
	import star from '../../components/star/star.vue'
	import spilt from '../../components/spilt/spilt.vue'
	import shopcart from '../../components/shopcart/shopcart.vue'
	export default{
		props:{
			seller:{
				type:Object
			}
		},
		methods:{
			favorite(){
				if(!event._constructed){	//当检测是否为原生的
					return					//如果是插件的，那么就return掉
				}
				this.favoriteData=!this.favoriteData;
				if(this.favoriteData){
					localStorage.setItem()
				}
			},
			_initScroll(){
				if(!this.scroll){		//scroll没有被计算过
					this.scroll=new betterscorll(this.$refs.sellervue,{
						click:true				//可以用点击事件
					})	
				}else{
					this.scroll.refresh();		//重新计算scroll的高度
				}
			},
			picbetterscroll(){
				if(this.seller.pics){
					let picWith=120;
					let margin=6;
					let width=(picWith+margin)*this.seller.pics.length-margin;
					this.$refs.piclist.style.width=width+'px';
					
					this.$nextTick(()=>{
						this.picscroll=new betterscorll(this.$refs.picwrapper,{
							//click:true,		
							scrollX:true,
							eventPassthrough:'verti'
						})
					});
					
				}
			}
		},
		data(){
			return{
				favoriteData:false
			}
		},
		created(){
			//这个是用来添加那5个图标的
			this.classMap=['decrease','discount','guarantee','invoice','special']		
		},
		watch:{								////watch监听seller数据是否被传过来了
			'seller'(){			
				this._initScroll();
				this.picbetterscroll();
				//console.log('seller进来了')
			}
		},
		
		mounted(){
			this._initScroll();
			this.picbetterscroll();
		},
		computed:{
			favoriteText(){
				if(this.favoriteData){
					return '已收藏'
				}else{
					return '收藏'
				}
			}
		},
		components:{
			star,
			spilt,
			shopcart
		}
	}
</script>

<style scoped="scoped">
	.sellervue{
		position: absolute;
		top: 174px;bottom:0px;
		width: 100%;
		overflow: hidden;
		border-top: 1px solid rgba(7,17,27,0.1);
	}
	.sellervue .seller-content{
		width: 100%;
	}
	.sellervue .seller-content .seller-overview .title{
		font-size: 14px;
		line-height: 14px;
		color: rgb(7,17,27);
		padding: 18px 0 8px 18px;
	}
	.sellervue .seller-content .seller-overview .desc{
		margin:0 18px 0px 18px ;
		padding-bottom: 18px;
		line-height: 18px;
		font-size: 0;
		border-bottom: 1px solid rgba(7,17,27,0.1);
	}
	.sellervue .seller-content .seller-overview .desc .text{
		font-size: 10px;
		color: rgb(77,85,93);
		line-height: 18px;
		vertical-align: top;
	}
	.sellervue .seller-content .seller-overview .desc .textpadding{
		padding: 0 12px 0 8px;
	}
	.sellervue .star{
		display: inline-block;
				
	}
	
	.sellervue .seller-content .seller-overview .remark{
		display: flex;	
	}
	.sellervue .seller-content .seller-overview .remark .block{
		flex:1;
		text-align: center;
		margin: 18px 0;
	}
	.sellervue .seller-content .seller-overview .remark .bd-left-right{
		border-right: 1px solid rgba(7,17,27,0.1);
		border-left: 1px solid rgba(7,17,27,0.1);
	}
	.sellervue .seller-content .seller-overview .remark .block .content{
		margin-top: 10px;
		font-size: 24px;
		line-height: 24px;
		color: rgb(7,17,27);
		font-weight: 200;
	}
	
	.sellervue .seller-content .seller-overview .remark .block .blocktext{
		font-size: 10px;
		line-height: 10px;
		color: rgb(147,153,159);
	}
	.favorite{
		position: absolute;
		top: 18px;right: 11px;
		width: 50px;text-align: center;
	}
	.favorite .icon-favorite{
		line-height: 24px;
		color: #d4d6d9;
		font-size: 24px;
		display: block;
	}
	.favoritelove{
		color: rgb(240,20,20) !important;
	}
	.favorite .text{
		font-size: 10px;
		color: rgb(77,85,93);
		line-height: 10px;
		display:block;
		margin-top: 4px;
	}
	
	/*公告部分*/
	.sellervue .seller-content .bulletin-wrapper {
		margin: 18px 18px 16px 18px;
	}
	.sellervue .seller-content .bulletin-wrapper .bulletin .title{
		font-size: 14px;
		line-height: 14px;
		color: rgb(7,17,27);
		padding: 0 0 8px 0px;
	}
	.sellervue .seller-content .bulletin-wrapper .bulletin .content{
		font-size: 12px;font-weight: 200;color: rgb(240,20,20);line-height: 24px;
		padding: 0 12px;
	}
	
	/*优惠活动部分*/
	/*五个图标的css*/
	.sellervue .seller-content .supports{
		padding: 0 18px;
	}
	.sellervue .seller-content .supports .supportsli{
		padding: 16px 0 16px 12px;
		border-top: 1px solid rgba(7,17,27,0.1);
	}
	.sellervue .seller-content .supports .icon{
		display: inline-block;
		width: 14px;
		height: 14px;
		background-size:14px 14px ;
		background-repeat:no-repeat;
	}
	
	.sellervue .seller-content .supports .text{
		font-size: 12px;font-weight: 200;color: rgb(7,17,27);line-height: 16px;vertical-align: top;
	}
	
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
	
	
	/*商家信息*/
	.sellerInfo-wrapper{
		
	}
	.sellerInfo-wrapper .sellerInfo{
		margin: 18px 18px 16px 18px;
	}
	.sellerInfo-wrapper .sellerInfo .title{
		font-size: 14px;
		line-height: 14px;
		color: rgb(7,17,27);
		padding: 0 0 8px 0px;
	}
	.sellerInfo-wrapper .sellerInfo .info{
		font-size: 12px;
		line-height: 14px;
		color: rgb(7,17,27);
		line-height: 16px;
		font-weight: 200;
		padding: 16px 0 16px 12px;
		border-top: 1px solid rgba(7,17,27,0.1);
	}
	/*商家实景*/
	.sellerPic-wrapper .sellerPic{
		margin: 18px 18px 16px 18px;
	}
	.sellerPic-wrapper .sellerPic .title{
		font-size: 14px;
		line-height: 14px;
		color: rgb(7,17,27);
		padding: 0 0 8px 0px;
	}
	
	.pics-wrapper{
		width: 100%;
		overflow: hidden;
		white-space: nowrap;
	}
	
	.pics-wrapper .sellerPicBox {
		font-size: 0;
	}
	.sellerPicList{
		display: inline-block;
		width: 120px;height: 90px;
		margin-right: 6px;
	}
	.sellerPicList:last-child{
		margin-right: 0px;
	}
	.sellerPicList img{
		width: 120px;height: 90px;
	}
	
</style>
