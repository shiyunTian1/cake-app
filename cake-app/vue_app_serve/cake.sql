SET NAMES UTF8;
DROP DATABASE IF EXISTS cake;
CREATE DATABASE cake CHARSET=UTF8;
USE cake;


#用户注册
# 用户登录:id name pwd 
# 用户信息:avatar phone addr ..
CREATE TABLE cake_login(
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(25),
  pwd  VARCHAR(32)
);
INSERT INTO cake_login VALUES(null,'tom',md5('123'));
INSERT INTO cake_login VALUES(null,'jerry',md5('123'));




CREATE TABLE cake_product(
   id  INT PRIMARY KEY AUTO_INCREMENT,
   title  VARCHAR(255),
  details  VARCHAR(255),
   img_url VARCHAR(255),
   price DECIMAL(20)
);
INSERT INTO cake_product VALUES
(NULL, '倾心雪域冰淇淋蛋糕', '幸福 甜蜜 快乐 微笑', 'http://127.0.0.1:3000/1.jpg', 188),
(NULL, '倾心雪域冰淇淋蛋糕', '幸福 甜蜜 快乐 微笑', 'http://127.0.0.1:3000/2.jpg', 288),
(NULL, '倾心雪域冰淇淋蛋糕', '幸福 甜蜜 快乐 微笑', 'http://127.0.0.1:3000/3.jpg', 288),
(NULL, '倾心雪域冰淇淋蛋糕', '幸福 甜蜜 快乐 微笑', 'http://127.0.0.1:3000/4.jpg', 288),
(NULL, '倾心雪域冰淇淋蛋糕', '幸福 甜蜜 快乐 微笑', 'http://127.0.0.1:3000/5.jpg', 288),
(NULL, '倾心雪域冰淇淋蛋糕', '幸福 甜蜜 快乐 微笑', 'http://127.0.0.1:3000/6.jpg', 288),
(NULL, '倾心雪域冰淇淋蛋糕', '幸福 甜蜜 快乐 微笑', 'http://127.0.0.1:3000/7.jpg', 288),
(NULL, '倾心雪域冰淇淋蛋糕', '幸福 甜蜜 快乐 微笑', 'http://127.0.0.1:3000/8.jpg', 298),
(NULL, '倾心雪域冰淇淋蛋糕', '幸福 甜蜜 快乐 微笑', 'http://127.0.0.1:3000/1.jpg', 188),
(NULL, '倾心雪域冰淇淋蛋糕', '幸福 甜蜜 快乐 微笑', 'http://127.0.0.1:3000/2.jpg', 288),
(NULL, '倾心雪域冰淇淋蛋糕', '幸福 甜蜜 快乐 微笑', 'http://127.0.0.1:3000/3.jpg', 288),
(NULL, '倾心雪域冰淇淋蛋糕', '幸福 甜蜜 快乐 微笑', 'http://127.0.0.1:3000/4.jpg', 288),
(NULL, '倾心雪域冰淇淋蛋糕', '幸福 甜蜜 快乐 微笑', 'http://127.0.0.1:3000/5.jpg', 288),
(NULL, '倾心雪域冰淇淋蛋糕', '幸福 甜蜜 快乐 微笑', 'http://127.0.0.1:3000/6.jpg', 288),
(NULL, '倾心雪域冰淇淋蛋糕', '幸福 甜蜜 快乐 微笑', 'http://127.0.0.1:3000/7.jpg', 288),
(NULL, '倾心雪域冰淇淋蛋糕', '幸福 甜蜜 快乐 微笑', 'http://127.0.0.1:3000/8.jpg', 298),
(NULL, '倾心雪域冰淇淋蛋糕', '幸福 甜蜜 快乐 微笑', 'http://127.0.0.1:3000/1.jpg', 188),
(NULL, '倾心雪域冰淇淋蛋糕', '幸福 甜蜜 快乐 微笑', 'http://127.0.0.1:3000/2.jpg', 288),
(NULL, '倾心雪域冰淇淋蛋糕', '幸福 甜蜜 快乐 微笑', 'http://127.0.0.1:3000/3.jpg', 288),
(NULL, '倾心雪域冰淇淋蛋糕', '幸福 甜蜜 快乐 微笑', 'http://127.0.0.1:3000/4.jpg', 288),
(NULL, '倾心雪域冰淇淋蛋糕', '幸福 甜蜜 快乐 微笑', 'http://127.0.0.1:3000/5.jpg', 288),
(NULL, '倾心雪域冰淇淋蛋糕', '幸福 甜蜜 快乐 微笑', 'http://127.0.0.1:3000/6.jpg', 288),
(NULL, '倾心雪域冰淇淋蛋糕', '幸福 甜蜜 快乐 微笑', 'http://127.0.0.1:3000/7.jpg', 288),
(NULL, '倾心雪域冰淇淋蛋糕', '幸福 甜蜜 快乐 微笑', 'http://127.0.0.1:3000/8.jpg', 298);


#创建cake_comment评论表
CREATE TABLE cake_comment(
  id INT PRIMARY KEY AUTO_INCREMENT,
  content VARCHAR(2000),
  ctime DATETIME,
  nid INT
);

INSERT INTO cake_comment VALUES(null,"超级喜欢这个蛋糕",now(),1);
INSERT INTO cake_comment VALUES(null,"已经第二次购买了，开心",now(),1);
INSERT INTO cake_comment VALUES(null,"喜欢",now(),1);
INSERT INTO cake_comment VALUES(null,"值得购买",now(),1);
INSERT INTO cake_comment VALUES(null,"值得购买",now(),1);
INSERT INTO cake_comment VALUES(null,"值得购买",now(),1);





#购物车:
#cake_cart
#id     编号
#count  数量
#price  价格
#name   商品名称
#pid    商品编号
#uid    用户编号

#SELECT id,count,price,name,pid,uid
#FROM  cake_cart
#WHERE  uid = ?
# pno2-029282823-
CREATE TABLE cake_cart(
  id INT PRIMARY KEY AUTO_INCREMENT,
  uid INT,
  pid INT,
  price DECIMAL(10,2),
  count INT
);
INSERT INTO cake_cart VALUES(null,1,1,10,1);
INSERT INTO cake_cart VALUES(null,1,2,12,2);



# 用户登录:uid name pwd 
# 用户信息:avatar phone addr ..
/*用户登录*/
CREATE TABLE cake_login(
  uid INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(25),
  pwd  VARCHAR(32)
);
INSERT INTO cake_login VALUES
(null, 'dingding',md5('123456')),
(null, 'dangdang',md5('123456')),
(null, 'doudou',md5('123456')),
(null, 'yaya',md5('123456')),
(null, 'tom',md5('123456'));




