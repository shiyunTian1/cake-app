<template>
 <div class="app-container">
    <!--一：顶部导航条 学子商城-->
    <mt-header fixed title="蛋糕商城" class="mt-header"></mt-header>
    <router-view></router-view>
    <!--四：底部导航栏 tabbar-->
    <nav class="mui-bar mui-bar-tab">
			<router-link class="mui-tab-item-tao mui-active" to="/">
				<span class="mui-icon mui-icon-home"></span>
				<span class="mui-tab-label">首页</span>
			</router-link>
			<router-link class="mui-tab-item-tao" to="/login">
				<span class="mui-icon mui-icon-contact"></span>
				<span class="mui-tab-label">会员</span>
			</router-link>
			<router-link class="mui-tab-item-tao" to="/goodscart">
				<span class="mui-icon mui-icon-extra mui-icon-extra-cart"><span class="mui-badge">{{$store.getters.optCartCount}}</span></span>
				<span class="mui-tab-label">购物车</span>
			</router-link>
			<router-link class="mui-tab-item-tao" to="/goodrecommend">
				<span class="mui-icon mui-icon-search"></span>
				<span class="mui-tab-label">广场</span>
			</router-link>
	</nav>
 </div>
</template>

<style>
   .app-container{
     padding-top:40px;
     padding-bottom:50px;
     overflow-x:hidden;
   }
    .app-container .mt-header{
        background:#c62b3a;
    }
 .mui-bar-tab .mui-tab-item-tao.mui-active {
    color: #000;
 }
.mui-bar-tab .mui-tab-item-tao {
    display: table-cell;
    overflow: hidden;
    width: 1%;
    height: 50px;
    text-align: center;
    vertical-align: middle;
    white-space: nowrap;
    text-overflow: ellipsis;
    color: #c62b3a;
}
.mui-bar-tab .mui-tab-item-tao .mui-icon {
    top: 3px;
    width: 24px;
    height: 24px;
    padding-top: 0;
    padding-bottom: 0;
}

.mui-bar-tab .mui-tab-item-tao .mui-icon~.mui-tab-label {
   font-size:11px;
   display:block;
   overflow:hidden;
   text-overflow:ellipsis;
}
</style>
