//vue_app_server 服务器
//   app.js 
//   public/img/banner1.png ...
const express = require("express");
var app = express();
app.use(express.static("public"));
app.listen(3000);
const pool = require("./pool");

//express mysql 参数 request;response
//跨域访问配置
//1:加载模块cors
const cors = require("cors");
//2:配置cors
app.use(cors({
  origin:["http://127.0.0.1:3001",
         "http://localhost:3001"],//允许列表
  credentials:true   //是否验证
}))
//3.加载第三方模块 express-session
const session = require("express-session");
//4.对模块配置
app.use(session({
  secret:"128位随机字符串",   //安全令牌
  resave:false,               //请求保存 
  saveUninitialized:true,      //初始化
  cookie:{                    //sessiid保存时
    maxAge:1000*60*60*24      //存1天   cooki
  }
}));
//功能一:首页轮播
app.get("/getImages",(req,res)=>{
  var rows = [
    {id:1,img_url:"http://127.0.0.1:3000/img/banner1.png"},
    {id:2,img_url:"http://127.0.0.1:3000/img/banner2.png"},
    {id:3,img_url:"http://127.0.0.1:3000/img/banner4.png"},
  ];
  res.send(rows);
})
//首页楼层内容
app.get("/getfloor",(req,res)=>{
  var rows=[
    {id:1,img_url:"http://127.0.0.1:3000/img/1.jpg"},
    {id:2,img_url:"http://127.0.0.1:3000/img/2.jpg"},
    {id:3,img_url:"http://127.0.0.1:3000/img/3.jpg"},
    {id:4,img_url:"http://127.0.0.1:3000/img/4.jpg"},
  ];
  res.send(rows)
})

//用户登录
app.get("/login",(req,res)=>{ 
  //1:获取登录参数
  var name = req.query.name;
  var pwd = req.query.pwd;
  //2:正则
  //3:创建sql
  var sql =" SELECT count(id) as c,id";
     sql +=" FROM cake_login";
     sql +=" WHERE name = ? AND pwd = md5(?)";
  //4:如果参数匹配成功将用户id保存session对象
  pool.query(sql,[name,pwd],(err,result)=>{
       if(err)throw err;
       var c = result[0].c;
       if(c == 1){
         req.session.uid = result[0].id;
         //console.log(req.session.uid)
         res.send({code:1,msg:"登录成功"});
       }else{
         res.send({code:-1,msg:"用户名或密码有误"})
       }
  });
  //5:返回结果
  //  {code:1,msg:"登录成功"}
  //  {code:-1,msg:"用户名或密码错误"}
});

//:商品列表
app.get("/getGoodsList",(req,res)=>{
  //1:参数       pno 页码;pageSize 页大小
  var pno = req.query.pno;
  var pageSize = req.query.pageSize;
  //1.2:默认值
  if(!pno){
    pno = 1;
  }
  if(!pageSize){
    pageSize = 4;
  }
  //2:验证正则表达式
  var reg = /^[0-9]{1,}$/;
  if(!reg.test(pno)){
     res.send({code:-1,msg:"页码格式不正确"});
     return;
  }
  if(!reg.test(pageSize)){
    res.send({code:-2,msg:"页大小格式不正确"});
    return;
  }
  //3:创建sql
  //  查询总页数
  var sql = "SELECT count(id) as c FROM cake_product";
  var progress = 0; //sql执行进度
  obj = {code:1};
  pool.query(sql,(err,result)=>{
       if(err)throw err;
       //console.log(result[0].c);
       var pageCount = Math.ceil(result[0].c/pageSize);
       obj.pageCount = pageCount;
       progress += 50;
       if(progress == 100){
        res.send(obj);
       }
  });
  //  查询当前页内容
var sql=" SELECT id,title,img_url,details,price";
    sql +=" FROM cake_product";
    sql +=" LIMIT ?,?"
var offset = parseInt((pno-1)*pageSize);
pageSize = parseInt(pageSize);
  pool.query(sql,[offset,pageSize],(err,result)=>{
    if(err)throw err;
    //console.log(result);
    obj.data = result;
    progress+=50;
    if(progress==100){
      res.send(obj);
    }
  }); 
});

//用户注册
app.get("/register",(req,res)=>{
  var name=req.query.name;
  var pwd=req.query.pwd;
  //1.1：验证
  var reg=/^[a-z0-9_]{3,12}$/;
  if(!reg.test(name)){
    res.send({code:-1,msg:"用户名格式不正确"});
    return;
  }
  var sql="INSERT INTO cake_login VALUES(null,?,md5(?))";
  pool.query(sql,[name,pwd],(err,result)=>{
    if(err)throw err;
    if(result.affectedRows>0){
        res.send({code:1,msg:"注册成功!"})
    }else{
      res.send({code:-1,msg:"注册失败！"})
    }
  })
})
//用户名是否存在
app.get("/existsName",(req,res)=>{
  var name=req.query.name;
  var sql="SELECT count(id) as c FROM cake_login WHERE name=?";
  pool.query(sql,[name],(err,result)=>{
    if(err) throw err;
    if(result[0].c>0){
      res.send({code:-1,msg:"用户名已存在"})
    }else{
      res.send({code:1,msg:"可以使用"})
    }
  })
})

