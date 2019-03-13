<template>
  <div class="app-home">    
    <!--二：轮播图-->
    <mt-swipe :auto="2500" class="app-swipe">
      <mt-swipe-item v-for="item in list" :key="item.id">
        <img :src="item.img_url" alt="">
      </mt-swipe-item>
    </mt-swipe>
    <!--三：九宫格-->
    <ul class="mui-table-view mui-grid-view mui-grid-9">
      <li class="mui-table-view-cell mui-media mui-col-xs-3 mui-col-sm-3"><router-link to="/goodlist">
        <img src="../../img/menu1.png" alt="">
        <div class="mui-media-body">商品资讯</div></router-link></li>
      <li class="mui-table-view-cell mui-media mui-col-xs-3 mui-col-sm-3"><router-link to="/goodlist">
        <img src="../../img/menu2.png" alt="">
        <div class="mui-media-body">商品中心</div></router-link></li>
      <li class="mui-table-view-cell mui-media mui-col-xs-3 mui-col-sm-3"><router-link to="/goodscart">
        <img src="../../img/menu3.png" alt="">
        <div class="mui-media-body">购物车</div></router-link></li>
      <li class="mui-table-view-cell mui-media mui-col-xs-3 mui-col-sm-3"><a href="#">
        <img src="../../img/menu4.png" alt="">
        <div class="mui-media-body">支付</div></a></li>
    </ul>
    <!--分类推荐一楼-->
    <div class="floor">
      <div class="gang"></div>超值组合<div class="gang"></div>
      <div class="floor-list">
        <div v-for="item,i in list1" :key="item.id">
        <img :src="item.img_url" alt=""></div>
      </div>
    </div>
    <!--这是二楼-->
       <div class="floor">
      <div class="gang"></div>精心推荐<div class="gang"></div>
      <div class="floor-list">
        <div v-for="item,i in list1" :key="item.id"><img :src="item.img_url" alt=""></div>
      </div>
    </div>
    <!--这是视频-->
      <div class="floor">
          <div class="gang"></div>精美食材<div class="gang"></div>
      </div>
    <div class="video">
          <video src="../../../img/index.mp4" autoplay controls webkit-playsinline="true" x5-video-player-type="h5" x5-video-player-fullscreen="true" x5-video-orientation="portraint" id="v3" controls></video>
    </div>
  </div>
</template>
<script>
  export default {
    methods:{
     // 获取服务器端的图片列表
      getImages(){
        this.axios.get("http://127.0.0.1:3000/getImages").then(result=>{

        this.list=result.data;
        })
      },
      getfloor(){
        
        this.axios.get("http://127.0.0.1:3000/getfloor").then(res=>{
          this.list1=res.data;
        })
      }
    },
    data(){
      return {
        list:[],
        list1:[],
        listfloor:[],
      }
    },
    created() {
      this.getImages();
      this.getfloor();
    }
  }
</script>
<style scoped>  
  .app-home .app-swipe{height:12rem;}
  .app-swipe  img{width:100%;height:13rem;}
  .app-home .mui-grid-9{ background:#fff; }
  .app-home .mui-grid-9 img{ width:40px;}
  .app-home .mui-grid-9 li{ border:none; }
  .floor{
    width:100%;
    text-align:center;
    padding-top:2em;
  }
  .floor .gang{
    display:inline-block;
    width:2.6rem;
    height:0.2rem;
    background: #c62b3a;
    margin-bottom:0.16rem;
    margin-right:0.13rem;
    margin-left:0.13rem;
} 
.floor .floor-list{
  width:100%;
  background:#fff;
  display:flex;
  justify-content:space-between;
  margin-top:1em;
}
.floor-list div{
  width:24%;
}
.floor-list div img{
  border-radius:14px;
  width:100%;
}
.video{
  width:100%;
}
.video video{
  width:100%;
}
</style>