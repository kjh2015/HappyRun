/**
 * 角色行为控制器.
 */
chldControllers
		.controller(
				'rolepermission',
				function($scope, $http, ngDialog) {
					var rolePermissionList = [];

					$scope.pageleft = new PaginationVo();
					$scope.pageleft.size = 15;
					$scope.pageleft.indexPageNum = 1;

					var roleidpermission = localStorageGet("roleidpermission",
							false);
					var po = new RoleVo();
					po.roleid = roleidpermission;
					$scope.pageRolePermission = function() {
						$(".loading-container").removeClass("loading-inactive");
						var url = baseUrl + "pageRolePermission.action?page="
								+ $scope.pageleft.voToJson() + "&role="
								+ po.voToJson();
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
													$scope.rolepermissions = data.resultParm.pageList;

													for (var i = 0; i < data.resultParm.pageList.length; i++) {
														rolePermissionList[data.resultParm.pageList[i].permissionid] = 1;
													}

													$scope.pageleft.totalCount = data.resultParm.totalCount;
													var element = $('#page');
													var totalPages = Math
															.ceil($scope.pageleft.totalCount
																	/ $scope.pageleft.size);

													var options = {
														bootstrapMajorVersion : 3,
														currentPage : $scope.pageleft.indexPageNum,
														numberOfPages : 5,
														totalPages : totalPages,
														onPageClicked : function(
																event,
																originalEvent,
																type, page) { // 异步换页
															$scope.pageleft.indexPageNum = page;
															$scope
																	.pageRolePermission();
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
					$scope.pageRolePermission();

					$scope.pageright = new PaginationVo();
					$scope.pageright.size = 15;
					$scope.pageright.indexPageNum = 1;

					$scope.permissionForSearch = new PermissionVo();
					$scope.pagePermission = function() {
						$(".loading-container").removeClass("loading-inactive");
						var url = baseUrl + "pagePermission.action?page="
								+ $scope.pageright.voToJson();
						if (($scope.permissionForSearch.permissionid != null && $scope.permissionForSearch.permissionid != "")
								|| ($scope.permissionForSearch.permissionname != null && $scope.permissionForSearch.permissionname != "")) {
							url = url + "&permission="
									+ $scope.permissionForSearch.voToJson();
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
													$scope.permissions = data.resultParm.pageList;
													$scope.pageright.totalCount = data.resultParm.totalCount;
													var element = $('#page');
													var totalPages = Math
															.ceil($scope.pageright.totalCount
																	/ $scope.pageright.size);

													var options = {
														bootstrapMajorVersion : 3,
														currentPage : $scope.pageright.indexPageNum,
														numberOfPages : 5,
														totalPages : totalPages,
														onPageClicked : function(
																event,
																originalEvent,
																type, page) { // 异步换页
															$scope.pageright.indexPageNum = page;
															$scope
																	.pagePermission();
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
					$scope.pagePermission();

					$scope.deletePermission = function(id) {
						ngDialog
								.openConfirm(
										{
											template : '<h3>即将删除该行为！</h3><h4>是否继续删除？</h4><hr/>'
													+ '<div class="ngdialog-buttons">'
													+ '<button type="button" class="ngdialog-button ngdialog-button-primary" ng-click="confirm(1)">确定</button>'
													+ '<button type="button" class="ngdialog-button ngdialog-button-secondary" ng-click="closeThisDialog(0)">取消</button></div>',
											plain : true,
											scope : $scope,
											closeByEscape : false
										})
								.then(
										function() {
											var securityMap = new SecurityMapVo();
											securityMap.roleid = roleidpermission;
											securityMap.permissionid = id;

											$(".loading-container")
													.removeClass(
															"loading-inactive");
											$http
													.get(
															baseUrl
																	+ "delRolePermission.action?securityMap="
																	+ securityMap
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
																		rolePermissionList[id] = undefined;
																		$scope
																				.pageRolePermission();
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

					$scope.searchPermission = function() {
						$scope.pagePermission();
					}

					$scope.addPermission = function(id) {
						var securityMap = new SecurityMapVo();
						securityMap.roleid = roleidpermission;
						securityMap.permissionid = id;

						if (rolePermissionList[id] != 1) {
							$(".loading-container").removeClass(
									"loading-inactive");
							$http
									.get(
											baseUrl
													+ "addRolePermission.action?securityMap="
													+ securityMap.voToJson(), {
												"noCache" : Date()
											})
									.success(
											function(data) {
												$(".loading-container")
														.addClass(
																"loading-inactive");
												if (data) {
													if (data.serviceResult == true) {
														rolePermissionList[id] = 1;
														$scope
																.pageRolePermission();
													} else {
														$window.location.href = "login.html";
													}
												} else {
													alert("数据库连接失败，请联系技术工程师");
												}
											})
									.error(
											function(data) {
												$(".loading-container")
														.addClass(
																"loading-inactive");
											});
						}
					}
				});