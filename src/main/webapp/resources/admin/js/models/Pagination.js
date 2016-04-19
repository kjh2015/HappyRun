/**
 * Copyright (c) 2014 Wteamfly.  All rights reserved. 网飞公司 版权所有.
 * 请勿修改或删除版权声明及文件头部.
 */
if (typeof Pagination == 'undefined') {
	function Pagination() {
		this.pageSize;
		this.startPage;
		this.totalCount;
		this.pageList;
	}
}

/*
 * voToJson
 */
Pagination.prototype.voToJson = function() {
	return JSON.stringify(this);
};