/**
 * 行为角色控制器.
 */
chldControllers
		.controller(
				'permissionrole',
				function($scope, $http, ngDialog) {
					var permissionRoleList = [];

					$scope.pageleft = new PaginationVo();
					$scope.pageleft.size = 15;
					$scope.pageleft.indexPageNum = 1;

					var permissionidrole = localStorageGet("permissionidrole",
							false);
					var po = new PermissionVo();
					po.permissionid = permissionidrole;
					$scope.pagePermissionRole = function() {
						$(".loading-container").removeClass("loading-inactive");
						var url = baseUrl + "pagePermissionRole.action?page="
								+ $scope.pageleft.voToJson() + "&permission="
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
													$scope.permissionroles = data.resultParm.pageList;

													for (var i = 0; i < data.resultParm.pageList.length; i++) {
														permissionRoleList[data.resultParm.pageList[i].roleid] = 1;
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
																	.pagePermissionRole();
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
					$scope.pagePermissionRole();

					$scope.pageright = new PaginationVo();
					$scope.pageright.size = 15;
					$scope.pageright.indexPageNum = 1;

					$scope.roleForSearch = new RoleVo();
					$scope.pageRole = function() {
						$(".loading-container").removeClass("loading-inactive");
						var url = baseUrl + "pageRole.action?page="
								+ $scope.pageright.voToJson();
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
															$scope.pageRole();
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
											template : '<h3>即将删除该角色！</h3><h4>是否继续删除？</h4><hr/>'
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
											securityMap.roleid = id;
											securityMap.permissionid = permissionidrole;

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
																		permissionRoleList[id] = undefined;
																		$scope
																				.pagePermissionRole();
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

					$scope.searchRole = function() {
						$scope.pageRole();
					}

					$scope.addRole = function(id) {
						var securityMap = new SecurityMapVo();
						securityMap.roleid = id;
						securityMap.permissionid = permissionidrole;

						if (permissionRoleList[id] != 1) {
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
														permissionRoleList[id] = 1;
														$scope
																.pagePermissionRole();
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