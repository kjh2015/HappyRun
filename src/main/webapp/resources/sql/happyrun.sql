/*
Navicat MySQL Data Transfer

Source Server         : mysql
Source Server Version : 50536
Source Host           : localhost:3306
Source Database       : happyrun

Target Server Type    : MYSQL
Target Server Version : 50536
File Encoding         : 65001

Date: 2016-05-02 13:03:29
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
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of t_catagory
-- ----------------------------
INSERT INTO `t_catagory` VALUES ('11', '运动鞋', '0');
INSERT INTO `t_catagory` VALUES ('12', '运动服饰', '0');
INSERT INTO `t_catagory` VALUES ('14', '球类用品', '0');
INSERT INTO `t_catagory` VALUES ('15', '健身设备', '0');

-- ----------------------------
-- Table structure for t_goods
-- ----------------------------
DROP TABLE IF EXISTS `t_goods`;
CREATE TABLE `t_goods` (
  `goodsid` int(11) NOT NULL AUTO_INCREMENT COMMENT '商品id',
  `goodsname` varchar(255) DEFAULT NULL COMMENT '商品名称',
  `sellingprice` decimal(10,0) DEFAULT NULL COMMENT '价格',
  `images` text COMMENT '商品图片地址',
  `status` int(11) DEFAULT '1' COMMENT '上下架状态(0为下架，1为上架)',
  `isdelete` int(11) DEFAULT '0' COMMENT '是否删除(1为删除，0为未删除)',
  `catagoryid` int(11) NOT NULL COMMENT '类别id',
  `catagoryname` varchar(255) NOT NULL COMMENT '类别名称',
  `registerdate` timestamp NULL DEFAULT CURRENT_TIMESTAMP COMMENT '上下架时间',
  `price` decimal(10,0) DEFAULT NULL COMMENT '成本价格',
  `stock` int(11) DEFAULT NULL COMMENT '库存',
  `goodsdesc` text COMMENT '商品描述',
  PRIMARY KEY (`goodsid`)
) ENGINE=InnoDB AUTO_INCREMENT=67 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of t_goods
-- ----------------------------
INSERT INTO `t_goods` VALUES ('31', 'Nike 耐克官方 NIKE AIR MAX FULL RIDE TR 男子训练鞋819004', '629', '/upload/product/5be6f36b-2dcf-4fd5-bd13-78d336392b40.jpg,/upload/product/247f4c48-6237-4ff5-9988-317e7697185e.jpg,/upload/product/6447be24-3a50-4601-87c8-534f1377452f.jpg', '1', '0', '11', '运动鞋', '2016-05-01 19:27:59', '400', '100', '强大支撑，灵敏舒适 Nike AIR Max TYPHA 男子训练鞋采用橡塑材料搭配织物组合鞋面，搭载可视 Max Air 气垫设计，缔造卓越的缓冲减震性能与轻质支撑体验。 其他细节 橡塑材料织物组合鞋面，透气舒适 Flywire 飞线技术与鞋带巧妙融合，塑就动态贴合的支撑体验 后跟搭载透明的 Max Air 气垫，缔造出众的灵活性与强大缓震性能 六边形凸起外底具备出色的多向抓地力，可强势驾驭各种地面 前掌弯曲凹槽设计，助你畅享自由无拘运动感受');
INSERT INTO `t_goods` VALUES ('35', '特步男鞋正品运动鞋男跑步鞋春夏季透气轻便减震男士网面休闲跑鞋', '169', '/upload/product/fdee4f90-6d25-4607-9691-48edb0e2cdef.jpg,/upload/product/72d184bd-673c-4a43-b879-1b496017d3d4.jpg,/upload/product/cdca714a-4150-4a5b-8663-a46c1e5b339e.jpg', '1', '0', '11', '运动鞋', '2016-05-01 20:49:17', '100', '100', '产品参数： 产品名称：XTEP/特步 985219119256是否商场同款: 是颜色分类: 红黑 兰绿 灰绿 兰 兰黄 黑绿款号: 985219119256品牌: XTEP/特步上市时间: 2015年春季吊牌价: 339性别: 男子帮面材质: 网布外底材料: IP大底适合路面: 小道 公路 跑道运动鞋科技: 缓震胶 易弯折功能 强化避震缓冲 透气技术功能: 耐磨 透气 轻便鞋码: 39 40 41 42 43 44 45闭合方式: 系带流行元素: 皮革拼接运动系列: 运动生活系列是否瑕疵: 否');
INSERT INTO `t_goods` VALUES ('36', '乔丹男鞋2016夏季新款跑鞋男士运动鞋轻便透气休闲减震网面跑步鞋', '269', '/upload/product/0ce61169-3976-4c2b-bb7a-5f5ccbb372ab.jpg,/upload/product/322c036f-ca88-4329-86a4-33cee2f186ea.jpg,/upload/product/49ab3bb0-e1c7-44d4-bfc9-69c3d392ba54.jpg', '1', '0', '11', '运动鞋', '2016-05-01 20:56:52', '200', '100', '产品参数： 产品名称：乔丹 XM2560203是否商场同款: 是颜色分类: 闪亮黄/黑色 极致红/湖蓝 黑色/闪亮橘款号: XM2560203品牌: 乔丹上市时间: 2016年夏季吊牌价: 299性别: 男子帮面材质: 纺织品外底材料: MD+橡胶适合路面: 小道 公路 跑道运动鞋科技: 缓震胶 强化避震缓冲 透气技术功能: 减震 防滑 耐磨 透气 支撑 平衡鞋码: 39 40 40.5 41 42 42.5 43 44 44.5 45闭合方式: 系带流行元素: 车缝线运动系列: 运动生活系列是否瑕疵: 否');
INSERT INTO `t_goods` VALUES ('37', '安踏跑步鞋 男2016夏季新款气垫鞋编织透气跑鞋 全掌气垫运动鞋男', '319', '/upload/product/61ab0bdb-cc10-4cfd-89da-e5417e83fbe5.jpg,/upload/product/81dad887-f9ef-4bb4-aa99-f76dd2d697a7.jpg,/upload/product/7366835d-f3c3-4adb-9027-2ee1e0ce5d01.jpg', '1', '0', '11', '运动鞋', '2016-05-01 20:58:37', '250', '100', '产品参数： 产品名称：ANTA/安踏 91625505是否商场同款: 是颜色分类: 浅灰/中灰/黑/安踏白 正蓝/浅军月/安踏白/荧光绿 荧光鲜绿/复古绿/安踏白/荧光超级橙 荧光激光红/深酒红/黑款号: 91625505品牌: ANTA/安踏上市时间: 2016年夏季吊牌价: 499性别: 男子帮面材质: 织物外底材料: 橡胶+EVA+TPU适合路面: 室内、室外水泥地运动鞋科技: 气垫功能: 减震 耐磨 透气鞋码: 39 40 40.5 41 42 42.5 43 44.5闭合方式: 系带流行元素: 皮革拼接运动系列: 跑步系列是否瑕疵: 否');
INSERT INTO `t_goods` VALUES ('39', 'New Balance/NB 373系列男鞋透气复古休闲跑步鞋运动鞋ML373AA/AB', '349', '/upload/product/f37d5c51-5f85-4aba-afde-15272d7803ef.jpg,/upload/product/9d2fd230-b872-4b47-b650-e642798c3d82.jpg,/upload/product/de4c5c13-4bf8-452c-9e3f-14e364d8b553.jpg', '1', '0', '11', '运动鞋', '2016-05-02 12:15:26', '250', '100', '产品参数：\n产品名称：NEW BALANCE 2015Q3ML373A...是否商场同款: 是颜色分类: 藏蓝色 灰蓝色 酒红色款号: 2015Q3ML373AA品牌: NEW BALANCE上市时间: 2015年秋季吊牌价: 499性别: 男子帮面材质: 织物外底材料: 橡胶适合路面: 小道 公路运动鞋科技: 耐磨橡胶外底功能: 耐磨 包裹性 支撑 平衡 轻便鞋码: 40 40.5 41.5 42 42.5 43 44 45 46.5闭合方式: 系带流行元素: 车缝线运动系列: 男鞋-复古鞋是否瑕疵: 否');
INSERT INTO `t_goods` VALUES ('40', 'ASICS 亚瑟士 专业透气 稳定跑鞋 GEL-EXALT 2 男女 T4B1N-5201', '499', '/upload/product/c14723f3-790c-44cc-9c98-e0ed8e179a33.jpg,/upload/product/d851bb4c-5011-4d6a-af2a-622fedecf969.jpg,/upload/product/66898507-605e-4378-97ad-a72251996f61.jpg', '1', '0', '11', '运动鞋', '2016-05-02 12:16:51', '350', '100', '产品参数：\n产品名称：Asics/亚瑟士 T4B1N是否商场同款: 是颜色分类: 灰色/红色 深蓝色/白色款号: T4B1N品牌: Asics/亚瑟士上市时间: 2015年春季吊牌价: 590性别: 男女通用帮面材质: 人造革+织物适合路面: 公路 跑道运动鞋科技: gel功能: 防滑 耐磨 透气 包裹性');
INSERT INTO `t_goods` VALUES ('41', '【2016新品】骆驼户外越野跑鞋 男女款耐磨透气休闲跑步运动鞋', '200', '/upload/product/8b1bc1fa-5634-4f50-81b5-bf9190912b9f.jpg,/upload/product/5959fea6-d2d0-4ab8-92db-0a279e651238.jpg,/upload/product/ca67a6e4-dcd2-426b-8357-c84d078b99de.jpg', '1', '0', '11', '运动鞋', '2016-05-02 12:18:11', '100', '100', '产品参数：\n上市年份季节: 2016年春季货号: A612397065销售渠道类型: 商场同款(线上线下都销售)品牌: Camel/骆驼鞋头款式: 圆头闭合方式: 系带鞋底材质: 橡胶发泡鞋面材质: 网布鞋面内里材质: 网纱鞋制作工艺: 胶粘鞋跟底款式: 平跟图案: 拼色流行元素: 编制风格: 运动场合: 运动休闲');
INSERT INTO `t_goods` VALUES ('42', '鸿星尔克男鞋 跑步鞋2016新款夏季气垫鞋慢跑鞋air max运动鞋男R1', '250', '/upload/product/98daec0b-14cf-4344-96f8-0dd1b27e77d5.jpg,/upload/product/c1437de3-cd18-4a2a-911d-e50f1b3a3b3a.jpg', '1', '0', '11', '运动鞋', '2016-05-02 12:19:45', '150', '100', '产品名称：erke/鸿星尔克 111151201...是否商场同款: 是颜色分类: 碳灰/酸橙绿 浅灰/火星红 正黑/月季橙款号: 11115120152品牌: erke/鸿星尔克上市时间: 2016年夏季吊牌价: 379性别: 男子帮面材质: 合成革+网布外底材料: PU底适合路面: 小道 公路 跑道运动鞋科技: 气垫 缓震胶 易弯折功能 强化避震缓冲 透气技术功能: 减震 防滑 耐磨 包裹性 支撑 平衡 抗冲击 保暖鞋码: 39 40 41 42 43 44闭合方式: 系带流行元素: 车缝线运动系列: 功能跑鞋是否瑕疵: 否');
INSERT INTO `t_goods` VALUES ('43', '运动套装男夏季跑步服修身薄yd长裤卫衣短袖2016夏新款男士运动装', '128', '/upload/product/96500351-f611-430d-83ca-6f327259900f.jpg,/upload/product/45af57fa-4be5-4f9f-964d-47fdb6dae033.jpg,/upload/product/45af57fa-4be5-4f9f-964d-47fdb6dae033.jpg', '1', '0', '12', '运动服饰', '2016-05-02 12:21:57', '78', '100', '产品参数：\n是否商场同款: 是颜色分类: 白色 灰色 深兰款号: F1660品牌: 蓝色夏天上市时间: 2016年夏季吊牌价: 598上装款式: 套头上衣领型: 立领袖长: 短袖裤长: 长裤材质: 棉涤运动户外项目: 跑步服装款式细节: 图案功能: 吸湿排汗 透气性别: 男');
INSERT INTO `t_goods` VALUES ('44', '派衣阁 2016新品春装天鹅绒运动套装女运动服套装女春秋休闲卫衣A', '159', '/upload/product/11e265af-3cb9-4d04-abf2-af1887f41440.jpg,/upload/product/11e265af-3cb9-4d04-abf2-af1887f41440.jpg,/upload/product/11e265af-3cb9-4d04-abf2-af1887f41440.jpg', '1', '0', '12', '运动服饰', '2016-05-02 12:23:12', '79', '100', '颜色分类: 孔雀蓝 花灰色 炭灰色 宝蓝色 粉红色 西瓜红 紫色 玫红色 天蓝色 胭脂红款号: C32品牌: 派衣阁上市时间: 2016年春季吊牌价: 498上装款式: 套头上衣领型: 连帽袖长: 长袖裤长: 长裤材质: 棉运动户外项目: 运动休闲功能: 吸湿排汗 超轻 透气');
INSERT INTO `t_goods` VALUES ('45', '安踏运动套装男装春秋运动服2015秋季新款篮球跑步运动服15531731', '227', '/upload/product/04a5b7b3-6934-46df-aece-6a9db73a3b46.jpg,/upload/product/93731815-fe4b-4d39-a037-83a488c16551.jpg,/upload/product/4683cd9b-b119-4a74-9768-c7acf6343f9e.jpg', '1', '0', '12', '运动服饰', '2016-05-02 12:24:37', '127', '100', '产品参数：\n颜色分类: -1浅灰色 -3黑色款号: 15531731品牌: ANTA/安踏上市时间: 其他吊牌价: 499上装款式: 开衫上衣领型: 翻领袖长: 长袖裤长: 长裤材质: 棉运动户外项目: 运动休闲服装款式细节: 品牌LOGO功能: 保暖 超轻 透气 防风性别: 男尺码: L M S XL XXL XXXL');
INSERT INTO `t_goods` VALUES ('46', '天狼紧身衣男 运动套装长袖秋冬健身服套装弹力透气训练服压缩衣', '105', '/upload/product/0a0ea066-5242-4658-985d-9789668c44cb.jpg,/upload/product/46961c99-f85b-4137-8d4a-54acc000b34d.jpg,/upload/product/31b6229a-617b-48a5-aa81-1367044cc585.jpg', '1', '0', '12', '运动服饰', '2016-05-02 12:26:40', '55', '100', '产品参数：\n颜色分类: 天蓝色 灰色 黑色款号: 80095品牌: Tombula上市时间: 2014年秋季吊牌价: 298上装款式: 套头上衣领型: 圆领袖长: 长袖裤长: 长裤材质: 涤纶运动户外项目: 篮球服装款式细节: 光版功能: 吸湿排汗 速干 保暖 超轻 透气性别: 男尺码: L M XL XXL XXXL');
INSERT INTO `t_goods` VALUES ('47', '2016春秋新款女士运动服套装秋韩版大码休闲套装卫衣长袖开衫套装', '138', '/upload/product/886a5810-9c49-410a-b340-dc735da146e5.jpg,/upload/product/3e75fc93-2f99-4e03-892e-08ff06265757.jpg,/upload/product/8c1f1681-2a78-4281-955f-f808e46a75a1.jpg', '1', '0', '12', '运动服饰', '2016-05-02 12:28:01', '68', '100', '产品参数：\n颜色分类: 5766宝蓝色 5766粉红色 5766牛仔兰 5766西瓜红 9256宝蓝色 9256红色 9256浅灰色 396红色 396浅灰色 68103黑色 68103红色 68103湖蓝色 395粉色 395酒红色 395黄色 395灰色 395天蓝色款号: JH838-7品牌: 哈尔佳上市时间: 2016年春季吊牌价: 398上装款式: 开衫上衣领型: 连帽袖长: 长袖裤长: 长裤材质: 棉涤运动户外项目: 运动休闲性别: 女');
INSERT INTO `t_goods` VALUES ('48', '浪莎袜子男短袜夏季薄款 船袜男士棉袜夏天 低帮运动防臭纯棉男袜', '49', '/upload/product/ed157303-c8ed-42a9-9cfa-5473c09142ec.jpg,/upload/product/de0655c6-e744-454c-8254-0a76eb20dcc6.jpg,/upload/product/daff2fcf-d694-4cc3-af59-b511bcef84f4.jpg', '1', '0', '12', '运动服饰', '2016-05-02 12:29:23', '29', '100', '产品参数：\n上市时间: 2014年春夏季品牌: 浪莎款号: CM123456里料材质成分: 棉100%面料材质成分: 棉100%颜色分类: 5124六色 5124蓝灰黑黄 5124+5117配6 5124蓝灰白紫 5124蓝黑黄青 5124灰白紫白灰 5117六色 5116六色 6565天蓝2果绿2灰2 5117黑深灰淡蓝 5124+5116配6 6565五色 6554六色 6590六色 6324-2五色 5115五色 046六色 5116红黑蓝灰红灰 661三色 6324-4三色 1145黑灰白蓝 6557三色 5535四色 5522-3四色尺码: 收藏加购 送1双 100%纯棉春夏吸汗防臭船袜【1组(6双)再送品牌男袜1双】 100%纯棉春夏吸汗防臭短袜【1组(6双)再送品牌男袜1双】筒高: 船袜厚薄: 薄款面料主材质: 棉图案: 纯色服装款式细节: 扎染袜子功能用途: 吸湿排汗风格: 运动适用性别: 男');
INSERT INTO `t_goods` VALUES ('49', '男士内衣背心纯棉吊带运动紧身跨栏健身修身型夏季打底汗衫', '50', '/upload/product/9303d3c4-0085-496c-8a59-eebcbbc81f28.jpg,/upload/product/bd5d553c-a06c-4d48-ab2f-04203ec8622a.jpg,/upload/product/3a97470a-a2cf-45c3-a02f-01d26c728472.jpg', '1', '0', '12', '运动服饰', '2016-05-02 12:30:32', '30', '100', '产品参数：\n上市时间: 2015年夏季品牌: Bopie/宝派材质成分: 棉100%款号: 0039颜色分类: 黑白灰 黑色3件装 2黑1灰 灰色黑色枣红 白色黑色军绿 白色3件装 灰色黑色军绿 白灰绿色 白灰深蓝 2灰1白 灰色3件装 2灰1黑 2黑1白 2白1灰 白色黑色深兰 2白1黑 灰色黑色深兰色 自选颜色 酒红军绿深兰（粗螺纹） 黑白灰（粗螺纹） 2白1黑 （粗螺纹） 礼盒升级款（黑白灰） 礼盒升级款（2白1黑） 礼盒升级款（2灰1黑）风格: 简约材质: 棉面料: 针织图案: 纯色服装款式细节: 一片式尺码: 165(M) 170(L) 175(XL) 180(XXL) 185(XXXL)适用性别: 男');
INSERT INTO `t_goods` VALUES ('50', '运动裤男士休闲裤男长裤青年春秋针织棉直筒宽松大码夏季薄款卫裤', '69', '/upload/product/d2e2a3a4-02d1-4184-b7ff-854b7808d492.jpg,/upload/product/e8ea2241-7b2a-4f39-9e33-32d7b829405e.jpg,/upload/product/e25c284d-dce3-42d1-abbf-8803b041483c.jpg', '1', '0', '12', '运动服饰', '2016-05-02 12:31:30', '39', '100', '产品参数\n其他适用场景：其他休闲适用对象：青年\n工艺/流行工艺处理：免烫处理细分风格：潮图案：纯色\n关键信息上市年份季节：2016年春季材质成分：棉95% 聚氨酯弹性纤维(氨纶)5%货号：Y14C8803销售渠道类型：纯电商(只在线上销售)品牌：YTK弹力：中弹厚薄：常规基础风格：时尚都市面料：其他');
INSERT INTO `t_goods` VALUES ('51', '包顺丰斯伯丁NBA篮球 74-604Y室外室内lanqiu掌控74-221l篮球', '176', '/upload/product/0708aa69-7cbf-406c-90b8-12ae38324995.jpg,/upload/product/2d5d89f8-984e-41f8-9efe-d82339a1632f.jpg,/upload/product/783fabe7-a907-49e0-8300-5a0646553307.jpg', '1', '0', '14', '球类用品', '2016-05-02 12:36:38', '130', '100', '产品参数：\n上市时间: 2014年夏季品牌: Spalding/斯伯丁Spalding斯伯丁篮球系列: NBA比赛用球是否商场同款: 是颜色分类: 74-655Y【炫彩篮球】 【大赢家】74-160 【新款掌控】74-604Y 【老款掌控】74-221货号: 74-221球分类: 室内室外通用篮球篮球规格: 七号篮球(标准球)材质: PU球队: 西部篮球队NBA西部球队: 太阳队');
INSERT INTO `t_goods` VALUES ('52', 'NIKE足球5号4号欧冠西甲英超亚冠中超世界杯PU耐克足球zuqiu正品', '149', '/upload/product/cadfd72e-ae22-41e9-985d-42e5ae1941f6.jpg,/upload/product/789300aa-2aaa-4c0c-b7ec-9dfd2379dc33.jpg,/upload/product/c87a0d1e-0e65-4df2-9292-cb5bcfb0aa35.jpg', '1', '0', '14', '球类用品', '2016-05-02 12:37:55', '89', '100', '产品参数：\n上市时间: 2016年夏季品牌: Nike/耐克是否商场同款: 是颜色分类: 【5号】基础款SC2729-100 【4号】中超SC3031-100 【4号】基础款SC2729-100 【5号】中超SC3031-100 【4号】基础款SC2729-102 【5号】基础款SC2729-102货号: 229900足球尺寸: 5号球(正规11人制用)材质: PU足球缝线: 机缝足球');
INSERT INTO `t_goods` VALUES ('53', '耐克篮球PU耐磨7号黑子的花球正品BB0509室外水泥地防滑NIKE篮球', '259', '/upload/product/212ff69d-2d4c-4576-bf4e-435018f33ab9.jpg,/upload/product/4fa95720-0450-467a-b513-8049be7b1e28.jpg,/upload/product/36b179e7-efa4-49ab-a85c-757e477c2c53.jpg', '1', '0', '14', '球类用品', '2016-05-02 12:39:18', '189', '100', '产品参数：\n上市时间: 2015年冬季品牌: Nike/耐克系列: 水泥地系列是否商场同款: 是颜色分类: 棕色801【送气筒，球包，气针】 湖人紫577【送气筒，球包，气针】货号: BB0509球分类: 室外篮球篮球规格: 七号篮球(标准球)材质: PU');
INSERT INTO `t_goods` VALUES ('54', '正品Adidas阿迪达斯学生比赛软皮足球5号11人标准足球欧冠比赛球', '300', '/upload/product/f82b0452-6f2d-4444-a474-dc973ec7a883.jpg,/upload/product/6e79b4a2-2925-4564-8368-b7352c2b0692.jpg,/upload/product/c2071daf-97e9-441f-a305-dfb6e8283746.jpg', '1', '0', '14', '球类用品', '2016-05-02 12:40:26', '200', '100', '产品参数：\n上市时间: 2016年春季品牌: Adidas/阿迪达斯是否商场同款: 是颜色分类: S12241-4号球气筒+球针网+球袋 S12241-5号球气筒+球针网+球袋 AO3413-5气筒+球针网+球袋 AC5492气筒+球针网+球袋 AC5488气筒+球针网+球袋 4号球 AC5488气筒+球针网+球袋5号球货号: AC5526足球尺寸: 5号球(正规11人制用)材质: PU足球缝线: 机缝足球');
INSERT INTO `t_goods` VALUES ('55', 'STAR排球正品世达排球成人比赛排球中考专用球排球学生不伤手排球', '199', '/upload/product/a72bedf4-db77-46b2-a833-4e8182bd03a1.jpg,/upload/product/78a49387-448f-4739-b073-89bbd6f24226.jpg,/upload/product/4fe529db-20f2-49f7-a7dc-9c51b77b2c2d.jpg', '1', '0', '14', '球类用品', '2016-05-02 12:42:16', '109', '100', '产品参数：\n产品名称：Star/世达上市时间: 2013年秋季品牌: Star/世达是否商场同款: 是颜色分类: VB4025-34 VB4065C-34 VB4055-34 VB4035-34 VB425-34 VB315-34货号: VB4025-34球分类: 室内比赛用球');
INSERT INTO `t_goods` VALUES ('56', '包邮特价专柜正品MIKASA/米卡萨排球国际排联官方标准用球', '238', '/upload/product/e1670a93-0002-4d7b-ad89-ce65917777c0.jpg,/upload/product/e1670a93-0002-4d7b-ad89-ce65917777c0.jpg,/upload/product/a1701e47-badb-456e-abd8-ca571ae06b74.jpg', '1', '0', '14', '球类用品', '2016-05-02 12:43:14', '138', '100', '产品参数：\n产品名称：Mikasa/米卡萨上市时间: 2014年夏季品牌: Mikasa/米卡萨是否商场同款: 是颜色分类: 深蓝色 红色 蓝色 黄色货号: VQ2000球分类: 室内比赛用球');
INSERT INTO `t_goods` VALUES ('57', '正品YONEX尤尼克斯yy林丹羽毛球拍单拍 男女超轻全碳素进攻型球拍', '350', '/upload/product/266a79a8-0ace-4fa3-9f5f-64773931cf97.jpg,/upload/product/8919647a-dd92-4933-965c-a7aeb0c89392.jpg,/upload/product/904d4184-7772-4c2b-8394-d639db8cba37.jpg', '1', '0', '14', '球类用品', '2016-05-02 12:45:19', '250', '100', '产品参数：\n上市时间: 2013年秋季品牌: YONEX/尤尼克斯Yonex/尤尼克斯 拍系: 更多型号: NR-D1颜色分类: VT1LD亮红 iso-lite2白绿 VT1白金 VT1白红 NR-D23亮黄 NR-D1白蓝色 情侣款入门级速度单拍 NR-D1白红色 情侣款入门级速度单拍 NR-D1白粉色 情侣款入门级速度单拍货号: NR-D1羽毛球打法分类: 防守型(拍头轻杆软)拍杆硬度: 软产地: 其他拍柄粗细: G4材质: 碳纤维重量: 85g(含)-89g(含)');
INSERT INTO `t_goods` VALUES ('58', '正品银河乒乓球拍底板天王星U2 7层纯木乒乓球底板快攻弧圈横直拍', '99', '/upload/product/4e8feffd-b2c5-4759-a9cb-2ac9318efb40.jpg,/upload/product/74516824-aacd-4a54-bc39-0916d967c30f.jpg,/upload/product/cc8e075c-0632-4985-92d9-ded0dbfc737f.jpg', '1', '0', '14', '球类用品', '2016-05-02 12:46:32', '59', '100', '产品参数：\n产品名称：银河 天王星U系列 天王星 ...上市时间: 2012年夏季品牌: 银河银河底板系列: 天王星U天王星U系列: U-2#是否商场同款: 是颜色分类: 1块直拍（短柄）/空拍+送圆形半拍套/颜色随机 1块横拍（长柄）/空拍送圆形半拍套/颜色随机 1块直拍（空拍）+银河全拍套（颜色随机） 1块横拍（空拍）+银河全拍套（颜色随机）货号: U-2乒乓底板材质: 木层数: 7层拍柄重量: 头沉柄轻');
INSERT INTO `t_goods` VALUES ('59', '健身器材运动跑步装备负重背心隐形薄款铁砂绑腿沙袋衣可调节', '200', '/upload/product/87b94bca-86f3-4fd0-9eca-3f495791521d.jpg,/upload/product/6f32e873-48b4-4b53-bc4a-86768c61350d.jpg,/upload/product/c09d9352-3f7a-4a69-9558-b0c6feb008b5.jpg', '1', '0', '15', '健身设备', '2016-05-02 12:48:06', '100', '100', '产品参数：\n上市时间: 2016年春季品牌: EG是否商场同款: 否颜色分类: 3.6kg背心+1.35kg绑手+2.25kg绑腿 3.6kg背心+2.25kg绑腿 4.5kg背心+2.25kg绑手+4.5kg绑腿 4.5kg背心+4.5kg绑腿 蓝色 4.5kg背心 黑色 9kg背心 粉色 3.6kg背心 黑色 6.8kg背心货号: MK1202负重装备分类: 负重背心负重级别: 5kg(含)-10kg(含)');
INSERT INTO `t_goods` VALUES ('60', '可调节负重腰带可拆卸沙袋绑腿健身负重跑步腹部训练深蹲男2.5KG', '298', '/upload/product/e2ac151b-24f5-45ed-bbbd-91846ba6b6ac.jpg,/upload/product/e2ac151b-24f5-45ed-bbbd-91846ba6b6ac.jpg,/upload/product/e2ac151b-24f5-45ed-bbbd-91846ba6b6ac.jpg', '1', '0', '15', '健身设备', '2016-05-02 12:51:06', '188', '100', '产品参数：\n上市时间: 2014年冬季品牌: 骐骏货号: AW035负重级别: 5kg及以下');
INSERT INTO `t_goods` VALUES ('61', '牛角包 保加利亚训练袋 力量训练包 爆发力训练 体能训练健身袋', '320', '/upload/product/2d970bdd-4271-4794-af28-324d15ef90dd.jpg,/upload/product/6f0ca9bb-48a9-492f-a1bc-2e3047322220.jpg,/upload/product/9d69bdea-b379-42d0-80ac-3a8c62424a81.jpg', '1', '0', '15', '健身设备', '2016-05-02 12:55:33', '220', '100', '产品参数：\n上市时间: 2014年秋季品牌: JOINFIT颜色分类: 蓝色/5公斤（PU） 黄色/10KG（PU） 黑色/15KG（PU） 橘色/20KG（PU） 棕色/8公斤（超纤） 棕色/12公斤（超纤） 棕色/16公斤（超纤） 棕色/20公斤（超纤） 黑色/12KG（超纤） 黑色/16KG（超纤） 黑色/20KG（超纤）货号: 牛角包');
INSERT INTO `t_goods` VALUES ('62', '三乔引体向上多功能单杠家用单双杠运动器械训练室内健身器材', '668', '/upload/product/4dc3e561-afd6-4776-b3f9-97a5a5c697fc.jpg,/upload/product/07a086a0-7b8f-40d3-b6e5-39c4e1e2ff24.jpg,/upload/product/3037beaa-e1ad-4861-b3be-fea114eb6ac5.jpg', '1', '0', '15', '健身设备', '2016-05-02 12:57:56', '548', '100', '产品参数：\n上市时间: 2016年春季品牌: 三乔是否商场同款: 否颜色分类: 单双杠基本款 单双杠哑铃凳款 主图套装20公斤包胶哑铃+20公斤环保杠铃货号: SQ-DANG202单双杠类型: 室内单双杠');
INSERT INTO `t_goods` VALUES ('63', '夺冠哑铃包邮电镀15KG20公斤30KG健身器材男士家用哑铃杠铃套装', '275', '/upload/product/872b6da7-4f7f-450e-b384-9ceea5224c71.jpg,/upload/product/527184f7-8506-43a2-a1cf-b8009822de05.jpg,/upload/product/d1605d80-ce6f-4a29-96dd-13f911efb423.jpg', '1', '0', '15', '健身设备', '2016-05-02 12:58:43', '185', '100', '产品参数：\n上市时间: 2014年秋季品牌: 夺冠是否商场同款: 是颜色分类: 到四川、重庆、山西、陕西、快递 湖南、湖北、河南、福建、江西、快递 北京、天津、河北、山东、广东快递 上海、浙江、江苏、安徽、快递 到甘肃、宁夏、青海快递 到贵州、广西快递 到新疆、西藏物、流省会自提 到辽宁、吉林、云南、快递 到内蒙古、海南、黑龙江、快递货号: A000111哑铃分类: 电镀哑铃重量: 15公斤一对精装包胶杆双保险螺母送杠铃连接器 15公斤一对精装丝光杆双保险螺母送杠铃连接器 20公斤一对精装包胶杆双保险螺母送杠铃连接器 20公斤一对精装丝光杆双保险螺母送杠铃连接器 30公斤一对精装包胶杆双保险螺母送杠铃连接器 7.5公斤包胶杆一只纸箱包装 30公斤一对精装丝光杆双保险螺母送杠铃连接器适用对象: 男按健身效果选择: 练臂肌');
INSERT INTO `t_goods` VALUES ('64', '健腹轮 腹肌轮锻炼练腹部马甲线健身器材家用 减肚子滚轮收腹巨轮', '45', '/upload/product/c67cf6ff-995e-45d9-aff9-089585a2a825.jpg,/upload/product/b84307e1-34a8-45a7-8003-f24333c499f5.jpg,/upload/product/8ccfb0a6-18b4-4347-abd5-191fc98408d5.jpg', '1', '0', '15', '健身设备', '2016-05-02 12:59:55', '30', '100', '产品参数：\n上市时间: 2014年春季品牌: 赫朗是否商场同款: 否颜色分类: 简装老款【小轮款无跪垫】 165森林之王豪华稳定防滑款【环保无毒】送加厚跪垫 165绿色风暴豪华稳定防滑款【环保无毒】送加厚跪垫 绿箭侠至尊三轮稳定防滑轮【环保无毒】送加厚跪垫 安全弹力绳+165绿色风暴豪华稳定防滑款【环保无毒】送加厚跪垫 安全弹力绳+绿箭侠至尊三轮稳定防滑轮【环保无毒】送加厚跪垫 165绿色风暴稳定防滑款送【H型俯卧撑+收纳袋+专业跪垫】 绿箭侠至尊三轮稳定防滑轮送【H型俯卧撑+收纳袋+专业跪垫】 安全弹力绳+165绿色风暴款送【H型俯卧撑+收纳袋+专业跪垫】货号: HL-3001健身器材分类: 双轮健腹器按健身效果选择: 美腹/瘦腹/健腹');
INSERT INTO `t_goods` VALUES ('65', '男士健身器材拉力器家用多功能扩胸器乳胶管臂力器运动器材拉力绳', '50', '/upload/product/2ce8a163-61c7-4a53-b1a0-7d34a033230e.jpg,/upload/product/ca662641-f870-42c1-92a6-58eafe8e484a.jpg,/upload/product/ca662641-f870-42c1-92a6-58eafe8e484a.jpg', '1', '0', '15', '健身设备', '2016-05-02 13:01:14', '25', '100', '产品参数：\n上市时间: 2014年秋季品牌: 能耐是否商场同款: 否颜色分类: 五条扩胸拉力器-灰橙拼色 五条扩胸拉力器-灰黑拼色 灰橙色五条扩胸拉力器+蓝灰泡棉哑铃1KG 灰橙色五条扩胸拉力器+蓝灰泡棉哑铃1.5KG 灰橙色五条扩胸拉力器+蓝灰泡棉哑铃2KG货号: MK8001拉力器分类: 橡筋拉力器适用对象: 男按健身效果选择: 健身综合练习');
INSERT INTO `t_goods` VALUES ('66', '家用弹簧臂力器握力棒3040kg50公斤体育运动用品锻炼胸肌健身器材', '50', '/upload/product/633aa832-0272-40b4-80d2-d14bade8a623.jpg,/upload/product/dab8c33f-8345-400f-acb2-40fb999f9778.jpg,/upload/product/1bfa2f71-0414-4ca6-9192-bdfa65f69e4a.jpg', '1', '0', '15', '健身设备', '2016-05-02 13:02:58', '25', '100', '产品参数：\n上市时间: 2014年夏季品牌: 索维尔颜色分类: 黑色货号: 臂力器臂力器级别: 30公斤 40公斤 50公斤 60公斤按健身效果选择: 练臂肌');

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
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of t_menuitem
-- ----------------------------
INSERT INTO `t_menuitem` VALUES ('1', 'shopMenu', null, '商城入口', '#', 'asd', 'product/productmanage.html');
INSERT INTO `t_menuitem` VALUES ('2', 'shopMenu', '1', '购物车', '#/shopcar', 'ase', 'product/productmanage.html');
INSERT INTO `t_menuitem` VALUES ('3', 'shopMenu', '1', '添加商品', '#/addgoods', 'addproductctrl', 'product/addproduct.html');
INSERT INTO `t_menuitem` VALUES ('4', 'shopMenu', '1', '商品列表', '#/goodsmanager', 'goodsmanagerctrl', 'product/productmanage.html');
INSERT INTO `t_menuitem` VALUES ('5', 'shopMenu', '1', '编辑商品', '#/editproduct', 'editproductctrl', 'product/editproduct.html');
INSERT INTO `t_menuitem` VALUES ('6', 'shopMenu', '1', '编辑商品类型', '#/editproducttype', 'editproducttypectrl', 'product/editproducttype.html');
INSERT INTO `t_menuitem` VALUES ('7', 'shopMenu', '1', '添加产品类型', '#/addproducttype', 'addproducttypectrl', 'product/addproducttype.html');

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
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of t_menumap
-- ----------------------------
INSERT INTO `t_menumap` VALUES ('1', '2', '1');
INSERT INTO `t_menumap` VALUES ('2', '2', '2');
INSERT INTO `t_menumap` VALUES ('3', '2', '3');
INSERT INTO `t_menumap` VALUES ('4', '2', '4');
INSERT INTO `t_menumap` VALUES ('5', '2', '5');
INSERT INTO `t_menumap` VALUES ('6', '2', '6');
INSERT INTO `t_menumap` VALUES ('7', '2', '7');

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
  `customerid` int(11) DEFAULT NULL COMMENT '顾客id',
  PRIMARY KEY (`orderid`),
  KEY `fk_customer` (`customerid`),
  CONSTRAINT `fk_customer` FOREIGN KEY (`customerid`) REFERENCES `t_user` (`userid`) ON DELETE CASCADE ON UPDATE CASCADE
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
