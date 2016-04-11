/**
 * 菜单项控制器.
 */
chldControllers
		.controller(
				'menuitemCtrl',
				function($scope, $http, ngDialog) {
					$scope.page = new PaginationVo();
					$scope.page.size = 15;
					$scope.page.indexPageNum = 1;

					$scope.menuitemForSearch = new MenuItemVo();
					$scope.pageMenuItem = function() {
						$(".loading-container").removeClass("loading-inactive");
						var url = baseUrl + "pageMenuItem.action?page="
								+ $scope.page.voToJson();
						if (($scope.menuitemForSearch.menuitemid != null && $scope.menuitemForSearch.menuitemid != "")
								|| ($scope.menuitemForSearch.menuname != null && $scope.menuitemForSearch.menuname != "")
								|| ($scope.menuitemForSearch.menuitemname != null && $scope.menuitemForSearch.menuitemname != "")
								|| ($scope.menuitemForSearch.menuitemurl != null && $scope.menuitemForSearch.menuitemurl != "")
								|| ($scope.menuitemForSearch.menuitemrouteurl != null && $scope.menuitemForSearch.menuitemrouteurl != "")
								|| ($scope.menuitemForSearch.menuitemctrl != null && $scope.menuitemForSearch.menuitemctrl != "")) {
							url = url + "&menuItem="
									+ $scope.menuitemForSearch.voToJson();
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
													$scope.menuitems = data.resultParm.pageList;
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
																	.pageMenuItem();
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
					$scope.pageMenuItem();

					$scope.deleteMenuItem = function(id) {
						ngDialog
								.openConfirm(
										{
											template : '<h3>删除该菜单项，将不能恢复！</h3><h4>是否继续删除？</h4><hr/>'
													+ '<div class="ngdialog-buttons">'
													+ '<button type="button" class="ngdialog-button ngdialog-button-primary" ng-click="confirm(1)">确定</button>'
													+ '<button type="button" class="ngdialog-button ngdialog-button-secondary" ng-click="closeThisDialog(0)">取消</button></div>',
											plain : true,
											scope : $scope,
											closeByEscape : false
										})
								.then(
										function() {
											var menuitem = new MenuItemVo();
											menuitem.menuitemid = id;

											$(".loading-container")
													.removeClass(
															"loading-inactive");
											$http
													.get(
															baseUrl
																	+ "deleteMenuItem.action?menuItem="
																	+ menuitem
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

					$scope.preAddMenuItem = function() {
						window.location.href = "#/addmenuitem";
					}

					$scope.preEditMenuItem = function(id) {
						localStoragePut("editmenuitemid", id);
						window.location.href = "#/editmenuitem";
					}
					
					$scope.searchMenuItem = function() {
						$scope.pageMenuItem();
					}

					$scope.preMenuItemRole = function(id) {
						localStoragePut("menuitemidrole", id);
						window.location.href = "#/menuitemrole";
					}
				});