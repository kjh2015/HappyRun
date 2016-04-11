/**
 * 用户角色控制器.
 */
chldControllers
		.controller(
				'userkeyrole',
				function($scope, $http, ngDialog) {
					var userkeyRoleList = [];

					$scope.pageleft = new PaginationVo();
					$scope.pageleft.size = 15;
					$scope.pageleft.indexPageNum = 1;

					var userkeyidrole = localStorageGet("userkeyidrole", false);
					var po = new UserkeyVo();
					po.userkeyId = userkeyidrole;
					$scope.pageUserkeyRole = function() {
						$(".loading-container").removeClass("loading-inactive");
						var url = baseUrl + "pageUserkeyRole.action?page="
								+ $scope.pageleft.voToJson() + "&userkey="
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
													$scope.userkeyroles = data.resultParm.pageList;

													for (var i = 0; i < data.resultParm.pageList.length; i++) {
														userkeyRoleList[data.resultParm.pageList[i].roleid] = 1;
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
																	.pageUserkeyRole();
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
					$scope.pageUserkeyRole();

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
											securityMap.userkeyid = userkeyidrole;
											securityMap.roleid = id;

											$(".loading-container")
													.removeClass(
															"loading-inactive");
											$http
													.get(
															baseUrl
																	+ "delRoleUserkey.action?securityMap="
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
																		userkeyRoleList[id] = undefined;
																		$scope
																				.pageUserkeyRole();
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
						securityMap.userkeyid = userkeyidrole;
						securityMap.roleid = id;

						if (userkeyRoleList[id] != 1) {
							$(".loading-container").removeClass(
									"loading-inactive");
							$http
									.get(
											baseUrl
													+ "addRoleUserkey.action?securityMap="
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
														userkeyRoleList[id] = 1;
														$scope
																.pageUserkeyRole();
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