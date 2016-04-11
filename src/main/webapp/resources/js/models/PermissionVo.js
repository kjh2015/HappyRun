/**
 * Copyright (c) 2014 Wteamfly.  All rights reserved. 网飞公司 版权所有.
 * 请勿修改或删除版权声明及文件头部.
 */

/**
 * PermissionVo实体.
 * 
 * @author 殷梓淞
 * @since v1.0.0
 */
if (typeof PermissionVo == 'undefined') {
	function PermissionVo() {
		this.permissionid;
		this.permissionname;
		this.createTime;
		this.creatorId;
		this.editeTime;
		this.editorId;
		this.isDelete;
		this.isLockUp;
		this.version;
	}
}
PermissionVo.prototype.voToJson = function() {
	return JSON.stringify(this);
};
