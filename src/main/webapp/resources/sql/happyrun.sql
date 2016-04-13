/*
Navicat MySQL Data Transfer

Source Server         : mysql
Source Server Version : 50536
Source Host           : localhost:3306
Source Database       : happyrun

Target Server Type    : MYSQL
Target Server Version : 50536
File Encoding         : 65001

Date: 2016-04-13 20:43:00
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for t_cart
-- ----------------------------
DROP TABLE IF EXISTS `t_cart`;
CREATE TABLE `t_cart` (
  `cartid` int(11) NOT NULL COMMENT '购物车id',
  `cartitemid` int(11) DEFAULT NULL COMMENT '订单条目id',
  `subtotal` decimal(10,0) DEFAULT NULL COMMENT '小计',
  `pieces` int(11) DEFAULT NULL COMMENT '数量',
  `createuid` int(11) DEFAULT NULL COMMENT '创建者id',
  PRIMARY KEY (`cartid`),
  KEY `fk_cart_item` (`cartitemid`),
  KEY `fk_cart_user` (`createuid`),
  CONSTRAINT `fk_cart_item` FOREIGN KEY (`cartitemid`) REFERENCES `t_cartitem` (`cartitemid`) ON DELETE CASCADE ON UPDATE CASCADE,
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
  `cartitemid` int(11) NOT NULL COMMENT '购物车条目id',
  `cartid` int(255) DEFAULT NULL COMMENT '购物车id',
  `goodsid` int(11) DEFAULT NULL COMMENT '商品id',
  `goodsname` varchar(255) DEFAULT NULL COMMENT '商品名称',
  `pieces` int(11) DEFAULT NULL COMMENT '数量',
  `sellingprice` decimal(10,0) DEFAULT NULL COMMENT '售价',
  `subtotal` decimal(10,0) DEFAULT NULL COMMENT '小结',
  `status` int(11) DEFAULT NULL COMMENT '购物车条目是否被选中状态',
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
  `catagoryid` int(11) NOT NULL COMMENT '类别id',
  `catagoryname` varchar(255) DEFAULT NULL COMMENT '类别名字',
  PRIMARY KEY (`catagoryid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of t_catagory
-- ----------------------------

-- ----------------------------
-- Table structure for t_goods
-- ----------------------------
DROP TABLE IF EXISTS `t_goods`;
CREATE TABLE `t_goods` (
  `goodsid` int(11) NOT NULL COMMENT '商品id',
  `goodsname` varchar(255) DEFAULT NULL COMMENT '商品名称',
  `sellingprice` decimal(10,0) DEFAULT NULL COMMENT '价格',
  `images` varchar(255) DEFAULT NULL COMMENT '商品图片地址',
  `status` int(11) DEFAULT NULL COMMENT '上下架状态',
  `isdelete` int(11) DEFAULT NULL COMMENT '是否删除',
  `categoryid` int(11) DEFAULT NULL COMMENT '类别id',
  `categoryname` varchar(255) DEFAULT NULL COMMENT '类别名称',
  `registerdate` date DEFAULT NULL COMMENT '上下架时间',
  `price` decimal(10,0) DEFAULT NULL COMMENT '成本价格',
  `stock` int(11) DEFAULT NULL COMMENT '库存',
  `subcategoryid` int(11) DEFAULT NULL COMMENT '子类别id',
  PRIMARY KEY (`goodsid`),
  KEY `fk_goods_cata` (`categoryid`),
  CONSTRAINT `fk_goods_cata` FOREIGN KEY (`categoryid`) REFERENCES `t_catagory` (`catagoryid`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of t_goods
-- ----------------------------

-- ----------------------------
-- Table structure for t_information
-- ----------------------------
DROP TABLE IF EXISTS `t_information`;
CREATE TABLE `t_information` (
  `informationid` int(11) DEFAULT NULL COMMENT '资讯id',
  `informationtitle` varchar(255) DEFAULT NULL COMMENT '资讯标题',
  `informationdesc` varchar(255) DEFAULT NULL COMMENT '资讯简介',
  `informationcontent` varchar(255) DEFAULT NULL COMMENT '资讯内容',
  `informationimages` varchar(255) DEFAULT NULL COMMENT '资讯图片',
  `informationtime` datetime DEFAULT NULL COMMENT '资讯时间'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of t_information
-- ----------------------------

-- ----------------------------
-- Table structure for t_medal
-- ----------------------------
DROP TABLE IF EXISTS `t_medal`;
CREATE TABLE `t_medal` (
  `medalid` int(11) DEFAULT NULL COMMENT '勋章id',
  `medalname` varchar(255) DEFAULT NULL COMMENT '勋章名字',
  `medalimage` varchar(255) DEFAULT NULL COMMENT '勋章图片地址',
  `userid` int(11) DEFAULT NULL COMMENT '用户id',
  KEY `fk_medal_uid` (`userid`),
  CONSTRAINT `fk_medal_uid` FOREIGN KEY (`userid`) REFERENCES `t_user` (`userid`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of t_medal
-- ----------------------------

-- ----------------------------
-- Table structure for t_menuitem
-- ----------------------------
DROP TABLE IF EXISTS `t_menuitem`;
CREATE TABLE `t_menuitem` (
  `menuitemid` int(11) NOT NULL COMMENT '菜单编号',
  `menuname` varchar(255) DEFAULT NULL COMMENT '菜单所属模块',
  `menuitemparentid` int(11) DEFAULT NULL COMMENT '菜单项父菜单id',
  `menuitemname` varchar(255) DEFAULT NULL COMMENT '菜单项标题',
  PRIMARY KEY (`menuitemid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of t_menuitem
-- ----------------------------

-- ----------------------------
-- Table structure for t_menumap
-- ----------------------------
DROP TABLE IF EXISTS `t_menumap`;
CREATE TABLE `t_menumap` (
  `menumapid` int(11) NOT NULL COMMENT '菜单映射模块',
  `roleid` int(11) DEFAULT NULL COMMENT '角色id',
  `menuitemid` int(11) DEFAULT NULL COMMENT '菜单项编号',
  PRIMARY KEY (`menumapid`),
  KEY `fk_menu_role` (`roleid`),
  KEY `fk_menu_item` (`menuitemid`),
  CONSTRAINT `fk_menu_item` FOREIGN KEY (`menuitemid`) REFERENCES `t_menuitem` (`menuitemid`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_menu_role` FOREIGN KEY (`roleid`) REFERENCES `t_role` (`roleid`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of t_menumap
-- ----------------------------

-- ----------------------------
-- Table structure for t_order
-- ----------------------------
DROP TABLE IF EXISTS `t_order`;
CREATE TABLE `t_order` (
  `orderid` int(11) NOT NULL COMMENT '订单id',
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
  `orderitemid` int(11) NOT NULL,
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
  `roleid` int(11) NOT NULL COMMENT '角色id',
  `rolename` int(11) DEFAULT NULL COMMENT '角色名(0-游客,1-用户,2-超级管理员)',
  PRIMARY KEY (`roleid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of t_role
-- ----------------------------

-- ----------------------------
-- Table structure for t_subcategory
-- ----------------------------
DROP TABLE IF EXISTS `t_subcategory`;
CREATE TABLE `t_subcategory` (
  `subcategoryid` int(11) NOT NULL COMMENT '子类别id',
  `categoryid` int(11) DEFAULT NULL COMMENT '类别id',
  `subcategoryname` varchar(255) DEFAULT NULL COMMENT '子类别名称',
  PRIMARY KEY (`subcategoryid`),
  KEY `fk_cat_sub` (`categoryid`),
  CONSTRAINT `fk_cat_sub` FOREIGN KEY (`categoryid`) REFERENCES `t_catagory` (`catagoryid`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of t_subcategory
-- ----------------------------

-- ----------------------------
-- Table structure for t_user
-- ----------------------------
DROP TABLE IF EXISTS `t_user`;
CREATE TABLE `t_user` (
  `userid` int(11) NOT NULL COMMENT '用户Id',
  `userinfoid` int(11) DEFAULT NULL COMMENT '用户信息Id',
  `username` varchar(255) DEFAULT NULL COMMENT '用户名',
  `password` varchar(255) DEFAULT NULL COMMENT '密码',
  `roleid` int(11) DEFAULT NULL COMMENT '角色id',
  PRIMARY KEY (`userid`),
  KEY `fk_roleid` (`roleid`),
  CONSTRAINT `fk_roleid` FOREIGN KEY (`roleid`) REFERENCES `t_role` (`roleid`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of t_user
-- ----------------------------

-- ----------------------------
-- Table structure for t_userinfo
-- ----------------------------
DROP TABLE IF EXISTS `t_userinfo`;
CREATE TABLE `t_userinfo` (
  `userinfoid` int(11) NOT NULL COMMENT '用户信息Id',
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
