/**
* Copyright (c) 2015 www.usale123.com.  All rights reserved. 优售科技 版权所有.
* 请勿修改或删除版权声明及文件头部.
*/

/**
  * ProductVo实体.
  * 
  * @author 殷梓淞
  * @version v1.0.0
  */
 if (typeof ProductVo == 'undefined') {
     	function ProductVo() {
  this.productid;
  this.producttypeids;
  this.relevancepid;
  this.productname;
  this.producttypenames;
  this.description;
  this.price;
  this.unit;
  this.netweight;
  this.specification;
  this.currencyid;
  this.currency;
  this.stock;
  this.provider;
  this.images;
  this.logo;
  this.status;
  this.registerdate;
  this.percent;
  this.relevancenum;
  this.relevancestock;
  this.remark;
  this.createtime;
  this.creatorid;
  this.editetime;
  this.editorid;
  this.isdelete;
  this.islockup;
  this.version;
 }
 }
ProductVo.prototype.voToJson = function() {
 return JSON.stringify(this);
 };
