/*
Navicat MySQL Data Transfer

Source Server         : mysql
Source Server Version : 50536
Source Host           : localhost:3306
Source Database       : happyrun

Target Server Type    : MYSQL
Target Server Version : 50536
File Encoding         : 65001

Date: 2016-04-29 00:28:37
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for t_cart
-- ----------------------------
DROP TABLE IF EXISTS `t_cart`;
CREATE TABLE `t_cart` (
  `cartid` int(11) NOT NULL AUTO_INCREMENT COMMENT '购物车id',
  `subtotal` decimal(10,0) DEFAULT NULL COMMENT '小计',
  `pieces` int(11) DEFAULT NULL COMMENT '数量',
  `createuid` int(11) DEFAULT NULL COMMENT '创建者id',
  PRIMARY KEY (`cartid`),
  KEY `fk_cart_user` (`createuid`),
  CONSTRAINT `fk_cart_user` FOREIGN KEY (`createuid`) REFERENCES `t_user` (`userid`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of t_cart
-- ----------------------------

-- ----------------------------
-- Table structure for t_cartitem
-- ----------------------------
DROP TABLE IF EXISTS `t_cartitem`;
CREATE TABLE `t_cartitem` (
  `cartitemid` int(11) NOT NULL AUTO_INCREMENT COMMENT '购物车条目id',
  `cartid` int(255) DEFAULT NULL COMMENT '购物车id',
  `goodsid` int(11) DEFAULT NULL COMMENT '商品id',
  `goodsname` varchar(255) DEFAULT NULL COMMENT '商品名称',
  `pieces` int(11) DEFAULT NULL COMMENT '数量',
  `sellingprice` decimal(10,0) DEFAULT NULL COMMENT '售价',
  `subtotal` decimal(10,0) DEFAULT NULL COMMENT '小结',
  PRIMARY KEY (`cartitemid`),
  KEY `fk_item_cart` (`cartid`),
  KEY `fk_item_goods` (`goodsid`),
  CONSTRAINT `fk_item_cart` FOREIGN KEY (`cartid`) REFERENCES `t_cart` (`cartid`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_item_goods` FOREIGN KEY (`goodsid`) REFERENCES `t_goods` (`goodsid`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of t_cartitem
-- ----------------------------

-- ----------------------------
-- Table structure for t_catagory
-- ----------------------------
DROP TABLE IF EXISTS `t_catagory`;
CREATE TABLE `t_catagory` (
  `catagoryid` int(11) NOT NULL AUTO_INCREMENT COMMENT '类别id',
  `catagoryname` varchar(255) DEFAULT NULL COMMENT '类别名字',
  `isdelete` int(11) DEFAULT '0' COMMENT '是否被删除',
  PRIMARY KEY (`catagoryid`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of t_catagory
-- ----------------------------
INSERT INTO `t_catagory` VALUES ('1', 'dghadfafd', '1');
INSERT INTO `t_catagory` VALUES ('2', 'afd123', '0');
INSERT INTO `t_catagory` VALUES ('3', '123afdf', '0');
INSERT INTO `t_catagory` VALUES ('4', 'afdaf', '0');
INSERT INTO `t_catagory` VALUES ('5', '4324', '0');
INSERT INTO `t_catagory` VALUES ('7', '中文', '0');
INSERT INTO `t_catagory` VALUES ('8', '哈哈', '0');
INSERT INTO `t_catagory` VALUES ('9', '中文阿斯蒂芬', '0');

-- ----------------------------
-- Table structure for t_goods
-- ----------------------------
DROP TABLE IF EXISTS `t_goods`;
CREATE TABLE `t_goods` (
  `goodsid` int(11) NOT NULL AUTO_INCREMENT COMMENT '商品id',
  `goodsname` varchar(255) DEFAULT NULL COMMENT '商品名称',
  `sellingprice` decimal(10,0) DEFAULT NULL COMMENT '价格',
  `images` varchar(255) DEFAULT NULL COMMENT '商品图片地址',
  `status` int(11) DEFAULT '1' COMMENT '上下架状态(0为下架，1为上架)',
  `isdelete` int(11) DEFAULT '0' COMMENT '是否删除(1为删除，0为未删除)',
  `catagoryid` int(11) DEFAULT NULL COMMENT '类别id',
  `catagoryname` varchar(255) DEFAULT NULL COMMENT '类别名称',
  `registerdate` timestamp NULL DEFAULT CURRENT_TIMESTAMP COMMENT '上下架时间',
  `price` decimal(10,0) DEFAULT NULL COMMENT '成本价格',
  `stock` int(11) DEFAULT NULL COMMENT '库存',
  `goodsdesc` varchar(255) DEFAULT NULL COMMENT '商品描述',
  PRIMARY KEY (`goodsid`),
  KEY `fk_catagoryid` (`catagoryid`),
  CONSTRAINT `fk_catagoryid` FOREIGN KEY (`catagoryid`) REFERENCES `t_catagory` (`catagoryid`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=29 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of t_goods
-- ----------------------------
INSERT INTO `t_goods` VALUES ('22', '阿斯蒂芬a', '123', '/upload/product/4f322014-5bc2-47e9-bcd2-6661c997916f.jpg,/upload/product/57428530-a3b7-42e4-8baf-b53bc90e90f9.jpg', '1', '0', '3', '123afdf', '2016-04-26 22:17:13', '123', '123', '123');
INSERT INTO `t_goods` VALUES ('23', '测试滑动图片', '123', '/upload/product/2c8a08cd-6f2f-4719-98ad-8f6af6a6e1dc.jpg,/upload/product/f6e8bb0b-d1bd-4b0a-ac37-2ea8cd6c15f2.jpg', '1', '0', '2', 'afd123', '2016-04-28 11:02:28', '123', '123', '123');
INSERT INTO `t_goods` VALUES ('24', '商品1', '123', '/upload/product/6204b507-ced0-4370-87b0-35151b4077ad.jpg', '1', '0', null, null, '2016-04-28 22:56:08', '1', '1', '123');
INSERT INTO `t_goods` VALUES ('25', '商品2', null, '/upload/product/fe81676d-bdcb-4192-9a0f-052f93f7f9bc.jpg', '1', '0', null, null, '2016-04-28 22:56:53', null, null, null);
INSERT INTO `t_goods` VALUES ('26', '商品3', '123', '/upload/product/48e2618e-0a67-466c-8ffb-e1a6c1a304ac.jpg,/upload/product/4c32e202-4285-431c-af83-123ad80467d2.jpg', '1', '0', null, null, '2016-04-28 22:59:14', null, null, null);
INSERT INTO `t_goods` VALUES ('27', '商品4', null, '/upload/product/97b915b9-37c4-4925-9e93-a0553b2dd8db.jpg', '1', '0', null, null, '2016-04-28 23:22:34', null, null, null);
INSERT INTO `t_goods` VALUES ('28', '商品5', null, null, '1', '0', null, null, '2016-04-28 23:24:21', null, null, null);

-- ----------------------------
-- Table structure for t_information
-- ----------------------------
DROP TABLE IF EXISTS `t_information`;
CREATE TABLE `t_information` (
  `informationid` int(11) NOT NULL AUTO_INCREMENT COMMENT '资讯id',
  `informationtitle` varchar(255) DEFAULT NULL COMMENT '资讯标题',
  `informationdesc` varchar(255) DEFAULT NULL COMMENT '资讯简介',
  `informationcontent` text COMMENT '资讯内容',
  `informationimages` varchar(255) DEFAULT NULL COMMENT '资讯图片',
  `informationtime` datetime DEFAULT NULL COMMENT '资讯时间',
  PRIMARY KEY (`informationid`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of t_information
-- ----------------------------
INSERT INTO `t_information` VALUES ('1', '全民跑步时代，每月18万步你被平均了吗？', 'asfasdf', 'fdgafg', '/resources/imgs/e89a8ffb139317cf41f400.jpg,/resources/imgs/e89a8ffb139317cf41f401.jpg,/resources/imgs/e89a8ffb139317cf41f461.jpg,e89a8ffb139317cf41f463.jpg', '2016-03-02 21:08:06');
INSERT INTO `t_information` VALUES ('2', '了解这些，让你的夜跑更健康、更安全', 'werewrtwer', 'qwerwerwer。', '/resources/imgs/W020150609422530441025.jpg,/resources/imgs/W020150609422531371797.jpg,/resources/imgs/W020150609422532157070.jpg', '2016-04-13 10:10:42');
INSERT INTO `t_information` VALUES ('3', '跑步的营养三餐：食物，音乐，心情', 'werqwerqwer', 'agretrrtq', '/resources/imgs/W020150616531274193036.jpg,W020150616531279508467.jpg,W020150616531280440300.jpg', '2016-02-18 08:00:16');
INSERT INTO `t_information` VALUES ('4', '高峰论坛：健身工作室 引导新兴健身行业生力军', '　3月2日，在Chinafit华南健身大会现场，2016年中国健身工作室高峰论坛如期举行，同期举行的还有首届中国健身工作室风云榜盛典。\r\n　　随着全民健身潮的到来，满足不同消费人群的各种健身场馆大量增加，其中最具代表性的当属在场馆装修、课程排布以及教练个人风格都具有明显个性色彩的一批健身工作室。\r\n　　当天出席的嘉宾涵盖了健身行业、协会、投资、媒体等各领域的专家。洪泰基金投资人南天、ChinaFit主编潘睿、三体云动总经理窦赢分别从投资、行业、互联网角度出发，深度透视健身行业，贡献了大量干货。', 'ewqrewqrq13132', '/resources/imgs/Img439285414.jpg,Img439285416.jpg,Img439285419.jpg', '2016-04-08 12:00:00');

-- ----------------------------
-- Table structure for t_medal
-- ----------------------------
DROP TABLE IF EXISTS `t_medal`;
CREATE TABLE `t_medal` (
  `medalid` int(11) NOT NULL AUTO_INCREMENT COMMENT '勋章id',
  `medalname` varchar(255) DEFAULT NULL COMMENT '勋章名字',
  `medalimage` varchar(255) DEFAULT NULL COMMENT '勋章图片地址',
  `userid` int(11) NOT NULL COMMENT '用户id',
  PRIMARY KEY (`medalid`),
  KEY `fk_medal_uid` (`userid`),
  CONSTRAINT `fk_medal_uid` FOREIGN KEY (`userid`) REFERENCES `t_user` (`userid`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of t_medal
-- ----------------------------
INSERT INTO `t_medal` VALUES ('2', '蝈蝈', '产', '1');
INSERT INTO `t_medal` VALUES ('3', '声名鹊起', 'asdf', '1');
INSERT INTO `t_medal` VALUES ('4', '声名鹊起', 'asdf', '1');

-- ----------------------------
-- Table structure for t_menuitem
-- ----------------------------
DROP TABLE IF EXISTS `t_menuitem`;
CREATE TABLE `t_menuitem` (
  `menuitemid` int(11) NOT NULL AUTO_INCREMENT COMMENT '菜单编号',
  `menuname` varchar(255) DEFAULT NULL COMMENT '菜单所属模块',
  `menuitemparentid` int(11) DEFAULT NULL COMMENT '菜单项父菜单id',
  `menuitemname` varchar(255) DEFAULT NULL COMMENT '菜单项标题',
  `menuitemrouteurl` varchar(255) DEFAULT NULL COMMENT '菜单路由地址',
  `menuitemctrl` varchar(255) DEFAULT NULL COMMENT '菜单控制器',
  `menuitemurl` varchar(255) DEFAULT NULL COMMENT '菜单url',
  PRIMARY KEY (`menuitemid`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of t_menuitem
-- ----------------------------
INSERT INTO `t_menuitem` VALUES ('1', 'shopMenu', null, '商城入口', '#', 'asd', 'product/productmanage.html');
INSERT INTO `t_menuitem` VALUES ('2', 'shopMenu', '1', '购物车', '#/shopcar', 'ase', 'product/productmanage.html');
INSERT INTO `t_menuitem` VALUES ('3', 'shopMenu', '1', '添加商品', '#/addgoods', 'addproductctrl', 'product/addproduct.html');
INSERT INTO `t_menuitem` VALUES ('4', 'shopMenu', '1', '商品列表', '#/goodsmanager', 'goodsmanagerctrl', 'product/productmanage.html');
INSERT INTO `t_menuitem` VALUES ('5', 'shopMenu', '1', '编辑商品', '#/editproduct', 'editproductctrl', 'product/editproduct.html');
INSERT INTO `t_menuitem` VALUES ('6', 'shopMenu', '1', '编辑商品类型', '#/editproducttype', 'editproducttypectrl', 'product/editproducttype.html');

-- ----------------------------
-- Table structure for t_menumap
-- ----------------------------
DROP TABLE IF EXISTS `t_menumap`;
CREATE TABLE `t_menumap` (
  `menumapid` int(11) NOT NULL AUTO_INCREMENT COMMENT '菜单映射模块',
  `roleid` int(11) DEFAULT NULL COMMENT '角色id',
  `menuitemid` int(11) DEFAULT NULL COMMENT '菜单项编号',
  PRIMARY KEY (`menumapid`),
  KEY `fk_menu_role` (`roleid`),
  KEY `fk_menu_item` (`menuitemid`),
  CONSTRAINT `fk_menu_item` FOREIGN KEY (`menuitemid`) REFERENCES `t_menuitem` (`menuitemid`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_menu_role` FOREIGN KEY (`roleid`) REFERENCES `t_role` (`roleid`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of t_menumap
-- ----------------------------
INSERT INTO `t_menumap` VALUES ('1', '2', '1');
INSERT INTO `t_menumap` VALUES ('2', '2', '2');
INSERT INTO `t_menumap` VALUES ('3', '2', '3');
INSERT INTO `t_menumap` VALUES ('4', '2', '4');
INSERT INTO `t_menumap` VALUES ('5', '2', '5');
INSERT INTO `t_menumap` VALUES ('6', '2', '6');

-- ----------------------------
-- Table structure for t_order
-- ----------------------------
DROP TABLE IF EXISTS `t_order`;
CREATE TABLE `t_order` (
  `orderid` int(11) NOT NULL AUTO_INCREMENT COMMENT '订单id',
  `ordernum` varchar(255) DEFAULT NULL COMMENT '订单号',
  `orderstatus` int(11) DEFAULT NULL COMMENT '订单状态',
  `orderitemid` int(11) DEFAULT NULL COMMENT '订单条目id',
  `name` varchar(255) DEFAULT NULL COMMENT '收货人',
  `address` varchar(255) DEFAULT NULL COMMENT '收货地址',
  `telephone` varchar(255) DEFAULT NULL COMMENT '手机号',
  `receiverid` int(11) DEFAULT NULL COMMENT '接收人id',
  `remark` varchar(255) DEFAULT NULL COMMENT '买家留言',
  `ordertime` datetime DEFAULT NULL COMMENT '订单时间',
  `isdelete` int(11) DEFAULT NULL COMMENT '订单是否被删除',
  PRIMARY KEY (`orderid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of t_order
-- ----------------------------

-- ----------------------------
-- Table structure for t_orderitem
-- ----------------------------
DROP TABLE IF EXISTS `t_orderitem`;
CREATE TABLE `t_orderitem` (
  `orderitemid` int(11) NOT NULL AUTO_INCREMENT,
  `goodsid` int(11) DEFAULT NULL COMMENT '商品id',
  `sellingprice` decimal(10,0) DEFAULT NULL COMMENT '售价',
  `pieces` int(11) DEFAULT NULL COMMENT '数量',
  `subtotal` decimal(11,0) DEFAULT NULL COMMENT '小计',
  `goodsname` varchar(255) DEFAULT NULL COMMENT '商品名称',
  `orderid` int(11) DEFAULT NULL COMMENT '订单id',
  PRIMARY KEY (`orderitemid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of t_orderitem
-- ----------------------------

-- ----------------------------
-- Table structure for t_role
-- ----------------------------
DROP TABLE IF EXISTS `t_role`;
CREATE TABLE `t_role` (
  `roleid` int(11) NOT NULL AUTO_INCREMENT COMMENT '角色id',
  `rolename` varchar(11) DEFAULT NULL COMMENT '角色名(0-游客,1-用户,2-超级管理员)',
  PRIMARY KEY (`roleid`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of t_role
-- ----------------------------
INSERT INTO `t_role` VALUES ('1', '超级管理员');
INSERT INTO `t_role` VALUES ('2', '用户');

-- ----------------------------
-- Table structure for t_user
-- ----------------------------
DROP TABLE IF EXISTS `t_user`;
CREATE TABLE `t_user` (
  `userid` int(11) NOT NULL AUTO_INCREMENT COMMENT '用户Id',
  `userinfoid` int(11) DEFAULT NULL COMMENT '用户信息Id',
  `username` varchar(255) DEFAULT NULL COMMENT '用户名',
  `password` varchar(255) DEFAULT NULL COMMENT '密码',
  `roleid` int(11) DEFAULT NULL COMMENT '角色id',
  PRIMARY KEY (`userid`),
  KEY `fk_roleid` (`roleid`),
  CONSTRAINT `fk_roleid` FOREIGN KEY (`roleid`) REFERENCES `t_role` (`roleid`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of t_user
-- ----------------------------
INSERT INTO `t_user` VALUES ('1', '1', 'test', 'test', '2');

-- ----------------------------
-- Table structure for t_userinfo
-- ----------------------------
DROP TABLE IF EXISTS `t_userinfo`;
CREATE TABLE `t_userinfo` (
  `userinfoid` int(11) NOT NULL AUTO_INCREMENT COMMENT '用户信息Id',
  `userid` int(11) DEFAULT NULL COMMENT '用户Id',
  `nickname` varchar(255) DEFAULT NULL COMMENT '昵称',
  `avatar` varchar(255) DEFAULT NULL COMMENT '头像',
  `medal` varchar(255) DEFAULT NULL COMMENT '勋章字符串',
  `accumulatedkilometers` int(11) DEFAULT NULL COMMENT '累计公里',
  `totaltime` int(11) DEFAULT NULL COMMENT '累计时间',
  `cumulativeconsumption` int(11) DEFAULT NULL COMMENT '累计消耗',
  `runningkilometersrecord` int(11) DEFAULT NULL COMMENT '跑步记录',
  `fastestspeed` int(11) DEFAULT NULL COMMENT '最快配速',
  `longestdistance` int(11) DEFAULT NULL COMMENT '最长距离',
  `longesttime` int(11) DEFAULT NULL COMMENT '最长时间',
  PRIMARY KEY (`userinfoid`),
  KEY `fk_u_info_uid` (`userid`),
  CONSTRAINT `fk_u_info_uid` FOREIGN KEY (`userid`) REFERENCES `t_user` (`userid`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of t_userinfo
-- ----------------------------
