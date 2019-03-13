<template>
<div class="goodinfo">
    <!--这是用户头像-->
    <div class="title">
        推荐关注
    </div>
    <div class="img">
        <div class="img-circle">
           <div class="img-header">
            <img src="../../../img/y.jpg" alt="">
            </div>
        </div>
          <div class="img-circle">
           <div class="img-header">
            <img src="../../../img/y.jpg" alt="">
            </div>
        </div>
          <div class="img-circle">
           <div class="img-header">
            <img src="../../../img/y.jpg" alt="">
            </div>
        </div>
          <div class="img-circle">
           <div class="img-header">
            <img src="../../../img/y.jpg" alt="">
            </div>
        </div>
          <div class="img-circle">
           <div class="img-header">
            <img src="../../../img/y.jpg" alt="">
            </div>
        </div>
    </div>
    <!--这是广告图片-->
    <div class="img-ad">
    <img src="../../../img/55.jpg" alt="">
    </div>
    <!--这是用户评论区-->
    <div class="title">热点评论</div>
    <div class="content">
        <div class="img-header1">
           <img src="../../../img/y.jpg" alt=""><span>西西里的美丽传说</span>
        </div>
        <div>
            <div style="width:15%"></div>
               <div class="content-img" style="width:85%">
                <p>超爱这款蛋糕~~我的最爱</p>
                <img src="../../../img/22.png" alt="">
            </div>
        </div>
    </div>
    <div class="content">
        <div class="img-header1">
           <img src="../../../img/y.jpg" alt=""><span>西西里的美丽传说</span>
        </div>
        <div>
            <div style="width:15%"></div>
               <div class="content-img" style="width:85%">
                <p>草莓控,酸酸甜甜我的最爱</p>
                <img src="../../../img/33.png" alt="">
            </div>
        </div>
    </div>
    <!--这是精彩推荐-->
    <div class="title">
        精彩推荐
    </div>
    <div class="img-ad-footer">
    <img src="../../../img/c.png" alt="">
    </div>
</div>
</template>
<script>
    export default{
        created() {
            //接收父级的ID
            console.log(this.$route.query.id);
        },
    }
</script>
<style scoped>
.title{
    margin:2rem 1rem 0;;
    border-left:2px solid #c62b3a;
    padding-left:10px;
}
    .img{
        padding:1rem;
        width:100%;
        display:flex;
        justify-content:space-around;
    }
    .img .img-circle{
        width:3rem;
        height:3rem;
        border:2px solid #c62b3a;
        border-radius:50%;
        overflow:hidden;

    }
    .content .img-header1{
        width:3rem;
        height:3rem;
        border-radius:50%;
        overflow:hidden;
    }
    .content div{
        display:inline-block;
    }
    .img-header1 span{
        color:#c62b3a;
    }
    .img .img-header img,.content .img-header1 img,.img-ad,.img-ad img,.content-img img,.img-ad-footer img{
        width:100%;
    }
   
</style>