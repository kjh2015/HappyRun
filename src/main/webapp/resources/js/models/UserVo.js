/**
 * Copyright (c) 2014 Wteamfly.  All rights reserved. 网飞公司 版权所有.
 * 请勿修改或删除版权声明及文件头部.
 */

/**
 * UserVo实体.
 * 
 * @author
 * @since v1.0.0
 */
if (typeof UserVo == 'undefined') {
	function UserVo() {
		this.userid;
		this.username;
		this.password;
	}
}
UserVo.prototype.voToJson = function() {
	return JSON.stringify(this);
};
