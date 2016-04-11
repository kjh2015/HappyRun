/**
 * 修改菜单项控制器.
 */
chldControllers
		.controller(
				'editmenuitem',
				function($scope, $http, ngDialog) {
					var id = localStorageGet("editmenuitemid", false);
					var po = new MenuItemVo();
					po.menuitemid = id;

					var backupMenuitem = new MenuItemVo();
					$http
							.get(
									baseUrl
											+ "getMenuItemByMenuItemId.action?menuItem="
											+ po.voToJson(), {
										"noCache" : Date()
									})
							.success(
									function(data) {
										$(".loading-container").addClass(
												"loading-inactive");
										if (data) {
											if (data.serviceResult == true) {
												$scope.editmenuitem = new MenuItemVo();
												$scope.editmenuitem.menuitemid = data.resultParm.menuitem.menuitemid;
												$scope.editmenuitem.menuname = data.resultParm.menuitem.menuname;
												$scope.editmenuitem.menuitemname = data.resultParm.menuitem.menuitemname;
												$scope.editmenuitem.menuitemicon = data.resultParm.menuitem.menuitemicon;
												$scope.editmenuitem.menuitemorder = data.resultParm.menuitem.menuitemorder;
												$scope.editmenuitem.menuitemurl = data.resultParm.menuitem.menuitemurl;
												$scope.editmenuitem.menuitemrouteurl = data.resultParm.menuitem.menuitemrouteurl;
												$scope.editmenuitem.menuitemctrl = data.resultParm.menuitem.menuitemctrl;
												$scope.editmenuitem.menuitemparentid = data.resultParm.menuitem.menuitemparentid;
												$scope.editmenuitem.isshow = data.resultParm.menuitem.isshow;

												backupMenuitem.menuitemid = data.resultParm.menuitem.menuitemid;
												backupMenuitem.menuname = data.resultParm.menuitem.menuname;
												backupMenuitem.menuitemname = data.resultParm.menuitem.menuitemname;
												backupMenuitem.menuitemicon = data.resultParm.menuitem.menuitemicon;
												backupMenuitem.menuitemorder = data.resultParm.menuitem.menuitemorder;
												backupMenuitem.menuitemurl = data.resultParm.menuitem.menuitemurl;
												backupMenuitem.menuitemrouteurl = data.resultParm.menuitem.menuitemrouteurl;
												backupMenuitem.menuitemctrl = data.resultParm.menuitem.menuitemctrl;
												backupMenuitem.menuitemparentid = data.resultParm.menuitem.menuitemparentid;
												backupMenuitem.isshow = data.resultParm.menuitem.isshow;
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

					$scope.back = function() {
						window.history.back();
					}

					$scope.editMenuItem = function() {
						$(".loading-container").removeClass("loading-inactive");

						if ($scope.editmenuitem.menuname == null
								|| $scope.editmenuitem.menuname == "") {
							ngDialog
									.openConfirm(
											{
												template : '<h3>菜单项所属菜单名不能为空</h3><hr/>'
														+ '<div class="ngdialog-buttons">'
														+ '<button type="button" class="ngdialog-button ngdialog-button-primary" ng-click="confirm(1)">确定</button></div>',
												plain : true,
												scope : $scope,
												closeByEscape : false
											})
									.then(
											function() {
												$(".loading-container")
														.addClass(
																"loading-inactive");
											});
						} else if ($scope.editmenuitem.menuitemname == null
								|| $scope.editmenuitem.menuitemname == "") {
							ngDialog
									.openConfirm(
											{
												template : '<h3>菜单项标题不能为空</h3><hr/>'
														+ '<div class="ngdialog-buttons">'
														+ '<button type="button" class="ngdialog-button ngdialog-button-primary" ng-click="confirm(1)">确定</button></div>',
												plain : true,
												scope : $scope,
												closeByEscape : false
											})
									.then(
											function() {
												$(".loading-container")
														.addClass(
																"loading-inactive");
											});
						} else {
							var parm = new MenuItemVo();
							parm.menuitemid = $scope.editmenuitem.menuitemid;
							if ($scope.editmenuitem.menuname != backupMenuitem.menuname) {
								parm.menuname = $scope.editmenuitem.menuname;
							}
							if ($scope.editmenuitem.menuitemname != backupMenuitem.menuitemname) {
								parm.menuitemname = $scope.editmenuitem.menuitemname;
							}
							if ($scope.editmenuitem.menuitemicon != backupMenuitem.menuitemicon) {
								parm.menuitemicon = $scope.editmenuitem.menuitemicon;
							}
							if ($scope.editmenuitem.menuitemorder != backupMenuitem.menuitemorder) {
								parm.menuitemorder = $scope.editmenuitem.menuitemorder;
							}
							if ($scope.editmenuitem.menuitemurl != backupMenuitem.menuitemurl) {
								parm.menuitemurl = $scope.editmenuitem.menuitemurl;
							}
							if ($scope.editmenuitem.menuitemrouteurl != backupMenuitem.menuitemrouteurl) {
								parm.menuitemrouteurl = $scope.editmenuitem.menuitemrouteurl;
							}
							if ($scope.editmenuitem.menuitemctrl != backupMenuitem.menuitemctrl) {
								parm.menuitemctrl = $scope.editmenuitem.menuitemctrl;
							}
							if ($scope.editmenuitem.menuitemparentid != backupMenuitem.menuitemparentid) {
								parm.menuitemparentid = $scope.editmenuitem.menuitemparentid;
							}
							if ($scope.editmenuitem.menuitemparentid != backupMenuitem.menuitemparentid) {
								parm.menuitemparentid = $scope.editmenuitem.menuitemparentid;
							}
							if ($scope.editmenuitem.isshow != backupMenuitem.isshow) {
								parm.isshow = $scope.editmenuitem.isshow;
							}
							$http
									.get(
											baseUrl
													+ "editMenuItem.action?menuItem="
													+ parm.voToJson(), {
												"noCache" : Date()
											})
									.success(
											function(data) {
												$(".loading-container")
														.addClass(
																"loading-inactive");
												if (data) {
													if (data.serviceResult == true) {
														ngDialog
																.openConfirm(
																		{
																			template : '<h3>修改菜单项成功！</h3><hr/>'
																					+ '<div class="ngdialog-buttons">'
																					+ '<button type="button" class="ngdialog-button ngdialog-button-primary" ng-click="confirm(1)">确定</button></div>',
																			plain : true,
																			scope : $scope,
																			closeByEscape : false
																		})
																.then(
																		function() {
																			window.history
																					.back();
																		});
													} else {
														ngDialog
																.openConfirm(
																		{
																			template : '<h3>'
																					+ data.resultInfo
																					+ '</h3><hr/>'
																					+ '<div class="ngdialog-buttons">'
																					+ '<button type="button" class="ngdialog-button ngdialog-button-primary" ng-click="confirm(1)">确定</button></div>',
																			plain : true,
																			scope : $scope,
																			closeByEscape : false
																		})
																.then(
																		function() {
																			$(
																					".loading-container")
																					.addClass(
																							"loading-inactive");
																		});
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