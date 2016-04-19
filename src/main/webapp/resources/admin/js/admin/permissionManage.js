/**
 * 行为控制器.
 */
chldControllers
		.controller(
				'permissionCtrl',
				function($scope, $http, ngDialog) {
					$scope.page = new PaginationVo();
					$scope.page.size = 15;
					$scope.page.indexPageNum = 1;

					$scope.permissionForSearch = new PermissionVo();
					$scope.pagePermission = function() {
						$(".loading-container").removeClass("loading-inactive");
						var url = baseUrl + "pagePermission.action?page="
								+ $scope.page.voToJson();
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
											template : '<h3>删除该行为，将不能恢复！</h3><h4>是否继续删除？</h4><hr/>'
													+ '<div class="ngdialog-buttons">'
													+ '<button type="button" class="ngdialog-button ngdialog-button-primary" ng-click="confirm(1)">确定</button>'
													+ '<button type="button" class="ngdialog-button ngdialog-button-secondary" ng-click="closeThisDialog(0)">取消</button></div>',
											plain : true,
											scope : $scope,
											closeByEscape : false
										})
								.then(
										function() {
											var permission = new PermissionVo();
											permission.permissionid = id;

											$(".loading-container")
													.removeClass(
															"loading-inactive");
											$http
													.get(
															baseUrl
																	+ "deletePermission.action?permission="
																	+ permission
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

					$scope.preAddPermission = function() {
						window.location.href = "#/addpermission";
					}

					$scope.preEditPermission = function(id) {
						localStoragePut("editpermissionid", id);
						window.location.href = "#/editpermission";
					}

					$scope.searchPermission = function() {
						$scope.pagePermission();
					}

					$scope.prePermissionRole = function(id) {
						localStoragePut("permissionidrole", id);
						window.location.href = "#/permissionrole";
					}
				});