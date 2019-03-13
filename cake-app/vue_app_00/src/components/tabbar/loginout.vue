<template>
   <div class="profile">
         <div class="app-register">  
            <div class="mui-card">
				<div class="mui-card-header">
                <h3>欢迎登录</h3>
                </div>
				<div class="mui-card-content">
					<div class="mui-card-content-inner">
                         <!--<div class="address">
                            <mt-button @click.stop="toEditAddressPage">我的地址<i class="el-icon-arrow-right"></i></mt-button>
                            </div> -->
						<form>
                            <mt-button size="large" @click.prevent="logout"style="background:#c62b3a; color:#fff">退出登录</mt-button>
                        </form>
					</div>
				</div>
			</div>  
        </div>
      <transition enter-active-class="slideInRight">
        <router-view></router-view>
      </transition>
  </div>   
</template>
<script>
import {Toast} from 'mint-ui'
export default{
    data(){
        return{
            uid:"",
        }
    },
    methods:{
          logout(){
                this.axios.get("http://127.0.0.1:3000/loginExit")
                .then(res=>{
                    Toast(res.data.msg)
                    this.$router.push("/login")
                })
            }
    }
}
</script>

<style scoped>
.slideInRight{
  animation-duration: 0.25s;
}

</style>