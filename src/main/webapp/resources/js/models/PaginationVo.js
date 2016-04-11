/**
 * Copyright (c) 2014 Wteamfly.  All rights reserved. 网飞公司 版权所有.
 * 请勿修改或删除版权声明及文件头部.
 */
if (typeof PaginationVo == 'undefined') {
	function PaginationVo() {
		this.size;
		this.indexPageNum;
		this.totalCount;
	}
}

/*
 * voToJson
 */
PaginationVo.prototype.voToJson = function() {
	return JSON.stringify(this);
};