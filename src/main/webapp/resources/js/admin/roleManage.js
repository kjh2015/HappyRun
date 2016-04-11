/**
 * 角色控制器.
 */
chldControllers
		.controller(
				'roleCtrl',
				function($scope, $http, ngDialog) {
					$scope.page = new PaginationVo();
					$scope.page.size = 15;
					$scope.page.indexPageNum = 1;

					$scope.roleForSearch = new RoleVo();
					$scope.pageRole = function() {
						$(".loading-container").removeClass("loading-inactive");
						var url = baseUrl + "pageRole.action?page="
								+ $scope.page.voToJson();
						if (($scope.roleForSearch.roleid != null && $scope.roleForSearch.roleid != "")
								|| ($scope.roleForSearch.rolename != null && $scope.roleForSearch.rolename != "")) {
							url = url + "&role="
									+ $scope.roleForSearch.voToJson();
						}
						$http
								.get(url, {
									"noCache" : Date()
								})
								.success(
										function(data) {
											$(".loading-container").addClass(
													"loading-inactive");
											if (data) {
												if (data.serviceResult == true) {
													$scope.roles = data.resultParm.pageList;
													$scope.page.totalCount = data.resultParm.totalCount;
													var element = $('#page');
													var totalPages = Math
															.ceil($scope.page.totalCount
																	/ $scope.page.size);

													var options = {
														bootstrapMajorVersion : 3,
														currentPage : $scope.page.indexPageNum,
														numberOfPages : 5,
														totalPages : totalPages,
														onPageClicked : function(
																event,
																originalEvent,
																type, page) { // 异步换页
															$scope.page.indexPageNum = page;
															$scope
																	.pageRole();
														}
													}
													element
															.bootstrapPaginator(options);
												} else {
													$window.location.href = "login.html";
												}
											} else {
												alert("数据库连接失败，请联系技术工程师");
											}
										}).error(
										function(data) {
											$(".loading-container").addClass(
													"loading-inactive");
										});
					}
					$scope.pageRole();

					$scope.deleteRole = function(id) {
						ngDialog
								.openConfirm(
										{
											template : '<h3>删除该角色，将不能恢复！</h3><h4>是否继续删除？</h4><hr/>'
													+ '<div class="ngdialog-buttons">'
													+ '<button type="button" class="ngdialog-button ngdialog-button-primary" ng-click="confirm(1)">确定</button>'
													+ '<button type="button" class="ngdialog-button ngdialog-button-secondary" ng-click="closeThisDialog(0)">取消</button></div>',
											plain : true,
											scope : $scope,
											closeByEscape : false
										})
								.then(
										function() {
											var role = new RoleVo();
											role.roleid = id;

											$(".loading-container")
													.removeClass(
															"loading-inactive");
											$http
													.get(
															baseUrl
																	+ "deleteRole.action?role="
																	+ role
																			.voToJson(),
															{
																"noCache" : Date()
															})
													.success(
															function(data) {
																$(
																		".loading-container")
																		.addClass(
																				"loading-inactive");
																if (data) {
																	if (data.serviceResult == true) {
																		$scope
																				.getPageMenuItem();
																	} else {
																		$window.location.href = "login.html";
																	}
																} else {
																	alert("数据库连接失败，请联系技术工程师");
																}
															})
													.error(
															function(data) {
																$(
																		".loading-container")
																		.addClass(
																				"loading-inactive");
															});
										});
					}

					$scope.preAddRole = function() {
						window.location.href = "#/addrole";
					}

					$scope.preEditRole = function(id) {
						localStoragePut("editroleid", id);
						window.location.href = "#/editrole";
					}
					
					$scope.searchRole = function() {
						$scope.pageRole();
					}

					$scope.preRolePermission = function(id) {
						localStoragePut("roleidpermission", id);
						window.location.href = "#/rolepermission";
					}
				});