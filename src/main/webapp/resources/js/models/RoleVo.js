/**
 * Copyright (c) 2014 Wteamfly.  All rights reserved. 网飞公司 版权所有.
 * 请勿修改或删除版权声明及文件头部.
 */

/**
 * RoleVo实体.
 * 
 * @author 殷梓淞
 * @since v1.0.0
 */
if (typeof RoleVo == 'undefined') {
	function RoleVo() {
		this.roleid;
		this.rolename;
		this.createTime;
		this.creatorId;
		this.editeTime;
		this.editorId;
		this.isDelete;
		this.isLockUp;
		this.version;
	}
}
RoleVo.prototype.voToJson = function() {
	return JSON.stringify(this);
};