//用户广场头像内容
app.get("/gethead",(req,res)=>{
  var rows=[
    {id:1,img_url:"http://127.0.0.1:3000/img/y1.jpg"},
    {id:2,img_url:"http://127.0.0.1:3000/img/y2.jpg"},
    {id:3,img_url:"http://127.0.0.1:3000/img/y1.jpg"},
    {id:4,img_url:"http://127.0.0.1:3000/img/y2.jpg"},
  ];
  res.send(rows)
})


//功能八：查询商品详细信息
app.get("/getProduct",(req,res)=>{
  var pid=req.query.id;
  var sql="SELECT `id`, `title`, `img_url`, `details`, `price` FROM `cake_product` WHERE id=?";
  pool.query(sql,[pid],(err,result)=>{
    if(err) throw err;
    res.send({code:1,data:result[0]})
  })
})

//功能九：发表评论
app.get("/addComment",(req,res)=>{
  var nid=req.query.nid;
  var content=req.query.content;
  //sql
  var sql="INSERT INTO `cake_comment`(`id`, `content`, `ctime`, `nid`) VALUES (null,?,now(),?)";
  pool.query(sql,[content,nid],(err,result)=>{
    if(err)throw err;
    if(result.affectedRows>0){
      res.send({code:1,msg:"评论添加成功"});
    }else{
      res.send({code:-1,msg:"评论添加失败"});
    }
  })
  //3 json{code:1,msg:""}
})

//获得用户评论列表
//:商品列表
app.get("/getComments",(req,res)=>{
  //1:参数       pno 页码;pageSize 页大小
  var pno = req.query.pno;
  var pageSize = req.query.pageSize;
  //1.2:默认值
  if(!pno){
    pno = 1;
  }
  if(!pageSize){
    pageSize = 4;
  }
  //2:验证正则表达式
  var reg = /^[0-9]{1,}$/;
  if(!reg.test(pno)){
     res.send({code:-1,msg:"页码格式不正确"});
     return;
  }
  if(!reg.test(pageSize)){
    res.send({code:-2,msg:"页大小格式不正确"});
    return;
  }
  //3:创建sql
  //  查询总页数
  var sql = "SELECT count(id) as c FROM cake_comment";
  var progress = 0; //sql执行进度
  obj = {code:1};
  pool.query(sql,(err,result)=>{
       if(err)throw err;
       //console.log(result[0].c);
       var pageCount = Math.ceil(result[0].c/pageSize);
       obj.pageCount = pageCount;
       progress += 50;
       if(progress == 100){
        res.send(obj);
       }
  });
  //  查询当前页内容
var sql=" SELECT id,content,ctime";
    sql +=" FROM cake_comment";
    sql +=" LIMIT ?,?"
var offset = parseInt((pno-1)*pageSize);
pageSize = parseInt(pageSize);
  pool.query(sql,[offset,pageSize],(err,result)=>{
    if(err)throw err;
    //console.log(result);
    obj.data = result;
    progress+=50;
    if(progress==100){
      res.send(obj);
    }
  }); 
});

/*功能做到这里了*/
//功能七：将商品信息添加至购物车
app.get("/addCart",(req,res)=>{
  //此处查询是否有这个用

  var uid=parseInt(req.session.uid);
  var pid=parseInt(req.query.pid);
  var price=parseFloat(req.query.price);
  var count=parseInt(req.query.count);
  //2.sql 
  var sql="INSERT INTO `cake_cart`(`id`, `uid`, `pid`, `price`, `count`) VALUES (null,?,?,?,?)";
  pool.query(sql,[uid,pid,price,count],(err,result)=>{
    if(err) throw err;
    if(result.affectedRows>0){
     // console.log(result)
      res.send({code:1,msg:"添加成功"})
    }else{
      res.send({code:-1,msg:"添加失败"})
    }
  })
})


//功能十二：查询购物车中数据
app.get("/getCartList",(req,res)=>{
  //1.参数
  var uid=req.session.uid;
  //2.sql  多表查询
 /* var sql="SELECT p.title,c.count,c.price,c.id,p.img_url,c.uid FROM cake_product as p,cake_cart as c WHERE p.id=c.pid AND c.uid=?"*/
 var sql="SELECT p.title,c.count,c.price,c.id,p.img_url FROM cake_product as p,cake_cart as c WHERE p.id=c.pid AND c.uid=?"
  pool.query(sql,[uid],(err,result)=>{
    // console.log(result)
    if(err) throw err;
    res.send({code:1,data:result})
  }) 
})

//功能十三:同步购物中商品数量
app.get("/updateCart",(req,res)=>{
  //1:参数 id count
  var id = parseInt(req.query.id);
  var count = parseInt(req.query.count);
  //2:sql UPDATE
  var sql = " UPDATE cake_cart SET count = ?";
     sql += " WHERE id = ?";
  pool.query(sql,[count,id],(err,result)=>{
    if(err)throw err;   //17:30 sub add
    if(result.affectedRows > 0){
      res.send({code:1,msg:"更新成功"});
    }else{
      res.send({code:-1,msg:"更新失败"});
    }
  })
  //3:json {code:1,msg:""}
})

//功能十四：退出登录
app.get("/loginExit",(req,res)=>{
  var uid=req.session.uid;
  if(uid!=undefined){
  uid=null;
  res.send({code:1,msg:"退出成功"})}
  else{
    res.send({code:1,msg:"请先登录"})
  }
})
