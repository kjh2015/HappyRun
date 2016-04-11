/**
* Copyright (c) 2015 www.usale123.com.  All rights reserved. 优售科技 版权所有.
* 请勿修改或删除版权声明及文件头部.
*/

/**
  * CurrencyVo实体.
  * 
  * @author 殷梓淞
  * @version v1.0.0
  */
 if (typeof CurrencyVo == 'undefined') {
     	function CurrencyVo() {
  this.currencyid;
  this.entitynamezh;
  this.entitynameen;
  this.currencynamezh;
  this.currencynameen;
  this.charactercode;
  this.numbercode;
  this.auxiliaryunit;
  this.createtime;
  this.creatorid;
  this.editetime;
  this.editorid;
  this.isdelete;
  this.islockup;
  this.version;
 }
 }
CurrencyVo.prototype.voToJson = function() {
 return JSON.stringify(this);
 };
