<template>
<div class="app-register">
<div class="mui-card">
				<div class="mui-card-header"><h3>用户注册</h3></div>
				<div class="mui-card-content">
					<div class="mui-card-content-inner">
						<form>
                        用户名：<input type="text" value="" placeholder="请输入用户名" v-model="name" @blur.prevent="checkName">
                        密码：<input type="password" value="" placeholder="请输入密码" v-model="pwd">
                        确认密码：<input type="password" value="" placeholder="请确认输入密码" v-model="cpwd">
                        <mt-button size="large" type="primary" @click="handleReg" style="background:#c62b3a; color:#fff">注册</mt-button>
                        </form>
					</div>
				</div>
			</div>
</div>
</template>
<script>
    import {Toast} from 'mint-ui';
    export default{
        data(){
            return{
                name:"",//准备双向绑定的数据
                pwd:"",
                cpwd:"",
                isSumit:false//是否允许提交
            }
        },
        methods:{
            checkName(){
             var n=this.name;
             var url="http://127.0.0.1:3000/existsName?name="+n;
             this.axios.get(url).then(result=>{
                 
               //  Toast(result.data.msg)}
               if(result.data.code>0){//用户名可以用
               Toast("可以使用");
                   this.isSumit=true;//允许提交
               }else{//用户名已占用
                Toast("用户名已存在");
                   this.isSumit=false;//禁止提交
               }
             })
            },
            handleReg(){
                if(!this.isSumit){//禁止提交
                Toast("用户名已存在，请修改")
                    return;
                }
                //获取用户名 密码  确认密码   双向绑定
                var n=this.name;
                var p=this.pwd;
                var cp=this.cpwd;
              //  console.log(n+"|"+p+"|"+cp)
                //验证
                var regname=/^[a-z0-9_]{3,12}$/i;
                var regpwd=/^[a-z0-9]{3,12}$/i;
                if(!regname.test(n)){
                    Toast("用户名格式不正确");
                    return;
                }
                if(!regpwd.test(p)){
                    Toast("密码格式不正确");
                    return;
                }
               if(p!=cp){
                   Toast("两次密码不一致，请重新输入");
                   return;
               }
                //发送ajax请求
                //提示
                var url="http://127.0.0.1:3000/Register?name="+n+"&pwd="+p;
               this.axios.get(url).then(result=>{
                  console.log(result)
                   Toast(result.data.msg)
                   //注册成功后到LOGIN
                    this.$router.push("/login")
               })
            }
        }
    }
</script>
<style scoped>
    
</style>
