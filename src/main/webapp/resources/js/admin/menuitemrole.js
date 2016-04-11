/**
 * 菜单项角色控制器.
 */
chldControllers
		.controller(
				'menuitemrole',
				function($scope, $http, ngDialog) {
					var menuitemRoleList = [];

					$scope.pageleft = new PaginationVo();
					$scope.pageleft.size = 15;
					$scope.pageleft.indexPageNum = 1;

					var menuitemidrole = localStorageGet("menuitemidrole",
							false);
					var po = new MenuItemVo();
					po.menuitemid = menuitemidrole;
					$scope.pageMenuItemRole = function() {
						$(".loading-container").removeClass("loading-inactive");
						var url = baseUrl + "pageMenuItemRole.action?page="
								+ $scope.pageleft.voToJson() + "&menuItem="
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
													$scope.menuitemroles = data.resultParm.pageList;

													for (var i = 0; i < data.resultParm.pageList.length; i++) {
														menuitemRoleList[data.resultParm.pageList[i].roleid] = 1;
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
																	.pageMenuItemRole();
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
					$scope.pageMenuItemRole();

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
											var menuMap = new MenuMapVo();
											menuMap.menuitemid = menuitemidrole;
											menuMap.roleid = id;

											$(".loading-container")
													.removeClass(
															"loading-inactive");
											$http
													.get(
															baseUrl
																	+ "delMenuItemRole.action?menuMap="
																	+ menuMap
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
																		menuitemRoleList[id] = undefined;
																		$scope
																				.pageMenuItemRole();
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
						var menuMap = new MenuMapVo();
						menuMap.menuitemid = menuitemidrole;
						menuMap.roleid = id;

						if (menuitemRoleList[id] != 1) {
							$(".loading-container").removeClass(
									"loading-inactive");
							$http
									.get(
											baseUrl
													+ "addMenuItemRole.action?menuMap="
													+ menuMap.voToJson(), {
												"noCache" : Date()
											})
									.success(
											function(data) {
												$(".loading-container")
														.addClass(
																"loading-inactive");
												if (data) {
													if (data.serviceResult == true) {
														menuitemRoleList[id] = 1;
														$scope
																.pageMenuItemRole();
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