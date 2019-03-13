<template>
      <!--商品信息-->
    <div class="mui-card">
      <div class="mui-card-content">
      <img :src="info.img_url" alt="">
        <div class="mui-card-inner">
            <div class="ms">{{info.details}}</div>
           <div class="price">
              销售价:<span class="price">{{info.price}}</span>
           </div>
           购买数量:
           	<div class="mui-numbox" data-numbox-min='1' data-numbox-max='9'>
					<button class="mui-btn mui-btn-numbox-minus" type="button" @click="goodsSub">-</button>
					<input id="test" class="mui-input-numbox" type="number" value="1" v-model="val" />
					<button class="mui-btn mui-btn-numbox-plus" type="button" @click="goodsAdd">+</button>
				</div>

        </div>
        <!--调用评论子组件-->
        <comment-box :id="id"></comment-box>
      </div>
      
        <div class="cart">
            <div @click="buy">加入购物车</div>
            <div @click="buy">立即购买</div>
        </div>
    </div>
</template>
<script>
//引入评论子组件
import {Toast} from "mint-ui";
import  comment from '../sub/comment.vue'
    export default{
        data(){
            return{
                list:[],
                id:this.$route.query.id,
                val:1,
                info:{}
            }
        },
         //2注册评论子组件
            components:{
            "comment-box":comment
        },
        methods:{
            //添加购物车时更新跳转到购物车列表页面
            buy(){
                var uid=this.uid;
                var pid=this.id;
                var count=this.val;
                var price=99;
                var url="http://127.0.0.1:3000/addCart";
                this.axios.get(url,{
                    params:{
                    uid,pid,count,price
                 }
                }).then(result=>{
                    console.log(result)
                     if(result.data.code>0){
                    Toast(result.data.msg);
                    //如果商品添加成功，修改全局共享数据cartCount数量
                    this.$store.commit("increment")
                   // this.$router.push("/goodscart")
                    }else{
                    Toast(result.data.msg)
                 }
                })
                
            },
            //为两个按钮绑定事件
            goodsSub(){
                if(this.val>1){
                    this.val--;
                }
            },goodsAdd(){
                if(this.val<=998){
                    this.val++;
                }
            },
            //获取页面内容
            getdetails(){
            var id=this.id;
            var url="http://127.0.0.1:3000/getProduct?id="+id;
            this.axios.get(url).then(result=>{
               // console.log(result.data.data)
                this.info=result.data.data;
                }
            )
        }
        },
        created() {
            this.getdetails();
        },
        
    }
</script>
<style scoped>
    
    .mui-card img{
        width:100%;
    }
    .mui-card .price{
        color:#c62b3a;
        font-size:14px;
    }
    .cart{
    width:100%;
    height:50px;
    }
    .cart div{
    width:50%;
     height:50px;
     line-height:50px;
     display:inline-block;
     text-align:center;
    }
   
     .cart div:nth-child(1){
       background:#ddd;
       color:#000;
    }
    .cart div:nth-child(2){
       background:#c62b3a;
       color:#fff;
    }
    .ms{
        font-size:20px;
        padding-bottom:10px;
    }
</style>