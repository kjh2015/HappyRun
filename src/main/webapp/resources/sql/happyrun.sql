/*
Navicat MySQL Data Transfer

Source Server         : mysql
Source Server Version : 50536
Source Host           : localhost:3306
Source Database       : happyrun

Target Server Type    : MYSQL
Target Server Version : 50536
File Encoding         : 65001

Date: 2016-04-12 07:47:36
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for t_goods
-- ----------------------------
DROP TABLE IF EXISTS `t_goods`;
CREATE TABLE `t_goods` (
  `goodsid` int(11) NOT NULL COMMENT '商品id',
  `goodsname` varchar(255) DEFAULT NULL COMMENT '商品名称',
  `price` decimal(10,0) DEFAULT NULL COMMENT '价格',
  `images` varchar(255) DEFAULT NULL COMMENT '商品图片地址',
  `status` int(11) DEFAULT NULL COMMENT '上下架状态',
  `isdelete` int(11) DEFAULT NULL COMMENT '是否删除',
  `categoryid` int(11) DEFAULT NULL COMMENT '类别id',
  `categoryname` varchar(255) DEFAULT NULL COMMENT '类别名称',
  `registerdate` date DEFAULT NULL,
  PRIMARY KEY (`goodsid`)
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
