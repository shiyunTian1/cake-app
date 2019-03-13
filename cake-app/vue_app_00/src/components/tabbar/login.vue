<template>
     <div class="app-register">  
            <div class="mui-card">
				<div class="mui-card-header"><h3>用户的登录</h3></div>
				<div class="mui-card-content">
					<div class="mui-card-content-inner">
						<form>
                            用户名：<input type="text" value="" placeholder="请输入用户名" v-model="name" /></input>
                            密码：<input type="password" value="" placeholder="请输入密码" v-model="pwd"/></input>
                            <!--这边有一个小Bug,要阻止按钮的默认行为，可以一次性登录成功-->
                            <mt-button size="large" @click.prevent="handLogin" style="background:#c62b3a; color:#fff">登录</mt-button>
                        </form>
					</div>
				</div>
			</div>  
        <div style="text-align:center"><p style="color:#c62b3a" @click="getregister">注册账号  |   忘记密码</p></div>
        </div>
</template>
<script>
import {Toast} from 'mint-ui'
    export default{
        data(){
            return{
                name:"",
                pwd:""
            }
        },
        methods:{
            handLogin(){
                var n=this.name;
                var p=this.pwd;
                var reg=/^[0-9a-z_]{3,12}$/i;
                if(!reg.test(n)){
                    Toast("用户名格式不正确")
                    return;
                }
                if(!reg.test(p)){
                    Toast("密码格式不正确")
                    return;
                }
                var url="http://127.0.0.1:3000/login?name="+n+"&pwd="+p;
                this.axios.get(url).then(result=>{
                    if(result.data.code==1){
                        console.log(this.name)
                        this.$router.push("/loginout")
                    }else{
                        Toast("用户名或密码不正确")
                    }
                })
            },
            getregister(){
                this.$router.push("/register")
            }
        }
    }
</script>
<style scoped>
    
</style>